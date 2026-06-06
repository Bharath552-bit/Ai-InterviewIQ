import express from 'express'
import { aiInterview } from '../controllers/interview/aiinterview.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/liveInterview",authMiddleware,aiInterview)

export default router