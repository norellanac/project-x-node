import { Request, Response } from 'express';
import { Reaction } from '../models';
import { sendApiResponse } from '../../../utils/responseHandler';
import { logger } from '../../../utils/logger';

export const addReaction = async (req: Request, res: Response) => {
  try {
    const { userId, reactableType, reactableId, type } = req.body;
    const reaction = await Reaction.create({ userId, reactableType, reactableId, type });
    sendApiResponse(res, true, 201, reaction);
  } catch (error) {
    // logger.error('Error adding reaction:', error);
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

export const getReactions = async (req: Request, res: Response) => {
  try {
    const { reactableType, reactableId } = req.params;
    const reactions = await Reaction.findAll({
      where: { reactableType, reactableId },
      order: [['createdAt', 'ASC']],
    });
    sendApiResponse(res, true, 200, reactions);
  } catch (error) {
    // logger.error('Error getting reactions:', error);
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};