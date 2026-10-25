/* Hero topology: a conceptual event network drawn on the same 88px grid as the CSS
   background. Nodes sit on grid intersections, edges follow the grid (orthogonal
   routes), packets travel along them. Purely decorative: no labels, no figures.
   Paused when the hero is off-screen or the tab is hidden; static under reduced motion. */
(()=>{
 'use strict';
 const canvas=document.querySelector('.hero-canvas');
 if(!canvas||!canvas.getContext)return;
 const hero=canvas.closest('.hero');
 const ctx=canvas.getContext('2d');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const CELL=88;
 const MAX_PACKETS=14;
 const TRAIL=34;

 let width=0,height=0,nodes=[],edges=[],packets=[],pulses=[],colors={};
 let raf=0,visible=true,last=0,nextSpawn=0,pointer=null;

 const rand=(a,b)=>a+Math.random()*(b-a);

 function readColors(){
  const style=getComputedStyle(document.documentElement);
  const read=name=>style.getPropertyValue(name).trim();
  colors={line:read('--net-line'),node:read('--net-node'),a:read('--net-a'),b:read('--net-b')};
 }

 function build(){
  const rect=hero.getBoundingClientRect();
  width=Math.round(rect.width);height=Math.round(rect.height);
  const dpr=Math.min(window.devicePixelRatio||1,2);
  canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
  canvas.style.width=width+'px';canvas.style.height=height+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);

  const cols=Math.floor(width/CELL),rows=Math.floor((height-CELL*1.25)/CELL); /* keep clear of the hero footer bar */
  const narrow=width<761;
  const firstCol=narrow?0:Math.floor(cols*.4);
  const area=Math.max(1,(cols-firstCol+1)*rows);
  const target=Math.max(8,Math.min(narrow?16:26,Math.round(area*.24)));
  const taken=[];
  nodes=[];
  for(let guard=0;nodes.length<target&&guard<800;guard++){
   const c=Math.floor(rand(firstCol,cols+1)),r=Math.floor(rand(1,rows+1));
   if(taken.some(([tc,tr])=>Math.abs(tc-c)+Math.abs(tr-r)<2))continue;
   taken.push([c,r]);
   nodes.push({x:c*CELL,y:r*CELL,hub:Math.random()<.2,glow:0});
  }
  edges=[];
  const seen=new Set();
  nodes.forEach((node,i)=>{
   nodes.map((other,j)=>({j,d:Math.abs(other.x-node.x)+Math.abs(other.y-node.y)}))
    .filter(o=>o.j!==i).sort((a,b)=>a.d-b.d).slice(0,node.hub?3:2)
    .forEach(({j})=>{
     const key=i<j?`${i}-${j}`:`${j}-${i}`;
     if(seen.has(key))return;seen.add(key);
     const other=nodes[j];
     const corner=Math.random()<.5?{x:other.x,y:node.y}:{x:node.x,y:other.y};
     const points=[node,corner,other];
     const segments=[];let length=0;
     for(let k=0;k<points.length-1;k++){
      const seg=Math.abs(points[k+1].x-points[k].x)+Math.abs(points[k+1].y-points[k].y);
      segments.push(seg);length+=seg;
     }
     if(length>0)edges.push({a:i,b:j,points,segments,length});
    });
  });
  packets=[];pulses=[];
 }

 function pointAt(edge,t){
  let distance=Math.max(0,Math.min(1,t))*edge.length;
  const p=edge.points;
  for(let k=0;k<edge.segments.length;k++){
   const seg=edge.segments[k];
   if(distance<=seg||k===edge.segments.length-1){
    const f=seg?Math.min(1,distance/seg):0;
    return{x:p[k].x+(p[k+1].x-p[k].x)*f,y:p[k].y+(p[k+1].y-p[k].y)*f};
   }
   distance-=seg;
  }
  return p[p.length-1];
 }

 function spawn(){
  if(!edges.length)return;
  const edge=edges[Math.floor(Math.random()*edges.length)];
  packets.push({edge,t:0,forward:Math.random()<.5,speed:rand(75,125)/edge.length,color:Math.random()<.62?colors.a:colors.b});
 }

 function nearPointer(x,y){
  if(!pointer)return 0;
  const d=Math.hypot(pointer.x-x,pointer.y-y);
  return d<170?1-d/170:0;
 }

 function render(now,animate){
  const dt=animate?Math.min(.05,(now-last)/1000||0):0;
  last=now;
  ctx.clearRect(0,0,width,height);

  ctx.lineWidth=1;ctx.strokeStyle=colors.line;ctx.beginPath();
  for(const edge of edges){
   const p=edge.points;
   ctx.moveTo(p[0].x+.5,p[0].y+.5);
   for(let k=1;k<p.length;k++)ctx.lineTo(p[k].x+.5,p[k].y+.5);
  }
  ctx.stroke();

  if(animate){
   if(now>nextSpawn&&packets.length<MAX_PACKETS){spawn();nextSpawn=now+rand(240,600)}
   packets=packets.filter(packet=>{
    packet.t+=packet.speed*dt;
    if(packet.t>=1){
     const node=nodes[packet.forward?packet.edge.b:packet.edge.a];
     node.glow=1;
     pulses.push({x:node.x,y:node.y,r:3,alpha:.55,color:packet.color});
     return false;
    }
    const head=packet.forward?packet.t:1-packet.t;
    const span=TRAIL/packet.edge.length;
    ctx.fillStyle=packet.color;
    for(let s=5;s>=0;s--){
     const offset=span*(s/5);
     const pt=pointAt(packet.edge,packet.forward?head-offset:head+offset);
     ctx.globalAlpha=(1-s/6)*.85;
     const size=s===0?3.2:2.2-s*.25;
     ctx.fillRect(pt.x-size/2+.5,pt.y-size/2+.5,size,size);
    }
    ctx.globalAlpha=1;
    return true;
   });
   pulses=pulses.filter(pulse=>{
    pulse.r+=34*dt;pulse.alpha-=.8*dt;
    if(pulse.alpha<=0)return false;
    ctx.globalAlpha=pulse.alpha;ctx.strokeStyle=pulse.color;
    ctx.strokeRect(pulse.x-pulse.r+.5,pulse.y-pulse.r+.5,pulse.r*2,pulse.r*2);
    ctx.globalAlpha=1;
    return true;
   });
  }

  for(const node of nodes){
   const boost=nearPointer(node.x,node.y);
   const size=node.hub?4:3;
   ctx.globalAlpha=Math.min(1,.65+boost*.35);
   ctx.fillStyle=colors.node;
   ctx.fillRect(node.x-size/2+.5,node.y-size/2+.5,size,size);
   if(node.hub){
    ctx.globalAlpha=.35+boost*.4;ctx.strokeStyle=colors.node;
    ctx.strokeRect(node.x-5.5+.5,node.y-5.5+.5,11,11);
   }
   if(node.glow>0||boost>0){
    ctx.globalAlpha=Math.max(node.glow*.9,boost*.6);
    ctx.fillStyle=colors.a;
    ctx.fillRect(node.x-2.5+.5,node.y-2.5+.5,5,5);
    node.glow=Math.max(0,node.glow-dt*1.4);
   }
   ctx.globalAlpha=1;
  }
 }

 function frame(now){render(now,true);raf=requestAnimationFrame(frame)}

 function run(){
  cancelAnimationFrame(raf);raf=0;
  if(reduced.matches){render(performance.now(),false);return}
  if(visible&&!document.hidden){last=performance.now();raf=requestAnimationFrame(frame)}
 }

 let resizeTimer=0,lastSize='';
 const onResize=()=>{
  clearTimeout(resizeTimer);
  resizeTimer=setTimeout(()=>{
   const rect=hero.getBoundingClientRect();
   const size=Math.round(rect.width/20)+'x'+Math.round(rect.height/20);
   if(size===lastSize)return;
   lastSize=size;build();run();
  },120);
 };

 readColors();build();lastSize=Math.round(width/20)+'x'+Math.round(height/20);run();
 if('ResizeObserver' in window)new ResizeObserver(onResize).observe(hero);else addEventListener('resize',onResize);
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;run()}).observe(hero);
 document.addEventListener('visibilitychange',run);
 reduced.addEventListener('change',run);
 addEventListener('themechange:site',()=>{readColors();if(!raf)run()});
 hero.addEventListener('pointermove',event=>{const r=hero.getBoundingClientRect();pointer={x:event.clientX-r.left,y:event.clientY-r.top}},{passive:true});
 hero.addEventListener('pointerleave',()=>{pointer=null});
})();
