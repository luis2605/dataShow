if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const c=e=>i(e,t),d={module:{uri:t},exports:o,require:c};s[t]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-17a8ec80.js",revision:null},{url:"assets/index-1aac4c68.css",revision:null},{url:"index.html",revision:"9a5ddf7805dc48a530867d1a9aaa6c66"},{url:"registerSW.js",revision:"b27cff0c80fc06a3d4c8ea62ddea5878"},{url:"dataShowLogo.png",revision:"69839be9e33d71b4155e06657dc04b09"},{url:"manifest.webmanifest",revision:"596ba5a26e83b0403138df917f9c3051"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
