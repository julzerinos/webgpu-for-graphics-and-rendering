(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const q=n=>{const e=n.split(`

`),t=document.createElement("div");t.className="paragraph";for(const r of e){const i=document.createElement("span");i.innerHTML=r,t.append(i)}return t},J=n=>{const e=document.createElement("h1");return e.innerHTML=n,e.className="title",e},F=(n,e,t=!0)=>{const r=document.createElement("div");r.className="label-group";const i=document.createElement("label");if(i.textContent=e,r.append(i),t&&"value"in n){const a=document.createElement("label");a.className="value-label";const o=()=>a.textContent=`[ ${n.value} ]`;n.addEventListener("input",o),o(),r.append(a)}return r.append(n),r},K=(n,{width:e,height:t,lowRes:r,overlay:i}={})=>{if(!navigator.gpu){const o=document.createElement("div");o.className="fallback",o.style.setProperty("width",`${e??512}px`),o.style.setProperty("height",`${t??512}px`);const s=document.createElement("span");s.textContent="WebGPU is not supported by this browser (or browser version). Try a different browser (eg. Chrome or Edge).";const c=document.createElement("a");return c.text="You can check the current state of WebGPU API support here.",c.href="https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API",o.append(s,c),o}const a=document.createElement("canvas");return a.width=e??512,a.height=t??512,a.id=n,r&&a.classList.add("low-res"),i&&a.classList.add("overlay"),a},Wt=n=>{const e=document.createElement("div");e.className=`routes ${n.path}`;const t=document.createElement("a");t.text=n.path,t.className="underline",e.append(t);const r=document.createElement("div");r.className="routes-container";for(const i of n.children??[]){const a=document.createElement("div");a.className="route-entry";const o=document.createElement("a");o.text=i.name;const s=document.createElement("span");s.textContent=i.description,a.onclick=()=>{ir(`/${n.path}/${i.path}`)},a.append(o,s),r.append(a)}return e.append(r),e},ct=n=>{const e=document.createElement("div");return e.id=n,e.className="value-display",e},Ui=(n,e)=>{const t=document.createElement("div");t.className=`navigation ${e.map(i=>i.path).join(" ")}`;const r=document.createElement("a");if(r.className="underline-white",r.textContent=Vt.name,r.onclick=()=>{ir("/")},t.append(r),e.length>1){const i=document.createElement("span");i.textContent="/";const a=document.createElement("a");a.className="underline",a.textContent=n.name,t.append(i,a)}return t},Ni=n=>{const e=document.createElement("div");e.className="img-holder";const t=document.createElement("img");return t.src=n,e.append(t),e},dn=(n,e,t,r,i=1,a=!1)=>{const o=document.createElement("input");return o.id=n,o.type="range",o.className="slider-input",o.min=String(t),o.max=String(r),o.step=String(i),o.value=String(e),o.disabled=a,o},$e=(n,e)=>{const t=document.createElement("input");return t.id=n,t.type="color",t.value=e,t},Wn=(n,e)=>{const t=document.createElement("input");return t.id=n,t.type="checkbox",t.checked=e,t.value=String(e),t.addEventListener("input",()=>t.value=String(t.checked)),t},et=(n,e)=>{const t=document.createElement("button");return t.id=n,t.textContent=e,t},Rn=(n,e,t=e[0]??"")=>{const r=document.createElement("select");return r.id=n,r.append(...e.map(i=>{const a=document.createElement("option");return a.text=i,a.value=i,a.selected=i===t,a})),r},un=()=>{const n=document.createElement("div");return n.className="interactables",n},nn=()=>{const n=document.createElement("div");return n.className="canvas-section",n},Di=()=>{const n=document.createElement("div");return n.className="canvas-stack",n},N=(n,e="value")=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate input with id ${n}`);return()=>t[e]},Ln=(n,e,t="value")=>{const r=document.getElementById(n);if(!r)throw new Error(`Could not locate input with id ${n}`);return r.addEventListener("input",()=>e(r[t])),r.value},tt=(n,e)=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate button with id ${n}`);t.addEventListener("click",e)},Hi=(n,e)=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate canvas with id ${n}`);t.addEventListener("click",r=>{const i=t.getBoundingClientRect(),a=r.clientX-i.left,o=r.clientY-i.top;e({x:a,y:o})})},We=(n,{onStart:e,onMove:t,onEnd:r},{alwaysMouseMove:i}={})=>{const a=document.getElementById(n);if(!a)throw new Error(`Could not locate canvas with id ${n}`);const o=c=>{const l=a.getBoundingClientRect();return{x:c.clientX-l.left,y:c.clientY-l.top}};let s=!1;a.addEventListener("mousedown",c=>{s=!0,e==null||e(o(c))}),a.addEventListener("mouseup",c=>{s=!1,r==null||r(o(c))}),a.addEventListener("mouseleave",c=>{s&&(s=!1,r==null||r(o(c)))}),a.addEventListener("mousemove",c=>{!i&&!s||t==null||t(o(c))})},Et=(n,e)=>{for(const t of n){const r=document.getElementById(t);if(!r)throw new Error(`Could not locate element with id ${t}`);r.addEventListener("input",()=>e(t))}},qi=(n,e,{onStart:t,onEnd:r}={})=>{const i=document.getElementById(n);if(!i)throw new Error(`Could not locate canvas with id ${n}`);i.addEventListener("click",async()=>{document.pointerLockElement||await i.requestPointerLock()});const a=l=>{e(l.movementX,l.movementY)};let o={};const s=l=>{o[l.key]=!0},c=l=>{o[l.key]=!1};return document.addEventListener("pointerlockchange",()=>{if(document.pointerLockElement===i){console.log("[pointer api] locked pointer in canvas"),document.addEventListener("mousemove",a,!1),window.addEventListener("keydown",s),window.addEventListener("keyup",c),t==null||t();return}document.removeEventListener("mousemove",a,!1),window.removeEventListener("keydown",s),window.removeEventListener("keyup",c),r==null||r()},!1),{keyMap:o}},lt=n=>{const e=document.getElementById(n);if(!e)throw new Error(`Could not locate display with id ${n}`);return t=>e.innerText=t},$i=n=>{const e=window.location.pathname.split("/").slice(2);let t=Vt,r=n;const i=[Vt];for(const a of e){const o=r.find(s=>s.path===a);if(!o)break;t=o,r=t.children??[],i.push(t)}return{route:t,breadcrumbs:i}},ir=n=>{location.href="/webgpu-for-graphics-and-rendering"+n},vn=(n,e)=>`https://julzerinos.github.io/webgpu-for-graphics-and-rendering/${n}`,Wi=()=>{const n=document.getElementById("app");if(!n)throw new Error("Could not initialize app.");return n},L=(n=0,e=0)=>[n,e],x=(n=0,e=0,t=0)=>[n,e,t],d=(n=0,e=0,t=0,r=1)=>[n,e,t,r],Bn=n=>{const e=n[0]??0,t=n[1]??0,r=n[2]??0;return x(e,t,r)},ar={forward:x(0,0,1),back:x(0,0,-1),up:x(0,1,0),down:x(0,-1,0),right:x(1,0,0),left:x(-1,0,0)},B=n=>[].concat(...n),U=(n,e)=>{const t=[];for(let r=0;r<Math.min(n.length,e.length);r++)t.push(n[r]+e[r]);return t},ge=(n,e)=>{const t=[];for(let r=0;r<Math.min(n.length,e.length);r++)t.push(n[r]-e[r]);return t},Qn=(n,e)=>{const t=[];for(let r=0;r<n.length;r++)t.push(e*n[r]);return t},it=(n,e)=>{const t=[];for(let r=0;r<Math.min(n.length,e.length);r++)t.push((n[r]+e[r])/2);return t},De=(n,e)=>{let t=0;for(let r=0;r<Math.min(n.length,e.length);r++)t+=n[r]*e[r];return t},Xe=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],zt=(n,e)=>{const t=[];for(let r=0;r<Math.max(n.length,e.length);r++){let i=Number.POSITIVE_INFINITY;r<n.length&&(i=n[r]),r<e.length&&(i=Math.min(i,e[r])),t.push(i)}return t},Gt=(n,e)=>{const t=[];for(let r=0;r<Math.max(n.length,e.length);r++){let i=Number.NEGATIVE_INFINITY;r<n.length&&(i=n[r]),r<e.length&&(i=Math.max(i,e[r])),t.push(i)}return t},$n=n=>Qn(n,1/Ct(n)),or=n=>De(n,n),Ct=n=>Math.sqrt(or(n)),sr=(n,e)=>{if(n.length!=e.length)return!1;for(let t=0;t<Math.min(n.length,e.length);t++)if(n[t]!=e[t])return!1;return!0},Fe=(n,e)=>{const t=[];for(let r=0;r<n.length;r++){let i=0;for(let a=0;a<n.length;a++)i+=e[r][a]*n[a];t.push(i)}return t},Re=(n=0,e=0,t=0,r=1)=>({r:n,g:e,b:t,a:r}),at=n=>x(n.r,n.g,n.b),Ye=n=>d(n.r,n.g,n.b,n.a),hn={black:Re(0,0,0,1),white:Re(1,1,1,1),blueScreenBlue:Re(.1,.3,.6,1),transparent:Re(0,0,0,0)},ve=n=>{if(n[0]==="#"&&(n=n.substring(1)),n.length!==6)throw new Error("Can't handle color hexes of size other than 6.");const e=parseInt(n,16),t=(e>>16&255)/255,r=(e>>8&255)/255,i=(e&255)/255;return{r:t,g:r,b:i,a:1}},Nn=n=>n*Math.PI/180,se=(n,e,t,r,i)=>(n-e)/(t-e)*(i-r)+r,Ue=n=>n?1:0,ke=(n,e,t)=>Math.min(Math.max(n,e),t),we=(n,e)=>{const t=e/2;return[L(n[0]-t,n[1]-t),L(n[0]+t,n[1]-t),L(n[0]-t,n[1]+t),L(n[0]-t,n[1]+t),L(n[0]+t,n[1]-t),L(n[0]+t,n[1]+t)]},Xi=(n,e,t=12)=>{const r=[],i=2*Math.PI/t;for(let a=0;a<t;a++)r.push(n,U(n,L(e*Math.cos(a*i),e*Math.sin(a*i))),U(n,L(e*Math.cos((a+1)*i),e*Math.sin((a+1)*i))));return r},ze=(n,e)=>{const t=e/2,r=[d(...U(n,x(-t,-t,t)),1),d(...U(n,x(-t,t,t)),1),d(...U(n,x(t,t,t)),1),d(...U(n,x(t,-t,t)),1),d(...U(n,x(-t,-t,-t)),1),d(...U(n,x(-t,t,-t)),1),d(...U(n,x(t,t,-t)),1),d(...U(n,x(t,-t,-t)),1)],i=new Uint32Array([0,1,1,2,2,3,3,0,2,3,3,7,7,6,6,2,0,3,3,7,7,4,4,0,1,2,2,6,6,5,5,1,4,5,5,6,6,7,7,4,0,1,1,5,5,4,4,0]),a=[d(1,0,3),d(3,2,1),d(2,3,7),d(7,6,2),d(3,0,4),d(4,7,3),d(6,5,1),d(1,2,6),d(4,5,6),d(6,7,4),d(5,4,0),d(0,1,5)];return{vertices:r,lineIndices:i,triangleIndices:a,normals:[],triangleCount:12}},Yi=n=>{const e=[d(...n[0],1),d(...n[1],1),d(...n[2],1)],t=[d(0,1,2,0)],r=[0,1,1,2,2,0];return{vertices:e,lineIndices:new Uint32Array(r),triangleIndices:t,triangleCount:1,normals:[]}},jt=(n=0)=>{const e=[d(0,0,1),d(0,2*Math.sqrt(2)/3,-.3333333333333333),d(-Math.sqrt(6)/3,-Math.sqrt(2)/3,-.3333333333333333),d(Math.sqrt(6)/3,-Math.sqrt(2)/3,-.3333333333333333)];let t=[d(0,3,1),d(0,2,3),d(1,3,2),d(1,2,0)];const r=i=>{if(i<=0)return;const a=[],o=new Map;for(const s of t){const c=Bn(e[s[0]]),l=Bn(e[s[1]]),f=Bn(e[s[2]]),h=d(...$n(it(c,l))),u=d(...$n(it(l,f))),_=d(...$n(it(f,c))),p=[s[0],s[1]].sort().toString();let v=o.get(p);v||(v=e.push(h)-1,o.set(p,v));const g=[s[1],s[2]].sort().toString();let y=o.get(g);y||(y=e.push(u)-1,o.set(g,y));const w=[s[0],s[2]].sort().toString();let m=o.get(w);m||(m=e.push(_)-1,o.set(w,m)),a.push(d(s[0],v,m),d(s[1],y,v),d(s[2],m,y),d(v,y,m))}t=a,r(i-1)};return r(n),{vertices:e,triangleIndices:t,triangleCount:t.length,normals:[]}},Gn=(n=0,e=0,t=0,r=0,i=0,a=0,o=0,s=0,c=0,l=0,f=0,h=0,u=0,_=0,p=0,v=0)=>[[n,e,t,r],[i,a,o,s],[c,l,f,h],[u,_,p,v]],On=(n=0,e=0,t=0,r=0,i=0,a=0,o=0,s=0,c=0)=>[[n,e,t],[r,i,a],[o,s,c]],In=()=>Gn(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),rn=n=>[].concat(...Ki(n)),Le=n=>[].concat(...n.map(e=>rn(e))),Cn=(n,e,t)=>{if(sr(n,e))return In();let r=$n(ge(e,n));const i=$n(Xe(r,t)),a=$n(Xe(i,r));return r=Qn(r,-1),Gn(...d(...i,-De(i,n)),...d(...a,-De(a,n)),...d(...r,-De(r,n)),...d())},Ji=(n,e,t,r,i,a)=>{if(n===e)throw"ortho(): left and right are equal";if(t===r)throw"ortho(): bottom and top are equal";if(i===a)throw"ortho(): near and far are equal";const o=e-n,s=r-t,c=a-i,l=In();return l[0][0]=2/o,l[1][1]=2/s,l[2][2]=-2/c,l[0][3]=-(n+e)/o,l[1][3]=-(r+t)/s,l[2][3]=-(i+a)/c,l},ie=(n,e,t,r)=>{const i=1/Math.tan(Nn(n)/2),a=r-t,o=In();return o[0][0]=i/e,o[1][1]=i,o[2][2]=-(t+r)/a,o[2][3]=-2*t*r/a,o[3][2]=-1,o[3][3]=0,o},Oe=(n,e)=>{const t=$n(e),r=t[0],i=t[1],a=t[2],o=Math.cos(Nn(n)),s=Math.sin(Nn(n)),c=1-o;return Gn(...d(r*r*c+o,r*i*c-a*s,r*a*c+i*s,0),...d(r*i*c+a*s,i*i*c+o,i*a*c-r*s,0),...d(r*a*c-i*s,i*a*c+r*s,a*a*c+o,0),...d())},Be=n=>{var e=Math.cos(Nn(n)),t=Math.sin(Nn(n)),r=Gn(1,0,0,0,0,e,-t,0,0,t,e,0,0,0,0,1);return r},Me=n=>{var e=Math.cos(Nn(n)),t=Math.sin(Nn(n)),r=Gn(e,0,t,0,0,1,0,0,-t,0,e,0,0,0,0,1);return r},Zi=n=>{var e=Math.cos(Nn(n)),t=Math.sin(Nn(n)),r=Gn(e,-t,0,0,t,e,0,0,0,0,1,0,0,0,0,1);return r},wn=({[0]:n,[1]:e,[2]:t})=>{const r=In();return r[0][3]=n,r[1][3]=e,r[2][3]=t,r},Hn=(n=1,e=1,t=1)=>{var r=In();return r[0][0]=n,r[1][1]=e,r[2][2]=t,r},V=(n,e)=>{const t=[];for(let r=0;r<n.length;r++){t.push([]);for(let i=0;i<e.length;i++){let a=0;for(let o=0;o<n.length;o++)a+=n[r][o]*e[o][i];t[r].push(a)}}return t},Ki=n=>{const e=[];for(let t=0;t<n.length;++t){e.push([]);for(let r=0;r<n[t].length;++r)e[t].push(n[r][t])}return e},Fn=n=>n[0][0]*n[1][1]*n[2][2]+n[0][1]*n[1][2]*n[2][0]+n[0][2]*n[2][1]*n[1][0]-n[2][0]*n[1][1]*n[0][2]-n[1][0]*n[0][1]*n[2][2]-n[0][0]*n[1][2]*n[2][1],Qi=n=>{const e=On(n[1][1],n[1][2],n[1][3],n[2][1],n[2][2],n[2][3],n[3][1],n[3][2],n[3][3]),t=On(n[1][0],n[1][2],n[1][3],n[2][0],n[2][2],n[2][3],n[3][0],n[3][2],n[3][3]),r=On(n[1][0],n[1][1],n[1][3],n[2][0],n[2][1],n[2][3],n[3][0],n[3][1],n[3][3]),i=On(n[1][0],n[1][1],n[1][2],n[2][0],n[2][1],n[2][2],n[3][0],n[3][1],n[3][2]);return n[0][0]*Fn(e)-n[0][1]*Fn(t)+n[0][2]*Fn(r)-n[0][3]*Fn(i)},Xt=n=>{const e=In(),t=Qi(n),r=On(n[1][1],n[1][2],n[1][3],n[2][1],n[2][2],n[2][3],n[3][1],n[3][2],n[3][3]),i=On(n[1][0],n[1][2],n[1][3],n[2][0],n[2][2],n[2][3],n[3][0],n[3][2],n[3][3]),a=On(n[1][0],n[1][1],n[1][3],n[2][0],n[2][1],n[2][3],n[3][0],n[3][1],n[3][3]),o=On(n[1][0],n[1][1],n[1][2],n[2][0],n[2][1],n[2][2],n[3][0],n[3][1],n[3][2]),s=On(n[0][1],n[0][2],n[0][3],n[2][1],n[2][2],n[2][3],n[3][1],n[3][2],n[3][3]),c=On(n[0][0],n[0][2],n[0][3],n[2][0],n[2][2],n[2][3],n[3][0],n[3][2],n[3][3]),l=On(n[0][0],n[0][1],n[0][3],n[2][0],n[2][1],n[2][3],n[3][0],n[3][1],n[3][3]),f=On(n[0][0],n[0][1],n[0][2],n[2][0],n[2][1],n[2][2],n[3][0],n[3][1],n[3][2]),h=On(n[0][1],n[0][2],n[0][3],n[1][1],n[1][2],n[1][3],n[3][1],n[3][2],n[3][3]),u=On(n[0][0],n[0][2],n[0][3],n[1][0],n[1][2],n[1][3],n[3][0],n[3][2],n[3][3]),_=On(n[0][0],n[0][1],n[0][3],n[1][0],n[1][1],n[1][3],n[3][0],n[3][1],n[3][3]),p=On(n[0][0],n[0][1],n[0][2],n[1][0],n[1][1],n[1][2],n[3][0],n[3][1],n[3][2]),v=On(n[0][1],n[0][2],n[0][3],n[1][1],n[1][2],n[1][3],n[2][1],n[2][2],n[2][3]),g=On(n[0][0],n[0][2],n[0][3],n[1][0],n[1][2],n[1][3],n[2][0],n[2][2],n[2][3]),y=On(n[0][0],n[0][1],n[0][3],n[1][0],n[1][1],n[1][3],n[2][0],n[2][1],n[2][3]),w=On(n[0][0],n[0][1],n[0][2],n[1][0],n[1][1],n[1][2],n[2][0],n[2][1],n[2][2]);return e[0][0]=Fn(r)/t,e[0][1]=-Fn(s)/t,e[0][2]=Fn(h)/t,e[0][3]=-Fn(v)/t,e[1][0]=-Fn(i)/t,e[1][1]=Fn(c)/t,e[1][2]=-Fn(u)/t,e[1][3]=Fn(g)/t,e[2][0]=Fn(a)/t,e[2][1]=-Fn(l)/t,e[2][2]=Fn(_)/t,e[2][3]=-Fn(y)/t,e[3][0]=-Fn(o)/t,e[3][1]=Fn(f)/t,e[3][2]=-Fn(p)/t,e[3][3]=Fn(w)/t,e},na=(n,e=[0,0],t=[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER])=>n.slice(e[1],t[1]).map(r=>r.slice(e[0],t[0])),ea=(n,e)=>{for(let t=0;t<n.length;t++)e[t].splice(0,n[t].length,...n[t]);return e},le=async n=>{const e=document.createElement("img");e.src=n,await e.decode();const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");if(!r)throw new Error("Could not get canvas context");r.drawImage(e,0,0,t.width,t.height);const i=r.getImageData(0,0,t.width,t.height),a=new Uint8Array(e.width*e.height*4);for(let o=0;o<e.height;++o)for(let s=0;s<e.width;++s)for(let c=0;c<4;++c)a[(o*e.width+s)*4+c]=i.data[((e.height-o-1)*e.width+s)*4+c];return{textureData:a,height:e.height,width:e.width}},Ut=(n,e)=>{const t=1/n,r=t/e;if(e<2)return[L()];const i=[];for(var a=0;a<e;++a)for(var o=0;o<e;++o)i.push(L((Math.random()+o)*r-t*.5,(Math.random()+a)*r-t*.5));return i},ta=(n,e,t)=>{const r=new Uint8Array(4*n*n);for(let i=0;i<n;++i)for(let a=0;a<n;++a){const o=Math.floor(i/(n/t)),s=Math.floor(a/(n/e)),c=o%2!==s%2?255:0,l=4*(i*n+a);r[l]=r[l+1]=r[l+2]=c,r[l+3]=255}return r},ra=({data:n,width:e,height:t},r=!1)=>{const i=Math.max(1,e/2|0),a=Math.max(1,t/2|0),o=new Uint8Array(i*a*4),s=(h,u)=>{const _=(u*e+h)*4;return n.subarray(_,_+4)},c=(h,u,_)=>h+(u-h)*_,l=(h,u,_)=>h.map((p,v)=>c(p,u[v],_)),f=(h,u,_,p,v,g)=>{const y=l(h,u,v),w=l(_,p,v);return l(y,w,g)};for(let h=0;h<a;++h)for(let u=0;u<i;++u){const _=(u+.5)/i,p=(h+.5)/a,v=_*e-.5,g=p*t-.5,y=v|0,w=g|0,m=v%1,I=g%1,T=s(y,w),b=s(y+1,w),M=s(y,w+1),S=s(y+1,w+1),O=(h*i+u)*4,P=f(T,b,M,S,m,I);r&&(P[0]=6*i),o.set(P,O)}return{data:o,width:i,height:a}},rt=(n,e,t=!1)=>{const r=n.length/4/e;let i={data:n,width:e,height:r};const a=[i];for(;i.width>1||i.height>1;)i=ra(i,t),a.push(i);return a},Ve=async(n,e)=>{const r=await(await fetch(e)).blob(),i=await createImageBitmap(r,{colorSpaceConversion:"none"}),a=n.createTexture({size:[i.width,i.height,1],format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT});n.queue.copyExternalImageToTexture({source:i,flipY:!0},{texture:a},{width:i.width,height:i.height});const o=n.createSampler({addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest"});return{texture:a,sampler:o}},cr=(n,{}={})=>{let e=0;const t=[],r=[],i=n.mtls.reduce((o,s)=>({...o,...s.materials.reduce((c,l,f)=>({...c,[l.name]:f}),{})}),{});for(let o=0;o<n.objects.length;o++){const s=n.objects[o];e+=s.faces.length;for(let c=0;c<s.faces.length;c++){const l=s.faces[c];t.push(d(...l.vIndices,1)),r.push(i[l.materialName])}}return{vertices:n.vertices,normals:n.normals,triangleCount:e,triangleIndices:t,materialIndices:r}},ia=n=>({filename:n,mtls:[],objects:[],vertices:[],normals:[]}),Dn=async(n,e=1,t=!1)=>{var l;const i=(l=(await fetch(n)).body)==null?void 0:l.getReader();if(!i)throw new Error("Could not get reader for obj file.");const a=ia(n),o=lr("_default");a.objects.push(o);const s={objDoc:a,currentObject:o,scale:e,currentMaterialName:"",filename:n,reverse:t};let c="";for(;;){const{value:f,done:h}=await i.read();if(h)break;const _=new TextDecoder("utf-8").decode(f,{stream:!0}).split(`
`);c!==""&&(_[0]=c+_[0],c=""),_[_.length-1]!==""&&(c=_.pop());for(const g of _)await aa(g,s)}return a},aa=async(n,e)=>{const t=hr(n),r=he(t);if(r.length!==0)switch(r){case"#":return;case"mtllib":var i=oa(t,e.filename),a=ma();e.objDoc.mtls.push(a);const o=await fetch(i);if(!o.body)throw new Error("No MTL body to read.");await ua(o.body.getReader(),a);return;case"o":case"g":const s=e.currentObject.numIndices===0?e.objDoc.objects.length-1:e.objDoc.objects.length,c=sa(t);e.objDoc.objects[s]=c,e.currentObject=c;return;case"v":const l=ca(t,e.scale);e.objDoc.vertices.push(l);return;case"vn":const f=la(t);e.objDoc.normals.push(f);return;case"usemtl":e.currentMaterialName=ha(t);return;case"f":const h=fa(t,e.currentMaterialName);da(h,e.objDoc,e.reverse),ga(e.currentObject,h);return}},oa=(n,e)=>{var t=e.lastIndexOf("/"),r="";return t>0&&(r=e.substring(0,t+1)),r+he(n)},sa=n=>{var e=he(n);return lr(e)},ca=(n,e)=>{var t=re(n)*e,r=re(n)*e,i=re(n)*e;return d(t,r,i,1)},la=n=>{var e=re(n),t=re(n),r=re(n);return d(e,t,r,0)},ha=n=>he(n),fa=(n,e)=>{const t=ba(e);for(;;){const r=he(n);if(r.length===0)break;const i=r.split("/");if(i.length>=1){const a=parseInt(i[0])-1;isNaN(a)||t.vIndices.push(a)}if(i.length>=3){const a=parseInt(i[2])-1;t.nIndices.push(a)}else t.nIndices.push(-1)}return t},da=(n,e,t)=>{var r=[e.vertices[n.vIndices[0]][0],e.vertices[n.vIndices[0]][1],e.vertices[n.vIndices[0]][2]],i=[e.vertices[n.vIndices[1]][0],e.vertices[n.vIndices[1]][1],e.vertices[n.vIndices[1]][2]],a=[e.vertices[n.vIndices[2]][0],e.vertices[n.vIndices[2]][1],e.vertices[n.vIndices[2]][2]],o=Yt(r,i,a);if(o==null){if(n.vIndices.length>=4){var s=[e.vertices[n.vIndices[3]][0],e.vertices[n.vIndices[3]][1],e.vertices[n.vIndices[3]][2]];o=Yt(i,a,s)}o==null&&(o=[0,1,0])}if(t&&(o[0]=-o[0],o[1]=-o[1],o[2]=-o[2]),n.normal=d(o[0],o[1],o[2],0),n.vIndices.length>3){for(var c=n.vIndices.length-2,l=new Array(c*3),f=new Array(c*3),h=0;h<c;h++)l[h*3+0]=n.vIndices[0],l[h*3+1]=n.vIndices[h+1],l[h*3+2]=n.vIndices[h+2],f[h*3+0]=n.nIndices[0],f[h*3+1]=n.nIndices[h+1],f[h*3+2]=n.nIndices[h+2];n.vIndices=l,n.nIndices=f}return n.numIndices=n.vIndices.length,n},ua=async(n,e)=>{const t={material:Nt("",d()),mtl:e};for(;;){const{value:r,done:i}=await n.read();if(i)break;const o=new TextDecoder("utf-8").decode(r,{stream:!0}).split(`
`);for(const s of o)va(s,t)}e.complete=!0},va=(n,e)=>{const t=hr(n),r=he(t);if(r.length!==0)switch(r){case"#":return;case"newmtl":const i=pa(t);e.material=Nt(i,d(.8,.8,.8,1)),e.mtl.materials.push(e.material);return;case"Kd":e.material&&(e.material.color=ot(t));return;case"Ka":e.material&&(e.material.emission=ot(t));return;case"Ks":e.material&&(e.material.specular=ot(t));return;case"Ni":e.material&&(e.material.ior=re(t));return;case"Ns":e.material&&(e.material.shininess=re(t));return;case"illum":e.material&&(e.material.illum=ya(t));return}},_a=(n,e)=>{for(var t=0;t<e.mtls.length;t++)for(var r=0;r<e.mtls[t].materials.length;r++)if(e.mtls[t].materials[r].name==n)return e.mtls[t].materials[r];return Nt("_defaultMat",d(.8,.8,.8,1))},Xn=(n,{indicesIn3:e}={})=>{let t=0,r=0,i=0;for(var a=0;a<n.objects.length;a++)r+=n.objects[a].numIndices+n.objects[a].faces.length,i+=n.objects[a].faces.length;t=n.vertices.length;const o=new Float32Array(t*4),s=new Float32Array(t*4),c=new Float32Array(t*4),l=new Uint32Array(r),f=new Uint32Array(i),h=[],u=new Map,_=[],p=Ee();let v=0,g=0;for(let X=0;X<n.objects.length;X++){const en=n.objects[X];for(var y=0;y<en.faces.length;y++){var w=en.faces[y],m=u.get(w.materialName),I;m===void 0?(I=_a(w.materialName,n),u.set(w.materialName,h.length),m=h.length,h.push(I)):I=h[m],I.emission!==void 0&&I.emission[0]+I.emission[1]+I.emission[2]>0&&_.push(g),f[g++]=m;for(var T=I.color===void 0?d(.8,.8,.8,1):I.color,b=w.normal,M=0;M<w.vIndices.length;M++){var S=w.vIndices[M];l[v]=S;var O=n.vertices[S];o[S*4+0]=O[0],o[S*4+1]=O[1],o[S*4+2]=O[2],o[S*4+3]=1,Aa(p,O),c[S*4+0]=T[0],c[S*4+1]=T[1],c[S*4+2]=T[2],c[S*4+3]=T[3];var P=w.nIndices[M];if(P>=0){var k=n.normals[P];s[S*4+0]=k[0],s[S*4+1]=k[1],s[S*4+2]=k[2],s[S*4+3]=0}else s[S*4+0]=b[0],s[S*4+1]=b[1],s[S*4+2]=b[2],s[S*4+3]=0;v++}e||(l[v++]=0)}}const R=new Uint32Array(_);return{vertices:o,normals:s,colors:c,indices:l,materials:h,matIndices:f,lightIndices:R,aabb:new Float32Array(B([p.min,p.max]))}},ma=()=>({complete:!1,materials:[]}),pa=n=>he(n),ot=n=>{var e=re(n),t=re(n),r=re(n);return d(e,t,r,1)},Nt=(n,e)=>({name:n,color:e,illum:0,shininess:0,ior:1,specular:d(),emission:d()}),lr=n=>({name:n,faces:[],numIndices:0}),ga=(n,e)=>{n.faces.push(e),n.numIndices+=e.numIndices},ba=(n="")=>({materialName:n,vIndices:[],nIndices:[],normal:d(1),numIndices:0}),hr=n=>({str:n,index:0}),xa=n=>{let e;const t=n.str.length;for(e=n.index;e<t;e++){const r=n.str.charAt(e);if(!(r=="	"||r==" "||r=="("||r==")"||r=='"'))break}n.index=e},he=n=>{xa(n);const e=wa(n.str,n.index);if(e===0)return"";const t=n.str.substring(n.index,n.index+e);return n.index+=e+1,t},ya=n=>parseInt(he(n)),re=n=>parseFloat(he(n)),wa=(n,e)=>{let t;for(t=e;t<n.length;t++){var r=n.charAt(t);if(r=="	"||r==" "||r=="("||r==")"||r=='"')break}return t-e},Yt=(n,e,t)=>{for(var r=new Float32Array(3),i=new Float32Array(3),a=0;a<3;a++)r[a]=n[a]-e[a],i[a]=t[a]-e[a];var o=Array(3);o[0]=r[1]*i[2]-r[2]*i[1],o[1]=r[2]*i[0]-r[0]*i[2],o[2]=r[0]*i[1]-r[1]*i[0];var s=o[0],c=o[1],l=o[2],f=Math.sqrt(s*s+c*c+l*l);if(f){if(f==1)return o}else return o[0]=0,o[1]=0,o[2]=0,o;return f=1/f,o[0]=s*f,o[1]=c*f,o[2]=l*f,o},Ia=4,Ie=20,Jt=1e-6,Zt=4,La=(n,e)=>({primIdx:n,bbox:Ee(e)}),Ta=n=>{let e=Ee();for(var t=0;t<n.length;++t)e=Sa(e,n[t].bbox);const r={maxLevel:Ie,count:n.length,id:0,bbox:e},i=[];return ht(r,r.bbox,0,n,i),{bspTreeRoot:r,tree_objects:i}},ht=(n,e,t,r,i)=>{if(r.length<=Ia||t===Ie){n.axisType=3,n.id=i.length,n.count=r.length,n.plane=0;for(var a=0;a<r.length;++a)i.push(r[a]);return}const o=[],s=[];n.left={id:-1,bbox:Ee(),maxLevel:Ie,count:0},n.right={id:-1,bbox:Ee(),maxLevel:Ie,count:0};let c=Number.MAX_VALUE;for(let m=0;m<3;++m)for(let I=1;I<Zt;++I){let T={min:[...e.min],max:[...e.max]},b={min:[...e.min],max:[...e.max]};const M=e.max[m],S=e.min[m],O=(M-S)*I/Zt+S;T.max[m]=O,b.min[m]=O;let P=0,k=0;for(let A=0;A<r.length;++A){const X=r[A];P+=Se(T,X.bbox)?1:0,k+=Se(b,X.bbox)?1:0}const R=P*Kt(T)+k*Kt(b);R<c&&(c=R,n.axisType=m,n.plane=O,n.left.count=P,n.left.id=0,n.right.count=k,n.right.id=0)}const l=n,f=e.max[l.axisType],h=e.min[l.axisType],u=f-h,_=Jt<u/8?u/8:Jt;let p=l.plane;if(l.left.count==0){p=f;for(var v=0;v<r.length;++v){const I=r[v].bbox.min[l.axisType];I<p&&(p=I)}p-=_}if(l.right.count==0){p=h;for(var v=0;v<r.length;++v){const T=r[v].bbox.max[l.axisType];T>p&&(p=T)}p+=_}l.plane=p;let g={min:[...e.min],max:[...e.max]},y={min:[...e.min],max:[...e.max]};g.max[l.axisType]=p,y.min[l.axisType]=p;const w=[];for(let m=0;m<r.length;++m){const I=r[m];w.push([m,Se(g,I.bbox)]),Se(g,I.bbox)&&o.push(I),Se(y,I.bbox)&&s.push(I)}r=[],ht(l.left,g,t+1,o,i),ht(l.right,y,t+1,s,i)},fe=n=>{const e=[];for(var t=0;t<n.indices.length/4;++t){let h=[n.indices[t*4]*4,n.indices[t*4+1]*4,n.indices[t*4+2]*4],u=x(n.vertices[h[0]],n.vertices[h[0]+1],n.vertices[h[0]+2]),_=x(n.vertices[h[1]],n.vertices[h[1]+1],n.vertices[h[1]+2]),p=x(n.vertices[h[2]],n.vertices[h[2]+1],n.vertices[h[2]+2]),v=La(t,[u,_,p]);e.push(v)}const{bspTreeRoot:r,tree_objects:i}=Ta(e),a=new Uint32Array(i.map(h=>h.primIdx)),o=(1<<Ie+1)-1,s=new Float32Array(o),c=new Uint32Array(o*4),l=(h,u,_)=>{if(u>Ie)return;const p=h;let v=(1<<u)-1+_;c[v*4]=p.axisType+(p.count<<2),c[v*4+1]=p.id,c[v*4+2]=(1<<u+1)-1+2*_,c[v*4+3]=(1<<u+1)+2*_,s[v]=p.plane,p.axisType!==3&&(l(p.left,u+1,_*2),l(p.right,u+1,_*2+1))};return l(r,0,0),{...n,treeIds:a,bspTree:c,bspPlanes:s,aabb:new Float32Array(B([r.bbox.min,r.bbox.max]))}},Ee=(n=[])=>{let e=d(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,1),t=d(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,1);for(const r of n)e=zt(e,r),t=Gt(t,r);return{max:t,min:e}},Aa=(n,e)=>{n.min=zt(n.min,e),n.max=Gt(n.max,e)},Sa=(n,e)=>({min:zt(n.min,e.min),max:Gt(n.max,e.max)}),Ra=n=>Bn(ge(n.max,n.min)),Ba=n=>{const[e,t,r]=Ra(n);return e*t+t*r+e*r},Kt=n=>Ba(n)*2,Se=(n,e)=>{for(let t=0;t<3;t++)if(e.min[t]>n.max[t]||e.max[t]<n.min[t])return!1;return!0},_e=n=>{const e=n.reduce((r,i)=>r+i.length,0),t=new Float32Array(e);for(let r=0;r<Math.max(...n.map(i=>i.length));r+=4)for(let i=0;i<n.length;i++)if(r<n[i].length)for(let a=0;a<4;a++)t[r*n.length+i*4+a]=n[i][r+a];return t},me=(n,e,t)=>{for(let r=0;r<e.length;r++)n[t*r+3]=e[r]},Pa=()=>[0,0,0,1],fr=({[0]:n,[1]:e,[2]:t,[3]:r})=>[n,e,t,r],Pe=(n,e)=>{const t=Fa(e),r=Je(e,Je(n,t));return d(r[0],r[1],r[2],n[3])},Je=(n,e)=>fr([n[1]*e[2]-n[2]*e[1]+e[3]*n[0]+n[3]*e[0],n[2]*e[0]-n[0]*e[2]+e[3]*n[1]+n[3]*e[1],n[0]*e[1]-n[1]*e[0]+e[3]*n[2]+n[3]*e[2],n[3]*e[3]-n[0]*e[0]-n[1]*e[1]-n[2]*e[2]]),Oa=n=>n[0]*n[0]+n[1]*n[1]+n[2]*n[2]+n[3]*n[3],Fa=n=>{const e=Oa(n);return fr([-n[0]/e,-n[1]/e,-n[2]/e,n[3]/e])},Qt=(n,e)=>{const t=Math.sin(e*.5),r=$n(n);return[r[0]*t,r[1]*t,r[2]*t,Math.cos(e*.5)]},ka=(n,e)=>{const t=Math.sqrt(2*(1+n[0]*e[0]+n[1]*e[1]+n[2]*e[2]));return[(n[1]*e[2]-n[2]*e[1])/t,(n[2]*e[0]-n[0]*e[2])/t,(n[0]*e[1]-n[1]*e[0])/t,t/2]},Ma=(n,e)=>{const t=[];for(let r=0;r<n.length;r++){const i=n[r];for(let a=0;a<e;a++){const o=t[a];if(!(o!==void 0&&n[o]<i)){t.splice(a,0,r);break}}}return t.slice(0,e)},Va={float32:new Float32Array([0]).byteLength,uint32:new Uint32Array([0]).byteLength},jn={float32x2:new Float32Array(L()).byteLength,float32x3:new Float32Array(x()).byteLength,float32x4:new Float32Array(d()).byteLength},Ea={float32x4x4:new Float32Array(rn(Gn())).byteLength},Sn={...Va,...jn,...Ea},on=async n=>{const t=await navigator.gpu.requestAdapter();if(!t)throw new Error("Could not initialize GPU adapter.");const r=await t.requestDevice(),i=document.getElementById(n);if(!i)throw new Error(`Could not find canvas with id ${n}`);const a=i.getContext("gpupresent")||i.getContext("webgpu");if(!a)throw new Error("Could not generate context for canvas.");const o=navigator.gpu.getPreferredCanvasFormat();return a.configure({device:r,format:o}),{adapter:t,device:r,canvas:i,canvasFormat:o,context:a}},fn=(n,e,t={r:0,g:0,b:0,a:1},{msaaTexture:r,depthStencilAttachmentFactory:i,otherColorAttachments:a}={})=>{const o={view:r?r.createView():e.getCurrentTexture().createView(),resolveTarget:r?e.getCurrentTexture().createView():void 0,loadOp:"clear",clearValue:t,storeOp:"store"},s=n.createCommandEncoder(),c=s.beginRenderPass({colorAttachments:[o,...a??[]],depthStencilAttachment:(i??(()=>{}))()});return{pass:c,executePass:()=>{c.end(),n.queue.submit([s.finish()])},encoder:s}},an=(n,e,t,r,i="triangle-list",a,{fragmentOverrides:o,blend:s}={})=>{const c=n.createShaderModule({code:r});return n.createRenderPipeline({layout:"auto",vertex:{module:c,entryPoint:"main_vs",buffers:e},fragment:{module:c,entryPoint:"main_fs",targets:[{format:t,blend:s}],...o},...a,primitive:{topology:i,frontFace:"ccw",cullMode:"back",...a==null?void 0:a.primitive}})},ae=(n,e,t,{depthStencilOverwrites:r}={})=>{let i;const a=()=>{i=n.createTexture({size:{width:e.width,height:e.height},format:"depth24plus",sampleCount:t,usage:GPUTextureUsage.RENDER_ATTACHMENT})},o={depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus",...r};return{createDepthTexture:a,depthStencil:o,depthStencilAttachmentFactory:()=>(i||a(),{view:i.createView(),depthLoadOp:"clear",depthClearValue:1,depthStoreOp:"store"})}},be=(n,e,t,r)=>({msaaTexture:n.createTexture({size:{width:e.width,height:e.height},format:t,sampleCount:r,usage:GPUTextureUsage.RENDER_ATTACHMENT}),multisample:{count:r}}),W=(n,e,t,r=0,i=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const a=n.createBuffer({size:e.byteLength,usage:i}),o={arrayStride:Sn[t],attributes:[{format:t,offset:0,shaderLocation:r}]};return n.queue.writeBuffer(a,0,e),{bufferLayout:o,buffer:a}},zn=(n,e,t=GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST)=>{const r=n.createBuffer({size:e.byteLength,usage:t});return n.queue.writeBuffer(r,0,e),{buffer:r}},E=(n,e,t,r,i=0)=>{const a=t.map(s=>{const c=n.createBuffer({size:s.byteLength,usage:GPUBufferUsage[r]|GPUBufferUsage.COPY_DST});return n.queue.writeBuffer(c,0,s),c}),o=n.createBindGroup({layout:e.getBindGroupLayout(i),entries:a.map((s,c)=>({binding:c,resource:{buffer:s}}))});return{buffers:a,bindGroup:o}},Un=(n,e,t,r,i=0,{createViewOverwrite:a}={})=>n.createBindGroup({layout:e.getBindGroupLayout(i),entries:[{binding:0,resource:r},{binding:1,resource:t.createView(a)}]}),ne=(n,e,t,r,i,{mips:a}={})=>{const o=n.createTexture({size:[t,r,1],format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING,mipLevelCount:a?a.length:void 0});(a||[{data:e,width:t,height:r}]).forEach(({data:l,width:f,height:h},u)=>{n.queue.writeTexture({texture:o,mipLevel:u},l,{bytesPerRow:f*4},{width:f,height:h})});const c=n.createSampler({addressModeU:"repeat",addressModeV:"repeat",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",...i});return{texture:o,sampler:c}},za=(n,e,t,r)=>{const i=n.createTexture({dimension:"2d",size:[t,r,6],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});for(let o=0;o<e.length;o++)n.queue.writeTexture({texture:i,origin:[0,0,o]},e[o],{bytesPerRow:t*4},[t,r]);const a=n.createSampler({magFilter:"linear",minFilter:"linear"});return{cubemapTexture:i,sampler:a}},Ge=(n,e)=>{const t=n.createTexture({size:[e.width,e.height],usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,format:"rgba32float"}),r=n.createTexture({size:[e.width,e.height],usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,format:"rgba32float"});return{renderDst:r,renderSrc:t,blitPingPong:a=>a.copyTextureToTexture({texture:t},{texture:r},[e.width,e.height])}},Z=(n,e,t,r,i=!1)=>{if(i){const a=new Float32Array(r/Float32Array.BYTES_PER_ELEMENT),o=new Float32Array((e.size-t.byteLength-a.byteLength)/Float32Array.BYTES_PER_ELEMENT);t=new Float32Array([...a,...t,...o]),r=0}n.queue.writeBuffer(e,r,t)},Vn=(n,e,t,r,i=!1)=>{if(i){const a=new Uint32Array(r/Float32Array.BYTES_PER_ELEMENT),o=new Uint32Array((e.size-t.byteLength-a.byteLength)/Uint32Array.BYTES_PER_ELEMENT);t=new Uint32Array([...a,...t,...o]),r=0}n.queue.writeBuffer(e,r,t)},Dt=Gn(1,0,0,0,0,1,0,0,0,0,-.5,.5,0,0,0,1),Ga=`@vertex
fn main_vs(@location(0) pos : vec2f) -> @builtin(position) vec4f
{
    return vec4f(pos, 0, 1);
}
@fragment
fn main_fs() -> @location(0) vec4f
{
    return vec4f(0.0, 0.0, 0.0, 1.0);
}
`,Ca=async()=>{const{device:n,canvas:e,context:t,canvasFormat:r}=await on("task1"),i=[].concat(B(we([0,0],10*(2/e.height))),B(we([1,0],10*(2/e.height))),B(we([1,1],10*(2/e.height)))),a=new Float32Array(i),{buffer:o,bufferLayout:s}=W(n,a,"float32x2"),c=an(n,[s],r,Ga),{pass:l,executePass:f}=fn(n,t,{r:.3921,g:.5843,b:.9294,a:1});l.setPipeline(c),l.setVertexBuffer(0,o),l.draw(i.length/2),f()},ja=(n,e)=>{const t=J("Hello (GPU) world"),r=q(`
With WebGPU, even the simplest 'Hello world!' exercise is already met with an obstacle. 
Points, the most primitive of shapes, are drawn to the screen as single pixels. 
This could work for low resolution images, but targeting something larger requires transforming the pixels into quads (two triangles forming a square) of the desired size.

