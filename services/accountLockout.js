import User from "../models/user.js";


const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = new Date(Date.now() + 15 * 60 * 1000);

export const recordFailedLogins = async (userId) =>{
    const user = await User.findOneAndUpdate(
        { 
            _id: userId, 
            "security.failedAttempts": { $lt: MAX_FAILED_ATTEMPTS } 
        },
        [
            { 
                $set: { 
                    "security.failedAttempts": { 
                        $add: ["$security.failedAttempts", 1] 
                    } 
                } 
            },
            { 
                $set: { 
                    "security.lockedUntil": { 
                        $cond: [
                            { $gte: ["$security.failedAttempts", 5] }, 
                            LOCKOUT_DURATION_MS, 
                            "$security.lockedUntil"
                        ] 
                    } 
                } 
            }
        ],
        { 
            returnDocument: 'after',
            updatePipeline:true
        }
    );

    if(!user){
        return {
            locked: true
        }
    }

    return {
        locked:false
    }
}

export const resetLoginAttempts = async (userId) => {
  await User.updateOne(
    { _id: userId },
    {
      $set: {
        "security.failedAttempts": 0,
        "security.lockedUntil": null
      }
    }
  );
};