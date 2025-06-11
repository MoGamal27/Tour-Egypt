import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";
import generateToken from "../middleware/generateJWT";

const prisma = new PrismaClient()

const RegisterTourist = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { name, email, phoneNumber, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);


   
        const tourist = await prisma.tourist.create({
            data: {
                name,
                email,
                phoneNumber,
                password: hashedPassword
            }
        });

        const token = await generateToken({ id: tourist.id });

        res.status(201).json({
            success: true,
            data: tourist,
            token: token
        });
});

export { RegisterTourist };