// tokens.json + components/bundle.css → dist/tokens.css, dist/salesone-ui.css(:root), dist/salesone-ui.host.css(:host, Shadow DOM용), dist/salesone-ui.js
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const T = JSON.parse(readFileSync(new URL('../tokens.json', import.meta.url), 'utf8'));
const bundle = readFileSync(new URL('../components/bundle.css', import.meta.url), 'utf8');
const first = T.color.themes[0].id;
const v = [];
for (const t of T.color.tokens) v.push(`--${t.name}:${typeof t.value === 'string' ? t.value : t.value[first]}`);
for (const fam of Object.keys(T)) if (!['name','version','meta','color','type'].includes(fam) && T[fam]?.tokens) for (const t of T[fam].tokens) v.push(`--${t.name}:${t.value}`);
for (const [k, s] of Object.entries(T.type.families)) v.push(`--font-${k}:${s}`);
const vars = sel => `${sel}{\n  ${v.join(';\n  ')};\n}\n`;
mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
const head = `/* ${T.name} — generated from tokens.json. 직접 고치지 말고 tokens.json·components/bundle.css를 고친 뒤 npm run build */\n`;
const FONT = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css';
writeFileSync(new URL('../dist/tokens.css', import.meta.url), head + vars(':root'));
writeFileSync(new URL('../dist/salesone-ui.css', import.meta.url), head + `@import url("${FONT}");\n` + vars(':root') + bundle);
const hostCss = vars(':host') + bundle;
writeFileSync(new URL('../dist/salesone-ui.host.css', import.meta.url), head + hostCss);
// 북마클릿에 그대로 붙여 쓰는 JS: SalesoneUI.mount('__xxx_panel') → { host, root }
const js = `/* ${T.name} — generated. */
window.SalesoneUI = (function () {
  var CSS = ${JSON.stringify(hostCss)};
  var FONT = ${JSON.stringify(FONT)};
  function font() { if (document.getElementById('__so_font')) return; var l = document.createElement('link'); l.id = '__so_font'; l.rel = 'stylesheet'; l.href = FONT; document.head.appendChild(l); }
  function mount(id, html) {
    font(); var old = document.getElementById(id); if (old) old.remove();
    var host = document.createElement('div'); host.id = id;
    host.style.cssText = 'position:fixed;top:72px;right:16px;z-index:2147483000;';
    var root = host.attachShadow({ mode: 'open' });
    root.innerHTML = '<style>' + CSS + '</style>' + (html || '');
    document.body.appendChild(host); return { host: host, root: root };
  }
  return { css: CSS, font: font, mount: mount, version: ${JSON.stringify(String(T.version))} };
})();
`;
writeFileSync(new URL('../dist/salesone-ui.js', import.meta.url), js);
console.log('built', v.length, 'tokens');
