import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const createBooking = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, checkIn, checkOut, adults, children, email, phone } = req.body;

    const booking = await prisma.booking.create({
        data: {
            firstName,
            lastName,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            adults: parseInt(adults),
            children: parseInt(children),
            email,
            phone
        }
    });

    res.status(201).json({
        success: true,
        data: booking
    });
});

const getBookings = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookings = await prisma.booking.findMany();

    res.status(200).json({
        success: true,
        data: bookings
    });
});

const getBookingById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
        where: {
            id: parseInt(id)
        }
    });

    if (!booking) {
        res.status(404).json({
            success: false,
            message: "Booking not found"
        });
        return;
    }

    res.status(200).json({
        success: true,
        data: booking
    });
});

export { createBooking, getBookings, getBookingById };