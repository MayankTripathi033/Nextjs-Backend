import UserModel  from '@/model/User.model';
import bcrypt  from 'bcryptjs';
import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from '@/lib/db.connect';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any, req: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            {email: credentials.identifier},
                            {password: credentials.indentifier}
                        ]
                    })
                    if(!user) {
                        throw new Error("Invalid email or password")
                    }
                    if(!user.isVerified){
                        throw new Error("Please verify your account")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if(!isPasswordCorrect) {
                        throw new Error("Invalid password")
                    }
                    return user
                } catch (error: any) {
                    console.error();
                    throw new Error(error)
                }
            },
        })
    ],
    pages: {
        signIn: '/sign-in',
        signOut: '/sign-out',
        error: '/error',
        verifyRequest: '/verify-request',
        newUser: '/new-user',
    },
    session: {
        strategy: "jwt"
    },
   secret: process.env.NEXTAUTH_SECRET as string,
   callbacks: {
    async jwt({ token, user }) {
        if(user){
            token._id = user._id?.toString();
            token.isVerified = user.isVerified;
            token.isAcceptingMessages = user.isAcceptingMessages;
            token.username = user.username;
        }   
        return token
      },
    async session({ session, token }: any) {
        if(token) {
            session.user._id = token._id;
            session.user.isVerified = token.isVerified;
            session.user.isAcceptingMessages = token.isAcceptingMessages;
            session.user.username = token.username;
        }
        return session
      }
      
   }
}