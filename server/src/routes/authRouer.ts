import { Router } from 'express'
import { signup, login,me,logout } from '../Controllers/authControllers'
import { requireAuth } from '../middleware/requireAuth'
const router = Router()


router.get('/me', requireAuth, me)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)


export default router
















//this is the auth router we define the router for auth here 