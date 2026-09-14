import mongoose from "mongoose";
// import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        default: "staff"
    },
    
    security: {
        failedAttempts: { type: Number, default: 0 },
        // lastFailedAt: { type: Date, default: null },
        lockedUntil: { type: Date, default: null }
    }
});

// const passportPlugin =
//     passportLocalMongoose.default || passportLocalMongoose;

// userSchema.plugin(passportPlugin);

const User = mongoose.model('User', userSchema);

export default User;