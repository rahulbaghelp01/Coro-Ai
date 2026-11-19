import { Router } from 'express'
import { requireAuth } from '../middleware/requireAuth'
import { createChat, joinChat, listMyChats,listMembers, removeMember } from '../Controllers/chatController'
import { sendMessage, listMessages } from '../Controllers/MessageController'



const router = Router()

//chat
router.post('/', requireAuth, createChat)//done
router.post('/join/:token', requireAuth, joinChat)
router.get('/', requireAuth, listMyChats)//done
router.get('/:chatId/members', requireAuth, listMembers)//done
router.delete('/:chatId/members/:userId', requireAuth, removeMember)

//message
router.get('/:chatId/messages', requireAuth, listMessages)//done
router.post('/:chatId/messages', requireAuth, sendMessage)//done

// api/chats/:chatId/messages


export default router