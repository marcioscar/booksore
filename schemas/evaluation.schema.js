import mongoose from "mongoose";

const EvaluationSchema = new mongoose.Schema(
  {
    name: String,
    score: Number,
    review: String,
  },
  { collection: "livroInfo" }
);

export default EvaluationSchema;
