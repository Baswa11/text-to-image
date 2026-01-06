import express from 'express'
import { generateImage } from '../controllers/imageController.js'
import userAuth from '../middlewares/auth.js'

const imageRouter = express.Router()

imageRouter.post('/generate', userAuth, generateImage)

export default imageRouter

//localhost:3000/api/image/generate