import { Router } from "express";
import { asyncHandler } from "../utils/async-handler";
import { signin, signup } from "../controllers/auth-controller";

export const authRouter = Router();

authRouter.post('/api/v1/signup', asyncHandler(signup));
authRouter.post('/api/v1/signin', asyncHandler(signin));