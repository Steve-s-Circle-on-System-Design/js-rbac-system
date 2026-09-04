import jwt from "jsonwebtoken"
import { accessToken } from "../utils/createJWT.js";

const refresh = (req, res) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({error:"No refresh token provided"})
    }

    jwt.verify(token, process.env.REFRESH_TOKEN, (err, decoded) =>{
        if(err){
            return res.status(401).json({error:"Invalid or expired token"})
        }

        const aToken = accessToken(decoded)
        
        return res.status(200).json({token: aToken, message:"Access token generated"})
    })   
}

export default refresh