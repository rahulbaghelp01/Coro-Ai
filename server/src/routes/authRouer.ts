import { Router } from 'express'
import { signup, login } from '../Controllers/authControllers'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)

export default router
















//this is the auth router we define the router for auth here 