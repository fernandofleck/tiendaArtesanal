const path = require("path");
const fs = require("fs");

//Obtención de Datos del archivo Json
let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "products.json")));

//console.log({productsIndex});

module.exports = {
    index: function (req, res) {
        res.render(path.resolve(__dirname, "..", "views", "products", "products.ejs"), {products});
    }
}