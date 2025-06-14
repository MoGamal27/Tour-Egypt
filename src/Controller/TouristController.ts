import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";
import generateToken from "../middleware/generateJWT";

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

    const token = await generateToken({ id: tourist.id });



    res.status(201).json({
        success: true,
        data: tourist,
        token: token
    });
});


const loginTourist = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    if (!email || !password) {
          res.status(400).json({
            status: "fail",
            message: "Please provide email and password",
        });
    }

    const tourist: any = await prisma.tourist.findUnique({
        where: { email },
    });

    if (!tourist) {
         res.status(401).json({
            status: "fail",
            message: "Invalid email",
        });
    }

    if (password ===! tourist.password)
     {
          res.status(401).json({
            status: "fail",
            message: "Invalid password",
        });
    }

    const token = await generateToken({ id: tourist.id });

    // Set HTTP-only cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.status(200).json({
        status: "success",
        message: "Tourist logged in successfully",
        token: token
    });

    

})



export { RegisterTourist, loginTourist}