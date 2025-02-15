// filepath: /Users/neryalexisorellana/Documents/devProjects/js/node/projectx-be-node/src/api/v1/controllers/chatController.ts
import { Request, Response } from 'express';
import { Conversation, Message, Reaction } from '../models';
import { sendApiResponse } from '../../../utils/responseHandler';
import { logger } from '../../../utils/logger';

// Create a new conversation between two users
export const createConversation = async (req: Request, res: Response) => {
  try {
    const { user1Id, user2Id } = req.body;
    const conversation = await Conversation.create({ user1Id, user2Id });
    sendApiResponse(res, true, 201, conversation);
  } catch (error) {
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
      include: [{ model: Reaction, as: 'Reactions' }] // Include reactions in the response
    });
    sendApiResponse(res, true, 200, messages);
  } catch (error) {
    // logger.error('Error getting messages:', error);
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};