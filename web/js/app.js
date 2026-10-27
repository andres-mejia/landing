/* Site behaviour: theme, header, navigation, reveals, micro-interactions and the
   software lifecycle. Every effect degrades to static content under
   prefers-reduced-motion; nothing here is required to read the page. */
(()=>{
 'use strict';
 const root=document.documentElement;
 const $=(selector,scope=document)=>scope.querySelector(selector);
 const $$=(selector,scope=document)=>[...scope.querySelectorAll(selector)];
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
 const motionAllowed=()=>!reducedMotion.matches;

 /* ---------- Theme ---------- */
 const themeButton=$('.theme-toggle');
 const themeMeta=$('meta[name="theme-color"]');
 const THEME_COLOR={dark:'#0D151E',light:'#F6F5F2'};
 function applyTheme(theme){
  root.dataset.theme=theme;
  themeButton.setAttribute('aria-label',theme==='dark'?'Switch to light theme':'Switch to dark theme');
  themeMeta.setAttribute('content',THEME_COLOR[theme]);
  dispatchEvent(new CustomEvent('themechange:site',{detail:theme}));
 }
 applyTheme(root.dataset.theme==='light'?'light':'dark');
 themeButton.addEventListener('click',()=>{
  const next=root.dataset.theme==='dark'?'light':'dark';
  const commit=()=>{applyTheme(next);try{localStorage.setItem('andres-theme',next)}catch{}};
  if(!document.startViewTransition||!motionAllowed()){commit();return}
  const r=themeButton.getBoundingClientRect();
  const x=r.left+r.width/2,y=r.top+r.height/2;
  const radius=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
  const transition=document.startViewTransition(commit);
  transition.ready.then(()=>{
   root.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${radius}px at ${x}px ${y}px)`]},
    {duration:700,easing:'cubic-bezier(.2,.7,.2,1)',pseudoElement:'::view-transition-new(root)'});
  }).catch(()=>{});
 });

 /* ---------- Header: always visible, compacts on scroll, shows reading progress ---------- */
 const header=$('[data-header]');
 const progress=$('.reading-progress');
 let scrollQueued=false;
 function onScroll(){
  scrollQueued=false;
  header.classList.toggle('is-scrolled',scrollY>12);
  const total=root.scrollHeight-innerHeight;
  progress.style.transform=`scaleX(${total>0?Math.min(1,Math.max(0,scrollY/total)):0})`;
 }
 addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(onScroll)}},{passive:true});
 addEventListener('resize',onScroll);
 onScroll();

 /* Scrollspy: the section crossing the upper-middle of the viewport is current */
 const navLinks=$$('.header nav a[href^="#"]');
 const spySections=$$('[data-section]');
 function setCurrent(id){
  navLinks.forEach(link=>{
   if(link.getAttribute('href')==='#'+id)link.setAttribute('aria-current','true');
   else link.removeAttribute('aria-current');
  });
 }
 if('IntersectionObserver' in window){
  const visibleSections=new Map();
  const spy=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{if(entry.isIntersecting)visibleSections.set(entry.target.id,entry.boundingClientRect.top);else visibleSections.delete(entry.target.id)});
   const current=[...visibleSections.keys()].sort((a,b)=>visibleSections.get(a)-visibleSections.get(b)).pop();
   setCurrent(current||'');
  },{rootMargin:'-35% 0px -55% 0px'});
  spySections.forEach(section=>spy.observe(section));
 }

 /* ---------- Mobile / tablet menu ---------- */
 const menuButton=$('.menu-toggle'),mobileNav=$('#mobile-nav');
 function setMenu(open){
  mobileNav.hidden=!open;
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');
 }
 menuButton.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
 mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden){setMenu(false);menuButton.focus()}});
 document.addEventListener('click',event=>{if(!mobileNav.hidden&&!header.contains(event.target))setMenu(false)});
 matchMedia('(min-width:1001px)').addEventListener('change',event=>{if(event.matches)setMenu(false)});

 /* ---------- Services: one open at a time ---------- */
 const services=$$('.service-list details');
 services.forEach(detail=>detail.addEventListener('toggle',()=>{
  if(detail.open)services.forEach(other=>{if(other!==detail)other.open=false});
 }));

 /* ---------- Decode: a visual-only scrambled copy resolves into the real text ---------- */
 const GLYPHS='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>+=_';
 const decoding=new WeakMap();
 function decode(element,duration=620){
  if(!element||!motionAllowed())return;
  const running=decoding.get(element);
  if(running)running.cancel();
  const overlay=document.createElement('span');
  overlay.className='decode-overlay';
  overlay.setAttribute('aria-hidden','true');
  overlay.dataset.i18nSkip='';
  element.childNodes.forEach(node=>overlay.appendChild(node.cloneNode(true)));
  overlay.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));
  const walker=document.createTreeWalker(overlay,NodeFilter.SHOW_TEXT);
  const targets=[];let node;
  while((node=walker.nextNode()))targets.push({node,final:node.nodeValue});
  const total=targets.reduce((sum,t)=>sum+t.final.length,0)||1;
  element.appendChild(overlay);
  element.classList.add('is-decoding');
  const start=performance.now();let frame=0;
  const finish=()=>{cancelAnimationFrame(frame);overlay.remove();element.classList.remove('is-decoding');decoding.delete(element)};
  decoding.set(element,{cancel:finish});
  const tick=now=>{
   const progress=Math.min(1,(now-start)/duration);
   let index=0;
   for(const target of targets){
    let out='';
    for(const ch of target.final){
     const resolveAt=(index/total)*.7+.3*((index*7919)%13)/13;
     out+=(ch===' '||progress>=resolveAt)?ch:GLYPHS[(Math.random()*GLYPHS.length)|0];
     index++;
    }
    target.node.nodeValue=out;
   }
   if(progress<1)frame=requestAnimationFrame(tick);else finish();
  };
  frame=requestAnimationFrame(tick);
 }
 window.siteDecode=decode;
 addEventListener('languagechange:site',()=>{$$('.is-decoding').forEach(el=>decoding.get(el)?.cancel())});

 /* ---------- Scroll reveals ---------- */
 const revealTargets=$$('.reveal,.method-grid article,[data-reveal-children]');
 if('IntersectionObserver' in window&&motionAllowed()){
  const revealer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const target=entry.target;
    target.dataset.reveal='visible';
    revealer.unobserve(target);
    $$('[data-count-to]',target).forEach((counter,i)=>setTimeout(()=>countUp(counter),120+i*110));
    $$('[data-decode]',target).filter(label=>label.offsetParent!==null)
     .forEach((label,i)=>setTimeout(()=>decode(label),180+i*90));
   });
  },{threshold:.12,rootMargin:'0px 0px -24px 0px'});
  revealTargets.forEach(el=>{el.dataset.reveal='waiting';revealer.observe(el)});
 }

 /* ---------- Hero entrance ---------- */
 function countUp(element){
  const to=Number(element.dataset.countTo);
  if(!motionAllowed()||!to)return;
  const start=performance.now(),duration=1400;
  const step=now=>{
   const t=Math.min(1,(now-start)/duration);
   element.firstChild.nodeValue=String(Math.round(to*(1-Math.pow(1-t,3))));
   if(t<1)requestAnimationFrame(step);
  };
  element.firstChild.nodeValue='0';
  requestAnimationFrame(step);
 }
 function heroReady(){
  if(root.classList.contains('hero-started'))return;
  root.classList.add('hero-started','is-ready');
  setTimeout(()=>decode($('.hero .eyebrow'),700),260);
  setTimeout(()=>$$('.hero [data-count-to]').forEach(countUp),700);
 }
 const fontsReady=document.fonts?.ready||Promise.resolve();
 Promise.race([fontsReady,new Promise(resolve=>setTimeout(resolve,700))]).then(()=>requestAnimationFrame(heroReady));

 /* ---------- Pointer: spotlight on cards, magnetic primary buttons ---------- */
 if(finePointer.matches){
  let pointerQueued=false,lastEvent=null;
  document.addEventListener('pointermove',event=>{
   lastEvent=event;
   if(pointerQueued)return;pointerQueued=true;
   requestAnimationFrame(()=>{
    pointerQueued=false;
    const spot=lastEvent.target.closest?.('.spot');
    if(!spot)return;
    const r=spot.getBoundingClientRect();
    spot.style.setProperty('--mx',`${lastEvent.clientX-r.left}px`);
    spot.style.setProperty('--my',`${lastEvent.clientY-r.top}px`);
   });
  },{passive:true});
  $$('.magnetic').forEach(button=>{
   button.addEventListener('pointermove',event=>{
    if(!motionAllowed())return;
    const r=button.getBoundingClientRect();
    button.style.setProperty('--mx-shift',`${((event.clientX-r.left)/r.width-.5)*10}px`);
    button.style.setProperty('--my-shift',`${((event.clientY-r.top)/r.height-.5)*8}px`);
   });
   button.addEventListener('pointerleave',()=>{button.style.removeProperty('--mx-shift');button.style.removeProperty('--my-shift')});
  });
 }

 /* ---------- Software lifecycle: one real change through seven phases ----------
    Without JS, or with reduced motion, every phase and its detail stay visible.
    With motion, the panel shows the selected phase only. */
 const lifecycle=$('#factory');
 if(lifecycle){
  const buttons=$$('.phase-button',lifecycle);
  const phases=$$('.phase',lifecycle);
  const details=$$('.lifecycle-detail li',lifecycle);
  let selected=0;
  const select=(index,focus=false)=>{
   selected=index;
   buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
   phases.forEach((p,i)=>p.classList.toggle('is-selected',i===index));
   details.forEach((d,i)=>d.classList.toggle('is-selected',i===index));
   if(focus)buttons[index].focus();
  };
  buttons.forEach((button,i)=>button.addEventListener('click',()=>{select(i);lifecycle.dispatchEvent(new CustomEvent('phase-select'))}));
  $('.lifecycle-phases',lifecycle).addEventListener('keydown',event=>{
   const delta={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[event.key];
   if(!delta)return;
   event.preventDefault();
   select((selected+delta+buttons.length)%buttons.length,true);
   lifecycle.dispatchEvent(new CustomEvent('phase-select'));
  });
  if(motionAllowed())lifecycle.classList.add('is-interactive');
  select(0);
  window.siteLifecycle={select,phases,lifecycle};
 }
})();
