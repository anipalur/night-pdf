const darkPdfDivStyles = `
	pointer-events: none;
	width: 100vw;
	height: 100vh;
	mix-blend-mode: difference;
	z-index: 1;
`;

const backgroundColours = ['#e6e6e6', '#cccccc', 'transparent'];
let currentBackgroundColour = 0;

const darkPdfDiv = document.createElement('div');
darkPdfDiv.style.cssText = darkPdfDivStyles + `background-color: ${backgroundColours[currentBackgroundColour]};`;
document.body.appendChild(darkPdfDiv);

chrome.runtime.onMessage.addListener(request => {
	if (request.action === 'iconClicked') {
		currentBackgroundColour = (currentBackgroundColour + 1) % backgroundColours.length;
		darkPdfDiv.style.backgroundColor = backgroundColours[currentBackgroundColour];
	}
});
