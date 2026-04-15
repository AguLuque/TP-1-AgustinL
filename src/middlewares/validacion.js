const IP_REGEX =
  /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;

function validarDispositivo(req, res, next) {
  const esPUT = req.method === "PUT";
  const { nombre, ip, tipo } = req.body;

  const errores = [];

  if (!esPUT && (nombre === undefined || nombre === null)) {
    errores.push("El campo 'nombre' es obligatorio.");
  } else if (nombre !== undefined && String(nombre).trim() === "") {
    errores.push("El campo 'nombre' no puede estar vacío.");
  }

  if (!esPUT && (ip === undefined || ip === null)) {
    errores.push("El campo 'ip' es obligatorio.");
  } else if (ip !== undefined && !IP_REGEX.test(ip)) {
    errores.push(`La IP '${ip}' no es válida. Debe tener formato IPv4 (ej: 192.168.0.1).`);
  }

  if (!esPUT && (tipo === undefined || tipo === null)) {
    errores.push("El campo 'tipo' es obligatorio.");
  } else if (tipo !== undefined && String(tipo).trim() === "") {
    errores.push("El campo 'tipo' no puede estar vacío.");
  }

  if (errores.length > 0) {
    return res.status(400).json({ error: "Validación fallida", detalles: errores });
  }

  next();
}

module.exports = validarDispositivo;
