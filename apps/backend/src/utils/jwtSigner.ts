import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/secrets/server";


export const jwtSigner = (userId: String) => {
    try {
        
        const jwtToken = jwt.sign(userId, JWT_SECRET);
        const token = "Bearer " + jwtToken;

        return token;

    } catch (error) {
        
    }
}