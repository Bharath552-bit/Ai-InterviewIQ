import express from 'express'
import { updateUserDetails } from '../controllers/profile/user-updates.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.patch("/updateUser",authMiddleware,updateUserDetails)

export default router