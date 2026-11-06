# Pagewise · Reading Room v7.3.1

Pagewise is a local-first reading PWA for PDF books, book-wide journals, and Apple Pencil annotations. The application UI, CSS, JavaScript, and a developer-only handover are embedded in `index.html`. The PWA also needs its manifest, service worker, icons, and bundled PDF.js files.

## New in 7.3.1

- Fixed: Meaning now uses the sentence to pick the best sense (7.3.0 shipped with this step disconnected). It says "Best guess" and opens Other meanings when the evidence is weak.

## New in 7.3.0

- **Much bigger dictionary** (offline): WordNet 3.0 plus about 125,000 extra headwords and senses from Wordset (modern and literary words, CC BY-SA 4.0) and Webster's 1913 (archaic and literary, public domain), plus irregular forms (ran, children, bought) and archaic words (thee, doth, hitherto). See `vendor/dict/EXTRA-LICENSE.txt`.
- **Meaning that fits the sentence**: Meaning now reads the sentence around the word and shows the sense that fits best (word-overlap, part-of-speech cue and sense order), then Other meanings. This is a heuristic, so it says "Best guess" when unsure.
- **Explain (optional, off by default)**: in Settings, add your own Anthropic API key. Tap Explain in the Meaning box for what the word means in this sentence and a plain-English reading of the sentence. Only that sentence and the book title go to Anthropic, only when you tap Explain. The key stays on this device and is not in backups. Without it, everything else works offline.

## New in 7.2.1

- **Instant meaning**: select a word and tap **Meaning** for a small box with the dictionary definition right by the word, so you keep the thread of the text. Looking up saves nothing. Tap **Catch** in the box (or the chip) if you want the word for later review. **More** opens the full dictionary.

## New in 7.2

- **Word Catcher**: turn on word selection, select a word while reading and tap **Catch**. It saves the word, its sentence and the page, and nothing opens mid-page.
- **Built-in dictionary** (WordNet 3.0, works offline). After the session, define each word in your own words first, then check the dictionary. Greek and Latin root chips suggest a link.
- **Review** shows the sentence with the word blanked out, on the existing 1/3/7/14-day schedule. **Use one word a day**: say it or write it.
- **Calm limits**: up to 3 new words a day. Extra words wait quietly for tomorrow, with no counters.
- Word bank, dictionary lookup (Quick find: type any word), and words survive removing a book. They are included in backups.
- WordNet licence: `vendor/dict/WORDNET-LICENSE.txt`.

## New in 7.1

- **More refined elements**: a fine paper-grain texture, a gradient brand mark and buttons, a segmented library filter, custom checkboxes and dropdown arrows, lit book covers, richer progress bars and keycaps.
- **Sidebar backup status**: the privacy card now shows when you last confirmed a backup and turns amber when it is missing or over a week old. Tap it to export or open Settings.
- **Smarter Quick find**: with nothing typed, it suggests what to do next (continue your core book, resurface due ideas, back up).
- **Time-aware Today greeting** and a **Library hero that takes its tint from your core book's cover**.

## New in 7.0

- **Premium polish across the whole app**: sentence-case labels instead of tracked capitals, larger and more legible small text, one consistent radius and shadow system, a cleaner sidebar with a clear active marker, roomier 40-46px touch targets, library cards where the full title sits above the progress bar, settings controls that no longer truncate, a quieter focus ring, and reduced-motion support. Light and dark themes both updated. No behaviour changes.
- Removed a stray dark frame that appeared around the page after switching views.

## New in 6.9.5

- **Nothing left on screen when tools are hidden**: the small Tools pill is gone. In Full page with Mark on, tap **Hide tools** in the panel; **tap the page with three fingers** to bring the tools back (or press **T** on a keyboard). Three fingers again hides them. Two-finger tap (undo) and finger double-tap (eraser) work as before.

## New in 6.9.4

- **Cleaner Today page**: one clear column on iPad and phone (two on wide screens), a proper Next up card, even spacing between cards, the reading tip right under it, Feelings and Social side by side, and a full-width 12-week activity grid.

## New in 6.9.3

- **Pointer trail**: a thinner, cleaner line with a softer, lighter glow.
- **Hide tools**: in Full page with Mark on, a **Hide tools** button sits in the tools panel. After hiding, tap **Tools** at the bottom to bring the panel back.

## New in 6.9.2

- **Pointer trail**: now one smooth, continuous ribbon that tapers to a point (it was drawn in pieces and looked like a railway track).
- **Full page + Mark together**: turn on Full page and keep marking. The tools dock stays; tap **Hide tools** to give the page the whole screen and **Tools** to bring it back. Pointer, Highlighter and pen all work in Full page.

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
