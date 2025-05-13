import { z } from "zod";

export const user = z.object({
    name: z.string().min(2).max(40),
    email: z.string().email(),
    password: z.string().min(6).max(40)
});