chrome.action.onClicked.addListener(tab => {
	chrome.tabs.sendMessage(tab.id, { action: 'iconClicked' });
	chrome.action.setBadgeText({ text: '🗸', tabId: tab.id });
	setTimeout(() => {
		chrome.action.setBadgeText({ text: '', tabId: tab.id });
	}, 1_000);
});
