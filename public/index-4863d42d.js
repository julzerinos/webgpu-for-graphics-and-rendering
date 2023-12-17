(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const rn=n=>{const e=n.split(`

`),t=document.createElement("div");t.className="paragraph";for(const r of e){const i=document.createElement("span");i.innerHTML=r,t.append(i)}return t},an=n=>{const e=document.createElement("h1");return e.innerHTML=n,e.className="title",e},P=(n,e,t=!0)=>{const r=document.createElement("div");r.className="label-group";const i=document.createElement("label");if(i.textContent=e,r.append(i),t&&"value"in n){const a=document.createElement("label");a.className="value-label";const o=()=>a.textContent=`[ ${n.value} ]`;n.addEventListener("input",o),o(),r.append(a)}return r.append(n),r},K=(n,{width:e,height:t,lowRes:r,overlay:i}={})=>{const a=document.createElement("canvas");return a.width=e??512,a.height=t??512,a.id=n,r&&a.classList.add("low-res"),i&&a.classList.add("overlay"),a},jt=n=>{const e=document.createElement("div");e.className=`routes ${n.path}`;const t=document.createElement("a");t.text=n.path,t.className="underline",e.append(t);const r=document.createElement("div");r.className="routes-container";for(const i of n.children??[]){const a=document.createElement("div");a.className="route-entry";const o=document.createElement("a");o.text=i.name;const s=document.createElement("span");s.textContent=i.description,a.onclick=()=>{Qt(`/${n.path}/${i.path}`)},a.append(o,s),r.append(a)}return e.append(r),e},tt=n=>{const e=document.createElement("div");return e.id=n,e.className="value-display",e},Mi=(n,e)=>{const t=document.createElement("div");t.className=`navigation ${e.map(i=>i.path).join(" ")}`;const r=document.createElement("a");if(r.className="underline-white",r.textContent=Bt.name,r.onclick=()=>{Qt("/")},t.append(r),e.length>1){const i=document.createElement("span");i.textContent="/";const a=document.createElement("a");a.className="underline",a.textContent=n.name,t.append(i,a)}return t},ln=(n,e,t,r,i=1,a=!1)=>{const o=document.createElement("input");return o.id=n,o.type="range",o.className="slider-input",o.min=String(t),o.max=String(r),o.step=String(i),o.value=String(e),o.disabled=a,o},De=(n,e)=>{const t=document.createElement("input");return t.id=n,t.type="color",t.value=e,t},ne=(n,e)=>{const t=document.createElement("input");return t.id=n,t.type="checkbox",t.checked=e,t.value=String(e),t.addEventListener("input",()=>t.value=String(t.checked)),t},Pt=(n,e)=>{const t=document.createElement("button");return t.id=n,t.textContent=e,t},Bn=(n,e,t=e[0]??"")=>{const r=document.createElement("select");return r.id=n,r.append(...e.map(i=>{const a=document.createElement("option");return a.text=i,a.value=i,a.selected=i===t,a})),r},hn=()=>{const n=document.createElement("div");return n.className="interactables",n},en=()=>{const n=document.createElement("div");return n.className="canvas-section",n},k=(n,e="value")=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate input with id ${n}`);return()=>t[e]},wn=(n,e,t="value")=>{const r=document.getElementById(n);if(!r)throw new Error(`Could not locate input with id ${n}`);return r.addEventListener("input",()=>e(r[t])),r.value},Ot=(n,e)=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate button with id ${n}`);t.addEventListener("click",e)},Vi=(n,e)=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate canvas with id ${n}`);t.addEventListener("click",r=>{const i=t.getBoundingClientRect(),a=r.clientX-i.left,o=r.clientY-i.top;e({x:a,y:o})})},rt=(n,{onStart:e,onMove:t,onEnd:r},{alwaysMouseMove:i}={})=>{const a=document.getElementById(n);if(!a)throw new Error(`Could not locate canvas with id ${n}`);const o=c=>{const l=a.getBoundingClientRect();return{x:c.clientX-l.left,y:c.clientY-l.top}};let s=!1;a.addEventListener("mousedown",c=>{s=!0,e==null||e(o(c))}),a.addEventListener("mouseup",c=>{s=!1,r==null||r(o(c))}),a.addEventListener("mouseleave",c=>{s&&(s=!1,r==null||r(o(c)))}),a.addEventListener("mousemove",c=>{!i&&!s||t==null||t(o(c))})},Ft=(n,e)=>{for(const t of n){const r=document.getElementById(t);if(!r)throw new Error(`Could not locate element with id ${t}`);r.addEventListener("input",()=>e(t))}},zi=(n,e,{onStart:t,onEnd:r}={})=>{const i=document.getElementById(n);if(!i)throw new Error(`Could not locate canvas with id ${n}`);i.addEventListener("click",async()=>{document.pointerLockElement||await i.requestPointerLock()});const a=l=>{e(l.movementX,l.movementY)};let o={};const s=l=>{o[l.key]=!0},c=l=>{o[l.key]=!1};return document.addEventListener("pointerlockchange",()=>{if(document.pointerLockElement===i){console.log("[pointer api] locked pointer in canvas"),document.addEventListener("mousemove",a,!1),window.addEventListener("keydown",s),window.addEventListener("keyup",c),t==null||t();return}document.removeEventListener("mousemove",a,!1),window.removeEventListener("keydown",s),window.removeEventListener("keyup",c),r==null||r()},!1),{keyMap:o}},it=n=>{const e=document.getElementById(n);if(!e)throw new Error(`Could not locate display with id ${n}`);return t=>e.innerText=t},Ci=n=>{const e=window.location.pathname.split("/").slice(2);let t=Bt,r=n;const i=[Bt];for(const a of e){const o=r.find(s=>s.path===a);if(!o)break;t=o,r=t.children??[],i.push(t)}return{route:t,breadcrumbs:i}},Qt=n=>{location.href="/webgpu-for-graphics-and-rendering"+n},Gi=()=>{const n=document.getElementById("app");if(!n)throw new Error("Could not initialize app.");return n},w=(n=0,e=0)=>[n,e],b=(n=0,e=0,t=0)=>[n,e,t],u=(n=0,e=0,t=0,r=1)=>[n,e,t,r],Ln=n=>{const e=n[0]??0,t=n[1]??0,r=n[2]??0;return b(e,t,r)},nr={forward:b(0,0,1),back:b(0,0,-1),up:b(0,1,0),down:b(0,-1,0),right:b(1,0,0),left:b(-1,0,0)},T=n=>[].concat(...n),G=(n,e)=>{const t=[];for(let r=0;r<Math.min(n.length,e.length);r++)t.push(n[r]+e[r]);return t},_e=(n,e)=>{const t=[];for(let r=0;r<Math.min(n.length,e.length);r++)t.push(n[r]-e[r]);return t},Jn=(n,e)=>{const t=[];for(let r=0;r<n.length;r++)t.push(e*n[r]);return t},Ke=(n,e)=>{const t=[];for(let r=0;r<Math.min(n.length,e.length);r++)t.push((n[r]+e[r])/2);return t},Ue=(n,e)=>{let t=0;for(let r=0;r<Math.min(n.length,e.length);r++)t+=n[r]*e[r];return t},He=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Et=(n,e)=>{const t=[];for(let r=0;r<Math.max(n.length,e.length);r++){let i=Number.POSITIVE_INFINITY;r<n.length&&(i=n[r]),r<e.length&&(i=Math.min(i,e[r])),t.push(i)}return t},Mt=(n,e)=>{const t=[];for(let r=0;r<Math.max(n.length,e.length);r++){let i=Number.NEGATIVE_INFINITY;r<n.length&&(i=n[r]),r<e.length&&(i=Math.max(i,e[r])),t.push(i)}return t},jn=n=>Jn(n,1/Vt(n)),er=n=>Ue(n,n),Vt=n=>Math.sqrt(er(n)),tr=(n,e)=>{if(n.length!=e.length)return!1;for(let t=0;t<Math.min(n.length,e.length);t++)if(n[t]!=e[t])return!1;return!0},Oe=(n,e)=>{const t=[];for(let r=0;r<n.length;r++){let i=0;for(let a=0;a<n.length;a++)i+=e[r][a]*n[a];t.push(i)}return t},Re=(n=0,e=0,t=0,r=1)=>({r:n,g:e,b:t,a:r}),Qe=n=>b(n.r,n.g,n.b),qe=n=>u(n.r,n.g,n.b,n.a),vn={black:Re(0,0,0,1),white:Re(1,1,1,1),blueScreenBlue:Re(.1,.3,.6,1),transparent:Re(0,0,0,0)},ce=n=>{if(n[0]==="#"&&(n=n.substring(1)),n.length!==6)throw new Error("Can't handle color hexes of size other than 6.");const e=parseInt(n,16),t=(e>>16&255)/255,r=(e>>8&255)/255,i=(e&255)/255;return{r:t,g:r,b:i,a:1}},zn=n=>n*Math.PI/180,re=(n,e,t,r,i)=>(n-e)/(t-e)*(i-r)+r,Ge=n=>n?1:0,Fe=(n,e,t)=>Math.min(Math.max(n,e),t),ge=(n,e)=>{const t=e/2;return[w(n[0]-t,n[1]-t),w(n[0]+t,n[1]-t),w(n[0]-t,n[1]+t),w(n[0]-t,n[1]+t),w(n[0]+t,n[1]-t),w(n[0]+t,n[1]+t)]},ki=(n,e,t=12)=>{const r=[],i=2*Math.PI/t;for(let a=0;a<t;a++)r.push(n,G(n,w(e*Math.cos(a*i),e*Math.sin(a*i))),G(n,w(e*Math.cos((a+1)*i),e*Math.sin((a+1)*i))));return r},Ve=(n,e)=>{const t=e/2,r=[u(...G(n,b(-t,-t,t)),1),u(...G(n,b(-t,t,t)),1),u(...G(n,b(t,t,t)),1),u(...G(n,b(t,-t,t)),1),u(...G(n,b(-t,-t,-t)),1),u(...G(n,b(-t,t,-t)),1),u(...G(n,b(t,t,-t)),1),u(...G(n,b(t,-t,-t)),1)],i=new Uint32Array([0,1,1,2,2,3,3,0,2,3,3,7,7,6,6,2,0,3,3,7,7,4,4,0,1,2,2,6,6,5,5,1,4,5,5,6,6,7,7,4,0,1,1,5,5,4,4,0]),a=[u(1,0,3),u(3,2,1),u(2,3,7),u(7,6,2),u(3,0,4),u(4,7,3),u(6,5,1),u(1,2,6),u(4,5,6),u(6,7,4),u(5,4,0),u(0,1,5)];return{vertices:r,lineIndices:i,triangleIndices:a,normals:[],triangleCount:12}},Ui=n=>{const e=[u(...n[0],1),u(...n[1],1),u(...n[2],1)],t=[u(0,1,2,0)],r=[0,1,1,2,2,0];return{vertices:e,lineIndices:new Uint32Array(r),triangleIndices:t,triangleCount:1,normals:[]}},zt=(n=0)=>{const e=[u(0,0,1),u(0,2*Math.sqrt(2)/3,-.3333333333333333),u(-Math.sqrt(6)/3,-Math.sqrt(2)/3,-.3333333333333333),u(Math.sqrt(6)/3,-Math.sqrt(2)/3,-.3333333333333333)];let t=[u(0,3,1),u(0,2,3),u(1,3,2),u(1,2,0)];const r=i=>{if(i<=0)return;const a=[],o=new Map;for(const s of t){const c=Ln(e[s[0]]),l=Ln(e[s[1]]),d=Ln(e[s[2]]),f=u(...jn(Ke(c,l))),h=u(...jn(Ke(l,d))),v=u(...jn(Ke(d,c))),m=[s[0],s[1]].sort().toString();let _=o.get(m);_||(_=e.push(f)-1,o.set(m,_));const g=[s[1],s[2]].sort().toString();let L=o.get(g);L||(L=e.push(h)-1,o.set(g,L));const I=[s[0],s[2]].sort().toString();let p=o.get(I);p||(p=e.push(v)-1,o.set(I,p)),a.push(u(s[0],_,p),u(s[1],L,_),u(s[2],p,L),u(_,L,p))}t=a,r(i-1)};return r(n),{vertices:e,triangleIndices:t,triangleCount:t.length,normals:[]}},kn=(n=0,e=0,t=0,r=0,i=0,a=0,o=0,s=0,c=0,l=0,d=0,f=0,h=0,v=0,m=0,_=0)=>[[n,e,t,r],[i,a,o,s],[c,l,d,f],[h,v,m,_]],An=(n=0,e=0,t=0,r=0,i=0,a=0,o=0,s=0,c=0)=>[[n,e,t],[r,i,a],[o,s,c]],xn=()=>kn(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),nn=n=>[].concat(...Di(n)),be=n=>[].concat(...n.map(e=>nn(e))),Fn=(n,e,t)=>{if(tr(n,e))return xn();let r=jn(_e(e,n));const i=jn(He(r,t)),a=jn(He(i,r));return r=Jn(r,-1),kn(...u(...i,-Ue(i,n)),...u(...a,-Ue(a,n)),...u(...r,-Ue(r,n)),...u())},Ni=(n,e,t,r,i,a)=>{if(n===e)throw"ortho(): left and right are equal";if(t===r)throw"ortho(): bottom and top are equal";if(i===a)throw"ortho(): near and far are equal";const o=e-n,s=r-t,c=a-i,l=xn();return l[0][0]=2/o,l[1][1]=2/s,l[2][2]=-2/c,l[0][3]=-(n+e)/o,l[1][3]=-(r+t)/s,l[2][3]=-(i+a)/c,l},Qn=(n,e,t,r)=>{const i=1/Math.tan(zn(n)/2),a=r-t,o=xn();return o[0][0]=i/e,o[1][1]=i,o[2][2]=-(t+r)/a,o[2][3]=-2*t*r/a,o[3][2]=-1,o[3][3]=0,o},Pe=(n,e)=>{const t=jn(e),r=t[0],i=t[1],a=t[2],o=Math.cos(zn(n)),s=Math.sin(zn(n)),c=1-o;return kn(...u(r*r*c+o,r*i*c-a*s,r*a*c+i*s,0),...u(r*i*c+a*s,i*i*c+o,i*a*c-r*s,0),...u(r*a*c-i*s,i*a*c+r*s,a*a*c+o,0),...u())},Te=n=>{var e=Math.cos(zn(n)),t=Math.sin(zn(n)),r=kn(1,0,0,0,0,e,-t,0,0,t,e,0,0,0,0,1);return r},Ee=n=>{var e=Math.cos(zn(n)),t=Math.sin(zn(n)),r=kn(e,0,t,0,0,1,0,0,-t,0,e,0,0,0,0,1);return r},ji=n=>{var e=Math.cos(zn(n)),t=Math.sin(zn(n)),r=kn(e,-t,0,0,t,e,0,0,0,0,1,0,0,0,0,1);return r},yn=({[0]:n,[1]:e,[2]:t})=>{const r=xn();return r[0][3]=n,r[1][3]=e,r[2][3]=t,r},Gn=(n=1,e=1,t=1)=>{var r=xn();return r[0][0]=n,r[1][1]=e,r[2][2]=t,r},M=(n,e)=>{const t=[];for(let r=0;r<n.length;r++){t.push([]);for(let i=0;i<e.length;i++){let a=0;for(let o=0;o<n.length;o++)a+=n[r][o]*e[o][i];t[r].push(a)}}return t},Di=n=>{const e=[];for(let t=0;t<n.length;++t){e.push([]);for(let r=0;r<n[t].length;++r)e[t].push(n[r][t])}return e},Sn=n=>n[0][0]*n[1][1]*n[2][2]+n[0][1]*n[1][2]*n[2][0]+n[0][2]*n[2][1]*n[1][0]-n[2][0]*n[1][1]*n[0][2]-n[1][0]*n[0][1]*n[2][2]-n[0][0]*n[1][2]*n[2][1],Hi=n=>{const e=An(n[1][1],n[1][2],n[1][3],n[2][1],n[2][2],n[2][3],n[3][1],n[3][2],n[3][3]),t=An(n[1][0],n[1][2],n[1][3],n[2][0],n[2][2],n[2][3],n[3][0],n[3][2],n[3][3]),r=An(n[1][0],n[1][1],n[1][3],n[2][0],n[2][1],n[2][3],n[3][0],n[3][1],n[3][3]),i=An(n[1][0],n[1][1],n[1][2],n[2][0],n[2][1],n[2][2],n[3][0],n[3][1],n[3][2]);return n[0][0]*Sn(e)-n[0][1]*Sn(t)+n[0][2]*Sn(r)-n[0][3]*Sn(i)},Dt=n=>{const e=xn(),t=Hi(n),r=An(n[1][1],n[1][2],n[1][3],n[2][1],n[2][2],n[2][3],n[3][1],n[3][2],n[3][3]),i=An(n[1][0],n[1][2],n[1][3],n[2][0],n[2][2],n[2][3],n[3][0],n[3][2],n[3][3]),a=An(n[1][0],n[1][1],n[1][3],n[2][0],n[2][1],n[2][3],n[3][0],n[3][1],n[3][3]),o=An(n[1][0],n[1][1],n[1][2],n[2][0],n[2][1],n[2][2],n[3][0],n[3][1],n[3][2]),s=An(n[0][1],n[0][2],n[0][3],n[2][1],n[2][2],n[2][3],n[3][1],n[3][2],n[3][3]),c=An(n[0][0],n[0][2],n[0][3],n[2][0],n[2][2],n[2][3],n[3][0],n[3][2],n[3][3]),l=An(n[0][0],n[0][1],n[0][3],n[2][0],n[2][1],n[2][3],n[3][0],n[3][1],n[3][3]),d=An(n[0][0],n[0][1],n[0][2],n[2][0],n[2][1],n[2][2],n[3][0],n[3][1],n[3][2]),f=An(n[0][1],n[0][2],n[0][3],n[1][1],n[1][2],n[1][3],n[3][1],n[3][2],n[3][3]),h=An(n[0][0],n[0][2],n[0][3],n[1][0],n[1][2],n[1][3],n[3][0],n[3][2],n[3][3]),v=An(n[0][0],n[0][1],n[0][3],n[1][0],n[1][1],n[1][3],n[3][0],n[3][1],n[3][3]),m=An(n[0][0],n[0][1],n[0][2],n[1][0],n[1][1],n[1][2],n[3][0],n[3][1],n[3][2]),_=An(n[0][1],n[0][2],n[0][3],n[1][1],n[1][2],n[1][3],n[2][1],n[2][2],n[2][3]),g=An(n[0][0],n[0][2],n[0][3],n[1][0],n[1][2],n[1][3],n[2][0],n[2][2],n[2][3]),L=An(n[0][0],n[0][1],n[0][3],n[1][0],n[1][1],n[1][3],n[2][0],n[2][1],n[2][3]),I=An(n[0][0],n[0][1],n[0][2],n[1][0],n[1][1],n[1][2],n[2][0],n[2][1],n[2][2]);return e[0][0]=Sn(r)/t,e[0][1]=-Sn(s)/t,e[0][2]=Sn(f)/t,e[0][3]=-Sn(_)/t,e[1][0]=-Sn(i)/t,e[1][1]=Sn(c)/t,e[1][2]=-Sn(h)/t,e[1][3]=Sn(g)/t,e[2][0]=Sn(a)/t,e[2][1]=-Sn(l)/t,e[2][2]=Sn(v)/t,e[2][3]=-Sn(L)/t,e[3][0]=-Sn(o)/t,e[3][1]=Sn(d)/t,e[3][2]=-Sn(m)/t,e[3][3]=Sn(I)/t,e},qi=(n,e=[0,0],t=[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER])=>n.slice(e[1],t[1]).map(r=>r.slice(e[0],t[0])),$i=(n,e)=>{for(let t=0;t<n.length;t++)e[t].splice(0,n[t].length,...n[t]);return e},le=async n=>{const e=document.createElement("img");e.src=n,await e.decode();const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");if(!r)throw new Error("Could not get canvas context");r.drawImage(e,0,0,t.width,t.height);const i=r.getImageData(0,0,t.width,t.height),a=new Uint8Array(e.width*e.height*4);for(let o=0;o<e.height;++o)for(let s=0;s<e.width;++s)for(let c=0;c<4;++c)a[(o*e.width+s)*4+c]=i.data[((e.height-o-1)*e.width+s)*4+c];return{textureData:a,height:e.height,width:e.width}},rr=(n,e)=>{const t=1/n,r=t/e;if(e<2)return[w()];const i=[];for(var a=0;a<e;++a)for(var o=0;o<e;++o)i.push(w((Math.random()+o)*r-t*.5,(Math.random()+a)*r-t*.5));return i},Xi=(n,e,t)=>{const r=new Uint8Array(4*n*n);for(let i=0;i<n;++i)for(let a=0;a<n;++a){const o=Math.floor(i/(n/t)),s=Math.floor(a/(n/e)),c=o%2!==s%2?255:0,l=4*(i*n+a);r[l]=r[l+1]=r[l+2]=c,r[l+3]=255}return r},Yi=({data:n,width:e,height:t},r=!1)=>{const i=Math.max(1,e/2|0),a=Math.max(1,t/2|0),o=new Uint8Array(i*a*4),s=(f,h)=>{const v=(h*e+f)*4;return n.subarray(v,v+4)},c=(f,h,v)=>f+(h-f)*v,l=(f,h,v)=>f.map((m,_)=>c(m,h[_],v)),d=(f,h,v,m,_,g)=>{const L=l(f,h,_),I=l(v,m,_);return l(L,I,g)};for(let f=0;f<a;++f)for(let h=0;h<i;++h){const v=(h+.5)/i,m=(f+.5)/a,_=v*e-.5,g=m*t-.5,L=_|0,I=g|0,p=_%1,y=g%1,A=s(L,I),x=s(L+1,I),O=s(L,I+1),S=s(L+1,I+1),F=(f*i+h)*4,E=d(A,x,O,S,p,y);r&&(E[0]=6*i),o.set(E,F)}return{data:o,width:i,height:a}},Ct=(n,e,t=!1)=>{const r=n.length/4/e;let i={data:n,width:e,height:r};const a=[i];for(;i.width>1||i.height>1;)i=Yi(i,t),a.push(i);return a},$e=async(n,e)=>{const r=await(await fetch(e)).blob(),i=await createImageBitmap(r,{colorSpaceConversion:"none"}),a=n.createTexture({size:[i.width,i.height,1],format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT});n.queue.copyExternalImageToTexture({source:i,flipY:!0},{texture:a},{width:i.width,height:i.height});const o=n.createSampler({addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest"});return{texture:a,sampler:o}},ir=(n,{}={})=>{let e=0;const t=[],r=[],i=n.mtls.reduce((o,s)=>({...o,...s.materials.reduce((c,l,d)=>({...c,[l.name]:d}),{})}),{});for(let o=0;o<n.objects.length;o++){const s=n.objects[o];e+=s.faces.length;for(let c=0;c<s.faces.length;c++){const l=s.faces[c];t.push(u(...l.vIndices,1)),r.push(i[l.materialName])}}return{vertices:n.vertices,normals:n.normals,triangleCount:e,triangleIndices:t,materialIndices:r}},Wi=n=>({filename:n,mtls:[],objects:[],vertices:[],normals:[]}),$n=async(n,e=1,t=!1)=>{var l;const i=(l=(await fetch(n)).body)==null?void 0:l.getReader();if(!i)throw new Error("Could not get reader for obj file.");const a=Wi(n),o=ar("_default");a.objects.push(o);const s={objDoc:a,currentObject:o,scale:e,currentMaterialName:"",filename:n,reverse:t};let c="";for(;;){const{value:d,done:f}=await i.read();if(f)break;const v=new TextDecoder("utf-8").decode(d,{stream:!0}).split(`
`);c!==""&&(v[0]=c+v[0],c=""),v[v.length-1]!==""&&(c=v.pop());for(const g of v)await Ji(g,s)}return a},Ji=async(n,e)=>{const t=or(n),r=ae(t);if(r.length!==0)switch(r){case"#":return;case"mtllib":var i=Zi(t,e.filename),a=sa();e.objDoc.mtls.push(a);const o=await fetch(i);if(!o.body)throw new Error("No MTL body to read.");await ia(o.body.getReader(),a);return;case"o":case"g":const s=e.currentObject.numIndices===0?e.objDoc.objects.length-1:e.objDoc.objects.length,c=Ki(t);e.objDoc.objects[s]=c,e.currentObject=c;return;case"v":const l=Qi(t,e.scale);e.objDoc.vertices.push(l);return;case"vn":const d=na(t);e.objDoc.normals.push(d);return;case"usemtl":e.currentMaterialName=ea(t);return;case"f":const f=ta(t,e.currentMaterialName);ra(f,e.objDoc,e.reverse),la(e.currentObject,f);return}},Zi=(n,e)=>{var t=e.lastIndexOf("/"),r="";return t>0&&(r=e.substring(0,t+1)),r+ae(n)},Ki=n=>{var e=ae(n);return ar(e)},Qi=(n,e)=>{var t=Zn(n)*e,r=Zn(n)*e,i=Zn(n)*e;return u(t,r,i,1)},na=n=>{var e=Zn(n),t=Zn(n),r=Zn(n);return u(e,t,r,0)},ea=n=>ae(n),ta=(n,e)=>{const t=fa(e);for(;;){const r=ae(n);if(r.length===0)break;const i=r.split("/");if(i.length>=1){const a=parseInt(i[0])-1;isNaN(a)||t.vIndices.push(a)}if(i.length>=3){const a=parseInt(i[2])-1;t.nIndices.push(a)}else t.nIndices.push(-1)}return t},ra=(n,e,t)=>{var r=[e.vertices[n.vIndices[0]][0],e.vertices[n.vIndices[0]][1],e.vertices[n.vIndices[0]][2]],i=[e.vertices[n.vIndices[1]][0],e.vertices[n.vIndices[1]][1],e.vertices[n.vIndices[1]][2]],a=[e.vertices[n.vIndices[2]][0],e.vertices[n.vIndices[2]][1],e.vertices[n.vIndices[2]][2]],o=Ht(r,i,a);if(o==null){if(n.vIndices.length>=4){var s=[e.vertices[n.vIndices[3]][0],e.vertices[n.vIndices[3]][1],e.vertices[n.vIndices[3]][2]];o=Ht(i,a,s)}o==null&&(o=[0,1,0])}if(t&&(o[0]=-o[0],o[1]=-o[1],o[2]=-o[2]),n.normal=u(o[0],o[1],o[2],0),n.vIndices.length>3){for(var c=n.vIndices.length-2,l=new Array(c*3),d=new Array(c*3),f=0;f<c;f++)l[f*3+0]=n.vIndices[0],l[f*3+1]=n.vIndices[f+1],l[f*3+2]=n.vIndices[f+2],d[f*3+0]=n.nIndices[0],d[f*3+1]=n.nIndices[f+1],d[f*3+2]=n.nIndices[f+2];n.vIndices=l,n.nIndices=d}return n.numIndices=n.vIndices.length,n},ia=async(n,e)=>{const t={material:Gt("",u()),mtl:e};for(;;){const{value:r,done:i}=await n.read();if(i)break;const o=new TextDecoder("utf-8").decode(r,{stream:!0}).split(`
`);for(const s of o)aa(s,t)}e.complete=!0},aa=(n,e)=>{const t=or(n),r=ae(t);if(r.length!==0)switch(r){case"#":return;case"newmtl":const i=ca(t);e.material=Gt(i,u(.8,.8,.8,1)),e.mtl.materials.push(e.material);return;case"Kd":e.material&&(e.material.color=nt(t));return;case"Ka":e.material&&(e.material.emission=nt(t));return;case"Ks":e.material&&(e.material.specular=nt(t));return;case"Ni":e.material&&(e.material.ior=Zn(t));return;case"Ns":e.material&&(e.material.shininess=Zn(t));return;case"illum":e.material&&(e.material.illum=da(t));return}},oa=(n,e)=>{for(var t=0;t<e.mtls.length;t++)for(var r=0;r<e.mtls[t].materials.length;r++)if(e.mtls[t].materials[r].name==n)return e.mtls[t].materials[r];return Gt("_defaultMat",u(.8,.8,.8,1))},ee=(n,{indicesIn3:e}={})=>{let t=0,r=0,i=0;for(var a=0;a<n.objects.length;a++)r+=n.objects[a].numIndices+n.objects[a].faces.length,i+=n.objects[a].faces.length;t=n.vertices.length;const o=new Float32Array(t*4),s=new Float32Array(t*4),c=new Float32Array(t*4),l=new Uint32Array(r),d=new Uint32Array(i),f=[],h=new Map,v=[],m=Me();let _=0,g=0;for(let H=0;H<n.objects.length;H++){const sn=n.objects[H];for(var L=0;L<sn.faces.length;L++){var I=sn.faces[L],p=h.get(I.materialName),y;p===void 0?(y=oa(I.materialName,n),h.set(I.materialName,f.length),p=f.length,f.push(y)):y=f[p],y.emission!==void 0&&y.emission[0]+y.emission[1]+y.emission[2]>0&&v.push(g),d[g++]=p;for(var A=y.color===void 0?u(.8,.8,.8,1):y.color,x=I.normal,O=0;O<I.vIndices.length;O++){var S=I.vIndices[O];l[_]=S;var F=n.vertices[S];o[S*4+0]=F[0],o[S*4+1]=F[1],o[S*4+2]=F[2],o[S*4+3]=1,pa(m,F),c[S*4+0]=A[0],c[S*4+1]=A[1],c[S*4+2]=A[2],c[S*4+3]=A[3];var E=I.nIndices[O];if(E>=0){var V=n.normals[E];s[S*4+0]=V[0],s[S*4+1]=V[1],s[S*4+2]=V[2],s[S*4+3]=0}else s[S*4+0]=x[0],s[S*4+1]=x[1],s[S*4+2]=x[2],s[S*4+3]=0;_++}e||(l[_++]=0)}}const B=new Uint32Array(v);return{vertices:o,normals:s,colors:c,indices:l,materials:f,matIndices:d,lightIndices:B,aabb:new Float32Array(T([m.min,m.max]))}},sa=()=>({complete:!1,materials:[]}),ca=n=>ae(n),nt=n=>{var e=Zn(n),t=Zn(n),r=Zn(n);return u(e,t,r,1)},Gt=(n,e)=>({name:n,color:e,illum:0,shininess:0,ior:1,specular:u(),emission:u()}),ar=n=>({name:n,faces:[],numIndices:0}),la=(n,e)=>{n.faces.push(e),n.numIndices+=e.numIndices},fa=(n="")=>({materialName:n,vIndices:[],nIndices:[],normal:u(1),numIndices:0}),or=n=>({str:n,index:0}),ua=n=>{let e;const t=n.str.length;for(e=n.index;e<t;e++){const r=n.str.charAt(e);if(!(r=="	"||r==" "||r=="("||r==")"||r=='"'))break}n.index=e},ae=n=>{ua(n);const e=ha(n.str,n.index);if(e===0)return"";const t=n.str.substring(n.index,n.index+e);return n.index+=e+1,t},da=n=>parseInt(ae(n)),Zn=n=>parseFloat(ae(n)),ha=(n,e)=>{let t;for(t=e;t<n.length;t++){var r=n.charAt(t);if(r=="	"||r==" "||r=="("||r==")"||r=='"')break}return t-e},Ht=(n,e,t)=>{for(var r=new Float32Array(3),i=new Float32Array(3),a=0;a<3;a++)r[a]=n[a]-e[a],i[a]=t[a]-e[a];var o=Array(3);o[0]=r[1]*i[2]-r[2]*i[1],o[1]=r[2]*i[0]-r[0]*i[2],o[2]=r[0]*i[1]-r[1]*i[0];var s=o[0],c=o[1],l=o[2],d=Math.sqrt(s*s+c*c+l*l);if(d){if(d==1)return o}else return o[0]=0,o[1]=0,o[2]=0,o;return d=1/d,o[0]=s*d,o[1]=c*d,o[2]=l*d,o},_a=4,xe=20,qt=1e-6,$t=4,va=(n,e)=>({primIdx:n,bbox:Me(e)}),ma=n=>{let e=Me();for(var t=0;t<n.length;++t)e=ga(e,n[t].bbox);const r={maxLevel:xe,count:n.length,id:0,bbox:e},i=[];return at(r,r.bbox,0,n,i),{bspTreeRoot:r,tree_objects:i}},at=(n,e,t,r,i)=>{if(r.length<=_a||t===xe){n.axisType=3,n.id=i.length,n.count=r.length,n.plane=0;for(var a=0;a<r.length;++a)i.push(r[a]);return}const o=[],s=[];n.left={id:-1,bbox:Me(),maxLevel:xe,count:0},n.right={id:-1,bbox:Me(),maxLevel:xe,count:0};let c=Number.MAX_VALUE;for(let p=0;p<3;++p)for(let y=1;y<$t;++y){let A={min:[...e.min],max:[...e.max]},x={min:[...e.min],max:[...e.max]};const O=e.max[p],S=e.min[p],F=(O-S)*y/$t+S;A.max[p]=F,x.min[p]=F;let E=0,V=0;for(let R=0;R<r.length;++R){const H=r[R];E+=Se(A,H.bbox)?1:0,V+=Se(x,H.bbox)?1:0}const B=E*Xt(A)+V*Xt(x);B<c&&(c=B,n.axisType=p,n.plane=F,n.left.count=E,n.left.id=0,n.right.count=V,n.right.id=0)}const l=n,d=e.max[l.axisType],f=e.min[l.axisType],h=d-f,v=qt<h/8?h/8:qt;let m=l.plane;if(l.left.count==0){m=d;for(var _=0;_<r.length;++_){const y=r[_].bbox.min[l.axisType];y<m&&(m=y)}m-=v}if(l.right.count==0){m=f;for(var _=0;_<r.length;++_){const A=r[_].bbox.max[l.axisType];A>m&&(m=A)}m+=v}l.plane=m;let g={min:[...e.min],max:[...e.max]},L={min:[...e.min],max:[...e.max]};g.max[l.axisType]=m,L.min[l.axisType]=m;const I=[];for(let p=0;p<r.length;++p){const y=r[p];I.push([p,Se(g,y.bbox)]),Se(g,y.bbox)&&o.push(y),Se(L,y.bbox)&&s.push(y)}r=[],at(l.left,g,t+1,o,i),at(l.right,L,t+1,s,i)},ve=n=>{const e=[];for(var t=0;t<n.indices.length/4;++t){let f=[n.indices[t*4]*4,n.indices[t*4+1]*4,n.indices[t*4+2]*4],h=b(n.vertices[f[0]],n.vertices[f[0]+1],n.vertices[f[0]+2]),v=b(n.vertices[f[1]],n.vertices[f[1]+1],n.vertices[f[1]+2]),m=b(n.vertices[f[2]],n.vertices[f[2]+1],n.vertices[f[2]+2]),_=va(t,[h,v,m]);e.push(_)}const{bspTreeRoot:r,tree_objects:i}=ma(e),a=new Uint32Array(i.map(f=>f.primIdx)),o=(1<<xe+1)-1,s=new Float32Array(o),c=new Uint32Array(o*4),l=(f,h,v)=>{if(h>xe)return;const m=f;let _=(1<<h)-1+v;c[_*4]=m.axisType+(m.count<<2),c[_*4+1]=m.id,c[_*4+2]=(1<<h+1)-1+2*v,c[_*4+3]=(1<<h+1)+2*v,s[_]=m.plane,m.axisType!==3&&(l(m.left,h+1,v*2),l(m.right,h+1,v*2+1))};return l(r,0,0),{...n,treeIds:a,bspTree:c,bspPlanes:s,aabb:new Float32Array(T([r.bbox.min,r.bbox.max]))}},Me=(n=[])=>{let e=u(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,1),t=u(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,1);for(const r of n)e=Et(e,r),t=Mt(t,r);return{max:t,min:e}},pa=(n,e)=>{n.min=Et(n.min,e),n.max=Mt(n.max,e)},ga=(n,e)=>({min:Et(n.min,e.min),max:Mt(n.max,e.max)}),xa=n=>Ln(_e(n.max,n.min)),ba=n=>{const[e,t,r]=xa(n);return e*t+t*r+e*r},Xt=n=>ba(n)*2,Se=(n,e)=>{for(let t=0;t<3;t++)if(e.min[t]>n.max[t]||e.max[t]<n.min[t])return!1;return!0},we=n=>{const e=n.reduce((r,i)=>r+i.length,0),t=new Float32Array(e);for(let r=0;r<Math.max(...n.map(i=>i.length));r+=4)for(let i=0;i<n.length;i++)if(r<n[i].length)for(let a=0;a<4;a++)t[r*n.length+i*4+a]=n[i][r+a];return t},Le=(n,e,t)=>{for(let r=0;r<e.length;r++)n[t*r+3]=e[r]},ya=()=>[0,0,0,1],sr=({[0]:n,[1]:e,[2]:t,[3]:r})=>[n,e,t,r],Be=(n,e)=>{const t=La(e),r=Xe(e,Xe(n,t));return u(r[0],r[1],r[2],n[3])},Xe=(n,e)=>sr([n[1]*e[2]-n[2]*e[1]+e[3]*n[0]+n[3]*e[0],n[2]*e[0]-n[0]*e[2]+e[3]*n[1]+n[3]*e[1],n[0]*e[1]-n[1]*e[0]+e[3]*n[2]+n[3]*e[2],n[3]*e[3]-n[0]*e[0]-n[1]*e[1]-n[2]*e[2]]),wa=n=>n[0]*n[0]+n[1]*n[1]+n[2]*n[2]+n[3]*n[3],La=n=>{const e=wa(n);return sr([-n[0]/e,-n[1]/e,-n[2]/e,n[3]/e])},Yt=(n,e)=>{const t=Math.sin(e*.5),r=jn(n);return[r[0]*t,r[1]*t,r[2]*t,Math.cos(e*.5)]},Ia=(n,e)=>{const t=Math.sqrt(2*(1+n[0]*e[0]+n[1]*e[1]+n[2]*e[2]));return[(n[1]*e[2]-n[2]*e[1])/t,(n[2]*e[0]-n[0]*e[2])/t,(n[0]*e[1]-n[1]*e[0])/t,t/2]},Aa=(n,e)=>{const t=[];for(let r=0;r<n.length;r++){const i=n[r];for(let a=0;a<e;a++){const o=t[a];if(!(o!==void 0&&n[o]<i)){t.splice(a,0,r);break}}}return t.slice(0,e)},Sa={float32:new Float32Array([0]).byteLength,uint32:new Uint32Array([0]).byteLength},Mn={float32x2:new Float32Array(w()).byteLength,float32x3:new Float32Array(b()).byteLength,float32x4:new Float32Array(u()).byteLength},Ra={float32x4x4:new Float32Array(nn(kn())).byteLength},Rn={...Sa,...Mn,...Ra},on=async n=>{navigator.gpu||window.alert("WebGPU is not enabled for this browser.");const t=await navigator.gpu.requestAdapter();if(!t)throw new Error("Could not initialize GPU adapter.");const r=await t.requestDevice(),i=document.getElementById(n);if(!i)throw new Error(`Could not find canvas with id ${n}`);const a=i.getContext("gpupresent")||i.getContext("webgpu");if(!a)throw new Error("Could not generate context for canvas.");const o=navigator.gpu.getPreferredCanvasFormat();return a.configure({device:r,format:o}),{adapter:t,device:r,canvas:i,canvasFormat:o,context:a}},dn=(n,e,t={r:0,g:0,b:0,a:1},{msaaTexture:r,depthStencilAttachmentFactory:i,otherColorAttachments:a}={})=>{const o={view:r?r.createView():e.getCurrentTexture().createView(),resolveTarget:r?e.getCurrentTexture().createView():void 0,loadOp:"clear",clearValue:t,storeOp:"store"},s=n.createCommandEncoder(),c=s.beginRenderPass({colorAttachments:[o,...a??[]],depthStencilAttachment:(i??(()=>{}))()});return{pass:c,executePass:()=>{c.end(),n.queue.submit([s.finish()])},encoder:s}},tn=(n,e,t,r,i="triangle-list",a,{fragmentOverrides:o,blend:s}={})=>{const c=n.createShaderModule({code:r});return n.createRenderPipeline({layout:"auto",vertex:{module:c,entryPoint:"main_vs",buffers:e},fragment:{module:c,entryPoint:"main_fs",targets:[{format:t,blend:s}],...o},...a,primitive:{topology:i,frontFace:"ccw",cullMode:"back",...a==null?void 0:a.primitive}})},fe=(n,e,t,{depthStencilOverwrites:r}={})=>{let i;const a=()=>{i=n.createTexture({size:{width:e.width,height:e.height},format:"depth24plus",sampleCount:t,usage:GPUTextureUsage.RENDER_ATTACHMENT})},o={depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus",...r};return{createDepthTexture:a,depthStencil:o,depthStencilAttachmentFactory:()=>(i||a(),{view:i.createView(),depthLoadOp:"clear",depthClearValue:1,depthStoreOp:"store"})}},Ie=(n,e,t,r)=>({msaaTexture:n.createTexture({size:{width:e.width,height:e.height},format:t,sampleCount:r,usage:GPUTextureUsage.RENDER_ATTACHMENT}),multisample:{count:r}}),$=(n,e,t,r=0,i=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const a=n.createBuffer({size:e.byteLength,usage:i}),o={arrayStride:Rn[t],attributes:[{format:t,offset:0,shaderLocation:r}]};return n.queue.writeBuffer(a,0,e),{bufferLayout:o,buffer:a}},Cn=(n,e,t=GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST)=>{const r=n.createBuffer({size:e.byteLength,usage:t});return n.queue.writeBuffer(r,0,e),{buffer:r}},z=(n,e,t,r,i=0)=>{const a=t.map(s=>{const c=n.createBuffer({size:s.byteLength,usage:GPUBufferUsage[r]|GPUBufferUsage.COPY_DST});return n.queue.writeBuffer(c,0,s),c}),o=n.createBindGroup({layout:e.getBindGroupLayout(i),entries:a.map((s,c)=>({binding:c,resource:{buffer:s}}))});return{buffers:a,bindGroup:o}},Un=(n,e,t,r,i=0,{createViewOverwrite:a}={})=>n.createBindGroup({layout:e.getBindGroupLayout(i),entries:[{binding:0,resource:r},{binding:1,resource:t.createView(a)}]}),Kn=(n,e,t,r,i,{mips:a}={})=>{const o=n.createTexture({size:[t,r,1],format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING,mipLevelCount:a?a.length:void 0});(a||[{data:e,width:t,height:r}]).forEach(({data:l,width:d,height:f},h)=>{n.queue.writeTexture({texture:o,mipLevel:h},l,{bytesPerRow:d*4},{width:d,height:f})});const c=n.createSampler({addressModeU:"repeat",addressModeV:"repeat",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",...i});return{texture:o,sampler:c}},Ta=(n,e,t,r)=>{const i=n.createTexture({dimension:"2d",size:[t,r,6],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});for(let o=0;o<e.length;o++)n.queue.writeTexture({texture:i,origin:[0,0,o]},e[o],{bytesPerRow:t*4},[t,r]);const a=n.createSampler({magFilter:"linear",minFilter:"linear"});return{cubemapTexture:i,sampler:a}},Ze=(n,e)=>{const t=n.createTexture({size:[e.width,e.height],usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,format:"rgba32float"}),r=n.createTexture({size:[e.width,e.height],usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,format:"rgba32float"});return{renderDst:r,renderSrc:t,blitPingPong:a=>a.copyTextureToTexture({texture:t},{texture:r},[e.width,e.height])}},J=(n,e,t,r,i=!1)=>{if(i){const a=new Float32Array(r/Float32Array.BYTES_PER_ELEMENT),o=new Float32Array((e.size-t.byteLength-a.byteLength)/Float32Array.BYTES_PER_ELEMENT);t=new Float32Array([...a,...t,...o]),r=0}n.queue.writeBuffer(e,r,t)},Vn=(n,e,t,r,i=!1)=>{if(i){const a=new Uint32Array(r/Float32Array.BYTES_PER_ELEMENT),o=new Uint32Array((e.size-t.byteLength-a.byteLength)/Uint32Array.BYTES_PER_ELEMENT);t=new Uint32Array([...a,...t,...o]),r=0}n.queue.writeBuffer(e,r,t)},kt=kn(1,0,0,0,0,1,0,0,0,0,-.5,.5,0,0,0,1),Ba=`@vertex
fn main_vs(@location(0) pos : vec2f) -> @builtin(position) vec4f
{
    return vec4f(pos, 0, 1);
}
@fragment
fn main_fs() -> @location(0) vec4f
{
    return vec4f(0.0, 0.0, 0.0, 1.0);
}
`,Pa=async()=>{const{device:n,canvas:e,context:t,canvasFormat:r}=await on("task1"),i=[].concat(T(ge([0,0],10*(2/e.height))),T(ge([1,0],10*(2/e.height))),T(ge([1,1],10*(2/e.height)))),a=new Float32Array(i),{buffer:o,bufferLayout:s}=$(n,a,"float32x2"),c=tn(n,[s],r,Ba),{pass:l,executePass:d}=dn(n,t,{r:.3921,g:.5843,b:.9294,a:1});l.setPipeline(c),l.setVertexBuffer(0,o),l.draw(i.length/2),d()},Oa=(n,e)=>{const t=an("Hello (GPU) world"),r=rn(`
With WebGPU, even the simplest 'Hello world!' exercise is already met with an obstacle. 
Points, the most primitive of shapes, are drawn to the screen as single pixels. 
This could work for low resolution images, but targeting something larger requires transforming the pixels into quads (two triangles forming a square) of the desired size.

