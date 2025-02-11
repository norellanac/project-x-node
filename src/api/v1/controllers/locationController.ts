import { Request, Response } from 'express';
import { State, City } from '../models';
import { sendApiResponse } from '../../../utils/responseHandler';
// Get all states
export const getAllStates = async (req: Request, res: Response) => {
  try {
    const states = await State.findAll({
      order: [['name', 'ASC']], // Optional: Order by state name
    });

    sendApiResponse(res, true, 200, states);
  } catch (error) {
    sendApiResponse(res, false, 500, null, 'Failed to fetch states');
  }
};

// Get a single state by ID
export const getStateById = async (req: Request, res: Response) => {
  try {
    const state = await State.findByPk(req.params.id);

    if (state) {
      sendApiResponse(res, true, 200, state);
    } else {
      sendApiResponse(res, false, 404, null);
    }
  } catch (error) {
    sendApiResponse(res, false, 500, null, 'Failed to fetch state');
  }
};

// Get all cities
export const getAllCities = async (req: Request, res: Response) => {
  try {
    const cities = await City.findAll({
      order: [['name', 'ASC']], // Optional: Order by city name
    });

    sendApiResponse(res, true, 200, cities);
  } catch (error) {
    sendApiResponse(res, false, 500, null, 'Failed to fetch cities');
  }
};

// Get all cities by state ID
export const getCitiesByStateId = async (req: Request, res: Response) => {
  try {
    const cities = await City.findAll({
      where: { stateId: req.params.id },
      order: [['name', 'ASC']], // Optional: Order by city name
    });

    sendApiResponse(res, true, 200, cities);
  } catch (error) {
    sendApiResponse(res, false, 500, null, 'Failed to fetch cities');
  }
};