import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "../generated/prisma";


const prisma = new PrismaClient()

const RegisterTourGuide = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { name, email, phoneNumber, password, language, Experience, destinationId, profilePic } = req.body;

    try {
        // First check if the destination exists
        const destinationExists = await prisma.destination.findUnique({
            where: {
                id: Number(destinationId)
            }
        });

        if (!destinationExists) {
            res.status(400);
            throw new Error('Destination not found');
        }

        const tourGuide = await prisma.tourGuide.create({
            data: {
                name,
                email,
                phoneNumber,
                password,
                language,
                Experience,
                profilePic,
                destination: {
                    connect: {
                        id: Number(destinationId)
                    }
                }
            }
        });

        res.status(201).json({
            success: true,
            data: tourGuide
        });

    } catch (error: any) {
        res.status(400);
        throw new Error(error.message);
    }
});

const getTourguideById = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const tourGuide = await prisma.tourGuide.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                destination: true
            }
        });

        if (!tourGuide) {
            res.status(404);
            throw new Error('Tour guide not found');
        }

        res.status(200).json({
            success: true,
            data: tourGuide
        });

    } catch (error: any) {
        res.status(400);
        throw new Error(error.message);
    }
});

const getAllTourGuides = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const tourGuides = await prisma.tourGuide.findMany({
            include: {
                destination: true
            }
        });

        res.status(200).json({
            success: true,
            count: tourGuides.length,
            data: tourGuides
        });

    } catch (error: any) {
        res.status(400);
        throw new Error(error.message);
    }
});

export { RegisterTourGuide, getTourguideById, getAllTourGuides };