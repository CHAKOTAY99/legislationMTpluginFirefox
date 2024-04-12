const legislationWebsite = 'https://legislation.mt/eli/';

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "NO"
    });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    // Get the tab details
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        // Check if the tab is in a valid state
        if (chrome.runtime.lastError || !tab || !tab.url) {
            return;
        }

        // Check if the tab matches the URL you're interested in
        if (tab.url.startsWith(legislationWebsite)) {
            chrome.action.setBadgeText({
                text: "YES"
            });
        } else {
            chrome.action.setBadgeText({
                text: "NO"
            });
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId , info) => {

    if (info.status === 'complete') {
        chrome.tabs.get(tabId, (tab) => {
            // Check if the tab matches the URL you're interested in
            if (tab.url.startsWith(legislationWebsite)) {
                chrome.action.setBadgeText({
                    text: "YES"
                });
            } else {
                chrome.action.setBadgeText({
                    text: "NO"
                });
            }
        });
    }
});

// When click run script
chrome.action.onClicked.addListener(async (tab) => {
    
    // Check if the tab matches the URL you're interested in again
    let state = await chrome.action.getBadgeText({ tabId: tab.id });
    if (state === 'YES') {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ["scripts/content.js"]
        });
    }
});

// Await response from script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
   if (message.type === 'pdfUrl') {
       chrome.tabs.create({url: message.data});
   }
});