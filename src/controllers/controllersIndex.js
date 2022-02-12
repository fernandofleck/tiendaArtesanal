const path = require("path");

module.exports = {
    index: function (req, res) {
        res.render(path.resolve(__dirname, "..", "views", "index.ejs"));
    }
}