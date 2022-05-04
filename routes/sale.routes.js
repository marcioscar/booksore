import express from "express";
import saleController from "../controllers/sale.controller.js";
import { authorize } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", authorize("admin", "client"), saleController.createSale);
router.get("/:saleId", authorize("admin"), saleController.getSale);
router.get("/", authorize("admin", "client"), saleController.getSales);

export default router;
