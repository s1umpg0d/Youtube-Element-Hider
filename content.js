/* content.js */
function applySettings(settings) {
    const elements = {
        progressBar: ".ytp-progress-bar",  // Progress bar selector
        playButton: ".ytp-play-button",    // Play button selector
        volumeSlider: ".ytp-volume-area",  // Updated selector for the volume slider
        settingsButton: ".ytp-settings-button", // Settings button
        fullscreenButton: ".ytp-fullscreen-button", // Fullscreen button
        castButton: ".ytp-remote-button.ytp-button", // Simplified selector for Play on TV button
        feedFilter: "ytd-feed-filter-chip-bar-renderer" // Feed filter element
    };

    // Loop through elements and hide/show based on settings
    for (const [key, selector] of Object.entries(elements)) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.display = settings[key] ? "none" : "";  // Hide or show the element based on the setting
        }
    }
}

// Initially apply the settings when the page loads
chrome.storage.sync.get(null, applySettings);

// Re-apply the settings when the storage changes (e.g., when a checkbox is toggled)
chrome.storage.onChanged.addListener((changes) => {
    chrome.storage.sync.get(null, applySettings);
});
