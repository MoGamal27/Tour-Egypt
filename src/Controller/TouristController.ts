import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "../generated/prisma";


const prisma = new PrismaClient()

const RegisterTourist = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { name, email, phoneNumber, password } = req.body;

   
        const tourist = await prisma.tourist.create({
            data: {
                name,
                email,
                phoneNumber,
                password
            }
        });

        res.status(201).json({
            success: true,
            data: tourist
        });
});

export { RegisterTourist };