The quads are transformed into a vertex buffer (flattened array of vector components) and attached to the render pass before the draw command. 
With this, the first step has been made. 
Displaying anything on the screen is just a trivial extension of drawing some points, really.
        `),i=K("task1"),a=nn();a.append(i),n.append(t,r,a),e.push(Ca)},Ua=`struct VSOut {
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
`,Na=async()=>{const{device:n,context:e,canvasFormat:t}=await on("task2"),{pass:r,executePass:i}=fn(n,e,{r:.3921,g:.5843,b:.9294,a:1}),a=[L(0,0),L(1,0),L(1,1)],o=[x(1,0,0),x(0,1,0),x(0,0,1)],s=new Float32Array(B(a)),c=new Float32Array(B(o)),{buffer:l,bufferLayout:f}=W(n,s,"float32x2"),{buffer:h,bufferLayout:u}=W(n,c,"float32x3",1),_=an(n,[f,u],t,Ua);r.setPipeline(_),r.setVertexBuffer(0,l),r.setVertexBuffer(1,h),r.draw(a.length),i()},Da=(n,e)=>{const t=J("A formal introduction to the triangle"),r=q(`
The triangle was mentioned in the previous section, but a passing mention does not do enough to emphasis the role this simple shape plays in the world of computer graphics.
The triangle, a shape made of any three unique vertices, is the most commonly used building block of virtual worlds.

The reasons (beyond simply stating this is how it was always done) come from the mathematical simplicity of the shape.
The triangle has the lowest number of vertices (points) which generate a flat surface polygon. The triangle also has a powerful feature which elevates it above its more complex cousins - Barycentric coordinates.

The set of three factors are crucial to smoothly interpolate values over the surface of the triangle (across the "axes" of its three points). 
Not only is this used to calculate the fragments which belong to the triangle between its points, but can be extended to support any attribute such as colors (see below) or as will soon be shown normals and texture coordinates.

Almost any complex graphical shape is now a collection of a multiple of three vertex points waiting to be interpolated.
`),i=K("task2"),a=nn();a.append(i),n.append(t,r,a),e.push(Na)},Ha=`struct Time {
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
`,qa=async()=>{const{device:n,context:e,canvasFormat:t}=await on("task3"),r=we(L(0,0),1),i=new Float32Array(B(r)),{bufferLayout:a,buffer:o}=W(n,i,"float32x2"),s=an(n,[a],t,Ha),{bindGroup:c,buffers:[l]}=E(n,s,[new Float32Array(1)],"UNIFORM"),f=h=>{Z(n,l,new Float32Array([h/1e3]),0);const{pass:u,executePass:_}=fn(n,e,{r:.3921,g:.5843,b:.9294,a:1});u.setPipeline(s),u.setVertexBuffer(0,o),u.setBindGroup(0,c),u.draw(r.length),_(),requestAnimationFrame(f)};requestAnimationFrame(f)},$a=(n,e)=>{const t=J("Move, please"),r=q(`
A static triangle is hardly anything to write home about. Getting the shapes to move (or better - react to input) is what makes this whole endevour worthwhile.
The GPU does not have a concept of human time. To be fair, time is not much more than a constantly increasing linear value and should be just that.

While vertex buffers are key to generate shapes in the virtual space, storage and uniform buffers are optionally used to provide auxiliary data to the GPU. 
Time, just like any other variable, can then be fed into the mathematical algorithms defined in shaders to create a property function dependent on time.

Trigonometric functions (especially sinusoidal waves) soon become a shader author's best friend.
`),i=K("task3"),a=nn();a.append(i),n.append(t,r,a),e.push(qa)},Wa=`struct Time {
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
`,Xa=async()=>{const{device:n,context:e,canvasFormat:t}=await on("task4"),r=we(L(0,0),2),i=new Float32Array(B(r)),a=N("ball-height"),o=N("ball-size"),s=N("ball-speed"),{bufferLayout:c,buffer:l}=W(n,i,"float32x2"),f=an(n,[c],t,Wa),{bindGroup:h,buffers:[u]}=E(n,f,[new Float32Array([0])],"UNIFORM"),{bindGroup:_,buffers:[p]}=E(n,f,[new Float32Array(3)],"UNIFORM",1),v=g=>{Z(n,u,new Float32Array([g/1e3]),0),Z(n,p,new Float32Array([a(),s(),o()]),0);const{pass:y,executePass:w}=fn(n,e,hn.blueScreenBlue);y.setPipeline(f),y.setVertexBuffer(0,l),y.setBindGroup(0,h),y.setBindGroup(1,_),y.draw(r.length),w(),requestAnimationFrame(v)};requestAnimationFrame(v)},Ya=(n,e)=>{const t=J("Interacting with a scene"),r=q(`
Just as time can be provided to the GPU, so can any other relevant attribute, property or value which has to be controlled externally by the CPU.

While a circle could be defined as fan of triangles defined by vertices laying on a circle, it is important to remember that circles are pointless.
Pointless, but ever so important. No matter how many vertices define a circle, it will never be a resolution-independent circle.

An alternative is to define circles in the conceptual space of the fragement shader as a boolean function of distance to the circle center. 
To do this, the circle can only exist on the surface of another shape such as a quad. The black space in the canvas below is actually the color of quad. 
The ball is being rendered on the quad's surface, much like a screen displaying a video.
`),i=nn(),a=K("task4"),o=un(),s=F(dn("ball-height",.3,.1,.9,.1),"Ball bounce height"),c=F(dn("ball-speed",4,1,16),"Ball bounce speed"),l=F(dn("ball-size",1.05,1.01,1.5,.01),"Ball size");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(Xa)},Ja=(n,e)=>{ja(n,e),Da(n,e),$a(n,e),Ya(n,e)},Za=`struct VSOut {
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
`,ft="drawing",dt="drawing-mode",Ka=["POINT","TRIANGLE","CIRCLE"],dr="points-color",ur="drawing-background-color",vr="granularity-slider",_r="size-slider",mr="clear",Qa=async()=>{const{device:n,canvas:e,context:t,canvasFormat:r}=await on(ft);let i=Ln(ur,A=>{i=A,k()});const a=lt("display-draw-instruction"),o=N(dr),s=N(dt),c=N(vr),l=N(_r),f=1e3,h=new Float32Array(6*f*jn.float32x2),{buffer:u,bufferLayout:_}=W(n,h,"float32x2"),p=new Float32Array(6*f*jn.float32x3),{buffer:v,bufferLayout:g}=W(n,p,"float32x3",1),y=an(n,[_,g],r,Za,"triangle-list");Hi(ft,A=>{switch(s()){case"TRIANGLE":O(A);break;case"CIRCLE":P(A);break;default:case"POINT":S(),T(A);break}k()});let m=0,I=0;const T=({x:A,y:X})=>{const en=se(A,0,e.width,-1,1),sn=-1*se(X,0,e.height,-1,1),j=we(L(en,sn),l()/e.height),C=new Float32Array(B(j));n.queue.writeBuffer(u,m,C),m+=6*jn.float32x2;const z=Array(6).fill(at(ve(o()))),G=new Float32Array(B(z));n.queue.writeBuffer(v,I,G),I+=6*jn.float32x3};let b=[],M=[];const S=()=>{b=[],M=[]},O=A=>{if(b.push(A),M.push(o()),M.length<3){T(A);return}const X=new Float32Array([].concat(...b.map(({x:sn,y:j})=>{const C=se(sn,0,e.width,-1,1),z=-1*se(j,0,e.height,-1,1);return L(C,z)}),B(Array(9).fill(L()))));n.queue.writeBuffer(u,m-2*6*jn.float32x2,X),m+=jn.float32x2*(3-2*6);const en=new Float32Array([].concat(...B(M.map(sn=>at(ve(sn)))),B(Array(9).fill(x()))));n.queue.writeBuffer(v,I-2*6*jn.float32x3,en),I+=jn.float32x3*(3-2*6),S()},P=A=>{if(b.push(A),M.push(o()),b.length<2){T(A);return}const X=L(se(b[0].x,0,e.width,-1,1),-1*se(b[0].y,0,e.height,-1,1)),en=L(se(b[1].x,0,e.width,-1,1),-1*se(b[1].y,0,e.height,-1,1)),sn=Ct(ge(en,X)),j=Xi(X,sn,c()),C=new Float32Array(B(j));n.queue.writeBuffer(u,m-6*jn.float32x2,C),m+=jn.float32x2*(j.length-6);const z=new Float32Array(B([...new Array(j.length)].map((G,Y)=>{const cn=Y%3===0?0:1;return at(ve(M[cn]))})));n.queue.writeBuffer(v,I-6*jn.float32x3,z),I+=jn.float32x3*(j.length-6),S()},k=()=>{const{pass:A,executePass:X}=fn(n,t,ve(i));A.setPipeline(y),A.setVertexBuffer(0,u),A.setVertexBuffer(1,v),A.draw(6*f),X()};tt(mr,()=>{n.queue.writeBuffer(u,0,new Float32Array(6*f*jn.float32x2)),n.queue.writeBuffer(v,0,new Float32Array(6*f*jn.float32x3)),k()}),Ln(dt,A=>{a({POINT:"Click to create a point",TRIANGLE:"Create three points to form a triangle",CIRCLE:"Create two points to form a circle"}[A])}),a("Click to create a point"),k()},no=(n,e)=>{const t=J("Drawing with WebGPU"),r=q(`
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
`),i=nn(),a=K(ft),o=un(),s=ct("display-draw-instruction"),c=Rn(dt,Ka),l=F($e(dr,"#000000"),"Draw color"),f=F($e(ur,"#ffffff"),"Background color"),h=F(dn(_r,10,2,100),"Point size"),u=F(dn(vr,12,4,32),"Circle granularity"),_=et(mr,"Clear canvas");o.append(s,c,l,h,u,f,_),i.append(a,o),n.append(t,r,i),e.push(Qa)},eo=`struct Uniforms {
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
`,pr="wireframe",gr="wireframe-rotation-slider",to=async()=>{const{device:n,context:e,canvasFormat:t}=await on(pr),r=ze(x(0),1),i=r.lineIndices,a=new Float32Array(B(r.vertices)),{buffer:o}=zn(n,i),{buffer:s,bufferLayout:c}=W(n,a,"float32x4"),l=an(n,[c],t,eo,"line-list"),{bindGroup:f,buffers:[h]}=E(n,l,[new Float32Array(rn(In()))],"UNIFORM",0),u=wn(x(.5,.5,.5)),_=x(0,0,10),p=x(0),v=x(0,1,0),g=Cn(_,p,v),y=Ji(-1.5,1.5,-1.5,1.5,0,100),w=V(Dt,y),m=V(w,g),I=b=>{const M=Oe(b,x(1,1,1)),S=V(M,u),O=V(m,S);Z(n,h,new Float32Array(rn(O)),0);const{pass:P,executePass:k}=fn(n,e,hn.black);P.setPipeline(l),P.setVertexBuffer(0,s),P.setIndexBuffer(o,"uint32"),P.setBindGroup(0,f),P.drawIndexed(i.length),k()},T=Ln(gr,I);I(T)},ro=(n,e)=>{const t=J("Projecting a cube"),r=q(`
Along the journey in the direction of 3D scenes from 2D shapes a key stop is orthographic projection, known for its use in early game development (or in modern, as a stylistic choice).
This projection assumes a volume created by lines directly perpendicular to the image plane.

Wireframe rendering (using lines instead of triangles) is a simplification which can be used to observe the shape without having to deal with side differentiaion (through shading or unique colors).
`),i=nn(),a=K(pr),o=un(),s=F(dn(gr,45,0,360),"Rotation in degrees about (1, 1, 1)");o.append(s),i.append(a,o),n.append(t,r,i),e.push(to)},io=`struct Uniforms {
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
`,br="perspective",ao=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(br),i=ze(x(0),1),a=new Float32Array(B(i.vertices)),o=i.lineIndices,{buffer:s}=zn(n,o),{buffer:c,bufferLayout:l}=W(n,a,"float32x4"),{buffer:f,bufferLayout:h}=W(n,new Float32Array(B([d(.5,.5,.5,1),d(0,0,1,1),d(0,1,0,1),d(0,1,1,1),d(1,0,1,1),d(1,0,0,1),d(1,1,0,1),d(1,1,1,1)])),"float32x4",1),u=an(n,[l,h],t,io,"line-list"),_=x(0,0,5),p=x(0),v=x(0,1,0),g=Cn(_,p,v),y=ie(45,r.width/r.height,.1,100),w=V(Dt,y),m=V(w,g),I=V(Oe(0,x(1,1,1)),wn(x(-2))),T=V(Oe(45,x(0,1,0)),wn(x(0))),b=V(wn(x(2)),Oe(45,x(1,1,0))),M=V(m,I),S=V(m,T),O=V(m,b),{bindGroup:P}=E(n,u,[new Float32Array(Le([M,S,O]))],"UNIFORM",0);(()=>{const{pass:R,executePass:A}=fn(n,e,hn.black);R.setPipeline(u),R.setVertexBuffer(0,c),R.setVertexBuffer(1,f),R.setIndexBuffer(s,"uint32"),R.setBindGroup(0,P),R.drawIndexed(o.length,3),A()})()},oo=(n,e)=>{const t=J("Considering different perspectives"),r=q(`
The commonly used projection is perspective projection which imitates real life cameras and human eyes. 
A common instance of perspective projection is the pinhole camera model.

The perspective model assumes camera rays have a single point oigin (the eye point) and create a 3D trapezoidal view volume by crossing the image plane.

Another key tool in managing objects on the GPU is instancing, a conceptual sibling to the flyweight design pattern. 
Multiples of an object which can be clearly differentiated by their extrinsic attributes (pose, color, size, etc.) can be instanced. 
A single set of their intrinsic attributes is enough to generate multiple instances and then, to adjust pose for example, apply a respective model matrix. With this method three cubes can be instanced from a single cube mesh definition. 

A further subclassification of perspective projections is based on number of vanishing points they consider. A vanishing point is generated by a non-parallel principal direction. 
The base case is one-point perspective projection (left), where the two other principal directions are parallel to the image plane, but there exists also two- (middle) and three-point (right) projections with one and none parallel principal directions respectively.
    `),i=nn(),a=K(br,{width:1028-128}),o=un();i.append(a,o),n.append(t,r,i),e.push(ao)},so=`struct Uniforms {
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
`,xr="airplane",yr="yaw-slider-airplane",wr="pitch-slider-airplane",Ir="roll-slider-airplane",co=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(xr),i=N(yr),a=N(wr),o=N(Ir),s=ze(x(0),1),c=s.lineIndices,l=new Float32Array(B(s.vertices)),{buffer:f}=zn(n,c),{buffer:h,bufferLayout:u}=W(n,l,"float32x4"),_=an(n,[u],t,so,"line-list"),p=x(5,5,5),v=x(0),g=x(0,1,0),y=Cn(p,v,g),w=ie(35,r.width/r.height,.1,100),m=V(Dt,w),{bindGroup:I,buffers:[T]}=E(n,_,[new Float32Array([0,0,0,0,...rn(y),...rn(m)])],"UNIFORM",0),b=[],M=Hn(.4,.4,2),S=V(Hn(.35,.25,.35),wn(x(0,-.2,3.3))),O=V(Hn(1.7,.2,1.1),wn(x(.6))),P=V(Hn(1.7,.2,1.1),wn(x(-.6))),k=V(Hn(.2,.5,.3),wn(x(0,.5,-3.3))),R=V(Hn(.5,.1,.2),wn(x(-.9,.4,-4.3))),A=V(Hn(.5,.1,.2),wn(x(.9,.4,-4.3))),X=[M,S,O,P,k,R,A];b.push(...new Array(X.length).fill(d(.7,.7,.7)));const en=(bn=In())=>V(V(Hn(.1,.3,.2),bn),wn(x(0,.5,-6)));b.push(d(0,1,0));const sn=(bn=In())=>V(V(Hn(.25,.05,.2),bn),wn(x(2,.4,-5.3))),j=(bn=In())=>V(V(Hn(.25,.05,.2),bn),wn(x(-2,.4,-5.3)));b.push(d(1,0,0),d(1,0,0));const C=(bn=In())=>V(V(wn(x(-1,.1,-.5)),bn),Hn(1,.1,.3)),z=(bn=In())=>V(V(wn(x(1,.1,-.5)),bn),Hn(1,.1,.3));b.push(d(.4,.4,1),d(.4,.4,1));const G=[...X,en(),sn(),j(),C(),z()],{bindGroup:Y,buffers:cn}=E(n,_,[new Float32Array(Le(G)),new Float32Array(B(b))],"STORAGE",1);let gn=0,yn=0,tn=0,ln=0,_n=0,D=0;const H=.1,Mn=bn=>{Z(n,T,new Float32Array([bn]),0);const En=1*i();ln=ln*(1-H)+En*H,gn+=ln;const Tn=1*a();_n=_n*(1-H)+Tn*H,yn+=_n;const Yn=1*o();D=D*(1-H)+Yn*H,tn+=D;const An=Me(-ln*20),mn=Be(-_n*20),oe=D>0?Be(D*60):In(),xe=D<0?Be(-D*60):In(),qn=V(V(Be(yn),Me(gn)),Zi(tn)),$=[...X.map(ee=>V(qn,ee)),V(qn,en(An)),V(qn,sn(mn)),V(qn,j(mn)),V(qn,C(oe)),V(qn,z(xe))],pn=$.map(ee=>V(qn,ee));Z(n,cn[0],new Float32Array(Le(pn)),0);const{pass:Pn,executePass:pe}=fn(n,e,hn.black);Pn.setPipeline(_),Pn.setVertexBuffer(0,h),Pn.setIndexBuffer(f,"uint32"),Pn.setBindGroup(0,I),Pn.setBindGroup(1,Y),Pn.drawIndexed(c.length,$.length),pe(),requestAnimationFrame(Mn)};requestAnimationFrame(Mn)},lo=(n,e)=>{const t=J("About Gimbal's lock"),r=q(`
As we descend into the depths of computer graphics, rotations of objects in three dimensions will become a big part of creating interactive showcases.

An issue which appears when using Euler angles with only three angle axes (three units of freedom) is a phenomenon known as Gimbal's lock. 
The short version is that a three-axes system cannot guarantee independent rotations. Each rotation is "local" to the previous rotations.
This can be observed when making half-rotations around two axess, which eliminates the third axis (ie. it does not have an effect).

In a later section, quaternions are introduced which are four dimensional abstractions of vectors. The fourth dimension allows the rotation information to remain absolute (without a reference system). 
One may think of these are homogeneous Euler angles.
    `),i=nn(),a=K(xr),o=un(),s=F(dn(yr,0,-1,1,.1),"Green rudder control (yaw)"),c=F(dn(wr,0,-1,1,.1),"Red elevators control (pitch)"),l=F(dn(Ir,0,-.5,.5,.1),"Blue ailerons control (roll)");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(co)},ho=(n,e)=>{ro(n,e),oo(n,e),lo(n,e)},fo=`struct SceneData {
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
`,Lr="graphics-lighting",He="rotation-around-tetrahedron",ut="subdivision-tetrahedron",Tr="tetrahedron-rotation-animation-enabled",vt="diffuse-reflectance-tetrahedron",_t="specular-reflectance-tetrahedron",mt="ambient-reflectance-tetrahedron",pt="shading-type-tetrahedron",gt="shininess-tetrahedron",bt="tetrahedron-light-emission",uo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(Lr),i=N(He),a=N(ut),o=N(pt),s=N(mt),c=N(vt),l=N(_t),f=N(gt),h=N(bt),u=new Array(8).fill(0).map((ln,_n)=>jt(_n)),{buffer:_}=zn(n,new Uint32Array(B(u[7].triangleIndices.map(ln=>Bn(ln))))),{buffer:p,bufferLayout:v}=W(n,new Float32Array(B(u[7].vertices)),"float32x4"),{buffer:g,bufferLayout:y}=W(n,new Float32Array(B([d(1,0,0),d(0,1,0),d(0,0,1),d(1,1,1),...new Array(u[7].vertices.length-4).fill(d(.4,.4,.4))])),"float32x4",1);Vn(n,_,new Uint32Array(B(u[a()].triangleIndices.map(ln=>Bn(ln)))),0,!0);const w=4,{multisample:m,msaaTexture:I}=be(n,r,t,w),{createDepthTexture:T,depthStencil:b,depthStencilAttachmentFactory:M}=ae(n,r,w),S=an(n,[v,y],t,fo,"triangle-list",{multisample:m,depthStencil:b});T();const O=Nn(i()),P=x(3*Math.sin(O),0,3*Math.cos(O)),k=x(0),R=x(0,1,0),A=Cn(P,k,R),en=ie(45,r.width/r.height,.1,100),j=V(en,A),C={"Gouraud shading (vertex)":0,"Phong shading (fragment)":1},{bindGroup:z,buffers:[G]}=E(n,S,[new Float32Array([...rn(j),...d(...P),...Ye(ve(h())),...d(s(),c(),l(),f()),...d(C[o()])])],"UNIFORM",0),Y=ln=>{const _n=Nn(ln),D=x(3*Math.sin(_n),0,3*Math.cos(_n)),H=Cn(D,k,R),bn=V(en,H);Z(n,G,new Float32Array([...rn(bn),...d(...D)]),0)};Ln(ut,ln=>{Vn(n,_,new Uint32Array(B(u[ln].triangleIndices.map(_n=>Bn(_n)))),0,!0)}),Ln(He,Y);let gn=!0;Ln(Tr,()=>gn=document.getElementById(He).disabled=!gn),Et([pt,gt,_t,vt,mt,bt],()=>{Z(n,G,new Float32Array([...Ye(ve(h())),...d(s(),c(),l(),f()),...d(C[o()])]),80)});const tn=ln=>{gn&&Y(ln/50);const{pass:_n,executePass:D}=fn(n,e,d(.2,.2,.2),{depthStencilAttachmentFactory:M,msaaTexture:I});_n.setPipeline(S),_n.setVertexBuffer(0,p),_n.setVertexBuffer(1,g),_n.setIndexBuffer(_,"uint32"),_n.setBindGroup(0,z),_n.drawIndexed(u[a()].triangleCount*3),D(),requestAnimationFrame(tn)};requestAnimationFrame(tn)},vo=(n,e)=>{const t=J("Shining light on tetrahedrons"),r=q(`
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
    `),i=nn(),a=K(Lr),o=un(),s=F(Wn(Tr,!0),"Animated rotation",!1),c=dn(He,0,-180,180,1,!0),l=F(c,"Rotation around the tetrahedron"),f=F(dn(ut,4,0,7,1),"Number of tetrahedron subdivisions"),h=F(Rn(pt,["Gouraud shading (vertex)","Phong shading (fragment)"],"Gouraud shading"),"Shading type",!1),u=F(dn(vt,1,0,2,.1),"Diffuse reflectance"),_=F(dn(_t,1,0,2,.1),"Specular reflectance"),p=F(dn(gt,15,0,50,1),"Shininess"),v=F(dn(mt,.1,0,2,.1),"Ambient reflectance"),g=F($e(bt,"#ffffff"),"Light emission",!1);o.append(s,l,f,h,u,_,v,p,g),i.append(a,o),n.append(t,r,i),e.push(uo)},_o=`struct SceneData {
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
`,Ar="monkey",Sr="rotation-around-monkey",mo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(Ar),i=await Dn(vn("models/monkey.obj"),1,!1),a=Xn(i,{indicesIn3:!0}),{buffer:o}=zn(n,a.indices),{buffer:s,bufferLayout:c}=W(n,a.vertices,"float32x4"),{buffer:l,bufferLayout:f}=W(n,a.normals,"float32x4",1),{msaaTexture:h,multisample:u}=be(n,r,t,4),{createDepthTexture:_,depthStencil:p,depthStencilAttachmentFactory:v}=ae(n,r,4),g=an(n,[c,f],t,_o,"triangle-list",{depthStencil:p,multisample:u,primitive:{frontFace:"ccw",cullMode:"back"}});_();const y=Nn(0),w=4,m=0,I=x(w*Math.sin(y),m,w*Math.cos(y)),T=x(0),b=x(0,1,0),M=Cn(I,T,b),O=ie(30,r.width/r.height,.1,100),P=V(O,M),k=In(),R=V(P,k),{bindGroup:A,buffers:[X]}=E(n,g,[new Float32Array([...rn(R),...I,1])],"UNIFORM",0);Ln(Sr,j=>{const C=Nn(j),z=x(w*Math.sin(C),m,w*Math.cos(C)),G=Cn(z,T,b),Y=V(O,G),cn=V(Y,k);Z(n,X,new Float32Array([...rn(cn),...z,1]),0),sn()});const sn=()=>{const{pass:j,executePass:C}=fn(n,e,hn.black,{depthStencilAttachmentFactory:v,msaaTexture:h});j.setPipeline(g),j.setVertexBuffer(0,s),j.setVertexBuffer(1,l),j.setIndexBuffer(o,"uint32"),j.setBindGroup(0,A),j.drawIndexed(a.indices.length),C()};sn()},po=(n,e)=>{const t=J("The Blender Monkey"),r=q(`
More interesting than primitive shapes are models created to represent specific objects. The entire graphics pipeline is made to support the display and animation of such models.

As an example, the mascot of the 3D modelling software Blender - Suzanne - is rendered to the screen below. The same lighting set up is used as with the sphere.

Another graphics feature is added to the mix - z-buffer indexing. This is the process of creating a (temporary for the time of creating the framebuffer) z-buffer. It store the z value (depth) of a fragment when it is drawn.
Each following fragment's depth value to compared to the current closest fragment and it may either be discarded (if it is covered) or it may overwrite if it is the closer (to the viewer) fragment.
    `),i=nn(),a=K(Ar),o=un(),s=F(dn(Sr,0,-180,180,1),"Rotation around the monkey");o.append(s),i.append(a,o),n.append(t,r,i),e.push(mo)},go=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,Rr="checkerboard-test",xt="texture-repeat-style",bo=["clamp-to-edge","repeat","mirror-repeat"],yt="magnification-checkerboard",wt="minification-checkerboard",st=["linear","nearest"],xo=async()=>{const{device:n,context:e,canvasFormat:t}=await on(Rr),r=N(xt),i=N(wt),a=N(yt),o=N(It),s=new Float32Array(B([d(-4,-1,-1),d(4,-1,-1),d(4,-1,-21),d(-4,-1,-21)])),c=new Uint32Array([0,1,2,0,2,3]),l=new Float32Array(B([L(-1.5,0),L(2.5,0),L(2.5,10),L(-1.5,10)])),{buffer:f}=zn(n,c),{buffer:h,bufferLayout:u}=W(n,s,"float32x4"),{buffer:_,bufferLayout:p}=W(n,l,"float32x2",1),v=an(n,[u,p],t,go,"triangle-list"),g=ta(64,8,8),y=rt(g,64,!0),w=async()=>{const{texture:m,sampler:I}=ne(n,g,64,64,{addressModeU:r(),addressModeV:r(),minFilter:i(),magFilter:a(),mipmapFilter:o()},{mips:y}),T=Un(n,v,m,I),{pass:b,executePass:M}=fn(n,e,hn.blueScreenBlue);b.setPipeline(v),b.setVertexBuffer(0,h),b.setVertexBuffer(1,_),b.setIndexBuffer(f,"uint32"),b.setBindGroup(0,T),b.drawIndexed(6),M()};Et([xt,yt,wt,It],w),w()},It="mipmap-select-checkerboard",yo=(n,e)=>{const t=J("The unseen end of the checkers board"),r=q(`
Applying texture to objects is rather trivial. The hard part comes with trying to make the texture work properly in the scene and fighting at the same time with the two elements of texture space immutability - magnification and minification or in simple words, when a texel and a pixel are not of the same size (or even aligned for that matter).

Magnification happens when texture elements (texels) cover multiple pixels. This means that many pixels have to be the color of the single texel they correlate to. Blurring can be used to smooth the rough edges created by the enlarged texture objects.

The more complex counterpart is minification, which means that a single pixel contains more than one texel. In this case color mixing (averaging) has to be applied to get a single deterministic result.

Another method for manipulating textures in space is mipmapping (mip from the latin phrase multum in parvo, "much in a small space"). Mip maps are multiple variants of the same texture in different levels of details (ie. resolution).
According to the need, a lower resolution texture can be selected to address the phenomenon of aliasing or moiré patterns. 

In the example below, the checkerboard texture has a couple levels of mipmaps created. Each level has a different color to more easily observe the transition.
The latter layers (where the texture is the farthest from the camera and therefore a lower resolution texture is called for) is just a grey blob. At this point, the checkerboard pattern has been averaged into grey.
`),i=nn(),a=K(Rr),o=un(),s=F(Rn(xt,bo,"repeat"),"Texture edge behaviour",!1),c=F(Rn(wt,st,"nearest"),"Minification behaviour",!1),l=F(Rn(yt,st,"nearest"),"Magnification behaviour",!1),f=F(Rn(It,st,"nearest"),"Mipmap behaviour",!1);o.append(s,c,l,f),i.append(a,o),n.append(t,r,i),e.push(xo)},wo=`struct SceneData {
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
`,Br="earth",Io=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(Br),{textureData:i,width:a,height:o}=await le(vn("textures/earth.jpg")),s=jt(7),{buffer:c}=zn(n,new Uint32Array(B(s.triangleIndices.map(z=>Bn(z))))),{buffer:l,bufferLayout:f}=W(n,new Float32Array(B(s.vertices)),"float32x4"),{buffer:h,bufferLayout:u}=W(n,new Float32Array(B([d(1,0,0),d(0,1,0),d(0,0,1),d(1,1,1),...new Array(s.vertices.length-4).fill(d(.4,.4,.4))])),"float32x4",1),_=4,{multisample:p,msaaTexture:v}=be(n,r,t,_),{depthStencil:g,depthStencilAttachmentFactory:y}=ae(n,r,_),w=an(n,[f,u],t,wo,"triangle-list",{multisample:p,depthStencil:g}),{sampler:m,texture:I}=ne(n,i,a,o,{minFilter:"nearest",magFilter:"nearest"}),T=Un(n,w,I,m,1),b=Nn(0),M=x(3*Math.sin(b),0,3*Math.cos(b)),S=x(0),O=x(0,1,0),P=Cn(M,S,O),R=ie(45,r.width/r.height,.1,100),X=V(R,P),{bindGroup:en,buffers:[sn]}=E(n,w,[new Float32Array(rn(X))],"UNIFORM",0),j=z=>{const G=Nn(z),Y=x(3*Math.sin(G),Math.cos(G),3*Math.cos(G)),cn=Cn(Y,S,O),yn=V(R,cn);Z(n,sn,new Float32Array(rn(yn)),0)},C=z=>{j(z/50);const{pass:G,executePass:Y}=fn(n,e,d(.5,.1,.5),{depthStencilAttachmentFactory:y,msaaTexture:v});G.setPipeline(w),G.setVertexBuffer(0,l),G.setVertexBuffer(1,h),G.setIndexBuffer(c,"uint32"),G.setBindGroup(0,en),G.setBindGroup(1,T),G.drawIndexed(s.triangleCount*3),Y(),requestAnimationFrame(C)};requestAnimationFrame(C)},Lo=(n,e)=>{const t=J("Earth ball"),r=q(`
Using the sphere algorithm from the previous section combined with the ability to apply textures, a simplified model of the Earth can be created.

The sphere texture is a two dimensional rectangle and has to be mapped to a sphere. This is done with a uv-mapping function, which in this case is spherical uv-mapping.

To address magnification and minification, settings can be fiddled with, but in some cases it may not be possible to find a perfect solution.
With the earth texture, certain regions with high elevation are prone to aliasing issues due to many sudden changes in color values. 
This could be fixed by applying a heightmap which could stretch the crowded texels over a larger surface, but on a flat surface could instead be treated with applied smoothing filters.

Note: the earth texture is quite large and may take some time to load into the browser.
`),i=nn(),a=K(Br),o=un();o.append(),i.append(a,o),n.append(t,r,i),e.push(Io)},To=(n,e)=>{yo(n,e),Lo(n,e)},Ao=`@group(0) @binding(0) var cube_sampler : sampler;
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
`,Pr="texture-sphere-with-quad",Or="env-sphere-reflect-type",Fr={"Faux reflection":0,"Mirror reflection":1,"Show normal map":2,"Bump reflection":3},So=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(Pr),[i,...a]=await Promise.all(["textures/normalmap.png","textures/cubemap/cm_left.png","textures/cubemap/cm_right.png","textures/cubemap/cm_top.png","textures/cubemap/cm_bottom.png","textures/cubemap/cm_back.png","textures/cubemap/cm_front.png"].map(Tn=>le(vn(Tn)))),o=x(0,0,3),s=x(0),c=x(0,1,0),l=Cn(o,s,c),h=ie(90,r.width/r.height,.1,100),u=V(h,l),_=Xt(h),p=Xt(l),v=na(p,[0,0],[3,3]),g=Gn(),y=ea(v,g),w=V(y,_),m=jt(7),I=B(m.triangleIndices.map(Tn=>Bn(Tn))),T=B(m.vertices.map(Tn=>Fe(Tn,u))),b=.999,M=B([d(-1,-1,b,1),d(1,-1,b,1),d(-1,1,b,1),d(1,1,b,1)]),S=[m.vertices.length+0,m.vertices.length+1,m.vertices.length+2,m.vertices.length+1,m.vertices.length+3,m.vertices.length+2],{buffer:O}=zn(n,new Uint32Array([...I,...S])),{buffer:P,bufferLayout:k}=W(n,new Float32Array([...T,...M]),"float32x4"),{buffer:R,bufferLayout:A}=W(n,new Float32Array([...B(m.vertices),...M]),"float32x4",1),{buffer:X,bufferLayout:en}=W(n,new Float32Array([...Array(m.vertices.length).fill(0),...Array(4).fill(1)]),"uint32",2),sn=4,{multisample:j,msaaTexture:C}=be(n,r,t,sn),{depthStencil:z,depthStencilAttachmentFactory:G}=ae(n,r,sn),Y=an(n,[k,A,en],t,Ao,"triangle-list",{multisample:j,depthStencil:z}),{sampler:cn,cubemapTexture:gn}=za(n,a.map(Tn=>Tn.textureData),a[0].width,a[0].height),yn=Un(n,Y,gn,cn,0,{createViewOverwrite:{dimension:"cube"}}),{bindGroup:tn,buffers:[ln,_n,D]}=E(n,Y,[new Float32Array(Le([In(),w])),new Float32Array([...o]),new Uint32Array([0])],"UNIFORM",1),{texture:H,sampler:Mn}=ne(n,i.textureData,i.width,i.height),bn=Un(n,Y,H,Mn,2),En=Tn=>{const Yn=Fr[Tn];Vn(n,D,new Uint32Array([Yn]),0);const{pass:An,executePass:mn}=fn(n,e,d(.5,.1,.5),{depthStencilAttachmentFactory:G,msaaTexture:C});An.setPipeline(Y),An.setVertexBuffer(0,P),An.setVertexBuffer(1,R),An.setVertexBuffer(2,X),An.setIndexBuffer(O,"uint32"),An.setBindGroup(0,yn),An.setBindGroup(1,tn),An.setBindGroup(2,bn),An.drawIndexed(m.triangleCount*3+S.length),mn()};En(Ln(Or,En))},Ro=(n,e)=>{const t=J("A map to the environment"),r=q(`
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
`),i=nn(),a=K(Pr),o=un(),s=F(Rn(Or,Object.keys(Fr),"Faux reflection"),"Reflection type",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(So)},Bo=(n,e)=>{Ro(n,e)},nr=`@group(0) @binding(0) var marble_sampler : sampler;
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
`,kr="shadow-quads",Po=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(kr),i=await le(vn("textures/xamp23.png")),a=new Uint32Array([0,1,2,0,2,3]),o=new Float32Array(B([L(0,0),L(1,0),L(1,1),L(0,1)])),s=new Float32Array(B([d(-2,-1,-1),d(2,-1,-1),d(2,-1,-5),d(-2,-1,-5)])),c=new Float32Array(B([d(-1,-1,-2.5),d(-1,-1,-3),d(-1,0,-3),d(-1,0,-2.5)])),l=new Float32Array(B([d(.25,-.5,-1.25),d(.75,-.5,-1.25),d(.75,-.5,-1.75),d(.25,-.5,-1.75)])),{buffer:f}=zn(n,new Uint32Array([...a,...a.map(cn=>cn+4),...a.map(cn=>cn+8),...a.map(cn=>cn+12),...a.map(cn=>cn+16)])),{buffer:h,bufferLayout:u}=W(n,new Float32Array([...s,...c,...l,...c,...l]),"float32x4"),{buffer:_,bufferLayout:p}=W(n,new Float32Array([...o]),"float32x2",1),{depthStencil:v,depthStencilAttachmentFactory:g}=ae(n,r,1),y=an(n,[u,p],t,nr,"triangle-list",{depthStencil:v}),{depthStencil:w}=ae(n,r,1,{depthStencilOverwrites:{depthCompare:"greater"}}),m=an(n,[u,p],t,nr,"triangle-list",{depthStencil:w,primitive:{cullMode:"none"}},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),I=rt(i.textureData,i.width),{texture:T,sampler:b}=ne(n,i.textureData,i.width,i.height,{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest",mipmapFilter:"nearest"},{mips:I}),M=Un(n,y,T,b),{texture:S,sampler:O}=ne(n,new Uint8Array([255,0,0,255]),1,1),P=Un(n,y,S,O),{texture:k,sampler:R}=ne(n,new Uint8Array([0,0,0,125]),1,1),A=Un(n,y,k,R),{bindGroup:X}=E(n,y,[new Float32Array(rn(In()))],"UNIFORM",1),{bindGroup:en,buffers:[sn]}=E(n,y,[new Float32Array(rn(In()))],"UNIFORM",1),j=-1-2-.001,C=Gn(1,0,0,0,0,1,0,0,0,0,1,0,0,1/j,0,0),z=In(),G=cn=>{const gn=wn(cn),yn=wn(Qn(cn,-1)),tn=V(V(V(gn,C),yn),z);Z(n,sn,new Float32Array(rn(tn)),0)},Y=cn=>{const gn=cn/1e3,yn=x(2*Math.cos(gn),2,2*Math.sin(gn)-2);G(yn);const{pass:tn,executePass:ln}=fn(n,e,hn.blueScreenBlue,{depthStencilAttachmentFactory:g});tn.setVertexBuffer(0,h),tn.setVertexBuffer(1,_),tn.setIndexBuffer(f,"uint32"),tn.setPipeline(y),tn.setBindGroup(0,M),tn.setBindGroup(1,X),tn.drawIndexed(6),tn.setPipeline(m),tn.setBindGroup(1,en),tn.setBindGroup(0,A),tn.drawIndexed(12,void 0,6),tn.setPipeline(y),tn.setBindGroup(1,X),tn.setBindGroup(0,P),tn.drawIndexed(12,void 0,18),ln(),requestAnimationFrame(Y)};requestAnimationFrame(Y)},Oo=(n,e)=>{const t=J("Shadow as a shape"),r=q(`
Implementing shadows in the rasterization pipeline is no simple task. Shapes have very limited information about the existence of other shapes out of the box.
The entire system is based on a simple ordered drawing of shapes to the screen.

There is a way to implement shadows while staying in the shapes only paradigm - projection shadows. The concept is simple, shadows are in fact copies of their obstructing object.
The projection shadow objects are drawn with the appropriate transformation matrix (depending on the light source).

To make sure shadows only exist on the surfaces of shadow-catching objects (such as the plane in the example below and not beyond it), 
clever manipulation of the z-buffer can be used to make sure a shape is only drawn if there exists a fragement beneath it.
Further modification of the draw orders or implementations of draw layers would allow mixing and matching shadow casters and shadow catchers.
    `),i=nn(),a=K(kr),o=un();o.append(),i.append(a,o),n.append(t,r,i),e.push(Po)},Fo=(n,e)=>{Oo(n,e)},ko=`@group(0) @binding(0) var marble_sampler : sampler;
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
`,Mo=`@group(0) @binding(0) var<uniform> teapot_model : mat4x4f;
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
`,Vo=`@group(0) @binding(0) var<uniform> shadow_model : mat4x4f;

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
`,Mr="teapot-proj-shadow",Vr="teapot-movement-teapot",Er="light-movement-teapot",Eo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(Mr),i=N(Vr,"checked"),a=N(Er,"checked"),o=await le(vn("textures/xamp23.png")),s=await Dn(vn("models/teapot.obj"),.25,!1),c=Xn(s,{indicesIn3:!0}),{depthStencil:l,depthStencilAttachmentFactory:f}=ae(n,r,4),{depthStencil:h}=ae(n,r,4,{depthStencilOverwrites:{depthCompare:"greater"}}),{msaaTexture:u,multisample:_}=be(n,r,t,4),{buffer:p}=zn(n,c.indices),{buffer:v,bufferLayout:g}=W(n,c.vertices,"float32x4"),{buffer:y,bufferLayout:w}=W(n,c.normals,"float32x4",1),{buffer:m,bufferLayout:I}=W(n,c.colors,"float32x4",2),T=an(n,[g,w,I],t,Mo,"triangle-list",{depthStencil:l,multisample:_}),b=an(n,[g],t,Vo,"triangle-list",{depthStencil:h,multisample:_,primitive:{cullMode:"front"}},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),M=new Uint32Array([0,1,2,0,2,3]),S=new Float32Array(B([L(0,0),L(1,0),L(1,1),L(0,1)])),O=new Float32Array(B([d(-2,-1,-1),d(2,-1,-1),d(2,-1,-5),d(-2,-1,-5)])),{buffer:P}=zn(n,new Uint32Array([...M])),{buffer:k,bufferLayout:R}=W(n,new Float32Array([...O]),"float32x4"),{buffer:A,bufferLayout:X}=W(n,new Float32Array([...S]),"float32x2",1),en=an(n,[R,X],t,ko,"triangle-list",{depthStencil:l,multisample:_}),sn=rt(o.textureData,o.width),{texture:j,sampler:C}=ne(n,o.textureData,o.width,o.height,{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest",mipmapFilter:"nearest"},{mips:sn}),z=Un(n,en,j,C),{bindGroup:G,buffers:[Y,cn]}=E(n,T,[new Float32Array(rn(Gn())),new Float32Array(x())],"UNIFORM",0),{bindGroup:gn,buffers:[yn]}=E(n,b,[new Float32Array(rn(In()))],"UNIFORM",0),tn=-1-2-.001,ln=Gn(1,0,0,0,0,1,0,0,0,0,1,0,0,1/tn,0,0),_n=(En,Tn)=>{const Yn=wn(En),An=wn(Qn(En,-1)),mn=V(V(V(Yn,ln),An),Tn);Z(n,yn,new Float32Array(rn(mn)),0)};let D=0,H=0,Mn=0;const bn=En=>{const Tn=(En-Mn)/1e3;D+=i()?Tn:0,H+=a()?Tn:0;const Yn=x(2*Math.cos(H),2,2*Math.sin(H)-2),An=wn(x(0,(Math.cos(D)*3-1)/4,-3));_n(Yn,An),Z(n,Y,new Float32Array(rn(An)),0),Z(n,cn,new Float32Array(Yn),0);const{pass:mn,executePass:oe}=fn(n,e,hn.blueScreenBlue,{depthStencilAttachmentFactory:f,msaaTexture:u});mn.setPipeline(en),mn.setVertexBuffer(0,k),mn.setVertexBuffer(1,A),mn.setIndexBuffer(P,"uint32"),mn.setBindGroup(0,z),mn.drawIndexed(6),mn.setPipeline(b),mn.setBindGroup(0,gn),mn.setVertexBuffer(0,v),mn.setIndexBuffer(p,"uint32"),mn.drawIndexed(c.indices.length),mn.setPipeline(T),mn.setVertexBuffer(0,v),mn.setVertexBuffer(1,y),mn.setVertexBuffer(2,m),mn.setIndexBuffer(p,"uint32"),mn.setBindGroup(0,G),mn.drawIndexed(c.indices.length),oe(),Mn=En,requestAnimationFrame(bn)};requestAnimationFrame(bn)},zo=(n,e)=>{const t=J("Tea time"),r=q(`
Before venturing into the topic of shadow maps, another example of projection shadows (previous section) is shown to provide a basis of comparison.

The opacity of the teapot's shadow is generated by enabling blending in the render pipeline configuration. 
This is required to let the projected shape mix colors with the fragements beneath it, instead of overwriting them in the z-buffer.
`),i=nn(),a=K(Mr),o=un(),s=F(Wn(Vr,!0),"Teapot movement",!1),c=F(Wn(Er,!0),"Light movement",!1);o.append(s,c),i.append(a,o),n.append(t,r,i),e.push(Eo)},Go=`@group(0) @binding(0) var marble_sampler : sampler;
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
`,Co=`@group(0) @binding(0) var<uniform> teapot_model : mat4x4f;
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
`,jo=`@group(0) @binding(0) var<uniform> model : mat4x4f;
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
`,Ze="shadow-mapping",zr="teapot-movement-shadow-mapping",Gr="light-movement-shadow-mapping",Uo=async()=>{const n=N(zr,"checked"),e=N(Gr,"checked"),t=await le(vn("textures/xamp23.png")),r=await Dn(vn("models/teapot.obj"),.25,!1),i=Xn(r,{indicesIn3:!0}),{device:a,context:o,canvasFormat:s,canvas:c}=await on(Ze),l=document.getElementById(Ze+"-shadow"),f=l.getContext("gpupresent")||l.getContext("webgpu");f.configure({device:a,format:s});const{depthStencil:h,depthStencilAttachmentFactory:u}=ae(a,c,1),{buffer:_}=zn(a,i.indices),{buffer:p,bufferLayout:v}=W(a,i.vertices,"float32x4"),{buffer:g,bufferLayout:y}=W(a,i.normals,"float32x4",1),{buffer:w,bufferLayout:m}=W(a,i.colors,"float32x4",2),I=an(a,[v,y,m],s,Co,"triangle-list",{depthStencil:h}),T=a.createTexture({size:{width:l.width,height:l.height,depthOrArrayLayers:1},mipLevelCount:1,sampleCount:1,dimension:"2d",format:"rgba32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC}),b=T.createView(),M=a.createShaderModule({code:jo}),S=a.createRenderPipeline({layout:"auto",vertex:{module:M,entryPoint:"main_vs",buffers:[v]},fragment:{module:M,entryPoint:"main_fs",targets:[{format:s},{format:"rgba32float"}]},primitive:{cullMode:"none",topology:"triangle-list"}}),{bindGroup:O,buffers:[P,k]}=E(a,S,[new Float32Array(rn(In())),new Float32Array(rn(Gn()))],"UNIFORM",0),R=new Uint32Array([0,1,2,0,2,3]),A=new Float32Array(B([L(0,0),L(1,0),L(1,1),L(0,1)])),X=new Float32Array(B([d(-2,-1,-1),d(2,-1,-1),d(2,-1,-5),d(-2,-1,-5)])),{buffer:en}=zn(a,new Uint32Array([...R])),{buffer:sn,bufferLayout:j}=W(a,new Float32Array([...X]),"float32x4"),{buffer:C,bufferLayout:z}=W(a,new Float32Array([...A]),"float32x2",1),G=an(a,[j,z],s,Go,"triangle-list",{depthStencil:h}),Y=a.createBindGroup({layout:G.getBindGroupLayout(2),entries:[{binding:0,resource:T.createView()}]}),cn=new Float32Array(rn(ie(90,1,.001,6))),gn=$=>{const pn=ie(100,1,.01,4),Pn=Cn($,x(0,-1,-3),ar.up);return V(pn,Pn)},yn=$=>{const pn=new Float32Array(rn(gn($)));Z(a,k,pn,0),Z(a,_n,pn,0)},{bindGroup:tn,buffers:[ln,_n,D]}=E(a,G,[cn,new Float32Array(rn(Gn())),new Float32Array(rn(Gn()))],"UNIFORM",1),H=rt(t.textureData,t.width),{texture:Mn,sampler:bn}=ne(a,t.textureData,t.width,t.height,{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest",mipmapFilter:"nearest"},{mips:H}),En=Un(a,G,Mn,bn),{bindGroup:Tn,buffers:[Yn,An]}=E(a,I,[new Float32Array(rn(Gn())),new Float32Array(x()),cn],"UNIFORM",0);let mn=0,oe=0,xe=0;const qn=$=>{const pn=($-xe)/1e3;mn+=n()?pn:0,oe+=e()?pn:0;const Pn=x(2*Math.cos(oe),2,2*Math.sin(oe)-2);Z(a,An,new Float32Array(Pn),0),yn(Pn);const pe=wn(x(0,(Math.cos(mn)*3-1)/4,-3)),ee=new Float32Array(rn(pe));Z(a,Yn,ee,0),Z(a,P,ee,0),Z(a,D,ee,0);const Ae=a.createCommandEncoder(),ue=Ae.beginRenderPass({colorAttachments:[{view:f.getCurrentTexture().createView(),loadOp:"clear",clearValue:{r:0,g:0,b:0,a:1},storeOp:"store"},{view:b,loadOp:"clear",clearValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]});ue.setPipeline(S),ue.setVertexBuffer(0,p),ue.setIndexBuffer(_,"uint32"),ue.setBindGroup(0,O),ue.drawIndexed(i.indices.length),ue.end();const kn=Ae.beginRenderPass({colorAttachments:[{view:o.getCurrentTexture().createView(),loadOp:"clear",clearValue:hn.blueScreenBlue,storeOp:"store"}],depthStencilAttachment:u()});kn.setPipeline(G),kn.setVertexBuffer(0,sn),kn.setVertexBuffer(1,C),kn.setIndexBuffer(en,"uint32"),kn.setBindGroup(0,En),kn.setBindGroup(1,tn),kn.setBindGroup(2,Y),kn.drawIndexed(6),kn.setPipeline(I),kn.setVertexBuffer(0,p),kn.setVertexBuffer(1,g),kn.setVertexBuffer(2,w),kn.setIndexBuffer(_,"uint32"),kn.setBindGroup(0,Tn),kn.drawIndexed(i.indices.length),kn.end(),a.queue.submit([Ae.finish()]),xe=$,requestAnimationFrame(qn)};requestAnimationFrame(qn)},No=(n,e)=>{const t=J("Tea time 2: the tea that wasn't"),r=q(`
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
`),i=nn(),a=K(Ze),o=un(),s=F(Wn(zr,!0),"Teapot movement",!1),c=F(Wn(Gr,!0),"Light movement",!1);o.append(s,c),i.append(a,o);const l=nn(),f=K(Ze+"-shadow");l.append(f),n.append(t,r,i,l),e.push(Uo)},Do=(n,e)=>{zo(n,e),No(n,e)},Ho=`struct SceneData {
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
`,Lt="camera-movement",Cr="movement-type-cam-movement",qo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(Lt),i=N(Cr),a=await Dn(vn("models/monkey.obj"),1,!1),o=Xn(a,{indicesIn3:!0}),{buffer:s}=zn(n,o.indices),{buffer:c,bufferLayout:l}=W(n,o.vertices,"float32x4"),{buffer:f,bufferLayout:h}=W(n,o.normals,"float32x4",1),{msaaTexture:u,multisample:_}=be(n,r,t,4),{depthStencil:p,depthStencilAttachmentFactory:v}=ae(n,r,4),g=an(n,[l,h],t,Ho,"triangle-list",{depthStencil:p,multisample:_}),y=x(0,0,5);let w=x(0,0,5);const m=x(0);let I=x();const T=x(0,1,0);let b=x(0,1,0);const M=Cn(y,m,T),O=ie(30,r.width/r.height,.1,100),P=V(O,M),k=In(),R=V(P,k),{bindGroup:A,buffers:[X]}=E(n,g,[new Float32Array([...rn(R),...y,1])],"UNIFORM",0),en=1,sn=.01;let j=i(),C=0,z=0,G=0,Y=0,cn=0,gn=0,yn=Pa();const tn=$=>se($,0,512,-1,1);let ln=L(),_n=L(),D=0;const H=$=>{D=0,ln=L($.x,$.y),En=0,C=$.x,z=$.y,j=i()},Mn=$=>{if((j==="Dollying"||j==="Panning")&&(cn=sn*($.x-C),gn=-sn*($.y-z)),j==="Quaternion rotation"||j==="Euler rotation"){G+=-en*($.x-C),Y+=-en*($.y-z);const pn=-tn(C),Pn=tn(z),pe=-tn($.x),ee=tn($.y),Ae=Math.sqrt(pn*pn+Pn*Pn),ue=Math.sqrt(pe*pe+ee*ee),kn=je=>je>1/Math.sqrt(2)?1/(2*je):Math.sqrt(1-je*je),Gi=x(pn,Pn,kn(Ae)),Ci=x(pe,ee,kn(ue)),ji=ka(Gi,Ci);yn=Je(yn,ji)}C=$.x,z=$.y},bn=$=>{if(cn=0,gn=0,j!=="Quaternion rotation"||(_n=L($.x,$.y),sr(ln,_n)))return;const pn=ge(_n,ln);D=Math.min(Ct(pn),20)};let En=0;const Tn=()=>{if(j!=="Quaternion rotation"){D=0;return}C=ln[0],z=ln[1];const $=D*Math.exp(-En/150),pn=U(ln,Qn($n(ge(_n,ln)),$));D<.2&&(D=0),En+=1,Mn({x:pn[0],y:pn[1]})};We(Lt,{onStart:H,onMove:Mn,onEnd:bn});const Yn=()=>{const $=V(Be(Y),Me(G)),pn=Fe(y,$),Pn=Fe(T,$);return{view:Cn(pn,m,Pn),eye:pn}},An=()=>{const $=Bn(Pe([...b,1],yn)),pn=Bn(Pe([...w,1],yn));return{view:Cn(pn,I,$),eye:pn}},mn=()=>(w[2]+=gn,An()),oe=()=>{const $=Qn(Bn(Pe(d(1),yn)),cn),pn=Qn(Bn(Pe(d(0,1),yn)),gn);return I=ge(I,U($,pn)),An()},xe=()=>{const $={"Euler rotation":Yn,"Quaternion rotation":An,Dollying:mn,Panning:oe}[i()](),pn=V(O,$.view),Pn=V(pn,k);Z(n,X,new Float32Array([...rn(Pn),...$.eye,1]),0)},qn=()=>{D>0&&Tn(),xe();const{pass:$,executePass:pn}=fn(n,e,hn.black,{depthStencilAttachmentFactory:v,msaaTexture:u});$.setPipeline(g),$.setVertexBuffer(0,c),$.setVertexBuffer(1,f),$.setIndexBuffer(s,"uint32"),$.setBindGroup(0,A),$.drawIndexed(o.indices.length),pn(),requestAnimationFrame(qn)};requestAnimationFrame(qn)},$o=(n,e)=>{const t=J("Quaternions - engineering space magic"),r=q(`
Quaternions get a bad reputation due their abstract complexity and use of spooky imaginary numbers. But looking past the quaternion mathematical definition, it helps to understand the concept and foremost, the purpose of the enigmatic quaternion.

The quaternion addresses an issue which was mentioned earlier - Gimbal's lock. Using only three degrees of freedom to control rotation results in two axis "overpowering" the third - or in other words, rotations are local and impact each other.
Quaternions allow "absolute" rotation where the reference is world space. 
The fourth degree enables the quaternion to store more information about the rotation which in turn enables the rotation to always be in the correct direction relative to the camera or world space.

In the example below it is easy to obfuscate up one of the axes of rotation (where only two are being manipulated). One half rotation around the y-axis will flip the direction of rotation, while the acting "force" did not change its form. Changing to quaternion rotation solves this issue. the applied rotation is always the same, no matter what the previous rotation was.

The quaternion rotation is implemented with trackball movement which simulates the use of trackball peripheral device. The trackball allows the user to rotate in three directions unlike the mouse which is bound to the two dimensional plane. In the canvas below (when in quaternion rotation mode), the moving along the center axes of the canvas will rotated strictly about the respective axis, whereas movement along the edges of the canvas will generate more complex rotations involving the third rotation axis (depth).

Two more camera movement options are implemented - panning and dollying - which are translational movements along the parallel plane and along the perpendicular plane respectively.
`),i=nn(),a=K(Lt),o=un(),s=F(Rn(Cr,["Euler rotation","Quaternion rotation","Dollying","Panning"],"Quaternion rotation"),"Movement type",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(qo)},Wo=(n,e)=>{$o(n,e)},Xo=(n,e)=>({intrinsics:ie(85,1,.001,100),extrinsics:jr(n,e)}),jr=(n,e)=>{const t=U(n,e);return Cn(n,t,x(0,1,0))},Tt=n=>V(n.intrinsics,n.extrinsics),er=n=>"instances"in n;var xn=(n=>(n[n.OUT_OF_BOUNDS=-1]="OUT_OF_BOUNDS",n[n.EMPTY=0]="EMPTY",n[n.NORMAL=1]="NORMAL",n[n.PICKUP=2]="PICKUP",n[n.SPAWN=3]="SPAWN",n[n.END=4]="END",n[n.LIGHT=5]="LIGHT",n))(xn||{}),Q=(n=>(n[n.NORTH=1]="NORTH",n[n.EAST=2]="EAST",n[n.SOUTH=4]="SOUTH",n[n.WEST=8]="WEST",n))(Q||{});const Yo=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;\r
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
`,Jo={[Q.NORTH]:Q.SOUTH,[Q.EAST]:Q.WEST,[Q.SOUTH]:Q.NORTH,[Q.WEST]:Q.EAST},Ur=n=>{const e=[];n&Q.NORTH&&e.push(Q.NORTH),n&Q.EAST&&e.push(Q.EAST),n&Q.SOUTH&&e.push(Q.SOUTH),n&Q.WEST&&e.push(Q.WEST);const t=Math.round(Math.random()*e.length-.5);return e[t]},Nr={1:L(0,1),2:L(1,0),4:L(0,-1),8:L(-1,0)},At={[Q.NORTH]:d(0,0,1,0),[Q.EAST]:d(1,0,0,0),[Q.SOUTH]:d(0,0,-1,0),[Q.WEST]:d(-1,0,0,0)},Zn=12,te=(n,e,t)=>{n[e[0]][e[1]]=t},Ke=(n,e)=>e[1]>=0&&e[1]<Zn&&e[0]>=0&&e[0]<Zn?n[e[0]][e[1]]:xn.OUT_OF_BOUNDS,Ne=(n,e)=>Ke(n,e)===xn.EMPTY,Jn=(n,e)=>{const t=Ke(n,e);return t===xn.EMPTY||t===xn.OUT_OF_BOUNDS},Zo=(n,e,t)=>{switch(t){case Q.NORTH:return Jn(n,U(e,L(-1,1)))&&Ne(n,U(e,L(0,1)))&&Jn(n,U(e,L(1,1)));case Q.EAST:return Jn(n,U(e,L(1,1)))&&Ne(n,U(e,L(1,0)))&&Jn(n,U(e,L(1,-1)));case Q.SOUTH:return Jn(n,U(e,L(-1,-1)))&&Ne(n,U(e,L(0,-1)))&&Jn(n,U(e,L(1,-1)));case Q.WEST:return Jn(n,U(e,L(-1,1)))&&Ne(n,U(e,L(-1,0)))&&Jn(n,U(e,L(-1,-1)))}return!1},Ko=(n,e)=>{const t=!Jn(n,U(e,L(0,1)))&&!Jn(n,U(e,L(0,-1))),r=!Jn(n,U(e,L(1,0)))&&!Jn(n,U(e,L(-1,0)));return t||r},Qo=()=>Math.random()<.15?xn.LIGHT:xn.NORMAL,ns=(n,e)=>(te(n,U(e,L(1,0)),xn.NORMAL),te(n,U(e,L(0,0)),xn.SPAWN),te(n,U(e,L(-1,0)),xn.NORMAL),te(n,U(e,L(1,1)),xn.LIGHT),te(n,U(e,L(0,1)),xn.NORMAL),te(n,U(e,L(-1,1)),xn.LIGHT),te(n,U(e,L(1,2)),xn.NORMAL),te(n,U(e,L(0,2)),xn.NORMAL),te(n,U(e,L(-1,2)),xn.NORMAL),U(e,L(0,3))),es=()=>{const n=Array.from(Array(Zn).fill(null),()=>Array(Zn).fill(xn.EMPTY)),e=L(Zn/2,Zn/2),t=ns(n,e);let r=!1;const i=a=>{const o=Ko(n,a),s=Qo();if(s===xn.EMPTY||o)return;te(n,a,s);let c=0;const l=[Q.NORTH,Q.EAST,Q.SOUTH,Q.WEST];l.sort(()=>Math.sign(Math.random()*2-1));for(let f=0;f<4;f++){const h=l[f];if(!Zo(n,a,h)||s===xn.LIGHT&&c>=3)continue;const u=U(a,Nr[h]);i(u),++c}c===0&&!r&&(te(n,a,xn.END),r=!0)};return i(t),{map:n,center:e}},ts=n=>{const e=[],t=[];let r=null;const i=Array.from(Array(Zn).fill(null),()=>Array(Zn).fill(null));for(let a=0;a<n.length;a++)for(let o=0;o<n[a].length;o++){const s=L(o,a),c=Ke(n,s);if(c===xn.EMPTY)continue;let l=0;for(let h=0;h<4;h++){const u=1<<h,_=Ke(n,U(s,Nr[u]));_!==xn.OUT_OF_BOUNDS&&_!==xn.EMPTY&&(l+=1<<h)}const f={position:s,cardinality:l,type:c};e.push(f),i[o][a]=f,c===xn.LIGHT&&t.push(f),c===xn.END&&(r=f)}return{tileSet:{allTiles:e,lightTiles:t,endTile:r},tileMap:i}},rs=()=>{const{map:n,center:e}=es(),{tileSet:t,tileMap:r}=ts(n);return{tileSet:t,tileMap:r,center:e}},is=n=>L(Math.round(n[0]/Kn+Zn/2),Math.round(n[2]/Kn+Zn/2)),Te=n=>x(Kn*(n[0]-Zn/2),0,Kn*(n[1]-Zn/2)),as=n=>{let e=new Float32Array,t=new Float32Array,r=new Float32Array,i=[];for(const a of n){const o=ps(a);e=new Float32Array([...e,...o.vertices]),t=new Float32Array([...t,...o.normals]),r=new Float32Array([...r,...o.uvs]),i=[...i,...o.lights]}return{vertices:e,normals:t,uvs:r,lights:i}},os=(n,e)=>{const t=is(e),r=n[t[0]][t[1]];return r===null?(console.error("next does not exist"),null):r},ss=async({device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:r,depthStencilTextureView:i},multisampleData:{msaaTextureView:a,multisample:o}}},s,{shadowMapTexture:c,lightSourcesBuffer:l,activeLightIndicesBuffer:f},{playerPerspectiveBuffer:h,playerPositionBuffer:u})=>{const{texture:_,sampler:p}=await Ve(n,vn("game/dungeon_textures_albedo.png")),{buffer:v,bufferLayout:g}=W(n,s.vertices,"float32x4"),{buffer:y,bufferLayout:w}=W(n,s.normals,"float32x4",1),{buffer:m,bufferLayout:I}=W(n,s.uvs,"float32x2",2),T=an(n,[g,w,I],t,Yo,"triangle-list",{primitive:{frontFace:"ccw",cullMode:"front"},depthStencil:r,multisample:o},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),b=n.createBindGroup({layout:T.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:h}},{binding:1,resource:{buffer:u}}]}),M=Un(n,T,_,p,1),S=n.createBindGroup({layout:T.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:l}},{binding:1,resource:c.createView()},{binding:2,resource:{buffer:f}}]});return{pass:P=>{const k={view:a,resolveTarget:e.getCurrentTexture().createView(),loadOp:"clear",clearValue:hn.black,storeOp:"store"},R=P.beginRenderPass({colorAttachments:[k],depthStencilAttachment:{view:i,depthLoadOp:"clear",depthClearValue:1,depthStoreOp:"store"}});R.setPipeline(T),R.setVertexBuffer(0,v),R.setVertexBuffer(1,y),R.setVertexBuffer(2,m),R.setBindGroup(0,b),R.setBindGroup(1,M),R.setBindGroup(2,S),R.draw(s.vertices.length/4),R.end()}}},cs=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;\r
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
`,ls=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;
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
`,tr=4,St=30,Dr=n=>{const e=Cn(Bn(n.position),Bn(U(n.position,n.direction)),x(0,1,0)),t=ie(170,5,.01,Kn*2);return V(t,e)},hs=n=>{n.active=!1,n.intensity=0},fs=n=>{n.active=!0},ds=n=>new Float32Array(n.flatMap(e=>[B([e.position,e.direction]),rn(Dr(e)),[...e.tint,e.intensity]].flat())),us=({device:n},e,t)=>{let r=t.reduce((T,b)=>T.vertexCount>b.vertexCount?T:b,t[0]);const i=n.createShaderModule({code:ls}),a=n.createRenderPipeline({layout:"auto",vertex:{module:i,entryPoint:"main_vs",buffers:[r.vertexBufferLayout]},fragment:{module:i,entryPoint:"main_fs",targets:[{format:"rgba32float"}]},primitive:{frontFace:"ccw",cullMode:"none",topology:"triangle-list"},depthStencil:{depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"}}),o=n.createTexture({size:{width:2048,height:512,depthOrArrayLayers:e.length},format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),s=n.createTexture({size:{width:2048,height:512,depthOrArrayLayers:e.length},dimension:"2d",format:"rgba32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),c=e.map(T=>E(n,a,[new Float32Array(rn(Dr(T)))],"UNIFORM",0).bindGroup),l=t.map(T=>{const b=er(T)?new Float32Array(Le(T.modelMatrices)):new Float32Array(rn(In()));return E(n,a,[b],"STORAGE",1).bindGroup}),{bindGroup:f}=E(n,a,[new Float32Array(rn(In()))],"UNIFORM",2),{bindGroup:h,buffers:[u]}=E(n,a,[new Float32Array(rn(In()))],"UNIFORM",2),_=(T,b)=>{if(b%2===0)return;const M=T/1e3,S=wn([.01*Math.sin(M)*Math.random(),.01*Math.sin(M)*Math.random(),.01*Math.sin(M)*Math.random()]);Z(n,u,new Float32Array(rn(S)),0)},p=(T,b,M)=>{I(b),_(b,M);for(let S=0;S<e.length;S++){if(!g.includes(S))continue;const O=T.beginRenderPass({colorAttachments:[{view:s.createView({baseArrayLayer:S,arrayLayerCount:1}),loadOp:"clear",clearValue:hn.black,storeOp:"store"}],depthStencilAttachment:{view:o.createView({baseArrayLayer:S,arrayLayerCount:1}),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:1}});O.setPipeline(a),O.setBindGroup(0,c[S]);for(let P=0;P<t.length;P++){const k=t[P];if(O.setVertexBuffer(0,k.vertexBuffer),O.setBindGroup(1,l[P]),!k.indexBuffer||!k.triangleCount){O.setBindGroup(2,f),O.draw(k.vertexCount);continue}O.setBindGroup(2,h);const R=er(k)?k.instances:void 0;O.setIndexBuffer(k.indexBuffer,"uint32"),O.drawIndexed(k.triangleCount*3,R)}O.end()}},v=[];let g=[];const y=n.createBuffer({size:new Uint32Array(tr).byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.length>St&&console.warn("[initialization] number of lights larger than allowed limit");const w=n.createBuffer({size:(Sn.float32x4*2+Sn.float32x4x4+Sn.float32x4)*St,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(w,0,ds(e));const m=T=>{g=Ma(e.map(b=>or(ge(b.position,d(...T,1)))),tr),n.queue.writeBuffer(y,0,new Uint32Array(g));for(const b of g)fs(e[b]);for(let b=0;b<e.length;b++)if(!g.includes(b)){hs(e[b]);const M=Sn.float32x4*2+Sn.float32x4x4+Sn.float32x4;Z(n,w,new Float32Array([0]),M*b+M-Sn.float32)}for(const b of v)b(g)},I=T=>{const b=S=>S<6?S+=.1*Math.random():Math.sin(T/1e4)*Math.random()+6,M=Sn.float32x4*2+Sn.float32x4x4+Sn.float32x4;for(const S of g){const O=e[S];O.intensity=b(O.intensity),Z(n,w,new Float32Array([O.intensity]),M*S+M-Sn.float32)}};return{renderable:{pass:p,onTileChange:m},lightData:{lights:e,shadowMapTexture:s,activeLightsChangeListeners:v,lightSourcesBuffer:w,activeLightIndicesBuffer:y}}},vs=n=>{const e=Kn/2-.1,t=Ur(~n.cardinality&15),r=At[t],i=Te(n.position),a=U(d(...U(x(0,.4,0),i),1),Qn(r,e));return{direction:At[Jo[t]],position:a,intensity:0,tint:x(.9,.4,0),active:!1}},_s=({device:n},e)=>{const t=ze(x(),1),r=[L(0,0),L(0,1),L(0,1),L(0,0),L(0,0),L(0,1),L(0,1),L(0,0)],i=e.map(u=>{const _=wn(Bn(U(u.position,U(Qn(u.direction,.1),d(0,-.65,0,0))))),p=V(Me(90),Oe(30,Bn(u.direction))),v=Hn(.1,.65,.1);return V(V(_,p),v)}),{buffer:a}=zn(n,new Uint32Array(B(t.triangleIndices.map(u=>Bn(u))))),{buffer:o,bufferLayout:s}=W(n,new Float32Array(B(t.vertices)),"float32x4"),{buffer:c,bufferLayout:l}=W(n,new Float32Array(B(t.normals)),"float32x4",1),{buffer:f,bufferLayout:h}=W(n,new Float32Array(B(r)),"float32x2",2);return{vertexBuffer:o,vertexBufferLayout:s,vertexCount:t.vertices.length,normalsBuffer:c,normalsBufferLayout:l,uvsBuffer:f,uvsBufferLayout:h,indexBuffer:a,triangleCount:t.triangleCount,instances:e.length,modelMatrices:i}},ms=({device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:r,depthStencilTextureView:i},multisampleData:{msaaTextureView:a,multisample:o}}},{vertexBuffer:s,vertexBufferLayout:c,normalsBuffer:l,normalsBufferLayout:f,uvsBuffer:h,uvsBufferLayout:u,indexBuffer:_,triangleCount:p,instances:v,modelMatrices:g},{playerPerspectiveBuffer:y},{lightSourcesBuffer:w})=>{const m=an(n,[c,f,u],t,cs,"triangle-list",{primitive:{frontFace:"ccw",cullMode:"back"},depthStencil:r,multisample:o}),I=new Float32Array(Le(g)),T=n.createBuffer({size:Sn.float32x4x4*St,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(T,0,I);const b=n.createBindGroup({layout:m.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:y}},{binding:1,resource:{buffer:T}},{binding:2,resource:{buffer:w}}]});return{pass:S=>{const O={view:a,resolveTarget:e.getCurrentTexture().createView(),loadOp:"load",clearValue:hn.black,storeOp:"store"},P=S.beginRenderPass({colorAttachments:[O],depthStencilAttachment:{view:i,depthLoadOp:"load",depthClearValue:1,depthStoreOp:"store"}});P.setPipeline(m),P.setIndexBuffer(_,"uint32"),P.setVertexBuffer(0,s),P.setVertexBuffer(1,l),P.setVertexBuffer(2,h),P.setBindGroup(0,b),P.drawIndexed(p*3,v),P.end()}}},Kn=4,ps=n=>{const e=Kn/2,t=Te(n.position),r=[d(-e,-e,e,1),d(-e,e,e,1),d(e,e,e,1),d(e,-e,e,1),d(-e,-e,-e,1),d(-e,e,-e,1),d(e,e,-e,1),d(e,-e,-e,1)],i=[d(3,0,4),d(4,7,3),d(6,5,1),d(1,2,6)],a=[...Array(6).fill(d(0,1,0,0)),...Array(6).fill(d(0,-1,0,0))],o=[L(1,0),L(.5,0),L(.5,.5),L(.5,.5),L(1,.5),L(1,0),L(.5,.5),L(0,.5),L(0,0),L(0,0),L(.5,0),L(.5,.5)],s=[L(.5,1),L(.5,.5),L(0,.5),L(0,.5),L(0,1),L(.5,1)];n.cardinality&Q.NORTH||(i.push(d(1,0,3),d(3,2,1)),a.push(...Array(6).fill(d(0,0,-1,0))),o.push(...s)),n.cardinality&Q.EAST||(i.push(d(2,3,7),d(7,6,2)),a.push(...Array(6).fill(d(-1,0,0,0))),o.push(...s)),n.cardinality&Q.SOUTH||(i.push(d(4,5,6),d(6,7,4)),a.push(...Array(6).fill(d(0,0,1,0))),o.push(...s)),n.cardinality&Q.WEST||(i.push(d(5,4,0),d(0,1,5)),a.push(...Array(6).fill(d(1,0,0,0))),o.push(...s));const c=new Float32Array(B(i.reduce((u,_)=>{for(let p=0;p<3;p++)u.push(U(r[_[p]],d(...t,0)));return u},[]))),l=new Float32Array(B(a)),f=new Float32Array(B(o));let h=[];return n.type===xn.LIGHT&&(h=[vs(n)]),{vertices:c,normals:l,uvs:f,lights:h}},gs=(n,e)=>{const r=U(Te(e.position),x(-Kn/2*.96,0,-Kn/2*.96)),i=U(Te(e.position),x(+Kn/2*.96,0,+Kn/2*.96));e.cardinality&Q.WEST&&(r[0]=-1/0),e.cardinality&Q.SOUTH&&(r[2]=-1/0),e.cardinality&Q.EAST&&(i[0]=1/0),e.cardinality&Q.NORTH&&(i[2]=1/0),n[0]=ke(n[0],r[0],i[0]),n[2]=ke(n[2],r[2],i[2])},bs=n=>{const e=ze(x(0,0,0),1),{buffer:t,bufferLayout:r}=W(n,new Float32Array(B(e.vertices)),"float32x4",0),{buffer:i}=zn(n,new Uint32Array(B(e.triangleIndices.map(o=>Bn(o))))),a=o=>{const s=wn(U(o,x(0,-.5,0))),c=Hn(1,2,1),l=V(s,c);Z(n,t,new Float32Array(B(e.vertices.map(f=>Fe(f,l)))),0)};return{bufferedMesh:{vertexBuffer:t,vertexBufferLayout:r,indexBuffer:i,vertexCount:e.vertices.length,triangleCount:e.triangleCount},updateMesh:a}},xs=({device:n})=>{const e=x(0,0,0),t=x(0,0,1),r=Xo(e,t),i=n.createBuffer({size:Sn.float32x4x4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});Z(n,i,new Float32Array(rn(Tt(r))),0);const a=n.createBuffer({size:Sn.float32x3,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});Z(n,a,new Float32Array(x()),0);const{bufferedMesh:o,updateMesh:s}=bs(n);return{camera:r,position:e,lookDirection:t,right:Xe(x(0,1,0),t),playerMoveListeners:[s],playerViewListeners:[],shadowBufferedMesh:o,playerPerspectiveBuffer:i,playerPositionBuffer:a}},rr=({device:n},e,t,r)=>{let i=-t/512,a=r/512;e.lookDirection[1]>.97&&(a=Math.max(0,a)),e.lookDirection[1]<-.97&&(a=Math.min(0,a));const o=Qt(x(0,1,0),i),s=Qt(e.right,a),c=Je(o,s);e.lookDirection=$n(Bn(Pe(d(...e.lookDirection,1),c))),e.right=$n(Xe(ar.up,e.lookDirection)),Hr(n,e)},Hr=(n,e)=>{e.camera.extrinsics=jr(e.position,e.lookDirection);const t=Tt(e.camera);for(const r of e.playerViewListeners)r(t);Z(n,e.playerPerspectiveBuffer,new Float32Array(rn(Tt(e.camera))),0)},ys=({device:n},e,t,r)=>{const i=Ue(r.w)-Ue(r.s),a=Ue(r.a)-Ue(r.d),o=r.v;if(!i&&!a)return;const s=Is(e,i,a,o);t.cheats.noClip||gs(s,t.currentTile),e.position=s;for(const c of e.playerMoveListeners)c(e.position);Z(n,e.playerPositionBuffer,new Float32Array(e.position),0),Hr(n,e)},ws=.1,Is=(n,e,t,r)=>{let i=x();const a=(r?2:1)*ws;if(e){const o=[...n.lookDirection];o[1]=0;const s=Qn($n(o),a*e);i=U(i,s)}if(t){const o=[...n.right];o[1]=0;const s=Qn($n(o),a*t);i=U(i,s)}return U(n.position,i)},Ls=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;\r
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
`,Ts=(n,e)=>({direction:e,position:n,intensity:4,tint:x(35/100,50/100,9/100),active:!1}),As=n=>{const e=d(...Te(n.position),0),t=Ur(n.cardinality),r=At[t],i=2,a=Qn(r,Kn/2-.1);let o=[d(-i,i,0,1),d(-i,-i,0,1),d(i,-i,0,1),d(i,i,0,1)];(t===Q.EAST||t===Q.WEST)&&(o=o.map(f=>Fe(f,Me(90))));const s=new Uint32Array(B([x(0,1,3),x(3,1,2)])),c=new Float32Array(B([L(0,0),L(0,1),L(1,1),L(1,0)])),l=new Float32Array(B([r,r,r,r]));return{vertices:new Float32Array(B(o)),triangles:s,uvs:c,normals:l,lights:[Ts(U(e,a),r)],modelMatrix:wn(Bn(U(e,a)))}},Ss=async({device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:r,depthStencilTextureView:i},multisampleData:{msaaTextureView:a,multisample:o}}},s,{playerPerspectiveBuffer:c})=>{const{texture:l,sampler:f}=await Ve(n,vn("game/portal.png")),{buffer:h}=zn(n,s.triangles),{buffer:u,bufferLayout:_}=W(n,s.vertices,"float32x4"),{buffer:p,bufferLayout:v}=W(n,s.normals,"float32x4",1),{buffer:g,bufferLayout:y}=W(n,s.uvs,"float32x2",2),w=an(n,[_,v,y],t,Ls,"triangle-list",{primitive:{frontFace:"ccw",cullMode:"none"},depthStencil:r,multisample:o},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),m=new Float32Array(rn(s.modelMatrix)),I=n.createBuffer({size:m.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(I,0,m);const T=new Float32Array([0]),b=n.createBuffer({size:T.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(b,0,T);const M=n.createBindGroup({layout:w.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:c}},{binding:1,resource:{buffer:I}},{binding:2,resource:{buffer:b}}]}),S=Un(n,w,l,f,1);return{pass:(P,k)=>{Z(n,b,new Float32Array([k]),0);const R={view:a,resolveTarget:e.getCurrentTexture().createView(),loadOp:"load",storeOp:"store"},A=P.beginRenderPass({colorAttachments:[R],depthStencilAttachment:{view:i,depthLoadOp:"load",depthClearValue:1,depthStoreOp:"store"}});A.setPipeline(w),A.setIndexBuffer(h,"uint32"),A.setVertexBuffer(0,u),A.setVertexBuffer(1,p),A.setVertexBuffer(2,g),A.setBindGroup(0,M),A.setBindGroup(1,S),A.drawIndexed(6),A.end()}}},Rs=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on("game"),i=4,{multisample:a,msaaTexture:o}=be(n,r,t,i),s=n.createTexture({size:{width:r.width,height:r.height},format:"depth24plus",sampleCount:i,usage:GPUTextureUsage.RENDER_ATTACHMENT}),c={depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"},l=[],f=(_,p)=>{_=ke(_,-36,36),p=ke(p,-36,36);for(const g of l)g(_,p)};let h=!1;const{keyMap:u}=qi("game",f,{onStart:()=>h=!0,onEnd:()=>h=!1});return{device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:c,depthStencilTextureView:s.createView()},multisampleData:{multisample:a,msaaTextureView:o.createView()}},input:{keyMap:u,mouseMoveListeners:l,inGame:h}}},Bs=(n,e)=>{const t=os(n.map,e.position);if(t!==n.currentTile&&t!==null){n.currentTile=t;for(const r of n.tileChangeListeners)r(Te(t.position),t.position);t.type===xn.END&&window.alert("you got to the end yay")}},Ps=async()=>{const n=await Rs(),e=xs(n);n.input.mouseMoveListeners.push((m,I)=>rr(n,e,m,I));const{tileSet:t,tileMap:r}=rs(),i=as(t.allTiles),a={map:r,currentTile:null,tileChangeListeners:[],cheats:{noClip:!1}},{buffer:o,bufferLayout:s}=W(n.device,i.vertices,"float32x4",0),c={vertexBuffer:o,vertexBufferLayout:s,vertexCount:i.vertices.length/4},l=As(t.endTile),f=_s(n,i.lights),{renderable:h,lightData:u}=us(n,[...i.lights,...l.lights],[c,e.shadowBufferedMesh,f]);a.tileChangeListeners.push(h.onTileChange);const{pass:_}=await ss(n,i,u,e),{pass:p}=await Ss(n,l,e),{pass:v}=ms(n,f,e,u),g=()=>{ys(n,e,a,n.input.keyMap),n.input.keyMap.p&&(a.cheats.noClip=!a.cheats.noClip,n.input.keyMap.p=!1,console.info("[cheats]: no clip toggled to",a.cheats.noClip))};rr(n,e,0,0);let y=0;const w=m=>{g(),Bs(a,e);const I=n.device.createCommandEncoder();h.pass(I,m,y),_(I,m,y),p(I,m,y),v(I,m,y),n.device.queue.submit([I.finish()]),y++,requestAnimationFrame(w)};requestAnimationFrame(w)},Os=(n,e)=>{const t=J("The WebGPU dungeon game"),r=q(`
It's hard to call this a game, there are no challenges or obstacles to overcome - it's more a showcase of a WebGPU-based game engine. 
The point of the "Game" is to traverse the dark dungeon, using the light sources or fog to make your way through the dark halls and finally find the exit portal. The explanations of the games systems are below the game itself.

You initiate the game by clicking on the canvas and can leave whenever by hitting [Esc]. When in the game look around with the mouse, move by using the [WASD] keys and activate sprinting with the [V] key.
`),i=nn(),a=K("game");i.append(a);const o=J("Overview of the game structure"),s=q(`
The game is made with Typescript and WebGPU. It is comprised of a few key systems which integrate with each other to create the final experience.
While this is an example of a game engine, it would have to be expanded and abstracted to be truly called an engine, as currently it is tailored to support the dungeon game. More on that later.

The game's key systems are: 

1) Dungeon map generation, which include creating a procedurally generated layout, creating the dungeon mesh in runtime and selecting the locations for lights to appear in the game.

2) The player system, which include camera movement and rotation.

3) Tiles and torches, which generate tile templates for the dungeon depending on how many walls should be open, as well as bounding the player inside the legal space (collision).

4) The game state (and portal) which trigger an event upon reaching the objective.

and of course, the most important system

5) The lighting system, which tracks active lights, generates shadow maps and controls light transition.

The game engine is an obejct which stores all the vital information about the game and resources requried for game components to function. 
It is responsible for access to the GPU device and stores a reference to the game canvas and the multisample state. 
Additionally, it will hold the global z-buffer shared among all render objects. It is also the middleman between user input and the game input handler.

The stages of the game can be categorized into two parts.

I. Initialization (run once)

- The engine is prepared (game canvas initialized, WebGPU prepared).

- The game map is generated. 

- Lights are defined and prepared in the light system. 

- Every object prepares its mesh (vertex and other attribute buffers).

II. Gameplay (run in a loop)

- The frame function is called.

- Input is checked and applied.

- The shadow map pass is run.

- The objects render pass is run.
`),c=J("The dungeon system"),l=q(`
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
`),f=J("The player system"),h=q(`
The player is a conceptual (apart from the lighting system) object. It represents the floating camera and handles movement can rotation which is then applied to the camera's extrinsic matrix. 

Movement is handled by moving the player along the directions of the player's local forward and right axes, which are initially set to the origins forwad and right axes. The player's height component (y) is always set to zero.
As the movement always depends on these two axes, it is vital they remain correct - which is the job of the rotation action. Sprinting is also an option, which simply increases the by-frame movement displacement amount.

Rotation applies an incremental quaternion to the player's forwrd (look direction) based on the frame mouse movement (tracked in the Pointer Lock API). 
After the look direction is updated, to maintain smooth movement the right axis is also updated as the normalzied cross product between the canon up direction and the player's new forward direction.

After movement is made, the player model buffer is updated, which exists only to be an actor in shadow map render passes.
`),u=J("The tile system and the torch system"),_=q(`
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
`),p=J("The game state and portal system"),v=q(`
A rather small part of the game, but worth a shoutout. The game state is responsible for checking for game objectives. The game state is interested in the player's current tile.
It will check if the player's map position is equal to that of the END type tile - which when observed will trigger the end "reward".

The portal - which is the in-game representation of the objective - is a graphical object with its own pass. The portal is created as a quad with the portal texture applied to it.
The portal's pipeline is configured to support blending, as only the portal color should be visible to the player and not the transparent background in the texture.
In the portal's shader, the uvs are dependent on a uniform time buffer to rotate the uvs about the texture's center, which creates a twirling effect. 
The portal is also another instance of a light.

The game state also tracks active cheats - such as "no clip" which allows the player to pass through walls (toggle with [P] key).
    `),g=J("The lighting system"),y=q(`
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
    `),w=J("Room for improvement"),m=q(`
    `);n.append(t,r,i,o,s,c,l,f,h,u,_,p,v,g,y,w,m),e.push(Ps)},Fs=(n,e)=>{if(!Qe.children)throw"Graphics routes do not exist";for(const t of Qe.children.map(r=>r.generator))t(n,e)},Qe={path:"graphics",name:"Graphics",description:"",generator:Fs,children:[{path:"webgpu-basics",name:"Introduction to the basics",description:"A walkthrough the basics of graphics and setting it up in WebGPU.",generator:Ja},{path:"drawing",name:"Drawing via interaction",description:"Using the browser interaction features to create a simple drawing application.",generator:no},{path:"projection",name:"Projection types",description:"An overview of the types of projections and GPU instancing.",generator:ho},{path:"lighting",name:"Lighting",description:"Showcase of the most common GPU lighting models and runtime mesh creation.",generator:vo},{path:"meshes",name:"Mesh intstantiation",description:"Populating mesh data in the GPU and displaying a model in the frame.",generator:po},{path:"texturing",name:"Applying textures",description:"Using textures to add colors to a mesh and an overview of the WebGPU process mipmapping.",generator:To},{path:"env-mapping",name:"Environmental mapping",description:"Using environmental maps to populate color values reflected by mirror surfaces (with or without normal maps).",generator:Bo},{path:"shadows",name:"Shadows (projection)",description:"Creating shadows in the scene using projective shadowing.",generator:Fo},{path:"shadow-mapping",name:"Shadows (maps)",description:"Creating shadows in the scene using shadow maps.",generator:Do},{path:"camera-movement",name:"Other interaction types",description:"A showcase of other scene interaction methods.",generator:Wo},{path:"game",name:"A simple game engine (project)",description:"Using the graphics toolset to create a simple dungeon crawler with focus on lighting, shadow maps and player movement.",generator:Os}]},ks=`struct Ray {
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
`,qr="raycast-anatomy",Ms=async()=>{const{device:n,context:e,canvasFormat:t}=await on(qr),r=an(n,[],t,ks,"triangle-strip"),{pass:i,executePass:a}=fn(n,e,hn.black);i.setPipeline(r),i.draw(4),a()},Vs=(n,e)=>{const t=J("The anatomy of rendering"),r=q(`
Before one peers into the world of rendering, ray casting, path tracing and the deep depths of global illumination - one should understand the basic building block of the rendering system - the ray.

The rendering system is built with physical constraints in mind, and so the ray is an imitation of the friendly vessels we observe in the real world - light rays. 
Computationally, generating, storing, amassing and integrating inifinte amounts of light rays and their interactions with materials is not feasible on modern hardware, 
therefore the compromise is to only handle the light and shading directly seen by the viewer (the virtual camera).

And so, the camera ray is born. Shown below is each fragment (pixel) of the the canvas in the color of the direction of its camera ray.
`),i=K(qr),a=nn();a.append(i),n.append(t,r,a),e.push(Ms)},Es=`struct ViewboxOptions {
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
`,$r="light",Wr="zoom",Xr="light-intensity-slider",Yr="light-position-x-input",Jr="light-position-y-input",Zr="light-position-z-input",Kr="shade-all-visible-objects",Qr="refractive-index-slider",zs=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await on($r),i=N(Wr),a=N(Xr),o=N(Qr),s=N(Yr),c=N(Jr),l=N(Zr),f=N(Kr,"checked"),h=t.width/t.height,u=an(n,[],r,Es,"triangle-strip"),{bindGroup:_,buffers:[p]}=E(n,u,[new Float32Array([i(),h])],"UNIFORM"),v=new Float32Array([s(),c(),l(),a(),f()?1:0,o(),0,0]),{bindGroup:g,buffers:[y]}=E(n,u,[v],"UNIFORM",1),w=()=>{Z(n,p,new Float32Array([i(),h]),0),Z(n,y,new Float32Array([s(),c(),l(),a(),f()?1:0,o(),0,0]),0);const{pass:m,executePass:I}=fn(n,e,hn.black);m.setPipeline(u),m.setBindGroup(0,_),m.setBindGroup(1,g),m.draw(4),I(),requestAnimationFrame(w)};requestAnimationFrame(w)},Gs=(n,e)=>{const t=J("Let there be light"),r=q(`
With the ability to query the world with ray casts, the most primitive intersecting shapes can be introduced. These are:

1) The plane - an intersection of a ray (line) and a plane. Nothing too complicated - every line will at some point intersect a given plane, unless they are strictly parallel. The only question is at which distance (ray line parameter) does the intersection occur?

2) The triangle - an extension to the plane intersection with the addition of validating the triangle's Barycentric coordinates remain in the appropriate threshold. 
Mathematically, these coordinates can be larger than one or smaller than 0, but this just means the point is outside of the canonical triangle and somewhere in the triangle's shadow copy on the same plane.

3) The sphere - an interesting case which is more specifically comprised of three cases: no intersection (missing the sphere), one intersection (grazing the sphere's surface) and two intersections (entering and leaving the sphere).
There can also be (as will be vital in constructing refraction events) a ray starting inside the sphere with only one proper intersection in the direction of the ray.
Solving for these intersections is a case of handling quadratic formula roots, in an algorithmically friendly way.

For each point of the intersection with an object's surface, that fragement may be shaded based on the information from the intersection - supplied by the prominent hit info data structure, which is key in passing information from the intersecting phase to the shading phase.
`),i=nn(),a=K($r,{width:512+128,height:512-64}),o=un(),s=F(dn(Wr,1,.1,10,.1),"Zoom (camera constant)"),c=F(dn(Xr,3.14,0,10,.01),"Light intensity"),l=F(dn(Qr,1,-1,10,.1),"Diffuse reflectance"),f=F(dn(Yr,0,-5,5,.1),"Light X position"),h=F(dn(Jr,1,0,5,.1),"Light Y position"),u=F(dn(Zr,0,-5,5,.1),"Light Z position"),_=F(Wn(Kr,!0),"Shading on",!1);o.append(s,c,l,f,h,u,_),i.append(a,o),n.append(t,r,i),e.push(zs)},ni=(n,e)=>{Vs(n,e),Gs(n,e)},Cs=`struct ViewboxOptions {
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
`,Ce="lighting",ei=Ce+"-light-position-x-input",ti=Ce+"-light-position-y-input",ri=Ce+"-light-position-z-input",js=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await on(Ce),i=N(ei),a=N(ti),o=N(ri),s=t.width/t.height,c=an(n,[],r,Cs,"triangle-strip"),l=new Float32Array([s]),{bindGroup:f}=E(n,c,[l],"UNIFORM"),h=new Float32Array([i(),a(),o(),0,0,0,0,0,0]),{bindGroup:u,buffers:[_]}=E(n,c,[h],"UNIFORM",1),p=()=>{Z(n,_,new Float32Array([i(),a(),o(),0,0,0,0,0,0]),0);const{pass:v,executePass:g}=fn(n,e,hn.black);v.setPipeline(c),v.setBindGroup(0,f),v.setBindGroup(1,u),v.draw(4),g(),requestAnimationFrame(p)};requestAnimationFrame(p)},Us=(n,e)=>{const t=J("Let there be shade"),r=q(`
After implementing lighting, the next step is to introduce shade. An enourmous advantage rendering systems have over the rasterization pipeline is the ease with which simple physical phenomena such as obstruction of a light source can be generated.

As you may have guessed at this point, light obstruction is also a ray, but it is cast from the intersection point in the direction of the light source. 
This is another way of querying the scene for information and as will be shown in the next example, 
starting new rays or continuing rays from defined points depending on the interaction type is the bread and butter of path tracing.
`),i=nn(),a=K(Ce,{width:512+128,height:512-64}),o=un(),s=F(dn(ei,0,-5,5,.1),"Light X position"),c=F(dn(ti,1,0,5,.1),"Light Y position"),l=F(dn(ri,0,-5,5,.1),"Light Z position");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(js)},Ns=`struct Environment {
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
`,de="mirrors",ce={"Base color":0,Lambertian:1,Mirror:2,Refractive:3,Phong:4,Glossy:5},ii=de+"-sphere-shader",ai=de+"-triangle-shader",oi=de+"-plane-shader",si=de+"-light-position-x-input",ci=de+"-light-position-y-input",li=de+"-light-position-z-input",hi=de+"-animation-slider",Ds=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await on(de),i=N(si),a=N(ci),o=N(li),s=N(ii),c=N(ai),l=N(oi),f=N(hi),h=t.width/t.height,u=an(n,[],r,Ns,"triangle-strip"),_=new Float32Array([h,0]),{bindGroup:p,buffers:[v]}=E(n,u,[_],"UNIFORM"),g=new Float32Array([i(),a(),o(),ce[s()],ce[c()],ce[l()],0,0,0]),{bindGroup:y,buffers:[w]}=E(n,u,[g],"UNIFORM",1),m=I=>{Z(n,v,new Float32Array([h,I*f()/512]),0),Z(n,w,new Float32Array([i(),a(),o(),ce[s()],ce[c()],ce[l()],0,0,0]),0);const{pass:T,executePass:b}=fn(n,e,hn.black);T.setPipeline(u),T.setBindGroup(0,p),T.setBindGroup(1,y),T.draw(4),b(),requestAnimationFrame(m)};requestAnimationFrame(m)},Hs=(n,e)=>{const t=J('Putting physics in "physically-based rendering"'),r=q(`
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
`),i=nn(),a=K(de,{width:512+128,height:512-64}),o=un(),s=F(Rn(ii,Object.keys(ce),"Refractive"),"Sphere shader type",!1),c=F(Rn(ai,Object.keys(ce),"Lambertian"),"Triangle shader type",!1),l=F(Rn(oi,Object.keys(ce),"Lambertian"),"Plane shader type",!1),f=F(dn(si,0,-5,5,.1),"Light X position"),h=F(dn(ci,1,0,5,.1),"Light Y position"),u=F(dn(li,0,-5,5,.1),"Light Z position"),_=F(dn(hi,0,0,1,.1),"Orbit animation speed");o.append(s,c,l,f,h,u,_),i.append(a,o),n.append(t,r,i),e.push(Ds)},fi=(n,e)=>{Us(n,e),Hs(n,e)},qs=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,di="texture",ui="texture-repeat-style",$s=["clamp-to-edge","repeat","mirror-repeat"],Ws=async()=>{const{device:n,context:e,canvasFormat:t}=await on(di),r=async i=>{const a=an(n,[],t,qs,"triangle-strip"),{textureData:o,height:s,width:c}=await le(vn("textures/grass_minecraft.png")),{texture:l,sampler:f}=ne(n,o,c,s,{addressModeU:i,addressModeV:i}),h=Un(n,a,l,f),{pass:u,executePass:_}=fn(n,e,hn.black);u.setPipeline(a),u.setBindGroup(0,h),u.draw(4),_()};r(Ln(ui,r))},Xs=(n,e)=>{const t=J("Introducing textures"),r=q(`
Textures are image-based color maps for the surfaces of objects.
`),i=nn(),a=K(di),o=un(),s=F(Rn(ui,$s,"repeat"),"Texture edge behavior",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(Ws)},Ys=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,vi="texturing",Rt="grass-texture-scale",qe="subdivision-jitter-slider",Bt="grass-texture-select",_i="texture-repeat-style-on-plane",Js=["clamp-to-edge","repeat","mirror-repeat"],Zs=async()=>{const{device:n,canvas:e,context:t,canvasFormat:r}=await on(vi),i=N(Rt),a=N(qe),o=N(Bt),s=an(n,[],r,Ys,"triangle-strip");let c,l;const f=async w=>{const m=[le(vn("textures/grass.jpg")),le(vn("textures/grass_minecraft.png"))],I=await Promise.all(m),{texture:T,sampler:b}=ne(n,I[0].textureData,I[0].width,I[0].height,{addressModeU:w,addressModeV:w}),{texture:M,sampler:S}=ne(n,I[1].textureData,I[1].width,I[1].height,{addressModeU:w,addressModeV:w});c=Un(n,s,T,b),l=Un(n,s,M,S)};await f("repeat");const{bindGroup:h,buffers:[u]}=E(n,s,[new Float32Array([i(),a()*a()])],"UNIFORM",1),{bindGroup:_,buffers:[p]}=E(n,s,[new Float32Array(200)],"STORAGE",2),v=()=>{Z(n,u,new Float32Array([i(),a()*a()]),0);const w={"grass.jpg":c,"grass_minecraft.png":l}[o()],{pass:m,executePass:I}=fn(n,t,hn.black);m.setPipeline(s),m.setBindGroup(0,w),m.setBindGroup(1,h),m.setBindGroup(2,_),m.draw(4),I()},g=w=>{const m=Ut(e.height,w);Z(n,p,new Float32Array(B(m)),0,!0)},y=Ln(qe,g);g(y),Et([Rt,Bt,qe],v),Ln(_i,async w=>{await f(w),v()}),v()},Ks=(n,e)=>{const t=J("Textures in rendering, jittering to solve aliasing"),r=q(`
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
`),i=nn(),a=K(vi),o=un(),s=F(dn(Rt,.2,.1,2,.1),"Texture scale"),c=F(dn(qe,1,1,10,1),"Subdivisions for stratisfied jitter"),l=F(Rn(Bt,["grass.jpg","grass_minecraft.png"],"grass_minecraft.png"),"Grass texture",!1),f=F(Rn(_i,Js,"repeat"),"Texture edge behavior",!1);o.append(l,s,f,c),i.append(a,o),n.append(t,r,i),e.push(Zs)},mi=(n,e)=>{Xs(n,e),Ks(n,e)},Qs=n=>{const e=J("Measuring light"),t=q(`
Radiometry and photometry are two schools of light measurement. While radiometry is more aligned with machine-friendly value, photometry addresses the measurements in a human-friendly (readable) method.
In the end, both are measurements of the same phenomena and there exists a direct conversion between the two sets of units.

Below are seven examples of light measurement exercises which make use of the equations. 
They are meant to provide a more practical look into the behaviour of light and how that could apply to the art of rendering.
A key take-away is about the radial flux of light - how light radiates spherically outwards (from isotropic and/or homogeneous light sources) and a object surface a certain distance away will receive a slice of that enlarging sphere.

Mathematically this would require integrals (as in the examples below) to calculate the amount of light, but as weill be later shown, this can be approximated with Monte Carlo integration in progressive rendering.
`),r=document.createElement("iframe");r.width="100%",r.height="1000px",r.src=vn("resources/worksheet.pdf"),n.append(e,t,r)},nc=(n,e)=>{Qs(n)},ec=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,pi="default-scene-as-meshes",tc=async()=>{const{device:n,context:e,canvasFormat:t}=await on(pi),r=an(n,[],t,ec,"triangle-strip"),i=Yi([x(-.2,.1,.9),x(.2,.1,.9),x(-.2,.1,-.1)]),{bindGroup:a}=E(n,r,[new Float32Array(B(i.vertices)),new Uint32Array(B(i.triangleIndices))],"STORAGE",1),o=await le(vn("textures/grass_minecraft.png")),{texture:s,sampler:c}=ne(n,o.textureData,o.width,o.height,{addressModeU:"repeat",addressModeV:"repeat"}),l=Un(n,r,s,c);(()=>{const{pass:h,executePass:u}=fn(n,e,hn.black);h.setPipeline(r),h.setBindGroup(0,l),h.setBindGroup(1,a),h.draw(4),u()})()},rc=(n,e)=>{const t=J("Replacing the triangle with a triangle"),r=q(`
As a first step towards the introduction of triangle-based mesh model data to the rendering system, we will first replace the triangle... with a triangle.
Up to this point, all the shapes were conceptual - living only in the mind of the GPU, defined as mathematical parameterizations of objects.

But interesting meshes are more commonly not mathematical monstrosities, but artistic sculptures carved in polygons. These have to be passed to the GPU from the CPU.
The triangle in the scene below is defined as a vertex buffer, but passed to the GPU as a uniform/storage buffer. The shader loops over each of these triangles when intersecting a ray.

Inefficient? Absolutely, but that is a worry for a later chapter.
`),i=nn(),a=K(pi);i.append(a),n.append(t,r,i),e.push(tc)},ic=`@group(0) @binding(0) var<storage> ut_vertices : array<vec3f>;
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
`,gi="utah-teapot",ac=["Flat","Vertex normals"],bi="shading-select-ut",oc=async()=>{const{device:n,context:e,canvasFormat:t}=await on(gi),r=an(n,[],t,ic,"triangle-strip"),i=await Dn(vn("models/teapot.obj")),a=cr(i,{}),{bindGroup:o}=E(n,r,[new Float32Array(B(a.vertices)),new Uint32Array(B(a.triangleIndices)),new Float32Array(B(a.normals))],"STORAGE",0),{bindGroup:s,buffers:[c]}=E(n,r,[new Uint32Array([a.triangleCount,0])],"UNIFORM",1),l=h=>{const u={Flat:0,"Vertex normals":1};Vn(n,c,new Uint32Array([u[h]]),4);const{pass:_,executePass:p}=fn(n,e,Re(.8,.4,.4,1));_.setPipeline(r),_.setBindGroup(0,o),_.setBindGroup(1,s),_.draw(4),p()},f=Ln(bi,l);l(f)},sc=(n,e)=>{const t=J("Introducing the Utah Teapot"),r=q(`
As the first rendered mesh we shall have no other than the computer graphics mascot itself - the Utah Teapot. Despite not even being a large mesh (by today's standards), the teapot already takes a moment to load into the GPU and for all the triangles to be tested for in the intersection phase of the rendering pipeline.

The teapot can be rendered in flat shading or vertex shading mode. A differentiation should be made at this point, as there are actually two types of surface normals to pick form. These are

1) Render triangle normals - the triangle face normal as calculated during ray-triangle intersection. Thes could be seen as the "mathematically true" normals of the shape.

2) Vertex normals - the normals as vertex attributes, provided together with the vertex buffer. These are the "artistically true" normals of the shape, as decided by the author of the shape.
Usually these smoothed normals are algorithmically adjusted in 3D modelling software to avoid sharp edges. 
To maintain the smooth surface when rendering the shape, the vertex normals are interpolated using the Barycentric coordainates of the points as interpolation factors.
`),i=nn(),a=K(gi,{width:840,height:450}),o=un(),s=F(Rn(bi,ac,"Flat"),"Shading type",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(oc)},cc=`@group(0) @binding(0) var<storage> cb_vertices : array<vec3f>;
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
`,xi="cornell-box",lc=["Flat","Lambertian"],yi="shading-select-cb",hc=async()=>{const{device:n,context:e,canvasFormat:t}=await on(xi),r=an(n,[],t,cc,"triangle-strip"),i=await Dn(vn("models/CornellBoxWithBlocks.obj")),a=cr(i,{}),o=new Float32Array(i.mtls[0].materials.reduce((p,v)=>[...p,...B([v.color,v.specular,v.emission,d(v.illum,v.shininess,v.ior)])],[])),s=a.materialIndices.reduce((p,v,g)=>(i.mtls[0].materials[v].illum>=1&&p.push(g),p),[]),{bindGroup:c}=E(n,r,[new Float32Array(B(a.vertices)),new Uint32Array(B(a.triangleIndices)),new Uint32Array(a.materialIndices),new Uint32Array(s)],"STORAGE",0),{bindGroup:l,buffers:[f]}=E(n,r,[new Uint32Array([a.triangleCount,s.length,0])],"UNIFORM",1),{bindGroup:h}=E(n,r,[o],"STORAGE",2),u=p=>{const v={Flat:0,Lambertian:1}[p];Vn(n,f,new Uint32Array([v]),2*4);const{pass:g,executePass:y}=fn(n,e,hn.black);g.setPipeline(r),g.setBindGroup(0,c),g.setBindGroup(1,l),g.setBindGroup(2,h),g.draw(4),y()},_=Ln(yi,u);u(_)},fc=(n,e)=>{const t=J("Thinking inside the Cornell box"),r=q(`
Introducing another championing mascot of the computer graphics universe - the Cornell box - which we will be working with closely from now on.

Another important set of data to pass to the GPU is information about the types of materials which exist in the scene. 
3D objects in data form will usually contain or reference information about their surfaces. 
This material data format can contain all sorts of variables such as the diffuse reflectance, specular reflectance, roughness and emissive color - such as the light in the box, which emits a strong white.
`),i=nn(),a=K(xi),o=un(),s=F(Rn(yi,lc,"Lambertian"),"Shading type",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(hc)},wi=(n,e)=>{rc(n,e),sc(n,e),fc(n,e)},dc=`@group(0) @binding(0) var<storage> vertices : array<vec3f>;
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
`,Ii="bsp",uc=async()=>{const{device:n,context:e,canvasFormat:t}=await on(Ii),r=an(n,[],t,dc,"triangle-strip"),i=Xn(await Dn(vn("models/bunny.obj"),1)),a=fe(i),{bindGroup:o}=E(n,r,[a.vertices,a.normals,a.indices],"STORAGE"),{bindGroup:s}=E(n,r,[a.bspPlanes,a.bspTree,a.treeIds],"STORAGE",1),{bindGroup:c,buffers:[l]}=E(n,r,[a.aabb,new Float32Array([950.5])],"UNIFORM",2),f=()=>{const{pass:h,executePass:u}=fn(n,e,hn.black);h.setPipeline(r),h.setBindGroup(0,o),h.setBindGroup(1,s),h.setBindGroup(2,c),h.draw(4),u(),requestAnimationFrame(f)};requestAnimationFrame(f)},vc=(n,e)=>{const t=J("Barking up the correct tree"),r=q(`
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
`),i=nn(),a=K(Ii),o=un();i.append(a,o),n.append(t,r,i),e.push(uc)},_c=`struct VertexNormal {
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
`,Li="cornell-interleave",mc=async()=>{const{device:n,context:e,canvasFormat:t}=await on(Li),r=an(n,[],t,_c,"triangle-strip"),i=Xn(await Dn(vn("models/CornellBoxWithBlocks.obj"))),a=fe(i),o=_e([a.vertices,a.normals]),s=new Uint32Array(a.indices);me(s,i.matIndices,4);const c=new Uint32Array(i.lightIndices),l=new Float32Array(i.materials.reduce((v,g)=>[...v,...B([g.color,g.specular,g.emission,d(g.illum,g.shininess,g.ior)])],[])),{bindGroup:f}=E(n,r,[o,s,c],"STORAGE"),{bindGroup:h}=E(n,r,[a.bspPlanes,a.bspTree,a.treeIds],"STORAGE",1),{bindGroup:u}=E(n,r,[a.aabb,new Uint32Array([c.length])],"UNIFORM",2),{bindGroup:_}=E(n,r,[l],"STORAGE",3);(()=>{const{pass:v,executePass:g}=fn(n,e,hn.black);v.setPipeline(r),v.setBindGroup(0,f),v.setBindGroup(1,h),v.setBindGroup(2,u),v.setBindGroup(3,_),v.draw(4),g()})()},pc=(n,e)=>{const t=J("Back to the box"),r=q(`
The binary space partitioning tree algorithm can be applied to practically any model, but there is a consideration which arises when using WebGPU - the limitation on the number of storage buffers.
The BSP requires three arrays alone - one for the bounding box planes, one for the tree nodes and another for a mapping to the model triangles.

A solution to the claustrophobic space limitations on storage buffers may be alleviated with the help of interleaving (or interweaving if you prefer). 
The process is to mix (deterministically) two or more arrays into a single longer one, thereby sneaking it into the shader programs past the strict WebGPU bus customs.
A basic approach is to take two arrays of the same length and place their elements in alternating sequence. 
Luckily this doesn't require any complicated index manipulation, because the shader may be told to expect an array of data structure (structs) with two elements.
But, with the use of uniform buffers to carry meta data, any number of arrays of different lengths may be in fact weaved together or even glued in sequential order. The only constraint then is the data type (eg. floats float with floats, integers integrate with integers).

The example below not only recreates the Cornell box with the BSP tree, but also handles the weaving of the vertex and normal buffers as well as triangle indices and material indices together. This scene also includes an area light source model, but more about that in the next part.
`),i=nn(),a=K(Li),o=un();i.append(a,o),n.append(t,r,i),e.push(mc)},gc=`struct VertexNormal {
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
`,Ti="cornell-glass",Ai="jittering-active-bsp-cb",bc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(Ti),i=an(n,[],t,gc,"triangle-strip"),a=Xn(await Dn(vn("models/CornellBox.obj"))),o=fe(a),s=_e([o.vertices,o.normals]),c=new Uint32Array(o.indices);me(c,a.matIndices,4);const l=new Uint32Array(a.lightIndices),f=new Float32Array(a.materials.reduce((T,b)=>[...T,...B([b.color,b.specular,b.emission,d(b.illum,b.shininess,b.ior)])],[])),{bindGroup:h}=E(n,i,[s,c,l],"STORAGE"),{bindGroup:u}=E(n,i,[o.bspPlanes,o.bspTree,o.treeIds],"STORAGE",1),{bindGroup:_,buffers:[p,v,g]}=E(n,i,[o.aabb,new Uint32Array([l.length]),new Uint32Array([36])],"UNIFORM",2),y=Ut(r.height,6),{bindGroup:w}=E(n,i,[f,new Float32Array(B(y))],"STORAGE",3);Ln(Ai,T=>{const b=T?36:1;Vn(n,g,new Uint32Array([b]),0),I()},"checked");const I=()=>{const{pass:T,executePass:b}=fn(n,e,hn.black);T.setPipeline(i),T.setBindGroup(0,h),T.setBindGroup(1,u),T.setBindGroup(2,_),T.setBindGroup(3,w),T.draw(4),b()};I()},xc=(n,e)=>{const t=J("Light as an area"),r=q(`
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
`),i=nn(),a=K(Ti),o=un(),s=F(Wn(Ai,!0),"Jittering enabled",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(bc)},yc=(n,e)=>{vc(n,e),pc(n,e),xc(n,e)},wc=`struct VertexNormal {
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
`,Ic=`struct VertexNormal {
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
`,Si="cornell-progressive",Pt="progressive-enabled-cb",Ri="select-shader-cb-progressive",Tc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(Si),i=N(Pt,"checked"),a=Xn(await Dn(vn("models/CornellBoxWithBlocks.obj"))),o=fe(a),s=_e([o.vertices,o.normals]),c=new Uint32Array(o.indices);me(c,a.matIndices,4);const l=new Uint32Array(a.lightIndices),f=new Float32Array(a.materials.reduce((p,v)=>[...p,...B([v.color,v.specular,v.emission,d(v.illum,v.shininess,v.ior)])],[])),h={"Simple progressive":wc,"Simple progressive with soft shadows":Ic,"Complex progressive":Lc},u={f:()=>{}},_=p=>{const{renderSrc:v,renderDst:g,blitPingPong:y}=Ge(n,r),w=n.createShaderModule({code:h[p]}),m=n.createRenderPipeline({layout:"auto",vertex:{module:w,entryPoint:"main_vs"},fragment:{module:w,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:I}=E(n,m,[s,c,l,f],"STORAGE"),{bindGroup:T}=E(n,m,[o.bspPlanes,o.bspTree,o.treeIds],"STORAGE",1),{bindGroup:b,buffers:[M,S,O]}=E(n,m,[o.aabb,new Uint32Array([l.length]),new Uint32Array([0,r.width,r.height])],"UNIFORM",2),P=n.createBindGroup({layout:m.getBindGroupLayout(3),entries:[{binding:0,resource:g.createView()}]});let k=0;const R=()=>{if(!i())return;k+=1,Vn(n,O,new Uint32Array([k]),0);const{pass:A,encoder:X}=fn(n,e,hn.black,{otherColorAttachments:[{view:v.createView(),loadOp:"load",storeOp:"store"}]});A.setPipeline(m),A.setBindGroup(0,I),A.setBindGroup(1,T),A.setBindGroup(2,b),A.setBindGroup(3,P),A.draw(4),A.end(),y(X),n.queue.submit([X.finish()]),requestAnimationFrame(R)};u.f=()=>requestAnimationFrame(R),requestAnimationFrame(R)};_(Ln(Ri,_)),Ln(Pt,()=>u.f(),"checked")},Ac=(n,e)=>{const t=J("Progressive rendering - the rendering ritual"),r=q(`
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
`),i=nn(),a=K(Si),o=un(),s=F(Wn(Pt,!0),"Progressive rendering enabled",!1),c=F(Rn(Ri,["Simple progressive","Simple progressive with soft shadows","Complex progressive"],"Complex progressive"),"Progressive shader type",!1);o.append(s,c),i.append(a,o),n.append(t,r,i),e.push(Tc)},Bi=(n,e)=>{Ac(n,e)},Sc=`struct VertexNormal {
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
`,Ht="brdfs",Ot="progressive-enabled-cb-"+Ht,Pi="brdf-color-picker",Rc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(Ht),i=N(Ot,"checked"),a=N(Pi),o=Xn(await Dn(vn("models/CornellBox.obj"))),s=fe(o),c=_e([s.vertices,s.normals]),l=new Uint32Array(s.indices);me(l,o.matIndices,4);const f=new Uint32Array(o.lightIndices),h=new Float32Array(o.materials.reduce((R,A)=>[...R,...B([A.color,A.specular,A.emission,d(A.illum,A.shininess,A.ior)])],[]));let{renderSrc:u,renderDst:_,blitPingPong:p}=Ge(n,r);const v=n.createShaderModule({code:Sc}),g=n.createRenderPipeline({layout:"auto",vertex:{module:v,entryPoint:"main_vs"},fragment:{module:v,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:y}=E(n,g,[c,l,f,h],"STORAGE"),{bindGroup:w}=E(n,g,[s.bspPlanes,s.bspTree,s.treeIds],"STORAGE",1),{bindGroup:m,buffers:[I,T,b,M]}=E(n,g,[s.aabb,new Uint32Array([f.length]),new Uint32Array([0,r.width,r.height]),new Float32Array(Ye(ve(a())))],"UNIFORM",2),S=n.createBindGroup({layout:g.getBindGroupLayout(3),entries:[{binding:0,resource:_.createView()}]});let O=0;const P=()=>{if(!i())return;k===!0&&(k=!1,O=0),O+=1,Vn(n,b,new Uint32Array([O]),0),Z(n,M,new Float32Array(Ye(ve(a()))),0);const{pass:R,encoder:A}=fn(n,e,hn.black,{otherColorAttachments:[{view:u.createView(),loadOp:"load",storeOp:"store"}]});R.setPipeline(g),R.setBindGroup(0,y),R.setBindGroup(1,w),R.setBindGroup(2,m),R.setBindGroup(3,S),R.draw(4),R.end(),p(A),n.queue.submit([A.finish()]),requestAnimationFrame(P)};Ln(Ot,R=>{R&&requestAnimationFrame(P)},"checked");let k=!1;tt("restart-progressive-brdf",()=>k=!0),P()},Bc=(n,e)=>{const t=J("Illuminating the situation"),r=q(`
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
`),i=nn(),a=K(Ht),o=un(),s=F(Wn(Ot,!0),"Progressive rendering enabled",!1),c=F($e(Pi,"#1a3205"),"Sphere extinction coefficient"),l=et("restart-progressive-brdf","Restart progressive");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(Rc)},Oi=(n,e)=>{Bc(n,e)},Pc=`struct VertexNormal {
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
`,qt="environmental",Ft="progressive-enabled-cb-"+qt,Oc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(qt),i=N(Ft,"checked"),a=N("environmental-texture-type"),{texture:o,sampler:s}=await Ve(n,vn("textures/luxo_pxr_campus.jpg")),{texture:c,sampler:l}=await Ve(n,vn("textures/luxo_pxr_campus.hdr.png")),f=Xn(await Dn(vn("models/teapot.obj"),1)),h=fe(f),u=_e([h.vertices,h.normals]),_=new Uint32Array(h.indices);me(_,f.matIndices,4);const p=new Float32Array(f.materials.reduce((G,Y)=>[...G,...B([Y.color,Y.specular,Y.emission,d(Y.illum,Y.shininess,Y.ior)])],[]));let{renderSrc:v,renderDst:g,blitPingPong:y}=Ge(n,r);const w=n.createShaderModule({code:Pc}),m=n.createRenderPipeline({layout:"auto",vertex:{module:w,entryPoint:"main_vs"},fragment:{module:w,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:I}=E(n,m,[u,_,p],"STORAGE"),{bindGroup:T}=E(n,m,[h.bspPlanes,h.bspTree,h.treeIds],"STORAGE",1),{bindGroup:b,buffers:[M,S,O,P,k]}=E(n,m,[h.aabb,new Uint32Array([0,r.width,r.height]),new Uint32Array([3,0,0,0]),new Float32Array([1,0,0,0]),new Uint32Array([0,0,0,0])],"UNIFORM",2),R=n.createBindGroup({layout:m.getBindGroupLayout(3),entries:[{binding:0,resource:g.createView()},{binding:1,resource:l},{binding:2,resource:c.createView()}]}),A=n.createBindGroup({layout:m.getBindGroupLayout(3),entries:[{binding:0,resource:g.createView()},{binding:1,resource:s},{binding:2,resource:o.createView()}]});let X=0;const en=()=>{if(!i())return;z===!0&&(z=!1,X=0),X+=1,Vn(n,S,new Uint32Array([X]),0);const{pass:G,encoder:Y}=fn(n,e,hn.black,{otherColorAttachments:[{view:v.createView(),loadOp:"load",storeOp:"store"}]});G.setPipeline(m),G.setBindGroup(0,I),G.setBindGroup(1,T),G.setBindGroup(2,b),G.setBindGroup(3,a()==="High dynamic range"?R:A),G.draw(4),G.end(),y(Y),n.queue.submit([Y.finish()]),requestAnimationFrame(en)};Ln(Ft,G=>{G&&requestAnimationFrame(en)},"checked");const sn=G=>{const Y={"Base color":3,Lambertian:0,Mirror:1}[G];Vn(n,O,new Uint32Array([Y]),0)};sn(Ln("model-shader-select-env",sn));const j=G=>{Z(n,P,new Float32Array([G?1:0,0,0,0]),0)};j(Ln("include-sunlight",j,"checked"));const C=G=>{const Y=G==="High dynamic range"?1:0;Vn(n,k,new Uint32Array([Y]),0)};C(Ln("environmental-texture-type",C));let z=!1;tt("restart-progressive-env",()=>z=!0),en()},Fc=(n,e)=>{const t=J("Leaking into reality"),r=q(`
A strong suit of rendering is the ability to place artifical objects into real scenes and for them to imitate the scene's lighting and environment. 
Environment maps are used to create a skybox, but in a global illumination configuration they can also be used to query the environment for lighting.

Shadows are more tricky, as they no longer have a shadow catching object. 
The skybox is just fills out the empty void beneath the model as a background color would.
To solve this "hold out" geometry is introduced. These are transparent objects which imitate objects visible in the scene (such as a plane for the ground).
They are transparent as far as they are not shaded, where they otherwise apply a semi-transparent filter over whatever it is they are imitating.
Planes are the most simply to create, but hold out geometry could be used for any shape.

HDR images work well as environmental textures as they carry a lot of information about the scene light sources. 
When using a low dynamic range map, a light source has to be modelled with the traditional setup (directional light).
`),i=nn(),a=K(qt),o=un(),s=F(Wn(Ft,!0),"Progressive rendering enabled",!1),c=F(Rn("model-shader-select-env",["Base color","Lambertian","Mirror"],"Lambertian"),"Model shader type",!1),l=F(Wn("include-sunlight",!0),"Sun light on",!1),f=F(Rn("environmental-texture-type",["Low dynamic range","High dynamic range"],"Low dynamic range"),"Environmental texture type",!1),h=et("restart-progressive-env","Restart progressive");o.append(s,c,l,f,h),i.append(a,o),n.append(t,r,i),e.push(Oc)},kc=`struct VertexNormal {
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
`,$t="light-probes",kt="progressive-enabled-cb-"+$t,Mc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on($t),i=N(kt,"checked"),{texture:a,sampler:o}=await Ve(n,vn("textures/burnt_warehouse.hdr.png")),s=Xn(await Dn(vn("models/teapot.obj"),1)),c=fe(s),l=_e([c.vertices,c.normals]),f=new Uint32Array(c.indices);me(f,s.matIndices,4);const h=new Float32Array(s.materials.reduce((R,A)=>[...R,...B([A.color,A.specular,A.emission,d(A.illum,A.shininess,A.ior)])],[]));let{renderSrc:u,renderDst:_,blitPingPong:p}=Ge(n,r);const v=n.createShaderModule({code:kc}),g=n.createRenderPipeline({layout:"auto",vertex:{module:v,entryPoint:"main_vs"},fragment:{module:v,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:y}=E(n,g,[l,f,h],"STORAGE"),{bindGroup:w}=E(n,g,[c.bspPlanes,c.bspTree,c.treeIds],"STORAGE",1),{bindGroup:m,buffers:[I,T,b]}=E(n,g,[c.aabb,new Uint32Array([0,r.width,r.height]),new Uint32Array([3,0,0,0])],"UNIFORM",2),M=n.createBindGroup({layout:g.getBindGroupLayout(3),entries:[{binding:0,resource:_.createView()},{binding:1,resource:o},{binding:2,resource:a.createView()}]});let S=0;const O=()=>{if(!i())return;k===!0&&(k=!1,S=0),S+=1,Vn(n,T,new Uint32Array([S]),0);const{pass:R,encoder:A}=fn(n,e,hn.black,{otherColorAttachments:[{view:u.createView(),loadOp:"load",storeOp:"store"}]});R.setPipeline(g),R.setBindGroup(0,y),R.setBindGroup(1,w),R.setBindGroup(2,m),R.setBindGroup(3,M),R.draw(4),R.end(),p(A),n.queue.submit([A.finish()]),requestAnimationFrame(O)};Ln(kt,R=>{R&&requestAnimationFrame(O)},"checked");const P=R=>{const A={"Base color":3,Lambertian:0,Mirror:1}[R];Vn(n,b,new Uint32Array([A]),0)};P(Ln("model-shader-select-env",P));let k=!1;tt("restart-progressive-env",()=>k=!0),O()},Vc=(n,e)=>{const t=J("Custom light probes"),r=q(`
With the setup ready, the reapot can be placed into any environment and reflect its lighting quite well.
An HDR probe representing a burnt warehouse was selected (https://polyhaven.com/a/burnt_warehouse).

This is a dark environment with a single doorway through which sunlight comes through. The teapot is shaded from the top and front,
but elements facing the doorway are slightly lit with the bottom also lit by the reflections of light from the warehouse floor which is lit by the doorway sun rays.
`),i=nn(),a=K($t,{width:1028}),o=un(),s=F(Wn(kt,!0),"Progressive rendering enabled",!1),c=F(Rn("model-shader-select-env",["Base color","Lambertian","Mirror"],"Lambertian"),"Model shader type",!1),l=et("restart-progressive-env","Restart progressive");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(Mc)},Fi=(n,e)=>{Fc(n,e),Vc(n,e)},Ec=`@group(0) @binding(0) var<uniform> line_thickness : f32;

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
`,ki="ray-line-intersection",zc=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await on(ki),i=an(n,[],r,Ec,"triangle-strip"),{bindGroup:a,buffers:[o]}=E(n,i,[new Float32Array([0])],"UNIFORM"),s=c=>{Z(n,o,new Float32Array([c/t.width]),0);const{pass:l,executePass:f}=fn(n,e,hn.black);l.setPipeline(i),l.setBindGroup(0,a),l.draw(4),f()};s(Ln("line-thickness",s))},Gc=(n,e)=>{const t=J("Creating ray-line intersection"),r=q(`
Ray-line intersection is slightly more difficult to grasp than ray-plane intersection, because lines have more combinations of possible events.
It is quite difficult for two lines to actaully meet in 3D space - they have many oppurtunities not to. A better approach might be to not find the direct point of intersection,
but rather the paramters of the line for which the points on the lines are closest to each other.

The article "Intersection of two lines in three-space" by Ronald Goldman in the collection Graphics Gems (1995) describes the algorithm 
which is the computerized appraoch of solving the lienar set of equations to finding these parameters. 
It is important to remember two things - firstly, that the parameters have to stay between zero and one, that is the "intersection" is within the sections of both lines. 
Secondly, the intersection might not be an intersection at all - but a point on each line for which the distance is minimal. 
It is required to check that the distance between these two points is less than some set threshold for the thickness of the line.
    `),i=nn(),a=K(ki),o=un(),s=F(dn("line-thickness",4,2,32,.1),"Line thickness");o.append(s),i.append(a,o),n.append(t,r,i),e.push(zc)},Cc=`struct VertexNormal {
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
`,jc=`struct Line {
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
`,nt="path-following",Uc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(nt),i=n.createShaderModule({code:Cc}),a=n.createRenderPipeline({layout:"auto",vertex:{module:i,entryPoint:"main_vs",buffers:[]},fragment:{module:i,entryPoint:"main_fs",targets:[{format:t}]},primitive:{topology:"triangle-strip"}}),o=document.getElementById(nt+"-overlay"),s=o.getContext("gpupresent")||o.getContext("webgpu");s.configure({device:n,format:t,alphaMode:"premultiplied"});const c=n.createShaderModule({code:jc}),l=n.createRenderPipeline({layout:"auto",vertex:{module:c,entryPoint:"main_vs",buffers:[]},fragment:{module:c,entryPoint:"main_fs",targets:[{format:t}]},primitive:{topology:"triangle-strip"}}),f=Xn(await Dn(vn("models/CornellBox.obj"))),h=fe(f),u=_e([h.vertices,h.normals]),_=new Uint32Array(h.indices);me(_,f.matIndices,4);const p=new Uint32Array(f.lightIndices),v=new Float32Array(f.materials.reduce((C,z)=>[...C,...B([z.color,z.specular,z.emission,d(z.illum,z.shininess,z.ior)])],[])),{bindGroup:g}=E(n,a,[u,_,p,v],"STORAGE"),{bindGroup:y}=E(n,a,[h.bspPlanes,h.bspTree,h.treeIds],"STORAGE",1),w=Ut(r.height,2),{bindGroup:m,buffers:[I,T,b,M,S]}=E(n,a,[h.aabb,new Float32Array(B(w.map(C=>d(...C,0,0)))),new Float32Array([.67,.18,0,0]),new Uint32Array([p.length]),new Uint32Array([0])],"UNIFORM",2),O=10,P=n.createBuffer({size:Sn.float32x4*2*O,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),k=n.createBuffer({size:Sn.float32x4*2*O,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),R=n.createBindGroup({layout:a.getBindGroupLayout(3),entries:[{binding:0,resource:{buffer:P}}]}),A=n.createBindGroup({layout:l.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:P}}]}),X=async()=>{if(k.mapState!=="unmapped")return;await k.mapAsync(GPUMapMode.READ);const C=new Float32Array(k.getMappedRange());for(let z=0;z<C.length;z+=4*2)console.info("[ray path details] ray no.",z/8),console.info("ray line start (a)",C.slice(z,z+4)),console.info("ray line end (b)",C.slice(z+4,z+8));k.unmap()},en=()=>{const C=n.createCommandEncoder();C.clearBuffer(P);const z=C.beginRenderPass({colorAttachments:[{view:e.getCurrentTexture().createView(),loadOp:"clear",clearValue:hn.black,storeOp:"store"}]});z.setPipeline(a),z.setBindGroup(0,g),z.setBindGroup(1,y),z.setBindGroup(2,m),z.setBindGroup(3,R),z.draw(4),z.end();const G=C.beginRenderPass({colorAttachments:[{view:s.getCurrentTexture().createView(),loadOp:"clear",clearValue:hn.transparent,storeOp:"store"}]});G.setPipeline(l),G.setBindGroup(0,A),G.draw(4),G.end(),k.mapState==="unmapped"&&C.copyBufferToBuffer(P,0,k,0,P.size),n.queue.submit([C.finish()]),X()};requestAnimationFrame(en);const sn=N("ray-store-type"),j=C=>{const z=sn()==="Normal"?1:0;Vn(n,S,new Uint32Array([z]),0);const G=C.x/r.width,Y=1-C.y/r.height;Z(n,b,new Float32Array([G,Y,0,0]),0),requestAnimationFrame(en)};We("path-following",{onMove:j,onStart:j},{})},Nc=(n,e)=>{const t=K(nt),r=K(nt+"-overlay",{overlay:!0}),i=Di();i.append(t,r);const a=nn(),o=un(),s=F(Rn("ray-store-type",["Path","Normal"]),"Attribute to store",!1);o.append(s),a.append(i,o);const c=J("Following along"),l=q(`
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

`),f=q(`
Initially the appraoch was to do both the original render and debug render inside the same shader, using the same write-enabled storage buffer.
The implementation ran into interesting issues with corrupted data - or rather - a race condition with desynchronized wavefronts reaching the debug draw section before others were finished.
The end result can be seen in the image below. The debug canvas (in white) would only update in rows of chunks from the bottom right to left and up until the location of the mouse coordinate.
`),h=Ni(vn("resources/storage_buffer_issue.png")),u=q(`
Setting the external overlay debug canvas in the end made more sense anyway, as the overlay should be easily disabled or removed - and the shader for the ray intersection as an entirely different entity helps with decoupling production code from development code.

An extension to drawing rays would be their inclusion in progressive rendering in the form of displaying one of the paths taken by a ray at that coordinate and refreshing every few seconds.
`);n.append(c,l,a,f,h,u),e.push(Uc)},Dc=`struct VertexNormal {
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
`,Hc=`@group(0) @binding(0) var<storage, read_write> debug_canvas : array<vec4f>;
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
`,ye="drawing-to-debug-canvas",Mt="progressive-enabled",qc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(ye),i=N(Mt,"checked"),a=lt("pixel-value-debug"),o=lt("pixel-count-debug"),s=Xn(await Dn(vn("models/CornellBoxWithBlocks.obj"))),c=fe(s),l=_e([c.vertices,c.normals]),f=new Uint32Array(c.indices);me(f,s.matIndices,4);const h=new Uint32Array(s.lightIndices),u=new Float32Array(s.materials.reduce((D,H)=>[...D,...B([H.color,H.specular,H.emission,d(H.illum,H.shininess,H.ior)])],[])),{renderSrc:_,renderDst:p,blitPingPong:v}=Ge(n,r),g=n.createShaderModule({code:Dc}),y=n.createRenderPipeline({layout:"auto",vertex:{module:g,entryPoint:"main_vs"},fragment:{module:g,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),w=document.getElementById(ye+"-debug"),m=w.getContext("gpupresent")||w.getContext("webgpu");m.configure({device:n,format:t,alphaMode:"premultiplied"});const I=n.createShaderModule({code:Hc}),T=n.createRenderPipeline({layout:"auto",vertex:{module:I,entryPoint:"main_vs",buffers:[]},fragment:{module:I,entryPoint:"main_fs",targets:[{format:t}]},primitive:{topology:"triangle-strip"}}),{bindGroup:b}=E(n,y,[l,f,h,u,c.bspPlanes,c.bspTree,c.treeIds],"STORAGE"),M=n.createBindGroup({layout:y.getBindGroupLayout(1),entries:[{binding:0,resource:p.createView()}]}),{bindGroup:S,buffers:[O,P,k]}=E(n,y,[c.aabb,new Uint32Array([h.length]),new Uint32Array([0,r.width,r.height])],"UNIFORM",2),R=n.createBuffer({size:Sn.float32x4*r.height*r.width,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC}),A=n.createBuffer({size:Sn.float32x4,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),X=async()=>{await A.mapAsync(GPUMapMode.READ);const D=new Float32Array(A.getMappedRange());a([...D].map(H=>H.toFixed(2)).join(", ")),A.unmap()},en=n.createBindGroup({layout:y.getBindGroupLayout(3),entries:[{binding:0,resource:{buffer:R}}]}),sn=n.createBuffer({size:Sn.float32x2,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});let j=64;const C=n.createBuffer({size:new Uint32Array(1).byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});Vn(n,C,new Uint32Array([j]),0);const z=n.createBindGroup({layout:T.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:R}},{binding:1,resource:{buffer:sn}},{binding:2,resource:{buffer:C}}]}),G=D=>{const H=D.beginRenderPass({colorAttachments:[{view:m.getCurrentTexture().createView(),loadOp:"clear",clearValue:hn.transparent,storeOp:"store"}]});H.setPipeline(T),H.setBindGroup(0,z),H.draw(4),H.end()};let Y=0;const cn=()=>{if(!i())return;Y+=1,Vn(n,k,new Uint32Array([Y]),0);const D=n.createCommandEncoder(),H=D.beginRenderPass({colorAttachments:[{view:e.getCurrentTexture().createView(),loadOp:"clear",clearValue:hn.black,storeOp:"store"},{view:_.createView(),loadOp:"load",storeOp:"store"}]});H.setPipeline(y),H.setBindGroup(0,b),H.setBindGroup(1,M),H.setBindGroup(2,S),H.setBindGroup(3,en),H.draw(4),H.end(),G(D),v(D),n.queue.submit([D.finish()]),requestAnimationFrame(cn)};requestAnimationFrame(cn),Ln(Mt,()=>requestAnimationFrame(cn),"checked");let gn={x:0,y:0};const yn=D=>{const H=D.x,Mn=r.height-D.y;gn.x=Math.floor(H),gn.y=Math.floor(Mn),Vn(n,sn,new Uint32Array([H,Mn]),0);const bn=n.createCommandEncoder();G(bn),n.queue.submit([bn.finish()])};yn({x:256,y:256}),We(ye,{onMove:yn,onStart:yn},{});let tn=!1,ln=0;const _n=D=>{const H=n.createCommandEncoder();if(!tn){const bn=Math.floor(D.x/512*j)+gn.x-j/2,Tn=(Math.floor((1-D.y/512)*j)+gn.y-j/2)*512+bn;H.copyBufferToBuffer(R,Sn.float32x4*Tn,A,0,Sn.float32x4),n.queue.submit([H.finish()]),X();return}const Mn=2*Math.round((D.y-ln)/2);j=ke(j+Mn,2,512),Vn(n,C,new Uint32Array([j]),0),o(j.toString()),G(H),n.queue.submit([H.finish()]),ln=D.y};We(ye+"-debug",{onMove:_n,onStart:D=>{ln=D.y,tn=!0},onEnd:()=>tn=!1},{alwaysMouseMove:!0})},$c=(n,e)=>{const t=J("The magnifying glass for the debugging detective"),r=q(`
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
`),i=K(ye),a=F(Wn(Mt,!1),"Progressive rendering enabled",!1),o=un();o.append(a);const s=nn();s.append(i,o);const c=K(ye+"-debug"),l=nn(),f=F(ct("pixel-count-debug"),"Debug canvas dimension"),h=F(ct("pixel-value-debug"),"Pixel value"),u=un();u.append(f,h),l.append(c,u),n.append(t,r,s,l),e.push(qc)},Wc=(n,e)=>{Gc(n,e),Nc(n,e),$c(n,e)},Xc=(n,e)=>{ni(n,e),fi(n,e),mi(n,e),wi(n,e),Bi(n,e),Oi(n,e),Fi(n,e)},Mi={path:"rendering",generator:Xc,name:"Rendering",description:"",children:[{path:"raycasting-introduction",name:"Introduction to raycasting",description:"A conscise look into the anatomy of a raycasting system.",generator:ni},{path:"lighting-models",name:"Lighting models",description:"An overview of the basic lighting models implemented in rendering.",generator:fi},{path:"texture-mapping",name:"Adding textures",description:"The process of applying textures to conceptual objects in a rendered scene.",generator:mi},{path:"measuring-light",name:"Radiometry and photometry",description:"Understanding the process of measuring light through examples of photometric and radiometric equations.",generator:nc},{path:"meshes",name:"Mesh instantiation",description:"The simplest appraoch of writing mesh data into buffers to loop over in the render process.",generator:wi},{path:"partitioning",name:"Partitioning mesh data",description:"Using the binary space partitioning tree (BSP) to manage large meshes.",generator:yc},{path:"progressive",name:"Progressive rendering",description:"Harnessing the power of progressive rendering to generate smooth render images.",generator:Bi},{path:"brdf",name:"Global illumination",description:"Introducing sampling ray paths to the light models in progressive rendering.",generator:Oi},{path:"environmental",name:"Environemntal mapping",description:"Reading light and color data from an environment map, placing rendered objects in a real life scene.",generator:Fi},{path:"10-production-rendering",name:"Production rendering",description:"A short discussion of production rendering with example from Blender.",generator:()=>{}},{path:"debugging",name:"An approach to debugging (project)",description:"A project delving into the options available to debug and understand rendering systems via displaying ray paths and reading color or variable values.",generator:Wc}]},Yc=async()=>{},Jc=(n,e)=>{const t=J("Using WebGPU for graphics and rendering"),r=q("TBD"),i=Wt(Qe),a=Wt(Mi),o=document.createElement("div");o.className="generic-row",o.append(i,a),n.append(t,r,o),e.push(Yc)},Zc=[Qe,Mi],Vt={name:"Landing Page",path:"",description:"",generator:Jc,children:[]},Vi=Wi(),Ei=[],{route:zi,breadcrumbs:Kc}=$i(Zc);Vi.append(Ui(zi,Kc));zi.generator(Vi,Ei);for(const n of Ei)n();
