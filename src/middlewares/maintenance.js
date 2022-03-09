const path = require("path");

module.exports = (req, res, next) => {
    // Renderizamos la vista de que el sitio está en mantenimiento
    //return res.render(path.resolve(__dirname, "..", "views", "web", "maintenance.ejs"));

    // Otra foma de implementación
    let userCategory = 0; // Declaramos una variable donde asignaremos el tipo de usuario que inicio sesión. Admin = 1.

    if(userCategory != 1) {
        return res.render(path.resolve(__dirname, "..", "views", "web", "maintenance.ejs"));
    };

    next();
};