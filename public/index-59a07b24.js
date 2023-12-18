(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const an=n=>{const e=n.split(`

`),t=document.createElement("div");t.className="paragraph";for(const r of e){const i=document.createElement("span");i.innerHTML=r,t.append(i)}return t},on=n=>{const e=document.createElement("h1");return e.innerHTML=n,e.className="title",e},P=(n,e,t=!0)=>{const r=document.createElement("div");r.className="label-group";const i=document.createElement("label");if(i.textContent=e,r.append(i),t&&"value"in n){const a=document.createElement("label");a.className="value-label";const o=()=>a.textContent=`[ ${n.value} ]`;n.addEventListener("input",o),o(),r.append(a)}return r.append(n),r},en=(n,{width:e,height:t,lowRes:r,overlay:i}={})=>{if(!navigator.gpu){const o=document.createElement("div");o.className="fallback",o.style.setProperty("width",`${e??512}px`),o.style.setProperty("height",`${t??512}px`);const s=document.createElement("span");s.textContent="WebGPU is not supported by this browser (or browser version). Try a different browser (eg. Chrome or Edge).";const c=document.createElement("a");return c.text="You can check the current state of WebGPU API support here.",c.href="https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API",o.append(s,c),o}const a=document.createElement("canvas");return a.width=e??512,a.height=t??512,a.id=n,r&&a.classList.add("low-res"),i&&a.classList.add("overlay"),a},Dt=n=>{const e=document.createElement("div");e.className=`routes ${n.path}`;const t=document.createElement("a");t.text=n.path,t.className="underline",e.append(t);const r=document.createElement("div");r.className="routes-container";for(const i of n.children??[]){const a=document.createElement("div");a.className="route-entry";const o=document.createElement("a");o.text=i.name;const s=document.createElement("span");s.textContent=i.description,a.onclick=()=>{nr(`/${n.path}/${i.path}`)},a.append(o,s),r.append(a)}return e.append(r),e},it=n=>{const e=document.createElement("div");return e.id=n,e.className="value-display",e},ki=(n,e)=>{const t=document.createElement("div");t.className=`navigation ${e.map(i=>i.path).join(" ")}`;const r=document.createElement("a");if(r.className="underline-white",r.textContent=Ot.name,r.onclick=()=>{nr("/")},t.append(r),e.length>1){const i=document.createElement("span");i.textContent="/";const a=document.createElement("a");a.className="underline",a.textContent=n.name,t.append(i,a)}return t},fn=(n,e,t,r,i=1,a=!1)=>{const o=document.createElement("input");return o.id=n,o.type="range",o.className="slider-input",o.min=String(t),o.max=String(r),o.step=String(i),o.value=String(e),o.disabled=a,o},He=(n,e)=>{const t=document.createElement("input");return t.id=n,t.type="color",t.value=e,t},Qn=(n,e)=>{const t=document.createElement("input");return t.id=n,t.type="checkbox",t.checked=e,t.value=String(e),t.addEventListener("input",()=>t.value=String(t.checked)),t},Ft=(n,e)=>{const t=document.createElement("button");return t.id=n,t.textContent=e,t},Fn=(n,e,t=e[0]??"")=>{const r=document.createElement("select");return r.id=n,r.append(...e.map(i=>{const a=document.createElement("option");return a.text=i,a.value=i,a.selected=i===t,a})),r},_n=()=>{const n=document.createElement("div");return n.className="interactables",n},tn=()=>{const n=document.createElement("div");return n.className="canvas-section",n},G=(n,e="value")=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate input with id ${n}`);return()=>t[e]},An=(n,e,t="value")=>{const r=document.getElementById(n);if(!r)throw new Error(`Could not locate input with id ${n}`);return r.addEventListener("input",()=>e(r[t])),r.value},Mt=(n,e)=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate button with id ${n}`);t.addEventListener("click",e)},Gi=(n,e)=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate canvas with id ${n}`);t.addEventListener("click",r=>{const i=t.getBoundingClientRect(),a=r.clientX-i.left,o=r.clientY-i.top;e({x:a,y:o})})},at=(n,{onStart:e,onMove:t,onEnd:r},{alwaysMouseMove:i}={})=>{const a=document.getElementById(n);if(!a)throw new Error(`Could not locate canvas with id ${n}`);const o=c=>{const l=a.getBoundingClientRect();return{x:c.clientX-l.left,y:c.clientY-l.top}};let s=!1;a.addEventListener("mousedown",c=>{s=!0,e==null||e(o(c))}),a.addEventListener("mouseup",c=>{s=!1,r==null||r(o(c))}),a.addEventListener("mouseleave",c=>{s&&(s=!1,r==null||r(o(c)))}),a.addEventListener("mousemove",c=>{!i&&!s||t==null||t(o(c))})},Et=(n,e)=>{for(const t of n){const r=document.getElementById(t);if(!r)throw new Error(`Could not locate element with id ${t}`);r.addEventListener("input",()=>e(t))}},Ui=(n,e,{onStart:t,onEnd:r}={})=>{const i=document.getElementById(n);if(!i)throw new Error(`Could not locate canvas with id ${n}`);i.addEventListener("click",async()=>{document.pointerLockElement||await i.requestPointerLock()});const a=l=>{e(l.movementX,l.movementY)};let o={};const s=l=>{o[l.key]=!0},c=l=>{o[l.key]=!1};return document.addEventListener("pointerlockchange",()=>{if(document.pointerLockElement===i){console.log("[pointer api] locked pointer in canvas"),document.addEventListener("mousemove",a,!1),window.addEventListener("keydown",s),window.addEventListener("keyup",c),t==null||t();return}document.removeEventListener("mousemove",a,!1),window.removeEventListener("keydown",s),window.removeEventListener("keyup",c),r==null||r()},!1),{keyMap:o}},ot=n=>{const e=document.getElementById(n);if(!e)throw new Error(`Could not locate display with id ${n}`);return t=>e.innerText=t},ji=n=>{const e=window.location.pathname.split("/").slice(2);let t=Ot,r=n;const i=[Ot];for(const a of e){const o=r.find(s=>s.path===a);if(!o)break;t=o,r=t.children??[],i.push(t)}return{route:t,breadcrumbs:i}},nr=n=>{location.href="/webgpu-for-graphics-and-rendering"+n},jn=(n,e)=>`https://julzerinos.github.io/webgpu-for-graphics-and-rendering/${n}`,Ni=()=>{const n=document.getElementById("app");if(!n)throw new Error("Could not initialize app.");return n},y=(n=0,e=0)=>[n,e],b=(n=0,e=0,t=0)=>[n,e,t],h=(n=0,e=0,t=0,r=1)=>[n,e,t,r],Sn=n=>{const e=n[0]??0,t=n[1]??0,r=n[2]??0;return b(e,t,r)},er={forward:b(0,0,1),back:b(0,0,-1),up:b(0,1,0),down:b(0,-1,0),right:b(1,0,0),left:b(-1,0,0)},B=n=>[].concat(...n),k=(n,e)=>{const t=[];for(let r=0;r<Math.min(n.length,e.length);r++)t.push(n[r]+e[r]);return t},_e=(n,e)=>{const t=[];for(let r=0;r<Math.min(n.length,e.length);r++)t.push(n[r]-e[r]);return t},Zn=(n,e)=>{const t=[];for(let r=0;r<n.length;r++)t.push(e*n[r]);return t},nt=(n,e)=>{const t=[];for(let r=0;r<Math.min(n.length,e.length);r++)t.push((n[r]+e[r])/2);return t},je=(n,e)=>{let t=0;for(let r=0;r<Math.min(n.length,e.length);r++)t+=n[r]*e[r];return t},qe=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Vt=(n,e)=>{const t=[];for(let r=0;r<Math.max(n.length,e.length);r++){let i=Number.POSITIVE_INFINITY;r<n.length&&(i=n[r]),r<e.length&&(i=Math.min(i,e[r])),t.push(i)}return t},zt=(n,e)=>{const t=[];for(let r=0;r<Math.max(n.length,e.length);r++){let i=Number.NEGATIVE_INFINITY;r<n.length&&(i=n[r]),r<e.length&&(i=Math.max(i,e[r])),t.push(i)}return t},qn=n=>Zn(n,1/Ct(n)),tr=n=>je(n,n),Ct=n=>Math.sqrt(tr(n)),rr=(n,e)=>{if(n.length!=e.length)return!1;for(let t=0;t<Math.min(n.length,e.length);t++)if(n[t]!=e[t])return!1;return!0},Fe=(n,e)=>{const t=[];for(let r=0;r<n.length;r++){let i=0;for(let a=0;a<n.length;a++)i+=e[r][a]*n[a];t.push(i)}return t},Be=(n=0,e=0,t=0,r=1)=>({r:n,g:e,b:t,a:r}),et=n=>b(n.r,n.g,n.b),$e=n=>h(n.r,n.g,n.b,n.a),mn={black:Be(0,0,0,1),white:Be(1,1,1,1),blueScreenBlue:Be(.1,.3,.6,1),transparent:Be(0,0,0,0)},de=n=>{if(n[0]==="#"&&(n=n.substring(1)),n.length!==6)throw new Error("Can't handle color hexes of size other than 6.");const e=parseInt(n,16),t=(e>>16&255)/255,r=(e>>8&255)/255,i=(e&255)/255;return{r:t,g:r,b:i,a:1}},Nn=n=>n*Math.PI/180,se=(n,e,t,r,i)=>(n-e)/(t-e)*(i-r)+r,Ge=n=>n?1:0,Me=(n,e,t)=>Math.min(Math.max(n,e),t),be=(n,e)=>{const t=e/2;return[y(n[0]-t,n[1]-t),y(n[0]+t,n[1]-t),y(n[0]-t,n[1]+t),y(n[0]-t,n[1]+t),y(n[0]+t,n[1]-t),y(n[0]+t,n[1]+t)]},Di=(n,e,t=12)=>{const r=[],i=2*Math.PI/t;for(let a=0;a<t;a++)r.push(n,k(n,y(e*Math.cos(a*i),e*Math.sin(a*i))),k(n,y(e*Math.cos((a+1)*i),e*Math.sin((a+1)*i))));return r},ze=(n,e)=>{const t=e/2,r=[h(...k(n,b(-t,-t,t)),1),h(...k(n,b(-t,t,t)),1),h(...k(n,b(t,t,t)),1),h(...k(n,b(t,-t,t)),1),h(...k(n,b(-t,-t,-t)),1),h(...k(n,b(-t,t,-t)),1),h(...k(n,b(t,t,-t)),1),h(...k(n,b(t,-t,-t)),1)],i=new Uint32Array([0,1,1,2,2,3,3,0,2,3,3,7,7,6,6,2,0,3,3,7,7,4,4,0,1,2,2,6,6,5,5,1,4,5,5,6,6,7,7,4,0,1,1,5,5,4,4,0]),a=[h(1,0,3),h(3,2,1),h(2,3,7),h(7,6,2),h(3,0,4),h(4,7,3),h(6,5,1),h(1,2,6),h(4,5,6),h(6,7,4),h(5,4,0),h(0,1,5)];return{vertices:r,lineIndices:i,triangleIndices:a,normals:[],triangleCount:12}},Hi=n=>{const e=[h(...n[0],1),h(...n[1],1),h(...n[2],1)],t=[h(0,1,2,0)],r=[0,1,1,2,2,0];return{vertices:e,lineIndices:new Uint32Array(r),triangleIndices:t,triangleCount:1,normals:[]}},kt=(n=0)=>{const e=[h(0,0,1),h(0,2*Math.sqrt(2)/3,-.3333333333333333),h(-Math.sqrt(6)/3,-Math.sqrt(2)/3,-.3333333333333333),h(Math.sqrt(6)/3,-Math.sqrt(2)/3,-.3333333333333333)];let t=[h(0,3,1),h(0,2,3),h(1,3,2),h(1,2,0)];const r=i=>{if(i<=0)return;const a=[],o=new Map;for(const s of t){const c=Sn(e[s[0]]),l=Sn(e[s[1]]),u=Sn(e[s[2]]),f=h(...qn(nt(c,l))),d=h(...qn(nt(l,u))),_=h(...qn(nt(u,c))),m=[s[0],s[1]].sort().toString();let v=o.get(m);v||(v=e.push(f)-1,o.set(m,v));const g=[s[1],s[2]].sort().toString();let L=o.get(g);L||(L=e.push(d)-1,o.set(g,L));const I=[s[0],s[2]].sort().toString();let p=o.get(I);p||(p=e.push(_)-1,o.set(I,p)),a.push(h(s[0],v,p),h(s[1],L,v),h(s[2],p,L),h(v,L,p))}t=a,r(i-1)};return r(n),{vertices:e,triangleIndices:t,triangleCount:t.length,normals:[]}},zn=(n=0,e=0,t=0,r=0,i=0,a=0,o=0,s=0,c=0,l=0,u=0,f=0,d=0,_=0,m=0,v=0)=>[[n,e,t,r],[i,a,o,s],[c,l,u,f],[d,_,m,v]],Bn=(n=0,e=0,t=0,r=0,i=0,a=0,o=0,s=0,c=0)=>[[n,e,t],[r,i,a],[o,s,c]],wn=()=>zn(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),K=n=>[].concat(...Yi(n)),we=n=>[].concat(...n.map(e=>K(e))),Cn=(n,e,t)=>{if(rr(n,e))return wn();let r=qn(_e(e,n));const i=qn(qe(r,t)),a=qn(qe(i,r));return r=Zn(r,-1),zn(...h(...i,-je(i,n)),...h(...a,-je(a,n)),...h(...r,-je(r,n)),...h())},qi=(n,e,t,r,i,a)=>{if(n===e)throw"ortho(): left and right are equal";if(t===r)throw"ortho(): bottom and top are equal";if(i===a)throw"ortho(): near and far are equal";const o=e-n,s=r-t,c=a-i,l=wn();return l[0][0]=2/o,l[1][1]=2/s,l[2][2]=-2/c,l[0][3]=-(n+e)/o,l[1][3]=-(r+t)/s,l[2][3]=-(i+a)/c,l},re=(n,e,t,r)=>{const i=1/Math.tan(Nn(n)/2),a=r-t,o=wn();return o[0][0]=i/e,o[1][1]=i,o[2][2]=-(t+r)/a,o[2][3]=-2*t*r/a,o[3][2]=-1,o[3][3]=0,o},Oe=(n,e)=>{const t=qn(e),r=t[0],i=t[1],a=t[2],o=Math.cos(Nn(n)),s=Math.sin(Nn(n)),c=1-o;return zn(...h(r*r*c+o,r*i*c-a*s,r*a*c+i*s,0),...h(r*i*c+a*s,i*i*c+o,i*a*c-r*s,0),...h(r*a*c-i*s,i*a*c+r*s,a*a*c+o,0),...h())},Re=n=>{var e=Math.cos(Nn(n)),t=Math.sin(Nn(n)),r=zn(1,0,0,0,0,e,-t,0,0,t,e,0,0,0,0,1);return r},Ee=n=>{var e=Math.cos(Nn(n)),t=Math.sin(Nn(n)),r=zn(e,0,t,0,0,1,0,0,-t,0,e,0,0,0,0,1);return r},$i=n=>{var e=Math.cos(Nn(n)),t=Math.sin(Nn(n)),r=zn(e,-t,0,0,t,e,0,0,0,0,1,0,0,0,0,1);return r},yn=({[0]:n,[1]:e,[2]:t})=>{const r=wn();return r[0][3]=n,r[1][3]=e,r[2][3]=t,r},Dn=(n=1,e=1,t=1)=>{var r=wn();return r[0][0]=n,r[1][1]=e,r[2][2]=t,r},M=(n,e)=>{const t=[];for(let r=0;r<n.length;r++){t.push([]);for(let i=0;i<e.length;i++){let a=0;for(let o=0;o<n.length;o++)a+=n[r][o]*e[o][i];t[r].push(a)}}return t},Yi=n=>{const e=[];for(let t=0;t<n.length;++t){e.push([]);for(let r=0;r<n[t].length;++r)e[t].push(n[r][t])}return e},Rn=n=>n[0][0]*n[1][1]*n[2][2]+n[0][1]*n[1][2]*n[2][0]+n[0][2]*n[2][1]*n[1][0]-n[2][0]*n[1][1]*n[0][2]-n[1][0]*n[0][1]*n[2][2]-n[0][0]*n[1][2]*n[2][1],Xi=n=>{const e=Bn(n[1][1],n[1][2],n[1][3],n[2][1],n[2][2],n[2][3],n[3][1],n[3][2],n[3][3]),t=Bn(n[1][0],n[1][2],n[1][3],n[2][0],n[2][2],n[2][3],n[3][0],n[3][2],n[3][3]),r=Bn(n[1][0],n[1][1],n[1][3],n[2][0],n[2][1],n[2][3],n[3][0],n[3][1],n[3][3]),i=Bn(n[1][0],n[1][1],n[1][2],n[2][0],n[2][1],n[2][2],n[3][0],n[3][1],n[3][2]);return n[0][0]*Rn(e)-n[0][1]*Rn(t)+n[0][2]*Rn(r)-n[0][3]*Rn(i)},Ht=n=>{const e=wn(),t=Xi(n),r=Bn(n[1][1],n[1][2],n[1][3],n[2][1],n[2][2],n[2][3],n[3][1],n[3][2],n[3][3]),i=Bn(n[1][0],n[1][2],n[1][3],n[2][0],n[2][2],n[2][3],n[3][0],n[3][2],n[3][3]),a=Bn(n[1][0],n[1][1],n[1][3],n[2][0],n[2][1],n[2][3],n[3][0],n[3][1],n[3][3]),o=Bn(n[1][0],n[1][1],n[1][2],n[2][0],n[2][1],n[2][2],n[3][0],n[3][1],n[3][2]),s=Bn(n[0][1],n[0][2],n[0][3],n[2][1],n[2][2],n[2][3],n[3][1],n[3][2],n[3][3]),c=Bn(n[0][0],n[0][2],n[0][3],n[2][0],n[2][2],n[2][3],n[3][0],n[3][2],n[3][3]),l=Bn(n[0][0],n[0][1],n[0][3],n[2][0],n[2][1],n[2][3],n[3][0],n[3][1],n[3][3]),u=Bn(n[0][0],n[0][1],n[0][2],n[2][0],n[2][1],n[2][2],n[3][0],n[3][1],n[3][2]),f=Bn(n[0][1],n[0][2],n[0][3],n[1][1],n[1][2],n[1][3],n[3][1],n[3][2],n[3][3]),d=Bn(n[0][0],n[0][2],n[0][3],n[1][0],n[1][2],n[1][3],n[3][0],n[3][2],n[3][3]),_=Bn(n[0][0],n[0][1],n[0][3],n[1][0],n[1][1],n[1][3],n[3][0],n[3][1],n[3][3]),m=Bn(n[0][0],n[0][1],n[0][2],n[1][0],n[1][1],n[1][2],n[3][0],n[3][1],n[3][2]),v=Bn(n[0][1],n[0][2],n[0][3],n[1][1],n[1][2],n[1][3],n[2][1],n[2][2],n[2][3]),g=Bn(n[0][0],n[0][2],n[0][3],n[1][0],n[1][2],n[1][3],n[2][0],n[2][2],n[2][3]),L=Bn(n[0][0],n[0][1],n[0][3],n[1][0],n[1][1],n[1][3],n[2][0],n[2][1],n[2][3]),I=Bn(n[0][0],n[0][1],n[0][2],n[1][0],n[1][1],n[1][2],n[2][0],n[2][1],n[2][2]);return e[0][0]=Rn(r)/t,e[0][1]=-Rn(s)/t,e[0][2]=Rn(f)/t,e[0][3]=-Rn(v)/t,e[1][0]=-Rn(i)/t,e[1][1]=Rn(c)/t,e[1][2]=-Rn(d)/t,e[1][3]=Rn(g)/t,e[2][0]=Rn(a)/t,e[2][1]=-Rn(l)/t,e[2][2]=Rn(_)/t,e[2][3]=-Rn(L)/t,e[3][0]=-Rn(o)/t,e[3][1]=Rn(u)/t,e[3][2]=-Rn(m)/t,e[3][3]=Rn(I)/t,e},Wi=(n,e=[0,0],t=[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER])=>n.slice(e[1],t[1]).map(r=>r.slice(e[0],t[0])),Ji=(n,e)=>{for(let t=0;t<n.length;t++)e[t].splice(0,n[t].length,...n[t]);return e},le=async n=>{const e=document.createElement("img");e.src=n,await e.decode();const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");if(!r)throw new Error("Could not get canvas context");r.drawImage(e,0,0,t.width,t.height);const i=r.getImageData(0,0,t.width,t.height),a=new Uint8Array(e.width*e.height*4);for(let o=0;o<e.height;++o)for(let s=0;s<e.width;++s)for(let c=0;c<4;++c)a[(o*e.width+s)*4+c]=i.data[((e.height-o-1)*e.width+s)*4+c];return{textureData:a,height:e.height,width:e.width}},ir=(n,e)=>{const t=1/n,r=t/e;if(e<2)return[y()];const i=[];for(var a=0;a<e;++a)for(var o=0;o<e;++o)i.push(y((Math.random()+o)*r-t*.5,(Math.random()+a)*r-t*.5));return i},Zi=(n,e,t)=>{const r=new Uint8Array(4*n*n);for(let i=0;i<n;++i)for(let a=0;a<n;++a){const o=Math.floor(i/(n/t)),s=Math.floor(a/(n/e)),c=o%2!==s%2?255:0,l=4*(i*n+a);r[l]=r[l+1]=r[l+2]=c,r[l+3]=255}return r},Ki=({data:n,width:e,height:t},r=!1)=>{const i=Math.max(1,e/2|0),a=Math.max(1,t/2|0),o=new Uint8Array(i*a*4),s=(f,d)=>{const _=(d*e+f)*4;return n.subarray(_,_+4)},c=(f,d,_)=>f+(d-f)*_,l=(f,d,_)=>f.map((m,v)=>c(m,d[v],_)),u=(f,d,_,m,v,g)=>{const L=l(f,d,v),I=l(_,m,v);return l(L,I,g)};for(let f=0;f<a;++f)for(let d=0;d<i;++d){const _=(d+.5)/i,m=(f+.5)/a,v=_*e-.5,g=m*t-.5,L=v|0,I=g|0,p=v%1,w=g%1,A=s(L,I),x=s(L+1,I),O=s(L,I+1),S=s(L+1,I+1),F=(f*i+d)*4,E=u(A,x,O,S,p,w);r&&(E[0]=6*i),o.set(E,F)}return{data:o,width:i,height:a}},Ke=(n,e,t=!1)=>{const r=n.length/4/e;let i={data:n,width:e,height:r};const a=[i];for(;i.width>1||i.height>1;)i=Ki(i,t),a.push(i);return a},Ye=async(n,e)=>{const r=await(await fetch(e)).blob(),i=await createImageBitmap(r,{colorSpaceConversion:"none"}),a=n.createTexture({size:[i.width,i.height,1],format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT});n.queue.copyExternalImageToTexture({source:i,flipY:!0},{texture:a},{width:i.width,height:i.height});const o=n.createSampler({addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest"});return{texture:a,sampler:o}},ar=(n,{}={})=>{let e=0;const t=[],r=[],i=n.mtls.reduce((o,s)=>({...o,...s.materials.reduce((c,l,u)=>({...c,[l.name]:u}),{})}),{});for(let o=0;o<n.objects.length;o++){const s=n.objects[o];e+=s.faces.length;for(let c=0;c<s.faces.length;c++){const l=s.faces[c];t.push(h(...l.vIndices,1)),r.push(i[l.materialName])}}return{vertices:n.vertices,normals:n.normals,triangleCount:e,triangleIndices:t,materialIndices:r}},Qi=n=>({filename:n,mtls:[],objects:[],vertices:[],normals:[]}),$n=async(n,e=1,t=!1)=>{var l;const i=(l=(await fetch(n)).body)==null?void 0:l.getReader();if(!i)throw new Error("Could not get reader for obj file.");const a=Qi(n),o=or("_default");a.objects.push(o);const s={objDoc:a,currentObject:o,scale:e,currentMaterialName:"",filename:n,reverse:t};let c="";for(;;){const{value:u,done:f}=await i.read();if(f)break;const _=new TextDecoder("utf-8").decode(u,{stream:!0}).split(`
`);c!==""&&(_[0]=c+_[0],c=""),_[_.length-1]!==""&&(c=_.pop());for(const g of _)await na(g,s)}return a},na=async(n,e)=>{const t=sr(n),r=fe(t);if(r.length!==0)switch(r){case"#":return;case"mtllib":var i=ea(t,e.filename),a=ha();e.objDoc.mtls.push(a);const o=await fetch(i);if(!o.body)throw new Error("No MTL body to read.");await ca(o.body.getReader(),a);return;case"o":case"g":const s=e.currentObject.numIndices===0?e.objDoc.objects.length-1:e.objDoc.objects.length,c=ta(t);e.objDoc.objects[s]=c,e.currentObject=c;return;case"v":const l=ra(t,e.scale);e.objDoc.vertices.push(l);return;case"vn":const u=ia(t);e.objDoc.normals.push(u);return;case"usemtl":e.currentMaterialName=aa(t);return;case"f":const f=oa(t,e.currentMaterialName);sa(f,e.objDoc,e.reverse),da(e.currentObject,f);return}},ea=(n,e)=>{var t=e.lastIndexOf("/"),r="";return t>0&&(r=e.substring(0,t+1)),r+fe(n)},ta=n=>{var e=fe(n);return or(e)},ra=(n,e)=>{var t=te(n)*e,r=te(n)*e,i=te(n)*e;return h(t,r,i,1)},ia=n=>{var e=te(n),t=te(n),r=te(n);return h(e,t,r,0)},aa=n=>fe(n),oa=(n,e)=>{const t=va(e);for(;;){const r=fe(n);if(r.length===0)break;const i=r.split("/");if(i.length>=1){const a=parseInt(i[0])-1;isNaN(a)||t.vIndices.push(a)}if(i.length>=3){const a=parseInt(i[2])-1;t.nIndices.push(a)}else t.nIndices.push(-1)}return t},sa=(n,e,t)=>{var r=[e.vertices[n.vIndices[0]][0],e.vertices[n.vIndices[0]][1],e.vertices[n.vIndices[0]][2]],i=[e.vertices[n.vIndices[1]][0],e.vertices[n.vIndices[1]][1],e.vertices[n.vIndices[1]][2]],a=[e.vertices[n.vIndices[2]][0],e.vertices[n.vIndices[2]][1],e.vertices[n.vIndices[2]][2]],o=qt(r,i,a);if(o==null){if(n.vIndices.length>=4){var s=[e.vertices[n.vIndices[3]][0],e.vertices[n.vIndices[3]][1],e.vertices[n.vIndices[3]][2]];o=qt(i,a,s)}o==null&&(o=[0,1,0])}if(t&&(o[0]=-o[0],o[1]=-o[1],o[2]=-o[2]),n.normal=h(o[0],o[1],o[2],0),n.vIndices.length>3){for(var c=n.vIndices.length-2,l=new Array(c*3),u=new Array(c*3),f=0;f<c;f++)l[f*3+0]=n.vIndices[0],l[f*3+1]=n.vIndices[f+1],l[f*3+2]=n.vIndices[f+2],u[f*3+0]=n.nIndices[0],u[f*3+1]=n.nIndices[f+1],u[f*3+2]=n.nIndices[f+2];n.vIndices=l,n.nIndices=u}return n.numIndices=n.vIndices.length,n},ca=async(n,e)=>{const t={material:Gt("",h()),mtl:e};for(;;){const{value:r,done:i}=await n.read();if(i)break;const o=new TextDecoder("utf-8").decode(r,{stream:!0}).split(`
`);for(const s of o)la(s,t)}e.complete=!0},la=(n,e)=>{const t=sr(n),r=fe(t);if(r.length!==0)switch(r){case"#":return;case"newmtl":const i=ua(t);e.material=Gt(i,h(.8,.8,.8,1)),e.mtl.materials.push(e.material);return;case"Kd":e.material&&(e.material.color=tt(t));return;case"Ka":e.material&&(e.material.emission=tt(t));return;case"Ks":e.material&&(e.material.specular=tt(t));return;case"Ni":e.material&&(e.material.ior=te(t));return;case"Ns":e.material&&(e.material.shininess=te(t));return;case"illum":e.material&&(e.material.illum=ma(t));return}},fa=(n,e)=>{for(var t=0;t<e.mtls.length;t++)for(var r=0;r<e.mtls[t].materials.length;r++)if(e.mtls[t].materials[r].name==n)return e.mtls[t].materials[r];return Gt("_defaultMat",h(.8,.8,.8,1))},ie=(n,{indicesIn3:e}={})=>{let t=0,r=0,i=0;for(var a=0;a<n.objects.length;a++)r+=n.objects[a].numIndices+n.objects[a].faces.length,i+=n.objects[a].faces.length;t=n.vertices.length;const o=new Float32Array(t*4),s=new Float32Array(t*4),c=new Float32Array(t*4),l=new Uint32Array(r),u=new Uint32Array(i),f=[],d=new Map,_=[],m=Ve();let v=0,g=0;for(let q=0;q<n.objects.length;q++){const rn=n.objects[q];for(var L=0;L<rn.faces.length;L++){var I=rn.faces[L],p=d.get(I.materialName),w;p===void 0?(w=fa(I.materialName,n),d.set(I.materialName,f.length),p=f.length,f.push(w)):w=f[p],w.emission!==void 0&&w.emission[0]+w.emission[1]+w.emission[2]>0&&_.push(g),u[g++]=p;for(var A=w.color===void 0?h(.8,.8,.8,1):w.color,x=I.normal,O=0;O<I.vIndices.length;O++){var S=I.vIndices[O];l[v]=S;var F=n.vertices[S];o[S*4+0]=F[0],o[S*4+1]=F[1],o[S*4+2]=F[2],o[S*4+3]=1,ya(m,F),c[S*4+0]=A[0],c[S*4+1]=A[1],c[S*4+2]=A[2],c[S*4+3]=A[3];var E=I.nIndices[O];if(E>=0){var V=n.normals[E];s[S*4+0]=V[0],s[S*4+1]=V[1],s[S*4+2]=V[2],s[S*4+3]=0}else s[S*4+0]=x[0],s[S*4+1]=x[1],s[S*4+2]=x[2],s[S*4+3]=0;v++}e||(l[v++]=0)}}const R=new Uint32Array(_);return{vertices:o,normals:s,colors:c,indices:l,materials:f,matIndices:u,lightIndices:R,aabb:new Float32Array(B([m.min,m.max]))}},ha=()=>({complete:!1,materials:[]}),ua=n=>fe(n),tt=n=>{var e=te(n),t=te(n),r=te(n);return h(e,t,r,1)},Gt=(n,e)=>({name:n,color:e,illum:0,shininess:0,ior:1,specular:h(),emission:h()}),or=n=>({name:n,faces:[],numIndices:0}),da=(n,e)=>{n.faces.push(e),n.numIndices+=e.numIndices},va=(n="")=>({materialName:n,vIndices:[],nIndices:[],normal:h(1),numIndices:0}),sr=n=>({str:n,index:0}),_a=n=>{let e;const t=n.str.length;for(e=n.index;e<t;e++){const r=n.str.charAt(e);if(!(r=="	"||r==" "||r=="("||r==")"||r=='"'))break}n.index=e},fe=n=>{_a(n);const e=pa(n.str,n.index);if(e===0)return"";const t=n.str.substring(n.index,n.index+e);return n.index+=e+1,t},ma=n=>parseInt(fe(n)),te=n=>parseFloat(fe(n)),pa=(n,e)=>{let t;for(t=e;t<n.length;t++){var r=n.charAt(t);if(r=="	"||r==" "||r=="("||r==")"||r=='"')break}return t-e},qt=(n,e,t)=>{for(var r=new Float32Array(3),i=new Float32Array(3),a=0;a<3;a++)r[a]=n[a]-e[a],i[a]=t[a]-e[a];var o=Array(3);o[0]=r[1]*i[2]-r[2]*i[1],o[1]=r[2]*i[0]-r[0]*i[2],o[2]=r[0]*i[1]-r[1]*i[0];var s=o[0],c=o[1],l=o[2],u=Math.sqrt(s*s+c*c+l*l);if(u){if(u==1)return o}else return o[0]=0,o[1]=0,o[2]=0,o;return u=1/u,o[0]=s*u,o[1]=c*u,o[2]=l*u,o},ga=4,ye=20,$t=1e-6,Yt=4,xa=(n,e)=>({primIdx:n,bbox:Ve(e)}),ba=n=>{let e=Ve();for(var t=0;t<n.length;++t)e=wa(e,n[t].bbox);const r={maxLevel:ye,count:n.length,id:0,bbox:e},i=[];return st(r,r.bbox,0,n,i),{bspTreeRoot:r,tree_objects:i}},st=(n,e,t,r,i)=>{if(r.length<=ga||t===ye){n.axisType=3,n.id=i.length,n.count=r.length,n.plane=0;for(var a=0;a<r.length;++a)i.push(r[a]);return}const o=[],s=[];n.left={id:-1,bbox:Ve(),maxLevel:ye,count:0},n.right={id:-1,bbox:Ve(),maxLevel:ye,count:0};let c=Number.MAX_VALUE;for(let p=0;p<3;++p)for(let w=1;w<Yt;++w){let A={min:[...e.min],max:[...e.max]},x={min:[...e.min],max:[...e.max]};const O=e.max[p],S=e.min[p],F=(O-S)*w/Yt+S;A.max[p]=F,x.min[p]=F;let E=0,V=0;for(let T=0;T<r.length;++T){const q=r[T];E+=Te(A,q.bbox)?1:0,V+=Te(x,q.bbox)?1:0}const R=E*Xt(A)+V*Xt(x);R<c&&(c=R,n.axisType=p,n.plane=F,n.left.count=E,n.left.id=0,n.right.count=V,n.right.id=0)}const l=n,u=e.max[l.axisType],f=e.min[l.axisType],d=u-f,_=$t<d/8?d/8:$t;let m=l.plane;if(l.left.count==0){m=u;for(var v=0;v<r.length;++v){const w=r[v].bbox.min[l.axisType];w<m&&(m=w)}m-=_}if(l.right.count==0){m=f;for(var v=0;v<r.length;++v){const A=r[v].bbox.max[l.axisType];A>m&&(m=A)}m+=_}l.plane=m;let g={min:[...e.min],max:[...e.max]},L={min:[...e.min],max:[...e.max]};g.max[l.axisType]=m,L.min[l.axisType]=m;const I=[];for(let p=0;p<r.length;++p){const w=r[p];I.push([p,Te(g,w.bbox)]),Te(g,w.bbox)&&o.push(w),Te(L,w.bbox)&&s.push(w)}r=[],st(l.left,g,t+1,o,i),st(l.right,L,t+1,s,i)},me=n=>{const e=[];for(var t=0;t<n.indices.length/4;++t){let f=[n.indices[t*4]*4,n.indices[t*4+1]*4,n.indices[t*4+2]*4],d=b(n.vertices[f[0]],n.vertices[f[0]+1],n.vertices[f[0]+2]),_=b(n.vertices[f[1]],n.vertices[f[1]+1],n.vertices[f[1]+2]),m=b(n.vertices[f[2]],n.vertices[f[2]+1],n.vertices[f[2]+2]),v=xa(t,[d,_,m]);e.push(v)}const{bspTreeRoot:r,tree_objects:i}=ba(e),a=new Uint32Array(i.map(f=>f.primIdx)),o=(1<<ye+1)-1,s=new Float32Array(o),c=new Uint32Array(o*4),l=(f,d,_)=>{if(d>ye)return;const m=f;let v=(1<<d)-1+_;c[v*4]=m.axisType+(m.count<<2),c[v*4+1]=m.id,c[v*4+2]=(1<<d+1)-1+2*_,c[v*4+3]=(1<<d+1)+2*_,s[v]=m.plane,m.axisType!==3&&(l(m.left,d+1,_*2),l(m.right,d+1,_*2+1))};return l(r,0,0),{...n,treeIds:a,bspTree:c,bspPlanes:s,aabb:new Float32Array(B([r.bbox.min,r.bbox.max]))}},Ve=(n=[])=>{let e=h(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,1),t=h(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,1);for(const r of n)e=Vt(e,r),t=zt(t,r);return{max:t,min:e}},ya=(n,e)=>{n.min=Vt(n.min,e),n.max=zt(n.max,e)},wa=(n,e)=>({min:Vt(n.min,e.min),max:zt(n.max,e.max)}),La=n=>Sn(_e(n.max,n.min)),Ia=n=>{const[e,t,r]=La(n);return e*t+t*r+e*r},Xt=n=>Ia(n)*2,Te=(n,e)=>{for(let t=0;t<3;t++)if(e.min[t]>n.max[t]||e.max[t]<n.min[t])return!1;return!0},Ie=n=>{const e=n.reduce((r,i)=>r+i.length,0),t=new Float32Array(e);for(let r=0;r<Math.max(...n.map(i=>i.length));r+=4)for(let i=0;i<n.length;i++)if(r<n[i].length)for(let a=0;a<4;a++)t[r*n.length+i*4+a]=n[i][r+a];return t},Ae=(n,e,t)=>{for(let r=0;r<e.length;r++)n[t*r+3]=e[r]},Aa=()=>[0,0,0,1],cr=({[0]:n,[1]:e,[2]:t,[3]:r})=>[n,e,t,r],Pe=(n,e)=>{const t=Ta(e),r=Xe(e,Xe(n,t));return h(r[0],r[1],r[2],n[3])},Xe=(n,e)=>cr([n[1]*e[2]-n[2]*e[1]+e[3]*n[0]+n[3]*e[0],n[2]*e[0]-n[0]*e[2]+e[3]*n[1]+n[3]*e[1],n[0]*e[1]-n[1]*e[0]+e[3]*n[2]+n[3]*e[2],n[3]*e[3]-n[0]*e[0]-n[1]*e[1]-n[2]*e[2]]),Sa=n=>n[0]*n[0]+n[1]*n[1]+n[2]*n[2]+n[3]*n[3],Ta=n=>{const e=Sa(n);return cr([-n[0]/e,-n[1]/e,-n[2]/e,n[3]/e])},Wt=(n,e)=>{const t=Math.sin(e*.5),r=qn(n);return[r[0]*t,r[1]*t,r[2]*t,Math.cos(e*.5)]},Ba=(n,e)=>{const t=Math.sqrt(2*(1+n[0]*e[0]+n[1]*e[1]+n[2]*e[2]));return[(n[1]*e[2]-n[2]*e[1])/t,(n[2]*e[0]-n[0]*e[2])/t,(n[0]*e[1]-n[1]*e[0])/t,t/2]},Ra=(n,e)=>{const t=[];for(let r=0;r<n.length;r++){const i=n[r];for(let a=0;a<e;a++){const o=t[a];if(!(o!==void 0&&n[o]<i)){t.splice(a,0,r);break}}}return t.slice(0,e)},Pa={float32:new Float32Array([0]).byteLength,uint32:new Uint32Array([0]).byteLength},kn={float32x2:new Float32Array(y()).byteLength,float32x3:new Float32Array(b()).byteLength,float32x4:new Float32Array(h()).byteLength},Oa={float32x4x4:new Float32Array(K(zn())).byteLength},Pn={...Pa,...kn,...Oa},cn=async n=>{const t=await navigator.gpu.requestAdapter();if(!t)throw new Error("Could not initialize GPU adapter.");const r=await t.requestDevice(),i=document.getElementById(n);if(!i)throw new Error(`Could not find canvas with id ${n}`);const a=i.getContext("gpupresent")||i.getContext("webgpu");if(!a)throw new Error("Could not generate context for canvas.");const o=navigator.gpu.getPreferredCanvasFormat();return a.configure({device:r,format:o}),{adapter:t,device:r,canvas:i,canvasFormat:o,context:a}},hn=(n,e,t={r:0,g:0,b:0,a:1},{msaaTexture:r,depthStencilAttachmentFactory:i,otherColorAttachments:a}={})=>{const o={view:r?r.createView():e.getCurrentTexture().createView(),resolveTarget:r?e.getCurrentTexture().createView():void 0,loadOp:"clear",clearValue:t,storeOp:"store"},s=n.createCommandEncoder(),c=s.beginRenderPass({colorAttachments:[o,...a??[]],depthStencilAttachment:(i??(()=>{}))()});return{pass:c,executePass:()=>{c.end(),n.queue.submit([s.finish()])},encoder:s}},nn=(n,e,t,r,i="triangle-list",a,{fragmentOverrides:o,blend:s}={})=>{const c=n.createShaderModule({code:r});return n.createRenderPipeline({layout:"auto",vertex:{module:c,entryPoint:"main_vs",buffers:e},fragment:{module:c,entryPoint:"main_fs",targets:[{format:t,blend:s}],...o},...a,primitive:{topology:i,frontFace:"ccw",cullMode:"back",...a==null?void 0:a.primitive}})},ae=(n,e,t,{depthStencilOverwrites:r}={})=>{let i;const a=()=>{i=n.createTexture({size:{width:e.width,height:e.height},format:"depth24plus",sampleCount:t,usage:GPUTextureUsage.RENDER_ATTACHMENT})},o={depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus",...r};return{createDepthTexture:a,depthStencil:o,depthStencilAttachmentFactory:()=>(i||a(),{view:i.createView(),depthLoadOp:"clear",depthClearValue:1,depthStoreOp:"store"})}},pe=(n,e,t,r)=>({msaaTexture:n.createTexture({size:{width:e.width,height:e.height},format:t,sampleCount:r,usage:GPUTextureUsage.RENDER_ATTACHMENT}),multisample:{count:r}}),H=(n,e,t,r=0,i=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const a=n.createBuffer({size:e.byteLength,usage:i}),o={arrayStride:Pn[t],attributes:[{format:t,offset:0,shaderLocation:r}]};return n.queue.writeBuffer(a,0,e),{bufferLayout:o,buffer:a}},Vn=(n,e,t=GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST)=>{const r=n.createBuffer({size:e.byteLength,usage:t});return n.queue.writeBuffer(r,0,e),{buffer:r}},z=(n,e,t,r,i=0)=>{const a=t.map(s=>{const c=n.createBuffer({size:s.byteLength,usage:GPUBufferUsage[r]|GPUBufferUsage.COPY_DST});return n.queue.writeBuffer(c,0,s),c}),o=n.createBindGroup({layout:e.getBindGroupLayout(i),entries:a.map((s,c)=>({binding:c,resource:{buffer:s}}))});return{buffers:a,bindGroup:o}},Un=(n,e,t,r,i=0,{createViewOverwrite:a}={})=>n.createBindGroup({layout:e.getBindGroupLayout(i),entries:[{binding:0,resource:r},{binding:1,resource:t.createView(a)}]}),Kn=(n,e,t,r,i,{mips:a}={})=>{const o=n.createTexture({size:[t,r,1],format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING,mipLevelCount:a?a.length:void 0});(a||[{data:e,width:t,height:r}]).forEach(({data:l,width:u,height:f},d)=>{n.queue.writeTexture({texture:o,mipLevel:d},l,{bytesPerRow:u*4},{width:u,height:f})});const c=n.createSampler({addressModeU:"repeat",addressModeV:"repeat",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",...i});return{texture:o,sampler:c}},Fa=(n,e,t,r)=>{const i=n.createTexture({dimension:"2d",size:[t,r,6],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});for(let o=0;o<e.length;o++)n.queue.writeTexture({texture:i,origin:[0,0,o]},e[o],{bytesPerRow:t*4},[t,r]);const a=n.createSampler({magFilter:"linear",minFilter:"linear"});return{cubemapTexture:i,sampler:a}},Qe=(n,e)=>{const t=n.createTexture({size:[e.width,e.height],usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,format:"rgba32float"}),r=n.createTexture({size:[e.width,e.height],usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,format:"rgba32float"});return{renderDst:r,renderSrc:t,blitPingPong:a=>a.copyTextureToTexture({texture:t},{texture:r},[e.width,e.height])}},W=(n,e,t,r,i=!1)=>{if(i){const a=new Float32Array(r/Float32Array.BYTES_PER_ELEMENT),o=new Float32Array((e.size-t.byteLength-a.byteLength)/Float32Array.BYTES_PER_ELEMENT);t=new Float32Array([...a,...t,...o]),r=0}n.queue.writeBuffer(e,r,t)},Gn=(n,e,t,r,i=!1)=>{if(i){const a=new Uint32Array(r/Float32Array.BYTES_PER_ELEMENT),o=new Uint32Array((e.size-t.byteLength-a.byteLength)/Uint32Array.BYTES_PER_ELEMENT);t=new Uint32Array([...a,...t,...o]),r=0}n.queue.writeBuffer(e,r,t)},Ut=zn(1,0,0,0,0,1,0,0,0,0,-.5,.5,0,0,0,1),Ma=`@vertex
fn main_vs(@location(0) pos : vec2f) -> @builtin(position) vec4f
{
    return vec4f(pos, 0, 1);
}
@fragment
fn main_fs() -> @location(0) vec4f
{
    return vec4f(0.0, 0.0, 0.0, 1.0);
}
`,Ea=async()=>{const{device:n,canvas:e,context:t,canvasFormat:r}=await cn("task1"),i=[].concat(B(be([0,0],10*(2/e.height))),B(be([1,0],10*(2/e.height))),B(be([1,1],10*(2/e.height)))),a=new Float32Array(i),{buffer:o,bufferLayout:s}=H(n,a,"float32x2"),c=nn(n,[s],r,Ma),{pass:l,executePass:u}=hn(n,t,{r:.3921,g:.5843,b:.9294,a:1});l.setPipeline(c),l.setVertexBuffer(0,o),l.draw(i.length/2),u()},Va=(n,e)=>{const t=on("Hello (GPU) world"),r=an(`
With WebGPU, even the simplest 'Hello world!' exercise is already met with an obstacle. 
Points, the most primitive of shapes, are drawn to the screen as single pixels. 
This could work for low resolution images, but targeting something larger requires transforming the pixels into quads (two triangles forming a square) of the desired size.

