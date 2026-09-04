import mongoose from "mongoose";
// import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        default: "staff"
    },
});

// const passportPlugin =
//     passportLocalMongoose.default || passportLocalMongoose;

// userSchema.plugin(passportPlugin);

const User = mongoose.model('User', userSchema);

export default User;