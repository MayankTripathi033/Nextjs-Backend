import dbConnect from "@/lib/db.connect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs"

/**
 * @swagger
 * /users/sign-in:
 *   post:
 *     summary: Sign in a user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User credentials for signing in
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password123
 *     responses:
 *       200:
 *         description: User signed in successfully
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
 *                   example: User Signed In Successfully
 *       400:
 *         description: Bad request - Missing credentials or invalid user/password
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
 *                   example: Invalid Password
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
 *                   example: Error Signing In
 */


export async function POST(request:Request){
    await dbConnect()
try {
    const {email, password} = await request.json()
    if(!email || !password){
        return Response.json({
            success: false,
            message: 'Username and Password are required'
        }, {
            status: 400
        })
    }
    
    const existingUser = await UserModel.findOne({email})
    if(!existingUser){
        return Response.json({
            success: false,
            message: 'User does not exist'
        }, {
            status: 400
        })
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password)
    if(!isPasswordValid){
        return Response.json({
            success: false,
            message: 'Invalid Password'
        }, {
            status: 400
        })
    }
    return Response.json({
        success: true,
        message: 'User Signed In Successfully'
    }, {
        status: 200
    })
} catch (error) {
    console.error("Error in :: Sign-In", error);
    return Response.json({
        success: false,
        message: 'Error Signing In',
        error: error
    }, {
        status: 500
    })
}}