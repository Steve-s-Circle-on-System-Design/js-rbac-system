import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
});

// Plugin disabled due to ESM/CJS compatibility issue with passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

export default User;