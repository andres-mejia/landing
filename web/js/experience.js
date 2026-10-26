/* Progressive enhancement: all project content stays in the HTML.
   Filters and expansion animate their transitions. */
(()=>{
 'use strict';
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 const cards=[...document.querySelectorAll('[data-project-category]')];
 const filters=[...document.querySelectorAll('[data-project-filter]')];
 const more=document.querySelector('.project-more');
 const count=document.getElementById('project-count');
 const INITIAL=6;
 let active='all',expanded=false;

 /* Portfolio insights are computed from the cards themselves, so they can never drift from the content */
 const DOMAINS=[{key:'finance',label:'Banking & insurance'},{key:'commerce',label:'Retail & commerce'},{key:'platforms',label:'Platforms & integration'},{key:'product',label:'Product & AI'}];
 const RECURRING=[
  {label:'Event streaming (Kafka)',test:/kafka|confluent/i},
  {label:'DDD / domain modelling',test:/\bddd\b/i},
  {label:'AWS',test:/\baws\b/i},
  {label:'Containers (AKS / OpenShift)',test:/\baks\b|openshift|kubernetes/i},
  {label:'Azure',test:/azure/i},
  {label:'Terraform',test:/terraform/i}
 ];
 const make=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node};
 const bar=document.querySelector('[data-domain-bar]'),legend=document.querySelector('[data-domain-legend]'),recurring=document.querySelector('[data-recurring]');
 if(bar&&legend&&recurring){
  const total=cards.length;
  DOMAINS.forEach((domain,i)=>{
   const n=cards.filter(card=>card.dataset.projectCategory===domain.key).length;
   const segment=make('i','domain-seg');segment.dataset.domain=domain.key;segment.style.setProperty('--n',String(n));segment.style.setProperty('--i',String(i));
   bar.append(segment);
   const item=make('li');item.dataset.domain=domain.key;item.style.setProperty('--i',String(i));
   item.append(make('span','domain-swatch'),make('span','domain-label',domain.label),make('span','domain-count mono',String(n)));
   legend.append(item);
  });
  RECURRING
   .map(rule=>({...rule,n:cards.filter(card=>[...card.querySelectorAll('.engagement-tags li')].some(li=>rule.test.test(li.textContent))).length}))
   .sort((a,b)=>b.n-a.n)
   .forEach((rule,i)=>{
    const item=make('li');item.style.setProperty('--w',String(rule.n/total));item.style.setProperty('--i',String(i));
    const track=make('span','recurring-track');track.append(make('i'));
    item.append(make('span','recurring-label',rule.label),track,make('span','recurring-count mono',`${rule.n} / ${total}`));
    recurring.append(item);
   });
 }
 function syncDomain(){document.querySelectorAll('[data-domain]').forEach(node=>node.classList.toggle('is-dim',active!=='all'&&node.dataset.domain!==active))}

 function animateIn(list){
  if(reducedMotion.matches)return;
  list.forEach((card,i)=>{
   card.style.setProperty('--i',String(i%INITIAL));
   card.classList.remove('is-entering');void card.offsetWidth;card.classList.add('is-entering');
   clearTimeout(card._enterTimer);card._enterTimer=setTimeout(()=>card.classList.remove('is-entering'),1300);
  });
 }

 function renderProjects(animate=true){
  const matching=cards.filter(card=>active==='all'||card.dataset.projectCategory===active);
  const visible=expanded?matching:matching.slice(0,INITIAL);
  const previouslyVisible=new Set(cards.filter(card=>!card.hidden));
  cards.forEach(card=>{card.hidden=!visible.includes(card)});
  visible.forEach((card,i)=>card.style.setProperty('--i',String(i%INITIAL)));
  count.textContent=visible.length===matching.length?`${matching.length} selected engagements`:`Showing ${visible.length} of ${matching.length} engagements`;
  more.hidden=matching.length<=INITIAL;
  more.replaceChildren(document.createTextNode(expanded?'Show fewer engagements':`Show all ${matching.length} engagements`),Object.assign(document.createElement('span'),{textContent:expanded?'↑':'↓'}));
  more.setAttribute('aria-expanded',String(expanded));
  if(animate)animateIn(visible.filter(card=>!previouslyVisible.has(card)||filtersChanged));
  filtersChanged=false;
  syncDomain();
  dispatchEvent(new Event('resize'));
 }
 let filtersChanged=false;
 filters.forEach(button=>button.addEventListener('click',()=>{
  if(button.dataset.projectFilter===active)return;
  active=button.dataset.projectFilter;expanded=false;filtersChanged=true;
  filters.forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
  renderProjects();
 }));
 more.addEventListener('click',()=>{
  expanded=!expanded;renderProjects();
  if(!expanded)document.getElementById('experiencia').scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth'});
 });
 renderProjects(false);

 document.querySelectorAll('.region li').forEach((li,i)=>li.style.setProperty('--i',String(i)));
})();
