import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function createClient(client) {
  return await prisma.clients.create({
    data: client,
  });
}

async function updateClient(client) {
  return await prisma.clients.update({
    where: { clientId: client.clientId },
    data: client,
  });
}

async function deleteClient(clientId) {
  return await prisma.clients.delete({ where: { clientId } });
}

async function getClients() {
  return await prisma.clients.findMany({
    select: {
      name: true,
      email: true,
      phone: true,
      address: true,
    },
  });
}

async function getClient(clientId) {
  return await prisma.clients.findFirst({
    where: { clientId },
    select: { name: true, email: true, phone: true, address: true },
  });
}

async function getClientByEmail(email) {
  try {
    return await prisma.clients.findFirst({
      where: { email },
    });
  } catch (err) {
    throw err;
  }
}

export default {
  createClient,
  updateClient,
  deleteClient,
  getClients,
  getClient,
  getClientByEmail,
};
