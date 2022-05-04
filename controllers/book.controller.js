import bookService from "../service/book.service.js";

async function createBook(req, res, next) {
  try {
    let book = req.body;
    if (!book.name || !book.value || !book.authorId) {
      throw new Error("Faltam dados obrigatórios");
    }
    book = await bookService.createBook(book);
    res.send(book);
    logger.info(`POST /book - ${JSON.stringify(book)}`);
  } catch (err) {
    next(err);
  }
}

async function updateBook(req, res, next) {
  try {
    let book = req.body;
    if (!book.bookId || !book.value) {
      throw new Error("Faltam dados obrigatórios");
    }
    book = await bookService.updateBook(book);
    res.send(book);
    logger.info(`PUT /book - ${JSON.stringify(book)}`);
  } catch (err) {
    next(err);
  }
}
async function deleteBook(req, res, next) {
  try {
    res.send(await bookService.deleteBook(parseInt(req.params.bookId)));
    logger.info("DELETE /book/bookId ");
  } catch (err) {
    next(err);
  }
}

async function getBook(req, res, next) {
  try {
    res.send(await bookService.getBook(parseInt(req.params.bookId)));
    logger.info("GET /book");
  } catch (err) {
    next(err);
  }
}

async function getBooks(req, res, next) {
  try {
    res.send(await bookService.getBooks(parseInt(req.query.authorId)));
  } catch (err) {
    next(err);
  }
}

//bookInfo
async function CreateBookInfo(req, res, next) {
  try {
    let bookInfo = req.body;
    if (!bookInfo.bookId) {
      throw new Error("Falta book ID");
    }
    await bookService.createBookInfo(bookInfo);
    res.end();
    logger.info(`POST /book/info - ${JSON.stringify(bookInfo)}`);
  } catch (err) {
    next(err);
  }
}

async function UpdateBookInfo(req, res, next) {
  try {
    let bookInfo = req.body;
    if (!bookInfo.bookId) {
      throw new Error("Falta book ID");
    }
    await bookService.updateBookInfo(bookInfo);
    res.end();
    logger.info(`PUT /book/info - ${JSON.stringify(bookInfo)}`);
  } catch (err) {
    next(err);
  }
}
async function DeleteBookInfo(req, res, next) {
  try {
    res.send(await bookService.deleteBookInfo(parseInt(req.params.id)));
    logger.info("DELETE /book/info");
  } catch (err) {
    next(err);
  }
}

async function createEvaluation(req, res, next) {
  try {
    let params = req.body;
    if (!params.bookId || !params.evaluation) {
      throw new Error("BookId e avaliação são obrigatórios");
    }
    await bookService.createEvaluation(params.evaluation, params.bookId);
    logger.info("POST /book/evaluation");
    res.end();
  } catch (err) {
    next(err);
  }
}

async function deleteEvaluation(req, res, next) {
  try {
    await bookService.deleteEvaluation(req.params.id, req.params.index);
    res.end();
    logger.info("DELETE /book/evaluation");
  } catch (err) {
    next(err);
  }
}

export default {
  createBook,
  updateBook,
  deleteBook,
  getBook,
  getBooks,
  CreateBookInfo,
  UpdateBookInfo,
  DeleteBookInfo,
  createEvaluation,
  deleteEvaluation,
};
