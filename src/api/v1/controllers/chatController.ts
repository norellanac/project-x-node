import { Request, Response } from 'express';
import { Conversation, Message, Reaction, User } from '../models';
import { sendApiResponse } from '../../../utils/responseHandler';
import { logger } from '../../../utils/logger';
import { Op } from 'sequelize';

// Create a new conversation between two users
export const createConversation = async (req: Request, res: Response) => {
  try {
    const { user1Id, user2Id } = req.body;

    // Check if a conversation already exists between the two users
    const existingConversation = await Conversation.findOne({
      where: {
        [Op.or]: [
          { user1Id, user2Id },
          { user1Id: user2Id, user2Id: user1Id } // Check both directions
        ]
      }
    });

    if (existingConversation) {
      // If conversation exists, return its ID
      return sendApiResponse(res, true, 200, {
        message: 'Conversation already exists',
        conversationId: existingConversation.id
      });
    }

    // Create a new conversation if it doesn't exist
    const conversation = await Conversation.create({ user1Id, user2Id });
    sendApiResponse(res, true, 201, {
      message: 'Conversation created successfully',
      conversationId: conversation.id
    });
  } catch (error) {
    // Log the error and send a 500 response
    // logger.error('Error creating conversation:', error);
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Send a message in a conversation
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { conversationId, senderId, content } = req.body;
    const message = await Message.create({ conversationId, senderId, content });
    sendApiResponse(res, true, 201, message);
  } catch (error) {
    // logger.error('Error sending message:', error);
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Get all messages in a conversation
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.findAll({
      where: { conversationId },
      order: [['createdAt', 'ASC']],
      include: [{ model: Reaction, as: 'Reactions', include: [{ model: User, as: 'user' }] },
        { model: User, as: 'sender'},
      ]
    });
    sendApiResponse(res, true, 200, messages);
  } catch (error) {
    // logger.error('Error getting messages:', error);
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Get conversations by user ID
export const getConversationsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [
          { user1Id: userId },
          { user2Id: userId }
        ]
      },
      include: [
        { model: Message, as: 'messages', include: [{ model: Reaction, as: 'Reactions' }] },
        { model: User, as: 'user1' },
        { model: User, as: 'user2' }
      ],
      order: [['createdAt', 'DESC']]
    });
    if (conversations.length > 0) {
      sendApiResponse(res, true, 200, conversations);
    } else {
      sendApiResponse(res, false, 404, null, 'No conversations found for this user');
    }
  } catch (error) {
    // logger.error('Error getting conversations:', error);
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};