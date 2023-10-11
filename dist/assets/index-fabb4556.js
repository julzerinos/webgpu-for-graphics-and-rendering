(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))e(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&e(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const T=n=>{const r=document.createElement("p");return r.innerHTML=n,r.className="paragraph",r},V=n=>{const r=document.createElement("h1");return r.innerHTML=n,r.className="title",r},p=(n,r,t=!0)=>{const e=document.createElement("div");e.className="label-group";const i=document.createElement("label");if(i.textContent=r,t&&"value"in n){const o=()=>i.textContent=`${r} [${n.value}]`;n.addEventListener("input",o),o()}return e.append(i,n),e},G=(n,r=512,t=512)=>{const e=document.createElement("canvas");return e.width=r,e.height=t,e.id=n,e},I=(n,r,t,e,i=1)=>{const o=document.createElement("input");return o.id=n,o.type="range",o.className="slider-input",o.min=String(t),o.max=String(e),o.step=String(i),o.value=String(r),o},Fn=(n,r)=>{const t=document.createElement("input");return t.id=n,t.type="color",t.value=r,t},Tt=(n,r)=>{const t=document.createElement("input");return t.id=n,t.type="checkbox",t.checked=r,t.value=String(r),t.addEventListener("input",()=>t.value=String(t.checked)),t},Vt=(n,r)=>{const t=document.createElement("button");return t.id=n,t.textContent=r,t},on=(n,r,t=r[0]??"")=>{const e=document.createElement("select");return e.id=n,e.append(...r.map(i=>{const o=document.createElement("option");return o.text=i,o.value=i,o.selected=i===t,o})),e},j=()=>{const n=document.createElement("div");return n.className="interactables",n},X=()=>{const n=document.createElement("div");return n.className="canvas-section",n},m=(n,r="value")=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate input with id ${n}`);return()=>t[r]},un=(n,r)=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate input with id ${n}`);return t.addEventListener("input",()=>r(t.value)),t.value},Gt=(n,r)=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate button with id ${n}`);t.addEventListener("click",r)},Ft=(n,r)=>{const t=document.getElementById(n);if(!t)throw new Error(`Could not locate canvas with id ${n}`);t.addEventListener("click",e=>{const i=t.getBoundingClientRect(),o=e.clientX-i.left,s=e.clientY-i.top;r({x:o,y:s})})},Dt=(n,r)=>{for(const t of n){const e=document.getElementById(t);if(!e)throw new Error(`Could not locate element with id ${t}`);e.addEventListener("input",r)}},kt=n=>{const r=window.location.pathname.split("/").slice(1);let t,e=n;for(const i of r){const o=e.find(s=>s.name===i);if(!o)throw new Error("Could not find route.");t=o,e=t.children??[]}if(!t)throw new Error("Could not find route.");return t.generator},zt=()=>{const n=document.getElementById("app");if(!n)throw new Error("Could not initialize app.");return n},S=(n=0,r=0)=>[n,r],d=(n=0,r=0,t=0)=>[n,r,t],x=(n=0,r=0,t=0,e=1)=>[n,r,t,e],O=n=>[].concat(...n),U=(n,r)=>{const t=[];for(let e=0;e<Math.min(n.length,r.length);e++)t.push(n[e]+r[e]);return t},kn=(n,r)=>{const t=[];for(let e=0;e<Math.min(n.length,r.length);e++)t.push(n[e]-r[e]);return t},zn=(n,r)=>{const t=[];for(let e=0;e<n.length;e++)t.push(r*n[e]);return t},vn=(n,r)=>{let t=0;for(let e=0;e<Math.min(n.length,r.length);e++)t+=n[e]*r[e];return t},Dn=(n,r)=>[n[1]*r[2]-n[2]*r[1],n[2]*r[0]-n[0]*r[2],n[0]*r[1]-n[1]*r[0]],pn=n=>zn(n,1/Hn(n)),Hn=n=>Math.sqrt(vn(n,n)),E={float32x2:new Float32Array(S()).byteLength,float32x3:new Float32Array(d()).byteLength,float32x4:new Float32Array(x()).byteLength},Ht=(n,r)=>{if(n.length!=r.length)return!1;for(let t=0;t<Math.min(n.length,r.length);t++)if(n[t]!=r[t])return!1;return!0},F=async n=>{navigator.gpu||window.alert("WebGPU is not enabled for this browser.");const t=await navigator.gpu.requestAdapter();if(!t)throw new Error("Could not initialize GPU adapter.");const e=await t.requestDevice(),i=document.getElementById(n);if(!i)throw new Error(`Could not find canvas with id ${n}`);const o=i.getContext("gpupresent")||i.getContext("webgpu");if(!o)throw new Error("Could not generate context for canvas.");const s=navigator.gpu.getPreferredCanvasFormat();return o.configure({device:e,format:s}),{adapter:t,device:e,canvas:i,canvasFormat:s,context:o}},D=(n,r,t={r:0,g:0,b:0,a:1})=>{const e=n.createCommandEncoder(),i=e.beginRenderPass({colorAttachments:[{view:r.getCurrentTexture().createView(),loadOp:"clear",clearValue:t,storeOp:"store"}]});return{pass:i,executePass:()=>{i.end(),n.queue.submit([e.finish()])}}},k=(n,r,t,e,i="triangle-list")=>{const o=n.createShaderModule({code:e});return n.createRenderPipeline({layout:"auto",vertex:{module:o,entryPoint:"main_vs",buffers:r},fragment:{module:o,entryPoint:"main_fs",targets:[{format:t}]},primitive:{topology:i}})},N=(n,r,t,e=0,i=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const o=n.createBuffer({size:r.byteLength,usage:i}),s={arrayStride:E[t],attributes:[{format:t,offset:0,shaderLocation:e}]};return n.queue.writeBuffer(o,0,r),{bufferLayout:s,buffer:o}},Rn=(n,r,t=GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST)=>{const e=n.createBuffer({size:r.byteLength,usage:t});return n.queue.writeBuffer(e,0,r),{buffer:e}},q=(n,r,t,e=0)=>{const i=n.createBuffer({size:t.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),o=n.createBindGroup({layout:r.getBindGroupLayout(e),entries:[{binding:0,resource:{buffer:i}}]});return n.queue.writeBuffer(i,0,t),{bindGroup:o,uniformBuffer:i}},qt=(n,r,t,e=0)=>{const i=n.createBuffer({size:t.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),o=n.createBindGroup({layout:r.getBindGroupLayout(e),entries:[{binding:0,resource:{buffer:i}}]});return n.queue.writeBuffer(i,0,t),{storageBuffer:i,storageGroup:o}},wn=(n,r,t,e,i=0)=>n.createBindGroup({layout:r.getBindGroupLayout(i),entries:[{binding:0,resource:e},{binding:1,resource:t.createView()}]}),Ln=(n,r,t,e,i)=>{const o=n.createTexture({size:[t,e,1],format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING});n.queue.writeTexture({texture:o},r,{offset:0,bytesPerRow:t*4,rowsPerImage:e},[t,e,1]);const s=n.createSampler({addressModeU:"repeat",addressModeV:"repeat",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",...i});return{texture:o,sampler:s}},M=(n,r,t,e,i)=>{if(i){const o=new Float32Array(e),s=new Float32Array(r.size-(e+t.byteLength));t=new Float32Array([...o,...t,...s])}n.queue.writeBuffer(r,e,t)},xn=(n=0,r=0,t=0,e=1)=>({r:n,g:r,b:t,a:e}),yn=n=>d(n.r,n.g,n.b),Y={black:xn(0,0,0,1),white:xn(1,1,1,1),blueScreenBlue:xn(.1,.3,.6,1)},_n=n=>{if(n[0]==="#"&&(n=n.substring(1)),n.length!==6)throw new Error("Can't handle color hexes of size other than 6.");const r=parseInt(n,16),t=(r>>16&255)/255,e=(r>>8&255)/255,i=(r&255)/255;return{r:t,g:e,b:i,a:1}},In=n=>n*Math.PI/180,tn=(n,r,t,e,i)=>(n-r)/(t-r)*(i-e)+e,sn=(n,r)=>{const t=r/2;return[S(n[0]-t,n[1]-t),S(n[0]+t,n[1]-t),S(n[0]-t,n[1]+t),S(n[0]-t,n[1]+t),S(n[0]+t,n[1]-t),S(n[0]+t,n[1]+t)]},$t=(n,r,t=12)=>{const e=[],i=2*Math.PI/t;for(let o=0;o<t;o++)e.push(n,U(n,S(r*Math.cos(o*i),r*Math.sin(o*i))),U(n,S(r*Math.cos((o+1)*i),r*Math.sin((o+1)*i))));return e},Cn=(n,r)=>{const t=r/2,e=[x(...U(n,d(-t,-t,t)),1),x(...U(n,d(-t,t,t)),1),x(...U(n,d(t,t,t)),1),x(...U(n,d(t,-t,t)),1),x(...U(n,d(-t,-t,-t)),1),x(...U(n,d(-t,t,-t)),1),x(...U(n,d(t,t,-t)),1),x(...U(n,d(t,-t,-t)),1)],i=new Uint32Array([0,1,1,2,2,3,3,0,2,3,3,7,7,6,6,2,0,3,3,7,7,4,4,0,1,2,2,6,6,5,5,1,4,5,5,6,6,7,7,4,0,1,1,5,5,4,4,0]),o=new Uint32Array([1,0,3,3,2,1,2,3,7,7,6,2,3,0,4,4,7,3,6,5,1,1,2,6,4,5,6,6,7,4,5,4,0,0,1,5]);return{vertices:e,lineIndices:i,triangleIndices:o}},Sn=async n=>{const r=document.createElement("img");r.src=n,await r.decode();const t=document.createElement("canvas");t.width=r.width,t.height=r.height;const e=t.getContext("2d");if(!e)throw new Error("Could not get canvas context");e.drawImage(r,0,0,t.width,t.height);const i=e.getImageData(0,0,t.width,t.height),o=new Uint8Array(r.width*r.height*4);for(let s=0;s<r.height;++s)for(let a=0;a<r.width;++a)for(let c=0;c<4;++c)o[(s*r.width+a)*4+c]=i.data[((r.height-s-1)*r.width+a)*4+c];return{textureData:o,height:r.height,width:r.width}},Nt=(n,r)=>{const t=1/n,e=t/r;if(r<2)return[S()];const i=[];for(var o=0;o<r;++o)for(var s=0;s<r;++s)i.push(S((Math.random()+s)*e-t*.5,(Math.random()+o)*e-t*.5));return i},bn=(n=0,r=0,t=0,e=0,i=0,o=0,s=0,a=0,c=0,l=0,h=0,u=0,f=0,g=0,y=0,b=0)=>[[n,r,t,e],[i,o,s,a],[c,l,h,u],[f,g,y,b]],an=()=>bn(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),Bn=n=>[].concat(...Ut(n)),qn=n=>[].concat(...n.map(r=>Bn(r))),En=(n,r,t)=>{if(Ht(n,r))return an();let e=pn(kn(r,n));const i=pn(Dn(e,t)),o=pn(Dn(i,e));return e=zn(e,-1),bn(...x(...i,-vn(i,n)),...x(...o,-vn(o,n)),...x(...e,-vn(e,n)),...x())},Mt=(n,r,t,e,i,o)=>{if(n===r)throw"ortho(): left and right are equal";if(t===e)throw"ortho(): bottom and top are equal";if(i===o)throw"ortho(): near and far are equal";const s=r-n,a=e-t,c=o-i,l=an();return l[0][0]=2/s,l[1][1]=2/a,l[2][2]=-2/c,l[0][3]=-(n+r)/s,l[1][3]=-(e+t)/a,l[2][3]=-(i+o)/c,l},$n=(n,r,t,e)=>{const i=1/Math.tan(In(n)/2),o=e-t,s=an();return s[0][0]=i/r,s[1][1]=i,s[2][2]=-(t+e)/o,s[2][3]=-2*t*e/o,s[3][2]=-1,s[3][3]=0,s},gn=(n,r)=>{const t=pn(r),e=t[0],i=t[1],o=t[2],s=Math.cos(In(n)),a=Math.sin(In(n)),c=1-s;return bn(...x(e*e*c+s,e*i*c-o*a,e*o*c+i*a,0),...x(e*i*c+o*a,i*i*c+s,i*o*c-e*a,0),...x(e*o*c-i*a,i*o*c+e*a,o*o*c+s,0),...x())},rn=({[0]:n,[1]:r,[2]:t})=>{const e=an();return e[0][3]=n,e[1][3]=r,e[2][3]=t,e},fn=(n=1,r=1,t=1)=>{var e=an();return e[0][0]=n,e[1][1]=r,e[2][2]=t,e},P=(n,r)=>{const t=[];for(let e=0;e<n.length;e++){t.push([]);for(let i=0;i<r.length;i++){let o=0;for(let s=0;s<n.length;s++)o+=n[e][s]*r[s][i];t[e].push(o)}}return t},Ut=n=>{for(var r=[],t=0;t<n.length;++t){r.push([]);for(var e=0;e<n[t].length;++e)r[t].push(n[e][t])}return r},Tn=bn(1,0,0,0,0,1,0,0,0,0,-.5,.5,0,0,0,1),jt=`@vertex\r
fn main_vs(@location(0) pos : vec2f) -> @builtin(position) vec4f\r
{\r
    return vec4f(pos, 0, 1);\r
}\r
@fragment\r
fn main_fs() -> @location(0) vec4f\r
{\r
    return vec4f(0.0, 0.0, 0.0, 1.0);\r
}\r
`,Xt=async()=>{const{device:n,canvas:r,context:t,canvasFormat:e}=await F("task1"),{pass:i,executePass:o}=D(n,t,{r:.3921,g:.5843,b:.9294,a:1}),s=[].concat(O(sn([0,0],10*(2/r.height))),O(sn([1,0],10*(2/r.height))),O(sn([1,1],10*(2/r.height)))),a=new Float32Array(s),{buffer:c,bufferLayout:l}=N(n,a,"float32x2"),h=k(n,[l],e,jt);i.setPipeline(h),i.setVertexBuffer(0,c),i.draw(s.length/2),o()},Yt=(n,r)=>{const t=V("The three pixeleers"),e=T("This is a test description."),i=G("task1");n.append(t,e,i),r.push(Xt)},Zt=`struct VSOut {\r
    @builtin(position) position : vec4f,\r
    @location(0) color : vec3f,\r
};\r
\r
@vertex\r
fn main_vs(@location(0) inPos : vec2f,\r
@location(1) inColor : vec3f) -> VSOut\r
{\r
    var vsOut : VSOut;\r
    vsOut.position = vec4f(inPos, 0.0, 1.0);\r
    vsOut.color = inColor;\r
    return vsOut;\r
}\r
\r
@fragment\r
fn main_fs(@location(0) inColor : vec3f) -> @location(0) vec4f\r
{\r
    return vec4f(inColor, 1.0);\r
}\r
`,Wt=async()=>{const{device:n,context:r,canvasFormat:t}=await F("task2"),{pass:e,executePass:i}=D(n,r,{r:.3921,g:.5843,b:.9294,a:1}),o=[S(0,0),S(1,0),S(1,1)],s=[d(1,0,0),d(0,1,0),d(0,0,1)],a=new Float32Array(O(o)),c=new Float32Array(O(s)),{buffer:l,bufferLayout:h}=N(n,a,"float32x2"),{buffer:u,bufferLayout:f}=N(n,c,"float32x3",1),g=k(n,[h,f],t,Zt);e.setPipeline(g),e.setVertexBuffer(0,l),e.setVertexBuffer(1,u),e.draw(o.length),i()},Jt=(n,r)=>{const t=V("Triangles all the way down."),e=T("This is a test description."),i=G("task2");n.append(t,e,i),r.push(Wt)},Kt=`struct Time {\r
    time : f32\r
};\r
\r
@group(0) @binding(0) var<uniform> time : Time;\r
\r
fn rotate_vec2(vector : vec2f, theta : f32) -> vec2f\r
{\r
    let x = vector.x * cos(theta) - vector.y * sin(theta);\r
    let y = vector.y * cos(theta) + vector.x * sin(theta);\r
    return vec2f(x, y);\r
}\r
\r
@vertex\r
fn main_vs(@location(0) pos : vec2f) -> @builtin(position) vec4f\r
{\r
    let rotated = rotate_vec2(pos, cos(time.time));\r
    return vec4f(rotated, 0, 1);\r
}\r
@fragment\r
fn main_fs() -> @location(0) vec4f\r
{\r
    return vec4f(0.0, 0.0, 0.0, 1.0);\r
}\r
`,Qt=async()=>{const{device:n,context:r,canvasFormat:t}=await F("task3"),e=sn(S(0,0),1),i=new Float32Array(O(e)),{bufferLayout:o,buffer:s}=N(n,i,"float32x2"),a=k(n,[o],t,Kt),{bindGroup:c,uniformBuffer:l}=q(n,a,new Float32Array(1)),h=u=>{M(n,l,new Float32Array([u/1e3]),0);const{pass:f,executePass:g}=D(n,r,{r:.3921,g:.5843,b:.9294,a:1});f.setPipeline(a),f.setVertexBuffer(0,s),f.setBindGroup(0,c),f.draw(e.length),g(),requestAnimationFrame(h)};requestAnimationFrame(h)},nr=(n,r)=>{const t=V("Spin me right round"),e=T("This is a test description."),i=G("task3");n.append(t,e,i),r.push(Qt)},tr=`struct Time {\r
    time : f32\r
};\r
\r
struct Ball {\r
    height : f32,\r
    speed : f32,\r
    size : f32\r
};\r
\r
@group(0) @binding(0) var<uniform> time : Time;\r
@group(1) @binding(0) var<uniform> ball : Ball;\r
\r
struct VertexOutput {\r
    @builtin(position) Position : vec4 < f32>,\r
    @location(0) fragPosition : vec4 < f32>,\r
}\r
\r
@vertex\r
fn main_vs(@location(0) pos : vec4 < f32>) -> VertexOutput\r
{\r
    var output : VertexOutput;\r
    output.Position = pos;\r
    output.fragPosition = 0.5 * (pos + vec4(1., 1., 1., 1.));\r
    return output;\r
}\r
\r
@fragment\r
fn main_fs(@location(0) fragPosition : vec4 < f32>) -> @location(0) vec4f\r
{\r
    var y = ball.height * abs(sin(time.time * ball.speed));\r
\r
    var circleCenter = vec4(.5, .35 + y, 0., 1.);\r
\r
    var isCircle = -sign(distance(circleCenter, fragPosition) - ball.size / 2.) - sign(distance(circleCenter, fragPosition) - ball.size / 2.);\r
\r
    return vec4(isCircle, 0., 0., 1.);\r
}\r
`,rr=async()=>{const{device:n,context:r,canvasFormat:t}=await F("task4"),e=sn(S(0,0),2),i=new Float32Array(O(e)),o=m("ball-height"),s=m("ball-size"),a=m("ball-speed"),{bufferLayout:c,buffer:l}=N(n,i,"float32x2"),h=k(n,[c],t,tr),{bindGroup:u,uniformBuffer:f}=q(n,h,new Float32Array([0])),{bindGroup:g,uniformBuffer:y}=q(n,h,new Float32Array(3),1),b=A=>{M(n,f,new Float32Array([A/1e3]),0),M(n,y,new Float32Array([o(),a(),s()]),0);const{pass:R,executePass:_}=D(n,r,Y.blueScreenBlue);R.setPipeline(h),R.setVertexBuffer(0,l),R.setBindGroup(0,u),R.setBindGroup(1,g),R.draw(e.length),_(),requestAnimationFrame(b)};requestAnimationFrame(b)},er=(n,r)=>{const t=V("Nokia memories"),e=T("This is a test description."),i=X(),o=G("task4"),s=j(),a=p(I("ball-height",.3,.1,.9,.1),"Ball bounce height"),c=p(I("ball-speed",4,1,16),"Ball bounce speed"),l=p(I("ball-size",1.05,1.01,1.5,.01),"Ball size");s.append(a,c,l),i.append(o,s),n.append(t,e,i),r.push(rr)},Nn=(n,r)=>{Yt(n,r),Jt(n,r),nr(n,r),er(n,r)},ir=`struct VSOut {\r
    @builtin(position) position : vec4f,\r
    @location(0) color : vec3f,\r
};\r
\r
@vertex\r
fn main_vs(@location(0) inPos : vec2f,\r
@location(1) inColor : vec3f) -> VSOut\r
{\r
    var vsOut : VSOut;\r
    vsOut.position = vec4f(inPos, 0.0, 1.0);\r
    vsOut.color = inColor;\r
    return vsOut;\r
}\r
\r
@fragment\r
fn main_fs(@location(0) inColor : vec3f) -> @location(0) vec4f\r
{\r
    return vec4f(inColor, 1.0);\r
}\r
`,Pn="drawing",Mn="drawing-mode",or=["POINT","TRIANGLE","CIRCLE"],Un="points-color",jn="drawing-background-color",Xn="granularity-slider",Yn="size-slider",Zn="clear",sr=async()=>{const{device:n,canvas:r,context:t,canvasFormat:e}=await F(Pn);let i=un(jn,B=>{i=B,H()});const o=m(Un),s=m(Mn),a=m(Xn),c=m(Yn),l=1e3,h=new Float32Array(6*l*E.float32x2),{buffer:u,bufferLayout:f}=N(n,h,"float32x2"),g=new Float32Array(6*l*E.float32x3),{buffer:y,bufferLayout:b}=N(n,g,"float32x3",1),A=k(n,[f,b],e,ir,"triangle-list");Ft(Pn,B=>{switch(s()){case"TRIANGLE":K(B);break;case"CIRCLE":z(B);break;default:case"POINT":$(),w(B);break}H()});let _=0,v=0;const w=({x:B,y:Q})=>{const cn=tn(B,0,r.width,-1,1),en=-1*tn(Q,0,r.height,-1,1),nn=sn(S(cn,en),c()/r.height),ln=new Float32Array(O(nn));n.queue.writeBuffer(u,_,ln),_+=6*E.float32x2;const hn=Array(6).fill(yn(_n(o()))),Gn=new Float32Array(O(hn));n.queue.writeBuffer(y,v,Gn),v+=6*E.float32x3};let L=[],C=[];const $=()=>{L=[],C=[]},K=B=>{if(L.push(B),C.push(o()),C.length<3){w(B);return}const Q=new Float32Array([].concat(...L.map(({x:en,y:nn})=>{const ln=tn(en,0,r.width,-1,1),hn=-1*tn(nn,0,r.height,-1,1);return S(ln,hn)}),O(Array(9).fill(S()))));n.queue.writeBuffer(u,_-2*6*E.float32x2,Q),_+=E.float32x2*(3-2*6);const cn=new Float32Array([].concat(...O(C.map(en=>yn(_n(en)))),O(Array(9).fill(d()))));n.queue.writeBuffer(y,v-2*6*E.float32x3,cn),v+=E.float32x3*(3-2*6),$()},z=B=>{if(L.push(B),C.push(o()),L.length<2){w(B);return}const Q=S(tn(L[0].x,0,r.width,-1,1),-1*tn(L[0].y,0,r.height,-1,1)),cn=S(tn(L[1].x,0,r.width,-1,1),-1*tn(L[1].y,0,r.height,-1,1)),en=Hn(kn(cn,Q)),nn=$t(Q,en,a()),ln=new Float32Array(O(nn));n.queue.writeBuffer(u,_-6*E.float32x2,ln),_+=E.float32x2*(nn.length-6);const hn=new Float32Array(O([...new Array(nn.length)].map((Gn,Ct)=>{const Et=Ct%3===0?0:1;return yn(_n(C[Et]))})));n.queue.writeBuffer(y,v-6*E.float32x3,hn),v+=E.float32x3*(nn.length-6),$()},H=()=>{const{pass:B,executePass:Q}=D(n,t,_n(i));B.setPipeline(A),B.setVertexBuffer(0,u),B.setVertexBuffer(1,y),B.draw(6*l),Q()};Gt(Zn,()=>{n.queue.writeBuffer(u,0,new Float32Array(6*l*E.float32x2)),n.queue.writeBuffer(y,0,new Float32Array(6*l*E.float32x3)),H()}),H()},Wn=(n,r)=>{const t=V("A simple GPU-based drawing program"),e=T("No description yet"),i=X(),o=G(Pn),s=j(),a=on(Mn,or),c=p(Fn(Un,"#000000"),"Draw color"),l=p(Fn(jn,"#ffffff"),"Background color"),h=p(I(Yn,10,2,100),"Point size"),u=p(I(Xn,12,4,32),"Circle granularity"),f=Vt(Zn,"Clear canvas");s.append(a,c,h,u,l,f),i.append(o,s),n.append(t,e,i),r.push(sr)},ar=`struct Uniforms {\r
    mvp : mat4x4f,\r
};\r
\r
@group(0) @binding(0) var<uniform> uniforms : Uniforms;\r
\r
struct VSOut {\r
    @builtin(position) position : vec4f,\r
    @location(0) color : vec3f,\r
};\r
\r
@vertex\r
fn main_vs(@location(0) inPos : vec4f,\r
) -> VSOut\r
{\r
    var vsOut : VSOut;\r
    vsOut.position = uniforms.mvp * inPos;\r
    return vsOut;\r
}\r
\r
@fragment\r
fn main_fs(@location(0) inColor : vec3f) -> @location(0) vec4f\r
{\r
    return vec4f(1., 0., 0., 1.0);\r
}\r
`,Jn="wireframe",Kn="wireframe-rotation-slider",cr=async()=>{const{device:n,context:r,canvasFormat:t}=await F(Jn),e=Cn(d(0),1),i=e.lineIndices,o=new Float32Array(O(e.vertices)),{buffer:s}=Rn(n,i),{buffer:a,bufferLayout:c}=N(n,o,"float32x4"),l=k(n,[c],t,ar,"line-list"),{bindGroup:h,uniformBuffer:u}=q(n,l,new Float32Array(Bn(an())),0),f=rn(d(.5,.5,.5)),g=d(0,0,10),y=d(0),b=d(0,1,0),A=En(g,y,b),R=Mt(-1.5,1.5,-1.5,1.5,0,100),_=P(Tn,R),v=P(_,A),w=C=>{const $=gn(C,d(1,1,1)),K=P($,f),z=P(v,K);M(n,u,new Float32Array(Bn(z)),0);const{pass:H,executePass:Z}=D(n,r,Y.black);H.setPipeline(l),H.setVertexBuffer(0,a),H.setIndexBuffer(s,"uint32"),H.setBindGroup(0,h),H.drawIndexed(i.length),Z()},L=un(Kn,w);w(L)},lr=(n,r)=>{const t=V("Projecting a cube"),e=T("No description yet"),i=X(),o=G(Jn),s=j(),a=p(I(Kn,45,0,360),"Rotation about (1, 1, 1)");s.append(a),i.append(o,s),n.append(t,e,i),r.push(cr)},hr=`struct Uniforms {\r
    mvps : array<mat4x4f, 3>,\r
};\r
\r
@group(0) @binding(0) var<uniform> uniforms : Uniforms;\r
\r
struct VSOut {\r
    @builtin(position) position : vec4f,\r
    @location(0) color : vec4f,\r
};\r
\r
@vertex\r
fn main_vs(@location(0) inPos : vec4f, @location(1) inColor : vec4f, @builtin(instance_index) instance : u32\r
) -> VSOut\r
{\r
    var vsOut : VSOut;\r
    vsOut.position = uniforms.mvps[instance] * inPos;\r
    vsOut.color = inColor;\r
    return vsOut;\r
}\r
\r
@fragment\r
fn main_fs(@location(0) inColor : vec4f) -> @location(0) vec4f\r
{\r
    return inColor;\r
}\r
`,Qn="perspective",fr=async()=>{const{device:n,context:r,canvasFormat:t,canvas:e}=await F(Qn),i=Cn(d(0),1),o=new Float32Array(O(i.vertices)),{buffer:s}=Rn(n,i.lineIndices),{buffer:a,bufferLayout:c}=N(n,o,"float32x4"),{buffer:l,bufferLayout:h}=N(n,new Float32Array(O([x(.5,.5,.5,1),x(0,0,1,1),x(0,1,0,1),x(0,1,1,1),x(1,0,1,1),x(1,0,0,1),x(1,1,0,1),x(1,1,1,1)])),"float32x4",1),u=k(n,[c,h],t,hr,"line-list"),f=d(0,0,5),g=d(0),y=d(0,1,0),b=En(f,g,y),A=$n(45,e.width/e.height,.1,100),R=P(Tn,A),_=P(R,b),v=P(gn(0,d(1,1,1)),rn(d(-2))),w=P(gn(45,d(0,1,0)),rn(d(0))),L=P(rn(d(2)),gn(45,d(1,1,0))),C=P(_,v),$=P(_,w),K=P(_,L),{bindGroup:z}=q(n,u,new Float32Array(qn([C,$,K])),0);(()=>{const{pass:Z,executePass:B}=D(n,r,Y.black);Z.setPipeline(u),Z.setVertexBuffer(0,a),Z.setVertexBuffer(1,l),Z.setIndexBuffer(s,"uint32"),Z.setBindGroup(0,z),Z.drawIndexed(i.lineIndices.length,3),B()})()},ur=(n,r)=>{const t=V("Projecting a cube"),e=T("No description yet"),i=X(),o=G(Qn,1028-128),s=j();i.append(o,s),n.append(t,e,i),r.push(fr)},dr=`struct Uniforms {\r
    mvps : array<mat4x4f, 5>,\r
};\r
\r
@group(0) @binding(0) var<uniform> uniforms : Uniforms;\r
\r
struct VSOut {\r
    @builtin(position) position : vec4f,\r
    @location(0) color : vec4f,\r
};\r
\r
@vertex\r
fn main_vs(@location(0) inPos : vec4f, @builtin(instance_index) instance : u32\r
) -> VSOut\r
{\r
    var vsOut : VSOut;\r
    vsOut.position = uniforms.mvps[instance] * inPos;\r
    return vsOut;\r
}\r
\r
@fragment\r
fn main_fs(@location(0) inColor : vec4f) -> @location(0) vec4f\r
{\r
    return vec4f(1.0, .0, .0, 1.0);\r
}\r
`,nt="airplane",_r=async()=>{const{device:n,context:r,canvasFormat:t,canvas:e}=await F(nt),i=Cn(d(0),1),o=new Float32Array(O(i.vertices)),{buffer:s}=Rn(n,i.lineIndices),{buffer:a,bufferLayout:c}=N(n,o,"float32x4"),l=k(n,[c],t,dr,"line-list"),h=d(5,5,5),u=d(0),f=d(0,1,0),g=En(h,u,f),y=$n(45,e.width/e.height,.1,100),b=P(Tn,y),A=P(b,g),R=fn(.4,.4,2),_=P(fn(.35,.25,.35),rn(d(0,-.2,3.3))),v=P(fn(1.7,.2,1.1),rn(d(.6))),w=P(fn(1.7,.2,1.1),rn(d(-.6))),L=P(fn(.2,.5,.3),rn(d(0,.5,-3.3))),C=[R,_,v,w,L].map(z=>P(A,z)),{bindGroup:$}=q(n,l,new Float32Array(qn(C)),0);(()=>{const{pass:z,executePass:H}=D(n,r,Y.black);z.setPipeline(l),z.setVertexBuffer(0,a),z.setIndexBuffer(s,"uint32"),z.setBindGroup(0,$),z.drawIndexed(i.lineIndices.length,C.length),H()})()},vr=(n,r)=>{const t=V("Projecting a cube"),e=T("No description yet"),i=X(),o=G(nt),s=j();i.append(o,s),n.append(t,e,i),r.push(_r)},tt=(n,r)=>{lr(n,r),ur(n,r),vr(n,r)},pr=(n,r)=>{Nn(n,r),Wn(n,r),tt(n,r)},gr={name:"graphics",generator:pr,children:[{name:"01-webgpu-basics",generator:Nn},{name:"02-drawing-with-shaders",generator:Wn},{name:"03-projection",generator:tt}]},mr=`struct Ray {\r
    origin : vec3f,\r
    direction : vec3f,\r
    tmin : f32,\r
    tmax : f32\r
};\r
\r
struct VSOut {\r
    @builtin(position) position : vec4f,\r
    @location(0) coords : vec2f,\r
};\r
\r
@vertex\r
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut\r
{\r
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));\r
\r
    var vsOut : VSOut;\r
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);\r
    vsOut.coords = pos[VertexIndex];\r
