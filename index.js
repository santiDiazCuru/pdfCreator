const express = require('express')
const server = express()
const path = require("path")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require('cors');
const router = require("./src/router")

// set the view engine to ejs
server.set('view engine', 'ejs');

server.name = "pdfCreator";

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'views')));
server.use("/", router)


server.listen(3000, () => console.log("Live on port 3000"))