The quads are transformed into a vertex buffer (flattened array of vector components) and attached to the render pass before the draw command. 
With this, the first step has been made. 
Displaying anything on the screen is just a trivial extension of drawing some points, really.
        `),i=en("task1"),a=tn();a.append(i),n.append(t,r,a),e.push(Ea)},za=`struct VSOut {
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
`,Ca=async()=>{const{device:n,context:e,canvasFormat:t}=await cn("task2"),{pass:r,executePass:i}=hn(n,e,{r:.3921,g:.5843,b:.9294,a:1}),a=[y(0,0),y(1,0),y(1,1)],o=[b(1,0,0),b(0,1,0),b(0,0,1)],s=new Float32Array(B(a)),c=new Float32Array(B(o)),{buffer:l,bufferLayout:u}=H(n,s,"float32x2"),{buffer:f,bufferLayout:d}=H(n,c,"float32x3",1),_=nn(n,[u,d],t,za);r.setPipeline(_),r.setVertexBuffer(0,l),r.setVertexBuffer(1,f),r.draw(a.length),i()},ka=(n,e)=>{const t=on("A formal introduction to the triangle"),r=an(`
The triangle was mentioned in the previous section, but a passing mention does not do enough to emphasis the role this simple shape plays in the world of computer graphics.
The triangle, a shape made of any three unique vertices, is the most commonly used building block of virtual worlds.

The reasons (beyond simply stating this is how it was always done) come from the mathematical simplicity of the shape.
The triangle has the lowest number of vertices (points) which generate a flat surface polygon. The triangle also has a powerful feature which elevates it above its more complex cousins - Barycentric coordinates.

The set of three factors are crucial to smoothly interpolate values over the surface of the triangle (across the "axes" of its three points). 
Not only is this used to calculate the fragments which belong to the triangle between its points, but can be extended to support any attribute such as colors (see below) or as will soon be shown normals and texture coordinates.

Almost any complex graphical shape is now a collection of a multiple of three vertex points waiting to be interpolated.
`),i=en("task2"),a=tn();a.append(i),n.append(t,r,a),e.push(Ca)},Ga=`struct Time {
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
`,Ua=async()=>{const{device:n,context:e,canvasFormat:t}=await cn("task3"),r=be(y(0,0),1),i=new Float32Array(B(r)),{bufferLayout:a,buffer:o}=H(n,i,"float32x2"),s=nn(n,[a],t,Ga),{bindGroup:c,buffers:[l]}=z(n,s,[new Float32Array(1)],"UNIFORM"),u=f=>{W(n,l,new Float32Array([f/1e3]),0);const{pass:d,executePass:_}=hn(n,e,{r:.3921,g:.5843,b:.9294,a:1});d.setPipeline(s),d.setVertexBuffer(0,o),d.setBindGroup(0,c),d.draw(r.length),_(),requestAnimationFrame(u)};requestAnimationFrame(u)},ja=(n,e)=>{const t=on("Move, please"),r=an(`
A static triangle is hardly anything to write home about. Getting the shapes to move (or better - react to input) is what makes this whole endevour worthwhile.
The GPU does not have a concept of human time. To be fair, time is not much more than a constantly increasing linear value and should be just that.

While vertex buffers are key to generate shapes in the virtual space, storage and uniform buffers are optionally used to provide auxiliary data to the GPU. 
Time, just like any other variable, can then be fed into the mathematical algorithms defined in shaders to create a property function dependent on time.

Trigonometric functions (especially sinusoidal waves) soon become a shader author's best friend.
`),i=en("task3"),a=tn();a.append(i),n.append(t,r,a),e.push(Ua)},Na=`struct Time {
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
`,Da=async()=>{const{device:n,context:e,canvasFormat:t}=await cn("task4"),r=be(y(0,0),2),i=new Float32Array(B(r)),a=G("ball-height"),o=G("ball-size"),s=G("ball-speed"),{bufferLayout:c,buffer:l}=H(n,i,"float32x2"),u=nn(n,[c],t,Na),{bindGroup:f,buffers:[d]}=z(n,u,[new Float32Array([0])],"UNIFORM"),{bindGroup:_,buffers:[m]}=z(n,u,[new Float32Array(3)],"UNIFORM",1),v=g=>{W(n,d,new Float32Array([g/1e3]),0),W(n,m,new Float32Array([a(),s(),o()]),0);const{pass:L,executePass:I}=hn(n,e,mn.blueScreenBlue);L.setPipeline(u),L.setVertexBuffer(0,l),L.setBindGroup(0,f),L.setBindGroup(1,_),L.draw(r.length),I(),requestAnimationFrame(v)};requestAnimationFrame(v)},Ha=(n,e)=>{const t=on("Interacting with a scene"),r=an(`
Just as time can be provided to the GPU, so can any other relevant attribute, property or value which has to be controlled externally by the CPU.

While a circle could be defined as fan of triangles defined by vertices laying on a circle, it is important to remember that circles are pointless.
Pointless, but ever so important. No matter how many vertices define a circle, it will never be a resolution-independent circle.

An alternative is to define circles in the conceptual space of the fragement shader as a boolean function of distance to the circle center. 
To do this, the circle can only exist on the surface of another shape such as a quad. The black space in the canvas below is actually the color of quad. 
The ball is being rendered on the quad's surface, much like a screen displaying a video.
`),i=tn(),a=en("task4"),o=_n(),s=P(fn("ball-height",.3,.1,.9,.1),"Ball bounce height"),c=P(fn("ball-speed",4,1,16),"Ball bounce speed"),l=P(fn("ball-size",1.05,1.01,1.5,.01),"Ball size");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(Da)},qa=(n,e)=>{Va(n,e),ka(n,e),ja(n,e),Ha(n,e)},$a=`struct VSOut {
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
`,ct="drawing",lt="drawing-mode",Ya=["POINT","TRIANGLE","CIRCLE"],lr="points-color",fr="drawing-background-color",hr="granularity-slider",ur="size-slider",dr="clear",Xa=async()=>{const{device:n,canvas:e,context:t,canvasFormat:r}=await cn(ct);let i=An(fr,T=>{i=T,V()});const a=ot("display-draw-instruction"),o=G(lr),s=G(lt),c=G(hr),l=G(ur),u=1e3,f=new Float32Array(6*u*kn.float32x2),{buffer:d,bufferLayout:_}=H(n,f,"float32x2"),m=new Float32Array(6*u*kn.float32x3),{buffer:v,bufferLayout:g}=H(n,m,"float32x3",1),L=nn(n,[_,g],r,$a,"triangle-list");Gi(ct,T=>{switch(s()){case"TRIANGLE":F(T);break;case"CIRCLE":E(T);break;default:case"POINT":S(),A(T);break}V()});let p=0,w=0;const A=({x:T,y:q})=>{const rn=se(T,0,e.width,-1,1),sn=-1*se(q,0,e.height,-1,1),U=be(y(rn,sn),l()/e.height),Y=new Float32Array(B(U));n.queue.writeBuffer(d,p,Y),p+=6*kn.float32x2;const X=Array(6).fill(et(de(o()))),C=new Float32Array(B(X));n.queue.writeBuffer(v,w,C),w+=6*kn.float32x3};let x=[],O=[];const S=()=>{x=[],O=[]},F=T=>{if(x.push(T),O.push(o()),O.length<3){A(T);return}const q=new Float32Array([].concat(...x.map(({x:sn,y:U})=>{const Y=se(sn,0,e.width,-1,1),X=-1*se(U,0,e.height,-1,1);return y(Y,X)}),B(Array(9).fill(y()))));n.queue.writeBuffer(d,p-2*6*kn.float32x2,q),p+=kn.float32x2*(3-2*6);const rn=new Float32Array([].concat(...B(O.map(sn=>et(de(sn)))),B(Array(9).fill(b()))));n.queue.writeBuffer(v,w-2*6*kn.float32x3,rn),w+=kn.float32x3*(3-2*6),S()},E=T=>{if(x.push(T),O.push(o()),x.length<2){A(T);return}const q=y(se(x[0].x,0,e.width,-1,1),-1*se(x[0].y,0,e.height,-1,1)),rn=y(se(x[1].x,0,e.width,-1,1),-1*se(x[1].y,0,e.height,-1,1)),sn=Ct(_e(rn,q)),U=Di(q,sn,c()),Y=new Float32Array(B(U));n.queue.writeBuffer(d,p-6*kn.float32x2,Y),p+=kn.float32x2*(U.length-6);const X=new Float32Array(B([...new Array(U.length)].map((C,$)=>{const Q=$%3===0?0:1;return et(de(O[Q]))})));n.queue.writeBuffer(v,w-6*kn.float32x3,X),w+=kn.float32x3*(U.length-6),S()},V=()=>{const{pass:T,executePass:q}=hn(n,t,de(i));T.setPipeline(L),T.setVertexBuffer(0,d),T.setVertexBuffer(1,v),T.draw(6*u),q()};Mt(dr,()=>{n.queue.writeBuffer(d,0,new Float32Array(6*u*kn.float32x2)),n.queue.writeBuffer(v,0,new Float32Array(6*u*kn.float32x3)),V()}),An(lt,T=>{a({POINT:"Click to create a point",TRIANGLE:"Create three points to form a triangle",CIRCLE:"Create two points to form a circle"}[T])}),a("Click to create a point"),V()},Wa=(n,e)=>{const t=on("Drawing with WebGPU"),r=an(`
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
`),i=tn(),a=en(ct),o=_n(),s=it("display-draw-instruction"),c=Fn(lt,Ya),l=P(He(lr,"#000000"),"Draw color"),u=P(He(fr,"#ffffff"),"Background color"),f=P(fn(ur,10,2,100),"Point size"),d=P(fn(hr,12,4,32),"Circle granularity"),_=Ft(dr,"Clear canvas");o.append(s,c,l,f,d,u,_),i.append(a,o),n.append(t,r,i),e.push(Xa)},Ja=`struct Uniforms {
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
`,vr="wireframe",_r="wireframe-rotation-slider",Za=async()=>{const{device:n,context:e,canvasFormat:t}=await cn(vr),r=ze(b(0),1),i=r.lineIndices,a=new Float32Array(B(r.vertices)),{buffer:o}=Vn(n,i),{buffer:s,bufferLayout:c}=H(n,a,"float32x4"),l=nn(n,[c],t,Ja,"line-list"),{bindGroup:u,buffers:[f]}=z(n,l,[new Float32Array(K(wn()))],"UNIFORM",0),d=yn(b(.5,.5,.5)),_=b(0,0,10),m=b(0),v=b(0,1,0),g=Cn(_,m,v),L=qi(-1.5,1.5,-1.5,1.5,0,100),I=M(Ut,L),p=M(I,g),w=x=>{const O=Oe(x,b(1,1,1)),S=M(O,d),F=M(p,S);W(n,f,new Float32Array(K(F)),0);const{pass:E,executePass:V}=hn(n,e,mn.black);E.setPipeline(l),E.setVertexBuffer(0,s),E.setIndexBuffer(o,"uint32"),E.setBindGroup(0,u),E.drawIndexed(i.length),V()},A=An(_r,w);w(A)},Ka=(n,e)=>{const t=on("Projecting a cube"),r=an(`
Along the journey in the direction of 3D scenes from 2D shapes a key stop is orthographic projection, known for its use in early game development (or in modern, as a stylistic choice).
This projection assumes a volume created by lines directly perpendicular to the image plane.

Wireframe rendering (using lines instead of triangles) is a simplification which can be used to observe the shape without having to deal with side differentiaion (through shading or unique colors).
`),i=tn(),a=en(vr),o=_n(),s=P(fn(_r,45,0,360),"Rotation in degrees about (1, 1, 1)");o.append(s),i.append(a,o),n.append(t,r,i),e.push(Za)},Qa=`struct Uniforms {
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
`,mr="perspective",no=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await cn(mr),i=ze(b(0),1),a=new Float32Array(B(i.vertices)),o=i.lineIndices,{buffer:s}=Vn(n,o),{buffer:c,bufferLayout:l}=H(n,a,"float32x4"),{buffer:u,bufferLayout:f}=H(n,new Float32Array(B([h(.5,.5,.5,1),h(0,0,1,1),h(0,1,0,1),h(0,1,1,1),h(1,0,1,1),h(1,0,0,1),h(1,1,0,1),h(1,1,1,1)])),"float32x4",1),d=nn(n,[l,f],t,Qa,"line-list"),_=b(0,0,5),m=b(0),v=b(0,1,0),g=Cn(_,m,v),L=re(45,r.width/r.height,.1,100),I=M(Ut,L),p=M(I,g),w=M(Oe(0,b(1,1,1)),yn(b(-2))),A=M(Oe(45,b(0,1,0)),yn(b(0))),x=M(yn(b(2)),Oe(45,b(1,1,0))),O=M(p,w),S=M(p,A),F=M(p,x),{bindGroup:E}=z(n,d,[new Float32Array(we([O,S,F]))],"UNIFORM",0);(()=>{const{pass:R,executePass:T}=hn(n,e,mn.black);R.setPipeline(d),R.setVertexBuffer(0,c),R.setVertexBuffer(1,u),R.setIndexBuffer(s,"uint32"),R.setBindGroup(0,E),R.drawIndexed(o.length,3),T()})()},eo=(n,e)=>{const t=on("Considering different perspectives"),r=an(`
The commonly used projection is perspective projection which imitates real life cameras and human eyes. 
A common instance of perspective projection is the pinhole camera model.

The perspective model assumes camera rays have a single point oigin (the eye point) and create a 3D trapezoidal view volume by crossing the image plane.

Another key tool in managing objects on the GPU is instancing, a conceptual sibling to the flyweight design pattern. 
Multiples of an object which can be clearly differentiated by their extrinsic attributes (pose, color, size, etc.) can be instanced. 
A single set of their intrinsic attributes is enough to generate multiple instances and then, to adjust pose for example, apply a respective model matrix. With this method three cubes can be instanced from a single cube mesh definition. 

A further subclassification of perspective projections is based on number of vanishing points they consider. A vanishing point is generated by a non-parallel principal direction. 
The base case is one-point perspective projection (left), where the two other principal directions are parallel to the image plane, but there exists also two- (middle) and three-point (right) projections with one and none parallel principal directions respectively.
    `),i=tn(),a=en(mr,{width:1028-128}),o=_n();i.append(a,o),n.append(t,r,i),e.push(no)},to=`struct Uniforms {
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
`,pr="airplane",gr="yaw-slider-airplane",xr="pitch-slider-airplane",br="roll-slider-airplane",ro=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await cn(pr),i=G(gr),a=G(xr),o=G(br),s=ze(b(0),1),c=s.lineIndices,l=new Float32Array(B(s.vertices)),{buffer:u}=Vn(n,c),{buffer:f,bufferLayout:d}=H(n,l,"float32x4"),_=nn(n,[d],t,to,"line-list"),m=b(5,5,5),v=b(0),g=b(0,1,0),L=Cn(m,v,g),I=re(35,r.width/r.height,.1,100),p=M(Ut,I),{bindGroup:w,buffers:[A]}=z(n,_,[new Float32Array([0,0,0,0,...K(L),...K(p)])],"UNIFORM",0),x=[],O=Dn(.4,.4,2),S=M(Dn(.35,.25,.35),yn(b(0,-.2,3.3))),F=M(Dn(1.7,.2,1.1),yn(b(.6))),E=M(Dn(1.7,.2,1.1),yn(b(-.6))),V=M(Dn(.2,.5,.3),yn(b(0,.5,-3.3))),R=M(Dn(.5,.1,.2),yn(b(-.9,.4,-4.3))),T=M(Dn(.5,.1,.2),yn(b(.9,.4,-4.3))),q=[O,S,F,E,V,R,T];x.push(...new Array(q.length).fill(h(.7,.7,.7)));const rn=(gn=wn())=>M(M(Dn(.1,.3,.2),gn),yn(b(0,.5,-6)));x.push(h(0,1,0));const sn=(gn=wn())=>M(M(Dn(.25,.05,.2),gn),yn(b(2,.4,-5.3))),U=(gn=wn())=>M(M(Dn(.25,.05,.2),gn),yn(b(-2,.4,-5.3)));x.push(h(1,0,0),h(1,0,0));const Y=(gn=wn())=>M(M(yn(b(-1,.1,-.5)),gn),Dn(1,.1,.3)),X=(gn=wn())=>M(M(yn(b(1,.1,-.5)),gn),Dn(1,.1,.3));x.push(h(.4,.4,1),h(.4,.4,1));const C=[...q,rn(),sn(),U(),Y(),X()],{bindGroup:$,buffers:Q}=z(n,_,[new Float32Array(we(C)),new Float32Array(B(x))],"STORAGE",1);let pn=0,bn=0,Z=0,ln=0,un=0,j=0;const N=.1,Mn=gn=>{W(n,A,new Float32Array([gn]),0);const En=1*i();ln=ln*(1-N)+En*N,pn+=ln;const Ln=1*a();un=un*(1-N)+Ln*N,bn+=un;const Yn=1*o();j=j*(1-N)+Yn*N,Z+=j;const In=Ee(-ln*20),dn=Re(-un*20),oe=j>0?Re(j*60):wn(),ge=j<0?Re(-j*60):wn(),Hn=M(M(Re(bn),Ee(pn)),$i(Z)),D=[...q.map(ne=>M(Hn,ne)),M(Hn,rn(In)),M(Hn,sn(dn)),M(Hn,U(dn)),M(Hn,Y(oe)),M(Hn,X(ge))],vn=D.map(ne=>M(Hn,ne));W(n,Q[0],new Float32Array(we(vn)),0);const{pass:Tn,executePass:ve}=hn(n,e,mn.black);Tn.setPipeline(_),Tn.setVertexBuffer(0,f),Tn.setIndexBuffer(u,"uint32"),Tn.setBindGroup(0,w),Tn.setBindGroup(1,$),Tn.drawIndexed(c.length,D.length),ve(),requestAnimationFrame(Mn)};requestAnimationFrame(Mn)},io=(n,e)=>{const t=on("About Gimbal's lock"),r=an(`
As we descend into the depths of computer graphics, rotations of objects in three dimensions will become a big part of creating interactive showcases.

An issue which appears when using Euler angles with only three angle axes (three units of freedom) is a phenomenon known as Gimbal's lock. 
The short version is that a three-axes system cannot guarantee independent rotations. Each rotation is "local" to the previous rotations.
This can be observed when making half-rotations around two axess, which eliminates the third axis (ie. it does not have an effect).

In a later section, quaternions are introduced which are four dimensional abstractions of vectors. The fourth dimension allows the rotation information to remain absolute (without a reference system). 
One may think of these are homogeneous Euler angles.
    `),i=tn(),a=en(pr),o=_n(),s=P(fn(gr,0,-1,1,.1),"Green rudder control (yaw)"),c=P(fn(xr,0,-1,1,.1),"Red elevators control (pitch)"),l=P(fn(br,0,-.5,.5,.1),"Blue ailerons control (roll)");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(ro)},ao=(n,e)=>{Ka(n,e),eo(n,e),io(n,e)},oo=`struct SceneData {
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
`,yr="graphics-lighting",Ne="rotation-around-tetrahedron",ft="subdivision-tetrahedron",wr="tetrahedron-rotation-animation-enabled",ht="diffuse-reflectance-tetrahedron",ut="specular-reflectance-tetrahedron",dt="ambient-reflectance-tetrahedron",vt="shading-type-tetrahedron",_t="shininess-tetrahedron",mt="tetrahedron-light-emission",so=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await cn(yr),i=G(Ne),a=G(ft),o=G(vt),s=G(dt),c=G(ht),l=G(ut),u=G(_t),f=G(mt),d=new Array(8).fill(0).map((ln,un)=>kt(un)),{buffer:_}=Vn(n,new Uint32Array(B(d[7].triangleIndices.map(ln=>Sn(ln))))),{buffer:m,bufferLayout:v}=H(n,new Float32Array(B(d[7].vertices)),"float32x4"),{buffer:g,bufferLayout:L}=H(n,new Float32Array(B([h(1,0,0),h(0,1,0),h(0,0,1),h(1,1,1),...new Array(d[7].vertices.length-4).fill(h(.4,.4,.4))])),"float32x4",1);Gn(n,_,new Uint32Array(B(d[a()].triangleIndices.map(ln=>Sn(ln)))),0,!0);const I=4,{multisample:p,msaaTexture:w}=pe(n,r,t,I),{createDepthTexture:A,depthStencil:x,depthStencilAttachmentFactory:O}=ae(n,r,I),S=nn(n,[v,L],t,oo,"triangle-list",{multisample:p,depthStencil:x});A();const F=Nn(i()),E=b(3*Math.sin(F),0,3*Math.cos(F)),V=b(0),R=b(0,1,0),T=Cn(E,V,R),rn=re(45,r.width/r.height,.1,100),U=M(rn,T),Y={"Gouraud shading (vertex)":0,"Phong shading (fragment)":1},{bindGroup:X,buffers:[C]}=z(n,S,[new Float32Array([...K(U),...h(...E),...$e(de(f())),...h(s(),c(),l(),u()),...h(Y[o()])])],"UNIFORM",0),$=ln=>{const un=Nn(ln),j=b(3*Math.sin(un),0,3*Math.cos(un)),N=Cn(j,V,R),gn=M(rn,N);W(n,C,new Float32Array([...K(gn),...h(...j)]),0)};An(ft,ln=>{Gn(n,_,new Uint32Array(B(d[ln].triangleIndices.map(un=>Sn(un)))),0,!0)}),An(Ne,$);let pn=!0;An(wr,()=>pn=document.getElementById(Ne).disabled=!pn),Et([vt,_t,ut,ht,dt,mt],()=>{W(n,C,new Float32Array([...$e(de(f())),...h(s(),c(),l(),u()),...h(Y[o()])]),80)});const Z=ln=>{pn&&$(ln/50);const{pass:un,executePass:j}=hn(n,e,h(.2,.2,.2),{depthStencilAttachmentFactory:O,msaaTexture:w});un.setPipeline(S),un.setVertexBuffer(0,m),un.setVertexBuffer(1,g),un.setIndexBuffer(_,"uint32"),un.setBindGroup(0,X),un.drawIndexed(d[a()].triangleCount*3),j(),requestAnimationFrame(Z)};requestAnimationFrame(Z)},co=(n,e)=>{const t=on("Shining light on tetrahedrons"),r=an(`
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
    `),i=tn(),a=en(yr),o=_n(),s=P(Qn(wr,!0),"Animated rotation",!1),c=fn(Ne,0,-180,180,1,!0),l=P(c,"Rotation around the tetrahedron"),u=P(fn(ft,4,0,7,1),"Number of tetrahedron subdivisions"),f=P(Fn(vt,["Gouraud shading (vertex)","Phong shading (fragment)"],"Gouraud shading"),"Shading type",!1),d=P(fn(ht,1,0,2,.1),"Diffuse reflectance"),_=P(fn(ut,1,0,2,.1),"Specular reflectance"),m=P(fn(_t,15,0,50,1),"Shininess"),v=P(fn(dt,.1,0,2,.1),"Ambient reflectance"),g=P(He(mt,"#ffffff"),"Light emission",!1);o.append(s,l,u,f,d,_,v,m,g),i.append(a,o),n.append(t,r,i),e.push(so)},lo=`struct SceneData {
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
`,Lr="monkey",Ir="rotation-around-monkey",fo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await cn(Lr),i=await $n(jn("models/monkey.obj"),1,!1),a=ie(i,{indicesIn3:!0}),{buffer:o}=Vn(n,a.indices),{buffer:s,bufferLayout:c}=H(n,a.vertices,"float32x4"),{buffer:l,bufferLayout:u}=H(n,a.normals,"float32x4",1),{msaaTexture:f,multisample:d}=pe(n,r,t,4),{createDepthTexture:_,depthStencil:m,depthStencilAttachmentFactory:v}=ae(n,r,4),g=nn(n,[c,u],t,lo,"triangle-list",{depthStencil:m,multisample:d,primitive:{frontFace:"ccw",cullMode:"back"}});_();const L=Nn(0),I=4,p=0,w=b(I*Math.sin(L),p,I*Math.cos(L)),A=b(0),x=b(0,1,0),O=Cn(w,A,x),F=re(30,r.width/r.height,.1,100),E=M(F,O),V=wn(),R=M(E,V),{bindGroup:T,buffers:[q]}=z(n,g,[new Float32Array([...K(R),...w,1])],"UNIFORM",0);An(Ir,U=>{const Y=Nn(U),X=b(I*Math.sin(Y),p,I*Math.cos(Y)),C=Cn(X,A,x),$=M(F,C),Q=M($,V);W(n,q,new Float32Array([...K(Q),...X,1]),0),sn()});const sn=()=>{const{pass:U,executePass:Y}=hn(n,e,mn.black,{depthStencilAttachmentFactory:v,msaaTexture:f});U.setPipeline(g),U.setVertexBuffer(0,s),U.setVertexBuffer(1,l),U.setIndexBuffer(o,"uint32"),U.setBindGroup(0,T),U.drawIndexed(a.indices.length),Y()};sn()},ho=(n,e)=>{const t=on("The Blender Monkey"),r=an(`
More interesting than primitive shapes are models created to represent specific objects. The entire graphics pipeline is made to support the display and animation of such models.

As an example, the mascot of the 3D modelling software Blender - Suzanne - is rendered to the screen below. The same lighting set up is used as with the sphere.

Another graphics feature is added to the mix - z-buffer indexing. This is the process of creating a (temporary for the time of creating the framebuffer) z-buffer. It store the z value (depth) of a fragment when it is drawn.
Each following fragment's depth value to compared to the current closest fragment and it may either be discarded (if it is covered) or it may overwrite if it is the closer (to the viewer) fragment.
    `),i=tn(),a=en(Lr),o=_n(),s=P(fn(Ir,0,-180,180,1),"Rotation around the monkey");o.append(s),i.append(a,o),n.append(t,r,i),e.push(fo)},uo=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,Ar="checkerboard-test",pt="texture-repeat-style",vo=["clamp-to-edge","repeat","mirror-repeat"],gt="magnification-checkerboard",xt="minification-checkerboard",rt=["linear","nearest"],_o=async()=>{const{device:n,context:e,canvasFormat:t}=await cn(Ar),r=G(pt),i=G(xt),a=G(gt),o=G(bt),s=new Float32Array(B([h(-4,-1,-1),h(4,-1,-1),h(4,-1,-21),h(-4,-1,-21)])),c=new Uint32Array([0,1,2,0,2,3]),l=new Float32Array(B([y(-1.5,0),y(2.5,0),y(2.5,10),y(-1.5,10)])),{buffer:u}=Vn(n,c),{buffer:f,bufferLayout:d}=H(n,s,"float32x4"),{buffer:_,bufferLayout:m}=H(n,l,"float32x2",1),v=nn(n,[d,m],t,uo,"triangle-list"),g=Zi(64,8,8),L=Ke(g,64,!0),I=async()=>{const{texture:p,sampler:w}=Kn(n,g,64,64,{addressModeU:r(),addressModeV:r(),minFilter:i(),magFilter:a(),mipmapFilter:o()},{mips:L}),A=Un(n,v,p,w),{pass:x,executePass:O}=hn(n,e,mn.blueScreenBlue);x.setPipeline(v),x.setVertexBuffer(0,f),x.setVertexBuffer(1,_),x.setIndexBuffer(u,"uint32"),x.setBindGroup(0,A),x.drawIndexed(6),O()};Et([pt,gt,xt,bt],I),I()},bt="mipmap-select-checkerboard",mo=(n,e)=>{const t=on("The unseen end of the checkers board"),r=an(`
Applying texture to objects is rather trivial. The hard part comes with trying to make the texture work properly in the scene and fighting at the same time with the two elements of texture space immutability - magnification and minification or in simple words, when a texel and a pixel are not of the same size (or even aligned for that matter).

Magnification happens when texture elements (texels) cover multiple pixels. This means that many pixels have to be the color of the single texel they correlate to. Blurring can be used to smooth the rough edges created by the enlarged texture objects.

The more complex counterpart is minification, which means that a single pixel contains more than one texel. In this case color mixing (averaging) has to be applied to get a single deterministic result.

Another method for manipulating textures in space is mipmapping (mip from the latin phrase multum in parvo, "much in a small space"). Mip maps are multiple variants of the same texture in different levels of details (ie. resolution).
According to the need, a lower resolution texture can be selected to address the phenomenon of aliasing or moiré patterns. 

In the example below, the checkerboard texture has a couple levels of mipmaps created. Each level has a different color to more easily observe the transition.
The latter layers (where the texture is the farthest from the camera and therefore a lower resolution texture is called for) is just a grey blob. At this point, the checkerboard pattern has been averaged into grey.
`),i=tn(),a=en(Ar),o=_n(),s=P(Fn(pt,vo,"repeat"),"Texture edge behaviour",!1),c=P(Fn(xt,rt,"nearest"),"Minification behaviour",!1),l=P(Fn(gt,rt,"nearest"),"Magnification behaviour",!1),u=P(Fn(bt,rt,"nearest"),"Mipmap behaviour",!1);o.append(s,c,l,u),i.append(a,o),n.append(t,r,i),e.push(_o)},po=`struct SceneData {
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
`,Sr="earth",go=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await cn(Sr),{textureData:i,width:a,height:o}=await le(jn("textures/earth.jpg")),s=kt(7),{buffer:c}=Vn(n,new Uint32Array(B(s.triangleIndices.map(X=>Sn(X))))),{buffer:l,bufferLayout:u}=H(n,new Float32Array(B(s.vertices)),"float32x4"),{buffer:f,bufferLayout:d}=H(n,new Float32Array(B([h(1,0,0),h(0,1,0),h(0,0,1),h(1,1,1),...new Array(s.vertices.length-4).fill(h(.4,.4,.4))])),"float32x4",1),_=4,{multisample:m,msaaTexture:v}=pe(n,r,t,_),{depthStencil:g,depthStencilAttachmentFactory:L}=ae(n,r,_),I=nn(n,[u,d],t,po,"triangle-list",{multisample:m,depthStencil:g}),{sampler:p,texture:w}=Kn(n,i,a,o,{minFilter:"nearest",magFilter:"nearest"}),A=Un(n,I,w,p,1),x=Nn(0),O=b(3*Math.sin(x),0,3*Math.cos(x)),S=b(0),F=b(0,1,0),E=Cn(O,S,F),R=re(45,r.width/r.height,.1,100),q=M(R,E),{bindGroup:rn,buffers:[sn]}=z(n,I,[new Float32Array(K(q))],"UNIFORM",0),U=X=>{const C=Nn(X),$=b(3*Math.sin(C),Math.cos(C),3*Math.cos(C)),Q=Cn($,S,F),bn=M(R,Q);W(n,sn,new Float32Array(K(bn)),0)},Y=X=>{U(X/50);const{pass:C,executePass:$}=hn(n,e,h(.5,.1,.5),{depthStencilAttachmentFactory:L,msaaTexture:v});C.setPipeline(I),C.setVertexBuffer(0,l),C.setVertexBuffer(1,f),C.setIndexBuffer(c,"uint32"),C.setBindGroup(0,rn),C.setBindGroup(1,A),C.drawIndexed(s.triangleCount*3),$(),requestAnimationFrame(Y)};requestAnimationFrame(Y)},xo=(n,e)=>{const t=on("Earth ball"),r=an(`
Using the sphere algorithm from the previous section combined with the ability to apply textures, a simplified model of the Earth can be created.

The sphere texture is a two dimensional rectangle and has to be mapped to a sphere. This is done with a uv-mapping function, which in this case is spherical uv-mapping.

To address magnification and minification, settings can be fiddled with, but in some cases it may not be possible to find a perfect solution.
With the earth texture, certain regions with high elevation are prone to aliasing issues due to many sudden changes in color values. 
This could be fixed by applying a heightmap which could stretch the crowded texels over a larger surface, but on a flat surface could instead be treated with applied smoothing filters.

Note: the earth texture is quite large and may take some time to load into the browser.
`),i=tn(),a=en(Sr),o=_n();o.append(),i.append(a,o),n.append(t,r,i),e.push(go)},bo=(n,e)=>{mo(n,e),xo(n,e)},yo=`@group(0) @binding(0) var cube_sampler : sampler;
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
`,Tr="texture-sphere-with-quad",Br="env-sphere-reflect-type",Rr={"Faux reflection":0,"Mirror reflection":1,"Show normal map":2,"Bump reflection":3},wo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await cn(Tr),[i,...a]=await Promise.all(["textures/normalmap.png","textures/cubemap/cm_left.png","textures/cubemap/cm_right.png","textures/cubemap/cm_top.png","textures/cubemap/cm_bottom.png","textures/cubemap/cm_back.png","textures/cubemap/cm_front.png"].map(Ln=>le(jn(Ln)))),o=b(0,0,3),s=b(0),c=b(0,1,0),l=Cn(o,s,c),f=re(90,r.width/r.height,.1,100),d=M(f,l),_=Ht(f),m=Ht(l),v=Wi(m,[0,0],[3,3]),g=zn(),L=Ji(v,g),I=M(L,_),p=kt(7),w=B(p.triangleIndices.map(Ln=>Sn(Ln))),A=B(p.vertices.map(Ln=>Fe(Ln,d))),x=.999,O=B([h(-1,-1,x,1),h(1,-1,x,1),h(-1,1,x,1),h(1,1,x,1)]),S=[p.vertices.length+0,p.vertices.length+1,p.vertices.length+2,p.vertices.length+1,p.vertices.length+3,p.vertices.length+2],{buffer:F}=Vn(n,new Uint32Array([...w,...S])),{buffer:E,bufferLayout:V}=H(n,new Float32Array([...A,...O]),"float32x4"),{buffer:R,bufferLayout:T}=H(n,new Float32Array([...B(p.vertices),...O]),"float32x4",1),{buffer:q,bufferLayout:rn}=H(n,new Float32Array([...Array(p.vertices.length).fill(0),...Array(4).fill(1)]),"uint32",2),sn=4,{multisample:U,msaaTexture:Y}=pe(n,r,t,sn),{depthStencil:X,depthStencilAttachmentFactory:C}=ae(n,r,sn),$=nn(n,[V,T,rn],t,yo,"triangle-list",{multisample:U,depthStencil:X}),{sampler:Q,cubemapTexture:pn}=Fa(n,a.map(Ln=>Ln.textureData),a[0].width,a[0].height),bn=Un(n,$,pn,Q,0,{createViewOverwrite:{dimension:"cube"}}),{bindGroup:Z,buffers:[ln,un,j]}=z(n,$,[new Float32Array(we([wn(),I])),new Float32Array([...o]),new Uint32Array([0])],"UNIFORM",1),{texture:N,sampler:Mn}=Kn(n,i.textureData,i.width,i.height),gn=Un(n,$,N,Mn,2),En=Ln=>{const Yn=Rr[Ln];Gn(n,j,new Uint32Array([Yn]),0);const{pass:In,executePass:dn}=hn(n,e,h(.5,.1,.5),{depthStencilAttachmentFactory:C,msaaTexture:Y});In.setPipeline($),In.setVertexBuffer(0,E),In.setVertexBuffer(1,R),In.setVertexBuffer(2,q),In.setIndexBuffer(F,"uint32"),In.setBindGroup(0,bn),In.setBindGroup(1,Z),In.setBindGroup(2,gn),In.drawIndexed(p.triangleCount*3+S.length),dn()};En(An(Br,En))},Lo=(n,e)=>{const t=on("A map to the environment"),r=an(`
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
`),i=tn(),a=en(Tr),o=_n(),s=P(Fn(Br,Object.keys(Rr),"Faux reflection"),"Reflection type",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(wo)},Io=(n,e)=>{Lo(n,e)},Jt=`@group(0) @binding(0) var marble_sampler : sampler;
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
`,Pr="shadow-quads",Ao=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await cn(Pr),i=await le(jn("textures/xamp23.png")),a=new Uint32Array([0,1,2,0,2,3]),o=new Float32Array(B([y(0,0),y(1,0),y(1,1),y(0,1)])),s=new Float32Array(B([h(-2,-1,-1),h(2,-1,-1),h(2,-1,-5),h(-2,-1,-5)])),c=new Float32Array(B([h(-1,-1,-2.5),h(-1,-1,-3),h(-1,0,-3),h(-1,0,-2.5)])),l=new Float32Array(B([h(.25,-.5,-1.25),h(.75,-.5,-1.25),h(.75,-.5,-1.75),h(.25,-.5,-1.75)])),{buffer:u}=Vn(n,new Uint32Array([...a,...a.map(Q=>Q+4),...a.map(Q=>Q+8),...a.map(Q=>Q+12),...a.map(Q=>Q+16)])),{buffer:f,bufferLayout:d}=H(n,new Float32Array([...s,...c,...l,...c,...l]),"float32x4"),{buffer:_,bufferLayout:m}=H(n,new Float32Array([...o]),"float32x2",1),{depthStencil:v,depthStencilAttachmentFactory:g}=ae(n,r,1),L=nn(n,[d,m],t,Jt,"triangle-list",{depthStencil:v}),{depthStencil:I}=ae(n,r,1,{depthStencilOverwrites:{depthCompare:"greater"}}),p=nn(n,[d,m],t,Jt,"triangle-list",{depthStencil:I,primitive:{cullMode:"none"}},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),w=Ke(i.textureData,i.width),{texture:A,sampler:x}=Kn(n,i.textureData,i.width,i.height,{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest",mipmapFilter:"nearest"},{mips:w}),O=Un(n,L,A,x),{texture:S,sampler:F}=Kn(n,new Uint8Array([255,0,0,255]),1,1),E=Un(n,L,S,F),{texture:V,sampler:R}=Kn(n,new Uint8Array([0,0,0,125]),1,1),T=Un(n,L,V,R),{bindGroup:q}=z(n,L,[new Float32Array(K(wn()))],"UNIFORM",1),{bindGroup:rn,buffers:[sn]}=z(n,L,[new Float32Array(K(wn()))],"UNIFORM",1),U=-1-2-.001,Y=zn(1,0,0,0,0,1,0,0,0,0,1,0,0,1/U,0,0),X=wn(),C=Q=>{const pn=yn(Q),bn=yn(Zn(Q,-1)),Z=M(M(M(pn,Y),bn),X);W(n,sn,new Float32Array(K(Z)),0)},$=Q=>{const pn=Q/1e3,bn=b(2*Math.cos(pn),2,2*Math.sin(pn)-2);C(bn);const{pass:Z,executePass:ln}=hn(n,e,mn.blueScreenBlue,{depthStencilAttachmentFactory:g});Z.setVertexBuffer(0,f),Z.setVertexBuffer(1,_),Z.setIndexBuffer(u,"uint32"),Z.setPipeline(L),Z.setBindGroup(0,O),Z.setBindGroup(1,q),Z.drawIndexed(6),Z.setPipeline(p),Z.setBindGroup(1,rn),Z.setBindGroup(0,T),Z.drawIndexed(12,void 0,6),Z.setPipeline(L),Z.setBindGroup(1,q),Z.setBindGroup(0,E),Z.drawIndexed(12,void 0,18),ln(),requestAnimationFrame($)};requestAnimationFrame($)},So=(n,e)=>{const t=on("Shadow as a shape"),r=an(`
Implementing shadows in the rasterization pipeline is no simple task. Shapes have very limited information about the existence of other shapes out of the box.
The entire system is based on a simple ordered drawing of shapes to the screen.

There is a way to implement shadows while staying in the shapes only paradigm - projection shadows. The concept is simple, shadows are in fact copies of their obstructing object.
The projection shadow objects are drawn with the appropriate transformation matrix (depending on the light source).

To make sure shadows only exist on the surfaces of shadow-catching objects (such as the plane in the example below and not beyond it), 
clever manipulation of the z-buffer can be used to make sure a shape is only drawn if there exists a fragement beneath it.
Further modification of the draw orders or implementations of draw layers would allow mixing and matching shadow casters and shadow catchers.
    `),i=tn(),a=en(Pr),o=_n();o.append(),i.append(a,o),n.append(t,r,i),e.push(Ao)},To=(n,e)=>{So(n,e)},Bo=`@group(0) @binding(0) var marble_sampler : sampler;
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
`,Ro=`@group(0) @binding(0) var<uniform> teapot_model : mat4x4f;
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
`,Po=`@group(0) @binding(0) var<uniform> shadow_model : mat4x4f;

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
`,Or="teapot-proj-shadow",Fr="teapot-movement-teapot",Mr="light-movement-teapot",Oo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await cn(Or),i=G(Fr,"checked"),a=G(Mr,"checked"),o=await le(jn("textures/xamp23.png")),s=await $n(jn("models/teapot.obj"),.25,!1),c=ie(s,{indicesIn3:!0}),{depthStencil:l,depthStencilAttachmentFactory:u}=ae(n,r,4),{depthStencil:f}=ae(n,r,4,{depthStencilOverwrites:{depthCompare:"greater"}}),{msaaTexture:d,multisample:_}=pe(n,r,t,4),{buffer:m}=Vn(n,c.indices),{buffer:v,bufferLayout:g}=H(n,c.vertices,"float32x4"),{buffer:L,bufferLayout:I}=H(n,c.normals,"float32x4",1),{buffer:p,bufferLayout:w}=H(n,c.colors,"float32x4",2),A=nn(n,[g,I,w],t,Ro,"triangle-list",{depthStencil:l,multisample:_}),x=nn(n,[g],t,Po,"triangle-list",{depthStencil:f,multisample:_,primitive:{cullMode:"front"}},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),O=new Uint32Array([0,1,2,0,2,3]),S=new Float32Array(B([y(0,0),y(1,0),y(1,1),y(0,1)])),F=new Float32Array(B([h(-2,-1,-1),h(2,-1,-1),h(2,-1,-5),h(-2,-1,-5)])),{buffer:E}=Vn(n,new Uint32Array([...O])),{buffer:V,bufferLayout:R}=H(n,new Float32Array([...F]),"float32x4"),{buffer:T,bufferLayout:q}=H(n,new Float32Array([...S]),"float32x2",1),rn=nn(n,[R,q],t,Bo,"triangle-list",{depthStencil:l,multisample:_}),sn=Ke(o.textureData,o.width),{texture:U,sampler:Y}=Kn(n,o.textureData,o.width,o.height,{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest",mipmapFilter:"nearest"},{mips:sn}),X=Un(n,rn,U,Y),{bindGroup:C,buffers:[$,Q]}=z(n,A,[new Float32Array(K(zn())),new Float32Array(b())],"UNIFORM",0),{bindGroup:pn,buffers:[bn]}=z(n,x,[new Float32Array(K(wn()))],"UNIFORM",0),Z=-1-2-.001,ln=zn(1,0,0,0,0,1,0,0,0,0,1,0,0,1/Z,0,0),un=(En,Ln)=>{const Yn=yn(En),In=yn(Zn(En,-1)),dn=M(M(M(Yn,ln),In),Ln);W(n,bn,new Float32Array(K(dn)),0)};let j=0,N=0,Mn=0;const gn=En=>{const Ln=(En-Mn)/1e3;j+=i()?Ln:0,N+=a()?Ln:0;const Yn=b(2*Math.cos(N),2,2*Math.sin(N)-2),In=yn(b(0,(Math.cos(j)*3-1)/4,-3));un(Yn,In),W(n,$,new Float32Array(K(In)),0),W(n,Q,new Float32Array(Yn),0);const{pass:dn,executePass:oe}=hn(n,e,mn.blueScreenBlue,{depthStencilAttachmentFactory:u,msaaTexture:d});dn.setPipeline(rn),dn.setVertexBuffer(0,V),dn.setVertexBuffer(1,T),dn.setIndexBuffer(E,"uint32"),dn.setBindGroup(0,X),dn.drawIndexed(6),dn.setPipeline(x),dn.setBindGroup(0,pn),dn.setVertexBuffer(0,v),dn.setIndexBuffer(m,"uint32"),dn.drawIndexed(c.indices.length),dn.setPipeline(A),dn.setVertexBuffer(0,v),dn.setVertexBuffer(1,L),dn.setVertexBuffer(2,p),dn.setIndexBuffer(m,"uint32"),dn.setBindGroup(0,C),dn.drawIndexed(c.indices.length),oe(),Mn=En,requestAnimationFrame(gn)};requestAnimationFrame(gn)},Fo=(n,e)=>{const t=on("Tea time"),r=an(`
Before venturing into the topic of shadow maps, another example of projection shadows (previous section) is shown to provide a basis of comparison.

The opacity of the teapot's shadow is generated by enabling blending in the render pipeline configuration. 
This is required to let the projected shape mix colors with the fragements beneath it, instead of overwriting them in the z-buffer.
`),i=tn(),a=en(Or),o=_n(),s=P(Qn(Fr,!0),"Teapot movement",!1),c=P(Qn(Mr,!0),"Light movement",!1);o.append(s,c),i.append(a,o),n.append(t,r,i),e.push(Oo)},Mo=`@group(0) @binding(0) var marble_sampler : sampler;
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
`,Eo=`@group(0) @binding(0) var<uniform> teapot_model : mat4x4f;
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
`,Vo=`@group(0) @binding(0) var<uniform> model : mat4x4f;
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
`,We="shadow-mapping",Er="teapot-movement-shadow-mapping",Vr="light-movement-shadow-mapping",zo=async()=>{const n=G(Er,"checked"),e=G(Vr,"checked"),t=await le(jn("textures/xamp23.png")),r=await $n(jn("models/teapot.obj"),.25,!1),i=ie(r,{indicesIn3:!0}),{device:a,context:o,canvasFormat:s,canvas:c}=await cn(We),l=document.getElementById(We+"-shadow"),u=l.getContext("gpupresent")||l.getContext("webgpu");u.configure({device:a,format:s});const{depthStencil:f,depthStencilAttachmentFactory:d}=ae(a,c,1),{buffer:_}=Vn(a,i.indices),{buffer:m,bufferLayout:v}=H(a,i.vertices,"float32x4"),{buffer:g,bufferLayout:L}=H(a,i.normals,"float32x4",1),{buffer:I,bufferLayout:p}=H(a,i.colors,"float32x4",2),w=nn(a,[v,L,p],s,Eo,"triangle-list",{depthStencil:f}),A=a.createTexture({size:{width:l.width,height:l.height,depthOrArrayLayers:1},mipLevelCount:1,sampleCount:1,dimension:"2d",format:"rgba32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC}),x=A.createView(),O=a.createShaderModule({code:Vo}),S=a.createRenderPipeline({layout:"auto",vertex:{module:O,entryPoint:"main_vs",buffers:[v]},fragment:{module:O,entryPoint:"main_fs",targets:[{format:s},{format:"rgba32float"}]},primitive:{cullMode:"none",topology:"triangle-list"}}),{bindGroup:F,buffers:[E,V]}=z(a,S,[new Float32Array(K(wn())),new Float32Array(K(zn()))],"UNIFORM",0),R=new Uint32Array([0,1,2,0,2,3]),T=new Float32Array(B([y(0,0),y(1,0),y(1,1),y(0,1)])),q=new Float32Array(B([h(-2,-1,-1),h(2,-1,-1),h(2,-1,-5),h(-2,-1,-5)])),{buffer:rn}=Vn(a,new Uint32Array([...R])),{buffer:sn,bufferLayout:U}=H(a,new Float32Array([...q]),"float32x4"),{buffer:Y,bufferLayout:X}=H(a,new Float32Array([...T]),"float32x2",1),C=nn(a,[U,X],s,Mo,"triangle-list",{depthStencil:f}),$=a.createBindGroup({layout:C.getBindGroupLayout(2),entries:[{binding:0,resource:A.createView()}]}),Q=new Float32Array(K(re(90,1,.001,6))),pn=D=>{const vn=re(100,1,.01,4),Tn=Cn(D,b(0,-1,-3),er.up);return M(vn,Tn)},bn=D=>{const vn=new Float32Array(K(pn(D)));W(a,V,vn,0),W(a,un,vn,0)},{bindGroup:Z,buffers:[ln,un,j]}=z(a,C,[Q,new Float32Array(K(zn())),new Float32Array(K(zn()))],"UNIFORM",1),N=Ke(t.textureData,t.width),{texture:Mn,sampler:gn}=Kn(a,t.textureData,t.width,t.height,{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest",mipmapFilter:"nearest"},{mips:N}),En=Un(a,C,Mn,gn),{bindGroup:Ln,buffers:[Yn,In]}=z(a,w,[new Float32Array(K(zn())),new Float32Array(b()),Q],"UNIFORM",0);let dn=0,oe=0,ge=0;const Hn=D=>{const vn=(D-ge)/1e3;dn+=n()?vn:0,oe+=e()?vn:0;const Tn=b(2*Math.cos(oe),2,2*Math.sin(oe)-2);W(a,In,new Float32Array(Tn),0),bn(Tn);const ve=yn(b(0,(Math.cos(dn)*3-1)/4,-3)),ne=new Float32Array(K(ve));W(a,Yn,ne,0),W(a,E,ne,0),W(a,j,ne,0);const Se=a.createCommandEncoder(),ue=Se.beginRenderPass({colorAttachments:[{view:u.getCurrentTexture().createView(),loadOp:"clear",clearValue:{r:0,g:0,b:0,a:1},storeOp:"store"},{view:x,loadOp:"clear",clearValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]});ue.setPipeline(S),ue.setVertexBuffer(0,m),ue.setIndexBuffer(_,"uint32"),ue.setBindGroup(0,F),ue.drawIndexed(i.indices.length),ue.end();const On=Se.beginRenderPass({colorAttachments:[{view:o.getCurrentTexture().createView(),loadOp:"clear",clearValue:mn.blueScreenBlue,storeOp:"store"}],depthStencilAttachment:d()});On.setPipeline(C),On.setVertexBuffer(0,sn),On.setVertexBuffer(1,Y),On.setIndexBuffer(rn,"uint32"),On.setBindGroup(0,En),On.setBindGroup(1,Z),On.setBindGroup(2,$),On.drawIndexed(6),On.setPipeline(w),On.setVertexBuffer(0,m),On.setVertexBuffer(1,g),On.setVertexBuffer(2,I),On.setIndexBuffer(_,"uint32"),On.setBindGroup(0,Ln),On.drawIndexed(i.indices.length),On.end(),a.queue.submit([Se.finish()]),ge=D,requestAnimationFrame(Hn)};requestAnimationFrame(Hn)},Co=(n,e)=>{const t=on("Tea time 2: the tea that wasn't"),r=an(`
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
`),i=tn(),a=en(We),o=_n(),s=P(Qn(Er,!0),"Teapot movement",!1),c=P(Qn(Vr,!0),"Light movement",!1);o.append(s,c),i.append(a,o);const l=tn(),u=en(We+"-shadow");l.append(u),n.append(t,r,i,l),e.push(zo)},ko=(n,e)=>{Fo(n,e),Co(n,e)},Go=`struct SceneData {
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
`,yt="camera-movement",zr="movement-type-cam-movement",Uo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await cn(yt),i=G(zr),a=await $n(jn("models/monkey.obj"),1,!1),o=ie(a,{indicesIn3:!0}),{buffer:s}=Vn(n,o.indices),{buffer:c,bufferLayout:l}=H(n,o.vertices,"float32x4"),{buffer:u,bufferLayout:f}=H(n,o.normals,"float32x4",1),{msaaTexture:d,multisample:_}=pe(n,r,t,4),{depthStencil:m,depthStencilAttachmentFactory:v}=ae(n,r,4),g=nn(n,[l,f],t,Go,"triangle-list",{depthStencil:m,multisample:_}),L=b(0,0,5);let I=b(0,0,5);const p=b(0);let w=b();const A=b(0,1,0);let x=b(0,1,0);const O=Cn(L,p,A),F=re(30,r.width/r.height,.1,100),E=M(F,O),V=wn(),R=M(E,V),{bindGroup:T,buffers:[q]}=z(n,g,[new Float32Array([...K(R),...L,1])],"UNIFORM",0),rn=1,sn=.01;let U=i(),Y=0,X=0,C=0,$=0,Q=0,pn=0,bn=Aa();const Z=D=>se(D,0,512,-1,1);let ln=y(),un=y(),j=0;const N=D=>{j=0,ln=y(D.x,D.y),En=0,Y=D.x,X=D.y,U=i()},Mn=D=>{if((U==="Dollying"||U==="Panning")&&(Q=sn*(D.x-Y),pn=-sn*(D.y-X)),U==="Quaternion rotation"||U==="Euler rotation"){C+=-rn*(D.x-Y),$+=-rn*(D.y-X);const vn=-Z(Y),Tn=Z(X),ve=-Z(D.x),ne=Z(D.y),Se=Math.sqrt(vn*vn+Tn*Tn),ue=Math.sqrt(ve*ve+ne*ne),On=ke=>ke>1/Math.sqrt(2)?1/(2*ke):Math.sqrt(1-ke*ke),Vi=b(vn,Tn,On(Se)),zi=b(ve,ne,On(ue)),Ci=Ba(Vi,zi);bn=Xe(bn,Ci)}Y=D.x,X=D.y},gn=D=>{if(Q=0,pn=0,U!=="Quaternion rotation"||(un=y(D.x,D.y),rr(ln,un)))return;const vn=_e(un,ln);j=Math.min(Ct(vn),20)};let En=0;const Ln=()=>{if(U!=="Quaternion rotation"){j=0;return}Y=ln[0],X=ln[1];const D=j*Math.exp(-En/150),vn=k(ln,Zn(qn(_e(un,ln)),D));j<.2&&(j=0),En+=1,Mn({x:vn[0],y:vn[1]})};at(yt,{onStart:N,onMove:Mn,onEnd:gn});const Yn=()=>{const D=M(Re($),Ee(C)),vn=Fe(L,D),Tn=Fe(A,D);return{view:Cn(vn,p,Tn),eye:vn}},In=()=>{const D=Sn(Pe([...x,1],bn)),vn=Sn(Pe([...I,1],bn));return{view:Cn(vn,w,D),eye:vn}},dn=()=>(I[2]+=pn,In()),oe=()=>{const D=Zn(Sn(Pe(h(1),bn)),Q),vn=Zn(Sn(Pe(h(0,1),bn)),pn);return w=_e(w,k(D,vn)),In()},ge=()=>{const D={"Euler rotation":Yn,"Quaternion rotation":In,Dollying:dn,Panning:oe}[i()](),vn=M(F,D.view),Tn=M(vn,V);W(n,q,new Float32Array([...K(Tn),...D.eye,1]),0)},Hn=()=>{j>0&&Ln(),ge();const{pass:D,executePass:vn}=hn(n,e,mn.black,{depthStencilAttachmentFactory:v,msaaTexture:d});D.setPipeline(g),D.setVertexBuffer(0,c),D.setVertexBuffer(1,u),D.setIndexBuffer(s,"uint32"),D.setBindGroup(0,T),D.drawIndexed(o.indices.length),vn(),requestAnimationFrame(Hn)};requestAnimationFrame(Hn)},jo=(n,e)=>{const t=on("Quaternions - engineering space magic"),r=an(`
Quaternions get a bad reputation due their abstract complexity and use of spooky imaginary numbers. But looking past the quaternion mathematical definition, it helps to understand the concept and foremost, the purpose of the enigmatic quaternion.

The quaternion addresses an issue which was mentioned earlier - Gimbal's lock. Using only three degrees of freedom to control rotation results in two axis "overpowering" the third - or in other words, rotations are local and impact each other.
Quaternions allow "absolute" rotation where the reference is world space. 
The fourth degree enables the quaternion to store more information about the rotation which in turn enables the rotation to always be in the correct direction relative to the camera or world space.

In the example below it is easy to obfuscate up one of the axes of rotation (where only two are being manipulated). One half rotation around the y-axis will flip the direction of rotation, while the acting "force" did not change its form. Changing to quaternion rotation solves this issue. the applied rotation is always the same, no matter what the previous rotation was.

The quaternion rotation is implemented with trackball movement which simulates the use of trackball peripheral device. The trackball allows the user to rotate in three directions unlike the mouse which is bound to the two dimensional plane. In the canvas below (when in quaternion rotation mode), the moving along the center axes of the canvas will rotated strictly about the respective axis, whereas movement along the edges of the canvas will generate more complex rotations involving the third rotation axis (depth).

Two more camera movement options are implemented - panning and dollying - which are translational movements along the parallel plane and along the perpendicular plane respectively.
`),i=tn(),a=en(yt),o=_n(),s=P(Fn(zr,["Euler rotation","Quaternion rotation","Dollying","Panning"],"Quaternion rotation"),"Movement type",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(Uo)},No=(n,e)=>{jo(n,e)},Do=(n,e)=>({intrinsics:re(85,1,.001,100),extrinsics:Cr(n,e)}),Cr=(n,e)=>{const t=k(n,e);return Cn(n,t,b(0,1,0))},wt=n=>M(n.intrinsics,n.extrinsics),Zt=n=>"instances"in n;var xn=(n=>(n[n.OUT_OF_BOUNDS=-1]="OUT_OF_BOUNDS",n[n.EMPTY=0]="EMPTY",n[n.NORMAL=1]="NORMAL",n[n.PICKUP=2]="PICKUP",n[n.SPAWN=3]="SPAWN",n[n.END=4]="END",n[n.LIGHT=5]="LIGHT",n))(xn||{}),J=(n=>(n[n.NORTH=1]="NORTH",n[n.EAST=2]="EAST",n[n.SOUTH=4]="SOUTH",n[n.WEST=8]="WEST",n))(J||{});const Ho=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;\r
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
`,qo={[J.NORTH]:J.SOUTH,[J.EAST]:J.WEST,[J.SOUTH]:J.NORTH,[J.WEST]:J.EAST},kr=n=>{const e=[];n&J.NORTH&&e.push(J.NORTH),n&J.EAST&&e.push(J.EAST),n&J.SOUTH&&e.push(J.SOUTH),n&J.WEST&&e.push(J.WEST);const t=Math.round(Math.random()*e.length-.5);return e[t]},Gr={1:y(0,1),2:y(1,0),4:y(0,-1),8:y(-1,0)},Lt={[J.NORTH]:h(0,0,1,0),[J.EAST]:h(1,0,0,0),[J.SOUTH]:h(0,0,-1,0),[J.WEST]:h(-1,0,0,0)},Wn=12,ee=(n,e,t)=>{n[e[0]][e[1]]=t},Je=(n,e)=>e[1]>=0&&e[1]<Wn&&e[0]>=0&&e[0]<Wn?n[e[0]][e[1]]:xn.OUT_OF_BOUNDS,Ue=(n,e)=>Je(n,e)===xn.EMPTY,Xn=(n,e)=>{const t=Je(n,e);return t===xn.EMPTY||t===xn.OUT_OF_BOUNDS},$o=(n,e,t)=>{switch(t){case J.NORTH:return Xn(n,k(e,y(-1,1)))&&Ue(n,k(e,y(0,1)))&&Xn(n,k(e,y(1,1)));case J.EAST:return Xn(n,k(e,y(1,1)))&&Ue(n,k(e,y(1,0)))&&Xn(n,k(e,y(1,-1)));case J.SOUTH:return Xn(n,k(e,y(-1,-1)))&&Ue(n,k(e,y(0,-1)))&&Xn(n,k(e,y(1,-1)));case J.WEST:return Xn(n,k(e,y(-1,1)))&&Ue(n,k(e,y(-1,0)))&&Xn(n,k(e,y(-1,-1)))}return!1},Yo=(n,e)=>{const t=!Xn(n,k(e,y(0,1)))&&!Xn(n,k(e,y(0,-1))),r=!Xn(n,k(e,y(1,0)))&&!Xn(n,k(e,y(-1,0)));return t||r},Xo=()=>Math.random()<.15?xn.LIGHT:xn.NORMAL,Wo=(n,e)=>(ee(n,k(e,y(1,0)),xn.NORMAL),ee(n,k(e,y(0,0)),xn.SPAWN),ee(n,k(e,y(-1,0)),xn.NORMAL),ee(n,k(e,y(1,1)),xn.LIGHT),ee(n,k(e,y(0,1)),xn.NORMAL),ee(n,k(e,y(-1,1)),xn.LIGHT),ee(n,k(e,y(1,2)),xn.NORMAL),ee(n,k(e,y(0,2)),xn.NORMAL),ee(n,k(e,y(-1,2)),xn.NORMAL),k(e,y(0,3))),Jo=()=>{const n=Array.from(Array(Wn).fill(null),()=>Array(Wn).fill(xn.EMPTY)),e=y(Wn/2,Wn/2),t=Wo(n,e);let r=!1;const i=a=>{const o=Yo(n,a),s=Xo();if(s===xn.EMPTY||o)return;ee(n,a,s);let c=0;const l=[J.NORTH,J.EAST,J.SOUTH,J.WEST];l.sort(()=>Math.sign(Math.random()*2-1));for(let u=0;u<4;u++){const f=l[u];if(!$o(n,a,f)||s===xn.LIGHT&&c>=3)continue;const d=k(a,Gr[f]);i(d),++c}c===0&&!r&&(ee(n,a,xn.END),r=!0)};return i(t),{map:n,center:e}},Zo=n=>{const e=[],t=[];let r=null;const i=Array.from(Array(Wn).fill(null),()=>Array(Wn).fill(null));for(let a=0;a<n.length;a++)for(let o=0;o<n[a].length;o++){const s=y(o,a),c=Je(n,s);if(c===xn.EMPTY)continue;let l=0;for(let f=0;f<4;f++){const d=1<<f,_=Je(n,k(s,Gr[d]));_!==xn.OUT_OF_BOUNDS&&_!==xn.EMPTY&&(l+=1<<f)}const u={position:s,cardinality:l,type:c};e.push(u),i[o][a]=u,c===xn.LIGHT&&t.push(u),c===xn.END&&(r=u)}return{tileSet:{allTiles:e,lightTiles:t,endTile:r},tileMap:i}},Ko=()=>{const{map:n,center:e}=Jo(),{tileSet:t,tileMap:r}=Zo(n);return{tileSet:t,tileMap:r,center:e}},Qo=n=>y(Math.round(n[0]/Jn+Wn/2),Math.round(n[2]/Jn+Wn/2)),Le=n=>b(Jn*(n[0]-Wn/2),0,Jn*(n[1]-Wn/2)),ns=n=>{let e=new Float32Array,t=new Float32Array,r=new Float32Array,i=[];for(const a of n){const o=us(a);e=new Float32Array([...e,...o.vertices]),t=new Float32Array([...t,...o.normals]),r=new Float32Array([...r,...o.uvs]),i=[...i,...o.lights]}return{vertices:e,normals:t,uvs:r,lights:i}},es=(n,e)=>{const t=Qo(e),r=n[t[0]][t[1]];return r===null?(console.error("next does not exist"),null):r},ts=async({device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:r,depthStencilTextureView:i},multisampleData:{msaaTextureView:a,multisample:o}}},s,{shadowMapTexture:c,lightSourcesBuffer:l,activeLightIndicesBuffer:u},{playerPerspectiveBuffer:f,playerPositionBuffer:d})=>{const{texture:_,sampler:m}=await Ye(n,"game/dungeon_textures_albedo.png"),{buffer:v,bufferLayout:g}=H(n,s.vertices,"float32x4"),{buffer:L,bufferLayout:I}=H(n,s.normals,"float32x4",1),{buffer:p,bufferLayout:w}=H(n,s.uvs,"float32x2",2),A=nn(n,[g,I,w],t,Ho,"triangle-list",{primitive:{frontFace:"ccw",cullMode:"front"},depthStencil:r,multisample:o},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),x=n.createBindGroup({layout:A.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:f}},{binding:1,resource:{buffer:d}}]}),O=Un(n,A,_,m,1),S=n.createBindGroup({layout:A.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:l}},{binding:1,resource:c.createView()},{binding:2,resource:{buffer:u}}]});return{pass:E=>{const V={view:a,resolveTarget:e.getCurrentTexture().createView(),loadOp:"clear",clearValue:mn.black,storeOp:"store"},R=E.beginRenderPass({colorAttachments:[V],depthStencilAttachment:{view:i,depthLoadOp:"clear",depthClearValue:1,depthStoreOp:"store"}});R.setPipeline(A),R.setVertexBuffer(0,v),R.setVertexBuffer(1,L),R.setVertexBuffer(2,p),R.setBindGroup(0,x),R.setBindGroup(1,O),R.setBindGroup(2,S),R.draw(s.vertices.length/4),R.end()}}},rs=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;\r
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
`,is=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;
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
`,Kt=4,It=30,Ur=n=>{const e=Cn(Sn(n.position),Sn(k(n.position,n.direction)),b(0,1,0)),t=re(170,5,.01,Jn*2);return M(t,e)},as=n=>{n.active=!1,n.intensity=0},os=n=>{n.active=!0},ss=n=>new Float32Array(n.flatMap(e=>[B([e.position,e.direction]),K(Ur(e)),[...e.tint,e.intensity]].flat())),cs=({device:n},e,t)=>{let r=t.reduce((A,x)=>A.vertexCount>x.vertexCount?A:x,t[0]);const i=n.createShaderModule({code:is}),a=n.createRenderPipeline({layout:"auto",vertex:{module:i,entryPoint:"main_vs",buffers:[r.vertexBufferLayout]},fragment:{module:i,entryPoint:"main_fs",targets:[{format:"rgba32float"}]},primitive:{frontFace:"ccw",cullMode:"none",topology:"triangle-list"},depthStencil:{depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"}}),o=n.createTexture({size:{width:2048,height:512,depthOrArrayLayers:e.length},format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),s=n.createTexture({size:{width:2048,height:512,depthOrArrayLayers:e.length},dimension:"2d",format:"rgba32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),c=e.map(A=>z(n,a,[new Float32Array(K(Ur(A)))],"UNIFORM",0).bindGroup),l=t.map(A=>{const x=Zt(A)?new Float32Array(we(A.modelMatrices)):new Float32Array(K(wn()));return z(n,a,[x],"STORAGE",1).bindGroup}),{bindGroup:u}=z(n,a,[new Float32Array(K(wn()))],"UNIFORM",2),{bindGroup:f,buffers:[d]}=z(n,a,[new Float32Array(K(wn()))],"UNIFORM",2),_=(A,x)=>{if(x%2===0)return;const O=A/1e3,S=yn([.01*Math.sin(O)*Math.random(),.01*Math.sin(O)*Math.random(),.01*Math.sin(O)*Math.random()]);W(n,d,new Float32Array(K(S)),0)},m=(A,x,O)=>{w(x),_(x,O);for(let S=0;S<e.length;S++){if(!g.includes(S))continue;const F=A.beginRenderPass({colorAttachments:[{view:s.createView({baseArrayLayer:S,arrayLayerCount:1}),loadOp:"clear",clearValue:mn.black,storeOp:"store"}],depthStencilAttachment:{view:o.createView({baseArrayLayer:S,arrayLayerCount:1}),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:1}});F.setPipeline(a),F.setBindGroup(0,c[S]);for(let E=0;E<t.length;E++){const V=t[E];if(F.setVertexBuffer(0,V.vertexBuffer),F.setBindGroup(1,l[E]),!V.indexBuffer||!V.triangleCount){F.setBindGroup(2,u),F.draw(V.vertexCount);continue}F.setBindGroup(2,f);const R=Zt(V)?V.instances:void 0;F.setIndexBuffer(V.indexBuffer,"uint32"),F.drawIndexed(V.triangleCount*3,R)}F.end()}},v=[];let g=[];const L=n.createBuffer({size:new Uint32Array(Kt).byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.length>It&&console.warn("[initialization] number of lights larger than allowed limit");const I=n.createBuffer({size:(Pn.float32x4*2+Pn.float32x4x4+Pn.float32x4)*It,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(I,0,ss(e));const p=A=>{g=Ra(e.map(x=>tr(_e(x.position,h(...A,1)))),Kt),n.queue.writeBuffer(L,0,new Uint32Array(g));for(const x of g)os(e[x]);for(let x=0;x<e.length;x++)if(!g.includes(x)){as(e[x]);const O=Pn.float32x4*2+Pn.float32x4x4+Pn.float32x4;W(n,I,new Float32Array([0]),O*x+O-Pn.float32)}for(const x of v)x(g)},w=A=>{const x=S=>S<6?S+=.1*Math.random():Math.sin(A/1e4)*Math.random()+6,O=Pn.float32x4*2+Pn.float32x4x4+Pn.float32x4;for(const S of g){const F=e[S];F.intensity=x(F.intensity),W(n,I,new Float32Array([F.intensity]),O*S+O-Pn.float32)}};return{renderable:{pass:m,onTileChange:p},lightData:{lights:e,shadowMapTexture:s,activeLightsChangeListeners:v,lightSourcesBuffer:I,activeLightIndicesBuffer:L}}},ls=n=>{const e=Jn/2-.1,t=kr(~n.cardinality&15),r=Lt[t],i=Le(n.position),a=k(h(...k(b(0,.4,0),i),1),Zn(r,e));return{direction:Lt[qo[t]],position:a,intensity:0,tint:b(.9,.4,0),active:!1}},fs=({device:n},e)=>{const t=ze(b(),1),r=[y(0,0),y(0,1),y(0,1),y(0,0),y(0,0),y(0,1),y(0,1),y(0,0)],i=e.map(d=>{const _=yn(Sn(k(d.position,k(Zn(d.direction,.1),h(0,-.65,0,0))))),m=M(Ee(90),Oe(30,Sn(d.direction))),v=Dn(.1,.65,.1);return M(M(_,m),v)}),{buffer:a}=Vn(n,new Uint32Array(B(t.triangleIndices.map(d=>Sn(d))))),{buffer:o,bufferLayout:s}=H(n,new Float32Array(B(t.vertices)),"float32x4"),{buffer:c,bufferLayout:l}=H(n,new Float32Array(B(t.normals)),"float32x4",1),{buffer:u,bufferLayout:f}=H(n,new Float32Array(B(r)),"float32x2",2);return{vertexBuffer:o,vertexBufferLayout:s,vertexCount:t.vertices.length,normalsBuffer:c,normalsBufferLayout:l,uvsBuffer:u,uvsBufferLayout:f,indexBuffer:a,triangleCount:t.triangleCount,instances:e.length,modelMatrices:i}},hs=({device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:r,depthStencilTextureView:i},multisampleData:{msaaTextureView:a,multisample:o}}},{vertexBuffer:s,vertexBufferLayout:c,normalsBuffer:l,normalsBufferLayout:u,uvsBuffer:f,uvsBufferLayout:d,indexBuffer:_,triangleCount:m,instances:v,modelMatrices:g},{playerPerspectiveBuffer:L},{lightSourcesBuffer:I})=>{const p=nn(n,[c,u,d],t,rs,"triangle-list",{primitive:{frontFace:"ccw",cullMode:"back"},depthStencil:r,multisample:o}),w=new Float32Array(we(g)),A=n.createBuffer({size:Pn.float32x4x4*It,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(A,0,w);const x=n.createBindGroup({layout:p.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:L}},{binding:1,resource:{buffer:A}},{binding:2,resource:{buffer:I}}]});return{pass:S=>{const F={view:a,resolveTarget:e.getCurrentTexture().createView(),loadOp:"load",clearValue:mn.black,storeOp:"store"},E=S.beginRenderPass({colorAttachments:[F],depthStencilAttachment:{view:i,depthLoadOp:"load",depthClearValue:1,depthStoreOp:"store"}});E.setPipeline(p),E.setIndexBuffer(_,"uint32"),E.setVertexBuffer(0,s),E.setVertexBuffer(1,l),E.setVertexBuffer(2,f),E.setBindGroup(0,x),E.drawIndexed(m*3,v),E.end()}}},Jn=4,us=n=>{const e=Jn/2,t=Le(n.position),r=[h(-e,-e,e,1),h(-e,e,e,1),h(e,e,e,1),h(e,-e,e,1),h(-e,-e,-e,1),h(-e,e,-e,1),h(e,e,-e,1),h(e,-e,-e,1)],i=[h(3,0,4),h(4,7,3),h(6,5,1),h(1,2,6)],a=[...Array(6).fill(h(0,1,0,0)),...Array(6).fill(h(0,-1,0,0))],o=[y(1,0),y(.5,0),y(.5,.5),y(.5,.5),y(1,.5),y(1,0),y(.5,.5),y(0,.5),y(0,0),y(0,0),y(.5,0),y(.5,.5)],s=[y(.5,1),y(.5,.5),y(0,.5),y(0,.5),y(0,1),y(.5,1)];n.cardinality&J.NORTH||(i.push(h(1,0,3),h(3,2,1)),a.push(...Array(6).fill(h(0,0,-1,0))),o.push(...s)),n.cardinality&J.EAST||(i.push(h(2,3,7),h(7,6,2)),a.push(...Array(6).fill(h(-1,0,0,0))),o.push(...s)),n.cardinality&J.SOUTH||(i.push(h(4,5,6),h(6,7,4)),a.push(...Array(6).fill(h(0,0,1,0))),o.push(...s)),n.cardinality&J.WEST||(i.push(h(5,4,0),h(0,1,5)),a.push(...Array(6).fill(h(1,0,0,0))),o.push(...s));const c=new Float32Array(B(i.reduce((d,_)=>{for(let m=0;m<3;m++)d.push(k(r[_[m]],h(...t,0)));return d},[]))),l=new Float32Array(B(a)),u=new Float32Array(B(o));let f=[];return n.type===xn.LIGHT&&(f=[ls(n)]),{vertices:c,normals:l,uvs:u,lights:f}},ds=(n,e)=>{const r=k(Le(e.position),b(-Jn/2*.96,0,-Jn/2*.96)),i=k(Le(e.position),b(+Jn/2*.96,0,+Jn/2*.96));e.cardinality&J.WEST&&(r[0]=-1/0),e.cardinality&J.SOUTH&&(r[2]=-1/0),e.cardinality&J.EAST&&(i[0]=1/0),e.cardinality&J.NORTH&&(i[2]=1/0),n[0]=Me(n[0],r[0],i[0]),n[2]=Me(n[2],r[2],i[2])},vs=n=>{const e=ze(b(0,0,0),1),{buffer:t,bufferLayout:r}=H(n,new Float32Array(B(e.vertices)),"float32x4",0),{buffer:i}=Vn(n,new Uint32Array(B(e.triangleIndices.map(o=>Sn(o))))),a=o=>{const s=yn(k(o,b(0,-.5,0))),c=Dn(1,2,1),l=M(s,c);W(n,t,new Float32Array(B(e.vertices.map(u=>Fe(u,l)))),0)};return{bufferedMesh:{vertexBuffer:t,vertexBufferLayout:r,indexBuffer:i,vertexCount:e.vertices.length,triangleCount:e.triangleCount},updateMesh:a}},_s=({device:n})=>{const e=b(0,0,0),t=b(0,0,1),r=Do(e,t),i=n.createBuffer({size:Pn.float32x4x4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});W(n,i,new Float32Array(K(wt(r))),0);const a=n.createBuffer({size:Pn.float32x3,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});W(n,a,new Float32Array(b()),0);const{bufferedMesh:o,updateMesh:s}=vs(n);return{camera:r,position:e,lookDirection:t,right:qe(b(0,1,0),t),playerMoveListeners:[s],playerViewListeners:[],shadowBufferedMesh:o,playerPerspectiveBuffer:i,playerPositionBuffer:a}},Qt=({device:n},e,t,r)=>{let i=-t/512,a=r/512;e.lookDirection[1]>.97&&(a=Math.max(0,a)),e.lookDirection[1]<-.97&&(a=Math.min(0,a));const o=Wt(b(0,1,0),i),s=Wt(e.right,a),c=Xe(o,s);e.lookDirection=qn(Sn(Pe(h(...e.lookDirection,1),c))),e.right=qn(qe(er.up,e.lookDirection)),jr(n,e)},jr=(n,e)=>{e.camera.extrinsics=Cr(e.position,e.lookDirection);const t=wt(e.camera);for(const r of e.playerViewListeners)r(t);W(n,e.playerPerspectiveBuffer,new Float32Array(K(wt(e.camera))),0)},ms=({device:n},e,t,r)=>{const i=Ge(r.w)-Ge(r.s),a=Ge(r.a)-Ge(r.d),o=r.v;if(!i&&!a)return;const s=gs(e,i,a,o);t.cheats.noClip||ds(s,t.currentTile),e.position=s;for(const c of e.playerMoveListeners)c(e.position);W(n,e.playerPositionBuffer,new Float32Array(e.position),0),jr(n,e)},ps=.1,gs=(n,e,t,r)=>{let i=b();const a=(r?2:1)*ps;if(e){const o=[...n.lookDirection];o[1]=0;const s=Zn(qn(o),a*e);i=k(i,s)}if(t){const o=[...n.right];o[1]=0;const s=Zn(qn(o),a*t);i=k(i,s)}return k(n.position,i)},xs=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;\r
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
`,bs=(n,e)=>({direction:e,position:n,intensity:4,tint:b(35/100,50/100,9/100),active:!1}),ys=n=>{const e=h(...Le(n.position),0),t=kr(n.cardinality),r=Lt[t],i=2,a=Zn(r,Jn/2-.1);let o=[h(-i,i,0,1),h(-i,-i,0,1),h(i,-i,0,1),h(i,i,0,1)];(t===J.EAST||t===J.WEST)&&(o=o.map(u=>Fe(u,Ee(90))));const s=new Uint32Array(B([b(0,1,3),b(3,1,2)])),c=new Float32Array(B([y(0,0),y(0,1),y(1,1),y(1,0)])),l=new Float32Array(B([r,r,r,r]));return{vertices:new Float32Array(B(o)),triangles:s,uvs:c,normals:l,lights:[bs(k(e,a),r)],modelMatrix:yn(Sn(k(e,a)))}},ws=async({device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:r,depthStencilTextureView:i},multisampleData:{msaaTextureView:a,multisample:o}}},s,{playerPerspectiveBuffer:c})=>{const{texture:l,sampler:u}=await Ye(n,"game/portal.png"),{buffer:f}=Vn(n,s.triangles),{buffer:d,bufferLayout:_}=H(n,s.vertices,"float32x4"),{buffer:m,bufferLayout:v}=H(n,s.normals,"float32x4",1),{buffer:g,bufferLayout:L}=H(n,s.uvs,"float32x2",2),I=nn(n,[_,v,L],t,xs,"triangle-list",{primitive:{frontFace:"ccw",cullMode:"none"},depthStencil:r,multisample:o},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),p=new Float32Array(K(s.modelMatrix)),w=n.createBuffer({size:p.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(w,0,p);const A=new Float32Array([0]),x=n.createBuffer({size:A.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(x,0,A);const O=n.createBindGroup({layout:I.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:c}},{binding:1,resource:{buffer:w}},{binding:2,resource:{buffer:x}}]}),S=Un(n,I,l,u,1);return{pass:(E,V)=>{W(n,x,new Float32Array([V]),0);const R={view:a,resolveTarget:e.getCurrentTexture().createView(),loadOp:"load",storeOp:"store"},T=E.beginRenderPass({colorAttachments:[R],depthStencilAttachment:{view:i,depthLoadOp:"load",depthClearValue:1,depthStoreOp:"store"}});T.setPipeline(I),T.setIndexBuffer(f,"uint32"),T.setVertexBuffer(0,d),T.setVertexBuffer(1,m),T.setVertexBuffer(2,g),T.setBindGroup(0,O),T.setBindGroup(1,S),T.drawIndexed(6),T.end()}}},Ls=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await cn("game"),i=4,{multisample:a,msaaTexture:o}=pe(n,r,t,i),s=n.createTexture({size:{width:r.width,height:r.height},format:"depth24plus",sampleCount:i,usage:GPUTextureUsage.RENDER_ATTACHMENT}),c={depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"},l=[],u=(_,m)=>{_=Me(_,-36,36),m=Me(m,-36,36);for(const g of l)g(_,m)};let f=!1;const{keyMap:d}=Ui("game",u,{onStart:()=>f=!0,onEnd:()=>f=!1});return{device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:c,depthStencilTextureView:s.createView()},multisampleData:{multisample:a,msaaTextureView:o.createView()}},input:{keyMap:d,mouseMoveListeners:l,inGame:f}}},Is=(n,e)=>{const t=es(n.map,e.position);if(t!==n.currentTile&&t!==null){n.currentTile=t;for(const r of n.tileChangeListeners)r(Le(t.position),t.position);t.type===xn.END&&window.alert("you got to the end yay")}},As=async()=>{const n=await Ls(),e=_s(n);n.input.mouseMoveListeners.push((p,w)=>Qt(n,e,p,w));const{tileSet:t,tileMap:r}=Ko(),i=ns(t.allTiles),a={map:r,currentTile:null,tileChangeListeners:[],cheats:{noClip:!1}},{buffer:o,bufferLayout:s}=H(n.device,i.vertices,"float32x4",0),c={vertexBuffer:o,vertexBufferLayout:s,vertexCount:i.vertices.length/4},l=ys(t.endTile),u=fs(n,i.lights),{renderable:f,lightData:d}=cs(n,[...i.lights,...l.lights],[c,e.shadowBufferedMesh,u]);a.tileChangeListeners.push(f.onTileChange);const{pass:_}=await ts(n,i,d,e),{pass:m}=await ws(n,l,e),{pass:v}=hs(n,u,e,d),g=()=>{ms(n,e,a,n.input.keyMap),n.input.keyMap.p&&(a.cheats.noClip=!a.cheats.noClip,n.input.keyMap.p=!1,console.info("[cheats]: no clip toggled to",a.cheats.noClip))};Qt(n,e,0,0);let L=0;const I=p=>{g(),Is(a,e);const w=n.device.createCommandEncoder();f.pass(w,p,L),_(w,p,L),m(w,p,L),v(w,p,L),n.device.queue.submit([w.finish()]),L++,requestAnimationFrame(I)};requestAnimationFrame(I)},Ss=(n,e)=>{const t=tn(),r=en("game");t.append(r),n.append(t),e.push(As)},Ts=(n,e)=>{if(!Ze.children)throw"Graphics routes do not exist";for(const t of Ze.children.map(r=>r.generator))t(n,e)},Ze={path:"graphics",name:"Graphics",description:"",generator:Ts,children:[{path:"webgpu-basics",name:"Introduction to the basics",description:"A walkthrough the basics of graphics and setting it up in WebGPU.",generator:qa},{path:"drawing",name:"Drawing via interaction",description:"Using the browser interaction features to create a simple drawing application.",generator:Wa},{path:"projection",name:"Projection types",description:"An overview of the types of projections and GPU instancing.",generator:ao},{path:"lighting",name:"Lighting",description:"Showcase of the most common GPU lighting models and runtime mesh creation.",generator:co},{path:"meshes",name:"Mesh intstantiation",description:"Populating mesh data in the GPU and displaying a model in the frame.",generator:ho},{path:"texturing",name:"Applying textures",description:"Using textures to add colors to a mesh and an overview of the WebGPU process mipmapping.",generator:bo},{path:"env-mapping",name:"Environmental mapping",description:"Using environmental maps to populate color values reflected by mirror surfaces (with or without normal maps).",generator:Io},{path:"shadows",name:"Shadows (projection)",description:"Creating shadows in the scene using projective shadowing.",generator:To},{path:"shadow-mapping",name:"Shadows (maps)",description:"Creating shadows in the scene using shadow maps.",generator:ko},{path:"camera-movement",name:"Other interaction types",description:"A showcase of other scene interaction methods.",generator:No},{path:"game",name:"A simple game engine (project)",description:"Using the graphics toolset to create a simple dungeon crawler with focus on lighting, shadow maps and player movement.",generator:Ss}]},Bs=`struct Ray {
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
`,Nr="raycast-anatomy",Rs=async()=>{const{device:n,context:e,canvasFormat:t}=await cn(Nr),r=nn(n,[],t,Bs,"triangle-strip"),{pass:i,executePass:a}=hn(n,e,mn.black);i.setPipeline(r),i.draw(4),a()},Ps=(n,e)=>{const t=on("The anatomy of rendering"),r=an(`
Before one peers into the world of rendering, ray casting, path tracing and the deep depths of global illumination - one should understand the basic building block of the rendering system - the ray.

The rendering system is built with physical constraints in mind, and so the ray is an imitation of the friendly vessels we observe in the real world - light rays. 
Computationally, generating, storing, amassing and integrating inifinte amounts of light rays and their interactions with materials is not feasible on modern hardware, 
therefore the compromise is to only handle the light and shading directly seen by the viewer (the virtual camera).

And so, the camera ray is born. Shown below is each fragment (pixel) of the the canvas in the color of the direction of its camera ray.
`),i=en(Nr),a=tn();a.append(i),n.append(t,r,a),e.push(Rs)},Os=`struct ViewboxOptions {
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
`,Dr="light",Hr="zoom",qr="light-intensity-slider",$r="light-position-x-input",Yr="light-position-y-input",Xr="light-position-z-input",Wr="shade-all-visible-objects",Jr="refractive-index-slider",Fs=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await cn(Dr),i=G(Hr),a=G(qr),o=G(Jr),s=G($r),c=G(Yr),l=G(Xr),u=G(Wr,"checked"),f=t.width/t.height,d=nn(n,[],r,Os,"triangle-strip"),{bindGroup:_,buffers:[m]}=z(n,d,[new Float32Array([i(),f])],"UNIFORM"),v=new Float32Array([s(),c(),l(),a(),u()?1:0,o(),0,0]),{bindGroup:g,buffers:[L]}=z(n,d,[v],"UNIFORM",1),I=()=>{W(n,m,new Float32Array([i(),f]),0),W(n,L,new Float32Array([s(),c(),l(),a(),u()?1:0,o(),0,0]),0);const{pass:p,executePass:w}=hn(n,e,mn.black);p.setPipeline(d),p.setBindGroup(0,_),p.setBindGroup(1,g),p.draw(4),w(),requestAnimationFrame(I)};requestAnimationFrame(I)},Ms=(n,e)=>{const t=on("Let there be light"),r=an(`
With the ability to query the world with ray casts, the most primitive intersecting shapes can be introduced. These are:

1) The plane - an intersection of a ray (line) and a plane. Nothing too complicated - every line will at some point intersect a given plane, unless they are strictly parallel. The only question is at which distance (ray line parameter) does the intersection occur?

2) The triangle - an extension to the plane intersection with the addition of validating the triangle's Barycentric coordinates remain in the appropriate threshold. 
Mathematically, these coordinates can be larger than one or smaller than 0, but this just means the point is outside of the canonical triangle and somewhere in the triangle's shadow copy on the same plane.

3) The sphere - an interesting case which is more specifically comprised of three cases: no intersection (missing the sphere), one intersection (grazing the sphere's surface) and two intersections (entering and leaving the sphere).
There can also be (as will be vital in constructing refraction events) a ray starting inside the sphere with only one proper intersection in the direction of the ray.
Solving for these intersections is a case of handling quadratic formula roots, in an algorithmically friendly way.

For each point of the intersection with an object's surface, that fragement may be shaded based on the information from the intersection - supplied by the prominent hit info data structure, which is key in passing information from the intersecting phase to the shading phase.
`),i=tn(),a=en(Dr,{width:512+128,height:512-64}),o=_n(),s=P(fn(Hr,1,.1,10,.1),"Zoom (camera constant)"),c=P(fn(qr,3.14,0,10,.01),"Light intensity"),l=P(fn(Jr,1,-1,10,.1),"Diffuse reflectance"),u=P(fn($r,0,-5,5,.1),"Light X position"),f=P(fn(Yr,1,0,5,.1),"Light Y position"),d=P(fn(Xr,0,-5,5,.1),"Light Z position"),_=P(Qn(Wr,!0),"Shading on",!1);o.append(s,c,l,u,f,d,_),i.append(a,o),n.append(t,r,i),e.push(Fs)},Zr=(n,e)=>{Ps(n,e),Ms(n,e)},Es=`struct ViewboxOptions {
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
`,Ce="lighting",Kr=Ce+"-light-position-x-input",Qr=Ce+"-light-position-y-input",ni=Ce+"-light-position-z-input",Vs=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await cn(Ce),i=G(Kr),a=G(Qr),o=G(ni),s=t.width/t.height,c=nn(n,[],r,Es,"triangle-strip"),l=new Float32Array([s]),{bindGroup:u}=z(n,c,[l],"UNIFORM"),f=new Float32Array([i(),a(),o(),0,0,0,0,0,0]),{bindGroup:d,buffers:[_]}=z(n,c,[f],"UNIFORM",1),m=()=>{W(n,_,new Float32Array([i(),a(),o(),0,0,0,0,0,0]),0);const{pass:v,executePass:g}=hn(n,e,mn.black);v.setPipeline(c),v.setBindGroup(0,u),v.setBindGroup(1,d),v.draw(4),g(),requestAnimationFrame(m)};requestAnimationFrame(m)},zs=(n,e)=>{const t=on("Let there be shade"),r=an(`
After implementing lighting, the next step is to introduce shade. An enourmous advantage rendering systems have over the rasterization pipeline is the ease with which simple physical phenomena such as obstruction of a light source can be generated.

As you may have guessed at this point, light obstruction is also a ray, but it is cast from the intersection point in the direction of the light source. 
This is another way of querying the scene for information and as will be shown in the next example, 
starting new rays or continuing rays from defined points depending on the interaction type is the bread and butter of path tracing.
`),i=tn(),a=en(Ce,{width:512+128,height:512-64}),o=_n(),s=P(fn(Kr,0,-5,5,.1),"Light X position"),c=P(fn(Qr,1,0,5,.1),"Light Y position"),l=P(fn(ni,0,-5,5,.1),"Light Z position");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(Vs)},Cs=`struct Environment {
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
`,he="mirrors",ce={"Base color":0,Lambertian:1,Mirror:2,Refractive:3,Phong:4,Glossy:5},ei=he+"-sphere-shader",ti=he+"-triangle-shader",ri=he+"-plane-shader",ii=he+"-light-position-x-input",ai=he+"-light-position-y-input",oi=he+"-light-position-z-input",si=he+"-animation-slider",ks=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await cn(he),i=G(ii),a=G(ai),o=G(oi),s=G(ei),c=G(ti),l=G(ri),u=G(si),f=t.width/t.height,d=nn(n,[],r,Cs,"triangle-strip"),_=new Float32Array([f,0]),{bindGroup:m,buffers:[v]}=z(n,d,[_],"UNIFORM"),g=new Float32Array([i(),a(),o(),ce[s()],ce[c()],ce[l()],0,0,0]),{bindGroup:L,buffers:[I]}=z(n,d,[g],"UNIFORM",1),p=w=>{W(n,v,new Float32Array([f,w*u()/512]),0),W(n,I,new Float32Array([i(),a(),o(),ce[s()],ce[c()],ce[l()],0,0,0]),0);const{pass:A,executePass:x}=hn(n,e,mn.black);A.setPipeline(d),A.setBindGroup(0,m),A.setBindGroup(1,L),A.draw(4),x(),requestAnimationFrame(p)};requestAnimationFrame(p)},Gs=(n,e)=>{const t=on('Putting physics in "physically-based rendering"'),r=an(`
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
`),i=tn(),a=en(he,{width:512+128,height:512-64}),o=_n(),s=P(Fn(ei,Object.keys(ce),"Refractive"),"Sphere shader type",!1),c=P(Fn(ti,Object.keys(ce),"Lambertian"),"Triangle shader type",!1),l=P(Fn(ri,Object.keys(ce),"Lambertian"),"Plane shader type",!1),u=P(fn(ii,0,-5,5,.1),"Light X position"),f=P(fn(ai,1,0,5,.1),"Light Y position"),d=P(fn(oi,0,-5,5,.1),"Light Z position"),_=P(fn(si,0,0,1,.1),"Orbit animation speed");o.append(s,c,l,u,f,d,_),i.append(a,o),n.append(t,r,i),e.push(ks)},ci=(n,e)=>{zs(n,e),Gs(n,e)},Us=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,li="texture",fi="texture-repeat-style",js=["clamp-to-edge","repeat","mirror-repeat"],Ns=async()=>{const{device:n,context:e,canvasFormat:t}=await cn(li),r=async i=>{const a=nn(n,[],t,Us,"triangle-strip"),{textureData:o,height:s,width:c}=await le(jn("textures/grass_minecraft.png")),{texture:l,sampler:u}=Kn(n,o,c,s,{addressModeU:i,addressModeV:i}),f=Un(n,a,l,u),{pass:d,executePass:_}=hn(n,e,mn.black);d.setPipeline(a),d.setBindGroup(0,f),d.draw(4),_()};r(An(fi,r))},Ds=(n,e)=>{const t=on("Introducing textures"),r=an(`
Textures are image-based color maps for the surfaces of objects.
`),i=tn(),a=en(li),o=_n(),s=P(Fn(fi,js,"repeat"),"Texture edge behavior",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(Ns)},Hs=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,hi="texturing",At="grass-texture-scale",De="subdivision-jitter-slider",St="grass-texture-select",ui="texture-repeat-style-on-plane",qs=["clamp-to-edge","repeat","mirror-repeat"],$s=async()=>{const{device:n,canvas:e,context:t,canvasFormat:r}=await cn(hi),i=G(At),a=G(De),o=G(St),s=nn(n,[],r,Hs,"triangle-strip");let c,l;const u=async I=>{const p=[le(jn("textures/grass.jpg")),le(jn("textures/grass_minecraft.png"))],w=await Promise.all(p),{texture:A,sampler:x}=Kn(n,w[0].textureData,w[0].width,w[0].height,{addressModeU:I,addressModeV:I}),{texture:O,sampler:S}=Kn(n,w[1].textureData,w[1].width,w[1].height,{addressModeU:I,addressModeV:I});c=Un(n,s,A,x),l=Un(n,s,O,S)};await u("repeat");const{bindGroup:f,buffers:[d]}=z(n,s,[new Float32Array([i(),a()*a()])],"UNIFORM",1),{bindGroup:_,buffers:[m]}=z(n,s,[new Float32Array(200)],"STORAGE",2),v=()=>{W(n,d,new Float32Array([i(),a()*a()]),0);const I={"grass.jpg":c,"grass_minecraft.png":l}[o()],{pass:p,executePass:w}=hn(n,t,mn.black);p.setPipeline(s),p.setBindGroup(0,I),p.setBindGroup(1,f),p.setBindGroup(2,_),p.draw(4),w()},g=I=>{const p=ir(e.height,I);W(n,m,new Float32Array(B(p)),0,!0)},L=An(De,g);g(L),Et([At,St,De],v),An(ui,async I=>{await u(I),v()}),v()},Ys=(n,e)=>{const t=on("Textures in rendering, jittering to solve aliasing"),r=an(`
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
`),i=tn(),a=en(hi),o=_n(),s=P(fn(At,.2,.1,2,.1),"Texture scale"),c=P(fn(De,1,1,10,1),"Subdivisions for stratisfied jitter"),l=P(Fn(St,["grass.jpg","grass_minecraft.png"],"grass_minecraft.png"),"Grass texture",!1),u=P(Fn(ui,qs,"repeat"),"Texture edge behavior",!1);o.append(l,s,u,c),i.append(a,o),n.append(t,r,i),e.push($s)},di=(n,e)=>{Ds(n,e),Ys(n,e)},Xs=n=>{const e=on("Measuring light"),t=an(`
Radiometry and photometry are two schools of light measurement. While radiometry is more aligned with machine-friendly value, photometry addresses the measurements in a human-friendly (readable) method.
In the end, both are measurements of the same phenomena and there exists a direct conversion between the two sets of units.

Below are seven examples of light measurement exercises which make use of the equations. 
They are meant to provide a more practical look into the behaviour of light and how that could apply to the art of rendering.
A key take-away is about the radial flux of light - how light radiates spherically outwards (from isotropic and/or homogeneous light sources) and a object surface a certain distance away will receive a slice of that enlarging sphere.

Mathematically this would require integrals (as in the examples below) to calculate the amount of light, but as weill be later shown, this can be approximated with Monte Carlo integration in progressive rendering.
`),r=document.createElement("iframe");r.width="100%",r.height="1000px",r.src=jn("resources/worksheet.pdf"),n.append(e,t,r)},Ws=(n,e)=>{Xs(n)},Js=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,vi="default-scene-as-meshes",Zs=async()=>{const{device:n,context:e,canvasFormat:t}=await cn(vi),r=nn(n,[],t,Js,"triangle-strip"),i=Hi([b(-.2,.1,.9),b(.2,.1,.9),b(-.2,.1,-.1)]),{bindGroup:a}=z(n,r,[new Float32Array(B(i.vertices)),new Uint32Array(B(i.triangleIndices))],"STORAGE",1),o=await le(jn("textures/grass_minecraft.png")),{texture:s,sampler:c}=Kn(n,o.textureData,o.width,o.height,{addressModeU:"repeat",addressModeV:"repeat"}),l=Un(n,r,s,c);(()=>{const{pass:f,executePass:d}=hn(n,e,mn.black);f.setPipeline(r),f.setBindGroup(0,l),f.setBindGroup(1,a),f.draw(4),d()})()},Ks=(n,e)=>{const t=on("Replacing the triangle with a triangle"),r=an(`
As a first step towards the introduction of triangle-based mesh model data to the rendering system, we will first replace the triangle... with a triangle.
Up to this point, all the shapes were conceptual - living only in the mind of the GPU, defined as mathematical parameterizations of objects.

But interesting meshes are more commonly not mathematical monstrosities, but artistic sculptures carved in polygons. These have to be passed to the GPU from the CPU.
The triangle in the scene below is defined as a vertex buffer, but passed to the GPU as a uniform/storage buffer. The shader loops over each of these triangles when intersecting a ray.

Inefficient? Absolutely, but that is a worry for a later chapter.
`),i=tn(),a=en(vi);i.append(a),n.append(t,r,i),e.push(Zs)},Qs=`@group(0) @binding(0) var<storage> ut_vertices : array<vec3f>;
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
`,_i="utah-teapot",nc=["Flat","Vertex normals"],mi="shading-select-ut",ec=async()=>{const{device:n,context:e,canvasFormat:t}=await cn(_i),r=nn(n,[],t,Qs,"triangle-strip"),i=await $n(jn("models/teapot.obj")),a=ar(i,{}),{bindGroup:o}=z(n,r,[new Float32Array(B(a.vertices)),new Uint32Array(B(a.triangleIndices)),new Float32Array(B(a.normals))],"STORAGE",0),{bindGroup:s,buffers:[c]}=z(n,r,[new Uint32Array([a.triangleCount,0])],"UNIFORM",1),l=f=>{const d={Flat:0,"Vertex normals":1};Gn(n,c,new Uint32Array([d[f]]),4);const{pass:_,executePass:m}=hn(n,e,Be(.8,.4,.4,1));_.setPipeline(r),_.setBindGroup(0,o),_.setBindGroup(1,s),_.draw(4),m()},u=An(mi,l);l(u)},tc=(n,e)=>{const t=on("Introducing the Utah Teapot"),r=an("No description yet"),i=tn(),a=en(_i,{width:840,height:450}),o=_n(),s=P(Fn(mi,nc,"Flat"),"Shading type",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(ec)},rc=`@group(0) @binding(0) var<storage> cb_vertices : array<vec3f>;
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
`,pi="cornell-box",ic=["Flat","Lambertian"],gi="shading-select-cb",ac=async()=>{const{device:n,context:e,canvasFormat:t}=await cn(pi),r=nn(n,[],t,rc,"triangle-strip"),i=await $n("models/CornellBoxWithBlocks.obj"),a=ar(i,{}),o=new Float32Array(i.mtls[0].materials.reduce((m,v)=>[...m,...B([v.color,v.specular,v.emission,h(v.illum,v.shininess,v.ior)])],[])),s=a.materialIndices.reduce((m,v,g)=>(i.mtls[0].materials[v].illum>=1&&m.push(g),m),[]),{bindGroup:c}=z(n,r,[new Float32Array(B(a.vertices)),new Uint32Array(B(a.triangleIndices)),new Uint32Array(a.materialIndices),new Uint32Array(s)],"STORAGE",0),{bindGroup:l,buffers:[u]}=z(n,r,[new Uint32Array([a.triangleCount,s.length,0])],"UNIFORM",1),{bindGroup:f}=z(n,r,[o],"STORAGE",2),d=m=>{const v={Flat:0,Lambertian:1}[m];Gn(n,u,new Uint32Array([v]),2*4);const{pass:g,executePass:L}=hn(n,e,mn.black);g.setPipeline(r),g.setBindGroup(0,c),g.setBindGroup(1,l),g.setBindGroup(2,f),g.draw(4),L()},_=An(gi,d);d(_)},oc=(n,e)=>{const t=on("Inside the Cornell box"),r=an("No description yet"),i=tn(),a=en(pi),o=_n(),s=P(Fn(gi,ic,"Lambertian"),"Shading type",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(ac)},xi=(n,e)=>{Ks(n,e),tc(n,e),oc(n,e)},sc=`@group(0) @binding(0) var<storage> vertices : array<vec3f>;
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
`,bi="bsp",yi="animation-speed-bsp",cc=async()=>{const{device:n,context:e,canvasFormat:t}=await cn(bi),r=G(yi),i=nn(n,[],t,sc,"triangle-strip"),a=ie(await $n("models/bunny.obj",1)),o=me(a),{bindGroup:s}=z(n,i,[o.vertices,o.normals,o.indices],"STORAGE"),{bindGroup:c}=z(n,i,[o.bspPlanes,o.bspTree,o.treeIds],"STORAGE",1),{bindGroup:l,buffers:[u,f]}=z(n,i,[o.aabb,new Float32Array([0])],"UNIFORM",2);let d=0;const _=()=>{d+=.025*r(),W(n,f,new Float32Array([d]),0);const{pass:m,executePass:v}=hn(n,e,mn.black);m.setPipeline(i),m.setBindGroup(0,s),m.setBindGroup(1,c),m.setBindGroup(2,l),m.draw(4),v(),requestAnimationFrame(_)};requestAnimationFrame(_)},lc=(n,e)=>{const t=on("Using the Binary Space Partitioning tree"),r=an("why dots in black?"),i=tn(),a=en(bi),o=_n(),s=P(fn(yi,0,0,1,.01),"Speed of the animation");o.append(s),i.append(a,o),n.append(t,r,i),e.push(cc)},fc=`struct VertexNormal {
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
`,wi="cornell-interleave",hc=async()=>{const{device:n,context:e,canvasFormat:t}=await cn(wi),r=nn(n,[],t,fc,"triangle-strip"),i=ie(await $n("models/CornellBoxWithBlocks.obj")),a=me(i),o=Ie([a.vertices,a.normals]),s=new Uint32Array(a.indices);Ae(s,i.matIndices,4);const c=new Uint32Array(i.lightIndices),l=new Float32Array(i.materials.reduce((v,g)=>[...v,...B([g.color,g.specular,g.emission,h(g.illum,g.shininess,g.ior)])],[])),{bindGroup:u}=z(n,r,[o,s,c],"STORAGE"),{bindGroup:f}=z(n,r,[a.bspPlanes,a.bspTree,a.treeIds],"STORAGE",1),{bindGroup:d}=z(n,r,[a.aabb,new Uint32Array([c.length])],"UNIFORM",2),{bindGroup:_}=z(n,r,[l],"STORAGE",3);(()=>{const{pass:v,executePass:g}=hn(n,e,mn.black);v.setPipeline(r),v.setBindGroup(0,u),v.setBindGroup(1,f),v.setBindGroup(2,d),v.setBindGroup(3,_),v.draw(4),g()})()},uc=(n,e)=>{const t=on("Using the Binary Space Partitioning tree"),r=an("No description yet"),i=tn(),a=en(wi),o=_n();i.append(a,o),n.append(t,r,i),e.push(hc)},dc=`struct VertexNormal {
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
`,Li="cornell-glass",Ii="jittering-active-bsp-cb",vc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await cn(Li),i=nn(n,[],t,dc,"triangle-strip"),a=ie(await $n("models/CornellBox.obj")),o=me(a),s=Ie([o.vertices,o.normals]),c=new Uint32Array(o.indices);Ae(c,a.matIndices,4);const l=new Uint32Array(a.lightIndices),u=new Float32Array(a.materials.reduce((A,x)=>[...A,...B([x.color,x.specular,x.emission,h(x.illum,x.shininess,x.ior)])],[])),{bindGroup:f}=z(n,i,[s,c,l],"STORAGE"),{bindGroup:d}=z(n,i,[o.bspPlanes,o.bspTree,o.treeIds],"STORAGE",1),{bindGroup:_,buffers:[m,v,g]}=z(n,i,[o.aabb,new Uint32Array([l.length]),new Uint32Array([36])],"UNIFORM",2),L=ir(r.height,6),{bindGroup:I}=z(n,i,[u,new Float32Array(B(L))],"STORAGE",3);An(Ii,A=>{const x=A?36:1;Gn(n,g,new Uint32Array([x]),0),w()},"checked");const w=()=>{const{pass:A,executePass:x}=hn(n,e,mn.black);A.setPipeline(i),A.setBindGroup(0,f),A.setBindGroup(1,d),A.setBindGroup(2,_),A.setBindGroup(3,I),A.draw(4),x()};w()},_c=(n,e)=>{const t=on("Spicing things up"),r=an("No description yet"),i=tn(),a=en(Li),o=_n(),s=P(Qn(Ii,!0),"Jittering enabled",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(vc)},mc=(n,e)=>{lc(n,e),uc(n,e),_c(n,e)},pc=`struct VertexNormal {
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
`,gc=`struct VertexNormal {
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
`,Ai="cornell-progressive",Tt="progressive-enabled-cb",Si="select-shader-cb-progressive",bc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await cn(Ai),i=G(Tt,"checked"),a=ie(await $n("models/CornellBoxWithBlocks.obj")),o=me(a),s=Ie([o.vertices,o.normals]),c=new Uint32Array(o.indices);Ae(c,a.matIndices,4);const l=new Uint32Array(a.lightIndices),u=new Float32Array(a.materials.reduce((m,v)=>[...m,...B([v.color,v.specular,v.emission,h(v.illum,v.shininess,v.ior)])],[])),f={"Simple progressive":pc,"Simple progressive with soft shadows":gc,"Complex progressive":xc},d={f:()=>{}},_=m=>{const{renderSrc:v,renderDst:g,blitPingPong:L}=Qe(n,r),I=n.createShaderModule({code:f[m]}),p=n.createRenderPipeline({layout:"auto",vertex:{module:I,entryPoint:"main_vs"},fragment:{module:I,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:w}=z(n,p,[s,c,l,u],"STORAGE"),{bindGroup:A}=z(n,p,[o.bspPlanes,o.bspTree,o.treeIds],"STORAGE",1),{bindGroup:x,buffers:[O,S,F]}=z(n,p,[o.aabb,new Uint32Array([l.length]),new Uint32Array([0,r.width,r.height])],"UNIFORM",2),E=n.createBindGroup({layout:p.getBindGroupLayout(3),entries:[{binding:0,resource:g.createView()}]});let V=0;const R=()=>{if(!i())return;V+=1,Gn(n,F,new Uint32Array([V]),0);const{pass:T,encoder:q}=hn(n,e,mn.black,{otherColorAttachments:[{view:v.createView(),loadOp:"load",storeOp:"store"}]});T.setPipeline(p),T.setBindGroup(0,w),T.setBindGroup(1,A),T.setBindGroup(2,x),T.setBindGroup(3,E),T.draw(4),T.end(),L(q),n.queue.submit([q.finish()]),requestAnimationFrame(R)};d.f=()=>requestAnimationFrame(R),requestAnimationFrame(R)};_(An(Si,_)),An(Tt,()=>d.f(),"checked")},yc=(n,e)=>{const t=on("Progressive rendering, the basics"),r=an("No description yet"),i=tn(),a=en(Ai),o=_n(),s=P(Qn(Tt,!0),"Progressive rendering enabled",!1),c=P(Fn(Si,["Simple progressive","Simple progressive with soft shadows","Complex progressive"],"Complex progressive"),"Progressive shader type",!1);o.append(s,c),i.append(a,o),n.append(t,r,i),e.push(bc)},Ti=(n,e)=>{yc(n,e)},wc=`struct VertexNormal {
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
`,jt="brdfs",Bt="progressive-enabled-cb-"+jt,Bi="brdf-color-picker",Lc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await cn(jt),i=G(Bt,"checked"),a=G(Bi),o=ie(await $n("models/CornellBox.obj")),s=me(o),c=Ie([s.vertices,s.normals]),l=new Uint32Array(s.indices);Ae(l,o.matIndices,4);const u=new Uint32Array(o.lightIndices),f=new Float32Array(o.materials.reduce((R,T)=>[...R,...B([T.color,T.specular,T.emission,h(T.illum,T.shininess,T.ior)])],[]));let{renderSrc:d,renderDst:_,blitPingPong:m}=Qe(n,r);const v=n.createShaderModule({code:wc}),g=n.createRenderPipeline({layout:"auto",vertex:{module:v,entryPoint:"main_vs"},fragment:{module:v,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:L}=z(n,g,[c,l,u,f],"STORAGE"),{bindGroup:I}=z(n,g,[s.bspPlanes,s.bspTree,s.treeIds],"STORAGE",1),{bindGroup:p,buffers:[w,A,x,O]}=z(n,g,[s.aabb,new Uint32Array([u.length]),new Uint32Array([0,r.width,r.height]),new Float32Array($e(de(a())))],"UNIFORM",2),S=n.createBindGroup({layout:g.getBindGroupLayout(3),entries:[{binding:0,resource:_.createView()}]});let F=0;const E=()=>{if(!i())return;V===!0&&(V=!1,F=0),F+=1,Gn(n,x,new Uint32Array([F]),0),W(n,O,new Float32Array($e(de(a()))),0);const{pass:R,encoder:T}=hn(n,e,mn.black,{otherColorAttachments:[{view:d.createView(),loadOp:"load",storeOp:"store"}]});R.setPipeline(g),R.setBindGroup(0,L),R.setBindGroup(1,I),R.setBindGroup(2,p),R.setBindGroup(3,S),R.draw(4),R.end(),m(T),n.queue.submit([T.finish()]),requestAnimationFrame(E)};An(Bt,R=>{R&&requestAnimationFrame(E)},"checked");let V=!1;Mt("restart-progressive-brdf",()=>V=!0),E()},Ic=(n,e)=>{const t=on("Progressive rendering, the basics"),r=an("No description yet"),i=tn(),a=en(jt),o=_n(),s=P(Qn(Bt,!0),"Progressive rendering enabled",!1),c=P(He(Bi,"#1a3205"),"Sphere extinction coefficient"),l=Ft("restart-progressive-brdf","Restart progressive");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(Lc)},Ri=(n,e)=>{Ic(n,e)},Ac=`struct VertexNormal {
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
`,Nt="environmental",Rt="progressive-enabled-cb-"+Nt,Sc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await cn(Nt),i=G(Rt,"checked"),a=G("environmental-texture-type"),{texture:o,sampler:s}=await Ye(n,"textures/luxo_pxr_campus.jpg"),{texture:c,sampler:l}=await Ye(n,"textures/luxo_pxr_campus.hdr.png"),u=ie(await $n("models/teapot.obj",1)),f=me(u),d=Ie([f.vertices,f.normals]),_=new Uint32Array(f.indices);Ae(_,u.matIndices,4);const m=new Float32Array(u.materials.reduce((C,$)=>[...C,...B([$.color,$.specular,$.emission,h($.illum,$.shininess,$.ior)])],[]));let{renderSrc:v,renderDst:g,blitPingPong:L}=Qe(n,r);const I=n.createShaderModule({code:Ac}),p=n.createRenderPipeline({layout:"auto",vertex:{module:I,entryPoint:"main_vs"},fragment:{module:I,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:w}=z(n,p,[d,_,m],"STORAGE"),{bindGroup:A}=z(n,p,[f.bspPlanes,f.bspTree,f.treeIds],"STORAGE",1),{bindGroup:x,buffers:[O,S,F,E,V]}=z(n,p,[f.aabb,new Uint32Array([0,r.width,r.height]),new Uint32Array([3,0,0,0]),new Float32Array([1,0,0,0]),new Uint32Array([0,0,0,0])],"UNIFORM",2),R=n.createBindGroup({layout:p.getBindGroupLayout(3),entries:[{binding:0,resource:g.createView()},{binding:1,resource:l},{binding:2,resource:c.createView()}]}),T=n.createBindGroup({layout:p.getBindGroupLayout(3),entries:[{binding:0,resource:g.createView()},{binding:1,resource:s},{binding:2,resource:o.createView()}]});let q=0;const rn=()=>{if(!i())return;X===!0&&(X=!1,q=0),q+=1,Gn(n,S,new Uint32Array([q]),0);const{pass:C,encoder:$}=hn(n,e,mn.black,{otherColorAttachments:[{view:v.createView(),loadOp:"load",storeOp:"store"}]});C.setPipeline(p),C.setBindGroup(0,w),C.setBindGroup(1,A),C.setBindGroup(2,x),C.setBindGroup(3,a()==="High dynamic range"?R:T),C.draw(4),C.end(),L($),n.queue.submit([$.finish()]),requestAnimationFrame(rn)};An(Rt,C=>{C&&requestAnimationFrame(rn)},"checked");const sn=C=>{const $={"Base color":3,Lambertian:0,Mirror:1}[C];Gn(n,F,new Uint32Array([$]),0)};sn(An("model-shader-select-env",sn));const U=C=>{W(n,E,new Float32Array([C?1:0,0,0,0]),0)};U(An("include-sunlight",U,"checked"));const Y=C=>{const $=C==="High dynamic range"?1:0;Gn(n,V,new Uint32Array([$]),0)};Y(An("environmental-texture-type",Y));let X=!1;Mt("restart-progressive-env",()=>X=!0),rn()},Tc=(n,e)=>{const t=on("env"),r=an("No description yet"),i=tn(),a=en(Nt),o=_n(),s=P(Qn(Rt,!0),"Progressive rendering enabled",!1),c=P(Fn("model-shader-select-env",["Base color","Lambertian","Mirror"],"Lambertian"),"Model shader type",!1),l=P(Qn("include-sunlight",!0),"Sun light on",!1),u=P(Fn("environmental-texture-type",["Low dynamic range","High dynamic range"],"Low dynamic range"),"Environmental texture type",!1),f=Ft("restart-progressive-env","Restart progressive");o.append(s,c,l,u,f),i.append(a,o),n.append(t,r,i),e.push(Sc)},Pi=(n,e)=>{Tc(n,e)},Bc=`struct VertexNormal {
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
`,Rc=`@group(0) @binding(0) var<storage, read_write> debug_canvas : array<vec4f>;
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
`,xe="drawing-to-debug-canvas",Pt="progressive-enabled",Pc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await cn(xe),i=G(Pt,"checked"),a=ot("pixel-value-debug"),o=ot("pixel-count-debug"),s=ie(await $n("models/CornellBoxWithBlocks.obj")),c=me(s),l=Ie([c.vertices,c.normals]),u=new Uint32Array(c.indices);Ae(u,s.matIndices,4);const f=new Uint32Array(s.lightIndices),d=new Float32Array(s.materials.reduce((j,N)=>[...j,...B([N.color,N.specular,N.emission,h(N.illum,N.shininess,N.ior)])],[])),{renderSrc:_,renderDst:m,blitPingPong:v}=Qe(n,r),g=n.createShaderModule({code:Bc}),L=n.createRenderPipeline({layout:"auto",vertex:{module:g,entryPoint:"main_vs"},fragment:{module:g,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),I=document.getElementById(xe+"-debug"),p=I.getContext("gpupresent")||I.getContext("webgpu");p.configure({device:n,format:t,alphaMode:"premultiplied"});const w=n.createShaderModule({code:Rc}),A=n.createRenderPipeline({layout:"auto",vertex:{module:w,entryPoint:"main_vs",buffers:[]},fragment:{module:w,entryPoint:"main_fs",targets:[{format:t}]},primitive:{topology:"triangle-strip"}}),{bindGroup:x}=z(n,L,[l,u,f,d,c.bspPlanes,c.bspTree,c.treeIds],"STORAGE"),O=n.createBindGroup({layout:L.getBindGroupLayout(1),entries:[{binding:0,resource:m.createView()}]}),{bindGroup:S,buffers:[F,E,V]}=z(n,L,[c.aabb,new Uint32Array([f.length]),new Uint32Array([0,r.width,r.height])],"UNIFORM",2),R=n.createBuffer({size:Pn.float32x4*r.height*r.width,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC}),T=n.createBuffer({size:Pn.float32x4,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),q=async()=>{await T.mapAsync(GPUMapMode.READ);const j=new Float32Array(T.getMappedRange());a([...j].map(N=>N.toFixed(2)).join(", ")),T.unmap()},rn=n.createBindGroup({layout:L.getBindGroupLayout(3),entries:[{binding:0,resource:{buffer:R}}]}),sn=n.createBuffer({size:Pn.float32x2,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});let U=16;const Y=n.createBuffer({size:new Uint32Array(1).byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});Gn(n,Y,new Uint32Array([U]),0);const X=n.createBindGroup({layout:A.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:R}},{binding:1,resource:{buffer:sn}},{binding:2,resource:{buffer:Y}}]}),C=j=>{const N=j.beginRenderPass({colorAttachments:[{view:p.getCurrentTexture().createView(),loadOp:"clear",clearValue:mn.transparent,storeOp:"store"}]});N.setPipeline(A),N.setBindGroup(0,X),N.draw(4),N.end()};let $=0;const Q=()=>{if(!i())return;$+=1,Gn(n,V,new Uint32Array([$]),0);const j=n.createCommandEncoder(),N=j.beginRenderPass({colorAttachments:[{view:e.getCurrentTexture().createView(),loadOp:"clear",clearValue:mn.black,storeOp:"store"},{view:_.createView(),loadOp:"load",storeOp:"store"}]});N.setPipeline(L),N.setBindGroup(0,x),N.setBindGroup(1,O),N.setBindGroup(2,S),N.setBindGroup(3,rn),N.draw(4),N.end(),C(j),v(j),n.queue.submit([j.finish()]),requestAnimationFrame(Q)};requestAnimationFrame(Q),An(Pt,()=>requestAnimationFrame(Q),"checked");let pn={x:0,y:0};const bn=j=>{const N=j.x,Mn=r.height-j.y;pn.x=Math.floor(N),pn.y=Math.floor(Mn),Gn(n,sn,new Uint32Array([N,Mn]),0);const gn=n.createCommandEncoder();C(gn),n.queue.submit([gn.finish()])};at(xe,{onMove:bn,onStart:bn},{});let Z=!1,ln=0;const un=j=>{const N=n.createCommandEncoder();if(!Z){const gn=Math.floor(j.x/512*U)+pn.x-U/2,Ln=(Math.floor((1-j.y/512)*U)+pn.y-U/2)*512+gn;N.copyBufferToBuffer(R,Pn.float32x4*Ln,T,0,Pn.float32x4),n.queue.submit([N.finish()]),q();return}const Mn=2*Math.round((j.y-ln)/2);U=Me(U+Mn,2,512),Gn(n,Y,new Uint32Array([U]),0),o(U.toString()),C(N),n.queue.submit([N.finish()]),ln=j.y};at(xe+"-debug",{onMove:un,onStart:j=>{ln=j.y,Z=!0},onEnd:()=>Z=!1},{alwaysMouseMove:!0})},Oc=(n,e)=>{const t=on("Progressive rendering, the basics"),r=an("No description yet"),i=en(xe),a=P(Qn(Pt,!1),"Progressive rendering enabled",!1),o=_n();o.append(a);const s=tn();s.append(i,o);const c=en(xe+"-debug"),l=tn(),u=P(it("pixel-count-debug"),"Debug canvas dimension"),f=P(it("pixel-value-debug"),"Pixel value"),d=_n();d.append(u,f),l.append(c,d),n.append(t,r,s,l),e.push(Pc)},Fc=(n,e)=>{Oc(n,e)},Mc=(n,e)=>{Zr(n,e),ci(n,e),di(n,e),xi(n,e),Ti(n,e),Ri(n,e),Pi(n,e)},Oi={path:"rendering",generator:Mc,name:"Rendering",description:"",children:[{path:"raycasting-introduction",name:"Introduction to raycasting",description:"A conscise look into the anatomy of a raycasting system.",generator:Zr},{path:"lighting-models",name:"Lighting models",description:"An overview of the basic lighting models implemented in rendering.",generator:ci},{path:"texture-mapping",name:"Adding textures",description:"The process of applying textures to conceptual objects in a rendered scene.",generator:di},{path:"measuring-light",name:"Radiometry and photometry",description:"Understanding the process of measuring light through examples of photometric and radiometric equations.",generator:Ws},{path:"meshes",name:"Mesh instantiation",description:"The simplest appraoch of writing mesh data into buffers to loop over in the render process.",generator:xi},{path:"partitioning",name:"Partitioning mesh data",description:"Using the binary space partitioning tree (BSP) to manage large meshes.",generator:mc},{path:"progressive",name:"Progressive rendering",description:"Harnessing the power of progressive rendering to generate smooth render images.",generator:Ti},{path:"brdf",name:"Global illumination",description:"Introducing sampling ray paths to the light models in progressive rendering.",generator:Ri},{path:"environmental",name:"Environemntal mapping",description:"Reading light and color data from an environment map, placing rendered objects in a real life scene.",generator:Pi},{path:"10-production-rendering",name:"Production rendering",description:"A short discussion of production rendering with example from Blender.",generator:()=>{}},{path:"debugging",name:"An approach to debugging (project)",description:"A project delving into the options available to debug and understand rendering systems via displaying ray paths and reading color or variable values.",generator:Fc}]},Ec=async()=>{},Vc=(n,e)=>{const t=on("Using WebGPU for graphics and rendering"),r=an("TBD"),i=Dt(Ze),a=Dt(Oi),o=document.createElement("div");o.className="generic-row",o.append(i,a),n.append(t,r,o),e.push(Ec)},zc=[Ze,Oi],Ot={name:"Landing Page",path:"",description:"",generator:Vc,children:[]},Fi=Ni(),Mi=[],{route:Ei,breadcrumbs:Cc}=ji(zc);Fi.append(ki(Ei,Cc));Ei.generator(Fi,Mi);for(const n of Mi)n();
