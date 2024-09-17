import { resend } from "@/lib/resend.email";
import { EmailTemplate } from "../../emails/Verificationemail";
import { ApiResponse } from "@/types/Api.Response";

export async function sendVerification(
    email: string,
    username: string,
    verifycode: string
): Promise<ApiResponse>{
    try {
        console.log("verifyCode", verifycode);
        console.log("email", email);
        console.log("username", username);
        
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verification Code || Resend Email',
            react: EmailTemplate({username, otp: verifycode}),
        })
        return {success: true, message: "SuccessFully send Email"}
        
    } catch (error) {
        console.error("Could not send Email due to some error", error);
        return {success: false, message: "Failed To send verification Email"}
        
    }
}