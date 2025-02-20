# Night PDF

This repository hosts the source code for the Night PDF extension, a simple Chrome extension that applies a dark theme to your PDF viewer.

<p align="center">
  <img src="res/cover-image.png" width="75%" alt="The GPLv3 logo." />
</p>

This extension is a fork of [PDF Dark Theme][pdf-dark-theme-link] by [Chris Straka][chris-straka-link] with some extra functionality, specifically:

- Toggling between multiple dark themes
- Works on local and online PDFs

## Using and Customising the Extension

To use the extension, [download and install the extension](https://dev.to/ben/how-to-install-chrome-extensions-manually-from-github-1612 "Learn how to download and install extensions from GitHub.") first.

To customise the dark themes, simply modify the colours in the `backgroundColours` array in content-script.js.

## Attribution

- Thank you to [Chris Straka][chris-straka-link] for his original [PDF Dark Theme][pdf-dark-theme-link] extension!
- Thank you to [Tabler Icons](https://tabler.io/icons "Learn more about Tabler Icons.") for the Night PDF icon!
- Thank you to [File Examples](https://file-examples.com "Learn more about File Examples.") for the sample PDF shown in the cover image.

## Licences

<img src="res/gpl-v3-logo.png" width="128px" alt="The GPLv3 logo." />

**Copyright &copy; 2025 Anitej Palur**  
The source code for this extension is licensed under a [GNU GPLv3 License](https://www.gnu.org/licenses/gpl-3.0.html "Learn more about the GNU GPLv3 License.").

See [LICENSE](/LICENSE "View the LICENSE file.") for more information.

[pdf-dark-theme-link]: https://github.com/chris-straka/pdf-dark-theme "View the PDF Dark Theme GitHub repository."
[chris-straka-link]: https://cstraka.dev "Learn more about Chris Straka."
