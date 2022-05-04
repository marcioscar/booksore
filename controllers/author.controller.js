import authorService from "../service/author.service.js";

async function createAuthor(req, res, next) {
  try {
    let author = req.body;
    if (!author.name || !author.email || !author.phone) {
      throw new Error("Faltam dados obrigatórios");
    }
    author = await authorService.createAuthor(author);
    res.send(author);
    logger.info(`POST /Author - ${JSON.stringify(author)}`);
  } catch (err) {
    next(err);
  }
}
async function updateAuthor(req, res, next) {
  try {
    let author = req.body;
    if (!author.name || !author.email || !author.phone || !author.authorId) {
      throw new Error("Faltam dados obrigatórios");
    }
    author = await authorService.updateAuthor(author);
    res.send(author);
    logger.info(`PUT /Author - ${JSON.stringify(author)}`);
  } catch (err) {
    next(err);
  }
}
async function deleteAuthor(req, res, next) {
  try {
    res.send(await authorService.deleteAuthor(parseInt(req.params.authorId)));
    logger.info("DELETE /author/authorId ");
  } catch (err) {
    next(err);
  }
}

async function getAuthors(req, res, next) {
  try {
    res.send(await authorService.getAuthors());
    logger.info("GET /authors");
  } catch (err) {
    next(err);
  }
}

async function getAuthor(req, res, next) {
  try {
    res.send(await authorService.getAuthor(parseInt(req.params.authorId)));
  } catch (err) {
    next(err);
  }
}

export default {
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthors,
  getAuthor,
};
