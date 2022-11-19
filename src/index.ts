import app from './libs/middlewares'

/* eslint-disable */
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT} in development mode
Press CTRL-C to stop`)
})
