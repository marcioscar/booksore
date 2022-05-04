import app from "../app.js";
import request from "supertest";

import authorRepository from "../repositories/author.repository.js";
import clientRepository from "../repositories/client.repository.js";
import bookRepository from "../repositories/book.repository.js";
import saleRepository from "../repositories/sale.repository.js";

jest.setTimeout(30000);

test("CENÁRIO 01", async () => {
  const author = {
    name: "autor teste",
    email: "teste@teste",
    phone: "123",
  };

  const book = {
    name: "livro de teste",
    value: 123.55,
    stock: 10,
    authorId: null,
  };

  const client = {
    name: "Cliente de teste",
    email: "teste@teste",
    password: "teste",
    phone: "123",
    address: "teste numero 7",
  };

  const sale = {
    value: 12,
    date: "2022-01-01",
    clientId: null,
    bookId: null,
  };

  const admin = "admin";
  const passwordAdmin = "desafio-igti-nodejs";
  let emailClient = client.email;
  let passwordClient = client.password;

  let res = await request(app)
    .post("/author")
    .send(author)
    .auth(admin, passwordAdmin);
  author.id = res.body.author.id;
  expect(res.body).toMatchObject(author);
  expect(res.status).toBe(200);
});
