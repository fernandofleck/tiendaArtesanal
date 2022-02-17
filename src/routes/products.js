//Seteo del entorno del archivo para crear la ruta
const express = require("express");
const router = express.Router();
const path = require("path");

//Requerimiento de controlador
const controllersProducts = require(path.resolve(__dirname, "..", "controllers", "controllersProducts.js"));

//Creación de las rutas
router.get("/products", controllersProducts.all);

//Exportamos el módulo
module.exports = router;