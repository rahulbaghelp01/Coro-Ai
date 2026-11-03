import { Router } from 'express'
import { requireAuth } from '../middleware/requireAuth'
import { createChat, joinChat, listMyChats } from '../Controllers/chatController'


const router = Router()

router.post('/', requireAuth, createChat)
router.post('/join/:token', requireAuth, joinChat)
router.get('/', requireAuth, listMyChats)


export default router