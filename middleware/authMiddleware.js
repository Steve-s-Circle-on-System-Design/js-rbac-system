import jwt from "jsonwebtoken"

export const authMiddleware = (req,res,next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if(!token){
        return res.status(401).json({error:"Access token required"});
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) =>{
        if(err){
            return res.status(401).json({error:"Invalid or expired token"})
        }

        console.log("Decoded: ",decoded);

        req.user = decoded;
        next()
    });
}