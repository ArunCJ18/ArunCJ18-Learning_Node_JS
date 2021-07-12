//Works as a ROOT DIRECTORY for the path imported js files

const path = require("path");
module.exports = path.dirname(process.mainModule.filename);