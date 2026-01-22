import jwt from "jsonwebtoken"


export const generate_token= (feed)=>{
const token  = jwt.sign({id:feed},process.env.JWT_SECRET,{expiresIn:"1h"})
return token;
}