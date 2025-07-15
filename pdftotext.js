async function pdfToTextTool(container) {
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
            fullText += content.items.map(item => item.str).join(' ') + '\n';
        }
        document.getElementById('textOutput').innerText = fullText;
    });
}
