const path = require("path");
const fs = require("fs");

//Obtención de Datos del archivo Json
let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "products.json")));

module.exports = {
    page: function (req, res) {
        res.render(path.resolve(__dirname, "..", "views", "admin", "admin.ejs"), {products});
    },
    create: function (req, res) {
        res.render(path.resolve(__dirname, "..", "views", "admin", "create.ejs"));
    },
    save: function (req, res) {

        //Aqui se indica el formato de como se va a guardar la información
        let newProduct = {
            id: req.body.id,
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            img: req.body.img + ".jpg",
            autor: req.body.autor,
            autorLink: req.body.autorLink 
        }

        //Agregamos al array el nuevo producto
        products.push(newProduct);

        //Convertimos el array en un string e indicamos que se guarde un producto bajo el otro con "null, 2"
        let newProductsJson = JSON.stringify(products, null, 2);

        //Sobreescribimos el archivo Json guardando el nuevo producto
        fs.writeFileSync(path.resolve(__dirname,"..", "data", "products.json"), newProductsJson);

        //Redireccionamos a la vista del administrador
        res.redirect("/admin");
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