\r
    return vsOut;\r
}\r
\r
fn generate_ray(uv : vec2f) -> Ray\r
{\r
    var ray : Ray;\r
\r
    const up = vec3f(0., 1., 0.);\r
    const target_point = vec3f(0., .5, 0.);\r
    const origin_point = vec3f(2.0, 1.5, 2.0);\r
\r
    var v = normalize(target_point - origin_point);\r
    var b1 = normalize(cross(v, up));\r
    var b2 = cross(b1, v);\r
\r
    var q = b1 * uv.x + b2 * uv.y + v * 1.; //1:camera constant\r
\r
    ray.origin = origin_point;\r
    ray.direction = normalize(q);\r
    ray.tmax = 1000;\r
    ray.tmin = 0;\r
\r
    return ray;\r
}\r
\r
@fragment\r
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f\r
{\r
    let uv = coords * .5;\r
    var r = generate_ray(uv);\r
    return vec4f(r.direction *.5 + .5, 1.0);\r
}\r
`,rt="raycast-anatomy",br=async()=>{const{device:n,context:r,canvasFormat:t}=await F(rt),e=k(n,[],t,mr,"triangle-strip"),{pass:i,executePass:o}=D(n,r,Y.black);i.setPipeline(e),i.draw(4),o()},xr=(n,r)=>{const t=V("The anatomy of a ray cast"),e=T("No description yet"),i=G(rt);n.append(t,e,i),r.push(br)},yr=`struct ViewboxOptions {\r
    camera_constant : f32,\r
    aspect_ratio : f32\r
};\r
\r
struct LightSettings {\r
    light_position : vec3f,\r
    light_intensity : f32,\r
    shade_all : f32,\r
    refractive_index : f32\r
};\r
\r
@group(0) @binding(0) var<uniform> viewbox : ViewboxOptions;\r
@group(1) @binding(0) var<uniform> light_settings : LightSettings;\r
\r
struct Light {\r
    L_i : vec3f,\r
    w_i : vec3f,\r
    dist : f32\r
}\r
\r
struct Ray {\r
    origin : vec3f,\r
    direction : vec3f,\r
    tmin : f32,\r
    tmax : f32\r
};\r
\r
struct HitInfo {\r
    has_hit : bool,\r
    dist : f32,\r
    position : vec3f,\r
    normal : vec3f,\r
    color : vec3f,\r
    shade : bool\r
};\r
\r
struct VSOut {\r
    @builtin(position) position : vec4f,\r
    @location(0) coords : vec2f,\r
};\r
\r
@vertex\r
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut\r
{\r
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));\r
\r
    var vsOut : VSOut;\r
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);\r
    vsOut.coords = pos[VertexIndex];\r
