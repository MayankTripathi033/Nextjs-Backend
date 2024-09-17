import dbConnect from "@/lib/db.connect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs"
import { sendVerification } from "@/helper/sendEmailVerification";
import { NextRequest } from "next/server";


export async function GET(request:NextRequest) {
    await dbConnect()

    try {
      
        const verifyCode: any = await request.nextUrl.searchParams.get("verifyCode");
        const id: any = await request.nextUrl.searchParams.get("id");
        const user = await UserModel.findById({_id: new Object(id)});
        if(user){
            if(user.verifyCode === verifyCode){
                user.isVerified = true;
                await user.save();
            }else{
                return Response.json({
                    success: false,
                    message: 'Invalid Verification Code'
                },{
                    status: 400
                })
            }
        }
       
        return Response.json({
            success: true,
            message: 'User has Been Successfully Veified'
        },{
            status: 200
        })
    } catch (error) {
        console.error('Error Verifying User', error);
        return Response.json({
            success: false,
            message: 'Error Verifying User',
            error: error
        },{
            status: 500
        })
    }
}
