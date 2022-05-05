import express from "express";
import ClientController from "../controllers/client.controller";
import { authorize } from "../controllers/auth.controller";

const router = express.Router();

router.post("/", authorize("admin"), ClientController.createClient);
router.put("/", authorize("admin", "client"), ClientController.updateClient);
router.get("/:clientId", authorize("admin"), ClientController.getClient);
router.get("/", authorize("admin"), ClientController.getClients);
router.delete("/:clientId", authorize("admin"), ClientController.deleteClient);

export default router;
