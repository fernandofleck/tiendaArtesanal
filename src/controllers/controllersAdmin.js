const path = require("path");
const fs = require("fs");

module.exports = {
    page: function (req, res) {
        //Obtención de Datos del archivo Json
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "products.json")));
        
        res.render(path.resolve(__dirname, "..", "views", "admin", "admin.ejs"), {products});
    },
    create: function (req, res) {
        //Obtención de Datos del archivo Json
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "products.json")));

        res.render(path.resolve(__dirname, "..", "views", "admin", "create.ejs"));
    },
    save: function (req, res) {
        //Obtención de Datos del archivo Json
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "products.json")));

        //Aqui se indica el formato de como se va a guardar la información
        let newProduct = {
            id: req.body.id,
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            img: req.files[0].filename,
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
        //Obtención de Datos del archivo Json
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "products.json")));

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
    },
    delete: (req, res) => {
        //Obtención de Datos del archivo Json
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "products.json")));

        // Guardamos el producto a borrar
        const productDeleteId = req.params.id;

        // Filtramos el arreglo original para eliminar el producto a borrar
        const filteredProducts = products.filter(product => product.id != productDeleteId);

        // Se convierte el arreglo en un string y se indica que un producto se guarda bajo el otro con null, 2.
        let productsToSave = JSON.stringify(filteredProducts, null, 2);

        // Se sobreescribe el archivo JSON
        fs.writeFileSync(path.resolve(__dirname, "..", "data", "products.json"), productsToSave);

        // Redireccionamos a la vista
        res.redirect("/admin");
    },
    edit: (req, res) => {
        //Obtención de Datos del archivo Json
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "products.json")));

        // Guardamos el producto a editar
        const productEditId = req.params.id;

        // Buscamos en el arreglo original el producto a editar
        const editProduct = products.find(product => product.id == productEditId);

        // Renderizamos y enviamos datos a la vista
        res.render(path.resolve(__dirname, "..", "views", "admin", "edit.ejs"), {editProduct});
    },
    updateProducts: (req, res) => {
        //Obtención de Datos del archivo Json
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "products.json")));

        // Guardamos el producto editado
        //const productEditId = req.params.id;

        console.log("REQ.BODY.IMGACTUAL: "+ req.body.imgActual);
        console.log("RRR ");
        console.log("REQ.BODY.IMG: "+ req.body.img);

        //Utilizamos un if ternario para saber si se ha enviado una nueva imagen. Si está llegando una imagen nueva en el req.file => guardar el nombre nuevo. En caso de que no haya entrado nada se mantiene la misma imagen anterior.
        req.body.img = req.files[0] ? req.files[0].filename : req.body.img;

        // Actualizamos el producto en la lista
        let productsUpdate = products.map(product => {
            if(product.id == req.body.id){
                product = req.body;
            };
            return product;
        });

        // Se convierte el arreglo en un string y se indica que un producto se guarda bajo el otro con null, 2.
        let productsToSave = JSON.stringify(productsUpdate, null, 2);

        // Se sobreescribe el archivo JSON
        fs.writeFileSync(path.resolve(__dirname, "..", "data", "products.json"), productsToSave);

        // Redireccionamos a la vista
        res.redirect("/admin");
    }
}