function textToPdfTool(container) {
    container.innerHTML = `
        <h2>Text to PDF</h2>
        <textarea id="textInput" rows="10" cols="50" placeholder="Enter text..."></textarea>
        <br><button onclick="generateTextPDF()">Convert</button>
    `;
}

async function generateTextPDF() {
    const { PDFDocument, rgb } = window.pdfLib;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const text = document.getElementById("textInput").value;

    page.drawText(text, {
        x: 50,
        y: 750,
        size: 12,
        color: rgb(0, 0, 0),
        maxWidth: 500
    });

    const pdfBytes = await pdfDoc.save();
    downloadPDF(pdfBytes, "text-to-pdf.pdf");
}
