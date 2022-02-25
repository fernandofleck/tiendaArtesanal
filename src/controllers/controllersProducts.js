const path = require("path");
const fs = require("fs");

//Obtención de Datos del archivo Json
let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "products.json")));

//console.log({productsIndex});

module.exports = {
    index: function (req, res) {
        res.render(path.resolve(__dirname, "..", "views", "products", "products.ejs"), {products});
    },
    show: (req, res) => {
        //res.send(req.params.id);
        // Se declara variable que se enviara a la vista
        let productChoice;

        // Se busca y almacena el producto deseado
        products.forEach(product => {
            if(product.id == req.params.id) {
                productChoice = product;
            }
        });

        // Enviamos la vista con los datos del producto
        res.render(path.resolve(__dirname, "..", "views", "products", "product.ejs"), {productChoice});
    }
}