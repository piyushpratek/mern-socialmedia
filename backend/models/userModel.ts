import mongoose from 'mongoose'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config';
// const crypto = require("crypto");

export interface IUser extends Document {
    name: string;
    avatar: {
        public_id: string;
        url: string;
    };
    email: string;
    password: string;
    posts: mongoose.Types.ObjectId[];
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    resetPasswordToken: string;
    resetPasswordExpire: Date;

    matchPassword(password: string): Promise<boolean>;
    generateToken(): string;
    // getResetPasswordToken(): string;
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: [true, "Please enter a name"],
    },

    avatar: {
        public_id: String,
        url: String,
    },

    email: {
        type: String,
        required: [true, "Please enter an email"],
        // unique: [true, "Email already exists"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
    },

    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.matchPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, JWT_SECRET);
};

// userSchema.methods.getResetPasswordToken = function () {
//     const resetToken = crypto.randomBytes(20).toString("hex");

//     this.resetPasswordToken = crypto
//         .createHash("sha256")
//         .update(resetToken)
//         .digest("hex");
//     this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

//     return resetToken;
// };

const User = mongoose.model<IUser>("User", userSchema);

export default User