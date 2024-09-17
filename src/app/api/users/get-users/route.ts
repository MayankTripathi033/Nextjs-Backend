import dbConnect from "@/lib/db.connect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs"

/**
 * @swagger
 * /users/get-users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
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
 *                   example: List of all users
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d21b8667d0d8992e610c85"
 *                       username:
 *                         type: string
 *                         example: john_doe
 *                       email:
 *                         type: string
 *                         example: john@example.com
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
 *                   example: Error retrieving users
 */


export async function GET(request:Request){
    await dbConnect()
try {
   const data = await UserModel.find();
    
    return Response.json({
        success: true,
        message: {data}
    }, {
        status: 200
    })
} catch (error) {
    console.error("Error in :: Get All Users", error);
    return Response.json({
        success: false,
        message: 'Error Get All User',
        error: error
    }, {
        status: 500
    })
}}