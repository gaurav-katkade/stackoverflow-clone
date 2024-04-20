import express from 'express'
import {getAllUsers} from '../controllers/Users.js'
import {signUp,login} from '../controllers/auth.js'
const router = express.Router();

router.post('/signup',signUp)
router.post('/login',login)
router.get('/getAllUsers',getAllUsers)
export default router;