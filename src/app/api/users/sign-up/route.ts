import dbConnect from "@/lib/db.connect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs"
import { sendVerification } from "@/helper/sendEmailVerification";

/**
 * @swagger
 * /users/sign-up:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password123
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User Registered Successfully. Please verify your email
 *       400:
 *         description: Bad request - User already exists or missing information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Username is already Taken
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error Registering user
 */

export async function POST(request:Request) {
    await dbConnect()

    try {
        const {username, email, password} = await request.json()
        const existingUserVerificationByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        if(existingUserVerificationByUsername){
            return Response.json(
                {
                    success: false, 
                    message: "Username is already Taken"
                },
                {
                    status: 400
                })
        }
        const existingUserByEmail = await UserModel.findOne({email})
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({success: false, message: "Email already exist either signin or signup"}, {status: 400})
            }else {
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpired = new Date(new Date(Date.now() + 3600000))
                await existingUserByEmail.save()
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)
            const newUser = new UserModel({
                username,
                password: hashedPassword,
                email,
                verifyCode,
                verifyCodeExpired: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })
            await newUser.save()
        }
        //send Verification Email
        const emailResponse = await sendVerification(email, username, verifyCode)
        if(!emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message
            },{
                status: 500
            })
        }
        return Response.json({
            success: true,
            message: 'User Registered Successfully. Please verify your email'
        },{
            status: 200
        })
    } catch (error) {
        console.error('Error registering user', error);
        return Response.json({
            success: false,
            message: 'Error Registering user',
            error: error
        },{
            status: 500
        })
    }
}
