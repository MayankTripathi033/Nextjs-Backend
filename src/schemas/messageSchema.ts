import {z} from "zod";

export const messageSchema = ({
    code: z
    .string()
    .min(10, {message: "content must be at least longer than 10"})
    .max(300, {message: 'content must be less than 300 characters'})
}) 