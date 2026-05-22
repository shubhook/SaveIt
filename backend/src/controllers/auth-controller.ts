import bcrypt from "bcrypt"
import type { Request, Response} from "express";
import { authSchema } from "../types/auth-schema";
import { prisma } from "../db";
import { generateToken } from "../utils/auth";

export async function signup(req: Request, res: Response) {
    const parsedBody = authSchema.safeParse(req.body);

    if(!parsedBody.success) {
        res.status(400).json({
            message: "validation error"
        })
        return;
    }

    const { username, password } = parsedBody.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.users.create({
            data: {
                username,
                password: hashedPassword
            }
        });

        res.status(201).json({
            message: "User Created",
            token: generateToken({ userId: user.id }),
            username
        })
    } catch {
        res.status(409).json( {
            message: "user already exists",
        });
        return;
    }
}

export async function signin(req: Request, res: Response) {
    const parsedBody = authSchema.safeParse(req.body);

    if(!parsedBody.success) {
        res.status(400).json({
            message: "validation error"
        })
        return;
    }

    const { username, password } = parsedBody.data;

    try {
        const user = await prisma.users.findFirst({
            where: {
                username
            }
        });

        if(!user) {
            res.status(404).json({ message: "user not found" })
            return;
        }

        const validPassword = await bcrypt.compare(password, user?.password);

        if(!validPassword) {
            res.status(400).json({ message: "Invalid Password" });
            return;
        }

        res.status(200).json({
            token: generateToken({ userId: user.id })
        })
    } catch(err) {
        console.error(err)
        res.status(400).json({ message: "Invalid Username or Password" });
        return;
    }
}