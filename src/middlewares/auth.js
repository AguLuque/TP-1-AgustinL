const TOKEN_VALIDO = "1234";

function auth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token || token !== TOKEN_VALIDO) {
    return res
      .status(401)
      .json({ error: "No autorizado. Enviar el key: Authorization: 1234" });
  }
  next();
}

module.exports = auth;
