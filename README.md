# SeekLocateDisplay

A zero-dependency, full-text search library for local HTML pages. Drop it into any static site to get instant, client-side search with no backend, no build step, and no external services.

- **Indexes your content** — sections grouped by page, weighted by heading vs. body
- **Renders a search UI** — input bar, results grouped by page, click-to-navigate
- **Highlights matches** on destination pages via a lightweight companion script
- **Persists state** — restores your query and scroll position after navigating back
- **Works everywhere** — CommonJS, AMD, and browser global; dark mode included

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Page Definitions](#page-definitions)
- [Configuration Options](#configuration-options)
- [Query Syntax](#query-syntax)
- [Destination Page Highlighting](#destination-page-highlighting)
  - [Highlight Script Options](#highlight-script-options)
- [API Reference](#api-reference)
- [Persistence Behaviour](#persistence-behaviour)
- [Styling](#styling)
- [Browser Support](#browser-support)
- [License](#license)

---

## Installation

Copy `seek_locate_display.js` (and optionally `seek_locate_display_highlight.js`) into your project. No package manager or bundler is required.

```html
<script src="seek_locate_display.js"></script>
```

Or load it as a CommonJS/AMD module:

```js
const SeekLocateDisplay = require('./seek_locate_display.js');
```

---

## Quick Start

**1. Add a container element to your search page:**

```html
<div id="my-search"></div>
```

**2. Initialise the library with your page data:**

```html
<script src="seek_locate_display.js"></script>
<script>
  const sld = new SeekLocateDisplay({
    container: '#my-search',
    pages: [
      {
        url: 'guide/intro.html',
        title: 'Introduction',
        sections: [
          { id: 'overview', heading: 'Overview',      text: 'A brief overview of the project.' },
          { id: 'setup',    heading: 'Setup',         text: 'Installation steps go here.' },
        ]
      },
      {
        url: 'guide/advanced.html',
        title: 'Advanced Usage',
        sections: [
          { id: 'config',   heading: 'Configuration', text: 'All available options.' },
        ]
      }
    ]
  });
</script>
```

That's it. The library injects its own styles, renders the search bar, and handles everything from input to navigation.

---

## Page Definitions

Each object in the `pages` array describes one HTML page and its searchable sections.

```js
{
  url: 'path/to/page.html',   // Relative (or absolute) URL of the page
  title: 'Page Title',         // Displayed in the results header
  sections: [
    {
      id: 'anchor-id',         // Maps to a URL fragment: page.html#anchor-id
      heading: 'Section Title', // Searchable; weighted more heavily than body text
      text: 'Body text…'        // Searchable body content
    }
  ]
}
```

**Multi-paragraph sections:** Separate paragraphs with `\n` inside `text`. Each matched paragraph is shown as its own excerpt in the results, joined with ` | `, so users see exactly which part of a long section matched.

```js
{
  id: 'features',
  heading: 'Features',
  text: 'First feature paragraph.\nSecond feature paragraph.\nThird feature paragraph.'
}
```

---

## Configuration Options

Pass any of these as properties of the options object to `new SeekLocateDisplay({...})`.

| Option | Type | Default | Description |
|---|---|---|---|
| `container` | `string \| Element` | `'#seeklocatedisplay'` | CSS selector or DOM element for the search widget root |
| `pages` | `Array` | `[]` | Page definitions (see [Page Definitions](#page-definitions)) |
| `placeholder` | `string` | `'Search…'` | Input placeholder text |
| `minChars` | `number` | `2` | Minimum characters before a search runs |
| `maxResults` | `number` | `50` | Maximum number of result hits returned |
| `excerptLength` | `number` | `140` | Character length of each result snippet |
| `headingWeight` | `number` | `4` | Score multiplier for heading matches vs. body matches |
| `debounceMs` | `number` | `120` | Milliseconds to wait after the last keystroke before running search |
| `noResultsText` | `string` | `'No results found.'` | Message shown when the query returns no hits |
| `styles` | `boolean` | `true` | Inject the built-in CSS automatically |
| `onNavigate` | `function \| null` | `null` | Custom navigation handler `fn(url)`. Defaults to `window.location.href = url` |
| `persist` | `boolean` | `true` | Persist the search query in the URL and scroll position in `sessionStorage` |
| `persistParam` | `string` | `'q'` | URL query-string parameter name used to store the search text |
| `highlightOnNavigate` | `boolean` | `true` | Append the search query to result links so destination pages can highlight matches |
| `highlightParam` | `string` | `'ls-hl'` | URL query-string parameter name passed to destination pages for highlighting |

---

## Query Syntax

The search box supports a simple but powerful query language.

| Syntax | Behaviour |
|---|---|
| `chocolate` | Substring match — finds "chocolate" anywhere, including inside longer words like "chocolatey" |
| `"chocolate"` | Whole-word match — won't match inside "chocolatey" or "hotchocolate" |
| `"dark chocolate"` | Exact phrase, whole-word at both ends |
| `milk chocolate` | AND — both terms must be present in the same section |
| `"milk chocolate" OR "dark"` | OR — either side may match |
| `cake OR cookie "with nuts"` | OR of two AND-groups |

> **Note:** `OR` must be uppercase. Lowercase `or` is treated as a regular search word, so natural-language queries still work as expected.

Results are ranked by score. Heading matches are weighted more heavily than body matches (controlled by `headingWeight`). Multiple occurrences of a term in the same section further increase its score.

---

## Destination Page Highlighting

Include `seek_locate_display_highlight.js` on every page that can appear as a search result. When a user clicks a result, the search query is passed to the destination page via a URL parameter (`?ls-hl=...`). The highlight script then:

1. Reads the query from the URL
2. Walks the page's visible text nodes
3. Wraps matches in `<mark class="ls-page-highlight">`
4. Scrolls to the first match **within the navigated `#section`** (if present), not just the first match anywhere on the page
5. Falls back to the section element itself if the section contains no match
6. Falls back to the first match on the whole page if there is no `#section` anchor

**Add it just before `</body>` on every content page:**

```html
<script src="seek_locate_display_highlight.js"></script>
```

**With custom options:**

```html
<script>
  window.SeekLocateDisplayHighlightOptions = {
    param: 'ls-hl',
    scroll: true,
    cleanUrl: true
  };
</script>
<script src="seek_locate_display_highlight.js"></script>
```

The highlight script uses the same query grammar as the search box, including AND, OR, whole-word quotes, and Unicode-aware word boundary detection.

### Highlight Script Options

| Option | Type | Default | Description |
|---|---|---|---|
| `param` | `string` | `'ls-hl'` | URL parameter to read the query from |
| `scroll` | `boolean` | `true` | Auto-scroll to the first match |
| `scrollBehavior` | `string` | `'smooth'` | `scroll()` behaviour — `'smooth'` or `'instant'` |
| `scrollOffset` | `number` | `80` | Pixel gap above the scrolled-to match (useful for sticky headers) |
| `cleanUrl` | `boolean` | `false` | Strip the highlight param from the URL after highlighting |
| `markClassName` | `string` | `'ls-page-highlight'` | CSS class applied to every `<mark>` element |
| `activeClassName` | `string` | `'ls-page-highlight-active'` | Additional CSS class applied to the first (scrolled-to) `<mark>` |
| `skipTags` | `string[]` | `['script', 'style', ...]` | Tag names whose contents are never highlighted |
| `minTextLength` | `number` | `1` | Minimum text node length to consider for highlighting |

#### Math content exclusion

The highlight script automatically skips two types of math delimiters to avoid false matches inside mathematical notation:

- `\INWEBMATH( ... \INWEBMATH)` — can span multiple text nodes
- `$$ ... $$` — confined to a single text node

---

## API Reference

### `new SeekLocateDisplay(options)`

Creates and mounts a search widget. Throws if `container` is not found in the DOM.

```js
const sld = new SeekLocateDisplay({ container: '#search', pages: [...] });
```

### `sld.addPage(page)`

Adds a single page to the search index without replacing existing entries. Useful for lazy-loading content.

```js
sld.addPage({
  url: 'new-page.html',
  title: 'New Page',
  sections: [{ id: 'intro', heading: 'Introduction', text: '...' }]
});
sld.refresh(); // re-run the current query to include new content
```

### `sld.setPages(pages)`

Replaces the entire search index with a new set of pages.

```js
sld.setPages(updatedPagesArray);
sld.refresh();
```

### `sld.refresh()`

Re-runs the current search query against the index. Call after `addPage()` or `setPages()` to update the visible results.

---

## Persistence Behaviour

When `persist: true` (the default), SeekLocateDisplay keeps the search experience coherent across navigation:

**Query persistence (URL):** The search text is written to the URL as `?q=...` on every keystroke (not debounced, to avoid a race with clicking results). When the user presses Back, the browser restores the URL, the library reads the parameter, and the search box and results are restored automatically.

**Scroll persistence (`sessionStorage`):** The scroll position is saved at the exact moment the user clicks a result. On return, the library polls until the page is tall enough to accommodate the target scroll position, then restores it. This handles pages where content renders asynchronously.

**Back/forward cache (`bfcache`):** The library listens for `pageshow` with `event.persisted === true` to handle browser-level page caching (including a Safari-specific repaint workaround for frozen input fields).

Each SeekLocateDisplay instance scopes its `sessionStorage` key to its container selector, so multiple instances on the same site don't interfere with each other.

---

## Styling

Built-in styles are injected automatically when `styles: true` (the default). The widget uses BEM-style class names prefixed with `ls-` so they are unlikely to conflict with existing styles.

Full dark mode support is included via `@media (prefers-color-scheme: dark)`.

To apply your own styles, set `styles: false` and target the classes below:

| Class | Element |
|---|---|
| `.ls-wrap` | Root container |
| `.ls-bar` | Search input bar |
| `.ls-input` | The `<input>` element |
| `.ls-clear` | Clear button |
| `.ls-results` | Results list container |
| `.ls-stats` | Result count line |
| `.ls-page` | Per-page result group |
| `.ls-page-header` | Page group header (title + URL) |
| `.ls-hit` | Individual result row |
| `.ls-hit-title` | Section heading in a result row |
| `.ls-hit-snippet` | Excerpt text in a result row |
| `.ls-hit-anchor` | Destination URL shown below the snippet |
| `.ls-empty` | "No results" message |

Highlight script classes (on destination pages):

| Class | Element |
|---|---|
| `mark.ls-page-highlight` | Every highlighted match |
| `mark.ls-page-highlight-active` | The first (scrolled-to) match |

---

## Browser Support

SeekLocateDisplay targets modern browsers. It uses:

- `URLSearchParams` / `URL` (with silent no-ops in unsupported environments)
- `sessionStorage` (degrades silently in private mode or when unavailable)
- `window.history.replaceState`
- `requestAnimationFrame`
- Unicode property escapes (`/\p{L}/u`) with an ASCII fallback for older engines
- `document.createTreeWalker` (highlight script)

No polyfills are required for any evergreen browser (Chrome, Firefox, Safari, Edge).

---

## License

MIT — free to use, modify, and redistribute.
