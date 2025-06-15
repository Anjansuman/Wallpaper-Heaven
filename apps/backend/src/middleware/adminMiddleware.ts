import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";


export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {

        if(!JWT_SECRET) {
            res.status(500).json({
                message: "Internal server error",
            });
            return;
        }
        
        const reqToken = req.headers["authorization"];

        if(!reqToken || !reqToken.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Invalid token"
            });
            return;
        }

        const token = reqToken.split(" ")[1];

        if(!token) {
            res.status(401).json({
                message: "Invalid token"
            });
            return;
        }

        const verifiedToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

        if(!verifiedToken || !verifiedToken.id) {
            res.status(401).json({
                message: "Invalid token"
                        });
            return;
        }

        req.adminId = verifiedToken.id;
        next();


    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
}