chrome.action.onClicked.addListener(tab => {
	const isPdf = tab.url?.endsWith('.pdf');
	if (isPdf) {
		chrome.tabs.sendMessage(tab.id, { action: 'iconClicked' });
		chrome.action.setBadgeText({ text: '🗸', tabId: tab.id });
		chrome.action.setBadgeBackgroundColor({ color: '#00FF00' });
		setTimeout(() => {
			chrome.action.setBadgeText({ text: '', tabId: tab.id });
			chrome.action.setBadgeTextColor({ color: null });
		}, 500);
	}
});

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

chrome.tabs.onActivated.addListener(activeInfo => {
	currentTabId = activeInfo.tabId;
	chrome.tabs.get(currentTabId, tab => {
		if (tab && tab.url) {
			toggleExtension(tab, currentTabId);
		}
	});
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === 'complete' && tab.url) {
		toggleExtension(tab, tabId);
	}
});
