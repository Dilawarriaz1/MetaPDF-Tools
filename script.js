// script.js — Loads grouped tools dynamically

function loadCombinedTool(file, toolName) {
    const container = document.getElementById("toolContainer");
    container.innerHTML = `<p>Loading ${toolName.replace(/([A-Z])/g, ' $1')}...</p>`;

    import(`./tools/${file}.mjs`).then(module => {
        const toolFunction = {
            createpdf: module.createPdfTool,
            convertpdf: module.convertPdfTool,
            editpdfgroup: module.editPdfToolGroup,
            compresspdf: module.compressPdfTool
        }[file];

        if (toolFunction) {
            toolFunction(toolName, container);
        } else {
            container.innerHTML = '<p>Tool not found.</p>';
        }
    }).catch(err => {
        container.innerHTML = `<p>Error loading tool: ${err.message}</p>`;
    });
}

function showHelp() {
    alert("Use the toolbar to select a tool.\nEach tool helps you convert or modify PDF documents.");
}

// ✅ Make functions available globally for HTML onclick handlers
window.loadCombinedTool = loadCombinedTool;
window.showHelp = showHelp;
