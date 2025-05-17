import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const createReview = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { comment, rating } = req.body;

    try {
        const review = await prisma.review.create({
            data: {
                comment,
                rating: parseFloat(rating)
            }
        });

        res.status(201).json({
            success: true,
            data: review
        });
    } catch (error: any) {
        res.status(400);
        throw new Error(error.message);
    }
});

const getAllReviews = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await prisma.review.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error: any) {
        res.status(400);
        throw new Error(error.message);
    }
});

export { createReview, getAllReviews };