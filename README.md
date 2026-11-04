# Pagewise · Reading Room v6.9.1

Pagewise is a local-first reading PWA for PDF books, book-wide journals, and Apple Pencil annotations. The application UI, CSS, JavaScript, and a developer-only handover are embedded in `index.html`. The PWA also needs its manifest, service worker, icons, and bundled PDF.js files.

## New in 6.9.1

- **Progress saves reliably**: a failed save is retried (including after iPad Safari drops its storage connection), a cover problem can no longer stop reading progress from saving, and the message now names the error.
- **Covers stay**: a new book keeps its cover after reload, a one-off display glitch no longer erases a saved cover, and any missing cover is rebuilt from the book's first page when the app starts.

## New in 6.9

- **Pointer tool**: show your place without marking the page, in journals and when marking up a book. Choose **Trail** (a continuous line that fades behind the pen) or **Dot** (a plain dot that follows the pen). Pick its colour with the swatches and its size with the slider; nothing is saved to the page.

## New in 6.8

- **Self-healing covers**: a cover is checked when it is made, and if one ever fails to display, Pagewise drops it and quietly rebuilds it from the book's first page.

## New in 6.7

- **Book covers stay**: the cover is now saved as plain image text instead of a binary file, so it no longer disappears after the first reload on iPad. Covers saved by earlier versions are converted automatically; one that cannot be recovered is rebuilt the next time you open that book.

## New in 6.6

- **No flash between pages**: each page is prepared off-screen and swapped in at once, so the previous page stays until the next one is ready (most noticeable in night mode and on image-heavy books).
- **Instant page turns**: the next page is prepared in the background while you read, and recent pages are kept, so turning forward or back is immediate.
- **Calmer layout changes**: rotating the iPad re-renders the page once; small changes such as Safari's toolbar collapsing no longer redraw it.
- **Faster repeat search**: the first search in a book reads its text once; later searches are near-instant.
- **Lighter opening of large PDFs**: the file is no longer duplicated in memory while it opens.
- **Keyboard**: Home and End jump to the first and last page; the slider shows the percent while you drag.

Testing for 6.6 used headless Chromium with a 300-page synthetic book. Please validate feel on your iPad.

## New in 6.5

- **Smoother pen**: journal writing now uses every Pencil sample the iPad reports, predicts the pen tip, paints once per frame, and keeps finished ink in a cached layer so a full page no longer slows writing down. Saving waits for a pause instead of running after every stroke.
- **Pencil**: the pencil nib is a continuous graphite line again (it had rendered as a faint dotted trail). Reader marks share it.
- **Journal full screen** now works, and also asks the browser to hide its own chrome. Escape or the same button exits.
- **Reader footer**: Full page and Mark no longer overlap the next-page arrow on iPad portrait or smaller landscape widths.
- **Journal usability**: undo and redo dim when there is nothing to do; Next becomes "New page +" on the last page (and rests on an empty last page); the placeholder hides once the page has content; on iPad portrait the page strip sits under a wider paper; turning Finger off no longer lets the page scroll under the Pencil; rotating the iPad or entering full screen keeps unsaved strokes.
- **Pencil quick switch**: apps on the web cannot receive the Apple Pencil's own double-tap, so tap twice with a finger of your other hand while you write to switch between eraser and your tool (or choose previous tool, undo, or off). A two-finger tap undoes. Both are customisable in Settings, work in journals and page marks, and E on a keyboard does the same eraser toggle.

Testing for 6.5 used headless Chromium with a synthetic PDF and synthetic pen events at iPad, phone and landscape sizes. Please validate feel on your iPad with Apple Pencil.

## New in 6.4

- **iPad portrait reader**: the page slider, page count, Full page, and Mark controls reflow onto separate rows so they no longer collide.
- **Book journal**: added a full-screen writing mode that hides the shelf and page-list chrome, enlarges the paper, and exits with Escape or the same control.
- **Apple Pencil**: drawing no longer depends on finger mode when Safari reports a Pencil as a narrow, pressure-bearing touch pointer; drawing tools suppress page-panning gestures on the paper, and graphite strokes are darker.

## New in 6.2

- **Reader**: quieter, Kindle/Apple Books-style chrome, a true warm paperwhite page tone, a thinner progress bar, and a tidier floating Mark dock.
- **Journal**: GoodNotes-style floating toolbar, a desk behind a larger paper, and a cleaner page sidebar.

## New in 6.1

- **Understanding checks**: while you read, a gentle card appears at randomly timed moments asking you to explain what you just read. Answer I get it, Not sure · re-read, or Write it. Change how often (or turn it off) in Settings. Counts are kept per day.

## New in 6.0

