import saleService from "../service/sale.service.js";
import clientService from "../service/client.service.js";
import { getRole } from "../controllers/auth.controller.js";

async function createSale(req, res, next) {
  try {
    let sale = req.body;
    console.log(sale);
    if (!sale.date || !sale.clientId || !sale.bookId) {
      throw new Error("Faltam dados !!!");
    }
    sale = await saleService.createSale(sale);
    res.send(sale);
    logger.info(`POST /Sale - ${JSON.stringify(sale)}`);
  } catch (err) {
    next(err);
  }
}

async function getSale(req, res, next) {
  try {
    res.send(await saleService.getSale(req.params.saleId));
    logger.info(`GET /sale:/id`);
  } catch (err) {
    next(err);
  }
}

async function getSales(req, res, next) {
  try {
    if (req.query.clientId && getRole(req.auth.user) === "client") {
      const client = await clientService.getClientByEmail(req.auth.user);
      if (parseInt(req.query.clientId) !== client.clientId) {
        throw new Error("não pode ver a venda de outro cliente");
      }
    }
    res.send(
      await saleService.getSales(
        req.query.clientId,
        req.query.bookId,
        req.query.authorId
      )
    );
    logger.info(`GET /sale:authorId`);
  } catch (err) {
    next(err);
  }
}

export default { createSale, getSale, getSales };
