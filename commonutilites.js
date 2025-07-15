function downloadPDF(bytes, filename) {
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

async function loadTool(toolName) {
    const container = document.getElementById("toolContainer");
    const toolModule = await import(`./tools/${toolName}.js`);
    toolModule[`${toolName}Tool`](container);
}
