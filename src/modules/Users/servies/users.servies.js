import user from "../../../DB/models/users.model.js";
import asyncHandler from 'express-async-handler';
import  { validateregisteruser,validateloginuser,validateupdateuser} from '../validator.users.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config()

export const adduser=asyncHandler(
    async(req,res)=>{
        const salt=await bcrypt.genSalt(10)
        const {email,user_name,password,isAdmin}=req.body
        if(!user_name ||!email||!password)return res.status(400).send(`All input is required`)
        const { error, value } =validateregisteruser(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message });

        const valid_email=await user.findOne({where:{email:email}})
    if(valid_email) return res.status(409).json({message:`Email is already existed`})

        const hash_password= await bcrypt.hash(req.body.password,salt)
        const insert=await user .create({email,user_name,password:hash_password,isAdmin})
    if(insert) return res.status(201).json({message:`user register successfully`})
        return res.status(500).send(`internal wrong`)
    }
)

export const loginuser=asyncHandler(
    async(req,res)=>{
        const key=process.env.KEY
        const {password,email}=req.body
        if(!email||!password) return res.status(400).send(`email and password required`)
        const { error, value } =validateloginuser(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message });
        const valid_user=await user.findOne({where:{email:email}})
    if(!valid_user) return res.status(403).json({message:`Email is not found`})
        const matchPass= await bcrypt.compare(req.body.password,valid_user.password)
    if(!matchPass)return res.status(400).send(`invalid password`)
    const token=jwt.sign({id:valid_user.id,username:valid_user.user_name,isAdmin:valid_user.isAdmin},key)
    return res.status(200).json({message:`login successfully , token: ${token}`})
    }
)

export const updetuser=asyncHandler(
    async(req,res)=>{
        const userId=parseInt(req.params.id)
        const valid_user=await user.findOne({where:{id:userId}})
        if(!valid_user) return res.status(403).json({message:`user not found`})
        if (req.user.id !== userId) return res.status(403).json({ message: 'Unauthorized: You can only update your own account' });
        const salt=await bcrypt.genSalt(10)
        const {email,user_name,password,isAdmin}=req.body
        const { error, value } =validateupdateuser(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message });
    if(email){
        const valid_email= await user.findOne({where:{email:email}})
    if(valid_email && valid_email.id !==userId) return res.status(409).json({message:`Email is already existed`})
        valid_user.email=email;
    }
        if(typeof isAdmin === "boolean") valid_user.isAdmin=isAdmin;
    if(user_name) valid_user.user_name=user_name;
    if(password){
        const hash_password= await bcrypt.hash(req.body.password,salt)
        valid_user.password=hash_password}
        const update=await valid_user.save()
    if(update) return res.status(201).json({message:`user update successfully`})
        return res.status(500).send(`internal wrong`)
    }
)

export const deleteuser=asyncHandler(
    async(req,res)=>{
        const userId=req.params.id;
        if(!userId) return res.status(400).send(`User Id required`)
        const foundUser=await user.findOne({where:{id:userId}})
        if(!foundUser)return res.status(401).json({message:`user not found`})
            const deleted=await foundUser.destroy()
        if(deleted)return res.status(200).json({message:`user deleted successfully`})
            return res.status(500).send(`something wrong`)
    }
)

export const getusers=asyncHandler(
    async(req,res)=>{
        const users=await user.findAndCountAll()
    return res.status(200).json({users})

    }
)