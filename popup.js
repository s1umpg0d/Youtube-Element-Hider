/* popup.js */
console.log("popup.js loaded");

const elements = [
    "progressBar", "playButton", "volumeSlider", "settingsButton", "fullscreenButton", "castButton"
];

document.addEventListener("DOMContentLoaded", () => {
    // Load the settings when the popup is opened
    chrome.storage.sync.get(elements, (settings) => {
        elements.forEach(id => {
            document.getElementById(id).checked = settings[id] || false; // Set checkbox based on saved setting
        });
    });
    
    // Save the settings when a checkbox is changed
    elements.forEach(id => {
        document.getElementById(id).addEventListener("change", (event) => {
            chrome.storage.sync.set({ [id]: event.target.checked });  // Save the new checkbox state
        });
    });

    const buttons = {
        progressBar: document.getElementById("progressBar"),
        playButton: document.getElementById("playButton"),
        volumeSlider: document.getElementById("volumeSlider"),
        settingsButton: document.getElementById("settingsButton"),
        fullscreenButton: document.getElementById("fullscreenButton"),
        castButton: document.getElementById("castButton"),
        feedFilter: document.getElementById("feedFilter") // New button for Feed Filter
    };

    // Load settings from storage and update button states
    chrome.storage.sync.get(null, (settings) => {
        for (const [key, button] of Object.entries(buttons)) {
            if (button) {
                const isHidden = settings[key];
                button.className = isHidden ? "hidden" : "visible";
                button.textContent = isHidden ? `${button.textContent} (Hidden)` : button.textContent.replace(" (Hidden)", "");
            }
        }
    });

    // Add click event listeners to toggle visibility
    for (const [key, button] of Object.entries(buttons)) {
        if (button) {
            button.addEventListener("click", () => {
                chrome.storage.sync.get(null, (settings) => {
                    const isHidden = !settings[key];
                    settings[key] = isHidden;
                    chrome.storage.sync.set(settings, () => {
                        button.className = isHidden ? "hidden" : "visible";
                        button.textContent = isHidden ? `${button.textContent} (Hidden)` : button.textContent.replace(" (Hidden)", "");
                    });
                });
            });
        }
    }
});
