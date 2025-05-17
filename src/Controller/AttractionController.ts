import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient();

const createAttraction = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const {name, destinationId } = req.body;

    const attraction = await prisma.attraction.create({
        data: {
            name,
            destinationId
        }
    })

   res.status(201).json({
        status: "success",
        message: "Attraction created successfully",
        data: attraction,
    });
    next();
})


const getAttraction = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const attraction = await prisma.attraction.findMany();

    res.status(200).json({
        status: "success",
        data: attraction,
    });
    next();
})


const getAttractionById = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const {id} = req.params;

    const attraction = await prisma.attraction.findUnique({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        status: "success",
        data: attraction,
    });
    next();
})

export  {createAttraction, getAttraction, getAttractionById}

