/* Bilingual content, including dynamically updated pipeline and project text. */
(()=>{
 const dictionary=window.SITE_TRANSLATIONS;
 const textState=new WeakMap(),attributeState=new WeakMap();
 let language='en';
 /* Nodes under [data-i18n-skip] are visual-only overlays (decode effect): never translated or tracked. */
 const eligible=node=>node.nodeType===Node.TEXT_NODE&&!node.parentElement?.closest('script,style,[data-i18n-skip]');
 function translated(source){
  if(language==='en')return source;
  const clean=source.trim();
  let value=dictionary[clean];
  if(value===undefined){
   let match;
   if((match=clean.match(/^Showing (\d+) of (\d+) engagements$/)))value=`Mostrando ${match[1]} de ${match[2]} experiencias`;
   else if((match=clean.match(/^(\d+) selected engagements$/)))value=`${match[1]} experiencias seleccionadas`;
   else if((match=clean.match(/^Show all (\d+) engagements$/)))value=`Ver las ${match[1]} experiencias`;
   else return source;
  }
  return source.slice(0,source.indexOf(clean))+value+source.slice(source.indexOf(clean)+clean.length);
 }
 function text(node){
  if(!eligible(node))return;
  let state=textState.get(node);
  if(!state||node.nodeValue!==state.last)state={original:node.nodeValue,last:node.nodeValue};
  const value=translated(state.original);state.last=value;textState.set(node,state);
  if(node.nodeValue!==value)node.nodeValue=value;
 }
 function attributes(element){
  if(element.nodeType!==Node.ELEMENT_NODE||element.closest('[data-i18n-skip]'))return;
  let states=attributeState.get(element);if(!states){states={};attributeState.set(element,states)}
  for(const name of ['aria-label','title','alt','content']){
   if(!element.hasAttribute(name))continue;
   if(name==='content'&&!element.matches('meta[name="description"],meta[property="og:title"],meta[property="og:description"]'))continue;
   const current=element.getAttribute(name);let state=states[name];
   if(!state||current!==state.last)state={original:current,last:current};
   const value=translated(state.original);state.last=value;states[name]=state;
   if(current!==value)element.setAttribute(name,value);
  }
 }
 function subtree(node){
  if(node.nodeType===Node.TEXT_NODE){text(node);return}
  if(node.nodeType!==Node.ELEMENT_NODE&&node.nodeType!==Node.DOCUMENT_NODE)return;
  if(node.nodeType===Node.ELEMENT_NODE){if(node.matches('script,style,[data-i18n-skip]'))return;attributes(node)}
  const walker=document.createTreeWalker(node,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);
  let child;while((child=walker.nextNode())){if(child.nodeType===Node.TEXT_NODE)text(child);else attributes(child)}
 }
 function setLanguage(next,persist=true){
  language=next==='es'?'es':'en';document.documentElement.lang=language;
  document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===language)));
  subtree(document);
  document.querySelector('meta[property="og:locale"]').content=language==='es'?'es_ES':'en_GB';
  if(persist)try{localStorage.setItem('andres-language',language)}catch{}
  dispatchEvent(new Event('resize'));
  dispatchEvent(new CustomEvent('languagechange:site',{detail:language}));
 }
 new MutationObserver(records=>{
  for(const record of records){
   if(record.type==='characterData')text(record.target);
   else if(record.type==='attributes')attributes(record.target);
   else record.addedNodes.forEach(subtree);
  }
 }).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','alt','content']});
 document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language)));
 let saved='en';try{saved=localStorage.getItem('andres-language')||'en'}catch{}
 setLanguage(saved,false);
})();
