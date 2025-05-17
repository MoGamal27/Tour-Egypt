import {createDestination, getDestination, getDestionationById} from '../Controller/DestinationController'
import { Router } from "express";

const router = Router();

router.post("/destination", createDestination);
router.get("/destination", getDestination);
router.get("/destination/:id", getDestionationById);

export default router