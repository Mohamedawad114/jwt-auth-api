import* as userservies from './servies/users.servies.js'
import express from 'express'
const controllor =express.Router()
import { validationAdmin, verifyToken, verifyTokenAndAuthorization } from '../../middlwares/validation.middleware.js'


controllor.post('/register',userservies.adduser)
controllor.post('/login',userservies.loginuser)
controllor.put('/update/:id',verifyToken,userservies.updetuser)
controllor.delete('/delete/:id',verifyTokenAndAuthorization,userservies.deleteuser)
controllor.get('/allusers',validationAdmin,userservies.getusers)



export default controllor