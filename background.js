// Flashes the dark theme number beside the extension's icon when clicked.
chrome.action.onClicked.addListener(tab => {
	if (tab.url?.endsWith('.pdf')) {
		const tabId = tab.id;
		chrome.tabs.sendMessage(tabId, { action: 'iconClicked' }, response => {
			if (response) {
				chrome.action.setBadgeText({ text: response.text, tabId: tabId });
				chrome.action.setBadgeBackgroundColor({ color: '#00FF00' });
				setTimeout(() => {
					chrome.action.setBadgeText({ text: '', tabId: tabId });
					chrome.action.setBadgeTextColor({ color: null });
				}, 500);
			}
		});
	}
});

// Enables the extension if the tab is a PDF, otherwise disables it.
function toggleExtension(tab, tabId) {
	const isPdf = tab.url.endsWith('.pdf');
	if (isPdf) {
		chrome.tabs.sendMessage(tabId, { action: 'enableDarkTheme' });
		chrome.action.setBadgeText({ text: '', tabId: tabId });
		chrome.action.setBadgeTextColor({ color: null });
		chrome.action.setTitle({ title: 'Click to toggle dark mode!' })
	} else {
		chrome.tabs.sendMessage(tabId, { action: 'disableDarkTheme' });
		chrome.action.setBadgeText({ text: '✗', tabId: tabId });
		chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
		chrome.action.setTitle({ title: 'Night PDF is unavailable on this page.' })
	}
}

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