\r
    return vsOut;\r
}\r
\r
fn generate_ray(uv : vec2f) -> Ray\r
{\r
    var ray : Ray;\r
\r
    const up = vec3f(0., 1., 0.);\r
    const target_point = vec3f(0., .5, 0.);\r
    const origin_point = vec3f(2., 1.5, 2.);\r
\r
    var v = normalize(target_point - origin_point);\r
    var b1 = normalize(cross(v, up));\r
    var b2 = cross(b1, v);\r
\r
    var q = b1 * uv.x + b2 * uv.y + v * viewbox.camera_constant;\r
\r
    ray.origin = origin_point;\r
    ray.direction = normalize(q);\r
    ray.tmax = 100;\r
    ray.tmin = 0;\r
\r
    return ray;\r
}\r
\r
fn intersect_plane(r : Ray, hit : ptr < function, HitInfo>, position : vec3f, normal : vec3f) -> bool {\r
    var intersection = dot(position - r.origin, normal) / dot(r.direction, normal);\r
\r
    var has_hit = intersection > r.tmin && intersection < r.tmax;\r
\r
    (*hit).has_hit = (*hit).has_hit || has_hit;\r
    (*hit).dist = select((*hit).dist, intersection, has_hit);\r
    (*hit).color = select((*hit).color, vec3f(.1, .7, 0.), has_hit);\r
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);\r
    (*hit).normal = select((*hit).normal, normal, has_hit);\r
    (*hit).shade = select((*hit).shade, true, has_hit);\r
