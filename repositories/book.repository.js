import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function createBook(book) {
  return await prisma.books.create({
    data: book,
  });
}

async function updateBook(book) {
  return await prisma.books.update({
    where: { bookId: book.bookId },
    data: {
      value: book.value,
      stock: book.stock,
    },
  });
}

async function deleteBook(bookId) {
  return await prisma.books.delete({
    where: { bookId },
  });
}

async function getBook(bookId) {
  return await prisma.books.findFirst({
    where: { bookId },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
}

async function getBooks() {
  return await prisma.books.findMany();
}

async function getBooksbyAuthor(authorId) {
  return await prisma.books.findMany({
    where: { authorId },
  });
}

export default {
  createBook,
  updateBook,
  deleteBook,
  getBook,
  getBooks,
  getBooksbyAuthor,
};
