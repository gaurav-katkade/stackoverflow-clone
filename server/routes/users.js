import express from 'express'
import {getAllUsers,updateProfile} from '../controllers/Users.js'
import {signUp,login} from '../controllers/auth.js'
// import auth from '../models/auth.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup',signUp)
router.post('/login',login)
router.get('/getAllUsers',getAllUsers)
router.patch('/update/:id',auth,updateProfile)
export default router;