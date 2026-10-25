/* Runs synchronously in <head> before first paint: sets the theme and the JS flag so
   there is no flash of the wrong theme. Kept as a file (not inline) for the CSP: script-src 'self'.
   A timeout guarantees the hero entrance state is released even if app.js fails to load. */
(function(){
 var d=document.documentElement,t;
 d.classList.add('js');
 try{t=localStorage.getItem('andres-theme')}catch(e){}
 d.dataset.theme=t==='light'||t==='dark'?t:'dark';
 setTimeout(function(){d.classList.add('is-ready')},2500);
})();
