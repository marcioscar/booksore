import express from "express";
import bookController from "../controllers/book.controller.js";
import { authorize } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", authorize("admin"), bookController.createBook);
router.put("/", authorize("admin"), bookController.updateBook);
router.get("/", authorize("admin", "client"), bookController.getBooks);
router.get("/:bookId", authorize("admin", "client"), bookController.getBook);
router.delete("/:bookId", authorize("admin"), bookController.deleteBook);

router.delete("/info/:id", authorize("admin"), bookController.DeleteBookInfo);
router.post("/info", authorize("admin"), bookController.CreateBookInfo);
router.put("/info", authorize("admin"), bookController.UpdateBookInfo);

router.post(
  "/evaluation",
  authorize("admin", "client"),
  bookController.createEvaluation
);
router.delete("/:id/evaluation/:index", bookController.deleteEvaluation);

export default router;
