import { Router } from 'express'
import { requireAuth } from '../middleware/requireAuth'
import { createChat, joinChat, listMyChats,listMembers, removeMember } from '../Controllers/chatController'
import { sendMessage, listMessages } from '../Controllers/MessageController'



const router = Router()

//chat
router.post('/', requireAuth, createChat)
router.post('/join/:token', requireAuth, joinChat)
router.get('/', requireAuth, listMyChats)//done
router.get('/:chatId/members', requireAuth, listMembers)
router.delete('/:chatId/members/:userId', requireAuth, removeMember)

//message
router.get('/:chatId/messages', requireAuth, listMessages)
router.post('/:chatId/messages', requireAuth, sendMessage)

// api/chats/:chatId/messages


export default router