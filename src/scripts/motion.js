/** Marketing motion is separate from product/search/quotation state. */
export function initMotion({gsap, ScrollTrigger, reduce, hoverFine}) {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const hero = $('.industrial-hero');
  const photos = $$('#heroPhotos > img');
  const selectors = $$('[data-scene]');
  const captions = ['PRECISIÓN EN CADA PROCESO','MOVIMIENTO COORDINADO','EL VALOR DEL DETALLE'];
  let scene = 0, timer, transition, paused = reduce, visible = true;
  const pause = $('#heroPause');
  function schedule() {
    clearTimeout(timer);
    if (!paused && !document.hidden && visible && !hero.matches(':focus-within')) timer = setTimeout(() => changeScene(scene + 1), 5500);
  }
  function changeScene(next, manual = false) {
    const previous = scene;
    scene = (next + photos.length) % photos.length;
    transition?.kill();
    photos.forEach((im,i) => {
      im.setAttribute('aria-hidden', String(i !== scene));
      if(i !== scene) gsap.set(im,{autoAlpha:i === previous ? 1 : 0,zIndex:0});
    });
    const current = photos[scene];
    gsap.set(current,{autoAlpha:1,zIndex:1});
    if (!reduce) {
      transition = gsap.timeline().fromTo(current,{clipPath:'inset(0 0 0 100%)',scale:1.18},{clipPath:'inset(0 0 0 0%)',scale:1.08,duration:1.1,ease:'power3.inOut'})
        .to(current,{scale:1,duration:4.4,ease:'none'});
    }
    selectors.forEach((b,i) => b.setAttribute('aria-pressed',String(i === scene)));
    $('#heroScene').textContent = `0${scene+1} / ${captions[scene]}`;
    if (manual) { paused = true; updatePause(); }
    schedule();
  }
  function updatePause() {
    pause.textContent = paused ? '▶' : 'Ⅱ';
    pause.setAttribute('aria-pressed',String(paused));
    pause.setAttribute('aria-label',paused ? 'Reproducir banners automáticos' : 'Pausar banners automáticos');
  }
  selectors.forEach(b => b.addEventListener('click',()=>changeScene(Number(b.dataset.scene),true)));
  pause.addEventListener('click',()=>{paused=!paused;updatePause();schedule();});
  hero.addEventListener('focusin',()=>clearTimeout(timer));
  hero.addEventListener('focusout',()=>setTimeout(schedule,0));
  document.addEventListener('visibilitychange',schedule);
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;schedule();},{threshold:.15}).observe(hero);
  updatePause();changeScene(0);

  // A native scroll-snap gallery works with touch, keyboard, mouse and no animation.
  const track = $('#reelTrack');
  const cards = $$('.reel-card');
  let reel = 0, frame = 0;
  const distance = () => cards[1].offsetLeft - cards[0].offsetLeft;
  function updateReel() {
    frame=0;reel=Math.min(cards.length-1,Math.max(0,Math.round(track.scrollLeft/distance())));
    $('#reelStatus').textContent=`0${reel+1} / 0${cards.length}`;
    $('#reelPrev').disabled = reel===0;$('#reelNext').disabled = reel===cards.length-1;
    $$('[data-reel]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===reel)));
  }
  function goTo(i) { track.scrollTo({left:Math.min(cards.length-1,Math.max(0,i))*distance(),behavior:reduce?'instant':'smooth'}); }
  $('#reelPrev').addEventListener('click',()=>goTo(reel-1));
  $('#reelNext').addEventListener('click',()=>goTo(reel+1));
  $$('[data-reel]').forEach(b=>b.addEventListener('click',()=>goTo(Number(b.dataset.reel))));
  track.addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(updateReel);},{passive:true});
  track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();goTo(reel+(e.key==='ArrowRight'?1:-1));}});
  addEventListener('resize',updateReel);updateReel();
  if(hoverFine) {
    let start = null;
    track.addEventListener('pointerdown',e=>{if(e.button!==0)return;start={x:e.clientX,scroll:track.scrollLeft};track.setPointerCapture(e.pointerId);track.classList.add('is-dragging');});
    track.addEventListener('pointermove',e=>{if(start)track.scrollLeft=start.scroll+start.x-e.clientX;});
    const end=()=>{if(!start)return;start=null;track.classList.remove('is-dragging');goTo(Math.round(track.scrollLeft/distance()));};
    track.addEventListener('pointerup',end);track.addEventListener('pointercancel',end);
  }
  if(reduce) return;

  // The marquee moves while visible, and stops on focus/hover.
  const belt=$('.kinetic-track');
  const copy=belt.cloneNode(true);copy.setAttribute('aria-hidden','true');
  [...copy.children].forEach(child=>{child.setAttribute('aria-hidden','true');belt.append(child);});
  const beltMotion=gsap.to(belt,{xPercent:-50,duration:24,repeat:-1,ease:'none',paused:true});
  const beltButton=document.createElement('button');
  beltButton.type='button';beltButton.className='belt-pause';beltButton.textContent='Ⅱ';beltButton.setAttribute('aria-label','Pausar cinta animada');beltButton.setAttribute('aria-pressed','false');
  belt.parentElement.append(beltButton);
  let beltPaused=false, beltVisible=false;
  const syncBelt=()=>beltVisible&&!beltPaused&&!document.hidden?beltMotion.play():beltMotion.pause();
  beltButton.addEventListener('click',()=>{beltPaused=!beltPaused;beltButton.textContent=beltPaused?'▶':'Ⅱ';beltButton.setAttribute('aria-label',beltPaused?'Reproducir cinta animada':'Pausar cinta animada');beltButton.setAttribute('aria-pressed',String(beltPaused));syncBelt();});
  new IntersectionObserver(([e])=>{beltVisible=e.isIntersecting;syncBelt();}).observe(belt.parentElement);
  document.addEventListener('visibilitychange',syncBelt);
  belt.addEventListener('pointerenter',()=>beltMotion.pause());belt.addEventListener('pointerleave',syncBelt);

  const mm=gsap.matchMedia();
  mm.add('(min-width: 1001px)',()=>{
    const tl=gsap.timeline({scrollTrigger:{trigger:'.product-stage',start:'top top+=86',end:'+=1000',pin:'.stage-sticky',scrub:1,invalidateOnRefresh:true}});
    tl.fromTo('.stage-float',{x:-200,y:60,rotation:-18,scale:.8},{x:0,y:0,rotation:0,scale:1.12,duration:1,ease:'power2.out'})
      .fromTo('.stage-word',{xPercent:18},{xPercent:-12,duration:2,ease:'none'},0)
      .from('.stage-callout',{opacity:0,x:45,stagger:.22,duration:.35},.65)
      .to('.stage-float',{x:130,y:15,rotation:12,scale:1,duration:1,ease:'power2.inOut'},1.2)
      .to('.orbit-two',{rotation:160,duration:2.2,ease:'none'},0);
    return()=>tl.kill();
  });
  mm.add('(max-width: 1000px)',()=>{
    gsap.fromTo('.stage-float',{y:55,rotation:-14,scale:.85},{y:-15,rotation:8,scale:1,ease:'none',scrollTrigger:{trigger:'.product-stage',start:'top 80%',end:'bottom 30%',scrub:.8}});
    gsap.from('.stage-callout',{opacity:0,y:20,stagger:.2,duration:.7,scrollTrigger:{trigger:'.stage-visual',start:'top 60%',once:true}});
  });
  const floating=gsap.to('.stage-product',{y:-16,rotationZ:3,duration:2.5,repeat:-1,yoyo:true,ease:'sine.inOut',paused:true});
  new IntersectionObserver(([e])=>e.isIntersecting?floating.play():floating.pause()).observe($('.stage-visual'));
  if(hoverFine) {
    const visual=$('.stage-visual'),product=$('.stage-product');
    visual.addEventListener('pointermove',e=>{const r=visual.getBoundingClientRect();gsap.to(product,{rotationY:((e.clientX-r.left)/r.width-.5)*28,rotationX:-((e.clientY-r.top)/r.height-.5)*18,transformPerspective:1000,duration:.6,ease:'power3.out',overwrite:'auto'});});
    visual.addEventListener('pointerleave',()=>gsap.to(product,{rotationX:0,rotationY:0,duration:.7,ease:'power3.out',overwrite:'auto'}));
  }
  cards.forEach(card=>gsap.from(card.querySelector('img'),{scale:1.15,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:card,start:'top 90%',once:true}}));
  gsap.from('.reel-heading h2',{y:80,rotation:3,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.industry-reel',start:'top 80%',once:true}});
}
