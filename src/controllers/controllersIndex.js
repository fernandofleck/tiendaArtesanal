const path = require("path");
const fs = require("fs");

//Obtención de Datos del archivo Json
let productsIndex = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "productsIndex.json")));

//console.log({productsIndex});

module.exports = {
    index: function (req, res) {
        res.render(path.resolve(__dirname, "..", "views", "index.ejs"), {productsIndex});
    }
}