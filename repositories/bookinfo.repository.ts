import { connect } from "./mongo.db";
import BookInfoSchema from "../schemas/bookinfo.schema";

async function createBookInfo(bookInfo) {
  try {
    const mongoose = await connect();
    const BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    bookInfo = new BookInfo(bookInfo);
    await bookInfo.save();
  } catch (err) {
    next(err);
  }
}

async function updateBookInfo(bookInfo) {
  try {
    const mongoose = await connect();
    const BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    await BookInfo.findOneAndUpdate({ bookId: bookInfo.bookId }, bookInfo);
  } catch (err) {
    next(err);
  }
}

async function deleteBookInfo(bookId) {
  try {
    const mongoose = await connect();
    const BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    await BookInfo.deleteOne({ bookId });
  } catch (err) {
    next(err);
  }
}

async function getBookInfo(bookId) {
  console.log("passou getbookinfo");
  try {
    const mongoose = await connect();
    const BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    return await BookInfo.findOne({ bookId }).exec();
  } catch (err) {
    throw err;
  }
}

async function createEvaluation(evaluation, bookId) {
  try {
    const bookInfo = await getBookInfo(bookId);
    bookInfo.evaluations.push(evaluation);
    return await updateBookInfo(bookInfo);
  } catch (err) {
    throw err;
  }
}

async function deleteEvaluation(bookId, index) {
  try {
    const bookInfo = await getBookInfo(bookId);
    bookInfo.evaluations.splice(index, 1);
    return await updateBookInfo(bookInfo);
  } catch (err) {
    throw err;
  }
}

export default {
  createBookInfo,
  updateBookInfo,
  deleteBookInfo,
  getBookInfo,
  createEvaluation,
  deleteEvaluation,
};
