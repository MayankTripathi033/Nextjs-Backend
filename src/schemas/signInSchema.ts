import {z} from "zod";

export const signInSchema = ({
    Identifier: z.string(),
    password: z.string()
})