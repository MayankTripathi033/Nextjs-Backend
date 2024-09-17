import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, "Username must not be less than 2 characters")
    .max(20, "Username must no be more than 20 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username must contain special Character")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Invalid Email address'}),
    password: z.string().min(6,{message: 'Password must be at least 6 characters'})
}) 