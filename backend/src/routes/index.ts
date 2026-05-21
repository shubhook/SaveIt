import { Router } from "express";
import { authRouter } from "./auth-route";

export const appRouter = Router();

appRouter.use(authRouter);