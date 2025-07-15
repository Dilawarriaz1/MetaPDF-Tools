function voiceToPdfTool(container) {
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
        // Add save to PDF button here
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
