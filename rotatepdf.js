function rotatePdfTool(container) {
    container.innerHTML = `
        <h2>Rotate PDF</h2>
        <input type="file" accept="application/pdf" id="rotatePdfInput">
        <button onclick="rotatePdf()">Rotate</button>
    `;
}

async function rotatePdf() {
    const { PDFDocument } = window.pdfLib;
    const file = document.getElementById("rotatePdfInput").files[0];
    const buffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(buffer);

    const page = pdfDoc.getPages()[0];
    page.setRotation(degrees(90)); // rotate 90°

    const pdfBytes = await pdfDoc.save();
    downloadPDF(pdfBytes, "rotated.pdf");
}
