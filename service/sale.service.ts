import saleRepository from "../repositories/sale.repository";
import bookRepository from "../repositories/book.repository";
import clientRepository from "../repositories/client.repository";

async function createSale(sale) {
  console.log("sale:" + sale);
  let error = "";
  if (!(await clientRepository.getClient(sale.clientId))) {
    error = "o Cliente nao existe";
  }

  const book = await bookRepository.getBook(sale.bookId);
  if (!book) {
    error += "e o produto nao existe";
  }
  if (error) {
    throw new Error(error);
  }
  if (book.stock > 0) {
    sale.value = book.value;
    sale.date = new Date(sale.date);
    sale = await saleRepository.createSale(sale);
    console.log("estoque: " + book.stock);
    book.stock--;
    console.log("estoque: " + book.stock);
    await bookRepository.updateBook(book);
    console.log(book);
    return sale;
  } else {
    throw new Error("Livro sem estoque suficiente");
  }
}

async function getSale(saleId) {
  return await saleRepository.getSale(parseInt(saleId));
}

async function getSales(clientId, bookId, authorId) {
  if (clientId) {
    return await saleRepository.getSalesByClient(parseInt(clientId));
  }
  if (bookId) {
    return await saleRepository.getSalesByBook(parseInt(bookId));
  }
  if (authorId) {
    console.log("authorid :" + authorId);
    return await saleRepository.getSalesByAuthor(parseInt(authorId));
  }

  return saleRepository.getSales();
}

export default { createSale, getSale, getSales };
