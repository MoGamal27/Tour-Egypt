import { createRestaurant, getRestaurants, getRestaurantById } from "../Controller/RestaurantController";
import { Router } from "express";

const router = Router()


router.post("/restaurant", createRestaurant)
router.get("/restaurant", getRestaurants)
router.get("/restaurant/:id", getRestaurantById)


export default router;