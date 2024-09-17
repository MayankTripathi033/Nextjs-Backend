import {z} from "zod";

export const verifySchema = ({
    code: z.string().length(6, 'Verification code must be 6 digits')
})