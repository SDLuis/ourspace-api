import { Request, Response } from 'express'
import * as messageService from '../services/message.service'

export const newMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = {
      Sender_ID: (req as any).token.User_ID,
      Conversation_ID: req.body.Conversation_ID,
      description: req.body.description
    }
    const addedConversation = await messageService.addNewMessage(body)
    res.status(200).send(addedConversation)
  } catch (err: any) {
    res.status(400).send(err.message)
  }
}

export const deleteMessage = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.messageID
    await messageService.deleteMessage(id)?.then((result) => {
      if (result === 1) {
        res.status(200).send('Message deleted')
      } else {
        res.status(400).send('Error, Message was not edited')
      }
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const getMessagesByConversations = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.conversationID
    const Messages = (await messageService.getMessagesByConversation(id)) as any
    res.status(200).send(Messages)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
