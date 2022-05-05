import app from "../app";
import request from "supertest";

import authorRepository from "../repositories/author.repository";
import clientRepository from "../repositories/client.repository";
import bookRepository from "../repositories/book.repository";
import saleRepository from "../repositories/sale.repository";

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
  author.authorId = res.body.authorId;
  expect(res.body).toMatchObject(author);
  expect(res.status).toBe(200);

  res = await request(app)
    .get(`/author/${author.authorId}`)
    .auth(admin, passwordAdmin);
  expect(res.body).toMatchObject(author);
  expect(res.status).toBe(200);

  book.authorId = author.authorId;
  res = await request(app).post("/book").send(book).auth(admin, passwordAdmin);
  book.bookId = res.body.bookId;
  expect(res.body).toMatchObject(book);
  expect(res.status).toBe(200);

  res = await request(app)
    .get(`/book/${book.bookId}`)
    .auth(admin, passwordAdmin);
  expect(res.body).toMatchObject(book);
  expect(res.status).toBe(200);

  res = await request(app)
    .post("/client")
    .send(client)
    .auth(admin, passwordAdmin);
  client.clientId = res.body.clientId;
  expect(res.body).toMatchObject(client);
  expect(res.status).toBe(200);
});
