import { createHotel, getHotels, getHotelById } from "../Controller/HotelController";
import { Router } from "express";

const router = Router()

router.post("/hotel", createHotel)
router.get("/hotel", getHotels)
router.get("/hotel/:id", getHotelById)

export default router;
