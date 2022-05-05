import express from "express";
import authorController from "../controllers/author.controller";

const router = express.Router();

router.post("/", authorController.createAuthor);
router.put("/", authorController.updateAuthor);
router.get("/:authorId", authorController.getAuthor);
router.get("/", authorController.getAuthors);
router.delete("/:authorId", authorController.deleteAuthor);

export default router;
