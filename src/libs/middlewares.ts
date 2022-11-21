import express from 'express'
import cors from 'cors'
import authRoutes from '../routes/auth.routes'
import userRoutes from '../routes/user.routes'
import cookieparser from 'cookie-parser'

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
app.get('/', (_req, res) => {
  res.status(200).send('WELCOME!!')
})

export default app
