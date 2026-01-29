# waheim-web-browser

A cross-framework web browser utility library for launching URLs with mobile-specific handling.

## Installation

```bash
npm install waheim-web-browser
```

## Usage

### Vanilla JavaScript

```javascript
import { Browser } from 'waheim-web-browser'

const browser = new Browser()
browser.launchUrl('https://example.com', true) // external link
browser.launchUrl('https://example.com') // internal navigation
```

### React

```javascript
import { useBrowser } from 'waheim-web-browser'

function App() {
  const browser = useBrowser()

  return (
    <button onClick={() => browser.launchUrl('https://example.com', true)}>
      Open External Link
    </button>
  )
}
```

### HTML

Include the SDK script in your HTML:

```html
<script src="path/to/lib/sdk.js"></script>
<script>
  const browser = new window.Browser()
  browser.launchUrl('https://example.com', true)
</script>
```

### Other Frameworks

Use the `Browser` class as in the Vanilla JS example.

## API Reference

### `Browser`

#### `launchUrl(url: string, external?: boolean)`

Launches the given URL.

- `url`: The URL to launch
- `external`: If true, opens in a new tab/window with mobile-specific handling (Safari on iOS, new tab on Android)

On mobile devices:
- iOS: External links open in Safari app
- Android: External links open in new tab

## License

MIT
