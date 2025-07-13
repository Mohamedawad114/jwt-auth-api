import joi from 'joi'
function validateregisteruser(obj){
const schema=new joi.object({
    email: joi.string().trim().required().email(),
    password:joi.string().required().trim().min(6),
    user_name:joi.string().trim().required().min(4).max(100).pattern(/^[A-Za-z0-9@#&*_]+$/),
    isAdmin:joi.boolean()
})
return schema.validate(obj)
}
function validateloginuser(obj){
const schema=new joi.object({
    email: joi.string().trim().required().email(),
    password:joi.string().required().trim().min(6),
})
return schema.validate(obj)
}
function validateupdateuser(obj){
const schema=new joi.object({
    email: joi.string().trim().email(),
    password:joi.string().trim().min(6),
    user_name:joi.string().trim().min(4).max(100).pattern(/^[A-Za-z0-9@#&*_]+$/),
    isAdmin:joi.boolean()
})
return schema.validate(obj)
}




export  { validateregisteruser,validateloginuser,validateupdateuser};
