import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { accessToken, refreshToken } from "../utils/createJWT.js";
import { MissingUsernameError } from "passport-local-mongoose/dist/lib/errors.js";
import {recordFailedLogins, resetLoginAttempts} from "../services/accountLockout.js"

export const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const user = await User.findOne({username});

    if(user){
      return res.status(409).json({error:"User with this username already exist"})
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const newUser = new User({username, password:hashedPassword, role})
    newUser.save();    


    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Registration error:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({username});

  if(!user){
    return res.status(401).json({error:"Invalid username or password"})
  }

  if(user.security.lockedUntil && user.security.lockedUntil > new Date()){
    return res.status(403).json({
      error:"Invalid username or password"
    });
  }

  if(user.security.lockedUntil && user.security.lockedUntil <= new Date()){
    await resetLoginAttempts(user._id);
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  
  if(!comparePassword){
    const result = await recordFailedLogins(user._id);

    if(result.locked){
      //Trigger automated security alert emails to the user when an account lock occurs
    }

    return res.status(401).json({
      error: "Invalid username or password"
    });
  }

  await resetLoginAttempts(user._id);

  req.user = {id:user._id,role:user.role,username:user.username};

  const aToken = accessToken(user);
  const rToken = refreshToken(user);

  res.cookie("token",rToken,{
    withCredentials: true,
    httpOnly: true,
    sameSite: "Lax",
    // secure: true,
    maxAge:7*24*60*60*1000
  })

  return res.json({
    message: "Login successful",
    accessToken:aToken,
  });
};