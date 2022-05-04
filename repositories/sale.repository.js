import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function createSale(sale) {
  return await prisma.sales.create({
    data: sale,
  });
}

async function getSale(saleId) {
  return await prisma.sales.findFirst({ where: { saleId: saleId } });
}

async function getSales() {
  return await prisma.sales.findMany();
}

async function getSalesByClient(clientId) {
  return await prisma.sales.findMany({
    where: { clientId },
    include: {
      client: true,
    },
  });
}

async function getSalesByBook(bookId) {
  return await prisma.sales.findMany({
    where: { bookId },
    include: {
      book: true,
    },
  });
}

async function getSalesByAuthor(authorId) {
  return await prisma.sales.findMany({
    where: {
      book: {
        authorId: authorId,
      },
    },
    include: {
      book: true,
    },
  });
}
export default {
  createSale,
  getSale,
  getSales,
  getSalesByClient,
  getSalesByBook,
  getSalesByAuthor,
};
