const path = require("path");
//const fs = require("fs");

module.exports = {
    login: function (req, res) {
        res.render(path.resolve(__dirname, "..", "views", "users", "login.ejs"));
    },
    register: function (req, res) {
        res.render(path.resolve(__dirname, "..", "views", "users", "register.ejs"));
    }
}