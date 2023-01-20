import { Request, Response } from 'express'
import { NewConversationEntry } from '../models/conversation.model'
import * as conversationService from '../services/conversation.service'

export const newConversation = async (req: Request, res: Response): Promise<void> => {
  try {
    const members: NewConversationEntry = [req.body.firstUser, req.body.secondUser] as NewConversationEntry
    const addedConversation = await conversationService.addNewConversation(members)
    res.status(200).send(addedConversation)
  } catch (err: any) {
    res.status(400).send(err.message)
  }
}

export const deleteConversation = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.conversationID
    await conversationService.deleteConversation(id)?.then((result) => {
      if (result === 1) {
        res.status(200).send('Conversation deleted')
      } else {
        res.status(400).send('Error, Conversation was not edited')
      }
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const ownConversation = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = (req as any).token.User_ID
    const Conversations = (await conversationService.ownConversations(id)) as any
    res.status(200).send(Conversations)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
