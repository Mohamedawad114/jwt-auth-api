import { Sequelize } from 'sequelize';
import env from 'dotenv';
import asyncHandler from 'express-async-handler'
env.config()
const db_url=process.env.DB_URL
const sequelize_config=new Sequelize(db_url)
const db_connection=asyncHandler(
async () => {
  await sequelize_config.authenticate();
await sequelize_config.sync({alter:true})
})
export  {sequelize_config};
export default db_connection;

