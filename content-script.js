const darkPdfDivStyles = `
	pointer-events: none;
	width: 100vw;
	height: 100vh;
	mix-blend-mode: difference;
	z-index: 1;
`;

// Modify this array to customise the dark themes.
const backgroundColours = ['#e6e6e6', '#cccccc', '#333333', '#1a1a1a'];
backgroundColours.push('transparent');
let currentBackgroundColour = 0;

const darkPdfDiv = document.createElement('div');
darkPdfDiv.style.cssText = darkPdfDivStyles + `background-color: ${backgroundColours[currentBackgroundColour]};`;
darkPdfDiv.style.display = 'none';
document.body.appendChild(darkPdfDiv);

// Enables the extension and applies a dark theme if the tab is a PDF, otherwise disables it.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'iconClicked') {
		currentBackgroundColour = (currentBackgroundColour + 1) % backgroundColours.length;
		darkPdfDiv.style.backgroundColor = backgroundColours[currentBackgroundColour];
		sendResponse({ text: ((currentBackgroundColour + 1) === backgroundColours.length) ? 'Off' : String(currentBackgroundColour + 1) });
	} else if (request.action === 'enableDarkTheme') {
		darkPdfDiv.style.display = 'block';
		sendResponse({ text: ((currentBackgroundColour + 1) === backgroundColours.length) ? 'Off' : String(currentBackgroundColour + 1) });
	} else if (request.action === 'disableDarkTheme') {
		darkPdfDiv.style.display = 'none';
	}
});
