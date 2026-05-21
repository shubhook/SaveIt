import { Router } from "express";
import { addContent, deleteContent, getAllContent } from "../controllers/action-controller";
import { asyncHandler } from "../utils/async-handler";
import { requireAuth } from "../utils/auth";

export const actionRouter = Router();

actionRouter.post('/api/v1/content', requireAuth, asyncHandler(addContent));
actionRouter.delete('/api/v1/content/:id', requireAuth, asyncHandler(deleteContent));
actionRouter.get('/api/v1/content/', requireAuth, asyncHandler(getAllContent));