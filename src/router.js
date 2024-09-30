const router = require("express").Router();
const PDFDocument = require('pdfkit');

router.get("/ping", (req, res) => {
    res.send("OK");
});

//USAR pdfkit
router.get("/generatepdf", async (req, res) => {
const doc = new PDFDocument;
doc.pipe(res); 
doc.text(`Page 0 `);
doc.end()
})
router.all("/*", (req, res) => {
    res.sendStatus(404)
})
module.exports = router