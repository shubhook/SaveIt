import { z } from "zod";

export const ContentSchema = z.object({
    title: z.string().min(1, "title is required").max(65),
    description: z.string().optional(),
    link: z.string().min(1, "link is required"),
    type: z.string().min(1, "type is required"),
    tags: z.array(z.enum(["productivity", "research"]).or(z.string())).optional()
});

export const updateContentSchema = z.object({
    title: z.string().min(1, "title is required").max(65).optional(),
    description: z.string().optional(),
    link: z.string().min(1, "link is required").optional(),
    type: z.string().min(1, "type is required").optional(),
    tags: z.array(z.enum(["productivity", "research"]).or(z.string())).optional()
});