\r
    return has_hit;\r
}\r
fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, v : array<vec3f, 3>) -> bool {\r
    var e0 = v[1] - v[0];\r
    var e1 = v[2] - v[0];\r
    var n = cross(e0, e1);\r
\r
    var denom = dot(r.direction, n);\r
    var from_origin = v[0] - r.origin;\r
\r
    var intersection = dot(from_origin, n) / denom;\r
\r
    var beta = dot(cross(from_origin, r.direction), e1) / denom;\r
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;\r
\r
    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;\r
\r
    (*hit).has_hit = (*hit).has_hit || has_hit;\r
    (*hit).dist = select((*hit).dist, intersection, has_hit);\r
    (*hit).color = select((*hit).color, vec3f(.4, .3, .2), has_hit);\r
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);\r
    (*hit).normal = select((*hit).normal, normalize(n), has_hit);\r
    (*hit).shade = select((*hit).shade, true, has_hit);\r
\r
    return has_hit;\r
}\r
fn intersect_sphere(r : Ray, hit : ptr < function, HitInfo>, center : vec3f, radius : f32, sphere_color : vec3f) -> bool {\r
    const a = 1;\r
    var b_half = dot(r.origin - center, r.direction);\r
    var c = dot(r.origin - center, r.origin - center) - radius * radius;\r
    var b_half_2 = b_half * b_half;\r
    var b_half_2_c = b_half_2 - c;\r
\r
    var does_intersection_exist = b_half_2_c >= 0;\r
    var distance = min(-b_half - sqrt(abs(b_half_2_c)), -b_half + sqrt(abs(b_half_2_c)));\r
\r
    var intersection = r.origin + distance * r.direction;\r
    var n = normalize(intersection - center);\r
\r
    var has_hit = does_intersection_exist && distance > r.tmin && distance < r.tmax;\r
    (*hit).has_hit = (*hit).has_hit || has_hit;\r
    (*hit).dist = select((*hit).dist, distance, has_hit);\r
    (*hit).color = select((*hit).color, sphere_color, has_hit);\r
    (*hit).position = select((*hit).position, intersection, has_hit);\r
    (*hit).normal = select((*hit).normal, n, has_hit);\r
    (*hit).shade = select((*hit).shade, true, has_hit);\r
\r
    return has_hit;\r
}\r
fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool\r
{\r
    var has_hit_plane = intersect_plane(*r, hit, vec3f(0., 0., 0.), vec3f(0., 1., 0.));\r
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_plane);\r
\r
    var has_hit_sphere = intersect_sphere(*r, hit, vec3f(.0, .5, .0), .3, vec3f());\r
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_sphere);\r
\r
    const triangle = array<vec3f, 3 > (vec3f(-.2, .1, .9), vec3f(.2, .1, .9), vec3f(-.2, .1, -.1));\r
    var has_hit_triangle = intersect_triangle(*r, hit, triangle);\r
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_triangle);\r
\r
    var has_hit_lightbulb = intersect_sphere(*r, hit, light_settings.light_position, .03, vec3f(1., .95, 0.) * light_settings.light_intensity);\r
    (*hit).shade = select((*hit).shade, false, has_hit_lightbulb);\r
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_lightbulb);\r
\r
    return (*hit).has_hit;\r
}\r
\r
fn sample_point_light(pos : vec3f) -> Light {\r
    var direction = light_settings.light_position - pos;\r
    var dist = length(direction);\r
    var incident_light = light_settings.light_intensity / (dist * dist);\r
\r
    var light : Light;\r
    light.L_i = vec3f(incident_light);\r
    light.w_i = direction;\r
    light.dist = dist;\r
\r
    return light;\r
}\r
\r
fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f\r
{\r
    var L_emitted = vec3f(0);\r
    var L_ambient = vec3f(.1);\r
\r
    var light_info = sample_point_light((*hit).position);\r
    var transformed_light = light_settings.refractive_index / 3.14 * light_info.L_i * dot((*hit).normal, light_info.w_i);\r
\r
    var L_observed = L_emitted + transformed_light + L_ambient;\r
\r
    return L_observed * (*hit).color;\r
}\r
\r
fn shade(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f\r
{\r
    return select((*hit).color, lambertian(r, hit), (*hit).shade && light_settings.shade_all > 0);\r
}\r
\r
@fragment\r
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f\r
{\r
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);\r
    const max_depth = 10;\r
\r
    let uv = vec2f(coords.x * viewbox.aspect_ratio, coords.y) *.5;\r
    var r = generate_ray(uv);\r
\r
    var result = vec3f(0.0);\r
    var hit = HitInfo(false, 0.0, vec3f(0.0), vec3f(0.0), vec3f(0.0), false);\r
\r
    for (var i = 0; i< max_depth; i++)\r
    {\r
        if (!intersect_scene(&r, &hit))\r
        {\r
            result += backgroundColor.rgb;\r
            break;\r
        }\r
\r
        result += shade(&r, &hit);\r
\r
        if (hit.has_hit)\r
        {\r
            break;\r
        };\r
    }\r
\r
    return vec4f(pow(result, vec3f(1.0 / 1.25)), 1.0);\r
}\r
`,et="light",it="zoom",ot="light-intensity-slider",st="light-position-x-input",at="light-position-y-input",ct="light-position-z-input",lt="shade-all-visible-objects",ht="refractive-index-slider",wr=async()=>{const{device:n,context:r,canvas:t,canvasFormat:e}=await F(et),i=m(it),o=m(ot),s=m(ht),a=m(st),c=m(at),l=m(ct),h=m(lt,"checked"),u=t.width/t.height,f=k(n,[],e,yr,"triangle-strip"),{bindGroup:g,uniformBuffer:y}=q(n,f,new Float32Array([i(),u])),b=new Float32Array([a(),c(),l(),o(),h()?1:0,s(),0,0]),{bindGroup:A,uniformBuffer:R}=q(n,f,b,1),_=()=>{M(n,y,new Float32Array([i(),u]),0),M(n,R,new Float32Array([a(),c(),l(),o(),h()?1:0,s(),0,0]),0);const{pass:v,executePass:w}=D(n,r,Y.black);v.setPipeline(f),v.setBindGroup(0,g),v.setBindGroup(1,A),v.draw(4),w(),requestAnimationFrame(_)};requestAnimationFrame(_)},Lr=(n,r)=>{const t=V("A simple lighting system"),e=T("No description yet"),i=X(),o=G(et,512+128,512-64),s=j(),a=p(I(it,1,.1,10,.1),"Zoom (camera constant)"),c=p(I(ot,3.14,0,10,.01),"Light intensity"),l=p(I(ht,1,-1,10,.1),"Diffuse reflectance"),h=p(I(st,0,-5,5,.1),"Light X position"),u=p(I(at,1,0,5,.1),"Light Y position"),f=p(I(ct,0,-5,5,.1),"Light Z position"),g=p(Tt(lt,!0),"Shading on",!1);s.append(a,c,l,h,u,f,g),i.append(o,s),n.append(t,e,i),r.push(wr)},ft=(n,r)=>{xr(n,r),Lr(n,r)},Ir=`struct ViewboxOptions {\r
    aspect_ratio : f32\r
};\r
\r
struct LightSettings {\r
    light_position : vec3f,\r
};\r
\r
@group(0) @binding(0) var<uniform> viewbox : ViewboxOptions;\r
@group(1) @binding(0) var<uniform> light_settings : LightSettings;\r
\r
struct Light {\r
    L_i : vec3f,\r
    w_i : vec3f,\r
    dist : f32\r
}\r
\r
struct Ray {\r
    origin : vec3f,\r
    direction : vec3f,\r
    tmin : f32,\r
    tmax : f32\r
};\r
\r
struct HitInfo {\r
    has_hit : bool,\r
    dist : f32,\r
    position : vec3f,\r
    normal : vec3f,\r
    color : vec3f,\r
    shade : u32\r
};\r
\r
struct VSOut {\r
    @builtin(position) position : vec4f,\r
    @location(0) coords : vec2f,\r
};\r
\r
@vertex\r
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut\r
{\r
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));\r
\r
    var vsOut : VSOut;\r
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);\r
    vsOut.coords = pos[VertexIndex];\r
