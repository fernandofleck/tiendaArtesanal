//Seteo del entorno del archivo para crear la ruta
const express = require("express");
const router = express.Router();
const path = require("path");

//Requerimiento de controlador
const controllersAdmin = require(path.resolve(__dirname, "..", "controllers", "controllersAdmin.js"));

//Creación de las rutas
router.get("/admin", controllersAdmin.page);
router.get("/admin/create", controllersAdmin.create);
router.post("/admin/create", controllersAdmin.save);

//Exportamos el módulo
module.exports = router;