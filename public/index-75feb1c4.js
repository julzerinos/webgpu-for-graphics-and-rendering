(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const W=n=>{const e=n.split(`

`),t=document.createElement("div");t.className="paragraph";for(const r of e){const i=document.createElement("span");i.innerHTML=r,t.append(i)}return t},X=n=>{const e=document.createElement("h1");return e.innerHTML=n,e.className="title",e},O=(n,e,t=!0)=>{const r=document.createElement("div");r.className="label-group";const i=document.createElement("label");if(i.textContent=e,r.append(i),t&&"value"in n){const a=document.createElement("label");a.className="value-label";const o=()=>a.textContent=`[ ${n.value} ]`;n.addEventListener("input",o),o(),r.append(a)}return r.append(n),r},en=(n,{width:e,height:t,lowRes:r,overlay:i}={})=>{if(!navigator.gpu){const o=document.createElement("div");o.className="fallback",o.style.setProperty("width",`${e??512}px`),o.style.setProperty("height",`${t??512}px`);const s=document.createElement("span");s.textContent="WebGPU is not supported by this browser (or browser version). Try a different browser (eg. Chrome or Edge).";const c=document.createElement("a");return c.text="You can check the current state of WebGPU API support here.",c.href="https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API",o.append(s,c),o}const a=document.createElement("canvas");return a.width=e??512,a.height=t??512,a.id=n,r&&a.classList.add("low-res"),i&&a.classList.add("overlay"),a},qt=n=>{const e=document.createElement("div");e.className=`routes ${n.path}`;const t=document.createElement("a");t.text=n.path,t.className="underline",e.append(t);const r=document.createElement("div");r.className="routes-container";for(const i of n.children??[]){const a=document.createElement("div");a.className="route-entry";const o=document.createElement("a");o.text=i.name;const s=document.createElement("span");s.textContent=i.description,a.onclick=()=>{tr(`/${n.path}/${i.path}`)},a.append(o,s),r.append(a)}return e.append(r),e},ot=n=>{const e=document.createElement("div");return e.id=n,e.className="value-display",e},Ci=(n,e)=>{const t=document.createElement("div");t.className=`navigation ${e.map(i=>i.path).join(" ")}`;const r=document.createElement("a");if(r.className="underline-white",r.textContent=Et.name,r.onclick=()=>{tr("/")},t.append(r),e.length>1){const i=document.createElement("span");i.textContent="/";const a=document.createElement("a");a.className="underline",a.textContent=n.name,t.append(i,a)}return t},fn=(n,e,t,r,i=1,a=!1)=>{const o=document.createElement("input");return o.id=n,o.type="range",o.className="slider-input",o.min=String(t),o.max=String(r),o.step=String(i),o.value=String(e),o.disabled=a,o},$e=(n,e)=>{const t=document.createElement("input");return t.id=n,t.type="color",t.value=e,t},Wn=(n,e)=>{const t=document.createElement("input");return t.id=n,t.type="checkbox",t.checked=e,t.value=String(e),t.addEventListener("input",()=>t.value=String(t.checked)),t},Qe=(n,e)=>{const t=document.createElement("button");return t.id=n,t.textContent=e,t},Fn=(n,e,t=e[0]??"")=>{const r=document.createElement("select");return r.id=n,r.append(...e.map(i=>{const a=document.createElement("option");return a.text=i,a.value=i,a.selected=i===t,a})),r},_n=()=>{const n=document.createElement("div");return n.className="interactables",n},tn=()=>{const n=document.createElement("div");return n.className="canvas-section",n},C=(n,e="value")=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate input with id ${n}`);return()=>t[e]},In=(n,e,t="value")=>{const r=document.getElementById(n);if(!r)throw new Error(`Could not locate input with id ${n}`);return r.addEventListener("input",()=>e(r[t])),r.value},nt=(n,e)=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate button with id ${n}`);t.addEventListener("click",e)},Ui=(n,e)=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate canvas with id ${n}`);t.addEventListener("click",r=>{const i=t.getBoundingClientRect(),a=r.clientX-i.left,o=r.clientY-i.top;e({x:a,y:o})})},st=(n,{onStart:e,onMove:t,onEnd:r},{alwaysMouseMove:i}={})=>{const a=document.getElementById(n);if(!a)throw new Error(`Could not locate canvas with id ${n}`);const o=c=>{const l=a.getBoundingClientRect();return{x:c.clientX-l.left,y:c.clientY-l.top}};let s=!1;a.addEventListener("mousedown",c=>{s=!0,e==null||e(o(c))}),a.addEventListener("mouseup",c=>{s=!1,r==null||r(o(c))}),a.addEventListener("mouseleave",c=>{s&&(s=!1,r==null||r(o(c)))}),a.addEventListener("mousemove",c=>{!i&&!s||t==null||t(o(c))})},Vt=(n,e)=>{for(const t of n){const r=document.getElementById(t);if(!r)throw new Error(`Could not locate element with id ${t}`);r.addEventListener("input",()=>e(t))}},ji=(n,e,{onStart:t,onEnd:r}={})=>{const i=document.getElementById(n);if(!i)throw new Error(`Could not locate canvas with id ${n}`);i.addEventListener("click",async()=>{document.pointerLockElement||await i.requestPointerLock()});const a=l=>{e(l.movementX,l.movementY)};let o={};const s=l=>{o[l.key]=!0},c=l=>{o[l.key]=!1};return document.addEventListener("pointerlockchange",()=>{if(document.pointerLockElement===i){console.log("[pointer api] locked pointer in canvas"),document.addEventListener("mousemove",a,!1),window.addEventListener("keydown",s),window.addEventListener("keyup",c),t==null||t();return}document.removeEventListener("mousemove",a,!1),window.removeEventListener("keydown",s),window.removeEventListener("keyup",c),r==null||r()},!1),{keyMap:o}},ct=n=>{const e=document.getElementById(n);if(!e)throw new Error(`Could not locate display with id ${n}`);return t=>e.innerText=t},Ni=n=>{const e=window.location.pathname.split("/").slice(2);let t=Et,r=n;const i=[Et];for(const a of e){const o=r.find(s=>s.path===a);if(!o)break;t=o,r=t.children??[],i.push(t)}return{route:t,breadcrumbs:i}},tr=n=>{location.href="/webgpu-for-graphics-and-rendering"+n},gn=(n,e)=>`https://julzerinos.github.io/webgpu-for-graphics-and-rendering/${n}`,Di=()=>{const n=document.getElementById("app");if(!n)throw new Error("Could not initialize app.");return n},L=(n=0,e=0)=>[n,e],x=(n=0,e=0,t=0)=>[n,e,t],f=(n=0,e=0,t=0,r=1)=>[n,e,t,r],Sn=n=>{const e=n[0]??0,t=n[1]??0,r=n[2]??0;return x(e,t,r)},rr={forward:x(0,0,1),back:x(0,0,-1),up:x(0,1,0),down:x(0,-1,0),right:x(1,0,0),left:x(-1,0,0)},R=n=>[].concat(...n),G=(n,e)=>{const t=[];for(let r=0;r<Math.min(n.length,e.length);r++)t.push(n[r]+e[r]);return t},me=(n,e)=>{const t=[];for(let r=0;r<Math.min(n.length,e.length);r++)t.push(n[r]-e[r]);return t},Kn=(n,e)=>{const t=[];for(let r=0;r<n.length;r++)t.push(e*n[r]);return t},tt=(n,e)=>{const t=[];for(let r=0;r<Math.min(n.length,e.length);r++)t.push((n[r]+e[r])/2);return t},De=(n,e)=>{let t=0;for(let r=0;r<Math.min(n.length,e.length);r++)t+=n[r]*e[r];return t},We=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],kt=(n,e)=>{const t=[];for(let r=0;r<Math.max(n.length,e.length);r++){let i=Number.POSITIVE_INFINITY;r<n.length&&(i=n[r]),r<e.length&&(i=Math.min(i,e[r])),t.push(i)}return t},zt=(n,e)=>{const t=[];for(let r=0;r<Math.max(n.length,e.length);r++){let i=Number.NEGATIVE_INFINITY;r<n.length&&(i=n[r]),r<e.length&&(i=Math.max(i,e[r])),t.push(i)}return t},$n=n=>Kn(n,1/Gt(n)),ir=n=>De(n,n),Gt=n=>Math.sqrt(ir(n)),ar=(n,e)=>{if(n.length!=e.length)return!1;for(let t=0;t<Math.min(n.length,e.length);t++)if(n[t]!=e[t])return!1;return!0},Fe=(n,e)=>{const t=[];for(let r=0;r<n.length;r++){let i=0;for(let a=0;a<n.length;a++)i+=e[r][a]*n[a];t.push(i)}return t},Be=(n=0,e=0,t=0,r=1)=>({r:n,g:e,b:t,a:r}),rt=n=>x(n.r,n.g,n.b),Xe=n=>f(n.r,n.g,n.b,n.a),mn={black:Be(0,0,0,1),white:Be(1,1,1,1),blueScreenBlue:Be(.1,.3,.6,1),transparent:Be(0,0,0,0)},ue=n=>{if(n[0]==="#"&&(n=n.substring(1)),n.length!==6)throw new Error("Can't handle color hexes of size other than 6.");const e=parseInt(n,16),t=(e>>16&255)/255,r=(e>>8&255)/255,i=(e&255)/255;return{r:t,g:r,b:i,a:1}},Nn=n=>n*Math.PI/180,se=(n,e,t,r,i)=>(n-e)/(t-e)*(i-r)+r,je=n=>n?1:0,Me=(n,e,t)=>Math.min(Math.max(n,e),t),we=(n,e)=>{const t=e/2;return[L(n[0]-t,n[1]-t),L(n[0]+t,n[1]-t),L(n[0]-t,n[1]+t),L(n[0]-t,n[1]+t),L(n[0]+t,n[1]-t),L(n[0]+t,n[1]+t)]},Hi=(n,e,t=12)=>{const r=[],i=2*Math.PI/t;for(let a=0;a<t;a++)r.push(n,G(n,L(e*Math.cos(a*i),e*Math.sin(a*i))),G(n,L(e*Math.cos((a+1)*i),e*Math.sin((a+1)*i))));return r},ze=(n,e)=>{const t=e/2,r=[f(...G(n,x(-t,-t,t)),1),f(...G(n,x(-t,t,t)),1),f(...G(n,x(t,t,t)),1),f(...G(n,x(t,-t,t)),1),f(...G(n,x(-t,-t,-t)),1),f(...G(n,x(-t,t,-t)),1),f(...G(n,x(t,t,-t)),1),f(...G(n,x(t,-t,-t)),1)],i=new Uint32Array([0,1,1,2,2,3,3,0,2,3,3,7,7,6,6,2,0,3,3,7,7,4,4,0,1,2,2,6,6,5,5,1,4,5,5,6,6,7,7,4,0,1,1,5,5,4,4,0]),a=[f(1,0,3),f(3,2,1),f(2,3,7),f(7,6,2),f(3,0,4),f(4,7,3),f(6,5,1),f(1,2,6),f(4,5,6),f(6,7,4),f(5,4,0),f(0,1,5)];return{vertices:r,lineIndices:i,triangleIndices:a,normals:[],triangleCount:12}},qi=n=>{const e=[f(...n[0],1),f(...n[1],1),f(...n[2],1)],t=[f(0,1,2,0)],r=[0,1,1,2,2,0];return{vertices:e,lineIndices:new Uint32Array(r),triangleIndices:t,triangleCount:1,normals:[]}},Ct=(n=0)=>{const e=[f(0,0,1),f(0,2*Math.sqrt(2)/3,-.3333333333333333),f(-Math.sqrt(6)/3,-Math.sqrt(2)/3,-.3333333333333333),f(Math.sqrt(6)/3,-Math.sqrt(2)/3,-.3333333333333333)];let t=[f(0,3,1),f(0,2,3),f(1,3,2),f(1,2,0)];const r=i=>{if(i<=0)return;const a=[],o=new Map;for(const s of t){const c=Sn(e[s[0]]),l=Sn(e[s[1]]),d=Sn(e[s[2]]),h=f(...$n(tt(c,l))),u=f(...$n(tt(l,d))),_=f(...$n(tt(d,c))),p=[s[0],s[1]].sort().toString();let v=o.get(p);v||(v=e.push(h)-1,o.set(p,v));const g=[s[1],s[2]].sort().toString();let y=o.get(g);y||(y=e.push(u)-1,o.set(g,y));const w=[s[0],s[2]].sort().toString();let m=o.get(w);m||(m=e.push(_)-1,o.set(w,m)),a.push(f(s[0],v,m),f(s[1],y,v),f(s[2],m,y),f(v,y,m))}t=a,r(i-1)};return r(n),{vertices:e,triangleIndices:t,triangleCount:t.length,normals:[]}},Gn=(n=0,e=0,t=0,r=0,i=0,a=0,o=0,s=0,c=0,l=0,d=0,h=0,u=0,_=0,p=0,v=0)=>[[n,e,t,r],[i,a,o,s],[c,l,d,h],[u,_,p,v]],Rn=(n=0,e=0,t=0,r=0,i=0,a=0,o=0,s=0,c=0)=>[[n,e,t],[r,i,a],[o,s,c]],Ln=()=>Gn(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),nn=n=>[].concat(...Xi(n)),Ie=n=>[].concat(...n.map(e=>nn(e))),Cn=(n,e,t)=>{if(ar(n,e))return Ln();let r=$n(me(e,n));const i=$n(We(r,t)),a=$n(We(i,r));return r=Kn(r,-1),Gn(...f(...i,-De(i,n)),...f(...a,-De(a,n)),...f(...r,-De(r,n)),...f())},$i=(n,e,t,r,i,a)=>{if(n===e)throw"ortho(): left and right are equal";if(t===r)throw"ortho(): bottom and top are equal";if(i===a)throw"ortho(): near and far are equal";const o=e-n,s=r-t,c=a-i,l=Ln();return l[0][0]=2/o,l[1][1]=2/s,l[2][2]=-2/c,l[0][3]=-(n+e)/o,l[1][3]=-(r+t)/s,l[2][3]=-(i+a)/c,l},ie=(n,e,t,r)=>{const i=1/Math.tan(Nn(n)/2),a=r-t,o=Ln();return o[0][0]=i/e,o[1][1]=i,o[2][2]=-(t+r)/a,o[2][3]=-2*t*r/a,o[3][2]=-1,o[3][3]=0,o},Oe=(n,e)=>{const t=$n(e),r=t[0],i=t[1],a=t[2],o=Math.cos(Nn(n)),s=Math.sin(Nn(n)),c=1-o;return Gn(...f(r*r*c+o,r*i*c-a*s,r*a*c+i*s,0),...f(r*i*c+a*s,i*i*c+o,i*a*c-r*s,0),...f(r*a*c-i*s,i*a*c+r*s,a*a*c+o,0),...f())},Re=n=>{var e=Math.cos(Nn(n)),t=Math.sin(Nn(n)),r=Gn(1,0,0,0,0,e,-t,0,0,t,e,0,0,0,0,1);return r},Ee=n=>{var e=Math.cos(Nn(n)),t=Math.sin(Nn(n)),r=Gn(e,0,t,0,0,1,0,0,-t,0,e,0,0,0,0,1);return r},Wi=n=>{var e=Math.cos(Nn(n)),t=Math.sin(Nn(n)),r=Gn(e,-t,0,0,t,e,0,0,0,0,1,0,0,0,0,1);return r},wn=({[0]:n,[1]:e,[2]:t})=>{const r=Ln();return r[0][3]=n,r[1][3]=e,r[2][3]=t,r},Dn=(n=1,e=1,t=1)=>{var r=Ln();return r[0][0]=n,r[1][1]=e,r[2][2]=t,r},E=(n,e)=>{const t=[];for(let r=0;r<n.length;r++){t.push([]);for(let i=0;i<e.length;i++){let a=0;for(let o=0;o<n.length;o++)a+=n[r][o]*e[o][i];t[r].push(a)}}return t},Xi=n=>{const e=[];for(let t=0;t<n.length;++t){e.push([]);for(let r=0;r<n[t].length;++r)e[t].push(n[r][t])}return e},Pn=n=>n[0][0]*n[1][1]*n[2][2]+n[0][1]*n[1][2]*n[2][0]+n[0][2]*n[2][1]*n[1][0]-n[2][0]*n[1][1]*n[0][2]-n[1][0]*n[0][1]*n[2][2]-n[0][0]*n[1][2]*n[2][1],Yi=n=>{const e=Rn(n[1][1],n[1][2],n[1][3],n[2][1],n[2][2],n[2][3],n[3][1],n[3][2],n[3][3]),t=Rn(n[1][0],n[1][2],n[1][3],n[2][0],n[2][2],n[2][3],n[3][0],n[3][2],n[3][3]),r=Rn(n[1][0],n[1][1],n[1][3],n[2][0],n[2][1],n[2][3],n[3][0],n[3][1],n[3][3]),i=Rn(n[1][0],n[1][1],n[1][2],n[2][0],n[2][1],n[2][2],n[3][0],n[3][1],n[3][2]);return n[0][0]*Pn(e)-n[0][1]*Pn(t)+n[0][2]*Pn(r)-n[0][3]*Pn(i)},$t=n=>{const e=Ln(),t=Yi(n),r=Rn(n[1][1],n[1][2],n[1][3],n[2][1],n[2][2],n[2][3],n[3][1],n[3][2],n[3][3]),i=Rn(n[1][0],n[1][2],n[1][3],n[2][0],n[2][2],n[2][3],n[3][0],n[3][2],n[3][3]),a=Rn(n[1][0],n[1][1],n[1][3],n[2][0],n[2][1],n[2][3],n[3][0],n[3][1],n[3][3]),o=Rn(n[1][0],n[1][1],n[1][2],n[2][0],n[2][1],n[2][2],n[3][0],n[3][1],n[3][2]),s=Rn(n[0][1],n[0][2],n[0][3],n[2][1],n[2][2],n[2][3],n[3][1],n[3][2],n[3][3]),c=Rn(n[0][0],n[0][2],n[0][3],n[2][0],n[2][2],n[2][3],n[3][0],n[3][2],n[3][3]),l=Rn(n[0][0],n[0][1],n[0][3],n[2][0],n[2][1],n[2][3],n[3][0],n[3][1],n[3][3]),d=Rn(n[0][0],n[0][1],n[0][2],n[2][0],n[2][1],n[2][2],n[3][0],n[3][1],n[3][2]),h=Rn(n[0][1],n[0][2],n[0][3],n[1][1],n[1][2],n[1][3],n[3][1],n[3][2],n[3][3]),u=Rn(n[0][0],n[0][2],n[0][3],n[1][0],n[1][2],n[1][3],n[3][0],n[3][2],n[3][3]),_=Rn(n[0][0],n[0][1],n[0][3],n[1][0],n[1][1],n[1][3],n[3][0],n[3][1],n[3][3]),p=Rn(n[0][0],n[0][1],n[0][2],n[1][0],n[1][1],n[1][2],n[3][0],n[3][1],n[3][2]),v=Rn(n[0][1],n[0][2],n[0][3],n[1][1],n[1][2],n[1][3],n[2][1],n[2][2],n[2][3]),g=Rn(n[0][0],n[0][2],n[0][3],n[1][0],n[1][2],n[1][3],n[2][0],n[2][2],n[2][3]),y=Rn(n[0][0],n[0][1],n[0][3],n[1][0],n[1][1],n[1][3],n[2][0],n[2][1],n[2][3]),w=Rn(n[0][0],n[0][1],n[0][2],n[1][0],n[1][1],n[1][2],n[2][0],n[2][1],n[2][2]);return e[0][0]=Pn(r)/t,e[0][1]=-Pn(s)/t,e[0][2]=Pn(h)/t,e[0][3]=-Pn(v)/t,e[1][0]=-Pn(i)/t,e[1][1]=Pn(c)/t,e[1][2]=-Pn(u)/t,e[1][3]=Pn(g)/t,e[2][0]=Pn(a)/t,e[2][1]=-Pn(l)/t,e[2][2]=Pn(_)/t,e[2][3]=-Pn(y)/t,e[3][0]=-Pn(o)/t,e[3][1]=Pn(d)/t,e[3][2]=-Pn(p)/t,e[3][3]=Pn(w)/t,e},Ji=(n,e=[0,0],t=[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER])=>n.slice(e[1],t[1]).map(r=>r.slice(e[0],t[0])),Zi=(n,e)=>{for(let t=0;t<n.length;t++)e[t].splice(0,n[t].length,...n[t]);return e},le=async n=>{const e=document.createElement("img");e.src=n,await e.decode();const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");if(!r)throw new Error("Could not get canvas context");r.drawImage(e,0,0,t.width,t.height);const i=r.getImageData(0,0,t.width,t.height),a=new Uint8Array(e.width*e.height*4);for(let o=0;o<e.height;++o)for(let s=0;s<e.width;++s)for(let c=0;c<4;++c)a[(o*e.width+s)*4+c]=i.data[((e.height-o-1)*e.width+s)*4+c];return{textureData:a,height:e.height,width:e.width}},or=(n,e)=>{const t=1/n,r=t/e;if(e<2)return[L()];const i=[];for(var a=0;a<e;++a)for(var o=0;o<e;++o)i.push(L((Math.random()+o)*r-t*.5,(Math.random()+a)*r-t*.5));return i},Ki=(n,e,t)=>{const r=new Uint8Array(4*n*n);for(let i=0;i<n;++i)for(let a=0;a<n;++a){const o=Math.floor(i/(n/t)),s=Math.floor(a/(n/e)),c=o%2!==s%2?255:0,l=4*(i*n+a);r[l]=r[l+1]=r[l+2]=c,r[l+3]=255}return r},Qi=({data:n,width:e,height:t},r=!1)=>{const i=Math.max(1,e/2|0),a=Math.max(1,t/2|0),o=new Uint8Array(i*a*4),s=(h,u)=>{const _=(u*e+h)*4;return n.subarray(_,_+4)},c=(h,u,_)=>h+(u-h)*_,l=(h,u,_)=>h.map((p,v)=>c(p,u[v],_)),d=(h,u,_,p,v,g)=>{const y=l(h,u,v),w=l(_,p,v);return l(y,w,g)};for(let h=0;h<a;++h)for(let u=0;u<i;++u){const _=(u+.5)/i,p=(h+.5)/a,v=_*e-.5,g=p*t-.5,y=v|0,w=g|0,m=v%1,I=g%1,T=s(y,w),b=s(y+1,w),F=s(y,w+1),S=s(y+1,w+1),P=(h*i+u)*4,M=d(T,b,F,S,m,I);r&&(M[0]=6*i),o.set(M,P)}return{data:o,width:i,height:a}},et=(n,e,t=!1)=>{const r=n.length/4/e;let i={data:n,width:e,height:r};const a=[i];for(;i.width>1||i.height>1;)i=Qi(i,t),a.push(i);return a},Ve=async(n,e)=>{const r=await(await fetch(e)).blob(),i=await createImageBitmap(r,{colorSpaceConversion:"none"}),a=n.createTexture({size:[i.width,i.height,1],format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT});n.queue.copyExternalImageToTexture({source:i,flipY:!0},{texture:a},{width:i.width,height:i.height});const o=n.createSampler({addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest"});return{texture:a,sampler:o}},sr=(n,{}={})=>{let e=0;const t=[],r=[],i=n.mtls.reduce((o,s)=>({...o,...s.materials.reduce((c,l,d)=>({...c,[l.name]:d}),{})}),{});for(let o=0;o<n.objects.length;o++){const s=n.objects[o];e+=s.faces.length;for(let c=0;c<s.faces.length;c++){const l=s.faces[c];t.push(f(...l.vIndices,1)),r.push(i[l.materialName])}}return{vertices:n.vertices,normals:n.normals,triangleCount:e,triangleIndices:t,materialIndices:r}},na=n=>({filename:n,mtls:[],objects:[],vertices:[],normals:[]}),Hn=async(n,e=1,t=!1)=>{var l;const i=(l=(await fetch(n)).body)==null?void 0:l.getReader();if(!i)throw new Error("Could not get reader for obj file.");const a=na(n),o=cr("_default");a.objects.push(o);const s={objDoc:a,currentObject:o,scale:e,currentMaterialName:"",filename:n,reverse:t};let c="";for(;;){const{value:d,done:h}=await i.read();if(h)break;const _=new TextDecoder("utf-8").decode(d,{stream:!0}).split(`
`);c!==""&&(_[0]=c+_[0],c=""),_[_.length-1]!==""&&(c=_.pop());for(const g of _)await ea(g,s)}return a},ea=async(n,e)=>{const t=lr(n),r=he(t);if(r.length!==0)switch(r){case"#":return;case"mtllib":var i=ta(t,e.filename),a=da();e.objDoc.mtls.push(a);const o=await fetch(i);if(!o.body)throw new Error("No MTL body to read.");await la(o.body.getReader(),a);return;case"o":case"g":const s=e.currentObject.numIndices===0?e.objDoc.objects.length-1:e.objDoc.objects.length,c=ra(t);e.objDoc.objects[s]=c,e.currentObject=c;return;case"v":const l=ia(t,e.scale);e.objDoc.vertices.push(l);return;case"vn":const d=aa(t);e.objDoc.normals.push(d);return;case"usemtl":e.currentMaterialName=oa(t);return;case"f":const h=sa(t,e.currentMaterialName);ca(h,e.objDoc,e.reverse),va(e.currentObject,h);return}},ta=(n,e)=>{var t=e.lastIndexOf("/"),r="";return t>0&&(r=e.substring(0,t+1)),r+he(n)},ra=n=>{var e=he(n);return cr(e)},ia=(n,e)=>{var t=re(n)*e,r=re(n)*e,i=re(n)*e;return f(t,r,i,1)},aa=n=>{var e=re(n),t=re(n),r=re(n);return f(e,t,r,0)},oa=n=>he(n),sa=(n,e)=>{const t=_a(e);for(;;){const r=he(n);if(r.length===0)break;const i=r.split("/");if(i.length>=1){const a=parseInt(i[0])-1;isNaN(a)||t.vIndices.push(a)}if(i.length>=3){const a=parseInt(i[2])-1;t.nIndices.push(a)}else t.nIndices.push(-1)}return t},ca=(n,e,t)=>{var r=[e.vertices[n.vIndices[0]][0],e.vertices[n.vIndices[0]][1],e.vertices[n.vIndices[0]][2]],i=[e.vertices[n.vIndices[1]][0],e.vertices[n.vIndices[1]][1],e.vertices[n.vIndices[1]][2]],a=[e.vertices[n.vIndices[2]][0],e.vertices[n.vIndices[2]][1],e.vertices[n.vIndices[2]][2]],o=Wt(r,i,a);if(o==null){if(n.vIndices.length>=4){var s=[e.vertices[n.vIndices[3]][0],e.vertices[n.vIndices[3]][1],e.vertices[n.vIndices[3]][2]];o=Wt(i,a,s)}o==null&&(o=[0,1,0])}if(t&&(o[0]=-o[0],o[1]=-o[1],o[2]=-o[2]),n.normal=f(o[0],o[1],o[2],0),n.vIndices.length>3){for(var c=n.vIndices.length-2,l=new Array(c*3),d=new Array(c*3),h=0;h<c;h++)l[h*3+0]=n.vIndices[0],l[h*3+1]=n.vIndices[h+1],l[h*3+2]=n.vIndices[h+2],d[h*3+0]=n.nIndices[0],d[h*3+1]=n.nIndices[h+1],d[h*3+2]=n.nIndices[h+2];n.vIndices=l,n.nIndices=d}return n.numIndices=n.vIndices.length,n},la=async(n,e)=>{const t={material:Ut("",f()),mtl:e};for(;;){const{value:r,done:i}=await n.read();if(i)break;const o=new TextDecoder("utf-8").decode(r,{stream:!0}).split(`
`);for(const s of o)ha(s,t)}e.complete=!0},ha=(n,e)=>{const t=lr(n),r=he(t);if(r.length!==0)switch(r){case"#":return;case"newmtl":const i=ua(t);e.material=Ut(i,f(.8,.8,.8,1)),e.mtl.materials.push(e.material);return;case"Kd":e.material&&(e.material.color=it(t));return;case"Ka":e.material&&(e.material.emission=it(t));return;case"Ks":e.material&&(e.material.specular=it(t));return;case"Ni":e.material&&(e.material.ior=re(t));return;case"Ns":e.material&&(e.material.shininess=re(t));return;case"illum":e.material&&(e.material.illum=pa(t));return}},fa=(n,e)=>{for(var t=0;t<e.mtls.length;t++)for(var r=0;r<e.mtls[t].materials.length;r++)if(e.mtls[t].materials[r].name==n)return e.mtls[t].materials[r];return Ut("_defaultMat",f(.8,.8,.8,1))},ne=(n,{indicesIn3:e}={})=>{let t=0,r=0,i=0;for(var a=0;a<n.objects.length;a++)r+=n.objects[a].numIndices+n.objects[a].faces.length,i+=n.objects[a].faces.length;t=n.vertices.length;const o=new Float32Array(t*4),s=new Float32Array(t*4),c=new Float32Array(t*4),l=new Uint32Array(r),d=new Uint32Array(i),h=[],u=new Map,_=[],p=ke();let v=0,g=0;for(let q=0;q<n.objects.length;q++){const on=n.objects[q];for(var y=0;y<on.faces.length;y++){var w=on.faces[y],m=u.get(w.materialName),I;m===void 0?(I=fa(w.materialName,n),u.set(w.materialName,h.length),m=h.length,h.push(I)):I=h[m],I.emission!==void 0&&I.emission[0]+I.emission[1]+I.emission[2]>0&&_.push(g),d[g++]=m;for(var T=I.color===void 0?f(.8,.8,.8,1):I.color,b=w.normal,F=0;F<w.vIndices.length;F++){var S=w.vIndices[F];l[v]=S;var P=n.vertices[S];o[S*4+0]=P[0],o[S*4+1]=P[1],o[S*4+2]=P[2],o[S*4+3]=1,wa(p,P),c[S*4+0]=T[0],c[S*4+1]=T[1],c[S*4+2]=T[2],c[S*4+3]=T[3];var M=w.nIndices[F];if(M>=0){var V=n.normals[M];s[S*4+0]=V[0],s[S*4+1]=V[1],s[S*4+2]=V[2],s[S*4+3]=0}else s[S*4+0]=b[0],s[S*4+1]=b[1],s[S*4+2]=b[2],s[S*4+3]=0;v++}e||(l[v++]=0)}}const B=new Uint32Array(_);return{vertices:o,normals:s,colors:c,indices:l,materials:h,matIndices:d,lightIndices:B,aabb:new Float32Array(R([p.min,p.max]))}},da=()=>({complete:!1,materials:[]}),ua=n=>he(n),it=n=>{var e=re(n),t=re(n),r=re(n);return f(e,t,r,1)},Ut=(n,e)=>({name:n,color:e,illum:0,shininess:0,ior:1,specular:f(),emission:f()}),cr=n=>({name:n,faces:[],numIndices:0}),va=(n,e)=>{n.faces.push(e),n.numIndices+=e.numIndices},_a=(n="")=>({materialName:n,vIndices:[],nIndices:[],normal:f(1),numIndices:0}),lr=n=>({str:n,index:0}),ma=n=>{let e;const t=n.str.length;for(e=n.index;e<t;e++){const r=n.str.charAt(e);if(!(r=="	"||r==" "||r=="("||r==")"||r=='"'))break}n.index=e},he=n=>{ma(n);const e=ga(n.str,n.index);if(e===0)return"";const t=n.str.substring(n.index,n.index+e);return n.index+=e+1,t},pa=n=>parseInt(he(n)),re=n=>parseFloat(he(n)),ga=(n,e)=>{let t;for(t=e;t<n.length;t++){var r=n.charAt(t);if(r=="	"||r==" "||r=="("||r==")"||r=='"')break}return t-e},Wt=(n,e,t)=>{for(var r=new Float32Array(3),i=new Float32Array(3),a=0;a<3;a++)r[a]=n[a]-e[a],i[a]=t[a]-e[a];var o=Array(3);o[0]=r[1]*i[2]-r[2]*i[1],o[1]=r[2]*i[0]-r[0]*i[2],o[2]=r[0]*i[1]-r[1]*i[0];var s=o[0],c=o[1],l=o[2],d=Math.sqrt(s*s+c*c+l*l);if(d){if(d==1)return o}else return o[0]=0,o[1]=0,o[2]=0,o;return d=1/d,o[0]=s*d,o[1]=c*d,o[2]=l*d,o},ba=4,Le=20,Xt=1e-6,Yt=4,xa=(n,e)=>({primIdx:n,bbox:ke(e)}),ya=n=>{let e=ke();for(var t=0;t<n.length;++t)e=La(e,n[t].bbox);const r={maxLevel:Le,count:n.length,id:0,bbox:e},i=[];return lt(r,r.bbox,0,n,i),{bspTreeRoot:r,tree_objects:i}},lt=(n,e,t,r,i)=>{if(r.length<=ba||t===Le){n.axisType=3,n.id=i.length,n.count=r.length,n.plane=0;for(var a=0;a<r.length;++a)i.push(r[a]);return}const o=[],s=[];n.left={id:-1,bbox:ke(),maxLevel:Le,count:0},n.right={id:-1,bbox:ke(),maxLevel:Le,count:0};let c=Number.MAX_VALUE;for(let m=0;m<3;++m)for(let I=1;I<Yt;++I){let T={min:[...e.min],max:[...e.max]},b={min:[...e.min],max:[...e.max]};const F=e.max[m],S=e.min[m],P=(F-S)*I/Yt+S;T.max[m]=P,b.min[m]=P;let M=0,V=0;for(let A=0;A<r.length;++A){const q=r[A];M+=Se(T,q.bbox)?1:0,V+=Se(b,q.bbox)?1:0}const B=M*Jt(T)+V*Jt(b);B<c&&(c=B,n.axisType=m,n.plane=P,n.left.count=M,n.left.id=0,n.right.count=V,n.right.id=0)}const l=n,d=e.max[l.axisType],h=e.min[l.axisType],u=d-h,_=Xt<u/8?u/8:Xt;let p=l.plane;if(l.left.count==0){p=d;for(var v=0;v<r.length;++v){const I=r[v].bbox.min[l.axisType];I<p&&(p=I)}p-=_}if(l.right.count==0){p=h;for(var v=0;v<r.length;++v){const T=r[v].bbox.max[l.axisType];T>p&&(p=T)}p+=_}l.plane=p;let g={min:[...e.min],max:[...e.max]},y={min:[...e.min],max:[...e.max]};g.max[l.axisType]=p,y.min[l.axisType]=p;const w=[];for(let m=0;m<r.length;++m){const I=r[m];w.push([m,Se(g,I.bbox)]),Se(g,I.bbox)&&o.push(I),Se(y,I.bbox)&&s.push(I)}r=[],lt(l.left,g,t+1,o,i),lt(l.right,y,t+1,s,i)},ve=n=>{const e=[];for(var t=0;t<n.indices.length/4;++t){let h=[n.indices[t*4]*4,n.indices[t*4+1]*4,n.indices[t*4+2]*4],u=x(n.vertices[h[0]],n.vertices[h[0]+1],n.vertices[h[0]+2]),_=x(n.vertices[h[1]],n.vertices[h[1]+1],n.vertices[h[1]+2]),p=x(n.vertices[h[2]],n.vertices[h[2]+1],n.vertices[h[2]+2]),v=xa(t,[u,_,p]);e.push(v)}const{bspTreeRoot:r,tree_objects:i}=ya(e),a=new Uint32Array(i.map(h=>h.primIdx)),o=(1<<Le+1)-1,s=new Float32Array(o),c=new Uint32Array(o*4),l=(h,u,_)=>{if(u>Le)return;const p=h;let v=(1<<u)-1+_;c[v*4]=p.axisType+(p.count<<2),c[v*4+1]=p.id,c[v*4+2]=(1<<u+1)-1+2*_,c[v*4+3]=(1<<u+1)+2*_,s[v]=p.plane,p.axisType!==3&&(l(p.left,u+1,_*2),l(p.right,u+1,_*2+1))};return l(r,0,0),{...n,treeIds:a,bspTree:c,bspPlanes:s,aabb:new Float32Array(R([r.bbox.min,r.bbox.max]))}},ke=(n=[])=>{let e=f(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,1),t=f(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,1);for(const r of n)e=kt(e,r),t=zt(t,r);return{max:t,min:e}},wa=(n,e)=>{n.min=kt(n.min,e),n.max=zt(n.max,e)},La=(n,e)=>({min:kt(n.min,e.min),max:zt(n.max,e.max)}),Ia=n=>Sn(me(n.max,n.min)),Ta=n=>{const[e,t,r]=Ia(n);return e*t+t*r+e*r},Jt=n=>Ta(n)*2,Se=(n,e)=>{for(let t=0;t<3;t++)if(e.min[t]>n.max[t]||e.max[t]<n.min[t])return!1;return!0},pe=n=>{const e=n.reduce((r,i)=>r+i.length,0),t=new Float32Array(e);for(let r=0;r<Math.max(...n.map(i=>i.length));r+=4)for(let i=0;i<n.length;i++)if(r<n[i].length)for(let a=0;a<4;a++)t[r*n.length+i*4+a]=n[i][r+a];return t},ge=(n,e,t)=>{for(let r=0;r<e.length;r++)n[t*r+3]=e[r]},Aa=()=>[0,0,0,1],hr=({[0]:n,[1]:e,[2]:t,[3]:r})=>[n,e,t,r],Pe=(n,e)=>{const t=Ba(e),r=Ye(e,Ye(n,t));return f(r[0],r[1],r[2],n[3])},Ye=(n,e)=>hr([n[1]*e[2]-n[2]*e[1]+e[3]*n[0]+n[3]*e[0],n[2]*e[0]-n[0]*e[2]+e[3]*n[1]+n[3]*e[1],n[0]*e[1]-n[1]*e[0]+e[3]*n[2]+n[3]*e[2],n[3]*e[3]-n[0]*e[0]-n[1]*e[1]-n[2]*e[2]]),Sa=n=>n[0]*n[0]+n[1]*n[1]+n[2]*n[2]+n[3]*n[3],Ba=n=>{const e=Sa(n);return hr([-n[0]/e,-n[1]/e,-n[2]/e,n[3]/e])},Zt=(n,e)=>{const t=Math.sin(e*.5),r=$n(n);return[r[0]*t,r[1]*t,r[2]*t,Math.cos(e*.5)]},Ra=(n,e)=>{const t=Math.sqrt(2*(1+n[0]*e[0]+n[1]*e[1]+n[2]*e[2]));return[(n[1]*e[2]-n[2]*e[1])/t,(n[2]*e[0]-n[0]*e[2])/t,(n[0]*e[1]-n[1]*e[0])/t,t/2]},Pa=(n,e)=>{const t=[];for(let r=0;r<n.length;r++){const i=n[r];for(let a=0;a<e;a++){const o=t[a];if(!(o!==void 0&&n[o]<i)){t.splice(a,0,r);break}}}return t.slice(0,e)},Oa={float32:new Float32Array([0]).byteLength,uint32:new Uint32Array([0]).byteLength},Un={float32x2:new Float32Array(L()).byteLength,float32x3:new Float32Array(x()).byteLength,float32x4:new Float32Array(f()).byteLength},Fa={float32x4x4:new Float32Array(nn(Gn())).byteLength},On={...Oa,...Un,...Fa},sn=async n=>{const t=await navigator.gpu.requestAdapter();if(!t)throw new Error("Could not initialize GPU adapter.");const r=await t.requestDevice(),i=document.getElementById(n);if(!i)throw new Error(`Could not find canvas with id ${n}`);const a=i.getContext("gpupresent")||i.getContext("webgpu");if(!a)throw new Error("Could not generate context for canvas.");const o=navigator.gpu.getPreferredCanvasFormat();return a.configure({device:r,format:o}),{adapter:t,device:r,canvas:i,canvasFormat:o,context:a}},hn=(n,e,t={r:0,g:0,b:0,a:1},{msaaTexture:r,depthStencilAttachmentFactory:i,otherColorAttachments:a}={})=>{const o={view:r?r.createView():e.getCurrentTexture().createView(),resolveTarget:r?e.getCurrentTexture().createView():void 0,loadOp:"clear",clearValue:t,storeOp:"store"},s=n.createCommandEncoder(),c=s.beginRenderPass({colorAttachments:[o,...a??[]],depthStencilAttachment:(i??(()=>{}))()});return{pass:c,executePass:()=>{c.end(),n.queue.submit([s.finish()])},encoder:s}},an=(n,e,t,r,i="triangle-list",a,{fragmentOverrides:o,blend:s}={})=>{const c=n.createShaderModule({code:r});return n.createRenderPipeline({layout:"auto",vertex:{module:c,entryPoint:"main_vs",buffers:e},fragment:{module:c,entryPoint:"main_fs",targets:[{format:t,blend:s}],...o},...a,primitive:{topology:i,frontFace:"ccw",cullMode:"back",...a==null?void 0:a.primitive}})},ae=(n,e,t,{depthStencilOverwrites:r}={})=>{let i;const a=()=>{i=n.createTexture({size:{width:e.width,height:e.height},format:"depth24plus",sampleCount:t,usage:GPUTextureUsage.RENDER_ATTACHMENT})},o={depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus",...r};return{createDepthTexture:a,depthStencil:o,depthStencilAttachmentFactory:()=>(i||a(),{view:i.createView(),depthLoadOp:"clear",depthClearValue:1,depthStoreOp:"store"})}},be=(n,e,t,r)=>({msaaTexture:n.createTexture({size:{width:e.width,height:e.height},format:t,sampleCount:r,usage:GPUTextureUsage.RENDER_ATTACHMENT}),multisample:{count:r}}),H=(n,e,t,r=0,i=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const a=n.createBuffer({size:e.byteLength,usage:i}),o={arrayStride:On[t],attributes:[{format:t,offset:0,shaderLocation:r}]};return n.queue.writeBuffer(a,0,e),{bufferLayout:o,buffer:a}},zn=(n,e,t=GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST)=>{const r=n.createBuffer({size:e.byteLength,usage:t});return n.queue.writeBuffer(r,0,e),{buffer:r}},k=(n,e,t,r,i=0)=>{const a=t.map(s=>{const c=n.createBuffer({size:s.byteLength,usage:GPUBufferUsage[r]|GPUBufferUsage.COPY_DST});return n.queue.writeBuffer(c,0,s),c}),o=n.createBindGroup({layout:e.getBindGroupLayout(i),entries:a.map((s,c)=>({binding:c,resource:{buffer:s}}))});return{buffers:a,bindGroup:o}},jn=(n,e,t,r,i=0,{createViewOverwrite:a}={})=>n.createBindGroup({layout:e.getBindGroupLayout(i),entries:[{binding:0,resource:r},{binding:1,resource:t.createView(a)}]}),Qn=(n,e,t,r,i,{mips:a}={})=>{const o=n.createTexture({size:[t,r,1],format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING,mipLevelCount:a?a.length:void 0});(a||[{data:e,width:t,height:r}]).forEach(({data:l,width:d,height:h},u)=>{n.queue.writeTexture({texture:o,mipLevel:u},l,{bytesPerRow:d*4},{width:d,height:h})});const c=n.createSampler({addressModeU:"repeat",addressModeV:"repeat",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",...i});return{texture:o,sampler:c}},Ma=(n,e,t,r)=>{const i=n.createTexture({dimension:"2d",size:[t,r,6],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});for(let o=0;o<e.length;o++)n.queue.writeTexture({texture:i,origin:[0,0,o]},e[o],{bytesPerRow:t*4},[t,r]);const a=n.createSampler({magFilter:"linear",minFilter:"linear"});return{cubemapTexture:i,sampler:a}},Ge=(n,e)=>{const t=n.createTexture({size:[e.width,e.height],usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,format:"rgba32float"}),r=n.createTexture({size:[e.width,e.height],usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,format:"rgba32float"});return{renderDst:r,renderSrc:t,blitPingPong:a=>a.copyTextureToTexture({texture:t},{texture:r},[e.width,e.height])}},K=(n,e,t,r,i=!1)=>{if(i){const a=new Float32Array(r/Float32Array.BYTES_PER_ELEMENT),o=new Float32Array((e.size-t.byteLength-a.byteLength)/Float32Array.BYTES_PER_ELEMENT);t=new Float32Array([...a,...t,...o]),r=0}n.queue.writeBuffer(e,r,t)},kn=(n,e,t,r,i=!1)=>{if(i){const a=new Uint32Array(r/Float32Array.BYTES_PER_ELEMENT),o=new Uint32Array((e.size-t.byteLength-a.byteLength)/Uint32Array.BYTES_PER_ELEMENT);t=new Uint32Array([...a,...t,...o]),r=0}n.queue.writeBuffer(e,r,t)},jt=Gn(1,0,0,0,0,1,0,0,0,0,-.5,.5,0,0,0,1),Ea=`@vertex
fn main_vs(@location(0) pos : vec2f) -> @builtin(position) vec4f
{
    return vec4f(pos, 0, 1);
}
@fragment
fn main_fs() -> @location(0) vec4f
{
    return vec4f(0.0, 0.0, 0.0, 1.0);
}
`,Va=async()=>{const{device:n,canvas:e,context:t,canvasFormat:r}=await sn("task1"),i=[].concat(R(we([0,0],10*(2/e.height))),R(we([1,0],10*(2/e.height))),R(we([1,1],10*(2/e.height)))),a=new Float32Array(i),{buffer:o,bufferLayout:s}=H(n,a,"float32x2"),c=an(n,[s],r,Ea),{pass:l,executePass:d}=hn(n,t,{r:.3921,g:.5843,b:.9294,a:1});l.setPipeline(c),l.setVertexBuffer(0,o),l.draw(i.length/2),d()},ka=(n,e)=>{const t=X("Hello (GPU) world"),r=W(`
With WebGPU, even the simplest 'Hello world!' exercise is already met with an obstacle. 
Points, the most primitive of shapes, are drawn to the screen as single pixels. 
This could work for low resolution images, but targeting something larger requires transforming the pixels into quads (two triangles forming a square) of the desired size.

