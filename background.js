// Helper functions
function isPdfUrl(url) {
    return url?.endsWith('.pdf');
}

function updateBadge(tabId, text, backgroundColour) {
    chrome.action.setBadgeText({ text, tabId });
    chrome.action.setBadgeBackgroundColor({ color: backgroundColour });
}

// Enables the extension if the tab is a PDF, otherwise disables it.
function toggleExtension(tab, tabId) {
	if (isPdfUrl(tab.url)) {
		chrome.tabs.sendMessage(tabId, { action: 'enableDarkTheme' });
		updateBadge(tabId, '', null);
		chrome.action.setTitle({ title: 'Click to toggle dark mode!' })
	} else {
		chrome.tabs.sendMessage(tabId, { action: 'disableDarkTheme' });
		updateBadge(tabId, '✗', '#FF0000');
		chrome.action.setTitle({ title: 'Night PDF is unavailable on this page.' })
	}
}


// Flashes the dark theme number beside the extension's icon when clicked.
chrome.action.onClicked.addListener(tab => {
	if (isPdfUrl(tab.url)) {
		const tabId = tab.id;
		chrome.tabs.sendMessage(tabId, { action: 'iconClicked' }, response => {
			if (response) {
				updateBadge(tabId, response.text, '#00FF00');
				setTimeout(() => { updateBadge(tabId, '', null); }, 500);
			}
		});
	}
});


// Listens for when the user navigates to a different tab.
chrome.tabs.onActivated.addListener(activeInfo => {
	currentTabId = activeInfo.tabId;
	chrome.tabs.get(currentTabId, tab => {
		if (tab && tab.url) {
			toggleExtension(tab, currentTabId);
		}
	});
});

// Listens for when the user updates the current tab (e.g. clicking a link to a different website).
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === 'complete' && tab.url) {
		toggleExtension(tab, tabId);
	}
});
