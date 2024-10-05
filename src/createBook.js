const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');
const path = require("path")
const fs = require("fs")

let titleText = "Hello I'm a title"
let dateText = "October 2nd, 2024"
let contentText ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae ipsum aliquam, egestas magna vel, consequat nunc. Mauris massa leo, consequat eu consequat in, laoreet eu ipsum. Praesent sed mauris ac eros pellentesque ultrices. Quisque fringilla velit sapien, quis vulputate nisi pellentesque non. Praesent pulvinar libero a ipsum gravida, eget convallis dui egestas. Curabitur molestie, tellus ut euismod congue, sapien nunc sollicitudin nisi, quis lobortis magna nunc a ex. Suspendisse sit amet dapibus diam. Nullam vel metus at mauris tempus accumsan. Ut felis lectus, mollis vel odio sit amet, imperdiet viverra urna. Proin lobortis ligula sed risus iaculis tempor. Nulla facilisi. Praesent gravida sagittis leo, at mollis purus convallis eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae asfgdhfghgdhsgafsfdgfhghfdhsgadhfgh,fdhsgfghfdhsgdhfjghfjdhsghfghjfhdsghfghhgfdh;"
function createPdfAndSendFile(req, res, next) {
    const doc = new PDFDocument({ size: [432, 648], autoFirstPage: false, bufferPages: true, margins: {top: 60, bottom: 30, right: 30, left: 30} });
    let regularMargins = 18
    let gutter = 27
   
    //add first page with no margins!
    doc.addPage({ margin: 0, size: [432, 648] })
    //add cover image  and texts to firstPage
    doc.image(path.resolve(__dirname, 'cover.jpg'), { fit: [432, 648] })
    doc.fontSize(24).fillColor("#fab515").text("Name goes here!!!", 0, 200, { align: "center" })
    doc.fontSize(16).fillColor("#fab515").text("October 2nd 1990", 0, 600, { align: "center" })
    //Add new page
    doc.addPage()
    //Legacywrite logo
    doc.image(path.resolve(__dirname, 'legacyWrite.png'),135, 280)
    doc.addPage()

    doc.fillColor("#000000").fontSize(16).text(titleText,{align: "center"}).moveDown(1)
    doc.fillColor("#000000").fontSize(10).text(dateText,{align: "right"}).moveDown(1)
    doc.fillColor("#000000").fontSize(12).text(contentText, {align:"justify"}).moveDown(3)
    doc.fillColor("#000000").fontSize(16).text(titleText,{align: "center"}).moveDown(1)
    doc.fillColor("#000000").fontSize(10).text(dateText,{align: "right"}).moveDown(1)
    doc.fillColor("#000000").fontSize(12).text(contentText, {align:"justify"}).moveDown(3)
    doc.fillColor("#000000").fontSize(16).text(titleText,{align: "center"}).moveDown(1)
    doc.fillColor("#000000").fontSize(10).text(dateText,{align: "right"}).moveDown(1)
    doc.fillColor("#000000").fontSize(12).text(contentText, {align:"justify"}).moveDown(3)
    doc.fillColor("#000000").fontSize(16).text(titleText,{align: "center"}).moveDown(1)
    doc.fillColor("#000000").fontSize(10).text(dateText,{align: "right"}).moveDown(1)
    doc.fillColor("#000000").fontSize(12).text(contentText, {align:"justify"}).moveDown(3)



    
    
    
    //Function to check the number of pages and add margins accordingly
    // let pages = doc.bufferedPageRange();
    // for (let i = 0; i < pages.count; i++) {
    //   doc.switchToPage(i);
    //     //CODE GOES HERE
    // }
    doc.pipe(res);
    doc.end()
}

function createLocalPDF (req,res,next){
    const doc = new PDFDocument({ size: [432, 648], autoFirstPage: false, bufferPages: true, margins: {top: 60, bottom: 30, right: 30, left: 30} });   
    // doc.on("end", ()=>{
    //     res.sendFile(path.resolve(__dirname, '../file.pdf'))
    // })
    //add first page with no margins!
    doc.addPage({ margin: 0, size: [432, 648] })
    doc.text("holis")
    let stream = fs.createWriteStream('file.pdf')
    doc.pipe(stream);


    //Esta función es para poder ejecutar una acción cuando realmente se crea el pdf localmente
    (async () => {
        await new Promise(resolve => {
          stream.on('finish', resolve);
          doc.end();
        });
        //envia el pdf una vez que me aseguré de que se creó
        res.sendFile(path.resolve(__dirname, '../file.pdf'), ()=>{
            //Elimina el pdf localmente una vez que me aseguré de que se envió
            fs.unlinkSync(path.resolve(__dirname, '../file.pdf'))
        })

      })(); 
}

//Generate a blob
function createPdfAndSendURL(req, res, next) {
    const doc = new PDFDocument;
    const stream = doc.pipe(blobStream());
    doc.text(`Page 0 `);
    doc.end();

    stream.on('finish', function () {
        // get a blob you can do whatever you like with
        const blob = stream.toBlob('application/pdf');
        // or get a blob URL for display in the browser
        const url = stream.toBlobURL('application/pdf');
        res.send(blob)
    })
}

//test this tomorrow

module.exports = { createPdfAndSendFile, createPdfAndSendURL, createLocalPDF }

