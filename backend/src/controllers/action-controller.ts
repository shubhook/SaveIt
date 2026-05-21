import type { Request, Response } from "express";
import { ContentSchema } from "../types/action-schema";
import { prisma } from "../db"


export async function addContent(req: Request, res: Response): Promise<void> {
    const parsedBody = ContentSchema.safeParse(req.body);

    if(!parsedBody.success) {
        res.status(400).json({
            message: "validation error"
        });
        return;
    }

    const { title, link, type } = parsedBody.data;
    const description = parsedBody.data.description!;
    const tags = parsedBody.data.tags!;
    const userId = req.userId!;
    try {
        const content = await prisma.content.create({
            data: {
                title,
                description,
                link,
                type,
                tags,
                userId
            }
        })

        res.status(200).json({
            message: "Success",
            content
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "cannot add content"
        });
    }
}

export async function deleteContent(req: Request, res: Response): Promise<void> {
    const contentId: number = parseInt(req.params.id as string);

    if(isNaN(contentId)) {
        res.status(404).json({
            message: "Invalid contentId"
        })
        return;
    }

    try {
        const response = await prisma.content.delete({
            where: {
                id: contentId,
                userId: req.userId,
            }
        })

         res.status(200).json({
            message: "the content is deleted",
            deletedContent: response
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "cannot delete content"
        });
    }
}

export async function getAllContent(req: Request, res: Response): Promise<void> {
    const userId = req.userId!;
    try {
        const allContent = await prisma.content.findMany({
            where: {
                userId: userId
            }
        });

        res.status(200).json({
            message: "all content",
            fetchedContent: allContent
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "cannot fetch content"
        });
    }
}