import basicAuth from "express-basic-auth";
import clientService from "../service/client.service.js";

function getRole(username) {
  if (username == "admin") {
    return "admin";
  }
  return "client";
}

function authorize(...allowed) {
  const isAllowed = (role) => allowed.indexOf(role) > -1;
  return (req, res, next) => {
    if (req.auth.user) {
      const role = getRole(req.auth.user);
      if (isAllowed(role)) {
        next();
      } else {
        res.status(403).send("usuário sem permissão !!");
      }
    } else {
      res.status(403).send("Usuário não encontrado");
    }
  };
}

function authorizer(username, password, cb) {
  if (
    basicAuth.safeCompare(username, "admin") &&
    basicAuth.safeCompare(password, "desafio-igti-nodejs")
  ) {
    return cb(null, true);
  }
  clientService
    .verifyLogin(username, password)
    .then((value) => {
      return cb(null, value);
    })
    .catch(() => {
      return cb(null, false);
    });
}

export { getRole, authorize, authorizer };
