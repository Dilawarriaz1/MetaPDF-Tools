function loadTool(toolName) {
    document.getElementById("toolContainer").innerHTML = `<p>Loading ${toolName.replace(/([A-Z])/g, ' $1')}...</p>`;
    // Dynamically load the tool (placeholder for now)
}

function showHelp() {
    alert("Use the toolbar to select a tool.\nEach tool helps you convert or modify PDF documents.");
}
