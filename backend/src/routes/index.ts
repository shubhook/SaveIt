import { Router } from "express";
import { authRouter } from "./auth-route";
import { actionRouter } from "./action-route";

export const appRouter = Router();

appRouter.use(authRouter);
appRouter.use(actionRouter);