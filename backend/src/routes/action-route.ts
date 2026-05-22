import { Router } from "express";
import { addContent, deleteContent, getAllContent, getContent } from "../controllers/action-controller";
import { asyncHandler } from "../utils/async-handler";
import { requireAuth } from "../utils/auth";
import { getPrismaClient } from "@prisma/client/runtime/client";

export const actionRouter = Router();

actionRouter.post('/api/v1/content', requireAuth, asyncHandler(addContent));
actionRouter.delete('/api/v1/content/:id', requireAuth, asyncHandler(deleteContent));
actionRouter.get('/api/v1/content/', requireAuth, asyncHandler(getAllContent));
actionRouter.get('/api/v1/content/:id', requireAuth, asyncHandler(getContent));
actionRouter.put('/api/v1/content/:id', requireAuth, asyncHandler(deleteContent));