const PDFDocument = require('pdfkit');

function createPdf(req,res,next){
const doc = new PDFDocument;
doc.pipe(res); 
doc.text(`Page 0 `);
doc.end()
}

module.exports = createPdf