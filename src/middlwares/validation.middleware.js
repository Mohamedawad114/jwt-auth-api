import jwt from'jsonwebtoken'
function verifyToken(req,res,next){
    const authHeader = req.headers.authorization;
const token = authHeader && authHeader.split(" ")[1]; 

    if(!token)return res.status(401).send(`no token provided`)
        try{
    const decoded=jwt.verify(token,process.env.KEY)
    req.user=decoded
    next(); 
    }catch{
      return  res.status(401).send(`no token provided`)
    }
}
export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    const userId = parseInt(req.params.id);
    if (req.user.id === userId || req.user.isAdmin) {
      next(); 
    } else {
      res.status(403).json({ message: 'You are not allowed to perform this action' });
}});
};

export const validationAdmin=(req,res,next)=>{
  verifyToken(req,res,()=>{
    if(req.user.isAdmin){
      next();
    }
    else{
      return res.status(403).json({message: `only admind allowed`})
    }
  })
}
export {verifyToken}