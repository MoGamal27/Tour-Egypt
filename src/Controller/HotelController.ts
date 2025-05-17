import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const createHotel = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, destinationId } = req.body

    const hotel = await prisma.hotel.create({
        data: {
            name,
            destinationId
        }
    })
    res.status(201).json({
        status: "success",
        message: "Hotel created successfully",
        data: hotel,
    });
    next();
})

const getHotels = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const hotels = await prisma.hotel.findMany();
    
    res.status(200).json({
        status: "success",
        data: hotels,
    });
    next();
})

const getHotelById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const hotel = await prisma.hotel.findUnique({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        status: "success",
        data: hotel
    });
    next();
})

export { createHotel, getHotelById, getHotels }
