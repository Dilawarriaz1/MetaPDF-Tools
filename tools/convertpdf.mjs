// convertpdf.js — Combines PDF to Text and PDF to Excel

function convertPdfTool(tool, container) {
    switch (tool) {
        case 'pdfToText':
            renderPdfToText(container);
            break;
        case 'pdfToExcel':
            renderPdfToExcel(container);
            break;
        default:
            container.innerHTML = '<p>Unknown conversion tool.</p>';
    }
}

function renderPdfToText(container) {
    container.innerHTML = `
        <h2>PDF to Text</h2>
        <input type="file" accept="application/pdf" id="pdfInput">
        <div id="textOutput"></div>
    `;

    document.getElementById('pdfInput').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            fullText += content.items.map(item => item.str).join(' ') + '\\n';
        }
        document.getElementById('textOutput').innerText = fullText;
    });
}

function renderPdfToExcel(container) {
    container.innerHTML = `
        <h2>PDF to Excel</h2>
        <p>This feature requires backend processing.</p>
    `;
}
