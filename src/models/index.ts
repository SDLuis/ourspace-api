import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import dbConfig from '../config/db.config'
import { commentModel } from './comment.model'
import { postModel } from './post.model'
import { userModel } from './user.model'
import { followerModel } from './follower.model'
import { reactionModel } from './reaction.model'
import { conversationModel } from './conversation.model'
import { messageModel } from './message.model'

const sequelize = new Sequelize(
  dbConfig.database as string,
  dbConfig.user as string,
  dbConfig.password,
  {
    host: dbConfig.host,
    models: [userModel, followerModel, postModel, commentModel, reactionModel, conversationModel, messageModel],
    dialect: dbConfig.dialect as Dialect,
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    },
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

userModel.hasMany(followerModel)
followerModel.belongsTo(userModel, { foreignKey: 'Follower_ID' })

userModel.hasMany(messageModel)
messageModel.belongsTo(userModel, { foreignKey: 'Sender_ID' })

conversationModel.hasMany(messageModel, { foreignKey: 'Conversation_ID' })
messageModel.belongsTo(conversationModel, { foreignKey: 'Conversation_ID' })

userModel.hasMany(commentModel, { foreignKey: 'User_ID' })
commentModel.belongsTo(userModel, { foreignKey: 'User_ID' })

userModel.hasMany(reactionModel, { foreignKey: 'User_ID' })
reactionModel.belongsTo(userModel, { foreignKey: 'User_ID' })

postModel.hasMany(commentModel, { foreignKey: 'Post_ID' })
commentModel.belongsTo(postModel, { foreignKey: 'Post_ID' })

postModel.hasMany(reactionModel, { foreignKey: 'Post_ID' })
reactionModel.belongsTo(postModel, { foreignKey: 'Post_ID' })

export default db
