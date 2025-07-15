async function imageToPdfTool(container) {
    container.innerHTML = `
        <h2>Image to PDF</h2>
        <input type="file" accept="image/*" id="imageInput" multiple />
        <button onclick="generateImagePDF()">Convert</button>
        <div id="pdfOutput"></div>
    `;
}

async function generateImagePDF() {
    const { PDFDocument } = window.pdfLib;
    const input = document.getElementById("imageInput");
    const pdfDoc = await PDFDocument.create();

    for (let file of input.files) {
        const imgBytes = await file.arrayBuffer();
        let image;
        if (file.type.includes("png")) {
            image = await pdfDoc.embedPng(imgBytes);
        } else {
            image = await pdfDoc.embedJpg(imgBytes);
        }
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0 });
    }

    const pdfBytes = await pdfDoc.save();
    downloadPDF(pdfBytes, "image-to-pdf.pdf");
}