\r
    return vsOut;\r
}\r
\r
//Constructing rays //\r
\r
fn generate_ray_from_camera(uv : vec2f) -> Ray\r
{\r
    const up = vec3f(0., 1., 0.);\r
    const target_point = vec3f(0., .5, 0.);\r
    const origin_point = vec3f(2., 1.5, 2.);\r
    const camera_constant = 1;\r
\r
    var v = normalize(target_point - origin_point);\r
    var b1 = normalize(cross(v, up));\r
    var b2 = cross(b1, v);\r
\r
    var q = b1 * uv.x + b2 * uv.y + v * 1;\r
\r
    return construct_ray_100units(origin_point, normalize(q));\r
}\r
\r
fn construct_ray_100units(origin : vec3f, direction : vec3f) -> Ray\r
{\r
    return construct_ray(origin, direction, 0, 100);\r
}\r
\r
fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray\r
{\r
    var ray : Ray;\r
    ray.origin = origin;\r
    ray.direction = direction;\r
    ray.tmax = tmax;\r
    ray.tmin = tmin;\r
    return ray;\r
}\r
\r
//Intersecting objects //\r
\r
fn intersect_plane(r : Ray, hit : ptr < function, HitInfo>, position : vec3f, normal : vec3f) -> bool {\r
    var intersection = dot(position - r.origin, normal) / dot(r.direction, normal);\r
\r
    var has_hit = intersection > r.tmin && intersection < r.tmax;\r
\r
    (*hit).has_hit = (*hit).has_hit || has_hit;\r
    (*hit).dist = select((*hit).dist, intersection, has_hit);\r
    (*hit).color = select((*hit).color, vec3f(.1, .7, 0.), has_hit);\r
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);\r
    (*hit).normal = select((*hit).normal, normal, has_hit);\r
    (*hit).shade = select((*hit).shade, 1, has_hit);\r
\r
    return has_hit;\r
}\r
\r
fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, v : array<vec3f, 3>) -> bool {\r
    var e0 = v[1] - v[0];\r
    var e1 = v[2] - v[0];\r
    var n = cross(e0, e1);\r
\r
    var denom = dot(r.direction, n);\r
    var from_origin = v[0] - r.origin;\r
\r
    var intersection = dot(from_origin, n) / denom;\r
\r
    var beta = dot(cross(from_origin, r.direction), e1) / denom;\r
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;\r
\r
    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;\r
\r
    (*hit).has_hit = (*hit).has_hit || has_hit;\r
    (*hit).dist = select((*hit).dist, intersection, has_hit);\r
    (*hit).color = select((*hit).color, vec3f(.4, .3, .2), has_hit);\r
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);\r
    (*hit).normal = select((*hit).normal, normalize(n), has_hit);\r
    (*hit).shade = select((*hit).shade, 1, has_hit);\r
