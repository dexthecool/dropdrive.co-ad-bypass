chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "injectScript") {
        const uuid = message.uuid;

        // Inject the script into the current tab
        chrome.scripting.executeScript({
            target: {tabId: sender.tab.id},
            files: ['inject.js']
        });
    }
});
