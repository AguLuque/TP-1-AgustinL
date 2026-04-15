const express = require("express");
const logger = require("./src/middlewares/logger");
const auth = require("./src/middlewares/auth");
const dispositivosRouter = require("./src/routes/dispositivos");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);    
app.use(auth);          

app.use("/dispositivos", dispositivosRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    servicio: "Registro de Dispositivos en Red",
    version: "1.0.0",
    endpoints: [
      "GET    /dispositivos",
      "GET    /dispositivos?estado=activo",
      "GET    /dispositivos/:id",
      "POST   /dispositivos",
      "PUT    /dispositivos/:id",
      "DELETE /dispositivos/:id",
    ],
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

// ── Arrancar servidor ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  API corriendo en http://localhost:${PORT}`);
  console.log(`    Authorization header requerido: 1234\n`);
});
