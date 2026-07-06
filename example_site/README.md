# SeekLocateDisplay — worked example

A tiny, self-contained site ("The Cocoa Companion") showing how to add local,
in-page search with **seek_locate_display.js**. No server and no build step —
everything runs in the browser.

## Run it

Open `index.html` in a browser. It works from the file system, but a couple of
browsers are fussy about `file://`, so a local server is the reliable way:

```
cd this-folder
python3 -m http.server 8000
# then visit http://localhost:8000/
```

Type in the box, or tap one of the example queries. Click a result to jump to
that section on its page — the search terms are highlighted where you land.
Press Back and your query, results, and scroll position are restored.

## The files

| File | Role |
| --- | --- |
| `index.html` | The search page. Holds the widget container and the one `new SeekLocateDisplay({…})` call. |
| `search-data.js` | **The data.** The list of pages and sections to search. This is the file you edit to change what's indexed. |
| `seek_locate_display.js` | The library. |
| `sld.css` | The widget's styling. |
| `site.css` | Styling for the surrounding demo site (not the widget). |
| `seek_locate_display_highlight.js` | Companion highlighter. On a page reached from a result it marks the matched terms and scrolls to the first match inside the section you navigated to. Injects its own default styles; `site.css` restyles the marks to match the site. |
| `pages/*.html` | The content pages that get searched. Each section has an `id` matching `search-data.js`. |

## How it fits together

1. `search-data.js` sets `window.SLD_PAGES` — an array of pages, each with
   `url`, `title`, and `sections` (`{ id, heading, text }`).
2. `index.html` loads that data and the library, then calls
   `new SeekLocateDisplay({ container: '#search', pages: window.SLD_PAGES })`.
3. Clicking a result navigates to `<page url>#<section id>`, so every section
   `id` in the data must exist as an `id="…"` on the target page.
4. The widget also appends `?sld-hl=<query>` to result links;
   `seek_locate_display_highlight.js` on each content page reads that and
   marks the matches. Tweak it by setting `window.SeekLocateDisplayHighlightOptions`
   (e.g. `param`, `scrollOffset`, `cleanUrl`) before the script loads.

## Make it yours

- **Change what's searched:** edit `search-data.js`. Point `url` at your pages,
  and give each section an `id` that exists on the page.
- **Restyle the box:** edit `sld.css`.
- **Change behaviour:** pass options to the constructor — e.g. `minChars`,
  `maxResults`, `excerptLength`, `placeholder`, `persist`, or an `onNavigate`
  callback. See the comment block at the top of `seek_locate_display.js` for
  the full list and the query syntax (`"quoted phrase"`, `AND`, `OR`).
