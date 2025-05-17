import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()


const createRestaurant = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, destinationId } = req.body

    const restaurant = await prisma.restaurant.create({
        data: {
            name,
            destinationId
        }
    })
    res.status(201).json({
        status: "success",
        message: "Restaurant created successfully",
        data: restaurant,
    });
    next();
})

const getRestaurants = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const restaurants = await prisma.restaurant.findMany();
    
    res.status(200).json({
        status: "success",
        data: restaurants,
    });
    next();
})


const getRestaurantById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;

    const restaurant = await prisma.restaurant.findUnique({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        status: "success",
        data: restaurant
    });
    next();
})

export {createRestaurant, getRestaurantById, getRestaurants}