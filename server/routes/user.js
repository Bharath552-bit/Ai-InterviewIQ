import express from 'express'
import { updateUserDetails } from '../controllers/profile/user-updates.js'

const router = express.Router()

router.patch("/updateUser",updateUserDetails)

export default router