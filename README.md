# Pagewise · Reading Room v6.3

Pagewise is a local-first reading PWA for PDF books, book-wide journals, and Apple Pencil annotations. The application UI, CSS, JavaScript, and a developer-only handover are embedded in `index.html`. The PWA also needs its manifest, service worker, icons, and bundled PDF.js files.

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
