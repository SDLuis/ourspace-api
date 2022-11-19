import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: true
  })
)

app.get('/', (_req, res) => {
  res.status(200).send('WELCOME!!')
})

export default app
