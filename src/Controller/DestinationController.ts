import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient();


const createDestination = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const {name, description } = req.body;

    const destination = await prisma.destination.create({
        data: {
            name,
            description
        }
    })

   res.status(201).json({
        status: "success",
        message: "Destination created successfully",
        data: destination,
    });
    next();
})


const getDestination = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const destination = await prisma.destination.findMany();

    res.status(200).json({
        status: "success",
        data: destination,
    });
    next();
})


const getDestionationById = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const {id} = req.params;

    const destination = await prisma.destination.findUnique({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        status: "success",
        data: destination,
    });
    next();
})

export  {createDestination, getDestination, getDestionationById}




