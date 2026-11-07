/* Pagewise service worker · v7.3.7
   Contract (see handover): cache `pagewise-reading-room-<app version>`; cache-first assets; network-first navigation with a
   3.5 s timeout and an offline fallback to the cached shell; updates wait for the user (no skipWaiting on install, only on the
   SKIP_WAITING message); only caches with the Pagewise prefix are ever read or deleted, because other apps can share this origin.
   Release rule: VERSION must change every release, otherwise the browser sees an identical sw.js and never offers an update. */
const VERSION='7.3.7';
const PREFIX='pagewise-reading-room-';
const CACHE=PREFIX+VERSION;
const NAV_TIMEOUT=3500;

/* Must all download or install fails and is retried: the shell and the paired PDF.js main + worker. */
const SHELL=[
  './','./index.html','./manifest.webmanifest',
  './icons/icon.svg','./icons/icon-192.png','./icons/icon-512.png',
  './icons/icon-maskable-192.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png',
  './vendor/pdfjs/pdf.mjs','./vendor/pdfjs/pdf.worker.mjs'
];
/* Warmed in the background after install. Failure never fails install; anything missed is cached on first use. */
const OPTIONAL=[
  './vendor/pdfjs/iccs/CGATS001Compat-v2-micro.icc',
  './vendor/pdfjs/standard_fonts/FoxitDingbats.pfb',
  './vendor/pdfjs/standard_fonts/FoxitFixed.pfb',
  './vendor/pdfjs/standard_fonts/FoxitFixedBold.pfb',
  './vendor/pdfjs/standard_fonts/FoxitFixedBoldItalic.pfb',
  './vendor/pdfjs/standard_fonts/FoxitFixedItalic.pfb',
  './vendor/pdfjs/standard_fonts/FoxitSerif.pfb',
  './vendor/pdfjs/standard_fonts/FoxitSerifBold.pfb',
  './vendor/pdfjs/standard_fonts/FoxitSerifBoldItalic.pfb',
  './vendor/pdfjs/standard_fonts/FoxitSerifItalic.pfb',
  './vendor/pdfjs/standard_fonts/FoxitSymbol.pfb',
  './vendor/pdfjs/standard_fonts/LiberationSans-Bold.ttf',
  './vendor/pdfjs/standard_fonts/LiberationSans-BoldItalic.ttf',
  './vendor/pdfjs/standard_fonts/LiberationSans-Italic.ttf',
  './vendor/pdfjs/standard_fonts/LiberationSans-Regular.ttf',
  './vendor/pdfjs/wasm/jbig2.wasm',
  './vendor/pdfjs/wasm/jbig2_nowasm_fallback.js',
  './vendor/pdfjs/wasm/openjpeg.wasm',
  './vendor/pdfjs/wasm/openjpeg_nowasm_fallback.js',
  './vendor/pdfjs/wasm/qcms_bg.wasm',
  './vendor/pdfjs/wasm/quickjs-eval.js',
  './vendor/pdfjs/wasm/quickjs-eval.wasm',
  './vendor/dict/wordnet.txt.gz',
  './vendor/dict/lexicon-extra.txt.gz'
];

const fresh=url=>new Request(url,{cache:'reload'});

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await Promise.all(SHELL.map(async url=>{const res=await fetch(fresh(url));if(!res.ok)throw new Error(url+' '+res.status);await cache.put(url,res)}));
    /* non-blocking: not awaited, so a slow dictionary download cannot hold the update back */
    Promise.allSettled(OPTIONAL.map(async url=>{if(await cache.match(url))return;const res=await fetch(fresh(url));if(res.ok)await cache.put(url,res)}));
  })());
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    for(const name of await caches.keys())if(name.startsWith(PREFIX)&&name!==CACHE)await caches.delete(name);
    await self.clients.claim();
  })());
});

self.addEventListener('message',event=>{if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting()});

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin||url.pathname.endsWith('/sw.js'))return;
  event.respondWith(req.mode==='navigate'?navigate(req):asset(req));
});

async function navigate(req){
  const cache=await caches.open(CACHE);
  const net=fetch(req.url,{cache:'no-cache'}).then(res=>{if(res.ok&&!res.redirected)cache.put('./index.html',res.clone());return res});
  net.catch(()=>{});
  const late=new Promise(done=>setTimeout(()=>done(null),NAV_TIMEOUT));
  try{const res=await Promise.race([net,late]);if(res)return res}catch(e){}
  return (await cache.match('./index.html'))||net;
}

async function asset(req){
  const cache=await caches.open(CACHE);
  const hit=await cache.match(req);
  if(hit)return hit;
  const res=await fetch(req);
  if(res.status===200&&res.type==='basic')cache.put(req,res.clone());
  return res;
}
