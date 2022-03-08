//Seteo del entorno del archivo para crear la ruta
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

//Asignamos nombre del archivo y donde lo vamos a guardar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "..", "..", "public", "img", "products"));
    },
    filename: (req, file, cb) => {
        console.log(req.category);
        cb(null, "product-" + Date.now() + path.extname(file.originalname));//path.extname: obtiene la extensión del archivo. ​ file:​ es donde estan todos los datos del archivo que viaja desde el front hacia el back. Originalname: es el nombre original del archivo.
    }
});

const upload = multer({storage: storage});

//Requerimiento de controlador
const controllersAdmin = require(path.resolve(__dirname, "..", "controllers", "controllersAdmin.js"));

//Creación de las rutas
router.get("/admin", controllersAdmin.page);
router.get("/admin/create", controllersAdmin.create);
router.post("/admin/create", upload.any("img"), controllersAdmin.save);
router.get("/productAd/:id", controllersAdmin.show);
router.get("/admin/delete/:id", controllersAdmin.delete);
router.get("/admin/edit/:id", controllersAdmin.edit);
router.put("/admin/edit/:id", upload.any("img"), controllersAdmin.updateProducts);

//Exportamos el módulo
module.exports = router;