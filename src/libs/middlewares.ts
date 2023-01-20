import express from 'express'
import cors from 'cors'
import authRoutes from '../routes/auth.routes'
import userRoutes from '../routes/user.routes'
import postRoutes from '../routes/post.routes'
import commentRoutes from '../routes/comment.routes'
import reactionRoutes from '../routes/reaction.routes'
import followerRoutes from '../routes/follower.routes'
import conversationRoutes from '../routes/conversation.routes'
import cookieparser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dw9esmd56',
  api_key: '815338661929234',
  api_secret: 'bx5L7NxpAxw2jvnlJ0nSVdLx_eE'
})

const app = express()

app.use(express.json())
app.use(cookieparser())
app.use(
  cors({
    credentials: true,
    origin: true
  })
)

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)
app.use('/reactions', reactionRoutes)
app.use('/followers', followerRoutes)
app.use('/conversations', conversationRoutes)
app.get('/', (_req, res) => {
  res.status(200).send('WELCOME!!')
})

export default app
