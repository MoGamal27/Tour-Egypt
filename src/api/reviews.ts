import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

// POST - Create a new review
const createReview = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { hotelId, name, email, message, rating, sentiment } = req.body;

    const review = await prisma.hotelReview.create({
        data: {
            hotelId: parseInt(hotelId),
            name,
            email,
            message,
            rating: parseFloat(rating),
            sentiment: sentiment || 'neutral'
        }
    });

    res.status(201).json({
        status: "success",
        message: "Review created successfully",
        data: review,
    });
    next();
});

// GET - Get reviews for a specific hotel
const getHotelReviews = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { hotelId } = req.params;

    const reviews = await prisma.hotelReview.findMany({
        where: {
            hotelId: parseInt(hotelId)
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    res.status(200).json({
        status: "success",
        data: reviews,
    });
    next();
});

export {
    createReview,
    getHotelReviews
};