The quads are transformed into a vertex buffer (flattened array of vector components) and attached to the render pass before the draw command. 
With this, the first step has been made. 
Displaying anything on the screen is just a trivial extension of drawing some points, really.
        `),i=en("task1"),a=tn();a.append(i),n.append(t,r,a),e.push(Va)},za=`struct VSOut {
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
`,Ga=async()=>{const{device:n,context:e,canvasFormat:t}=await sn("task2"),{pass:r,executePass:i}=hn(n,e,{r:.3921,g:.5843,b:.9294,a:1}),a=[L(0,0),L(1,0),L(1,1)],o=[x(1,0,0),x(0,1,0),x(0,0,1)],s=new Float32Array(R(a)),c=new Float32Array(R(o)),{buffer:l,bufferLayout:d}=H(n,s,"float32x2"),{buffer:h,bufferLayout:u}=H(n,c,"float32x3",1),_=an(n,[d,u],t,za);r.setPipeline(_),r.setVertexBuffer(0,l),r.setVertexBuffer(1,h),r.draw(a.length),i()},Ca=(n,e)=>{const t=X("A formal introduction to the triangle"),r=W(`
The triangle was mentioned in the previous section, but a passing mention does not do enough to emphasis the role this simple shape plays in the world of computer graphics.
The triangle, a shape made of any three unique vertices, is the most commonly used building block of virtual worlds.

The reasons (beyond simply stating this is how it was always done) come from the mathematical simplicity of the shape.
The triangle has the lowest number of vertices (points) which generate a flat surface polygon. The triangle also has a powerful feature which elevates it above its more complex cousins - Barycentric coordinates.

The set of three factors are crucial to smoothly interpolate values over the surface of the triangle (across the "axes" of its three points). 
Not only is this used to calculate the fragments which belong to the triangle between its points, but can be extended to support any attribute such as colors (see below) or as will soon be shown normals and texture coordinates.

Almost any complex graphical shape is now a collection of a multiple of three vertex points waiting to be interpolated.
`),i=en("task2"),a=tn();a.append(i),n.append(t,r,a),e.push(Ga)},Ua=`struct Time {
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
`,ja=async()=>{const{device:n,context:e,canvasFormat:t}=await sn("task3"),r=we(L(0,0),1),i=new Float32Array(R(r)),{bufferLayout:a,buffer:o}=H(n,i,"float32x2"),s=an(n,[a],t,Ua),{bindGroup:c,buffers:[l]}=k(n,s,[new Float32Array(1)],"UNIFORM"),d=h=>{K(n,l,new Float32Array([h/1e3]),0);const{pass:u,executePass:_}=hn(n,e,{r:.3921,g:.5843,b:.9294,a:1});u.setPipeline(s),u.setVertexBuffer(0,o),u.setBindGroup(0,c),u.draw(r.length),_(),requestAnimationFrame(d)};requestAnimationFrame(d)},Na=(n,e)=>{const t=X("Move, please"),r=W(`
A static triangle is hardly anything to write home about. Getting the shapes to move (or better - react to input) is what makes this whole endevour worthwhile.
The GPU does not have a concept of human time. To be fair, time is not much more than a constantly increasing linear value and should be just that.

While vertex buffers are key to generate shapes in the virtual space, storage and uniform buffers are optionally used to provide auxiliary data to the GPU. 
Time, just like any other variable, can then be fed into the mathematical algorithms defined in shaders to create a property function dependent on time.

Trigonometric functions (especially sinusoidal waves) soon become a shader author's best friend.
`),i=en("task3"),a=tn();a.append(i),n.append(t,r,a),e.push(ja)},Da=`struct Time {
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
`,Ha=async()=>{const{device:n,context:e,canvasFormat:t}=await sn("task4"),r=we(L(0,0),2),i=new Float32Array(R(r)),a=C("ball-height"),o=C("ball-size"),s=C("ball-speed"),{bufferLayout:c,buffer:l}=H(n,i,"float32x2"),d=an(n,[c],t,Da),{bindGroup:h,buffers:[u]}=k(n,d,[new Float32Array([0])],"UNIFORM"),{bindGroup:_,buffers:[p]}=k(n,d,[new Float32Array(3)],"UNIFORM",1),v=g=>{K(n,u,new Float32Array([g/1e3]),0),K(n,p,new Float32Array([a(),s(),o()]),0);const{pass:y,executePass:w}=hn(n,e,mn.blueScreenBlue);y.setPipeline(d),y.setVertexBuffer(0,l),y.setBindGroup(0,h),y.setBindGroup(1,_),y.draw(r.length),w(),requestAnimationFrame(v)};requestAnimationFrame(v)},qa=(n,e)=>{const t=X("Interacting with a scene"),r=W(`
Just as time can be provided to the GPU, so can any other relevant attribute, property or value which has to be controlled externally by the CPU.

While a circle could be defined as fan of triangles defined by vertices laying on a circle, it is important to remember that circles are pointless.
Pointless, but ever so important. No matter how many vertices define a circle, it will never be a resolution-independent circle.

An alternative is to define circles in the conceptual space of the fragement shader as a boolean function of distance to the circle center. 
To do this, the circle can only exist on the surface of another shape such as a quad. The black space in the canvas below is actually the color of quad. 
The ball is being rendered on the quad's surface, much like a screen displaying a video.
`),i=tn(),a=en("task4"),o=_n(),s=O(fn("ball-height",.3,.1,.9,.1),"Ball bounce height"),c=O(fn("ball-speed",4,1,16),"Ball bounce speed"),l=O(fn("ball-size",1.05,1.01,1.5,.01),"Ball size");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(Ha)},$a=(n,e)=>{ka(n,e),Ca(n,e),Na(n,e),qa(n,e)},Wa=`struct VSOut {
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
`,ht="drawing",ft="drawing-mode",Xa=["POINT","TRIANGLE","CIRCLE"],fr="points-color",dr="drawing-background-color",ur="granularity-slider",vr="size-slider",_r="clear",Ya=async()=>{const{device:n,canvas:e,context:t,canvasFormat:r}=await sn(ht);let i=In(dr,A=>{i=A,V()});const a=ct("display-draw-instruction"),o=C(fr),s=C(ft),c=C(ur),l=C(vr),d=1e3,h=new Float32Array(6*d*Un.float32x2),{buffer:u,bufferLayout:_}=H(n,h,"float32x2"),p=new Float32Array(6*d*Un.float32x3),{buffer:v,bufferLayout:g}=H(n,p,"float32x3",1),y=an(n,[_,g],r,Wa,"triangle-list");Ui(ht,A=>{switch(s()){case"TRIANGLE":P(A);break;case"CIRCLE":M(A);break;default:case"POINT":S(),T(A);break}V()});let m=0,I=0;const T=({x:A,y:q})=>{const on=se(A,0,e.width,-1,1),cn=-1*se(q,0,e.height,-1,1),U=we(L(on,cn),l()/e.height),Y=new Float32Array(R(U));n.queue.writeBuffer(u,m,Y),m+=6*Un.float32x2;const J=Array(6).fill(rt(ue(o()))),z=new Float32Array(R(J));n.queue.writeBuffer(v,I,z),I+=6*Un.float32x3};let b=[],F=[];const S=()=>{b=[],F=[]},P=A=>{if(b.push(A),F.push(o()),F.length<3){T(A);return}const q=new Float32Array([].concat(...b.map(({x:cn,y:U})=>{const Y=se(cn,0,e.width,-1,1),J=-1*se(U,0,e.height,-1,1);return L(Y,J)}),R(Array(9).fill(L()))));n.queue.writeBuffer(u,m-2*6*Un.float32x2,q),m+=Un.float32x2*(3-2*6);const on=new Float32Array([].concat(...R(F.map(cn=>rt(ue(cn)))),R(Array(9).fill(x()))));n.queue.writeBuffer(v,I-2*6*Un.float32x3,on),I+=Un.float32x3*(3-2*6),S()},M=A=>{if(b.push(A),F.push(o()),b.length<2){T(A);return}const q=L(se(b[0].x,0,e.width,-1,1),-1*se(b[0].y,0,e.height,-1,1)),on=L(se(b[1].x,0,e.width,-1,1),-1*se(b[1].y,0,e.height,-1,1)),cn=Gt(me(on,q)),U=Hi(q,cn,c()),Y=new Float32Array(R(U));n.queue.writeBuffer(u,m-6*Un.float32x2,Y),m+=Un.float32x2*(U.length-6);const J=new Float32Array(R([...new Array(U.length)].map((z,$)=>{const rn=$%3===0?0:1;return rt(ue(F[rn]))})));n.queue.writeBuffer(v,I-6*Un.float32x3,J),I+=Un.float32x3*(U.length-6),S()},V=()=>{const{pass:A,executePass:q}=hn(n,t,ue(i));A.setPipeline(y),A.setVertexBuffer(0,u),A.setVertexBuffer(1,v),A.draw(6*d),q()};nt(_r,()=>{n.queue.writeBuffer(u,0,new Float32Array(6*d*Un.float32x2)),n.queue.writeBuffer(v,0,new Float32Array(6*d*Un.float32x3)),V()}),In(ft,A=>{a({POINT:"Click to create a point",TRIANGLE:"Create three points to form a triangle",CIRCLE:"Create two points to form a circle"}[A])}),a("Click to create a point"),V()},Ja=(n,e)=>{const t=X("Drawing with WebGPU"),r=W(`
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
`),i=tn(),a=en(ht),o=_n(),s=ot("display-draw-instruction"),c=Fn(ft,Xa),l=O($e(fr,"#000000"),"Draw color"),d=O($e(dr,"#ffffff"),"Background color"),h=O(fn(vr,10,2,100),"Point size"),u=O(fn(ur,12,4,32),"Circle granularity"),_=Qe(_r,"Clear canvas");o.append(s,c,l,h,u,d,_),i.append(a,o),n.append(t,r,i),e.push(Ya)},Za=`struct Uniforms {
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
`,mr="wireframe",pr="wireframe-rotation-slider",Ka=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(mr),r=ze(x(0),1),i=r.lineIndices,a=new Float32Array(R(r.vertices)),{buffer:o}=zn(n,i),{buffer:s,bufferLayout:c}=H(n,a,"float32x4"),l=an(n,[c],t,Za,"line-list"),{bindGroup:d,buffers:[h]}=k(n,l,[new Float32Array(nn(Ln()))],"UNIFORM",0),u=wn(x(.5,.5,.5)),_=x(0,0,10),p=x(0),v=x(0,1,0),g=Cn(_,p,v),y=$i(-1.5,1.5,-1.5,1.5,0,100),w=E(jt,y),m=E(w,g),I=b=>{const F=Oe(b,x(1,1,1)),S=E(F,u),P=E(m,S);K(n,h,new Float32Array(nn(P)),0);const{pass:M,executePass:V}=hn(n,e,mn.black);M.setPipeline(l),M.setVertexBuffer(0,s),M.setIndexBuffer(o,"uint32"),M.setBindGroup(0,d),M.drawIndexed(i.length),V()},T=In(pr,I);I(T)},Qa=(n,e)=>{const t=X("Projecting a cube"),r=W(`
Along the journey in the direction of 3D scenes from 2D shapes a key stop is orthographic projection, known for its use in early game development (or in modern, as a stylistic choice).
This projection assumes a volume created by lines directly perpendicular to the image plane.

Wireframe rendering (using lines instead of triangles) is a simplification which can be used to observe the shape without having to deal with side differentiaion (through shading or unique colors).
`),i=tn(),a=en(mr),o=_n(),s=O(fn(pr,45,0,360),"Rotation in degrees about (1, 1, 1)");o.append(s),i.append(a,o),n.append(t,r,i),e.push(Ka)},no=`struct Uniforms {
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
`,gr="perspective",eo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(gr),i=ze(x(0),1),a=new Float32Array(R(i.vertices)),o=i.lineIndices,{buffer:s}=zn(n,o),{buffer:c,bufferLayout:l}=H(n,a,"float32x4"),{buffer:d,bufferLayout:h}=H(n,new Float32Array(R([f(.5,.5,.5,1),f(0,0,1,1),f(0,1,0,1),f(0,1,1,1),f(1,0,1,1),f(1,0,0,1),f(1,1,0,1),f(1,1,1,1)])),"float32x4",1),u=an(n,[l,h],t,no,"line-list"),_=x(0,0,5),p=x(0),v=x(0,1,0),g=Cn(_,p,v),y=ie(45,r.width/r.height,.1,100),w=E(jt,y),m=E(w,g),I=E(Oe(0,x(1,1,1)),wn(x(-2))),T=E(Oe(45,x(0,1,0)),wn(x(0))),b=E(wn(x(2)),Oe(45,x(1,1,0))),F=E(m,I),S=E(m,T),P=E(m,b),{bindGroup:M}=k(n,u,[new Float32Array(Ie([F,S,P]))],"UNIFORM",0);(()=>{const{pass:B,executePass:A}=hn(n,e,mn.black);B.setPipeline(u),B.setVertexBuffer(0,c),B.setVertexBuffer(1,d),B.setIndexBuffer(s,"uint32"),B.setBindGroup(0,M),B.drawIndexed(o.length,3),A()})()},to=(n,e)=>{const t=X("Considering different perspectives"),r=W(`
The commonly used projection is perspective projection which imitates real life cameras and human eyes. 
A common instance of perspective projection is the pinhole camera model.

The perspective model assumes camera rays have a single point oigin (the eye point) and create a 3D trapezoidal view volume by crossing the image plane.

Another key tool in managing objects on the GPU is instancing, a conceptual sibling to the flyweight design pattern. 
Multiples of an object which can be clearly differentiated by their extrinsic attributes (pose, color, size, etc.) can be instanced. 
A single set of their intrinsic attributes is enough to generate multiple instances and then, to adjust pose for example, apply a respective model matrix. With this method three cubes can be instanced from a single cube mesh definition. 

A further subclassification of perspective projections is based on number of vanishing points they consider. A vanishing point is generated by a non-parallel principal direction. 
The base case is one-point perspective projection (left), where the two other principal directions are parallel to the image plane, but there exists also two- (middle) and three-point (right) projections with one and none parallel principal directions respectively.
    `),i=tn(),a=en(gr,{width:1028-128}),o=_n();i.append(a,o),n.append(t,r,i),e.push(eo)},ro=`struct Uniforms {
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
`,br="airplane",xr="yaw-slider-airplane",yr="pitch-slider-airplane",wr="roll-slider-airplane",io=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(br),i=C(xr),a=C(yr),o=C(wr),s=ze(x(0),1),c=s.lineIndices,l=new Float32Array(R(s.vertices)),{buffer:d}=zn(n,c),{buffer:h,bufferLayout:u}=H(n,l,"float32x4"),_=an(n,[u],t,ro,"line-list"),p=x(5,5,5),v=x(0),g=x(0,1,0),y=Cn(p,v,g),w=ie(35,r.width/r.height,.1,100),m=E(jt,w),{bindGroup:I,buffers:[T]}=k(n,_,[new Float32Array([0,0,0,0,...nn(y),...nn(m)])],"UNIFORM",0),b=[],F=Dn(.4,.4,2),S=E(Dn(.35,.25,.35),wn(x(0,-.2,3.3))),P=E(Dn(1.7,.2,1.1),wn(x(.6))),M=E(Dn(1.7,.2,1.1),wn(x(-.6))),V=E(Dn(.2,.5,.3),wn(x(0,.5,-3.3))),B=E(Dn(.5,.1,.2),wn(x(-.9,.4,-4.3))),A=E(Dn(.5,.1,.2),wn(x(.9,.4,-4.3))),q=[F,S,P,M,V,B,A];b.push(...new Array(q.length).fill(f(.7,.7,.7)));const on=(bn=Ln())=>E(E(Dn(.1,.3,.2),bn),wn(x(0,.5,-6)));b.push(f(0,1,0));const cn=(bn=Ln())=>E(E(Dn(.25,.05,.2),bn),wn(x(2,.4,-5.3))),U=(bn=Ln())=>E(E(Dn(.25,.05,.2),bn),wn(x(-2,.4,-5.3)));b.push(f(1,0,0),f(1,0,0));const Y=(bn=Ln())=>E(E(wn(x(-1,.1,-.5)),bn),Dn(1,.1,.3)),J=(bn=Ln())=>E(E(wn(x(1,.1,-.5)),bn),Dn(1,.1,.3));b.push(f(.4,.4,1),f(.4,.4,1));const z=[...q,on(),cn(),U(),Y(),J()],{bindGroup:$,buffers:rn}=k(n,_,[new Float32Array(Ie(z)),new Float32Array(R(b))],"STORAGE",1);let pn=0,yn=0,Q=0,ln=0,dn=0,j=0;const N=.1,En=bn=>{K(n,T,new Float32Array([bn]),0);const Vn=1*i();ln=ln*(1-N)+Vn*N,pn+=ln;const Tn=1*a();dn=dn*(1-N)+Tn*N,yn+=dn;const Xn=1*o();j=j*(1-N)+Xn*N,Q+=j;const An=Ee(-ln*20),un=Re(-dn*20),oe=j>0?Re(j*60):Ln(),xe=j<0?Re(-j*60):Ln(),qn=E(E(Re(yn),Ee(pn)),Wi(Q)),D=[...q.map(ee=>E(qn,ee)),E(qn,on(An)),E(qn,cn(un)),E(qn,U(un)),E(qn,Y(oe)),E(qn,J(xe))],vn=D.map(ee=>E(qn,ee));K(n,rn[0],new Float32Array(Ie(vn)),0);const{pass:Bn,executePass:_e}=hn(n,e,mn.black);Bn.setPipeline(_),Bn.setVertexBuffer(0,h),Bn.setIndexBuffer(d,"uint32"),Bn.setBindGroup(0,I),Bn.setBindGroup(1,$),Bn.drawIndexed(c.length,D.length),_e(),requestAnimationFrame(En)};requestAnimationFrame(En)},ao=(n,e)=>{const t=X("About Gimbal's lock"),r=W(`
As we descend into the depths of computer graphics, rotations of objects in three dimensions will become a big part of creating interactive showcases.

An issue which appears when using Euler angles with only three angle axes (three units of freedom) is a phenomenon known as Gimbal's lock. 
The short version is that a three-axes system cannot guarantee independent rotations. Each rotation is "local" to the previous rotations.
This can be observed when making half-rotations around two axess, which eliminates the third axis (ie. it does not have an effect).

In a later section, quaternions are introduced which are four dimensional abstractions of vectors. The fourth dimension allows the rotation information to remain absolute (without a reference system). 
One may think of these are homogeneous Euler angles.
    `),i=tn(),a=en(br),o=_n(),s=O(fn(xr,0,-1,1,.1),"Green rudder control (yaw)"),c=O(fn(yr,0,-1,1,.1),"Red elevators control (pitch)"),l=O(fn(wr,0,-.5,.5,.1),"Blue ailerons control (roll)");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(io)},oo=(n,e)=>{Qa(n,e),to(n,e),ao(n,e)},so=`struct SceneData {
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
`,Lr="graphics-lighting",He="rotation-around-tetrahedron",dt="subdivision-tetrahedron",Ir="tetrahedron-rotation-animation-enabled",ut="diffuse-reflectance-tetrahedron",vt="specular-reflectance-tetrahedron",_t="ambient-reflectance-tetrahedron",mt="shading-type-tetrahedron",pt="shininess-tetrahedron",gt="tetrahedron-light-emission",co=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Lr),i=C(He),a=C(dt),o=C(mt),s=C(_t),c=C(ut),l=C(vt),d=C(pt),h=C(gt),u=new Array(8).fill(0).map((ln,dn)=>Ct(dn)),{buffer:_}=zn(n,new Uint32Array(R(u[7].triangleIndices.map(ln=>Sn(ln))))),{buffer:p,bufferLayout:v}=H(n,new Float32Array(R(u[7].vertices)),"float32x4"),{buffer:g,bufferLayout:y}=H(n,new Float32Array(R([f(1,0,0),f(0,1,0),f(0,0,1),f(1,1,1),...new Array(u[7].vertices.length-4).fill(f(.4,.4,.4))])),"float32x4",1);kn(n,_,new Uint32Array(R(u[a()].triangleIndices.map(ln=>Sn(ln)))),0,!0);const w=4,{multisample:m,msaaTexture:I}=be(n,r,t,w),{createDepthTexture:T,depthStencil:b,depthStencilAttachmentFactory:F}=ae(n,r,w),S=an(n,[v,y],t,so,"triangle-list",{multisample:m,depthStencil:b});T();const P=Nn(i()),M=x(3*Math.sin(P),0,3*Math.cos(P)),V=x(0),B=x(0,1,0),A=Cn(M,V,B),on=ie(45,r.width/r.height,.1,100),U=E(on,A),Y={"Gouraud shading (vertex)":0,"Phong shading (fragment)":1},{bindGroup:J,buffers:[z]}=k(n,S,[new Float32Array([...nn(U),...f(...M),...Xe(ue(h())),...f(s(),c(),l(),d()),...f(Y[o()])])],"UNIFORM",0),$=ln=>{const dn=Nn(ln),j=x(3*Math.sin(dn),0,3*Math.cos(dn)),N=Cn(j,V,B),bn=E(on,N);K(n,z,new Float32Array([...nn(bn),...f(...j)]),0)};In(dt,ln=>{kn(n,_,new Uint32Array(R(u[ln].triangleIndices.map(dn=>Sn(dn)))),0,!0)}),In(He,$);let pn=!0;In(Ir,()=>pn=document.getElementById(He).disabled=!pn),Vt([mt,pt,vt,ut,_t,gt],()=>{K(n,z,new Float32Array([...Xe(ue(h())),...f(s(),c(),l(),d()),...f(Y[o()])]),80)});const Q=ln=>{pn&&$(ln/50);const{pass:dn,executePass:j}=hn(n,e,f(.2,.2,.2),{depthStencilAttachmentFactory:F,msaaTexture:I});dn.setPipeline(S),dn.setVertexBuffer(0,p),dn.setVertexBuffer(1,g),dn.setIndexBuffer(_,"uint32"),dn.setBindGroup(0,J),dn.drawIndexed(u[a()].triangleCount*3),j(),requestAnimationFrame(Q)};requestAnimationFrame(Q)},lo=(n,e)=>{const t=X("Shining light on tetrahedrons"),r=W(`
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
    `),i=tn(),a=en(Lr),o=_n(),s=O(Wn(Ir,!0),"Animated rotation",!1),c=fn(He,0,-180,180,1,!0),l=O(c,"Rotation around the tetrahedron"),d=O(fn(dt,4,0,7,1),"Number of tetrahedron subdivisions"),h=O(Fn(mt,["Gouraud shading (vertex)","Phong shading (fragment)"],"Gouraud shading"),"Shading type",!1),u=O(fn(ut,1,0,2,.1),"Diffuse reflectance"),_=O(fn(vt,1,0,2,.1),"Specular reflectance"),p=O(fn(pt,15,0,50,1),"Shininess"),v=O(fn(_t,.1,0,2,.1),"Ambient reflectance"),g=O($e(gt,"#ffffff"),"Light emission",!1);o.append(s,l,d,h,u,_,v,p,g),i.append(a,o),n.append(t,r,i),e.push(co)},ho=`struct SceneData {
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
`,Tr="monkey",Ar="rotation-around-monkey",fo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Tr),i=await Hn(gn("models/monkey.obj"),1,!1),a=ne(i,{indicesIn3:!0}),{buffer:o}=zn(n,a.indices),{buffer:s,bufferLayout:c}=H(n,a.vertices,"float32x4"),{buffer:l,bufferLayout:d}=H(n,a.normals,"float32x4",1),{msaaTexture:h,multisample:u}=be(n,r,t,4),{createDepthTexture:_,depthStencil:p,depthStencilAttachmentFactory:v}=ae(n,r,4),g=an(n,[c,d],t,ho,"triangle-list",{depthStencil:p,multisample:u,primitive:{frontFace:"ccw",cullMode:"back"}});_();const y=Nn(0),w=4,m=0,I=x(w*Math.sin(y),m,w*Math.cos(y)),T=x(0),b=x(0,1,0),F=Cn(I,T,b),P=ie(30,r.width/r.height,.1,100),M=E(P,F),V=Ln(),B=E(M,V),{bindGroup:A,buffers:[q]}=k(n,g,[new Float32Array([...nn(B),...I,1])],"UNIFORM",0);In(Ar,U=>{const Y=Nn(U),J=x(w*Math.sin(Y),m,w*Math.cos(Y)),z=Cn(J,T,b),$=E(P,z),rn=E($,V);K(n,q,new Float32Array([...nn(rn),...J,1]),0),cn()});const cn=()=>{const{pass:U,executePass:Y}=hn(n,e,mn.black,{depthStencilAttachmentFactory:v,msaaTexture:h});U.setPipeline(g),U.setVertexBuffer(0,s),U.setVertexBuffer(1,l),U.setIndexBuffer(o,"uint32"),U.setBindGroup(0,A),U.drawIndexed(a.indices.length),Y()};cn()},uo=(n,e)=>{const t=X("The Blender Monkey"),r=W(`
More interesting than primitive shapes are models created to represent specific objects. The entire graphics pipeline is made to support the display and animation of such models.

As an example, the mascot of the 3D modelling software Blender - Suzanne - is rendered to the screen below. The same lighting set up is used as with the sphere.

Another graphics feature is added to the mix - z-buffer indexing. This is the process of creating a (temporary for the time of creating the framebuffer) z-buffer. It store the z value (depth) of a fragment when it is drawn.
Each following fragment's depth value to compared to the current closest fragment and it may either be discarded (if it is covered) or it may overwrite if it is the closer (to the viewer) fragment.
    `),i=tn(),a=en(Tr),o=_n(),s=O(fn(Ar,0,-180,180,1),"Rotation around the monkey");o.append(s),i.append(a,o),n.append(t,r,i),e.push(fo)},vo=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,Sr="checkerboard-test",bt="texture-repeat-style",_o=["clamp-to-edge","repeat","mirror-repeat"],xt="magnification-checkerboard",yt="minification-checkerboard",at=["linear","nearest"],mo=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(Sr),r=C(bt),i=C(yt),a=C(xt),o=C(wt),s=new Float32Array(R([f(-4,-1,-1),f(4,-1,-1),f(4,-1,-21),f(-4,-1,-21)])),c=new Uint32Array([0,1,2,0,2,3]),l=new Float32Array(R([L(-1.5,0),L(2.5,0),L(2.5,10),L(-1.5,10)])),{buffer:d}=zn(n,c),{buffer:h,bufferLayout:u}=H(n,s,"float32x4"),{buffer:_,bufferLayout:p}=H(n,l,"float32x2",1),v=an(n,[u,p],t,vo,"triangle-list"),g=Ki(64,8,8),y=et(g,64,!0),w=async()=>{const{texture:m,sampler:I}=Qn(n,g,64,64,{addressModeU:r(),addressModeV:r(),minFilter:i(),magFilter:a(),mipmapFilter:o()},{mips:y}),T=jn(n,v,m,I),{pass:b,executePass:F}=hn(n,e,mn.blueScreenBlue);b.setPipeline(v),b.setVertexBuffer(0,h),b.setVertexBuffer(1,_),b.setIndexBuffer(d,"uint32"),b.setBindGroup(0,T),b.drawIndexed(6),F()};Vt([bt,xt,yt,wt],w),w()},wt="mipmap-select-checkerboard",po=(n,e)=>{const t=X("The unseen end of the checkers board"),r=W(`
Applying texture to objects is rather trivial. The hard part comes with trying to make the texture work properly in the scene and fighting at the same time with the two elements of texture space immutability - magnification and minification or in simple words, when a texel and a pixel are not of the same size (or even aligned for that matter).

Magnification happens when texture elements (texels) cover multiple pixels. This means that many pixels have to be the color of the single texel they correlate to. Blurring can be used to smooth the rough edges created by the enlarged texture objects.

The more complex counterpart is minification, which means that a single pixel contains more than one texel. In this case color mixing (averaging) has to be applied to get a single deterministic result.

Another method for manipulating textures in space is mipmapping (mip from the latin phrase multum in parvo, "much in a small space"). Mip maps are multiple variants of the same texture in different levels of details (ie. resolution).
According to the need, a lower resolution texture can be selected to address the phenomenon of aliasing or moiré patterns. 

In the example below, the checkerboard texture has a couple levels of mipmaps created. Each level has a different color to more easily observe the transition.
The latter layers (where the texture is the farthest from the camera and therefore a lower resolution texture is called for) is just a grey blob. At this point, the checkerboard pattern has been averaged into grey.
`),i=tn(),a=en(Sr),o=_n(),s=O(Fn(bt,_o,"repeat"),"Texture edge behaviour",!1),c=O(Fn(yt,at,"nearest"),"Minification behaviour",!1),l=O(Fn(xt,at,"nearest"),"Magnification behaviour",!1),d=O(Fn(wt,at,"nearest"),"Mipmap behaviour",!1);o.append(s,c,l,d),i.append(a,o),n.append(t,r,i),e.push(mo)},go=`struct SceneData {
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
`,Br="earth",bo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Br),{textureData:i,width:a,height:o}=await le(gn("textures/earth.jpg")),s=Ct(7),{buffer:c}=zn(n,new Uint32Array(R(s.triangleIndices.map(J=>Sn(J))))),{buffer:l,bufferLayout:d}=H(n,new Float32Array(R(s.vertices)),"float32x4"),{buffer:h,bufferLayout:u}=H(n,new Float32Array(R([f(1,0,0),f(0,1,0),f(0,0,1),f(1,1,1),...new Array(s.vertices.length-4).fill(f(.4,.4,.4))])),"float32x4",1),_=4,{multisample:p,msaaTexture:v}=be(n,r,t,_),{depthStencil:g,depthStencilAttachmentFactory:y}=ae(n,r,_),w=an(n,[d,u],t,go,"triangle-list",{multisample:p,depthStencil:g}),{sampler:m,texture:I}=Qn(n,i,a,o,{minFilter:"nearest",magFilter:"nearest"}),T=jn(n,w,I,m,1),b=Nn(0),F=x(3*Math.sin(b),0,3*Math.cos(b)),S=x(0),P=x(0,1,0),M=Cn(F,S,P),B=ie(45,r.width/r.height,.1,100),q=E(B,M),{bindGroup:on,buffers:[cn]}=k(n,w,[new Float32Array(nn(q))],"UNIFORM",0),U=J=>{const z=Nn(J),$=x(3*Math.sin(z),Math.cos(z),3*Math.cos(z)),rn=Cn($,S,P),yn=E(B,rn);K(n,cn,new Float32Array(nn(yn)),0)},Y=J=>{U(J/50);const{pass:z,executePass:$}=hn(n,e,f(.5,.1,.5),{depthStencilAttachmentFactory:y,msaaTexture:v});z.setPipeline(w),z.setVertexBuffer(0,l),z.setVertexBuffer(1,h),z.setIndexBuffer(c,"uint32"),z.setBindGroup(0,on),z.setBindGroup(1,T),z.drawIndexed(s.triangleCount*3),$(),requestAnimationFrame(Y)};requestAnimationFrame(Y)},xo=(n,e)=>{const t=X("Earth ball"),r=W(`
Using the sphere algorithm from the previous section combined with the ability to apply textures, a simplified model of the Earth can be created.

The sphere texture is a two dimensional rectangle and has to be mapped to a sphere. This is done with a uv-mapping function, which in this case is spherical uv-mapping.

To address magnification and minification, settings can be fiddled with, but in some cases it may not be possible to find a perfect solution.
With the earth texture, certain regions with high elevation are prone to aliasing issues due to many sudden changes in color values. 
This could be fixed by applying a heightmap which could stretch the crowded texels over a larger surface, but on a flat surface could instead be treated with applied smoothing filters.

Note: the earth texture is quite large and may take some time to load into the browser.
`),i=tn(),a=en(Br),o=_n();o.append(),i.append(a,o),n.append(t,r,i),e.push(bo)},yo=(n,e)=>{po(n,e),xo(n,e)},wo=`@group(0) @binding(0) var cube_sampler : sampler;
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
`,Rr="texture-sphere-with-quad",Pr="env-sphere-reflect-type",Or={"Faux reflection":0,"Mirror reflection":1,"Show normal map":2,"Bump reflection":3},Lo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Rr),[i,...a]=await Promise.all(["textures/normalmap.png","textures/cubemap/cm_left.png","textures/cubemap/cm_right.png","textures/cubemap/cm_top.png","textures/cubemap/cm_bottom.png","textures/cubemap/cm_back.png","textures/cubemap/cm_front.png"].map(Tn=>le(gn(Tn)))),o=x(0,0,3),s=x(0),c=x(0,1,0),l=Cn(o,s,c),h=ie(90,r.width/r.height,.1,100),u=E(h,l),_=$t(h),p=$t(l),v=Ji(p,[0,0],[3,3]),g=Gn(),y=Zi(v,g),w=E(y,_),m=Ct(7),I=R(m.triangleIndices.map(Tn=>Sn(Tn))),T=R(m.vertices.map(Tn=>Fe(Tn,u))),b=.999,F=R([f(-1,-1,b,1),f(1,-1,b,1),f(-1,1,b,1),f(1,1,b,1)]),S=[m.vertices.length+0,m.vertices.length+1,m.vertices.length+2,m.vertices.length+1,m.vertices.length+3,m.vertices.length+2],{buffer:P}=zn(n,new Uint32Array([...I,...S])),{buffer:M,bufferLayout:V}=H(n,new Float32Array([...T,...F]),"float32x4"),{buffer:B,bufferLayout:A}=H(n,new Float32Array([...R(m.vertices),...F]),"float32x4",1),{buffer:q,bufferLayout:on}=H(n,new Float32Array([...Array(m.vertices.length).fill(0),...Array(4).fill(1)]),"uint32",2),cn=4,{multisample:U,msaaTexture:Y}=be(n,r,t,cn),{depthStencil:J,depthStencilAttachmentFactory:z}=ae(n,r,cn),$=an(n,[V,A,on],t,wo,"triangle-list",{multisample:U,depthStencil:J}),{sampler:rn,cubemapTexture:pn}=Ma(n,a.map(Tn=>Tn.textureData),a[0].width,a[0].height),yn=jn(n,$,pn,rn,0,{createViewOverwrite:{dimension:"cube"}}),{bindGroup:Q,buffers:[ln,dn,j]}=k(n,$,[new Float32Array(Ie([Ln(),w])),new Float32Array([...o]),new Uint32Array([0])],"UNIFORM",1),{texture:N,sampler:En}=Qn(n,i.textureData,i.width,i.height),bn=jn(n,$,N,En,2),Vn=Tn=>{const Xn=Or[Tn];kn(n,j,new Uint32Array([Xn]),0);const{pass:An,executePass:un}=hn(n,e,f(.5,.1,.5),{depthStencilAttachmentFactory:z,msaaTexture:Y});An.setPipeline($),An.setVertexBuffer(0,M),An.setVertexBuffer(1,B),An.setVertexBuffer(2,q),An.setIndexBuffer(P,"uint32"),An.setBindGroup(0,yn),An.setBindGroup(1,Q),An.setBindGroup(2,bn),An.drawIndexed(m.triangleCount*3+S.length),un()};Vn(In(Pr,Vn))},Io=(n,e)=>{const t=X("A map to the environment"),r=W(`
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
`),i=tn(),a=en(Rr),o=_n(),s=O(Fn(Pr,Object.keys(Or),"Faux reflection"),"Reflection type",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(Lo)},To=(n,e)=>{Io(n,e)},Kt=`@group(0) @binding(0) var marble_sampler : sampler;
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
`,Fr="shadow-quads",Ao=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Fr),i=await le(gn("textures/xamp23.png")),a=new Uint32Array([0,1,2,0,2,3]),o=new Float32Array(R([L(0,0),L(1,0),L(1,1),L(0,1)])),s=new Float32Array(R([f(-2,-1,-1),f(2,-1,-1),f(2,-1,-5),f(-2,-1,-5)])),c=new Float32Array(R([f(-1,-1,-2.5),f(-1,-1,-3),f(-1,0,-3),f(-1,0,-2.5)])),l=new Float32Array(R([f(.25,-.5,-1.25),f(.75,-.5,-1.25),f(.75,-.5,-1.75),f(.25,-.5,-1.75)])),{buffer:d}=zn(n,new Uint32Array([...a,...a.map(rn=>rn+4),...a.map(rn=>rn+8),...a.map(rn=>rn+12),...a.map(rn=>rn+16)])),{buffer:h,bufferLayout:u}=H(n,new Float32Array([...s,...c,...l,...c,...l]),"float32x4"),{buffer:_,bufferLayout:p}=H(n,new Float32Array([...o]),"float32x2",1),{depthStencil:v,depthStencilAttachmentFactory:g}=ae(n,r,1),y=an(n,[u,p],t,Kt,"triangle-list",{depthStencil:v}),{depthStencil:w}=ae(n,r,1,{depthStencilOverwrites:{depthCompare:"greater"}}),m=an(n,[u,p],t,Kt,"triangle-list",{depthStencil:w,primitive:{cullMode:"none"}},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),I=et(i.textureData,i.width),{texture:T,sampler:b}=Qn(n,i.textureData,i.width,i.height,{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest",mipmapFilter:"nearest"},{mips:I}),F=jn(n,y,T,b),{texture:S,sampler:P}=Qn(n,new Uint8Array([255,0,0,255]),1,1),M=jn(n,y,S,P),{texture:V,sampler:B}=Qn(n,new Uint8Array([0,0,0,125]),1,1),A=jn(n,y,V,B),{bindGroup:q}=k(n,y,[new Float32Array(nn(Ln()))],"UNIFORM",1),{bindGroup:on,buffers:[cn]}=k(n,y,[new Float32Array(nn(Ln()))],"UNIFORM",1),U=-1-2-.001,Y=Gn(1,0,0,0,0,1,0,0,0,0,1,0,0,1/U,0,0),J=Ln(),z=rn=>{const pn=wn(rn),yn=wn(Kn(rn,-1)),Q=E(E(E(pn,Y),yn),J);K(n,cn,new Float32Array(nn(Q)),0)},$=rn=>{const pn=rn/1e3,yn=x(2*Math.cos(pn),2,2*Math.sin(pn)-2);z(yn);const{pass:Q,executePass:ln}=hn(n,e,mn.blueScreenBlue,{depthStencilAttachmentFactory:g});Q.setVertexBuffer(0,h),Q.setVertexBuffer(1,_),Q.setIndexBuffer(d,"uint32"),Q.setPipeline(y),Q.setBindGroup(0,F),Q.setBindGroup(1,q),Q.drawIndexed(6),Q.setPipeline(m),Q.setBindGroup(1,on),Q.setBindGroup(0,A),Q.drawIndexed(12,void 0,6),Q.setPipeline(y),Q.setBindGroup(1,q),Q.setBindGroup(0,M),Q.drawIndexed(12,void 0,18),ln(),requestAnimationFrame($)};requestAnimationFrame($)},So=(n,e)=>{const t=X("Shadow as a shape"),r=W(`
Implementing shadows in the rasterization pipeline is no simple task. Shapes have very limited information about the existence of other shapes out of the box.
The entire system is based on a simple ordered drawing of shapes to the screen.

There is a way to implement shadows while staying in the shapes only paradigm - projection shadows. The concept is simple, shadows are in fact copies of their obstructing object.
The projection shadow objects are drawn with the appropriate transformation matrix (depending on the light source).

To make sure shadows only exist on the surfaces of shadow-catching objects (such as the plane in the example below and not beyond it), 
clever manipulation of the z-buffer can be used to make sure a shape is only drawn if there exists a fragement beneath it.
Further modification of the draw orders or implementations of draw layers would allow mixing and matching shadow casters and shadow catchers.
    `),i=tn(),a=en(Fr),o=_n();o.append(),i.append(a,o),n.append(t,r,i),e.push(Ao)},Bo=(n,e)=>{So(n,e)},Ro=`@group(0) @binding(0) var marble_sampler : sampler;
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
`,Po=`@group(0) @binding(0) var<uniform> teapot_model : mat4x4f;
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
`,Oo=`@group(0) @binding(0) var<uniform> shadow_model : mat4x4f;

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
`,Mr="teapot-proj-shadow",Er="teapot-movement-teapot",Vr="light-movement-teapot",Fo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Mr),i=C(Er,"checked"),a=C(Vr,"checked"),o=await le(gn("textures/xamp23.png")),s=await Hn(gn("models/teapot.obj"),.25,!1),c=ne(s,{indicesIn3:!0}),{depthStencil:l,depthStencilAttachmentFactory:d}=ae(n,r,4),{depthStencil:h}=ae(n,r,4,{depthStencilOverwrites:{depthCompare:"greater"}}),{msaaTexture:u,multisample:_}=be(n,r,t,4),{buffer:p}=zn(n,c.indices),{buffer:v,bufferLayout:g}=H(n,c.vertices,"float32x4"),{buffer:y,bufferLayout:w}=H(n,c.normals,"float32x4",1),{buffer:m,bufferLayout:I}=H(n,c.colors,"float32x4",2),T=an(n,[g,w,I],t,Po,"triangle-list",{depthStencil:l,multisample:_}),b=an(n,[g],t,Oo,"triangle-list",{depthStencil:h,multisample:_,primitive:{cullMode:"front"}},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),F=new Uint32Array([0,1,2,0,2,3]),S=new Float32Array(R([L(0,0),L(1,0),L(1,1),L(0,1)])),P=new Float32Array(R([f(-2,-1,-1),f(2,-1,-1),f(2,-1,-5),f(-2,-1,-5)])),{buffer:M}=zn(n,new Uint32Array([...F])),{buffer:V,bufferLayout:B}=H(n,new Float32Array([...P]),"float32x4"),{buffer:A,bufferLayout:q}=H(n,new Float32Array([...S]),"float32x2",1),on=an(n,[B,q],t,Ro,"triangle-list",{depthStencil:l,multisample:_}),cn=et(o.textureData,o.width),{texture:U,sampler:Y}=Qn(n,o.textureData,o.width,o.height,{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest",mipmapFilter:"nearest"},{mips:cn}),J=jn(n,on,U,Y),{bindGroup:z,buffers:[$,rn]}=k(n,T,[new Float32Array(nn(Gn())),new Float32Array(x())],"UNIFORM",0),{bindGroup:pn,buffers:[yn]}=k(n,b,[new Float32Array(nn(Ln()))],"UNIFORM",0),Q=-1-2-.001,ln=Gn(1,0,0,0,0,1,0,0,0,0,1,0,0,1/Q,0,0),dn=(Vn,Tn)=>{const Xn=wn(Vn),An=wn(Kn(Vn,-1)),un=E(E(E(Xn,ln),An),Tn);K(n,yn,new Float32Array(nn(un)),0)};let j=0,N=0,En=0;const bn=Vn=>{const Tn=(Vn-En)/1e3;j+=i()?Tn:0,N+=a()?Tn:0;const Xn=x(2*Math.cos(N),2,2*Math.sin(N)-2),An=wn(x(0,(Math.cos(j)*3-1)/4,-3));dn(Xn,An),K(n,$,new Float32Array(nn(An)),0),K(n,rn,new Float32Array(Xn),0);const{pass:un,executePass:oe}=hn(n,e,mn.blueScreenBlue,{depthStencilAttachmentFactory:d,msaaTexture:u});un.setPipeline(on),un.setVertexBuffer(0,V),un.setVertexBuffer(1,A),un.setIndexBuffer(M,"uint32"),un.setBindGroup(0,J),un.drawIndexed(6),un.setPipeline(b),un.setBindGroup(0,pn),un.setVertexBuffer(0,v),un.setIndexBuffer(p,"uint32"),un.drawIndexed(c.indices.length),un.setPipeline(T),un.setVertexBuffer(0,v),un.setVertexBuffer(1,y),un.setVertexBuffer(2,m),un.setIndexBuffer(p,"uint32"),un.setBindGroup(0,z),un.drawIndexed(c.indices.length),oe(),En=Vn,requestAnimationFrame(bn)};requestAnimationFrame(bn)},Mo=(n,e)=>{const t=X("Tea time"),r=W(`
Before venturing into the topic of shadow maps, another example of projection shadows (previous section) is shown to provide a basis of comparison.

The opacity of the teapot's shadow is generated by enabling blending in the render pipeline configuration. 
This is required to let the projected shape mix colors with the fragements beneath it, instead of overwriting them in the z-buffer.
`),i=tn(),a=en(Mr),o=_n(),s=O(Wn(Er,!0),"Teapot movement",!1),c=O(Wn(Vr,!0),"Light movement",!1);o.append(s,c),i.append(a,o),n.append(t,r,i),e.push(Fo)},Eo=`@group(0) @binding(0) var marble_sampler : sampler;
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
`,Vo=`@group(0) @binding(0) var<uniform> teapot_model : mat4x4f;
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
`,ko=`@group(0) @binding(0) var<uniform> model : mat4x4f;
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
`,Je="shadow-mapping",kr="teapot-movement-shadow-mapping",zr="light-movement-shadow-mapping",zo=async()=>{const n=C(kr,"checked"),e=C(zr,"checked"),t=await le(gn("textures/xamp23.png")),r=await Hn(gn("models/teapot.obj"),.25,!1),i=ne(r,{indicesIn3:!0}),{device:a,context:o,canvasFormat:s,canvas:c}=await sn(Je),l=document.getElementById(Je+"-shadow"),d=l.getContext("gpupresent")||l.getContext("webgpu");d.configure({device:a,format:s});const{depthStencil:h,depthStencilAttachmentFactory:u}=ae(a,c,1),{buffer:_}=zn(a,i.indices),{buffer:p,bufferLayout:v}=H(a,i.vertices,"float32x4"),{buffer:g,bufferLayout:y}=H(a,i.normals,"float32x4",1),{buffer:w,bufferLayout:m}=H(a,i.colors,"float32x4",2),I=an(a,[v,y,m],s,Vo,"triangle-list",{depthStencil:h}),T=a.createTexture({size:{width:l.width,height:l.height,depthOrArrayLayers:1},mipLevelCount:1,sampleCount:1,dimension:"2d",format:"rgba32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC}),b=T.createView(),F=a.createShaderModule({code:ko}),S=a.createRenderPipeline({layout:"auto",vertex:{module:F,entryPoint:"main_vs",buffers:[v]},fragment:{module:F,entryPoint:"main_fs",targets:[{format:s},{format:"rgba32float"}]},primitive:{cullMode:"none",topology:"triangle-list"}}),{bindGroup:P,buffers:[M,V]}=k(a,S,[new Float32Array(nn(Ln())),new Float32Array(nn(Gn()))],"UNIFORM",0),B=new Uint32Array([0,1,2,0,2,3]),A=new Float32Array(R([L(0,0),L(1,0),L(1,1),L(0,1)])),q=new Float32Array(R([f(-2,-1,-1),f(2,-1,-1),f(2,-1,-5),f(-2,-1,-5)])),{buffer:on}=zn(a,new Uint32Array([...B])),{buffer:cn,bufferLayout:U}=H(a,new Float32Array([...q]),"float32x4"),{buffer:Y,bufferLayout:J}=H(a,new Float32Array([...A]),"float32x2",1),z=an(a,[U,J],s,Eo,"triangle-list",{depthStencil:h}),$=a.createBindGroup({layout:z.getBindGroupLayout(2),entries:[{binding:0,resource:T.createView()}]}),rn=new Float32Array(nn(ie(90,1,.001,6))),pn=D=>{const vn=ie(100,1,.01,4),Bn=Cn(D,x(0,-1,-3),rr.up);return E(vn,Bn)},yn=D=>{const vn=new Float32Array(nn(pn(D)));K(a,V,vn,0),K(a,dn,vn,0)},{bindGroup:Q,buffers:[ln,dn,j]}=k(a,z,[rn,new Float32Array(nn(Gn())),new Float32Array(nn(Gn()))],"UNIFORM",1),N=et(t.textureData,t.width),{texture:En,sampler:bn}=Qn(a,t.textureData,t.width,t.height,{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest",mipmapFilter:"nearest"},{mips:N}),Vn=jn(a,z,En,bn),{bindGroup:Tn,buffers:[Xn,An]}=k(a,I,[new Float32Array(nn(Gn())),new Float32Array(x()),rn],"UNIFORM",0);let un=0,oe=0,xe=0;const qn=D=>{const vn=(D-xe)/1e3;un+=n()?vn:0,oe+=e()?vn:0;const Bn=x(2*Math.cos(oe),2,2*Math.sin(oe)-2);K(a,An,new Float32Array(Bn),0),yn(Bn);const _e=wn(x(0,(Math.cos(un)*3-1)/4,-3)),ee=new Float32Array(nn(_e));K(a,Xn,ee,0),K(a,M,ee,0),K(a,j,ee,0);const Ae=a.createCommandEncoder(),de=Ae.beginRenderPass({colorAttachments:[{view:d.getCurrentTexture().createView(),loadOp:"clear",clearValue:{r:0,g:0,b:0,a:1},storeOp:"store"},{view:b,loadOp:"clear",clearValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]});de.setPipeline(S),de.setVertexBuffer(0,p),de.setIndexBuffer(_,"uint32"),de.setBindGroup(0,P),de.drawIndexed(i.indices.length),de.end();const Mn=Ae.beginRenderPass({colorAttachments:[{view:o.getCurrentTexture().createView(),loadOp:"clear",clearValue:mn.blueScreenBlue,storeOp:"store"}],depthStencilAttachment:u()});Mn.setPipeline(z),Mn.setVertexBuffer(0,cn),Mn.setVertexBuffer(1,Y),Mn.setIndexBuffer(on,"uint32"),Mn.setBindGroup(0,Vn),Mn.setBindGroup(1,Q),Mn.setBindGroup(2,$),Mn.drawIndexed(6),Mn.setPipeline(I),Mn.setVertexBuffer(0,p),Mn.setVertexBuffer(1,g),Mn.setVertexBuffer(2,w),Mn.setIndexBuffer(_,"uint32"),Mn.setBindGroup(0,Tn),Mn.drawIndexed(i.indices.length),Mn.end(),a.queue.submit([Ae.finish()]),xe=D,requestAnimationFrame(qn)};requestAnimationFrame(qn)},Go=(n,e)=>{const t=X("Tea time 2: the tea that wasn't"),r=W(`
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
`),i=tn(),a=en(Je),o=_n(),s=O(Wn(kr,!0),"Teapot movement",!1),c=O(Wn(zr,!0),"Light movement",!1);o.append(s,c),i.append(a,o);const l=tn(),d=en(Je+"-shadow");l.append(d),n.append(t,r,i,l),e.push(zo)},Co=(n,e)=>{Mo(n,e),Go(n,e)},Uo=`struct SceneData {
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
`,Lt="camera-movement",Gr="movement-type-cam-movement",jo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Lt),i=C(Gr),a=await Hn(gn("models/monkey.obj"),1,!1),o=ne(a,{indicesIn3:!0}),{buffer:s}=zn(n,o.indices),{buffer:c,bufferLayout:l}=H(n,o.vertices,"float32x4"),{buffer:d,bufferLayout:h}=H(n,o.normals,"float32x4",1),{msaaTexture:u,multisample:_}=be(n,r,t,4),{depthStencil:p,depthStencilAttachmentFactory:v}=ae(n,r,4),g=an(n,[l,h],t,Uo,"triangle-list",{depthStencil:p,multisample:_}),y=x(0,0,5);let w=x(0,0,5);const m=x(0);let I=x();const T=x(0,1,0);let b=x(0,1,0);const F=Cn(y,m,T),P=ie(30,r.width/r.height,.1,100),M=E(P,F),V=Ln(),B=E(M,V),{bindGroup:A,buffers:[q]}=k(n,g,[new Float32Array([...nn(B),...y,1])],"UNIFORM",0),on=1,cn=.01;let U=i(),Y=0,J=0,z=0,$=0,rn=0,pn=0,yn=Aa();const Q=D=>se(D,0,512,-1,1);let ln=L(),dn=L(),j=0;const N=D=>{j=0,ln=L(D.x,D.y),Vn=0,Y=D.x,J=D.y,U=i()},En=D=>{if((U==="Dollying"||U==="Panning")&&(rn=cn*(D.x-Y),pn=-cn*(D.y-J)),U==="Quaternion rotation"||U==="Euler rotation"){z+=-on*(D.x-Y),$+=-on*(D.y-J);const vn=-Q(Y),Bn=Q(J),_e=-Q(D.x),ee=Q(D.y),Ae=Math.sqrt(vn*vn+Bn*Bn),de=Math.sqrt(_e*_e+ee*ee),Mn=Ue=>Ue>1/Math.sqrt(2)?1/(2*Ue):Math.sqrt(1-Ue*Ue),ki=x(vn,Bn,Mn(Ae)),zi=x(_e,ee,Mn(de)),Gi=Ra(ki,zi);yn=Ye(yn,Gi)}Y=D.x,J=D.y},bn=D=>{if(rn=0,pn=0,U!=="Quaternion rotation"||(dn=L(D.x,D.y),ar(ln,dn)))return;const vn=me(dn,ln);j=Math.min(Gt(vn),20)};let Vn=0;const Tn=()=>{if(U!=="Quaternion rotation"){j=0;return}Y=ln[0],J=ln[1];const D=j*Math.exp(-Vn/150),vn=G(ln,Kn($n(me(dn,ln)),D));j<.2&&(j=0),Vn+=1,En({x:vn[0],y:vn[1]})};st(Lt,{onStart:N,onMove:En,onEnd:bn});const Xn=()=>{const D=E(Re($),Ee(z)),vn=Fe(y,D),Bn=Fe(T,D);return{view:Cn(vn,m,Bn),eye:vn}},An=()=>{const D=Sn(Pe([...b,1],yn)),vn=Sn(Pe([...w,1],yn));return{view:Cn(vn,I,D),eye:vn}},un=()=>(w[2]+=pn,An()),oe=()=>{const D=Kn(Sn(Pe(f(1),yn)),rn),vn=Kn(Sn(Pe(f(0,1),yn)),pn);return I=me(I,G(D,vn)),An()},xe=()=>{const D={"Euler rotation":Xn,"Quaternion rotation":An,Dollying:un,Panning:oe}[i()](),vn=E(P,D.view),Bn=E(vn,V);K(n,q,new Float32Array([...nn(Bn),...D.eye,1]),0)},qn=()=>{j>0&&Tn(),xe();const{pass:D,executePass:vn}=hn(n,e,mn.black,{depthStencilAttachmentFactory:v,msaaTexture:u});D.setPipeline(g),D.setVertexBuffer(0,c),D.setVertexBuffer(1,d),D.setIndexBuffer(s,"uint32"),D.setBindGroup(0,A),D.drawIndexed(o.indices.length),vn(),requestAnimationFrame(qn)};requestAnimationFrame(qn)},No=(n,e)=>{const t=X("Quaternions - engineering space magic"),r=W(`
Quaternions get a bad reputation due their abstract complexity and use of spooky imaginary numbers. But looking past the quaternion mathematical definition, it helps to understand the concept and foremost, the purpose of the enigmatic quaternion.

The quaternion addresses an issue which was mentioned earlier - Gimbal's lock. Using only three degrees of freedom to control rotation results in two axis "overpowering" the third - or in other words, rotations are local and impact each other.
Quaternions allow "absolute" rotation where the reference is world space. 
The fourth degree enables the quaternion to store more information about the rotation which in turn enables the rotation to always be in the correct direction relative to the camera or world space.

In the example below it is easy to obfuscate up one of the axes of rotation (where only two are being manipulated). One half rotation around the y-axis will flip the direction of rotation, while the acting "force" did not change its form. Changing to quaternion rotation solves this issue. the applied rotation is always the same, no matter what the previous rotation was.

The quaternion rotation is implemented with trackball movement which simulates the use of trackball peripheral device. The trackball allows the user to rotate in three directions unlike the mouse which is bound to the two dimensional plane. In the canvas below (when in quaternion rotation mode), the moving along the center axes of the canvas will rotated strictly about the respective axis, whereas movement along the edges of the canvas will generate more complex rotations involving the third rotation axis (depth).

Two more camera movement options are implemented - panning and dollying - which are translational movements along the parallel plane and along the perpendicular plane respectively.
`),i=tn(),a=en(Lt),o=_n(),s=O(Fn(Gr,["Euler rotation","Quaternion rotation","Dollying","Panning"],"Quaternion rotation"),"Movement type",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(jo)},Do=(n,e)=>{No(n,e)},Ho=(n,e)=>({intrinsics:ie(85,1,.001,100),extrinsics:Cr(n,e)}),Cr=(n,e)=>{const t=G(n,e);return Cn(n,t,x(0,1,0))},It=n=>E(n.intrinsics,n.extrinsics),Qt=n=>"instances"in n;var xn=(n=>(n[n.OUT_OF_BOUNDS=-1]="OUT_OF_BOUNDS",n[n.EMPTY=0]="EMPTY",n[n.NORMAL=1]="NORMAL",n[n.PICKUP=2]="PICKUP",n[n.SPAWN=3]="SPAWN",n[n.END=4]="END",n[n.LIGHT=5]="LIGHT",n))(xn||{}),Z=(n=>(n[n.NORTH=1]="NORTH",n[n.EAST=2]="EAST",n[n.SOUTH=4]="SOUTH",n[n.WEST=8]="WEST",n))(Z||{});const qo=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;\r
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
`,$o={[Z.NORTH]:Z.SOUTH,[Z.EAST]:Z.WEST,[Z.SOUTH]:Z.NORTH,[Z.WEST]:Z.EAST},Ur=n=>{const e=[];n&Z.NORTH&&e.push(Z.NORTH),n&Z.EAST&&e.push(Z.EAST),n&Z.SOUTH&&e.push(Z.SOUTH),n&Z.WEST&&e.push(Z.WEST);const t=Math.round(Math.random()*e.length-.5);return e[t]},jr={1:L(0,1),2:L(1,0),4:L(0,-1),8:L(-1,0)},Tt={[Z.NORTH]:f(0,0,1,0),[Z.EAST]:f(1,0,0,0),[Z.SOUTH]:f(0,0,-1,0),[Z.WEST]:f(-1,0,0,0)},Jn=12,te=(n,e,t)=>{n[e[0]][e[1]]=t},Ze=(n,e)=>e[1]>=0&&e[1]<Jn&&e[0]>=0&&e[0]<Jn?n[e[0]][e[1]]:xn.OUT_OF_BOUNDS,Ne=(n,e)=>Ze(n,e)===xn.EMPTY,Yn=(n,e)=>{const t=Ze(n,e);return t===xn.EMPTY||t===xn.OUT_OF_BOUNDS},Wo=(n,e,t)=>{switch(t){case Z.NORTH:return Yn(n,G(e,L(-1,1)))&&Ne(n,G(e,L(0,1)))&&Yn(n,G(e,L(1,1)));case Z.EAST:return Yn(n,G(e,L(1,1)))&&Ne(n,G(e,L(1,0)))&&Yn(n,G(e,L(1,-1)));case Z.SOUTH:return Yn(n,G(e,L(-1,-1)))&&Ne(n,G(e,L(0,-1)))&&Yn(n,G(e,L(1,-1)));case Z.WEST:return Yn(n,G(e,L(-1,1)))&&Ne(n,G(e,L(-1,0)))&&Yn(n,G(e,L(-1,-1)))}return!1},Xo=(n,e)=>{const t=!Yn(n,G(e,L(0,1)))&&!Yn(n,G(e,L(0,-1))),r=!Yn(n,G(e,L(1,0)))&&!Yn(n,G(e,L(-1,0)));return t||r},Yo=()=>Math.random()<.15?xn.LIGHT:xn.NORMAL,Jo=(n,e)=>(te(n,G(e,L(1,0)),xn.NORMAL),te(n,G(e,L(0,0)),xn.SPAWN),te(n,G(e,L(-1,0)),xn.NORMAL),te(n,G(e,L(1,1)),xn.LIGHT),te(n,G(e,L(0,1)),xn.NORMAL),te(n,G(e,L(-1,1)),xn.LIGHT),te(n,G(e,L(1,2)),xn.NORMAL),te(n,G(e,L(0,2)),xn.NORMAL),te(n,G(e,L(-1,2)),xn.NORMAL),G(e,L(0,3))),Zo=()=>{const n=Array.from(Array(Jn).fill(null),()=>Array(Jn).fill(xn.EMPTY)),e=L(Jn/2,Jn/2),t=Jo(n,e);let r=!1;const i=a=>{const o=Xo(n,a),s=Yo();if(s===xn.EMPTY||o)return;te(n,a,s);let c=0;const l=[Z.NORTH,Z.EAST,Z.SOUTH,Z.WEST];l.sort(()=>Math.sign(Math.random()*2-1));for(let d=0;d<4;d++){const h=l[d];if(!Wo(n,a,h)||s===xn.LIGHT&&c>=3)continue;const u=G(a,jr[h]);i(u),++c}c===0&&!r&&(te(n,a,xn.END),r=!0)};return i(t),{map:n,center:e}},Ko=n=>{const e=[],t=[];let r=null;const i=Array.from(Array(Jn).fill(null),()=>Array(Jn).fill(null));for(let a=0;a<n.length;a++)for(let o=0;o<n[a].length;o++){const s=L(o,a),c=Ze(n,s);if(c===xn.EMPTY)continue;let l=0;for(let h=0;h<4;h++){const u=1<<h,_=Ze(n,G(s,jr[u]));_!==xn.OUT_OF_BOUNDS&&_!==xn.EMPTY&&(l+=1<<h)}const d={position:s,cardinality:l,type:c};e.push(d),i[o][a]=d,c===xn.LIGHT&&t.push(d),c===xn.END&&(r=d)}return{tileSet:{allTiles:e,lightTiles:t,endTile:r},tileMap:i}},Qo=()=>{const{map:n,center:e}=Zo(),{tileSet:t,tileMap:r}=Ko(n);return{tileSet:t,tileMap:r,center:e}},ns=n=>L(Math.round(n[0]/Zn+Jn/2),Math.round(n[2]/Zn+Jn/2)),Te=n=>x(Zn*(n[0]-Jn/2),0,Zn*(n[1]-Jn/2)),es=n=>{let e=new Float32Array,t=new Float32Array,r=new Float32Array,i=[];for(const a of n){const o=us(a);e=new Float32Array([...e,...o.vertices]),t=new Float32Array([...t,...o.normals]),r=new Float32Array([...r,...o.uvs]),i=[...i,...o.lights]}return{vertices:e,normals:t,uvs:r,lights:i}},ts=(n,e)=>{const t=ns(e),r=n[t[0]][t[1]];return r===null?(console.error("next does not exist"),null):r},rs=async({device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:r,depthStencilTextureView:i},multisampleData:{msaaTextureView:a,multisample:o}}},s,{shadowMapTexture:c,lightSourcesBuffer:l,activeLightIndicesBuffer:d},{playerPerspectiveBuffer:h,playerPositionBuffer:u})=>{const{texture:_,sampler:p}=await Ve(n,gn("game/dungeon_textures_albedo.png")),{buffer:v,bufferLayout:g}=H(n,s.vertices,"float32x4"),{buffer:y,bufferLayout:w}=H(n,s.normals,"float32x4",1),{buffer:m,bufferLayout:I}=H(n,s.uvs,"float32x2",2),T=an(n,[g,w,I],t,qo,"triangle-list",{primitive:{frontFace:"ccw",cullMode:"front"},depthStencil:r,multisample:o},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),b=n.createBindGroup({layout:T.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:h}},{binding:1,resource:{buffer:u}}]}),F=jn(n,T,_,p,1),S=n.createBindGroup({layout:T.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:l}},{binding:1,resource:c.createView()},{binding:2,resource:{buffer:d}}]});return{pass:M=>{const V={view:a,resolveTarget:e.getCurrentTexture().createView(),loadOp:"clear",clearValue:mn.black,storeOp:"store"},B=M.beginRenderPass({colorAttachments:[V],depthStencilAttachment:{view:i,depthLoadOp:"clear",depthClearValue:1,depthStoreOp:"store"}});B.setPipeline(T),B.setVertexBuffer(0,v),B.setVertexBuffer(1,y),B.setVertexBuffer(2,m),B.setBindGroup(0,b),B.setBindGroup(1,F),B.setBindGroup(2,S),B.draw(s.vertices.length/4),B.end()}}},is=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;\r
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
`,as=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;
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
`,nr=4,At=30,Nr=n=>{const e=Cn(Sn(n.position),Sn(G(n.position,n.direction)),x(0,1,0)),t=ie(170,5,.01,Zn*2);return E(t,e)},os=n=>{n.active=!1,n.intensity=0},ss=n=>{n.active=!0},cs=n=>new Float32Array(n.flatMap(e=>[R([e.position,e.direction]),nn(Nr(e)),[...e.tint,e.intensity]].flat())),ls=({device:n},e,t)=>{let r=t.reduce((T,b)=>T.vertexCount>b.vertexCount?T:b,t[0]);const i=n.createShaderModule({code:as}),a=n.createRenderPipeline({layout:"auto",vertex:{module:i,entryPoint:"main_vs",buffers:[r.vertexBufferLayout]},fragment:{module:i,entryPoint:"main_fs",targets:[{format:"rgba32float"}]},primitive:{frontFace:"ccw",cullMode:"none",topology:"triangle-list"},depthStencil:{depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"}}),o=n.createTexture({size:{width:2048,height:512,depthOrArrayLayers:e.length},format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),s=n.createTexture({size:{width:2048,height:512,depthOrArrayLayers:e.length},dimension:"2d",format:"rgba32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),c=e.map(T=>k(n,a,[new Float32Array(nn(Nr(T)))],"UNIFORM",0).bindGroup),l=t.map(T=>{const b=Qt(T)?new Float32Array(Ie(T.modelMatrices)):new Float32Array(nn(Ln()));return k(n,a,[b],"STORAGE",1).bindGroup}),{bindGroup:d}=k(n,a,[new Float32Array(nn(Ln()))],"UNIFORM",2),{bindGroup:h,buffers:[u]}=k(n,a,[new Float32Array(nn(Ln()))],"UNIFORM",2),_=(T,b)=>{if(b%2===0)return;const F=T/1e3,S=wn([.01*Math.sin(F)*Math.random(),.01*Math.sin(F)*Math.random(),.01*Math.sin(F)*Math.random()]);K(n,u,new Float32Array(nn(S)),0)},p=(T,b,F)=>{I(b),_(b,F);for(let S=0;S<e.length;S++){if(!g.includes(S))continue;const P=T.beginRenderPass({colorAttachments:[{view:s.createView({baseArrayLayer:S,arrayLayerCount:1}),loadOp:"clear",clearValue:mn.black,storeOp:"store"}],depthStencilAttachment:{view:o.createView({baseArrayLayer:S,arrayLayerCount:1}),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:1}});P.setPipeline(a),P.setBindGroup(0,c[S]);for(let M=0;M<t.length;M++){const V=t[M];if(P.setVertexBuffer(0,V.vertexBuffer),P.setBindGroup(1,l[M]),!V.indexBuffer||!V.triangleCount){P.setBindGroup(2,d),P.draw(V.vertexCount);continue}P.setBindGroup(2,h);const B=Qt(V)?V.instances:void 0;P.setIndexBuffer(V.indexBuffer,"uint32"),P.drawIndexed(V.triangleCount*3,B)}P.end()}},v=[];let g=[];const y=n.createBuffer({size:new Uint32Array(nr).byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.length>At&&console.warn("[initialization] number of lights larger than allowed limit");const w=n.createBuffer({size:(On.float32x4*2+On.float32x4x4+On.float32x4)*At,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(w,0,cs(e));const m=T=>{g=Pa(e.map(b=>ir(me(b.position,f(...T,1)))),nr),n.queue.writeBuffer(y,0,new Uint32Array(g));for(const b of g)ss(e[b]);for(let b=0;b<e.length;b++)if(!g.includes(b)){os(e[b]);const F=On.float32x4*2+On.float32x4x4+On.float32x4;K(n,w,new Float32Array([0]),F*b+F-On.float32)}for(const b of v)b(g)},I=T=>{const b=S=>S<6?S+=.1*Math.random():Math.sin(T/1e4)*Math.random()+6,F=On.float32x4*2+On.float32x4x4+On.float32x4;for(const S of g){const P=e[S];P.intensity=b(P.intensity),K(n,w,new Float32Array([P.intensity]),F*S+F-On.float32)}};return{renderable:{pass:p,onTileChange:m},lightData:{lights:e,shadowMapTexture:s,activeLightsChangeListeners:v,lightSourcesBuffer:w,activeLightIndicesBuffer:y}}},hs=n=>{const e=Zn/2-.1,t=Ur(~n.cardinality&15),r=Tt[t],i=Te(n.position),a=G(f(...G(x(0,.4,0),i),1),Kn(r,e));return{direction:Tt[$o[t]],position:a,intensity:0,tint:x(.9,.4,0),active:!1}},fs=({device:n},e)=>{const t=ze(x(),1),r=[L(0,0),L(0,1),L(0,1),L(0,0),L(0,0),L(0,1),L(0,1),L(0,0)],i=e.map(u=>{const _=wn(Sn(G(u.position,G(Kn(u.direction,.1),f(0,-.65,0,0))))),p=E(Ee(90),Oe(30,Sn(u.direction))),v=Dn(.1,.65,.1);return E(E(_,p),v)}),{buffer:a}=zn(n,new Uint32Array(R(t.triangleIndices.map(u=>Sn(u))))),{buffer:o,bufferLayout:s}=H(n,new Float32Array(R(t.vertices)),"float32x4"),{buffer:c,bufferLayout:l}=H(n,new Float32Array(R(t.normals)),"float32x4",1),{buffer:d,bufferLayout:h}=H(n,new Float32Array(R(r)),"float32x2",2);return{vertexBuffer:o,vertexBufferLayout:s,vertexCount:t.vertices.length,normalsBuffer:c,normalsBufferLayout:l,uvsBuffer:d,uvsBufferLayout:h,indexBuffer:a,triangleCount:t.triangleCount,instances:e.length,modelMatrices:i}},ds=({device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:r,depthStencilTextureView:i},multisampleData:{msaaTextureView:a,multisample:o}}},{vertexBuffer:s,vertexBufferLayout:c,normalsBuffer:l,normalsBufferLayout:d,uvsBuffer:h,uvsBufferLayout:u,indexBuffer:_,triangleCount:p,instances:v,modelMatrices:g},{playerPerspectiveBuffer:y},{lightSourcesBuffer:w})=>{const m=an(n,[c,d,u],t,is,"triangle-list",{primitive:{frontFace:"ccw",cullMode:"back"},depthStencil:r,multisample:o}),I=new Float32Array(Ie(g)),T=n.createBuffer({size:On.float32x4x4*At,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(T,0,I);const b=n.createBindGroup({layout:m.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:y}},{binding:1,resource:{buffer:T}},{binding:2,resource:{buffer:w}}]});return{pass:S=>{const P={view:a,resolveTarget:e.getCurrentTexture().createView(),loadOp:"load",clearValue:mn.black,storeOp:"store"},M=S.beginRenderPass({colorAttachments:[P],depthStencilAttachment:{view:i,depthLoadOp:"load",depthClearValue:1,depthStoreOp:"store"}});M.setPipeline(m),M.setIndexBuffer(_,"uint32"),M.setVertexBuffer(0,s),M.setVertexBuffer(1,l),M.setVertexBuffer(2,h),M.setBindGroup(0,b),M.drawIndexed(p*3,v),M.end()}}},Zn=4,us=n=>{const e=Zn/2,t=Te(n.position),r=[f(-e,-e,e,1),f(-e,e,e,1),f(e,e,e,1),f(e,-e,e,1),f(-e,-e,-e,1),f(-e,e,-e,1),f(e,e,-e,1),f(e,-e,-e,1)],i=[f(3,0,4),f(4,7,3),f(6,5,1),f(1,2,6)],a=[...Array(6).fill(f(0,1,0,0)),...Array(6).fill(f(0,-1,0,0))],o=[L(1,0),L(.5,0),L(.5,.5),L(.5,.5),L(1,.5),L(1,0),L(.5,.5),L(0,.5),L(0,0),L(0,0),L(.5,0),L(.5,.5)],s=[L(.5,1),L(.5,.5),L(0,.5),L(0,.5),L(0,1),L(.5,1)];n.cardinality&Z.NORTH||(i.push(f(1,0,3),f(3,2,1)),a.push(...Array(6).fill(f(0,0,-1,0))),o.push(...s)),n.cardinality&Z.EAST||(i.push(f(2,3,7),f(7,6,2)),a.push(...Array(6).fill(f(-1,0,0,0))),o.push(...s)),n.cardinality&Z.SOUTH||(i.push(f(4,5,6),f(6,7,4)),a.push(...Array(6).fill(f(0,0,1,0))),o.push(...s)),n.cardinality&Z.WEST||(i.push(f(5,4,0),f(0,1,5)),a.push(...Array(6).fill(f(1,0,0,0))),o.push(...s));const c=new Float32Array(R(i.reduce((u,_)=>{for(let p=0;p<3;p++)u.push(G(r[_[p]],f(...t,0)));return u},[]))),l=new Float32Array(R(a)),d=new Float32Array(R(o));let h=[];return n.type===xn.LIGHT&&(h=[hs(n)]),{vertices:c,normals:l,uvs:d,lights:h}},vs=(n,e)=>{const r=G(Te(e.position),x(-Zn/2*.96,0,-Zn/2*.96)),i=G(Te(e.position),x(+Zn/2*.96,0,+Zn/2*.96));e.cardinality&Z.WEST&&(r[0]=-1/0),e.cardinality&Z.SOUTH&&(r[2]=-1/0),e.cardinality&Z.EAST&&(i[0]=1/0),e.cardinality&Z.NORTH&&(i[2]=1/0),n[0]=Me(n[0],r[0],i[0]),n[2]=Me(n[2],r[2],i[2])},_s=n=>{const e=ze(x(0,0,0),1),{buffer:t,bufferLayout:r}=H(n,new Float32Array(R(e.vertices)),"float32x4",0),{buffer:i}=zn(n,new Uint32Array(R(e.triangleIndices.map(o=>Sn(o))))),a=o=>{const s=wn(G(o,x(0,-.5,0))),c=Dn(1,2,1),l=E(s,c);K(n,t,new Float32Array(R(e.vertices.map(d=>Fe(d,l)))),0)};return{bufferedMesh:{vertexBuffer:t,vertexBufferLayout:r,indexBuffer:i,vertexCount:e.vertices.length,triangleCount:e.triangleCount},updateMesh:a}},ms=({device:n})=>{const e=x(0,0,0),t=x(0,0,1),r=Ho(e,t),i=n.createBuffer({size:On.float32x4x4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});K(n,i,new Float32Array(nn(It(r))),0);const a=n.createBuffer({size:On.float32x3,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});K(n,a,new Float32Array(x()),0);const{bufferedMesh:o,updateMesh:s}=_s(n);return{camera:r,position:e,lookDirection:t,right:We(x(0,1,0),t),playerMoveListeners:[s],playerViewListeners:[],shadowBufferedMesh:o,playerPerspectiveBuffer:i,playerPositionBuffer:a}},er=({device:n},e,t,r)=>{let i=-t/512,a=r/512;e.lookDirection[1]>.97&&(a=Math.max(0,a)),e.lookDirection[1]<-.97&&(a=Math.min(0,a));const o=Zt(x(0,1,0),i),s=Zt(e.right,a),c=Ye(o,s);e.lookDirection=$n(Sn(Pe(f(...e.lookDirection,1),c))),e.right=$n(We(rr.up,e.lookDirection)),Dr(n,e)},Dr=(n,e)=>{e.camera.extrinsics=Cr(e.position,e.lookDirection);const t=It(e.camera);for(const r of e.playerViewListeners)r(t);K(n,e.playerPerspectiveBuffer,new Float32Array(nn(It(e.camera))),0)},ps=({device:n},e,t,r)=>{const i=je(r.w)-je(r.s),a=je(r.a)-je(r.d),o=r.v;if(!i&&!a)return;const s=bs(e,i,a,o);t.cheats.noClip||vs(s,t.currentTile),e.position=s;for(const c of e.playerMoveListeners)c(e.position);K(n,e.playerPositionBuffer,new Float32Array(e.position),0),Dr(n,e)},gs=.1,bs=(n,e,t,r)=>{let i=x();const a=(r?2:1)*gs;if(e){const o=[...n.lookDirection];o[1]=0;const s=Kn($n(o),a*e);i=G(i,s)}if(t){const o=[...n.right];o[1]=0;const s=Kn($n(o),a*t);i=G(i,s)}return G(n.position,i)},xs=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;\r
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
`,ys=(n,e)=>({direction:e,position:n,intensity:4,tint:x(35/100,50/100,9/100),active:!1}),ws=n=>{const e=f(...Te(n.position),0),t=Ur(n.cardinality),r=Tt[t],i=2,a=Kn(r,Zn/2-.1);let o=[f(-i,i,0,1),f(-i,-i,0,1),f(i,-i,0,1),f(i,i,0,1)];(t===Z.EAST||t===Z.WEST)&&(o=o.map(d=>Fe(d,Ee(90))));const s=new Uint32Array(R([x(0,1,3),x(3,1,2)])),c=new Float32Array(R([L(0,0),L(0,1),L(1,1),L(1,0)])),l=new Float32Array(R([r,r,r,r]));return{vertices:new Float32Array(R(o)),triangles:s,uvs:c,normals:l,lights:[ys(G(e,a),r)],modelMatrix:wn(Sn(G(e,a)))}},Ls=async({device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:r,depthStencilTextureView:i},multisampleData:{msaaTextureView:a,multisample:o}}},s,{playerPerspectiveBuffer:c})=>{const{texture:l,sampler:d}=await Ve(n,gn("game/portal.png")),{buffer:h}=zn(n,s.triangles),{buffer:u,bufferLayout:_}=H(n,s.vertices,"float32x4"),{buffer:p,bufferLayout:v}=H(n,s.normals,"float32x4",1),{buffer:g,bufferLayout:y}=H(n,s.uvs,"float32x2",2),w=an(n,[_,v,y],t,xs,"triangle-list",{primitive:{frontFace:"ccw",cullMode:"none"},depthStencil:r,multisample:o},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),m=new Float32Array(nn(s.modelMatrix)),I=n.createBuffer({size:m.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(I,0,m);const T=new Float32Array([0]),b=n.createBuffer({size:T.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(b,0,T);const F=n.createBindGroup({layout:w.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:c}},{binding:1,resource:{buffer:I}},{binding:2,resource:{buffer:b}}]}),S=jn(n,w,l,d,1);return{pass:(M,V)=>{K(n,b,new Float32Array([V]),0);const B={view:a,resolveTarget:e.getCurrentTexture().createView(),loadOp:"load",storeOp:"store"},A=M.beginRenderPass({colorAttachments:[B],depthStencilAttachment:{view:i,depthLoadOp:"load",depthClearValue:1,depthStoreOp:"store"}});A.setPipeline(w),A.setIndexBuffer(h,"uint32"),A.setVertexBuffer(0,u),A.setVertexBuffer(1,p),A.setVertexBuffer(2,g),A.setBindGroup(0,F),A.setBindGroup(1,S),A.drawIndexed(6),A.end()}}},Is=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn("game"),i=4,{multisample:a,msaaTexture:o}=be(n,r,t,i),s=n.createTexture({size:{width:r.width,height:r.height},format:"depth24plus",sampleCount:i,usage:GPUTextureUsage.RENDER_ATTACHMENT}),c={depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"},l=[],d=(_,p)=>{_=Me(_,-36,36),p=Me(p,-36,36);for(const g of l)g(_,p)};let h=!1;const{keyMap:u}=ji("game",d,{onStart:()=>h=!0,onEnd:()=>h=!1});return{device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:c,depthStencilTextureView:s.createView()},multisampleData:{multisample:a,msaaTextureView:o.createView()}},input:{keyMap:u,mouseMoveListeners:l,inGame:h}}},Ts=(n,e)=>{const t=ts(n.map,e.position);if(t!==n.currentTile&&t!==null){n.currentTile=t;for(const r of n.tileChangeListeners)r(Te(t.position),t.position);t.type===xn.END&&window.alert("you got to the end yay")}},As=async()=>{const n=await Is(),e=ms(n);n.input.mouseMoveListeners.push((m,I)=>er(n,e,m,I));const{tileSet:t,tileMap:r}=Qo(),i=es(t.allTiles),a={map:r,currentTile:null,tileChangeListeners:[],cheats:{noClip:!1}},{buffer:o,bufferLayout:s}=H(n.device,i.vertices,"float32x4",0),c={vertexBuffer:o,vertexBufferLayout:s,vertexCount:i.vertices.length/4},l=ws(t.endTile),d=fs(n,i.lights),{renderable:h,lightData:u}=ls(n,[...i.lights,...l.lights],[c,e.shadowBufferedMesh,d]);a.tileChangeListeners.push(h.onTileChange);const{pass:_}=await rs(n,i,u,e),{pass:p}=await Ls(n,l,e),{pass:v}=ds(n,d,e,u),g=()=>{ps(n,e,a,n.input.keyMap),n.input.keyMap.p&&(a.cheats.noClip=!a.cheats.noClip,n.input.keyMap.p=!1,console.info("[cheats]: no clip toggled to",a.cheats.noClip))};er(n,e,0,0);let y=0;const w=m=>{g(),Ts(a,e);const I=n.device.createCommandEncoder();h.pass(I,m,y),_(I,m,y),p(I,m,y),v(I,m,y),n.device.queue.submit([I.finish()]),y++,requestAnimationFrame(w)};requestAnimationFrame(w)},Ss=(n,e)=>{const t=X("The WebGPU dungeon game"),r=W(`
It's hard to call this a game, there are no challenges or obstacles to overcome - it's more a showcase of a WebGPU-based game engine. 
The point of the "Game" is to traverse the dark dungeon, using the light sources or fog to make your way through the dark halls and finally find the exit portal. The explanations of the games systems are below the game itself.

You initiate the game by clicking on the canvas and can leave whenever by hitting [Esc]. When in the game look around with the mouse, move by using the [WASD] keys and activate sprinting with the [V] key.
`),i=tn(),a=en("game");i.append(a);const o=X("Overview of the game structure"),s=W(`
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
`),c=X("The dungeon system"),l=W(`
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
`),d=X("The player system"),h=W(`
The player is a conceptual (apart from the lighting system) object. It represents the floating camera and handles movement can rotation which is then applied to the camera's extrinsic matrix. 

Movement is handled by moving the player along the directions of the player's local forward and right axes, which are initially set to the origins forwad and right axes. The player's height component (y) is always set to zero.
As the movement always depends on these two axes, it is vital they remain correct - which is the job of the rotation action. Sprinting is also an option, which simply increases the by-frame movement displacement amount.

Rotation applies an incremental quaternion to the player's forwrd (look direction) based on the frame mouse movement (tracked in the Pointer Lock API). 
After the look direction is updated, to maintain smooth movement the right axis is also updated as the normalzied cross product between the canon up direction and the player's new forward direction.

After movement is made, the player model buffer is updated, which exists only to be an actor in shadow map render passes.
`),u=X("The tile system and the torch system"),_=W(`
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
`),p=X("The game state and portal system"),v=W(`
A rather small part of the game, but worth a shoutout. The game state is responsible for checking for game objectives. The game state is interested in the player's current tile.
It will check if the player's map position is equal to that of the END type tile - which when observed will trigger the end "reward".

The portal - which is the in-game representation of the objective - is a graphical object with its own pass. The portal is created as a quad with the portal texture applied to it.
The portal's pipeline is configured to support blending, as only the portal color should be visible to the player and not the transparent background in the texture.
In the portal's shader, the uvs are dependent on a uniform time buffer to rotate the uvs about the texture's center, which creates a twirling effect. 
The portal is also another instance of a light.

The game state also tracks active cheats - such as "no clip" which allows the player to pass through walls (toggle with [P] key).
    `),g=X("The lighting system"),y=W(`
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
    `),w=X("Room for improvement"),m=W(`
    `);n.append(t,r,i,o,s,c,l,d,h,u,_,p,v,g,y,w,m),e.push(As)},Bs=(n,e)=>{if(!Ke.children)throw"Graphics routes do not exist";for(const t of Ke.children.map(r=>r.generator))t(n,e)},Ke={path:"graphics",name:"Graphics",description:"",generator:Bs,children:[{path:"webgpu-basics",name:"Introduction to the basics",description:"A walkthrough the basics of graphics and setting it up in WebGPU.",generator:$a},{path:"drawing",name:"Drawing via interaction",description:"Using the browser interaction features to create a simple drawing application.",generator:Ja},{path:"projection",name:"Projection types",description:"An overview of the types of projections and GPU instancing.",generator:oo},{path:"lighting",name:"Lighting",description:"Showcase of the most common GPU lighting models and runtime mesh creation.",generator:lo},{path:"meshes",name:"Mesh intstantiation",description:"Populating mesh data in the GPU and displaying a model in the frame.",generator:uo},{path:"texturing",name:"Applying textures",description:"Using textures to add colors to a mesh and an overview of the WebGPU process mipmapping.",generator:yo},{path:"env-mapping",name:"Environmental mapping",description:"Using environmental maps to populate color values reflected by mirror surfaces (with or without normal maps).",generator:To},{path:"shadows",name:"Shadows (projection)",description:"Creating shadows in the scene using projective shadowing.",generator:Bo},{path:"shadow-mapping",name:"Shadows (maps)",description:"Creating shadows in the scene using shadow maps.",generator:Co},{path:"camera-movement",name:"Other interaction types",description:"A showcase of other scene interaction methods.",generator:Do},{path:"game",name:"A simple game engine (project)",description:"Using the graphics toolset to create a simple dungeon crawler with focus on lighting, shadow maps and player movement.",generator:Ss}]},Rs=`struct Ray {
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
`,Hr="raycast-anatomy",Ps=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(Hr),r=an(n,[],t,Rs,"triangle-strip"),{pass:i,executePass:a}=hn(n,e,mn.black);i.setPipeline(r),i.draw(4),a()},Os=(n,e)=>{const t=X("The anatomy of rendering"),r=W(`
Before one peers into the world of rendering, ray casting, path tracing and the deep depths of global illumination - one should understand the basic building block of the rendering system - the ray.

The rendering system is built with physical constraints in mind, and so the ray is an imitation of the friendly vessels we observe in the real world - light rays. 
Computationally, generating, storing, amassing and integrating inifinte amounts of light rays and their interactions with materials is not feasible on modern hardware, 
therefore the compromise is to only handle the light and shading directly seen by the viewer (the virtual camera).

And so, the camera ray is born. Shown below is each fragment (pixel) of the the canvas in the color of the direction of its camera ray.
`),i=en(Hr),a=tn();a.append(i),n.append(t,r,a),e.push(Ps)},Fs=`struct ViewboxOptions {
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
`,qr="light",$r="zoom",Wr="light-intensity-slider",Xr="light-position-x-input",Yr="light-position-y-input",Jr="light-position-z-input",Zr="shade-all-visible-objects",Kr="refractive-index-slider",Ms=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await sn(qr),i=C($r),a=C(Wr),o=C(Kr),s=C(Xr),c=C(Yr),l=C(Jr),d=C(Zr,"checked"),h=t.width/t.height,u=an(n,[],r,Fs,"triangle-strip"),{bindGroup:_,buffers:[p]}=k(n,u,[new Float32Array([i(),h])],"UNIFORM"),v=new Float32Array([s(),c(),l(),a(),d()?1:0,o(),0,0]),{bindGroup:g,buffers:[y]}=k(n,u,[v],"UNIFORM",1),w=()=>{K(n,p,new Float32Array([i(),h]),0),K(n,y,new Float32Array([s(),c(),l(),a(),d()?1:0,o(),0,0]),0);const{pass:m,executePass:I}=hn(n,e,mn.black);m.setPipeline(u),m.setBindGroup(0,_),m.setBindGroup(1,g),m.draw(4),I(),requestAnimationFrame(w)};requestAnimationFrame(w)},Es=(n,e)=>{const t=X("Let there be light"),r=W(`
With the ability to query the world with ray casts, the most primitive intersecting shapes can be introduced. These are:

1) The plane - an intersection of a ray (line) and a plane. Nothing too complicated - every line will at some point intersect a given plane, unless they are strictly parallel. The only question is at which distance (ray line parameter) does the intersection occur?

2) The triangle - an extension to the plane intersection with the addition of validating the triangle's Barycentric coordinates remain in the appropriate threshold. 
Mathematically, these coordinates can be larger than one or smaller than 0, but this just means the point is outside of the canonical triangle and somewhere in the triangle's shadow copy on the same plane.

3) The sphere - an interesting case which is more specifically comprised of three cases: no intersection (missing the sphere), one intersection (grazing the sphere's surface) and two intersections (entering and leaving the sphere).
There can also be (as will be vital in constructing refraction events) a ray starting inside the sphere with only one proper intersection in the direction of the ray.
Solving for these intersections is a case of handling quadratic formula roots, in an algorithmically friendly way.

For each point of the intersection with an object's surface, that fragement may be shaded based on the information from the intersection - supplied by the prominent hit info data structure, which is key in passing information from the intersecting phase to the shading phase.
`),i=tn(),a=en(qr,{width:512+128,height:512-64}),o=_n(),s=O(fn($r,1,.1,10,.1),"Zoom (camera constant)"),c=O(fn(Wr,3.14,0,10,.01),"Light intensity"),l=O(fn(Kr,1,-1,10,.1),"Diffuse reflectance"),d=O(fn(Xr,0,-5,5,.1),"Light X position"),h=O(fn(Yr,1,0,5,.1),"Light Y position"),u=O(fn(Jr,0,-5,5,.1),"Light Z position"),_=O(Wn(Zr,!0),"Shading on",!1);o.append(s,c,l,d,h,u,_),i.append(a,o),n.append(t,r,i),e.push(Ms)},Qr=(n,e)=>{Os(n,e),Es(n,e)},Vs=`struct ViewboxOptions {
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
`,Ce="lighting",ni=Ce+"-light-position-x-input",ei=Ce+"-light-position-y-input",ti=Ce+"-light-position-z-input",ks=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await sn(Ce),i=C(ni),a=C(ei),o=C(ti),s=t.width/t.height,c=an(n,[],r,Vs,"triangle-strip"),l=new Float32Array([s]),{bindGroup:d}=k(n,c,[l],"UNIFORM"),h=new Float32Array([i(),a(),o(),0,0,0,0,0,0]),{bindGroup:u,buffers:[_]}=k(n,c,[h],"UNIFORM",1),p=()=>{K(n,_,new Float32Array([i(),a(),o(),0,0,0,0,0,0]),0);const{pass:v,executePass:g}=hn(n,e,mn.black);v.setPipeline(c),v.setBindGroup(0,d),v.setBindGroup(1,u),v.draw(4),g(),requestAnimationFrame(p)};requestAnimationFrame(p)},zs=(n,e)=>{const t=X("Let there be shade"),r=W(`
After implementing lighting, the next step is to introduce shade. An enourmous advantage rendering systems have over the rasterization pipeline is the ease with which simple physical phenomena such as obstruction of a light source can be generated.

As you may have guessed at this point, light obstruction is also a ray, but it is cast from the intersection point in the direction of the light source. 
This is another way of querying the scene for information and as will be shown in the next example, 
starting new rays or continuing rays from defined points depending on the interaction type is the bread and butter of path tracing.
`),i=tn(),a=en(Ce,{width:512+128,height:512-64}),o=_n(),s=O(fn(ni,0,-5,5,.1),"Light X position"),c=O(fn(ei,1,0,5,.1),"Light Y position"),l=O(fn(ti,0,-5,5,.1),"Light Z position");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(ks)},Gs=`struct Environment {
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
`,fe="mirrors",ce={"Base color":0,Lambertian:1,Mirror:2,Refractive:3,Phong:4,Glossy:5},ri=fe+"-sphere-shader",ii=fe+"-triangle-shader",ai=fe+"-plane-shader",oi=fe+"-light-position-x-input",si=fe+"-light-position-y-input",ci=fe+"-light-position-z-input",li=fe+"-animation-slider",Cs=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await sn(fe),i=C(oi),a=C(si),o=C(ci),s=C(ri),c=C(ii),l=C(ai),d=C(li),h=t.width/t.height,u=an(n,[],r,Gs,"triangle-strip"),_=new Float32Array([h,0]),{bindGroup:p,buffers:[v]}=k(n,u,[_],"UNIFORM"),g=new Float32Array([i(),a(),o(),ce[s()],ce[c()],ce[l()],0,0,0]),{bindGroup:y,buffers:[w]}=k(n,u,[g],"UNIFORM",1),m=I=>{K(n,v,new Float32Array([h,I*d()/512]),0),K(n,w,new Float32Array([i(),a(),o(),ce[s()],ce[c()],ce[l()],0,0,0]),0);const{pass:T,executePass:b}=hn(n,e,mn.black);T.setPipeline(u),T.setBindGroup(0,p),T.setBindGroup(1,y),T.draw(4),b(),requestAnimationFrame(m)};requestAnimationFrame(m)},Us=(n,e)=>{const t=X('Putting physics in "physically-based rendering"'),r=W(`
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
`),i=tn(),a=en(fe,{width:512+128,height:512-64}),o=_n(),s=O(Fn(ri,Object.keys(ce),"Refractive"),"Sphere shader type",!1),c=O(Fn(ii,Object.keys(ce),"Lambertian"),"Triangle shader type",!1),l=O(Fn(ai,Object.keys(ce),"Lambertian"),"Plane shader type",!1),d=O(fn(oi,0,-5,5,.1),"Light X position"),h=O(fn(si,1,0,5,.1),"Light Y position"),u=O(fn(ci,0,-5,5,.1),"Light Z position"),_=O(fn(li,0,0,1,.1),"Orbit animation speed");o.append(s,c,l,d,h,u,_),i.append(a,o),n.append(t,r,i),e.push(Cs)},hi=(n,e)=>{zs(n,e),Us(n,e)},js=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,fi="texture",di="texture-repeat-style",Ns=["clamp-to-edge","repeat","mirror-repeat"],Ds=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(fi),r=async i=>{const a=an(n,[],t,js,"triangle-strip"),{textureData:o,height:s,width:c}=await le(gn("textures/grass_minecraft.png")),{texture:l,sampler:d}=Qn(n,o,c,s,{addressModeU:i,addressModeV:i}),h=jn(n,a,l,d),{pass:u,executePass:_}=hn(n,e,mn.black);u.setPipeline(a),u.setBindGroup(0,h),u.draw(4),_()};r(In(di,r))},Hs=(n,e)=>{const t=X("Introducing textures"),r=W(`
Textures are image-based color maps for the surfaces of objects.
`),i=tn(),a=en(fi),o=_n(),s=O(Fn(di,Ns,"repeat"),"Texture edge behavior",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(Ds)},qs=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,ui="texturing",St="grass-texture-scale",qe="subdivision-jitter-slider",Bt="grass-texture-select",vi="texture-repeat-style-on-plane",$s=["clamp-to-edge","repeat","mirror-repeat"],Ws=async()=>{const{device:n,canvas:e,context:t,canvasFormat:r}=await sn(ui),i=C(St),a=C(qe),o=C(Bt),s=an(n,[],r,qs,"triangle-strip");let c,l;const d=async w=>{const m=[le(gn("textures/grass.jpg")),le(gn("textures/grass_minecraft.png"))],I=await Promise.all(m),{texture:T,sampler:b}=Qn(n,I[0].textureData,I[0].width,I[0].height,{addressModeU:w,addressModeV:w}),{texture:F,sampler:S}=Qn(n,I[1].textureData,I[1].width,I[1].height,{addressModeU:w,addressModeV:w});c=jn(n,s,T,b),l=jn(n,s,F,S)};await d("repeat");const{bindGroup:h,buffers:[u]}=k(n,s,[new Float32Array([i(),a()*a()])],"UNIFORM",1),{bindGroup:_,buffers:[p]}=k(n,s,[new Float32Array(200)],"STORAGE",2),v=()=>{K(n,u,new Float32Array([i(),a()*a()]),0);const w={"grass.jpg":c,"grass_minecraft.png":l}[o()],{pass:m,executePass:I}=hn(n,t,mn.black);m.setPipeline(s),m.setBindGroup(0,w),m.setBindGroup(1,h),m.setBindGroup(2,_),m.draw(4),I()},g=w=>{const m=or(e.height,w);K(n,p,new Float32Array(R(m)),0,!0)},y=In(qe,g);g(y),Vt([St,Bt,qe],v),In(vi,async w=>{await d(w),v()}),v()},Xs=(n,e)=>{const t=X("Textures in rendering, jittering to solve aliasing"),r=W(`
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
`),i=tn(),a=en(ui),o=_n(),s=O(fn(St,.2,.1,2,.1),"Texture scale"),c=O(fn(qe,1,1,10,1),"Subdivisions for stratisfied jitter"),l=O(Fn(Bt,["grass.jpg","grass_minecraft.png"],"grass_minecraft.png"),"Grass texture",!1),d=O(Fn(vi,$s,"repeat"),"Texture edge behavior",!1);o.append(l,s,d,c),i.append(a,o),n.append(t,r,i),e.push(Ws)},_i=(n,e)=>{Hs(n,e),Xs(n,e)},Ys=n=>{const e=X("Measuring light"),t=W(`
Radiometry and photometry are two schools of light measurement. While radiometry is more aligned with machine-friendly value, photometry addresses the measurements in a human-friendly (readable) method.
In the end, both are measurements of the same phenomena and there exists a direct conversion between the two sets of units.

Below are seven examples of light measurement exercises which make use of the equations. 
They are meant to provide a more practical look into the behaviour of light and how that could apply to the art of rendering.
A key take-away is about the radial flux of light - how light radiates spherically outwards (from isotropic and/or homogeneous light sources) and a object surface a certain distance away will receive a slice of that enlarging sphere.

Mathematically this would require integrals (as in the examples below) to calculate the amount of light, but as weill be later shown, this can be approximated with Monte Carlo integration in progressive rendering.
`),r=document.createElement("iframe");r.width="100%",r.height="1000px",r.src=gn("resources/worksheet.pdf"),n.append(e,t,r)},Js=(n,e)=>{Ys(n)},Zs=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,mi="default-scene-as-meshes",Ks=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(mi),r=an(n,[],t,Zs,"triangle-strip"),i=qi([x(-.2,.1,.9),x(.2,.1,.9),x(-.2,.1,-.1)]),{bindGroup:a}=k(n,r,[new Float32Array(R(i.vertices)),new Uint32Array(R(i.triangleIndices))],"STORAGE",1),o=await le(gn("textures/grass_minecraft.png")),{texture:s,sampler:c}=Qn(n,o.textureData,o.width,o.height,{addressModeU:"repeat",addressModeV:"repeat"}),l=jn(n,r,s,c);(()=>{const{pass:h,executePass:u}=hn(n,e,mn.black);h.setPipeline(r),h.setBindGroup(0,l),h.setBindGroup(1,a),h.draw(4),u()})()},Qs=(n,e)=>{const t=X("Replacing the triangle with a triangle"),r=W(`
As a first step towards the introduction of triangle-based mesh model data to the rendering system, we will first replace the triangle... with a triangle.
Up to this point, all the shapes were conceptual - living only in the mind of the GPU, defined as mathematical parameterizations of objects.

But interesting meshes are more commonly not mathematical monstrosities, but artistic sculptures carved in polygons. These have to be passed to the GPU from the CPU.
The triangle in the scene below is defined as a vertex buffer, but passed to the GPU as a uniform/storage buffer. The shader loops over each of these triangles when intersecting a ray.

Inefficient? Absolutely, but that is a worry for a later chapter.
`),i=tn(),a=en(mi);i.append(a),n.append(t,r,i),e.push(Ks)},nc=`@group(0) @binding(0) var<storage> ut_vertices : array<vec3f>;
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
`,pi="utah-teapot",ec=["Flat","Vertex normals"],gi="shading-select-ut",tc=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(pi),r=an(n,[],t,nc,"triangle-strip"),i=await Hn(gn("models/teapot.obj")),a=sr(i,{}),{bindGroup:o}=k(n,r,[new Float32Array(R(a.vertices)),new Uint32Array(R(a.triangleIndices)),new Float32Array(R(a.normals))],"STORAGE",0),{bindGroup:s,buffers:[c]}=k(n,r,[new Uint32Array([a.triangleCount,0])],"UNIFORM",1),l=h=>{const u={Flat:0,"Vertex normals":1};kn(n,c,new Uint32Array([u[h]]),4);const{pass:_,executePass:p}=hn(n,e,Be(.8,.4,.4,1));_.setPipeline(r),_.setBindGroup(0,o),_.setBindGroup(1,s),_.draw(4),p()},d=In(gi,l);l(d)},rc=(n,e)=>{const t=X("Introducing the Utah Teapot"),r=W(`
As the first rendered mesh we shall have no other than the computer graphics mascot itself - the Utah Teapot. Despite not even being a large mesh (by today's standards), the teapot already takes a moment to load into the GPU and for all the triangles to be tested for in the intersection phase of the rendering pipeline.

The teapot can be rendered in flat shading or vertex shading mode. A differentiation should be made at this point, as there are actually two types of surface normals to pick form. These are

1) Render triangle normals - the triangle face normal as calculated during ray-triangle intersection. Thes could be seen as the "mathematically true" normals of the shape.

2) Vertex normals - the normals as vertex attributes, provided together with the vertex buffer. These are the "artistically true" normals of the shape, as decided by the author of the shape.
Usually these smoothed normals are algorithmically adjusted in 3D modelling software to avoid sharp edges. 
To maintain the smooth surface when rendering the shape, the vertex normals are interpolated using the Barycentric coordainates of the points as interpolation factors.
`),i=tn(),a=en(pi,{width:840,height:450}),o=_n(),s=O(Fn(gi,ec,"Flat"),"Shading type",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(tc)},ic=`@group(0) @binding(0) var<storage> cb_vertices : array<vec3f>;
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
`,bi="cornell-box",ac=["Flat","Lambertian"],xi="shading-select-cb",oc=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(bi),r=an(n,[],t,ic,"triangle-strip"),i=await Hn(gn("models/CornellBoxWithBlocks.obj")),a=sr(i,{}),o=new Float32Array(i.mtls[0].materials.reduce((p,v)=>[...p,...R([v.color,v.specular,v.emission,f(v.illum,v.shininess,v.ior)])],[])),s=a.materialIndices.reduce((p,v,g)=>(i.mtls[0].materials[v].illum>=1&&p.push(g),p),[]),{bindGroup:c}=k(n,r,[new Float32Array(R(a.vertices)),new Uint32Array(R(a.triangleIndices)),new Uint32Array(a.materialIndices),new Uint32Array(s)],"STORAGE",0),{bindGroup:l,buffers:[d]}=k(n,r,[new Uint32Array([a.triangleCount,s.length,0])],"UNIFORM",1),{bindGroup:h}=k(n,r,[o],"STORAGE",2),u=p=>{const v={Flat:0,Lambertian:1}[p];kn(n,d,new Uint32Array([v]),2*4);const{pass:g,executePass:y}=hn(n,e,mn.black);g.setPipeline(r),g.setBindGroup(0,c),g.setBindGroup(1,l),g.setBindGroup(2,h),g.draw(4),y()},_=In(xi,u);u(_)},sc=(n,e)=>{const t=X("Thinking inside the Cornell box"),r=W(`
Introducing another championing mascot of the computer graphics universe - the Cornell box - which we will be working with closely from now on.

Another important set of data to pass to the GPU is information about the types of materials which exist in the scene. 
3D objects in data form will usually contain or reference information about their surfaces. 
This material data format can contain all sorts of variables such as the diffuse reflectance, specular reflectance, roughness and emissive color - such as the light in the box, which emits a strong white.
`),i=tn(),a=en(bi),o=_n(),s=O(Fn(xi,ac,"Lambertian"),"Shading type",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(oc)},yi=(n,e)=>{Qs(n,e),rc(n,e),sc(n,e)},cc=`@group(0) @binding(0) var<storage> vertices : array<vec3f>;
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
`,wi="bsp",lc=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(wi),r=an(n,[],t,cc,"triangle-strip"),i=ne(await Hn(gn("models/bunny.obj"),1)),a=ve(i),{bindGroup:o}=k(n,r,[a.vertices,a.normals,a.indices],"STORAGE"),{bindGroup:s}=k(n,r,[a.bspPlanes,a.bspTree,a.treeIds],"STORAGE",1),{bindGroup:c,buffers:[l]}=k(n,r,[a.aabb,new Float32Array([950.5])],"UNIFORM",2),d=()=>{const{pass:h,executePass:u}=hn(n,e,mn.black);h.setPipeline(r),h.setBindGroup(0,o),h.setBindGroup(1,s),h.setBindGroup(2,c),h.draw(4),u(),requestAnimationFrame(d)};requestAnimationFrame(d)},hc=(n,e)=>{const t=X("Barking up the correct tree"),r=W(`
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
`),i=tn(),a=en(wi),o=_n();i.append(a,o),n.append(t,r,i),e.push(lc)},fc=`struct VertexNormal {
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
`,Li="cornell-interleave",dc=async()=>{const{device:n,context:e,canvasFormat:t}=await sn(Li),r=an(n,[],t,fc,"triangle-strip"),i=ne(await Hn(gn("models/CornellBoxWithBlocks.obj"))),a=ve(i),o=pe([a.vertices,a.normals]),s=new Uint32Array(a.indices);ge(s,i.matIndices,4);const c=new Uint32Array(i.lightIndices),l=new Float32Array(i.materials.reduce((v,g)=>[...v,...R([g.color,g.specular,g.emission,f(g.illum,g.shininess,g.ior)])],[])),{bindGroup:d}=k(n,r,[o,s,c],"STORAGE"),{bindGroup:h}=k(n,r,[a.bspPlanes,a.bspTree,a.treeIds],"STORAGE",1),{bindGroup:u}=k(n,r,[a.aabb,new Uint32Array([c.length])],"UNIFORM",2),{bindGroup:_}=k(n,r,[l],"STORAGE",3);(()=>{const{pass:v,executePass:g}=hn(n,e,mn.black);v.setPipeline(r),v.setBindGroup(0,d),v.setBindGroup(1,h),v.setBindGroup(2,u),v.setBindGroup(3,_),v.draw(4),g()})()},uc=(n,e)=>{const t=X("Back to the box"),r=W(`
The binary space partitioning tree algorithm can be applied to practically any model, but there is a consideration which arises when using WebGPU - the limitation on the number of storage buffers.
The BSP requires three arrays alone - one for the bounding box planes, one for the tree nodes and another for a mapping to the model triangles.

A solution to the claustrophobic space limitations on storage buffers may be alleviated with the help of interleaving (or interweaving if you prefer). 
The process is to mix (deterministically) two or more arrays into a single longer one, thereby sneaking it into the shader programs past the strict WebGPU bus customs.
A basic approach is to take two arrays of the same length and place their elements in alternating sequence. 
Luckily this doesn't require any complicated index manipulation, because the shader may be told to expect an array of data structure (structs) with two elements.
But, with the use of uniform buffers to carry meta data, any number of arrays of different lengths may be in fact weaved together or even glued in sequential order. The only constraint then is the data type (eg. floats float with floats, integers integrate with integers).

The example below not only recreates the Cornell box with the BSP tree, but also handles the weaving of the vertex and normal buffers as well as triangle indices and material indices together. This scene also includes an area light source model, but more about that in the next part.
`),i=tn(),a=en(Li),o=_n();i.append(a,o),n.append(t,r,i),e.push(dc)},vc=`struct VertexNormal {
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
`,Ii="cornell-glass",Ti="jittering-active-bsp-cb",_c=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Ii),i=an(n,[],t,vc,"triangle-strip"),a=ne(await Hn(gn("models/CornellBox.obj"))),o=ve(a),s=pe([o.vertices,o.normals]),c=new Uint32Array(o.indices);ge(c,a.matIndices,4);const l=new Uint32Array(a.lightIndices),d=new Float32Array(a.materials.reduce((T,b)=>[...T,...R([b.color,b.specular,b.emission,f(b.illum,b.shininess,b.ior)])],[])),{bindGroup:h}=k(n,i,[s,c,l],"STORAGE"),{bindGroup:u}=k(n,i,[o.bspPlanes,o.bspTree,o.treeIds],"STORAGE",1),{bindGroup:_,buffers:[p,v,g]}=k(n,i,[o.aabb,new Uint32Array([l.length]),new Uint32Array([36])],"UNIFORM",2),y=or(r.height,6),{bindGroup:w}=k(n,i,[d,new Float32Array(R(y))],"STORAGE",3);In(Ti,T=>{const b=T?36:1;kn(n,g,new Uint32Array([b]),0),I()},"checked");const I=()=>{const{pass:T,executePass:b}=hn(n,e,mn.black);T.setPipeline(i),T.setBindGroup(0,h),T.setBindGroup(1,u),T.setBindGroup(2,_),T.setBindGroup(3,w),T.draw(4),b()};I()},mc=(n,e)=>{const t=X("Light as an area"),r=W(`
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
`),i=tn(),a=en(Ii),o=_n(),s=O(Wn(Ti,!0),"Jittering enabled",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(_c)},pc=(n,e)=>{hc(n,e),uc(n,e),mc(n,e)},gc=`struct VertexNormal {
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
`,bc=`struct VertexNormal {
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
`,xc=`struct VertexNormal {
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
`,Ai="cornell-progressive",Rt="progressive-enabled-cb",Si="select-shader-cb-progressive",yc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Ai),i=C(Rt,"checked"),a=ne(await Hn(gn("models/CornellBoxWithBlocks.obj"))),o=ve(a),s=pe([o.vertices,o.normals]),c=new Uint32Array(o.indices);ge(c,a.matIndices,4);const l=new Uint32Array(a.lightIndices),d=new Float32Array(a.materials.reduce((p,v)=>[...p,...R([v.color,v.specular,v.emission,f(v.illum,v.shininess,v.ior)])],[])),h={"Simple progressive":gc,"Simple progressive with soft shadows":bc,"Complex progressive":xc},u={f:()=>{}},_=p=>{const{renderSrc:v,renderDst:g,blitPingPong:y}=Ge(n,r),w=n.createShaderModule({code:h[p]}),m=n.createRenderPipeline({layout:"auto",vertex:{module:w,entryPoint:"main_vs"},fragment:{module:w,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:I}=k(n,m,[s,c,l,d],"STORAGE"),{bindGroup:T}=k(n,m,[o.bspPlanes,o.bspTree,o.treeIds],"STORAGE",1),{bindGroup:b,buffers:[F,S,P]}=k(n,m,[o.aabb,new Uint32Array([l.length]),new Uint32Array([0,r.width,r.height])],"UNIFORM",2),M=n.createBindGroup({layout:m.getBindGroupLayout(3),entries:[{binding:0,resource:g.createView()}]});let V=0;const B=()=>{if(!i())return;V+=1,kn(n,P,new Uint32Array([V]),0);const{pass:A,encoder:q}=hn(n,e,mn.black,{otherColorAttachments:[{view:v.createView(),loadOp:"load",storeOp:"store"}]});A.setPipeline(m),A.setBindGroup(0,I),A.setBindGroup(1,T),A.setBindGroup(2,b),A.setBindGroup(3,M),A.draw(4),A.end(),y(q),n.queue.submit([q.finish()]),requestAnimationFrame(B)};u.f=()=>requestAnimationFrame(B),requestAnimationFrame(B)};_(In(Si,_)),In(Rt,()=>u.f(),"checked")},wc=(n,e)=>{const t=X("Progressive rendering - the rendering ritual"),r=W(`
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
`),i=tn(),a=en(Ai),o=_n(),s=O(Wn(Rt,!0),"Progressive rendering enabled",!1),c=O(Fn(Si,["Simple progressive","Simple progressive with soft shadows","Complex progressive"],"Complex progressive"),"Progressive shader type",!1);o.append(s,c),i.append(a,o),n.append(t,r,i),e.push(yc)},Bi=(n,e)=>{wc(n,e)},Lc=`struct VertexNormal {
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
`,Nt="brdfs",Pt="progressive-enabled-cb-"+Nt,Ri="brdf-color-picker",Ic=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Nt),i=C(Pt,"checked"),a=C(Ri),o=ne(await Hn(gn("models/CornellBox.obj"))),s=ve(o),c=pe([s.vertices,s.normals]),l=new Uint32Array(s.indices);ge(l,o.matIndices,4);const d=new Uint32Array(o.lightIndices),h=new Float32Array(o.materials.reduce((B,A)=>[...B,...R([A.color,A.specular,A.emission,f(A.illum,A.shininess,A.ior)])],[]));let{renderSrc:u,renderDst:_,blitPingPong:p}=Ge(n,r);const v=n.createShaderModule({code:Lc}),g=n.createRenderPipeline({layout:"auto",vertex:{module:v,entryPoint:"main_vs"},fragment:{module:v,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:y}=k(n,g,[c,l,d,h],"STORAGE"),{bindGroup:w}=k(n,g,[s.bspPlanes,s.bspTree,s.treeIds],"STORAGE",1),{bindGroup:m,buffers:[I,T,b,F]}=k(n,g,[s.aabb,new Uint32Array([d.length]),new Uint32Array([0,r.width,r.height]),new Float32Array(Xe(ue(a())))],"UNIFORM",2),S=n.createBindGroup({layout:g.getBindGroupLayout(3),entries:[{binding:0,resource:_.createView()}]});let P=0;const M=()=>{if(!i())return;V===!0&&(V=!1,P=0),P+=1,kn(n,b,new Uint32Array([P]),0),K(n,F,new Float32Array(Xe(ue(a()))),0);const{pass:B,encoder:A}=hn(n,e,mn.black,{otherColorAttachments:[{view:u.createView(),loadOp:"load",storeOp:"store"}]});B.setPipeline(g),B.setBindGroup(0,y),B.setBindGroup(1,w),B.setBindGroup(2,m),B.setBindGroup(3,S),B.draw(4),B.end(),p(A),n.queue.submit([A.finish()]),requestAnimationFrame(M)};In(Pt,B=>{B&&requestAnimationFrame(M)},"checked");let V=!1;nt("restart-progressive-brdf",()=>V=!0),M()},Tc=(n,e)=>{const t=X("Illuminating the situation"),r=W(`
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
`),i=tn(),a=en(Nt),o=_n(),s=O(Wn(Pt,!0),"Progressive rendering enabled",!1),c=O($e(Ri,"#1a3205"),"Sphere extinction coefficient"),l=Qe("restart-progressive-brdf","Restart progressive");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(Ic)},Pi=(n,e)=>{Tc(n,e)},Ac=`struct VertexNormal {
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
`,Dt="environmental",Ot="progressive-enabled-cb-"+Dt,Sc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Dt),i=C(Ot,"checked"),a=C("environmental-texture-type"),{texture:o,sampler:s}=await Ve(n,gn("textures/luxo_pxr_campus.jpg")),{texture:c,sampler:l}=await Ve(n,gn("textures/luxo_pxr_campus.hdr.png")),d=ne(await Hn(gn("models/teapot.obj"),1)),h=ve(d),u=pe([h.vertices,h.normals]),_=new Uint32Array(h.indices);ge(_,d.matIndices,4);const p=new Float32Array(d.materials.reduce((z,$)=>[...z,...R([$.color,$.specular,$.emission,f($.illum,$.shininess,$.ior)])],[]));let{renderSrc:v,renderDst:g,blitPingPong:y}=Ge(n,r);const w=n.createShaderModule({code:Ac}),m=n.createRenderPipeline({layout:"auto",vertex:{module:w,entryPoint:"main_vs"},fragment:{module:w,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:I}=k(n,m,[u,_,p],"STORAGE"),{bindGroup:T}=k(n,m,[h.bspPlanes,h.bspTree,h.treeIds],"STORAGE",1),{bindGroup:b,buffers:[F,S,P,M,V]}=k(n,m,[h.aabb,new Uint32Array([0,r.width,r.height]),new Uint32Array([3,0,0,0]),new Float32Array([1,0,0,0]),new Uint32Array([0,0,0,0])],"UNIFORM",2),B=n.createBindGroup({layout:m.getBindGroupLayout(3),entries:[{binding:0,resource:g.createView()},{binding:1,resource:l},{binding:2,resource:c.createView()}]}),A=n.createBindGroup({layout:m.getBindGroupLayout(3),entries:[{binding:0,resource:g.createView()},{binding:1,resource:s},{binding:2,resource:o.createView()}]});let q=0;const on=()=>{if(!i())return;J===!0&&(J=!1,q=0),q+=1,kn(n,S,new Uint32Array([q]),0);const{pass:z,encoder:$}=hn(n,e,mn.black,{otherColorAttachments:[{view:v.createView(),loadOp:"load",storeOp:"store"}]});z.setPipeline(m),z.setBindGroup(0,I),z.setBindGroup(1,T),z.setBindGroup(2,b),z.setBindGroup(3,a()==="High dynamic range"?B:A),z.draw(4),z.end(),y($),n.queue.submit([$.finish()]),requestAnimationFrame(on)};In(Ot,z=>{z&&requestAnimationFrame(on)},"checked");const cn=z=>{const $={"Base color":3,Lambertian:0,Mirror:1}[z];kn(n,P,new Uint32Array([$]),0)};cn(In("model-shader-select-env",cn));const U=z=>{K(n,M,new Float32Array([z?1:0,0,0,0]),0)};U(In("include-sunlight",U,"checked"));const Y=z=>{const $=z==="High dynamic range"?1:0;kn(n,V,new Uint32Array([$]),0)};Y(In("environmental-texture-type",Y));let J=!1;nt("restart-progressive-env",()=>J=!0),on()},Bc=(n,e)=>{const t=X("Leaking into reality"),r=W(`
A strong suit of rendering is the ability to place artifical objects into real scenes and for them to imitate the scene's lighting and environment. 
Environment maps are used to create a skybox, but in a global illumination configuration they can also be used to query the environment for lighting.

Shadows are more tricky, as they no longer have a shadow catching object. 
The skybox is just fills out the empty void beneath the model as a background color would.
To solve this "hold out" geometry is introduced. These are transparent objects which imitate objects visible in the scene (such as a plane for the ground).
They are transparent as far as they are not shaded, where they otherwise apply a semi-transparent filter over whatever it is they are imitating.
Planes are the most simply to create, but hold out geometry could be used for any shape.

HDR images work well as environmental textures as they carry a lot of information about the scene light sources. 
When using a low dynamic range map, a light source has to be modelled with the traditional setup (directional light).
`),i=tn(),a=en(Dt),o=_n(),s=O(Wn(Ot,!0),"Progressive rendering enabled",!1),c=O(Fn("model-shader-select-env",["Base color","Lambertian","Mirror"],"Lambertian"),"Model shader type",!1),l=O(Wn("include-sunlight",!0),"Sun light on",!1),d=O(Fn("environmental-texture-type",["Low dynamic range","High dynamic range"],"Low dynamic range"),"Environmental texture type",!1),h=Qe("restart-progressive-env","Restart progressive");o.append(s,c,l,d,h),i.append(a,o),n.append(t,r,i),e.push(Sc)},Rc=`struct VertexNormal {
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
`,Ht="light-probes",Ft="progressive-enabled-cb-"+Ht,Pc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(Ht),i=C(Ft,"checked"),{texture:a,sampler:o}=await Ve(n,gn("textures/burnt_warehouse.hdr.png")),s=ne(await Hn(gn("models/teapot.obj"),1)),c=ve(s),l=pe([c.vertices,c.normals]),d=new Uint32Array(c.indices);ge(d,s.matIndices,4);const h=new Float32Array(s.materials.reduce((B,A)=>[...B,...R([A.color,A.specular,A.emission,f(A.illum,A.shininess,A.ior)])],[]));let{renderSrc:u,renderDst:_,blitPingPong:p}=Ge(n,r);const v=n.createShaderModule({code:Rc}),g=n.createRenderPipeline({layout:"auto",vertex:{module:v,entryPoint:"main_vs"},fragment:{module:v,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:y}=k(n,g,[l,d,h],"STORAGE"),{bindGroup:w}=k(n,g,[c.bspPlanes,c.bspTree,c.treeIds],"STORAGE",1),{bindGroup:m,buffers:[I,T,b]}=k(n,g,[c.aabb,new Uint32Array([0,r.width,r.height]),new Uint32Array([3,0,0,0])],"UNIFORM",2),F=n.createBindGroup({layout:g.getBindGroupLayout(3),entries:[{binding:0,resource:_.createView()},{binding:1,resource:o},{binding:2,resource:a.createView()}]});let S=0;const P=()=>{if(!i())return;V===!0&&(V=!1,S=0),S+=1,kn(n,T,new Uint32Array([S]),0);const{pass:B,encoder:A}=hn(n,e,mn.black,{otherColorAttachments:[{view:u.createView(),loadOp:"load",storeOp:"store"}]});B.setPipeline(g),B.setBindGroup(0,y),B.setBindGroup(1,w),B.setBindGroup(2,m),B.setBindGroup(3,F),B.draw(4),B.end(),p(A),n.queue.submit([A.finish()]),requestAnimationFrame(P)};In(Ft,B=>{B&&requestAnimationFrame(P)},"checked");const M=B=>{const A={"Base color":3,Lambertian:0,Mirror:1}[B];kn(n,b,new Uint32Array([A]),0)};M(In("model-shader-select-env",M));let V=!1;nt("restart-progressive-env",()=>V=!0),P()},Oc=(n,e)=>{const t=X("Custom light probes"),r=W(`
With the setup ready, the reapot can be placed into any environment and reflect its lighting quite well.
An HDR probe representing a burnt warehouse was selected (https://polyhaven.com/a/burnt_warehouse).

This is a dark environment with a single doorway through which sunlight comes through. The teapot is shaded from the top and front,
but elements facing the doorway are slightly lit with the bottom also lit by the reflections of light from the warehouse floor which is lit by the doorway sun rays.
`),i=tn(),a=en(Ht,{width:1028}),o=_n(),s=O(Wn(Ft,!0),"Progressive rendering enabled",!1),c=O(Fn("model-shader-select-env",["Base color","Lambertian","Mirror"],"Lambertian"),"Model shader type",!1),l=Qe("restart-progressive-env","Restart progressive");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(Pc)},Oi=(n,e)=>{Bc(n,e),Oc(n,e)},Fc=`struct VertexNormal {
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
`,Mc=`@group(0) @binding(0) var<storage, read_write> debug_canvas : array<vec4f>;
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
`,ye="drawing-to-debug-canvas",Mt="progressive-enabled",Ec=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await sn(ye),i=C(Mt,"checked"),a=ct("pixel-value-debug"),o=ct("pixel-count-debug"),s=ne(await Hn("models/CornellBoxWithBlocks.obj")),c=ve(s),l=pe([c.vertices,c.normals]),d=new Uint32Array(c.indices);ge(d,s.matIndices,4);const h=new Uint32Array(s.lightIndices),u=new Float32Array(s.materials.reduce((j,N)=>[...j,...R([N.color,N.specular,N.emission,f(N.illum,N.shininess,N.ior)])],[])),{renderSrc:_,renderDst:p,blitPingPong:v}=Ge(n,r),g=n.createShaderModule({code:Fc}),y=n.createRenderPipeline({layout:"auto",vertex:{module:g,entryPoint:"main_vs"},fragment:{module:g,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),w=document.getElementById(ye+"-debug"),m=w.getContext("gpupresent")||w.getContext("webgpu");m.configure({device:n,format:t,alphaMode:"premultiplied"});const I=n.createShaderModule({code:Mc}),T=n.createRenderPipeline({layout:"auto",vertex:{module:I,entryPoint:"main_vs",buffers:[]},fragment:{module:I,entryPoint:"main_fs",targets:[{format:t}]},primitive:{topology:"triangle-strip"}}),{bindGroup:b}=k(n,y,[l,d,h,u,c.bspPlanes,c.bspTree,c.treeIds],"STORAGE"),F=n.createBindGroup({layout:y.getBindGroupLayout(1),entries:[{binding:0,resource:p.createView()}]}),{bindGroup:S,buffers:[P,M,V]}=k(n,y,[c.aabb,new Uint32Array([h.length]),new Uint32Array([0,r.width,r.height])],"UNIFORM",2),B=n.createBuffer({size:On.float32x4*r.height*r.width,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC}),A=n.createBuffer({size:On.float32x4,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),q=async()=>{await A.mapAsync(GPUMapMode.READ);const j=new Float32Array(A.getMappedRange());a([...j].map(N=>N.toFixed(2)).join(", ")),A.unmap()},on=n.createBindGroup({layout:y.getBindGroupLayout(3),entries:[{binding:0,resource:{buffer:B}}]}),cn=n.createBuffer({size:On.float32x2,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});let U=16;const Y=n.createBuffer({size:new Uint32Array(1).byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});kn(n,Y,new Uint32Array([U]),0);const J=n.createBindGroup({layout:T.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:B}},{binding:1,resource:{buffer:cn}},{binding:2,resource:{buffer:Y}}]}),z=j=>{const N=j.beginRenderPass({colorAttachments:[{view:m.getCurrentTexture().createView(),loadOp:"clear",clearValue:mn.transparent,storeOp:"store"}]});N.setPipeline(T),N.setBindGroup(0,J),N.draw(4),N.end()};let $=0;const rn=()=>{if(!i())return;$+=1,kn(n,V,new Uint32Array([$]),0);const j=n.createCommandEncoder(),N=j.beginRenderPass({colorAttachments:[{view:e.getCurrentTexture().createView(),loadOp:"clear",clearValue:mn.black,storeOp:"store"},{view:_.createView(),loadOp:"load",storeOp:"store"}]});N.setPipeline(y),N.setBindGroup(0,b),N.setBindGroup(1,F),N.setBindGroup(2,S),N.setBindGroup(3,on),N.draw(4),N.end(),z(j),v(j),n.queue.submit([j.finish()]),requestAnimationFrame(rn)};requestAnimationFrame(rn),In(Mt,()=>requestAnimationFrame(rn),"checked");let pn={x:0,y:0};const yn=j=>{const N=j.x,En=r.height-j.y;pn.x=Math.floor(N),pn.y=Math.floor(En),kn(n,cn,new Uint32Array([N,En]),0);const bn=n.createCommandEncoder();z(bn),n.queue.submit([bn.finish()])};st(ye,{onMove:yn,onStart:yn},{});let Q=!1,ln=0;const dn=j=>{const N=n.createCommandEncoder();if(!Q){const bn=Math.floor(j.x/512*U)+pn.x-U/2,Tn=(Math.floor((1-j.y/512)*U)+pn.y-U/2)*512+bn;N.copyBufferToBuffer(B,On.float32x4*Tn,A,0,On.float32x4),n.queue.submit([N.finish()]),q();return}const En=2*Math.round((j.y-ln)/2);U=Me(U+En,2,512),kn(n,Y,new Uint32Array([U]),0),o(U.toString()),z(N),n.queue.submit([N.finish()]),ln=j.y};st(ye+"-debug",{onMove:dn,onStart:j=>{ln=j.y,Q=!0},onEnd:()=>Q=!1},{alwaysMouseMove:!0})},Vc=(n,e)=>{const t=X("Progressive rendering, the basics"),r=W("No description yet"),i=en(ye),a=O(Wn(Mt,!1),"Progressive rendering enabled",!1),o=_n();o.append(a);const s=tn();s.append(i,o);const c=en(ye+"-debug"),l=tn(),d=O(ot("pixel-count-debug"),"Debug canvas dimension"),h=O(ot("pixel-value-debug"),"Pixel value"),u=_n();u.append(d,h),l.append(c,u),n.append(t,r,s,l),e.push(Ec)},kc=(n,e)=>{Vc(n,e)},zc=(n,e)=>{Qr(n,e),hi(n,e),_i(n,e),yi(n,e),Bi(n,e),Pi(n,e),Oi(n,e)},Fi={path:"rendering",generator:zc,name:"Rendering",description:"",children:[{path:"raycasting-introduction",name:"Introduction to raycasting",description:"A conscise look into the anatomy of a raycasting system.",generator:Qr},{path:"lighting-models",name:"Lighting models",description:"An overview of the basic lighting models implemented in rendering.",generator:hi},{path:"texture-mapping",name:"Adding textures",description:"The process of applying textures to conceptual objects in a rendered scene.",generator:_i},{path:"measuring-light",name:"Radiometry and photometry",description:"Understanding the process of measuring light through examples of photometric and radiometric equations.",generator:Js},{path:"meshes",name:"Mesh instantiation",description:"The simplest appraoch of writing mesh data into buffers to loop over in the render process.",generator:yi},{path:"partitioning",name:"Partitioning mesh data",description:"Using the binary space partitioning tree (BSP) to manage large meshes.",generator:pc},{path:"progressive",name:"Progressive rendering",description:"Harnessing the power of progressive rendering to generate smooth render images.",generator:Bi},{path:"brdf",name:"Global illumination",description:"Introducing sampling ray paths to the light models in progressive rendering.",generator:Pi},{path:"environmental",name:"Environemntal mapping",description:"Reading light and color data from an environment map, placing rendered objects in a real life scene.",generator:Oi},{path:"10-production-rendering",name:"Production rendering",description:"A short discussion of production rendering with example from Blender.",generator:()=>{}},{path:"debugging",name:"An approach to debugging (project)",description:"A project delving into the options available to debug and understand rendering systems via displaying ray paths and reading color or variable values.",generator:kc}]},Gc=async()=>{},Cc=(n,e)=>{const t=X("Using WebGPU for graphics and rendering"),r=W("TBD"),i=qt(Ke),a=qt(Fi),o=document.createElement("div");o.className="generic-row",o.append(i,a),n.append(t,r,o),e.push(Gc)},Uc=[Ke,Fi],Et={name:"Landing Page",path:"",description:"",generator:Cc,children:[]},Mi=Di(),Ei=[],{route:Vi,breadcrumbs:jc}=Ni(Uc);Mi.append(Ci(Vi,jc));Vi.generator(Mi,Ei);for(const n of Ei)n();
