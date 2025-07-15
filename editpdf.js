function editPdfTool(container) {
    container.innerHTML = `
        <h2>Edit PDF</h2>
        <input type="file" accept="application/pdf" id="pdfEditInput">
        <textarea id="editArea" placeholder="New content..."></textarea>
        <button onclick="applyPdfEdit()">Apply</button>
    `;
}

async function applyPdfEdit() {
    const { PDFDocument } = window.pdfLib;
    const file = document.getElementById("pdfEditInput").files[0];
    const text = document.getElementById("editArea").value;

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const page = pdfDoc.getPages()[0];

    page.drawText(text, { x: 50, y: 700 });

    const pdfBytes = await pdfDoc.save();
    downloadPDF(pdfBytes, "edited.pdf");
}
