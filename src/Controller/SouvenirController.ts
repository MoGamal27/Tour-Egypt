import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "../generated/prisma";


const prisma = new PrismaClient();

const createSouvenir = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, categoryId } = req.body;

    const souvenir = await prisma.souvenirs.create({
        data: {
            name,
            description,
            price,
            categoryId: parseInt(categoryId)
        }
    });

    res.status(201).json({
        success: true,
        data: souvenir
    });
});

const getSouvenirs = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const souvenirs = await prisma.souvenirs.findMany({
        include: {
            category: true
        }
    });

    res.status(200).json({
        success: true,
        data: souvenirs
    });
});

const getSouvenirsByCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params;

    const souvenirs = await prisma.souvenirs.findMany({
        where: {
            categoryId: parseInt(categoryId)
        },
        include: {
            category: true
        }
    });

    res.status(200).json({
        success: true,
        data: souvenirs
    });
});

const getSouvenirById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const souvenir = await prisma.souvenirs.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                category: true
            }
        });

        if (!souvenir) {
            res.status(404);
            throw new Error('Souvenir not found');
        }

        res.status(200).json({
            success: true,
            data: souvenir
        });

    } catch (error: any) {
        res.status(400);
        throw new Error(error.message);
    }
});

export { createSouvenir, getSouvenirs, getSouvenirsByCategory, getSouvenirById };