\r
    return has_hit;\r
}\r
\r
fn intersect_sphere(r : Ray, hit : ptr < function, HitInfo>, center : vec3f, radius : f32, sphere_color : vec3f) -> bool {\r
    const a = 1;\r
    var b_half = dot(r.origin - center, r.direction);\r
    var c = dot(r.origin - center, r.origin - center) - radius * radius;\r
    var b_half_2 = b_half * b_half;\r
    var b_half_2_c = b_half_2 - c;\r
\r
    var does_intersection_exist = b_half_2_c >= 0;\r
    var distance = min(-b_half - sqrt(abs(b_half_2_c)), -b_half + sqrt(abs(b_half_2_c)));\r
\r
    var intersection = r.origin + distance * r.direction;\r
    var n = normalize(intersection - center);\r
\r
    var has_hit = does_intersection_exist && distance > r.tmin && distance < r.tmax;\r
    (*hit).has_hit = (*hit).has_hit || has_hit;\r
    (*hit).dist = select((*hit).dist, distance, has_hit);\r
    (*hit).color = select((*hit).color, sphere_color, has_hit);\r
    (*hit).position = select((*hit).position, intersection, has_hit);\r
    (*hit).normal = select((*hit).normal, n, has_hit);\r
    (*hit).shade = select((*hit).shade, 2, has_hit);\r
\r
    return has_hit;\r
}\r
\r
fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool\r
{\r
    var has_hit_plane = intersect_plane(*r, hit, vec3f(0., 0., 0.), vec3f(0., 1., 0.));\r
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_plane);\r
\r
    var has_hit_sphere = intersect_sphere(*r, hit, vec3f(.0, .5, .0), .3, vec3f());\r
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_sphere);\r
\r
    const triangle = array<vec3f, 3 > (vec3f(-.2, .1, .9), vec3f(.2, .1, .9), vec3f(-.2, .1, -.1));\r
    var has_hit_triangle = intersect_triangle(*r, hit, triangle);\r
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_triangle);\r
\r
    var has_hit_lightbulb = intersect_sphere(*r, hit, light_settings.light_position + vec3f(0, .035, 0), .03, vec3f(1., .95, 0.));\r
    (*hit).shade = select((*hit).shade, 0, has_hit_lightbulb);\r
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_lightbulb);\r
\r
    return (*hit).has_hit;\r
}\r
\r
//Lighting //\r
\r
fn sample_point_light(pos : vec3f) -> Light {\r
    const light_intensity = 3.14;\r
\r
    var direction = light_settings.light_position - pos;\r
    var dist = length(direction);\r
    var incident_light = light_intensity / (dist * dist);\r
\r
    var light : Light;\r
    light.L_i = vec3f(incident_light);\r
    light.w_i = direction;\r
    light.dist = dist;\r
\r
    return light;\r
}\r
\r
fn check_occulusion(position : vec3f, light : vec3f) -> bool\r
{\r
    const surface_offset = .0001;\r
\r
    var line = light - position;\r
    var direction = normalize(line);\r
    var distance = length(line) - surface_offset;\r
\r
    var r = construct_ray(position + direction * surface_offset, direction, 0, distance);\r
    var hit = HitInfo(false, 0.0, vec3f(0.0), vec3f(0.0), vec3f(0.0), 0);\r
\r
    return intersect_scene(&r, &hit);\r
}\r
\r
fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f\r
{\r
    const refractive_index = 1.5;\r
\r
    var light_info = sample_point_light((*hit).position);\r
    var transformed_light = refractive_index / 3.14 * light_info.L_i * dot((*hit).normal, light_info.w_i);\r
\r
    var is_occluded = check_occulusion((*hit).position, light_settings.light_position);\r
    var occlusion_modifier = select(1., 0., is_occluded);\r
\r
    var L_ambient = .1 * (*hit).color;\r
    var L_reflected = .9 * transformed_light * (*hit).color * occlusion_modifier;\r
    var L_observed = L_ambient + L_reflected;\r
\r
    return L_observed;\r
}\r
\r
fn shade(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f\r
{\r
    switch ((*hit).shade)\r
    {\r
        default :\r
        {\r
        }\r
        case 1 :\r
        {\r
            return lambertian(r, hit);\r
        }\r
    }\r
\r
    return (*hit).color;\r
}\r
\r
//Fragment shader //\r
\r
@fragment\r
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f\r
{\r
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);\r
    const max_depth = 10;\r
\r
    let uv = vec2f(coords.x * viewbox.aspect_ratio, coords.y) *.5;\r
    var r = generate_ray_from_camera(uv);\r
\r
    var result = vec3f(0.0);\r
    var hit = HitInfo(false, 0.0, vec3f(0.0), vec3f(0.0), vec3f(0.0), 0);\r
\r
    for (var i = 0; i< max_depth; i++)\r
    {\r
        if (!intersect_scene(&r, &hit))\r
        {\r
            result += backgroundColor.rgb;\r
            break;\r
        }\r
\r
        result += shade(&r, &hit);\r
\r
        if (hit.has_hit)\r
        {\r
            break;\r
        };\r
    }\r
\r
    return vec4f(pow(result, vec3f(1.0 / 1.25)), 1.0);\r
}\r
`,dn="lighting",ut=dn+"-light-position-x-input",dt=dn+"-light-position-y-input",_t=dn+"-light-position-z-input",Sr=async()=>{const{device:n,context:r,canvas:t,canvasFormat:e}=await F(dn),i=m(ut),o=m(dt),s=m(_t),a=t.width/t.height,c=k(n,[],e,Ir,"triangle-strip"),l=new Float32Array([a]),{bindGroup:h}=q(n,c,l),u=new Float32Array([i(),o(),s(),0,0,0,0,0,0]),{bindGroup:f,uniformBuffer:g}=q(n,c,u,1),y=()=>{M(n,g,new Float32Array([i(),o(),s(),0,0,0,0,0,0]),0);const{pass:b,executePass:A}=D(n,r,Y.black);b.setPipeline(c),b.setBindGroup(0,h),b.setBindGroup(1,f),b.draw(4),A(),requestAnimationFrame(y)};requestAnimationFrame(y)},Br=(n,r)=>{const t=V("A simple lighting system"),e=T("No description yet"),i=X(),o=G(dn,512+128,512-64),s=j(),a=p(I(ut,0,-5,5,.1),"Light X position"),c=p(I(dt,1,0,5,.1),"Light Y position"),l=p(I(_t,0,-5,5,.1),"Light Z position");s.append(a,c,l),i.append(o,s),n.append(t,e,i),r.push(Sr)},Pr=`struct Environment {
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
`,J="mirrors",W={"Base color":0,Lambertian:1,Mirror:2,Refractive:3,Phong:4,Glossy:5},vt=J+"-sphere-shader",pt=J+"-triangle-shader",gt=J+"-plane-shader",mt=J+"-light-position-x-input",bt=J+"-light-position-y-input",xt=J+"-light-position-z-input",yt=J+"-animation-slider",Or=async()=>{const{device:n,context:r,canvas:t,canvasFormat:e}=await F(J),i=m(mt),o=m(bt),s=m(xt),a=m(vt),c=m(pt),l=m(gt),h=m(yt),u=t.width/t.height,f=k(n,[],e,Pr,"triangle-strip"),g=new Float32Array([u,0]),{bindGroup:y,uniformBuffer:b}=q(n,f,g),A=new Float32Array([i(),o(),s(),W[a()],W[c()],W[l()],0,0,0]),{bindGroup:R,uniformBuffer:_}=q(n,f,A,1),v=w=>{M(n,b,new Float32Array([u,w*h()/512]),0),M(n,_,new Float32Array([i(),o(),s(),W[a()],W[c()],W[l()],0,0,0]),0);const{pass:L,executePass:C}=D(n,r,Y.black);L.setPipeline(f),L.setBindGroup(0,y),L.setBindGroup(1,R),L.draw(4),C(),requestAnimationFrame(v)};requestAnimationFrame(v)},Ar=(n,r)=>{const t=V("Mirrors"),e=T("No description yet"),i=X(),o=G(J,512+128,512-64),s=j(),a=p(on(vt,Object.keys(W),"Refractive"),"Sphere shader type",!1),c=p(on(pt,Object.keys(W),"Lambertian"),"Triangle shader type",!1),l=p(on(gt,Object.keys(W),"Lambertian"),"Plane shader type",!1),h=p(I(mt,0,-5,5,.1),"Light X position"),u=p(I(bt,1,0,5,.1),"Light Y position"),f=p(I(xt,0,-5,5,.1),"Light Z position"),g=p(I(yt,0,0,1,.1),"Orbit animation speed");s.append(a,c,l,h,u,f,g),i.append(o,s),n.append(t,e,i),r.push(Or)},wt=(n,r)=>{Br(n,r),Ar(n,r)},Rr=`@group(0) @binding(0) var texture_sampler : sampler;\r
@group(0) @binding(1) var grass_texture : texture_2d<f32>;\r
\r
struct VSOut {\r
    @builtin(position) position : vec4f,\r
    @location(0) coords : vec2f,\r
};\r
\r
@vertex\r
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut\r
{\r
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));\r
\r
    var vsOut : VSOut;\r
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);\r
    vsOut.coords = pos[VertexIndex];\r
\r
    return vsOut;\r
}\r
\r
@fragment\r
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f\r
{\r
    let uv = vec2f(coords.x, coords.y) *.5;\r
\r
    return textureSample(grass_texture, texture_sampler, uv);\r
}\r
`,Lt="/assets/grass_minecraft-9d219e0b.png",It="texture",St="texture-repeat-style",Cr=["clamp-to-edge","repeat","mirror-repeat"],Er=async()=>{const{device:n,context:r,canvasFormat:t}=await F(It),e=async i=>{const o=k(n,[],t,Rr,"triangle-strip"),{textureData:s,height:a,width:c}=await Sn(Lt),{texture:l,sampler:h}=Ln(n,s,c,a,{addressModeU:i,addressModeV:i}),u=wn(n,o,l,h),{pass:f,executePass:g}=D(n,r,Y.black);f.setPipeline(o),f.setBindGroup(0,u),f.draw(4),g()};e(un(St,e))},Tr=(n,r)=>{const t=V("What is a texture"),e=T("No description yet"),i=X(),o=G(It),s=j(),a=p(on(St,Cr,"repeat"),"Texture edge behavior",!1);s.append(a),i.append(o,s),n.append(t,e,i),r.push(Er)},Vr=`@group(0) @binding(0) var texture_sampler : sampler;\r
@group(0) @binding(1) var grass_texture : texture_2d<f32>;\r
\r
@group(2) @binding(0) var<storage> jitters : array<vec2f>;\r
\r
const light_position : vec3f = vec3f(0, 1, 0);\r
const sphere_refractive_index = 1.5;\r
const air_refractive_index = 1.;\r
\r
struct Globals {\r
    texture_scale : f32,\r
    subdivisions_sqr : f32\r
}\r
\r
@group(1) @binding(0) var<uniform> globals : Globals;\r
\r
struct Plane {\r
    tangent : vec3f,\r
    binormal : vec3f,\r
    normal : vec3f\r
};\r
\r
struct Light {\r
    L_i : vec3f,\r
    w_i : vec3f,\r
    dist : f32\r
};\r
\r
struct LightResult {\r
    multiplicative : vec3f,\r
    additive : vec3f\r
}\r
\r
struct Ray {\r
    origin : vec3f,\r
    direction : vec3f,\r
    tmin : f32,\r
    tmax : f32\r
};\r
\r
struct HitInfo {\r
    depth : i32,\r
    has_hit : bool,\r
    continue_trace : bool,\r
\r
    dist : f32,\r
    position : vec3f,\r
    normal : vec3f,\r
    color : vec3f,\r
\r
    shader : u32,\r
\r
    prev_refractive : f32,\r
    next_refractive : f32,\r
\r
    diffuse : f32,\r
    specular : f32,\r
    shininess : f32,\r
\r
    texture : bool,\r
    uv : vec2f\r
};\r
\r
struct VSOut {\r
    @builtin(position) position : vec4f,\r
    @location(0) coords : vec2f,\r
};\r
\r
@vertex\r
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut\r
{\r
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));\r
\r
    var vsOut : VSOut;\r
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);\r
    vsOut.coords = pos[VertexIndex];\r
