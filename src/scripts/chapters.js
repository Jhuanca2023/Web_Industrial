import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {PRODUCTS} from '../data/products.js';
gsap.registerPlugin(ScrollTrigger);
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const menu=$('.chapter-menu');
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary').focus();}});
document.addEventListener('click',e=>{if(!menu.contains(e.target))menu.open=false;});
let frame=0;
function updateProgress(){frame=0;const max=document.documentElement.scrollHeight-innerHeight;$('#scrollRing').style.strokeDashoffset=String(100*(1-Math.min(1,max?scrollY/max:0)));$('#backTop').classList.toggle('is-visible',scrollY>160);}
const schedule=()=>{if(!frame)frame=requestAnimationFrame(updateProgress);};
addEventListener('scroll',schedule,{passive:true});new ResizeObserver(schedule).observe(document.body);
$('#backTop').addEventListener('click',()=>{window.scrollTo({top:0,behavior:reduce?'instant':'smooth'});$('.chapter-nav .logo').focus({preventScroll:true});});
updateProgress();
const systemNames=['CONTROL TÉRMICO','MEDICIÓN Y PRECISIÓN','INYECCIÓN Y COLADA'];
$$('[data-system]').forEach(item=>item.addEventListener('toggle',()=>{
 if(!item.open)return;
 const index=Number(item.dataset.system);
 $$('[data-system-image]').forEach((im,i)=>{gsap.killTweensOf(im);im.classList.toggle('is-active',i===index);gsap.set(im,{opacity:i===index?1:0});if(i===index&&!reduce)gsap.fromTo(im,{scale:1.12,clipPath:'inset(0 100% 0 0)'},{scale:1,clipPath:'inset(0 0% 0 0)',duration:.8,ease:'power3.out'});});
 $('#systemCaption').textContent=`0${index+1} / ${systemNames[index]}`;
 ScrollTrigger.refresh();
}));
const form=$('#projectBrief');
if(form){
 let selection=[];
 try{const ids=JSON.parse(localStorage.getItem('krono:quote')||'[]');if(Array.isArray(ids))selection=PRODUCTS.filter(p=>ids.includes(p.id));}catch{}
 if(selection.length){const list=$('#briefProducts');list.replaceChildren(...selection.map(p=>{const li=document.createElement('li');li.textContent=p.name;return li;}));}
 form.addEventListener('submit',e=>{
  e.preventDefault();const data=new FormData(form);
  const text=['PROYECTO INDUSTRIAL — MI PROYECTO','',...[...data].map(([key,value])=>`${key.toUpperCase()}: ${value}`),'','PRODUCTOS SELECCIONADOS',...selection.map(p=>p.name),'','Confirmar requisitos, compatibilidad y disponibilidad con el proveedor.'].join('\n');
  const url=URL.createObjectURL(new Blob(['\ufeff',text],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='mi-proyecto-krono.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  $('#briefStatus').textContent='Tu proyecto está listo. El documento se descargó para que puedas compartirlo.';
 });
}
if(!reduce){
 gsap.from('[data-chapter-title]',{y:70,opacity:0,rotation:2,duration:1.1,ease:'power3.out',clearProps:'all'});
 $$('[data-chapter-reveal]').forEach(el=>gsap.from(el,{y:65,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true},clearProps:'transform,opacity'}));
 $$('.chapter-photo img,.about-opening-photo img').forEach(el=>gsap.to(el,{yPercent:15,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top top',end:'bottom top',scrub:1}}));
 if($('.chapter-outline'))gsap.to('.chapter-outline',{xPercent:-12,ease:'none',scrollTrigger:{trigger:'.chapter-hero',start:'top top',end:'bottom top',scrub:1}});
 if($('.signature-mark'))gsap.fromTo('.signature-mark',{rotation:-12,scale:.8},{rotation:0,scale:1,ease:'power2.out',scrollTrigger:{trigger:'.brand-signature',start:'top 90%',end:'top 30%',scrub:1}});
 if($('.project-arrow'))gsap.from('.project-arrow',{x:50,y:-50,opacity:0,duration:1,ease:'power3.out'});
 gsap.from('.foot__name',{yPercent:30,opacity:0,duration:1,scrollTrigger:{trigger:'.foot__name',start:'top 98%',once:true}});
}
document.fonts.ready.then(()=>ScrollTrigger.refresh());
