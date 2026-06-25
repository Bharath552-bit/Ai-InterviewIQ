import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { getInterview } from '../controllers/interview/getInterview.js'

const router = express.Router()

router.post("/getInterview",authMiddleware,getInterview)

export default router