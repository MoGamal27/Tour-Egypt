import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const createCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const category = await prisma.category.create({
        data: { name }
    });

    res.status(201).json({
        success: true,
        data: category
    });
});

const getCategories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const categories = await prisma.category.findMany({
        include: {
            souvenirs: true
        }
    });

    res.status(200).json({
        success: true,
        data: categories
    });
});

const getCategoryById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const category = await prisma.category.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                souvenirs: true
            }
        });

        if (!category) {
            res.status(404);
            throw new Error('Category not found');
        }

        res.status(200).json({
            success: true,
            data: category
        });

    } catch (error: any) {
        res.status(400);
        throw new Error(error.message);
    }
});

export { createCategory, getCategories, getCategoryById };