import clientService from "../service/client.service";
import { getRole } from "./auth.controller";

async function createClient(req, res, next) {
  try {
    let client = req.body;
    if (
      !client.name ||
      !client.email ||
      !client.password ||
      !client.phone ||
      !client.address
    ) {
      throw new Error("Faltam dados obrigatórios");
    }
    client = await clientService.createClient(client);
    res.send(client);
    logger.info(`POST /Client - ${JSON.stringify(client)}`);
  } catch (err) {
    next(err);
  }
}

async function updateClient(req, res, next) {
  try {
    let client = req.body;
    if (
      !client.name ||
      !client.email ||
      !client.password ||
      !client.clientId ||
      !client.phone ||
      !client.address
    ) {
      throw new Error("Faltam dados obrigatórios");
    }

    if (client.clientId && getRole(req.auth.user) === "client") {
      const cliente = await clientService.getClientByEmail(req.auth.user);
      if (parseInt(client.clientId) !== cliente.clientId) {
        throw new Error("não pode atualizar outro cliente");
      }
    }
    client = await clientService.updateClient(client);
    res.send(client);
    logger.info(`PUT /Client - ${JSON.stringify(client)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteClient(req, res, next) {
  try {
    res.send(await clientService.deleteClient(parseInt(req.params.clientId)));
    logger.info("DELETE /client/ClientId ");
  } catch (err) {
    next(err);
  }
}

async function getClients(req, res, next) {
  try {
    res.send(await clientService.getClients());
    logger.info("GET /Clients ");
  } catch (err) {
    next(err);
  }
}

async function getClient(req, res, next) {
  try {
    res.send(await clientService.getClient(parseInt(req.params.clientId)));
    logger.info("GET /client/ClientId ");
  } catch (err) {
    next(err);
  }
}

export default {
  createClient,
  updateClient,
  deleteClient,
  getClients,
  getClient,
};
