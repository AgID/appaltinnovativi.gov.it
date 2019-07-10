var PDFDocument = require('pdfkit');
var fs = require('fs');

function generatePdf(docDefinition) {
    return new Promise((resolve, reject) => {
        try {
            var doc = new PDFDocument();

            doc.pipe(fs.createWriteStream('output.pdf'))

            //Creazione documento e titolo
            doc
                .font('fonts/titillium/TitilliumWeb-BoldItalic.ttf')
                .fontSize(20)
                .text('Dettaglio Fabbisogno', {
                    align: 'center'
                })

            doc
                .moveDown(1.5)
                .fontSize(16)

            doc = loadDocFields(doc, docDefinition.propertyArray)

            let chunks = [];
            doc.on('data', (chunk) => {
                chunks.push(chunk);
            });

            doc.on('end', () => {
                const result = Buffer.concat(chunks);
                resolve('data:application/pdf;base64,' + result.toString('base64'));
            });
            doc.end();
        } catch (err) {
            reject(err);
        }
    });
}

module.exports.generatePdf = generatePdf

function loadDocFields(doc, docDef) {
    if (JSON.parse(docDef).length) {
        docDef = JSON.parse(docDef)
        docDef.forEach(element => {
            doc
                .font('fonts/titillium/TitilliumWeb-SemiBoldItalic.ttf')
                .text(element.label + ': ', {
                    width: 410,
                    align: 'left'
                });

            doc
                .font('fonts/titillium/TitilliumWeb-Light.ttf')
                .text(element.value, {
                    width: 410,
                    align: 'left'
                })
                .moveDown(0.5);
        });
    }

    return doc
}