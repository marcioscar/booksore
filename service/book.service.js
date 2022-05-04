import bookRepository from "../repositories/book.repository.js";
import authorRepository from "../repositories/author.repository.js";
import BookInfoRepository from "../repositories/bookinfo.repository.js";

async function createBook(book) {
  if (authorRepository.getAuthor(book.authorId)) {
    return await bookRepository.createBook(book);
  }
  throw new Error("autor não existe");
}

async function updateBook(book) {
  return await bookRepository.updateBook(book);
}

async function deleteBook(book) {
  // TODO: verificar se tem vendas antes de apagar
  return await bookRepository.deleteBook(book);
}

async function getBook(book) {
  return await bookRepository.getBook(book);
}

async function getBooks(authorId) {
  if (authorId) {
    return await bookRepository.getBooksbyAuthor(authorId);
  }
  return await bookRepository.getBooks();
}

//bookInfo

async function createBookInfo(bookInfo) {
  await BookInfoRepository.createBookInfo(bookInfo);
}

async function updateBookInfo(bookInfo) {
  await BookInfoRepository.updateBookInfo(bookInfo);
}

async function deleteBookInfo(id) {
  await BookInfoRepository.deleteBookInfo(id);
}

async function createEvaluation(evaluation, bookId) {
  await BookInfoRepository.createEvaluation(evaluation, bookId);
}

async function deleteEvaluation(bookId, index) {
  await BookInfoRepository.deleteEvaluation(parseInt(bookId), index);
}
export default {
  createBook,
  updateBook,
  deleteBook,
  getBook,
  getBooks,
  createBookInfo,
  updateBookInfo,
  deleteBookInfo,
  createEvaluation,
  deleteEvaluation,
};
