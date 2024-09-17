import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}
export interface User extends Document{
    username: string;
    password: string;
    email: string;
    verifyCode: string;
    verifyCodeExpired: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/, 'Email is Required']
    },
    verifyCode: {
        type: String,
        required: [true, "Verify Code is required"],
    },
    verifyCodeExpired: {
        type: Date,
        required: [true, "verifyCodeExpired is required"],
    },
    isVerified: {
        type: Boolean,
        required: [true, "isVerified is required"],
    },
    isAcceptingMessage: {
        type: Boolean,
        required: [true, "isAccepting Messages are required"],
    },
    messages: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel