import jwt from 'jsonwebtoken';  // was missing in original – required for token

export function accessToken(payload){
    return jwt.sign(
        {
            id: payload._id,
            username: payload.username,
            role: payload.role,
        },
            process.env.ACCESS_TOKEN,
        {
            expiresIn: "15m",
        }
    )
}

export function refreshToken(payload){
    return jwt.sign(
        {
            id: payload._id,
            username: payload.username,
            role: payload.role,
        },
            process.env.REFRESH_TOKEN,
        {
            expiresIn: "7d",
        }
    )
}

