import { Request, Response } from 'express';
import axios from 'axios';
import { User, Role } from '../models';
import jwt from 'jsonwebtoken';
import { createResponse } from '../../../utils/responseUtils';

const generateJWT = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '12h' });
};


//https://developers.google.com/oauthplayground/
//google oauth2 api v2
//openId
//exchange authorization code for access token
//tap on refresh token
export const googleAuth = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
  
      if (!token) {
        return createResponse(res, { success: false, message: 'Token is required', statusCode: 400 });
      }
  
      // Step 1: Validate the token
      const tokenValidationResponse = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
      const { aud, exp } = tokenValidationResponse.data;
        console.error('Google token validation response:', tokenValidationResponse.data);
  
    //   // Ensure the token is valid and issued for your app
    //   if (aud !== process.env.GOOGLE_CLIENT_ID) {
    //     return createResponse(res, { success: false, message: 'Invalid token audience', statusCode: 400 });
    //   }
  
      // Step 2: Retrieve user information
      const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.error('Google user info response:', userInfoResponse.data);
  
      const { email, given_name: name, family_name: lastname } = userInfoResponse.data;
  
      if (!email) {
        return createResponse(res, { success: false, message: 'Email is required', statusCode: 400 });
      }
  
      // Step 3: Check if the user exists in the database
      let user = await User.findOne({ where: { email } });
      if (!user) {
        // Create a new user if not found
        user = await User.create({ name, lastname, email, password: '' });
  
        // Assign a default role
        const defaultRole = await Role.findOne({ where: { name: 'User' } });
        if (defaultRole) {
          await user.addRole(defaultRole);
        }
      }
  
      // Step 4: Generate a JWT token
      const jwtToken = generateJWT(user.id);
      createResponse(res, { success: true, data: { user, token: jwtToken } });
    } catch (err: any) {
      console.error('Google authentication error:', err.response?.data || err.message);
      createResponse(res, { success: false, message: 'Google authentication failed', statusCode: 500 });
    }
  };

// https://developers.facebook.com/tools/explorer/
// login with facebook developer account
//generate access token
// See popup for access token and Click on Continue


export const facebookAuth = async (req: Request, res: Response) => {
  try {
    const { accessToken } = req.body;

    const facebookResponse = await axios.get(`https://graph.facebook.com/me?fields=id,email,first_name,last_name&access_token=${accessToken}`);
    const { email, first_name: name, last_name: lastname } = facebookResponse.data;
    console.error('Facebook response:', facebookResponse.data);

    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({ name, lastname, email, password: '' });

      const defaultRole = await Role.findOne({ where: { name: 'User' } });
      if (defaultRole) {
        await user.addRole(defaultRole);
      }
    }

    const jwtToken = generateJWT(user.id);
    createResponse(res, { success: true, data: { user, token: jwtToken } });
  } catch (err: any) {
    console.error('Facebook authentication error:', err);
    createResponse(res, { success: false, message: 'Facebook authentication failed', statusCode: 500 });
  }
};