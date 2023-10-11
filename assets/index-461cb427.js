(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();const T=n=>{const t=document.createElement("p");return t.innerHTML=n,t.className="paragraph",t},V=n=>{const t=document.createElement("h1");return t.innerHTML=n,t.className="title",t},p=(n,t,e=!0)=>{const i=document.createElement("div");i.className="label-group";const r=document.createElement("label");if(r.textContent=t,e&&"value"in n){const o=()=>r.textContent=`${t} [${n.value}]`;n.addEventListener("input",o),o()}return i.append(r,n),i},G=(n,t=512,e=512)=>{const i=document.createElement("canvas");return i.width=t,i.height=e,i.id=n,i},S=(n,t,e,i,r=1)=>{const o=document.createElement("input");return o.id=n,o.type="range",o.className="slider-input",o.min=String(e),o.max=String(i),o.step=String(r),o.value=String(t),o},Gn=(n,t)=>{const e=document.createElement("input");return e.id=n,e.type="color",e.value=t,e},Vt=(n,t)=>{const e=document.createElement("input");return e.id=n,e.type="checkbox",e.checked=t,e.value=String(t),e.addEventListener("input",()=>e.value=String(e.checked)),e},Gt=(n,t)=>{const e=document.createElement("button");return e.id=n,e.textContent=t,e},on=(n,t,e=t[0]??"")=>{const i=document.createElement("select");return i.id=n,i.append(...t.map(r=>{const o=document.createElement("option");return o.text=r,o.value=r,o.selected=r===e,o})),i},U=()=>{const n=document.createElement("div");return n.className="interactables",n},j=()=>{const n=document.createElement("div");return n.className="canvas-section",n},x=(n,t="value")=>{const e=document.getElementById(n);if(!e)throw new Error(`Could not locate input with id ${n}`);return()=>e[t]},un=(n,t)=>{const e=document.getElementById(n);if(!e)throw new Error(`Could not locate input with id ${n}`);return e.addEventListener("input",()=>t(e.value)),e.value},Ft=(n,t)=>{const e=document.getElementById(n);if(!e)throw new Error(`Could not locate button with id ${n}`);e.addEventListener("click",t)},kt=(n,t)=>{const e=document.getElementById(n);if(!e)throw new Error(`Could not locate canvas with id ${n}`);e.addEventListener("click",i=>{const r=e.getBoundingClientRect(),o=i.clientX-r.left,s=i.clientY-r.top;t({x:o,y:s})})},Dt=(n,t)=>{for(const e of n){const i=document.getElementById(e);if(!i)throw new Error(`Could not locate element with id ${e}`);i.addEventListener("input",t)}},zt=n=>{const t=new URLSearchParams(document.location.search),e=[t.get("t"),t.get("p")];let i,r=n;for(const o of e){const s=r.find(a=>a.name===o);if(!s)break;i=s,r=i.children??[]}if(!i)throw new Error("Could not find route.");return i.generator},Ht=()=>{const n=document.getElementById("app");if(!n)throw new Error("Could not initialize app.");return n},R=(n=0,t=0)=>[n,t],_=(n=0,t=0,e=0)=>[n,t,e],m=(n=0,t=0,e=0,i=1)=>[n,t,e,i],I=n=>[].concat(...n),Y=(n,t)=>{const e=[];for(let i=0;i<Math.min(n.length,t.length);i++)e.push(n[i]+t[i]);return e},kn=(n,t)=>{const e=[];for(let i=0;i<Math.min(n.length,t.length);i++)e.push(n[i]-t[i]);return e},Dn=(n,t)=>{const e=[];for(let i=0;i<n.length;i++)e.push(t*n[i]);return e},vn=(n,t)=>{let e=0;for(let i=0;i<Math.min(n.length,t.length);i++)e+=n[i]*t[i];return e},Fn=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],pn=n=>Dn(n,1/zn(n)),zn=n=>Math.sqrt(vn(n,n)),E={float32x2:new Float32Array(R()).byteLength,float32x3:new Float32Array(_()).byteLength,float32x4:new Float32Array(m()).byteLength},qt=(n,t)=>{if(n.length!=t.length)return!1;for(let e=0;e<Math.min(n.length,t.length);e++)if(n[e]!=t[e])return!1;return!0},F=async n=>{navigator.gpu||window.alert("WebGPU is not enabled for this browser.");const e=await navigator.gpu.requestAdapter();if(!e)throw new Error("Could not initialize GPU adapter.");const i=await e.requestDevice(),r=document.getElementById(n);if(!r)throw new Error(`Could not find canvas with id ${n}`);const o=r.getContext("gpupresent")||r.getContext("webgpu");if(!o)throw new Error("Could not generate context for canvas.");const s=navigator.gpu.getPreferredCanvasFormat();return o.configure({device:i,format:s}),{adapter:e,device:i,canvas:r,canvasFormat:s,context:o}},k=(n,t,e={r:0,g:0,b:0,a:1})=>{const i=n.createCommandEncoder(),r=i.beginRenderPass({colorAttachments:[{view:t.getCurrentTexture().createView(),loadOp:"clear",clearValue:e,storeOp:"store"}]});return{pass:r,executePass:()=>{r.end(),n.queue.submit([i.finish()])}}},D=(n,t,e,i,r="triangle-list")=>{const o=n.createShaderModule({code:i});return n.createRenderPipeline({layout:"auto",vertex:{module:o,entryPoint:"main_vs",buffers:t},fragment:{module:o,entryPoint:"main_fs",targets:[{format:e}]},primitive:{topology:r}})},M=(n,t,e,i=0,r=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const o=n.createBuffer({size:t.byteLength,usage:r}),s={arrayStride:E[e],attributes:[{format:e,offset:0,shaderLocation:i}]};return n.queue.writeBuffer(o,0,t),{bufferLayout:s,buffer:o}},An=(n,t,e=GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST)=>{const i=n.createBuffer({size:t.byteLength,usage:e});return n.queue.writeBuffer(i,0,t),{buffer:i}},q=(n,t,e,i=0)=>{const r=n.createBuffer({size:e.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),o=n.createBindGroup({layout:t.getBindGroupLayout(i),entries:[{binding:0,resource:{buffer:r}}]});return n.queue.writeBuffer(r,0,e),{bindGroup:o,uniformBuffer:r}},Hn=(n,t,e,i=0)=>{const r=e.map(s=>{const a=n.createBuffer({size:s.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});return n.queue.writeBuffer(a,0,s),a}),o=n.createBindGroup({layout:t.getBindGroupLayout(i),entries:r.map((s,a)=>({binding:a,resource:{buffer:s}}))});return{storageBuffers:r,storageGroup:o}},xn=(n,t,e,i,r=0)=>n.createBindGroup({layout:t.getBindGroupLayout(r),entries:[{binding:0,resource:i},{binding:1,resource:e.createView()}]}),bn=(n,t,e,i,r)=>{const o=n.createTexture({size:[e,i,1],format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING});n.queue.writeTexture({texture:o},t,{offset:0,bytesPerRow:e*4,rowsPerImage:i},[e,i,1]);const s=n.createSampler({addressModeU:"repeat",addressModeV:"repeat",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",...r});return{texture:o,sampler:s}},N=(n,t,e,i,r)=>{if(r){const o=new Float32Array(i),s=new Float32Array(t.size-(i+e.byteLength));e=new Float32Array([...o,...e,...s])}n.queue.writeBuffer(t,i,e)},Ln=(n=0,t=0,e=0,i=1)=>({r:n,g:t,b:e,a:i}),In=n=>_(n.r,n.g,n.b),X={black:Ln(0,0,0,1),white:Ln(1,1,1,1),blueScreenBlue:Ln(.1,.3,.6,1)},dn=n=>{if(n[0]==="#"&&(n=n.substring(1)),n.length!==6)throw new Error("Can't handle color hexes of size other than 6.");const t=parseInt(n,16),e=(t>>16&255)/255,i=(t>>8&255)/255,r=(t&255)/255;return{r:e,g:i,b:r,a:1}},Sn=n=>n*Math.PI/180,tn=(n,t,e,i,r)=>(n-t)/(e-t)*(r-i)+i,sn=(n,t)=>{const e=t/2;return[R(n[0]-e,n[1]-e),R(n[0]+e,n[1]-e),R(n[0]-e,n[1]+e),R(n[0]-e,n[1]+e),R(n[0]+e,n[1]-e),R(n[0]+e,n[1]+e)]},$t=(n,t,e=12)=>{const i=[],r=2*Math.PI/e;for(let o=0;o<e;o++)i.push(n,Y(n,R(t*Math.cos(o*r),t*Math.sin(o*r))),Y(n,R(t*Math.cos((o+1)*r),t*Math.sin((o+1)*r))));return i},Cn=(n,t)=>{const e=t/2,i=[m(...Y(n,_(-e,-e,e)),1),m(...Y(n,_(-e,e,e)),1),m(...Y(n,_(e,e,e)),1),m(...Y(n,_(e,-e,e)),1),m(...Y(n,_(-e,-e,-e)),1),m(...Y(n,_(-e,e,-e)),1),m(...Y(n,_(e,e,-e)),1),m(...Y(n,_(e,-e,-e)),1)],r=new Uint32Array([0,1,1,2,2,3,3,0,2,3,3,7,7,6,6,2,0,3,3,7,7,4,4,0,1,2,2,6,6,5,5,1,4,5,5,6,6,7,7,4,0,1,1,5,5,4,4,0]),o=new Uint32Array([1,0,3,3,2,1,2,3,7,7,6,2,3,0,4,4,7,3,6,5,1,1,2,6,4,5,6,6,7,4,5,4,0,0,1,5]);return{vertices:i,lineIndices:r,triangleIndices:o}},Mt=n=>{const t=[m(...n[0],1),m(...n[1],1),m(...n[2],1)],e=[m(0,1,2,0)],i=[];return{vertices:t,lineIndices:new Uint32Array(i),triangleIndices:new Uint32Array(I(e))}},yn=async n=>{const t=document.createElement("img");t.src=n,await t.decode();const e=document.createElement("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");if(!i)throw new Error("Could not get canvas context");i.drawImage(t,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),o=new Uint8Array(t.width*t.height*4);for(let s=0;s<t.height;++s)for(let a=0;a<t.width;++a)for(let c=0;c<4;++c)o[(s*t.width+a)*4+c]=r.data[((t.height-s-1)*t.width+a)*4+c];return{textureData:o,height:t.height,width:t.width}},Nt=(n,t)=>{const e=1/n,i=e/t;if(t<2)return[R()];const r=[];for(var o=0;o<t;++o)for(var s=0;s<t;++s)r.push(R((Math.random()+s)*i-e*.5,(Math.random()+o)*i-e*.5));return r},wn=(n=0,t=0,e=0,i=0,r=0,o=0,s=0,a=0,c=0,h=0,u=0,l=0,f=0,g=0,y=0,b=0)=>[[n,t,e,i],[r,o,s,a],[c,h,u,l],[f,g,y,b]],an=()=>wn(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),Rn=n=>[].concat(...jt(n)),qn=n=>[].concat(...n.map(t=>Rn(t))),En=(n,t,e)=>{if(qt(n,t))return an();let i=pn(kn(t,n));const r=pn(Fn(i,e)),o=pn(Fn(r,i));return i=Dn(i,-1),wn(...m(...r,-vn(r,n)),...m(...o,-vn(o,n)),...m(...i,-vn(i,n)),...m())},Ut=(n,t,e,i,r,o)=>{if(n===t)throw"ortho(): left and right are equal";if(e===i)throw"ortho(): bottom and top are equal";if(r===o)throw"ortho(): near and far are equal";const s=t-n,a=i-e,c=o-r,h=an();return h[0][0]=2/s,h[1][1]=2/a,h[2][2]=-2/c,h[0][3]=-(n+t)/s,h[1][3]=-(i+e)/a,h[2][3]=-(r+o)/c,h},$n=(n,t,e,i)=>{const r=1/Math.tan(Sn(n)/2),o=i-e,s=an();return s[0][0]=r/t,s[1][1]=r,s[2][2]=-(e+i)/o,s[2][3]=-2*e*i/o,s[3][2]=-1,s[3][3]=0,s},gn=(n,t)=>{const e=pn(t),i=e[0],r=e[1],o=e[2],s=Math.cos(Sn(n)),a=Math.sin(Sn(n)),c=1-s;return wn(...m(i*i*c+s,i*r*c-o*a,i*o*c+r*a,0),...m(i*r*c+o*a,r*r*c+s,r*o*c-i*a,0),...m(i*o*c-r*a,r*o*c+i*a,o*o*c+s,0),...m())},en=({[0]:n,[1]:t,[2]:e})=>{const i=an();return i[0][3]=n,i[1][3]=t,i[2][3]=e,i},fn=(n=1,t=1,e=1)=>{var i=an();return i[0][0]=n,i[1][1]=t,i[2][2]=e,i},P=(n,t)=>{const e=[];for(let i=0;i<n.length;i++){e.push([]);for(let r=0;r<t.length;r++){let o=0;for(let s=0;s<n.length;s++)o+=n[i][s]*t[s][r];e[i].push(o)}}return e},jt=n=>{for(var t=[],e=0;e<n.length;++e){t.push([]);for(var i=0;i<n[e].length;++i)t[e].push(n[i][e])}return t},Tn=wn(1,0,0,0,0,1,0,0,0,0,-.5,.5,0,0,0,1),Xt=`@vertex
fn main_vs(@location(0) pos : vec2f) -> @builtin(position) vec4f
{
    return vec4f(pos, 0, 1);
}
@fragment
fn main_fs() -> @location(0) vec4f
{
    return vec4f(0.0, 0.0, 0.0, 1.0);
}
`,Yt=async()=>{const{device:n,canvas:t,context:e,canvasFormat:i}=await F("task1"),{pass:r,executePass:o}=k(n,e,{r:.3921,g:.5843,b:.9294,a:1}),s=[].concat(I(sn([0,0],10*(2/t.height))),I(sn([1,0],10*(2/t.height))),I(sn([1,1],10*(2/t.height)))),a=new Float32Array(s),{buffer:c,bufferLayout:h}=M(n,a,"float32x2"),u=D(n,[h],i,Xt);r.setPipeline(u),r.setVertexBuffer(0,c),r.draw(s.length/2),o()},Zt=(n,t)=>{const e=V("The three pixeleers"),i=T("This is a test description."),r=G("task1");n.append(e,i,r),t.push(Yt)},Wt=`struct VSOut {
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
`,Jt=async()=>{const{device:n,context:t,canvasFormat:e}=await F("task2"),{pass:i,executePass:r}=k(n,t,{r:.3921,g:.5843,b:.9294,a:1}),o=[R(0,0),R(1,0),R(1,1)],s=[_(1,0,0),_(0,1,0),_(0,0,1)],a=new Float32Array(I(o)),c=new Float32Array(I(s)),{buffer:h,bufferLayout:u}=M(n,a,"float32x2"),{buffer:l,bufferLayout:f}=M(n,c,"float32x3",1),g=D(n,[u,f],e,Wt);i.setPipeline(g),i.setVertexBuffer(0,h),i.setVertexBuffer(1,l),i.draw(o.length),r()},Kt=(n,t)=>{const e=V("Triangles all the way down."),i=T("This is a test description."),r=G("task2");n.append(e,i,r),t.push(Jt)},Qt=`struct Time {
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
`,ne=async()=>{const{device:n,context:t,canvasFormat:e}=await F("task3"),i=sn(R(0,0),1),r=new Float32Array(I(i)),{bufferLayout:o,buffer:s}=M(n,r,"float32x2"),a=D(n,[o],e,Qt),{bindGroup:c,uniformBuffer:h}=q(n,a,new Float32Array(1)),u=l=>{N(n,h,new Float32Array([l/1e3]),0);const{pass:f,executePass:g}=k(n,t,{r:.3921,g:.5843,b:.9294,a:1});f.setPipeline(a),f.setVertexBuffer(0,s),f.setBindGroup(0,c),f.draw(i.length),g(),requestAnimationFrame(u)};requestAnimationFrame(u)},te=(n,t)=>{const e=V("Spin me right round"),i=T("This is a test description."),r=G("task3");n.append(e,i,r),t.push(ne)},ee=`struct Time {
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
`,ie=async()=>{const{device:n,context:t,canvasFormat:e}=await F("task4"),i=sn(R(0,0),2),r=new Float32Array(I(i)),o=x("ball-height"),s=x("ball-size"),a=x("ball-speed"),{bufferLayout:c,buffer:h}=M(n,r,"float32x2"),u=D(n,[c],e,ee),{bindGroup:l,uniformBuffer:f}=q(n,u,new Float32Array([0])),{bindGroup:g,uniformBuffer:y}=q(n,u,new Float32Array(3),1),b=O=>{N(n,f,new Float32Array([O/1e3]),0),N(n,y,new Float32Array([o(),a(),s()]),0);const{pass:A,executePass:d}=k(n,t,X.blueScreenBlue);A.setPipeline(u),A.setVertexBuffer(0,h),A.setBindGroup(0,l),A.setBindGroup(1,g),A.draw(i.length),d(),requestAnimationFrame(b)};requestAnimationFrame(b)},re=(n,t)=>{const e=V("Nokia memories"),i=T("This is a test description."),r=j(),o=G("task4"),s=U(),a=p(S("ball-height",.3,.1,.9,.1),"Ball bounce height"),c=p(S("ball-speed",4,1,16),"Ball bounce speed"),h=p(S("ball-size",1.05,1.01,1.5,.01),"Ball size");s.append(a,c,h),r.append(o,s),n.append(e,i,r),t.push(ie)},Mn=(n,t)=>{Zt(n,t),Kt(n,t),te(n,t),re(n,t)},oe=`struct VSOut {
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
`,Bn="drawing",Nn="drawing-mode",se=["POINT","TRIANGLE","CIRCLE"],Un="points-color",jn="drawing-background-color",Xn="granularity-slider",Yn="size-slider",Zn="clear",ae=async()=>{const{device:n,canvas:t,context:e,canvasFormat:i}=await F(Bn);let r=un(jn,B=>{r=B,H()});const o=x(Un),s=x(Nn),a=x(Xn),c=x(Yn),h=1e3,u=new Float32Array(6*h*E.float32x2),{buffer:l,bufferLayout:f}=M(n,u,"float32x2"),g=new Float32Array(6*h*E.float32x3),{buffer:y,bufferLayout:b}=M(n,g,"float32x3",1),O=D(n,[f,b],i,oe,"triangle-list");kt(Bn,B=>{switch(s()){case"TRIANGLE":K(B);break;case"CIRCLE":z(B);break;default:case"POINT":$(),w(B);break}H()});let d=0,v=0;const w=({x:B,y:Q})=>{const cn=tn(B,0,t.width,-1,1),rn=-1*tn(Q,0,t.height,-1,1),nn=sn(R(cn,rn),c()/t.height),hn=new Float32Array(I(nn));n.queue.writeBuffer(l,d,hn),d+=6*E.float32x2;const ln=Array(6).fill(In(dn(o()))),Vn=new Float32Array(I(ln));n.queue.writeBuffer(y,v,Vn),v+=6*E.float32x3};let L=[],C=[];const $=()=>{L=[],C=[]},K=B=>{if(L.push(B),C.push(o()),C.length<3){w(B);return}const Q=new Float32Array([].concat(...L.map(({x:rn,y:nn})=>{const hn=tn(rn,0,t.width,-1,1),ln=-1*tn(nn,0,t.height,-1,1);return R(hn,ln)}),I(Array(9).fill(R()))));n.queue.writeBuffer(l,d-2*6*E.float32x2,Q),d+=E.float32x2*(3-2*6);const cn=new Float32Array([].concat(...I(C.map(rn=>In(dn(rn)))),I(Array(9).fill(_()))));n.queue.writeBuffer(y,v-2*6*E.float32x3,cn),v+=E.float32x3*(3-2*6),$()},z=B=>{if(L.push(B),C.push(o()),L.length<2){w(B);return}const Q=R(tn(L[0].x,0,t.width,-1,1),-1*tn(L[0].y,0,t.height,-1,1)),cn=R(tn(L[1].x,0,t.width,-1,1),-1*tn(L[1].y,0,t.height,-1,1)),rn=zn(kn(cn,Q)),nn=$t(Q,rn,a()),hn=new Float32Array(I(nn));n.queue.writeBuffer(l,d-6*E.float32x2,hn),d+=E.float32x2*(nn.length-6);const ln=new Float32Array(I([...new Array(nn.length)].map((Vn,Et)=>{const Tt=Et%3===0?0:1;return In(dn(C[Tt]))})));n.queue.writeBuffer(y,v-6*E.float32x3,ln),v+=E.float32x3*(nn.length-6),$()},H=()=>{const{pass:B,executePass:Q}=k(n,e,dn(r));B.setPipeline(O),B.setVertexBuffer(0,l),B.setVertexBuffer(1,y),B.draw(6*h),Q()};Ft(Zn,()=>{n.queue.writeBuffer(l,0,new Float32Array(6*h*E.float32x2)),n.queue.writeBuffer(y,0,new Float32Array(6*h*E.float32x3)),H()}),H()},Wn=(n,t)=>{const e=V("A simple GPU-based drawing program"),i=T("No description yet"),r=j(),o=G(Bn),s=U(),a=on(Nn,se),c=p(Gn(Un,"#000000"),"Draw color"),h=p(Gn(jn,"#ffffff"),"Background color"),u=p(S(Yn,10,2,100),"Point size"),l=p(S(Xn,12,4,32),"Circle granularity"),f=Gt(Zn,"Clear canvas");s.append(a,c,u,l,h,f),r.append(o,s),n.append(e,i,r),t.push(ae)},ce=`struct Uniforms {
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
`,Jn="wireframe",Kn="wireframe-rotation-slider",he=async()=>{const{device:n,context:t,canvasFormat:e}=await F(Jn),i=Cn(_(0),1),r=i.lineIndices,o=new Float32Array(I(i.vertices)),{buffer:s}=An(n,r),{buffer:a,bufferLayout:c}=M(n,o,"float32x4"),h=D(n,[c],e,ce,"line-list"),{bindGroup:u,uniformBuffer:l}=q(n,h,new Float32Array(Rn(an())),0),f=en(_(.5,.5,.5)),g=_(0,0,10),y=_(0),b=_(0,1,0),O=En(g,y,b),A=Ut(-1.5,1.5,-1.5,1.5,0,100),d=P(Tn,A),v=P(d,O),w=C=>{const $=gn(C,_(1,1,1)),K=P($,f),z=P(v,K);N(n,l,new Float32Array(Rn(z)),0);const{pass:H,executePass:Z}=k(n,t,X.black);H.setPipeline(h),H.setVertexBuffer(0,a),H.setIndexBuffer(s,"uint32"),H.setBindGroup(0,u),H.drawIndexed(r.length),Z()},L=un(Kn,w);w(L)},le=(n,t)=>{const e=V("Projecting a cube"),i=T("No description yet"),r=j(),o=G(Jn),s=U(),a=p(S(Kn,45,0,360),"Rotation about (1, 1, 1)");s.append(a),r.append(o,s),n.append(e,i,r),t.push(he)},fe=`struct Uniforms {
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
`,Qn="perspective",ue=async()=>{const{device:n,context:t,canvasFormat:e,canvas:i}=await F(Qn),r=Cn(_(0),1),o=new Float32Array(I(r.vertices)),{buffer:s}=An(n,r.lineIndices),{buffer:a,bufferLayout:c}=M(n,o,"float32x4"),{buffer:h,bufferLayout:u}=M(n,new Float32Array(I([m(.5,.5,.5,1),m(0,0,1,1),m(0,1,0,1),m(0,1,1,1),m(1,0,1,1),m(1,0,0,1),m(1,1,0,1),m(1,1,1,1)])),"float32x4",1),l=D(n,[c,u],e,fe,"line-list"),f=_(0,0,5),g=_(0),y=_(0,1,0),b=En(f,g,y),O=$n(45,i.width/i.height,.1,100),A=P(Tn,O),d=P(A,b),v=P(gn(0,_(1,1,1)),en(_(-2))),w=P(gn(45,_(0,1,0)),en(_(0))),L=P(en(_(2)),gn(45,_(1,1,0))),C=P(d,v),$=P(d,w),K=P(d,L),{bindGroup:z}=q(n,l,new Float32Array(qn([C,$,K])),0);(()=>{const{pass:Z,executePass:B}=k(n,t,X.black);Z.setPipeline(l),Z.setVertexBuffer(0,a),Z.setVertexBuffer(1,h),Z.setIndexBuffer(s,"uint32"),Z.setBindGroup(0,z),Z.drawIndexed(r.lineIndices.length,3),B()})()},_e=(n,t)=>{const e=V("Projecting a cube"),i=T("No description yet"),r=j(),o=G(Qn,1028-128),s=U();r.append(o,s),n.append(e,i,r),t.push(ue)},de=`struct Uniforms {
    mvps : array<mat4x4f, 5>,
};

@group(0) @binding(0) var<uniform> uniforms : Uniforms;

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) color : vec4f,
};

@vertex
fn main_vs(@location(0) inPos : vec4f, @builtin(instance_index) instance : u32
) -> VSOut
{
    var vsOut : VSOut;
    vsOut.position = uniforms.mvps[instance] * inPos;
    return vsOut;
}

@fragment
fn main_fs(@location(0) inColor : vec4f) -> @location(0) vec4f
{
    return vec4f(1.0, .0, .0, 1.0);
}
`,nt="airplane",ve=async()=>{const{device:n,context:t,canvasFormat:e,canvas:i}=await F(nt),r=Cn(_(0),1),o=new Float32Array(I(r.vertices)),{buffer:s}=An(n,r.lineIndices),{buffer:a,bufferLayout:c}=M(n,o,"float32x4"),h=D(n,[c],e,de,"line-list"),u=_(5,5,5),l=_(0),f=_(0,1,0),g=En(u,l,f),y=$n(45,i.width/i.height,.1,100),b=P(Tn,y),O=P(b,g),A=fn(.4,.4,2),d=P(fn(.35,.25,.35),en(_(0,-.2,3.3))),v=P(fn(1.7,.2,1.1),en(_(.6))),w=P(fn(1.7,.2,1.1),en(_(-.6))),L=P(fn(.2,.5,.3),en(_(0,.5,-3.3))),C=[A,d,v,w,L].map(z=>P(O,z)),{bindGroup:$}=q(n,h,new Float32Array(qn(C)),0);(()=>{const{pass:z,executePass:H}=k(n,t,X.black);z.setPipeline(h),z.setVertexBuffer(0,a),z.setIndexBuffer(s,"uint32"),z.setBindGroup(0,$),z.drawIndexed(r.lineIndices.length,C.length),H()})()},pe=(n,t)=>{const e=V("Projecting a cube"),i=T("No description yet"),r=j(),o=G(nt),s=U();r.append(o,s),n.append(e,i,r),t.push(ve)},tt=(n,t)=>{le(n,t),_e(n,t),pe(n,t)},ge=(n,t)=>{Mn(n,t),Wn(n,t),tt(n,t)},me={name:"graphics",generator:ge,children:[{name:"01-webgpu-basics",generator:Mn},{name:"02-drawing-with-shaders",generator:Wn},{name:"03-projection",generator:tt}]},xe=`struct Ray {
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
`,et="raycast-anatomy",be=async()=>{const{device:n,context:t,canvasFormat:e}=await F(et),i=D(n,[],e,xe,"triangle-strip"),{pass:r,executePass:o}=k(n,t,X.black);r.setPipeline(i),r.draw(4),o()},ye=(n,t)=>{const e=V("The anatomy of a ray cast"),i=T("No description yet"),r=G(et);n.append(e,i,r),t.push(be)},we=`struct ViewboxOptions {
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
`,it="light",rt="zoom",ot="light-intensity-slider",st="light-position-x-input",at="light-position-y-input",ct="light-position-z-input",ht="shade-all-visible-objects",lt="refractive-index-slider",Le=async()=>{const{device:n,context:t,canvas:e,canvasFormat:i}=await F(it),r=x(rt),o=x(ot),s=x(lt),a=x(st),c=x(at),h=x(ct),u=x(ht,"checked"),l=e.width/e.height,f=D(n,[],i,we,"triangle-strip"),{bindGroup:g,uniformBuffer:y}=q(n,f,new Float32Array([r(),l])),b=new Float32Array([a(),c(),h(),o(),u()?1:0,s(),0,0]),{bindGroup:O,uniformBuffer:A}=q(n,f,b,1),d=()=>{N(n,y,new Float32Array([r(),l]),0),N(n,A,new Float32Array([a(),c(),h(),o(),u()?1:0,s(),0,0]),0);const{pass:v,executePass:w}=k(n,t,X.black);v.setPipeline(f),v.setBindGroup(0,g),v.setBindGroup(1,O),v.draw(4),w(),requestAnimationFrame(d)};requestAnimationFrame(d)},Ie=(n,t)=>{const e=V("A simple lighting system"),i=T("No description yet"),r=j(),o=G(it,512+128,512-64),s=U(),a=p(S(rt,1,.1,10,.1),"Zoom (camera constant)"),c=p(S(ot,3.14,0,10,.01),"Light intensity"),h=p(S(lt,1,-1,10,.1),"Diffuse reflectance"),u=p(S(st,0,-5,5,.1),"Light X position"),l=p(S(at,1,0,5,.1),"Light Y position"),f=p(S(ct,0,-5,5,.1),"Light Z position"),g=p(Vt(ht,!0),"Shading on",!1);s.append(a,c,h,u,l,f,g),r.append(o,s),n.append(e,i,r),t.push(Le)},ft=(n,t)=>{ye(n,t),Ie(n,t)},Se=`struct ViewboxOptions {
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
`,_n="lighting",ut=_n+"-light-position-x-input",_t=_n+"-light-position-y-input",dt=_n+"-light-position-z-input",Re=async()=>{const{device:n,context:t,canvas:e,canvasFormat:i}=await F(_n),r=x(ut),o=x(_t),s=x(dt),a=e.width/e.height,c=D(n,[],i,Se,"triangle-strip"),h=new Float32Array([a]),{bindGroup:u}=q(n,c,h),l=new Float32Array([r(),o(),s(),0,0,0,0,0,0]),{bindGroup:f,uniformBuffer:g}=q(n,c,l,1),y=()=>{N(n,g,new Float32Array([r(),o(),s(),0,0,0,0,0,0]),0);const{pass:b,executePass:O}=k(n,t,X.black);b.setPipeline(c),b.setBindGroup(0,u),b.setBindGroup(1,f),b.draw(4),O(),requestAnimationFrame(y)};requestAnimationFrame(y)},Be=(n,t)=>{const e=V("A simple lighting system"),i=T("No description yet"),r=j(),o=G(_n,512+128,512-64),s=U(),a=p(S(ut,0,-5,5,.1),"Light X position"),c=p(S(_t,1,0,5,.1),"Light Y position"),h=p(S(dt,0,-5,5,.1),"Light Z position");s.append(a,c,h),r.append(o,s),n.append(e,i,r),t.push(Re)},Pe=`struct Environment {
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
`,J="mirrors",W={"Base color":0,Lambertian:1,Mirror:2,Refractive:3,Phong:4,Glossy:5},vt=J+"-sphere-shader",pt=J+"-triangle-shader",gt=J+"-plane-shader",mt=J+"-light-position-x-input",xt=J+"-light-position-y-input",bt=J+"-light-position-z-input",yt=J+"-animation-slider",Oe=async()=>{const{device:n,context:t,canvas:e,canvasFormat:i}=await F(J),r=x(mt),o=x(xt),s=x(bt),a=x(vt),c=x(pt),h=x(gt),u=x(yt),l=e.width/e.height,f=D(n,[],i,Pe,"triangle-strip"),g=new Float32Array([l,0]),{bindGroup:y,uniformBuffer:b}=q(n,f,g),O=new Float32Array([r(),o(),s(),W[a()],W[c()],W[h()],0,0,0]),{bindGroup:A,uniformBuffer:d}=q(n,f,O,1),v=w=>{N(n,b,new Float32Array([l,w*u()/512]),0),N(n,d,new Float32Array([r(),o(),s(),W[a()],W[c()],W[h()],0,0,0]),0);const{pass:L,executePass:C}=k(n,t,X.black);L.setPipeline(f),L.setBindGroup(0,y),L.setBindGroup(1,A),L.draw(4),C(),requestAnimationFrame(v)};requestAnimationFrame(v)},Ae=(n,t)=>{const e=V("Mirrors"),i=T("No description yet"),r=j(),o=G(J,512+128,512-64),s=U(),a=p(on(vt,Object.keys(W),"Refractive"),"Sphere shader type",!1),c=p(on(pt,Object.keys(W),"Lambertian"),"Triangle shader type",!1),h=p(on(gt,Object.keys(W),"Lambertian"),"Plane shader type",!1),u=p(S(mt,0,-5,5,.1),"Light X position"),l=p(S(xt,1,0,5,.1),"Light Y position"),f=p(S(bt,0,-5,5,.1),"Light Z position"),g=p(S(yt,0,0,1,.1),"Orbit animation speed");s.append(a,c,h,u,l,f,g),r.append(o,s),n.append(e,i,r),t.push(Oe)},wt=(n,t)=>{Be(n,t),Ae(n,t)},Ce=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,Lt="/assets/grass_minecraft-9d219e0b.png",It="texture",St="texture-repeat-style",Ee=["clamp-to-edge","repeat","mirror-repeat"],Te=async()=>{const{device:n,context:t,canvasFormat:e}=await F(It),i=async r=>{const o=D(n,[],e,Ce,"triangle-strip"),{textureData:s,height:a,width:c}=await yn(Lt),{texture:h,sampler:u}=bn(n,s,c,a,{addressModeU:r,addressModeV:r}),l=xn(n,o,h,u),{pass:f,executePass:g}=k(n,t,X.black);f.setPipeline(o),f.setBindGroup(0,l),f.draw(4),g()};i(un(St,i))},Ve=(n,t)=>{const e=V("What is a texture"),i=T("No description yet"),r=j(),o=G(It),s=U(),a=p(on(St,Ee,"repeat"),"Texture edge behavior",!1);s.append(a),r.append(o,s),n.append(e,i,r),t.push(Te)},Ge=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,Fe="/assets/grass-2ebe1569.jpg",Rt="texturing",Pn="grass-texture-scale",mn="subdivision-jitter-slider",On="grass-texture-select",Bt="texture-repeat-style-on-plane",ke=["clamp-to-edge","repeat","mirror-repeat"],De=async()=>{const{device:n,canvas:t,context:e,canvasFormat:i}=await F(Rt),r=x(Pn),o=x(mn),s=x(On),a=D(n,[],i,Ge,"triangle-strip");let c,h;const u=async d=>{const v=[yn(Fe),yn(Lt)],w=await Promise.all(v),{texture:L,sampler:C}=bn(n,w[0].textureData,w[0].width,w[0].height,{addressModeU:d,addressModeV:d}),{texture:$,sampler:K}=bn(n,w[1].textureData,w[1].width,w[1].height,{addressModeU:d,addressModeV:d});c=xn(n,a,L,C),h=xn(n,a,$,K)};await u("repeat");const{bindGroup:l,uniformBuffer:f}=q(n,a,new Float32Array([r(),o()*o()]),1),{storageGroup:g,storageBuffers:[y]}=Hn(n,a,[new Float32Array(200)],2),b=()=>{N(n,f,new Float32Array([r(),o()*o()]),0);const d={"grass.jpg":c,"grass_minecraft.png":h}[s()],{pass:v,executePass:w}=k(n,e,X.black);v.setPipeline(a),v.setBindGroup(0,d),v.setBindGroup(1,l),v.setBindGroup(2,g),v.draw(4),w()},O=d=>{const v=Nt(t.height,d);N(n,y,new Float32Array(I(v)),0,0)},A=un(mn,O);O(A),Dt([Pn,On,mn],b),un(Bt,async d=>{await u(d),b()}),b()},ze=(n,t)=>{const e=V("Applying textures in rendering"),i=T("No description yet"),r=j(),o=G(Rt),s=U(),a=p(S(Pn,.2,.1,2,.1),"Texture scale"),c=p(S(mn,1,1,10,1),"Subdivisions for stratisfied jitter"),h=p(on(On,["grass.jpg","grass_minecraft.png"],"grass_minecraft.png"),"Grass texture",!1),u=p(on(Bt,ke,"repeat"),"Texture edge behavior",!1);s.append(h,a,u,c),r.append(o,s),n.append(e,i,r),t.push(De)},Pt=(n,t)=>{Ve(n,t),ze(n,t)},He=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,qe="/assets/grass_minecraft-9d219e0b.png",Ot="default-scene-as-meshes",$e=async()=>{const{device:n,context:t,canvasFormat:e}=await F(Ot),i=D(n,[],e,He,"triangle-strip"),r=Mt([_(-.2,.1,.9),_(.2,.1,.9),_(-.2,.1,-.1)]),{storageGroup:o}=Hn(n,i,[new Float32Array(I(r.vertices)),r.triangleIndices],1),s=await yn(qe),{texture:a,sampler:c}=bn(n,s.textureData,s.width,s.height,{addressModeU:"repeat",addressModeV:"repeat"}),h=xn(n,i,a,c);(()=>{const{pass:l,executePass:f}=k(n,t,X.black);l.setPipeline(i),l.setBindGroup(0,h),l.setBindGroup(1,o),l.draw(4),f()})()},Me=(n,t)=>{const e=V("Applying textures in rendering"),i=T("No description yet"),r=j(),o=G(Ot),s=U();r.append(o,s),n.append(e,i,r),t.push($e)},At=(n,t)=>{Me(n,t)},Ne=(n,t)=>{ft(n,t),wt(n,t),Pt(n,t),At(n,t)},Ue={name:"rendering",generator:Ne,children:[{name:"01-raycasting-introduction",generator:ft,children:[]},{name:"02-lighting-models",generator:wt,children:[]},{name:"03-texture-mapping",generator:Pt,children:[]},{name:"05-meshes",generator:At,children:[]}]},je=[me,Ue],Xe=Ht(),Ct=[],Ye=zt(je);Ye(Xe,Ct);for(const n of Ct)n();
