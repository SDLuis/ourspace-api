/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import authRoutes from '../routes/auth.routes'
import userRoutes from '../routes/user.routes'
import postRoutes from '../routes/post.routes'
import commentRoutes from '../routes/comment.routes'
import reactionRoutes from '../routes/reaction.routes'
import followerRoutes from '../routes/follower.routes'
import conversationRoutes from '../routes/conversation.routes'
import messageRoutes from '../routes/message.routes'
import cookieparser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dw9esmd56',
  api_key: '815338661929234',
  api_secret: 'bx5L7NxpAxw2jvnlJ0nSVdLx_eE'
})

const app = express()
const server = http.createServer(app)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const io = new Server(server, {
  cors: {
    origin: '*'
  }
})
let users: any[] = []

const addUser = (userId: any, socketId: string) => {
  !users.some((user) => user.User_ID === userId) &&
    users.push({ userId, socketId })
  console.log(users)
}

const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId: any) => {
  return users.find((user) => user.userId === userId)
}

io.on('connection', (socket) => {
  // when ceonnect
  console.log('a user connected.')

  // take userId and socketId from user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id)
    console.log(userId, socket.id)
    io.emit('getUsers', users)
  })

  // send and get message
  socket.on('sendMessage', ({ Sender_ID, receiverId, description }) => {
    const user = getUser(receiverId)
    console.log(user)
    io.to(user.socketId).emit('getMessage', {
      Sender_ID,
      description
    })
  })

  // when disconnect
  socket.on('disconnect', () => {
    console.log('a user disconnected!')
    removeUser(socket.id)
    io.emit('getUsers', users)
  })
})

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
app.use('/messages', messageRoutes)
app.get('/', (_req, res) => {
  res.status(200).send('WELCOME!!')
})

export default server
