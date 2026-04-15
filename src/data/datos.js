let dispositivos = [
  {
    id: 1,
    nombre: "PC-Oficina",
    ip: "192.168.0.10",
    estado: "activo",
    tipo: "pc",
    createdAt: new Date("2025-01-10T08:00:00Z").toISOString(),
  },
  {
    id: 2,
    nombre: "Router-Principal",
    ip: "192.168.0.1",
    estado: "activo",
    tipo: "router",
    createdAt: new Date("2025-01-09T12:00:00Z").toISOString(),
  },
  {
    id: 3,
    nombre: "Impresora-HP",
    ip: "192.168.0.50",
    estado: "inactivo",
    tipo: "impresora",
    createdAt: new Date("2025-01-08T15:30:00Z").toISOString(),
  },
];

function getAll() {
  return dispositivos;
}

function getById(id) {
  return dispositivos.find((d) => d.id === parseInt(id));
}

function create(data) {
  const nuevo = {
    id: nextId++,
    nombre: data.nombre,
    ip: data.ip,
    estado: data.estado || "activo",
    tipo: data.tipo,
    createdAt: new Date().toISOString(),
  };
  dispositivos.push(nuevo);
  return nuevo;
}

function update(id, data) {
  const idx = dispositivos.findIndex((d) => d.id === parseInt(id));
  if (idx === -1) return null;
  dispositivos[idx] = { ...dispositivos[idx], ...data, id: dispositivos[idx].id };
  return dispositivos[idx];
}

function existeIP(ip, excluirId = null) {
  return dispositivos.find(
    (d) => d.ip === ip && d.id !== parseInt(excluirId)
  );
}

function remove(id) {
  const idx = dispositivos.findIndex((d) => d.id === parseInt(id));
  if (idx === -1) return false;
  dispositivos.splice(idx, 1);
  return true;
}

module.exports = { getAll, getById, existeIP, create, update, remove };