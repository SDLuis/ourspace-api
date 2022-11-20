import app from './libs/middlewares'
import db from './models/index'

/* eslint-disable */
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT} in development mode
Press CTRL-C to stop`)
db.sequelize
.authenticate()
.then(async () => {
  console.log("database connected")
  try {
    await db.sequelize.sync({ force: false })
  } catch (error: any) {
    console.log(error.message);
  }
})
.catch((e: any) => {
  console.log(e.message);
});
})
