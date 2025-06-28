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

const manifest = deserializeManifest({"hrefRoot":"file:///Users/felix/Documents/GitHub/varsha-website/","cacheDir":"file:///Users/felix/Documents/GitHub/varsha-website/node_modules/.astro/","outDir":"file:///Users/felix/Documents/GitHub/varsha-website/dist/","srcDir":"file:///Users/felix/Documents/GitHub/varsha-website/src/","publicDir":"file:///Users/felix/Documents/GitHub/varsha-website/public/","buildClientDir":"file:///Users/felix/Documents/GitHub/varsha-website/dist/","buildServerDir":"file:///Users/felix/Documents/GitHub/varsha-website/dist/_worker.js/","adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"work/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/work","isIndex":false,"type":"page","pattern":"^\\/work\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work.astro","pathname":"/work","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://varsha.de","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/felix/Documents/GitHub/varsha-website/src/pages/work.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/work@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/felix/Documents/GitHub/varsha-website/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/work@_@astro":"pages/work.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_1k3STRtq.mjs","/Users/felix/Documents/GitHub/varsha-website/node_modules/unstorage/drivers/cloudflare-kv-binding.mjs":"chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/Users/felix/Documents/GitHub/varsha-website/.astro/content-assets.mjs":"chunks/content-assets_XqCgPAV2.mjs","/Users/felix/Documents/GitHub/varsha-website/.astro/content-modules.mjs":"chunks/content-modules_Bvq7llv8.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_DH4aBuN1.mjs","/Users/felix/Documents/GitHub/varsha-website/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_B2DMNCsB.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.2-KLQMe2.css","/_astro/index.Cv8oMmud.css","/_astro/work.l41J6j3-.css","/_astro/work.DU6nBiNo.css","/_routes.json","/about-image.jpg","/contact-image.jpg","/experience-image.jpg","/favicon.svg","/portrait.jpg","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_astro-internal_middleware.mjs","/_worker.js/_noop-actions.mjs","/_worker.js/index.js","/_worker.js/manifest_BOuUogUR.mjs","/_worker.js/manifest_ClkO6Qhr.mjs","/_worker.js/manifest_Cn1DMiCa.mjs","/_worker.js/manifest_DGj4Hf-p.mjs","/_worker.js/manifest_DkYYIEot.mjs","/_worker.js/manifest_DuRI_GWG.mjs","/_worker.js/renderers.mjs","/assets/at-work.jpg","/assets/portrait.jpg","/assets/stock-1.jpg","/assets/stock-2.jpg","/assets/stock-3.jpg","/assets/stock-4.jpg","/pdfs/Dankschreiben_Iyer.pdf","/pdfs/EPSO application overview.pdf","/pdfs/Iyer_Cover_Letter.pdf","/pdfs/Lebenslauf_Varsha.pdf","/pics/11 - Iyer_08_WEBSEITE.jpeg","/pics/23 - Iyer_69_TFP.jpeg","/pics/4 - Iyer_55_TFP.jpeg","/pics/5 - Iyer_09.jpeg","/_worker.js/_astro/index.2-KLQMe2.css","/_worker.js/_astro/index.Cv8oMmud.css","/_worker.js/_astro/work.DU6nBiNo.css","/_worker.js/_astro/work.l41J6j3-.css","/_worker.js/chunks/Icon_BPBhjpnz.mjs","/_worker.js/chunks/Icon_Cv9dm-Vu.mjs","/_worker.js/chunks/Icon_Dpb0NoBe.mjs","/_worker.js/chunks/_@astrojs-ssr-adapter_B36-Egtr.mjs","/_worker.js/chunks/_astro_assets_BvPXNGhj.mjs","/_worker.js/chunks/_astro_assets_COCw9FhH.mjs","/_worker.js/chunks/_astro_assets_bfIIp0sw.mjs","/_worker.js/chunks/_astro_data-layer-content_-d8jJ7xQ.mjs","/_worker.js/chunks/_astro_data-layer-content_DH4aBuN1.mjs","/_worker.js/chunks/astro-designed-error-pages_DdC7zL3l.mjs","/_worker.js/chunks/astro_9YcfedW2.mjs","/_worker.js/chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/_worker.js/chunks/content-assets_XqCgPAV2.mjs","/_worker.js/chunks/content-modules_Bvq7llv8.mjs","/_worker.js/chunks/index_KMw3Xn-i.mjs","/_worker.js/chunks/noop-middleware_BRAuC938.mjs","/_worker.js/chunks/parse_EttCPxrw.mjs","/_worker.js/chunks/path_C-ZOwaTP.mjs","/_worker.js/chunks/sharp_B2DMNCsB.mjs","/_worker.js/chunks/sharp_BsJc7K7v.mjs","/_worker.js/chunks/sharp_CYXNtk-0.mjs","/_worker.js/chunks/work_DedgEUw-.mjs","/_worker.js/chunks/work_DiPOxKtJ.mjs","/_worker.js/chunks/work_p4IR_W-4.mjs","/_worker.js/pages/_image.astro.mjs","/_worker.js/pages/index.astro.mjs","/_worker.js/pages/work.astro.mjs","/assets/backgrounds/bg-footer-dark-1440w.jpg","/assets/backgrounds/bg-footer-dark-800w.jpg","/assets/backgrounds/bg-footer-light-1440w.jpg","/assets/backgrounds/bg-footer-light-800w.jpg","/assets/backgrounds/bg-main-dark-1440w.jpg","/assets/backgrounds/bg-main-dark-800w.jpg","/assets/backgrounds/bg-main-dark.svg","/assets/backgrounds/bg-main-light-1440w.jpg","/assets/backgrounds/bg-main-light-800w.jpg","/assets/backgrounds/bg-main-light.svg","/assets/backgrounds/bg-subtle-1-dark-1440w.jpg","/assets/backgrounds/bg-subtle-1-dark-800w.jpg","/assets/backgrounds/bg-subtle-1-light-1440w.jpg","/assets/backgrounds/bg-subtle-1-light-800w.jpg","/assets/backgrounds/bg-subtle-2-dark-1440w.jpg","/assets/backgrounds/bg-subtle-2-dark-800w.jpg","/assets/backgrounds/bg-subtle-2-light-1440w.jpg","/assets/backgrounds/bg-subtle-2-light-800w.jpg","/assets/backgrounds/noise.png","/_worker.js/chunks/astro/server_CmeRRB0V.mjs","/work/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"68zToEYwEgqT+iZQD9IgUyfNxS0tOLwGM8kAW05StJ8=","sessionConfig":{"driver":"cloudflare-kv-binding","options":{"binding":"SESSION"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/cloudflare-kv-binding_DMly_2Gl.mjs');

export { manifest };
