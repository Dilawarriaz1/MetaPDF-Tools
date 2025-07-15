// editpdfgroup.mjs — Combines Edit PDF, Edit Border, Rotate PDF

function editPdfToolGroup(tool, container) {
    switch (tool) {
        case 'editPdf':
            renderEditPdf(container);
            break;
        case 'editBorderPdf':
            renderEditBorderPdf(container);
            break;
        case 'rotatePdf':
            renderRotatePdf(container);
            break;
        default:
            container.innerHTML = '<p>Unknown edit tool.</p>';
    }
}

function renderEditPdf(container) {
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

function renderEditBorderPdf(container) {
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

function renderRotatePdf(container) {
    container.innerHTML = `
        <h2>Rotate PDF</h2>
        <input type="file" accept="application/pdf" id="rotatePdfInput">
        <button onclick="rotatePdf()">Rotate</button>
    `;
}

async function rotatePdf() {
    const { PDFDocument, degrees } = window.pdfLib;
    const file = document.getElementById("rotatePdfInput").files[0];
    const buffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(buffer);

    const page = pdfDoc.getPages()[0];
    page.setRotation(degrees(90));

    const pdfBytes = await pdfDoc.save();
    downloadPDF(pdfBytes, "rotated.pdf");
}

export { editPdfToolGroup };
