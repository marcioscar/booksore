import authorRepository from "../repositories/author.repository.js";
import bookRepository from "../repositories/book.repository.js";

async function createAuthor(author) {
  return await authorRepository.createAuthor(author);
}

async function updateAuthor(author) {
  return await authorRepository.updateAuthor(author);
}

async function deleteAuthor(author) {
  console.log(author);
  const books = await bookRepository.getBooksbyAuthor(author);
  if (books.length > 0) {
    throw new Error("Autor com livro cadastrado");
  }
  return await authorRepository.deleteAuthor(author);
}

async function getAuthors() {
  return await authorRepository.getAuthors();
}

async function getAuthor(author) {
  return await authorRepository.getAuthor(author);
}

export default {
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthors,
  getAuthor,
};
