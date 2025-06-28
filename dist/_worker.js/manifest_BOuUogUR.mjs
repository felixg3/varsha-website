globalThis.process ??= {}; globalThis.process.env ??= {};
import { q as decodeKey } from './chunks/astro/server_CmeRRB0V.mjs';
import './chunks/astro-designed-error-pages_DdC7zL3l.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_BRAuC938.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/felix/Documents/GitHub/varsha-website/","cacheDir":"file:///Users/felix/Documents/GitHub/varsha-website/node_modules/.astro/","outDir":"file:///Users/felix/Documents/GitHub/varsha-website/dist/","srcDir":"file:///Users/felix/Documents/GitHub/varsha-website/src/","publicDir":"file:///Users/felix/Documents/GitHub/varsha-website/public/","buildClientDir":"file:///Users/felix/Documents/GitHub/varsha-website/dist/","buildServerDir":"file:///Users/felix/Documents/GitHub/varsha-website/dist/_worker.js/","adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.2-KLQMe2.css"},{"type":"inline","content":"a[data-astro-cid-balv45lp]{position:relative;display:flex;place-content:center;text-align:center;padding:.56em 2em;gap:.8em;color:var(--accent-text-over);text-decoration:none;line-height:1.1;border-radius:999rem;overflow:hidden;background:var(--gradient-accent-orange);box-shadow:var(--shadow-md);white-space:nowrap}@media (min-width: 20em){a[data-astro-cid-balv45lp]{font-size:var(--text-lg)}}a[data-astro-cid-balv45lp]:after{content:\"\";position:absolute;inset:0;pointer-events:none;transition:background-color var(--theme-transition);mix-blend-mode:overlay}a[data-astro-cid-balv45lp]:focus:after,a[data-astro-cid-balv45lp]:hover:after{background-color:hsla(var(--gray-999-basis),.3)}@media (min-width: 50em){a[data-astro-cid-balv45lp]{padding:1.125rem 2.5rem;font-size:var(--text-xl)}}aside[data-astro-cid-rcdzuq3a]{display:flex;flex-direction:column;align-items:center;gap:2rem;border-top:1px solid var(--gray-800);border-bottom:1px solid var(--gray-800);padding:5rem 1.5rem;background-color:var(--gray-999_40);box-shadow:var(--shadow-sm)}h2[data-astro-cid-rcdzuq3a]{font-size:var(--text-xl);text-align:center;margin-bottom:1rem}.contact-options[data-astro-cid-rcdzuq3a]{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center}.contact-details[data-astro-cid-rcdzuq3a]{text-align:center;color:var(--gray-300);font-size:var(--text-sm)}.contact-details[data-astro-cid-rcdzuq3a] p[data-astro-cid-rcdzuq3a]{margin:.25rem 0}@media (min-width: 50em){aside[data-astro-cid-rcdzuq3a]{padding:7.5rem}h2[data-astro-cid-rcdzuq3a]{font-size:var(--text-3xl)}.contact-options[data-astro-cid-rcdzuq3a]{gap:2rem}}.card[data-astro-cid-lgkm4u2a]{display:grid;grid-template:auto 1fr / auto 1fr;height:11rem;background:var(--gradient-subtle);border:1px solid var(--gray-800);border-radius:.75rem;overflow:hidden;box-shadow:var(--shadow-sm);text-decoration:none;font-family:var(--font-brand);font-size:var(--text-lg);font-weight:500;transition:box-shadow var(--theme-transition)}.card[data-astro-cid-lgkm4u2a]:hover{box-shadow:var(--shadow-md)}.title[data-astro-cid-lgkm4u2a]{grid-area:1 / 1 / 2 / 2;z-index:1;margin:.5rem;padding:.5rem 1rem;background:var(--gray-999);color:var(--gray-200);border-radius:.375rem}img[data-astro-cid-lgkm4u2a]{grid-area:1 / 1 / 3 / 3;width:100%;height:100%;object-fit:cover}@media (min-width: 50em){.card[data-astro-cid-lgkm4u2a]{height:22rem;border-radius:1.5rem}.title[data-astro-cid-lgkm4u2a]{border-radius:.9375rem}}.hero[data-astro-cid-bbe6dxrz]{font-size:var(--text-lg);text-align:center}.title[data-astro-cid-bbe6dxrz],.tagline[data-astro-cid-bbe6dxrz]{max-width:37ch;margin-inline:auto}.title[data-astro-cid-bbe6dxrz]{font-size:var(--text-3xl);color:var(--gray-0)}@media (min-width: 50em){.hero[data-astro-cid-bbe6dxrz]{font-size:var(--text-xl)}.start[data-astro-cid-bbe6dxrz]{text-align:start}.start[data-astro-cid-bbe6dxrz] .title[data-astro-cid-bbe6dxrz],.start[data-astro-cid-bbe6dxrz] .tagline[data-astro-cid-bbe6dxrz]{margin-inline:unset}.title[data-astro-cid-bbe6dxrz]{font-size:var(--text-5xl)}}.grid[data-astro-cid-vc5tsdmu]{display:grid;grid-auto-rows:1fr;gap:1rem;list-style:none;padding:0}.grid[data-astro-cid-vc5tsdmu].small{grid-template-columns:1fr 1fr;gap:1.5rem}.grid[data-astro-cid-vc5tsdmu].small>:last-child:nth-child(odd){grid-column:1 / 3}@media (min-width: 50em){.grid[data-astro-cid-vc5tsdmu]{grid-template-columns:1fr 1fr;gap:4rem}.grid[data-astro-cid-vc5tsdmu].offset{--row-offset: 7.5rem;padding-bottom:var(--row-offset)}.grid[data-astro-cid-vc5tsdmu].offset>:nth-child(odd){transform:translateY(var(--row-offset))}.grid[data-astro-cid-vc5tsdmu].offset>:last-child:nth-child(odd){grid-column:2 / 3;transform:none}.grid[data-astro-cid-vc5tsdmu].small{display:flex;flex-wrap:wrap;justify-content:center;gap:2rem}.grid[data-astro-cid-vc5tsdmu].small>*{flex-basis:20rem}}\nsvg[data-astro-cid-patnjmll]{vertical-align:middle;width:var(--size, 1em);height:var(--size, 1em)}\n"}],"routeData":{"route":"/work","isIndex":false,"type":"page","pattern":"^\\/work\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work.astro","pathname":"/work","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.2-KLQMe2.css"},{"type":"external","src":"/_astro/index.Cv8oMmud.css"},{"type":"inline","content":"svg[data-astro-cid-patnjmll]{vertical-align:middle;width:var(--size, 1em);height:var(--size, 1em)}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://varsha.de","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/felix/Documents/GitHub/varsha-website/src/pages/work.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/work@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/felix/Documents/GitHub/varsha-website/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/work@_@astro":"pages/work.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BOuUogUR.mjs","/Users/felix/Documents/GitHub/varsha-website/node_modules/unstorage/drivers/cloudflare-kv-binding.mjs":"chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/Users/felix/Documents/GitHub/varsha-website/.astro/content-assets.mjs":"chunks/content-assets_XqCgPAV2.mjs","/Users/felix/Documents/GitHub/varsha-website/.astro/content-modules.mjs":"chunks/content-modules_Bvq7llv8.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_-d8jJ7xQ.mjs","/Users/felix/Documents/GitHub/varsha-website/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CYXNtk-0.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.2-KLQMe2.css","/_astro/index.Cv8oMmud.css","/_routes.json","/about-image.jpg","/contact-image.jpg","/experience-image.jpg","/favicon.svg","/portrait.jpg","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_astro-internal_middleware.mjs","/_worker.js/_noop-actions.mjs","/_worker.js/index.js","/_worker.js/manifest_ClkO6Qhr.mjs","/_worker.js/manifest_Cn1DMiCa.mjs","/_worker.js/manifest_DGj4Hf-p.mjs","/_worker.js/manifest_DkYYIEot.mjs","/_worker.js/manifest_DuRI_GWG.mjs","/_worker.js/renderers.mjs","/assets/at-work.jpg","/assets/portrait.jpg","/assets/stock-1.jpg","/assets/stock-2.jpg","/assets/stock-3.jpg","/assets/stock-4.jpg","/pdfs/Dankschreiben_Iyer.pdf","/pdfs/EPSO application overview.pdf","/pdfs/Iyer_Cover_Letter.pdf","/pdfs/Lebenslauf_Varsha.pdf","/pics/11 - Iyer_08_WEBSEITE.jpeg","/pics/23 - Iyer_69_TFP.jpeg","/pics/4 - Iyer_55_TFP.jpeg","/pics/5 - Iyer_09.jpeg","/_worker.js/_astro/index.2-KLQMe2.css","/_worker.js/_astro/index.Cv8oMmud.css","/_worker.js/chunks/Icon_BPBhjpnz.mjs","/_worker.js/chunks/Icon_Dpb0NoBe.mjs","/_worker.js/chunks/_@astrojs-ssr-adapter_B36-Egtr.mjs","/_worker.js/chunks/_astro_assets_COCw9FhH.mjs","/_worker.js/chunks/_astro_assets_bfIIp0sw.mjs","/_worker.js/chunks/_astro_data-layer-content_-d8jJ7xQ.mjs","/_worker.js/chunks/astro-designed-error-pages_DdC7zL3l.mjs","/_worker.js/chunks/astro_9YcfedW2.mjs","/_worker.js/chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/_worker.js/chunks/content-assets_XqCgPAV2.mjs","/_worker.js/chunks/content-modules_Bvq7llv8.mjs","/_worker.js/chunks/index_KMw3Xn-i.mjs","/_worker.js/chunks/noop-middleware_BRAuC938.mjs","/_worker.js/chunks/parse_EttCPxrw.mjs","/_worker.js/chunks/path_C-ZOwaTP.mjs","/_worker.js/chunks/sharp_BsJc7K7v.mjs","/_worker.js/chunks/sharp_CYXNtk-0.mjs","/_worker.js/chunks/work_DedgEUw-.mjs","/_worker.js/chunks/work_p4IR_W-4.mjs","/_worker.js/pages/_image.astro.mjs","/_worker.js/pages/index.astro.mjs","/_worker.js/pages/work.astro.mjs","/assets/backgrounds/bg-footer-dark-1440w.jpg","/assets/backgrounds/bg-footer-dark-800w.jpg","/assets/backgrounds/bg-footer-light-1440w.jpg","/assets/backgrounds/bg-footer-light-800w.jpg","/assets/backgrounds/bg-main-dark-1440w.jpg","/assets/backgrounds/bg-main-dark-800w.jpg","/assets/backgrounds/bg-main-dark.svg","/assets/backgrounds/bg-main-light-1440w.jpg","/assets/backgrounds/bg-main-light-800w.jpg","/assets/backgrounds/bg-main-light.svg","/assets/backgrounds/bg-subtle-1-dark-1440w.jpg","/assets/backgrounds/bg-subtle-1-dark-800w.jpg","/assets/backgrounds/bg-subtle-1-light-1440w.jpg","/assets/backgrounds/bg-subtle-1-light-800w.jpg","/assets/backgrounds/bg-subtle-2-dark-1440w.jpg","/assets/backgrounds/bg-subtle-2-dark-800w.jpg","/assets/backgrounds/bg-subtle-2-light-1440w.jpg","/assets/backgrounds/bg-subtle-2-light-800w.jpg","/assets/backgrounds/noise.png","/_worker.js/chunks/astro/server_CmeRRB0V.mjs"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"7v3E/pHH4nM98g1MOv5sbquttnx6Dvx3Ts8KKdKkW3Y=","sessionConfig":{"driver":"cloudflare-kv-binding","options":{"binding":"SESSION"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/cloudflare-kv-binding_DMly_2Gl.mjs');

export { manifest };