The quads are transformed into a vertex buffer (flattened array of vector components) and attached to the render pass before the draw command. 
With this, the first step has been made. 
Displaying anything on the screen is just a trivial extension of drawing some points, really.
        `),i=K("task1"),a=en();a.append(i),n.append(t,r,a),e.push(Pa)},Fa=`struct VSOut {
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
`,Ea=async()=>{const{device:n,context:e,canvasFormat:t}=await on("task2"),{pass:r,executePass:i}=dn(n,e,{r:.3921,g:.5843,b:.9294,a:1}),a=[w(0,0),w(1,0),w(1,1)],o=[b(1,0,0),b(0,1,0),b(0,0,1)],s=new Float32Array(T(a)),c=new Float32Array(T(o)),{buffer:l,bufferLayout:d}=$(n,s,"float32x2"),{buffer:f,bufferLayout:h}=$(n,c,"float32x3",1),v=tn(n,[d,h],t,Fa);r.setPipeline(v),r.setVertexBuffer(0,l),r.setVertexBuffer(1,f),r.draw(a.length),i()},Ma=(n,e)=>{const t=an("A formal introduction to the triangle"),r=rn(`
The triangle was mentioned in the previous section, but a passing mention does not do enough to emphasis the role this simple shape plays in the world of computer graphics.
The triangle, a shape made of any three unique vertices, is the most commonly used building block of virtual worlds.

The reasons (beyond simply stating this is how it was always done) come from the mathematical simplicity of the shape.
The triangle has the lowest number of vertices (points) which generate a flat surface polygon. The triangle also has a powerful feature which elevates it above its more complex cousins - Barycentric coordinates.

The set of three factors are crucial to smoothly interpolate values over the surface of the triangle (across the "axes" of its three points). 
Not only is this used to calculate the fragments which belong to the triangle between its points, but can be extended to support any attribute such as colors (see below) or as will soon be shown normals and texture coordinates.

Almost any complex graphical shape is now a collection of a multiple of three vertex points waiting to be interpolated.
`),i=K("task2"),a=en();a.append(i),n.append(t,r,a),e.push(Ea)},Va=`struct Time {
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
`,za=async()=>{const{device:n,context:e,canvasFormat:t}=await on("task3"),r=ge(w(0,0),1),i=new Float32Array(T(r)),{bufferLayout:a,buffer:o}=$(n,i,"float32x2"),s=tn(n,[a],t,Va),{bindGroup:c,buffers:[l]}=z(n,s,[new Float32Array(1)],"UNIFORM"),d=f=>{J(n,l,new Float32Array([f/1e3]),0);const{pass:h,executePass:v}=dn(n,e,{r:.3921,g:.5843,b:.9294,a:1});h.setPipeline(s),h.setVertexBuffer(0,o),h.setBindGroup(0,c),h.draw(r.length),v(),requestAnimationFrame(d)};requestAnimationFrame(d)},Ca=(n,e)=>{const t=an("Move, please"),r=rn(`
A static triangle is hardly anything to write home about. Getting the shapes to move (or better - react to input) is what makes this whole endevour worthwhile.
The GPU does not have a concept of human time. To be fair, time is not much more than a constantly increasing linear value and should be just that.

While vertex buffers are key to generate shapes in the virtual space, storage and uniform buffers are optionally used to provide auxiliary data to the GPU. 
Time, just like any other variable, can then be fed into the mathematical algorithms defined in shaders to create a property function dependent on time.

Trigonometric functions (especially sinusoidal waves) soon become a shader author's best friend.
`),i=K("task3"),a=en();a.append(i),n.append(t,r,a),e.push(za)},Ga=`struct Time {
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
`,ka=async()=>{const{device:n,context:e,canvasFormat:t}=await on("task4"),r=ge(w(0,0),2),i=new Float32Array(T(r)),a=k("ball-height"),o=k("ball-size"),s=k("ball-speed"),{bufferLayout:c,buffer:l}=$(n,i,"float32x2"),d=tn(n,[c],t,Ga),{bindGroup:f,buffers:[h]}=z(n,d,[new Float32Array([0])],"UNIFORM"),{bindGroup:v,buffers:[m]}=z(n,d,[new Float32Array(3)],"UNIFORM",1),_=g=>{J(n,h,new Float32Array([g/1e3]),0),J(n,m,new Float32Array([a(),s(),o()]),0);const{pass:L,executePass:I}=dn(n,e,vn.blueScreenBlue);L.setPipeline(d),L.setVertexBuffer(0,l),L.setBindGroup(0,f),L.setBindGroup(1,v),L.draw(r.length),I(),requestAnimationFrame(_)};requestAnimationFrame(_)},Ua=(n,e)=>{const t=an("Interacting with a scene"),r=rn(`
Just as time can be provided to the GPU, so can any other relevant attribute, property or value which has to be controlled externally by the CPU.

While a circle could be defined as fan of triangles defined by vertices laying on a circle, it is important to remember that circles are pointless.
Pointless, but ever so important. No matter how many vertices define a circle, it will never be a resolution-independent circle.

An alternative is to define circles in the conceptual space of the fragement shader as a boolean function of distance to the circle center. 
To do this, the circle can only exist on the surface of another shape such as a quad. The black space in the canvas below is actually the color of quad. 
The ball is being rendered on the quad's surface, much like a screen displaying a video.
`),i=en(),a=K("task4"),o=hn(),s=P(ln("ball-height",.3,.1,.9,.1),"Ball bounce height"),c=P(ln("ball-speed",4,1,16),"Ball bounce speed"),l=P(ln("ball-size",1.05,1.01,1.5,.01),"Ball size");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(ka)},Na=(n,e)=>{Oa(n,e),Ma(n,e),Ca(n,e),Ua(n,e)},ja=`struct VSOut {
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
`,ot="drawing",st="drawing-mode",Da=["POINT","TRIANGLE","CIRCLE"],cr="points-color",lr="drawing-background-color",fr="granularity-slider",ur="size-slider",dr="clear",Ha=async()=>{const{device:n,canvas:e,context:t,canvasFormat:r}=await on(ot);let i=wn(lr,R=>{i=R,V()});const a=it("display-draw-instruction"),o=k(cr),s=k(st),c=k(fr),l=k(ur),d=1e3,f=new Float32Array(6*d*Mn.float32x2),{buffer:h,bufferLayout:v}=$(n,f,"float32x2"),m=new Float32Array(6*d*Mn.float32x3),{buffer:_,bufferLayout:g}=$(n,m,"float32x3",1),L=tn(n,[v,g],r,ja,"triangle-list");Vi(ot,R=>{switch(s()){case"TRIANGLE":F(R);break;case"CIRCLE":E(R);break;default:case"POINT":S(),A(R);break}V()});let p=0,y=0;const A=({x:R,y:H})=>{const sn=re(R,0,e.width,-1,1),cn=-1*re(H,0,e.height,-1,1),U=ge(w(sn,cn),l()/e.height),X=new Float32Array(T(U));n.queue.writeBuffer(h,p,X),p+=6*Mn.float32x2;const W=Array(6).fill(Qe(ce(o()))),C=new Float32Array(T(W));n.queue.writeBuffer(_,y,C),y+=6*Mn.float32x3};let x=[],O=[];const S=()=>{x=[],O=[]},F=R=>{if(x.push(R),O.push(o()),O.length<3){A(R);return}const H=new Float32Array([].concat(...x.map(({x:cn,y:U})=>{const X=re(cn,0,e.width,-1,1),W=-1*re(U,0,e.height,-1,1);return w(X,W)}),T(Array(9).fill(w()))));n.queue.writeBuffer(h,p-2*6*Mn.float32x2,H),p+=Mn.float32x2*(3-2*6);const sn=new Float32Array([].concat(...T(O.map(cn=>Qe(ce(cn)))),T(Array(9).fill(b()))));n.queue.writeBuffer(_,y-2*6*Mn.float32x3,sn),y+=Mn.float32x3*(3-2*6),S()},E=R=>{if(x.push(R),O.push(o()),x.length<2){A(R);return}const H=w(re(x[0].x,0,e.width,-1,1),-1*re(x[0].y,0,e.height,-1,1)),sn=w(re(x[1].x,0,e.width,-1,1),-1*re(x[1].y,0,e.height,-1,1)),cn=Vt(_e(sn,H)),U=ki(H,cn,c()),X=new Float32Array(T(U));n.queue.writeBuffer(h,p-6*Mn.float32x2,X),p+=Mn.float32x2*(U.length-6);const W=new Float32Array(T([...new Array(U.length)].map((C,q)=>{const Q=q%3===0?0:1;return Qe(ce(O[Q]))})));n.queue.writeBuffer(_,y-6*Mn.float32x3,W),y+=Mn.float32x3*(U.length-6),S()},V=()=>{const{pass:R,executePass:H}=dn(n,t,ce(i));R.setPipeline(L),R.setVertexBuffer(0,h),R.setVertexBuffer(1,_),R.draw(6*d),H()};Ot(dr,()=>{n.queue.writeBuffer(h,0,new Float32Array(6*d*Mn.float32x2)),n.queue.writeBuffer(_,0,new Float32Array(6*d*Mn.float32x3)),V()}),wn(st,R=>{a({POINT:"Click to create a point",TRIANGLE:"Create three points to form a triangle",CIRCLE:"Create two points to form a circle"}[R])}),a("Click to create a point"),V()},qa=(n,e)=>{const t=an("Drawing with WebGPU"),r=rn(`
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
`),i=en(),a=K(ot),o=hn(),s=tt("display-draw-instruction"),c=Bn(st,Da),l=P(De(cr,"#000000"),"Draw color"),d=P(De(lr,"#ffffff"),"Background color"),f=P(ln(ur,10,2,100),"Point size"),h=P(ln(fr,12,4,32),"Circle granularity"),v=Pt(dr,"Clear canvas");o.append(s,c,l,f,h,d,v),i.append(a,o),n.append(t,r,i),e.push(Ha)},$a=`struct Uniforms {
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
`,hr="wireframe",_r="wireframe-rotation-slider",Xa=async()=>{const{device:n,context:e,canvasFormat:t}=await on(hr),r=Ve(b(0),1),i=r.lineIndices,a=new Float32Array(T(r.vertices)),{buffer:o}=Cn(n,i),{buffer:s,bufferLayout:c}=$(n,a,"float32x4"),l=tn(n,[c],t,$a,"line-list"),{bindGroup:d,buffers:[f]}=z(n,l,[new Float32Array(nn(xn()))],"UNIFORM",0),h=yn(b(.5,.5,.5)),v=b(0,0,10),m=b(0),_=b(0,1,0),g=Fn(v,m,_),L=Ni(-1.5,1.5,-1.5,1.5,0,100),I=M(kt,L),p=M(I,g),y=x=>{const O=Pe(x,b(1,1,1)),S=M(O,h),F=M(p,S);J(n,f,new Float32Array(nn(F)),0);const{pass:E,executePass:V}=dn(n,e,vn.black);E.setPipeline(l),E.setVertexBuffer(0,s),E.setIndexBuffer(o,"uint32"),E.setBindGroup(0,d),E.drawIndexed(i.length),V()},A=wn(_r,y);y(A)},Ya=(n,e)=>{const t=an("Projecting a cube"),r=rn(`
Along the journey in the direction of 3D scenes from 2D shapes a key stop is orthographic projection, known for its use in early game development (or in modern, as a stylistic choice).
This projection assumes a volume created by lines directly perpendicular to the image plane.

Wireframe rendering (using lines instead of triangles) is a simplification which can be used to observe the shape without having to deal with side differentiaion (through shading or unique colors).
`),i=en(),a=K(hr),o=hn(),s=P(ln(_r,45,0,360),"Rotation in degrees about (1, 1, 1)");o.append(s),i.append(a,o),n.append(t,r,i),e.push(Xa)},Wa=`struct Uniforms {
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
`,vr="perspective",Ja=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(vr),i=Ve(b(0),1),a=new Float32Array(T(i.vertices)),o=i.lineIndices,{buffer:s}=Cn(n,o),{buffer:c,bufferLayout:l}=$(n,a,"float32x4"),{buffer:d,bufferLayout:f}=$(n,new Float32Array(T([u(.5,.5,.5,1),u(0,0,1,1),u(0,1,0,1),u(0,1,1,1),u(1,0,1,1),u(1,0,0,1),u(1,1,0,1),u(1,1,1,1)])),"float32x4",1),h=tn(n,[l,f],t,Wa,"line-list"),v=b(0,0,5),m=b(0),_=b(0,1,0),g=Fn(v,m,_),L=Qn(45,r.width/r.height,.1,100),I=M(kt,L),p=M(I,g),y=M(Pe(0,b(1,1,1)),yn(b(-2))),A=M(Pe(45,b(0,1,0)),yn(b(0))),x=M(yn(b(2)),Pe(45,b(1,1,0))),O=M(p,y),S=M(p,A),F=M(p,x),{bindGroup:E}=z(n,h,[new Float32Array(be([O,S,F]))],"UNIFORM",0);(()=>{const{pass:B,executePass:R}=dn(n,e,vn.black);B.setPipeline(h),B.setVertexBuffer(0,c),B.setVertexBuffer(1,d),B.setIndexBuffer(s,"uint32"),B.setBindGroup(0,E),B.drawIndexed(o.length,3),R()})()},Za=(n,e)=>{const t=an("Considering different perspectives"),r=rn(`
The commonly used projection is perspective projection which imitates real life cameras and human eyes. 
A common instance of perspective projection is the pinhole camera model.

The perspective model assumes camera rays have a single point oigin (the eye point) and create a 3D trapezoidal view volume by crossing the image plane.

Another key tool in managing objects on the GPU is instancing, a conceptual sibling to the flyweight design pattern. 
Multiples of an object which can be clearly differentiated by their extrinsic attributes (pose, color, size, etc.) can be instanced. 
A single set of their intrinsic attributes is enough to generate multiple instances and then, to adjust pose for example, apply a respective model matrix. With this method three cubes can be instanced from a single cube mesh definition. 

A further subclassification of perspective projections is based on number of vanishing points they consider. A vanishing point is generated by a non-parallel principal direction. 
The base case is one-point perspective projection (left), where the two other principal directions are parallel to the image plane, but there exists also two- (middle) and three-point (right) projections with one and none parallel principal directions respectively.
    `),i=en(),a=K(vr,{width:1028-128}),o=hn();i.append(a,o),n.append(t,r,i),e.push(Ja)},Ka=`struct Uniforms {
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
`,mr="airplane",pr="yaw-slider-airplane",gr="pitch-slider-airplane",xr="roll-slider-airplane",Qa=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(mr),i=k(pr),a=k(gr),o=k(xr),s=Ve(b(0),1),c=s.lineIndices,l=new Float32Array(T(s.vertices)),{buffer:d}=Cn(n,c),{buffer:f,bufferLayout:h}=$(n,l,"float32x4"),v=tn(n,[h],t,Ka,"line-list"),m=b(5,5,5),_=b(0),g=b(0,1,0),L=Fn(m,_,g),I=Qn(35,r.width/r.height,.1,100),p=M(kt,I),{bindGroup:y,buffers:[A]}=z(n,v,[new Float32Array([0,0,0,0,...nn(L),...nn(p)])],"UNIFORM",0),x=[],O=Gn(.4,.4,2),S=M(Gn(.35,.25,.35),yn(b(0,-.2,3.3))),F=M(Gn(1.7,.2,1.1),yn(b(.6))),E=M(Gn(1.7,.2,1.1),yn(b(-.6))),V=M(Gn(.2,.5,.3),yn(b(0,.5,-3.3))),B=M(Gn(.5,.1,.2),yn(b(-.9,.4,-4.3))),R=M(Gn(.5,.1,.2),yn(b(.9,.4,-4.3))),H=[O,S,F,E,V,B,R];x.push(...new Array(H.length).fill(u(.7,.7,.7)));const sn=(gn=xn())=>M(M(Gn(.1,.3,.2),gn),yn(b(0,.5,-6)));x.push(u(0,1,0));const cn=(gn=xn())=>M(M(Gn(.25,.05,.2),gn),yn(b(2,.4,-5.3))),U=(gn=xn())=>M(M(Gn(.25,.05,.2),gn),yn(b(-2,.4,-5.3)));x.push(u(1,0,0),u(1,0,0));const X=(gn=xn())=>M(M(yn(b(-1,.1,-.5)),gn),Gn(1,.1,.3)),W=(gn=xn())=>M(M(yn(b(1,.1,-.5)),gn),Gn(1,.1,.3));x.push(u(.4,.4,1),u(.4,.4,1));const C=[...H,sn(),cn(),U(),X(),W()],{bindGroup:q,buffers:Q}=z(n,v,[new Float32Array(be(C)),new Float32Array(T(x))],"STORAGE",1);let pn=0,bn=0,Z=0,fn=0,_n=0,j=0;const D=.1,En=gn=>{J(n,A,new Float32Array([gn]),0);const Xn=1*i();fn=fn*(1-D)+Xn*D,pn+=fn;const Pn=1*a();_n=_n*(1-D)+Pn*D,bn+=_n;const ue=1*o();j=j*(1-D)+ue*D,Z+=j;const On=Ee(-fn*20),te=Te(-_n*20),de=j>0?Te(j*60):xn(),me=j<0?Te(-j*60):xn(),Nn=M(M(Te(bn),Ee(pn)),ji(Z)),N=[...H.map(Yn=>M(Nn,Yn)),M(Nn,sn(On)),M(Nn,cn(te)),M(Nn,U(te)),M(Nn,X(de)),M(Nn,W(me))],un=N.map(Yn=>M(Nn,Yn));J(n,Q[0],new Float32Array(be(un)),0);const{pass:In,executePass:he}=dn(n,e,vn.black);In.setPipeline(v),In.setVertexBuffer(0,f),In.setIndexBuffer(d,"uint32"),In.setBindGroup(0,y),In.setBindGroup(1,q),In.drawIndexed(c.length,N.length),he(),requestAnimationFrame(En)};requestAnimationFrame(En)},no=(n,e)=>{const t=an("About Gimbal's lock"),r=rn(`
As we descend into the depths of computer graphics, rotations of objects in three dimensions will become a big part of creating interactive showcases.

An issue which appears when using Euler angles with only three angle axes (three units of freedom) is a phenomenon known as Gimbal's lock. 
The short version is that a three-axes system cannot guarantee independent rotations. Each rotation is "local" to the previous rotations.
This can be observed when making half-rotations around two axess, which eliminates the third axis (ie. it does not have an effect).

In a later section, quaternions are introduced which are four dimensional abstractions of vectors. The fourth dimension allows the rotation information to remain absolute (without a reference system). 
One may think of these are homogeneous Euler angles.
    `),i=en(),a=K(mr),o=hn(),s=P(ln(pr,0,-1,1,.1),"Green rudder control (yaw)"),c=P(ln(gr,0,-1,1,.1),"Red elevators control (pitch)"),l=P(ln(xr,0,-.5,.5,.1),"Blue ailerons control (roll)");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(Qa)},eo=(n,e)=>{Ya(n,e),Za(n,e),no(n,e)},to=`struct SceneData {
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
`,br="graphics-lighting",Ne="rotation-around-tetrahedron",ct="subdivision-tetrahedron",yr="tetrahedron-rotation-animation-enabled",lt="diffuse-reflectance-tetrahedron",ft="specular-reflectance-tetrahedron",ut="ambient-reflectance-tetrahedron",dt="shading-type-tetrahedron",ht="shininess-tetrahedron",_t="tetrahedron-light-emission",ro=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(br),i=k(Ne),a=k(ct),o=k(dt),s=k(ut),c=k(lt),l=k(ft),d=k(ht),f=k(_t),h=new Array(8).fill(0).map((fn,_n)=>zt(_n)),{buffer:v}=Cn(n,new Uint32Array(T(h[7].triangleIndices.map(fn=>Ln(fn))))),{buffer:m,bufferLayout:_}=$(n,new Float32Array(T(h[7].vertices)),"float32x4"),{buffer:g,bufferLayout:L}=$(n,new Float32Array(T([u(1,0,0),u(0,1,0),u(0,0,1),u(1,1,1),...new Array(h[7].vertices.length-4).fill(u(.4,.4,.4))])),"float32x4",1);Vn(n,v,new Uint32Array(T(h[a()].triangleIndices.map(fn=>Ln(fn)))),0,!0);const I=4,{multisample:p,msaaTexture:y}=Ie(n,r,t,I),{createDepthTexture:A,depthStencil:x,depthStencilAttachmentFactory:O}=fe(n,r,I),S=tn(n,[_,L],t,to,"triangle-list",{multisample:p,depthStencil:x});A();const F=zn(i()),E=b(3*Math.sin(F),0,3*Math.cos(F)),V=b(0),B=b(0,1,0),R=Fn(E,V,B),sn=Qn(45,r.width/r.height,.1,100),U=M(sn,R),X={"Gouraud shading (vertex)":0,"Phong shading (fragment)":1},{bindGroup:W,buffers:[C]}=z(n,S,[new Float32Array([...nn(U),...u(...E),...qe(ce(f())),...u(s(),c(),l(),d()),...u(X[o()])])],"UNIFORM",0),q=fn=>{const _n=zn(fn),j=b(3*Math.sin(_n),0,3*Math.cos(_n)),D=Fn(j,V,B),gn=M(sn,D);J(n,C,new Float32Array([...nn(gn),...u(...j)]),0)};wn(ct,fn=>{Vn(n,v,new Uint32Array(T(h[fn].triangleIndices.map(_n=>Ln(_n)))),0,!0)}),wn(Ne,q);let pn=!0;wn(yr,()=>pn=document.getElementById(Ne).disabled=!pn),Ft([dt,ht,ft,lt,ut,_t],()=>{J(n,C,new Float32Array([...qe(ce(f())),...u(s(),c(),l(),d()),...u(X[o()])]),80)});const Z=fn=>{pn&&q(fn/50);const{pass:_n,executePass:j}=dn(n,e,u(.2,.2,.2),{depthStencilAttachmentFactory:O,msaaTexture:y});_n.setPipeline(S),_n.setVertexBuffer(0,m),_n.setVertexBuffer(1,g),_n.setIndexBuffer(v,"uint32"),_n.setBindGroup(0,W),_n.drawIndexed(h[a()].triangleCount*3),j(),requestAnimationFrame(Z)};requestAnimationFrame(Z)},io=(n,e)=>{const t=an("Shining light on tetrahedrons"),r=rn(`
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
    `),i=en(),a=K(br),o=hn(),s=P(ne(yr,!0),"Animated rotation",!1),c=ln(Ne,0,-180,180,1,!0),l=P(c,"Rotation around the tetrahedron"),d=P(ln(ct,4,0,7,1),"Number of tetrahedron subdivisions"),f=P(Bn(dt,["Gouraud shading (vertex)","Phong shading (fragment)"],"Gouraud shading"),"Shading type",!1),h=P(ln(lt,1,0,2,.1),"Diffuse reflectance"),v=P(ln(ft,1,0,2,.1),"Specular reflectance"),m=P(ln(ht,15,0,50,1),"Shininess"),_=P(ln(ut,.1,0,2,.1),"Ambient reflectance"),g=P(De(_t,"#ffffff"),"Light emission",!1);o.append(s,l,d,f,h,v,_,m,g),i.append(a,o),n.append(t,r,i),e.push(ro)},ao=`struct SceneData {
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
`,wr="monkey",Lr="rotation-around-monkey",oo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(wr),i=await $n("models/monkey.obj",1,!1),a=ee(i,{indicesIn3:!0}),{buffer:o}=Cn(n,a.indices),{buffer:s,bufferLayout:c}=$(n,a.vertices,"float32x4"),{buffer:l,bufferLayout:d}=$(n,a.normals,"float32x4",1),{msaaTexture:f,multisample:h}=Ie(n,r,t,4),{createDepthTexture:v,depthStencil:m,depthStencilAttachmentFactory:_}=fe(n,r,4),g=tn(n,[c,d],t,ao,"triangle-list",{depthStencil:m,multisample:h,primitive:{frontFace:"ccw",cullMode:"back"}});v();const L=zn(0),I=4,p=0,y=b(I*Math.sin(L),p,I*Math.cos(L)),A=b(0),x=b(0,1,0),O=Fn(y,A,x),F=Qn(30,r.width/r.height,.1,100),E=M(F,O),V=xn(),B=M(E,V),{bindGroup:R,buffers:[H]}=z(n,g,[new Float32Array([...nn(B),...y,1])],"UNIFORM",0);wn(Lr,U=>{const X=zn(U),W=b(I*Math.sin(X),p,I*Math.cos(X)),C=Fn(W,A,x),q=M(F,C),Q=M(q,V);J(n,H,new Float32Array([...nn(Q),...W,1]),0),cn()});const cn=()=>{const{pass:U,executePass:X}=dn(n,e,vn.black,{depthStencilAttachmentFactory:_,msaaTexture:f});U.setPipeline(g),U.setVertexBuffer(0,s),U.setVertexBuffer(1,l),U.setIndexBuffer(o,"uint32"),U.setBindGroup(0,R),U.drawIndexed(a.indices.length),X()};cn()},so=(n,e)=>{const t=an("The Blender Monkey"),r=rn(`
More interesting than primitive shapes are models created to represent specific objects. The entire graphics pipeline is made to support the display and animation of such models.

As an example, the mascot of the 3D modelling software Blender - Suzanne - is rendered to the screen below. The same lighting set up is used as with the sphere.

Another graphics feature is added to the mix - z-buffer indexing. This is the process of creating a (temporary for the time of creating the framebuffer) z-buffer. It store the z value (depth) of a fragment when it is drawn.
Each following fragment's depth value to compared to the current closest fragment and it may either be discarded (if it is covered) or it may overwrite if it is the closer (to the viewer) fragment.
    `),i=en(),a=K(wr),o=hn(),s=P(ln(Lr,0,-180,180,1),"Rotation around the monkey");o.append(s),i.append(a,o),n.append(t,r,i),e.push(oo)},co=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,Ir="checkerboard-test",vt="texture-repeat-style",lo=["clamp-to-edge","repeat","mirror-repeat"],mt="magnification-checkerboard",pt="minification-checkerboard",et=["linear","nearest"],fo=async()=>{const{device:n,context:e,canvasFormat:t}=await on(Ir),r=k(vt),i=k(pt),a=k(mt),o=k(gt),s=new Float32Array(T([u(-4,-1,-1),u(4,-1,-1),u(4,-1,-21),u(-4,-1,-21)])),c=new Uint32Array([0,1,2,0,2,3]),l=new Float32Array(T([w(-1.5,0),w(2.5,0),w(2.5,10),w(-1.5,10)])),{buffer:d}=Cn(n,c),{buffer:f,bufferLayout:h}=$(n,s,"float32x4"),{buffer:v,bufferLayout:m}=$(n,l,"float32x2",1),_=tn(n,[h,m],t,co,"triangle-list"),g=Xi(64,8,8),L=Ct(g,64,!0),I=async()=>{const{texture:p,sampler:y}=Kn(n,g,64,64,{addressModeU:r(),addressModeV:r(),minFilter:i(),magFilter:a(),mipmapFilter:o()},{mips:L}),A=Un(n,_,p,y),{pass:x,executePass:O}=dn(n,e,vn.blueScreenBlue);x.setPipeline(_),x.setVertexBuffer(0,f),x.setVertexBuffer(1,v),x.setIndexBuffer(d,"uint32"),x.setBindGroup(0,A),x.drawIndexed(6),O()};Ft([vt,mt,pt,gt],I),I()},gt="mipmap-select-checkerboard",uo=(n,e)=>{const t=an("Applying textures"),r=rn("No description yet"),i=en(),a=K(Ir),o=hn(),s=P(Bn(vt,lo,"repeat"),"Texture edge behaviour",!1),c=P(Bn(pt,et,"nearest"),"Minification behaviour",!1),l=P(Bn(mt,et,"nearest"),"Magnification behaviour",!1),d=P(Bn(gt,et,"nearest"),"Mipmap behaviour",!1);o.append(s,c,l,d),i.append(a,o),n.append(t,r,i),e.push(fo)},ho=`struct SceneData {
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
`,Ar="earth",_o=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(Ar),{textureData:i,width:a,height:o}=await le("textures/earth.jpg"),s=zt(7),{buffer:c}=Cn(n,new Uint32Array(T(s.triangleIndices.map(W=>Ln(W))))),{buffer:l,bufferLayout:d}=$(n,new Float32Array(T(s.vertices)),"float32x4"),{buffer:f,bufferLayout:h}=$(n,new Float32Array(T([u(1,0,0),u(0,1,0),u(0,0,1),u(1,1,1),...new Array(s.vertices.length-4).fill(u(.4,.4,.4))])),"float32x4",1),v=4,{multisample:m,msaaTexture:_}=Ie(n,r,t,v),{depthStencil:g,depthStencilAttachmentFactory:L}=fe(n,r,v),I=tn(n,[d,h],t,ho,"triangle-list",{multisample:m,depthStencil:g}),{sampler:p,texture:y}=Kn(n,i,a,o,{minFilter:"nearest",magFilter:"nearest"}),A=Un(n,I,y,p,1),x=zn(0),O=b(3*Math.sin(x),0,3*Math.cos(x)),S=b(0),F=b(0,1,0),E=Fn(O,S,F),B=Qn(45,r.width/r.height,.1,100),H=M(B,E),{bindGroup:sn,buffers:[cn]}=z(n,I,[new Float32Array(nn(H))],"UNIFORM",0),U=W=>{const C=zn(W),q=b(3*Math.sin(C),Math.cos(C),3*Math.cos(C)),Q=Fn(q,S,F),bn=M(B,Q);J(n,cn,new Float32Array(nn(bn)),0)},X=W=>{U(W/50);const{pass:C,executePass:q}=dn(n,e,u(.5,.1,.5),{depthStencilAttachmentFactory:L,msaaTexture:_});C.setPipeline(I),C.setVertexBuffer(0,l),C.setVertexBuffer(1,f),C.setIndexBuffer(c,"uint32"),C.setBindGroup(0,sn),C.setBindGroup(1,A),C.drawIndexed(s.triangleCount*3),q(),requestAnimationFrame(X)};requestAnimationFrame(X)},vo=(n,e)=>{const t=an("A sphere"),r=rn("no desc yet"),i=en(),a=K(Ar),o=hn();o.append(),i.append(a,o),n.append(t,r,i),e.push(_o)},mo=(n,e)=>{uo(n,e),vo(n,e)},po=`@group(0) @binding(0) var cube_sampler : sampler;
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
`,Sr="texture-sphere-with-quad",Rr="env-sphere-reflect-type",Tr={"Faux reflection":0,"Mirror reflection":1,"Show normal map":2,"Bump reflection":3},go=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(Sr),[i,...a]=await Promise.all(["textures/normalmap.png","textures/cubemap/cm_left.png","textures/cubemap/cm_right.png","textures/cubemap/cm_top.png","textures/cubemap/cm_bottom.png","textures/cubemap/cm_back.png","textures/cubemap/cm_front.png"].map(Pn=>le(Pn))),o=b(0,0,3),s=b(0),c=b(0,1,0),l=Fn(o,s,c),f=Qn(90,r.width/r.height,.1,100),h=M(f,l),v=Dt(f),m=Dt(l),_=qi(m,[0,0],[3,3]),g=kn(),L=$i(_,g),I=M(L,v),p=zt(7),y=T(p.triangleIndices.map(Pn=>Ln(Pn))),A=T(p.vertices.map(Pn=>Oe(Pn,h))),x=.999,O=T([u(-1,-1,x,1),u(1,-1,x,1),u(-1,1,x,1),u(1,1,x,1)]),S=[p.vertices.length+0,p.vertices.length+1,p.vertices.length+2,p.vertices.length+1,p.vertices.length+3,p.vertices.length+2],{buffer:F}=Cn(n,new Uint32Array([...y,...S])),{buffer:E,bufferLayout:V}=$(n,new Float32Array([...A,...O]),"float32x4"),{buffer:B,bufferLayout:R}=$(n,new Float32Array([...T(p.vertices),...O]),"float32x4",1),{buffer:H,bufferLayout:sn}=$(n,new Float32Array([...Array(p.vertices.length).fill(0),...Array(4).fill(1)]),"uint32",2),cn=4,{multisample:U,msaaTexture:X}=Ie(n,r,t,cn),{depthStencil:W,depthStencilAttachmentFactory:C}=fe(n,r,cn),q=tn(n,[V,R,sn],t,po,"triangle-list",{multisample:U,depthStencil:W}),{sampler:Q,cubemapTexture:pn}=Ta(n,a.map(Pn=>Pn.textureData),a[0].width,a[0].height),bn=Un(n,q,pn,Q,0,{createViewOverwrite:{dimension:"cube"}}),{bindGroup:Z,buffers:[fn,_n,j]}=z(n,q,[new Float32Array(be([xn(),I])),new Float32Array([...o]),new Uint32Array([0])],"UNIFORM",1),{texture:D,sampler:En}=Kn(n,i.textureData,i.width,i.height),gn=Un(n,q,D,En,2),Xn=Pn=>{const ue=Tr[Pn];Vn(n,j,new Uint32Array([ue]),0);const{pass:On,executePass:te}=dn(n,e,u(.5,.1,.5),{depthStencilAttachmentFactory:C,msaaTexture:X});On.setPipeline(q),On.setVertexBuffer(0,E),On.setVertexBuffer(1,B),On.setVertexBuffer(2,H),On.setIndexBuffer(F,"uint32"),On.setBindGroup(0,bn),On.setBindGroup(1,Z),On.setBindGroup(2,gn),On.drawIndexed(p.triangleCount*3+S.length),te()};Xn(wn(Rr,Xn))},xo=(n,e)=>{const t=an("A sphere"),r=rn("explain transformation"),i=en(),a=K(Sr),o=hn(),s=P(Bn(Rr,Object.keys(Tr),"Faux reflection"),"Reflection type",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(go)},bo=(n,e)=>{xo(n,e)},Wt=`@group(0) @binding(0) var marble_sampler : sampler;
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
`,Br="shadow-quads",yo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(Br),i=await le("textures/xamp23.png"),a=new Uint32Array([0,1,2,0,2,3]),o=new Float32Array(T([w(0,0),w(1,0),w(1,1),w(0,1)])),s=new Float32Array(T([u(-2,-1,-1),u(2,-1,-1),u(2,-1,-5),u(-2,-1,-5)])),c=new Float32Array(T([u(-1,-1,-2.5),u(-1,-1,-3),u(-1,0,-3),u(-1,0,-2.5)])),l=new Float32Array(T([u(.25,-.5,-1.25),u(.75,-.5,-1.25),u(.75,-.5,-1.75),u(.25,-.5,-1.75)])),{buffer:d}=Cn(n,new Uint32Array([...a,...a.map(Q=>Q+4),...a.map(Q=>Q+8),...a.map(Q=>Q+12),...a.map(Q=>Q+16)])),{buffer:f,bufferLayout:h}=$(n,new Float32Array([...s,...c,...l,...c,...l]),"float32x4"),{buffer:v,bufferLayout:m}=$(n,new Float32Array([...o]),"float32x2",1),{depthStencil:_,depthStencilAttachmentFactory:g}=fe(n,r,1),L=tn(n,[h,m],t,Wt,"triangle-list",{depthStencil:_}),{depthStencil:I}=fe(n,r,1,{depthStencilOverwrites:{depthCompare:"greater"}}),p=tn(n,[h,m],t,Wt,"triangle-list",{depthStencil:I,primitive:{cullMode:"none"}},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),y=Ct(i.textureData,i.width),{texture:A,sampler:x}=Kn(n,i.textureData,i.width,i.height,{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest",mipmapFilter:"nearest"},{mips:y}),O=Un(n,L,A,x),{texture:S,sampler:F}=Kn(n,new Uint8Array([255,0,0,255]),1,1),E=Un(n,L,S,F),{texture:V,sampler:B}=Kn(n,new Uint8Array([0,0,0,125]),1,1),R=Un(n,L,V,B),{bindGroup:H}=z(n,L,[new Float32Array(nn(xn()))],"UNIFORM",1),{bindGroup:sn,buffers:[cn]}=z(n,L,[new Float32Array(nn(xn()))],"UNIFORM",1),U=-1-2-.001,X=kn(1,0,0,0,0,1,0,0,0,0,1,0,0,1/U,0,0),W=xn(),C=Q=>{const pn=yn(Q),bn=yn(Jn(Q,-1)),Z=M(M(M(pn,X),bn),W);J(n,cn,new Float32Array(nn(Z)),0)},q=Q=>{const pn=Q/1e3,bn=b(2*Math.cos(pn),2,2*Math.sin(pn)-2);C(bn);const{pass:Z,executePass:fn}=dn(n,e,vn.blueScreenBlue,{depthStencilAttachmentFactory:g});Z.setVertexBuffer(0,f),Z.setVertexBuffer(1,v),Z.setIndexBuffer(d,"uint32"),Z.setPipeline(L),Z.setBindGroup(0,O),Z.setBindGroup(1,H),Z.drawIndexed(6),Z.setPipeline(p),Z.setBindGroup(1,sn),Z.setBindGroup(0,R),Z.drawIndexed(12,void 0,6),Z.setPipeline(L),Z.setBindGroup(1,H),Z.setBindGroup(0,E),Z.drawIndexed(12,void 0,18),fn(),requestAnimationFrame(q)};requestAnimationFrame(q)},wo=(n,e)=>{const t=an("Shadow as a shape"),r=rn("No description yet"),i=en(),a=K(Br),o=hn();o.append(),i.append(a,o),n.append(t,r,i),e.push(yo)},Lo=(n,e)=>{wo(n,e)},Io=`@group(0) @binding(0) var marble_sampler : sampler;
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
`,Ao=`@group(0) @binding(0) var<uniform> teapot_model : mat4x4f;
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
`,So=`@group(0) @binding(0) var<uniform> model : mat4x4f;
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
`,Ye="shadow-mapping",Pr="teapot-movement-shadow-mapping",Or="light-movement-shadow-mapping",Ro=async()=>{const n=k(Pr,"checked"),e=k(Or,"checked"),t=await le("textures/xamp23.png"),r=await $n("models/teapot.obj",.25,!1),i=ee(r,{indicesIn3:!0}),{device:a,context:o,canvasFormat:s,canvas:c}=await on(Ye),l=document.getElementById(Ye+"-shadow"),d=l.getContext("gpupresent")||l.getContext("webgpu");d.configure({device:a,format:s});const{depthStencil:f,depthStencilAttachmentFactory:h}=fe(a,c,1),{buffer:v}=Cn(a,i.indices),{buffer:m,bufferLayout:_}=$(a,i.vertices,"float32x4"),{buffer:g,bufferLayout:L}=$(a,i.normals,"float32x4",1),{buffer:I,bufferLayout:p}=$(a,i.colors,"float32x4",2),y=tn(a,[_,L,p],s,Ao,"triangle-list",{depthStencil:f}),A=a.createTexture({size:{width:l.width,height:l.height,depthOrArrayLayers:1},mipLevelCount:1,sampleCount:1,dimension:"2d",format:"rgba32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC}),x=A.createView(),O=a.createShaderModule({code:So}),S=a.createRenderPipeline({layout:"auto",vertex:{module:O,entryPoint:"main_vs",buffers:[_]},fragment:{module:O,entryPoint:"main_fs",targets:[{format:s},{format:"rgba32float"}]},primitive:{cullMode:"none",topology:"triangle-list"}}),{bindGroup:F,buffers:[E,V]}=z(a,S,[new Float32Array(nn(xn())),new Float32Array(nn(kn()))],"UNIFORM",0),B=new Uint32Array([0,1,2,0,2,3]),R=new Float32Array(T([w(0,0),w(1,0),w(1,1),w(0,1)])),H=new Float32Array(T([u(-2,-1,-1),u(2,-1,-1),u(2,-1,-5),u(-2,-1,-5)])),{buffer:sn}=Cn(a,new Uint32Array([...B])),{buffer:cn,bufferLayout:U}=$(a,new Float32Array([...H]),"float32x4"),{buffer:X,bufferLayout:W}=$(a,new Float32Array([...R]),"float32x2",1),C=tn(a,[U,W],s,Io,"triangle-list",{depthStencil:f}),q=a.createBindGroup({layout:C.getBindGroupLayout(2),entries:[{binding:0,resource:A.createView()}]}),Q=new Float32Array(nn(Qn(90,1,.001,6))),pn=N=>{const un=Qn(100,1,.01,4),In=Fn(N,b(0,-1,-3),nr.up);return M(un,In)},bn=N=>{const un=new Float32Array(nn(pn(N)));J(a,V,un,0),J(a,_n,un,0)},{bindGroup:Z,buffers:[fn,_n,j]}=z(a,C,[Q,new Float32Array(nn(kn())),new Float32Array(nn(kn()))],"UNIFORM",1),D=Ct(t.textureData,t.width),{texture:En,sampler:gn}=Kn(a,t.textureData,t.width,t.height,{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"nearest",magFilter:"nearest",mipmapFilter:"nearest"},{mips:D}),Xn=Un(a,C,En,gn),{bindGroup:Pn,buffers:[ue,On]}=z(a,y,[new Float32Array(nn(kn())),new Float32Array(b()),Q],"UNIFORM",0);let te=0,de=0,me=0;const Nn=N=>{const un=(N-me)/1e3;te+=n()?un:0,de+=e()?un:0;const In=b(2*Math.cos(de),2,2*Math.sin(de)-2);J(a,On,new Float32Array(In),0),bn(In);const he=yn(b(0,(Math.cos(te)*3-1)/4,-3)),Yn=new Float32Array(nn(he));J(a,ue,Yn,0),J(a,E,Yn,0),J(a,j,Yn,0);const Ae=a.createCommandEncoder(),se=Ae.beginRenderPass({colorAttachments:[{view:d.getCurrentTexture().createView(),loadOp:"clear",clearValue:{r:0,g:0,b:0,a:1},storeOp:"store"},{view:x,loadOp:"clear",clearValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]});se.setPipeline(S),se.setVertexBuffer(0,m),se.setIndexBuffer(v,"uint32"),se.setBindGroup(0,F),se.drawIndexed(i.indices.length),se.end();const Tn=Ae.beginRenderPass({colorAttachments:[{view:o.getCurrentTexture().createView(),loadOp:"clear",clearValue:vn.blueScreenBlue,storeOp:"store"}],depthStencilAttachment:h()});Tn.setPipeline(C),Tn.setVertexBuffer(0,cn),Tn.setVertexBuffer(1,X),Tn.setIndexBuffer(sn,"uint32"),Tn.setBindGroup(0,Xn),Tn.setBindGroup(1,Z),Tn.setBindGroup(2,q),Tn.drawIndexed(6),Tn.setPipeline(y),Tn.setVertexBuffer(0,m),Tn.setVertexBuffer(1,g),Tn.setVertexBuffer(2,I),Tn.setIndexBuffer(v,"uint32"),Tn.setBindGroup(0,Pn),Tn.drawIndexed(i.indices.length),Tn.end(),a.queue.submit([Ae.finish()]),me=N,requestAnimationFrame(Nn)};requestAnimationFrame(Nn)},To=(n,e)=>{const t=an("shadow mapping"),r=rn("https://toolness.github.io/shadowmap-2d/"),i=en(),a=K(Ye),o=hn(),s=P(ne(Pr,!0),"Teapot movement",!1),c=P(ne(Or,!0),"Light movement",!1);o.append(s,c),i.append(a,o);const l=en(),d=K(Ye+"-shadow");l.append(d),n.append(t,r,i,l),e.push(Ro)},Bo=(n,e)=>{To(n,e)},Po=`struct SceneData {
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
`,xt="camera-movement",Fr="movement-type-cam-movement",Oo=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(xt),i=k(Fr),a=await $n("models/monkey.obj",1,!1),o=ee(a,{indicesIn3:!0}),{buffer:s}=Cn(n,o.indices),{buffer:c,bufferLayout:l}=$(n,o.vertices,"float32x4"),{buffer:d,bufferLayout:f}=$(n,o.normals,"float32x4",1),{msaaTexture:h,multisample:v}=Ie(n,r,t,4),{depthStencil:m,depthStencilAttachmentFactory:_}=fe(n,r,4),g=tn(n,[l,f],t,Po,"triangle-list",{depthStencil:m,multisample:v}),L=b(0,0,5);let I=b(0,0,5);const p=b(0);let y=b();const A=b(0,1,0);let x=b(0,1,0);const O=Fn(L,p,A),F=Qn(30,r.width/r.height,.1,100),E=M(F,O),V=xn(),B=M(E,V),{bindGroup:R,buffers:[H]}=z(n,g,[new Float32Array([...nn(B),...L,1])],"UNIFORM",0),sn=1,cn=.01;let U=i(),X=0,W=0,C=0,q=0,Q=0,pn=0,bn=ya();const Z=N=>re(N,0,512,-1,1);let fn=w(),_n=w(),j=0;const D=N=>{j=0,fn=w(N.x,N.y),Xn=0,X=N.x,W=N.y,U=i()},En=N=>{if((U==="Dollying"||U==="Panning")&&(Q=cn*(N.x-X),pn=-cn*(N.y-W)),U==="Quaternion rotation"||U==="Euler rotation"){C+=-sn*(N.x-X),q+=-sn*(N.y-W);const un=-Z(X),In=Z(W),he=-Z(N.x),Yn=Z(N.y),Ae=Math.sqrt(un*un+In*In),se=Math.sqrt(he*he+Yn*Yn),Tn=Ce=>Ce>1/Math.sqrt(2)?1/(2*Ce):Math.sqrt(1-Ce*Ce),Oi=b(un,In,Tn(Ae)),Fi=b(he,Yn,Tn(se)),Ei=Ia(Oi,Fi);bn=Xe(bn,Ei)}X=N.x,W=N.y},gn=N=>{if(Q=0,pn=0,U!=="Quaternion rotation"||(_n=w(N.x,N.y),tr(fn,_n)))return;const un=_e(_n,fn);j=Math.min(Vt(un),20)};let Xn=0;const Pn=()=>{if(U!=="Quaternion rotation"){j=0;return}X=fn[0],W=fn[1];const N=j*Math.exp(-Xn/150),un=G(fn,Jn(jn(_e(_n,fn)),N));j<.2&&(j=0),Xn+=1,En({x:un[0],y:un[1]})};rt(xt,{onStart:D,onMove:En,onEnd:gn});const ue=()=>{const N=M(Te(q),Ee(C)),un=Oe(L,N),In=Oe(A,N);return{view:Fn(un,p,In),eye:un}},On=()=>{const N=Ln(Be([...x,1],bn)),un=Ln(Be([...I,1],bn));return{view:Fn(un,y,N),eye:un}},te=()=>(I[2]+=pn,On()),de=()=>{const N=Jn(Ln(Be(u(1),bn)),Q),un=Jn(Ln(Be(u(0,1),bn)),pn);return y=_e(y,G(N,un)),On()},me=()=>{const N={"Euler rotation":ue,"Quaternion rotation":On,Dollying:te,Panning:de}[i()](),un=M(F,N.view),In=M(un,V);J(n,H,new Float32Array([...nn(In),...N.eye,1]),0)},Nn=()=>{j>0&&Pn(),me();const{pass:N,executePass:un}=dn(n,e,vn.black,{depthStencilAttachmentFactory:_,msaaTexture:h});N.setPipeline(g),N.setVertexBuffer(0,c),N.setVertexBuffer(1,d),N.setIndexBuffer(s,"uint32"),N.setBindGroup(0,R),N.drawIndexed(o.indices.length),un(),requestAnimationFrame(Nn)};requestAnimationFrame(Nn)},Fo=(n,e)=>{const t=an("Camera movement"),r=rn("No description yet"),i=en(),a=K(xt),o=hn(),s=P(Bn(Fr,["Euler rotation","Quaternion rotation","Dollying","Panning"],"Quaternion rotation"),"Movement type",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(Oo)},Eo=(n,e)=>{Fo(n,e)},Mo=(n,e)=>({intrinsics:Qn(85,1,.001,100),extrinsics:Er(n,e)}),Er=(n,e)=>{const t=G(n,e);return Fn(n,t,b(0,1,0))},bt=n=>M(n.intrinsics,n.extrinsics),Jt=n=>"instances"in n;var mn=(n=>(n[n.OUT_OF_BOUNDS=-1]="OUT_OF_BOUNDS",n[n.EMPTY=0]="EMPTY",n[n.NORMAL=1]="NORMAL",n[n.PICKUP=2]="PICKUP",n[n.SPAWN=3]="SPAWN",n[n.END=4]="END",n[n.LIGHT=5]="LIGHT",n))(mn||{}),Y=(n=>(n[n.NORTH=1]="NORTH",n[n.EAST=2]="EAST",n[n.SOUTH=4]="SOUTH",n[n.WEST=8]="WEST",n))(Y||{});const Vo=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;\r
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
`,zo={[Y.NORTH]:Y.SOUTH,[Y.EAST]:Y.WEST,[Y.SOUTH]:Y.NORTH,[Y.WEST]:Y.EAST},Mr=n=>{const e=[];n&Y.NORTH&&e.push(Y.NORTH),n&Y.EAST&&e.push(Y.EAST),n&Y.SOUTH&&e.push(Y.SOUTH),n&Y.WEST&&e.push(Y.WEST);const t=Math.round(Math.random()*e.length-.5);return e[t]},Vr={1:w(0,1),2:w(1,0),4:w(0,-1),8:w(-1,0)},yt={[Y.NORTH]:u(0,0,1,0),[Y.EAST]:u(1,0,0,0),[Y.SOUTH]:u(0,0,-1,0),[Y.WEST]:u(-1,0,0,0)},Hn=12,Wn=(n,e,t)=>{n[e[0]][e[1]]=t},We=(n,e)=>e[1]>=0&&e[1]<Hn&&e[0]>=0&&e[0]<Hn?n[e[0]][e[1]]:mn.OUT_OF_BOUNDS,ke=(n,e)=>We(n,e)===mn.EMPTY,Dn=(n,e)=>{const t=We(n,e);return t===mn.EMPTY||t===mn.OUT_OF_BOUNDS},Co=(n,e,t)=>{switch(t){case Y.NORTH:return Dn(n,G(e,w(-1,1)))&&ke(n,G(e,w(0,1)))&&Dn(n,G(e,w(1,1)));case Y.EAST:return Dn(n,G(e,w(1,1)))&&ke(n,G(e,w(1,0)))&&Dn(n,G(e,w(1,-1)));case Y.SOUTH:return Dn(n,G(e,w(-1,-1)))&&ke(n,G(e,w(0,-1)))&&Dn(n,G(e,w(1,-1)));case Y.WEST:return Dn(n,G(e,w(-1,1)))&&ke(n,G(e,w(-1,0)))&&Dn(n,G(e,w(-1,-1)))}return!1},Go=(n,e)=>{const t=!Dn(n,G(e,w(0,1)))&&!Dn(n,G(e,w(0,-1))),r=!Dn(n,G(e,w(1,0)))&&!Dn(n,G(e,w(-1,0)));return t||r},ko=()=>Math.random()<.15?mn.LIGHT:mn.NORMAL,Uo=(n,e)=>(Wn(n,G(e,w(1,0)),mn.NORMAL),Wn(n,G(e,w(0,0)),mn.SPAWN),Wn(n,G(e,w(-1,0)),mn.NORMAL),Wn(n,G(e,w(1,1)),mn.LIGHT),Wn(n,G(e,w(0,1)),mn.NORMAL),Wn(n,G(e,w(-1,1)),mn.LIGHT),Wn(n,G(e,w(1,2)),mn.NORMAL),Wn(n,G(e,w(0,2)),mn.NORMAL),Wn(n,G(e,w(-1,2)),mn.NORMAL),G(e,w(0,3))),No=()=>{const n=Array.from(Array(Hn).fill(null),()=>Array(Hn).fill(mn.EMPTY)),e=w(Hn/2,Hn/2),t=Uo(n,e);let r=!1;const i=a=>{const o=Go(n,a),s=ko();if(s===mn.EMPTY||o)return;Wn(n,a,s);let c=0;const l=[Y.NORTH,Y.EAST,Y.SOUTH,Y.WEST];l.sort(()=>Math.sign(Math.random()*2-1));for(let d=0;d<4;d++){const f=l[d];if(!Co(n,a,f)||s===mn.LIGHT&&c>=3)continue;const h=G(a,Vr[f]);i(h),++c}c===0&&!r&&(Wn(n,a,mn.END),r=!0)};return i(t),{map:n,center:e}},jo=n=>{const e=[],t=[];let r=null;const i=Array.from(Array(Hn).fill(null),()=>Array(Hn).fill(null));for(let a=0;a<n.length;a++)for(let o=0;o<n[a].length;o++){const s=w(o,a),c=We(n,s);if(c===mn.EMPTY)continue;let l=0;for(let f=0;f<4;f++){const h=1<<f,v=We(n,G(s,Vr[h]));v!==mn.OUT_OF_BOUNDS&&v!==mn.EMPTY&&(l+=1<<f)}const d={position:s,cardinality:l,type:c};e.push(d),i[o][a]=d,c===mn.LIGHT&&t.push(d),c===mn.END&&(r=d)}return{tileSet:{allTiles:e,lightTiles:t,endTile:r},tileMap:i}},Do=()=>{const{map:n,center:e}=No(),{tileSet:t,tileMap:r}=jo(n);return{tileSet:t,tileMap:r,center:e}},Ho=n=>w(Math.round(n[0]/qn+Hn/2),Math.round(n[2]/qn+Hn/2)),ye=n=>b(qn*(n[0]-Hn/2),0,qn*(n[1]-Hn/2)),qo=n=>{let e=new Float32Array,t=new Float32Array,r=new Float32Array,i=[];for(const a of n){const o=rs(a);e=new Float32Array([...e,...o.vertices]),t=new Float32Array([...t,...o.normals]),r=new Float32Array([...r,...o.uvs]),i=[...i,...o.lights]}return{vertices:e,normals:t,uvs:r,lights:i}},$o=(n,e)=>{const t=Ho(e),r=n[t[0]][t[1]];return r===null?(console.error("next does not exist"),null):r},Xo=async({device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:r,depthStencilTextureView:i},multisampleData:{msaaTextureView:a,multisample:o}}},s,{shadowMapTexture:c,lightSourcesBuffer:l,activeLightIndicesBuffer:d},{playerPerspectiveBuffer:f,playerPositionBuffer:h})=>{const{texture:v,sampler:m}=await $e(n,"game/dungeon_textures_albedo.png"),{buffer:_,bufferLayout:g}=$(n,s.vertices,"float32x4"),{buffer:L,bufferLayout:I}=$(n,s.normals,"float32x4",1),{buffer:p,bufferLayout:y}=$(n,s.uvs,"float32x2",2),A=tn(n,[g,I,y],t,Vo,"triangle-list",{primitive:{frontFace:"ccw",cullMode:"front"},depthStencil:r,multisample:o},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),x=n.createBindGroup({layout:A.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:f}},{binding:1,resource:{buffer:h}}]}),O=Un(n,A,v,m,1),S=n.createBindGroup({layout:A.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:l}},{binding:1,resource:c.createView()},{binding:2,resource:{buffer:d}}]});return{pass:E=>{const V={view:a,resolveTarget:e.getCurrentTexture().createView(),loadOp:"clear",clearValue:vn.black,storeOp:"store"},B=E.beginRenderPass({colorAttachments:[V],depthStencilAttachment:{view:i,depthLoadOp:"clear",depthClearValue:1,depthStoreOp:"store"}});B.setPipeline(A),B.setVertexBuffer(0,_),B.setVertexBuffer(1,L),B.setVertexBuffer(2,p),B.setBindGroup(0,x),B.setBindGroup(1,O),B.setBindGroup(2,S),B.draw(s.vertices.length/4),B.end()}}},Yo=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;\r
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
`,Wo=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;
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
`,Zt=4,wt=30,zr=n=>{const e=Fn(Ln(n.position),Ln(G(n.position,n.direction)),b(0,1,0)),t=Qn(170,5,.01,qn*2);return M(t,e)},Jo=n=>{n.active=!1,n.intensity=0},Zo=n=>{n.active=!0},Ko=n=>new Float32Array(n.flatMap(e=>[T([e.position,e.direction]),nn(zr(e)),[...e.tint,e.intensity]].flat())),Qo=({device:n},e,t)=>{let r=t.reduce((A,x)=>A.vertexCount>x.vertexCount?A:x,t[0]);const i=n.createShaderModule({code:Wo}),a=n.createRenderPipeline({layout:"auto",vertex:{module:i,entryPoint:"main_vs",buffers:[r.vertexBufferLayout]},fragment:{module:i,entryPoint:"main_fs",targets:[{format:"rgba32float"}]},primitive:{frontFace:"ccw",cullMode:"none",topology:"triangle-list"},depthStencil:{depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"}}),o=n.createTexture({size:{width:2048,height:512,depthOrArrayLayers:e.length},format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),s=n.createTexture({size:{width:2048,height:512,depthOrArrayLayers:e.length},dimension:"2d",format:"rgba32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),c=e.map(A=>z(n,a,[new Float32Array(nn(zr(A)))],"UNIFORM",0).bindGroup),l=t.map(A=>{const x=Jt(A)?new Float32Array(be(A.modelMatrices)):new Float32Array(nn(xn()));return z(n,a,[x],"STORAGE",1).bindGroup}),{bindGroup:d}=z(n,a,[new Float32Array(nn(xn()))],"UNIFORM",2),{bindGroup:f,buffers:[h]}=z(n,a,[new Float32Array(nn(xn()))],"UNIFORM",2),v=(A,x)=>{if(x%2===0)return;const O=A/1e3,S=yn([.01*Math.sin(O)*Math.random(),.01*Math.sin(O)*Math.random(),.01*Math.sin(O)*Math.random()]);J(n,h,new Float32Array(nn(S)),0)},m=(A,x,O)=>{y(x),v(x,O);for(let S=0;S<e.length;S++){if(!g.includes(S))continue;const F=A.beginRenderPass({colorAttachments:[{view:s.createView({baseArrayLayer:S,arrayLayerCount:1}),loadOp:"clear",clearValue:vn.black,storeOp:"store"}],depthStencilAttachment:{view:o.createView({baseArrayLayer:S,arrayLayerCount:1}),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:1}});F.setPipeline(a),F.setBindGroup(0,c[S]);for(let E=0;E<t.length;E++){const V=t[E];if(F.setVertexBuffer(0,V.vertexBuffer),F.setBindGroup(1,l[E]),!V.indexBuffer||!V.triangleCount){F.setBindGroup(2,d),F.draw(V.vertexCount);continue}F.setBindGroup(2,f);const B=Jt(V)?V.instances:void 0;F.setIndexBuffer(V.indexBuffer,"uint32"),F.drawIndexed(V.triangleCount*3,B)}F.end()}},_=[];let g=[];const L=n.createBuffer({size:new Uint32Array(Zt).byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.length>wt&&console.warn("[initialization] number of lights larger than allowed limit");const I=n.createBuffer({size:(Rn.float32x4*2+Rn.float32x4x4+Rn.float32x4)*wt,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(I,0,Ko(e));const p=A=>{g=Aa(e.map(x=>er(_e(x.position,u(...A,1)))),Zt),n.queue.writeBuffer(L,0,new Uint32Array(g));for(const x of g)Zo(e[x]);for(let x=0;x<e.length;x++)if(!g.includes(x)){Jo(e[x]);const O=Rn.float32x4*2+Rn.float32x4x4+Rn.float32x4;J(n,I,new Float32Array([0]),O*x+O-Rn.float32)}for(const x of _)x(g)},y=A=>{const x=S=>S<6?S+=.1*Math.random():Math.sin(A/1e4)*Math.random()+6,O=Rn.float32x4*2+Rn.float32x4x4+Rn.float32x4;for(const S of g){const F=e[S];F.intensity=x(F.intensity),J(n,I,new Float32Array([F.intensity]),O*S+O-Rn.float32)}};return{renderable:{pass:m,onTileChange:p},lightData:{lights:e,shadowMapTexture:s,activeLightsChangeListeners:_,lightSourcesBuffer:I,activeLightIndicesBuffer:L}}},ns=n=>{const e=qn/2-.1,t=Mr(~n.cardinality&15),r=yt[t],i=ye(n.position),a=G(u(...G(b(0,.4,0),i),1),Jn(r,e));return{direction:yt[zo[t]],position:a,intensity:0,tint:b(.9,.4,0),active:!1}},es=({device:n},e)=>{const t=Ve(b(),1),r=[w(0,0),w(0,1),w(0,1),w(0,0),w(0,0),w(0,1),w(0,1),w(0,0)],i=e.map(h=>{const v=yn(Ln(G(h.position,G(Jn(h.direction,.1),u(0,-.65,0,0))))),m=M(Ee(90),Pe(30,Ln(h.direction))),_=Gn(.1,.65,.1);return M(M(v,m),_)}),{buffer:a}=Cn(n,new Uint32Array(T(t.triangleIndices.map(h=>Ln(h))))),{buffer:o,bufferLayout:s}=$(n,new Float32Array(T(t.vertices)),"float32x4"),{buffer:c,bufferLayout:l}=$(n,new Float32Array(T(t.normals)),"float32x4",1),{buffer:d,bufferLayout:f}=$(n,new Float32Array(T(r)),"float32x2",2);return{vertexBuffer:o,vertexBufferLayout:s,vertexCount:t.vertices.length,normalsBuffer:c,normalsBufferLayout:l,uvsBuffer:d,uvsBufferLayout:f,indexBuffer:a,triangleCount:t.triangleCount,instances:e.length,modelMatrices:i}},ts=({device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:r,depthStencilTextureView:i},multisampleData:{msaaTextureView:a,multisample:o}}},{vertexBuffer:s,vertexBufferLayout:c,normalsBuffer:l,normalsBufferLayout:d,uvsBuffer:f,uvsBufferLayout:h,indexBuffer:v,triangleCount:m,instances:_,modelMatrices:g},{playerPerspectiveBuffer:L},{lightSourcesBuffer:I})=>{const p=tn(n,[c,d,h],t,Yo,"triangle-list",{primitive:{frontFace:"ccw",cullMode:"back"},depthStencil:r,multisample:o}),y=new Float32Array(be(g)),A=n.createBuffer({size:Rn.float32x4x4*wt,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(A,0,y);const x=n.createBindGroup({layout:p.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:L}},{binding:1,resource:{buffer:A}},{binding:2,resource:{buffer:I}}]});return{pass:S=>{const F={view:a,resolveTarget:e.getCurrentTexture().createView(),loadOp:"load",clearValue:vn.black,storeOp:"store"},E=S.beginRenderPass({colorAttachments:[F],depthStencilAttachment:{view:i,depthLoadOp:"load",depthClearValue:1,depthStoreOp:"store"}});E.setPipeline(p),E.setIndexBuffer(v,"uint32"),E.setVertexBuffer(0,s),E.setVertexBuffer(1,l),E.setVertexBuffer(2,f),E.setBindGroup(0,x),E.drawIndexed(m*3,_),E.end()}}},qn=4,rs=n=>{const e=qn/2,t=ye(n.position),r=[u(-e,-e,e,1),u(-e,e,e,1),u(e,e,e,1),u(e,-e,e,1),u(-e,-e,-e,1),u(-e,e,-e,1),u(e,e,-e,1),u(e,-e,-e,1)],i=[u(3,0,4),u(4,7,3),u(6,5,1),u(1,2,6)],a=[...Array(6).fill(u(0,1,0,0)),...Array(6).fill(u(0,-1,0,0))],o=[w(1,0),w(.5,0),w(.5,.5),w(.5,.5),w(1,.5),w(1,0),w(.5,.5),w(0,.5),w(0,0),w(0,0),w(.5,0),w(.5,.5)],s=[w(.5,1),w(.5,.5),w(0,.5),w(0,.5),w(0,1),w(.5,1)];n.cardinality&Y.NORTH||(i.push(u(1,0,3),u(3,2,1)),a.push(...Array(6).fill(u(0,0,-1,0))),o.push(...s)),n.cardinality&Y.EAST||(i.push(u(2,3,7),u(7,6,2)),a.push(...Array(6).fill(u(-1,0,0,0))),o.push(...s)),n.cardinality&Y.SOUTH||(i.push(u(4,5,6),u(6,7,4)),a.push(...Array(6).fill(u(0,0,1,0))),o.push(...s)),n.cardinality&Y.WEST||(i.push(u(5,4,0),u(0,1,5)),a.push(...Array(6).fill(u(1,0,0,0))),o.push(...s));const c=new Float32Array(T(i.reduce((h,v)=>{for(let m=0;m<3;m++)h.push(G(r[v[m]],u(...t,0)));return h},[]))),l=new Float32Array(T(a)),d=new Float32Array(T(o));let f=[];return n.type===mn.LIGHT&&(f=[ns(n)]),{vertices:c,normals:l,uvs:d,lights:f}},is=(n,e)=>{const r=G(ye(e.position),b(-qn/2*.96,0,-qn/2*.96)),i=G(ye(e.position),b(+qn/2*.96,0,+qn/2*.96));e.cardinality&Y.WEST&&(r[0]=-1/0),e.cardinality&Y.SOUTH&&(r[2]=-1/0),e.cardinality&Y.EAST&&(i[0]=1/0),e.cardinality&Y.NORTH&&(i[2]=1/0),n[0]=Fe(n[0],r[0],i[0]),n[2]=Fe(n[2],r[2],i[2])},as=n=>{const e=Ve(b(0,0,0),1),{buffer:t,bufferLayout:r}=$(n,new Float32Array(T(e.vertices)),"float32x4",0),{buffer:i}=Cn(n,new Uint32Array(T(e.triangleIndices.map(o=>Ln(o))))),a=o=>{const s=yn(G(o,b(0,-.5,0))),c=Gn(1,2,1),l=M(s,c);J(n,t,new Float32Array(T(e.vertices.map(d=>Oe(d,l)))),0)};return{bufferedMesh:{vertexBuffer:t,vertexBufferLayout:r,indexBuffer:i,vertexCount:e.vertices.length,triangleCount:e.triangleCount},updateMesh:a}},os=({device:n})=>{const e=b(0,0,0),t=b(0,0,1),r=Mo(e,t),i=n.createBuffer({size:Rn.float32x4x4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});J(n,i,new Float32Array(nn(bt(r))),0);const a=n.createBuffer({size:Rn.float32x3,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});J(n,a,new Float32Array(b()),0);const{bufferedMesh:o,updateMesh:s}=as(n);return{camera:r,position:e,lookDirection:t,right:He(b(0,1,0),t),playerMoveListeners:[s],playerViewListeners:[],shadowBufferedMesh:o,playerPerspectiveBuffer:i,playerPositionBuffer:a}},Kt=({device:n},e,t,r)=>{let i=-t/512,a=r/512;e.lookDirection[1]>.97&&(a=Math.max(0,a)),e.lookDirection[1]<-.97&&(a=Math.min(0,a));const o=Yt(b(0,1,0),i),s=Yt(e.right,a),c=Xe(o,s);e.lookDirection=jn(Ln(Be(u(...e.lookDirection,1),c))),e.right=jn(He(nr.up,e.lookDirection)),Cr(n,e)},Cr=(n,e)=>{e.camera.extrinsics=Er(e.position,e.lookDirection);const t=bt(e.camera);for(const r of e.playerViewListeners)r(t);J(n,e.playerPerspectiveBuffer,new Float32Array(nn(bt(e.camera))),0)},ss=({device:n},e,t,r)=>{const i=Ge(r.w)-Ge(r.s),a=Ge(r.a)-Ge(r.d),o=r.v;if(!i&&!a)return;const s=ls(e,i,a,o);t.cheats.noClip||is(s,t.currentTile),e.position=s;for(const c of e.playerMoveListeners)c(e.position);J(n,e.playerPositionBuffer,new Float32Array(e.position),0),Cr(n,e)},cs=.1,ls=(n,e,t,r)=>{let i=b();const a=(r?2:1)*cs;if(e){const o=[...n.lookDirection];o[1]=0;const s=Jn(jn(o),a*e);i=G(i,s)}if(t){const o=[...n.right];o[1]=0;const s=Jn(jn(o),a*t);i=G(i,s)}return G(n.position,i)},fs=`@group(0) @binding(0) var<uniform> projection_view : mat4x4f;\r
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
`,us=(n,e)=>({direction:e,position:n,intensity:4,tint:b(35/100,50/100,9/100),active:!1}),ds=n=>{const e=u(...ye(n.position),0),t=Mr(n.cardinality),r=yt[t],i=2,a=Jn(r,qn/2-.1);let o=[u(-i,i,0,1),u(-i,-i,0,1),u(i,-i,0,1),u(i,i,0,1)];(t===Y.EAST||t===Y.WEST)&&(o=o.map(d=>Oe(d,Ee(90))));const s=new Uint32Array(T([b(0,1,3),b(3,1,2)])),c=new Float32Array(T([w(0,0),w(0,1),w(1,1),w(1,0)])),l=new Float32Array(T([r,r,r,r]));return{vertices:new Float32Array(T(o)),triangles:s,uvs:c,normals:l,lights:[us(G(e,a),r)],modelMatrix:yn(Ln(G(e,a)))}},hs=async({device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:r,depthStencilTextureView:i},multisampleData:{msaaTextureView:a,multisample:o}}},s,{playerPerspectiveBuffer:c})=>{const{texture:l,sampler:d}=await $e(n,"game/portal.png"),{buffer:f}=Cn(n,s.triangles),{buffer:h,bufferLayout:v}=$(n,s.vertices,"float32x4"),{buffer:m,bufferLayout:_}=$(n,s.normals,"float32x4",1),{buffer:g,bufferLayout:L}=$(n,s.uvs,"float32x2",2),I=tn(n,[v,_,L],t,fs,"triangle-list",{primitive:{frontFace:"ccw",cullMode:"none"},depthStencil:r,multisample:o},{blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}}}),p=new Float32Array(nn(s.modelMatrix)),y=n.createBuffer({size:p.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(y,0,p);const A=new Float32Array([0]),x=n.createBuffer({size:A.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(x,0,A);const O=n.createBindGroup({layout:I.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:c}},{binding:1,resource:{buffer:y}},{binding:2,resource:{buffer:x}}]}),S=Un(n,I,l,d,1);return{pass:(E,V)=>{J(n,x,new Float32Array([V]),0);const B={view:a,resolveTarget:e.getCurrentTexture().createView(),loadOp:"load",storeOp:"store"},R=E.beginRenderPass({colorAttachments:[B],depthStencilAttachment:{view:i,depthLoadOp:"load",depthClearValue:1,depthStoreOp:"store"}});R.setPipeline(I),R.setIndexBuffer(f,"uint32"),R.setVertexBuffer(0,h),R.setVertexBuffer(1,m),R.setVertexBuffer(2,g),R.setBindGroup(0,O),R.setBindGroup(1,S),R.drawIndexed(6),R.end()}}},_s=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on("game"),i=4,{multisample:a,msaaTexture:o}=Ie(n,r,t,i),s=n.createTexture({size:{width:r.width,height:r.height},format:"depth24plus",sampleCount:i,usage:GPUTextureUsage.RENDER_ATTACHMENT}),c={depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"},l=[],d=(v,m)=>{v=Fe(v,-36,36),m=Fe(m,-36,36);for(const g of l)g(v,m)};let f=!1;const{keyMap:h}=zi("game",d,{onStart:()=>f=!0,onEnd:()=>f=!1});return{device:n,mainCanvas:{context:e,canvasFormat:t,depthData:{depthStencil:c,depthStencilTextureView:s.createView()},multisampleData:{multisample:a,msaaTextureView:o.createView()}},input:{keyMap:h,mouseMoveListeners:l,inGame:f}}},vs=(n,e)=>{const t=$o(n.map,e.position);if(t!==n.currentTile&&t!==null){n.currentTile=t;for(const r of n.tileChangeListeners)r(ye(t.position),t.position);t.type===mn.END&&window.alert("you got to the end yay")}},ms=async()=>{const n=await _s(),e=os(n);n.input.mouseMoveListeners.push((p,y)=>Kt(n,e,p,y));const{tileSet:t,tileMap:r}=Do(),i=qo(t.allTiles),a={map:r,currentTile:null,tileChangeListeners:[],cheats:{noClip:!1}},{buffer:o,bufferLayout:s}=$(n.device,i.vertices,"float32x4",0),c={vertexBuffer:o,vertexBufferLayout:s,vertexCount:i.vertices.length/4},l=ds(t.endTile),d=es(n,i.lights),{renderable:f,lightData:h}=Qo(n,[...i.lights,...l.lights],[c,e.shadowBufferedMesh,d]);a.tileChangeListeners.push(f.onTileChange);const{pass:v}=await Xo(n,i,h,e),{pass:m}=await hs(n,l,e),{pass:_}=ts(n,d,e,h),g=()=>{ss(n,e,a,n.input.keyMap),n.input.keyMap.p&&(a.cheats.noClip=!a.cheats.noClip,n.input.keyMap.p=!1,console.info("[cheats]: no clip toggled to",a.cheats.noClip))};Kt(n,e,0,0);let L=0;const I=p=>{g(),vs(a,e);const y=n.device.createCommandEncoder();f.pass(y,p,L),v(y,p,L),m(y,p,L),_(y,p,L),n.device.queue.submit([y.finish()]),L++,requestAnimationFrame(I)};requestAnimationFrame(I)},ps=(n,e)=>{const t=en(),r=K("game");t.append(r),n.append(t),e.push(ms)},gs=(n,e)=>{if(!Je.children)throw"Graphics routes do not exist";for(const t of Je.children.map(r=>r.generator))t(n,e)},Je={path:"graphics",name:"Graphics",description:"",generator:gs,children:[{path:"webgpu-basics",name:"Introduction to the basics",description:"A walkthrough the basics of graphics and setting it up in WebGPU.",generator:Na},{path:"drawing",name:"Drawing via interaction",description:"Using the browser interaction features to create a simple drawing application.",generator:qa},{path:"projection",name:"Projection types",description:"An overview of the types of projections and GPU instancing.",generator:eo},{path:"lighting",name:"Lighting",description:"Showcase of the most common GPU lighting models and runtime mesh creation.",generator:io},{path:"meshes",name:"Mesh intstantiation",description:"Populating mesh data in the GPU and displaying a model in the frame.",generator:so},{path:"texturing",name:"Applying textures",description:"Using textures to add colors to a mesh and an overview of the WebGPU process mipmapping.",generator:mo},{path:"env-mapping",name:"Environmental mapping",description:"Using environmental maps to populate color values reflected by mirror surfaces (with or without normal maps).",generator:bo},{path:"shadows",name:"Shadows (projection)",description:"Creating shadows in the scene using projective shadowing.",generator:Lo},{path:"shadow-mapping",name:"Shadows (maps)",description:"Creating shadows in the scene using shadow maps.",generator:Bo},{path:"camera-movement",name:"Other interaction types",description:"A showcase of other scene interaction methods.",generator:Eo},{path:"game",name:"A simple game engine (project)",description:"Using the graphics toolset to create a simple dungeon crawler with focus on lighting, shadow maps and player movement.",generator:ps}]},xs=`struct Ray {
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
`,Gr="raycast-anatomy",bs=async()=>{const{device:n,context:e,canvasFormat:t}=await on(Gr),r=tn(n,[],t,xs,"triangle-strip"),{pass:i,executePass:a}=dn(n,e,vn.black);i.setPipeline(r),i.draw(4),a()},ys=(n,e)=>{const t=an("The anatomy of a ray cast"),r=rn("No description yet"),i=K(Gr);n.append(t,r,i),e.push(bs)},ws=`struct ViewboxOptions {
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
`,kr="light",Ur="zoom",Nr="light-intensity-slider",jr="light-position-x-input",Dr="light-position-y-input",Hr="light-position-z-input",qr="shade-all-visible-objects",$r="refractive-index-slider",Ls=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await on(kr),i=k(Ur),a=k(Nr),o=k($r),s=k(jr),c=k(Dr),l=k(Hr),d=k(qr,"checked"),f=t.width/t.height,h=tn(n,[],r,ws,"triangle-strip"),{bindGroup:v,buffers:[m]}=z(n,h,[new Float32Array([i(),f])],"UNIFORM"),_=new Float32Array([s(),c(),l(),a(),d()?1:0,o(),0,0]),{bindGroup:g,buffers:[L]}=z(n,h,[_],"UNIFORM",1),I=()=>{J(n,m,new Float32Array([i(),f]),0),J(n,L,new Float32Array([s(),c(),l(),a(),d()?1:0,o(),0,0]),0);const{pass:p,executePass:y}=dn(n,e,vn.black);p.setPipeline(h),p.setBindGroup(0,v),p.setBindGroup(1,g),p.draw(4),y(),requestAnimationFrame(I)};requestAnimationFrame(I)},Is=(n,e)=>{const t=an("A simple lighting system"),r=rn("No description yet"),i=en(),a=K(kr,{width:512+128,height:512-64}),o=hn(),s=P(ln(Ur,1,.1,10,.1),"Zoom (camera constant)"),c=P(ln(Nr,3.14,0,10,.01),"Light intensity"),l=P(ln($r,1,-1,10,.1),"Diffuse reflectance"),d=P(ln(jr,0,-5,5,.1),"Light X position"),f=P(ln(Dr,1,0,5,.1),"Light Y position"),h=P(ln(Hr,0,-5,5,.1),"Light Z position"),v=P(ne(qr,!0),"Shading on",!1);o.append(s,c,l,d,f,h,v),i.append(a,o),n.append(t,r,i),e.push(Ls)},Xr=(n,e)=>{ys(n,e),Is(n,e)},As=`struct ViewboxOptions {
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
`,ze="lighting",Yr=ze+"-light-position-x-input",Wr=ze+"-light-position-y-input",Jr=ze+"-light-position-z-input",Ss=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await on(ze),i=k(Yr),a=k(Wr),o=k(Jr),s=t.width/t.height,c=tn(n,[],r,As,"triangle-strip"),l=new Float32Array([s]),{bindGroup:d}=z(n,c,[l],"UNIFORM"),f=new Float32Array([i(),a(),o(),0,0,0,0,0,0]),{bindGroup:h,buffers:[v]}=z(n,c,[f],"UNIFORM",1),m=()=>{J(n,v,new Float32Array([i(),a(),o(),0,0,0,0,0,0]),0);const{pass:_,executePass:g}=dn(n,e,vn.black);_.setPipeline(c),_.setBindGroup(0,d),_.setBindGroup(1,h),_.draw(4),g(),requestAnimationFrame(m)};requestAnimationFrame(m)},Rs=(n,e)=>{const t=an("A simple lighting system"),r=rn("No description yet"),i=en(),a=K(ze,{width:512+128,height:512-64}),o=hn(),s=P(ln(Yr,0,-5,5,.1),"Light X position"),c=P(ln(Wr,1,0,5,.1),"Light Y position"),l=P(ln(Jr,0,-5,5,.1),"Light Z position");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(Ss)},Ts=`struct Environment {
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
`,oe="mirrors",ie={"Base color":0,Lambertian:1,Mirror:2,Refractive:3,Phong:4,Glossy:5},Zr=oe+"-sphere-shader",Kr=oe+"-triangle-shader",Qr=oe+"-plane-shader",ni=oe+"-light-position-x-input",ei=oe+"-light-position-y-input",ti=oe+"-light-position-z-input",ri=oe+"-animation-slider",Bs=async()=>{const{device:n,context:e,canvas:t,canvasFormat:r}=await on(oe),i=k(ni),a=k(ei),o=k(ti),s=k(Zr),c=k(Kr),l=k(Qr),d=k(ri),f=t.width/t.height,h=tn(n,[],r,Ts,"triangle-strip"),v=new Float32Array([f,0]),{bindGroup:m,buffers:[_]}=z(n,h,[v],"UNIFORM"),g=new Float32Array([i(),a(),o(),ie[s()],ie[c()],ie[l()],0,0,0]),{bindGroup:L,buffers:[I]}=z(n,h,[g],"UNIFORM",1),p=y=>{J(n,_,new Float32Array([f,y*d()/512]),0),J(n,I,new Float32Array([i(),a(),o(),ie[s()],ie[c()],ie[l()],0,0,0]),0);const{pass:A,executePass:x}=dn(n,e,vn.black);A.setPipeline(h),A.setBindGroup(0,m),A.setBindGroup(1,L),A.draw(4),x(),requestAnimationFrame(p)};requestAnimationFrame(p)},Ps=(n,e)=>{const t=an("Mirrors"),r=rn("No description yet"),i=en(),a=K(oe,{width:512+128,height:512-64}),o=hn(),s=P(Bn(Zr,Object.keys(ie),"Refractive"),"Sphere shader type",!1),c=P(Bn(Kr,Object.keys(ie),"Lambertian"),"Triangle shader type",!1),l=P(Bn(Qr,Object.keys(ie),"Lambertian"),"Plane shader type",!1),d=P(ln(ni,0,-5,5,.1),"Light X position"),f=P(ln(ei,1,0,5,.1),"Light Y position"),h=P(ln(ti,0,-5,5,.1),"Light Z position"),v=P(ln(ri,0,0,1,.1),"Orbit animation speed");o.append(s,c,l,d,f,h,v),i.append(a,o),n.append(t,r,i),e.push(Bs)},ii=(n,e)=>{Rs(n,e),Ps(n,e)},Os=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,ai="texture",oi="texture-repeat-style",Fs=["clamp-to-edge","repeat","mirror-repeat"],Es=async()=>{const{device:n,context:e,canvasFormat:t}=await on(ai),r=async i=>{const a=tn(n,[],t,Os,"triangle-strip"),{textureData:o,height:s,width:c}=await le("textures/grass_minecraft.png"),{texture:l,sampler:d}=Kn(n,o,c,s,{addressModeU:i,addressModeV:i}),f=Un(n,a,l,d),{pass:h,executePass:v}=dn(n,e,vn.black);h.setPipeline(a),h.setBindGroup(0,f),h.draw(4),v()};r(wn(oi,r))},Ms=(n,e)=>{const t=an("What is a texture"),r=rn("No description yet"),i=en(),a=K(ai),o=hn(),s=P(Bn(oi,Fs,"repeat"),"Texture edge behavior",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(Es)},Vs=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,si="texturing",Lt="grass-texture-scale",je="subdivision-jitter-slider",It="grass-texture-select",ci="texture-repeat-style-on-plane",zs=["clamp-to-edge","repeat","mirror-repeat"],Cs=async()=>{const{device:n,canvas:e,context:t,canvasFormat:r}=await on(si),i=k(Lt),a=k(je),o=k(It),s=tn(n,[],r,Vs,"triangle-strip");let c,l;const d=async I=>{const p=[le("textures/grass.jpg"),le("textures/grass_minecraft.png")],y=await Promise.all(p),{texture:A,sampler:x}=Kn(n,y[0].textureData,y[0].width,y[0].height,{addressModeU:I,addressModeV:I}),{texture:O,sampler:S}=Kn(n,y[1].textureData,y[1].width,y[1].height,{addressModeU:I,addressModeV:I});c=Un(n,s,A,x),l=Un(n,s,O,S)};await d("repeat");const{bindGroup:f,buffers:[h]}=z(n,s,[new Float32Array([i(),a()*a()])],"UNIFORM",1),{bindGroup:v,buffers:[m]}=z(n,s,[new Float32Array(200)],"STORAGE",2),_=()=>{J(n,h,new Float32Array([i(),a()*a()]),0);const I={"grass.jpg":c,"grass_minecraft.png":l}[o()],{pass:p,executePass:y}=dn(n,t,vn.black);p.setPipeline(s),p.setBindGroup(0,I),p.setBindGroup(1,f),p.setBindGroup(2,v),p.draw(4),y()},g=I=>{const p=rr(e.height,I);J(n,m,new Float32Array(T(p)),0,!0)},L=wn(je,g);g(L),Ft([Lt,It,je],_),wn(ci,async I=>{await d(I),_()}),_()},Gs=(n,e)=>{const t=an("Applying textures in rendering"),r=rn("No description yet"),i=en(),a=K(si),o=hn(),s=P(ln(Lt,.2,.1,2,.1),"Texture scale"),c=P(ln(je,1,1,10,1),"Subdivisions for stratisfied jitter"),l=P(Bn(It,["grass.jpg","grass_minecraft.png"],"grass_minecraft.png"),"Grass texture",!1),d=P(Bn(ci,zs,"repeat"),"Texture edge behavior",!1);o.append(l,s,d,c),i.append(a,o),n.append(t,r,i),e.push(Cs)},li=(n,e)=>{Ms(n,e),Gs(n,e)},ks=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,fi="default-scene-as-meshes",Us=async()=>{const{device:n,context:e,canvasFormat:t}=await on(fi),r=tn(n,[],t,ks,"triangle-strip"),i=Ui([b(-.2,.1,.9),b(.2,.1,.9),b(-.2,.1,-.1)]),{bindGroup:a}=z(n,r,[new Float32Array(T(i.vertices)),new Uint32Array(T(i.triangleIndices))],"STORAGE",1),o=await le("textures/grass_minecraft.png"),{texture:s,sampler:c}=Kn(n,o.textureData,o.width,o.height,{addressModeU:"repeat",addressModeV:"repeat"}),l=Un(n,r,s,c);(()=>{const{pass:f,executePass:h}=dn(n,e,vn.black);f.setPipeline(r),f.setBindGroup(0,l),f.setBindGroup(1,a),f.draw(4),h()})()},Ns=(n,e)=>{const t=an("Replacing the triangle with a triangle"),r=rn("No description yet"),i=en(),a=K(fi),o=hn();i.append(a,o),n.append(t,r,i),e.push(Us)},js=`@group(0) @binding(0) var<storage> ut_vertices : array<vec3f>;
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
`,ui="utah-teapot",Ds=["Flat","Vertex normals"],di="shading-select-ut",Hs=async()=>{const{device:n,context:e,canvasFormat:t}=await on(ui),r=tn(n,[],t,js,"triangle-strip"),i=await $n("models/teapot.obj"),a=ir(i,{}),{bindGroup:o}=z(n,r,[new Float32Array(T(a.vertices)),new Uint32Array(T(a.triangleIndices)),new Float32Array(T(a.normals))],"STORAGE",0),{bindGroup:s,buffers:[c]}=z(n,r,[new Uint32Array([a.triangleCount,0])],"UNIFORM",1),l=f=>{const h={Flat:0,"Vertex normals":1};Vn(n,c,new Uint32Array([h[f]]),4);const{pass:v,executePass:m}=dn(n,e,Re(.8,.4,.4,1));v.setPipeline(r),v.setBindGroup(0,o),v.setBindGroup(1,s),v.draw(4),m()},d=wn(di,l);l(d)},qs=(n,e)=>{const t=an("Introducing the Utah Teapot"),r=rn("No description yet"),i=en(),a=K(ui,{width:840,height:450}),o=hn(),s=P(Bn(di,Ds,"Flat"),"Shading type",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(Hs)},$s=`@group(0) @binding(0) var<storage> cb_vertices : array<vec3f>;
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
`,hi="cornell-box",Xs=["Flat","Lambertian"],_i="shading-select-cb",Ys=async()=>{const{device:n,context:e,canvasFormat:t}=await on(hi),r=tn(n,[],t,$s,"triangle-strip"),i=await $n("models/CornellBoxWithBlocks.obj"),a=ir(i,{}),o=new Float32Array(i.mtls[0].materials.reduce((m,_)=>[...m,...T([_.color,_.specular,_.emission,u(_.illum,_.shininess,_.ior)])],[])),s=a.materialIndices.reduce((m,_,g)=>(i.mtls[0].materials[_].illum>=1&&m.push(g),m),[]),{bindGroup:c}=z(n,r,[new Float32Array(T(a.vertices)),new Uint32Array(T(a.triangleIndices)),new Uint32Array(a.materialIndices),new Uint32Array(s)],"STORAGE",0),{bindGroup:l,buffers:[d]}=z(n,r,[new Uint32Array([a.triangleCount,s.length,0])],"UNIFORM",1),{bindGroup:f}=z(n,r,[o],"STORAGE",2),h=m=>{const _={Flat:0,Lambertian:1}[m];Vn(n,d,new Uint32Array([_]),2*4);const{pass:g,executePass:L}=dn(n,e,vn.black);g.setPipeline(r),g.setBindGroup(0,c),g.setBindGroup(1,l),g.setBindGroup(2,f),g.draw(4),L()},v=wn(_i,h);h(v)},Ws=(n,e)=>{const t=an("Inside the Cornell box"),r=rn("No description yet"),i=en(),a=K(hi),o=hn(),s=P(Bn(_i,Xs,"Lambertian"),"Shading type",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(Ys)},vi=(n,e)=>{Ns(n,e),qs(n,e),Ws(n,e)},Js=`@group(0) @binding(0) var<storage> vertices : array<vec3f>;
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
`,mi="bsp",pi="animation-speed-bsp",Zs=async()=>{const{device:n,context:e,canvasFormat:t}=await on(mi),r=k(pi),i=tn(n,[],t,Js,"triangle-strip"),a=ee(await $n("models/bunny.obj",1)),o=ve(a),{bindGroup:s}=z(n,i,[o.vertices,o.normals,o.indices],"STORAGE"),{bindGroup:c}=z(n,i,[o.bspPlanes,o.bspTree,o.treeIds],"STORAGE",1),{bindGroup:l,buffers:[d,f]}=z(n,i,[o.aabb,new Float32Array([0])],"UNIFORM",2);let h=0;const v=()=>{h+=.025*r(),J(n,f,new Float32Array([h]),0);const{pass:m,executePass:_}=dn(n,e,vn.black);m.setPipeline(i),m.setBindGroup(0,s),m.setBindGroup(1,c),m.setBindGroup(2,l),m.draw(4),_(),requestAnimationFrame(v)};requestAnimationFrame(v)},Ks=(n,e)=>{const t=an("Using the Binary Space Partitioning tree"),r=rn("why dots in black?"),i=en(),a=K(mi),o=hn(),s=P(ln(pi,0,0,1,.01),"Speed of the animation");o.append(s),i.append(a,o),n.append(t,r,i),e.push(Zs)},Qs=`struct VertexNormal {
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
`,gi="cornell-interleave",nc=async()=>{const{device:n,context:e,canvasFormat:t}=await on(gi),r=tn(n,[],t,Qs,"triangle-strip"),i=ee(await $n("models/CornellBoxWithBlocks.obj")),a=ve(i),o=we([a.vertices,a.normals]),s=new Uint32Array(a.indices);Le(s,i.matIndices,4);const c=new Uint32Array(i.lightIndices),l=new Float32Array(i.materials.reduce((_,g)=>[..._,...T([g.color,g.specular,g.emission,u(g.illum,g.shininess,g.ior)])],[])),{bindGroup:d}=z(n,r,[o,s,c],"STORAGE"),{bindGroup:f}=z(n,r,[a.bspPlanes,a.bspTree,a.treeIds],"STORAGE",1),{bindGroup:h}=z(n,r,[a.aabb,new Uint32Array([c.length])],"UNIFORM",2),{bindGroup:v}=z(n,r,[l],"STORAGE",3);(()=>{const{pass:_,executePass:g}=dn(n,e,vn.black);_.setPipeline(r),_.setBindGroup(0,d),_.setBindGroup(1,f),_.setBindGroup(2,h),_.setBindGroup(3,v),_.draw(4),g()})()},ec=(n,e)=>{const t=an("Using the Binary Space Partitioning tree"),r=rn("No description yet"),i=en(),a=K(gi),o=hn();i.append(a,o),n.append(t,r,i),e.push(nc)},tc=`struct VertexNormal {
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
`,xi="cornell-glass",bi="jittering-active-bsp-cb",rc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(xi),i=tn(n,[],t,tc,"triangle-strip"),a=ee(await $n("models/CornellBox.obj")),o=ve(a),s=we([o.vertices,o.normals]),c=new Uint32Array(o.indices);Le(c,a.matIndices,4);const l=new Uint32Array(a.lightIndices),d=new Float32Array(a.materials.reduce((A,x)=>[...A,...T([x.color,x.specular,x.emission,u(x.illum,x.shininess,x.ior)])],[])),{bindGroup:f}=z(n,i,[s,c,l],"STORAGE"),{bindGroup:h}=z(n,i,[o.bspPlanes,o.bspTree,o.treeIds],"STORAGE",1),{bindGroup:v,buffers:[m,_,g]}=z(n,i,[o.aabb,new Uint32Array([l.length]),new Uint32Array([36])],"UNIFORM",2),L=rr(r.height,6),{bindGroup:I}=z(n,i,[d,new Float32Array(T(L))],"STORAGE",3);wn(bi,A=>{const x=A?36:1;Vn(n,g,new Uint32Array([x]),0),y()},"checked");const y=()=>{const{pass:A,executePass:x}=dn(n,e,vn.black);A.setPipeline(i),A.setBindGroup(0,f),A.setBindGroup(1,h),A.setBindGroup(2,v),A.setBindGroup(3,I),A.draw(4),x()};y()},ic=(n,e)=>{const t=an("Spicing things up"),r=rn("No description yet"),i=en(),a=K(xi),o=hn(),s=P(ne(bi,!0),"Jittering enabled",!1);o.append(s),i.append(a,o),n.append(t,r,i),e.push(rc)},ac=(n,e)=>{Ks(n,e),ec(n,e),ic(n,e)},oc=`struct VertexNormal {
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
`,sc=`struct VertexNormal {
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
`,cc=`struct VertexNormal {
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
`,yi="cornell-progressive",At="progressive-enabled-cb",wi="select-shader-cb-progressive",lc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(yi),i=k(At,"checked"),a=ee(await $n("models/CornellBoxWithBlocks.obj")),o=ve(a),s=we([o.vertices,o.normals]),c=new Uint32Array(o.indices);Le(c,a.matIndices,4);const l=new Uint32Array(a.lightIndices),d=new Float32Array(a.materials.reduce((m,_)=>[...m,...T([_.color,_.specular,_.emission,u(_.illum,_.shininess,_.ior)])],[])),f={"Simple progressive":oc,"Simple progressive with soft shadows":sc,"Complex progressive":cc},h={f:()=>{}},v=m=>{const{renderSrc:_,renderDst:g,blitPingPong:L}=Ze(n,r),I=n.createShaderModule({code:f[m]}),p=n.createRenderPipeline({layout:"auto",vertex:{module:I,entryPoint:"main_vs"},fragment:{module:I,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:y}=z(n,p,[s,c,l,d],"STORAGE"),{bindGroup:A}=z(n,p,[o.bspPlanes,o.bspTree,o.treeIds],"STORAGE",1),{bindGroup:x,buffers:[O,S,F]}=z(n,p,[o.aabb,new Uint32Array([l.length]),new Uint32Array([0,r.width,r.height])],"UNIFORM",2),E=n.createBindGroup({layout:p.getBindGroupLayout(3),entries:[{binding:0,resource:g.createView()}]});let V=0;const B=()=>{if(!i())return;V+=1,Vn(n,F,new Uint32Array([V]),0);const{pass:R,encoder:H}=dn(n,e,vn.black,{otherColorAttachments:[{view:_.createView(),loadOp:"load",storeOp:"store"}]});R.setPipeline(p),R.setBindGroup(0,y),R.setBindGroup(1,A),R.setBindGroup(2,x),R.setBindGroup(3,E),R.draw(4),R.end(),L(H),n.queue.submit([H.finish()]),requestAnimationFrame(B)};h.f=()=>requestAnimationFrame(B),requestAnimationFrame(B)};v(wn(wi,v)),wn(At,()=>h.f(),"checked")},fc=(n,e)=>{const t=an("Progressive rendering, the basics"),r=rn("No description yet"),i=en(),a=K(yi),o=hn(),s=P(ne(At,!0),"Progressive rendering enabled",!1),c=P(Bn(wi,["Simple progressive","Simple progressive with soft shadows","Complex progressive"],"Complex progressive"),"Progressive shader type",!1);o.append(s,c),i.append(a,o),n.append(t,r,i),e.push(lc)},Li=(n,e)=>{fc(n,e)},uc=`struct VertexNormal {
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
`,Ut="brdfs",St="progressive-enabled-cb-"+Ut,Ii="brdf-color-picker",dc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(Ut),i=k(St,"checked"),a=k(Ii),o=ee(await $n("models/CornellBox.obj")),s=ve(o),c=we([s.vertices,s.normals]),l=new Uint32Array(s.indices);Le(l,o.matIndices,4);const d=new Uint32Array(o.lightIndices),f=new Float32Array(o.materials.reduce((B,R)=>[...B,...T([R.color,R.specular,R.emission,u(R.illum,R.shininess,R.ior)])],[]));let{renderSrc:h,renderDst:v,blitPingPong:m}=Ze(n,r);const _=n.createShaderModule({code:uc}),g=n.createRenderPipeline({layout:"auto",vertex:{module:_,entryPoint:"main_vs"},fragment:{module:_,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:L}=z(n,g,[c,l,d,f],"STORAGE"),{bindGroup:I}=z(n,g,[s.bspPlanes,s.bspTree,s.treeIds],"STORAGE",1),{bindGroup:p,buffers:[y,A,x,O]}=z(n,g,[s.aabb,new Uint32Array([d.length]),new Uint32Array([0,r.width,r.height]),new Float32Array(qe(ce(a())))],"UNIFORM",2),S=n.createBindGroup({layout:g.getBindGroupLayout(3),entries:[{binding:0,resource:v.createView()}]});let F=0;const E=()=>{if(!i())return;V===!0&&(V=!1,F=0),F+=1,Vn(n,x,new Uint32Array([F]),0),J(n,O,new Float32Array(qe(ce(a()))),0);const{pass:B,encoder:R}=dn(n,e,vn.black,{otherColorAttachments:[{view:h.createView(),loadOp:"load",storeOp:"store"}]});B.setPipeline(g),B.setBindGroup(0,L),B.setBindGroup(1,I),B.setBindGroup(2,p),B.setBindGroup(3,S),B.draw(4),B.end(),m(R),n.queue.submit([R.finish()]),requestAnimationFrame(E)};wn(St,B=>{B&&requestAnimationFrame(E)},"checked");let V=!1;Ot("restart-progressive-brdf",()=>V=!0),E()},hc=(n,e)=>{const t=an("Progressive rendering, the basics"),r=rn("No description yet"),i=en(),a=K(Ut),o=hn(),s=P(ne(St,!0),"Progressive rendering enabled",!1),c=P(De(Ii,"#1a3205"),"Sphere extinction coefficient"),l=Pt("restart-progressive-brdf","Restart progressive");o.append(s,c,l),i.append(a,o),n.append(t,r,i),e.push(dc)},Ai=(n,e)=>{hc(n,e)},_c=`struct VertexNormal {
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
`,Nt="environmental",Rt="progressive-enabled-cb-"+Nt,vc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(Nt),i=k(Rt,"checked"),a=k("environmental-texture-type"),{texture:o,sampler:s}=await $e(n,"textures/luxo_pxr_campus.jpg"),{texture:c,sampler:l}=await $e(n,"textures/luxo_pxr_campus.hdr.png"),d=ee(await $n("models/teapot.obj",1)),f=ve(d),h=we([f.vertices,f.normals]),v=new Uint32Array(f.indices);Le(v,d.matIndices,4);const m=new Float32Array(d.materials.reduce((C,q)=>[...C,...T([q.color,q.specular,q.emission,u(q.illum,q.shininess,q.ior)])],[]));let{renderSrc:_,renderDst:g,blitPingPong:L}=Ze(n,r);const I=n.createShaderModule({code:_c}),p=n.createRenderPipeline({layout:"auto",vertex:{module:I,entryPoint:"main_vs"},fragment:{module:I,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),{bindGroup:y}=z(n,p,[h,v,m],"STORAGE"),{bindGroup:A}=z(n,p,[f.bspPlanes,f.bspTree,f.treeIds],"STORAGE",1),{bindGroup:x,buffers:[O,S,F,E,V]}=z(n,p,[f.aabb,new Uint32Array([0,r.width,r.height]),new Uint32Array([3,0,0,0]),new Float32Array([1,0,0,0]),new Uint32Array([0,0,0,0])],"UNIFORM",2),B=n.createBindGroup({layout:p.getBindGroupLayout(3),entries:[{binding:0,resource:g.createView()},{binding:1,resource:l},{binding:2,resource:c.createView()}]}),R=n.createBindGroup({layout:p.getBindGroupLayout(3),entries:[{binding:0,resource:g.createView()},{binding:1,resource:s},{binding:2,resource:o.createView()}]});let H=0;const sn=()=>{if(!i())return;W===!0&&(W=!1,H=0),H+=1,Vn(n,S,new Uint32Array([H]),0);const{pass:C,encoder:q}=dn(n,e,vn.black,{otherColorAttachments:[{view:_.createView(),loadOp:"load",storeOp:"store"}]});C.setPipeline(p),C.setBindGroup(0,y),C.setBindGroup(1,A),C.setBindGroup(2,x),C.setBindGroup(3,a()==="High dynamic range"?B:R),C.draw(4),C.end(),L(q),n.queue.submit([q.finish()]),requestAnimationFrame(sn)};wn(Rt,C=>{C&&requestAnimationFrame(sn)},"checked");const cn=C=>{const q={"Base color":3,Lambertian:0,Mirror:1}[C];Vn(n,F,new Uint32Array([q]),0)};cn(wn("model-shader-select-env",cn));const U=C=>{J(n,E,new Float32Array([C?1:0,0,0,0]),0)};U(wn("include-sunlight",U,"checked"));const X=C=>{const q=C==="High dynamic range"?1:0;Vn(n,V,new Uint32Array([q]),0)};X(wn("environmental-texture-type",X));let W=!1;Ot("restart-progressive-env",()=>W=!0),sn()},mc=(n,e)=>{const t=an("env"),r=rn("No description yet"),i=en(),a=K(Nt),o=hn(),s=P(ne(Rt,!0),"Progressive rendering enabled",!1),c=P(Bn("model-shader-select-env",["Base color","Lambertian","Mirror"],"Lambertian"),"Model shader type",!1),l=P(ne("include-sunlight",!0),"Sun light on",!1),d=P(Bn("environmental-texture-type",["Low dynamic range","High dynamic range"],"Low dynamic range"),"Environmental texture type",!1),f=Pt("restart-progressive-env","Restart progressive");o.append(s,c,l,d,f),i.append(a,o),n.append(t,r,i),e.push(vc)},Si=(n,e)=>{mc(n,e)},pc=`struct VertexNormal {
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
`,gc=`@group(0) @binding(0) var<storage, read_write> debug_canvas : array<vec4f>;
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
`,pe="drawing-to-debug-canvas",Tt="progressive-enabled",xc=async()=>{const{device:n,context:e,canvasFormat:t,canvas:r}=await on(pe),i=k(Tt,"checked"),a=it("pixel-value-debug"),o=it("pixel-count-debug"),s=ee(await $n("models/CornellBoxWithBlocks.obj")),c=ve(s),l=we([c.vertices,c.normals]),d=new Uint32Array(c.indices);Le(d,s.matIndices,4);const f=new Uint32Array(s.lightIndices),h=new Float32Array(s.materials.reduce((j,D)=>[...j,...T([D.color,D.specular,D.emission,u(D.illum,D.shininess,D.ior)])],[])),{renderSrc:v,renderDst:m,blitPingPong:_}=Ze(n,r),g=n.createShaderModule({code:pc}),L=n.createRenderPipeline({layout:"auto",vertex:{module:g,entryPoint:"main_vs"},fragment:{module:g,entryPoint:"main_fs",targets:[{format:t},{format:"rgba32float"}]},primitive:{topology:"triangle-strip"}}),I=document.getElementById(pe+"-debug"),p=I.getContext("gpupresent")||I.getContext("webgpu");p.configure({device:n,format:t,alphaMode:"premultiplied"});const y=n.createShaderModule({code:gc}),A=n.createRenderPipeline({layout:"auto",vertex:{module:y,entryPoint:"main_vs",buffers:[]},fragment:{module:y,entryPoint:"main_fs",targets:[{format:t}]},primitive:{topology:"triangle-strip"}}),{bindGroup:x}=z(n,L,[l,d,f,h,c.bspPlanes,c.bspTree,c.treeIds],"STORAGE"),O=n.createBindGroup({layout:L.getBindGroupLayout(1),entries:[{binding:0,resource:m.createView()}]}),{bindGroup:S,buffers:[F,E,V]}=z(n,L,[c.aabb,new Uint32Array([f.length]),new Uint32Array([0,r.width,r.height])],"UNIFORM",2),B=n.createBuffer({size:Rn.float32x4*r.height*r.width,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC}),R=n.createBuffer({size:Rn.float32x4,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),H=async()=>{await R.mapAsync(GPUMapMode.READ);const j=new Float32Array(R.getMappedRange());a([...j].map(D=>D.toFixed(2)).join(", ")),R.unmap()},sn=n.createBindGroup({layout:L.getBindGroupLayout(3),entries:[{binding:0,resource:{buffer:B}}]}),cn=n.createBuffer({size:Rn.float32x2,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});let U=16;const X=n.createBuffer({size:new Uint32Array(1).byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});Vn(n,X,new Uint32Array([U]),0);const W=n.createBindGroup({layout:A.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:B}},{binding:1,resource:{buffer:cn}},{binding:2,resource:{buffer:X}}]}),C=j=>{const D=j.beginRenderPass({colorAttachments:[{view:p.getCurrentTexture().createView(),loadOp:"clear",clearValue:vn.transparent,storeOp:"store"}]});D.setPipeline(A),D.setBindGroup(0,W),D.draw(4),D.end()};let q=0;const Q=()=>{if(!i())return;q+=1,Vn(n,V,new Uint32Array([q]),0);const j=n.createCommandEncoder(),D=j.beginRenderPass({colorAttachments:[{view:e.getCurrentTexture().createView(),loadOp:"clear",clearValue:vn.black,storeOp:"store"},{view:v.createView(),loadOp:"load",storeOp:"store"}]});D.setPipeline(L),D.setBindGroup(0,x),D.setBindGroup(1,O),D.setBindGroup(2,S),D.setBindGroup(3,sn),D.draw(4),D.end(),C(j),_(j),n.queue.submit([j.finish()]),requestAnimationFrame(Q)};requestAnimationFrame(Q),wn(Tt,()=>requestAnimationFrame(Q),"checked");let pn={x:0,y:0};const bn=j=>{const D=j.x,En=r.height-j.y;pn.x=Math.floor(D),pn.y=Math.floor(En),Vn(n,cn,new Uint32Array([D,En]),0);const gn=n.createCommandEncoder();C(gn),n.queue.submit([gn.finish()])};rt(pe,{onMove:bn,onStart:bn},{});let Z=!1,fn=0;const _n=j=>{const D=n.createCommandEncoder();if(!Z){const gn=Math.floor(j.x/512*U)+pn.x-U/2,Pn=(Math.floor((1-j.y/512)*U)+pn.y-U/2)*512+gn;D.copyBufferToBuffer(B,Rn.float32x4*Pn,R,0,Rn.float32x4),n.queue.submit([D.finish()]),H();return}const En=2*Math.round((j.y-fn)/2);U=Fe(U+En,2,512),Vn(n,X,new Uint32Array([U]),0),o(U.toString()),C(D),n.queue.submit([D.finish()]),fn=j.y};rt(pe+"-debug",{onMove:_n,onStart:j=>{fn=j.y,Z=!0},onEnd:()=>Z=!1},{alwaysMouseMove:!0})},bc=(n,e)=>{const t=an("Progressive rendering, the basics"),r=rn("No description yet"),i=K(pe),a=P(ne(Tt,!1),"Progressive rendering enabled",!1),o=hn();o.append(a);const s=en();s.append(i,o);const c=K(pe+"-debug"),l=en(),d=P(tt("pixel-count-debug"),"Debug canvas dimension"),f=P(tt("pixel-value-debug"),"Pixel value"),h=hn();h.append(d,f),l.append(c,h),n.append(t,r,s,l),e.push(xc)},yc=(n,e)=>{bc(n,e)},wc=(n,e)=>{Xr(n,e),ii(n,e),li(n,e),vi(n,e),Li(n,e),Ai(n,e),Si(n,e)},Ri={path:"rendering",generator:wc,name:"Rendering",description:"",children:[{path:"raycasting-introduction",name:"Introduction to raycasting",description:"A conscise look into the anatomy of a raycasting system.",generator:Xr},{path:"lighting-models",name:"Lighting models",description:"An overview of the basic lighting models implemented in rendering.",generator:ii},{path:"texture-mapping",name:"Adding textures",description:"The process of applying textures to conceptual objects in a rendered scene.",generator:li},{path:"measuring-light",name:"Radiometry and photometry",description:"Understanding the process of measuring light through examples of photometric and radiometric equations.",generator:()=>{}},{path:"meshes",name:"Mesh instantiation",description:"The simplest appraoch of writing mesh data into buffers to loop over in the render process.",generator:vi},{path:"partitioning",name:"Partitioning mesh data",description:"Using the binary space partitioning tree (BSP) to manage large meshes.",generator:ac},{path:"progressive",name:"Progressive rendering",description:"Harnessing the power of progressive rendering to generate smooth render images.",generator:Li},{path:"brdf",name:"Global illumination",description:"Introducing sampling ray paths to the light models in progressive rendering.",generator:Ai},{path:"environmental",name:"Environemntal mapping",description:"Reading light and color data from an environment map, placing rendered objects in a real life scene.",generator:Si},{path:"10-production-rendering",name:"Production rendering",description:"A short discussion of production rendering with example from Blender.",generator:()=>{}},{path:"debugging",name:"An approach to debugging (project)",description:"A project delving into the options available to debug and understand rendering systems via displaying ray paths and reading color or variable values.",generator:yc}]},Lc=async()=>{},Ic=(n,e)=>{const t=an("Using WebGPU for graphics and rendering"),r=rn("No description yet"),i=jt(Je),a=jt(Ri),o=document.createElement("div");o.className="generic-row",o.append(i,a),n.append(t,r,o),e.push(Lc)},Ac=[Je,Ri],Bt={name:"Landing Page",path:"",description:"",generator:Ic,children:[]},Ti=Gi(),Bi=[],{route:Pi,breadcrumbs:Sc}=Ci(Ac);Ti.append(Mi(Pi,Sc));Pi.generator(Ti,Bi);for(const n of Bi)n();
