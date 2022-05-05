import clientRepository from "../repositories/client.repository";
import basicAuth from "express-basic-auth";

async function createClient(client) {
  return await clientRepository.createClient(client);
}

async function updateClient(client) {
  return await clientRepository.updateClient(client);
}

async function deleteClient(client) {
  // TODO: implementar verificação de existência de vendas
  return await clientRepository.deleteClient(client);
}

async function getClients() {
  return await clientRepository.getClients();
}

async function getClient(client) {
  return await clientRepository.getClient(client);
}

async function getClientByEmail(email) {
  return await clientRepository.getClientByEmail(email);
}
async function verifyLogin(email, password) {
  const client = await clientRepository.getClientByEmail(email);
  console.log("cliente do Service" + client);
  if (!client) {
    return false;
  }
  return basicAuth.safeCompare(client.password, password);
}

export default {
  createClient,
  updateClient,
  deleteClient,
  getClients,
  getClient,
  verifyLogin,
  getClientByEmail,
};
