// Helper functions
function isPdfUrl(url) {
    return url?.endsWith('.pdf');
}

function updateBadge(tabId, text, backgroundColour) {
    chrome.action.setBadgeText({ text, tabId });
    chrome.action.setBadgeBackgroundColor({ color: backgroundColour });
}

function updateTitle(title) {
    chrome.action.setTitle({ title });
}

function updateIcon(tabId, responseText) {
	if (responseText === 'Off') {
		updateBadge(tabId, responseText, '#FF0000');
		updateTitle('Night PDF is off.');
	} else {
		updateBadge(tabId, `T${responseText}`, '#e6e6e6');
		updateTitle(`Dark theme ${responseText} is currently active.`);
	}
}

// Enables the extension if the tab is a PDF, otherwise disables it.
function toggleExtension(tab, tabId) {
	if (isPdfUrl(tab.url)) {
		chrome.tabs.sendMessage(tabId, { action: 'enableDarkTheme' }, response => {
			if (response) {
				updateIcon(tabId, response.text);
			}
		});
	} else {
		chrome.tabs.sendMessage(tabId, { action: 'disableDarkTheme' });
		updateBadge(tabId, 'Off', '#FF0000');
		updateTitle('Night PDF is unavailable on this page.');
	}
}


// Flashes the dark theme number beside the extension's icon when clicked.
chrome.action.onClicked.addListener(tab => {
	if (isPdfUrl(tab.url)) {
		const tabId = tab.id;
		chrome.tabs.sendMessage(tabId, { action: 'iconClicked' }, response => {
			if (response) {
				updateIcon(tabId, response.text);
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
