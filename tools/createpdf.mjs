// createpdf.mjs
// Combined tool functions for: image, jpg, text, voice, and word to PDF

function createPdfTool(tool, container) {
    switch (tool) {
        case 'imageToPdf':
        case 'jpgToPdf':
            renderImageToPdf(container);
            break;
        case 'textToPdf':
            renderTextToPdf(container);
            break;
        case 'voiceToPdf':
            renderVoiceToPdf(container);
            break;
        case 'wordToPdf':
            renderWordToPdf(container);
            break;
        default:
            container.innerHTML = '<p>Unknown PDF creation tool.</p>';
    }
}

function renderImageToPdf(container) {
    container.innerHTML = `
        <h2>Image to PDF</h2>
        <input type="file" accept="image/*" id="imageInput" multiple />
        <button onclick="generateImagePDF()">Convert</button>
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

function renderTextToPdf(container) {
    container.innerHTML = `
        <h2>Text to PDF</h2>
        <textarea id="textInput" rows="10" cols="50" placeholder="Enter text..."></textarea>
        <br><button onclick="generateTextPDF()">Convert</button>
    `;
}

async function generateTextPDF() {
    const { PDFDocument, rgb } = window.pdfLib;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
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

function renderVoiceToPdf(container) {
    container.innerHTML = `
        <h2>Voice to PDF</h2>
        <button onclick="startRecording()">🎤 Start Recording</button>
        <button onclick="stopRecording()">🛑 Stop</button>
        <div id="transcript"></div>
    `;

    window.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.onresult = (event) => {
        let text = '';
        for (let res of event.results) {
            text += res[0].transcript + ' ';
        }
        document.getElementById('transcript').innerText = text;
    };
}

function startRecording() {
    recognition.start();
}

function stopRecording() {
    recognition.stop();
    const text = document.getElementById("transcript").innerText;
    textToPDF(text, "voice-to-pdf.pdf");
}

async function textToPDF(text, filename) {
    const { PDFDocument, rgb } = window.pdfLib;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);

    page.drawText(text, {
        x: 50,
        y: 750,
        size: 12,
        color: rgb(0, 0, 0),
        maxWidth: 500
    });

    const pdfBytes = await pdfDoc.save();
    downloadPDF(pdfBytes, filename);
}

function renderWordToPdf(container) {
    container.innerHTML = `
        <h2>Word to PDF</h2>
        <p>Requires server-side processing.</p>
    `;
}

export { createPdfTool };
