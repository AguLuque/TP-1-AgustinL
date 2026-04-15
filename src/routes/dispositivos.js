const express = require("express");
const router = express.Router();
const db = require("../data/datos");
const validarDispositivo = require("../middlewares/validacion");

router.get("/", (req, res) => {
  let lista = db.getAll();

  if (req.query.estado) {
    lista = lista.filter(
      (d) => d.estado.toLowerCase() === req.query.estado.toLowerCase()
    );
  }

  res.status(200).json(lista);
});

router.get("/:id", (req, res) => {
  const dispositivo = db.getById(req.params.id);
  if (!dispositivo) {
    return res.status(404).json({ error: `Dispositivo con ID ${req.params.id} no encontrado.` });
  }
  res.status(200).json(dispositivo);
});

router.post("/", validarDispositivo, (req, res) => {
  const duplicado = db.existeIP(req.body.ip);
  if (duplicado) {
    return res.status(409).json({ error: `Ya existe un dispositivo con la IP ${req.body.ip}.` });
  }
  const nuevo = db.create(req.body);
  res.status(201).json(nuevo);
});

router.put("/:id", validarDispositivo, (req, res) => {
  const actualizado = db.update(req.params.id, req.body);
  if (!actualizado) {
    return res.status(404).json({ error: `Dispositivo con ID ${req.params.id} no encontrado.` });
  }
  res.status(200).json(actualizado);
});

router.delete("/:id", (req, res) => {
  const eliminado = db.remove(req.params.id);
  if (!eliminado) {
    return res.status(404).json({ error: `Dispositivo con ID ${req.params.id} no encontrado.` });
  }
  res.status(200).json({ mensaje: `Dispositivo con ID ${req.params.id} eliminado correctamente.` });
});

module.exports = router;
