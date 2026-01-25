import jwt from "jsonwebtoken"

export const authMiddleware = (req,res,next)=>{
            try {
                const token = req.cookies.token;
                if(!token)
                {
                    return res.json({
                        message:"first login"
                    })
                }

                let decoded = jwt.verify(token,process.env.JWT_SECRET);

                req.user_id = decoded.id;

                next();
                
            } catch (error) {
               return res.status(500).send(error.message);
            }
}