\r
    return vsOut;\r
}\r
\r
//Constructing rays //\r
\r
fn generate_default_hitinfo() -> HitInfo\r
{\r
    return HitInfo(0, false, false, 0., vec3f(0.), vec3f(0.), vec3f(0.), 0, 1., 1., 0., 0., 0., false, vec2f(0, 0));\r
}\r
\r
fn generate_ray_from_camera(uv : vec2f) -> Ray\r
{\r
    const up = vec3f(0., 1., 0.);\r
    const target_point = vec3f(0., .5, 0.);\r
    const origin_point = vec3f(2., 1.5, 2.);\r
    const camera_constant = 1;\r
\r
    var v = normalize(target_point - origin_point);\r
    var b1 = normalize(cross(v, up));\r
    var b2 = cross(b1, v);\r
\r
    var q = b1 * uv.x + b2 * uv.y + v * 1;\r
\r
    return construct_ray_100units(origin_point, normalize(q));\r
}\r
\r
fn construct_ray_100units(origin : vec3f, direction : vec3f) -> Ray\r
{\r
    return construct_ray(origin, direction, .001, 100);\r
}\r
\r
fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray\r
{\r
    var ray : Ray;\r
    ray.origin = origin;\r
    ray.direction = direction;\r
    ray.tmax = tmax;\r
    ray.tmin = tmin;\r
    return ray;\r
}\r
\r
\r
//Intersecting objects //\r
\r
fn intersect_plane(r : Ray, hit : ptr < function, HitInfo>, position : vec3f, plane : Plane) -> bool {\r
    var distance = dot(position - r.origin, plane.normal) / dot(r.direction, plane.normal);\r
    var intersection = r.origin + distance * r.direction;\r
\r
    var has_hit = distance > r.tmin && distance < r.tmax;\r
\r
    var u = dot((intersection - position), plane.tangent);\r
    var v = dot((intersection - position), plane.binormal);\r
\r
    (*hit).has_hit = (*hit).has_hit || has_hit;\r
    (*hit).dist = select((*hit).dist, distance, has_hit);\r
    (*hit).color = select((*hit).color, vec3f(0, 1, 0), has_hit);\r
    (*hit).position = select((*hit).position, intersection, has_hit);\r
    (*hit).normal = select((*hit).normal, plane.normal, has_hit);\r
\r
    (*hit).shader = select((*hit).shader, 1, has_hit);\r
    (*hit).diffuse = select((*hit).diffuse, 1., has_hit);\r
    //(*hit).prev_refractive = select((*hit).prev_refractive, 1., has_hit);\r
    //(*hit).next_refractive = select((*hit).next_refractive, 1., has_hit);\r
    (*hit).specular = select((*hit).specular, .2, has_hit);\r
    (*hit).shininess = select((*hit).shininess, 60., has_hit);\r
\r
    (*hit).texture = select((*hit).texture, true, has_hit);\r
    (*hit).uv = select((*hit).uv, vec2f(u, v), has_hit);\r
\r
    return has_hit;\r
}\r
\r
fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, v : array<vec3f, 3>) -> bool {\r
    var e0 = v[1] - v[0];\r
    var e1 = v[2] - v[0];\r
    var n = cross(e0, e1);\r
\r
    var denom = dot(r.direction, n);\r
    var from_origin = v[0] - r.origin;\r
\r
    var intersection = dot(from_origin, n) / denom;\r
\r
    var beta = dot(cross(from_origin, r.direction), e1) / denom;\r
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;\r
\r
    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;\r
\r
    (*hit).has_hit = (*hit).has_hit || has_hit;\r
    (*hit).dist = select((*hit).dist, intersection, has_hit);\r
    (*hit).color = select((*hit).color, vec3f(.4, .3, .2), has_hit);\r
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);\r
    (*hit).normal = select((*hit).normal, normalize(n), has_hit);\r
\r
    (*hit).shader = select((*hit).shader, 1, has_hit);\r
    (*hit).diffuse = select((*hit).diffuse, .8, has_hit);\r
    //(*hit).prev_refractive = select((*hit).prev_refractive, 1., has_hit);\r
    //(*hit).next_refractive = select((*hit).next_refractive, 1., has_hit);\r
    (*hit).specular = select((*hit).specular, .2, has_hit); ;\r
    (*hit).shininess = select((*hit).shininess, 60., has_hit); ;\r
\r
    (*hit).texture = select((*hit).texture, false, has_hit);\r
