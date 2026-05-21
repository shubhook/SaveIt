import jwt from "jsonwebtoken";
import  type { Request, Response, NextFunction } from "express"
import { env } from "./env";

export type tokenPayload = {
    userId: number
}

export function generateToken(payload: tokenPayload): string {
    return jwt.sign(payload, env.jwtSecret);
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == undefined) {
        res.status(401).json({
            message: "<Missing Token>"
        });
        return;
    }

    try {
        const decoded = await jwt.verify(token, env.jwtSecret) as tokenPayload;
        req.userId = decoded.userId;
        next();
        
    } catch(err) {
        console.log(err);
        res.status(403).json({
            mesaage: "Unauthorised Endpoint"
        });
        return;
    }
}