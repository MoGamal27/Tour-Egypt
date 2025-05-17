import { createAttraction, getAttraction, getAttractionById } from "../Controller/AttractionController";
import { Router } from "express";

const router = Router();

router.post("/attraction", createAttraction);
router.get("/attraction", getAttraction);
router.get("/attraction/:id", getAttractionById);

export default router