\r
    return has_hit;\r
}\r
\r
fn intersect_sphere(r : Ray, hit : ptr < function, HitInfo>, center : vec3f, radius : f32, sphere_color : vec3f) -> bool {\r
\r
    var from_center = r.origin - center;\r
    var b_half = dot(from_center, r.direction);\r
    var c = dot(from_center, from_center) - radius * radius;\r
    var b_half_2_c = b_half * b_half - c;\r
\r
    var does_intersection_exist = b_half_2_c >= 0;\r
\r
    var distance_1 = -b_half - sqrt(abs(b_half_2_c));\r
    var distance_2 = -b_half + sqrt(abs(b_half_2_c));\r
    var distance_1_in_range = distance_1 >= r.tmin && distance_1 <= r.tmax;\r
    var distance_2_in_range = distance_2 >= r.tmin && distance_2 <= r.tmax;\r
\r
    var min_distance = min(distance_1, distance_2);\r
    var distance = select(distance_2, select(distance_1, min_distance, distance_2_in_range), distance_1_in_range);\r
\r
    var intersection = r.origin + distance * r.direction;\r
    var n = normalize(intersection - center);\r
\r
    var is_intersection_from_inside = dot(n, r.direction) > 0;\r
    var next_refr_index = select(sphere_refractive_index, air_refractive_index, is_intersection_from_inside);\r
    var context_n = select(n, -n, is_intersection_from_inside);\r
\r
    var has_hit = does_intersection_exist && distance >= r.tmin && distance <= r.tmax;\r
    (*hit).has_hit = (*hit).has_hit || has_hit;\r
    (*hit).dist = select((*hit).dist, distance, has_hit);\r
    (*hit).color = select((*hit).color, sphere_color, has_hit);\r
    (*hit).position = select((*hit).position, intersection, has_hit);\r
    (*hit).normal = select((*hit).normal, context_n, has_hit);\r
\r
    (*hit).shader = select((*hit).shader, 5, has_hit);\r
    (*hit).diffuse = select((*hit).diffuse, .9, has_hit);\r
    (*hit).prev_refractive = select((*hit).prev_refractive, (*hit).next_refractive, has_hit);\r
    (*hit).next_refractive = select((*hit).next_refractive, next_refr_index, has_hit);\r
    (*hit).specular = select((*hit).specular, .1, has_hit);\r
    (*hit).shininess = select((*hit).shininess, 42., has_hit);\r
\r
    (*hit).texture = select((*hit).texture, false, has_hit);\r
\r
    return has_hit;\r
}\r
\r
fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool\r
{\r
    (*hit).has_hit = false;\r
\r
    const plane = Plane(vec3f(-1.0, 0.0, 0.0), vec3f(0.0, 0.0, 1.0), vec3f(0.0, 1.0, 0.0));\r
    var has_hit_plane = intersect_plane(*r, hit, vec3f(0., 0., 0.), plane);\r
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_plane);\r
\r
    var sphere_center = vec3f(0, .5, 0);\r
    var has_hit_sphere = intersect_sphere(*r, hit, sphere_center, .3, vec3f(0., 0., 0.));\r
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_sphere);\r
\r
    const triangle = array<vec3f, 3 > (vec3f(-.2, .1, .9), vec3f(.2, .1, .9), vec3f(-.2, .1, -.1));\r
    var has_hit_triangle = intersect_triangle(*r, hit, triangle);\r
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_triangle);\r
\r
    var has_hit_lightbulb = intersect_sphere(*r, hit, light_position + vec3f(0, .035, 0), .03, vec3f(1., .95, 0.));\r
    (*hit).shader = select((*hit).shader, 0, has_hit_lightbulb);\r
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_lightbulb);\r
\r
    return (*hit).has_hit;\r
}\r
\r
//Lighting //\r
\r
fn sample_point_light(pos : vec3f) -> Light {\r
    const light_intensity = 3.14;\r
\r
    var direction = light_position - pos;\r
    var dist = length(direction);\r
    var incident_light = light_intensity / (dist * dist);\r
\r
    var light = Light(vec3f(incident_light), direction, dist);\r
\r
    return light;\r
}\r
\r
fn check_occulusion(position : vec3f, light : vec3f) -> bool\r
{\r
    const surface_offset = 0.001;\r
\r
    var line = light - position;\r
    var direction = normalize(line);\r
    var distance = length(line) - surface_offset;\r
\r
    var r = construct_ray(position + direction * surface_offset, direction, surface_offset, distance);\r
    var hit = generate_default_hitinfo();\r
\r
    return intersect_scene(&r, &hit);\r
}\r
\r
fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult\r
{\r
    var light_info = sample_point_light((*hit).position);\r
    var lambertian_light = (*hit).diffuse / 3.14 * light_info.L_i * dot((*hit).normal, light_info.w_i);\r
\r
    var is_occluded = check_occulusion((*hit).position, light_position);\r
    var occlusion_modifier = select(1., 0., is_occluded);\r
\r
    var L_ambient = .1;\r
    var L_reflected = .9 * lambertian_light * occlusion_modifier;\r
    var L_observed = L_ambient + L_reflected;\r
\r
    return LightResult(L_observed, vec3f(0));\r
}\r
\r
fn mirror(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult\r
{\r
    (*r).direction = normalize(reflect((*r).direction, (*hit).normal));\r
    (*r).origin = (*hit).position + (*r).direction * .001;\r
    (*r).tmax = 100.;\r
\r
    (*hit).continue_trace = true;\r
\r
    return LightResult(vec3f(1), vec3f(0));\r
}\r
\r
fn refractive(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult\r
{\r
    var ni_nt = (*hit).prev_refractive / (*hit).next_refractive;\r
\r
    var incident = -(*r).direction;\r
    var r_n_dot = dot(incident, (*hit).normal);\r
\r
    var t_sin = ni_nt * (r_n_dot * (*hit).normal - incident);\r
    var cos2 = 1 - ni_nt * ni_nt * (1 - r_n_dot * r_n_dot);\r
    var direction = t_sin - (*hit).normal * sqrt(abs(cos2));\r
\r
    var is_reflected = cos2 < 0;\r
    var reflected_direction = reflect((*r).direction, (*hit).normal);\r
\r
    (*r).direction = normalize(select(direction, reflected_direction, is_reflected));\r
    (*r).origin = (*hit).position + (*r).direction * .01;\r
    (*r).tmax = 100.;\r
\r
    (*hit).continue_trace = true;\r
\r
    return LightResult(vec3f(1), vec3f(0));\r
}\r
\r
fn phong(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult\r
{\r
    var light_info = sample_point_light((*hit).position);\r
    var lighting = light_info.L_i * dot(light_info.w_i, (*hit).normal) / 3.14;\r
\r
    var diffuse_lighting = (*hit).diffuse * lighting;\r
\r
    var reflection = normalize(reflect(-light_info.w_i, (*hit).normal));\r
    var specular = (*hit).specular * ((*hit).shininess + 2) * .5 * pow(dot(-(*r).direction, reflection), (*hit).shininess);\r
\r
    var is_occluded = check_occulusion((*hit).position, light_position);\r
    var occlusion_modifier = select(1., 0., is_occluded);\r
\r
    var L_ambient = .1;\r
    var L_diffuse = .9 * diffuse_lighting * occlusion_modifier;\r
    var L_specular = specular * lighting * occlusion_modifier;\r
\r
    return LightResult(L_ambient + L_diffuse, vec3f(max(L_specular.r, 0)));\r
}\r
\r
\r
fn glossy(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult\r
{\r
    var light_info = sample_point_light((*hit).position);\r
    var lighting = light_info.L_i * dot(light_info.w_i, (*hit).normal) / 3.14;\r
\r
    var diffuse_lighting = (*hit).diffuse * lighting;\r
\r
    var reflection = normalize(reflect(-light_info.w_i, (*hit).normal));\r
    var specular = (*hit).specular * ((*hit).shininess + 2) * .5 * pow(dot(-(*r).direction, reflection), (*hit).shininess);\r
\r
    var is_occluded = check_occulusion((*hit).position, light_position);\r
    var occlusion_modifier = select(1., 0., is_occluded);\r
\r
    var L_ambient = .1 * (*hit).color;\r
    var L_diffuse = .9 * diffuse_lighting * (*hit).color * occlusion_modifier;\r
    var L_specular = specular * lighting * occlusion_modifier;\r
\r
    refractive(r, hit);\r
\r
    return LightResult(vec3f(1), vec3f(max(L_specular.r, 0)));\r
}\r
\r
fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult\r
{\r
    (*hit).continue_trace = false;\r
\r
    switch ((*hit).shader)\r
    {\r
        default :\r
        {\r
        }\r
        case 1 :\r
        {\r
            return lambertian(r, hit);\r
        }\r
        case 2 :\r
        {\r
            return mirror(r, hit);\r
        }\r
        case 3 :\r
        {\r
            return refractive(r, hit);\r
        }\r
        case 4 :\r
        {\r
            return phong(r, hit);\r
        }\r
        case 5 :\r
        {\r
            return glossy(r, hit);\r
        }\r
    }\r
\r
    return LightResult(vec3f(1), vec3f(0));\r
}\r
\r
//Texturing //\r
\r
fn texture(is_textured : bool, uv : vec2f, light : LightResult, color : vec3f) -> vec3f\r
{\r
    var sampled_texture = textureSample(grass_texture, texture_sampler, uv * globals.texture_scale).rgb;\r
\r
    var result = light.multiplicative * select(color, sampled_texture, is_textured) + light.additive;\r
\r
    return result;\r
}\r
\r
//Fragment shader //\r
\r
@fragment\r
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f\r
{\r
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);\r
    const max_depth = 10;\r
\r
    var light_result : LightResult;\r
    var r : Ray;\r
    var hit : HitInfo;\r
\r
    var colors = array<vec3f, 100 > ();\r
    var lights = array<LightResult, 100 > ();\r
    var is_textured = array<bool, 100 > ();\r
    var texture_uvs = array<vec2f, 100 > ();\r
\r
    for (var i = 0; i < i32(globals.subdivisions_sqr); i++)\r
    {\r
        var uv = vec2f(coords.x, coords.y) *.5 + jitters[i];\r
        r = generate_ray_from_camera(uv);\r
        hit = generate_default_hitinfo();\r
        light_result = LightResult(vec3f(1), vec3f(0));\r
\r
        for (hit.depth = 0; hit.depth < max_depth; hit.depth++)\r
        {\r
            if (!intersect_scene(&r, &hit))\r
            {\r
                hit.color += backgroundColor.rgb;\r
                break;\r
            }\r
\r
            var next_light_result = shader(&r, &hit);\r
            light_result.additive += next_light_result.additive;\r
            light_result.multiplicative *= next_light_result.multiplicative;\r
\r
            if (!hit.continue_trace)\r
            {\r
                break;\r
            };\r
        }\r
\r
        colors[i] = hit.color;\r
        lights[i] = light_result;\r
        is_textured[i] = hit.texture;\r
        texture_uvs[i] = hit.uv;\r
    }\r
\r
    var final_result = vec3f();\r
    var j : i32;\r
    for (j = 0; j < i32(globals.subdivisions_sqr); j++)\r
    {\r
        var substrata_result = texture(is_textured[j], texture_uvs[j], lights[j], colors[j]);\r
        final_result += substrata_result / globals.subdivisions_sqr;\r
    }\r
\r
    return vec4f(pow(final_result, vec3f(1.0 / 1.25)), 1.0);\r
}\r
`,Gr="/assets/grass-2ebe1569.jpg",Bt="texturing",On="grass-texture-scale",mn="subdivision-jitter-slider",An="grass-texture-select",Pt="texture-repeat-style-on-plane",Fr=["clamp-to-edge","repeat","mirror-repeat"],Dr=async()=>{const{device:n,canvas:r,context:t,canvasFormat:e}=await F(Bt),i=m(On),o=m(mn),s=m(An),a=k(n,[],e,Vr,"triangle-strip");let c,l;const h=async _=>{const v=[Sn(Gr),Sn(Lt)],w=await Promise.all(v),{texture:L,sampler:C}=Ln(n,w[0].textureData,w[0].width,w[0].height,{addressModeU:_,addressModeV:_}),{texture:$,sampler:K}=Ln(n,w[1].textureData,w[1].width,w[1].height,{addressModeU:_,addressModeV:_});c=wn(n,a,L,C),l=wn(n,a,$,K)};await h("repeat");const{bindGroup:u,uniformBuffer:f}=q(n,a,new Float32Array([i(),o()*o()]),1),{storageGroup:g,storageBuffer:y}=qt(n,a,new Float32Array(200),2),b=()=>{M(n,f,new Float32Array([i(),o()*o()]),0);const _={"grass.jpg":c,"grass_minecraft.png":l}[s()],{pass:v,executePass:w}=D(n,t,Y.black);v.setPipeline(a),v.setBindGroup(0,_),v.setBindGroup(1,u),v.setBindGroup(2,g),v.draw(4),w()},A=_=>{const v=Nt(r.height,_);M(n,y,new Float32Array(O(v)),0,0)},R=un(mn,A);A(R),Dt([On,An,mn],b),un(Pt,async _=>{await h(_),b()}),b()},kr=(n,r)=>{const t=V("Applying textures in rendering"),e=T("No description yet"),i=X(),o=G(Bt),s=j(),a=p(I(On,.2,.1,2,.1),"Texture scale"),c=p(I(mn,1,1,10,1),"Subdivisions for stratisfied jitter"),l=p(on(An,["grass.jpg","grass_minecraft.png"],"grass_minecraft.png"),"Grass texture",!1),h=p(on(Pt,Fr,"repeat"),"Texture edge behavior",!1);s.append(l,a,h,c),i.append(o,s),n.append(t,e,i),r.push(Dr)},Ot=(n,r)=>{Tr(n,r),kr(n,r)},zr=(n,r)=>{ft(n,r),wt(n,r),Ot(n,r)},Hr={name:"rendering",generator:zr,children:[{name:"01-raycasting-introduction",generator:ft,children:[]},{name:"02-lighting-models",generator:wt,children:[]},{name:"03-texture-mapping",generator:Ot,children:[]}]},At=[gr,Hr],Rt=zt(),Vn=[],qr=kt(At);qr(Rt,Vn);At[0].generator(Rt,Vn);for(const n of Vn)n();
