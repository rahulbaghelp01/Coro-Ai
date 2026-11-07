import { Router } from 'express'
import { requireAuth } from '../middleware/requireAuth'
import { createChat, joinChat, listMyChats } from '../Controllers/chatController'
import { sendMessage, listMessages } from '../Controllers/MessageController'



const router = Router()

//chat
router.post('/', requireAuth, createChat)
router.post('/join/:token', requireAuth, joinChat)
router.get('/', requireAuth, listMyChats)

//message
router.get('/:chatId/messages', requireAuth, listMessages)
router.post('/:chatId/messages', requireAuth, sendMessage)


export default router