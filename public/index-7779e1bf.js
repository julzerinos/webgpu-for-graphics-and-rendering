(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}})();const D=n=>{const e=n.split(`

`),t=document.createElement("div");t.className="paragraph";for(const r of e){const a=document.createElement("span");a.innerHTML=r,t.append(a)}return t},W=n=>{const e=document.createElement("h1");return e.innerHTML=n,e.className="title",e},k=(n,e,t=!0)=>{const r=document.createElement("div");r.className="label-group";const a=document.createElement("label");if(a.textContent=e,r.append(a),t&&"value"in n){const i=document.createElement("label");i.className="value-label";const o=()=>i.textContent=`[ ${n.value} ]`;n.addEventListener("input",o),o(),r.append(i)}return r.append(n),r},K=(n,{width:e,height:t,lowRes:r,overlay:a}={})=>{if(!navigator.gpu){const o=document.createElement("div");o.className="fallback",o.style.setProperty("width",`${e??512}px`),o.style.setProperty("height",`${t??512}px`);const s=document.createElement("span");s.textContent="WebGPU is not supported by this browser (or browser version). Try a different browser (eg. Chrome or Edge).";const c=document.createElement("a");return c.text="You can check the current state of WebGPU API support here.",c.href="https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API",o.append(s,c),o}const i=document.createElement("canvas");return i.width=e??512,i.height=t??512,i.id=n,r&&i.classList.add("low-res"),a&&i.classList.add("overlay"),i},Yt=n=>{const e=document.createElement("div");e.className=`routes ${n.path}`;const t=document.createElement("span");t.textContent=n.path,t.className="underline",e.append(t);const r=document.createElement("div");r.className="routes-container";for(const a of n.children??[]){const i=document.createElement("div");i.className="route-entry";const o=document.createElement("a");o.text=a.name;const s=document.createElement("span");s.textContent=a.description,i.onclick=()=>{or(`/${n.path}/${a.path}`)},i.append(o,s),r.append(i)}return e.append(r),e},ht=n=>{const e=document.createElement("div");return e.id=n,e.className="value-display",e},Di=(n,e)=>{const t=document.createElement("div");t.className=`navigation ${e.map(a=>a.path).join(" ")}`;const r=document.createElement("a");if(r.className="underline-white",r.textContent=Vt.name,r.onclick=()=>{or("/")},t.append(r),e.length>1){const a=document.createElement("span");a.textContent="/";const i=document.createElement("a");i.className="underline",i.textContent=n.name,t.append(a,i)}return t},on=(n,e)=>{const t=`/${n}`,r=`https://github.com/julzerinos/webgpu-for-graphics-and-rendering/tree/main/src/pages${t}`,a=document.createElement("div");a.className="relevant-links";const i=document.createElement("span");i.textContent="Relevant source files",a.append(i);const o=document.createElement("ul");for(const s of e){const c=document.createElement("span");c.textContent=t;const l=document.createElement("a");l.href=r+s,l.text=s,l.target="_blank";const d=document.createElement("li");d.append(c,l),o.append(d)}return a.append(o),a},He=n=>{const e=document.createElement("div");e.className="img-holder";const t=document.createElement("img");return t.src=n,e.append(t),e},vn=(n,e,t,r,a=1,i=!1)=>{const o=document.createElement("input");return o.id=n,o.type="range",o.className="slider-input",o.min=String(t),o.max=String(r),o.step=String(a),o.value=String(e),o.disabled=i,o},Xe=(n,e)=>{const t=document.createElement("input");return t.id=n,t.type="color",t.value=e,t},Xn=(n,e)=>{const t=document.createElement("input");return t.id=n,t.type="checkbox",t.checked=e,t.value=String(e),t.addEventListener("input",()=>t.value=String(t.checked)),t},rt=(n,e)=>{const t=document.createElement("button");return t.id=n,t.textContent=e,t},Bn=(n,e,t=e[0]??"")=>{const r=document.createElement("select");return r.id=n,r.append(...e.map(a=>{const i=document.createElement("option");return i.text=a,i.value=a,i.selected=a===t,i})),r},_n=()=>{const n=document.createElement("div");return n.className="interactables",n},nn=()=>{const n=document.createElement("div");return n.className="canvas-section",n},Hi=()=>{const n=document.createElement("div");return n.className="canvas-stack",n},N=(n,e="value")=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate input with id ${n}`);return()=>t[e]},Tn=(n,e,t="value")=>{const r=document.getElementById(n);if(!r)throw new Error(`Could not locate input with id ${n}`);return r.addEventListener("input",()=>e(r[t])),r.value},it=(n,e)=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate button with id ${n}`);t.addEventListener("click",e)},qi=(n,e)=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate canvas with id ${n}`);t.addEventListener("click",r=>{const a=t.getBoundingClientRect(),i=r.clientX-a.left,o=r.clientY-a.top;e({x:i,y:o})})},Ye=(n,{onStart:e,onMove:t,onEnd:r},{alwaysMouseMove:a}={})=>{const i=document.getElementById(n);if(!i)throw new Error(`Could not locate canvas with id ${n}`);const o=c=>{const l=i.getBoundingClientRect();return{x:c.clientX-l.left,y:c.clientY-l.top}};let s=!1;i.addEventListener("mousedown",c=>{s=!0,e==null||e(o(c))}),i.addEventListener("mouseup",c=>{s=!1,r==null||r(o(c))}),i.addEventListener("mouseleave",c=>{s&&(s=!1,r==null||r(o(c)))}),i.addEventListener("mousemove",c=>{!a&&!s||t==null||t(o(c))})},Gt=(n,e)=>{for(const t of n){const r=document.getElementById(t);if(!r)throw new Error(`Could not locate element with id ${t}`);r.addEventListener("input",()=>e(t))}},$i=(n,e,{onStart:t,onEnd:r}={})=>{const a=document.getElementById(n);if(!a)throw new Error(`Could not locate canvas with id ${n}`);a.addEventListener("click",async()=>{document.pointerLockElement||await a.requestPointerLock()});const i=l=>{e(l.movementX,l.movementY)};let o={};const s=l=>{o[l.key]=!0},c=l=>{o[l.key]=!1};return document.addEventListener("pointerlockchange",()=>{if(document.pointerLockElement===a){console.log("[pointer api] locked pointer in canvas"),document.addEventListener("mousemove",i,!1),window.addEventListener("keydown",s),window.addEventListener("keyup",c),t==null||t();return}document.removeEventListener("mousemove",i,!1),window.removeEventListener("keydown",s),window.removeEventListener("keyup",c),r==null||r()},!1),{keyMap:o}},dt=n=>{const e=document.getElementById(n);if(!e)throw new Error(`Could not locate display with id ${n}`);return t=>e.innerText=t},Wi=n=>{const e=window.location.pathname.split("/").slice(2);let t=Vt,r=n;const a=[Vt];for(const i of e){const o=r.find(s=>s.path===i);if(!o)break;t=o,r=t.children??[],a.push(t)}return{route:t,breadcrumbs:a}},or=n=>{location.href="/webgpu-for-graphics-and-rendering"+n},hn=(n,e)=>`https://julzerinos.github.io/webgpu-for-graphics-and-rendering/${n}`,Xi=()=>{const n=document.getElementById("app");if(!n)throw new Error("Could not initialize app.");return n},L=(n=0,e=0)=>[n,e],y=(n=0,e=0,t=0)=>[n,e,t],f=(n=0,e=0,t=0,r=1)=>[n,e,t,r],Pn=n=>{const e=n[0]??0,t=n[1]??0,r=n[2]??0;return y(e,t,r)},sr={forward:y(0,0,1),back:y(0,0,-1),up:y(0,1,0),down:y(0,-1,0),right:y(1,0,0),left:y(-1,0,0)},B=n=>[].concat(...n),U=(n,e)=>{const t=[];for(let r=0;r<Math.min(n.length,e.length);r++)t.push(n[r]+e[r]);return t},be=(n,e)=>{const t=[];for(let r=0;r<Math.min(n.length,e.length);r++)t.push(n[r]-e[r]);return t},ne=(n,e)=>{const t=[];for(let r=0;r<n.length;r++)t.push(e*n[r]);return t},ot=(n,e)=>{const t=[];for(let r=0;r<Math.min(n.length,e.length);r++)t.push((n[r]+e[r])/2);return t},qe=(n,e)=>{let t=0;for(let r=0;r<Math.min(n.length,e.length);r++)t+=n[r]*e[r];return t},Je=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Ct=(n,e)=>{const t=[];for(let r=0;r<Math.max(n.length,e.length);r++){let a=Number.POSITIVE_INFINITY;r<n.length&&(a=n[r]),r<e.length&&(a=Math.min(a,e[r])),t.push(a)}return t},jt=(n,e)=>{const t=[];for(let r=0;r<Math.max(n.length,e.length);r++){let a=Number.NEGATIVE_INFINITY;r<n.length&&(a=n[r]),r<e.length&&(a=Math.max(a,e[r])),t.push(a)}return t},Wn=n=>ne(n,1/Ut(n)),cr=n=>qe(n,n),Ut=n=>Math.sqrt(cr(n)),lr=(n,e)=>{if(n.length!=e.length)return!1;for(let t=0;t<Math.min(n.length,e.length);t++)if(n[t]!=e[t])return!1;return!0},Fe=(n,e)=>{const t=[];for(let r=0;r<n.length;r++){let a=0;for(let i=0;i<n.length;i++)a+=e[r][i]*n[i];t.push(a)}return t},Be=(n=0,e=0,t=0,r=1)=>({r:n,g:e,b:t,a:r}),st=n=>y(n.r,n.g,n.b),Ze=n=>f(n.r,n.g,n.b,n.a),fn={black:Be(0,0,0,1),white:Be(1,1,1,1),blueScreenBlue:Be(.1,.3,.6,1),transparent:Be(0,0,0,0)},_e=n=>{if(n[0]==="#"&&(n=n.substring(1)),n.length!==6)throw new Error("Can't handle color hexes of size other than 6.");const e=parseInt(n,16),t=(e>>16&255)/255,r=(e>>8&255)/255,a=(e&255)/255;return{r:t,g:r,b:a,a:1}},Dn=n=>n*Math.PI/180,ce=(n,e,t,r,a)=>(n-e)/(t-e)*(a-r)+r,Ne=n=>n?1:0,Me=(n,e,t)=>Math.min(Math.max(n,e),t),Ie=(n,e)=>{const t=e/2;return[L(n[0]-t,n[1]-t),L(n[0]+t,n[1]-t),L(n[0]-t,n[1]+t),L(n[0]-t,n[1]+t),L(n[0]+t,n[1]-t),L(n[0]+t,n[1]+t)]},Yi=(n,e,t=12)=>{const r=[],a=2*Math.PI/t;for(let i=0;i<t;i++)r.push(n,U(n,L(e*Math.cos(i*a),e*Math.sin(i*a))),U(n,L(e*Math.cos((i+1)*a),e*Math.sin((i+1)*a))));return r},Ge=(n,e)=>{const t=e/2,r=[f(...U(n,y(-t,-t,t)),1),f(...U(n,y(-t,t,t)),1),f(...U(n,y(t,t,t)),1),f(...U(n,y(t,-t,t)),1),f(...U(n,y(-t,-t,-t)),1),f(...U(n,y(-t,t,-t)),1),f(...U(n,y(t,t,-t)),1),f(...U(n,y(t,-t,-t)),1)],a=new Uint32Array([0,1,1,2,2,3,3,0,2,3,3,7,7,6,6,2,0,3,3,7,7,4,4,0,1,2,2,6,6,5,5,1,4,5,5,6,6,7,7,4,0,1,1,5,5,4,4,0]),i=[f(1,0,3),f(3,2,1),f(2,3,7),f(7,6,2),f(3,0,4),f(4,7,3),f(6,5,1),f(1,2,6),f(4,5,6),f(6,7,4),f(5,4,0),f(0,1,5)];return{vertices:r,lineIndices:a,triangleIndices:i,normals:[],triangleCount:12}},Ji=n=>{const e=[f(...n[0],1),f(...n[1],1),f(...n[2],1)],t=[f(0,1,2,0)],r=[0,1,1,2,2,0];return{vertices:e,lineIndices:new Uint32Array(r),triangleIndices:t,triangleCount:1,normals:[]}},Nt=(n=0)=>{const e=[f(0,0,1),f(0,2*Math.sqrt(2)/3,-.3333333333333333),f(-Math.sqrt(6)/3,-Math.sqrt(2)/3,-.3333333333333333),f(Math.sqrt(6)/3,-Math.sqrt(2)/3,-.3333333333333333)];let t=[f(0,3,1),f(0,2,3),f(1,3,2),f(1,2,0)];const r=a=>{if(a<=0)return;const i=[],o=new Map;for(const s of t){const c=Pn(e[s[0]]),l=Pn(e[s[1]]),d=Pn(e[s[2]]),h=f(...Wn(ot(c,l))),u=f(...Wn(ot(l,d))),v=f(...Wn(ot(d,c))),m=[s[0],s[1]].sort().toString();let _=o.get(m);_||(_=e.push(h)-1,o.set(m,_));const g=[s[1],s[2]].sort().toString();let x=o.get(g);x||(x=e.push(u)-1,o.set(g,x));const w=[s[0],s[2]].sort().toString();let p=o.get(w);p||(p=e.push(v)-1,o.set(w,p)),i.push(f(s[0],_,p),f(s[1],x,_),f(s[2],p,x),f(_,x,p))}t=i,r(a-1)};return r(n),{vertices:e,triangleIndices:t,triangleCount:t.length,normals:[]}},Cn=(n=0,e=0,t=0,r=0,a=0,i=0,o=0,s=0,c=0,l=0,d=0,h=0,u=0,v=0,m=0,_=0)=>[[n,e,t,r],[a,i,o,s],[c,l,d,h],[u,v,m,_]],kn=(n=0,e=0,t=0,r=0,a=0,i=0,o=0,s=0,c=0)=>[[n,e,t],[r,a,i],[o,s,c]],Ln=()=>Cn(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),rn=n=>[].concat(...Qi(n)),Te=n=>[].concat(...n.map(e=>rn(e))),jn=(n,e,t)=>{if(lr(n,e))return Ln();let r=Wn(be(e,n));const a=Wn(Je(r,t)),i=Wn(Je(a,r));return r=ne(r,-1),Cn(...f(...a,-qe(a,n)),...f(...i,-qe(i,n)),...f(...r,-qe(r,n)),...f())},Zi=(n,e,t,r,a,i)=>{if(n===e)throw"ortho(): left and right are equal";if(t===r)throw"ortho(): bottom and top are equal";if(a===i)throw"ortho(): near and far are equal";const o=e-n,s=r-t,c=i-a,l=Ln();return l[0][0]=2/o,l[1][1]=2/s,l[2][2]=-2/c,l[0][3]=-(n+e)/o,l[1][3]=-(r+t)/s,l[2][3]=-(a+i)/c,l},ae=(n,e,t,r)=>{const a=1/Math.tan(Dn(n)/2),i=r-t,o=Ln();return o[0][0]=a/e,o[1][1]=a,o[2][2]=-(t+r)/i,o[2][3]=-2*t*r/i,o[3][2]=-1,o[3][3]=0,o},ke=(n,e)=>{const t=Wn(e),r=t[0],a=t[1],i=t[2],o=Math.cos(Dn(n)),s=Math.sin(Dn(n)),c=1-o;return Cn(...f(r*r*c+o,r*a*c-i*s,r*i*c+a*s,0),...f(r*a*c+i*s,a*a*c+o,a*i*c-r*s,0),...f(r*i*c-a*s,a*i*c+r*s,i*i*c+o,0),...f())},Pe=n=>{var e=Math.cos(Dn(n)),t=Math.sin(Dn(n)),r=Cn(1,0,0,0,0,e,-t,0,0,t,e,0,0,0,0,1);return r},Ee=n=>{var e=Math.cos(Dn(n)),t=Math.sin(Dn(n)),r=Cn(e,0,t,0,0,1,0,0,-t,0,e,0,0,0,0,1);return r},Ki=n=>{var e=Math.cos(Dn(n)),t=Math.sin(Dn(n)),r=Cn(e,-t,0,0,t,e,0,0,0,0,1,0,0,0,0,1);return r},In=({[0]:n,[1]:e,[2]:t})=>{const r=Ln();return r[0][3]=n,r[1][3]=e,r[2][3]=t,r},qn=(n=1,e=1,t=1)=>{var r=Ln();return r[0][0]=n,r[1][1]=e,r[2][2]=t,r},E=(n,e)=>{const t=[];for(let r=0;r<n.length;r++){t.push([]);for(let a=0;a<e.length;a++){let i=0;for(let o=0;o<n.length;o++)i+=n[r][o]*e[o][a];t[r].push(i)}}return t},Qi=n=>{const e=[];for(let t=0;t<n.length;++t){e.push([]);for(let r=0;r<n[t].length;++r)e[t].push(n[r][t])}return e},Fn=n=>n[0][0]*n[1][1]*n[2][2]+n[0][1]*n[1][2]*n[2][0]+n[0][2]*n[2][1]*n[1][0]-n[2][0]*n[1][1]*n[0][2]-n[1][0]*n[0][1]*n[2][2]-n[0][0]*n[1][2]*n[2][1],na=n=>{const e=kn(n[1][1],n[1][2],n[1][3],n[2][1],n[2][2],n[2][3],n[3][1],n[3][2],n[3][3]),t=kn(n[1][0],n[1][2],n[1][3],n[2][0],n[2][2],n[2][3],n[3][0],n[3][2],n[3][3]),r=kn(n[1][0],n[1][1],n[1][3],n[2][0],n[2][1],n[2][3],n[3][0],n[3][1],n[3][3]),a=kn(n[1][0],n[1][1],n[1][2],n[2][0],n[2][1],n[2][2],n[3][0],n[3][1],n[3][2]);return n[0][0]*Fn(e)-n[0][1]*Fn(t)+n[0][2]*Fn(r)-n[0][3]*Fn(a)},Jt=n=>{const e=Ln(),t=na(n),r=kn(n[1][1],n[1][2],n[1][3],n[2][1],n[2][2],n[2][3],n[3][1],n[3][2],n[3][3]),a=kn(n[1][0],n[1][2],n[1][3],n[2][0],n[2][2],n[2][3],n[3][0],n[3][2],n[3][3]),i=kn(n[1][0],n[1][1],n[1][3],n[2][0],n[2][1],n[2][3],n[3][0],n[3][1],n[3][3]),o=kn(n[1][0],n[1][1],n[1][2],n[2][0],n[2][1],n[2][2],n[3][0],n[3][1],n[3][2]),s=kn(n[0][1],n[0][2],n[0][3],n[2][1],n[2][2],n[2][3],n[3][1],n[3][2],n[3][3]),c=kn(n[0][0],n[0][2],n[0][3],n[2][0],n[2][2],n[2][3],n[3][0],n[3][2],n[3][3]),l=kn(n[0][0],n[0][1],n[0][3],n[2][0],n[2][1],n[2][3],n[3][0],n[3][1],n[3][3]),d=kn(n[0][0],n[0][1],n[0][2],n[2][0],n[2][1],n[2][2],n[3][0],n[3][1],n[3][2]),h=kn(n[0][1],n[0][2],n[0][3],n[1][1],n[1][2],n[1][3],n[3][1],n[3][2],n[3][3]),u=kn(n[0][0],n[0][2],n[0][3],n[1][0],n[1][2],n[1][3],n[3][0],n[3][2],n[3][3]),v=kn(n[0][0],n[0][1],n[0][3],n[1][0],n[1][1],n[1][3],n[3][0],n[3][1],n[3][3]),m=kn(n[0][0],n[0][1],n[0][2],n[1][0],n[1][1],n[1][2],n[3][0],n[3][1],n[3][2]),_=kn(n[0][1],n[0][2],n[0][3],n[1][1],n[1][2],n[1][3],n[2][1],n[2][2],n[2][3]),g=kn(n[0][0],n[0][2],n[0][3],n[1][0],n[1][2],n[1][3],n[2][0],n[2][2],n[2][3]),x=kn(n[0][0],n[0][1],n[0][3],n[1][0],n[1][1],n[1][3],n[2][0],n[2][1],n[2][3]),w=kn(n[0][0],n[0][1],n[0][2],n[1][0],n[1][1],n[1][2],n[2][0],n[2][1],n[2][2]);return e[0][0]=Fn(r)/t,e[0][1]=-Fn(s)/t,e[0][2]=Fn(h)/t,e[0][3]=-Fn(_)/t,e[1][0]=-Fn(a)/t,e[1][1]=Fn(c)/t,e[1][2]=-Fn(u)/t,e[1][3]=Fn(g)/t,e[2][0]=Fn(i)/t,e[2][1]=-Fn(l)/t,e[2][2]=Fn(v)/t,e[2][3]=-Fn(x)/t,e[3][0]=-Fn(o)/t,e[3][1]=Fn(d)/t,e[3][2]=-Fn(m)/t,e[3][3]=Fn(w)/t,e},ea=(n,e=[0,0],t=[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER])=>n.slice(e[1],t[1]).map(r=>r.slice(e[0],t[0])),ta=(n,e)=>{for(let t=0;t<n.length;t++)e[t].splice(0,n[t].length,...n[t]);return e},he=async n=>{const e=document.createElement("img");e.src=n,await e.decode();const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");if(!r)throw new Error("Could not get canvas context");r.drawImage(e,0,0,t.width,t.height);const a=r.getImageData(0,0,t.width,t.height),i=new Uint8Array(e.width*e.height*4);for(let o=0;o<e.height;++o)for(let s=0;s<e.width;++s)for(let c=0;c<4;++c)i[(o*e.width+s)*4+c]=a.data[((e.height-o-1)*e.width+s)*4+c];return{textureData:i,height:e.height,width:e.width}},Dt=(n,e)=>{const t=1/n,r=t/e;if(e<2)return[L()];const a=[];for(var i=0;i<e;++i)for(var o=0;o<e;++o)a.push(L((Math.random()+o)*r-t*.5,(Math.random()+i)*r-t*.5));return a},ra=(n,e,t)=>{const r=new Uint8Array(4*n*n);for(let a=0;a<n;++a)for(let i=0;i<n;++i){const o=Math.floor(a/(n/t)),s=Math.floor(i/(n/e)),c=o%2!==s%2?255:0,l=4*(a*n+i);r[l]=r[l+1]=r[l+2]=c,r[l+3]=255}return r},ia=({data:n,width:e,height:t},r=!1)=>{const a=Math.max(1,e/2|0),i=Math.max(1,t/2|0),o=new Uint8Array(a*i*4),s=(h,u)=>{const v=(u*e+h)*4;return n.subarray(v,v+4)},c=(h,u,v)=>h+(u-h)*v,l=(h,u,v)=>h.map((m,_)=>c(m,u[_],v)),d=(h,u,v,m,_,g)=>{const x=l(h,u,_),w=l(v,m,_);return l(x,w,g)};for(let h=0;h<i;++h)for(let u=0;u<a;++u){const v=(u+.5)/a,m=(h+.5)/i,_=v*e-.5,g=m*t-.5,x=_|0,w=g|0,p=_%1,I=g%1,T=s(x,w),b=s(x+1,w),M=s(x,w+1),S=s(x+1,w+1),O=(h*a+u)*4,P=d(T,b,M,S,p,I);r&&(P[0]=6*a),o.set(P,O)}return{data:o,width:a,height:i}},at=(n,e,t=!1)=>{const r=n.length/4/e;let a={data:n,width:e,height:r};const i=[a];for(;a.width>1||a.height>1;)a=ia(a,t),i.push(a);return i},ze=async(n,e)=>{const r=await(await fetch(e)).blob(),a=await createImageBitmap(r,{colorSpaceConversion:"none"}),i=n.createTexture({size:[a.width,a.height,1],format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT});n.queue.copyExternalImageToTexture({source:a,flipY:!0},{texture:i},{width:a.width,height:a.height});const o=n.createSampler({addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest"});return{texture:i,sampler:o}},hr=(n,{}={})=>{let e=0;const t=[],r=[],a=n.mtls.reduce((o,s)=>({...o,...s.materials.reduce((c,l,d)=>({...c,[l.name]:d}),{})}),{});for(let o=0;o<n.objects.length;o++){const s=n.objects[o];e+=s.faces.length;for(let c=0;c<s.faces.length;c++){const l=s.faces[c];t.push(f(...l.vIndices,1)),r.push(a[l.materialName])}}return{vertices:n.vertices,normals:n.normals,triangleCount:e,triangleIndices:t,materialIndices:r}},aa=n=>({filename:n,mtls:[],objects:[],vertices:[],normals:[]}),Hn=async(n,e=1,t=!1)=>{var l;const a=(l=(await fetch(n)).body)==null?void 0:l.getReader();if(!a)throw new Error("Could not get reader for obj file.");const i=aa(n),o=dr("_default");i.objects.push(o);const s={objDoc:i,currentObject:o,scale:e,currentMaterialName:"",filename:n,reverse:t};let c="";for(;;){const{value:d,done:h}=await a.read();if(h)break;const v=new TextDecoder("utf-8").decode(d,{stream:!0}).split(`
`);c!==""&&(v[0]=c+v[0],c=""),v[v.length-1]!==""&&(c=v.pop());for(const g of v)await oa(g,s)}return i},oa=async(n,e)=>{const t=fr(n),r=de(t);if(r.length!==0)switch(r){case"#":return;case"mtllib":var a=sa(t,e.filename),i=pa();e.objDoc.mtls.push(i);const o=await fetch(a);if(!o.body)throw new Error("No MTL body to read.");await va(o.body.getReader(),i);return;case"o":case"g":const s=e.currentObject.numIndices===0?e.objDoc.objects.length-1:e.objDoc.objects.length,c=ca(t);e.objDoc.objects[s]=c,e.currentObject=c;return;case"v":const l=la(t,e.scale);e.objDoc.vertices.push(l);return;case"vn":const d=ha(t);e.objDoc.normals.push(d);return;case"usemtl":e.currentMaterialName=da(t);return;case"f":const h=fa(t,e.currentMaterialName);ua(h,e.objDoc,e.reverse),ba(e.currentObject,h);return}},sa=(n,e)=>{var t=e.lastIndexOf("/"),r="";return t>0&&(r=e.substring(0,t+1)),r+de(n)},ca=n=>{var e=de(n);return dr(e)},la=(n,e)=>{var t=ie(n)*e,r=ie(n)*e,a=ie(n)*e;return f(t,r,a,1)},ha=n=>{var e=ie(n),t=ie(n),r=ie(n);return f(e,t,r,0)},da=n=>de(n),fa=(n,e)=>{const t=xa(e);for(;;){const r=de(n);if(r.length===0)break;const a=r.split("/");if(a.length>=1){const i=parseInt(a[0])-1;isNaN(i)||t.vIndices.push(i)}if(a.length>=3){const i=parseInt(a[2])-1;t.nIndices.push(i)}else t.nIndices.push(-1)}return t},ua=(n,e,t)=>{var r=[e.vertices[n.vIndices[0]][0],e.vertices[n.vIndices[0]][1],e.vertices[n.vIndices[0]][2]],a=[e.vertices[n.vIndices[1]][0],e.vertices[n.vIndices[1]][1],e.vertices[n.vIndices[1]][2]],i=[e.vertices[n.vIndices[2]][0],e.vertices[n.vIndices[2]][1],e.vertices[n.vIndices[2]][2]],o=Zt(r,a,i);if(o==null){if(n.vIndices.length>=4){var s=[e.vertices[n.vIndices[3]][0],e.vertices[n.vIndices[3]][1],e.vertices[n.vIndices[3]][2]];o=Zt(a,i,s)}o==null&&(o=[0,1,0])}if(t&&(o[0]=-o[0],o[1]=-o[1],o[2]=-o[2]),n.normal=f(o[0],o[1],o[2],0),n.vIndices.length>3){for(var c=n.vIndices.length-2,l=new Array(c*3),d=new Array(c*3),h=0;h<c;h++)l[h*3+0]=n.vIndices[0],l[h*3+1]=n.vIndices[h+1],l[h*3+2]=n.vIndices[h+2],d[h*3+0]=n.nIndices[0],d[h*3+1]=n.nIndices[h+1],d[h*3+2]=n.nIndices[h+2];n.vIndices=l,n.nIndices=d}return n.numIndices=n.vIndices.length,n},va=async(n,e)=>{const t={material:Ht("",f()),mtl:e};for(;;){const{value:r,done:a}=await n.read();if(a)break;const o=new TextDecoder("utf-8").decode(r,{stream:!0}).split(`
`);for(const s of o)_a(s,t)}e.complete=!0},_a=(n,e)=>{const t=fr(n),r=de(t);if(r.length!==0)switch(r){case"#":return;case"newmtl":const a=ga(t);e.material=Ht(a,f(.8,.8,.8,1)),e.mtl.materials.push(e.material);return;case"Kd":e.material&&(e.material.color=ct(t));return;case"Ka":e.material&&(e.material.emission=ct(t));return;case"Ks":e.material&&(e.material.specular=ct(t));return;case"Ni":e.material&&(e.material.ior=ie(t));return;case"Ns":e.material&&(e.material.shininess=ie(t));return;case"illum":e.material&&(e.material.illum=wa(t));return}},ma=(n,e)=>{for(var t=0;t<e.mtls.length;t++)for(var r=0;r<e.mtls[t].materials.length;r++)if(e.mtls[t].materials[r].name==n)return e.mtls[t].materials[r];return Ht("_defaultMat",f(.8,.8,.8,1))},Yn=(n,{indicesIn3:e}={})=>{let t=0,r=0,a=0;for(var i=0;i<n.objects.length;i++)r+=n.objects[i].numIndices+n.objects[i].faces.length,a+=n.objects[i].faces.length;t=n.vertices.length;const o=new Float32Array(t*4),s=new Float32Array(t*4),c=new Float32Array(t*4),l=new Uint32Array(r),d=new Uint32Array(a),h=[],u=new Map,v=[],m=Ve();let _=0,g=0;for(let Y=0;Y<n.objects.length;Y++){const en=n.objects[Y];for(var x=0;x<en.faces.length;x++){var w=en.faces[x],p=u.get(w.materialName),I;p===void 0?(I=ma(w.materialName,n),u.set(w.materialName,h.length),p=h.length,h.push(I)):I=h[p],I.emission!==void 0&&I.emission[0]+I.emission[1]+I.emission[2]>0&&v.push(g),d[g++]=p;for(var T=I.color===void 0?f(.8,.8,.8,1):I.color,b=w.normal,M=0;M<w.vIndices.length;M++){var S=w.vIndices[M];l[_]=S;var O=n.vertices[S];o[S*4+0]=O[0],o[S*4+1]=O[1],o[S*4+2]=O[2],o[S*4+3]=1,Sa(m,O),c[S*4+0]=T[0],c[S*4+1]=T[1],c[S*4+2]=T[2],c[S*4+3]=T[3];var P=w.nIndices[M];if(P>=0){var F=n.normals[P];s[S*4+0]=F[0],s[S*4+1]=F[1],s[S*4+2]=F[2],s[S*4+3]=0}else s[S*4+0]=b[0],s[S*4+1]=b[1],s[S*4+2]=b[2],s[S*4+3]=0;_++}e||(l[_++]=0)}}const R=new Uint32Array(v);return{vertices:o,normals:s,colors:c,indices:l,materials:h,matIndices:d,lightIndices:R,aabb:new Float32Array(B([m.min,m.max]))}},pa=()=>({complete:!1,materials:[]}),ga=n=>de(n),ct=n=>{var e=ie(n),t=ie(n),r=ie(n);return f(e,t,r,1)},Ht=(n,e)=>({name:n,color:e,illum:0,shininess:0,ior:1,specular:f(),emission:f()}),dr=n=>({name:n,faces:[],numIndices:0}),ba=(n,e)=>{n.faces.push(e),n.numIndices+=e.numIndices},xa=(n="")=>({materialName:n,vIndices:[],nIndices:[],normal:f(1),numIndices:0}),fr=n=>({str:n,index:0}),ya=n=>{let e;const t=n.str.length;for(e=n.index;e<t;e++){const r=n.str.charAt(e);if(!(r=="	"||r==" "||r=="("||r==")"||r=='"'))break}n.index=e},de=n=>{ya(n);const e=Ia(n.str,n.index);if(e===0)return"";const t=n.str.substring(n.index,n.index+e);return n.index+=e+1,t},wa=n=>parseInt(de(n)),ie=n=>parseFloat(de(n)),Ia=(n,e)=>{let t;for(t=e;t<n.length;t++){var r=n.charAt(t);if(r=="	"||r==" "||r=="("||r==")"||r=='"')break}return t-e},Zt=(n,e,t)=>{for(var r=new Float32Array(3),a=new Float32Array(3),i=0;i<3;i++)r[i]=n[i]-e[i],a[i]=t[i]-e[i];var o=Array(3);o[0]=r[1]*a[2]-r[2]*a[1],o[1]=r[2]*a[0]-r[0]*a[2],o[2]=r[0]*a[1]-r[1]*a[0];var s=o[0],c=o[1],l=o[2],d=Math.sqrt(s*s+c*c+l*l);if(d){if(d==1)return o}else return o[0]=0,o[1]=0,o[2]=0,o;return d=1/d,o[0]=s*d,o[1]=c*d,o[2]=l*d,o},La=4,Le=20,Kt=1e-6,Qt=4,Ta=(n,e)=>({primIdx:n,bbox:Ve(e)}),Aa=n=>{let e=Ve();for(var t=0;t<n.length;++t)e=Ra(e,n[t].bbox);const r={maxLevel:Le,count:n.length,id:0,bbox:e},a=[];return ft(r,r.bbox,0,n,a),{bspTreeRoot:r,tree_objects:a}},ft=(n,e,t,r,a)=>{if(r.length<=La||t===Le){n.axisType=3,n.id=a.length,n.count=r.length,n.plane=0;for(var i=0;i<r.length;++i)a.push(r[i]);return}const o=[],s=[];n.left={id:-1,bbox:Ve(),maxLevel:Le,count:0},n.right={id:-1,bbox:Ve(),maxLevel:Le,count:0};let c=Number.MAX_VALUE;for(let p=0;p<3;++p)for(let I=1;I<Qt;++I){let T={min:[...e.min],max:[...e.max]},b={min:[...e.min],max:[...e.max]};const M=e.max[p],S=e.min[p],O=(M-S)*I/Qt+S;T.max[p]=O,b.min[p]=O;let P=0,F=0;for(let A=0;A<r.length;++A){const Y=r[A];P+=Re(T,Y.bbox)?1:0,F+=Re(b,Y.bbox)?1:0}const R=P*nr(T)+F*nr(b);R<c&&(c=R,n.axisType=p,n.plane=O,n.left.count=P,n.left.id=0,n.right.count=F,n.right.id=0)}const l=n,d=e.max[l.axisType],h=e.min[l.axisType],u=d-h,v=Kt<u/8?u/8:Kt;let m=l.plane;if(l.left.count==0){m=d;for(var _=0;_<r.length;++_){const I=r[_].bbox.min[l.axisType];I<m&&(m=I)}m-=v}if(l.right.count==0){m=h;for(var _=0;_<r.length;++_){const T=r[_].bbox.max[l.axisType];T>m&&(m=T)}m+=v}l.plane=m;let g={min:[...e.min],max:[...e.max]},x={min:[...e.min],max:[...e.max]};g.max[l.axisType]=m,x.min[l.axisType]=m;const w=[];for(let p=0;p<r.length;++p){const I=r[p];w.push([p,Re(g,I.bbox)]),Re(g,I.bbox)&&o.push(I),Re(x,I.bbox)&&s.push(I)}r=[],ft(l.left,g,t+1,o,a),ft(l.right,x,t+1,s,a)},fe=n=>{const e=[];for(var t=0;t<n.indices.length/4;++t){let h=[n.indices[t*4]*4,n.indices[t*4+1]*4,n.indices[t*4+2]*4],u=y(n.vertices[h[0]],n.vertices[h[0]+1],n.vertices[h[0]+2]),v=y(n.vertices[h[1]],n.vertices[h[1]+1],n.vertices[h[1]+2]),m=y(n.vertices[h[2]],n.vertices[h[2]+1],n.vertices[h[2]+2]),_=Ta(t,[u,v,m]);e.push(_)}const{bspTreeRoot:r,tree_objects:a}=Aa(e),i=new Uint32Array(a.map(h=>h.primIdx)),o=(1<<Le+1)-1,s=new Float32Array(o),c=new Uint32Array(o*4),l=(h,u,v)=>{if(u>Le)return;const m=h;let _=(1<<u)-1+v;c[_*4]=m.axisType+(m.count<<2),c[_*4+1]=m.id,c[_*4+2]=(1<<u+1)-1+2*v,c[_*4+3]=(1<<u+1)+2*v,s[_]=m.plane,m.axisType!==3&&(l(m.left,u+1,v*2),l(m.right,u+1,v*2+1))};return l(r,0,0),{...n,treeIds:i,bspTree:c,bspPlanes:s,aabb:new Float32Array(B([r.bbox.min,r.bbox.max]))}},Ve=(n=[])=>{let e=f(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,1),t=f(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,1);for(const r of n)e=Ct(e,r),t=jt(t,r);return{max:t,min:e}},Sa=(n,e)=>{n.min=Ct(n.min,e),n.max=jt(n.max,e)},Ra=(n,e)=>({min:Ct(n.min,e.min),max:jt(n.max,e.max)}),Ba=n=>Pn(be(n.max,n.min)),Pa=n=>{const[e,t,r]=Ba(n);return e*t+t*r+e*r},nr=n=>Pa(n)*2,Re=(n,e)=>{for(let t=0;t<3;t++)if(e.min[t]>n.max[t]||e.max[t]<n.min[t])return!1;return!0},me=n=>{const e=n.reduce((r,a)=>r+a.length,0),t=new Float32Array(e);for(let r=0;r<Math.max(...n.map(a=>a.length));r+=4)for(let a=0;a<n.length;a++)if(r<n[a].length)for(let i=0;i<4;i++)t[r*n.length+a*4+i]=n[a][r+i];return t},pe=(n,e,t)=>{for(let r=0;r<e.length;r++)n[t*r+3]=e[r]},Oa=()=>[0,0,0,1],ur=({[0]:n,[1]:e,[2]:t,[3]:r})=>[n,e,t,r],Oe=(n,e)=>{const t=Fa(e),r=Ke(e,Ke(n,t));return f(r[0],r[1],r[2],n[3])},Ke=(n,e)=>ur([n[1]*e[2]-n[2]*e[1]+e[3]*n[0]+n[3]*e[0],n[2]*e[0]-n[0]*e[2]+e[3]*n[1]+n[3]*e[1],n[0]*e[1]-n[1]*e[0]+e[3]*n[2]+n[3]*e[2],n[3]*e[3]-n[0]*e[0]-n[1]*e[1]-n[2]*e[2]]),ka=n=>n[0]*n[0]+n[1]*n[1]+n[2]*n[2]+n[3]*n[3],Fa=n=>{const e=ka(n);return ur([-n[0]/e,-n[1]/e,-n[2]/e,n[3]/e])},er=(n,e)=>{const t=Math.sin(e*.5),r=Wn(n);return[r[0]*t,r[1]*t,r[2]*t,Math.cos(e*.5)]},Ma=(n,e)=>{const t=Math.sqrt(2*(1+n[0]*e[0]+n[1]*e[1]+n[2]*e[2]));return[(n[1]*e[2]-n[2]*e[1])/t,(n[2]*e[0]-n[0]*e[2])/t,(n[0]*e[1]-n[1]*e[0])/t,t/2]},Ea=(n,e)=>{const t=[];for(let r=0;r<n.length;r++){const a=n[r];for(let i=0;i<e;i++){const o=t[i];if(!(o!==void 0&&n[o]<a)){t.splice(i,0,r);break}}}return t.slice(0,e)},za={float32:new Float32Array([0]).byteLength,uint32:new Uint32Array([0]).byteLength},Un={float32x2:new Float32Array(L()).byteLength,float32x3:new Float32Array(y()).byteLength,float32x4:new Float32Array(f()).byteLength},Va={float32x4x4:new Float32Array(rn(Cn())).byteLength},Rn={...za,...Un,...Va},sn=async n=>{const t=await navigator.gpu.requestAdapter();if(!t)throw new Error("Could not initialize GPU adapter.");const r=await t.requestDevice(),a=document.getElementById(n);if(!a)throw new Error(`Could not find canvas with id ${n}`);const i=a.getContext("gpupresent")||a.getContext("webgpu");if(!i)throw new Error("Could not generate context for canvas.");const o=navigator.gpu.getPreferredCanvasFormat();return i.configure({device:r,format:o}),{adapter:t,device:r,canvas:a,canvasFormat:o,context:i}},un=(n,e,t={r:0,g:0,b:0,a:1},{msaaTexture:r,depthStencilAttachmentFactory:a,otherColorAttachments:i}={})=>{const o={view:r?r.createView():e.getCurrentTexture().createView(),resolveTarget:r?e.getCurrentTexture().createView():void 0,loadOp:"clear",clearValue:t,storeOp:"store"},s=n.createCommandEncoder(),c=s.beginRenderPass({colorAttachments:[o,...i??[]],depthStencilAttachment:(a??(()=>{}))()});return{pass:c,executePass:()=>{c.end(),n.queue.submit([s.finish()])},encoder:s}},an=(n,e,t,r,a="triangle-list",i,{fragmentOverrides:o,blend:s}={})=>{const c=n.createShaderModule({code:r});return n.createRenderPipeline({layout:"auto",vertex:{module:c,entryPoint:"main_vs",buffers:e},fragment:{module:c,entryPoint:"main_fs",targets:[{format:t,blend:s}],...o},...i,primitive:{topology:a,frontFace:"ccw",cullMode:"back",...i==null?void 0:i.primitive}})},oe=(n,e,t,{depthStencilOverwrites:r}={})=>{let a;const i=()=>{a=n.createTexture({size:{width:e.width,height:e.height},format:"depth24plus",sampleCount:t,usage:GPUTextureUsage.RENDER_ATTACHMENT})},o={depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus",...r};return{createDepthTexture:i,depthStencil:o,depthStencilAttachmentFactory:()=>(a||i(),{view:a.createView(),depthLoadOp:"clear",depthClearValue:1,depthStoreOp:"store"})}},xe=(n,e,t,r)=>({msaaTexture:n.createTexture({size:{width:e.width,height:e.height},format:t,sampleCount:r,usage:GPUTextureUsage.RENDER_ATTACHMENT}),multisample:{count:r}}),X=(n,e,t,r=0,a=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const i=n.createBuffer({size:e.byteLength,usage:a}),o={arrayStride:Rn[t],attributes:[{format:t,offset:0,shaderLocation:r}]};return n.queue.writeBuffer(i,0,e),{bufferLayout:o,buffer:i}},Gn=(n,e,t=GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST)=>{const r=n.createBuffer({size:e.byteLength,usage:t});return n.queue.writeBuffer(r,0,e),{buffer:r}},z=(n,e,t,r,a=0)=>{const i=t.map(s=>{const c=n.createBuffer({size:s.byteLength,usage:GPUBufferUsage[r]|GPUBufferUsage.COPY_DST});return n.queue.writeBuffer(c,0,s),c}),o=n.createBindGroup({layout:e.getBindGroupLayout(a),entries:i.map((s,c)=>({binding:c,resource:{buffer:s}}))});return{buffers:i,bindGroup:o}},Nn=(n,e,t,r,a=0,{createViewOverwrite:i}={})=>n.createBindGroup({layout:e.getBindGroupLayout(a),entries:[{binding:0,resource:r},{binding:1,resource:t.createView(i)}]}),ee=(n,e,t,r,a,{mips:i}={})=>{const o=n.createTexture({size:[t,r,1],format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING,mipLevelCount:i?i.length:void 0});(i||[{data:e,width:t,height:r}]).forEach(({data:l,width:d,height:h},u)=>{n.queue.writeTexture({texture:o,mipLevel:u},l,{bytesPerRow:d*4},{width:d,height:h})});const c=n.createSampler({addressModeU:"repeat",addressModeV:"repeat",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",...a});return{texture:o,sampler:c}},Ga=(n,e,t,r)=>{const a=n.createTexture({dimension:"2d",size:[t,r,6],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});for(let o=0;o<e.length;o++)n.queue.writeTexture({texture:a,origin:[0,0,o]},e[o],{bytesPerRow:t*4},[t,r]);const i=n.createSampler({magFilter:"linear",minFilter:"linear"});return{cubemapTexture:a,sampler:i}},Ce=(n,e)=>{const t=n.createTexture({size:[e.width,e.height],usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,format:"rgba32float"}),r=n.createTexture({size:[e.width,e.height],usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,format:"rgba32float"});return{renderDst:r,renderSrc:t,blitPingPong:i=>i.copyTextureToTexture({texture:t},{texture:r},[e.width,e.height])}},Z=(n,e,t,r,a=!1)=>{if(a){const i=new Float32Array(r/Float32Array.BYTES_PER_ELEMENT),o=new Float32Array((e.size-t.byteLength-i.byteLength)/Float32Array.BYTES_PER_ELEMENT);t=new Float32Array([...i,...t,...o]),r=0}n.queue.writeBuffer(e,r,t)},zn=(n,e,t,r,a=!1)=>{if(a){const i=new Uint32Array(r/Float32Array.BYTES_PER_ELEMENT),o=new Uint32Array((e.size-t.byteLength-i.byteLength)/Uint32Array.BYTES_PER_ELEMENT);t=new Uint32Array([...i,...t,...o]),r=0}n.queue.writeBuffer(e,r,t)},qt=Cn(1,0,0,0,0,1,0,0,0,0,-.5,.5,0,0,0,1),Ca=`@vertex
fn main_vs(@location(0) pos : vec2f) -> @builtin(position) vec4f
{
    return vec4f(pos, 0, 1);
}
@fragment
fn main_fs() -> @location(0) vec4f
{
    return vec4f(0.0, 0.0, 0.0, 1.0);
}
`,ja=async()=>{const{device:n,canvas:e,context:t,canvasFormat:r}=await sn("task1"),a=[].concat(B(Ie([0,0],10*(2/e.height))),B(Ie([1,0],10*(2/e.height))),B(Ie([1,1],10*(2/e.height)))),i=new Float32Array(a),{buffer:o,bufferLayout:s}=X(n,i,"float32x2"),c=an(n,[s],r,Ca),{pass:l,executePass:d}=un(n,t,{r:.3921,g:.5843,b:.9294,a:1});l.setPipeline(c),l.setVertexBuffer(0,o),l.draw(a.length/2),d()},Ua=(n,e)=>{const t=on("graphics/01-webgpu-basics",["/drawPoints.ts","/shaderBlack.wgsl"]),r=W("Hello (GPU) world"),a=D(`
With WebGPU, even the simplest 'Hello world!' exercise is already met with an obstacle. 
Points, the most primitive of shapes, are drawn to the screen as single pixels. 
This could work for low resolution images, but targeting something larger requires transforming the pixels into quads (two triangles forming a square) of the desired size.

The quads are transformed into a vertex buffer (flattened array of vector components) and attached to the render pass before the draw command. 
With this, the first step has been made. 
Displaying anything on the screen is just a trivial extension of drawing some points, really.
        `),i=K("task1"),o=nn();o.append(i),n.append(r,t,a,o),e.push(ja)},Na=`struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) color : vec3f,
};

@vertex
fn main_vs(@location(0) inPos : vec2f,
@location(1) inColor : vec3f) -> VSOut
{
    var vsOut : VSOut;
    vsOut.position = vec4f(inPos, 0.0, 1.0);
    vsOut.color = inColor;
    return vsOut;
}

@fragment
fn main_fs(@location(0) inColor : vec3f) -> @location(0) vec4f
{
    return vec4f(inColor, 1.0);
}
`,Da=async()=>{const{device:n,context:e,canvasFormat:t}=await sn("task2"),{pass:r,executePass:a}=un(n,e,{r:.3921,g:.5843,b:.9294,a:1}),i=[L(0,0),L(1,0),L(1,1)],o=[y(1,0,0),y(0,1,0),y(0,0,1)],s=new Float32Array(B(i)),c=new Float32Array(B(o)),{buffer:l,bufferLayout:d}=X(n,s,"float32x2"),{buffer:h,bufferLayout:u}=X(n,c,"float32x3",1),v=an(n,[d,u],t,Na);r.setPipeline(v),r.setVertexBuffer(0,l),r.setVertexBuffer(1,h),r.draw(i.length),a()},Ha=(n,e)=>{const t=on("graphics/01-webgpu-basics",["/drawTriangle.ts","/shaderColor.wgsl"]),r=W("A formal introduction to the triangle"),a=D(`
The triangle was mentioned in the previous section, but a passing mention does not do enough to emphasis the role this simple shape plays in the world of computer graphics.
The triangle, a shape made of any three unique vertices, is the most commonly used building block of virtual worlds.

The reasons (beyond simply stating this is how it was always done) come from the mathematical simplicity of the shape.
The triangle has the lowest number of vertices (points) which generate a flat surface polygon. The triangle also has a powerful feature which elevates it above its more complex cousins - Barycentric coordinates.

The set of three factors are crucial to smoothly interpolate values over the surface of the triangle (across the "axes" of its three points). 
Not only is this used to calculate the fragments which belong to the triangle between its points, but can be extended to support any attribute such as colors (see below) or as will soon be shown normals and texture coordinates.

Almost any complex graphical shape is now a collection of a multiple of three vertex points waiting to be interpolated.
`),i=K("task2"),o=nn();o.append(i),n.append(r,t,a,o),e.push(Da)},qa=`struct Time {
    time : f32
};

@group(0) @binding(0) var<uniform> time : Time;

fn rotate_vec2(vector : vec2f, theta : f32) -> vec2f
{
    let x = vector.x * cos(theta) - vector.y * sin(theta);
    let y = vector.y * cos(theta) + vector.x * sin(theta);
    return vec2f(x, y);
}

@vertex
fn main_vs(@location(0) pos : vec2f) -> @builtin(position) vec4f
{
    let rotated = rotate_vec2(pos, cos(time.time));
    return vec4f(rotated, 0, 1);
}
@fragment
fn main_fs() -> @location(0) vec4f
{
    return vec4f(0.0, 0.0, 0.0, 1.0);
}
`,$a=async()=>{const{device:n,context:e,canvasFormat:t}=await sn("task3"),r=Ie(L(0,0),1),a=new Float32Array(B(r)),{bufferLayout:i,buffer:o}=X(n,a,"float32x2"),s=an(n,[i],t,qa),{bindGroup:c,buffers:[l]}=z(n,s,[new Float32Array(1)],"UNIFORM"),d=h=>{Z(n,l,new Float32Array([h/1e3]),0);const{pass:u,executePass:v}=un(n,e,{r:.3921,g:.5843,b:.9294,a:1});u.setPipeline(s),u.setVertexBuffer(0,o),u.setBindGroup(0,c),u.draw(r.length),v(),requestAnimationFrame(d)};requestAnimationFrame(d)},Wa=(n,e)=>{const t=on("graphics/01-webgpu-basics",["/drawRotatingSquare.ts","/shaderRotateWithTime.wgsl"]),r=W("Move, please"),a=D(`
A static triangle is hardly anything to write home about. Getting the shapes to move (or better - react to input) is what makes this whole endevour worthwhile.
The GPU does not have a concept of human time. To be fair, time is not much more than a constantly increasing linear value and should be just that.

While vertex buffers are key to generate shapes in the virtual space, storage and uniform buffers are optionally used to provide auxiliary data to the GPU. 
Time, just like any other variable, can then be fed into the mathematical algorithms defined in shaders to create a property function dependent on time.

Trigonometric functions (especially sinusoidal waves) soon become a shader author's best friend.
`),i=K("task3"),o=nn();o.append(i),n.append(r,t,a,o),e.push($a)},Xa=`struct Time {
    time : f32
};

struct Ball {
    height : f32,
    speed : f32,
    size : f32
};

@group(0) @binding(0) var<uniform> time : Time;
@group(1) @binding(0) var<uniform> ball : Ball;

struct VertexOutput {
    @builtin(position) Position : vec4 < f32>,
    @location(0) fragPosition : vec4 < f32>,
}

@vertex
fn main_vs(@location(0) pos : vec4 < f32>) -> VertexOutput
{
    var output : VertexOutput;
    output.Position = pos;
    output.fragPosition = 0.5 * (pos + vec4(1., 1., 1., 1.));
    return output;
}

@fragment
fn main_fs(@location(0) fragPosition : vec4 < f32>) -> @location(0) vec4f
{
    var y = ball.height * abs(sin(time.time * ball.speed));

    var circleCenter = vec4(.5, .35 + y, 0., 1.);

    var isCircle = -sign(distance(circleCenter, fragPosition) - ball.size / 2.) - sign(distance(circleCenter, fragPosition) - ball.size / 2.);

    return vec4(isCircle, 0., 0., 1.);
}
`,Ya=async()=>{const{device:n,context:e,canvasFormat:t}=await sn("task4"),r=Ie(L(0,0),2),a=new Float32Array(B(r)),i=N("ball-height"),o=N("ball-size"),s=N("ball-speed"),{bufferLayout:c,buffer:l}=X(n,a,"float32x2"),d=an(n,[c],t,Xa),{bindGroup:h,buffers:[u]}=z(n,d,[new Float32Array([0])],"UNIFORM"),{bindGroup:v,buffers:[m]}=z(n,d,[new Float32Array(3)],"UNIFORM",1),_=g=>{Z(n,u,new Float32Array([g/1e3]),0),Z(n,m,new Float32Array([i(),s(),o()]),0);const{pass:x,executePass:w}=un(n,e,fn.blueScreenBlue);x.setPipeline(d),x.setVertexBuffer(0,l),x.setBindGroup(0,h),x.setBindGroup(1,v),x.draw(r.length),w(),requestAnimationFrame(_)};requestAnimationFrame(_)},Ja=(n,e)=>{const t=on("graphics/01-webgpu-basics",["/drawBouncingBall.ts","/shaderDrawCircle.wgsl"]),r=W("Interacting with a scene"),a=D(`
Just as time can be provided to the GPU, so can any other relevant attribute, property or value which has to be controlled externally by the CPU.

While a circle could be defined as fan of triangles defined by vertices laying on a circle, it is important to remember that circles are pointless.
Pointless, but ever so important. No matter how many vertices define a circle, it will never be a resolution-independent circle.

An alternative is to define circles in the conceptual space of the fragement shader as a boolean function of distance to the circle center. 
To do this, the circle can only exist on the surface of another shape such as a quad. The black space in the canvas below is actually the color of quad. 
The ball is being rendered on the quad's surface, much like a screen displaying a video.
`),i=nn(),o=K("task4"),s=_n(),c=k(vn("ball-height",.3,.1,.9,.1),"Ball bounce height"),l=k(vn("ball-speed",4,1,16),"Ball bounce speed"),d=k(vn("ball-size",1.05,1.01,1.5,.01),"Ball size");s.append(c,l,d),i.append(o,s),n.append(r,t,a,i),e.push(Ya)},Za=(n,e)=>{Ua(n,e),Ha(n,e),Wa(n,e),Ja(n,e)},Ka=`struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) color : vec3f,
};

@vertex
fn main_vs(@location(0) inPos : vec2f,
@location(1) inColor : vec3f) -> VSOut
{
    var vsOut : VSOut;
    vsOut.position = vec4f(inPos, 0.0, 1.0);
    vsOut.color = inColor;
    return vsOut;
}

@fragment
fn main_fs(@location(0) inColor : vec3f) -> @location(0) vec4f
{
    return vec4f(inColor, 1.0);
}
`,ut="drawing",vt="drawing-mode",Qa=["POINT","TRIANGLE","CIRCLE"],vr="points-color",_r="drawing-background-color",mr="granularity-slider",pr="size-slider",gr="clear",no=async()=>{const{device:n,canvas:e,context:t,canvasFormat:r}=await sn(ut);let a=Tn(_r,A=>{a=A,F()});const i=dt("display-draw-instruction"),o=N(vr),s=N(vt),c=N(mr),l=N(pr),d=1e3,h=new Float32Array(6*d*Un.float32x2),{buffer:u,bufferLayout:v}=X(n,h,"float32x2"),m=new Float32Array(6*d*Un.float32x3),{buffer:_,bufferLayout:g}=X(n,m,"float32x3",1),x=an(n,[v,g],r,Ka,"triangle-list");qi(ut,A=>{switch(s()){case"TRIANGLE":O(A);break;case"CIRCLE":P(A);break;default:case"POINT":S(),T(A);break}F()});let p=0,I=0;const T=({x:A,y:Y})=>{const en=ce(A,0,e.width,-1,1),cn=-1*ce(Y,0,e.height,-1,1),j=Ie(L(en,cn),l()/e.height),C=new Float32Array(B(j));n.queue.writeBuffer(u,p,C),p+=6*Un.float32x2;const V=Array(6).fill(st(_e(o()))),G=new Float32Array(B(V));n.queue.writeBuffer(_,I,G),I+=6*Un.float32x3};let b=[],M=[];const S=()=>{b=[],M=[]},O=A=>{if(b.push(A),M.push(o()),M.length<3){T(A);return}const Y=new Float32Array([].concat(...b.map(({x:cn,y:j})=>{const C=ce(cn,0,e.width,-1,1),V=-1*ce(j,0,e.height,-1,1);return L(C,V)}),B(Array(9).fill(L()))));n.queue.writeBuffer(u,p-2*6*Un.float32x2,Y),p+=Un.float32x2*(3-2*6);const en=new Float32Array([].concat(...B(M.map(cn=>st(_e(cn)))),B(Array(9).fill(y()))));n.queue.writeBuffer(_,I-2*6*Un.float32x3,en),I+=Un.float32x3*(3-2*6),S()},P=A=>{if(b.push(A),M.push(o()),b.length<2){T(A);return}const Y=L(ce(b[0].x,0,e.width,-1,1),-1*ce(b[0].y,0,e.height,-1,1)),en=L(ce(b[1].x,0,e.width,-1,1),-1*ce(b[1].y,0,e.height,-1,1)),cn=Ut(be(en,Y)),j=Yi(Y,cn,c()),C=new Float32Array(B(j));n.queue.writeBuffer(u,p-6*Un.float32x2,C),p+=Un.float32x2*(j.length-6);const V=new Float32Array(B([...new Array(j.length)].map((G,J)=>{const ln=J%3===0?0:1;return st(_e(M[ln]))})));n.queue.writeBuffer(_,I-6*Un.float32x3,V),I+=Un.float32x3*(j.length-6),S()},F=()=>{const{pass:A,executePass:Y}=un(n,t,_e(a));A.setPipeline(x),A.setVertexBuffer(0,u),A.setVertexBuffer(1,_),A.draw(6*d),Y()};it(gr,()=>{n.queue.writeBuffer(u,0,new Float32Array(6*d*Un.float32x2)),n.queue.writeBuffer(_,0,new Float32Array(6*d*Un.float32x3)),F()}),Tn(vt,A=>{i({POINT:"Click to create a point",TRIANGLE:"Create three points to form a triangle",CIRCLE:"Create two points to form a circle"}[A])}),i("Click to create a point"),F()},eo=(n,e)=>{const t=on("graphics/02-interaction",["/drawing.ts","/shader.wgsl"]),r=W("Drawing with WebGPU"),a=D(`
The basic test to validate any computer graphics framework is to check if it has all the tools to create a drawing application. A basic drawing program should be able to at least support drawing points, triangles and circles.

In the case of utilizing WebGPU, the program will be built with the following setup. Shapes will be fed into the graphics pipeline as triangles. 
The vertex buffer will be initialized with an amount of empty triangles to support creating shapes until boredom for the average human.
The interaction is powered by HTML Canvas mouse event listeners.

Starting with the easiest of the shapes to implement - points. As in the previous page, points are actually two little triangles. Six vertices (actually four unique) create a square with its center at the click point. 
This is a run and done operation, one click results in one shape. The appropriate partition in the vertex buffer is populated with the new vertex positions.

A triangle is slightly more complicated in that two operations are being made at the same time. Before the user clicks all three vertices, two points exist (to indicate previous vertices).
Once the third triangle vertex is selected, the pervious two points should be overwritten. It is important to remember that a point is already two triangles, therefore the vertex buffer is modified to replace four temporary triangles with the final single triangle (making sure to clear the previously used space in the buffer to avoid corrupting the shape data).

A circle is a fan of triangles indicated by two user-selected points. In this case, the (single) temporary point is overwritten with the required amount of triangles to create a circle with the selected granularity.
The granularity is a measure of the circle's resolution - how many triangles are used to form the shape.

Apart from the vertex buffer, a secondary color (vertex) buffer is also manipulated to store the shape's colors. The pipeline will then automatically interpolate between the user-selected points. You can observe this by changing the draw color before finishing a triangle or circle.
`),i=nn(),o=K(ut),s=_n(),c=ht("display-draw-instruction"),l=Bn(vt,Qa),d=k(Xe(vr,"#000000"),"Draw color"),h=k(Xe(_r,"#ffffff"),"Background color"),u=k(vn(pr,10,2,100),"Point size"),v=k(vn(mr,12,4,32),"Circle granularity"),m=rt(gr,"Clear canvas");s.append(c,l,d,u,v,h,m),i.append(o,s),n.append(r,t,a,i),e.push(no)},to=`struct Uniforms {
    mvp : mat4x4f,
};

@group(0) @binding(0) var<uniform> uniforms : Uniforms;

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) color : vec3f,
};

@vertex
fn main_vs(@location(0) inPos : vec4f,
) -> VSOut
{
    var vsOut : VSOut;
    vsOut.position = uniforms.mvp * inPos;
    return vsOut;
}

@fragment
fn main_fs(@location(0) inColor : vec3f) -> @location(0) vec4f
{
    return vec4f(1., 0., 0., 1.0);
}
`,br="wireframe",xr="wireframe-rotation-slider",ro=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(br),r=Ge(y(0),1),a=r.lineIndices,i=new Float32Array(B(r.vertices)),{buffer:o}=Gn(n,a),{buffer:s,bufferLayout:c}=X(n,i,"float32x4"),l=an(n,[c],t,to,"line-list"),{bindGroup:d,buffers:[h]}=z(n,l,[new Float32Array(rn(Ln()))],"UNIFORM",0),u=In(y(.5,.5,.5)),v=y(0,0,10),m=y(0),_=y(0,1,0),g=jn(v,m,_),x=Zi(-1.5,1.5,-1.5,1.5,0,100),w=E(qt,x),p=E(w,g),I=b=>{const M=ke(b,y(1,1,1)),S=E(M,u),O=E(p,S);Z(n,h,new Float32Array(rn(O)),0);const{pass:P,executePass:F}=un(n,e,fn.black);P.setPipeline(l),P.setVertexBuffer(0,s),P.setIndexBuffer(o,"uint32"),P.setBindGroup(0,d),P.drawIndexed(a.length),F()},T=Tn(xr,I);I(T)},io=(n,e)=>{const t=on("graphics/03-projection",["/wireframe.ts","/wireframe.wgsl"]),r=W("Projecting a cube"),a=D(`
Along the journey in the direction of 3D scenes from 2D shapes a key stop is orthographic projection, known for its use in early game development (or in modern, as a stylistic choice).
This projection assumes a volume created by lines directly perpendicular to the image plane.

Wireframe rendering (using lines instead of triangles) is a simplification which can be used to observe the shape without having to deal with side differentiaion (through shading or unique colors).
`),i=nn(),o=K(br),s=_n(),c=k(vn(xr,45,0,360),"Rotation in degrees about (1, 1, 1)");s.append(c),i.append(o,s),n.append(r,t,a,i),e.push(ro)},ao=`struct Uniforms {
    mvps : array<mat4x4f, 3>,
};

@group(0) @binding(0) var<uniform> uniforms : Uniforms;

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) color : vec4f,
};

@vertex
fn main_vs(@location(0) inPos : vec4f, @location(1) inColor : vec4f, @builtin(instance_index) instance : u32
) -> VSOut
{
    var vsOut : VSOut;
    vsOut.position = uniforms.mvps[instance] * inPos;
    vsOut.color = inColor;
    return vsOut;
}

@fragment
fn main_fs(@location(0) inColor : vec4f) -> @location(0) vec4f
{
    return inColor;
}
`,yr="perspective",oo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(yr),a=Ge(y(0),1),i=new Float32Array(B(a.vertices)),o=a.lineIndices,{buffer:s}=Gn(n,o),{buffer:c,bufferLayout:l}=X(n,i,"float32x4"),{buffer:d,bufferLayout:h}=X(n,new Float32Array(B([f(.5,.5,.5,1),f(0,0,1,1),f(0,1,0,1),f(0,1,1,1),f(1,0,1,1),f(1,0,0,1),f(1,1,0,1),f(1,1,1,1)])),"float32x4",1),u=an(n,[l,h],t,ao,"line-list"),v=y(0,0,5),m=y(0),_=y(0,1,0),g=jn(v,m,_),x=ae(45,r.width/r.height,.1,100),w=E(qt,x),p=E(w,g),I=E(ke(0,y(1,1,1)),In(y(-2))),T=E(ke(45,y(0,1,0)),In(y(0))),b=E(In(y(2)),ke(45,y(1,1,0))),M=E(p,I),S=E(p,T),O=E(p,b),{bindGroup:P}=z(n,u,[new Float32Array(Te([M,S,O]))],"UNIFORM",0);(()=>{const{pass:R,executePass:A}=un(n,e,fn.black);R.setPipeline(u),R.setVertexBuffer(0,c),R.setVertexBuffer(1,d),R.setIndexBuffer(s,"uint32"),R.setBindGroup(0,P),R.drawIndexed(o.length,3),A()})()},so=(n,e)=>{const t=on("graphics/03-projection",["/perspective.ts","/perspective.wgsl"]),r=W("Considering different perspectives"),a=D(`
The commonly used projection is perspective projection which imitates real life cameras and human eyes. 
A common instance of perspective projection is the pinhole camera model.

The perspective model assumes camera rays have a single point oigin (the eye point) and create a 3D trapezoidal view volume by crossing the image plane.

Another key tool in managing objects on the GPU is instancing, a conceptual sibling to the flyweight design pattern. 
Multiples of an object which can be clearly differentiated by their extrinsic attributes (pose, color, size, etc.) can be instanced. 
A single set of their intrinsic attributes is enough to generate multiple instances and then, to adjust pose for example, apply a respective model matrix. With this method three cubes can be instanced from a single cube mesh definition. 

A further subclassification of perspective projections is based on number of vanishing points they consider. A vanishing point is generated by a non-parallel principal direction. 
The base case is one-point perspective projection (left), where the two other principal directions are parallel to the image plane, but there exists also two- (middle) and three-point (right) projections with one and none parallel principal directions respectively.
    `),i=nn(),o=K(yr,{width:1028-128}),s=_n();i.append(o,s),n.append(r,t,a,i),e.push(oo)},co=`struct Uniforms {
    time : f32,
    view : mat4x4f,
    projection : mat4x4f,
};

@group(0) @binding(0) var<uniform> uniforms : Uniforms;

@group(1) @binding(0) var<storage> models : array<mat4x4f>;
@group(1) @binding(1) var<storage> model_colors : array<vec4f>;

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) color : vec4f,
    @location(1) z : f32
};

@vertex
fn main_vs(@location(0) inPos : vec4f, @builtin(instance_index) instance : u32
) -> VSOut
{
    var view_space = uniforms.view * models[instance] * inPos + vec4f(0, .3 * sin(uniforms.time / 5e2), 0, 0);

    var vsOut : VSOut;
    vsOut.position = uniforms.projection * view_space;
    vsOut.color = model_colors[instance];
    vsOut.z = view_space.z;
    return vsOut;
}

@fragment
fn main_fs(@location(0) inColor : vec4f, @location(1) z : f32) -> @location(0) vec4f
{
    var z_mod = clamp((z + 10), .6, 1);
    return vec4f(inColor.rgb * z_mod, inColor.a);
}
`,wr="airplane",Ir="yaw-slider-airplane",Lr="pitch-slider-airplane",Tr="roll-slider-airplane",lo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(wr),a=N(Ir),i=N(Lr),o=N(Tr),s=Ge(y(0),1),c=s.lineIndices,l=new Float32Array(B(s.vertices)),{buffer:d}=Gn(n,c),{buffer:h,bufferLayout:u}=X(n,l,"float32x4"),v=an(n,[u],t,co,"line-list"),m=y(5,5,5),_=y(0),g=y(0,1,0),x=jn(m,_,g),w=ae(35,r.width/r.height,.1,100),p=E(qt,w),{bindGroup:I,buffers:[T]}=z(n,v,[new Float32Array([0,0,0,0,...rn(x),...rn(p)])],"UNIFORM",0),b=[],M=qn(.4,.4,2),S=E(qn(.35,.25,.35),In(y(0,-.2,3.3))),O=E(qn(1.7,.2,1.1),In(y(.6))),P=E(qn(1.7,.2,1.1),In(y(-.6))),F=E(qn(.2,.5,.3),In(y(0,.5,-3.3))),R=E(qn(.5,.1,.2),In(y(-.9,.4,-4.3))),A=E(qn(.5,.1,.2),In(y(.9,.4,-4.3))),Y=[M,S,O,P,F,R,A];b.push(...new Array(Y.length).fill(f(.7,.7,.7)));const en=(xn=Ln())=>E(E(qn(.1,.3,.2),xn),In(y(0,.5,-6)));b.push(f(0,1,0));const cn=(xn=Ln())=>E(E(qn(.25,.05,.2),xn),In(y(2,.4,-5.3))),j=(xn=Ln())=>E(E(qn(.25,.05,.2),xn),In(y(-2,.4,-5.3)));b.push(f(1,0,0),f(1,0,0));const C=(xn=Ln())=>E(E(In(y(-1,.1,-.5)),xn),qn(1,.1,.3)),V=(xn=Ln())=>E(E(In(y(1,.1,-.5)),xn),qn(1,.1,.3));b.push(f(.4,.4,1),f(.4,.4,1));const G=[...Y,en(),cn(),j(),C(),V()],{bindGroup:J,buffers:ln}=z(n,v,[new Float32Array(Te(G)),new Float32Array(B(b))],"STORAGE",1);let bn=0,wn=0,tn=0,dn=0,mn=0,H=0;const q=.1,En=xn=>{Z(n,T,new Float32Array([xn]),0);const Vn=1*a();dn=dn*(1-q)+Vn*q,bn+=dn;const An=1*i();mn=mn*(1-q)+An*q,wn+=mn;const Jn=1*o();H=H*(1-q)+Jn*q,tn+=H;const Sn=Ee(-dn*20),pn=Pe(-mn*20),se=H>0?Pe(H*60):Ln(),ye=H<0?Pe(-H*60):Ln(),$n=E(E(Pe(wn),Ee(bn)),Ki(tn)),$=[...Y.map(te=>E($n,te)),E($n,en(Sn)),E($n,cn(pn)),E($n,j(pn)),E($n,C(se)),E($n,V(ye))],gn=$.map(te=>E($n,te));Z(n,ln[0],new Float32Array(Te(gn)),0);const{pass:On,executePass:ge}=un(n,e,fn.black);On.setPipeline(v),On.setVertexBuffer(0,h),On.setIndexBuffer(d,"uint32"),On.setBindGroup(0,I),On.setBindGroup(1,J),On.drawIndexed(c.length,$.length),ge(),requestAnimationFrame(En)};requestAnimationFrame(En)},ho=(n,e)=>{const t=on("graphics/03-projection",["/airplane.ts","/airplane.wgsl"]),r=W("About Gimbal's lock"),a=D(`
As we descend into the depths of computer graphics, rotations of objects in three dimensions will become a big part of creating interactive showcases.

An issue which appears when using Euler angles with only three angle axes (three units of freedom) is a phenomenon known as Gimbal's lock. 
The short version is that a three-axes system cannot guarantee independent rotations. Each rotation is "local" to the previous rotations.
This can be observed when making half-rotations around two axess, which eliminates the third axis (ie. it does not have an effect).

In a later section, quaternions are introduced which are four dimensional abstractions of vectors. The fourth dimension allows the rotation information to remain absolute (without a reference system). 
One may think of these are homogeneous Euler angles.
    `),i=nn(),o=K(wr),s=_n(),c=k(vn(Ir,0,-1,1,.1),"Green rudder control (yaw)"),l=k(vn(Lr,0,-1,1,.1),"Red elevators control (pitch)"),d=k(vn(Tr,0,-.5,.5,.1),"Blue ailerons control (roll)");s.append(c,l,d),i.append(o,s),n.append(r,t,a,i),e.push(lo)},fo=(n,e)=>{io(n,e),so(n,e),ho(n,e)},uo=`struct SceneData {
    pvm : mat4x4f,
    observer : vec4f,
    ligth_emission : vec4f,
    ambient_diffuse_specular_shininess : vec4f,
    shading_type : f32
};

@group(0) @binding(0) var<uniform> scene_data : SceneData;

const light_direction = vec3f(0, 0, -1.);
const visibility = 1.;

fn incident_light() -> vec3f
{
    return visibility * scene_data.ligth_emission.rgb;
}

fn phong(normal : vec3f, position : vec3f) -> vec3f
{
    var specular_reflectance = scene_data.ambient_diffuse_specular_shininess[2];
    var s = scene_data.ambient_diffuse_specular_shininess[3];

    var incident_light_direction = - light_direction;

    var reflected = 2 * dot(incident_light_direction, normal) * normal - incident_light_direction;
    var to_observer = normalize(scene_data.observer.xyz - position);

    var phong = specular_reflectance * incident_light() * pow(max(0, dot(reflected, to_observer)), s);

    return phong;
}

fn lambertian(normal : vec3f) -> vec3f
{
    var diffuse_reflectance = scene_data.ambient_diffuse_specular_shininess[1];
    var ambient_reflectance = scene_data.ambient_diffuse_specular_shininess[0];

    var lambertian_diffuse = diffuse_reflectance * incident_light() * max(0, dot(normal, -light_direction));

    return lambertian_diffuse + ambient_reflectance * scene_data.ligth_emission.rgb;
}

fn shading(color : vec4f, normal : vec3f, position : vec3f) -> vec4f
{
    return vec4f(lambertian(normal) * color.rgb + phong(normal, position), color.a);
}

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) color : vec4f,
    @location(1) model_position : vec3f,
    @location(2) normal : vec3f
};

@vertex
fn main_vs(@location(0) inPos : vec4f, @location(1) color : vec4f) -> VSOut
{
    var gouraud_shading = shading(.5 * inPos + .5, inPos.xyz, inPos.xyz);

    var vsOut : VSOut;
    vsOut.position = scene_data.pvm * inPos;
    vsOut.color = select(gouraud_shading, inPos, scene_data.shading_type > 0);

    vsOut.model_position = inPos.xyz;
    vsOut.normal = inPos.xyz;

    return vsOut;
}

@fragment
fn main_fs(@location(0) color : vec4f, @location(1) position : vec3f, @location(2) normal : vec3f) -> @location(0) vec4f
{
    var phong_shading = shading(.5 * color + .5, normalize(normal), position);

    var result = select(color, phong_shading, scene_data.shading_type > 0);
    return result;
}
`,Ar="graphics-lighting",$e="rotation-around-tetrahedron",_t="subdivision-tetrahedron",Sr="tetrahedron-rotation-animation-enabled",mt="diffuse-reflectance-tetrahedron",pt="specular-reflectance-tetrahedron",gt="ambient-reflectance-tetrahedron",bt="shading-type-tetrahedron",xt="shininess-tetrahedron",yt="tetrahedron-light-emission",vo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Ar),a=N($e),i=N(_t),o=N(bt),s=N(gt),c=N(mt),l=N(pt),d=N(xt),h=N(yt),u=new Array(8).fill(0).map((dn,mn)=>Nt(mn)),{buffer:v}=Gn(n,new Uint32Array(B(u[7].triangleIndices.map(dn=>Pn(dn))))),{buffer:m,bufferLayout:_}=X(n,new Float32Array(B(u[7].vertices)),"float32x4"),{buffer:g,bufferLayout:x}=X(n,new Float32Array(B([f(1,0,0),f(0,1,0),f(0,0,1),f(1,1,1),...new Array(u[7].vertices.length-4).fill(f(.4,.4,.4))])),"float32x4",1);zn(n,v,new Uint32Array(B(u[i()].triangleIndices.map(dn=>Pn(dn)))),0,!0);const w=4,{multisample:p,msaaTexture:I}=xe(n,r,t,w),{createDepthTexture:T,depthStencil:b,depthStencilAttachmentFactory:M}=oe(n,r,w),S=an(n,[_,x],t,uo,"triangle-list",{multisample:p,depthStencil:b});T();const O=Dn(a()),P=y(3*Math.sin(O),0,3*Math.cos(O)),F=y(0),R=y(0,1,0),A=jn(P,F,R),en=ae(45,r.width/r.height,.1,100),j=E(en,A),C={"Gouraud shading (vertex)":0,"Phong shading (fragment)":1},{bindGroup:V,buffers:[G]}=z(n,S,[new Float32Array([...rn(j),...f(...P),...Ze(_e(h())),...f(s(),c(),l(),d()),...f(C[o()])])],"UNIFORM",0),J=dn=>{const mn=Dn(dn),H=y(3*Math.sin(mn),0,3*Math.cos(mn)),q=jn(H,F,R),xn=E(en,q);Z(n,G,new Float32Array([...rn(xn),...f(...H)]),0)};Tn(_t,dn=>{zn(n,v,new Uint32Array(B(u[dn].triangleIndices.map(mn=>Pn(mn)))),0,!0)}),Tn($e,J);let bn=!0;Tn(Sr,()=>bn=document.getElementById($e).disabled=!bn),Gt([bt,xt,pt,mt,gt,yt],()=>{Z(n,G,new Float32Array([...Ze(_e(h())),...f(s(),c(),l(),d()),...f(C[o()])]),80)});const tn=dn=>{bn&&J(dn/50);const{pass:mn,executePass:H}=un(n,e,f(.2,.2,.2),{depthStencilAttachmentFactory:M,msaaTexture:I});mn.setPipeline(S),mn.setVertexBuffer(0,m),mn.setVertexBuffer(1,g),mn.setIndexBuffer(v,"uint32"),mn.setBindGroup(0,V),mn.drawIndexed(u[i()].triangleCount*3),H(),requestAnimationFrame(tn)};requestAnimationFrame(tn)},_o=(n,e)=>{const t=on("graphics/04-lighting",["/lighting.ts","/shading.wgsl"]),r=W("Shining light on tetrahedrons"),a=D(`
Armed with the power of perspective projecting, we are able to tackle our first mesh - a sphere. But this is no regular sphere, it is a sphere created from a subdivided tetrahedron. This is an alternative to the other popular sphere-generation algorithm - the UV sphere, which is more akin to the traingle fan circle (triangles with roots at both of the sphere poles).

The tetrahedron is a three dimensional object created from four equilateral triangles. The sides can be subdivided into smaller equilateral triangles, theorertically infinitely. 
The new vertices generated by this method should be normalized to make sure they lay on the unit sphere - the ideal model the tetrahedron tries very hard to converge to.

At this point index buffers are also introduced. These are integer buffers which complement vertex buffers.
In most models triangles share edges and vertices to ensure a continious surface of the model. 
Therefore vertex buffers will contain duplicates of vertices which, especially for large models, bloat the buffer. 
Index buffers are introduced as middlemen indices (pointers) to a vertex array of unique vertices to cut down on the vertices and using a more compact data type (integers) to do the heavy lifting.

In the tetrahedron sphere algorithm, the calculation of new indices is handled with a temporary map which stores indices for created vertices.

Lighting is also added with the introduction of a few world champions of the computer graphics universe. These are:

1) The Lambertian reflectance model, which defines the resulting light reflecting (ie. visible light) from a light ray hitting a diffuse surface. A diffuse surface is a surface which reflects light in multiple directions (scattering). The resulting visible illuminated surface of a Lambertian object is the same regardless of the angle an observer views the object.

2) The Phong reflectance mdoel, which is a lighting model that takes into consideration the specular reflectance of an object's surface material. This model is an extension to the Lambertian reflectance model.

3) Goroud shading, which uses lighting models in vertex space (vertex shader). The light (or shading) on an object's surface is defined at the vertex shader (as an attribute of the vertex) which is interpolated by the pipeline before the fragment shader stage.

4) Phong shading, which uses lighting models in fragment space (fragment shader). The light on an object's surface is at the fragment shader stage (each fragment calculates its own lighting).

Between the two approaches to shading, Goroud is the definite winner in terms of efficiency with only as many computations as there are vertices, but it is vastly lower quality than Phong shading, especially for models with large triangles.
    `),i=nn(),o=K(Ar),s=_n(),c=k(Xn(Sr,!0),"Animated rotation",!1),l=vn($e,0,-180,180,1,!0),d=k(l,"Rotation around the tetrahedron"),h=k(vn(_t,4,0,7,1),"Number of tetrahedron subdivisions"),u=k(Bn(bt,["Gouraud shading (vertex)","Phong shading (fragment)"],"Gouraud shading"),"Shading type",!1),v=k(vn(mt,1,0,2,.1),"Diffuse reflectance"),m=k(vn(pt,1,0,2,.1),"Specular reflectance"),_=k(vn(xt,15,0,50,1),"Shininess"),g=k(vn(gt,.1,0,2,.1),"Ambient reflectance"),x=k(Xe(yt,"#ffffff"),"Light emission",!1);s.append(c,d,h,u,v,m,g,_,x),i.append(o,s),n.append(r,t,a,i),e.push(vo)},mo=`struct SceneData {
    pvm : mat4x4f,
    observer : vec4f,
};

@group(0) @binding(0) var<uniform> scene_data : SceneData;

const light_direction = normalize(vec3f(-1, 0, -1));
const ligth_emission = vec4f(.8, .8, .8, 1);
const ambient_diffuse_specular_shininess = vec4f(.4, 1, .6, 20);
const visibility = 1.;

fn incident_light() -> vec3f
{
    return visibility * ligth_emission.rgb;
}

fn phong(normal : vec3f, position : vec3f) -> vec3f
{
    var specular_reflectance = ambient_diffuse_specular_shininess[2];
    var s = ambient_diffuse_specular_shininess[3];

    var incident_light_direction = - light_direction;

    var reflected = 2 * dot(incident_light_direction, normal) * normal - incident_light_direction;
    var to_observer = normalize(scene_data.observer.xyz - position);

    var phong = specular_reflectance * incident_light() * pow(max(0, dot(reflected, to_observer)), s);

    return phong;
}

fn lambertian(normal : vec3f) -> vec3f
{
    var diffuse_reflectance = ambient_diffuse_specular_shininess[1];
    var ambient_reflectance = ambient_diffuse_specular_shininess[0];

    var lambertian_diffuse = diffuse_reflectance * incident_light() * max(0, dot(normal, -light_direction));

    return lambertian_diffuse + ambient_reflectance * ligth_emission.rgb;
}

fn shading(color : vec4f, normal : vec3f, position : vec3f) -> vec4f
{
    return vec4f(lambertian(normal) * color.rgb + phong(normal, position), color.a);
}

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) color : vec4f,
    @location(1) model_position : vec3f,
    @location(2) normal : vec3f
};

@vertex
fn main_vs(@location(0) inPos : vec4f, @location(1) normal : vec3f) -> VSOut
{
    var vsOut : VSOut;
    vsOut.position = scene_data.pvm * vec4f(inPos.xyz, 1);
    vsOut.color = vec4f(1, 1, 1, 1);
    vsOut.model_position = inPos.xyz;
    vsOut.normal = normal;

    return vsOut;
}

@fragment
fn main_fs(@location(0) color : vec4f, @location(1) position : vec3f, @location(2) normal : vec3f) -> @location(0) vec4f
{
    var phong_shading = shading(.5 * color + .5, normalize(normal), position);

    return phong_shading;
}
`,Rr="monkey",Br="rotation-around-monkey",po=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Rr),a=await Hn(hn("models/monkey.obj"),1,!1),i=Yn(a,{indicesIn3:!0}),{buffer:o}=Gn(n,i.indices),{buffer:s,bufferLayout:c}=X(n,i.vertices,"float32x4"),{buffer:l,bufferLayout:d}=X(n,i.normals,"float32x4",1),{msaaTexture:h,multisample:u}=xe(n,r,t,4),{createDepthTexture:v,depthStencil:m,depthStencilAttachmentFactory:_}=oe(n,r,4),g=an(n,[c,d],t,mo,"triangle-list",{depthStencil:m,multisample:u,primitive:{frontFace:"ccw",cullMode:"back"}});v();const x=Dn(0),w=4,p=0,I=y(w*Math.sin(x),p,w*Math.cos(x)),T=y(0),b=y(0,1,0),M=jn(I,T,b),O=ae(30,r.width/r.height,.1,100),P=E(O,M),F=Ln(),R=E(P,F),{bindGroup:A,buffers:[Y]}=z(n,g,[new Float32Array([...rn(R),...I,1])],"UNIFORM",0);Tn(Br,j=>{const C=Dn(j),V=y(w*Math.sin(C),p,w*Math.cos(C)),G=jn(V,T,b),J=E(O,G),ln=E(J,F);Z(n,Y,new Float32Array([...rn(ln),...V,1]),0),cn()});const cn=()=>{const{pass:j,executePass:C}=un(n,e,fn.black,{depthStencilAttachmentFactory:_,msaaTexture:h});j.setPipeline(g),j.setVertexBuffer(0,s),j.setVertexBuffer(1,l),j.setIndexBuffer(o,"uint32"),j.setBindGroup(0,A),j.drawIndexed(i.indices.length),C()};cn()},go=(n,e)=>{const t=on("graphics/05-meshes",["/mesh.ts","/shading.wgsl"]),r=W("The Blender Monkey"),a=D(`
More interesting than primitive shapes are models created to represent specific objects. The entire graphics pipeline is made to support the display and animation of such models.

As an example, the mascot of the 3D modelling software Blender - Suzanne - is rendered to the screen below. The same lighting set up is used as with the sphere.

Another graphics feature is added to the mix - z-buffer indexing. This is the process of creating a (temporary for the time of creating the framebuffer) z-buffer. It store the z value (depth) of a fragment when it is drawn.
Each following fragment's depth value to compared to the current closest fragment and it may either be discarded (if it is covered) or it may overwrite if it is the closer (to the viewer) fragment.
    `),i=nn(),o=K(Rr),s=_n(),c=k(vn(Br,0,-180,180,1),"Rotation around the monkey");s.append(c),i.append(o,s),n.append(r,t,a,i),e.push(po)},bo=`@group(0) @binding(0) var texture_sampler : sampler;
@group(0) @binding(1) var checkerboard_texture : texture_2d<f32>;

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) uv : vec2f,
};

fn perspective_projection_matrix(fovy_rad : f32, aspect : f32, near : f32, far : f32) -> mat4x4f
{
    var f = 1. / tan(fovy_rad / 2);
    var d = far - near;

    return mat4x4f(vec4f(f / aspect, 0, 0, 0), vec4f(0, f, 0, 0), vec4f(0, 0, -(near + far) / d, -1), vec4f(0, 0, -2 * near * far / d, 0));
}


@vertex
fn main_vs(@location(0) inPos : vec4f, @location(1) uv : vec2f) -> VSOut
{
    var perspective = perspective_projection_matrix(1.570796, 1, 0.1, 21);

    var vsOut : VSOut;
    vsOut.position = perspective * inPos;
    vsOut.uv = uv;

    return vsOut;
}

@fragment
fn main_fs(@location(0) uv : vec2f) -> @location(0) vec4f
{
    var color = textureSample(checkerboard_texture, texture_sampler, uv);
    return color;
}
`,Pr="checkerboard-test",wt="texture-repeat-style",xo=["clamp-to-edge","repeat","mirror-repeat"],It="magnification-checkerboard",Lt="minification-checkerboard",lt=["linear","nearest"],yo=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(Pr),r=N(wt),a=N(Lt),i=N(It),o=N(Tt),s=new Float32Array(B([f(-4,-1,-1),f(4,-1,-1),f(4,-1,-21),f(-4,-1,-21)])),c=new Uint32Array([0,1,2,0,2,3]),l=new Float32Array(B([L(-1.5,0),L(2.5,0),L(2.5,10),L(-1.5,10)])),{buffer:d}=Gn(n,c),{buffer:h,bufferLayout:u}=X(n,s,"float32x4"),{buffer:v,bufferLayout:m}=X(n,l,"float32x2",1),_=an(n,[u,m],t,bo,"triangle-list"),g=ra(64,8,8),x=at(g,64,!0),w=async()=>{const{texture:p,sampler:I}=ee(n,g,64,64,{addressModeU:r(),addressModeV:r(),minFilter:a(),magFilter:i(),mipmapFilter:o()},{mips:x}),T=Nn(n,_,p,I),{pass:b,executePass:M}=un(n,e,fn.blueScreenBlue);b.setPipeline(_),b.setVertexBuffer(0,h),b.setVertexBuffer(1,v),b.setIndexBuffer(d,"uint32"),b.setBindGroup(0,T),b.drawIndexed(6),M()};Gt([wt,It,Lt,Tt],w),w()},Tt="mipmap-select-checkerboard",wo=(n,e)=>{const t=on("graphics/06-textures",["/checkerboard.ts","/checkerboard.wgsl"]),r=W("The unseen end of the checkers board"),a=D(`
Applying texture to objects is rather trivial. The hard part comes with trying to make the texture work properly in the scene and fighting at the same time with the two elements of texture space immutability - magnification and minification or in simple words, when a texel and a pixel are not of the same size (or even aligned for that matter).

Magnification happens when texture elements (texels) cover multiple pixels. This means that many pixels have to be the color of the single texel they correlate to. Blurring can be used to smooth the rough edges created by the enlarged texture objects.

The more complex counterpart is minification, which means that a single pixel contains more than one texel. In this case color mixing (averaging) has to be applied to get a single deterministic result.

Another method for manipulating textures in space is mipmapping (mip from the latin phrase multum in parvo, "much in a small space"). Mip maps are multiple variants of the same texture in different levels of details (ie. resolution).
According to the need, a lower resolution texture can be selected to address the phenomenon of aliasing or moiré patterns. 

In the example below, the checkerboard texture has a couple levels of mipmaps created. Each level has a different color to more easily observe the transition.
The latter layers (where the texture is the farthest from the camera and therefore a lower resolution texture is called for) is just a grey blob. At this point, the checkerboard pattern has been averaged into grey.
`),i=nn(),o=K(Pr),s=_n(),c=k(Bn(wt,xo,"repeat"),"Texture edge behaviour",!1),l=k(Bn(Lt,lt,"nearest"),"Minification behaviour",!1),d=k(Bn(It,lt,"nearest"),"Magnification behaviour",!1),h=k(Bn(Tt,lt,"nearest"),"Mipmap behaviour",!1);s.append(c,l,d,h),i.append(o,s),n.append(r,t,a,i),e.push(yo)},Io=`struct SceneData {
    pvm : mat4x4f,
};

@group(0) @binding(0) var<uniform> scene_data : SceneData;

@group(1) @binding(0) var texture_sampler : sampler;
@group(1) @binding(1) var texture : texture_2d<f32>;

const light_direction = vec3f(0, 0, -1.);
const visibility = 1.;
const diffuse_reflectance = 1.;
const ambient_reflectance = .4;
const ligth_emission = vec3f(1, 1, 1);
const PI = 3.14159;
const PI2 = 2 * PI;

fn incident_light() -> vec3f
{
    return visibility * ligth_emission;
}

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) color : vec4f,
    @location(1) model_position : vec3f,
    @location(2) normal : vec3f
};

@vertex
fn main_vs(@location(0) inPos : vec4f, @location(1) color : vec4f) -> VSOut
{
    var gouraud_shading = shading(.5 * inPos + .5, inPos.xyz, inPos.xyz);

    var vsOut : VSOut;
    vsOut.position = scene_data.pvm * inPos;
    vsOut.color = color;

    vsOut.model_position = inPos.xyz;
    vsOut.normal = inPos.xyz;

    return vsOut;
}

fn lambertian(normal : vec3f) -> vec3f
{
    var lambertian_diffuse = diffuse_reflectance * incident_light() * max(0, dot(normal, -light_direction));

    return lambertian_diffuse + ambient_reflectance * ligth_emission;
}

fn shading(color : vec4f, normal : vec3f, position : vec3f) -> vec4f
{
    return vec4f(lambertian(normal) * color.rgb, 1);
}

fn spherical_to_uv(spherical : vec3f) -> vec2f
{
    var u = 1 - atan2(spherical.z, spherical.x) / (PI2);
    var v = acos(spherical.y) / PI;

    return vec2f(u, v);
}

fn flip_uv(uv : vec2f) -> vec2f
{
    return vec2f(uv.x, 1 - uv.y);
}

@fragment
fn main_fs(@location(0) color : vec4f, @location(1) position : vec3f, @location(2) normal : vec3f) -> @location(0) vec4f
{
    var uv = spherical_to_uv(normal);
    var sample = textureSample(texture, texture_sampler, flip_uv(uv));

    var result = shading(sample, normalize(normal), position);
    return result;
}
`,Or="earth",Lo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Or),{textureData:a,width:i,height:o}=await he(hn("textures/earth.jpg")),s=Nt(7),{buffer:c}=Gn(n,new Uint32Array(B(s.triangleIndices.map(V=>Pn(V))))),{buffer:l,bufferLayout:d}=X(n,new Float32Array(B(s.vertices)),"float32x4"),{buffer:h,bufferLayout:u}=X(n,new Float32Array(B([f(1,0,0),f(0,1,0),f(0,0,1),f(1,1,1),...new Array(s.vertices.length-4).fill(f(.4,.4,.4))])),"float32x4",1),v=4,{multisample:m,msaaTexture:_}=xe(n,r,t,v),{depthStencil:g,depthStencilAttachmentFactory:x}=oe(n,r,v),w=an(n,[d,u],t,Io,"triangle-list",{multisample:m,depthStencil:g}),{sampler:p,texture:I}=ee(n,a,i,o,{minFilter:"nearest",magFilter:"nearest"}),T=Nn(n,w,I,p,1),b=Dn(0),M=y(3*Math.sin(b),0,3*Math.cos(b)),S=y(0),O=y(0,1,0),P=jn(M,S,O),R=ae(45,r.width/r.height,.1,100),Y=E(R,P),{bindGroup:en,buffers:[cn]}=z(n,w,[new Float32Array(rn(Y))],"UNIFORM",0),j=V=>{const G=Dn(V),J=y(3*Math.sin(G),Math.cos(G),3*Math.cos(G)),ln=jn(J,S,O),wn=E(R,ln);Z(n,cn,new Float32Array(rn(wn)),0)},C=V=>{j(V/50);const{pass:G,executePass:J}=un(n,e,f(.5,.1,.5),{depthStencilAttachmentFactory:x,msaaTexture:_});G.setPipeline(w),G.setVertexBuffer(0,l),G.setVertexBuffer(1,h),G.setIndexBuffer(c,"uint32"),G.setBindGroup(0,en),G.setBindGroup(1,T),G.drawIndexed(s.triangleCount*3),J(),requestAnimationFrame(C)};requestAnimationFrame(C)},To=(n,e)=>{const t=on("graphics/06-textures",["/earth.ts","/earth.wgsl"]),r=W("Earth ball"),a=D(`
Using the sphere algorithm from the previous section combined with the ability to apply textures, a simplified model of the Earth can be created.

The sphere texture is a two dimensional rectangle and has to be mapped to a sphere. This is done with a uv-mapping function, which in this case is spherical uv-mapping.

To address magnification and minification, settings can be fiddled with, but in some cases it may not be possible to find a perfect solution.
With the earth texture, certain regions with high elevation are prone to aliasing issues due to many sudden changes in color values. 
This could be fixed by applying a heightmap which could stretch the crowded texels over a larger surface, but on a flat surface could instead be treated with applied smoothing filters.

Note: the earth texture is quite large and may take some time to load into the browser.
`),i=nn(),o=K(Or),s=_n();s.append(),i.append(o,s),n.append(r,t,a,i),e.push(Lo)},Ao=(n,e)=>{wo(n,e),To(n,e)},So=`@group(0) @binding(0) var cube_sampler : sampler;
@group(0) @binding(1) var cube_texture : texture_cube < f32>;

struct MTex {
    m_texs : array<mat4x4f, 2>
}

@group(1) @binding(0) var<uniform> m_tex : MTex;
@group(1) @binding(1) var<uniform> eye : vec3f;
@group(1) @binding(2) var<uniform> reflection_type : u32;

@group(2) @binding(0) var normal_sampler : sampler;
@group(2) @binding(1) var normal_texture : texture_2d<f32>;

const light_direction = vec3f(0, 0, -1.);
const visibility = 1.;
const diffuse_reflectance = 1.;
const ambient_reflectance = .4;
const ligth_emission = vec3f(1, 1, 1);
const PI = 3.14159;
const PI2 = 2 * PI;

fn incident_light() -> vec3f
{
    return visibility * ligth_emission;
}

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) normal : vec3f,
    @location(1) object_type : f32
};

@vertex
fn main_vs(@location(0) inPos : vec4f, @location(1) normal : vec4f, @location(2) m_tex_index : u32) -> VSOut
{
    var vsOut : VSOut;
    vsOut.position = inPos;

    vsOut.object_type = 1. - f32(m_tex_index);
    vsOut.normal = (m_tex.m_texs[m_tex_index] * normal).xyz;

    return vsOut;
}

fn lambertian(normal : vec3f) -> vec3f
{
    var lambertian_diffuse = diffuse_reflectance * incident_light() * max(0, dot(normal, -light_direction));

    return lambertian_diffuse + ambient_reflectance * ligth_emission;
}

fn shading(color : vec4f, normal : vec3f, position : vec3f) -> vec4f
{
    return vec4f(lambertian(normal) * color.rgb, 1);
}


fn spherical_to_uv(spherical : vec3f) -> vec2f
{
    var u = 1 - atan2(spherical.z, spherical.x) / (PI2);
    var v = acos(spherical.y) / PI;

    return vec2f(u, v);
}

const en16 = 0.000000000000001;

fn rotate_to_normal(n : vec3f, v : vec3f) -> vec3f {
    var sgn_nz = sign(n.z + en16);
    var a = -1.0 / (1.0 + abs(n.z));
    var b = n.x * n.y * a;
    return vec3f(1.0 + n.x * n.x * a, b, -sgn_nz * n.x) * v.x
    + vec3f(sgn_nz * b, sgn_nz * (1.0 + n.y * n.y * a), -n.y) * v.y
    + n * v.z;
}

fn flip_uv(uv : vec2f) -> vec2f
{
    return vec2f(uv.x, 1 - uv.y);
}

const view_type = 4;

@fragment
fn main_fs(@location(0) normal : vec3f, @location(1) object_type : f32) -> @location(0) vec4f
{
    var is_sphere = object_type==1.;

    //Faux reflection

    var faux_sample = textureSample(cube_texture, cube_sampler, normal);

    //Mirror reflection

    var incident = normalize(normal - eye);
    var reflected = reflect(incident, normal);

    var direction = select(normal, reflected, is_sphere);

    var mirror_sample = textureSample(cube_texture, cube_sampler, direction);

    //Show normal map

    var normal_map_color = textureSample(normal_texture, normal_sampler, flip_uv(spherical_to_uv(normal)));
    var when_normal_map_color = select(faux_sample, normal_map_color, is_sphere);

    //Reflections with bumps

    var normal_mapped = normal_map_color * 2 - 1;
    var rotated_normal = rotate_to_normal(normal, normal_mapped.xyz);
    var bump_sample = textureSample(cube_texture, cube_sampler, rotated_normal);
    var when_bump_color = select(faux_sample, bump_sample, is_sphere);

    switch (reflection_type)
    {
        default :
        {
            return vec4f(0);
        }
        case 0 :
        {
            return faux_sample;
        }
        case 1 :
        {
            return mirror_sample;
        }
        case 2 :
        {
            return when_normal_map_color;
        }
        case 3 :
        {
            return when_bump_color;
        }
    }
}
`,kr="texture-sphere-with-quad",Fr="env-sphere-reflect-type",Mr={"Faux reflection":0,"Mirror reflection":1,"Show normal map":2,"Bump reflection":3},Ro=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(kr),[a,...i]=await Promise.all(["textures/normalmap.png","textures/cubemap/cm_left.png","textures/cubemap/cm_right.png","textures/cubemap/cm_top.png","textures/cubemap/cm_bottom.png","textures/cubemap/cm_back.png","textures/cubemap/cm_front.png"].map(An=>he(hn(An)))),o=y(0,0,3),s=y(0),c=y(0,1,0),l=jn(o,s,c),h=ae(90,r.width/r.height,.1,100),u=E(h,l),v=Jt(h),m=Jt(l),_=ea(m,[0,0],[3,3]),g=Cn(),x=ta(_,g),w=E(x,v),p=Nt(7),I=B(p.triangleIndices.map(An=>Pn(An))),T=B(p.vertices.map(An=>Fe(An,u))),b=.999,M=B([f(-1,-1,b,1),f(1,-1,b,1),f(-1,1,b,1),f(1,1,b,1)]),S=[p.vertices.length+0,p.vertices.length+1,p.vertices.length+2,p.vertices.length+1,p.vertices.length+3,p.vertices.length+2],{buffer:O}=Gn(n,new Uint32Array([...I,...S])),{buffer:P,bufferLayout:F}=X(n,new Float32Array([...T,...M]),"float32x4"),{buffer:R,bufferLayout:A}=X(n,new Float32Array([...B(p.vertices),...M]),"float32x4",1),{buffer:Y,bufferLayout:en}=X(n,new Float32Array([...Array(p.vertices.length).fill(0),...Array(4).fill(1)]),"uint32",2),cn=4,{multisample:j,msaaTexture:C}=xe(n,r,t,cn),{depthStencil:V,depthStencilAttachmentFactory:G}=oe(n,r,cn),J=an(n,[F,A,en],t,So,"triangle-list",{multisample:j,depthStencil:V}),{sampler:ln,cubemapTexture:bn}=Ga(n,i.map(An=>An.textureData),i[0].width,i[0].height),wn=Nn(n,J,bn,ln,0,{createViewOverwrite:{dimension:"cube"}}),{bindGroup:tn,buffers:[dn,mn,H]}=z(n,J,[new Float32Array(Te([Ln(),w])),new Float32Array([...o]),new Uint32Array([0])],"UNIFORM",1),{texture:q,sampler:En}=ee(n,a.textureData,a.width,a.height),xn=Nn(n,J,q,En,2),Vn=An=>{const Jn=Mr[An];zn(n,H,new Uint32Array([Jn]),0);const{pass:Sn,executePass:pn}=un(n,e,f(.5,.1,.5),{depthStencilAttachmentFactory:G,msaaTexture:C});Sn.setPipeline(J),Sn.setVertexBuffer(0,P),Sn.setVertexBuffer(1,R),Sn.setVertexBuffer(2,Y),Sn.setIndexBuffer(O,"uint32"),Sn.setBindGroup(0,wn),Sn.setBindGroup(1,tn),Sn.setBindGroup(2,xn),Sn.drawIndexed(p.triangleCount*3+S.length),pn()};Vn(Tn(Fr,Vn))},Bo=(n,e)=>{const t=on("graphics/07-env-mapping",["/texturedSphereWithQuad.ts","/texturedSphereWithQuad.wgsl"]),r=W("A map to the environment"),a=D(`
An enviromental map can be represented as a single texture or, more conviniently, as a cube map - a set of six textures in each of the six directions of a cube.
These are commonly used in modern game development as skybox textures or can be used in more advanced forms of shadow mapping.

In the example below, an environment texture is applied to the scene in the form of a skybox (textures on a plane infinitely far away from the camera). The sphere in the center is a mirror-ish ball with four possible states.
    
1) Faux reflection - the reflection is not exactly a true mirror, as the ball rather maps the value of the environment directly leaving its surface along the normal at that point.

2) Mirror reflection - more realistic reflection which follows the Law of Reflection, where the reflected ray depends on the angle upon which the viewer sees the surface. 
The angle of reflection is mirrored about the surface normal which is why at the edges of the sphere more of the scene is visible, albeit squished.

3) Show normal map - a precursor to the fourth option, a normal map can be applied to alter the behavior of the surface normal at the point (and its respective texture coordinate).
The normal map combines with the surface normal to create a new surface normal. In the case, the "bump" misplaces the normal in a pattern to create a wave effect over the sphere surface.

4) Bump reflection - this is the final effect when the normal map is applied to the sphere's surface.

A difficulty arising from the non-atomic structure of the rasterization pipeline, as opposed to the rendering pipeline, is that finding a ray direction or the intersection of a ray is nigh impossible.
In the example below, to find the environmental map value a set of reverse matrix transformations have to be applied. A point on the surface of the unit sphere is also the direction of the look up into the environemntal map.
In the fragment shader, a fragment's texture look up direction can be found by premultiplying the interpolated homogeneous normalized device coordinate of the fragment by the inverse view matrix and inverse projection matrix (the reverse order of finding the fragment's camera space position).
`),i=nn(),o=K(kr),s=_n(),c=k(Bn(Fr,Object.keys(Mr),"Faux reflection"),"Reflection type",!1);s.append(c),i.append(o,s),n.append(r,t,a,i),e.push(Ro)},Po=(n,e)=>{Bo(n,e)},tr=`@group(0) @binding(0) var marble_sampler : sampler;
@group(0) @binding(1) var marble_texture : texture_2d<f32>;

@group(1) @binding(0) var<uniform> model_matrix : mat4x4f;

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) uv : vec2f,
};

fn perspective_projection_matrix(fovy_rad : f32, aspect : f32, near : f32, far : f32) -> mat4x4f
{
    var f = 1. / tan(fovy_rad / 2);
    var d = far - near;

    return mat4x4f(vec4f(f / aspect, 0, 0, 0), vec4f(0, f, 0, 0), vec4f(0, 0, -(near + far) / d, -1), vec4f(0, 0, -2 * near * far / d, 0));
}

@vertex
fn main_vs(@location(0) inPos : vec4f, @location(1) uv : vec2f) -> VSOut
{
    var perspective = perspective_projection_matrix(1.570796, 1, 0.1, 5);

    var vsOut : VSOut;
    vsOut.position = perspective * model_matrix * inPos;
    vsOut.uv = uv;

    return vsOut;
}

@fragment
fn main_fs(@location(0) uv : vec2f) -> @location(0) vec4f
{
    var color = textureSample(marble_texture, marble_sampler, uv);
    return color;
}
`,Er="shadow-quads",Oo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Er),a=await he(hn("textures/xamp23.png")),i=new Uint32Array([0,1,2,0,2,3]),o=new Float32Array(B([L(0,0),L(1,0),L(1,1),L(0,1)])),s=new Float32Array(B([f(-2,-1,-1),f(2,-1,-1),f(2,-1,-5),f(-2,-1,-5)])),c=new Float32Array(B([f(-1,-1,-2.5),f(-1,-1,-3),f(-1,0,-3),f(-1,0,-2.5)])),l=new Float32Array(B([f(.25,-.5,-1.25),f(.75,-.5,-1.25),f(.75,-.5,-1.75),f(.25,-.5,-1.75)])),{buffer:d}=Gn(n,new Uint32Array([...i,...i.map(ln=>ln+4),...i.map(ln=>ln+8),...i.map(ln=>ln+12),...i.map(ln=>ln+16)])),{buffer:h,bufferLayout:u}=X(n,new Float32Array([...s,...c,...l,...c,...l]),"float32x4"),{buffer:v,bufferLayout:m}=X(n,new Float32Array([...o]),"float32x2",1),{depthStencil:_,depthStencilAttachmentFactory:g}=oe(n,r,1),x=an(n,[u,m],t,tr,"triangle-list",{depthStencil:_}),{depthStencil:w}=oe(n,r,1,{depthStencilOverwrites:{depthCompare:"greater"}}),p=an(n,[u,m],t,tr,"triangle-list",{depthStencil:w,primitive:{cullMode:"none"}},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),I=at(a.textureData,a.width),{texture:T,sampler:b}=ee(n,a.textureData,a.width,a.height,{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest",mipmapFilter:"nearest"},{mips:I}),M=Nn(n,x,T,b),{texture:S,sampler:O}=ee(n,new Uint8Array([255,0,0,255]),1,1),P=Nn(n,x,S,O),{texture:F,sampler:R}=ee(n,new Uint8Array([0,0,0,125]),1,1),A=Nn(n,x,F,R),{bindGroup:Y}=z(n,x,[new Float32Array(rn(Ln()))],"UNIFORM",1),{bindGroup:en,buffers:[cn]}=z(n,x,[new Float32Array(rn(Ln()))],"UNIFORM",1),j=-1-2-.001,C=Cn(1,0,0,0,0,1,0,0,0,0,1,0,0,1/j,0,0),V=Ln(),G=ln=>{const bn=In(ln),wn=In(ne(ln,-1)),tn=E(E(E(bn,C),wn),V);Z(n,cn,new Float32Array(rn(tn)),0)},J=ln=>{const bn=ln/1e3,wn=y(2*Math.cos(bn),2,2*Math.sin(bn)-2);G(wn);const{pass:tn,executePass:dn}=un(n,e,fn.blueScreenBlue,{depthStencilAttachmentFactory:g});tn.setVertexBuffer(0,h),tn.setVertexBuffer(1,v),tn.setIndexBuffer(d,"uint32"),tn.setPipeline(x),tn.setBindGroup(0,M),tn.setBindGroup(1,Y),tn.drawIndexed(6),tn.setPipeline(p),tn.setBindGroup(1,en),tn.setBindGroup(0,A),tn.drawIndexed(12,void 0,6),tn.setPipeline(x),tn.setBindGroup(1,Y),tn.setBindGroup(0,P),tn.drawIndexed(12,void 0,18),dn(),requestAnimationFrame(J)};requestAnimationFrame(J)},ko=(n,e)=>{const t=on("graphics/08-shadows",["/shadows.ts","/shadows.wgsl"]),r=W("Shadow as a shape"),a=D(`
Implementing shadows in the rasterization pipeline is no simple task. Shapes have very limited information about the existence of other shapes out of the box.
The entire system is based on a simple ordered drawing of shapes to the screen.

There is a way to implement shadows while staying in the shapes only paradigm - projection shadows. The concept is simple, shadows are in fact copies of their obstructing object.
The projection shadow objects are drawn with the appropriate transformation matrix (depending on the light source).

To make sure shadows only exist on the surfaces of shadow-catching objects (such as the plane in the example below and not beyond it), 
clever manipulation of the z-buffer can be used to make sure a shape is only drawn if there exists a fragement beneath it.
Further modification of the draw orders or implementations of draw layers would allow mixing and matching shadow casters and shadow catchers.
    `),i=nn(),o=K(Er),s=_n();s.append(),i.append(o,s),n.append(r,t,a,i),e.push(Oo)},Fo=(n,e)=>{ko(n,e)},Mo=`@group(0) @binding(0) var marble_sampler : sampler;
@group(0) @binding(1) var marble_texture : texture_2d<f32>;

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) uv : vec2f,
};

fn perspective_projection_matrix(fovy_rad : f32, aspect : f32, near : f32, far : f32) -> mat4x4f
{
    var f = 1. / tan(fovy_rad / 2);
    var d = far - near;

    return mat4x4f(vec4f(f / aspect, 0, 0, 0), vec4f(0, f, 0, 0), vec4f(0, 0, -(near + far) / d, -1), vec4f(0, 0, -2 * near * far / d, 0));
}

@vertex
fn main_vs(@location(0) inPos : vec4f, @location(1) uv : vec2f) -> VSOut
{
    var perspective = perspective_projection_matrix(1.570796, 1, 0.1, 5);

    var vsOut : VSOut;
    vsOut.position = perspective * inPos;
    vsOut.uv = uv;

    return vsOut;
}

@fragment
fn main_fs(@location(0) uv : vec2f) -> @location(0) vec4f
{
    var color = textureSample(marble_texture, marble_sampler, uv);
    return color;
}
`,Eo=`@group(0) @binding(0) var<uniform> teapot_model : mat4x4f;
@group(0) @binding(1) var<uniform> light_position : vec3f;

const eye = vec3f(0, 0, 0);
const ligth_emission = vec4f(2, 2, 2, 1);
const ambient_diffuse_specular_shininess = vec4f(.2, 1, .8, 30);
const visibility = 1.;

fn perspective_projection_matrix(fovy_rad : f32, aspect : f32, near : f32, far : f32) -> mat4x4f
{
    var f = 1. / tan(fovy_rad / 2);
    var d = far - near;

    return mat4x4f(vec4f(f / aspect, 0, 0, 0), vec4f(0, f, 0, 0), vec4f(0, 0, -(near + far) / d, -1), vec4f(0, 0, -2 * near * far / d, 0));
}

fn incident_light() -> vec3f
{
    return visibility * ligth_emission.rgb;
}

fn phong(normal : vec3f, position : vec3f) -> vec3f
{
    var specular_reflectance = ambient_diffuse_specular_shininess[2];
    var s = ambient_diffuse_specular_shininess[3];

    var incident_light_direction = light_position - position;
    var length_to_light = length(incident_light_direction);
    incident_light_direction = normalize(incident_light_direction);

    var reflected = 2 * dot(incident_light_direction, normal) * normal - incident_light_direction;
    var to_observer = normalize(eye - position);

    var phong = specular_reflectance * incident_light() * pow(max(0, dot(reflected, to_observer)), s) / (length_to_light * length_to_light);

    return phong;
}

fn lambertian(normal : vec3f, position : vec3f) -> vec3f
{
    var diffuse_reflectance = ambient_diffuse_specular_shininess[1];
    var ambient_reflectance = ambient_diffuse_specular_shininess[0];

    var incident_light_direction = light_position - position;
    var length_to_light = length(incident_light_direction);

    var lambertian_diffuse = diffuse_reflectance * incident_light() * max(0, dot(normal, normalize(incident_light_direction))) / (length_to_light * length_to_light);

    return lambertian_diffuse + ambient_reflectance * ligth_emission.rgb;
}

fn shading(color : vec4f, normal : vec3f, position : vec3f) -> vec4f
{
    return vec4f(lambertian(normal, position) * color.rgb + phong(normal, position), color.a);
}

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) color : vec4f,
    @location(1) world : vec3f,
    @location(2) normal : vec3f
};

@vertex
fn main_vs(@location(0) inPos : vec4f, @location(1) normal : vec3f, @location(2) color : vec4f) -> VSOut
{
    var perspective = perspective_projection_matrix(1.570796, 1, 0.1, 5);

    var vsOut : VSOut;
    vsOut.position = perspective * teapot_model * inPos;
    vsOut.color = color;
    vsOut.normal = normal;
    vsOut.world = (teapot_model * inPos).xyz;

    return vsOut;
}

@fragment
fn main_fs(@location(0) color : vec4f, @location(1) world : vec3f, @location(2) normal : vec3f) -> @location(0) vec4f
{
    var phong_shading = shading(.5 * color + .5, normalize(normal), world);

    return phong_shading;
}
`,zo=`@group(0) @binding(0) var<uniform> shadow_model : mat4x4f;

struct VSOut {
    @builtin(position) position : vec4f,
};

fn perspective_projection_matrix(fovy_rad : f32, aspect : f32, near : f32, far : f32) -> mat4x4f
{
    var f = 1. / tan(fovy_rad / 2);
    var d = far - near;

    return mat4x4f(vec4f(f / aspect, 0, 0, 0), vec4f(0, f, 0, 0), vec4f(0, 0, -(near + far) / d, -1), vec4f(0, 0, -2 * near * far / d, 0));
}

@vertex
fn main_vs(@location(0) inPos : vec4f) -> VSOut
{
    var perspective = perspective_projection_matrix(1.570796, 1, 0.1, 5);

    var vsOut : VSOut;
    vsOut.position = perspective * shadow_model * inPos;

    return vsOut;
}

@fragment
fn main_fs() -> @location(0) vec4f
{
    return vec4f(0, 0, 0, .3);
}
`,zr="teapot-proj-shadow",Vr="teapot-movement-teapot",Gr="light-movement-teapot",Vo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(zr),a=N(Vr,"checked"),i=N(Gr,"checked"),o=await he(hn("textures/xamp23.png")),s=await Hn(hn("models/teapot.obj"),.25,!1),c=Yn(s,{indicesIn3:!0}),{depthStencil:l,depthStencilAttachmentFactory:d}=oe(n,r,4),{depthStencil:h}=oe(n,r,4,{depthStencilOverwrites:{depthCompare:"greater"}}),{msaaTexture:u,multisample:v}=xe(n,r,t,4),{buffer:m}=Gn(n,c.indices),{buffer:_,bufferLayout:g}=X(n,c.vertices,"float32x4"),{buffer:x,bufferLayout:w}=X(n,c.normals,"float32x4",1),{buffer:p,bufferLayout:I}=X(n,c.colors,"float32x4",2),T=an(n,[g,w,I],t,Eo,"triangle-list",{depthStencil:l,multisample:v}),b=an(n,[g],t,zo,"triangle-list",{depthStencil:h,multisample:v,primitive:{cullMode:"front"}},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),M=new Uint32Array([0,1,2,0,2,3]),S=new Float32Array(B([L(0,0),L(1,0),L(1,1),L(0,1)])),O=new Float32Array(B([f(-2,-1,-1),f(2,-1,-1),f(2,-1,-5),f(-2,-1,-5)])),{buffer:P}=Gn(n,new Uint32Array([...M])),{buffer:F,bufferLayout:R}=X(n,new Float32Array([...O]),"float32x4"),{buffer:A,bufferLayout:Y}=X(n,new Float32Array([...S]),"float32x2",1),en=an(n,[R,Y],t,Mo,"triangle-list",{depthStencil:l,multisample:v}),cn=at(o.textureData,o.width),{texture:j,sampler:C}=ee(n,o.textureData,o.width,o.height,{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest",mipmapFilter:"nearest"},{mips:cn}),V=Nn(n,en,j,C),{bindGroup:G,buffers:[J,ln]}=z(n,T,[new Float32Array(rn(Cn())),new Float32Array(y())],"UNIFORM",0),{bindGroup:bn,buffers:[wn]}=z(n,b,[new Float32Array(rn(Ln()))],"UNIFORM",0),tn=-1-2-.001,dn=Cn(1,0,0,0,0,1,0,0,0,0,1,0,0,1/tn,0,0),mn=(Vn,An)=>{const Jn=In(Vn),Sn=In(ne(Vn,-1)),pn=E(E(E(Jn,dn),Sn),An);Z(n,wn,new Float32Array(rn(pn)),0)};let H=0,q=0,En=0;const xn=Vn=>{const An=(Vn-En)/1e3;H+=a()?An:0,q+=i()?An:0;const Jn=y(2*Math.cos(q),2,2*Math.sin(q)-2),Sn=In(y(0,(Math.cos(H)*3-1)/4,-3));mn(Jn,Sn),Z(n,J,new Float32Array(rn(Sn)),0),Z(n,ln,new Float32Array(Jn),0);const{pass:pn,executePass:se}=un(n,e,fn.blueScreenBlue,{depthStencilAttachmentFactory:d,msaaTexture:u});pn.setPipeline(en),pn.setVertexBuffer(0,F),pn.setVertexBuffer(1,A),pn.setIndexBuffer(P,"uint32"),pn.setBindGroup(0,V),pn.drawIndexed(6),pn.setPipeline(b),pn.setBindGroup(0,bn),pn.setVertexBuffer(0,_),pn.setIndexBuffer(m,"uint32"),pn.drawIndexed(c.indices.length),pn.setPipeline(T),pn.setVertexBuffer(0,_),pn.setVertexBuffer(1,x),pn.setVertexBuffer(2,p),pn.setIndexBuffer(m,"uint32"),pn.setBindGroup(0,G),pn.drawIndexed(c.indices.length),se(),En=Vn,requestAnimationFrame(xn)};requestAnimationFrame(xn)},Go=(n,e)=>{const t=on("graphics/09-shadow-mapping",["/teapotShadows.ts","/plane.wgsl","/teapot.wgsl","/teapotShadow.wgsl"]),r=W("Tea time"),a=D(`
Before venturing into the topic of shadow maps, another example of projection shadows (previous section) is shown to provide a basis of comparison.

The opacity of the teapot's shadow is generated by enabling blending in the render pipeline configuration. 
This is required to let the projected shape mix colors with the fragements beneath it, instead of overwriting them in the z-buffer.
`),i=nn(),o=K(zr),s=_n(),c=k(Xn(Vr,!0),"Teapot movement",!1),l=k(Xn(Gr,!0),"Light movement",!1);s.append(c,l),i.append(o,s),n.append(r,t,a,i),e.push(Vo)},Co=`@group(0) @binding(0) var marble_sampler : sampler;
@group(0) @binding(1) var marble_texture : texture_2d<f32>;

@group(1) @binding(0) var<uniform> projection_view : mat4x4f;
@group(1) @binding(1) var<uniform> light_proj_view : mat4x4f;
@group(1) @binding(2) var<uniform> teapot_model : mat4x4f;

@group(2) @binding(0) var shadow_map : texture_2d<f32>;

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) uv : vec2f,
    @location(1) shadow_lookup : vec4f
};

@vertex
fn main_vs(@location(0) position : vec4f, @location(1) uv : vec2f) -> VSOut
{
    var vsOut : VSOut;
    vsOut.position = projection_view * position;
    vsOut.uv = uv;

    var a = teapot_model;

    let pos_from_light = light_proj_view * position;
    vsOut.shadow_lookup = pos_from_light;
    //vec3f(pos_from_light.xy * vec2(0.5, -0.5) + vec2(0.5), pos_from_light.z);

    return vsOut;
}

@fragment
fn main_fs(@builtin(position) pos : vec4f, @location(0) uv : vec2f, @location(1) shadow_lookup : vec4f) -> @location(0) vec4f
{
    let t = (shadow_lookup.xyz / shadow_lookup.w) * vec3f(.5, -.5, 1) + vec3f(.5, .5, 0);

    var texture = textureSample(marble_texture, marble_sampler, uv);
    var visibility = 1- textureLoad(shadow_map, vec2i(t.xy * 512), 0);

    return visibility * texture;
}
`,jo=`@group(0) @binding(0) var<uniform> teapot_model : mat4x4f;
@group(0) @binding(1) var<uniform> light_position : vec3f;
@group(0) @binding(2) var<uniform> projection_view : mat4x4f;

const eye = vec3f(0, 0, 0);
const ligth_emission = vec4f(2, 2, 2, 1);
const ambient_diffuse_specular_shininess = vec4f(.2, 1, .8, 30);
const visibility = 1.;

fn incident_light() -> vec3f
{
    return visibility * ligth_emission.rgb;
}

fn phong(normal : vec3f, position : vec3f) -> vec3f
{
    var specular_reflectance = ambient_diffuse_specular_shininess[2];
    var s = ambient_diffuse_specular_shininess[3];

    var incident_light_direction = light_position - position;
    var length_to_light = length(incident_light_direction);
    incident_light_direction = normalize(incident_light_direction);

    var reflected = 2 * dot(incident_light_direction, normal) * normal - incident_light_direction;
    var to_observer = normalize(eye - position);

    var phong = specular_reflectance * incident_light() * pow(max(0, dot(reflected, to_observer)), s) / (length_to_light * length_to_light);

    return phong;
}

fn lambertian(normal : vec3f, position : vec3f) -> vec3f
{
    var diffuse_reflectance = ambient_diffuse_specular_shininess[1];
    var ambient_reflectance = ambient_diffuse_specular_shininess[0];

    var incident_light_direction = light_position - position;
    var length_to_light = length(incident_light_direction);

    var lambertian_diffuse = diffuse_reflectance * incident_light() * max(0, dot(normal, normalize(incident_light_direction))) / (length_to_light * length_to_light);

    return lambertian_diffuse + ambient_reflectance * ligth_emission.rgb;
}

fn shading(color : vec4f, normal : vec3f, position : vec3f) -> vec4f
{
    return vec4f(lambertian(normal, position) * color.rgb + phong(normal, position), color.a);
}

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) color : vec4f,
    @location(1) world : vec3f,
    @location(2) normal : vec3f
};

@vertex
fn main_vs(@location(0) inPos : vec4f, @location(1) normal : vec3f, @location(2) color : vec4f) -> VSOut
{
    var vsOut : VSOut;
    vsOut.position = projection_view * teapot_model * inPos;
    vsOut.color = color;
    vsOut.normal = normal;
    vsOut.world = (teapot_model * inPos).xyz;

    return vsOut;
}

@fragment
fn main_fs(@location(0) color : vec4f, @location(1) world : vec3f, @location(2) normal : vec3f) -> @location(0) vec4f
{
    var phong_shading = shading(.5 * color + .5, normalize(normal), world);

    return phong_shading;
}
`,Uo=`@group(0) @binding(0) var<uniform> model : mat4x4f;
@group(0) @binding(1) var<uniform> projection_view : mat4x4f;

struct VertexOutput {
    @builtin(position) position : vec4f,
    @location(0) projected : vec4f
}

@vertex
fn main_vs(@location(0) position : vec4f) -> VertexOutput
{
    var projected = projection_view * model * position;
    return VertexOutput(projected, projected);
}

struct FragmentOutput {
    @location(0) o1 : vec4f,
    @location(1) o2 : vec4f,
}

@fragment
fn main_fs(input : VertexOutput) -> FragmentOutput
{
    let z = input.projected.z / input.projected.w;

    var fo : FragmentOutput;
    fo.o1 = vec4f(z, z, z, 1.);
    fo.o2 = vec4f(z, z, z, 1.);

    return fo;
}
`,Qe="shadow-mapping",Cr="teapot-movement-shadow-mapping",jr="light-movement-shadow-mapping",No=async()=>{const n=N(Cr,"checked"),e=N(jr,"checked"),t=await he(hn("textures/xamp23.png")),r=await Hn(hn("models/teapot.obj"),.25,!1),a=Yn(r,{indicesIn3:!0}),{device:i,context:o,canvasFormat:s,canvas:c}=await sn(Qe),l=document.getElementById(Qe+"-shadow"),d=l.getContext("gpupresent")||l.getContext("webgpu");d.configure({device:i,format:s});const{depthStencil:h,depthStencilAttachmentFactory:u}=oe(i,c,1),{buffer:v}=Gn(i,a.indices),{buffer:m,bufferLayout:_}=X(i,a.vertices,"float32x4"),{buffer:g,bufferLayout:x}=X(i,a.normals,"float32x4",1),{buffer:w,bufferLayout:p}=X(i,a.colors,"float32x4",2),I=an(i,[_,x,p],s,jo,"triangle-list",{depthStencil:h}),T=i.createTexture({size:{width:l.width,height:l.height,depthOrArrayLayers:1},mipLevelCount:1,sampleCount:1,dimension:"2d",format:"rgba32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC}),b=T.createView(),M=i.createShaderModule({code:Uo}),S=i.createRenderPipeline({layout:"auto",vertex:{module:M,entryPoint:"main_vs",buffers:[_]},fragment:{module:M,entryPoint:"main_fs",targets:[{format:s},{format:"rgba32float"}]},primitive:{cullMode:"none",topology:"triangle-list"}}),{bindGroup:O,buffers:[P,F]}=z(i,S,[new Float32Array(rn(Ln())),new Float32Array(rn(Cn()))],"UNIFORM",0),R=new Uint32Array([0,1,2,0,2,3]),A=new Float32Array(B([L(0,0),L(1,0),L(1,1),L(0,1)])),Y=new Float32Array(B([f(-2,-1,-1),f(2,-1,-1),f(2,-1,-5),f(-2,-1,-5)])),{buffer:en}=Gn(i,new Uint32Array([...R])),{buffer:cn,bufferLayout:j}=X(i,new Float32Array([...Y]),"float32x4"),{buffer:C,bufferLayout:V}=X(i,new Float32Array([...A]),"float32x2",1),G=an(i,[j,V],s,Co,"triangle-list",{depthStencil:h}),J=i.createBindGroup({layout:G.getBindGroupLayout(2),entries:[{binding:0,resource:T.createView()}]}),ln=new Float32Array(rn(ae(90,1,.001,6))),bn=$=>{const gn=ae(100,1,.01,4),On=jn($,y(0,-1,-3),sr.up);return E(gn,On)},wn=$=>{const gn=new Float32Array(rn(bn($)));Z(i,F,gn,0),Z(i,mn,gn,0)},{bindGroup:tn,buffers:[dn,mn,H]}=z(i,G,[ln,new Float32Array(rn(Cn())),new Float32Array(rn(Cn()))],"UNIFORM",1),q=at(t.textureData,t.width),{texture:En,sampler:xn}=ee(i,t.textureData,t.width,t.height,{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest",mipmapFilter:"nearest"},{mips:q}),Vn=Nn(i,G,En,xn),{bindGroup:An,buffers:[Jn,Sn]}=z(i,I,[new Float32Array(rn(Cn())),new Float32Array(y()),ln],"UNIFORM",0);let pn=0,se=0,ye=0;const $n=$=>{const gn=($-ye)/1e3;pn+=n()?gn:0,se+=e()?gn:0;const On=y(2*Math.cos(se),2,2*Math.sin(se)-2);Z(i,Sn,new Float32Array(On),0),wn(On);const ge=In(y(0,(Math.cos(pn)*3-1)/4,-3)),te=new Float32Array(rn(ge));Z(i,Jn,te,0),Z(i,P,te,0),Z(i,H,te,0);const Se=i.createCommandEncoder(),ve=Se.beginRenderPass({colorAttachments:[{view:d.getCurrentTexture().createView(),loadOp:"clear",clearValue:{r:0,g:0,b:0,a:1},storeOp:"store"},{view:b,loadOp:"clear",clearValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]});ve.setPipeline(S),ve.setVertexBuffer(0,m),ve.setIndexBuffer(v,"uint32"),ve.setBindGroup(0,O),ve.drawIndexed(a.indices.length),ve.end();const Mn=Se.beginRenderPass({colorAttachments:[{view:o.getCurrentTexture().createView(),loadOp:"clear",clearValue:fn.blueScreenBlue,storeOp:"store"}],depthStencilAttachment:u()});Mn.setPipeline(G),Mn.setVertexBuffer(0,cn),Mn.setVertexBuffer(1,C),Mn.setIndexBuffer(en,"uint32"),Mn.setBindGroup(0,Vn),Mn.setBindGroup(1,tn),Mn.setBindGroup(2,J),Mn.drawIndexed(6),Mn.setPipeline(I),Mn.setVertexBuffer(0,m),Mn.setVertexBuffer(1,g),Mn.setVertexBuffer(2,w),Mn.setIndexBuffer(v,"uint32"),Mn.setBindGroup(0,An),Mn.drawIndexed(a.indices.length),Mn.end(),i.queue.submit([Se.finish()]),ye=$,requestAnimationFrame($n)};requestAnimationFrame($n)},Do=(n,e)=>{const t=on("graphics/09-shadow-mapping",["/shadowMapping.ts","/planeMapped.wgsl","/teapotMapped.wgsl","/teapotShadowMapped.wgsl"]),r=W("Tea time 2: the tea that wasn't"),a=D(`
Shadow mapping is another approach to handling shadows in the rasterization pipeline, but instead of using primitives to generate shadows, the other side of the system is utilized - cameras.
More specifically, projection and view matrices are defined for each light in the scene and the shadow is created by answering a simple question - does the light's camera see this surface point?

This is certainly more complicated than generating additional shapes, but vastly more universal (and slightly more costly). 
The resulting shadow map is the scene from the camera's perspective, which can be used as a color texture within shadow catching objects to discolor or darken obstructed parts of the surface.

The shadow map look up has to calculated using the light's camera matrix within the shadow catcher's reference in the shader.

To provide more clarity, the below example has two canvases. The first is the teapot scene with shadow maps instead of projection shadows. 
The second is the same scene from the light's perspective. In this case the light is only interested in focusing on the teapot and will adjust it's pose to always view the teapot. 
Anything else is out of scope for this specific camera. 

The plane may (after the shadow map pass has finished) read from the shadow map texture. The shader for the plane must calculate the fragment position as it would be visible in the light's camera.
If a value exists, this means the teapot is visible at that position, and therefore the plane is not visible and should be shaded.
`),i=nn(),o=K(Qe),s=_n(),c=k(Xn(Cr,!0),"Teapot movement",!1),l=k(Xn(jr,!0),"Light movement",!1);s.append(c,l),i.append(o,s);const d=nn(),h=K(Qe+"-shadow");d.append(h),n.append(r,t,a,i,d),e.push(No)},Ho=(n,e)=>{Go(n,e),Do(n,e)},qo=`struct SceneData {
    pvm : mat4x4f,
    observer : vec4f,
};

@group(0) @binding(0) var<uniform> scene_data : SceneData;

const light_direction = normalize(vec3f(-1, 0, -1));
const ligth_emission = vec4f(.8, .8, .8, 1);
const ambient_diffuse_specular_shininess = vec4f(.4, 1, .6, 20);
const visibility = 1.;

fn incident_light() -> vec3f
{
    return visibility * ligth_emission.rgb;
}

fn phong(normal : vec3f, position : vec3f) -> vec3f
{
    var specular_reflectance = ambient_diffuse_specular_shininess[2];
    var s = ambient_diffuse_specular_shininess[3];

    var incident_light_direction = - light_direction;

    var reflected = 2 * dot(incident_light_direction, normal) * normal - incident_light_direction;
    var to_observer = normalize(scene_data.observer.xyz - position);

    var phong = specular_reflectance * incident_light() * pow(max(0, dot(reflected, to_observer)), s);

    return phong;
}

fn lambertian(normal : vec3f) -> vec3f
{
    var diffuse_reflectance = ambient_diffuse_specular_shininess[1];
    var ambient_reflectance = ambient_diffuse_specular_shininess[0];

    var lambertian_diffuse = diffuse_reflectance * incident_light() * max(0, dot(normal, -light_direction));

    return lambertian_diffuse + ambient_reflectance * ligth_emission.rgb;
}

fn shading(color : vec4f, normal : vec3f, position : vec3f) -> vec4f
{
    return vec4f(lambertian(normal) * color.rgb + phong(normal, position), color.a);
}

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) color : vec4f,
    @location(1) model_position : vec3f,
    @location(2) normal : vec3f
};

@vertex
fn main_vs(@location(0) inPos : vec4f, @location(1) normal : vec3f) -> VSOut
{
    var vsOut : VSOut;
    vsOut.position = scene_data.pvm * vec4f(inPos.xyz, 1);
    vsOut.color = vec4f(1, 1, 1, 1);
    vsOut.model_position = inPos.xyz;
    vsOut.normal = normal;

    return vsOut;
}

@fragment
fn main_fs(@location(0) color : vec4f, @location(1) position : vec3f, @location(2) normal : vec3f) -> @location(0) vec4f
{
    var phong_shading = shading(.5 * color + .5, normalize(normal), position);

    return phong_shading;
}
`,At="camera-movement",Ur="movement-type-cam-movement",$o=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(At),a=N(Ur),i=await Hn(hn("models/monkey.obj"),1,!1),o=Yn(i,{indicesIn3:!0}),{buffer:s}=Gn(n,o.indices),{buffer:c,bufferLayout:l}=X(n,o.vertices,"float32x4"),{buffer:d,bufferLayout:h}=X(n,o.normals,"float32x4",1),{msaaTexture:u,multisample:v}=xe(n,r,t,4),{depthStencil:m,depthStencilAttachmentFactory:_}=oe(n,r,4),g=an(n,[l,h],t,qo,"triangle-list",{depthStencil:m,multisample:v}),x=y(0,0,5);let w=y(0,0,5);const p=y(0);let I=y();const T=y(0,1,0);let b=y(0,1,0);const M=jn(x,p,T),O=ae(30,r.width/r.height,.1,100),P=E(O,M),F=Ln(),R=E(P,F),{bindGroup:A,buffers:[Y]}=z(n,g,[new Float32Array([...rn(R),...x,1])],"UNIFORM",0),en=1,cn=.01;let j=a(),C=0,V=0,G=0,J=0,ln=0,bn=0,wn=Oa();const tn=$=>ce($,0,512,-1,1);let dn=L(),mn=L(),H=0;const q=$=>{H=0,dn=L($.x,$.y),Vn=0,C=$.x,V=$.y,j=a()},En=$=>{if((j==="Dollying"||j==="Panning")&&(ln=cn*($.x-C),bn=-cn*($.y-V)),j==="Quaternion rotation"||j==="Euler rotation"){G+=-en*($.x-C),J+=-en*($.y-V);const gn=-tn(C),On=tn(V),ge=-tn($.x),te=tn($.y),Se=Math.sqrt(gn*gn+On*On),ve=Math.sqrt(ge*ge+te*te),Mn=Ue=>Ue>1/Math.sqrt(2)?1/(2*Ue):Math.sqrt(1-Ue*Ue),ji=y(gn,On,Mn(Se)),Ui=y(ge,te,Mn(ve)),Ni=Ma(ji,Ui);wn=Ke(wn,Ni)}C=$.x,V=$.y},xn=$=>{if(ln=0,bn=0,j!=="Quaternion rotation"||(mn=L($.x,$.y),lr(dn,mn)))return;const gn=be(mn,dn);H=Math.min(Ut(gn),20)};let Vn=0;const An=()=>{if(j!=="Quaternion rotation"){H=0;return}C=dn[0],V=dn[1];const $=H*Math.exp(-Vn/150),gn=U(dn,ne(Wn(be(mn,dn)),$));H<.2&&(H=0),Vn+=1,En({x:gn[0],y:gn[1]})};Ye(At,{onStart:q,onMove:En,onEnd:xn});const Jn=()=>{const $=E(Pe(J),Ee(G)),gn=Fe(x,$),On=Fe(T,$);return{view:jn(gn,p,On),eye:gn}},Sn=()=>{const $=Pn(Oe([...b,1],wn)),gn=Pn(Oe([...w,1],wn));return{view:jn(gn,I,$),eye:gn}},pn=()=>(w[2]+=bn,Sn()),se=()=>{const $=ne(Pn(Oe(f(1),wn)),ln),gn=ne(Pn(Oe(f(0,1),wn)),bn);return I=be(I,U($,gn)),Sn()},ye=()=>{const $={"Euler rotation":Jn,"Quaternion rotation":Sn,Dollying:pn,Panning:se}[a()](),gn=E(O,$.view),On=E(gn,F);Z(n,Y,new Float32Array([...rn(On),...$.eye,1]),0)},$n=()=>{H>0&&An(),ye();const{pass:$,executePass:gn}=un(n,e,fn.black,{depthStencilAttachmentFactory:_,msaaTexture:u});$.setPipeline(g),$.setVertexBuffer(0,c),$.setVertexBuffer(1,d),$.setIndexBuffer(s,"uint32"),$.setBindGroup(0,A),$.drawIndexed(o.indices.length),gn(),requestAnimationFrame($n)};requestAnimationFrame($n)},Wo=(n,e)=>{const t=on("graphics/10-camera-movement",["/cameraMagic.ts","/shading.wgsl"]),r=W("Quaternions - engineering space magic"),a=D(`
Quaternions get a bad reputation due their abstract complexity and use of spooky imaginary numbers. But looking past the quaternion mathematical definition, it helps to understand the concept and foremost, the purpose of the enigmatic quaternion.

The quaternion addresses an issue which was mentioned earlier - Gimbal's lock. Using only three degrees of freedom to control rotation results in two axis "overpowering" the third - or in other words, rotations are local and impact each other.
Quaternions allow "absolute" rotation where the reference is world space. 
The fourth degree enables the quaternion to store more information about the rotation which in turn enables the rotation to always be in the correct direction relative to the camera or world space.

In the example below it is easy to obfuscate up one of the axes of rotation (where only two are being manipulated). One half rotation around the y-axis will flip the direction of rotation, while the acting "force" did not change its form. Changing to quaternion rotation solves this issue. the applied rotation is always the same, no matter what the previous rotation was.

The quaternion rotation is implemented with trackball movement which simulates the use of trackball peripheral device. The trackball allows the user to rotate in three directions unlike the mouse which is bound to the two dimensional plane. In the canvas below (when in quaternion rotation mode), the moving along the center axes of the canvas will rotated strictly about the respective axis, whereas movement along the edges of the canvas will generate more complex rotations involving the third rotation axis (depth).

Two more camera movement options are implemented - panning and dollying - which are translational movements along the parallel plane and along the perpendicular plane respectively.
`),i=nn(),o=K(At),s=_n(),c=k(Bn(Ur,["Euler rotation","Quaternion rotation","Dollying","Panning"],"Quaternion rotation"),"Movement type",!1);s.append(c),i.append(o,s),n.append(r,t,a,i),e.push($o)},Xo=(n,e)=>{Wo(n,e)},Yo=(n,e)=>({intrinsics:ae(85,1,.001,100),extrinsics:Nr(n,e)}),Nr=(n,e)=>{const t=U(n,e);return jn(n,t,y(0,1,0))},St=n=>E(n.intrinsics,n.extrinsics),rr=n=>"instances"in n;var yn=(n=>(n[n.OUT_OF_BOUNDS=-1]="OUT_OF_BOUNDS",n[n.EMPTY=0]="EMPTY",n[n.NORMAL=1]="NORMAL",n[n.PICKUP=2]="PICKUP",n[n.SPAWN=3]="SPAWN",n[n.END=4]="END",n[n.LIGHT=5]="LIGHT",n))(yn||{}),Q=(n=>(n[n.NORTH=1]="NORTH",n[n.EAST=2]="EAST",n[n.SOUTH=4]="SOUTH",n[n.WEST=8]="WEST",n))(Q||{});const Jo=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;\r
@group(0) @binding(1) var<uniform> player_position : vec3f;\r
\r
@group(1) @binding(0) var texture_sampler : sampler;\r
@group(1) @binding(1) var texture : texture_2d<f32>;\r
\r
struct LightSource {\r
    position : vec4f,\r
    direction : vec4f,\r
    projection : mat4x4f,\r
    light_tint : vec4f,\r
};\r
\r
@group(2) @binding(0) var<uniform> light_sources : array<LightSource, 30>;\r
@group(2) @binding(1) var shadow_maps : texture_2d_array<f32>;\r
@group(2) @binding(2) var<uniform> active_light_indices : vec4u;\r
\r
const ambient_light = vec3f(.001);\r
const fog_tint = vec3f(.025, .025, .125);\r
\r
struct VertexOutput {\r
    @builtin(position) position : vec4f,\r
    @location(0) normal : vec3f,\r
    @location(1) uv : vec2f,\r
    @location(2) world_position : vec4f,\r
};\r
\r
@vertex\r
fn main_vs(@location(0) local : vec4f, @location(1) normal : vec4f, @location(2) uv : vec2f\r
) -> VertexOutput\r
{\r
    var vr : VertexOutput;\r
    vr.position = projection_view * local;\r
    vr.normal = normal.xyz;\r
    vr.uv = uv;\r
    vr.world_position = local;\r
    return vr;\r
}\r
\r
fn calculate_visibility(light_index : u32, world_position : vec4f) -> f32\r
{\r
    let shadow_lookup = light_sources[light_index].projection * world_position;\r
    let t = (shadow_lookup.xyz / shadow_lookup.w) * vec3f(.5, -.5, 1) + vec3f(.5, .5, 0);\r
\r
    let lookup = t.xy * vec2f(2048, 512);\r
    var visibility = textureLoad(shadow_maps, vec2i(i32(lookup.x), i32(lookup.y)), light_index, 0).r;\r
\r
    let covered = abs(t.z - visibility) > 0.0003;\r
    visibility = select(visibility, 0., covered);\r
\r
    visibility = select(visibility, max(.9, visibility), shadow_lookup.z < .3);\r
\r
    let out_of_frustrum = t.x > 1 || t.x < 0 || t.y > 1 || t.y < 0 || shadow_lookup.z < 0.001;\r
    visibility = select(visibility, .9, out_of_frustrum);\r
\r
    let behind_wall = shadow_lookup.z < -.16;\r
    visibility = select(visibility, 0., behind_wall);\r
\r
    return visibility;\r
}\r
\r
fn lambertian(normal : vec3f, world_position : vec4f) -> vec3f\r
{\r
    var lambertian = vec3f(0);\r
\r
    for (var i : u32 = 0; i < 4; i++)\r
    {\r
        let light = light_sources[active_light_indices[i]];\r
\r
        let light_position = light.position.xyz;\r
        let line_to_light = light_position.xyz - world_position.xyz;\r
        let distance_to_light = length(line_to_light);\r
        let parallelity_to_light = max(0, dot(normal, line_to_light / distance_to_light));\r
\r
        let light_wall_direction = light.direction;\r
        let wall_light_boost = max(1, dot(normal, light_wall_direction.xyz) * 4.5);\r
\r
        let light_emission = light.light_tint.rgb * light.light_tint.w;\r
\r
        let visibility = calculate_visibility(active_light_indices[i], world_position);\r
        lambertian += visibility * light_emission * parallelity_to_light * wall_light_boost / (distance_to_light * distance_to_light);\r
    }\r
\r
    return lambertian + ambient_light;\r
}\r
\r
fn distance_fog(world_position : vec4f) -> f32\r
{\r
    const fog_steps = 10;\r
\r
    let distance_sqr = (world_position.x - player_position.x) * (world_position.x - player_position.x) + (world_position.z - player_position.z) * (world_position.z - player_position.z);\r
    let thresholded = round(fog_steps * (-smoothstep(16, 512, distance_sqr) + 1.)) / fog_steps;\r
\r
    return 1 - thresholded;\r
}\r
\r
@fragment\r
fn main_fs(input : VertexOutput) -> @location(0) vec4f\r
{\r
    let color = textureSample(texture, texture_sampler, input.uv);\r
    let shading = lambertian(input.normal, input.world_position);\r
    let fog_modifier = distance_fog(input.world_position);\r
\r
    let result = (1 - fog_modifier) * color.rgb * shading + fog_modifier * fog_tint;\r
\r
    return vec4f(result, color.a);\r
}\r
`,Zo={[Q.NORTH]:Q.SOUTH,[Q.EAST]:Q.WEST,[Q.SOUTH]:Q.NORTH,[Q.WEST]:Q.EAST},Dr=n=>{const e=[];n&Q.NORTH&&e.push(Q.NORTH),n&Q.EAST&&e.push(Q.EAST),n&Q.SOUTH&&e.push(Q.SOUTH),n&Q.WEST&&e.push(Q.WEST);const t=Math.round(Math.random()*e.length-.5);return e[t]},Hr={1:L(0,1),2:L(1,0),4:L(0,-1),8:L(-1,0)},Rt={[Q.NORTH]:f(0,0,1,0),[Q.EAST]:f(1,0,0,0),[Q.SOUTH]:f(0,0,-1,0),[Q.WEST]:f(-1,0,0,0)},Kn=12,re=(n,e,t)=>{n[e[0]][e[1]]=t},nt=(n,e)=>e[1]>=0&&e[1]<Kn&&e[0]>=0&&e[0]<Kn?n[e[0]][e[1]]:yn.OUT_OF_BOUNDS,De=(n,e)=>nt(n,e)===yn.EMPTY,Zn=(n,e)=>{const t=nt(n,e);return t===yn.EMPTY||t===yn.OUT_OF_BOUNDS},Ko=(n,e,t)=>{switch(t){case Q.NORTH:return Zn(n,U(e,L(-1,1)))&&De(n,U(e,L(0,1)))&&Zn(n,U(e,L(1,1)));case Q.EAST:return Zn(n,U(e,L(1,1)))&&De(n,U(e,L(1,0)))&&Zn(n,U(e,L(1,-1)));case Q.SOUTH:return Zn(n,U(e,L(-1,-1)))&&De(n,U(e,L(0,-1)))&&Zn(n,U(e,L(1,-1)));case Q.WEST:return Zn(n,U(e,L(-1,1)))&&De(n,U(e,L(-1,0)))&&Zn(n,U(e,L(-1,-1)))}return!1},Qo=(n,e)=>{const t=!Zn(n,U(e,L(0,1)))&&!Zn(n,U(e,L(0,-1))),r=!Zn(n,U(e,L(1,0)))&&!Zn(n,U(e,L(-1,0)));return t||r},ns=()=>Math.random()<.15?yn.LIGHT:yn.NORMAL,es=(n,e)=>(re(n,U(e,L(1,0)),yn.NORMAL),re(n,U(e,L(0,0)),yn.SPAWN),re(n,U(e,L(-1,0)),yn.NORMAL),re(n,U(e,L(1,1)),yn.LIGHT),re(n,U(e,L(0,1)),yn.NORMAL),re(n,U(e,L(-1,1)),yn.LIGHT),re(n,U(e,L(1,2)),yn.NORMAL),re(n,U(e,L(0,2)),yn.NORMAL),re(n,U(e,L(-1,2)),yn.NORMAL),U(e,L(0,3))),ts=()=>{const n=Array.from(Array(Kn).fill(null),()=>Array(Kn).fill(yn.EMPTY)),e=L(Kn/2,Kn/2),t=es(n,e);let r=!1;const a=i=>{const o=Qo(n,i),s=ns();if(s===yn.EMPTY||o)return;re(n,i,s);let c=0;const l=[Q.NORTH,Q.EAST,Q.SOUTH,Q.WEST];l.sort(()=>Math.sign(Math.random()*2-1));for(let d=0;d<4;d++){const h=l[d];if(!Ko(n,i,h)||s===yn.LIGHT&&c>=3)continue;const u=U(i,Hr[h]);a(u),++c}c===0&&!r&&(re(n,i,yn.END),r=!0)};return a(t),{map:n,center:e}},rs=n=>{const e=[],t=[];let r=null;const a=Array.from(Array(Kn).fill(null),()=>Array(Kn).fill(null));for(let i=0;i<n.length;i++)for(let o=0;o<n[i].length;o++){const s=L(o,i),c=nt(n,s);if(c===yn.EMPTY)continue;let l=0;for(let h=0;h<4;h++){const u=1<<h,v=nt(n,U(s,Hr[u]));v!==yn.OUT_OF_BOUNDS&&v!==yn.EMPTY&&(l+=1<<h)}const d={position:s,cardinality:l,type:c};e.push(d),a[o][i]=d,c===yn.LIGHT&&t.push(d),c===yn.END&&(r=d)}return{tileSet:{allTiles:e,lightTiles:t,endTile:r},tileMap:a}},is=()=>{const{map:n,center:e}=ts(),{tileSet:t,tileMap:r}=rs(n);return{tileSet:t,tileMap:r,center:e}},as=n=>L(Math.round(n[0]/Qn+Kn/2),Math.round(n[2]/Qn+Kn/2)),Ae=n=>y(Qn*(n[0]-Kn/2),0,Qn*(n[1]-Kn/2)),os=n=>{let e=new Float32Array,t=new Float32Array,r=new Float32Array,a=[];for(const i of n){const o=gs(i);e=new Float32Array([...e,...o.vertices]),t=new Float32Array([...t,...o.normals]),r=new Float32Array([...r,...o.uvs]),a=[...a,...o.lights]}return{vertices:e,normals:t,uvs:r,lights:a}},ss=(n,e)=>{const t=as(e),r=n[t[0]][t[1]];return r===null?(console.error("next does not exist"),null):r},cs=async({device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:r,depthStencilTextureView:a},multisampleData:{msaaTextureView:i,multisample:o}}},s,{shadowMapTexture:c,lightSourcesBuffer:l,activeLightIndicesBuffer:d},{playerPerspectiveBuffer:h,playerPositionBuffer:u})=>{const{texture:v,sampler:m}=await ze(n,hn("game/dungeon_textures_albedo.png")),{buffer:_,bufferLayout:g}=X(n,s.vertices,"float32x4"),{buffer:x,bufferLayout:w}=X(n,s.normals,"float32x4",1),{buffer:p,bufferLayout:I}=X(n,s.uvs,"float32x2",2),T=an(n,[g,w,I],t,Jo,"triangle-list",{primitive:{frontFace:"ccw",cullMode:"front"},depthStencil:r,multisample:o},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),b=n.createBindGroup({layout:T.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:h}},{binding:1,resource:{buffer:u}}]}),M=Nn(n,T,v,m,1),S=n.createBindGroup({layout:T.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:l}},{binding:1,resource:c.createView()},{binding:2,resource:{buffer:d}}]});return{pass:P=>{const F={view:i,resolveTarget:e.getCurrentTexture().createView(),loadOp:"clear",clearValue:fn.black,storeOp:"store"},R=P.beginRenderPass({colorAttachments:[F],depthStencilAttachment:{view:a,depthLoadOp:"clear",depthClearValue:1,depthStoreOp:"store"}});R.setPipeline(T),R.setVertexBuffer(0,_),R.setVertexBuffer(1,x),R.setVertexBuffer(2,p),R.setBindGroup(0,b),R.setBindGroup(1,M),R.setBindGroup(2,S),R.draw(s.vertices.length/4),R.end()}}},ls=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;\r
@group(0) @binding(1) var<uniform> model_matrices : array<mat4x4f, 30>;\r
\r
struct LightSource {\r
    position : vec4f,\r
    direction : vec4f,\r
    projection : mat4x4f,\r
    light_tint : vec4f,\r
};\r
\r
@group(0) @binding(2) var<uniform> light_sources : array<LightSource, 30>;\r
\r
struct VertexOutput {\r
    @builtin(position) position : vec4f,\r
    @location(0) normal : vec3f,\r
    @location(1) uv : vec2f,\r
    @location(2) light_emit : vec3f\r
}\r
\r
@vertex\r
fn main_vs(@location(0) position : vec4f, @location(1) normal : vec3f, @location(2) uv : vec2f, @builtin(instance_index) instance : u32) -> VertexOutput\r
{\r
    var vo : VertexOutput;\r
    vo.position = projection_view * model_matrices[instance] * position;\r
    vo.normal = normal;\r
    vo.uv = uv;\r
    vo.light_emit = light_sources[instance].light_tint.rgb * min(light_sources[instance].light_tint.w/4, light_sources[instance].light_tint.w+.4);\r
    return vo;\r
}\r
\r
@fragment\r
fn main_fs(input : VertexOutput) -> @location(0) vec4f\r
{\r
    const stick = vec3f(.15, .2, .05);\r
    let fire_burn = input.light_emit;\r
\r
    let fire_burn_color_modifier = step(.85, input.uv.y);\r
\r
    let color = fire_burn_color_modifier * fire_burn + (1 - fire_burn_color_modifier) * stick;\r
    return vec4f(color, 1.);\r
}\r
`,hs=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;
@group(1) @binding(0) var<storage> model_matrices : array<mat4x4f>;
@group(2) @binding(0) var<uniform> jitter_model_matrix : mat4x4f;

struct VertexOutput {
    @builtin(position) position : vec4f,
    @location(0) projected : vec4f
}

@vertex
fn main_vs(@location(0) position : vec4f, @builtin(instance_index) instance : u32) -> VertexOutput
{
    var projected = projection_view * model_matrices[instance] *jitter_model_matrix * position;
    return VertexOutput(projected, projected);
}

struct FragmentOutput {
    @location(0) debug : vec4f,
    @location(1) shadow_map : vec4f
}

@fragment
fn main_fs(input : VertexOutput) -> FragmentOutput
{
    let z = input.projected.z / input.projected.w;

    var fo : FragmentOutput;
    fo.debug = vec4f(z, 0, 0, 1.);
    fo.shadow_map = vec4f(z, z, z, 1.);

    return fo;
}
`,ir=4,Bt=30,qr=n=>{const e=jn(Pn(n.position),Pn(U(n.position,n.direction)),y(0,1,0)),t=ae(170,5,.01,Qn*2);return E(t,e)},ds=n=>{n.active=!1,n.intensity=0},fs=n=>{n.active=!0},us=n=>new Float32Array(n.flatMap(e=>[B([e.position,e.direction]),rn(qr(e)),[...e.tint,e.intensity]].flat())),vs=({device:n},e,t)=>{let r=t.reduce((T,b)=>T.vertexCount>b.vertexCount?T:b,t[0]);const a=n.createShaderModule({code:hs}),i=n.createRenderPipeline({layout:"auto",vertex:{module:a,entryPoint:"main_vs",buffers:[r.vertexBufferLayout]},fragment:{module:a,entryPoint:"main_fs",targets:[{format:"rgba32float"}]},primitive:{frontFace:"ccw",cullMode:"none",topology:"triangle-list"},depthStencil:{depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"}}),o=n.createTexture({size:{width:2048,height:512,depthOrArrayLayers:e.length},format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),s=n.createTexture({size:{width:2048,height:512,depthOrArrayLayers:e.length},dimension:"2d",format:"rgba32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),c=e.map(T=>z(n,i,[new Float32Array(rn(qr(T)))],"UNIFORM",0).bindGroup),l=t.map(T=>{const b=rr(T)?new Float32Array(Te(T.modelMatrices)):new Float32Array(rn(Ln()));return z(n,i,[b],"STORAGE",1).bindGroup}),{bindGroup:d}=z(n,i,[new Float32Array(rn(Ln()))],"UNIFORM",2),{bindGroup:h,buffers:[u]}=z(n,i,[new Float32Array(rn(Ln()))],"UNIFORM",2),v=(T,b)=>{if(b%2===0)return;const M=T/1e3,S=In([.01*Math.sin(M)*Math.random(),.01*Math.sin(M)*Math.random(),.01*Math.sin(M)*Math.random()]);Z(n,u,new Float32Array(rn(S)),0)},m=(T,b,M)=>{I(b),v(b,M);for(let S=0;S<e.length;S++){if(!g.includes(S))continue;const O=T.beginRenderPass({colorAttachments:[{view:s.createView({baseArrayLayer:S,arrayLayerCount:1}),loadOp:"clear",clearValue:fn.black,storeOp:"store"}],depthStencilAttachment:{view:o.createView({baseArrayLayer:S,arrayLayerCount:1}),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:1}});O.setPipeline(i),O.setBindGroup(0,c[S]);for(let P=0;P<t.length;P++){const F=t[P];if(O.setVertexBuffer(0,F.vertexBuffer),O.setBindGroup(1,l[P]),!F.indexBuffer||!F.triangleCount){O.setBindGroup(2,d),O.draw(F.vertexCount);continue}O.setBindGroup(2,h);const R=rr(F)?F.instances:void 0;O.setIndexBuffer(F.indexBuffer,"uint32"),O.drawIndexed(F.triangleCount*3,R)}O.end()}},_=[];let g=[];const x=n.createBuffer({size:new Uint32Array(ir).byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.length>Bt&&console.warn("[initialization] number of lights larger than allowed limit");const w=n.createBuffer({size:(Rn.float32x4*2+Rn.float32x4x4+Rn.float32x4)*Bt,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(w,0,us(e));const p=T=>{g=Ea(e.map(b=>cr(be(b.position,f(...T,1)))),ir),n.queue.writeBuffer(x,0,new Uint32Array(g));for(const b of g)fs(e[b]);for(let b=0;b<e.length;b++)if(!g.includes(b)){ds(e[b]);const M=Rn.float32x4*2+Rn.float32x4x4+Rn.float32x4;Z(n,w,new Float32Array([0]),M*b+M-Rn.float32)}for(const b of _)b(g)},I=T=>{const b=S=>S<6?S+=.1*Math.random():Math.sin(T/1e4)*Math.random()+6,M=Rn.float32x4*2+Rn.float32x4x4+Rn.float32x4;for(const S of g){const O=e[S];O.intensity=b(O.intensity),Z(n,w,new Float32Array([O.intensity]),M*S+M-Rn.float32)}};return{renderable:{pass:m,onTileChange:p},lightData:{lights:e,shadowMapTexture:s,activeLightsChangeListeners:_,lightSourcesBuffer:w,activeLightIndicesBuffer:x}}},_s=n=>{const e=Qn/2-.1,t=Dr(~n.cardinality&15),r=Rt[t],a=Ae(n.position),i=U(f(...U(y(0,.4,0),a),1),ne(r,e));return{direction:Rt[Zo[t]],position:i,intensity:0,tint:y(.9,.4,0),active:!1}},ms=({device:n},e)=>{const t=Ge(y(),1),r=[L(0,0),L(0,1),L(0,1),L(0,0),L(0,0),L(0,1),L(0,1),L(0,0)],a=e.map(u=>{const v=In(Pn(U(u.position,U(ne(u.direction,.1),f(0,-.65,0,0))))),m=E(Ee(90),ke(30,Pn(u.direction))),_=qn(.1,.65,.1);return E(E(v,m),_)}),{buffer:i}=Gn(n,new Uint32Array(B(t.triangleIndices.map(u=>Pn(u))))),{buffer:o,bufferLayout:s}=X(n,new Float32Array(B(t.vertices)),"float32x4"),{buffer:c,bufferLayout:l}=X(n,new Float32Array(B(t.normals)),"float32x4",1),{buffer:d,bufferLayout:h}=X(n,new Float32Array(B(r)),"float32x2",2);return{vertexBuffer:o,vertexBufferLayout:s,vertexCount:t.vertices.length,normalsBuffer:c,normalsBufferLayout:l,uvsBuffer:d,uvsBufferLayout:h,indexBuffer:i,triangleCount:t.triangleCount,instances:e.length,modelMatrices:a}},ps=({device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:r,depthStencilTextureView:a},multisampleData:{msaaTextureView:i,multisample:o}}},{vertexBuffer:s,vertexBufferLayout:c,normalsBuffer:l,normalsBufferLayout:d,uvsBuffer:h,uvsBufferLayout:u,indexBuffer:v,triangleCount:m,instances:_,modelMatrices:g},{playerPerspectiveBuffer:x},{lightSourcesBuffer:w})=>{const p=an(n,[c,d,u],t,ls,"triangle-list",{primitive:{frontFace:"ccw",cullMode:"back"},depthStencil:r,multisample:o}),I=new Float32Array(Te(g)),T=n.createBuffer({size:Rn.float32x4x4*Bt,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(T,0,I);const b=n.createBindGroup({layout:p.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:x}},{binding:1,resource:{buffer:T}},{binding:2,resource:{buffer:w}}]});return{pass:S=>{const O={view:i,resolveTarget:e.getCurrentTexture().createView(),loadOp:"load",clearValue:fn.black,storeOp:"store"},P=S.beginRenderPass({colorAttachments:[O],depthStencilAttachment:{view:a,depthLoadOp:"load",depthClearValue:1,depthStoreOp:"store"}});P.setPipeline(p),P.setIndexBuffer(v,"uint32"),P.setVertexBuffer(0,s),P.setVertexBuffer(1,l),P.setVertexBuffer(2,h),P.setBindGroup(0,b),P.drawIndexed(m*3,_),P.end()}}},Qn=4,gs=n=>{const e=Qn/2,t=Ae(n.position),r=[f(-e,-e,e,1),f(-e,e,e,1),f(e,e,e,1),f(e,-e,e,1),f(-e,-e,-e,1),f(-e,e,-e,1),f(e,e,-e,1),f(e,-e,-e,1)],a=[f(3,0,4),f(4,7,3),f(6,5,1),f(1,2,6)],i=[...Array(6).fill(f(0,1,0,0)),...Array(6).fill(f(0,-1,0,0))],o=[L(1,0),L(.5,0),L(.5,.5),L(.5,.5),L(1,.5),L(1,0),L(.5,.5),L(0,.5),L(0,0),L(0,0),L(.5,0),L(.5,.5)],s=[L(.5,1),L(.5,.5),L(0,.5),L(0,.5),L(0,1),L(.5,1)];n.cardinality&Q.NORTH||(a.push(f(1,0,3),f(3,2,1)),i.push(...Array(6).fill(f(0,0,-1,0))),o.push(...s)),n.cardinality&Q.EAST||(a.push(f(2,3,7),f(7,6,2)),i.push(...Array(6).fill(f(-1,0,0,0))),o.push(...s)),n.cardinality&Q.SOUTH||(a.push(f(4,5,6),f(6,7,4)),i.push(...Array(6).fill(f(0,0,1,0))),o.push(...s)),n.cardinality&Q.WEST||(a.push(f(5,4,0),f(0,1,5)),i.push(...Array(6).fill(f(1,0,0,0))),o.push(...s));const c=new Float32Array(B(a.reduce((u,v)=>{for(let m=0;m<3;m++)u.push(U(r[v[m]],f(...t,0)));return u},[]))),l=new Float32Array(B(i)),d=new Float32Array(B(o));let h=[];return n.type===yn.LIGHT&&(h=[_s(n)]),{vertices:c,normals:l,uvs:d,lights:h}},bs=(n,e)=>{const r=U(Ae(e.position),y(-Qn/2*.96,0,-Qn/2*.96)),a=U(Ae(e.position),y(+Qn/2*.96,0,+Qn/2*.96));e.cardinality&Q.WEST&&(r[0]=-1/0),e.cardinality&Q.SOUTH&&(r[2]=-1/0),e.cardinality&Q.EAST&&(a[0]=1/0),e.cardinality&Q.NORTH&&(a[2]=1/0),n[0]=Me(n[0],r[0],a[0]),n[2]=Me(n[2],r[2],a[2])},xs=n=>{const e=Ge(y(0,0,0),1),{buffer:t,bufferLayout:r}=X(n,new Float32Array(B(e.vertices)),"float32x4",0),{buffer:a}=Gn(n,new Uint32Array(B(e.triangleIndices.map(o=>Pn(o))))),i=o=>{const s=In(U(o,y(0,-.5,0))),c=qn(1,2,1),l=E(s,c);Z(n,t,new Float32Array(B(e.vertices.map(d=>Fe(d,l)))),0)};return{bufferedMesh:{vertexBuffer:t,vertexBufferLayout:r,indexBuffer:a,vertexCount:e.vertices.length,triangleCount:e.triangleCount},updateMesh:i}},ys=({device:n})=>{const e=y(0,0,0),t=y(0,0,1),r=Yo(e,t),a=n.createBuffer({size:Rn.float32x4x4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});Z(n,a,new Float32Array(rn(St(r))),0);const i=n.createBuffer({size:Rn.float32x3,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});Z(n,i,new Float32Array(y()),0);const{bufferedMesh:o,updateMesh:s}=xs(n);return{camera:r,position:e,lookDirection:t,right:Je(y(0,1,0),t),playerMoveListeners:[s],playerViewListeners:[],shadowBufferedMesh:o,playerPerspectiveBuffer:a,playerPositionBuffer:i}},ar=({device:n},e,t,r)=>{let a=-t/512,i=r/512;e.lookDirection[1]>.97&&(i=Math.max(0,i)),e.lookDirection[1]<-.97&&(i=Math.min(0,i));const o=er(y(0,1,0),a),s=er(e.right,i),c=Ke(o,s);e.lookDirection=Wn(Pn(Oe(f(...e.lookDirection,1),c))),e.right=Wn(Je(sr.up,e.lookDirection)),$r(n,e)},$r=(n,e)=>{e.camera.extrinsics=Nr(e.position,e.lookDirection);const t=St(e.camera);for(const r of e.playerViewListeners)r(t);Z(n,e.playerPerspectiveBuffer,new Float32Array(rn(St(e.camera))),0)},ws=({device:n},e,t,r)=>{const a=Ne(r.w)-Ne(r.s),i=Ne(r.a)-Ne(r.d),o=r.v;if(!a&&!i)return;const s=Ls(e,a,i,o);t.cheats.noClip||bs(s,t.currentTile),e.position=s;for(const c of e.playerMoveListeners)c(e.position);Z(n,e.playerPositionBuffer,new Float32Array(e.position),0),$r(n,e)},Is=.1,Ls=(n,e,t,r)=>{let a=y();const i=(r?2:1)*Is;if(e){const o=[...n.lookDirection];o[1]=0;const s=ne(Wn(o),i*e);a=U(a,s)}if(t){const o=[...n.right];o[1]=0;const s=ne(Wn(o),i*t);a=U(a,s)}return U(n.position,a)},Ts=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;\r
@group(0) @binding(1) var<uniform> model_matrix : mat4x4f;\r
@group(0) @binding(2) var<uniform> time : f32;\r
\r
@group(1) @binding(0) var texture_sampler : sampler;\r
@group(1) @binding(1) var texture : texture_2d<f32>;\r
\r
struct VertexOutput {\r
    @builtin(position) position : vec4f,\r
    @location(0) normal : vec3f,\r
    @location(1) uv : vec2f\r
}\r
\r
@vertex\r
fn main_vs(@location(0) position : vec4f, @location(1) normal : vec3f, @location(2) uv : vec2f) -> VertexOutput\r
{\r
    var vo : VertexOutput;\r
    vo.position = projection_view * model_matrix * position;\r
    vo.normal = normal;\r
    vo.uv = uv;\r
    return vo;\r
}\r
\r
\r
fn rotation_matrix_2d() -> mat3x3f\r
{\r
    let local_time = time / 1e3;\r
    let c = -cos(local_time);\r
    let s = sin(local_time);\r
    return mat3x3f(1, 0, 0, 0, 1, 0, .5, .5, 1) * mat3x3f(c, s, 0, -s, c, 0, 0, 0, 1) * mat3x3f(1, 0, 0, 0, 1, 0, -.5, -.5, 1);\r
}\r
\r
\r
@fragment\r
fn main_fs(input : VertexOutput) -> @location(0) vec4f\r
{\r
    let color = textureSample(texture, texture_sampler, (rotation_matrix_2d() * vec3f(input.uv, 1.)).xy);\r
\r
    return color;\r
}\r
`,As=(n,e)=>({direction:e,position:n,intensity:4,tint:y(35/100,50/100,9/100),active:!1}),Ss=n=>{const e=f(...Ae(n.position),0),t=Dr(n.cardinality),r=Rt[t],a=2,i=ne(r,Qn/2-.1);let o=[f(-a,a,0,1),f(-a,-a,0,1),f(a,-a,0,1),f(a,a,0,1)];(t===Q.EAST||t===Q.WEST)&&(o=o.map(d=>Fe(d,Ee(90))));const s=new Uint32Array(B([y(0,1,3),y(3,1,2)])),c=new Float32Array(B([L(0,0),L(0,1),L(1,1),L(1,0)])),l=new Float32Array(B([r,r,r,r]));return{vertices:new Float32Array(B(o)),triangles:s,uvs:c,normals:l,lights:[As(U(e,i),r)],modelMatrix:In(Pn(U(e,i)))}},Rs=async({device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:r,depthStencilTextureView:a},multisampleData:{msaaTextureView:i,multisample:o}}},s,{playerPerspectiveBuffer:c})=>{const{texture:l,sampler:d}=await ze(n,hn("game/portal.png")),{buffer:h}=Gn(n,s.triangles),{buffer:u,bufferLayout:v}=X(n,s.vertices,"float32x4"),{buffer:m,bufferLayout:_}=X(n,s.normals,"float32x4",1),{buffer:g,bufferLayout:x}=X(n,s.uvs,"float32x2",2),w=an(n,[v,_,x],t,Ts,"triangle-list",{primitive:{frontFace:"ccw",cullMode:"none"},depthStencil:r,multisample:o},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),p=new Float32Array(rn(s.modelMatrix)),I=n.createBuffer({size:p.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(I,0,p);const T=new Float32Array([0]),b=n.createBuffer({size:T.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(b,0,T);const M=n.createBindGroup({layout:w.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:c}},{binding:1,resource:{buffer:I}},{binding:2,resource:{buffer:b}}]}),S=Nn(n,w,l,d,1);return{pass:(P,F)=>{Z(n,b,new Float32Array([F]),0);const R={view:i,resolveTarget:e.getCurrentTexture().createView(),loadOp:"load",storeOp:"store"},A=P.beginRenderPass({colorAttachments:[R],depthStencilAttachment:{view:a,depthLoadOp:"load",depthClearValue:1,depthStoreOp:"store"}});A.setPipeline(w),A.setIndexBuffer(h,"uint32"),A.setVertexBuffer(0,u),A.setVertexBuffer(1,m),A.setVertexBuffer(2,g),A.setBindGroup(0,M),A.setBindGroup(1,S),A.drawIndexed(6),A.end()}}},Bs=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn("game"),a=4,{multisample:i,msaaTexture:o}=xe(n,r,t,a),s=n.createTexture({size:{width:r.width,height:r.height},format:"depth24plus",sampleCount:a,usage:GPUTextureUsage.RENDER_ATTACHMENT}),c={depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"},l=[],d=(v,m)=>{v=Me(v,-36,36),m=Me(m,-36,36);for(const g of l)g(v,m)};let h=!1;const{keyMap:u}=$i("game",d,{onStart:()=>h=!0,onEnd:()=>h=!1});return{device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:c,depthStencilTextureView:s.createView()},multisampleData:{multisample:i,msaaTextureView:o.createView()}},input:{keyMap:u,mouseMoveListeners:l,inGame:h}}},Ps=(n,e)=>{const t=ss(n.map,e.position);if(t!==n.currentTile&&t!==null){n.currentTile=t;for(const r of n.tileChangeListeners)r(Ae(t.position),t.position);t.type===yn.END&&window.alert("you got to the end yay")}},Os=async()=>{const n=await Bs(),e=ys(n);n.input.mouseMoveListeners.push((p,I)=>ar(n,e,p,I));const{tileSet:t,tileMap:r}=is(),a=os(t.allTiles),i={map:r,currentTile:null,tileChangeListeners:[],cheats:{noClip:!1}},{buffer:o,bufferLayout:s}=X(n.device,a.vertices,"float32x4",0),c={vertexBuffer:o,vertexBufferLayout:s,vertexCount:a.vertices.length/4},l=Ss(t.endTile),d=ms(n,a.lights),{renderable:h,lightData:u}=vs(n,[...a.lights,...l.lights],[c,e.shadowBufferedMesh,d]);i.tileChangeListeners.push(h.onTileChange);const{pass:v}=await cs(n,a,u,e),{pass:m}=await Rs(n,l,e),{pass:_}=ps(n,d,e,u),g=()=>{ws(n,e,i,n.input.keyMap),n.input.keyMap.p&&(i.cheats.noClip=!i.cheats.noClip,n.input.keyMap.p=!1,console.info("[cheats]: no clip toggled to",i.cheats.noClip))};ar(n,e,0,0);let x=0;const w=p=>{g(),Ps(i,e);const I=n.device.createCommandEncoder();h.pass(I,p,x),v(I,p,x),m(I,p,x),_(I,p,x),n.device.queue.submit([I.finish()]),x++,requestAnimationFrame(w)};requestAnimationFrame(w)},ks=(n,e)=>{const t=on("graphics",["/game","/game/game.ts"]),r=W("The WebGPU dungeon game"),a=D(`
It's hard to call this a game, there are no challenges or obstacles to overcome - it's more a showcase of a WebGPU-based game engine. 
The point of the "Game" is to traverse the dark dungeon, using the light sources or fog to make your way through the dark halls and finally find the exit portal. The explanations of the games systems are below the game itself.

You initiate the game by clicking on the canvas and can leave whenever by hitting [Esc]. When in the game look around with the mouse, move by using the [WASD] keys and activate sprinting with the [V] key.
`),i=nn(),o=K("game");i.append(o);const s=W("Overview of the game structure"),c=D(`
The game is made with Typescript and WebGPU. It is comprised of a few key systems which integrate with each other to create the final experience.
While this is an example of a game engine, it would have to be expanded and abstracted to be truly called an engine, as currently it is tailored to support the dungeon game. More on that later.

The game's key systems are: 
<ol>
<li>Dungeon map generation, which include creating a procedurally generated layout, creating the dungeon mesh in runtime and selecting the locations for lights to appear in the game.</li>
<li>The player system, which include camera movement and rotation.</li>
<li>Tiles and torches, which generate tile templates for the dungeon depending on how many walls should be open, as well as bounding the player inside the legal space (collision).</li>
<li>The game state (and portal) which trigger an event upon reaching the objective.</li>
<li>The lighting system, which tracks active lights, generates shadow maps and controls light transition.</li>
</ol>

The game engine is an obejct which stores all the vital information about the game and resources requried for game components to function. 
It is responsible for access to the GPU device and stores a reference to the game canvas and the multisample state. 
Additionally, it will hold the global z-buffer shared among all render objects. It is also the middleman between user input and the game input handler.

The stages of the game can be categorized into two parts.

I. Initialization (run once)
<ul>
<li>The engine is prepared (game canvas initialized, WebGPU prepared).</li>
<li>The game map is generated. </li>
<li>Lights are defined and prepared in the light system. </li>
<li>Every object prepares its mesh (vertex and other attribute buffers).</li>
</ul>

II. Gameplay (run in a loop)
<ul>
<li>The frame function is called.</li>
<li>Input is checked and applied.</li>
<li>The shadow map pass is run.</li>
<li>The objects render pass is run.</li>
</ul>
`),l=W("The dungeon system"),d=D(`
Initially the dungeon is created as an array of arrays of tile-or-empty elements. The algorithm is simple - a recursive walk which populates tiles depending on the empty neighbors a tile has.
The first leaf in the walk is the END tile, which is where the portal is placed. Every other tile is sampled to either be a NORMAL or LIGHT tile, the latter of which will generate a light object for the light system to track.

The dungeon mesh is then generated by traversing the tiles map. For each tile, the tile system is polled to generate a local tile mesh with the appropriate walls removed to create a continuous corridor.
The tile mesh is offset accordingly to the map coordinates and merged with the dungeon mesh vertex (and other attributes) buffers. 
The map exists in integer array space and so mapping functions are created to quickly map a tile's position in world space and vice versa. 
During mesh creation, the dungeon is offset so that the center tile lays in the origin of the system, where the player is initialized.

The dungeon pipeline is configured to cull front faces, as we are interested in seeing the insides of the tiles. A z-buffer attachement is also vital to avoid z-fighting between tiles. 
Initially the idea was to use instancing to populate the tiles and remove their walls inside the shader, but there was an issue with the draw-order and blending when using instancing, therefore it was scrapped.

Within its shader, the dungeon does simple object operations - updating dungeon position according to the player position, updating the tiles depending on albedo and shadow map textures and calculate lighting for lit surfaces. 
An additional feature added to the dungeon is the aptly named "fog". Distant tiles are ususally dark due to the player-local active lights. 
To help the player get a sense for the surrounding dungeon structure further empty spaces are blended with a fog color. 
The blend factor is thesholded to ceratin steps and depends on the camera's depth component.
`),h=W("The player system"),u=D(`
The player is a conceptual (apart from the lighting system) object. It represents the floating camera and handles movement can rotation which is then applied to the camera's extrinsic matrix. 

Movement is handled by moving the player along the directions of the player's local forward and right axes, which are initially set to the origins forwad and right axes. The player's height component (y) is always set to zero.
As the movement always depends on these two axes, it is vital they remain correct - which is the job of the rotation action. Sprinting is also an option, which simply increases the by-frame movement displacement amount.

Rotation applies an incremental quaternion to the player's forwrd (look direction) based on the frame mouse movement (tracked in the Pointer Lock API). 
After the look direction is updated, to maintain smooth movement the right axis is also updated as the normalzied cross product between the canon up direction and the player's new forward direction.

After movement is made, the player model buffer is updated, which exists only to be an actor in shadow map render passes.
`),v=W("The tile system and the torch system"),m=D(`
The tile does not exist in the GPU, as it is integrated into the dungeon system in the initialization stage. The tile still remains as a conceptual object during runtime.

During initialization, the tile generates a template mesh to be integrated into the dungeon mesh. It will generate a cube, 
but remove as many walls as are required to create a fit with the dungeon layout - this is referred to as the tile's cardinality.
The cube mesh does not use index buffers so as to support flat shading, which is only possible with duplicated vertices. 
For such as small mesh this is a negligible cost. UV coordinates are also created to allow the dungeon shader to apply the tile texture.
To save on textures used, there is only one texture file with all three variants of the tile wall/floor/ceiling textures stiched together, and the UVs reflect this.

During runtime, tiles remain at play as they are responsible for player-wall collisions. 
Players have to remain bound inside the tile's space, unless one of the tile walls is open. The collision is implemented by clamping the player's position to the allowed boundary (a small offset before the wall).
Whenever a player changes tiles, an event is triggered. This allows the decoupling and efficiency of certain actions, as not everything has to be recalculated on player movement.

The torches are simple stretched and rotated cubes, which are positioned to the light position inside a LIGHT type tile. 
The light position inside a tile is randomized based on the remaining walls a tile has - a tile with no walls cannot be a LIGHT type tile.

The torches are instanced objects with model matrices used to displace them accordingly. 
Additionally a trick is employed to color part of the torch with the color of the emitting light by slicing the upper part of the vertical uv coordinate.
`),_=W("The game state and portal system"),g=D(`
A rather small part of the game, but worth a shoutout. The game state is responsible for checking for game objectives. The game state is interested in the player's current tile.
It will check if the player's map position is equal to that of the END type tile - which when observed will trigger the end "reward".

The portal - which is the in-game representation of the objective - is a graphical object with its own pass. The portal is created as a quad with the portal texture applied to it.
The portal's pipeline is configured to support blending, as only the portal color should be visible to the player and not the transparent background in the texture.
In the portal's shader, the uvs are dependent on a uniform time buffer to rotate the uvs about the texture's center, which creates a twirling effect. 
The portal is also another instance of a light.

The game state also tracks active cheats - such as "no clip" which allows the player to pass through walls (toggle with [P] key).
    `),x=W("The lighting system"),w=D(`
By far the most interesting part of this project was the creation of shadow maps. 

Lights are all defined as point lights for light calculation, but have a direction towards which their camera matrix is direction for the purpose of generating the shadow map.
The dungeon mesh, player mesh and torches meshes are all rendered in the the light sources perspective to populate the shadow map, later passed to the dungeon shader as a texture.

To keep things efficient, only four active lights are allowed in the scene at a given moment. These are updated the be the lights closest to the player whenever a player changes tiles.
Each light has its own position in the light information buffer and its own respective shadow map, but only active lights which have a shadow pass to render their shadow maps. 
Other lights are deactivated - their intensity is zero.

Flickering is implemented as a property function of time. The intensity "flickers" randomly up and down. 
This effect is also applied to the shadows by creating a small displacement in the light's model matrix during the shadow pass.

During the initialization stage, the light system gathers all the defined lights from object mesh data and creates a shared light information buffer which is later used by the dungeon and torches systems.
During the gameplay stage, the shadow pass always runs before object renders to update the currently casted shadows.
    `),p=W("Room for improvement"),I=D(`
The game (and game engine) is far from perfect. 
In this section I would like to focus on the steps to make this a better engine, as the game aspect is a trivial extension.

The first steps to creating a better engine would be to abstract and homogenize many of the functions in the system.
Currently all of the objects are explicitly created and explicitly called in the render pass. 
This should be instead replaced with a generic wrapper for any game object with a default material shader. 
This would also require the creation of a standardized shader base template, which other shader files would have to adhere to.
Shaders should be passed as a variable of the object, just as the rest of its data - mesh and other.

There should be clear distinction between the game logic and game engine layers. 
In the current form, game objects directly call interact with the WebGPU API. 
While this helps keep things simple and allows for exact behaviours to be exactly defined for each object,
there is a lot of responsibility vagueness and code duplicaiton which would lead to many more issues down the line.

Regarding clear responsibility and ownership - it would be a benefit to declare and create buffers for reused objects and data. 
This was partially set up with a player camera buffer created once (and updated only by the player) as well as the light information buffer controlled by the light system.
In the final form the management and transfer of globally known buffers should be the responsiblity of a separate system.

A final comment, the shadow maps have resolution issues which cause pixelated shadows. 
Either their rsolution should be increased or their generating light source camera matrices adjusted to ensure better shadows.
Percentage-closer filtering could later be employed to increase the quality of shadows. 
    `);n.append(r,a,i,s,t,c,l,d,h,u,v,m,_,g,x,w,p,I),e.push(Os)},Fs=(n,e)=>{if(!et.children)throw"Graphics routes do not exist";for(const t of et.children.map(r=>r.generator))t(n,e)},et={path:"graphics",name:"Graphics",description:"",generator:Fs,children:[{path:"webgpu-basics",name:"Introduction to the basics",description:"A walkthrough the basics of graphics and setting it up in WebGPU.",generator:Za},{path:"drawing",name:"Drawing via interaction",description:"Using the browser interaction features to create a simple drawing application.",generator:eo},{path:"projection",name:"Projection types",description:"An overview of the types of projections and GPU instancing.",generator:fo},{path:"lighting",name:"Lighting",description:"Showcase of the most common GPU lighting models and runtime mesh creation.",generator:_o},{path:"meshes",name:"Mesh intstantiation",description:"Populating mesh data in the GPU and displaying a model in the frame.",generator:go},{path:"texturing",name:"Applying textures",description:"Using textures to add colors to a mesh and an overview of the WebGPU process mipmapping.",generator:Ao},{path:"env-mapping",name:"Environmental mapping",description:"Using environmental maps to populate color values reflected by mirror surfaces (with or without normal maps).",generator:Po},{path:"shadows",name:"Shadows (projection)",description:"Creating shadows in the scene using projective shadowing.",generator:Fo},{path:"shadow-mapping",name:"Shadows (maps)",description:"Creating shadows in the scene using shadow maps.",generator:Ho},{path:"camera-movement",name:"Other interaction types",description:"A showcase of other scene interaction methods.",generator:Xo},{path:"game",name:"A simple game engine (project)",description:"Using the graphics toolset to create a simple dungeon crawler with focus on lighting, shadow maps and player movement.",generator:ks}]},Ms=`struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

fn generate_ray(uv : vec2f) -> Ray
{
    var ray : Ray;

    const up = vec3f(0., 1., 0.);
    const target_point = vec3f(0., .5, 0.);
    const origin_point = vec3f(2.0, 1.5, 2.0);

    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * 1.; //1:camera constant

    ray.origin = origin_point;
    ray.direction = normalize(q);
    ray.tmax = 1000;
    ray.tmin = 0;

    return ray;
}

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    let uv = coords * .5;
    var r = generate_ray(uv);
    return vec4f(r.direction *.5 + .5, 1.0);
}
`,Wr="raycast-anatomy",Es=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(Wr),r=an(n,[],t,Ms,"triangle-strip"),{pass:a,executePass:i}=un(n,e,fn.black);a.setPipeline(r),a.draw(4),i()},zs=(n,e)=>{const t=on("rendering/01-raycasting-introduction",["/raycastAnatomy.ts","/raycastAnatomy.wgsl"]),r=W("The anatomy of rendering"),a=D(`
Before one peers into the world of rendering, ray casting, path tracing and the deep depths of global illumination - one should understand the basic building block of the rendering system - the ray.

The rendering system is built with physical constraints in mind, and so the ray is an imitation of the friendly vessels we observe in the real world - light rays. 
Computationally, generating, storing, amassing and integrating inifinte amounts of light rays and their interactions with materials is not feasible on modern hardware, 
therefore the compromise is to only handle the light and shading directly seen by the viewer (the virtual camera).

And so, the camera ray is born. Shown below is each fragment (pixel) of the the canvas in the color of the direction of its camera ray.
`),i=K(Wr),o=nn();o.append(i),n.append(r,t,a,o),e.push(Es)},Vs=`struct ViewboxOptions {
    camera_constant : f32,
    aspect_ratio : f32
};

struct LightSettings {
    light_position : vec3f,
    light_intensity : f32,
    shade_all : f32,
    refractive_index : f32
};

@group(0) @binding(0) var<uniform> viewbox : ViewboxOptions;
@group(1) @binding(0) var<uniform> light_settings : LightSettings;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32
}

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    has_hit : bool,
    dist : f32,
    position : vec3f,
    normal : vec3f,
    color : vec3f,
    shade : bool
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

fn generate_ray(uv : vec2f) -> Ray
{
    var ray : Ray;

    const up = vec3f(0., 1., 0.);
    const target_point = vec3f(0., .5, 0.);
    const origin_point = vec3f(2., 1.5, 2.);

    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * viewbox.camera_constant;

    ray.origin = origin_point;
    ray.direction = normalize(q);
    ray.tmax = 100;
    ray.tmin = 0;

    return ray;
}

fn intersect_plane(r : Ray, hit : ptr < function, HitInfo>, position : vec3f, normal : vec3f) -> bool {
    var intersection = dot(position - r.origin, normal) / dot(r.direction, normal);

    var has_hit = intersection > r.tmin && intersection < r.tmax;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, vec3f(.1, .7, 0.), has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normal, has_hit);
    (*hit).shade = select((*hit).shade, true, has_hit);

    return has_hit;
}
fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, v : array<vec3f, 3>) -> bool {
    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, vec3f(.4, .3, .2), has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(n), has_hit);
    (*hit).shade = select((*hit).shade, true, has_hit);

    return has_hit;
}
fn intersect_sphere(r : Ray, hit : ptr < function, HitInfo>, center : vec3f, radius : f32, sphere_color : vec3f) -> bool {
    const a = 1;
    var b_half = dot(r.origin - center, r.direction);
    var c = dot(r.origin - center, r.origin - center) - radius * radius;
    var b_half_2 = b_half * b_half;
    var b_half_2_c = b_half_2 - c;

    var does_intersection_exist = b_half_2_c >= 0;
    var distance = min(-b_half - sqrt(abs(b_half_2_c)), -b_half + sqrt(abs(b_half_2_c)));

    var intersection = r.origin + distance * r.direction;
    var n = normalize(intersection - center);

    var has_hit = does_intersection_exist && distance > r.tmin && distance < r.tmax;
    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).color = select((*hit).color, sphere_color, has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);
    (*hit).normal = select((*hit).normal, n, has_hit);
    (*hit).shade = select((*hit).shade, true, has_hit);

    return has_hit;
}
fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    var has_hit_plane = intersect_plane(*r, hit, vec3f(0., 0., 0.), vec3f(0., 1., 0.));
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_plane);

    var has_hit_sphere = intersect_sphere(*r, hit, vec3f(.0, .5, .0), .3, vec3f());
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_sphere);

    const triangle = array<vec3f, 3 > (vec3f(-.2, .1, .9), vec3f(.2, .1, .9), vec3f(-.2, .1, -.1));
    var has_hit_triangle = intersect_triangle(*r, hit, triangle);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_triangle);

    var has_hit_lightbulb = intersect_sphere(*r, hit, light_settings.light_position, .03, vec3f(1., .95, 0.) * light_settings.light_intensity);
    (*hit).shade = select((*hit).shade, false, has_hit_lightbulb);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_lightbulb);

    return (*hit).has_hit;
}

fn sample_point_light(pos : vec3f) -> Light {
    var direction = light_settings.light_position - pos;
    var dist = length(direction);
    var incident_light = light_settings.light_intensity / (dist * dist);

    var light : Light;
    light.L_i = vec3f(incident_light);
    light.w_i = direction;
    light.dist = dist;

    return light;
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    var L_emitted = vec3f(0);
    var L_ambient = vec3f(.1);

    var light_info = sample_point_light((*hit).position);
    var transformed_light = light_settings.refractive_index / 3.14 * light_info.L_i * dot((*hit).normal, light_info.w_i);

    var L_observed = L_emitted + transformed_light + L_ambient;

    return L_observed * (*hit).color;
}

fn shade(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    return select((*hit).color, lambertian(r, hit), (*hit).shade && light_settings.shade_all > 0);
}

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);
    const max_depth = 10;

    let uv = vec2f(coords.x * viewbox.aspect_ratio, coords.y) *.5;
    var r = generate_ray(uv);

    var result = vec3f(0.0);
    var hit = HitInfo(false, 0.0, vec3f(0.0), vec3f(0.0), vec3f(0.0), false);

    for (var i = 0; i< max_depth; i++)
    {
        if (!intersect_scene(&r, &hit))
        {
            result += backgroundColor.rgb;
            break;
        }

        result += shade(&r, &hit);

        if (hit.has_hit)
        {
            break;
        };
    }

    return vec4f(pow(result, vec3f(1.0 / 1.25)), 1.0);
}
`,Xr="light",Yr="zoom",Jr="light-intensity-slider",Zr="light-position-x-input",Kr="light-position-y-input",Qr="light-position-z-input",ni="shade-all-visible-objects",ei="refractive-index-slider",Gs=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await sn(Xr),a=N(Yr),i=N(Jr),o=N(ei),s=N(Zr),c=N(Kr),l=N(Qr),d=N(ni,"checked"),h=t.width/t.height,u=an(n,[],r,Vs,"triangle-strip"),{bindGroup:v,buffers:[m]}=z(n,u,[new Float32Array([a(),h])],"UNIFORM"),_=new Float32Array([s(),c(),l(),i(),d()?1:0,o(),0,0]),{bindGroup:g,buffers:[x]}=z(n,u,[_],"UNIFORM",1),w=()=>{Z(n,m,new Float32Array([a(),h]),0),Z(n,x,new Float32Array([s(),c(),l(),i(),d()?1:0,o(),0,0]),0);const{pass:p,executePass:I}=un(n,e,fn.black);p.setPipeline(u),p.setBindGroup(0,v),p.setBindGroup(1,g),p.draw(4),I(),requestAnimationFrame(w)};requestAnimationFrame(w)},Cs=(n,e)=>{const t=on("rendering/01-raycasting-introduction",["/simpleLight.ts","/simpleLight.wgsl"]),r=W("Let there be light"),a=D(`
With the ability to query the world with ray casts, the most primitive intersecting shapes can be introduced. These are:

1) The plane - an intersection of a ray (line) and a plane. Nothing too complicated - every line will at some point intersect a given plane, unless they are strictly parallel. The only question is at which distance (ray line parameter) does the intersection occur?

2) The triangle - an extension to the plane intersection with the addition of validating the triangle's Barycentric coordinates remain in the appropriate threshold. 
Mathematically, these coordinates can be larger than one or smaller than 0, but this just means the point is outside of the canonical triangle and somewhere in the triangle's shadow copy on the same plane.

3) The sphere - an interesting case which is more specifically comprised of three cases: no intersection (missing the sphere), one intersection (grazing the sphere's surface) and two intersections (entering and leaving the sphere).
There can also be (as will be vital in constructing refraction events) a ray starting inside the sphere with only one proper intersection in the direction of the ray.
Solving for these intersections is a case of handling quadratic formula roots, in an algorithmically friendly way.

For each point of the intersection with an object's surface, that fragement may be shaded based on the information from the intersection - supplied by the prominent hit info data structure, which is key in passing information from the intersecting phase to the shading phase.
`),i=nn(),o=K(Xr,{width:512+128,height:512-64}),s=_n(),c=k(vn(Yr,1,.1,10,.1),"Zoom (camera constant)"),l=k(vn(Jr,3.14,0,10,.01),"Light intensity"),d=k(vn(ei,1,-1,10,.1),"Diffuse reflectance"),h=k(vn(Zr,0,-5,5,.1),"Light X position"),u=k(vn(Kr,1,0,5,.1),"Light Y position"),v=k(vn(Qr,0,-5,5,.1),"Light Z position"),m=k(Xn(ni,!0),"Shading on",!1);s.append(c,l,d,h,u,v,m),i.append(o,s),n.append(r,t,a,i),e.push(Gs)},ti=(n,e)=>{zs(n,e),Cs(n,e)},js=`struct ViewboxOptions {
    aspect_ratio : f32
};

struct LightSettings {
    light_position : vec3f,
};

@group(0) @binding(0) var<uniform> viewbox : ViewboxOptions;
@group(1) @binding(0) var<uniform> light_settings : LightSettings;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32
}

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    has_hit : bool,
    dist : f32,
    position : vec3f,
    normal : vec3f,
    color : vec3f,
    shade : u32
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    const up = vec3f(0., 1., 0.);
    const target_point = vec3f(0., .5, 0.);
    const origin_point = vec3f(2., 1.5, 2.);
    const camera_constant = 1;

    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * 1;

    return construct_ray_100units(origin_point, normalize(q));
}

fn construct_ray_100units(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, 0, 100);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray : Ray;
    ray.origin = origin;
    ray.direction = direction;
    ray.tmax = tmax;
    ray.tmin = tmin;
    return ray;
}

//Intersecting objects //

fn intersect_plane(r : Ray, hit : ptr < function, HitInfo>, position : vec3f, normal : vec3f) -> bool {
    var intersection = dot(position - r.origin, normal) / dot(r.direction, normal);

    var has_hit = intersection > r.tmin && intersection < r.tmax;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, vec3f(.1, .7, 0.), has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normal, has_hit);
    (*hit).shade = select((*hit).shade, 1, has_hit);

    return has_hit;
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, v : array<vec3f, 3>) -> bool {
    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, vec3f(.4, .3, .2), has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(n), has_hit);
    (*hit).shade = select((*hit).shade, 1, has_hit);

    return has_hit;
}

fn intersect_sphere(r : Ray, hit : ptr < function, HitInfo>, center : vec3f, radius : f32, sphere_color : vec3f) -> bool {
    const a = 1;
    var b_half = dot(r.origin - center, r.direction);
    var c = dot(r.origin - center, r.origin - center) - radius * radius;
    var b_half_2 = b_half * b_half;
    var b_half_2_c = b_half_2 - c;

    var does_intersection_exist = b_half_2_c >= 0;
    var distance = min(-b_half - sqrt(abs(b_half_2_c)), -b_half + sqrt(abs(b_half_2_c)));

    var intersection = r.origin + distance * r.direction;
    var n = normalize(intersection - center);

    var has_hit = does_intersection_exist && distance > r.tmin && distance < r.tmax;
    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).color = select((*hit).color, sphere_color, has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);
    (*hit).normal = select((*hit).normal, n, has_hit);
    (*hit).shade = select((*hit).shade, 2, has_hit);

    return has_hit;
}

fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    var has_hit_plane = intersect_plane(*r, hit, vec3f(0., 0., 0.), vec3f(0., 1., 0.));
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_plane);

    var has_hit_sphere = intersect_sphere(*r, hit, vec3f(.0, .5, .0), .3, vec3f());
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_sphere);

    const triangle = array<vec3f, 3 > (vec3f(-.2, .1, .9), vec3f(.2, .1, .9), vec3f(-.2, .1, -.1));
    var has_hit_triangle = intersect_triangle(*r, hit, triangle);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_triangle);

    var has_hit_lightbulb = intersect_sphere(*r, hit, light_settings.light_position + vec3f(0, .035, 0), .03, vec3f(1., .95, 0.));
    (*hit).shade = select((*hit).shade, 0, has_hit_lightbulb);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_lightbulb);

    return (*hit).has_hit;
}

//Lighting //

fn sample_point_light(pos : vec3f) -> Light {
    const light_intensity = 3.14;

    var direction = light_settings.light_position - pos;
    var dist = length(direction);
    var incident_light = light_intensity / (dist * dist);

    var light : Light;
    light.L_i = vec3f(incident_light);
    light.w_i = direction;
    light.dist = dist;

    return light;
}

fn check_occulusion(position : vec3f, light : vec3f) -> bool
{
    const surface_offset = .0001;

    var line = light - position;
    var direction = normalize(line);
    var distance = length(line) - surface_offset;

    var r = construct_ray(position + direction * surface_offset, direction, 0, distance);
    var hit = HitInfo(false, 0.0, vec3f(0.0), vec3f(0.0), vec3f(0.0), 0);

    return intersect_scene(&r, &hit);
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    const refractive_index = 1.5;

    var light_info = sample_point_light((*hit).position);
    var transformed_light = refractive_index / 3.14 * light_info.L_i * dot((*hit).normal, light_info.w_i);

    var is_occluded = check_occulusion((*hit).position, light_settings.light_position);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1 * (*hit).color;
    var L_reflected = .9 * transformed_light * (*hit).color * occlusion_modifier;
    var L_observed = L_ambient + L_reflected;

    return L_observed;
}

fn shade(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    switch ((*hit).shade)
    {
        default :
        {
        }
        case 1 :
        {
            return lambertian(r, hit);
        }
    }

    return (*hit).color;
}

//Fragment shader //

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);
    const max_depth = 10;

    let uv = vec2f(coords.x * viewbox.aspect_ratio, coords.y) *.5;
    var r = generate_ray_from_camera(uv);

    var result = vec3f(0.0);
    var hit = HitInfo(false, 0.0, vec3f(0.0), vec3f(0.0), vec3f(0.0), 0);

    for (var i = 0; i< max_depth; i++)
    {
        if (!intersect_scene(&r, &hit))
        {
            result += backgroundColor.rgb;
            break;
        }

        result += shade(&r, &hit);

        if (hit.has_hit)
        {
            break;
        };
    }

    return vec4f(pow(result, vec3f(1.0 / 1.25)), 1.0);
}
`,je="lighting",ri=je+"-light-position-x-input",ii=je+"-light-position-y-input",ai=je+"-light-position-z-input",Us=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await sn(je),a=N(ri),i=N(ii),o=N(ai),s=t.width/t.height,c=an(n,[],r,js,"triangle-strip"),l=new Float32Array([s]),{bindGroup:d}=z(n,c,[l],"UNIFORM"),h=new Float32Array([a(),i(),o(),0,0,0,0,0,0]),{bindGroup:u,buffers:[v]}=z(n,c,[h],"UNIFORM",1),m=()=>{Z(n,v,new Float32Array([a(),i(),o(),0,0,0,0,0,0]),0);const{pass:_,executePass:g}=un(n,e,fn.black);_.setPipeline(c),_.setBindGroup(0,d),_.setBindGroup(1,u),_.draw(4),g(),requestAnimationFrame(m)};requestAnimationFrame(m)},Ns=(n,e)=>{const t=on("rendering/02-lighting-models",["/shadows.ts","/shadows.wgsl"]),r=W("Let there be shade"),a=D(`
After implementing lighting, the next step is to introduce shade. An enourmous advantage rendering systems have over the rasterization pipeline is the ease with which simple physical phenomena such as obstruction of a light source can be generated.

As you may have guessed at this point, light obstruction is also a ray, but it is cast from the intersection point in the direction of the light source. 
This is another way of querying the scene for information and as will be shown in the next example, 
starting new rays or continuing rays from defined points depending on the interaction type is the bread and butter of path tracing.
`),i=nn(),o=K(je,{width:512+128,height:512-64}),s=_n(),c=k(vn(ri,0,-5,5,.1),"Light X position"),l=k(vn(ii,1,0,5,.1),"Light Y position"),d=k(vn(ai,0,-5,5,.1),"Light Z position");s.append(c,l,d),i.append(o,s),n.append(r,t,a,i),e.push(Us)},Ds=`struct Environment {
    aspect_ratio : f32,
    time : f32
};

struct LightSettings {
    light_position : vec3f,
    sphere_shader : f32,
    triangle_shader : f32,
    plane_shader : f32
};

@group(0) @binding(0) var<uniform> environment : Environment;
@group(1) @binding(0) var<uniform> light_settings : LightSettings;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32
}

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,
    dist : f32,
    position : vec3f,
    normal : vec3f,
    color : vec3f,
    shader : u32,
    prev_refractive : f32,
    next_refractive : f32,
    diffuse : f32,
    specular : f32,
    shininess : f32
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    return HitInfo(0, false, false, 0., vec3f(0.), vec3f(0.), vec3f(0.), 0, 1., 1., 0., 0., 0.);
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    const up = vec3f(0., 1., 0.);
    const target_point = vec3f(0., .5, 0.);
    const origin_point = vec3f(2., 1.5, 2.);
    const camera_constant = 1;

    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * 1;

    return construct_ray_100units(origin_point, normalize(q));
}

fn construct_ray_100units(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, .001, 100);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray : Ray;
    ray.origin = origin;
    ray.direction = direction;
    ray.tmax = tmax;
    ray.tmin = tmin;
    return ray;
}


//Intersecting objects //

fn intersect_plane(r : Ray, hit : ptr < function, HitInfo>, position : vec3f, normal : vec3f) -> bool {
    var distance = dot(position - r.origin, normal) / dot(r.direction, normal);
    var intersection = r.origin + distance * r.direction;

    var has_hit = distance > r.tmin && distance < r.tmax;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).color = select((*hit).color, vec3f(.1, .7, 0.), has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);
    (*hit).normal = select((*hit).normal, normal, has_hit);

    (*hit).shader = select((*hit).shader, u32(light_settings.plane_shader), has_hit);
    (*hit).diffuse = select((*hit).diffuse, 1., has_hit);
    //(*hit).prev_refractive = select((*hit).prev_refractive, 1., has_hit);
    //(*hit).next_refractive = select((*hit).next_refractive, 1., has_hit);
    (*hit).specular = select((*hit).specular, .2, has_hit); ;
    (*hit).shininess = select((*hit).shininess, 60., has_hit); ;

    return has_hit;
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, v : array<vec3f, 3>) -> bool {
    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, vec3f(.4, .3, .2), has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(n), has_hit);

    (*hit).shader = select((*hit).shader, u32(light_settings.triangle_shader), has_hit);
    (*hit).diffuse = select((*hit).diffuse, .8, has_hit);
    //(*hit).prev_refractive = select((*hit).prev_refractive, 1., has_hit);
    //(*hit).next_refractive = select((*hit).next_refractive, 1., has_hit);
    (*hit).specular = select((*hit).specular, .2, has_hit); ;
    (*hit).shininess = select((*hit).shininess, 60., has_hit); ;

    return has_hit;
}

fn intersect_sphere(r : Ray, hit : ptr < function, HitInfo>, center : vec3f, radius : f32, sphere_color : vec3f) -> bool {
    const sphere_refractive_index = 1.5;
    const air_refractive_index = 1.;

    var from_center = r.origin - center;
    var b_half = dot(from_center, r.direction);
    var c = dot(from_center, from_center) - radius * radius;
    var b_half_2_c = b_half * b_half - c;

    var does_intersection_exist = b_half_2_c >= 0;

    var distance_1 = -b_half - sqrt(abs(b_half_2_c));
    var distance_2 = -b_half + sqrt(abs(b_half_2_c));
    var distance_1_in_range = distance_1 >= r.tmin && distance_1 <= r.tmax;
    var distance_2_in_range = distance_2 >= r.tmin && distance_2 <= r.tmax;

    var distance = select(distance_2, distance_1, distance_1_in_range);

    var intersection = r.origin + distance * r.direction;
    var n = normalize(intersection - center);

    var is_intersection_from_inside = dot(n, r.direction) > 0;
    var next_refr_index = select(sphere_refractive_index, air_refractive_index, is_intersection_from_inside);
    var context_n = select(n, -n, is_intersection_from_inside);

    var has_hit = does_intersection_exist && distance >= r.tmin && distance <= r.tmax;
    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).color = select((*hit).color, sphere_color, has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);
    (*hit).normal = select((*hit).normal, context_n, has_hit);

    (*hit).shader = select((*hit).shader, u32(light_settings.sphere_shader), has_hit);
    (*hit).diffuse = select((*hit).diffuse, .9, has_hit);
    (*hit).prev_refractive = select((*hit).prev_refractive, (*hit).next_refractive, has_hit);
    (*hit).next_refractive = select((*hit).next_refractive, next_refr_index, has_hit);
    (*hit).specular = select((*hit).specular, .1, has_hit);
    (*hit).shininess = select((*hit).shininess, 42., has_hit);

    return has_hit;
}

fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    (*hit).has_hit = false;

    var sphere_center = min(1, environment.time) * vec3f(cos(environment.time), 0, sin(environment.time)) + vec3f(0, .5, 0);
    var has_hit_sphere = intersect_sphere(*r, hit, sphere_center, .3, vec3f(0., 0., 0.));
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_sphere);

    var has_hit_plane = intersect_plane(*r, hit, vec3f(0., 0., 0.), vec3f(0., 1., 0.));
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_plane);

    const triangle = array<vec3f, 3 > (vec3f(-.2, .1, .9), vec3f(.2, .1, .9), vec3f(-.2, .1, -.1));
    var has_hit_triangle = intersect_triangle(*r, hit, triangle);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_triangle);

    //The little yellow sphere imitating a light source
    var has_hit_lightbulb = intersect_sphere(*r, hit, light_settings.light_position + vec3f(0, .035, 0), .03, vec3f(1., .95, 0.));
    (*hit).shader = select((*hit).shader, 0, has_hit_lightbulb);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_lightbulb);

    return (*hit).has_hit;
}

//Lighting //

fn sample_point_light(pos : vec3f) -> Light {
    const light_intensity = 3.14;

    var direction = light_settings.light_position - pos;
    var dist = length(direction);
    var incident_light = light_intensity / (dist * dist);

    var light = Light(vec3f(incident_light), normalize(direction), dist);

    return light;
}

fn check_occulusion(position : vec3f, light : vec3f) -> bool
{
    const surface_offset = 0.001;

    var line = light - position;
    var direction = normalize(line);
    var distance = length(line) - surface_offset;

    var r = construct_ray(position + direction * surface_offset, direction, surface_offset, distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    var light_info = sample_point_light((*hit).position);
    var lambertian_light = (*hit).diffuse / 3.14 * light_info.L_i * dot((*hit).normal, light_info.w_i);

    var is_occluded = check_occulusion((*hit).position, light_settings.light_position);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1 * (*hit).color;
    var L_reflected = .9 * lambertian_light * (*hit).color * occlusion_modifier;
    var L_observed = L_ambient + L_reflected;

    return L_observed;
}

fn mirror(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    (*r).direction = normalize(reflect((*r).direction, (*hit).normal));
    (*r).origin = (*hit).position + (*r).direction * .001;
    (*r).tmax = 100.;

    (*hit).continue_trace = true;

    return vec3f();
}

fn refractive(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    var ni_nt = (*hit).prev_refractive / (*hit).next_refractive;

    var incident = -(*r).direction;
    var r_n_dot = dot(incident, (*hit).normal);

    var t_sin = ni_nt * (r_n_dot * (*hit).normal - incident);
    var cos2 = 1 - ni_nt * ni_nt * (1 - r_n_dot * r_n_dot);
    var direction = t_sin - (*hit).normal * sqrt(abs(cos2));

    var is_reflected = cos2 < 0;
    var reflected_direction = reflect((*r).direction, (*hit).normal);

    (*r).direction = normalize(select(direction, reflected_direction, is_reflected));
    (*r).origin = (*hit).position + (*r).direction * .01;
    (*r).tmax = 100.;

    (*hit).continue_trace = true;

    return vec3f();
}

fn phong(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    var light_info = sample_point_light((*hit).position);
    var lighting = light_info.L_i * dot(light_info.w_i, (*hit).normal) / 3.14;

    var diffuse_lighting = (*hit).diffuse * lighting;

    var reflection = normalize(reflect(-light_info.w_i, (*hit).normal));
    var specular = (*hit).specular * ((*hit).shininess + 2) * .5 * pow(dot(-(*r).direction, reflection), (*hit).shininess);

    var is_occluded = check_occulusion((*hit).position, light_settings.light_position);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1 * (*hit).color;
    var L_diffuse = .9 * diffuse_lighting * (*hit).color * occlusion_modifier;
    var L_specular = specular * lighting * occlusion_modifier;

    return L_ambient + L_diffuse + vec3f(max(L_specular.r, 0));
}


fn glossy(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    var light_info = sample_point_light((*hit).position);
    var lighting = light_info.L_i * dot(light_info.w_i, (*hit).normal) / 3.14;

    var diffuse_lighting = (*hit).diffuse * lighting;

    var reflection = normalize(reflect(-light_info.w_i, (*hit).normal));
    var specular = (*hit).specular * ((*hit).shininess + 2) * .5 * pow(dot(-(*r).direction, reflection), (*hit).shininess);

    var is_occluded = check_occulusion((*hit).position, light_settings.light_position);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1 * (*hit).color;
    var L_diffuse = .9 * diffuse_lighting * (*hit).color * occlusion_modifier;
    var L_specular = specular * lighting * occlusion_modifier;

    refractive(r, hit);

    return vec3f(max(L_specular.r, 0));
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    (*hit).continue_trace = false;

    switch ((*hit).shader)
    {
        default :
        {
        }
        case 1 :
        {
            return lambertian(r, hit);
        }
        case 2 :
        {
            return mirror(r, hit);
        }
        case 3 :
        {
            return refractive(r, hit);
        }
        case 4 :
        {
            return phong(r, hit);
        }
        case 5 :
        {
            return glossy(r, hit);
        }
    }

    return (*hit).color;
}

//Fragment shader //

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);
    const max_depth = 10;

    let uv = vec2f(coords.x * environment.aspect_ratio, coords.y) *.5;
    var r = generate_ray_from_camera(uv);

    var result = vec3f(0.0);
    var hit = generate_default_hitinfo();

    for (hit.depth = 0; hit.depth< max_depth; hit.depth++)
    {
        if (!intersect_scene(&r, &hit))
        {
            result += backgroundColor.rgb;
            break;
        }

        result += shader(&r, &hit);

        if (!hit.continue_trace)
        {
            break;
        };
    }

    return vec4f(pow(result, vec3f(1.0 / 1.25)), 1.0);
}
`,ue="mirrors",le={"Base color":0,Lambertian:1,Mirror:2,Refractive:3,Phong:4,Glossy:5},oi=ue+"-sphere-shader",si=ue+"-triangle-shader",ci=ue+"-plane-shader",li=ue+"-light-position-x-input",hi=ue+"-light-position-y-input",di=ue+"-light-position-z-input",fi=ue+"-animation-slider",Hs=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await sn(ue),a=N(li),i=N(hi),o=N(di),s=N(oi),c=N(si),l=N(ci),d=N(fi),h=t.width/t.height,u=an(n,[],r,Ds,"triangle-strip"),v=new Float32Array([h,0]),{bindGroup:m,buffers:[_]}=z(n,u,[v],"UNIFORM"),g=new Float32Array([a(),i(),o(),le[s()],le[c()],le[l()],0,0,0]),{bindGroup:x,buffers:[w]}=z(n,u,[g],"UNIFORM",1),p=I=>{Z(n,_,new Float32Array([h,I*d()/512]),0),Z(n,w,new Float32Array([a(),i(),o(),le[s()],le[c()],le[l()],0,0,0]),0);const{pass:T,executePass:b}=un(n,e,fn.black);T.setPipeline(u),T.setBindGroup(0,m),T.setBindGroup(1,x),T.draw(4),b(),requestAnimationFrame(p)};requestAnimationFrame(p)},qs=(n,e)=>{const t=on("rendering/02-lighting-models",["/light.ts","/light.wgsl"]),r=W('Putting physics in "physically-based rendering"'),a=D(`
A completely black sphere consuming all light that is unfortunate enough to fall into its grasp is no fun. Let's change it to something more interesting, something physically-based rendering excels at - reflection and refraction.

Reflection, the easier to conceptually grasp of the two, is the mirroring of an incident ray about the surface normal on a surface which perfectly reflects all light (does not absorb).

Refraction, following Snell's laws, occurs when a ray reaches a medium with a different refractive index. The simulation below represents a glass sphere,
therefore the transition happens between the medium of air (refractive index equal to 1.0) and the medium of glass (refractive index equal to 1.5). 
The index is a ratio of the speed of light, so within a medium with a higher refractive index light travels slower. 
When a ray reaches the intersection at a surface it will refract into the new medium, with the new angle dependent on the ratio of the two mediums' refractive indices. 
The higher the new medium's index is - the sharper the refraction angle becomes.
Note that the same case, but in reverse, occurs when the ray leaves the refraction medium. 

For such cases it is important to consider the multiple possible intersection points a line may have with an object, such as with a sphere. 
If a ray is cast from the sphere's surface inward, the closer intersection point is the ray's origin point. 
These cases can be handled by carefully managing the minimum and maximum values the ray parameter may assume.

At the intersection with one of these two types of materials, the is not absorbed and no light is returned. 
Instead the ray is continued (either recursively or - in the case of WebGPU's non-state-machine-like structure - looped until a max depth) from that position in the direction generated by the physical event.

A new lighting model is introduced to the below - the Phong lighting model which addresses the specular reflectance of objects. 
It can be matched with the refractive model (as additive light) to create a glossy material for the sphere surface, which imitates the reflection of some of the light source rays.

While these simulations are still primitive and computationally simple, they may still be animated (such as the sphere's orbit).
`),i=nn(),o=K(ue,{width:512+128,height:512-64}),s=_n(),c=k(Bn(oi,Object.keys(le),"Refractive"),"Sphere shader type",!1),l=k(Bn(si,Object.keys(le),"Lambertian"),"Triangle shader type",!1),d=k(Bn(ci,Object.keys(le),"Lambertian"),"Plane shader type",!1),h=k(vn(li,0,-5,5,.1),"Light X position"),u=k(vn(hi,1,0,5,.1),"Light Y position"),v=k(vn(di,0,-5,5,.1),"Light Z position"),m=k(vn(fi,0,0,1,.1),"Orbit animation speed");s.append(c,l,d,h,u,v,m),i.append(o,s),n.append(r,t,a,i),e.push(Hs)},ui=(n,e)=>{Ns(n,e),qs(n,e)},$s=`@group(0) @binding(0) var texture_sampler : sampler;
@group(0) @binding(1) var grass_texture : texture_2d<f32>;

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    let uv = vec2f(coords.x, coords.y) *.5;

    return textureSample(grass_texture, texture_sampler, uv);
}
`,vi="texture",_i="texture-repeat-style",Ws=["clamp-to-edge","repeat","mirror-repeat"],Xs=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(vi),r=async a=>{const i=an(n,[],t,$s,"triangle-strip"),{textureData:o,height:s,width:c}=await he(hn("textures/grass_minecraft.png")),{texture:l,sampler:d}=ee(n,o,c,s,{addressModeU:a,addressModeV:a}),h=Nn(n,i,l,d),{pass:u,executePass:v}=un(n,e,fn.black);u.setPipeline(i),u.setBindGroup(0,h),u.draw(4),v()};r(Tn(_i,r))},Ys=(n,e)=>{const t=on("rendering/03-textures",["/texture.ts","/texture.wgsl"]),r=W("Introducing textures"),a=D(`
Textures are image-based color maps for the surfaces of objects.
`),i=nn(),o=K(vi),s=_n(),c=k(Bn(_i,Ws,"repeat"),"Texture edge behavior",!1);s.append(c),i.append(o,s),n.append(r,t,a,i),e.push(Xs)},Js=`@group(0) @binding(0) var texture_sampler : sampler;
@group(0) @binding(1) var grass_texture : texture_2d<f32>;

@group(2) @binding(0) var<storage> jitters : array<vec2f>;

const light_position : vec3f = vec3f(0, 1, 0);
const sphere_refractive_index = 1.5;
const air_refractive_index = 1.;

struct Globals {
    texture_scale : f32,
    subdivisions_sqr : f32
}

@group(1) @binding(0) var<uniform> globals : Globals;

struct Plane {
    tangent : vec3f,
    binormal : vec3f,
    normal : vec3f
};

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
}

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,

    dist : f32,
    position : vec3f,
    normal : vec3f,
    color : vec3f,

    shader : u32,

    prev_refractive : f32,
    next_refractive : f32,

    diffuse : f32,
    specular : f32,
    shininess : f32,

    texture : bool,
    uv : vec2f
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    return HitInfo(0, false, false, 0., vec3f(0.), vec3f(0.), vec3f(0.), 0, 1., 1., 0., 0., 0., false, vec2f(0, 0));
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    const up = vec3f(0., 1., 0.);
    const target_point = vec3f(0., .5, 0.);
    const origin_point = vec3f(2., 1.5, 2.);
    const camera_constant = 1;

    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * 1;

    return construct_ray_100units(origin_point, normalize(q));
}

fn construct_ray_100units(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, .001, 100);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray : Ray;
    ray.origin = origin;
    ray.direction = direction;
    ray.tmax = tmax;
    ray.tmin = tmin;
    return ray;
}


//Intersecting objects //

fn intersect_plane(r : Ray, hit : ptr < function, HitInfo>, position : vec3f, plane : Plane) -> bool {
    var distance = dot(position - r.origin, plane.normal) / dot(r.direction, plane.normal);
    var intersection = r.origin + distance * r.direction;

    var has_hit = distance > r.tmin && distance < r.tmax;

    var u = dot((intersection - position), plane.tangent);
    var v = dot((intersection - position), plane.binormal);

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).color = select((*hit).color, vec3f(0, 1, 0), has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);
    (*hit).normal = select((*hit).normal, plane.normal, has_hit);

    (*hit).shader = select((*hit).shader, 1, has_hit);
    (*hit).diffuse = select((*hit).diffuse, 1., has_hit);
    //(*hit).prev_refractive = select((*hit).prev_refractive, 1., has_hit);
    //(*hit).next_refractive = select((*hit).next_refractive, 1., has_hit);
    (*hit).specular = select((*hit).specular, .2, has_hit);
    (*hit).shininess = select((*hit).shininess, 60., has_hit);

    (*hit).texture = select((*hit).texture, true, has_hit);
    (*hit).uv = select((*hit).uv, vec2f(u, v), has_hit);

    return has_hit;
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, v : array<vec3f, 3>) -> bool {
    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, vec3f(.4, .3, .2), has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(n), has_hit);

    (*hit).shader = select((*hit).shader, 1, has_hit);
    (*hit).diffuse = select((*hit).diffuse, .8, has_hit);
    //(*hit).prev_refractive = select((*hit).prev_refractive, 1., has_hit);
    //(*hit).next_refractive = select((*hit).next_refractive, 1., has_hit);
    (*hit).specular = select((*hit).specular, .2, has_hit); ;
    (*hit).shininess = select((*hit).shininess, 60., has_hit); ;

    (*hit).texture = select((*hit).texture, false, has_hit);

    return has_hit;
}

fn intersect_sphere(r : Ray, hit : ptr < function, HitInfo>, center : vec3f, radius : f32, sphere_color : vec3f) -> bool {

    var from_center = r.origin - center;
    var b_half = dot(from_center, r.direction);
    var c = dot(from_center, from_center) - radius * radius;
    var b_half_2_c = b_half * b_half - c;

    var does_intersection_exist = b_half_2_c >= 0;

    var distance_1 = -b_half - sqrt(abs(b_half_2_c));
    var distance_2 = -b_half + sqrt(abs(b_half_2_c));
    var distance_1_in_range = distance_1 >= r.tmin && distance_1 <= r.tmax;
    var distance_2_in_range = distance_2 >= r.tmin && distance_2 <= r.tmax;

    var min_distance = min(distance_1, distance_2);
    var distance = select(distance_2, select(distance_1, min_distance, distance_2_in_range), distance_1_in_range);

    var intersection = r.origin + distance * r.direction;
    var n = normalize(intersection - center);

    var is_intersection_from_inside = dot(n, r.direction) > 0;
    var next_refr_index = select(sphere_refractive_index, air_refractive_index, is_intersection_from_inside);
    var context_n = select(n, -n, is_intersection_from_inside);

    var has_hit = does_intersection_exist && distance >= r.tmin && distance <= r.tmax;
    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).color = select((*hit).color, sphere_color, has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);
    (*hit).normal = select((*hit).normal, context_n, has_hit);

    (*hit).shader = select((*hit).shader, 5, has_hit);
    (*hit).diffuse = select((*hit).diffuse, .9, has_hit);
    (*hit).prev_refractive = select((*hit).prev_refractive, (*hit).next_refractive, has_hit);
    (*hit).next_refractive = select((*hit).next_refractive, next_refr_index, has_hit);
    (*hit).specular = select((*hit).specular, .1, has_hit);
    (*hit).shininess = select((*hit).shininess, 42., has_hit);

    (*hit).texture = select((*hit).texture, false, has_hit);

    return has_hit;
}

fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    (*hit).has_hit = false;

    const plane = Plane(vec3f(-1.0, 0.0, 0.0), vec3f(0.0, 0.0, 1.0), vec3f(0.0, 1.0, 0.0));
    var has_hit_plane = intersect_plane(*r, hit, vec3f(0., 0., 0.), plane);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_plane);

    var sphere_center = vec3f(0, .5, 0);
    var has_hit_sphere = intersect_sphere(*r, hit, sphere_center, .3, vec3f(0., 0., 0.));
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_sphere);

    const triangle = array<vec3f, 3 > (vec3f(-.2, .1, .9), vec3f(.2, .1, .9), vec3f(-.2, .1, -.1));
    var has_hit_triangle = intersect_triangle(*r, hit, triangle);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_triangle);

    var has_hit_lightbulb = intersect_sphere(*r, hit, light_position + vec3f(0, .035, 0), .03, vec3f(1., .95, 0.));
    (*hit).shader = select((*hit).shader, 0, has_hit_lightbulb);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_lightbulb);

    return (*hit).has_hit;
}

//Lighting //

fn sample_point_light(pos : vec3f) -> Light {
    const light_intensity = 3.14;

    var direction = light_position - pos;
    var dist = length(direction);
    var incident_light = light_intensity / (dist * dist);

    var light = Light(vec3f(incident_light), direction, dist);

    return light;
}

fn check_occulusion(position : vec3f, light : vec3f) -> bool
{
    const surface_offset = 0.001;

    var line = light - position;
    var direction = normalize(line);
    var distance = length(line) - surface_offset;

    var r = construct_ray(position + direction * surface_offset, direction, surface_offset, distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_point_light((*hit).position);
    var lambertian_light = (*hit).diffuse / 3.14 * light_info.L_i * dot((*hit).normal, light_info.w_i);

    var is_occluded = check_occulusion((*hit).position, light_position);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1;
    var L_reflected = .9 * lambertian_light * occlusion_modifier;
    var L_observed = L_ambient + L_reflected;

    return LightResult(L_observed, vec3f(0));
}

fn mirror(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    (*r).direction = normalize(reflect((*r).direction, (*hit).normal));
    (*r).origin = (*hit).position + (*r).direction * .001;
    (*r).tmax = 100.;

    (*hit).continue_trace = true;

    return LightResult(vec3f(1), vec3f(0));
}

fn refractive(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var ni_nt = (*hit).prev_refractive / (*hit).next_refractive;

    var incident = -(*r).direction;
    var r_n_dot = dot(incident, (*hit).normal);

    var t_sin = ni_nt * (r_n_dot * (*hit).normal - incident);
    var cos2 = 1 - ni_nt * ni_nt * (1 - r_n_dot * r_n_dot);
    var direction = t_sin - (*hit).normal * sqrt(abs(cos2));

    var is_reflected = cos2 < 0;
    var reflected_direction = reflect((*r).direction, (*hit).normal);

    (*r).direction = normalize(select(direction, reflected_direction, is_reflected));
    (*r).origin = (*hit).position + (*r).direction * .01;
    (*r).tmax = 100.;

    (*hit).continue_trace = true;

    return LightResult(vec3f(1), vec3f(0));
}

fn phong(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_point_light((*hit).position);
    var lighting = light_info.L_i * dot(light_info.w_i, (*hit).normal) / 3.14;

    var diffuse_lighting = (*hit).diffuse * lighting;

    var reflection = normalize(reflect(-light_info.w_i, (*hit).normal));
    var specular = (*hit).specular * ((*hit).shininess + 2) * .5 * pow(dot(-(*r).direction, reflection), (*hit).shininess);

    var is_occluded = check_occulusion((*hit).position, light_position);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1;
    var L_diffuse = .9 * diffuse_lighting * occlusion_modifier;
    var L_specular = specular * lighting * occlusion_modifier;

    return LightResult(L_ambient + L_diffuse, vec3f(max(L_specular.r, 0)));
}


fn glossy(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_point_light((*hit).position);
    var lighting = light_info.L_i * dot(light_info.w_i, (*hit).normal) / 3.14;

    var diffuse_lighting = (*hit).diffuse * lighting;

    var reflection = normalize(reflect(-light_info.w_i, (*hit).normal));
    var specular = (*hit).specular * ((*hit).shininess + 2) * .5 * pow(dot(-(*r).direction, reflection), (*hit).shininess);

    var is_occluded = check_occulusion((*hit).position, light_position);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1 * (*hit).color;
    var L_diffuse = .9 * diffuse_lighting * (*hit).color * occlusion_modifier;
    var L_specular = specular * lighting * occlusion_modifier;

    refractive(r, hit);

    return LightResult(vec3f(1), vec3f(max(L_specular.r, 0)));
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    (*hit).continue_trace = false;

    switch ((*hit).shader)
    {
        default :
        {
        }
        case 1 :
        {
            return lambertian(r, hit);
        }
        case 2 :
        {
            return mirror(r, hit);
        }
        case 3 :
        {
            return refractive(r, hit);
        }
        case 4 :
        {
            return phong(r, hit);
        }
        case 5 :
        {
            return glossy(r, hit);
        }
    }

    return LightResult(vec3f(1), vec3f(0));
}

//Texturing //

fn texture(is_textured : bool, uv : vec2f, light : LightResult, color : vec3f) -> vec3f
{
    var sampled_texture = textureSample(grass_texture, texture_sampler, uv * globals.texture_scale).rgb;

    var result = light.multiplicative * select(color, sampled_texture, is_textured) + light.additive;

    return result;
}

//Fragment shader //

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);
    const max_depth = 10;

    var light_result : LightResult;
    var r : Ray;
    var hit : HitInfo;

    var colors = array<vec3f, 100 > ();
    var lights = array<LightResult, 100 > ();
    var is_textured = array<bool, 100 > ();
    var texture_uvs = array<vec2f, 100 > ();

    for (var i = 0; i < i32(globals.subdivisions_sqr); i++)
    {
        var uv = vec2f(coords.x, coords.y) *.5 + jitters[i];
        r = generate_ray_from_camera(uv);
        hit = generate_default_hitinfo();
        light_result = LightResult(vec3f(1), vec3f(0));

        for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
        {
            if (!intersect_scene(&r, &hit))
            {
                hit.color += backgroundColor.rgb;
                break;
            }

            var next_light_result = shader(&r, &hit);
            light_result.additive += next_light_result.additive;
            light_result.multiplicative *= next_light_result.multiplicative;

            if (!hit.continue_trace)
            {
                break;
            };
        }

        colors[i] = hit.color;
        lights[i] = light_result;
        is_textured[i] = hit.texture;
        texture_uvs[i] = hit.uv;
    }

    var final_result = vec3f();
    var j : i32;
    for (j = 0; j < i32(globals.subdivisions_sqr); j++)
    {
        var substrata_result = texture(is_textured[j], texture_uvs[j], lights[j], colors[j]);
        final_result += substrata_result / globals.subdivisions_sqr;
    }

    return vec4f(pow(final_result, vec3f(1.0 / 1.25)), 1.0);
}
`,mi="texturing",Pt="grass-texture-scale",We="subdivision-jitter-slider",Ot="grass-texture-select",pi="texture-repeat-style-on-plane",Zs=["clamp-to-edge","repeat","mirror-repeat"],Ks=async()=>{const{device:n,canvas:e,context:t,canvasFormat:r}=await sn(mi),a=N(Pt),i=N(We),o=N(Ot),s=an(n,[],r,Js,"triangle-strip");let c,l;const d=async w=>{const p=[he(hn("textures/grass.jpg")),he(hn("textures/grass_minecraft.png"))],I=await Promise.all(p),{texture:T,sampler:b}=ee(n,I[0].textureData,I[0].width,I[0].height,{addressModeU:w,addressModeV:w}),{texture:M,sampler:S}=ee(n,I[1].textureData,I[1].width,I[1].height,{addressModeU:w,addressModeV:w});c=Nn(n,s,T,b),l=Nn(n,s,M,S)};await d("repeat");const{bindGroup:h,buffers:[u]}=z(n,s,[new Float32Array([a(),i()*i()])],"UNIFORM",1),{bindGroup:v,buffers:[m]}=z(n,s,[new Float32Array(200)],"STORAGE",2),_=()=>{Z(n,u,new Float32Array([a(),i()*i()]),0);const w={"grass.jpg":c,"grass_minecraft.png":l}[o()],{pass:p,executePass:I}=un(n,t,fn.black);p.setPipeline(s),p.setBindGroup(0,w),p.setBindGroup(1,h),p.setBindGroup(2,v),p.draw(4),I()},g=w=>{const p=Dt(e.height,w);Z(n,m,new Float32Array(B(p)),0,!0)},x=Tn(We,g);g(x),Gt([Pt,Ot,We],_),Tn(pi,async w=>{await d(w),_()}),_()},Qs=(n,e)=>{const t=on("rendering/03-textures",["/texturing.ts","/texturing.wgsl"]),r=W("Textures in rendering, jittering to solve aliasing"),a=D(`
In rendering textures are applied much like in the standard rasterization pipeline. 
Either provided uv coordinates are used to extract the color from the texture (as vertex attributes) or a mathematical equation is used to retrieve a deterministic result.
In the case of the plane, this process is simplified to mapping the plane coordiantes directly to uv coordinates with a linear scale factor.

A powerful tool to combat aliasing in renders is introduced in the form of stratified jittering. This is the proces of subdividing a fragment (pixel) into a grid. 
These cells (substrata) each query the scene with their own ray cast offset by a random amount (a jitter). 
The values of all of the cells are later averaged to create a smoothened single color.

The result is dampening the effects of aliasing. 
Edges will have contributions from each color in the vicinity, as some jittered rays may, for example, miss an object and contribute the color of the background.
Texture magnification and minification are also addressed by jittering. In the example below, for the grass.jpg texture, the grainy overlay in the distance vanishes when the jittering count is increased.
This is more pronounced for large resolutions of the subdivision grid, but comes at a computational cost, as the number of ray casts for each pixel rises quadratically.

At this point all the jitters are precalculated on the CPU and provided to the GPU in the form of a uniform (or storage) buffer. 
At a later point random sampling will be introduced to offset the jitter generation to the GPU instead.
`),i=nn(),o=K(mi),s=_n(),c=k(vn(Pt,.2,.1,2,.1),"Texture scale"),l=k(vn(We,1,1,10,1),"Subdivisions for stratisfied jitter"),d=k(Bn(Ot,["grass.jpg","grass_minecraft.png"],"grass_minecraft.png"),"Grass texture",!1),h=k(Bn(pi,Zs,"repeat"),"Texture edge behavior",!1);s.append(d,c,h,l),i.append(o,s),n.append(r,t,a,i),e.push(Ks)},gi=(n,e)=>{Ys(n,e),Qs(n,e)},nc=n=>{const e=W("Measuring light"),t=D(`
Radiometry and photometry are two schools of light measurement. While radiometry is more aligned with machine-friendly value, photometry addresses the measurements in a human-friendly (readable) method.
In the end, both are measurements of the same phenomena and there exists a direct conversion between the two sets of units.

Below are seven examples of light measurement exercises which make use of the equations. 
They are meant to provide a more practical look into the behaviour of light and how that could apply to the art of rendering.
A key take-away is about the radial flux of light - how light radiates spherically outwards (from isotropic and/or homogeneous light sources) and a object surface a certain distance away will receive a slice of that enlarging sphere.

Mathematically this would require integrals (as in the examples below) to calculate the amount of light, but as weill be later shown, this can be approximated with Monte Carlo integration in progressive rendering.
`),r=document.createElement("iframe");r.width="100%",r.height="1000px",r.src=hn("resources/worksheet.pdf"),n.append(e,t,r)},ec=(n,e)=>{nc(n)},tc=`@group(0) @binding(0) var texture_sampler : sampler;
@group(0) @binding(1) var grass_texture : texture_2d<f32>;

@group(1) @binding(0) var<storage> triangle_positions : array<vec3f>;
@group(1) @binding(1) var<storage> triangle_faces : array<vec3u>;

const light_position : vec3f = vec3f(0, 1, 0);
const sphere_refractive_index = 1.5;
const air_refractive_index = 1.;
const texture_scale = .4;

struct Plane {
    tangent : vec3f,
    binormal : vec3f,
    normal : vec3f
};

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
}

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,

    dist : f32,
    position : vec3f,
    normal : vec3f,
    color : vec3f,

    shader : u32,

    prev_refractive : f32,
    next_refractive : f32,

    diffuse : f32,
    specular : f32,
    shininess : f32,

    texture : bool,
    uv : vec2f
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    return HitInfo(0, false, false, 0., vec3f(0.), vec3f(0.), vec3f(0.), 0, 1., 1., 0., 0., 0., false, vec2f(0, 0));
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    const up = vec3f(0., 1., 0.);
    const target_point = vec3f(0., .5, 0.);
    const origin_point = vec3f(2., 1.5, 2.);
    const camera_constant = 1;

    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * 1;

    return construct_ray_100units(origin_point, normalize(q));
}

fn construct_ray_100units(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, .001, 100);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray : Ray;
    ray.origin = origin;
    ray.direction = direction;
    ray.tmax = tmax;
    ray.tmin = tmin;
    return ray;
}


//Intersecting objects //

fn intersect_plane(r : Ray, hit : ptr < function, HitInfo>, position : vec3f, plane : Plane) -> bool {
    var distance = dot(position - r.origin, plane.normal) / dot(r.direction, plane.normal);
    var intersection = r.origin + distance * r.direction;

    var has_hit = distance > r.tmin && distance < r.tmax;

    var u = dot((intersection - position), plane.tangent);
    var v = dot((intersection - position), plane.binormal);

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).color = select((*hit).color, vec3f(0, 1, 0), has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);
    (*hit).normal = select((*hit).normal, plane.normal, has_hit);

    (*hit).shader = select((*hit).shader, 1, has_hit);
    (*hit).diffuse = select((*hit).diffuse, 1., has_hit);
    //(*hit).prev_refractive = select((*hit).prev_refractive, 1., has_hit);
    //(*hit).next_refractive = select((*hit).next_refractive, 1., has_hit);
    (*hit).specular = select((*hit).specular, .2, has_hit);
    (*hit).shininess = select((*hit).shininess, 60., has_hit);

    (*hit).texture = select((*hit).texture, true, has_hit);
    (*hit).uv = select((*hit).uv, vec2f(u, v), has_hit);

    return has_hit;
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_lookup = triangle_faces[face];
    var v = array<vec3f, 3 > (triangle_positions[vertex_lookup.x], triangle_positions[vertex_lookup.y], triangle_positions[vertex_lookup.z]);

    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, vec3f(.4, .3, .2), has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(n), has_hit);

    (*hit).shader = select((*hit).shader, 1, has_hit);
    (*hit).diffuse = select((*hit).diffuse, .8, has_hit);
    //(*hit).prev_refractive = select((*hit).prev_refractive, 1., has_hit);
    //(*hit).next_refractive = select((*hit).next_refractive, 1., has_hit);
    (*hit).specular = select((*hit).specular, .2, has_hit); ;
    (*hit).shininess = select((*hit).shininess, 60., has_hit); ;

    (*hit).texture = select((*hit).texture, false, has_hit);

    return has_hit;
}

fn intersect_sphere(r : Ray, hit : ptr < function, HitInfo>, center : vec3f, radius : f32, sphere_color : vec3f) -> bool {

    var from_center = r.origin - center;
    var b_half = dot(from_center, r.direction);
    var c = dot(from_center, from_center) - radius * radius;
    var b_half_2_c = b_half * b_half - c;

    var does_intersection_exist = b_half_2_c >= 0;

    var distance_1 = -b_half - sqrt(abs(b_half_2_c));
    var distance_2 = -b_half + sqrt(abs(b_half_2_c));
    var distance_1_in_range = distance_1 >= r.tmin && distance_1 <= r.tmax;
    var distance_2_in_range = distance_2 >= r.tmin && distance_2 <= r.tmax;

    var min_distance = min(distance_1, distance_2);
    var distance = select(distance_2, select(distance_1, min_distance, distance_2_in_range), distance_1_in_range);

    var intersection = r.origin + distance * r.direction;
    var n = normalize(intersection - center);

    var is_intersection_from_inside = dot(n, r.direction) > 0;
    var next_refr_index = select(sphere_refractive_index, air_refractive_index, is_intersection_from_inside);
    var context_n = select(n, -n, is_intersection_from_inside);

    var has_hit = does_intersection_exist && distance >= r.tmin && distance <= r.tmax;
    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).color = select((*hit).color, sphere_color, has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);
    (*hit).normal = select((*hit).normal, context_n, has_hit);

    (*hit).shader = select((*hit).shader, 5, has_hit);
    (*hit).diffuse = select((*hit).diffuse, .9, has_hit);
    (*hit).prev_refractive = select((*hit).prev_refractive, (*hit).next_refractive, has_hit);
    (*hit).next_refractive = select((*hit).next_refractive, next_refr_index, has_hit);
    (*hit).specular = select((*hit).specular, .1, has_hit);
    (*hit).shininess = select((*hit).shininess, 42., has_hit);

    (*hit).texture = select((*hit).texture, false, has_hit);

    return has_hit;
}

fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    (*hit).has_hit = false;

    const plane = Plane(vec3f(-1.0, 0.0, 0.0), vec3f(0.0, 0.0, 1.0), vec3f(0.0, 1.0, 0.0));
    var has_hit_plane = intersect_plane(*r, hit, vec3f(0., 0., 0.), plane);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_plane);

    var sphere_center = vec3f(0, .5, 0);
    var has_hit_sphere = intersect_sphere(*r, hit, sphere_center, .3, vec3f(0., 0., 0.));
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_sphere);

    var has_hit_triangle = intersect_triangle(*r, hit, 0);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_triangle);

    var has_hit_lightbulb = intersect_sphere(*r, hit, light_position + vec3f(0, .035, 0), .03, vec3f(1., .95, 0.));
    (*hit).shader = select((*hit).shader, 0, has_hit_lightbulb);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_lightbulb);

    return (*hit).has_hit;
}

//Lighting //

fn sample_point_light(pos : vec3f) -> Light {
    const light_intensity = 3.14;

    var direction = light_position - pos;
    var dist = length(direction);
    var incident_light = light_intensity / (dist * dist);

    var light = Light(vec3f(incident_light), direction, dist);

    return light;
}

fn check_occulusion(position : vec3f, light : vec3f) -> bool
{
    const surface_offset = 0.001;

    var line = light - position;
    var direction = normalize(line);
    var distance = length(line) - surface_offset;

    var r = construct_ray(position + direction * surface_offset, direction, surface_offset, distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_point_light((*hit).position);
    var lambertian_light = (*hit).diffuse / 3.14 * light_info.L_i * dot((*hit).normal, light_info.w_i);

    var is_occluded = check_occulusion((*hit).position, light_position);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1;
    var L_reflected = .9 * lambertian_light * occlusion_modifier;
    var L_observed = L_ambient + L_reflected;

    return LightResult(L_observed, vec3f(0));
}

fn mirror(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    (*r).direction = normalize(reflect((*r).direction, (*hit).normal));
    (*r).origin = (*hit).position + (*r).direction * .001;
    (*r).tmax = 100.;

    (*hit).continue_trace = true;

    return LightResult(vec3f(1), vec3f(0));
}

fn refractive(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var ni_nt = (*hit).prev_refractive / (*hit).next_refractive;

    var incident = -(*r).direction;
    var r_n_dot = dot(incident, (*hit).normal);

    var t_sin = ni_nt * (r_n_dot * (*hit).normal - incident);
    var cos2 = 1 - ni_nt * ni_nt * (1 - r_n_dot * r_n_dot);
    var direction = t_sin - (*hit).normal * sqrt(abs(cos2));

    var is_reflected = cos2 < 0;
    var reflected_direction = reflect((*r).direction, (*hit).normal);

    (*r).direction = normalize(select(direction, reflected_direction, is_reflected));
    (*r).origin = (*hit).position + (*r).direction * .01;
    (*r).tmax = 100.;

    (*hit).continue_trace = true;

    return LightResult(vec3f(1), vec3f(0));
}

fn phong(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_point_light((*hit).position);
    var lighting = light_info.L_i * dot(light_info.w_i, (*hit).normal) / 3.14;

    var diffuse_lighting = (*hit).diffuse * lighting;

    var reflection = normalize(reflect(-light_info.w_i, (*hit).normal));
    var specular = (*hit).specular * ((*hit).shininess + 2) * .5 * pow(dot(-(*r).direction, reflection), (*hit).shininess);

    var is_occluded = check_occulusion((*hit).position, light_position);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1;
    var L_diffuse = .9 * diffuse_lighting * occlusion_modifier;
    var L_specular = specular * lighting * occlusion_modifier;

    return LightResult(L_ambient + L_diffuse, vec3f(max(L_specular.r, 0)));
}


fn glossy(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_point_light((*hit).position);
    var lighting = light_info.L_i * dot(light_info.w_i, (*hit).normal) / 3.14;

    var diffuse_lighting = (*hit).diffuse * lighting;

    var reflection = normalize(reflect(-light_info.w_i, (*hit).normal));
    var specular = (*hit).specular * ((*hit).shininess + 2) * .5 * pow(dot(-(*r).direction, reflection), (*hit).shininess);

    var is_occluded = check_occulusion((*hit).position, light_position);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1 * (*hit).color;
    var L_diffuse = .9 * diffuse_lighting * (*hit).color * occlusion_modifier;
    var L_specular = specular * lighting * occlusion_modifier;

    refractive(r, hit);

    return LightResult(vec3f(1), vec3f(max(L_specular.r, 0)));
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    (*hit).continue_trace = false;

    switch ((*hit).shader)
    {
        default :
        {
        }
        case 1 :
        {
            return lambertian(r, hit);
        }
        case 2 :
        {
            return mirror(r, hit);
        }
        case 3 :
        {
            return refractive(r, hit);
        }
        case 4 :
        {
            return phong(r, hit);
        }
        case 5 :
        {
            return glossy(r, hit);
        }
    }

    return LightResult(vec3f(1), vec3f(0));
}

//Texturing //

fn texture(is_textured : bool, uv : vec2f, light : LightResult, color : vec3f) -> vec3f
{
    var sampled_texture = textureSample(grass_texture, texture_sampler, uv * texture_scale).rgb;

    var result = light.multiplicative * select(color, sampled_texture, is_textured) + light.additive;

    return result;
}

//Fragment shader //

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);
    const max_depth = 10;

    var light_result : LightResult;
    var r : Ray;
    var hit : HitInfo;

    var uv = vec2f(coords.x, coords.y) *.5;
    r = generate_ray_from_camera(uv);
    hit = generate_default_hitinfo();
    light_result = LightResult(vec3f(1), vec3f(0));

    for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
    {
        if (!intersect_scene(&r, &hit))
        {
            hit.color += backgroundColor.rgb;
            break;
        }

        var next_light_result = shader(&r, &hit);
        light_result.additive += next_light_result.additive;
        light_result.multiplicative *= next_light_result.multiplicative;

        if (!hit.continue_trace)
        {
            break;
        };
    }

    var final_result = texture(hit.texture, hit.uv, light_result, hit.color);

    return vec4f(pow(final_result, vec3f(1.0 / 1.25)), 1.0);
}
`,bi="default-scene-as-meshes",rc=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(bi),r=an(n,[],t,tc,"triangle-strip"),a=Ji([y(-.2,.1,.9),y(.2,.1,.9),y(-.2,.1,-.1)]),{bindGroup:i}=z(n,r,[new Float32Array(B(a.vertices)),new Uint32Array(B(a.triangleIndices))],"STORAGE",1),o=await he(hn("textures/grass_minecraft.png")),{texture:s,sampler:c}=ee(n,o.textureData,o.width,o.height,{addressModeU:"repeat",addressModeV:"repeat"}),l=Nn(n,r,s,c);(()=>{const{pass:h,executePass:u}=un(n,e,fn.black);h.setPipeline(r),h.setBindGroup(0,l),h.setBindGroup(1,i),h.draw(4),u()})()},ic=(n,e)=>{const t=on("rendering/05-meshes",["/introducingTriangles.ts","/introducingTriangles.wgsl"]),r=W("Replacing the triangle with a triangle"),a=D(`
As a first step towards the introduction of triangle-based mesh model data to the rendering system, we will first replace the triangle... with a triangle.
Up to this point, all the shapes were conceptual - living only in the mind of the GPU, defined as mathematical parameterizations of objects.

But interesting meshes are more commonly not mathematical monstrosities, but artistic sculptures carved in polygons. These have to be passed to the GPU from the CPU.
The triangle in the scene below is defined as a vertex buffer, but passed to the GPU as a uniform/storage buffer. The shader loops over each of these triangles when intersecting a ray.

Inefficient? Absolutely, but that is a worry for a later chapter.
`),i=nn(),o=K(bi);i.append(o),n.append(r,t,a,i),e.push(rc)},ac=`@group(0) @binding(0) var<storage> ut_vertices : array<vec3f>;
@group(0) @binding(1) var<storage> ut_triangles : array<vec3u>;
@group(0) @binding(2) var<storage> ut_normals : array<vec3f>;

struct UtahTeapotMeta {
    triangle_count : u32,
    shading_type : u32
};

@group(1) @binding(0) var<uniform> ut_meta : UtahTeapotMeta;

const light_direction : vec3f = vec3f(-1.);
const light_intensity = 1.5;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
};

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,

    dist : f32,
    position : vec3f,
    normal : vec3f,
    color : vec3f,

    diffuse : f32,
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    return HitInfo(0, false, false, 0., vec3f(0.), vec3f(0.), vec3f(0.), 1.);
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    const up = vec3f(0., 1., 0.);
    const target_point = vec3f(.15, 1.5, 0.);
    const origin_point = vec3f(.15, 1.5, 10.);
    const camera_constant = 2.5;

    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    return construct_ray_100units(origin_point, normalize(q));
}

fn construct_ray_100units(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, .001, 100);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray : Ray;
    ray.origin = origin;
    ray.direction = direction;
    ray.tmax = tmax;
    ray.tmin = tmin;
    return ray;
}


//Intersecting objects //

fn barycentric_normal(v_ns : array<vec3f, 3 >, beta : f32, gamma : f32) -> vec3f {
    var alpha = 1 - beta - gamma;
    var interpolated_normal = alpha * v_ns[0] + beta * v_ns[1] + gamma * v_ns[2];
    return normalize(interpolated_normal);
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_lookup = ut_triangles[face];
    var v = array<vec3f, 3 > (ut_vertices[vertex_lookup.x], ut_vertices[vertex_lookup.y], ut_vertices[vertex_lookup.z]);
    var v_ns = array<vec3f, 3> (ut_normals[vertex_lookup.x], ut_normals[vertex_lookup.y], ut_normals[vertex_lookup.z]);

    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var normal = select(barycentric_normal(v_ns, beta, gamma), n, ut_meta.shading_type == 0);

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, vec3f(.9), has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(normal), has_hit);

    return has_hit;
}

fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    (*hit).has_hit = false;

    for (var i : u32 = 0; i < ut_meta.triangle_count; i++)
    {
        var has_hit_triangle = intersect_triangle(*r, hit, i);
        (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_triangle);
    }

    return (*hit).has_hit;
}

//Lighting //

fn sample_directional_light(light_direction : vec3f) -> Light {
    var light = Light(vec3f(light_intensity), -light_direction, 0.);
    return light;
}

fn check_occulusion_directional(position : vec3f, direction : vec3f) -> bool
{
    const surface_offset = 0.001;
    const max_distance = 100.;

    var r = construct_ray(position + direction * surface_offset, direction, surface_offset, max_distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_directional_light(light_direction);
    var lambertian_light = (*hit).diffuse / 3.14 * light_info.L_i * dot((*hit).normal, light_info.w_i);

    //var is_occluded = check_occulusion_directional((*hit).position, light_direction);
    //var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1;
    var L_reflected = .9 * lambertian_light;//* occlusion_modifier;
    var L_observed = L_ambient + L_reflected;

    return LightResult(L_observed, vec3f(0));
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    return lambertian(r, hit);
}

//Fragment shader //

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);
    const max_depth = 10;

    var light_result : LightResult;
    var r : Ray;
    var hit : HitInfo;

    var uv = vec2f(coords.x * 840 / 450, coords.y) *.5;
    r = generate_ray_from_camera(uv);
    hit = generate_default_hitinfo();
    light_result = LightResult(vec3f(1), vec3f(0));

    for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
    {
        if (!intersect_scene(&r, &hit))
        {
            hit.color += backgroundColor.rgb;
            break;
        }

        var next_light_result = shader(&r, &hit);
        light_result.additive += next_light_result.additive;
        light_result.multiplicative *= next_light_result.multiplicative;

        if (!hit.continue_trace)
        {
            break;
        };
    }

    var final_result = light_result.multiplicative * hit.color + light_result.additive;

    return vec4f(pow(final_result, vec3f(1.0 / 1.25)), 1.0);
}
`,xi="utah-teapot",oc=["Flat","Vertex normals"],yi="shading-select-ut",sc=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(xi),r=an(n,[],t,ac,"triangle-strip"),a=await Hn(hn("models/teapot.obj")),i=hr(a,{}),{bindGroup:o}=z(n,r,[new Float32Array(B(i.vertices)),new Uint32Array(B(i.triangleIndices)),new Float32Array(B(i.normals))],"STORAGE",0),{bindGroup:s,buffers:[c]}=z(n,r,[new Uint32Array([i.triangleCount,0])],"UNIFORM",1),l=h=>{const u={Flat:0,"Vertex normals":1};zn(n,c,new Uint32Array([u[h]]),4);const{pass:v,executePass:m}=un(n,e,Be(.8,.4,.4,1));v.setPipeline(r),v.setBindGroup(0,o),v.setBindGroup(1,s),v.draw(4),m()},d=Tn(yi,l);l(d)},cc=(n,e)=>{const t=on("rendering/05-meshes",["/utahTeapot.ts","/utahTeapot.wgsl"]),r=W("Introducing the Utah Teapot"),a=D(`
As the first rendered mesh we shall have no other than the computer graphics mascot itself - the Utah Teapot. Despite not even being a large mesh (by today's standards), the teapot already takes a moment to load into the GPU and for all the triangles to be tested for in the intersection phase of the rendering pipeline.

The teapot can be rendered in flat shading or vertex shading mode. A differentiation should be made at this point, as there are actually two types of surface normals to pick form. These are

1) Render triangle normals - the triangle face normal as calculated during ray-triangle intersection. Thes could be seen as the "mathematically true" normals of the shape.

2) Vertex normals - the normals as vertex attributes, provided together with the vertex buffer. These are the "artistically true" normals of the shape, as decided by the author of the shape.
Usually these smoothed normals are algorithmically adjusted in 3D modelling software to avoid sharp edges. 
To maintain the smooth surface when rendering the shape, the vertex normals are interpolated using the Barycentric coordainates of the points as interpolation factors.
`),i=nn(),o=K(xi,{width:840,height:450}),s=_n(),c=k(Bn(yi,oc,"Flat"),"Shading type",!1);s.append(c),i.append(o,s),n.append(r,t,a,i),e.push(sc)},lc=`@group(0) @binding(0) var<storage> cb_vertices : array<vec3f>;
@group(0) @binding(1) var<storage> cb_triangles : array<vec3u>;
@group(0) @binding(2) var<storage> cb_mat_indices : array<u32>;
@group(0) @binding(3) var<storage> cb_light_faces : array<u32>;

struct CornellBoxMeta {
    triangle_count : u32,
    light_indices_count : u32,
    shading_type : u32
};

@group(1) @binding(0) var<uniform> cb_meta : CornellBoxMeta;

struct Material {
    color : vec4f,
    specular : vec4f,
    emission : vec4f,
    illum_shininess_ior : vec3f
};

@group(2) @binding(0) var<storage> materials : array<Material>;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32,
    pos : vec3f
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
};

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,

    dist : f32,
    position : vec3f,
    normal : vec3f,
    color : vec3f,

    diffuse : f32,
};

const visibility = 1;

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    return HitInfo(0, false, false, 0., vec3f(0.), vec3f(0.), vec3f(0.), 1.);
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    const up = vec3f(0., 1., 0.);
    const target_point = vec3f(277., 275., 0.);
    const origin_point = vec3f(277., 275., -570.);
    const camera_constant = 1;

    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    return construct_ray_100units(origin_point, normalize(q));
}

fn construct_ray_100units(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, .01, 10000);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray : Ray;
    ray.origin = origin;
    ray.direction = direction;
    ray.tmax = tmax;
    ray.tmin = tmin;
    return ray;
}


//Intersecting objects //

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_lookup = cb_triangles[face];
    var v = array<vec3f, 3 > (cb_vertices[vertex_lookup.x], cb_vertices[vertex_lookup.y], cb_vertices[vertex_lookup.z]);

    var mat = materials[cb_mat_indices[face]];

    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    var color = mat.color + mat.emission;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, color.rgb, has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(n), has_hit);

    return has_hit;
}

fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    (*hit).has_hit = false;

    for (var i : u32 = 0; i < cb_meta.triangle_count; i++)
    {
        var has_hit_triangle = intersect_triangle(*r, hit, i);
        (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_triangle);
    }

    return (*hit).has_hit;
}

//Lighting //

fn get_area_light_center() -> vec3f
{
    var center_light_position = vec3f(0.);
    for (var i : u32 = 0; i < cb_meta.light_indices_count; i++)
    {
        var face_index = cb_light_faces[i];
        var vertex_lookup = cb_triangles[face_index];
        center_light_position += cb_vertices[vertex_lookup.x] + cb_vertices[vertex_lookup.y] + cb_vertices[vertex_lookup.z];
    }
    center_light_position /= f32(cb_meta.light_indices_count * 3);
    return center_light_position;
}

fn calculate_area_light_intensity(direction : vec3f) -> vec3f
{
    var intensity = vec3f(0.);
    for (var i : u32 = 0; i < cb_meta.light_indices_count; i++)
    {
        var face_index = cb_light_faces[i];
        var vertex_lookup = cb_triangles[face_index];
        var mat = materials[cb_mat_indices[face_index]];

        var e0 = cb_vertices[vertex_lookup.y] - cb_vertices[vertex_lookup.x];
        var e1 = cb_vertices[vertex_lookup.z] - cb_vertices[vertex_lookup.x];
        var n = cross(e0, e1);
        var area = length(n) / 2;

        intensity += max(0, dot(-direction, normalize(n))) * mat.emission.rgb * area;
    }

    return intensity;
}

fn sample_area_light(pos : vec3f) -> Light
{
    var area_light_center = get_area_light_center();

    var line = area_light_center - pos;
    var dist = length(line);
    var direction = line / dist;

    var incident_light = calculate_area_light_intensity(direction) / (dist * dist);

    return Light(vec3f(incident_light), normalize(direction), dist, area_light_center);
}

fn check_occulusion(position : vec3f, light : vec3f) -> bool
{
    const surface_offset = 0.01;

    var line = light - position;
    var direction = normalize(line);
    var distance = length(line) - surface_offset - surface_offset;

    var r = construct_ray(position, direction, surface_offset, distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_area_light((*hit).position);

    var lambertian_light = ((*hit).diffuse / 3.14) * visibility * max(0, dot((*hit).normal, light_info.w_i)) * light_info.L_i;

    var is_occluded = check_occulusion((*hit).position, light_info.pos);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1;
    var L_reflected = .9 * lambertian_light * occlusion_modifier;
    var L_observed = L_ambient + L_reflected;

    return LightResult(L_observed, vec3f(0));
}

fn flat(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult {
    return LightResult(vec3f(1), vec3f(0));
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    switch (cb_meta.shading_type)
    {
        default :
        {
        }
        case 0 :
        {
            return flat(r, hit);
        }
        case 1 :
        {
            return lambertian(r, hit);
        }
    }

    return LightResult(vec3(1.0), vec3(0));
}

//Fragment shader //

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    const backgroundColor = vec4f(vec3f(), 1.0);
    const max_depth = 10;

    var light_result : LightResult;
    var r : Ray;
    var hit : HitInfo;

    var uv = vec2f(coords.x, coords.y) *.5;
    r = generate_ray_from_camera(uv);
    hit = generate_default_hitinfo();
    light_result = LightResult(vec3f(1), vec3f(0));

    for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
    {
        if (!intersect_scene(&r, &hit))
        {
            hit.color += backgroundColor.rgb;
            break;
        }

        var next_light_result = shader(&r, &hit);
        light_result.additive += next_light_result.additive;
        light_result.multiplicative *= next_light_result.multiplicative;

        if (!hit.continue_trace)
        {
            break;
        };
    }

    var final_result = light_result.multiplicative * hit.color + light_result.additive;

    return vec4f(pow(final_result, vec3f(1.0 / 1.25)), 1.0);
}
`,wi="cornell-box",hc=["Flat","Lambertian"],Ii="shading-select-cb",dc=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(wi),r=an(n,[],t,lc,"triangle-strip"),a=await Hn(hn("models/CornellBoxWithBlocks.obj")),i=hr(a,{}),o=new Float32Array(a.mtls[0].materials.reduce((m,_)=>[...m,...B([_.color,_.specular,_.emission,f(_.illum,_.shininess,_.ior)])],[])),s=i.materialIndices.reduce((m,_,g)=>(a.mtls[0].materials[_].illum>=1&&m.push(g),m),[]),{bindGroup:c}=z(n,r,[new Float32Array(B(i.vertices)),new Uint32Array(B(i.triangleIndices)),new Uint32Array(i.materialIndices),new Uint32Array(s)],"STORAGE",0),{bindGroup:l,buffers:[d]}=z(n,r,[new Uint32Array([i.triangleCount,s.length,0])],"UNIFORM",1),{bindGroup:h}=z(n,r,[o],"STORAGE",2),u=m=>{const _={Flat:0,Lambertian:1}[m];zn(n,d,new Uint32Array([_]),2*4);const{pass:g,executePass:x}=un(n,e,fn.black);g.setPipeline(r),g.setBindGroup(0,c),g.setBindGroup(1,l),g.setBindGroup(2,h),g.draw(4),x()},v=Tn(Ii,u);u(v)},fc=(n,e)=>{const t=on("rendering/05-meshes",["/cornellBox.ts","/cornellBox.wgsl"]),r=W("Thinking inside the Cornell box"),a=D(`
Introducing another championing mascot of the computer graphics universe - the Cornell box - which we will be working with closely from now on.

Another important set of data to pass to the GPU is information about the types of materials which exist in the scene. 
3D objects in data form will usually contain or reference information about their surfaces. 
This material data format can contain all sorts of variables such as the diffuse reflectance, specular reflectance, roughness and emissive color - such as the light in the box, which emits a strong white.
`),i=nn(),o=K(wi),s=_n(),c=k(Bn(Ii,hc,"Lambertian"),"Shading type",!1);s.append(c),i.append(o,s),n.append(r,t,a,i),e.push(dc)},Li=(n,e)=>{ic(n,e),cc(n,e),fc(n,e)},uc=`@group(0) @binding(0) var<storage> vertices : array<vec3f>;
@group(0) @binding(1) var<storage> normals : array<vec3f>;
@group(0) @binding(2) var<storage> indices : array<vec4u>;

@group(1) @binding(0) var<storage> bspPlanes : array<f32>;
@group(1) @binding(1) var<storage> bspTree : array<vec4u>;
@group(1) @binding(2) var<storage> treeIds : array<u32>;

struct Aabb {
    min : vec3f,
    max : vec3f,
};

@group(2) @binding(0) var<uniform> aabb : Aabb;
@group(2) @binding(1) var<uniform> time : f32;


const MAX_LEVEL = 20u;
const BSP_LEAF = 3u;
var<private> branch_node : array<vec2u, MAX_LEVEL>;
var<private> branch_ray : array<vec2f, MAX_LEVEL>;

const light_direction : vec3f = vec3f(-1.);
const light_intensity = 1.5;

const up = vec3f(0., 1., 0.);
const target_point = vec3f(-.02, .11, 0.);
const camera_constant = 3.5;

const f1en2 = 0.01;
const f1en4 = 0.0001;
const f1en8 = 0.00000001;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
};

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,

    dist : f32,
    position : vec3f,
    normal : vec3f,
    color : vec3f,

    diffuse : f32,
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    return HitInfo(0, false, false, 0., vec3f(0.), vec3f(0.), vec3f(0.), 1.);
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    var origin_point = vec3f(-.02, .11, -.6) + vec3f(cos(time), 0, sin(time));


    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    return construct_ray_100units(origin_point, normalize(q));
}

fn construct_ray_100units(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, .001, 100);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray : Ray;
    ray.origin = origin;
    ray.direction = direction;
    ray.tmax = tmax;
    ray.tmin = tmin;
    return ray;
}


//Intersecting objects //

fn barycentric_normal(v_ns : array<vec3f, 3 >, beta : f32, gamma : f32) -> vec3f {
    var alpha = 1 - beta - gamma;
    var interpolated_normal = alpha * v_ns[0] + beta * v_ns[1] + gamma * v_ns[2];
    return normalize(interpolated_normal);
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_lookup = indices[face];
    var v = array<vec3f, 3 > (vertices[vertex_lookup.x], vertices[vertex_lookup.y], vertices[vertex_lookup.z]);
    var v_ns = array<vec3f, 3> (normals[vertex_lookup.x], normals[vertex_lookup.y], normals[vertex_lookup.z]);

    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);

    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var cross_a = cross(from_origin, r.direction);

    var beta = dot(cross_a, e1) / denom;
    var gamma = -dot(cross_a, e0) / denom;

    var normal = n;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, vec3f(.9), has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(normal), has_hit);

    return has_hit;
}

fn intersect_trimesh(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    var branch_lvl = 0u;
    var near_node = 0u;
    var far_node = 0u;
    var t = 0.0f;
    var node = 0u;
    for(var i = 0u; i <= MAX_LEVEL; i++)
    {
        let tree_node = bspTree[node];
        let node_axis_leaf = tree_node.x & 3u;
        if (node_axis_leaf == BSP_LEAF)
        {
            let node_count = tree_node.x>>2u;
            let node_id = tree_node.y;
            var found = false;

            for(var j = 0u; j < node_count; j++)
            {
                let obj_idx = treeIds[node_id + j];
                if(intersect_triangle(*r, hit, obj_idx))
                {
                    (*r).tmax = (*hit).dist;
                    found = true;
                }
            }

            if (found)
            {
                return true;
            }

            if (branch_lvl == 0u)
            {
                return false;
            }

            branch_lvl -= 1;
            i = branch_node[branch_lvl].x;
            node = branch_node[branch_lvl].y;
            (*r).tmin = branch_ray[branch_lvl].x;
            (*r).tmax = branch_ray[branch_lvl].y;

            continue;
        }
        let axis_direction = (*r).direction[node_axis_leaf];
        let axis_origin = (*r).origin[node_axis_leaf];
        if(axis_direction >= 0.0f)
        {
            near_node = tree_node.z;
            far_node = tree_node.w;
        }
        else
        {
            near_node = tree_node.w;
            far_node = tree_node.z;
        }
        let node_plane = bspPlanes[node];
        let denom = select(axis_direction, f1en8, abs(axis_direction) < f1en8);
        t = (node_plane - axis_origin) / denom;
        if(t > (*r).tmax)
        {
            node = near_node;
        }
        else if(t < (*r).tmin)
        {
            node = far_node;
        }
        else
        {
            branch_node[branch_lvl].x = i;
            branch_node[branch_lvl].y = far_node;
            branch_ray[branch_lvl].x = t;
            branch_ray[branch_lvl].y = (*r).tmax;
            branch_lvl++;
            (*r).tmax = t;
            node = near_node;
        }
    }
    return false;
}

fn intersect_min_max(r : ptr < function, Ray>) -> bool
{
    let p1 = (aabb.min - (*r).origin) / (*r).direction;
    let p2 = (aabb.max - (*r).origin) / (*r).direction;
    let pmin = min(p1, p2);
    let pmax = max(p1, p2);
    let tmin = max(pmin.x, max(pmin.y, pmin.z));
    let tmax = min(pmax.x, min(pmax.y, pmax.z));
    if(tmin > tmax || tmin > (*r).tmax || tmax < (*r).tmin)
    {
        return false;
    }
    (*r).tmin = max(tmin - f1en2, (*r).tmin);
    (*r).tmax = min(tmax + f1en2, (*r).tmax);
    return true;
}


fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    if (!intersect_min_max(r))
    {
        return false;
    }

    (*hit).has_hit = false;

    return intersect_trimesh(r, hit);
}

        //Lighting

fn sample_directional_light(light_direction : vec3f) -> Light {
    var light = Light(vec3f(light_intensity), -light_direction, 0.);
    return light;
}

fn check_occulusion_directional(position : vec3f, direction : vec3f) -> bool
{
    const surface_offset = 0.001;
    const max_distance = 100.;

    var r = construct_ray(position + direction * surface_offset, direction, surface_offset, max_distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_directional_light(light_direction);
    var lambertian_light = (*hit).diffuse / 3.14 * light_info.L_i * dot((*hit).normal, light_info.w_i);

    var is_occluded = check_occulusion_directional((*hit).position, light_direction);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1;
    var L_reflected = .9 * lambertian_light * 1.;
    var L_observed = L_ambient + L_reflected;

    return LightResult(L_observed, vec3f(0));
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    return lambertian(r, hit);
}

//Fragment shader

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);
    const max_depth = 10;

    var light_result : LightResult;
    var r : Ray;
    var hit : HitInfo;

    var uv = coords *.5;
    r = generate_ray_from_camera(uv);
    hit = generate_default_hitinfo();
    light_result = LightResult(vec3f(1), vec3f(0));

    for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
    {
        if (!intersect_scene(&r, &hit))
        {
            hit.color += backgroundColor.rgb;
            break;
        }

        var next_light_result = shader(&r, &hit);
        light_result.additive += next_light_result.additive;
        light_result.multiplicative *= next_light_result.multiplicative;

        if (!hit.continue_trace)
        {
            break;
        };
    }

    var final_result = light_result.multiplicative * hit.color + light_result.additive;

    return vec4f(pow(final_result, vec3f(1.0 / 1.25)), 1.0);
}
`,Ti="bsp",vc=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(Ti),r=an(n,[],t,uc,"triangle-strip"),a=Yn(await Hn(hn("models/bunny.obj"),1)),i=fe(a),{bindGroup:o}=z(n,r,[i.vertices,i.normals,i.indices],"STORAGE"),{bindGroup:s}=z(n,r,[i.bspPlanes,i.bspTree,i.treeIds],"STORAGE",1),{bindGroup:c,buffers:[l]}=z(n,r,[i.aabb,new Float32Array([950.5])],"UNIFORM",2),d=()=>{const{pass:h,executePass:u}=un(n,e,fn.black);h.setPipeline(r),h.setBindGroup(0,o),h.setBindGroup(1,s),h.setBindGroup(2,c),h.draw(4),u(),requestAnimationFrame(d)};requestAnimationFrame(d)},_c=(n,e)=>{const t=on("rendering/06-partitioning",["/bsp.ts","/partitioning.wgsl"]),r=W("Barking up the correct tree"),a=D(`
One of the standard spatial data structures which can be used to optimize ray intersections is the binary space partitioning tree (BSP).
Instead of looping over all of the possible triangles (which in the case of the bunny model used below is already quite high),
a ray can traverse through the tree to find its intersection point more quickly.

Before going into the details of the tree it is important to understand the concept of a bounding box. 
The bounding box (otherwise referred to as AABB) is a three dimensional rectangular prism. 
It defines a bounding box for a given context and is generated by a minimum-component point and a maximum-component point.

When applied to rendering, rays can be instructed to only be interested in intersections inside the bounding box to constrain the limits of searching.
The first quick fix is to create a bounding box for the entire scene - the bunny. Anything outside of the bounding box should be discarded (treated as background).

How about taking the bounding box a step further? It is possible to define a more granular bounding shape by stacking multiple bounding boxes together.
The binary space partitioning tree does this by subdividing a model's initial bounding box into clusters of smaller and smaller (until a predefined threshold) boxes.
The binary tree is referred to as "axis-aligned", as each bounding box remains aligned to the canonical axes of the reference system.

Once this collection of small AABBs is prepared (by the CPU), the tree can be transferred to the GPU for use in intersections. 
In the intersection phase, if a ray intersects a model's initial bounding box, the ray will continiue to "fold into" the model's smaller bounding boxes by traversing the tree.
Once a leaf node has been reached - that is a bounding box of the smallest size - the ray may intersect with all of the triangles contained inside that box.
`),i=nn(),o=K(Ti),s=_n();i.append(o,s),n.append(r,t,a,i),e.push(vc)},mc=`struct VertexNormal {
    vertex : vec3f,
    normal : vec3f
};

struct IndexMaterial {
    indices : vec3u,
    mat : u32
};

@group(0) @binding(0) var<storage> vertex_normals : array<VertexNormal>;
@group(0) @binding(1) var<storage> index_mats : array<IndexMaterial>;
@group(0) @binding(2) var<storage> light_faces : array<u32>;

@group(1) @binding(0) var<storage> bspPlanes : array<f32>;
@group(1) @binding(1) var<storage> bspTree : array<vec4u>;
@group(1) @binding(2) var<storage> treeIds : array<u32>;

struct Aabb {
    min : vec3f,
    max : vec3f,
};

@group(2) @binding(0) var<uniform> aabb : Aabb;
@group(2) @binding(1) var<uniform> light_indices_count : u32;

struct Material {
    color : vec4f,
    specular : vec4f,
    emission : vec4f,
    illum_shininess_ior : vec3f
};

@group(3) @binding(0) var<storage> materials : array<Material>;

const MAX_LEVEL = 20u;
const BSP_LEAF = 3u;
var<private> branch_node : array<vec2u, MAX_LEVEL>;
var<private> branch_ray : array<vec2f, MAX_LEVEL>;

const light_direction : vec3f = vec3f(-1.);
const light_intensity = 1.5;
const visibility = 1.;

const up = vec3f(0., 1., 0.);

const target_point = vec3f(277., 275., 0.);
const origin_point = vec3f(277., 275., -570.);
const camera_constant = 1;

const f1en2 = 0.01;
const f1en4 = 0.0001;
const f1en8 = 0.00000001;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32,
    pos : vec3f
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
};

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,

    dist : f32,
    position : vec3f,
    normal : vec3f,
    color : vec3f,

    diffuse : f32,
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    return HitInfo(0, false, false, 0., vec3f(0.), vec3f(0.), vec3f(0.), 1.);
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    return construct_ray_10000units(origin_point, normalize(q));
}

fn construct_ray_10000units(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, .01, 10000);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray : Ray;
    ray.origin = origin;
    ray.direction = direction;
    ray.tmax = tmax;
    ray.tmin = tmin;
    return ray;
}


//Intersecting objects //

fn barycentric_normal(v_ns : array<vec3f, 3 >, beta : f32, gamma : f32) -> vec3f {
    var alpha = 1 - beta - gamma;
    var interpolated_normal = alpha * v_ns[0] + beta * v_ns[1] + gamma * v_ns[2];
    return normalize(interpolated_normal);
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_mat_lookup = index_mats[face];
    var indices = vertex_mat_lookup.indices.xyz;
    var material_index = vertex_mat_lookup.mat;

    var vertex_normal_x = vertex_normals[indices.x];
    var vertex_normal_y = vertex_normals[indices.y];
    var vertex_normal_z = vertex_normals[indices.z];

    var v = array<vec3f, 3 > (vertex_normal_x.vertex, vertex_normal_y.vertex, vertex_normal_z.vertex);
    var v_ns = array<vec3f, 3> (vertex_normal_x.normal, vertex_normal_y.normal, vertex_normal_z.normal);

    var mat = materials[material_index];

    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var normal = n;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    var color = mat.color + mat.emission;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, color.rgb, has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(normal), has_hit);

    return has_hit;
}

fn intersect_trimesh(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    var branch_lvl = 0u;
    var near_node = 0u;
    var far_node = 0u;
    var t = 0.0f;
    var node = 0u;
    for(var i = 0u; i <= MAX_LEVEL; i++)
    {
        let tree_node = bspTree[node];
        let node_axis_leaf = tree_node.x & 3u;
        if (node_axis_leaf == BSP_LEAF)
        {
            let node_count = tree_node.x>>2u;
            let node_id = tree_node.y;
            var found = false;

            for(var j = 0u; j < node_count; j++)
            {
                let obj_idx = treeIds[node_id + j];
                if(intersect_triangle(*r, hit, obj_idx))
                {
                    (*r).tmax = (*hit).dist;
                    found = true;
                }
            }

            if (found)
            {
                return true;
            }

            if (branch_lvl == 0u)
            {
                return false;
            }

            branch_lvl -= 1;
            i = branch_node[branch_lvl].x;
            node = branch_node[branch_lvl].y;
            (*r).tmin = branch_ray[branch_lvl].x;
            (*r).tmax = branch_ray[branch_lvl].y;

            continue;
        }
        let axis_direction = (*r).direction[node_axis_leaf];
        let axis_origin = (*r).origin[node_axis_leaf];
        if(axis_direction >= 0.0f)
        {
            near_node = tree_node.z;
            far_node = tree_node.w;
        }
        else
        {
            near_node = tree_node.w;
            far_node = tree_node.z;
        }
        let node_plane = bspPlanes[node];
        let denom = select(axis_direction, f1en8, abs(axis_direction) < f1en8);
        t = (node_plane - axis_origin) / denom;
        if(t > (*r).tmax)
        {
            node = near_node;
        }
        else if(t < (*r).tmin)
        {
            node = far_node;
        }
        else
        {
            branch_node[branch_lvl].x = i;
            branch_node[branch_lvl].y = far_node;
            branch_ray[branch_lvl].x = t;
            branch_ray[branch_lvl].y = (*r).tmax;
            branch_lvl++;
            (*r).tmax = t;
            node = near_node;
        }
    }
    return false;
}

fn intersect_min_max(r : ptr < function, Ray>) -> bool
{
    let p1 = (aabb.min - (*r).origin) / (*r).direction;
    let p2 = (aabb.max - (*r).origin) / (*r).direction;
    let pmin = min(p1, p2);
    let pmax = max(p1, p2);
    let tmin = max(pmin.x, max(pmin.y, pmin.z));
    let tmax = min(pmax.x, min(pmax.y, pmax.z));
    if(tmin > tmax || tmin > (*r).tmax || tmax < (*r).tmin)
    {
        return false;
    }
    (*r).tmin = max(tmin - f1en2, (*r).tmin);
    (*r).tmax = min(tmax + f1en2, (*r).tmax);
    return true;
}


fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    if (!intersect_min_max(r))
    {
        return false;
    }
    var a = aabb.min;

    (*hit).has_hit = false;

    return intersect_trimesh(r, hit);
}

        //Lighting

fn get_area_light_center() -> vec3f
{
    var center_light_position = vec3f(0.);
    for (var i : u32 = 0; i < light_indices_count; i++)
    {
        var vertex_mat_lookup = index_mats[light_faces[i]];
        var indices = vertex_mat_lookup.indices.xyz;

        var vertex_0 = vertex_normals[indices.x].vertex;
        var vertex_1 = vertex_normals[indices.y].vertex;
        var vertex_2 = vertex_normals[indices.z].vertex;

        center_light_position += vertex_0 + vertex_1 + vertex_2;
    }
    center_light_position /= f32(light_indices_count * 3);
    return center_light_position;
}

fn calculate_area_light_intensity(direction : vec3f) -> vec3f
{
    var intensity = vec3f(0.);
    for (var i : u32 = 0; i < light_indices_count; i++)
    {
        var vertex_mat_lookup = index_mats[light_faces[i]];
        var indices = vertex_mat_lookup.indices.xyz;
        var material_index = vertex_mat_lookup.mat;
        var mat = materials[material_index];

        var vertex_0 = vertex_normals[indices.x].vertex;
        var vertex_1 = vertex_normals[indices.y].vertex;
        var vertex_2 = vertex_normals[indices.z].vertex;

        var e0 = vertex_1 - vertex_0;
        var e1 = vertex_2 - vertex_0;
        var n = cross(e0, e1);
        var area = length(n) / 2;

        intensity += max(0, dot(-direction, normalize(n))) * mat.emission.rgb * area;
    }

    return intensity;
}

fn sample_area_light(pos : vec3f) -> Light
{
    var area_light_center = get_area_light_center();

    var line = area_light_center - pos;
    var dist = length(line);
    var direction = line / dist;

    var incident_light = calculate_area_light_intensity(direction) / (dist * dist);

    return Light(vec3f(incident_light), normalize(direction), dist, area_light_center);
}

fn check_occulusion(position : vec3f, light : vec3f) -> bool
{
    const surface_offset = .01;

    var line = light - position;
    var direction = normalize(line);
    var distance = length(line) - surface_offset;

    var r = construct_ray(position, direction, surface_offset, distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}


fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_area_light((*hit).position);
    var lambertian_light = ((*hit).diffuse / 3.14) * visibility * max(0, dot((*hit).normal, light_info.w_i)) * light_info.L_i;

    var is_occluded = check_occulusion((*hit).position, light_info.pos);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1;
    var L_reflected = .9 * lambertian_light * occlusion_modifier;
    var L_observed = L_ambient + L_reflected;

    return LightResult(L_observed, vec3f(0));
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var lambertian = lambertian(r, hit);
    return lambertian;
}

//Fragment shader

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);
    const max_depth = 10;

    var light_result : LightResult;
    var r : Ray;
    var hit : HitInfo;

    var uv = coords *.5;
    r = generate_ray_from_camera(uv);
    hit = generate_default_hitinfo();
    light_result = LightResult(vec3f(1), vec3f(0));

    for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
    {
        if (!intersect_scene(&r, &hit))
        {
            hit.color += backgroundColor.rgb;
            break;
        }

        var next_light_result = shader(&r, &hit);
        light_result.additive += next_light_result.additive;
        light_result.multiplicative *= next_light_result.multiplicative;

        if (!hit.continue_trace)
        {
            break;
        };
    }

    var final_result = light_result.multiplicative * hit.color + light_result.additive;

    return vec4f(pow(final_result, vec3f(1.0 / 1.25)), 1.0);
}
`,Ai="cornell-interleave",pc=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(Ai),r=an(n,[],t,mc,"triangle-strip"),a=Yn(await Hn(hn("models/CornellBoxWithBlocks.obj"))),i=fe(a),o=me([i.vertices,i.normals]),s=new Uint32Array(i.indices);pe(s,a.matIndices,4);const c=new Uint32Array(a.lightIndices),l=new Float32Array(a.materials.reduce((_,g)=>[..._,...B([g.color,g.specular,g.emission,f(g.illum,g.shininess,g.ior)])],[])),{bindGroup:d}=z(n,r,[o,s,c],"STORAGE"),{bindGroup:h}=z(n,r,[i.bspPlanes,i.bspTree,i.treeIds],"STORAGE",1),{bindGroup:u}=z(n,r,[i.aabb,new Uint32Array([c.length])],"UNIFORM",2),{bindGroup:v}=z(n,r,[l],"STORAGE",3);(()=>{const{pass:_,executePass:g}=un(n,e,fn.black);_.setPipeline(r),_.setBindGroup(0,d),_.setBindGroup(1,h),_.setBindGroup(2,u),_.setBindGroup(3,v),_.draw(4),g()})()},gc=(n,e)=>{const t=on("rendering/06-partitioning",["/cornellAgain.ts","/partitioningWithInterleave.wgsl"]),r=W("Back to the box"),a=D(`
The binary space partitioning tree algorithm can be applied to practically any model, but there is a consideration which arises when using WebGPU - the limitation on the number of storage buffers.
The BSP requires three arrays alone - one for the bounding box planes, one for the tree nodes and another for a mapping to the model triangles.

A solution to the claustrophobic space limitations on storage buffers may be alleviated with the help of interleaving (or interweaving if you prefer). 
The process is to mix (deterministically) two or more arrays into a single longer one, thereby sneaking it into the shader programs past the strict WebGPU bus customs.
A basic approach is to take two arrays of the same length and place their elements in alternating sequence. 
Luckily this doesn't require any complicated index manipulation, because the shader may be told to expect an array of data structure (structs) with two elements.
But, with the use of uniform buffers to carry meta data, any number of arrays of different lengths may be in fact weaved together or even glued in sequential order. The only constraint then is the data type (eg. floats float with floats, integers integrate with integers).

The example below not only recreates the Cornell box with the BSP tree, but also handles the weaving of the vertex and normal buffers as well as triangle indices and material indices together. This scene also includes an area light source model, but more about that in the next part.
`),i=nn(),o=K(Ai),s=_n();i.append(o,s),n.append(r,t,a,i),e.push(pc)},bc=`struct VertexNormal {
    vertex : vec3f,
    normal : vec3f
};

struct IndexMaterial {
    indices : vec3u,
    mat : u32
};

@group(0) @binding(0) var<storage> vertex_normals : array<VertexNormal>;
@group(0) @binding(1) var<storage> index_mats : array<IndexMaterial>;
@group(0) @binding(2) var<storage> light_faces : array<u32>;

@group(1) @binding(0) var<storage> bspPlanes : array<f32>;
@group(1) @binding(1) var<storage> bspTree : array<vec4u>;
@group(1) @binding(2) var<storage> treeIds : array<u32>;


struct Aabb {
    min : vec3f,
    max : vec3f,
};

@group(2) @binding(0) var<uniform> aabb : Aabb;
@group(2) @binding(1) var<uniform> light_indices_count : u32;
@group(2) @binding(2) var<uniform> subdivisions_sqr : u32;

struct Material {
    color : vec4f,
    specular : vec4f,
    emission : vec4f,
    illum_shininess_ior : vec3f
};

@group(3) @binding(0) var<storage> materials : array<Material>;
@group(3) @binding(1) var<storage> jitters : array<vec2f>;

const MAX_LEVEL = 20u;
const BSP_LEAF = 3u;
var<private> branch_node : array<vec2u, MAX_LEVEL>;
var<private> branch_ray : array<vec2f, MAX_LEVEL>;

const light_direction : vec3f = vec3f(-1.);
const light_intensity = 1.5;
const visibility = 1.;

const sphere_refractive_index = 1.5;
const air_refractive_index = 1.;
const sphere_radius = 90;

const up = vec3f(0., 1., 0.);
const target_point = vec3f(277., 275., 0.);
const origin_point = vec3f(277., 275., -570.);
const camera_constant = 1;

const default_tmax = 2000;

const f1en2 = 0.01;
const f1en4 = 0.0001;
const f1en8 = 0.00000001;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32,
    pos : vec3f
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
};

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,

    dist : f32,
    position : vec3f,
    normal : vec3f,

    object : u32,
    color : vec3f,

    diffuse : f32,
    specular : f32,
    shininess : f32,
    prev_refractive : f32,
    next_refractive : f32,
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    return HitInfo(0, false, false, 0., vec3f(0.), vec3f(0.), 0, vec3f(0.), 1., 1., 1., 1, 1);
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    return construct_ray_default(origin_point, normalize(q));
}

fn construct_ray_default(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, .01, default_tmax);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray : Ray;
    ray.origin = origin;
    ray.direction = direction;
    ray.tmax = tmax;
    ray.tmin = tmin;
    return ray;
}


//Intersecting objects //

fn barycentric_normal(v_ns : array<vec3f, 3 >, beta : f32, gamma : f32) -> vec3f {
    var alpha = 1 - beta - gamma;
    var interpolated_normal = alpha * v_ns[0] + beta * v_ns[1] + gamma * v_ns[2];
    return normalize(interpolated_normal);
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_mat_lookup = index_mats[face];
    var indices = vertex_mat_lookup.indices.xyz;
    var material_index = vertex_mat_lookup.mat;

    var vertex_normal_x = vertex_normals[indices.x];
    var vertex_normal_y = vertex_normals[indices.y];
    var vertex_normal_z = vertex_normals[indices.z];

    var v = array<vec3f, 3 > (vertex_normal_x.vertex, vertex_normal_y.vertex, vertex_normal_z.vertex);
    var v_ns = array<vec3f, 3> (vertex_normal_x.normal, vertex_normal_y.normal, vertex_normal_z.normal);

    var mat = materials[material_index];

    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var normal = n;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    var color = mat.color + mat.emission;

    (*hit).has_hit = (*hit).has_hit || has_hit;

    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(normal), has_hit);

    (*hit).object = select((*hit).object, 0, has_hit);
    (*hit).color = select((*hit).color, color.rgb, has_hit);

    return has_hit;
}

fn intersect_trimesh(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    var branch_lvl = 0u;
    var near_node = 0u;
    var far_node = 0u;
    var t = 0.0f;
    var node = 0u;
    for(var i = 0u; i <= MAX_LEVEL; i++)
    {
        let tree_node = bspTree[node];
        let node_axis_leaf = tree_node.x & 3u;
        if (node_axis_leaf == BSP_LEAF)
        {
            let node_count = tree_node.x>>2u;
            let node_id = tree_node.y;
            var found = false;

            for(var j = 0u; j < node_count; j++)
            {
                let obj_idx = treeIds[node_id + j];
                if(intersect_triangle(*r, hit, obj_idx))
                {
                    (*r).tmax = (*hit).dist;
                    found = true;
                }
            }

            if (found)
            {
                return true;
            }

            if (branch_lvl == 0u)
            {
                return false;
            }

            branch_lvl -= 1;
            i = branch_node[branch_lvl].x;
            node = branch_node[branch_lvl].y;
            (*r).tmin = branch_ray[branch_lvl].x;
            (*r).tmax = branch_ray[branch_lvl].y;

            continue;
        }
        let axis_direction = (*r).direction[node_axis_leaf];
        let axis_origin = (*r).origin[node_axis_leaf];
        if(axis_direction >= 0.0f)
        {
            near_node = tree_node.z;
            far_node = tree_node.w;
        }
        else
        {
            near_node = tree_node.w;
            far_node = tree_node.z;
        }
        let node_plane = bspPlanes[node];
        let denom = select(axis_direction, f1en8, abs(axis_direction) < f1en8);
        t = (node_plane - axis_origin) / denom;
        if(t > (*r).tmax)
        {
            node = near_node;
        }
        else if(t < (*r).tmin)
        {
            node = far_node;
        }
        else
        {
            branch_node[branch_lvl].x = i;
            branch_node[branch_lvl].y = far_node;
            branch_ray[branch_lvl].x = t;
            branch_ray[branch_lvl].y = (*r).tmax;
            branch_lvl++;
            (*r).tmax = t;
            node = near_node;
        }
    }
    return false;
}

fn intersect_min_max(r : ptr < function, Ray>) -> bool
{
    let p1 = (aabb.min - (*r).origin) / (*r).direction;
    let p2 = (aabb.max - (*r).origin) / (*r).direction;
    let pmin = min(p1, p2);
    let pmax = max(p1, p2);
    let tmin = max(pmin.x, max(pmin.y, pmin.z));
    let tmax = min(pmax.x, min(pmax.y, pmax.z));
    if(tmin > tmax || tmin > (*r).tmax || tmax < (*r).tmin)
    {
        return false;
    }
    (*r).tmin = max(tmin - f1en2, (*r).tmin);
    (*r).tmax = min(tmax + f1en2, (*r).tmax);
    return true;
}


fn intersect_sphere(r : Ray, hit : ptr < function, HitInfo>, object : u32, center : vec3f) -> bool {

    var from_center = r.origin - center;
    var b_half = dot(from_center, r.direction);
    var c = dot(from_center, from_center) - sphere_radius * sphere_radius;
    var b_half_2_c = b_half * b_half - c;

    var does_intersection_exist = b_half_2_c >= 0;

    var distance_1 = -b_half - sqrt(abs(b_half_2_c));
    var distance_2 = -b_half + sqrt(abs(b_half_2_c));
    var distance_1_in_range = distance_1 >= r.tmin && distance_1 <= r.tmax;
    var distance_2_in_range = distance_2 >= r.tmin && distance_2 <= r.tmax;

    var min_distance = min(distance_1, distance_2);
    var distance = select(distance_2, select(distance_1, min_distance, distance_2_in_range), distance_1_in_range);

    var intersection = r.origin + distance * r.direction;
    var n = normalize(intersection - center);

    var is_intersection_from_inside = dot(n, r.direction) > 0;
    var next_refr_index = select(sphere_refractive_index, air_refractive_index, is_intersection_from_inside);
    var context_n = select(n, -n, is_intersection_from_inside);

    var has_hit = does_intersection_exist && distance >= r.tmin && distance <= r.tmax;
    (*hit).has_hit = (*hit).has_hit || has_hit;

    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);

    (*hit).object = select((*hit).object, object, has_hit);
    (*hit).normal = select((*hit).normal, context_n, has_hit);

    (*hit).prev_refractive = select((*hit).prev_refractive, (*hit).next_refractive, has_hit && object == 2);
    (*hit).next_refractive = select((*hit).next_refractive, next_refr_index, has_hit && object == 2);

    return has_hit;
}

fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    (*hit).has_hit = false;

    var hit_mirror_sphere = intersect_sphere(*r, hit, 1, vec3f(420, 90, 370));
    (*r).tmax = select((*r).tmax, (*hit).dist, hit_mirror_sphere);

    var hit_refractive_sphere = intersect_sphere(*r, hit, 2, vec3f(130, 90, 250));
    (*r).tmax = select((*r).tmax, (*hit).dist, hit_refractive_sphere);

    if (!intersect_min_max(r))
    {
        return (*hit).has_hit;
    }

    var hit_cb = intersect_trimesh(r, hit);
    (*r).tmax = select((*r).tmax, (*hit).dist, hit_cb);

    return (*hit).has_hit;
}

        //Lighting

fn get_area_light_center() -> vec3f
{
    var center_light_position = vec3f(0.);
    for (var i : u32 = 0; i < light_indices_count; i++)
    {
        var vertex_mat_lookup = index_mats[light_faces[i]];
        var indices = vertex_mat_lookup.indices.xyz;

        var vertex_0 = vertex_normals[indices.x].vertex;
        var vertex_1 = vertex_normals[indices.y].vertex;
        var vertex_2 = vertex_normals[indices.z].vertex;

        center_light_position += vertex_0 + vertex_1 + vertex_2;
    }
    center_light_position /= f32(light_indices_count * 3);
    return center_light_position;
}

fn calculate_area_light_intensity(direction : vec3f) -> vec3f
{
    var intensity = vec3f(0.);
    for (var i : u32 = 0; i < light_indices_count; i++)
    {
        var vertex_mat_lookup = index_mats[light_faces[i]];
        var indices = vertex_mat_lookup.indices.xyz;
        var material_index = vertex_mat_lookup.mat;
        var mat = materials[material_index];

        var vertex_0 = vertex_normals[indices.x].vertex;
        var vertex_1 = vertex_normals[indices.y].vertex;
        var vertex_2 = vertex_normals[indices.z].vertex;

        var e0 = vertex_1 - vertex_0;
        var e1 = vertex_2 - vertex_0;
        var n = cross(e0, e1);
        var area = length(n) / 2;

        intensity += max(0, dot(-direction, normalize(n))) * mat.emission.rgb * area;
    }

    return intensity;
}

fn sample_area_light(pos : vec3f) -> Light
{
    var area_light_center = get_area_light_center();

    var line = area_light_center - pos;
    var dist = length(line);
    var direction = line / dist;

    var incident_light = calculate_area_light_intensity(direction) / (dist * dist);

    return Light(vec3f(incident_light), normalize(direction), dist, area_light_center);
}

fn check_occulusion(position : vec3f, light : vec3f) -> bool
{
    const surface_offset = .01;

    var line = light - position;
    var direction = normalize(line);
    var distance = length(line) - surface_offset;

    var r = construct_ray(position, direction, surface_offset, distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}


fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_area_light((*hit).position);
    var lambertian_light = ((*hit).diffuse / 3.14) * visibility * max(0, dot((*hit).normal, light_info.w_i)) * light_info.L_i;

    var is_occluded = check_occulusion((*hit).position, light_info.pos);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1;
    var L_reflected = .9 * lambertian_light * occlusion_modifier;
    var L_observed = L_ambient + L_reflected;

    return LightResult(L_observed, vec3f(0));
}

fn mirror(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    (*r).direction = normalize(reflect((*r).direction, (*hit).normal));
    (*r).origin = (*hit).position + (*r).direction * .001;
    (*r).tmax = default_tmax;
    (*r).tmin = .01;

    (*hit).continue_trace = true;

    return LightResult(vec3f(1.), vec3f(0));
}

fn refractive(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var ni_nt = (*hit).prev_refractive / (*hit).next_refractive;

    var incident = -(*r).direction;
    var r_n_dot = dot(incident, (*hit).normal);

    var t_sin = ni_nt * (r_n_dot * (*hit).normal - incident);
    var cos2 = 1 - ni_nt * ni_nt * (1 - r_n_dot * r_n_dot);
    var direction = t_sin - (*hit).normal * sqrt(abs(cos2));

    var is_reflected = cos2 < 0;
    var reflected_direction = reflect((*r).direction, (*hit).normal);

    (*r).direction = normalize(select(direction, reflected_direction, is_reflected));
    (*r).origin = (*hit).position + (*r).direction * .01;
    (*r).tmin = .01;
    (*r).tmax = default_tmax;

    (*hit).continue_trace = true;

    return LightResult(vec3f(1), vec3f(0));
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    (*hit).continue_trace = false;

    switch ((*hit).object)
    {
        default :
        {
        }
        case 1 :
        {
            return mirror(r, hit);
        }
        case 2 :
        {
            return refractive(r, hit);
        }
    }

    return lambertian(r, hit);
}

//Fragment shader

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);
    const max_depth = 10;

    var light_result : LightResult;
    var r : Ray;
    var hit : HitInfo;

    var colors = array<vec3f, 36 > ();
    var lights = array<LightResult, 36 > ();

    for (var i = 0; i < i32(subdivisions_sqr); i++)
    {
        var uv = vec2f(coords.x, coords.y) *.5 + jitters[i];
        r = generate_ray_from_camera(uv);
        hit = generate_default_hitinfo();
        light_result = LightResult(vec3f(1), vec3f(0));

        for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
        {
            if (!intersect_scene(&r, &hit))
            {
                hit.color += backgroundColor.rgb;
                break;
            }

            var next_light_result = shader(&r, &hit);
            light_result.additive += next_light_result.additive;
            light_result.multiplicative *= next_light_result.multiplicative;

            if (!hit.continue_trace)
            {
                break;
            };
        }

        colors[i] = hit.color;
        lights[i] = light_result;
    }

    var final_result = vec3f();
    var j : i32;
    for (j = 0; j < i32(subdivisions_sqr); j++)
    {
        var substrata_result = lights[j].multiplicative * colors[j] + lights[j].additive;
        final_result += substrata_result / f32(subdivisions_sqr);
    }

    return vec4f(pow(final_result, vec3f(1.0 / 1.25)), 1.0);
}
`,Si="cornell-glass",Ri="jittering-active-bsp-cb",xc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Si),a=an(n,[],t,bc,"triangle-strip"),i=Yn(await Hn(hn("models/CornellBox.obj"))),o=fe(i),s=me([o.vertices,o.normals]),c=new Uint32Array(o.indices);pe(c,i.matIndices,4);const l=new Uint32Array(i.lightIndices),d=new Float32Array(i.materials.reduce((T,b)=>[...T,...B([b.color,b.specular,b.emission,f(b.illum,b.shininess,b.ior)])],[])),{bindGroup:h}=z(n,a,[s,c,l],"STORAGE"),{bindGroup:u}=z(n,a,[o.bspPlanes,o.bspTree,o.treeIds],"STORAGE",1),{bindGroup:v,buffers:[m,_,g]}=z(n,a,[o.aabb,new Uint32Array([l.length]),new Uint32Array([36])],"UNIFORM",2),x=Dt(r.height,6),{bindGroup:w}=z(n,a,[d,new Float32Array(B(x))],"STORAGE",3);Tn(Ri,T=>{const b=T?36:1;zn(n,g,new Uint32Array([b]),0),I()},"checked");const I=()=>{const{pass:T,executePass:b}=un(n,e,fn.black);T.setPipeline(a),T.setBindGroup(0,h),T.setBindGroup(1,u),T.setBindGroup(2,v),T.setBindGroup(3,w),T.draw(4),b()};I()},yc=(n,e)=>{const t=on("rendering/06-partitioning",["/cornellWithGlass.ts","/cornellWithGlass.wgsl"]),r=W("Light as an area"),a=D(`
So far lights have been either points or directions without physical representations. 
A point light may be represented by a light bulb, but the light model and bulb model are no dependent on each other. 
The light may still emit without the bulb model, just as the bulb model may be bright without having to imitate a point light. 
It may not come as a surprise, but in most skyboxes the sun is just an image, the light is generated by a directional light model.

The area light model aims to connect the two worlds by considering only a light (triangle) surface emission. 
In the Cornell box below, the light is a quad made up of two triangles. 
Their total area and pose has an impact on the light strength and light flux on object surfaces the light source emits to. 
In this example the light source position is still modelled by the center of the area light (distant area light approximation), 
but in the next section the area light will reach its full potential.

Jittering is also enabled to smoothen edges. It is still powered by pre-computed jitters, but will be repalced in the next section.
`),i=nn(),o=K(Si),s=_n(),c=k(Xn(Ri,!0),"Jittering enabled",!1);s.append(c),i.append(o,s),n.append(r,t,a,i),e.push(xc)},wc=(n,e)=>{_c(n,e),gc(n,e),yc(n,e)},Ic=`struct VertexNormal {
    vertex : vec3f,
    normal : vec3f
};

struct IndexMaterial {
    indices : vec3u,
    mat : u32
};

struct Material {
    color : vec4f,
    specular : vec4f,
    emission : vec4f,
    illum_shininess_ior : vec3f
};

@group(0) @binding(0) var<storage> vertex_normals : array<VertexNormal>;
@group(0) @binding(1) var<storage> index_mats : array<IndexMaterial>;
@group(0) @binding(2) var<storage> light_faces : array<u32>;
@group(0) @binding(3) var<storage> materials : array<Material>;

@group(1) @binding(0) var<storage> bspPlanes : array<f32>;
@group(1) @binding(1) var<storage> bspTree : array<vec4u>;
@group(1) @binding(2) var<storage> treeIds : array<u32>;

struct Aabb {
    min : vec3f,
    max : vec3f,
};

struct SceneData {
    frame_num : u32,
    canvas_width : u32,
    canvas_height : u32
}

@group(2) @binding(0) var<uniform> aabb : Aabb;
@group(2) @binding(1) var<uniform> light_indices_count : u32;
@group(2) @binding(2) var<uniform> scene_data : SceneData;

@group(3) @binding(0) var renderTexture : texture_2d<f32>;

const MAX_LEVEL = 20u;
const BSP_LEAF = 3u;
var<private> branch_node : array<vec2u, MAX_LEVEL>;
var<private> branch_ray : array<vec2f, MAX_LEVEL>;

const light_direction : vec3f = vec3f(-1.);
const light_intensity = 1.5;
const visibility = 1.;

const up = vec3f(0., 1., 0.);

const target_point = vec3f(277., 275., 0.);
const origin_point = vec3f(277., 275., -570.);
const camera_constant = 1;

const f1en2 = 0.01;
const f1en4 = 0.0001;
const f1en8 = 0.00000001;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32,
    pos : vec3f
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
};

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,

    dist : f32,
    position : vec3f,
    normal : vec3f,
    color : vec3f,

    diffuse : f32,
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    return HitInfo(0, false, false, 0., vec3f(0.), vec3f(0.), vec3f(0.), 1.);
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    return construct_ray_10000units(origin_point, normalize(q));
}

fn construct_ray_10000units(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, .01, 10000);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray : Ray;
    ray.origin = origin;
    ray.direction = direction;
    ray.tmax = tmax;
    ray.tmin = tmin;
    return ray;
}


//Intersecting objects //

fn barycentric_normal(v_ns : array<vec3f, 3 >, beta : f32, gamma : f32) -> vec3f {
    var alpha = 1 - beta - gamma;
    var interpolated_normal = alpha * v_ns[0] + beta * v_ns[1] + gamma * v_ns[2];
    return normalize(interpolated_normal);
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_mat_lookup = index_mats[face];
    var indices = vertex_mat_lookup.indices.xyz;
    var material_index = vertex_mat_lookup.mat;

    var vertex_normal_x = vertex_normals[indices.x];
    var vertex_normal_y = vertex_normals[indices.y];
    var vertex_normal_z = vertex_normals[indices.z];

    var v = array<vec3f, 3 > (vertex_normal_x.vertex, vertex_normal_y.vertex, vertex_normal_z.vertex);
    var v_ns = array<vec3f, 3> (vertex_normal_x.normal, vertex_normal_y.normal, vertex_normal_z.normal);

    var mat = materials[material_index];

    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var normal = n;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    var color = mat.color + mat.emission;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, color.rgb, has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(normal), has_hit);

    return has_hit;
}

fn intersect_trimesh(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    var branch_lvl = 0u;
    var near_node = 0u;
    var far_node = 0u;
    var t = 0.0f;
    var node = 0u;
    for(var i = 0u; i <= MAX_LEVEL; i++)
    {
        let tree_node = bspTree[node];
        let node_axis_leaf = tree_node.x & 3u;
        if (node_axis_leaf == BSP_LEAF)
        {
            let node_count = tree_node.x>>2u;
            let node_id = tree_node.y;
            var found = false;

            for(var j = 0u; j < node_count; j++)
            {
                let obj_idx = treeIds[node_id + j];
                if(intersect_triangle(*r, hit, obj_idx))
                {
                    (*r).tmax = (*hit).dist;
                    found = true;
                }
            }

            if (found)
            {
                return true;
            }

            if (branch_lvl == 0u)
            {
                return false;
            }

            branch_lvl -= 1;
            i = branch_node[branch_lvl].x;
            node = branch_node[branch_lvl].y;
            (*r).tmin = branch_ray[branch_lvl].x;
            (*r).tmax = branch_ray[branch_lvl].y;

            continue;
        }
        let axis_direction = (*r).direction[node_axis_leaf];
        let axis_origin = (*r).origin[node_axis_leaf];
        if(axis_direction >= 0.0f)
        {
            near_node = tree_node.z;
            far_node = tree_node.w;
        }
        else
        {
            near_node = tree_node.w;
            far_node = tree_node.z;
        }
        let node_plane = bspPlanes[node];
        let denom = select(axis_direction, f1en8, abs(axis_direction) < f1en8);
        t = (node_plane - axis_origin) / denom;
        if(t > (*r).tmax)
        {
            node = near_node;
        }
        else if(t < (*r).tmin)
        {
            node = far_node;
        }
        else
        {
            branch_node[branch_lvl].x = i;
            branch_node[branch_lvl].y = far_node;
            branch_ray[branch_lvl].x = t;
            branch_ray[branch_lvl].y = (*r).tmax;
            branch_lvl++;
            (*r).tmax = t;
            node = near_node;
        }
    }
    return false;
}

fn intersect_min_max(r : ptr < function, Ray>) -> bool
{
    let p1 = (aabb.min - (*r).origin) / (*r).direction;
    let p2 = (aabb.max - (*r).origin) / (*r).direction;
    let pmin = min(p1, p2);
    let pmax = max(p1, p2);
    let tmin = max(pmin.x, max(pmin.y, pmin.z));
    let tmax = min(pmax.x, min(pmax.y, pmax.z));
    if(tmin > tmax || tmin > (*r).tmax || tmax < (*r).tmin)
    {
        return false;
    }
    (*r).tmin = max(tmin - f1en2, (*r).tmin);
    (*r).tmax = min(tmax + f1en2, (*r).tmax);
    return true;
}


fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    if (!intersect_min_max(r))
    {
        return false;
    }
    var a = aabb.min;

    (*hit).has_hit = false;

    return intersect_trimesh(r, hit);
}

        //Lighting

fn get_area_light_center() -> vec3f
{
    var center_light_position = vec3f(0.);
    for (var i : u32 = 0; i < light_indices_count; i++)
    {
        var vertex_mat_lookup = index_mats[light_faces[i]];
        var indices = vertex_mat_lookup.indices.xyz;

        var vertex_0 = vertex_normals[indices.x].vertex;
        var vertex_1 = vertex_normals[indices.y].vertex;
        var vertex_2 = vertex_normals[indices.z].vertex;

        center_light_position += vertex_0 + vertex_1 + vertex_2;
    }
    center_light_position /= f32(light_indices_count * 3);
    return center_light_position;
}

fn calculate_area_light_intensity(direction : vec3f) -> vec3f
{
    var intensity = vec3f(0.);
    for (var i : u32 = 0; i < light_indices_count; i++)
    {
        var vertex_mat_lookup = index_mats[light_faces[i]];
        var indices = vertex_mat_lookup.indices.xyz;
        var material_index = vertex_mat_lookup.mat;
        var mat = materials[material_index];

        var vertex_0 = vertex_normals[indices.x].vertex;
        var vertex_1 = vertex_normals[indices.y].vertex;
        var vertex_2 = vertex_normals[indices.z].vertex;

        var e0 = vertex_1 - vertex_0;
        var e1 = vertex_2 - vertex_0;
        var n = cross(e0, e1);
        var area = length(n) / 2;

        intensity += max(0, dot(-direction, normalize(n))) * mat.emission.rgb * area;
    }

    return intensity;
}

fn sample_area_light(pos : vec3f) -> Light
{
    var area_light_center = get_area_light_center();

    var line = area_light_center - pos;
    var dist = length(line);
    var direction = line / dist;

    var incident_light = calculate_area_light_intensity(direction) / (dist * dist);

    return Light(vec3f(incident_light), normalize(direction), dist, area_light_center);
}

fn check_occulusion(position : vec3f, light : vec3f) -> bool
{
    const surface_offset = .01;

    var line = light - position;
    var direction = normalize(line);
    var distance = length(line) - surface_offset;

    var r = construct_ray(position, direction, surface_offset, distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_area_light((*hit).position);
    var lambertian_light = ((*hit).diffuse / 3.14) * visibility * max(0, dot((*hit).normal, light_info.w_i)) * light_info.L_i;

    var is_occluded = check_occulusion((*hit).position, light_info.pos);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1;
    var L_reflected = .9 * lambertian_light * occlusion_modifier;
    var L_observed = L_ambient + L_reflected;

    return LightResult(L_observed, vec3f(0));
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var lambertian = lambertian(r, hit);
    return lambertian;
}

//Fragment shader

struct FSOut {
    @location(0) frame : vec4f,
    @location(1) accum : vec4f
}

@fragment
fn main_fs(@builtin(position) fragcoord : vec4f, @location(0) coords : vec2f) -> FSOut
{
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);
    const max_depth = 10;

    var light_result : LightResult;
    var r : Ray;
    var hit : HitInfo;

    let launch_idx = u32(fragcoord.y) * scene_data.canvas_width + u32(fragcoord.x);
    var t = tea(launch_idx, scene_data.frame_num);
    let jitter = vec2f(rnd(&t), rnd(&t)) / f32(scene_data.canvas_height);

    var uv = coords *.5 + jitter;
    r = generate_ray_from_camera(uv);
    hit = generate_default_hitinfo();
    light_result = LightResult(vec3f(1), vec3f(0));

    for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
    {
        if (!intersect_scene(&r, &hit))
        {
            hit.color += backgroundColor.rgb;
            break;
        }

        var next_light_result = shader(&r, &hit);
        light_result.additive += next_light_result.additive;
        light_result.multiplicative *= next_light_result.multiplicative;

        if (!hit.continue_trace)
        {
            break;
        };
    }

    var final_result = light_result.multiplicative * hit.color + light_result.additive;

    let curr_sum = textureLoad(renderTexture, vec2u(fragcoord.xy), 0).rgb * f32(scene_data.frame_num);
    let accum_color = (final_result + curr_sum) / f32(scene_data.frame_num + 1u);

    var fs_out : FSOut;
    fs_out.frame = vec4f(pow(accum_color, vec3f(1.0 / 1.5)), 1.0);
    fs_out.accum = vec4f(accum_color, 1.0);
    return fs_out;
}

//Utility

//PRNG xorshift seed generator by NVIDIA
fn tea(val0 : u32, val1 : u32) -> u32
{
    const N = 16u;  //User specified number of iterations
    var v0 = val0;
    var v1 = val1;
    var s0 = 0u;
    for(var n = 0u; n < N; n++)
    {
        s0 += 0x9e3779b9;
        v0 += ((v1<<4) + 0xa341316c)^(v1 + s0)^((v1>>5) + 0xc8013ea4);
        v1 += ((v0<<4) + 0xad90777d)^(v0 + s0)^((v0>>5) + 0x7e95761e);
    }
    return v0;
}

fn mcg31(prev : ptr < function, u32>) -> u32
{
    const LCG_A = 1977654935u;
    *prev = (LCG_A * (*prev)) & 0x7FFFFFFF;
    return * prev;
}

fn rnd(prev : ptr < function, u32>) -> f32
{
    return f32(mcg31(prev)) / f32(0x80000000);
}
`,Lc=`struct VertexNormal {
    vertex : vec3f,
    normal : vec3f
};

struct IndexMaterial {
    indices : vec3u,
    mat : u32
};

struct Material {
    color : vec4f,
    specular : vec4f,
    emission : vec4f,
    illum_shininess_ior : vec3f
};

@group(0) @binding(0) var<storage> vertex_normals : array<VertexNormal>;
@group(0) @binding(1) var<storage> index_mats : array<IndexMaterial>;
@group(0) @binding(2) var<storage> light_faces : array<u32>;
@group(0) @binding(3) var<storage> materials : array<Material>;

@group(1) @binding(0) var<storage> bspPlanes : array<f32>;
@group(1) @binding(1) var<storage> bspTree : array<vec4u>;
@group(1) @binding(2) var<storage> treeIds : array<u32>;

struct Aabb {
    min : vec3f,
    max : vec3f,
};

struct SceneData {
    frame_num : u32,
    canvas_width : u32,
    canvas_height : u32
}

@group(2) @binding(0) var<uniform> aabb : Aabb;
@group(2) @binding(1) var<uniform> light_indices_count : u32;
@group(2) @binding(2) var<uniform> scene_data : SceneData;

@group(3) @binding(0) var renderTexture : texture_2d<f32>;

const MAX_LEVEL = 20u;
const BSP_LEAF = 3u;
var<private> branch_node : array<vec2u, MAX_LEVEL>;
var<private> branch_ray : array<vec2f, MAX_LEVEL>;

const light_direction : vec3f = vec3f(-1.);
const light_intensity = 1.5;
const visibility = 1.;

const up = vec3f(0., 1., 0.);

const target_point = vec3f(277., 275., 0.);
const origin_point = vec3f(277., 275., -570.);
const camera_constant = 1;

const f1en2 = 0.01;
const f1en4 = 0.0001;
const f1en8 = 0.00000001;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32,
    pos : vec3f
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
};

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,

    dist : f32,
    position : vec3f,
    normal : vec3f,
    color : vec3f,

    diffuse : f32,
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    return HitInfo(0, false, false, 0., vec3f(0.), vec3f(0.), vec3f(0.), 1.);
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    return construct_ray_10000units(origin_point, normalize(q));
}

fn construct_ray_10000units(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, .01, 10000);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray : Ray;
    ray.origin = origin;
    ray.direction = direction;
    ray.tmax = tmax;
    ray.tmin = tmin;
    return ray;
}


//Intersecting objects //

fn barycentric_normal(v_ns : array<vec3f, 3 >, beta : f32, gamma : f32) -> vec3f {
    var alpha = 1 - beta - gamma;
    var interpolated_normal = alpha * v_ns[0] + beta * v_ns[1] + gamma * v_ns[2];
    return normalize(interpolated_normal);
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_mat_lookup = index_mats[face];
    var indices = vertex_mat_lookup.indices.xyz;
    var material_index = vertex_mat_lookup.mat;

    var vertex_normal_x = vertex_normals[indices.x];
    var vertex_normal_y = vertex_normals[indices.y];
    var vertex_normal_z = vertex_normals[indices.z];

    var v = array<vec3f, 3 > (vertex_normal_x.vertex, vertex_normal_y.vertex, vertex_normal_z.vertex);
    var v_ns = array<vec3f, 3> (vertex_normal_x.normal, vertex_normal_y.normal, vertex_normal_z.normal);

    var mat = materials[material_index];

    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var normal = n;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    var color = mat.color + mat.emission;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, color.rgb, has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(normal), has_hit);

    return has_hit;
}

fn intersect_trimesh(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    var branch_lvl = 0u;
    var near_node = 0u;
    var far_node = 0u;
    var t = 0.0f;
    var node = 0u;
    for(var i = 0u; i <= MAX_LEVEL; i++)
    {
        let tree_node = bspTree[node];
        let node_axis_leaf = tree_node.x & 3u;
        if (node_axis_leaf == BSP_LEAF)
        {
            let node_count = tree_node.x>>2u;
            let node_id = tree_node.y;
            var found = false;

            for(var j = 0u; j < node_count; j++)
            {
                let obj_idx = treeIds[node_id + j];
                if(intersect_triangle(*r, hit, obj_idx))
                {
                    (*r).tmax = (*hit).dist;
                    found = true;
                }
            }

            if (found)
            {
                return true;
            }

            if (branch_lvl == 0u)
            {
                return false;
            }

            branch_lvl -= 1;
            i = branch_node[branch_lvl].x;
            node = branch_node[branch_lvl].y;
            (*r).tmin = branch_ray[branch_lvl].x;
            (*r).tmax = branch_ray[branch_lvl].y;

            continue;
        }
        let axis_direction = (*r).direction[node_axis_leaf];
        let axis_origin = (*r).origin[node_axis_leaf];
        if(axis_direction >= 0.0f)
        {
            near_node = tree_node.z;
            far_node = tree_node.w;
        }
        else
        {
            near_node = tree_node.w;
            far_node = tree_node.z;
        }
        let node_plane = bspPlanes[node];
        let denom = select(axis_direction, f1en8, abs(axis_direction) < f1en8);
        t = (node_plane - axis_origin) / denom;
        if(t > (*r).tmax)
        {
            node = near_node;
        }
        else if(t < (*r).tmin)
        {
            node = far_node;
        }
        else
        {
            branch_node[branch_lvl].x = i;
            branch_node[branch_lvl].y = far_node;
            branch_ray[branch_lvl].x = t;
            branch_ray[branch_lvl].y = (*r).tmax;
            branch_lvl++;
            (*r).tmax = t;
            node = near_node;
        }
    }
    return false;
}

fn intersect_min_max(r : ptr < function, Ray>) -> bool
{
    let p1 = (aabb.min - (*r).origin) / (*r).direction;
    let p2 = (aabb.max - (*r).origin) / (*r).direction;
    let pmin = min(p1, p2);
    let pmax = max(p1, p2);
    let tmin = max(pmin.x, max(pmin.y, pmin.z));
    let tmax = min(pmax.x, min(pmax.y, pmax.z));
    if(tmin > tmax || tmin > (*r).tmax || tmax < (*r).tmin)
    {
        return false;
    }
    (*r).tmin = max(tmin - f1en2, (*r).tmin);
    (*r).tmax = min(tmax + f1en2, (*r).tmax);
    return true;
}


fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    if (!intersect_min_max(r))
    {
        return false;
    }

    (*hit).has_hit = false;

    return intersect_trimesh(r, hit);
}

        //Lighting

fn check_occulusion(position : vec3f, light : vec3f) -> bool
{
    const surface_offset = .01;

    var line = light - position;
    var direction = normalize(line);
    var distance = length(line) - surface_offset;

    var r = construct_ray(position, direction, surface_offset, distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}

fn sample_area_light(pos : vec3f, seed : ptr < function, u32>) -> Light
{
    var index_mat = index_mats[light_faces[u32(floor(rnd(seed) * f32(light_indices_count)))]];
    var triangle_index = index_mat.indices;
    var mat = materials[index_mat.mat];

    var vertex_normal_0 = vertex_normals[triangle_index.x];
    var vertex_normal_1 = vertex_normals[triangle_index.y];
    var vertex_normal_2 = vertex_normals[triangle_index.z];

    var position_sample_1 = rnd(seed);
    var position_sample_2 = rnd(seed);

    var a = 1 - sqrt(position_sample_1);
    var b = (1 - position_sample_2) * sqrt(position_sample_1);
    var c = position_sample_2 * sqrt(position_sample_1);

    var sampled_vertex = a * vertex_normal_0.vertex + b * vertex_normal_1.vertex + c * vertex_normal_2.vertex;
    var sampled_normal = normalize(a * vertex_normal_0.normal + b * vertex_normal_1.normal + c * vertex_normal_2.normal);

    var line = sampled_vertex - pos;
    var dist = length(line);
    var direction = line / dist;

    var e0 = vertex_normal_1.vertex - vertex_normal_0.vertex;
    var e1 = vertex_normal_2.vertex - vertex_normal_0.vertex;
    var n = cross(e0, e1);
    var area = length(n) / 2;

    var Le = mat.emission.rgb;
    var visibility = select(1., 0., check_occulusion(pos, sampled_vertex));
    var keplers = dot(normalize(n), -direction) / (dist * dist);
    var n_tri = f32(light_indices_count);

    var L = Le * visibility * n_tri * area * keplers;

    var light : Light;
    light.pos = sampled_vertex;
    light.w_i = direction;
    light.L_i = L;
    light.dist = dist;

    return light;
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> LightResult
{
    var light_info = sample_area_light((*hit).position, seed);
    var lambertian_light = ((*hit).diffuse / 3.14) * max(0, dot((*hit).normal, light_info.w_i)) * light_info.L_i;

    var L_ambient = .1;
    var L_reflected = lambertian_light;
    var L_observed = L_ambient + L_reflected;

    return LightResult(L_observed, vec3f(0));
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> LightResult
{
    var lambertian = lambertian(r, hit, seed);
    return lambertian;
}

//Fragment shader

struct FSOut {
    @location(0) frame : vec4f,
    @location(1) accum : vec4f
}

@fragment
fn main_fs(@builtin(position) fragcoord : vec4f, @location(0) coords : vec2f) -> FSOut
{
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);
    const max_depth = 10;

    var light_result : LightResult;
    var r : Ray;
    var hit : HitInfo;

    let launch_idx = u32(fragcoord.y) * scene_data.canvas_width + u32(fragcoord.x);
    var t = tea(launch_idx, scene_data.frame_num);
    let jitter = vec2f(rnd(&t), rnd(&t)) / f32(scene_data.canvas_height);

    var uv = coords *.5 + jitter;
    r = generate_ray_from_camera(uv);
    hit = generate_default_hitinfo();
    light_result = LightResult(vec3f(1), vec3f(0));

    for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
    {
        if (!intersect_scene(&r, &hit))
        {
            hit.color += backgroundColor.rgb;
            break;
        }

        var next_light_result = shader(&r, &hit, &t);
        light_result.additive += next_light_result.additive;
        light_result.multiplicative *= next_light_result.multiplicative;

        if (!hit.continue_trace)
        {
            break;
        };
    }

    var final_result = light_result.multiplicative * hit.color + light_result.additive;

    let curr_sum = textureLoad(renderTexture, vec2u(fragcoord.xy), 0).rgb * f32(scene_data.frame_num);
    let accum_color = (final_result + curr_sum) / f32(scene_data.frame_num + 1u);

    var fs_out : FSOut;
    fs_out.frame = vec4f(pow(accum_color, vec3f(1.0 / 1.5)), 1.0);
    fs_out.accum = vec4f(accum_color, 1.0);
    return fs_out;
}

//Utility

//PRNG xorshift seed generator by NVIDIA
fn tea(val0 : u32, val1 : u32) -> u32
{
    const N = 16u;  //User specified number of iterations
    var v0 = val0;
    var v1 = val1;
    var s0 = 0u;
    for(var n = 0u; n < N; n++)
    {
        s0 += 0x9e3779b9;
        v0 += ((v1<<4) + 0xa341316c)^(v1 + s0)^((v1>>5) + 0xc8013ea4);
        v1 += ((v0<<4) + 0xad90777d)^(v0 + s0)^((v0>>5) + 0x7e95761e);
    }
    return v0;
}

fn mcg31(prev : ptr < function, u32>) -> u32
{
    const LCG_A = 1977654935u;
    *prev = (LCG_A * (*prev)) & 0x7FFFFFFF;
    return * prev;
}

//Generate random float in [0, 1)
fn rnd(prev : ptr < function, u32>) -> f32
{
    return f32(mcg31(prev)) / f32(0x80000000);
}
`,Tc=`struct VertexNormal {
    vertex : vec3f,
    normal : vec3f
};

struct IndexMaterial {
    indices : vec3u,
    mat : u32
};

struct Material {
    color : vec4f,
    specular : vec4f,
    emission : vec4f,
    illum_shininess_ior : vec3f
};

@group(0) @binding(0) var<storage> vertex_normals : array<VertexNormal>;
@group(0) @binding(1) var<storage> index_mats : array<IndexMaterial>;
@group(0) @binding(2) var<storage> light_faces : array<u32>;
@group(0) @binding(3) var<storage> materials : array<Material>;

@group(1) @binding(0) var<storage> bspPlanes : array<f32>;
@group(1) @binding(1) var<storage> bspTree : array<vec4u>;
@group(1) @binding(2) var<storage> treeIds : array<u32>;

struct Aabb {
    min : vec3f,
    max : vec3f,
};

struct SceneData {
    frame_num : u32,
    canvas_width : u32,
    canvas_height : u32
}

@group(2) @binding(0) var<uniform> aabb : Aabb;
@group(2) @binding(1) var<uniform> light_indices_count : u32;
@group(2) @binding(2) var<uniform> scene_data : SceneData;

@group(3) @binding(0) var renderTexture : texture_2d<f32>;

const MAX_LEVEL = 20u;
const BSP_LEAF = 3u;
var<private> branch_node : array<vec2u, MAX_LEVEL>;
var<private> branch_ray : array<vec2f, MAX_LEVEL>;

const background_color = vec4f(0.1, 0.3, 0.6, 1.0);

const light_direction : vec3f = vec3f(-1.);
const light_intensity = 1.5;
const visibility = 1.;
const up = vec3f(0., 1., 0.);

const target_point = vec3f(277., 275., 0.);
const origin_point = vec3f(277., 275., -570.);
const camera_constant = 1;

const f1en2 = 0.01;
const f1en4 = 0.0001;
const f1en8 = 0.00000001;
const f1en16 = 0.0000000000000001;

const PI = 3.14;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32,
    pos : vec3f
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
};

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,

    dist : f32,
    position : vec3f,
    normal : vec3f,

    diffuse : vec3f,
    emission : vec3f,

    direct : bool,
    path_factor : vec3f,
    bounce_factor : vec3f
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    var hit_info : HitInfo;

    hit_info.depth = 0;
    hit_info.has_hit = false;
    hit_info.continue_trace = false;

    hit_info.dist = 0;
    hit_info.position = vec3f();
    hit_info.normal = vec3f();

    hit_info.diffuse = vec3f();
    hit_info.emission = vec3f();

    hit_info.direct = true;
    hit_info.path_factor = vec3f(1);
    hit_info.bounce_factor = vec3f(1);

    return hit_info;
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    return construct_ray_default(origin_point, normalize(q));
}

fn construct_ray_default(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, .01, 10000);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray_indirect : Ray;
    ray_indirect.origin = origin;
    ray_indirect.direction = direction;
    ray_indirect.tmax = tmax;
    ray_indirect.tmin = tmin;
    return ray_indirect;
}

//Intersecting objects //

fn barycentric_normal(v_ns : array<vec3f, 3 >, beta : f32, gamma : f32) -> vec3f {
    var alpha = 1 - beta - gamma;
    var interpolated_normal = alpha * v_ns[0] + beta * v_ns[1] + gamma * v_ns[2];
    return normalize(interpolated_normal);
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_mat_lookup = index_mats[face];
    var indices = vertex_mat_lookup.indices.xyz;
    var material_index = vertex_mat_lookup.mat;

    var vertex_normal_x = vertex_normals[indices.x];
    var vertex_normal_y = vertex_normals[indices.y];
    var vertex_normal_z = vertex_normals[indices.z];

    var v = array<vec3f, 3 > (vertex_normal_x.vertex, vertex_normal_y.vertex, vertex_normal_z.vertex);
    var v_ns = array<vec3f, 3> (vertex_normal_x.normal, vertex_normal_y.normal, vertex_normal_z.normal);

    var mat = materials[material_index];

    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var normal = n;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    (*hit).has_hit = (*hit).has_hit || has_hit;

    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(normal), has_hit);

    (*hit).diffuse = select((*hit).diffuse, mat.color.rgb, has_hit);
    (*hit).emission = select((*hit).emission, mat.emission.rgb, has_hit);

    return has_hit;
}

fn intersect_trimesh(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    var branch_lvl = 0u;
    var near_node = 0u;
    var far_node = 0u;
    var t = 0.0f;
    var node = 0u;
    for(var i = 0u; i <= MAX_LEVEL; i++)
    {
        let tree_node = bspTree[node];
        let node_axis_leaf = tree_node.x & 3u;
        if (node_axis_leaf == BSP_LEAF)
        {
            let node_count = tree_node.x>>2u;
            let node_id = tree_node.y;
            var found = false;

            for(var j = 0u; j < node_count; j++)
            {
                let obj_idx = treeIds[node_id + j];
                if(intersect_triangle(*r, hit, obj_idx))
                {
                    (*r).tmax = (*hit).dist;
                    found = true;
                }
            }

            if (found)
            {
                return true;
            }

            if (branch_lvl == 0u)
            {
                return false;
            }

            branch_lvl -= 1;
            i = branch_node[branch_lvl].x;
            node = branch_node[branch_lvl].y;
            (*r).tmin = branch_ray[branch_lvl].x;
            (*r).tmax = branch_ray[branch_lvl].y;

            continue;
        }
        let axis_direction = (*r).direction[node_axis_leaf];
        let axis_origin = (*r).origin[node_axis_leaf];
        if(axis_direction >= 0.0f)
        {
            near_node = tree_node.z;
            far_node = tree_node.w;
        }
        else
        {
            near_node = tree_node.w;
            far_node = tree_node.z;
        }
        let node_plane = bspPlanes[node];
        let denom = select(axis_direction, f1en8, abs(axis_direction) < f1en8);
        t = (node_plane - axis_origin) / denom;
        if(t > (*r).tmax)
        {
            node = near_node;
        }
        else if(t < (*r).tmin)
        {
            node = far_node;
        }
        else
        {
            branch_node[branch_lvl].x = i;
            branch_node[branch_lvl].y = far_node;
            branch_ray[branch_lvl].x = t;
            branch_ray[branch_lvl].y = (*r).tmax;
            branch_lvl++;
            (*r).tmax = t;
            node = near_node;
        }
    }
    return false;
}

fn intersect_min_max(r : ptr < function, Ray>) -> bool
{
    let p1 = (aabb.min - (*r).origin) / (*r).direction;
    let p2 = (aabb.max - (*r).origin) / (*r).direction;
    let pmin = min(p1, p2);
    let pmax = max(p1, p2);
    let tmin = max(pmin.x, max(pmin.y, pmin.z));
    let tmax = min(pmax.x, min(pmax.y, pmax.z));
    if(tmin > tmax || tmin > (*r).tmax || tmax < (*r).tmin)
    {
        return false;
    }
    (*r).tmin = max(tmin - f1en2, (*r).tmin);
    (*r).tmax = min(tmax + f1en2, (*r).tmax);
    return true;
}


fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    if (!intersect_min_max(r))
    {
        return false;
    }

    (*hit).has_hit = false;

    return intersect_trimesh(r, hit);
}

        //Lighting

fn check_occulusion(position : vec3f, light : vec3f) -> bool
{
    const surface_offset = .01;

    var line = light - position;
    var direction = normalize(line);
    var distance = length(line) - surface_offset;

    var r = construct_ray(position, direction, surface_offset, distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}

fn sample_area_light(pos : vec3f, seed : ptr < function, u32>) -> Light
{
    var index_mat = index_mats[light_faces[u32(floor(rnd(seed) * f32(light_indices_count)))]];
    var triangle_index = index_mat.indices;
    var mat = materials[index_mat.mat];

    var vertex_normal_0 = vertex_normals[triangle_index.x];
    var vertex_normal_1 = vertex_normals[triangle_index.y];
    var vertex_normal_2 = vertex_normals[triangle_index.z];

    var position_sample_1 = rnd(seed);
    var position_sample_2 = rnd(seed);

    var a = 1 - sqrt(position_sample_1);
    var b = (1 - position_sample_2) * sqrt(position_sample_1);
    var c = position_sample_2 * sqrt(position_sample_1);

    var sampled_vertex = a * vertex_normal_0.vertex + b * vertex_normal_1.vertex + c * vertex_normal_2.vertex;
    var sampled_normal = normalize(a * vertex_normal_0.normal + b * vertex_normal_1.normal + c * vertex_normal_2.normal);

    var line = sampled_vertex - pos;
    var dist = length(line);
    var direction = line / dist;

    var e0 = vertex_normal_1.vertex - vertex_normal_0.vertex;
    var e1 = vertex_normal_2.vertex - vertex_normal_0.vertex;
    var n = cross(e0, e1);
    var area = length(n) / 2;

    var Le = mat.emission.rgb;
    var visibility = select(1., 0., check_occulusion(pos, sampled_vertex));
    var keplers = max(0, dot(sampled_normal, direction)) / (dist * dist);
    var n_tri = f32(light_indices_count);

    var L = Le * visibility * n_tri * area * keplers;

    var light : Light;
    light.pos = sampled_vertex;
    light.w_i = direction;
    light.L_i = L;
    light.dist = dist;

    return light;
}

fn indirect_illumination(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> bool
{
    var p_reflect = ((*hit).diffuse.r + (*hit).diffuse.g + (*hit).diffuse.b) / 3;
    var event = rnd(seed);

    var absorb = event >= p_reflect;

    var sampled_sphere_direction = sample_cosine_weighted_hemisphere((*hit).normal, seed);

    (*r).origin = (*hit).position + .01 * sampled_sphere_direction;
    (*r).direction = sampled_sphere_direction;
    (*r).tmin = 0.01;
    (*r).tmax = 10000;
    (*hit).path_factor *= (*hit).diffuse / p_reflect;

    return absorb;
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> vec3f
{
    var emission = select(0., 1., (*hit).direct) * (*hit).emission;

    var absorb = indirect_illumination(r, hit, seed);
    (*hit).direct = absorb && (*hit).direct;
    (*hit).continue_trace = !absorb;

    var light_info = sample_area_light((*hit).position, seed);
    var L_direct = max(0, dot((*hit).normal, light_info.w_i)) * light_info.L_i * (*hit).diffuse / PI;

    var L_observed = emission + L_direct;
    return L_observed;
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> vec3f
{
    var lambertian = lambertian(r, hit, seed);
    return lambertian;
}

//Fragment shader

struct FSOut {
    @location(0) frame : vec4f,
    @location(1) accum : vec4f
}

@fragment
fn main_fs(@builtin(position) fragcoord : vec4f, @location(0) coords : vec2f) -> FSOut
{
    const max_depth = 10;

    let launch_idx = u32(fragcoord.y) * scene_data.canvas_width + u32(fragcoord.x);
    var t = tea(launch_idx, scene_data.frame_num);
    let jitter = vec2f(rnd(&t), rnd(&t)) / f32(scene_data.canvas_height);

    var uv = coords *.5 + jitter;

    var r : Ray;
    var hit : HitInfo;
    r = generate_ray_from_camera(uv);
    hit = generate_default_hitinfo();

    var light_result = vec3f();

    for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
    {
        if (!intersect_scene(&r, &hit))
        {
            light_result += hit.bounce_factor * background_color.rgb;
            break;
        }

        var light = shader(&r, &hit, &t);
        light_result += hit.bounce_factor * light;

        if (!hit.continue_trace)
        {
            break;
        };

        hit.bounce_factor = hit.path_factor;
    }

    let curr_sum = textureLoad(renderTexture, vec2u(fragcoord.xy), 0).rgb * f32(scene_data.frame_num);
    let accum_color = (light_result + curr_sum) / f32(scene_data.frame_num + 1u);

    var fs_out : FSOut;
    fs_out.frame = vec4f(pow(accum_color, vec3f(1.0 / 1.5)), 1.0);
    fs_out.accum = vec4f(accum_color, 1.0);
    return fs_out;
}

//Utility

//PRNG xorshift seed generator by NVIDIA
fn tea(val0 : u32, val1 : u32) -> u32
{
    const N = 16u;  //User specified number of iterations
    var v0 = val0;
    var v1 = val1;
    var s0 = 0u;
    for(var n = 0u; n < N; n++)
    {
        s0 += 0x9e3779b9;
        v0 += ((v1<<4) + 0xa341316c)^(v1 + s0)^((v1>>5) + 0xc8013ea4);
        v1 += ((v0<<4) + 0xad90777d)^(v0 + s0)^((v0>>5) + 0x7e95761e);
    }
    return v0;
}

fn mcg31(prev : ptr < function, u32>) -> u32
{
    const LCG_A = 1977654935u;
    *prev = (LCG_A * (*prev)) & 0x7FFFFFFF;
    return * prev;
}

//Generate random float in [0, 1)
fn rnd(prev : ptr < function, u32>) -> f32
{
    return f32(mcg31(prev)) / f32(0x80000000);
}

//Given a direction vector v sampled around the z-axis of a
//local coordinate system, this function applies the same
//rotation to v as is needed to rotate the z-axis to the
//actual direction n that v should have been sampled around
//[Frisvad, Journal of Graphics Tools 16, 2012;
//Duff et al., Journal of Computer Graphics Techniques 6, 2017].
fn rotate_to_normal(normal : vec3f, v : vec3f) -> vec3f
{
    let signbit = sign(normal.z + f1en16);
    let a = -1.0f / (1.0f + abs(normal.z));
    let b = normal.x * normal.y * a;
    return vec3f(1.0f + normal.x * normal.x * a, b, -signbit * normal.x) * v.x
    + vec3f(signbit * b, signbit * (1.0f + normal.y * normal.y * a), -normal.y) * v.y
    + normal * v.z;
}

//Given spherical coordinates, where theta is the
//polar angle and phi is the azimuthal angle, this
//function returns the corresponding direction vector
fn spherical_direction(sin_theta : f32, cos_theta : f32, phi : f32) -> vec3f
{
    let sin_phi = sin(phi);
    let cos_phi = cos(phi);
    return vec3f(sin_theta * cos_phi, sin_theta * sin_phi, cos_theta);
}

fn sample_cosine_weighted_hemisphere(normal : vec3f, seed : ptr < function, u32>) -> vec3f
{
    var eps_1 = rnd(seed);
    var eps_2 = rnd(seed);

    var theta = acos(sqrt(1 - eps_1));
    var phi = 2 * PI * eps_2;

    var direction = spherical_direction(sin(theta), cos(theta), phi);

    return rotate_to_normal(normal, direction);
}
`,Bi="cornell-progressive",kt="progressive-enabled-cb",Pi="select-shader-cb-progressive",Ac=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Bi),a=N(kt,"checked"),i=Yn(await Hn(hn("models/CornellBoxWithBlocks.obj"))),o=fe(i),s=me([o.vertices,o.normals]),c=new Uint32Array(o.indices);pe(c,i.matIndices,4);const l=new Uint32Array(i.lightIndices),d=new Float32Array(i.materials.reduce((m,_)=>[...m,...B([_.color,_.specular,_.emission,f(_.illum,_.shininess,_.ior)])],[])),h={"Simple progressive":Ic,"Simple progressive with soft shadows":Lc,"Complex progressive":Tc},u={f:()=>{}},v=m=>{const{renderSrc:_,renderDst:g,blitPingPong:x}=Ce(n,r),w=n.createShaderModule({code:h[m]}),p=n.createRenderPipeline({layout:"auto",vertex:{module:w,entryPoint:"main_vs"},fragment:{module:w,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:I}=z(n,p,[s,c,l,d],"STORAGE"),{bindGroup:T}=z(n,p,[o.bspPlanes,o.bspTree,o.treeIds],"STORAGE",1),{bindGroup:b,buffers:[M,S,O]}=z(n,p,[o.aabb,new Uint32Array([l.length]),new Uint32Array([0,r.width,r.height])],"UNIFORM",2),P=n.createBindGroup({layout:p.getBindGroupLayout(3),entries:[{binding:0,resource:g.createView()}]});let F=0;const R=()=>{if(!a())return;F+=1,zn(n,O,new Uint32Array([F]),0);const{pass:A,encoder:Y}=un(n,e,fn.black,{otherColorAttachments:[{view:_.createView(),loadOp:"load",storeOp:"store"}]});A.setPipeline(p),A.setBindGroup(0,I),A.setBindGroup(1,T),A.setBindGroup(2,b),A.setBindGroup(3,P),A.draw(4),A.end(),x(Y),n.queue.submit([Y.finish()]),requestAnimationFrame(R)};u.f=()=>requestAnimationFrame(R),requestAnimationFrame(R)};v(Tn(Pi,v)),Tn(kt,()=>u.f(),"checked")},Sc=(n,e)=>{const t=on("rendering/07-progressive",["/cornellProgressive.ts","/progressiveSimple.wgsl","/progressiveSoftShadows.wgsl","/progressiveWithIndirect.wgsl"]),r=W("Progressive rendering - the rendering ritual"),a=D(`
This section takes a big leap compared to the previous section. 
Whereas the previous sections revolved around displaying the scene and perhaps manipulating it with animation,
progressive rendering is definite step towards realism and time-consuming rendering rituals which require the author to adopt the patience of a monk.

The concept behind progressive rendering is simple - create the next render and use the previous output to average the result. 
What's more important is that this process enables the use of sampling in renders to achieve realism. 
There are three key components to break down when it comes to sampling in progressive rendering, these are:

1) Per frame jittering - instead of using precomputed jitters for each pixel substrata, now a jitter may be generated per frame for each pixel. 
That jittered direction contributes to the end result when progressive rendering commits its value to the built result. 
The effect this has can be seen in the "Simple progressive" mode.

2) Area light sampling - the area light may finally unleash its full potential. 
Instead of treating the area light as a point light, each position on the light surface is a valid source of light. 
Whenever a light has to be queried, it's position is any point on the light surface. 
Of course, the sampling process has to account for the omega set - all the points on the surface - and divide accordingly (principles of probability).
The effect this has can be seen in the "Simple progressive with soft shadows" mode. 
Soft shadows are generated by the points on the shadow edges being either obstructed or not (depending on the light position sampled), whereas inner shadows are stronger as those points are always obstructed.

3) Indirect illumination - the precursor to global illumination. Up to now, all rays hitting a surface with a Lambertian diffuse material were absorbed into the material's surface.
A ray being absorbed results in the color of that material being seen in the camera. With sampling an event can be created to test for the reflection of a ray on the surface of a Lambertian material.
In the real world most light rays will reflect until they run out of energy, thus the introduction of such a phenomenon to the rendering system will create a more realistic imitation of light in the render.
The effect of adding random reflections on lambertian surfaces can be seen in the "Complex progressive" mode.

The key concept behind points (2) and (3) is Monte Carlo integration. 
Physical models (radiometry and photometry) describe light as integrals over areas or solid angles (as flux expands outwards), but integrals are difficult to compute.
In a progressive framework, each next frame is another sample in Monte Carlo integration, each next decision of a jitter direction, a light position choice or ray reflection is a valid sample which converges to a physically realistic output. 

There is a considerable amount of noise in the inital renders. This is the price to progressive rendering, as it takes time for the frame to smoothen and converge.
`),i=nn(),o=K(Bi),s=_n(),c=k(Xn(kt,!0),"Progressive rendering enabled",!1),l=k(Bn(Pi,["Simple progressive","Simple progressive with soft shadows","Complex progressive"],"Complex progressive"),"Progressive shader type",!1);s.append(c,l),i.append(o,s),n.append(r,t,a,i),e.push(Ac)},Oi=(n,e)=>{Sc(n,e)},Rc=`struct VertexNormal {
    vertex : vec3f,
    normal : vec3f
};

struct IndexMaterial {
    indices : vec3u,
    mat : u32
};

struct Material {
    color : vec4f,
    specular : vec4f,
    emission : vec4f,
    illum_shininess_ior : vec3f
};

@group(0) @binding(0) var<storage> vertex_normals : array<VertexNormal>;
@group(0) @binding(1) var<storage> index_mats : array<IndexMaterial>;
@group(0) @binding(2) var<storage> light_faces : array<u32>;
@group(0) @binding(3) var<storage> materials : array<Material>;

@group(1) @binding(0) var<storage> bspPlanes : array<f32>;
@group(1) @binding(1) var<storage> bspTree : array<vec4u>;
@group(1) @binding(2) var<storage> treeIds : array<u32>;

struct Aabb {
    min : vec3f,
    max : vec3f,
};

struct SceneData {
    frame_num : u32,
    canvas_width : u32,
    canvas_height : u32
}

@group(2) @binding(0) var<uniform> aabb : Aabb;
@group(2) @binding(1) var<uniform> light_indices_count : u32;
@group(2) @binding(2) var<uniform> scene_data : SceneData;
@group(2) @binding(3) var<uniform> sphere_extinction_coefficient : vec3f;

@group(3) @binding(0) var renderTexture : texture_2d<f32>;

const MAX_LEVEL = 20u;
const BSP_LEAF = 3u;
var<private> branch_node : array<vec2u, MAX_LEVEL>;
var<private> branch_ray : array<vec2f, MAX_LEVEL>;

//const background_color = vec4f(0.1, 0.3, 0.6, 1.0);
const background_color = vec4f(0, 0, 0, 1.0);

const sphere_refractive_index = 1.5;
const air_refractive_index = 1.;
const sphere_radius = 90;

const up = vec3f(0., 1., 0.);
const target_point = vec3f(277., 275., 0.);
const origin_point = vec3f(277., 275., -570.);
const camera_constant = 1;
const default_tmin = .01;
const default_tmax = 10000;

const f1en2 = 0.01;
const f1en4 = 0.0001;
const f1en8 = 0.00000001;
const f1en16 = 0.0000000000000001;

const PI = 3.14;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32,
    pos : vec3f
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
};

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,

    object : u32,

    dist : f32,
    position : vec3f,
    normal : vec3f,

    diffuse : vec3f,
    emission : vec3f,
    //prev_refractive : f32,
    //next_refractive : f32,

    direct : bool,
    path_factor : vec3f,
    bounce_factor : vec3f
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    var hit_info : HitInfo;

    hit_info.depth = 0;
    hit_info.has_hit = false;
    hit_info.continue_trace = false;

    hit_info.object = 0;

    hit_info.dist = 0;
    hit_info.position = vec3f();
    hit_info.normal = vec3f();

    hit_info.diffuse = vec3f();
    hit_info.emission = vec3f();
    //hit_info.prev_refractive = 1.;
    //hit_info.next_refractive = 1.;

    hit_info.direct = true;
    hit_info.path_factor = vec3f(1);
    hit_info.bounce_factor = vec3f(1);

    return hit_info;
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    return construct_ray_default(origin_point, normalize(q));
}

fn construct_ray_default(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, default_tmin, default_tmax);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray_indirect : Ray;
    ray_indirect.origin = origin;
    ray_indirect.direction = direction;
    ray_indirect.tmax = tmax;
    ray_indirect.tmin = tmin;
    return ray_indirect;
}


//Intersecting objects //

fn barycentric_normal(v_ns : array<vec3f, 3 >, beta : f32, gamma : f32) -> vec3f {
    var alpha = 1 - beta - gamma;
    var interpolated_normal = alpha * v_ns[0] + beta * v_ns[1] + gamma * v_ns[2];
    return normalize(interpolated_normal);
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_mat_lookup = index_mats[face];
    var indices = vertex_mat_lookup.indices.xyz;
    var material_index = vertex_mat_lookup.mat;

    var vertex_normal_x = vertex_normals[indices.x];
    var vertex_normal_y = vertex_normals[indices.y];
    var vertex_normal_z = vertex_normals[indices.z];

    var v = array<vec3f, 3 > (vertex_normal_x.vertex, vertex_normal_y.vertex, vertex_normal_z.vertex);
    var v_ns = array<vec3f, 3> (vertex_normal_x.normal, vertex_normal_y.normal, vertex_normal_z.normal);

    var mat = materials[material_index];

    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);

    //if (denom<.0000001) return false;

    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var normal = n;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    (*hit).has_hit = (*hit).has_hit || has_hit;

    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);

    (*hit).object = select((*hit).object, 0, has_hit);

    (*hit).diffuse = select((*hit).diffuse, mat.color.rgb, has_hit);
    (*hit).emission = select((*hit).emission, mat.emission.rgb, has_hit);
    (*hit).normal = select((*hit).normal, normalize(normal), has_hit);

    return has_hit;
}

fn intersect_trimesh(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    var branch_lvl = 0u;
    var near_node = 0u;
    var far_node = 0u;
    var t = 0.0f;
    var node = 0u;
    for(var i = 0u; i <= MAX_LEVEL; i++)
    {
        let tree_node = bspTree[node];
        let node_axis_leaf = tree_node.x & 3u;
        if (node_axis_leaf == BSP_LEAF)
        {
            let node_count = tree_node.x>>2u;
            let node_id = tree_node.y;
            var found = false;

            for(var j = 0u; j < node_count; j++)
            {
                let obj_idx = treeIds[node_id + j];
                if(intersect_triangle(*r, hit, obj_idx))
                {
                    (*r).tmax = (*hit).dist;
                    found = true;
                }
            }

            if (found)
            {
                return true;
            }

            if (branch_lvl == 0u)
            {
                return false;
            }

            branch_lvl -= 1;
            i = branch_node[branch_lvl].x;
            node = branch_node[branch_lvl].y;
            (*r).tmin = branch_ray[branch_lvl].x;
            (*r).tmax = branch_ray[branch_lvl].y;

            continue;
        }
        let axis_direction = (*r).direction[node_axis_leaf];
        let axis_origin = (*r).origin[node_axis_leaf];
        if(axis_direction >= 0.0f)
        {
            near_node = tree_node.z;
            far_node = tree_node.w;
        }
        else
        {
            near_node = tree_node.w;
            far_node = tree_node.z;
        }
        let node_plane = bspPlanes[node];
        let denom = select(axis_direction, f1en8, abs(axis_direction) < f1en8);
        t = (node_plane - axis_origin) / denom;
        if(t > (*r).tmax)
        {
            node = near_node;
        }
        else if(t < (*r).tmin)
        {
            node = far_node;
        }
        else
        {
            branch_node[branch_lvl].x = i;
            branch_node[branch_lvl].y = far_node;
            branch_ray[branch_lvl].x = t;
            branch_ray[branch_lvl].y = (*r).tmax;
            branch_lvl++;
            (*r).tmax = t;
            node = near_node;
        }
    }
    return false;
}

fn intersect_min_max(r : ptr < function, Ray>) -> bool
{
    let p1 = (aabb.min - (*r).origin) / (*r).direction;
    let p2 = (aabb.max - (*r).origin) / (*r).direction;
    let pmin = min(p1, p2);
    let pmax = max(p1, p2);
    let tmin = max(pmin.x, max(pmin.y, pmin.z));
    let tmax = min(pmax.x, min(pmax.y, pmax.z));
    if(tmin > tmax || tmin > (*r).tmax || tmax < (*r).tmin)
    {
        return false;
    }
    (*r).tmin = max(tmin - f1en2, (*r).tmin);
    (*r).tmax = min(tmax + f1en2, (*r).tmax);
    return true;
}

fn intersect_sphere(r : Ray, hit : ptr < function, HitInfo>, object : u32, center : vec3f) -> bool {

    var from_center = r.origin - center;
    var b_half = dot(from_center, r.direction);
    var c = dot(from_center, from_center) - sphere_radius * sphere_radius;
    var b_half_2_c = b_half * b_half - c;

    var does_intersection_exist = b_half_2_c >= 0;

    var distance_1 = -b_half - sqrt(abs(b_half_2_c));
    var distance_2 = -b_half + sqrt(abs(b_half_2_c));
    var distance_1_in_range = distance_1 >= r.tmin && distance_1 <= r.tmax;
    var distance_2_in_range = distance_2 >= r.tmin && distance_2 <= r.tmax;

    var min_distance = min(distance_1, distance_2);
    var distance = select(distance_2, select(distance_1, min_distance, distance_2_in_range), distance_1_in_range);

    var intersection = r.origin + distance * r.direction;
    var n = normalize(intersection - center);

    var has_hit = does_intersection_exist && distance >= r.tmin && distance <= r.tmax;
    (*hit).has_hit = (*hit).has_hit || has_hit;

    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);

    (*hit).object = select((*hit).object, object, has_hit);
    (*hit).normal = select((*hit).normal, n, has_hit);

    //(*hit).prev_refractive = select((*hit).prev_refractive, (*hit).next_refractive, has_hit && object == 2);
    //(*hit).next_refractive = select((*hit).next_refractive, next_refr_index, has_hit && object == 2);

    return has_hit;
}

fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    (*hit).has_hit = false;

    var hit_mirror_sphere = intersect_sphere(*r, hit, 1, vec3f(420, 90, 370));
    (*r).tmax = select((*r).tmax, (*hit).dist, hit_mirror_sphere);

    var hit_refractive_sphere = intersect_sphere(*r, hit, 2, vec3f(130, 90, 250));
    (*r).tmax = select((*r).tmax, (*hit).dist, hit_refractive_sphere);

    if (!intersect_min_max(r))
    {
        return (*hit).has_hit;
    }

    var hit_cb = intersect_trimesh(r, hit);
    (*r).tmax = select((*r).tmax, (*hit).dist, hit_cb);

    return (*hit).has_hit;
}

        //Lighting

fn check_occulusion(position : vec3f, light : vec3f) -> bool
{
    const surface_offset = .01;

    var line = light - position;
    var direction = normalize(line);
    var distance = length(line) - surface_offset;

    var r = construct_ray(position, direction, surface_offset, distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}

fn sample_area_light(pos : vec3f, seed : ptr < function, u32>) -> Light
{
    var index_mat = index_mats[light_faces[u32(floor(rnd(seed) * f32(light_indices_count)))]];
    var triangle_index = index_mat.indices;
    var mat = materials[index_mat.mat];

    var vertex_normal_0 = vertex_normals[triangle_index.x];
    var vertex_normal_1 = vertex_normals[triangle_index.y];
    var vertex_normal_2 = vertex_normals[triangle_index.z];

    var position_sample_1 = rnd(seed);
    var position_sample_2 = rnd(seed);

    var a = 1 - sqrt(position_sample_1);
    var b = (1 - position_sample_2) * sqrt(position_sample_1);
    var c = position_sample_2 * sqrt(position_sample_1);

    var sampled_vertex = a * vertex_normal_0.vertex + b * vertex_normal_1.vertex + c * vertex_normal_2.vertex;
    var sampled_normal = normalize(a * vertex_normal_0.normal + b * vertex_normal_1.normal + c * vertex_normal_2.normal);

    var line = sampled_vertex - pos;
    var dist = length(line);
    var direction = line / dist;

    var e0 = vertex_normal_1.vertex - vertex_normal_0.vertex;
    var e1 = vertex_normal_2.vertex - vertex_normal_0.vertex;
    var n = cross(e0, e1);
    var area = length(n) / 2;

    var Le = mat.emission.rgb;
    var visibility = select(1., 0., check_occulusion(pos, sampled_vertex));
    var keplers = max(0, dot(sampled_normal, direction)) / (dist * dist);
    var n_tri = f32(light_indices_count);

    var L = Le * visibility * n_tri * area * keplers;

    var light : Light;
    light.pos = sampled_vertex;
    light.w_i = direction;
    light.L_i = L;
    light.dist = dist;

    return light;
}

fn indirect_illumination(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> bool
{
    var p_reflect = ((*hit).diffuse.r + (*hit).diffuse.g + (*hit).diffuse.b) / 3;
    var event = rnd(seed);

    var absorb = event >= p_reflect;

    var sampled_sphere_direction = sample_cosine_weighted_hemisphere((*hit).normal, seed);

    (*r).origin = (*hit).position + .01 * sampled_sphere_direction;
    (*r).direction = sampled_sphere_direction;
    (*r).tmin = 0.01;
    (*r).tmax = 10000;
    (*hit).path_factor *= (*hit).diffuse / p_reflect;

    return absorb;
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> vec3f
{
    var emission = select(0., 1., (*hit).direct) * (*hit).emission;

    var absorb = indirect_illumination(r, hit, seed);
    (*hit).direct = absorb && (*hit).direct;
    (*hit).continue_trace = !absorb;

    var light_info = sample_area_light((*hit).position, seed);
    var L_direct = max(0, dot((*hit).normal, light_info.w_i)) * light_info.L_i * (*hit).diffuse / PI;

    var L_observed = emission + L_direct;
    return L_observed;
}

fn mirror(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    (*r).direction = normalize(reflect((*r).direction, (*hit).normal));
    (*r).origin = (*hit).position + (*r).direction * .01;
    (*r).tmin = default_tmin;
    (*r).tmax = default_tmax;

    (*hit).continue_trace = true;
    (*hit).direct = true;

    return vec3f();
}

fn fresnel(cos_ti : f32, cos_tt : f32, ni : f32, nt : f32) -> f32
{
    var ni_nt = ni / nt;
    var cos2 = 1 - ni_nt * ni_nt * (1 - cos_ti * cos_ti);

    var r_perp = (ni * cos_ti - nt * cos_tt) / (ni * cos_ti + nt * cos_tt);
    var r_par = (nt * cos_ti - ni * cos_tt) / (nt * cos_ti + ni * cos_tt);

    return select(.5 * (r_perp * r_perp + r_par * r_par), 1., cos2 < 0);
}

fn refractive(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> vec3f
{
    var is_intersection_from_inside = dot((*hit).normal, (*r).direction) > 0;
    var context_n = select((*hit).normal, -(*hit).normal, is_intersection_from_inside);

    var next_refr_index = select(sphere_refractive_index, air_refractive_index, is_intersection_from_inside);
    var prev_refr_index = select(air_refractive_index, sphere_refractive_index, is_intersection_from_inside);
    var ni_nt = prev_refr_index / next_refr_index;

    //Applying Bougeur's law

    var T = exp(-sphere_extinction_coefficient / 10 * (*hit).dist);
    var p_transmission = (T.x + T.y + T.z) / 3;
    var event_2 = rnd(seed);
    var transmitted_from_inside = event_2 < p_transmission;

    (*hit).path_factor *= select(vec3f(1), T / p_transmission, is_intersection_from_inside && transmitted_from_inside);

    //Refraction or reflection

    var incident = -(*r).direction;
    var r_n_dot = dot(incident, context_n);

    var t_sin = ni_nt * (r_n_dot * context_n - incident);
    var cos2 = 1 - ni_nt * ni_nt * (1 - r_n_dot * r_n_dot);
    var direction = t_sin - context_n * sqrt(abs(cos2));

    var p_reflect = fresnel(r_n_dot, dot(normalize(direction), -context_n), prev_refr_index, next_refr_index);
    var event_1 = rnd(seed);
    var is_reflected = event_1 < p_reflect;

    var reflected_direction = reflect((*r).direction, context_n);

    (*r).direction = normalize(select(direction, reflected_direction, is_reflected));
    (*r).origin = (*hit).position + (*r).direction;
    (*r).tmin = default_tmin;
    (*r).tmax = default_tmax;

    //Conclusion

    (*hit).continue_trace = !is_intersection_from_inside || transmitted_from_inside;
    (*hit).direct = true;

    return vec3f();
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> vec3f
{
    (*hit).continue_trace = false;

    switch ((*hit).object)
    {
        default :
        {
        }
        case 1 :
        {
            return mirror(r, hit);
        }
        case 2 :
        {
            return refractive(r, hit, seed);
        }
    }

    return lambertian(r, hit, seed);
}

//Fragment shader

struct FSOut {
    @location(0) frame : vec4f,
    @location(1) accum : vec4f
}

@fragment
fn main_fs(@builtin(position) fragcoord : vec4f, @location(0) coords : vec2f) -> FSOut
{
    const max_depth = 10;

    let launch_idx = u32(fragcoord.y) * scene_data.canvas_width + u32(fragcoord.x);
    var t = tea(launch_idx, scene_data.frame_num);
    let jitter = vec2f(rnd(&t), rnd(&t)) / f32(scene_data.canvas_height);

    var uv = coords *.5 + jitter;

    var r : Ray;
    var hit : HitInfo;
    r = generate_ray_from_camera(uv);
    hit = generate_default_hitinfo();

    var light_result = vec3f();

    for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
    {
        if (!intersect_scene(&r, &hit))
        {
            light_result += hit.bounce_factor * background_color.rgb;
            break;
        }

        var light = shader(&r, &hit, &t);
        light_result += hit.bounce_factor * light;

        if (!hit.continue_trace)
        {
            break;
        };
        hit.bounce_factor = hit.path_factor;
    }

    let curr_sum = textureLoad(renderTexture, vec2u(fragcoord.xy), 0).rgb * f32(scene_data.frame_num);
    let accum_color = (light_result + curr_sum) / f32(scene_data.frame_num + 1u);

    var fs_out : FSOut;
    fs_out.frame = vec4f(pow(accum_color, vec3f(1.0 / 1.25)), 1.0);
    fs_out.accum = vec4f(accum_color, 1.0);
    return fs_out;
}

//Utility

//PRNG xorshift seed generator by NVIDIA
fn tea(val0 : u32, val1 : u32) -> u32
{
    const N = 16u;  //User specified number of iterations
    var v0 = val0;
    var v1 = val1;
    var s0 = 0u;
    for(var n = 0u; n < N; n++)
    {
        s0 += 0x9e3779b9;
        v0 += ((v1<<4) + 0xa341316c)^(v1 + s0)^((v1>>5) + 0xc8013ea4);
        v1 += ((v0<<4) + 0xad90777d)^(v0 + s0)^((v0>>5) + 0x7e95761e);
    }
    return v0;
}

fn mcg31(prev : ptr < function, u32>) -> u32
{
    const LCG_A = 1977654935u;
    *prev = (LCG_A * (*prev)) & 0x7FFFFFFF;
    return * prev;
}

//Generate random float in [0, 1)
fn rnd(prev : ptr < function, u32>) -> f32
{
    return f32(mcg31(prev)) / f32(0x80000000);
}

//Given a direction vector v sampled around the z-axis of a
//local coordinate system, this function applies the same
//rotation to v as is needed to rotate the z-axis to the
//actual direction n that v should have been sampled around
//[Frisvad, Journal of Graphics Tools 16, 2012;
//Duff et al., Journal of Computer Graphics Techniques 6, 2017].
fn rotate_to_normal(normal : vec3f, v : vec3f) -> vec3f
{
    let signbit = sign(normal.z + f1en16);
    let a = -1.0f / (1.0f + abs(normal.z));
    let b = normal.x * normal.y * a;
    return vec3f(1.0f + normal.x * normal.x * a, b, -signbit * normal.x) * v.x
    + vec3f(signbit * b, signbit * (1.0f + normal.y * normal.y * a), -normal.y) * v.y
    + normal * v.z;
}

//Given spherical coordinates, where theta is the
//polar angle and phi is the azimuthal angle, this
//function returns the corresponding direction vector
fn spherical_direction(sin_theta : f32, cos_theta : f32, phi : f32) -> vec3f
{
    let sin_phi = sin(phi);
    let cos_phi = cos(phi);
    return vec3f(sin_theta * cos_phi, sin_theta * sin_phi, cos_theta);
}

fn sample_cosine_weighted_hemisphere(normal : vec3f, seed : ptr < function, u32>) -> vec3f
{
    var eps_1 = rnd(seed);
    var eps_2 = rnd(seed);

    var theta = acos(sqrt(1 - eps_1));
    var phi = 2 * PI * eps_2;

    var direction = spherical_direction(sin(theta), cos(theta), phi);

    return rotate_to_normal(normal, direction);
}
`,$t="brdfs",Ft="progressive-enabled-cb-"+$t,ki="brdf-color-picker",Bc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn($t),a=N(Ft,"checked"),i=N(ki),o=Yn(await Hn(hn("models/CornellBox.obj"))),s=fe(o),c=me([s.vertices,s.normals]),l=new Uint32Array(s.indices);pe(l,o.matIndices,4);const d=new Uint32Array(o.lightIndices),h=new Float32Array(o.materials.reduce((R,A)=>[...R,...B([A.color,A.specular,A.emission,f(A.illum,A.shininess,A.ior)])],[]));let{renderSrc:u,renderDst:v,blitPingPong:m}=Ce(n,r);const _=n.createShaderModule({code:Rc}),g=n.createRenderPipeline({layout:"auto",vertex:{module:_,entryPoint:"main_vs"},fragment:{module:_,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:x}=z(n,g,[c,l,d,h],"STORAGE"),{bindGroup:w}=z(n,g,[s.bspPlanes,s.bspTree,s.treeIds],"STORAGE",1),{bindGroup:p,buffers:[I,T,b,M]}=z(n,g,[s.aabb,new Uint32Array([d.length]),new Uint32Array([0,r.width,r.height]),new Float32Array(Ze(_e(i())))],"UNIFORM",2),S=n.createBindGroup({layout:g.getBindGroupLayout(3),entries:[{binding:0,resource:v.createView()}]});let O=0;const P=()=>{if(!a())return;F===!0&&(F=!1,O=0),O+=1,zn(n,b,new Uint32Array([O]),0),Z(n,M,new Float32Array(Ze(_e(i()))),0);const{pass:R,encoder:A}=un(n,e,fn.black,{otherColorAttachments:[{view:u.createView(),loadOp:"load",storeOp:"store"}]});R.setPipeline(g),R.setBindGroup(0,x),R.setBindGroup(1,w),R.setBindGroup(2,p),R.setBindGroup(3,S),R.draw(4),R.end(),m(A),n.queue.submit([A.finish()]),requestAnimationFrame(P)};Tn(Ft,R=>{R&&requestAnimationFrame(P)},"checked");let F=!1;it("restart-progressive-brdf",()=>F=!0),P()},Pc=(n,e)=>{const t=on("rendering/08-brdf",["/brdf.ts","/brdf.wgsl"]),r=W("Illuminating the situation"),a=D(`
In the previous section we were introduced to indirect illumination as a random event for the reflection of light on Lambertian surfaces.
This is a key part of global illumination in which the path light takes is more complicated than a set of deterministic equations.

While mirrors remain with the same behaviour in global illumination, refractive mediums are far more interesting. 
They have not one, but two decision points for what may happen to a ray intersecting with the medium's surface. 
The first situation is ray reflection. In an earlier section, the refractive sphere was shaded with a combination of a specular and refractive material to achieve a glossy look.
This can be repalced with the more appropriate behaviour - some rays do not refract, but are instead reflected and strike a light source, which is then visible on the refractive material's surface.
This is known as Fresnel reflectance. This also results in an interesting phenomenon on the bottom of the sphere. 
Rays reflected from the Lambertian floor refract into the sphere and strike the light source on the other side.

The second event ioccurs inside the sphere (but computationally at the other end). Rays which have refracted inside the glass sphere may not reach the end.
They are instead absorbed by the glass itself. 
Bouguer's law of exponential attenuation applies to decide if a ray should become extinct or if it has the energy to travel beyond the refractive medium.
The extinction coefficient is the variable which controls the absorbing strength of the medium. 
It also dyes the rays travelling through it as it diminished certain wavelengths (in other words, the extinction is biased towards certain wavelengths).
`),i=nn(),o=K($t),s=_n(),c=k(Xn(Ft,!0),"Progressive rendering enabled",!1),l=k(Xe(ki,"#1a3205"),"Sphere extinction coefficient"),d=rt("restart-progressive-brdf","Restart progressive");s.append(c,l,d),i.append(o,s),n.append(r,t,a,i),e.push(Bc)},Fi=(n,e)=>{Pc(n,e)},Oc=`struct VertexNormal {
    vertex : vec3f,
    normal : vec3f
};

struct IndexMaterial {
    indices : vec3u,
    mat : u32
};

struct Material {
    color : vec4f,
    specular : vec4f,
    emission : vec4f,
    illum_shininess_ior : vec3f
};

@group(0) @binding(0) var<storage> vertex_normals : array<VertexNormal>;
@group(0) @binding(1) var<storage> index_mats : array<IndexMaterial>;
@group(0) @binding(2) var<storage> materials : array<Material>;

@group(1) @binding(0) var<storage> bspPlanes : array<f32>;
@group(1) @binding(1) var<storage> bspTree : array<vec4u>;
@group(1) @binding(2) var<storage> treeIds : array<u32>;

struct Aabb {
    min : vec3f,
    max : vec3f,
};

struct SceneData {
    frame_num : u32,
    canvas_width : u32,
    canvas_height : u32
}

@group(2) @binding(0) var<uniform> aabb : Aabb;
@group(2) @binding(1) var<uniform> scene_data : SceneData;
@group(2) @binding(2) var<uniform> shader_type : u32;
@group(2) @binding(3) var<uniform> include_sunlight_modifier : f32;
@group(2) @binding(4) var<uniform> hdr_flag : u32;

@group(3) @binding(0) var render_texture : texture_2d<f32>;
@group(3) @binding(1) var environment_sampler : sampler;
@group(3) @binding(2) var environment_texture : texture_2d<f32>;

const MAX_LEVEL = 20u;
const BSP_LEAF = 3u;
var<private> branch_node : array<vec2u, MAX_LEVEL>;
var<private> branch_ray : array<vec2f, MAX_LEVEL>;

const sphere_refractive_index = 1.5;
const air_refractive_index = 1.;
const sphere_radius = 90;

const up = vec3f(0., 1., 0.);
const target_point = vec3f(0, 0, 0.);
const origin_point = vec3f(0, 5, 10);
const camera_constant =.5;

const sun_direction = normalize(vec3f(5, -.5, -.5));
const sun_intensity = vec3f(.8, .8, .8);

const default_tmin = .01;
const default_tmax = 10000;

const f1en2 = 0.01;
const f1en4 = 0.0001;
const f1en8 = 0.00000001;
const f1en16 = 0.0000000000000001;

const PI = 3.14;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32,
    pos : vec3f
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
};

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,

    object : u32,

    dist : f32,
    position : vec3f,
    normal : vec3f,

    diffuse : vec3f,
    emission : vec3f,
    //prev_refractive : f32,
    //next_refractive : f32,

    direct : bool,
    path_factor : vec3f,
    bounce_factor : vec3f,

    background : bool,
    uv : vec2f
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    var hit_info : HitInfo;

    hit_info.depth = 0;
    hit_info.has_hit = false;
    hit_info.continue_trace = false;

    hit_info.object = 0;

    hit_info.dist = 0;
    hit_info.position = vec3f();
    hit_info.normal = vec3f();

    hit_info.diffuse = vec3f();
    hit_info.emission = vec3f();
    //hit_info.prev_refractive = 1.;
    //hit_info.next_refractive = 1.;

    hit_info.direct = true;
    hit_info.path_factor = vec3f(1);
    hit_info.bounce_factor = vec3f(1);

    hit_info.background = false;
    hit_info.uv = vec2f();

    return hit_info;
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    return construct_ray_default(origin_point, normalize(q));
}

fn construct_ray_default(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, default_tmin, default_tmax);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray_indirect : Ray;
    ray_indirect.origin = origin;
    ray_indirect.direction = direction;
    ray_indirect.tmax = tmax;
    ray_indirect.tmin = tmin;
    return ray_indirect;
}


//Intersecting objects //

fn barycentric_normal(v_ns : array<vec3f, 3 >, beta : f32, gamma : f32) -> vec3f {
    var alpha = 1 - beta - gamma;
    var interpolated_normal = alpha * v_ns[0] + beta * v_ns[1] + gamma * v_ns[2];
    return normalize(interpolated_normal);
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_mat_lookup = index_mats[face];
    var indices = vertex_mat_lookup.indices.xyz;
    var material_index = vertex_mat_lookup.mat;

    var vertex_normal_x = vertex_normals[indices.x];
    var vertex_normal_y = vertex_normals[indices.y];
    var vertex_normal_z = vertex_normals[indices.z];

    var v = array<vec3f, 3 > (vertex_normal_x.vertex, vertex_normal_y.vertex, vertex_normal_z.vertex);
    var v_ns = array<vec3f, 3> (vertex_normal_x.normal, vertex_normal_y.normal, vertex_normal_z.normal);

    var mat = materials[material_index];

    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;
    var alpha = 1 - beta - gamma;

    var normal = barycentric_normal(v_ns, beta, gamma);

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    (*hit).has_hit = (*hit).has_hit || has_hit;

    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);

    (*hit).object = select((*hit).object, 0, has_hit);

    (*hit).diffuse = select((*hit).diffuse, mat.color.rgb, has_hit);
    (*hit).emission = select((*hit).emission, mat.emission.rgb, has_hit);
    (*hit).normal = select((*hit).normal, normal, has_hit);

    return has_hit;
}

fn intersect_trimesh(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    var branch_lvl = 0u;
    var near_node = 0u;
    var far_node = 0u;
    var t = 0.0f;
    var node = 0u;
    for(var i = 0u; i <= MAX_LEVEL; i++)
    {
        let tree_node = bspTree[node];
        let node_axis_leaf = tree_node.x & 3u;
        if (node_axis_leaf == BSP_LEAF)
        {
            let node_count = tree_node.x>>2u;
            let node_id = tree_node.y;
            var found = false;

            for(var j = 0u; j < node_count; j++)
            {
                let obj_idx = treeIds[node_id + j];
                if(intersect_triangle(*r, hit, obj_idx))
                {
                    (*r).tmax = (*hit).dist;
                    found = true;
                }
            }

            if (found)
            {
                return true;
            }

            if (branch_lvl == 0u)
            {
                return false;
            }

            branch_lvl -= 1;
            i = branch_node[branch_lvl].x;
            node = branch_node[branch_lvl].y;
            (*r).tmin = branch_ray[branch_lvl].x;
            (*r).tmax = branch_ray[branch_lvl].y;

            continue;
        }
        let axis_direction = (*r).direction[node_axis_leaf];
        let axis_origin = (*r).origin[node_axis_leaf];
        if(axis_direction >= 0.0f)
        {
            near_node = tree_node.z;
            far_node = tree_node.w;
        }
        else
        {
            near_node = tree_node.w;
            far_node = tree_node.z;
        }
        let node_plane = bspPlanes[node];
        let denom = select(axis_direction, f1en8, abs(axis_direction) < f1en8);
        t = (node_plane - axis_origin) / denom;
        if(t > (*r).tmax)
        {
            node = near_node;
        }
        else if(t < (*r).tmin)
        {
            node = far_node;
        }
        else
        {
            branch_node[branch_lvl].x = i;
            branch_node[branch_lvl].y = far_node;
            branch_ray[branch_lvl].x = t;
            branch_ray[branch_lvl].y = (*r).tmax;
            branch_lvl++;
            (*r).tmax = t;
            node = near_node;
        }
    }
    return false;
}

fn intersect_min_max(r : ptr < function, Ray>) -> bool
{
    let p1 = (aabb.min - (*r).origin) / (*r).direction;
    let p2 = (aabb.max - (*r).origin) / (*r).direction;
    let pmin = min(p1, p2);
    let pmax = max(p1, p2);
    let tmin = max(pmin.x, max(pmin.y, pmin.z));
    let tmax = min(pmax.x, min(pmax.y, pmax.z));
    if(tmin > tmax || tmin > (*r).tmax || tmax < (*r).tmin)
    {
        return false;
    }
    (*r).tmin = max(tmin - f1en2, (*r).tmin);
    (*r).tmax = min(tmax + f1en2, (*r).tmax);
    return true;
}

fn intersect_plane(r : Ray, hit : ptr < function, HitInfo>) -> bool {
    const plane_position = vec3f(0);
    const plane_normal = vec3f(0, 1., 0);
    const plane_tangent = vec3f(-1, 0, 0);
    const plane_binormal = vec3f(0, 0., 1);

    var distance = dot(plane_position - r.origin, plane_normal) / dot(r.direction, plane_normal);
    var intersection = r.origin + distance * r.direction;

    var has_hit = distance > r.tmin && distance < r.tmax;

    var u = dot((intersection - plane_position), plane_tangent);
    var v = dot((intersection - plane_position), plane_binormal);

    (*hit).has_hit = (*hit).has_hit || has_hit;

    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);

    (*hit).object = select((*hit).object, 1, has_hit);
    (*hit).normal = select((*hit).normal, plane_normal, has_hit);

    return has_hit;
}

fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    (*hit).has_hit = false;

    var hit_plane = intersect_plane(*r, hit);
    (*r).tmax = select((*r).tmax, (*hit).dist, hit_plane);

    if (!intersect_min_max(r))
    {
        return (*hit).has_hit;
    }

    var hit_cb = intersect_trimesh(r, hit);
    (*r).tmax = select((*r).tmax, (*hit).dist, hit_cb);

    return (*hit).has_hit;
}

//Lighting


fn check_occulusion_directional(position : vec3f, direction : vec3f) -> bool
{
    const surface_offset = .1;

    var r = construct_ray(position + direction * surface_offset, direction, default_tmin, 10);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}

fn sample_sun_light(position : vec3f) -> Light {
    let env_visibility = select(1., 0., check_occulusion_directional(position, -sun_direction));

    var light : Light;
    light.L_i = sun_intensity * env_visibility;
    light.w_i = sun_direction;
    return light;
}

fn sample_environment_light(position : vec3f, direction : vec3f, seed : ptr < function, u32>) -> Light
{
    let sampled_sphere_direction = sample_cosine_weighted_hemisphere(direction, seed);
    let environment = get_environment(sampled_sphere_direction);
    let env_visibility = select(1., 0.4, check_occulusion_directional(position, sampled_sphere_direction));

    //let uv = angular_map(sampled_sphere_direction);
    //let environment = textureSampleLevel(environment_texture, environment_sampler, uv, 0.).rgb;

    var light : Light;
    light.L_i = environment * env_visibility;
    light.w_i = direction;
    return light;
}

fn indirect_illumination(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> bool
{
    var p_reflect = ((*hit).diffuse.r + (*hit).diffuse.g + (*hit).diffuse.b) / 3;
    var event = rnd(seed);

    var absorb = event >= p_reflect;

    var sampled_sphere_direction = sample_cosine_weighted_hemisphere((*hit).normal, seed);

    (*r).origin = (*hit).position + .01 * sampled_sphere_direction;
    (*r).direction = sampled_sphere_direction;
    (*r).tmin = 0.01;
    (*r).tmax = 10000;
    (*hit).path_factor *= (*hit).diffuse / p_reflect;

    return absorb;
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> vec3f
{
    var emission = select(0., 1., (*hit).direct) * (*hit).emission;

    var absorb = indirect_illumination(r, hit, seed);
    (*hit).direct = absorb && (*hit).direct;
    (*hit).continue_trace = !absorb;

    let env_light = sample_environment_light((*hit).position, (*hit).normal, seed).L_i;

    let sun_light_info = sample_sun_light((*hit).position);
    let sun_light = include_sunlight_modifier * max(0, dot((*hit).normal, -sun_light_info.w_i)) * sun_light_info.L_i;

    let L_direct = (env_light + sun_light) * (*hit).diffuse;

    var L_observed = emission + L_direct;
    return L_observed;
}

fn mirror(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    (*r).direction = normalize(reflect((*r).direction, (*hit).normal));
    (*r).origin = (*hit).position + (*r).direction * .01;
    (*r).tmin = default_tmin;
    (*r).tmax = default_tmax;

    (*hit).continue_trace = true;
    (*hit).direct = true;

    return vec3f();
}

fn holdout_shadow(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> vec3f
{
    let sampled_sphere_direction = sample_cosine_weighted_hemisphere((*hit).normal, seed);
    let env_visibility = select(1., 0., check_occulusion_directional((*hit).position, sampled_sphere_direction));
    let sun_visiblity = select(1., .4, check_occulusion_directional((*hit).position, -sun_direction));

    let environment = get_environment((*r).direction);

    return environment * env_visibility * sun_visiblity;
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> vec3f
{
    (*hit).continue_trace = false;

    if ((*hit).object == 1)
    {
        return holdout_shadow(r, hit, seed);
    }

    switch (shader_type)
    {
        default :
        {
        }
        case 1 :
        {
            return mirror(r, hit);
        }
        case 3 :
        {
            return (*hit).diffuse;
        }
    }

    return lambertian(r, hit, seed);
}

fn get_environment(direction : vec3f) -> vec3f
{
    let uv = panoramic_to_uv(direction);

    let background = textureSampleLevel(environment_texture, environment_sampler, uv, 0.);

    let ldr = background.rgb;

    let hdr_range = background * 256;
    let hdr_exponent = hdr_range.a;
    let hdr_mapped = (hdr_range.rgb + .5) / 256 * pow(2, hdr_exponent - 128);
    let hdr = pow(hdr_mapped, vec3f(1./2.2));

    return select(ldr, hdr, hdr_flag > 0);
}

//Fragment shader

struct FSOut {
    @location(0) frame : vec4f,
    @location(1) accum : vec4f
}

@fragment
fn main_fs(@builtin(position) fragcoord : vec4f, @location(0) coords : vec2f) -> FSOut
{
    const max_depth = 10;

    let launch_idx = u32(fragcoord.y) * scene_data.canvas_width + u32(fragcoord.x);
    var t = tea(launch_idx, scene_data.frame_num);
    let jitter = vec2f(rnd(&t), rnd(&t)) / f32(scene_data.canvas_height);

    var uv = coords *.5 + jitter;

    var r : Ray;
    var hit : HitInfo;
    r = generate_ray_from_camera(uv);
    hit = generate_default_hitinfo();

    var light_result = vec3f();

    for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
    {
        if (!intersect_scene(&r, &hit))
        {
            light_result += hit.bounce_factor * get_environment(r.direction);
            break;
        }

        var light = shader(&r, &hit, &t);
        light_result += hit.bounce_factor * light;

        if (!hit.continue_trace)
        {
            break;
        };
        hit.bounce_factor = hit.path_factor;
    }

    let curr_sum = textureLoad(render_texture, vec2u(fragcoord.xy), 0).rgb * f32(scene_data.frame_num);
    let accum_color = (light_result + curr_sum) / f32(scene_data.frame_num + 1u);

    var fs_out : FSOut;
    fs_out.frame = vec4f(pow(accum_color, vec3f(1.0 / 1.25)), 1.0);
    fs_out.accum = vec4f(accum_color, 1.0);
    return fs_out;
}

//Utility

//PRNG xorshift seed generator by NVIDIA
fn tea(val0 : u32, val1 : u32) -> u32
{
    const N = 16u;  //User specified number of iterations
    var v0 = val0;
    var v1 = val1;
    var s0 = 0u;
    for(var n = 0u; n < N; n++)
    {
        s0 += 0x9e3779b9;
        v0 += ((v1<<4) + 0xa341316c)^(v1 + s0)^((v1>>5) + 0xc8013ea4);
        v1 += ((v0<<4) + 0xad90777d)^(v0 + s0)^((v0>>5) + 0x7e95761e);
    }
    return v0;
}

fn mcg31(prev : ptr < function, u32>) -> u32
{
    const LCG_A = 1977654935u;
    *prev = (LCG_A * (*prev)) & 0x7FFFFFFF;
    return * prev;
}

//Generate random float in [0, 1)
fn rnd(prev : ptr < function, u32>) -> f32
{
    return f32(mcg31(prev)) / f32(0x80000000);
}

//Given a direction vector v sampled around the z-axis of a
//local coordinate system, this function applies the same
//rotation to v as is needed to rotate the z-axis to the
//actual direction n that v should have been sampled around
//[Frisvad, Journal of Graphics Tools 16, 2012;
//Duff et al., Journal of Computer Graphics Techniques 6, 2017].
fn rotate_to_normal(normal : vec3f, v : vec3f) -> vec3f
{
    let signbit = sign(normal.z + f1en16);
    let a = -1.0f / (1.0f + abs(normal.z));
    let b = normal.x * normal.y * a;
    return vec3f(1.0f + normal.x * normal.x * a, b, -signbit * normal.x) * v.x
    + vec3f(signbit * b, signbit * (1.0f + normal.y * normal.y * a), -normal.y) * v.y
    + normal * v.z;
}

//Given spherical coordinates, where theta is the
//polar angle and phi is the azimuthal angle, this
//function returns the corresponding direction vector
fn spherical_direction(sin_theta : f32, cos_theta : f32, phi : f32) -> vec3f
{
    let sin_phi = sin(phi);
    let cos_phi = cos(phi);
    return vec3f(sin_theta * cos_phi, sin_theta * sin_phi, cos_theta);
}

fn sample_cosine_weighted_hemisphere(normal : vec3f, seed : ptr < function, u32>) -> vec3f
{
    var eps_1 = rnd(seed);
    var eps_2 = rnd(seed);

    var theta = acos(sqrt(1 - eps_1));
    var phi = 2 * PI * eps_2;

    var direction = spherical_direction(sin(theta), cos(theta), phi);

    return rotate_to_normal(normal, direction);
}

fn panoramic_to_uv(spherical : vec3f) -> vec2f
{
    var u = .5 + atan2(spherical.x, -spherical.z) / (2 * PI);
    var v = acos(-spherical.y) / PI;

    return vec2f(u, v);
}

fn angular_map(spherical : vec3f) -> vec2f
{
    let r = acos(-spherical.z) / (2 * PI * length(spherical.xy));
    var u = .5 + r * spherical.x;
    var v = .5 + r * spherical.y;

    return vec2f(u, v);
}
`,Wt="environmental",Mt="progressive-enabled-cb-"+Wt,kc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Wt),a=N(Mt,"checked"),i=N("environmental-texture-type"),{texture:o,sampler:s}=await ze(n,hn("textures/luxo_pxr_campus.jpg")),{texture:c,sampler:l}=await ze(n,hn("textures/luxo_pxr_campus.hdr.png")),d=Yn(await Hn(hn("models/teapot.obj"),1)),h=fe(d),u=me([h.vertices,h.normals]),v=new Uint32Array(h.indices);pe(v,d.matIndices,4);const m=new Float32Array(d.materials.reduce((G,J)=>[...G,...B([J.color,J.specular,J.emission,f(J.illum,J.shininess,J.ior)])],[]));let{renderSrc:_,renderDst:g,blitPingPong:x}=Ce(n,r);const w=n.createShaderModule({code:Oc}),p=n.createRenderPipeline({layout:"auto",vertex:{module:w,entryPoint:"main_vs"},fragment:{module:w,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:I}=z(n,p,[u,v,m],"STORAGE"),{bindGroup:T}=z(n,p,[h.bspPlanes,h.bspTree,h.treeIds],"STORAGE",1),{bindGroup:b,buffers:[M,S,O,P,F]}=z(n,p,[h.aabb,new Uint32Array([0,r.width,r.height]),new Uint32Array([3,0,0,0]),new Float32Array([1,0,0,0]),new Uint32Array([0,0,0,0])],"UNIFORM",2),R=n.createBindGroup({layout:p.getBindGroupLayout(3),entries:[{binding:0,resource:g.createView()},{binding:1,resource:l},{binding:2,resource:c.createView()}]}),A=n.createBindGroup({layout:p.getBindGroupLayout(3),entries:[{binding:0,resource:g.createView()},{binding:1,resource:s},{binding:2,resource:o.createView()}]});let Y=0;const en=()=>{if(!a())return;V===!0&&(V=!1,Y=0),Y+=1,zn(n,S,new Uint32Array([Y]),0);const{pass:G,encoder:J}=un(n,e,fn.black,{otherColorAttachments:[{view:_.createView(),loadOp:"load",storeOp:"store"}]});G.setPipeline(p),G.setBindGroup(0,I),G.setBindGroup(1,T),G.setBindGroup(2,b),G.setBindGroup(3,i()==="High dynamic range"?R:A),G.draw(4),G.end(),x(J),n.queue.submit([J.finish()]),requestAnimationFrame(en)};Tn(Mt,G=>{G&&requestAnimationFrame(en)},"checked");const cn=G=>{const J={"Base color":3,Lambertian:0,Mirror:1}[G];zn(n,O,new Uint32Array([J]),0)};cn(Tn("model-shader-select-env",cn));const j=G=>{Z(n,P,new Float32Array([G?1:0,0,0,0]),0)};j(Tn("include-sunlight",j,"checked"));const C=G=>{const J=G==="High dynamic range"?1:0;zn(n,F,new Uint32Array([J]),0)};C(Tn("environmental-texture-type",C));let V=!1;it("restart-progressive-env",()=>V=!0),en()},Fc=(n,e)=>{const t=on("rendering/09-environmental",["/environmental.ts","/environmental.wgsl"]),r=W("Leaking into reality"),a=D(`
A strong suit of rendering is the ability to place artifical objects into real scenes and for them to imitate the scene's lighting and environment. 
Environment maps are used to create a skybox, but in a global illumination configuration they can also be used to query the environment for lighting.

Shadows are more tricky, as they no longer have a shadow catching object. 
The skybox is just fills out the empty void beneath the model as a background color would.
To solve this "hold out" geometry is introduced. These are transparent objects which imitate objects visible in the scene (such as a plane for the ground).
They are transparent as far as they are not shaded, where they otherwise apply a semi-transparent filter over whatever it is they are imitating.
Planes are the most simply to create, but hold out geometry could be used for any shape.

HDR images work well as environmental textures as they carry a lot of information about the scene light sources. 
When using a low dynamic range map, a light source has to be modelled with the traditional setup (directional light).

Note: the environmental HDR image is very large and may take time to load into the browser and device.
`),i=nn(),o=K(Wt),s=_n(),c=k(Xn(Mt,!0),"Progressive rendering enabled",!1),l=k(Bn("model-shader-select-env",["Base color","Lambertian","Mirror"],"Lambertian"),"Model shader type",!1),d=k(Xn("include-sunlight",!0),"Sun light on",!1),h=k(Bn("environmental-texture-type",["Low dynamic range","High dynamic range"],"Low dynamic range"),"Environmental texture type",!1),u=rt("restart-progressive-env","Restart progressive");s.append(c,l,d,h,u),i.append(o,s),n.append(r,t,a,i),e.push(kc)},Mc=`struct VertexNormal {
    vertex : vec3f,
    normal : vec3f
};

struct IndexMaterial {
    indices : vec3u,
    mat : u32
};

struct Material {
    color : vec4f,
    specular : vec4f,
    emission : vec4f,
    illum_shininess_ior : vec3f
};

@group(0) @binding(0) var<storage> vertex_normals : array<VertexNormal>;
@group(0) @binding(1) var<storage> index_mats : array<IndexMaterial>;
@group(0) @binding(2) var<storage> materials : array<Material>;

@group(1) @binding(0) var<storage> bspPlanes : array<f32>;
@group(1) @binding(1) var<storage> bspTree : array<vec4u>;
@group(1) @binding(2) var<storage> treeIds : array<u32>;

struct Aabb {
    min : vec3f,
    max : vec3f,
};

struct SceneData {
    frame_num : u32,
    canvas_width : u32,
    canvas_height : u32
}

@group(2) @binding(0) var<uniform> aabb : Aabb;
@group(2) @binding(1) var<uniform> scene_data : SceneData;
@group(2) @binding(2) var<uniform> shader_type : u32;

@group(3) @binding(0) var render_texture : texture_2d<f32>;
@group(3) @binding(1) var environment_sampler : sampler;
@group(3) @binding(2) var environment_texture : texture_2d<f32>;

const MAX_LEVEL = 20u;
const BSP_LEAF = 3u;
var<private> branch_node : array<vec2u, MAX_LEVEL>;
var<private> branch_ray : array<vec2f, MAX_LEVEL>;

const sphere_refractive_index = 1.5;
const air_refractive_index = 1.;
const sphere_radius = 90;

const up = vec3f(0., 1., 0.);
const target_point = vec3f(0, 2, 0.);
const origin_point = vec3f(0, 2, 7);
const camera_constant =1;

const sun_direction = normalize(vec3f(5, -.5, -.5));
const sun_intensity = vec3f(.8, .8, .8);

const default_tmin = .01;
const default_tmax = 10000;

const f1en2 = 0.01;
const f1en4 = 0.0001;
const f1en8 = 0.00000001;
const f1en16 = 0.0000000000000001;

const PI = 3.14;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32,
    pos : vec3f
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
};

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,

    object : u32,

    dist : f32,
    position : vec3f,
    normal : vec3f,

    diffuse : vec3f,
    emission : vec3f,
    //prev_refractive : f32,
    //next_refractive : f32,

    direct : bool,
    path_factor : vec3f,
    bounce_factor : vec3f,

    background : bool,
    uv : vec2f
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    var hit_info : HitInfo;

    hit_info.depth = 0;
    hit_info.has_hit = false;
    hit_info.continue_trace = false;

    hit_info.object = 0;

    hit_info.dist = 0;
    hit_info.position = vec3f();
    hit_info.normal = vec3f();

    hit_info.diffuse = vec3f();
    hit_info.emission = vec3f();
    //hit_info.prev_refractive = 1.;
    //hit_info.next_refractive = 1.;

    hit_info.direct = true;
    hit_info.path_factor = vec3f(1);
    hit_info.bounce_factor = vec3f(1);

    hit_info.background = false;
    hit_info.uv = vec2f();

    return hit_info;
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    return construct_ray_default(origin_point, normalize(q));
}

fn construct_ray_default(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, default_tmin, default_tmax);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray_indirect : Ray;
    ray_indirect.origin = origin;
    ray_indirect.direction = direction;
    ray_indirect.tmax = tmax;
    ray_indirect.tmin = tmin;
    return ray_indirect;
}


//Intersecting objects //

fn barycentric_normal(v_ns : array<vec3f, 3 >, beta : f32, gamma : f32) -> vec3f {
    var alpha = 1 - beta - gamma;
    var interpolated_normal = alpha * v_ns[0] + beta * v_ns[1] + gamma * v_ns[2];
    return normalize(interpolated_normal);
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_mat_lookup = index_mats[face];
    var indices = vertex_mat_lookup.indices.xyz;
    var material_index = vertex_mat_lookup.mat;

    var vertex_normal_x = vertex_normals[indices.x];
    var vertex_normal_y = vertex_normals[indices.y];
    var vertex_normal_z = vertex_normals[indices.z];

    var v = array<vec3f, 3 > (vertex_normal_x.vertex, vertex_normal_y.vertex, vertex_normal_z.vertex);
    var v_ns = array<vec3f, 3> (vertex_normal_x.normal, vertex_normal_y.normal, vertex_normal_z.normal);

    var mat = materials[material_index];

    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;
    var alpha = 1 - beta - gamma;

    var normal = barycentric_normal(v_ns, beta, gamma);

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    (*hit).has_hit = (*hit).has_hit || has_hit;

    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);

    (*hit).object = select((*hit).object, 0, has_hit);

    (*hit).diffuse = select((*hit).diffuse, mat.color.rgb, has_hit);
    (*hit).emission = select((*hit).emission, mat.emission.rgb, has_hit);
    (*hit).normal = select((*hit).normal, normal, has_hit);

    return has_hit;
}

fn intersect_trimesh(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    var branch_lvl = 0u;
    var near_node = 0u;
    var far_node = 0u;
    var t = 0.0f;
    var node = 0u;
    for(var i = 0u; i <= MAX_LEVEL; i++)
    {
        let tree_node = bspTree[node];
        let node_axis_leaf = tree_node.x & 3u;
        if (node_axis_leaf == BSP_LEAF)
        {
            let node_count = tree_node.x>>2u;
            let node_id = tree_node.y;
            var found = false;

            for(var j = 0u; j < node_count; j++)
            {
                let obj_idx = treeIds[node_id + j];
                if(intersect_triangle(*r, hit, obj_idx))
                {
                    (*r).tmax = (*hit).dist;
                    found = true;
                }
            }

            if (found)
            {
                return true;
            }

            if (branch_lvl == 0u)
            {
                return false;
            }

            branch_lvl -= 1;
            i = branch_node[branch_lvl].x;
            node = branch_node[branch_lvl].y;
            (*r).tmin = branch_ray[branch_lvl].x;
            (*r).tmax = branch_ray[branch_lvl].y;

            continue;
        }
        let axis_direction = (*r).direction[node_axis_leaf];
        let axis_origin = (*r).origin[node_axis_leaf];
        if(axis_direction >= 0.0f)
        {
            near_node = tree_node.z;
            far_node = tree_node.w;
        }
        else
        {
            near_node = tree_node.w;
            far_node = tree_node.z;
        }
        let node_plane = bspPlanes[node];
        let denom = select(axis_direction, f1en8, abs(axis_direction) < f1en8);
        t = (node_plane - axis_origin) / denom;
        if(t > (*r).tmax)
        {
            node = near_node;
        }
        else if(t < (*r).tmin)
        {
            node = far_node;
        }
        else
        {
            branch_node[branch_lvl].x = i;
            branch_node[branch_lvl].y = far_node;
            branch_ray[branch_lvl].x = t;
            branch_ray[branch_lvl].y = (*r).tmax;
            branch_lvl++;
            (*r).tmax = t;
            node = near_node;
        }
    }
    return false;
}

fn intersect_min_max(r : ptr < function, Ray>) -> bool
{
    let p1 = (aabb.min - (*r).origin) / (*r).direction;
    let p2 = (aabb.max - (*r).origin) / (*r).direction;
    let pmin = min(p1, p2);
    let pmax = max(p1, p2);
    let tmin = max(pmin.x, max(pmin.y, pmin.z));
    let tmax = min(pmax.x, min(pmax.y, pmax.z));
    if(tmin > tmax || tmin > (*r).tmax || tmax < (*r).tmin)
    {
        return false;
    }
    (*r).tmin = max(tmin - f1en2, (*r).tmin);
    (*r).tmax = min(tmax + f1en2, (*r).tmax);
    return true;
}

fn intersect_plane(r : Ray, hit : ptr < function, HitInfo>) -> bool {
    const plane_position = vec3f(0);
    const plane_normal = vec3f(0, 1., 0);
    const plane_tangent = vec3f(-1, 0, 0);
    const plane_binormal = vec3f(0, 0., 1);

    var distance = dot(plane_position - r.origin, plane_normal) / dot(r.direction, plane_normal);
    var intersection = r.origin + distance * r.direction;

    var has_hit = distance > r.tmin && distance < r.tmax;

    var u = dot((intersection - plane_position), plane_tangent);
    var v = dot((intersection - plane_position), plane_binormal);

    (*hit).has_hit = (*hit).has_hit || has_hit;

    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);

    (*hit).object = select((*hit).object, 1, has_hit);
    (*hit).normal = select((*hit).normal, plane_normal, has_hit);

    return has_hit;
}

fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    (*hit).has_hit = false;

    //var hit_plane = intersect_plane(*r, hit);
    //(*r).tmax = select((*r).tmax, (*hit).dist, hit_plane);

    if (!intersect_min_max(r))
    {
        return (*hit).has_hit;
    }

    var hit_cb = intersect_trimesh(r, hit);
    (*r).tmax = select((*r).tmax, (*hit).dist, hit_cb);

    return (*hit).has_hit;
}

//Lighting


fn check_occulusion_directional(position : vec3f, direction : vec3f) -> bool
{
    const surface_offset = .1;

    var r = construct_ray(position + direction * surface_offset, direction, default_tmin, 10);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}

fn sample_sun_light(position : vec3f) -> Light {
    let env_visibility = select(1., 0., check_occulusion_directional(position, -sun_direction));

    var light : Light;
    light.L_i = sun_intensity * env_visibility;
    light.w_i = sun_direction;
    return light;
}

fn sample_environment_light(position : vec3f, direction : vec3f, seed : ptr < function, u32>) -> Light
{
    let sampled_sphere_direction = sample_cosine_weighted_hemisphere(direction, seed);
    let environment = get_environment(sampled_sphere_direction);
    let env_visibility = select(1., 0.4, check_occulusion_directional(position, sampled_sphere_direction));

    var light : Light;
    light.L_i = environment * env_visibility;
    light.w_i = direction;
    return light;
}

fn indirect_illumination(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> bool
{
    var p_reflect = ((*hit).diffuse.r + (*hit).diffuse.g + (*hit).diffuse.b) / 3;
    var event = rnd(seed);

    var absorb = event >= p_reflect;

    var sampled_sphere_direction = sample_cosine_weighted_hemisphere((*hit).normal, seed);

    (*r).origin = (*hit).position + .01 * sampled_sphere_direction;
    (*r).direction = sampled_sphere_direction;
    (*r).tmin = 0.01;
    (*r).tmax = 10000;
    (*hit).path_factor *= (*hit).diffuse / p_reflect;

    return absorb;
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> vec3f
{
    var emission = select(0., 1., (*hit).direct) * (*hit).emission;

    var absorb = indirect_illumination(r, hit, seed);
    (*hit).direct = absorb && (*hit).direct;
    (*hit).continue_trace = !absorb;

    let env_light = sample_environment_light((*hit).position, (*hit).normal, seed).L_i;

    let L_direct = (env_light) * (*hit).diffuse;

    var L_observed = emission + L_direct;
    return L_observed;
}

fn mirror(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    (*r).direction = normalize(reflect((*r).direction, (*hit).normal));
    (*r).origin = (*hit).position + (*r).direction * .01;
    (*r).tmin = default_tmin;
    (*r).tmax = default_tmax;

    (*hit).continue_trace = true;
    (*hit).direct = true;

    return vec3f();
}

fn holdout_shadow(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> vec3f
{
    let sampled_sphere_direction = sample_cosine_weighted_hemisphere((*hit).normal, seed);
    let env_visibility = select(1., 0., check_occulusion_directional((*hit).position, sampled_sphere_direction));
    //let sun_visiblity = select(1., .4, check_occulusion_directional((*hit).position, -sun_direction));

    let environment = get_environment((*r).direction);

    return environment * env_visibility;
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> vec3f
{
    (*hit).continue_trace = false;

    // if ((*hit).object == 1)
    // {
    //     return holdout_shadow(r, hit, seed);
    // }

    switch (shader_type)
    {
        default :
        {
        }
        case 1 :
        {
            return mirror(r, hit);
        }
        case 3 :
        {
            return (*hit).diffuse;
        }
    }

    return lambertian(r, hit, seed);
}

fn get_environment(direction : vec3f) -> vec3f
{
    let uv = angular_map(direction);

    let background = textureSampleLevel(environment_texture, environment_sampler, uv, 0.);

    let hdr_range = background * 256;
    let hdr_exponent = hdr_range.a;
    let hdr = (hdr_range.rgb + .5) / 256 * pow(2, hdr_exponent - 128);

    return background.rgb;
}

//Fragment shader

struct FSOut {
    @location(0) frame : vec4f,
    @location(1) accum : vec4f
}

@fragment
fn main_fs(@builtin(position) fragcoord : vec4f, @location(0) coords : vec2f) -> FSOut
{
    const max_depth = 10;

    let launch_idx = u32(fragcoord.y) * scene_data.canvas_width + u32(fragcoord.x);
    var t = tea(launch_idx, scene_data.frame_num);
    let jitter = vec2f(rnd(&t), rnd(&t)) / f32(scene_data.canvas_height);

    var uv = coords * vec2f(1, .5) + jitter;

    var r : Ray;
    var hit : HitInfo;
    r = generate_ray_from_camera(uv);
    hit = generate_default_hitinfo();

    var light_result = vec3f();

    for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
    {
        if (!intersect_scene(&r, &hit))
        {
            light_result += hit.bounce_factor * get_environment(r.direction);
            break;
        }

        var light = shader(&r, &hit, &t);
        light_result += hit.bounce_factor * light;

        if (!hit.continue_trace)
        {
            break;
        };
        hit.bounce_factor = hit.path_factor;
    }

    let curr_sum = textureLoad(render_texture, vec2u(fragcoord.xy), 0).rgb * f32(scene_data.frame_num);
    let accum_color = (light_result + curr_sum) / f32(scene_data.frame_num + 1u);

    var fs_out : FSOut;
    fs_out.frame = vec4f(pow(accum_color, vec3f(1.0 / 1.25)), 1.0);
    fs_out.accum = vec4f(accum_color, 1.0);
    return fs_out;
}

//Utility

//PRNG xorshift seed generator by NVIDIA
fn tea(val0 : u32, val1 : u32) -> u32
{
    const N = 16u;  //User specified number of iterations
    var v0 = val0;
    var v1 = val1;
    var s0 = 0u;
    for(var n = 0u; n < N; n++)
    {
        s0 += 0x9e3779b9;
        v0 += ((v1<<4) + 0xa341316c)^(v1 + s0)^((v1>>5) + 0xc8013ea4);
        v1 += ((v0<<4) + 0xad90777d)^(v0 + s0)^((v0>>5) + 0x7e95761e);
    }
    return v0;
}

fn mcg31(prev : ptr < function, u32>) -> u32
{
    const LCG_A = 1977654935u;
    *prev = (LCG_A * (*prev)) & 0x7FFFFFFF;
    return * prev;
}

//Generate random float in [0, 1)
fn rnd(prev : ptr < function, u32>) -> f32
{
    return f32(mcg31(prev)) / f32(0x80000000);
}

//Given a direction vector v sampled around the z-axis of a
//local coordinate system, this function applies the same
//rotation to v as is needed to rotate the z-axis to the
//actual direction n that v should have been sampled around
//[Frisvad, Journal of Graphics Tools 16, 2012;
//Duff et al., Journal of Computer Graphics Techniques 6, 2017].
fn rotate_to_normal(normal : vec3f, v : vec3f) -> vec3f
{
    let signbit = sign(normal.z + f1en16);
    let a = -1.0f / (1.0f + abs(normal.z));
    let b = normal.x * normal.y * a;
    return vec3f(1.0f + normal.x * normal.x * a, b, -signbit * normal.x) * v.x
    + vec3f(signbit * b, signbit * (1.0f + normal.y * normal.y * a), -normal.y) * v.y
    + normal * v.z;
}

//Given spherical coordinates, where theta is the
//polar angle and phi is the azimuthal angle, this
//function returns the corresponding direction vector
fn spherical_direction(sin_theta : f32, cos_theta : f32, phi : f32) -> vec3f
{
    let sin_phi = sin(phi);
    let cos_phi = cos(phi);
    return vec3f(sin_theta * cos_phi, sin_theta * sin_phi, cos_theta);
}

fn sample_cosine_weighted_hemisphere(normal : vec3f, seed : ptr < function, u32>) -> vec3f
{
    var eps_1 = rnd(seed);
    var eps_2 = rnd(seed);

    var theta = acos(sqrt(1 - eps_1));
    var phi = 2 * PI * eps_2;

    var direction = spherical_direction(sin(theta), cos(theta), phi);

    return rotate_to_normal(normal, direction);
}

fn angular_map(spherical : vec3f) -> vec2f
{
    let r = acos(-spherical.z) / (2 * PI * length(spherical.xy));
    var u = .5 + r * spherical.x;
    var v = .5 + r * spherical.y;

    return vec2f(u, v);
}
`,Xt="light-probes",Et="progressive-enabled-cb-"+Xt,Ec=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Xt),a=N(Et,"checked"),{texture:i,sampler:o}=await ze(n,hn("textures/burnt_warehouse.hdr.png")),s=Yn(await Hn(hn("models/teapot.obj"),1)),c=fe(s),l=me([c.vertices,c.normals]),d=new Uint32Array(c.indices);pe(d,s.matIndices,4);const h=new Float32Array(s.materials.reduce((R,A)=>[...R,...B([A.color,A.specular,A.emission,f(A.illum,A.shininess,A.ior)])],[]));let{renderSrc:u,renderDst:v,blitPingPong:m}=Ce(n,r);const _=n.createShaderModule({code:Mc}),g=n.createRenderPipeline({layout:"auto",vertex:{module:_,entryPoint:"main_vs"},fragment:{module:_,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:x}=z(n,g,[l,d,h],"STORAGE"),{bindGroup:w}=z(n,g,[c.bspPlanes,c.bspTree,c.treeIds],"STORAGE",1),{bindGroup:p,buffers:[I,T,b]}=z(n,g,[c.aabb,new Uint32Array([0,r.width,r.height]),new Uint32Array([3,0,0,0])],"UNIFORM",2),M=n.createBindGroup({layout:g.getBindGroupLayout(3),entries:[{binding:0,resource:v.createView()},{binding:1,resource:o},{binding:2,resource:i.createView()}]});let S=0;const O=()=>{if(!a())return;F===!0&&(F=!1,S=0),S+=1,zn(n,T,new Uint32Array([S]),0);const{pass:R,encoder:A}=un(n,e,fn.black,{otherColorAttachments:[{view:u.createView(),loadOp:"load",storeOp:"store"}]});R.setPipeline(g),R.setBindGroup(0,x),R.setBindGroup(1,w),R.setBindGroup(2,p),R.setBindGroup(3,M),R.draw(4),R.end(),m(A),n.queue.submit([A.finish()]),requestAnimationFrame(O)};Tn(Et,R=>{R&&requestAnimationFrame(O)},"checked");const P=R=>{const A={"Base color":3,Lambertian:0,Mirror:1}[R];zn(n,b,new Uint32Array([A]),0)};P(Tn("model-shader-select-env",P));let F=!1;it("restart-progressive-env",()=>F=!0),O()},zc=(n,e)=>{const t=on("rendering/09-environmental",["/lightProbes.ts","/lightProbes.wgsl"]),r=W("Custom light probes"),a=D(`
With the setup ready, the reapot can be placed into any environment and reflect its lighting quite well.
An HDR probe representing a burnt warehouse was selected (https://polyhaven.com/a/burnt_warehouse).

This is a dark environment with a single doorway through which sunlight comes through. The teapot is shaded from the top and front,
but elements facing the doorway are slightly lit with the bottom also lit by the reflections of light from the warehouse floor which is lit by the doorway sun rays.
`),i=nn(),o=K(Xt,{width:1028}),s=_n(),c=k(Xn(Et,!0),"Progressive rendering enabled",!1),l=k(Bn("model-shader-select-env",["Base color","Lambertian","Mirror"],"Lambertian"),"Model shader type",!1),d=rt("restart-progressive-env","Restart progressive");s.append(c,l,d),i.append(o,s),n.append(r,t,a,i),e.push(Ec)},Mi=(n,e)=>{Fc(n,e),zc(n,e)},Vc=n=>{const e=W("A quick Ted Talk about production rendering"),t=D(`
Blender Cycles is a mature rendering system with the majority of rendering features fleshed out. 
It does not come as a surprise to see Blender (Cycles) used in production environemnts.

Cycles is very easy to set up a render with. 
Any user already familiar with Blender can quickly set up a scene and tweak the material settings on scene objects to create interesting scenes. 
All the algorithms, computations and mathematical somersaults are hiden benath sliders, knobs and buttons, which makes rendering a breeze. 
The rendering process practically handles itself beyond changing some input and output parameters (such as target texture size or max bounce/ray depth count).

Much of this ease also comes from the streamlined materials configuration prepared for the user in Blender.
All of the materials are really the same shader, controlled by the same input variables. The user has to conform to this setup (and conform again after an update eventually changes things).
If the user is ready to invest in learning the Blender way of rendering, then all is well. An issue may be the grinding between mindsets of a programming-oriented shader author vs the vision of the Blender Cycles team.

A strength that custom made software via the means of direct APIs such as WebGPU is the ability to create conceptual objects. 
In Blender everything initially has to be a mesh, which makes sense when thinking of Blender as software where 3D modelling and rasterization are first class citizens.
In custom software shapes and entire scenes can be populated with beautiful mathematical algorithms - from simple primitives (planes, spheres, lines) to more complex visualizations or animations.

This observation leads to the key differentiation between Blender and a custom rendering pipeline. 
Blender Cycles is specifically dedicated to high quality rendering of static scenes. A render in Blender will likely outclass any other render in a custom pipeline. 
It is the custom pipeline, on the other hand, which give the artist to go crazy on animations, visualizations or mesh-less scenes. 
While Blender may offer features such as particle systems, sometimes complex creations may only be produced by directly interfacing the device through shaders.

Below are three renders from Blender cycles. They all share the same HDR texture environmental map (<a href="https://polyhaven.com/a/autumn_park">Autumn Park by Sergej Majboroda</a>).
The cow model is sourced from <a href="https://sketchfab.com/3d-models/cow-58d15c2d67b147d09bc5e46f0fbcb0b2">sinork123 on Sketchfab</a>.
`),r=He(hn("resources/render_mirrors.png")),a=He(hn("resources/render_ornaments.png")),i=He(hn("resources/render_cows.png"));n.append(e,t,r,a,i)},Gc=(n,e)=>{Vc(n)},Cc=`@group(0) @binding(0) var<uniform> line_thickness : f32;

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    has_hit : bool,
    dist : f32,
    position : vec3f,
    normal : vec3f,
    color : vec3f,
    shade : bool
};

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32
}

struct VertexOutput {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VertexOutput
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vo : VertexOutput;
    vo.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vo.coords = pos[VertexIndex];

    return vo;
}

fn generate_ray(uv : vec2f) -> Ray
{
    var ray : Ray;

    const up = vec3f(0., 1., 0.);
    const target_point = vec3f(0., .5, 0.);
    const origin_point = vec3f(2., 1.5, 2.);
    const camera_constant = 1.;

    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    ray.origin = origin_point;
    ray.direction = normalize(q);
    ray.tmax = 100;
    ray.tmin = 0;

    return ray;
}

struct Line {
    a : vec3f,
    b : vec3f,
    thickness : f32
}

fn intersect_line(r : Ray, hit : ptr < function, HitInfo>, line : Line) -> bool
{
    let v = r.direction * r.tmax;
    let u = line.b - line.a;

    let vxu = cross(v, u);
    let vxu_dot = dot(vxu, vxu);
    let lines_are_parallel = vxu_dot == 0;

    let t = dot(cross(line.a - r.origin, u), vxu) / vxu_dot;
    let ray_point = r.origin + t * v;

    let s = dot(cross(line.a - r.origin, v), vxu) / vxu_dot;
    let line_point = line.a + s * u;

    let d = length(line_point - ray_point);

    let has_hit = !lines_are_parallel && t >= 0 && t < 1 && s >= 0 && s <= 1 && d < line.thickness;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, t * r.tmax, has_hit);
    (*hit).color = select((*hit).color, vec3f(.9, .7, 0), has_hit);
    (*hit).position = select((*hit).position, ray_point, has_hit);
    (*hit).normal = select((*hit).normal, vec3f(0, 1, 0), has_hit);
    (*hit).shade = select((*hit).shade, false, has_hit);

    return has_hit;
}
fn intersect_plane(r : Ray, hit : ptr < function, HitInfo>, position : vec3f, normal : vec3f) -> bool {
    var intersection = dot(position - r.origin, normal) / dot(r.direction, normal);

    var has_hit = intersection > r.tmin && intersection < r.tmax;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, vec3f(.1, .7, 0.), has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normal, has_hit);
    (*hit).shade = select((*hit).shade, true, has_hit);

    return has_hit;
}
fn intersect_sphere(r : Ray, hit : ptr < function, HitInfo>, center : vec3f, radius : f32, sphere_color : vec3f) -> bool {
    const a = 1;
    var b_half = dot(r.origin - center, r.direction);
    var c = dot(r.origin - center, r.origin - center) - radius * radius;
    var b_half_2 = b_half * b_half;
    var b_half_2_c = b_half_2 - c;

    var does_intersection_exist = b_half_2_c >= 0;
    var distance = min(-b_half - sqrt(abs(b_half_2_c)), -b_half + sqrt(abs(b_half_2_c)));

    var intersection = r.origin + distance * r.direction;
    var n = normalize(intersection - center);

    var has_hit = does_intersection_exist && distance > r.tmin && distance < r.tmax;
    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).color = select((*hit).color, sphere_color, has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);
    (*hit).normal = select((*hit).normal, n, has_hit);
    (*hit).shade = select((*hit).shade, true, has_hit);

    return has_hit;
}
fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    let line = Line(vec3f(-2, .5, 0), vec3f(1.25, .5, 0), line_thickness);
    var has_hit_line = intersect_line(*r, hit, line);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_line);

    var has_hit_plane = intersect_plane(*r, hit, vec3f(0., 0., 0.), vec3f(0., 1., 0.));
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_plane);

    var has_hit_sphere = intersect_sphere(*r, hit, vec3f(0, .5, .0), .3, vec3f(.7));
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_sphere);

    return (*hit).has_hit;
}

fn sample_point_light(pos : vec3f) -> Light {
    var direction = vec3f(0, 2, 0) - pos;
    var dist = length(direction);
    var incident_light = vec3f(5., 4, 3) / (dist * dist);

    var light : Light;
    light.L_i = incident_light;
    light.w_i = direction;
    light.dist = dist;

    return light;
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    var L_emitted = vec3f(0);
    var L_ambient = vec3f(.1);

    var light_info = sample_point_light((*hit).position);
    var transformed_light = light_info.L_i * dot((*hit).normal, light_info.w_i) / 3.14;

    var L_observed = L_emitted + transformed_light + L_ambient;

    return L_observed * (*hit).color;
}

fn shade(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    return select((*hit).color, lambertian(r, hit), (*hit).shade);
}

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);
    const max_depth = 10;

    let uv = coords *.5;
    var r = generate_ray(uv);

    var result = vec3f(0.0);
    var hit = HitInfo(false, 0.0, vec3f(0.0), vec3f(0.0), vec3f(0.0), false);

    for (var i = 0; i< max_depth; i++)
    {
        if (!intersect_scene(&r, &hit))
        {
            result += backgroundColor.rgb;
            break;
        }

        result += shade(&r, &hit);

        if (hit.has_hit)
        {
            break;
        };
    }

    return vec4f(result, 1.0);
}
`,Ei="ray-line-intersection",jc=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await sn(Ei),a=an(n,[],r,Cc,"triangle-strip"),{bindGroup:i,buffers:[o]}=z(n,a,[new Float32Array([0])],"UNIFORM"),s=c=>{Z(n,o,new Float32Array([c/t.width]),0);const{pass:l,executePass:d}=un(n,e,fn.black);l.setPipeline(a),l.setBindGroup(0,i),l.draw(4),d()};s(Tn("line-thickness",s))},Uc=(n,e)=>{const t=on("rendering/debugging/",["intersection/rayLineIntersection.ts","intersection/rayLineIntersection.wgsl"]),r=W("Creating ray-line intersection"),a=D(`
Ray-line intersection is slightly more difficult to grasp than ray-plane intersection, because lines have more combinations of possible events.
It is quite difficult for two lines to actaully meet in 3D space - they have many oppurtunities not to. A better approach might be to not find the direct point of intersection,
but rather the paramters of the line for which the points on the lines are closest to each other.

The article "Intersection of two lines in three-space" by Ronald Goldman in the collection Graphics Gems (1995) describes the algorithm 
which is the computerized appraoch of solving the lienar set of equations to finding these parameters. 
It is important to remember two things - firstly, that the parameters have to stay between zero and one, that is the "intersection" is within the sections of both lines. 
Secondly, the intersection might not be an intersection at all - but a point on each line for which the distance is minimal. 
It is required to check that the distance between these two points is less than some set threshold for the thickness of the line.
    `),i=nn(),o=K(Ei),s=_n(),c=k(vn("line-thickness",4,2,32,.1),"Line thickness");s.append(c),i.append(o,s),n.append(r,t,a,i),e.push(jc)},Nc=`struct VertexNormal {
    vertex : vec3f,
    normal : vec3f
};

struct IndexMaterial {
    indices : vec3u,
    mat : u32
};

struct Material {
    color : vec4f,
    specular : vec4f,
    emission : vec4f,
    illum_shininess_ior : vec3f
};

@group(0) @binding(0) var<storage> vertex_normals : array<VertexNormal>;
@group(0) @binding(1) var<storage> index_mats : array<IndexMaterial>;
@group(0) @binding(2) var<storage> light_faces : array<u32>;
@group(0) @binding(3) var<storage> materials : array<Material>;

@group(1) @binding(0) var<storage> bspPlanes : array<f32>;
@group(1) @binding(1) var<storage> bspTree : array<vec4u>;
@group(1) @binding(2) var<storage> treeIds : array<u32>;

struct Aabb {
    min : vec3f,
    max : vec3f,
};

@group(2) @binding(0) var<uniform> aabb : Aabb;
@group(2) @binding(1) var<uniform> jitters : array<vec4f, 4>;
@group(2) @binding(2) var<uniform> mouse_uv : vec4f;
@group(2) @binding(3) var<uniform> light_indices_count : u32;
@group(2) @binding(4) var<uniform> store_line_type : u32;

struct Line {
    a : vec3f,
    b : vec3f,
}

@group(3) @binding(0) var<storage, read_write> ray_path : array<Line>;

const MAX_LEVEL = 20u;
const BSP_LEAF = 3u;
var<private> branch_node : array<vec2u, MAX_LEVEL>;
var<private> branch_ray : array<vec2f, MAX_LEVEL>;

const light_direction : vec3f = vec3f(-1.);
const light_intensity = 1.5;
const visibility = 1.;

const sphere_refractive_index = 1.5;
const air_refractive_index = 1.;

const up = vec3f(0., 1., 0.);
const target_point = vec3f(277., 275., 0.);
const origin_point = vec3f(277., 275., -570.);
const camera_constant = 1;

const default_tmax = 2000;

const f1en2 = 0.01;
const f1en4 = 0.0001;
const f1en8 = 0.00000001;

const max_depth = 10;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32,
    pos : vec3f
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
};

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,

    dist : f32,
    position : vec3f,
    normal : vec3f,

    object : u32,
    color : vec3f,

    diffuse : f32,
    specular : f32,
    shininess : f32,
    prev_refractive : f32,
    next_refractive : f32,
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    return HitInfo(0, false, false, 0., vec3f(0.), vec3f(0.), 0, vec3f(0.), 1., 1., 1., 1, 1);
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    return construct_ray_default(origin_point, normalize(q));
}

fn construct_ray_default(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, .01, default_tmax);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray : Ray;
    ray.origin = origin;
    ray.direction = direction;
    ray.tmax = tmax;
    ray.tmin = tmin;
    return ray;
}


//Intersecting objects //

fn barycentric_normal(v_ns : array<vec3f, 3 >, beta : f32, gamma : f32) -> vec3f {
    var alpha = 1 - beta - gamma;
    var interpolated_normal = alpha * v_ns[0] + beta * v_ns[1] + gamma * v_ns[2];
    return normalize(interpolated_normal);
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_mat_lookup = index_mats[face];
    var indices = vertex_mat_lookup.indices.xyz;
    var material_index = vertex_mat_lookup.mat;

    var vertex_normal_x = vertex_normals[indices.x];
    var vertex_normal_y = vertex_normals[indices.y];
    var vertex_normal_z = vertex_normals[indices.z];

    var v = array<vec3f, 3 > (vertex_normal_x.vertex, vertex_normal_y.vertex, vertex_normal_z.vertex);
    var v_ns = array<vec3f, 3> (vertex_normal_x.normal, vertex_normal_y.normal, vertex_normal_z.normal);

    var mat = materials[material_index];

    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var normal = n;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    var color = mat.color + mat.emission;

    (*hit).has_hit = (*hit).has_hit || has_hit;

    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(normal), has_hit);

    (*hit).object = select((*hit).object, 0, has_hit);
    (*hit).color = select((*hit).color, color.rgb, has_hit);

    return has_hit;
}

fn intersect_trimesh(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    var branch_lvl = 0u;
    var near_node = 0u;
    var far_node = 0u;
    var t = 0.0f;
    var node = 0u;
    for(var i = 0u; i <= MAX_LEVEL; i++)
    {
        let tree_node = bspTree[node];
        let node_axis_leaf = tree_node.x & 3u;
        if (node_axis_leaf == BSP_LEAF)
        {
            let node_count = tree_node.x>>2u;
            let node_id = tree_node.y;
            var found = false;

            for(var j = 0u; j < node_count; j++)
            {
                let obj_idx = treeIds[node_id + j];
                if(intersect_triangle(*r, hit, obj_idx))
                {
                    (*r).tmax = (*hit).dist;
                    found = true;
                }
            }

            if (found)
            {
                return true;
            }

            if (branch_lvl == 0u)
            {
                return false;
            }

            branch_lvl -= 1;
            i = branch_node[branch_lvl].x;
            node = branch_node[branch_lvl].y;
            (*r).tmin = branch_ray[branch_lvl].x;
            (*r).tmax = branch_ray[branch_lvl].y;

            continue;
        }
        let axis_direction = (*r).direction[node_axis_leaf];
        let axis_origin = (*r).origin[node_axis_leaf];
        if(axis_direction >= 0.0f)
        {
            near_node = tree_node.z;
            far_node = tree_node.w;
        }
        else
        {
            near_node = tree_node.w;
            far_node = tree_node.z;
        }
        let node_plane = bspPlanes[node];
        let denom = select(axis_direction, f1en8, abs(axis_direction) < f1en8);
        t = (node_plane - axis_origin) / denom;
        if(t > (*r).tmax)
        {
            node = near_node;
        }
        else if(t < (*r).tmin)
        {
            node = far_node;
        }
        else
        {
            branch_node[branch_lvl].x = i;
            branch_node[branch_lvl].y = far_node;
            branch_ray[branch_lvl].x = t;
            branch_ray[branch_lvl].y = (*r).tmax;
            branch_lvl++;
            (*r).tmax = t;
            node = near_node;
        }
    }
    return false;
}

fn intersect_min_max(r : ptr < function, Ray>) -> bool
{
    let p1 = (aabb.min - (*r).origin) / (*r).direction;
    let p2 = (aabb.max - (*r).origin) / (*r).direction;
    let pmin = min(p1, p2);
    let pmax = max(p1, p2);
    let tmin = max(pmin.x, max(pmin.y, pmin.z));
    let tmax = min(pmax.x, min(pmax.y, pmax.z));
    if(tmin > tmax || tmin > (*r).tmax || tmax < (*r).tmin)
    {
        return false;
    }
    (*r).tmin = max(tmin - f1en2, (*r).tmin);
    (*r).tmax = min(tmax + f1en2, (*r).tmax);
    return true;
}


fn intersect_sphere(r : Ray, hit : ptr < function, HitInfo>, object : u32, center : vec3f, radius : f32) -> bool {

    var from_center = r.origin - center;
    var b_half = dot(from_center, r.direction);
    var c = dot(from_center, from_center) - radius * radius;
    var b_half_2_c = b_half * b_half - c;

    var does_intersection_exist = b_half_2_c >= 0;

    var distance_1 = -b_half - sqrt(abs(b_half_2_c));
    var distance_2 = -b_half + sqrt(abs(b_half_2_c));
    var distance_1_in_range = distance_1 >= r.tmin && distance_1 <= r.tmax;
    var distance_2_in_range = distance_2 >= r.tmin && distance_2 <= r.tmax;

    var min_distance = min(distance_1, distance_2);
    var distance = select(distance_2, select(distance_1, min_distance, distance_2_in_range), distance_1_in_range);

    var intersection = r.origin + distance * r.direction;
    var n = normalize(intersection - center);

    var is_intersection_from_inside = dot(n, r.direction) > 0;
    var next_refr_index = select(sphere_refractive_index, air_refractive_index, is_intersection_from_inside);
    var context_n = select(n, -n, is_intersection_from_inside);

    var has_hit = does_intersection_exist && distance >= r.tmin && distance <= r.tmax;
    (*hit).has_hit = (*hit).has_hit || has_hit;

    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);

    (*hit).object = select((*hit).object, object, has_hit);
    (*hit).normal = select((*hit).normal, context_n, has_hit);

    (*hit).prev_refractive = select((*hit).prev_refractive, (*hit).next_refractive, has_hit && object == 2);
    (*hit).next_refractive = select((*hit).next_refractive, next_refr_index, has_hit && object == 2);

    return has_hit;
}

fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    (*hit).has_hit = false;

    const mirror_material = 1;
    const refractive_material = 2;

    (*r).tmax = select((*r).tmax, (*hit).dist, intersect_sphere(*r, hit, refractive_material, vec3f(230, 120, 70), 90));
    (*r).tmax = select((*r).tmax, (*hit).dist, intersect_sphere(*r, hit, refractive_material, vec3f(400, 90, 150), 45));
    (*r).tmax = select((*r).tmax, (*hit).dist, intersect_sphere(*r, hit, refractive_material, vec3f(400, 90, 250), 65));

    (*r).tmax = select((*r).tmax, (*hit).dist, intersect_sphere(*r, hit, mirror_material, vec3f(230, 66, 350), 40));

    if (!intersect_min_max(r))
    {
        return (*hit).has_hit;
    }

    let hit_cb = intersect_trimesh(r, hit);
    (*r).tmax = select((*r).tmax, (*hit).dist, hit_cb);

    return (*hit).has_hit;
}

        //Lighting

fn get_area_light_center() -> vec3f
{
    var center_light_position = vec3f(0.);
    for (var i : u32 = 0; i < light_indices_count; i++)
    {
        var vertex_mat_lookup = index_mats[light_faces[i]];
        var indices = vertex_mat_lookup.indices.xyz;

        var vertex_0 = vertex_normals[indices.x].vertex;
        var vertex_1 = vertex_normals[indices.y].vertex;
        var vertex_2 = vertex_normals[indices.z].vertex;

        center_light_position += vertex_0 + vertex_1 + vertex_2;
    }
    center_light_position /= f32(light_indices_count * 3);
    return center_light_position;
}

fn calculate_area_light_intensity(direction : vec3f) -> vec3f
{
    var intensity = vec3f(0.);
    for (var i : u32 = 0; i < light_indices_count; i++)
    {
        var vertex_mat_lookup = index_mats[light_faces[i]];
        var indices = vertex_mat_lookup.indices.xyz;
        var material_index = vertex_mat_lookup.mat;
        var mat = materials[material_index];

        var vertex_0 = vertex_normals[indices.x].vertex;
        var vertex_1 = vertex_normals[indices.y].vertex;
        var vertex_2 = vertex_normals[indices.z].vertex;

        var e0 = vertex_1 - vertex_0;
        var e1 = vertex_2 - vertex_0;
        var n = cross(e0, e1);
        var area = length(n) / 2;

        intensity += max(0, dot(-direction, normalize(n))) * mat.emission.rgb * area;
    }

    return intensity;
}

fn sample_area_light(pos : vec3f) -> Light
{
    var area_light_center = get_area_light_center();

    var line = area_light_center - pos;
    var dist = length(line);
    var direction = line / dist;

    var incident_light = calculate_area_light_intensity(direction) / (dist * dist);

    return Light(vec3f(incident_light), normalize(direction), dist, area_light_center);
}

fn check_occulusion(position : vec3f, light : vec3f) -> bool
{
    const surface_offset = .01;

    var line = light - position;
    var direction = normalize(line);
    var distance = length(line) - surface_offset;

    var r = construct_ray(position, direction, surface_offset, distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}


fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_area_light((*hit).position);
    var lambertian_light = ((*hit).diffuse / 3.14) * visibility * max(0, dot((*hit).normal, light_info.w_i)) * light_info.L_i;

    var is_occluded = check_occulusion((*hit).position, light_info.pos);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1;
    var L_reflected = .9 * lambertian_light * occlusion_modifier;
    var L_observed = L_ambient + L_reflected;

    return LightResult(L_observed, vec3f(0));
}

fn mirror(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    (*r).direction = normalize(reflect((*r).direction, (*hit).normal));
    (*r).origin = (*hit).position;
    (*r).tmax = default_tmax;
    (*r).tmin = .01;

    (*hit).continue_trace = true;

    return LightResult(vec3f(1.), vec3f(0));
}

fn refractive(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var ni_nt = (*hit).prev_refractive / (*hit).next_refractive;

    var incident = -(*r).direction;
    var r_n_dot = dot(incident, (*hit).normal);

    var t_sin = ni_nt * (r_n_dot * (*hit).normal - incident);
    var cos2 = 1 - ni_nt * ni_nt * (1 - r_n_dot * r_n_dot);
    var direction = t_sin - (*hit).normal * sqrt(abs(cos2));

    var is_reflected = cos2 < 0;
    var reflected_direction = reflect((*r).direction, (*hit).normal);

    (*r).direction = normalize(select(direction, reflected_direction, is_reflected));
    (*r).origin = (*hit).position + .1 * (*r).direction;
    (*r).tmin = .01;
    (*r).tmax = default_tmax;

    (*hit).continue_trace = true;

    return LightResult(vec3f(1), vec3f(0));
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    (*hit).continue_trace = false;

    switch ((*hit).object)
    {
        default :
        {
        }
        case 1 :
        {
            return mirror(r, hit);
        }
        case 2 :
        {
            return refractive(r, hit);
        }
    }

    return lambertian(r, hit);
}

//Fragment shader

fn render(coords : vec2f) -> vec4f
{
    const jitter_count = 4;
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);

    var light_result : LightResult;
    var r : Ray;
    var hit : HitInfo;

    var colors = array<vec3f, 4 > ();
    var lights = array<LightResult, 4 > ();

    for (var i = 0; i < jitter_count; i++)
    {
        var uv = coords + jitters[i].xy;
        r = generate_ray_from_camera(uv);
        hit = generate_default_hitinfo();
        light_result = LightResult(vec3f(1), vec3f(0));

        for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
        {
            if (!intersect_scene(&r, &hit))
            {
                hit.color += backgroundColor.rgb;

                if (i == 0 && is_mouse_pixel(uv+.5))
                {
                    hit.position = r.origin + r.direction * r.tmax;
                    store_line(r, hit);
                }
                break;
            }

            if (i == 0 && is_mouse_pixel(uv+.5))
            {
                store_line(r, hit);
            }

            var next_light_result = shader(&r, &hit);
            light_result.additive += next_light_result.additive;
            light_result.multiplicative *= next_light_result.multiplicative;

            if (!hit.continue_trace)
            {
                break;
            };
        }

        colors[i] = hit.color;
        lights[i] = light_result;
    }

    var final_result = vec3f();
    var j : i32;
    for (j = 0; j < jitter_count; j++)
    {
        var substrata_result = lights[j].multiplicative * colors[j] + lights[j].additive;
        final_result += substrata_result / f32(jitter_count);
    }

    return vec4f(pow(final_result, vec3f(1.0 / 1.25)), 1.0);
}

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    return render(coords*.5);
}

//DEBUG

fn is_mouse_pixel(coords01 : vec2f) -> bool
{
    return length(round(mouse_uv.xy * 512) - round(coords01 * 512)) <= .0;
}

fn store_line(ray : Ray, hit : HitInfo)
{
    if (store_line_type == 1 && hit.depth >0)
    {
        return;
    }

    let line_a = select(ray.origin, hit.position, store_line_type == 1);
    let line_b = select(hit.position, hit.position + 100 * hit.normal, store_line_type == 1);

    ray_path[hit.depth] = Line(line_a, line_b);
}
`,Dc=`struct Line {
    a : vec3f,
    b : vec3f,
}

@group(0) @binding(0) var<storage, read> ray_path : array<Line>;

const light_direction : vec3f = vec3f(-1.);
const light_intensity = 1.5;
const visibility = 1.;

const sphere_refractive_index = 1.5;
const air_refractive_index = 1.;
const sphere_radius = 90;

const up = vec3f(0., 1., 0.);
const target_point = vec3f(277., 275., 0.);
const origin_point = vec3f(277., 275., -570.);
const camera_constant = 1;

const default_tmax = 2000;

const f1en2 = 0.01;
const f1en4 = 0.0001;
const f1en8 = 0.00000001;

const max_depth = 10;

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    return construct_ray_default(origin_point, normalize(q));
}

fn construct_ray_default(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, .01, default_tmax);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray : Ray;
    ray.origin = origin;
    ray.direction = direction;
    ray.tmax = tmax;
    ray.tmin = tmin;
    return ray;
}

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    return debug(.5 * coords);
}

fn intersect_line(r : Ray, line : Line) -> vec4f
{
    const thickness = 5.;

    let v = r.direction * default_tmax;
    let u = line.b.xyz - line.a.xyz;

    let u_has_length = length(u) > 0;

    let vxu = cross(v, u);
    let vxu_dot = dot(vxu, vxu);
    let lines_are_not_parallel = abs(vxu_dot) > 0;

    let t = dot(cross(line.a.xyz - r.origin, u), vxu) / (vxu_dot);
    let ray_point = r.origin + t * v;

    let s = dot(cross(line.a.xyz - r.origin, v), vxu) / (vxu_dot);
    let line_point = line.a.xyz + s * u;

    let d = length(line_point - ray_point);

    let is_inside_ray_section = t >= r.tmin && t <= 1;
    let is_inside_line_section = s >= 0 && s <= 1;
    let is_intersection_close_enough = d < thickness;

    let not_is_in_camera = length(line.a - r.origin) >0 &&length(line.b - r.origin) >0;

    let did_hit = not_is_in_camera && u_has_length && lines_are_not_parallel && is_inside_ray_section && is_inside_line_section && is_intersection_close_enough;

    let color = vec4f(select(0, clamp(1-s, .5, 1), did_hit), 0, 0, select(0, 1., did_hit));

    return color;
}

fn debug(coords : vec2f) -> vec4f
{
    const opacity = 1.0;

    var r = generate_ray_from_camera(coords);

    var color = vec4f(0);
    for (var i = 0; i < max_depth; i++)
    {
        let line = ray_path[i];
        color += f32(max_depth - i*2) / max_depth * intersect_line(r, line);
    }

    return color;
}
`,tt="path-following",Hc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(tt),a=n.createShaderModule({code:Nc}),i=n.createRenderPipeline({layout:"auto",vertex:{module:a,entryPoint:"main_vs",buffers:[]},fragment:{module:a,entryPoint:"main_fs",targets:[{format:t}]},primitive:{topology:"triangle-strip"}}),o=document.getElementById(tt+"-overlay"),s=o.getContext("gpupresent")||o.getContext("webgpu");s.configure({device:n,format:t,alphaMode:"premultiplied"});const c=n.createShaderModule({code:Dc}),l=n.createRenderPipeline({layout:"auto",vertex:{module:c,entryPoint:"main_vs",buffers:[]},fragment:{module:c,entryPoint:"main_fs",targets:[{format:t}]},primitive:{topology:"triangle-strip"}}),d=Yn(await Hn(hn("models/CornellBox.obj"))),h=fe(d),u=me([h.vertices,h.normals]),v=new Uint32Array(h.indices);pe(v,d.matIndices,4);const m=new Uint32Array(d.lightIndices),_=new Float32Array(d.materials.reduce((C,V)=>[...C,...B([V.color,V.specular,V.emission,f(V.illum,V.shininess,V.ior)])],[])),{bindGroup:g}=z(n,i,[u,v,m,_],"STORAGE"),{bindGroup:x}=z(n,i,[h.bspPlanes,h.bspTree,h.treeIds],"STORAGE",1),w=Dt(r.height,2),{bindGroup:p,buffers:[I,T,b,M,S]}=z(n,i,[h.aabb,new Float32Array(B(w.map(C=>f(...C,0,0)))),new Float32Array([.67,.18,0,0]),new Uint32Array([m.length]),new Uint32Array([0])],"UNIFORM",2),O=10,P=n.createBuffer({size:Rn.float32x4*2*O,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),F=n.createBuffer({size:Rn.float32x4*2*O,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),R=n.createBindGroup({layout:i.getBindGroupLayout(3),entries:[{binding:0,resource:{buffer:P}}]}),A=n.createBindGroup({layout:l.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:P}}]}),Y=async()=>{if(F.mapState!=="unmapped")return;await F.mapAsync(GPUMapMode.READ);const C=new Float32Array(F.getMappedRange());for(let V=0;V<C.length;V+=4*2)console.info("[ray path details] ray no.",V/8),console.info("ray line start (a)",C.slice(V,V+4)),console.info("ray line end (b)",C.slice(V+4,V+8));F.unmap()},en=()=>{const C=n.createCommandEncoder();C.clearBuffer(P);const V=C.beginRenderPass({colorAttachments:[{view:e.getCurrentTexture().createView(),loadOp:"clear",clearValue:fn.black,storeOp:"store"}]});V.setPipeline(i),V.setBindGroup(0,g),V.setBindGroup(1,x),V.setBindGroup(2,p),V.setBindGroup(3,R),V.draw(4),V.end();const G=C.beginRenderPass({colorAttachments:[{view:s.getCurrentTexture().createView(),loadOp:"clear",clearValue:fn.transparent,storeOp:"store"}]});G.setPipeline(l),G.setBindGroup(0,A),G.draw(4),G.end(),F.mapState==="unmapped"&&C.copyBufferToBuffer(P,0,F,0,P.size),n.queue.submit([C.finish()]),Y()};requestAnimationFrame(en);const cn=N("ray-store-type"),j=C=>{const V=cn()==="Normal"?1:0;zn(n,S,new Uint32Array([V]),0);const G=C.x/r.width,J=1-C.y/r.height;Z(n,b,new Float32Array([G,J,0,0]),0),requestAnimationFrame(en)};Ye("path-following",{onMove:j,onStart:j},{})},qc=(n,e)=>{const t=on("rendering/debugging/",["path/pathFollowing.ts","path/pathFollowing.wgsl","path/drawDebugRays.wgsl"]),r=K(tt),a=K(tt+"-overlay",{overlay:!0}),i=Hi();i.append(r,a);const o=nn(),s=_n(),c=k(Bn("ray-store-type",["Path","Normal"]),"Attribute to store",!1);s.append(c),o.append(i,s);const l=W("Following along"),d=D(`
I consider myself a visual learner - seeing is not only believing, but understanding. 
The building block of the rendering system is the ray and when the system becomes complicated, with many points at which a ray may continue its path it is easy to lose conceptual sight of the ray and its whereabouts.
There are still those who are confused when they see the inverted image of a glass ball and consider it a defect.

The ability to view the path a ray goes through may be a boon to those looking to debug a scene with many funky materials. 
Having already defined ray-line intersection in the previous part, we are ready to implement an overlay canvas which shows the rays of interest.

In the below example there are four spheres. Two refractive spheres to the left and one refractive with a mirror sphere hidden behind it to the right. 
Clicking on the canvas will show the path a ray takes from that coordinate on the image plane. 
The rays have a gradient applied to indicate their start and end, and each next depth is slightly less opaque. 
The rays are also logged to the browser console.

This system was implemented with ease of use in mind - as a plug and play solution. 
While not perfect, it does achieve the primary goal of not affecting the original render and using the results in the primary render as the generator for the debug (what you see is what you get).

During each render, a given pixel will check if it is the selected (clicked on pixel, where the distance to the mouse pixel is zero). 
If it is the mouse pixel, it will record each ray as a line from the ray origin to the intersection point (hit position) for every depth until either the ray is absorbed or the background is reached.
The lines are written to a write-enabled storage buffer. Apart from this, the original render shader executes as usual.

After the render pass ends, a debug pass is started. The target for this pass is a transparent canvas overlayed on top of the render canvas. 
The same camera configuration is used, but instead of intersecting the scene, the camera rays only intersect with the debug lines stored in the same storage buffer as before.
Here their configuration may be set to adjust their thickness, color and depth variation. 
The ray-line intersection has a few additional modifications applied among which the crucial one is camera ray detection to cancel that intersection. 
Intersection a line directly in the camera results in the entire image plane obstructed. 

Once the process restarts (a new render is requested), the ray lines storage buffer must be cleared to properly display shorter paths without showing the latter parts of previous longer paths.

Of course, any meaningful vector may be displayed with this method. Ray paths were of personal interest to the author, 
but another useful attribute which can be easily plugged into this algorithm are surface normals (limited to a depth of one). 
The use of a storage buffer also enables access to the ray path inside the CPU where it may be used for further debugging or as a part of an interactive simulation.
In this example the rays are simply printed to the console for further analysis.

`),h=D(`
Initially the appraoch was to do both the original render and debug render inside the same shader, using the same write-enabled storage buffer.
The implementation ran into interesting issues with corrupted data - or rather - a race condition with desynchronized wavefronts reaching the debug draw section before others were finished.
The end result can be seen in the image below. The debug canvas (in white) would only update in rows of chunks from the bottom right to left and up until the location of the mouse coordinate.
`),u=He(hn("resources/storage_buffer_issue.png")),v=D(`
Setting the external overlay debug canvas in the end made more sense anyway, as the overlay should be easily disabled or removed - and the shader for the ray intersection as an entirely different entity helps with decoupling production code from development code.

An extension to drawing rays would be their inclusion in progressive rendering in the form of displaying one of the paths taken by a ray at that coordinate and refreshing every few seconds.
`);n.append(l,t,d,o,h,u,v),e.push(Hc)},$c=`struct VertexNormal {
    vertex : vec3f,
    normal : vec3f
};

struct IndexMaterial {
    indices : vec3u,
    mat : u32
};

struct Material {
    color : vec4f,
    specular : vec4f,
    emission : vec4f,
    illum_shininess_ior : vec3f
};

@group(0) @binding(0) var<storage> vertex_normals : array<VertexNormal>;
@group(0) @binding(1) var<storage> index_mats : array<IndexMaterial>;
@group(0) @binding(2) var<storage> light_faces : array<u32>;
@group(0) @binding(3) var<storage> materials : array<Material>;
@group(0) @binding(4) var<storage> bspPlanes : array<f32>;
@group(0) @binding(5) var<storage> bspTree : array<vec4u>;
@group(0) @binding(6) var<storage> treeIds : array<u32>;

@group(1) @binding(0) var renderTexture : texture_2d<f32>;

struct Aabb {
    min : vec3f,
    max : vec3f,
};

struct SceneData {
    frame_num : u32,
    canvas_width : u32,
    canvas_height : u32
}

@group(2) @binding(0) var<uniform> aabb : Aabb;
@group(2) @binding(1) var<uniform> light_indices_count : u32;
@group(2) @binding(2) var<uniform> scene_data : SceneData;

@group(3) @binding(0) var<storage, read_write> debug_canvas : array<vec4f>;

const MAX_LEVEL = 20u;
const BSP_LEAF = 3u;
var<private> branch_node : array<vec2u, MAX_LEVEL>;
var<private> branch_ray : array<vec2f, MAX_LEVEL>;

const background_color = vec4f(0.1, 0.3, 0.6, 1.0);

const light_direction : vec3f = vec3f(-1.);
const light_intensity = 1.5;
const visibility = 1.;
const up = vec3f(0., 1., 0.);

const target_point = vec3f(277., 275., 0.);
const origin_point = vec3f(277., 275., -570.);
const camera_constant = 1;

const f1en2 = 0.01;
const f1en4 = 0.0001;
const f1en8 = 0.00000001;
const f1en16 = 0.0000000000000001;

const PI = 3.14;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32,
    pos : vec3f
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
};

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,

    dist : f32,
    position : vec3f,
    normal : vec3f,

    diffuse : vec3f,
    emission : vec3f,

    direct : bool,
    path_factor : vec3f,
    bounce_factor : vec3f
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    var hit_info : HitInfo;

    hit_info.depth = 0;
    hit_info.has_hit = false;
    hit_info.continue_trace = false;

    hit_info.dist = 0;
    hit_info.position = vec3f();
    hit_info.normal = vec3f();

    hit_info.diffuse = vec3f();
    hit_info.emission = vec3f();

    hit_info.direct = true;
    hit_info.path_factor = vec3f(1);
    hit_info.bounce_factor = vec3f(1);

    return hit_info;
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    return construct_ray_default(origin_point, normalize(q));
}

fn construct_ray_default(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, .01, 10000);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray_indirect : Ray;
    ray_indirect.origin = origin;
    ray_indirect.direction = direction;
    ray_indirect.tmax = tmax;
    ray_indirect.tmin = tmin;
    return ray_indirect;
}

//Intersecting objects //

fn barycentric_normal(v_ns : array<vec3f, 3 >, beta : f32, gamma : f32) -> vec3f {
    var alpha = 1 - beta - gamma;
    var interpolated_normal = alpha * v_ns[0] + beta * v_ns[1] + gamma * v_ns[2];
    return normalize(interpolated_normal);
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_mat_lookup = index_mats[face];
    var indices = vertex_mat_lookup.indices.xyz;
    var material_index = vertex_mat_lookup.mat;

    var vertex_normal_x = vertex_normals[indices.x];
    var vertex_normal_y = vertex_normals[indices.y];
    var vertex_normal_z = vertex_normals[indices.z];

    var v = array<vec3f, 3 > (vertex_normal_x.vertex, vertex_normal_y.vertex, vertex_normal_z.vertex);
    var v_ns = array<vec3f, 3> (vertex_normal_x.normal, vertex_normal_y.normal, vertex_normal_z.normal);

    var mat = materials[material_index];

    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var normal = n;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    (*hit).has_hit = (*hit).has_hit || has_hit;

    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(normal), has_hit);

    (*hit).diffuse = select((*hit).diffuse, mat.color.rgb, has_hit);
    (*hit).emission = select((*hit).emission, mat.emission.rgb, has_hit);

    return has_hit;
}

fn intersect_trimesh(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    var branch_lvl = 0u;
    var near_node = 0u;
    var far_node = 0u;
    var t = 0.0f;
    var node = 0u;
    for(var i = 0u; i <= MAX_LEVEL; i++)
    {
        let tree_node = bspTree[node];
        let node_axis_leaf = tree_node.x & 3u;
        if (node_axis_leaf == BSP_LEAF)
        {
            let node_count = tree_node.x>>2u;
            let node_id = tree_node.y;
            var found = false;

            for(var j = 0u; j < node_count; j++)
            {
                let obj_idx = treeIds[node_id + j];
                if(intersect_triangle(*r, hit, obj_idx))
                {
                    (*r).tmax = (*hit).dist;
                    found = true;
                }
            }

            if (found)
            {
                return true;
            }

            if (branch_lvl == 0u)
            {
                return false;
            }

            branch_lvl -= 1;
            i = branch_node[branch_lvl].x;
            node = branch_node[branch_lvl].y;
            (*r).tmin = branch_ray[branch_lvl].x;
            (*r).tmax = branch_ray[branch_lvl].y;

            continue;
        }
        let axis_direction = (*r).direction[node_axis_leaf];
        let axis_origin = (*r).origin[node_axis_leaf];
        if(axis_direction >= 0.0f)
        {
            near_node = tree_node.z;
            far_node = tree_node.w;
        }
        else
        {
            near_node = tree_node.w;
            far_node = tree_node.z;
        }
        let node_plane = bspPlanes[node];
        let denom = select(axis_direction, f1en8, abs(axis_direction) < f1en8);
        t = (node_plane - axis_origin) / denom;
        if(t > (*r).tmax)
        {
            node = near_node;
        }
        else if(t < (*r).tmin)
        {
            node = far_node;
        }
        else
        {
            branch_node[branch_lvl].x = i;
            branch_node[branch_lvl].y = far_node;
            branch_ray[branch_lvl].x = t;
            branch_ray[branch_lvl].y = (*r).tmax;
            branch_lvl++;
            (*r).tmax = t;
            node = near_node;
        }
    }
    return false;
}

fn intersect_min_max(r : ptr < function, Ray>) -> bool
{
    let p1 = (aabb.min - (*r).origin) / (*r).direction;
    let p2 = (aabb.max - (*r).origin) / (*r).direction;
    let pmin = min(p1, p2);
    let pmax = max(p1, p2);
    let tmin = max(pmin.x, max(pmin.y, pmin.z));
    let tmax = min(pmax.x, min(pmax.y, pmax.z));
    if(tmin > tmax || tmin > (*r).tmax || tmax < (*r).tmin)
    {
        return false;
    }
    (*r).tmin = max(tmin - f1en2, (*r).tmin);
    (*r).tmax = min(tmax + f1en2, (*r).tmax);
    return true;
}


fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    if (!intersect_min_max(r))
    {
        return false;
    }

    (*hit).has_hit = false;

    return intersect_trimesh(r, hit);
}

        //Lighting

fn check_occulusion(position : vec3f, light : vec3f) -> bool
{
    const surface_offset = .01;

    var line = light - position;
    var direction = normalize(line);
    var distance = length(line) - surface_offset;

    var r = construct_ray(position, direction, surface_offset, distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}

fn sample_area_light(pos : vec3f, seed : ptr < function, u32>) -> Light
{
    var index_mat = index_mats[light_faces[u32(floor(rnd(seed) * f32(light_indices_count)))]];
    var triangle_index = index_mat.indices;
    var mat = materials[index_mat.mat];

    var vertex_normal_0 = vertex_normals[triangle_index.x];
    var vertex_normal_1 = vertex_normals[triangle_index.y];
    var vertex_normal_2 = vertex_normals[triangle_index.z];

    var position_sample_1 = rnd(seed);
    var position_sample_2 = rnd(seed);

    var a = 1 - sqrt(position_sample_1);
    var b = (1 - position_sample_2) * sqrt(position_sample_1);
    var c = position_sample_2 * sqrt(position_sample_1);

    var sampled_vertex = a * vertex_normal_0.vertex + b * vertex_normal_1.vertex + c * vertex_normal_2.vertex;
    var sampled_normal = normalize(a * vertex_normal_0.normal + b * vertex_normal_1.normal + c * vertex_normal_2.normal);

    var line = sampled_vertex - pos;
    var dist = length(line);
    var direction = line / dist;

    var e0 = vertex_normal_1.vertex - vertex_normal_0.vertex;
    var e1 = vertex_normal_2.vertex - vertex_normal_0.vertex;
    var n = cross(e0, e1);
    var area = length(n) / 2;

    var Le = mat.emission.rgb;
    var visibility = select(1., 0., check_occulusion(pos, sampled_vertex));
    var keplers = max(0, dot(sampled_normal, direction)) / (dist * dist);
    var n_tri = f32(light_indices_count);

    var L = Le * visibility * n_tri * area * keplers;

    var light : Light;
    light.pos = sampled_vertex;
    light.w_i = direction;
    light.L_i = L;
    light.dist = dist;

    return light;
}

fn indirect_illumination(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> bool
{
    var p_reflect = ((*hit).diffuse.r + (*hit).diffuse.g + (*hit).diffuse.b) / 3;
    var event = rnd(seed);

    var absorb = event >= p_reflect;

    var sampled_sphere_direction = sample_cosine_weighted_hemisphere((*hit).normal, seed);

    (*r).origin = (*hit).position + .01 * sampled_sphere_direction;
    (*r).direction = sampled_sphere_direction;
    (*r).tmin = 0.01;
    (*r).tmax = 10000;
    (*hit).path_factor *= (*hit).diffuse / p_reflect;

    return absorb;
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> vec3f
{
    var emission = select(0., 1., (*hit).direct) * (*hit).emission;

    var absorb = indirect_illumination(r, hit, seed);
    (*hit).direct = absorb && (*hit).direct;
    (*hit).continue_trace = !absorb;

    var light_info = sample_area_light((*hit).position, seed);
    var L_direct = max(0, dot((*hit).normal, light_info.w_i)) * light_info.L_i * (*hit).diffuse / PI;

    var L_observed = emission + L_direct;

    if ((*hit).depth == 0)
    {
        store_debug_value(vec4f(abs((*hit).normal), 1));
    }

    return L_observed;
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> vec3f
{
    var lambertian = lambertian(r, hit, seed);
    return lambertian;
}

//Fragment shader

struct FSOut {
    @location(0) frame : vec4f,
    @location(1) accum : vec4f
}

var<private> fragment_uv : vec2f;

@fragment
fn main_fs(@builtin(position) fragcoord : vec4f, @location(0) coords : vec2f) -> FSOut
{
    let a = debug_canvas[0];

    const max_depth = 10;

    fragment_uv = vec2f(coords.x, coords.y) *.5 + .5;

    let launch_idx = u32(fragcoord.y) * scene_data.canvas_width + u32(fragcoord.x);
    var t = tea(launch_idx, scene_data.frame_num);
    let jitter = vec2f(rnd(&t), rnd(&t)) / f32(scene_data.canvas_height);

    var uv = coords *.5 + jitter;

    var r : Ray;
    var hit : HitInfo;
    r = generate_ray_from_camera(uv);
    hit = generate_default_hitinfo();

    var light_result = vec3f();

    for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
    {
        if (!intersect_scene(&r, &hit))
        {
            light_result += hit.bounce_factor * background_color.rgb;
            break;
        }

        var light = shader(&r, &hit, &t);
        light_result += hit.bounce_factor * light;

        if (!hit.continue_trace)
        {
            break;
        };

        hit.bounce_factor = hit.path_factor;
    }

    let curr_sum = textureLoad(renderTexture, vec2u(fragcoord.xy), 0).rgb * f32(scene_data.frame_num);
    let accum_color = (light_result + curr_sum) / f32(scene_data.frame_num + 1u);

    var fs_out : FSOut;
    fs_out.frame = vec4f(pow(accum_color, vec3f(1.0 / 1.5)), 1.0);
    fs_out.accum = vec4f(accum_color, 1.0);
    return fs_out;
}

//Utility

//PRNG xorshift seed generator by NVIDIA
fn tea(val0 : u32, val1 : u32) -> u32
{
    const N = 16u;  //User specified number of iterations
    var v0 = val0;
    var v1 = val1;
    var s0 = 0u;
    for(var n = 0u; n < N; n++)
    {
        s0 += 0x9e3779b9;
        v0 += ((v1<<4) + 0xa341316c)^(v1 + s0)^((v1>>5) + 0xc8013ea4);
        v1 += ((v0<<4) + 0xad90777d)^(v0 + s0)^((v0>>5) + 0x7e95761e);
    }
    return v0;
}

fn mcg31(prev : ptr < function, u32>) -> u32
{
    const LCG_A = 1977654935u;
    *prev = (LCG_A * (*prev)) & 0x7FFFFFFF;
    return * prev;
}

//Generate random float in [0, 1)
fn rnd(prev : ptr < function, u32>) -> f32
{
    return f32(mcg31(prev)) / f32(0x80000000);
}

//Given a direction vector v sampled around the z-axis of a
//local coordinate system, this function applies the same
//rotation to v as is needed to rotate the z-axis to the
//actual direction n that v should have been sampled around
//[Frisvad, Journal of Graphics Tools 16, 2012;
//Duff et al., Journal of Computer Graphics Techniques 6, 2017].
fn rotate_to_normal(normal : vec3f, v : vec3f) -> vec3f
{
    let signbit = sign(normal.z + f1en16);
    let a = -1.0f / (1.0f + abs(normal.z));
    let b = normal.x * normal.y * a;
    return vec3f(1.0f + normal.x * normal.x * a, b, -signbit * normal.x) * v.x
    + vec3f(signbit * b, signbit * (1.0f + normal.y * normal.y * a), -normal.y) * v.y
    + normal * v.z;
}

//Given spherical coordinates, where theta is the
//polar angle and phi is the azimuthal angle, this
//function returns the corresponding direction vector
fn spherical_direction(sin_theta : f32, cos_theta : f32, phi : f32) -> vec3f
{
    let sin_phi = sin(phi);
    let cos_phi = cos(phi);
    return vec3f(sin_theta * cos_phi, sin_theta * sin_phi, cos_theta);
}

fn sample_cosine_weighted_hemisphere(normal : vec3f, seed : ptr < function, u32>) -> vec3f
{
    var eps_1 = rnd(seed);
    var eps_2 = rnd(seed);

    var theta = acos(sqrt(1 - eps_1));
    var phi = 2 * PI * eps_2;

    var direction = spherical_direction(sin(theta), cos(theta), phi);

    return rotate_to_normal(normal, direction);
}

//DEBUG

fn store_debug_value(value : vec4f)
{
    let pixel_coordinates = vec2u(fragment_uv * vec2f(f32(scene_data.canvas_width), f32(scene_data.canvas_height)));
    debug_canvas[pixel_coordinates.y * u32(scene_data.canvas_width) + pixel_coordinates.x] = value;
}
`,Wc=`@group(0) @binding(0) var<storage, read_write> debug_canvas : array<vec4f>;
@group(0) @binding(1) var<uniform> mouse_uv : vec2u;
@group(0) @binding(2) var<uniform> pixel_count : u32;
struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    return debug(.5 * coords);
}

fn debug(coords : vec2f) -> vec4f
{
    let pixel_coordinates = vec2u((coords + .5) * f32(pixel_count)) + mouse_uv - pixel_count / 2;

    let color = debug_canvas[pixel_coordinates.y * 512 + pixel_coordinates.x];
    return color;
}
`,we="drawing-to-debug-canvas",zt="progressive-enabled",Xc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(we),a=N(zt,"checked"),i=dt("pixel-value-debug"),o=dt("pixel-count-debug"),s=Yn(await Hn(hn("models/CornellBoxWithBlocks.obj"))),c=fe(s),l=me([c.vertices,c.normals]),d=new Uint32Array(c.indices);pe(d,s.matIndices,4);const h=new Uint32Array(s.lightIndices),u=new Float32Array(s.materials.reduce((H,q)=>[...H,...B([q.color,q.specular,q.emission,f(q.illum,q.shininess,q.ior)])],[])),{renderSrc:v,renderDst:m,blitPingPong:_}=Ce(n,r),g=n.createShaderModule({code:$c}),x=n.createRenderPipeline({layout:"auto",vertex:{module:g,entryPoint:"main_vs"},fragment:{module:g,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),w=document.getElementById(we+"-debug"),p=w.getContext("gpupresent")||w.getContext("webgpu");p.configure({device:n,format:t,alphaMode:"premultiplied"});const I=n.createShaderModule({code:Wc}),T=n.createRenderPipeline({layout:"auto",vertex:{module:I,entryPoint:"main_vs",buffers:[]},fragment:{module:I,entryPoint:"main_fs",targets:[{format:t}]},primitive:{topology:"triangle-strip"}}),{bindGroup:b}=z(n,x,[l,d,h,u,c.bspPlanes,c.bspTree,c.treeIds],"STORAGE"),M=n.createBindGroup({layout:x.getBindGroupLayout(1),entries:[{binding:0,resource:m.createView()}]}),{bindGroup:S,buffers:[O,P,F]}=z(n,x,[c.aabb,new Uint32Array([h.length]),new Uint32Array([0,r.width,r.height])],"UNIFORM",2),R=n.createBuffer({size:Rn.float32x4*r.height*r.width,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC}),A=n.createBuffer({size:Rn.float32x4,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),Y=async()=>{await A.mapAsync(GPUMapMode.READ);const H=new Float32Array(A.getMappedRange());i([...H].map(q=>q.toFixed(2)).join(", ")),A.unmap()},en=n.createBindGroup({layout:x.getBindGroupLayout(3),entries:[{binding:0,resource:{buffer:R}}]}),cn=n.createBuffer({size:Rn.float32x2,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});let j=64;const C=n.createBuffer({size:new Uint32Array(1).byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});zn(n,C,new Uint32Array([j]),0);const V=n.createBindGroup({layout:T.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:R}},{binding:1,resource:{buffer:cn}},{binding:2,resource:{buffer:C}}]}),G=H=>{const q=H.beginRenderPass({colorAttachments:[{view:p.getCurrentTexture().createView(),loadOp:"clear",clearValue:fn.transparent,storeOp:"store"}]});q.setPipeline(T),q.setBindGroup(0,V),q.draw(4),q.end()};let J=0;const ln=()=>{if(!a())return;J+=1,zn(n,F,new Uint32Array([J]),0);const H=n.createCommandEncoder(),q=H.beginRenderPass({colorAttachments:[{view:e.getCurrentTexture().createView(),loadOp:"clear",clearValue:fn.black,storeOp:"store"},{view:v.createView(),loadOp:"load",storeOp:"store"}]});q.setPipeline(x),q.setBindGroup(0,b),q.setBindGroup(1,M),q.setBindGroup(2,S),q.setBindGroup(3,en),q.draw(4),q.end(),G(H),_(H),n.queue.submit([H.finish()]),requestAnimationFrame(ln)};requestAnimationFrame(ln),Tn(zt,()=>requestAnimationFrame(ln),"checked");let bn={x:0,y:0};const wn=H=>{const q=H.x,En=r.height-H.y;bn.x=Math.floor(q),bn.y=Math.floor(En),zn(n,cn,new Uint32Array([q,En]),0);const xn=n.createCommandEncoder();G(xn),n.queue.submit([xn.finish()])};wn({x:256,y:256}),Ye(we,{onMove:wn,onStart:wn},{});let tn=!1,dn=0;const mn=H=>{const q=n.createCommandEncoder();if(!tn){const xn=Math.floor(H.x/512*j)+bn.x-j/2,An=(Math.floor((1-H.y/512)*j)+bn.y-j/2)*512+xn;q.copyBufferToBuffer(R,Rn.float32x4*An,A,0,Rn.float32x4),n.queue.submit([q.finish()]),Y();return}const En=2*Math.round((H.y-dn)/2);j=Me(j+En,2,512),zn(n,C,new Uint32Array([j]),0),o(j.toString()),G(q),n.queue.submit([q.finish()]),dn=H.y};Ye(we+"-debug",{onMove:mn,onStart:H=>{dn=H.y,tn=!0},onEnd:()=>tn=!1},{alwaysMouseMove:!0})},Yc=(n,e)=>{const t=on("rendering/debugging/",["magnifying/magnifyingGlass.ts","magnifying/progressive.wgsl","magnifying/drawToDebugCanvas.wgsl"]),r=W("The magnifying glass for the debugging detective"),a=D(`
The classic approach to debugging shaders is to output a variable as a color. We've all done it, as its the simplest tool at hand to quickly peer into the mind of the opaque machine that is the GPU.
This approach, as handy as it is, has many drawbacks. First and foremost - color is not a human-friendly value in terms of numbers. 
The sole reason that HSL and similar color models exist is because the machine favorite RGB is too difficult to parse for humans. 
It provides an idea of relative value but that may often be far from what is needed most. 
The second issue is negative values - or rather - the lack of their representation. Colors simply do not function in negative number spaces.
While a taking the absolute value may be solve this, it often hides the transition point. 
Another solution is to cleverly map the value to another range, but that is yet another issue in itself entirely - lack of sense of range.
The color has a rigid range between zero and one for each of its channels. 
It is extremely difficult (and frustrating) to map a variable of unknown range, moreso when that variable happens to be an unexpected erroneous value.

The creation of a friendly, easy to utilize method of reading the value in a human friendly approach just may be the powerless shader author's best tool in shed when dealing with difficult to comprehend algorithms.

Following the approach from the previous part, the primary goal is to minimize the development impact on production source code. 
The setup should be an easy to plug into an existing project and trivial to setup.
An external debug canvas is used to display the debug variable and a storage buffer is used as the data transfer middleman.

Inside the production shader a new function is introduced: store_debug_value; which aims to work much like the more familiar Javascript console log.
The function takes only one parameter - a vector of size four. Each pixel in the production shader is permitted one such vector to store a requested debug value.
Inside the implementation of the function the integer pixel coordinates are calculated from the fragment coordinates. 
The pixel coordiantes are used to set the debug value at the appropriate position in the flattened debug_canvas storage buffer. 
There are two requirements to make this function work, these are (1) the canvas dimensions must be available either as uniform values or hardcoded and 
(2) a var<private> variable named fragment_uv which is set to the fragment coordinates (mapped to the range of zero to one).

The next step is re-rendering the debug values in the debug canvas. This is simply reading from the flat debug_canvas storage buffer, querying the buffer with a flattened index from the pixel coordinates.
While simple enough, simply redrawing the canvas is not helpful. Two configuration variables are required to make the magnifying glass function - pixel_count and mouse_uv.
These can be somehow gathered from interaction with the canvas, but must be passed as uniform values to the draw debug shader. 
They are used to properly query the storage buffer with a local area of pixel count size around the mouse click position. 
The magnifying glass canvas is ready. 

A question arises whether is makes sense to write the entire production canvas-worth of values when only a subset is requested in the magnifying glass, but the benefits which arise from this severely outweigh the costs.
When using this appraoch in a progressive render setup, the render may be stopped and the debug canvas may be scrolled to view all possible corners of the debug values at one's leisure.
The efficiency cost is a moot point anyway, as these methods are created to be used in development and removed once the produciton render is fully prepared.

The cherry on top comes from the use of a two-way storage buffer. 
As the buffer has to pass through the CPU before it reaches the debug canvas, it may as well be queried in the CPU for the exact debug value stored by a position. 
The same inverse mapping has to be used as in the shader to retrieve the exact value of the pixel hovered over in the debug canvas.

Finally, the shader author is ready to tackle any numerical issues in their shaders. Right after they finally understand how to properly muliply the path factor in global illumination.

In the example below:

1) Enable progressive rendering.

2) Click on the production canvas to select a debugging position.

3) Click and drag on the debugging canvas to modify the magnifying glass scope (between 2 - 512 pixels wide).

4) Hover over a pixel in the debugging canvas to display its value.
`),i=K(we),o=k(Xn(zt,!1),"Progressive rendering enabled",!1),s=_n();s.append(o);const c=nn();c.append(i,s);const l=K(we+"-debug"),d=nn(),h=k(ht("pixel-count-debug"),"Debug canvas dimension"),u=k(ht("pixel-value-debug"),"Pixel value"),v=_n();v.append(h,u),d.append(l,v),n.append(r,t,a,c,d),e.push(Xc)},Jc=(n,e)=>{Uc(n,e),qc(n,e),Yc(n,e)},Zc=(n,e)=>{ti(n,e),ui(n,e),gi(n,e),Li(n,e),Oi(n,e),Fi(n,e),Mi(n,e)},zi={path:"rendering",generator:Zc,name:"Rendering",description:"",children:[{path:"raycasting-introduction",name:"Introduction to raycasting",description:"A conscise look into the anatomy of a raycasting system.",generator:ti},{path:"lighting-models",name:"Lighting models",description:"An overview of the basic lighting models implemented in rendering.",generator:ui},{path:"texture-mapping",name:"Adding textures",description:"The process of applying textures to conceptual objects in a rendered scene.",generator:gi},{path:"measuring-light",name:"Radiometry and photometry",description:"Understanding the process of measuring light through examples of photometric and radiometric equations.",generator:ec},{path:"meshes",name:"Mesh instantiation",description:"The simplest appraoch of writing mesh data into buffers to loop over in the render process.",generator:Li},{path:"partitioning",name:"Partitioning mesh data",description:"Using the binary space partitioning tree (BSP) to manage large meshes.",generator:wc},{path:"progressive",name:"Progressive rendering",description:"Harnessing the power of progressive rendering to generate smooth render images.",generator:Oi},{path:"brdf",name:"Global illumination",description:"Introducing sampling ray paths to the light models in progressive rendering.",generator:Fi},{path:"environmental",name:"Environemntal mapping",description:"Reading light and color data from an environment map, placing rendered objects in a real life scene.",generator:Mi},{path:"10-production-rendering",name:"Production rendering",description:"A short discussion of production rendering with example from Blender.",generator:Gc},{path:"debugging",name:"An approach to debugging (project)",description:"A project delving into the options available to debug and understand rendering systems via displaying ray paths and reading color or variable values.",generator:Jc}]},Kc=async()=>{},Qc=(n,e)=>{const t=W("Using WebGPU for graphics and rendering"),r=D(`
This project contains a collection of simple computer graphics examples created with the WebGPU API. 
The examples are broken down into two categories - Graphics and Rendering.

The graphics sections cover topics ranging from 2D drawing, mesh instantiation, computer graphics concepts discussion, textures, shadow mapping and quaternion rotations. The rendering sections cover topics randing from ray casting, path tracing, reflection, refractions, meshes, mesh partitioning, global illumination, progressive rendering and rendering concepts discussion. There are two final sections for each category; in computer graphics it is the creation of a simple game (engine), whereas for rendering it is an overview of setting up a custom debugging system.

Each of these sections are created in plain Typescript with the following structure - the view function is used to set up the layout for html elements and the generator function is executed to run the prepared example in the canvas. 
Each section will have a corresponding relevant links callout to redirect you to the file in the repository. Please note that some of the examples are computationally heavy and may require some time to set up, especially on older hardware.

This repository is hosted on Github under <a href="https://github.com/julzerinos/webgpu-for-graphics-and-rendering">julzerinos/webgpu-for-graphics-and-rendering</a>.
`),a=Yt(et),i=Yt(zi),o=document.createElement("div");o.className="generic-row",o.append(a,i),n.append(t,r,o),e.push(Kc)},nl=[et,zi],Vt={name:"Landing Page",path:"",description:"",generator:Qc,children:[]},Vi=Xi(),Gi=[],{route:Ci,breadcrumbs:el}=Wi(nl);Vi.append(Di(Ci,el));Ci.generator(Vi,Gi);for(const n of Gi)n();
