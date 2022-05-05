// import pkg from "@prisma/client";
// const { PrismaClient } = pkg;
// const prisma = new PrismaClient();

import { prisma } from "../db";

async function createAuthor(author) {
  return await prisma.authors.create({
    data: author,
  });
}

async function updateAuthor(author) {
  return await prisma.authors.update({
    where: { authorId: author.authorId },
    data: author,
  });
}

async function deleteAuthor(authorId) {
  return await prisma.authors.delete({
    where: { authorId },
  });
}

async function getAuthors() {
  return await prisma.authors.findMany();
}

async function getAuthor(authorId) {
  return await prisma.authors.findFirst({ where: { authorId } });
}

export default {
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthors,
  getAuthor,
};
