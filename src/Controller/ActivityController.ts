import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const createActivity = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, location, rating, price, description, duration, maxPeople, imageUrl, destinationId } = req.body;

    const activity = await prisma.activity.create({
        data: {
            name,
            location,
            rating: parseFloat(rating),
            price: parseFloat(price),
            description,
            duration,
            maxPeople: parseInt(maxPeople),
            imageUrl,
            destinationId: parseInt(destinationId)
        }
    });

    res.status(201).json({
        success: true,
        data: activity
    });
});

const getActivities = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const activities = await prisma.activity.findMany({
        include: {
            destination: true
        }
    });

    res.status(200).json({
        success: true,
        data: activities
    });
});

const getActivityById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const activity = await prisma.activity.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            destination: true
        }
    });

    if (!activity) {
        res.status(404).json({
            success: false,
            message: "Activity not found"
        });
        return;
    }

    res.status(200).json({
        success: true,
        data: activity
    });
});

export { createActivity, getActivities, getActivityById };