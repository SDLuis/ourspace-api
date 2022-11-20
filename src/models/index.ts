import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import dbConfig from '../config/db.config'
import { commentModel } from './comment.model'
import { postModel } from './post.model'
import { userModel } from './user.model'

const sequelize = new Sequelize(
  dbConfig.database as string,
  dbConfig.user as string,
  dbConfig.password,
  {
    host: dbConfig.host,
    models: [userModel, postModel, commentModel],
    dialect: dbConfig.dialect as Dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
)

const db = {
  Sequelize,
  sequelize
}

userModel.hasMany(postModel, { foreignKey: 'User_ID' })
postModel.belongsTo(userModel, { foreignKey: 'User_ID' })
userModel.hasMany(commentModel, { foreignKey: 'User_ID' })
commentModel.belongsTo(userModel, { foreignKey: 'User_ID' })
postModel.hasMany(commentModel, { foreignKey: 'Post_ID' })
commentModel.belongsTo(postModel, { foreignKey: 'Post_ID' })

export default db
