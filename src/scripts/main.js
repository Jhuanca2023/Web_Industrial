import { gsap } from 'gsap';
import { initMotion } from './motion.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { PRODUCTS, CATS } from '../data/products.js';
gsap.registerPlugin(ScrollTrigger);
document.documentElement.classList.add('js');

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canAnimate = !reduce;
  const hoverFine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const catLabel = (id) => CATS.find((c) => c.id === id)?.label || "";

  const state = { cat: "todos", q: "", sort: "rel", current: PRODUCTS[0], quote: [] };
  try {
    const saved = JSON.parse(localStorage.getItem('krono:quote') || '[]');
    if (Array.isArray(saved)) state.quote = [...new Set(saved.filter(id => byId(id)))];
  } catch { /* Storage is optional in private or restricted browser sessions. */ }
  let lenis = null;

  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const escapeHTML = (s) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const cover = (p) => (p.cover ? ` class="is-cover"` : "");

  function scrollToEl(el, offset = -90) {
    if (lenis) lenis.scrollTo(el, { offset });
    else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }

  /* ---------- Toast ---------- */
  const toast = $("#toast");
  let toastT;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove("is-on"), 2200);
  }

  /* ---------- Catálogo ---------- */
  const grid = $("#grid");
  const chips = $("#chips");
  chips.innerHTML = CATS.map((c) => `<button class="chip" type="button" data-cat="${c.id}" aria-pressed="${c.id === state.cat}">${c.label}</button>`).join("");

  function filtered() {
    const q = norm(state.q.trim());
    let list = PRODUCTS.filter((p) => (state.cat === "todos" || p.cat === state.cat) &&
      (!q || norm([p.name, p.sub, p.short, catLabel(p.cat), ...p.uses].join(" ")).includes(q)));
    if (state.sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "es"));
    return list;
  }

  function renderGrid(animate = true) {
    const list = filtered();
    grid.innerHTML = list.map((p) => `
      <li>
        <article class="pcard" data-id="${p.id}">
          <div class="pcard__media">
            <button class="add${state.quote.includes(p.id) ? " is-added" : ""}" type="button" data-add="${p.id}" aria-label="${state.quote.includes(p.id) ? "Quitar de" : "Agregar a"} la cotización: ${p.name}" aria-pressed="${state.quote.includes(p.id)}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">${state.quote.includes(p.id) ? '<path d="M5 12.5l4.500 4.500L19 7"/>' : '<path d="M12 5v14M5 12h14"/>'}</svg>
            </button>
            <img src="${p.img}" alt="${p.name}"${cover(p)} loading="lazy">
          </div>
          <div class="pcard__body">
            <h3>${p.name}</h3>
            <p>${p.short}</p>
            <button class="view" type="button" data-view="${p.id}">Ver detalle</button>
          </div>
        </article>
      </li>`).join("");
    $("#empty").hidden = list.length > 0;
    const qtxt = state.q.trim() ? ` para «${state.q.trim()}»` : "";
    $("#result").textContent = `${list.length} ${list.length === 1 ? "producto" : "productos"}${qtxt}`;
    $$(".chip", chips).forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.cat === state.cat)));
    if (animate && canAnimate) {
      gsap.fromTo(".pcard", { y: 36, autoAlpha: 0, scale: 0.96 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.55, stagger: 0.05, ease: "power3.out", overwrite: true, clearProps: "transform" });
    }
    if (ScrollTrigger) ScrollTrigger.refresh();
  }

  function setFilter(cat) { state.cat = cat; renderGrid(); }

  chips.addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (b) setFilter(b.dataset.cat); });
  $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; renderGrid(); });
  $("#clearSearch").addEventListener("click", () => { state.q = ""; state.cat = "todos"; searchInput.value = ""; renderGrid(); });
  $$("[data-filter]").forEach((a) => a.addEventListener("click", () => { state.q = ""; searchInput.value = ""; setFilter(a.dataset.filter); }));

  grid.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) { toggleQuote(add.dataset.add); return; }
    const card = e.target.closest(".pcard");
    if (card && (e.target.closest(".pcard__media") || e.target.closest("[data-view]"))) selectProduct(card.dataset.id, true);
  });

  /* inclinación suave de la imagen con el puntero */
  if (canAnimate && hoverFine) {
    grid.addEventListener("pointermove", (e) => {
      const m = e.target.closest(".pcard__media");
      if (!m) return;
      const r = m.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to($("img", m), { x: x * 14, y: y * 14, rotate: x * 5, duration: 0.5, ease: "power3.out", overwrite: "auto" });
    });
    grid.addEventListener("pointerout", (e) => {
      const m = e.target.closest(".pcard__media");
      if (m && !m.contains(e.relatedTarget)) gsap.to($("img", m), { x: 0, y: 0, rotate: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" });
    });
  }

  /* ---------- Buscador ---------- */
  const searchInput = $("#searchInput");
  const suggest = $("#suggest");
  function closeSuggest() { suggest.hidden = true; searchInput.setAttribute("aria-expanded", "false"); }
  function openSuggest(list) {
    suggest.innerHTML = list.length
      ? list.slice(0, 6).map((p) => `<li role="option"><button type="button" data-pick="${p.id}"><img src="${p.img}" alt=""${cover(p)}><span><strong>${p.name}</strong><small>${catLabel(p.cat)}</small></span></button></li>`).join("")
      : `<li class="none">Sin resultados para «${escapeHTML(state.q)}»</li>`;
    suggest.hidden = false;
    searchInput.setAttribute("aria-expanded", "true");
    if (canAnimate) gsap.fromTo(suggest, { y: -8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.22, ease: "power3.out" });
  }
  searchInput.addEventListener("input", () => {
    state.q = searchInput.value;
    if (!state.q.trim()) { closeSuggest(); renderGrid(false); return; }
    openSuggest(filtered());
    renderGrid(false);
  });
  searchInput.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSuggest(); });
  $("#searchForm").addEventListener("submit", (e) => { e.preventDefault(); closeSuggest(); state.cat = "todos"; renderGrid(); scrollToEl($("#catalogo"), -80); });
  suggest.addEventListener("click", (e) => { const b = e.target.closest("[data-pick]"); if (b) { closeSuggest(); selectProduct(b.dataset.pick, true); } });
  document.addEventListener("click", (e) => { if (!e.target.closest(".search")) closeSuggest(); });

  /* ---------- Detalle + carrusel ---------- */
  const viewport = $("#galleryViewport");
  const thumbs = $("#galleryThumbs");
  const prev = $("#prev");
  const next = $("#next");
  const info = $("#info");
  let index = 0;

  function renderGallery(p) {
    viewport.innerHTML = p.gallery.map((g, i) => `
      <figure class="slide${g.fit === "contain" ? " is-contain" : ""}" role="group" aria-roledescription="diapositiva" aria-label="${i + 1} de ${p.gallery.length}">
        <img src="${g.src}" alt="${g.alt}"${g.fit === "cover" ? ` class="is-cover"` : ""}${i ? ` loading="lazy"` : ""}>
      </figure>`).join("");
    thumbs.innerHTML = p.gallery.map((g, i) => `
      <button class="thumb" type="button" data-i="${i}" aria-label="Ver imagen ${i + 1}" aria-current="${i === 0}">
        <img src="${g.src}" alt=""${g.fit === "cover" ? ` class="is-cover"` : ""}>
      </button>`).join("");
    viewport.scrollTo({ left: 0 });
    setIndex(0, false);
  }
  function setIndex(i, scroll = true) {
    const n = state.current.gallery.length;
    index = Math.max(0, Math.min(n - 1, i));
    if (scroll) viewport.scrollTo({ left: index * viewport.clientWidth, behavior: reduce ? "auto" : "smooth" });
    $$(".thumb", thumbs).forEach((t, k) => t.setAttribute("aria-current", String(k === index)));
    prev.disabled = index === 0;
    next.disabled = index === n - 1;
    $("#galleryStatus").textContent = `Imagen ${index + 1} de ${n}`;
  }
  let raf = 0;
  viewport.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => { const i = Math.round(viewport.scrollLeft / viewport.clientWidth); if (i !== index) setIndex(i, false); });
  }, { passive: true });
  prev.addEventListener("click", () => setIndex(index - 1));
  next.addEventListener("click", () => setIndex(index + 1));
  thumbs.addEventListener("click", (e) => { const b = e.target.closest(".thumb"); if (b) setIndex(+b.dataset.i); });
  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); setIndex(index + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); setIndex(index - 1); }
  });

  function renderInfo(p) {
    $("#pName").textContent = p.name;
    $("#pSub").textContent = p.sub;
    $("#pDesc").textContent = p.desc;
    $("#pUses").innerHTML = p.uses.map((u) => `<li>${u}</li>`).join("");
    $("#pSpecs").innerHTML = p.specs.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");
    $("#pBenefits").innerHTML = p.benefits.map((b) => `<li>${b}</li>`).join("");
    $("#pQuickSpecs").innerHTML = p.specs.slice(0, 3).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
    $("#pPresentation").textContent = p.desc;
    $("#related").innerHTML = PRODUCTS.filter((x) => x.id !== p.id && x.cat === p.cat).concat(PRODUCTS.filter((x) => x.id !== p.id && x.cat !== p.cat)).slice(0, 4)
      .map((x) => `<li><button class="mini" type="button" data-id="${x.id}"><img src="${x.img}" alt=""${cover(x)}><span><strong>${x.name}</strong></span></button></li>`).join("");
    renderGallery(p);
  }
  function selectProduct(id, scroll) {
    const p = byId(id);
    if (!p) return;
    if (p !== state.current) {
      state.current = p;
      info.classList.add("is-swapping");
      setTimeout(() => { renderInfo(p); info.classList.remove("is-swapping"); }, reduce ? 0 : 170);
    }
    if (scroll) scrollToEl($("#producto"), -80);
  }
  $("#related").addEventListener("click", (e) => { const b = e.target.closest(".mini"); if (b) selectProduct(b.dataset.id, false); });
  renderInfo(state.current);
  $('#stageProductLink').addEventListener('click', () => selectProduct('temperatura', false));

  /* ---------- Recursos técnicos ---------- */
  const tabs = $$(".product-tabs [role=tab]");
  function activateTab(tab, focus = false) {
    tabs.forEach((item) => {
      const active = item === tab;
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
      $("#" + item.getAttribute("aria-controls")).hidden = !active;
    });
    if (focus) tab.focus();
    ScrollTrigger?.refresh();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      let target;
      if (event.key === "ArrowRight") target = tabs[(i + 1) % tabs.length];
      if (event.key === "ArrowLeft") target = tabs[(i + tabs.length - 1) % tabs.length];
      if (event.key === "Home") target = tabs[0];
      if (event.key === "End") target = tabs[tabs.length - 1];
      if (target) { event.preventDefault(); activateTab(target, true); }
    });
  });
  $("#openDocuments").addEventListener("click", () => {
    activateTab($("#tab-documents"), true);
    scrollToEl($(".product-tabs"));
  });
  $("#downloadSummary").addEventListener("click", () => {
    const p = state.current;
    const text = `${p.name}\n${p.sub}\n\n${p.desc}\n\nESPECIFICACIONES\n${p.specs.map(([k,v]) => `${k}: ${v}`).join("\n")}\n\nBENEFICIOS\n${p.benefits.join("\n")}\n\nResumen de la información de producto publicada por Euroheaters.\nFuente: https://www.euroheaters.mx/index.php/productos/controladores\nConfirmar configuración y disponibilidad con el proveedor.\n`;
    const url = URL.createObjectURL(new Blob(["\ufeff", text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = `resumen-tecnico-${p.id}.txt`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  const documents = [
    { title: "Transductores de presión de fusión", type: "sheet", file: "ficha-tecnica-de-transductores-de-precin.pdf", note: "Melt Pressure · datos y características · PDF, 508 KB" },
    { title: "Controladores de presión", type: "sheet", file: "ficha-tecnica-de-transductores-de-precin-pressure-controllers.pdf", note: "Pressure Controllers · información técnica · PDF, 515 KB" },
    { title: "Control de presión de fusión", type: "sheet", file: "ficha-tecnica-de-transductores-de-precin-melt-pressure-control.pdf", note: "Melt Pressure Control · control PID · PDF, 508 KB" },
    { title: "Catálogo general Euroheaters", type: "catalog", file: "catalogo-euroheaters-mexico-septiembre-2018--liv-.pdf", note: "Controladores, resistencias y sensores · septiembre 2018 · PDF, 31,4 MB" }
  ];
  const fileIcon = `<svg width="26" height="30" viewBox="0 0 24 28" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 1h9l6 6v20H4V1h1ZM14 1v7h6M8 14h8M8 19h8"/></svg>`;
  function renderDocuments() {
    const query = norm($("#documentSearch").value.trim());
    const type = $("input[name=docType]:checked").value;
    const visible = documents.filter(d => (type === "all" || d.type === type) && norm(d.title + " " + d.note).includes(query));
    $("#documentCount").textContent = `${visible.length} ${visible.length === 1 ? "documento disponible" : "documentos disponibles"}`;
    $("#documentsEmpty").hidden = visible.length > 0;
    $("#documentList").innerHTML = visible.map(d => `<li class="document-row"><div class="document-icon">${fileIcon}<span>PDF</span></div><div class="document-copy"><span class="document-kind">${d.type === "sheet" ? "Ficha técnica" : "Catálogo"}</span><h4>${d.title}</h4><p>${d.note}</p></div><div class="document-actions"><a href="/docs/${d.file}" target="_blank" rel="noopener" aria-label="Ver PDF: ${d.title}">Ver PDF <span aria-hidden="true">↗</span></a><a class="btn btn--dark" href="/docs/${d.file}" download aria-label="Descargar ${d.title}">Descargar <span aria-hidden="true">↓</span></a></div></li>`).join("");
  }
  $("#documentSearch").addEventListener("input", renderDocuments);
  $$("input[name=docType]").forEach(input => input.addEventListener("change", renderDocuments));
  renderDocuments();

  function downloadRequest(form, products = []) {
    const data = new FormData(form);
    const lines = ['PROYECTO INDUSTRIAL — SOLICITUD', '', ...[...data].map(([key,value]) => key.toUpperCase()+': '+value), '', 'PRODUCTOS', ...products, '', 'Documento preparado localmente. Confirmar especificaciones y disponibilidad con el proveedor.'];
    const url = URL.createObjectURL(new Blob(['\ufeff', lines.join('\n')], {type:'text/plain;charset=utf-8'}));
    const a = document.createElement('a'); a.href = url; a.download = 'solicitud-krono.txt'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  /* ---------- Cotización ---------- */
  const dlg = $("#quote");
  const countEl = $("#quoteCount");
  function renderQuote() {
    try { localStorage.setItem('krono:quote', JSON.stringify(state.quote)); } catch { /* Keep the in-memory selection available. */ }
    countEl.textContent = state.quote.length;
    $("#qlist").innerHTML = state.quote.map((id) => { const p = byId(id); return `<li><img src="${p.img}" alt=""${cover(p)}><strong>${p.name}</strong><button type="button" data-rm="${id}" aria-label="Quitar ${p.name}">×</button></li>`; }).join("");
    $("#qempty").hidden = state.quote.length > 0;
  }
  function toggleQuote(id) {
    const i = state.quote.indexOf(id);
    if (i >= 0) { state.quote.splice(i, 1); say("Quitado de tu cotización"); }
    else { state.quote.push(id); say(`Agregado: ${byId(id).name}`); }
    renderQuote();
    renderGrid(false);
    if (canAnimate) gsap.fromTo(countEl, { scale: 1.6 }, { scale: 1, duration: 0.45, ease: "back.out(2.5)" });
  }
  function openQuote() { renderQuote(); dlg.showModal(); }
  $("#openQuote").addEventListener("click", openQuote);
  $$("[data-quote]").forEach((b) => b.addEventListener("click", openQuote));
  $("#detailQuote").addEventListener("click", () => { if (!state.quote.includes(state.current.id)) { state.quote.push(state.current.id); renderGrid(false); } openQuote(); });
  $("#quoteClose").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  $("#qlist").addEventListener("click", (e) => { const b = e.target.closest("[data-rm]"); if (b) { state.quote = state.quote.filter((x) => x !== b.dataset.rm); renderQuote(); renderGrid(false); } });
  $("#quoteForm").addEventListener("submit", (e) => {
    e.preventDefault();
    downloadRequest(e.target, state.quote.map(id => byId(id).name));
    dlg.close();
    say("Solicitud descargada. Lista para compartir.");
  });

  /* ---------- Contacto ---------- */
  $("#contactProduct").innerHTML = `<option value="">Aún no lo sé</option>` + PRODUCTS.map((p) => `<option>${p.name}</option>`).join("");
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    downloadRequest(e.target);
    say("Consulta descargada. Lista para compartir.");
  });

  const requestedCategory = new URLSearchParams(location.search).get('categoria');
  if (CATS.some(c => c.id === requestedCategory)) state.cat = requestedCategory;
  renderGrid(false);
  renderQuote();

  // A single reading indicator: the back-to-top ring.
  const backTop = $('#backTop');
  let progressFrame = 0;
  function progress() {
    progressFrame = 0;
    const max = document.documentElement.scrollHeight - innerHeight;
    $('#scrollRing').style.strokeDashoffset = String(100 * (1 - Math.min(1, Math.max(0, max ? scrollY / max : 0))));
    backTop.classList.toggle('is-visible', scrollY > 160);
  }
  const schedule = () => { if (!progressFrame) progressFrame = requestAnimationFrame(progress); };
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule);
  new ResizeObserver(schedule).observe(document.body);
  backTop.addEventListener('click', () => {
    if (lenis) lenis.scrollTo(0); else window.scrollTo({top:0,behavior:reduce?'instant':'smooth'});
    $('.nav .logo').focus({preventScroll:true});
  });
  progress();

  const menu = $('.mobile-menu');
  $$('.mobile-menu a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && menu.open) { menu.open = false; $('summary',menu).focus(); } });
  document.addEventListener('click', e => { if(!menu.contains(e.target)) menu.open = false; });
  // Native FAQ semantics; refresh geometry after disclosures change.
  $$('details').forEach(el => el.addEventListener('toggle', () => ScrollTrigger.refresh()));
  initMotion({ gsap, ScrollTrigger, reduce, hoverFine });
  if (reduce) return;
  if (hoverFine) {
    lenis = new Lenis({lerp:0.1,anchors:{offset:-90},prevent:node => node.closest('dialog')});
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t*1000));
    gsap.ticker.lagSmoothing(0);
  }
  gsap.from('.hero-content > *', {y:44,opacity:0,duration:1,stagger:0.13,ease:'power3.out',clearProps:'transform,opacity'});

  gsap.to('.hero-photo', {yPercent:16,ease:'none',scrollTrigger:{trigger:'.industrial-hero',start:'top top',end:'bottom top',scrub:true}});
  $$('[data-reveal]').forEach(el => gsap.from(el, {y:65,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 94%',once:true},clearProps:'transform,opacity'}));
  $$('.photo-reveal').forEach(el => {
    gsap.from(el, {clipPath:'inset(0 0 14% 0)',duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true},clearProps:'clipPath'});
    gsap.fromTo($('img',el),{scale:1.1},{scale:1,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:0.7}});
  });
  gsap.from('.workflow-grid article',{y:40,opacity:0,stagger:0.16,duration:0.7,ease:'power3.out',scrollTrigger:{trigger:'.workflow-grid',start:'top 90%',once:true},clearProps:'transform,opacity'});
  gsap.from('.foot__name',{yPercent:30,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.foot__name',start:'top 98%',once:true},clearProps:'transform,opacity'});
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh());
})();

