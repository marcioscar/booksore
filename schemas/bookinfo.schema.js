import mongoose from "mongoose";
import EvaluationSchema from "./evaluation.schema.js";

const BookInfoSchema = new mongoose.Schema(
  {
    bookId: Number,
    description: String,
    pages: Number,
    publishing: String,
    evaluations: [EvaluationSchema],
  },
  { collection: "livroInfo" }
);

export default BookInfoSchema;
