const router = require("express").Router();
const path = require("path")
const PDFDocument = require('pdfkit');
const {createPdfAndSendFile, createPdfAndSendURL, createLocalPDF} = require("./createBook")

router.get("/ping", (req, res) => {
    res.send("OK");
});

//USAR pdfkit
router.get("/generatepdf", createPdfAndSendFile)
router.get("/generatelocal", createLocalPDF)
router.post("/flipbook", (req,res)=>{

    if (!req.body.pdfUrl) {
        return res.sendStatus(400)
    }

    res.render("index.ejs", {pdfSrc: req.body.pdfUrl})
})

//router.get("/generatepdfURL", createPdfAndSendURL)


router.all("/*", (req, res) => {
    res.sendStatus(404)
})
module.exports = router