- **Quick find** (Ctrl/Cmd+K, or the search button): jump to any book, journal or command.
- **Calmer interface**: refreshed rail and bottom navigation, simpler reader header and footer, a Mark dock that wraps instead of scrolling, and tuned iPad, phone and dark-mode layouts.
- **Smarter Today**: next-up card, 7-day rhythm chart, 12-week heatmap, pace estimates and finish-session stats.
- **Ink colours** in the reader and journals, go-to-page, and finer zoom steps.
- **Safer**: back button works as expected, in-app confirmations, backup reminder only when it matters, offline-first service worker with a timeout, separate maskable icons, and shortcuts to Today and Journals.
- Fixes: Aa panel crash, reader close state, session summary newline and notes-cache bug, recall pause, keystroke writes, library search churn.

All v6.0 testing used headless Chromium with a synthetic PDF. Please validate on your iPad with Apple Pencil.

## Publish on GitHub Pages

1. Put the **contents** of this folder at the repository root so `index.html` is at the root.
2. In GitHub, open **Settings → Pages** and publish from the main branch and `/ (root)`.
3. Open the HTTPS site in Safari on iPad, then choose **Share → Add to Home Screen**.
4. Import PDFs from Files. Pagewise stores data in that browser on that device.

The service worker caches the app shell and local PDF.js files after the first online load. Updates wait for your choice; activating one reloads open Pagewise tabs together so the PDF.js library and worker stay paired. HTTPS is required for installation and offline support.

## Reading and journals

- Add PDFs, try a short audition, and choose a core book when you are ready.
- Each book has one shared, paged journal. Typed writing and journal Pencil strokes stay together on the same journal pages. Templates, bookmarks, editable strokes, undo/redo, and autosave are included.
- PDF-page Pencil marks, underlines, and highlights stay attached to their PDF pages. They do not appear in journal exports. Full library backups preserve both the PDF files and their page annotations.
- **Export journal** creates shareable HTML pages combining typed writing and Pencil strokes from the journal. It does not include PDF-page annotations.
- Reader appearance offers Original, White, Paperwhite, Warm, and Night tones, plus brightness, warmth, page fit, and optional text selection. Full-page mode uses the available screen area. PDF text search scans the book locally, reports matching pages, jumps to a result, and briefly highlights matching text. Scanned pages without embedded text need OCR, which is not included. Fixed-layout PDFs do not reflow like EPUB books.
- App dark mode is independent from page tone. Pencil ink changes for contrast; highlighter remains yellow.
- Reading sessions can carry a book-wide focus question and next-time cue. Finish session opens a voluntary recall and reflection form saved to the book journal. Due ideas can be deferred for 24 hours.
- Today includes active-reading estimates, recall, reflection, feelings check-ins, and a small social-practice prompt.

## Backups and storage

Use **Settings & backup → Export** for a compressed backup of books, journals, PDF-page annotations, review items, settings, progress, and daily logs. Export validates per-PDF SHA-256 digests, manifest counts and total PDF bytes, duplicate journal/review IDs, and a SHA-256 checksum over the complete uncompressed JSON payload. After export, confirm only if you have saved the downloaded file; the browser cannot verify its final destination. Compressed `.json.gz` backups can be restored from the file picker on iPad. Restore is a merge: records with matching IDs are replaced, while unrelated local books and dates stay. The app reports validated counts before it commits the restore in one IndexedDB transaction.

To keep iPad memory use bounded, backups have a 160 MB combined source-data limit, a 220 MB file limit, and a 256 MB expanded-data limit. Encoding is sequential to avoid holding multiple PDF conversions at once. Split a large library into smaller backups. Backups include PDFs and personal notes, are not encrypted, and should be stored privately.

Browser storage is origin-specific. Moving from an earlier app or `file://` to GitHub Pages creates a new origin; re-import PDFs or restore a backup there. The earlier v1 app had no backup exporter, so its old logs and notes cannot be transferred automatically.

## Technical details and limits

- The app entry is one HTML file with inline CSS and JavaScript. There are no remote app scripts, fonts, analytics, accounts, or upload endpoints.
- Mozilla PDF.js is bundled locally with its worker and supporting assets. See `vendor/pdfjs/LICENSE`.
- App data stays in browser IndexedDB. Version 5 stores PDF bytes separately from book metadata, so page turns and shelf changes do not rewrite PDF files. The migration is performed in the IndexedDB upgrade transaction; a failed upgrade rolls back. Notes are indexed by book and type, and historical strokes are loaded only for the open book journal. There is no cross-device sync or application-level encryption.
- OCR is not implemented. Native PDF.js text search and optional text selection are available for PDFs with embedded text; Pencil strokes are overlays and do not edit the PDF file. Duplicate PDF detection uses SHA-256 when the secure browser context provides Web Crypto.
- Browser storage limits vary. Export backups periodically. Reading metrics are per book and intentionally remain in the existing book details view. Apple Pencil latency, gestures, backup recovery, and Safari layout still need hands-on verification on the target iPad and iPadOS version.

## Static handover

`index.html` contains an inert `text/plain` developer handover (spec, rules, changelog). It holds no personal data. Keep personal PDFs and backups out of the repository.
