import express from 'express'
import helmet from 'helmet'
import env from 'dotenv'
import db_connection from './DB/db.connection.js';
import userControllor from './modules/Users/user.controllor.js'
const app=express();
app.use(helmet())
env.config()
let port=process.env.PORT||3000;

app.use(express.json())

app.use('/users',userControllor)

 await db_connection()



app.use((err, req, res, next) => {
  res.status(500).send(`Something went wrong: ${err.message}`);
});

app.listen(port,()=>{
    console.log(`port ${port} is running....`)
})