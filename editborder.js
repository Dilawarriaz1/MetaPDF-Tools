function editBorderPdfTool(container) {
    container.innerHTML = `
        <h2>Edit Border in PDF</h2>
        <input type="file" accept="application/pdf" id="borderPdfInput">
        <button onclick="addBorderToPdf()">Add Border</button>
    `;
}

async function addBorderToPdf() {
    const { PDFDocument, rgb } = window.pdfLib;
    const file = document.getElementById("borderPdfInput").files[0];
    const buffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(buffer);

    const pages = pdfDoc.getPages();
    for (const page of pages) {
        const { width, height } = page.getSize();
        page.drawRectangle({
            x: 10, y: 10,
            width: width - 20,
            height: height - 20,
            borderColor: rgb(0, 0, 0),
            borderWidth: 2
        });
    }

    const pdfBytes = await pdfDoc.save();
    downloadPDF(pdfBytes, "bordered.pdf");
}
