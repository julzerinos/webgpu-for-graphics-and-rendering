(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();const T=n=>{const t=document.createElement("p");return t.innerHTML=n,t.className="paragraph",t},E=n=>{const t=document.createElement("h1");return t.innerHTML=n,t.className="title",t},m=(n,t,e=!0)=>{const i=document.createElement("div");i.className="label-group";const r=document.createElement("label");if(r.textContent=t,e&&"value"in n){const o=()=>r.textContent=`${t} [${n.value}]`;n.addEventListener("input",o),o()}return i.append(r,n),i},k=(n,t=512,e=512)=>{const i=document.createElement("canvas");return i.width=t,i.height=e,i.id=n,i},S=(n,t,e,i,r=1)=>{const o=document.createElement("input");return o.id=n,o.type="range",o.className="slider-input",o.min=String(e),o.max=String(i),o.step=String(r),o.value=String(t),o},it=(n,t)=>{const e=document.createElement("input");return e.id=n,e.type="color",e.value=t,e},ye=(n,t)=>{const e=document.createElement("input");return e.id=n,e.type="checkbox",e.checked=t,e.value=String(t),e.addEventListener("input",()=>e.value=String(e.checked)),e},we=(n,t)=>{const e=document.createElement("button");return e.id=n,e.textContent=t,e},sn=(n,t,e=t[0]??"")=>{const i=document.createElement("select");return i.id=n,i.append(...t.map(r=>{const o=document.createElement("option");return o.text=r,o.value=r,o.selected=r===e,o})),i},M=()=>{const n=document.createElement("div");return n.className="interactables",n},U=()=>{const n=document.createElement("div");return n.className="canvas-section",n},w=(n,t="value")=>{const e=document.getElementById(n);if(!e)throw new Error(`Could not locate input with id ${n}`);return()=>e[t]},gn=(n,t)=>{const e=document.getElementById(n);if(!e)throw new Error(`Could not locate input with id ${n}`);return e.addEventListener("input",()=>t(e.value)),e.value},Le=(n,t)=>{const e=document.getElementById(n);if(!e)throw new Error(`Could not locate button with id ${n}`);e.addEventListener("click",t)},Ie=(n,t)=>{const e=document.getElementById(n);if(!e)throw new Error(`Could not locate canvas with id ${n}`);e.addEventListener("click",i=>{const r=e.getBoundingClientRect(),o=i.clientX-r.left,s=i.clientY-r.top;t({x:o,y:s})})},Re=(n,t)=>{for(const e of n){const i=document.getElementById(e);if(!i)throw new Error(`Could not locate element with id ${e}`);i.addEventListener("input",t)}},Se=n=>{const t=new URLSearchParams(document.location.search),e=[t.get("t"),t.get("p")];let i,r=n;for(const o of e){const s=r.find(a=>a.name===o);if(!s)break;i=s,r=i.children??[]}if(!i)throw new Error("Could not find route.");return i.generator},Be=()=>{const n=document.getElementById("app");if(!n)throw new Error("Could not initialize app.");return n},O=(n=0,t=0)=>[n,t],v=(n=0,t=0,e=0)=>[n,t,e],u=(n=0,t=0,e=0,i=1)=>[n,t,e,i],I=n=>[].concat(...n),tn=(n,t)=>{const e=[];for(let i=0;i<Math.min(n.length,t.length);i++)e.push(n[i]+t[i]);return e},at=(n,t)=>{const e=[];for(let i=0;i<Math.min(n.length,t.length);i++)e.push(n[i]-t[i]);return e},ct=(n,t)=>{const e=[];for(let i=0;i<n.length;i++)e.push(t*n[i]);return e},Pn=(n,t)=>{let e=0;for(let i=0;i<Math.min(n.length,t.length);i++)e+=n[i]*t[i];return e},rt=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],Cn=n=>ct(n,1/lt(n)),lt=n=>Math.sqrt(Pn(n,n)),z={float32x2:new Float32Array(O()).byteLength,float32x3:new Float32Array(v()).byteLength,float32x4:new Float32Array(u()).byteLength},Ae=(n,t)=>{if(n.length!=t.length)return!1;for(let e=0;e<Math.min(n.length,t.length);e++)if(n[e]!=t[e])return!1;return!0},F=async n=>{navigator.gpu||window.alert("WebGPU is not enabled for this browser.");const e=await navigator.gpu.requestAdapter();if(!e)throw new Error("Could not initialize GPU adapter.");const i=await e.requestDevice(),r=document.getElementById(n);if(!r)throw new Error(`Could not find canvas with id ${n}`);const o=r.getContext("gpupresent")||r.getContext("webgpu");if(!o)throw new Error("Could not generate context for canvas.");const s=navigator.gpu.getPreferredCanvasFormat();return o.configure({device:i,format:s}),{adapter:e,device:i,canvas:r,canvasFormat:s,context:o}},V=(n,t,e={r:0,g:0,b:0,a:1})=>{const i=n.createCommandEncoder(),r=i.beginRenderPass({colorAttachments:[{view:t.getCurrentTexture().createView(),loadOp:"clear",clearValue:e,storeOp:"store"}]});return{pass:r,executePass:()=>{r.end(),n.queue.submit([i.finish()])}}},G=(n,t,e,i,r="triangle-list")=>{const o=n.createShaderModule({code:i});return n.createRenderPipeline({layout:"auto",vertex:{module:o,entryPoint:"main_vs",buffers:t},fragment:{module:o,entryPoint:"main_fs",targets:[{format:e}]},primitive:{topology:r}})},Q=(n,t,e,i=0,r=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const o=n.createBuffer({size:t.byteLength,usage:r}),s={arrayStride:z[e],attributes:[{format:e,offset:0,shaderLocation:i}]};return n.queue.writeBuffer(o,0,t),{bufferLayout:s,buffer:o}},Yn=(n,t,e=GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST)=>{const i=n.createBuffer({size:t.byteLength,usage:e});return n.queue.writeBuffer(i,0,t),{buffer:i}},D=(n,t,e,i=0)=>{const r=n.createBuffer({size:e.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),o=n.createBindGroup({layout:t.getBindGroupLayout(i),entries:[{binding:0,resource:{buffer:r}}]});return n.queue.writeBuffer(r,0,e),{bindGroup:o,uniformBuffer:r}},yn=(n,t,e,i=0)=>{const r=e.map(s=>{const a=n.createBuffer({size:s.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});return n.queue.writeBuffer(a,0,s),a}),o=n.createBindGroup({layout:t.getBindGroupLayout(i),entries:r.map((s,a)=>({binding:a,resource:{buffer:s}}))});return{storageBuffers:r,storageGroup:o}},Fn=(n,t,e,i,r=0)=>n.createBindGroup({layout:t.getBindGroupLayout(r),entries:[{binding:0,resource:i},{binding:1,resource:e.createView()}]}),Vn=(n,t,e,i,r)=>{const o=n.createTexture({size:[e,i,1],format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING});n.queue.writeTexture({texture:o},t,{offset:0,bytesPerRow:e*4,rowsPerImage:i},[e,i,1]);const s=n.createSampler({addressModeU:"repeat",addressModeV:"repeat",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",...r});return{texture:o,sampler:s}},$=(n,t,e,i,r)=>{if(r){const o=new Float32Array(i),s=new Float32Array(t.size-(i+e.byteLength));e=new Float32Array([...o,...e,...s])}n.queue.writeBuffer(t,i,e)},ht=(n,t,e,i,r)=>{if(r){const o=new Uint32Array(i),s=new Uint32Array(t.size-(i+e.byteLength));e=new Uint32Array([...o,...e,...s])}n.queue.writeBuffer(t,i,e)},Tn=(n=0,t=0,e=0,i=1)=>({r:n,g:t,b:e,a:i}),Nn=n=>v(n.r,n.g,n.b),X={black:Tn(0,0,0,1),white:Tn(1,1,1,1),blueScreenBlue:Tn(.1,.3,.6,1)},An=n=>{if(n[0]==="#"&&(n=n.substring(1)),n.length!==6)throw new Error("Can't handle color hexes of size other than 6.");const t=parseInt(n,16),e=(t>>16&255)/255,i=(t>>8&255)/255,r=(t&255)/255;return{r:e,g:i,b:r,a:1}},an=n=>n*Math.PI/180,un=(n,t,e,i,r)=>(n-t)/(e-t)*(r-i)+i,xn=(n,t)=>{const e=t/2;return[O(n[0]-e,n[1]-e),O(n[0]+e,n[1]-e),O(n[0]-e,n[1]+e),O(n[0]-e,n[1]+e),O(n[0]+e,n[1]-e),O(n[0]+e,n[1]+e)]},Oe=(n,t,e=12)=>{const i=[],r=2*Math.PI/e;for(let o=0;o<e;o++)i.push(n,tn(n,O(t*Math.cos(o*r),t*Math.sin(o*r))),tn(n,O(t*Math.cos((o+1)*r),t*Math.sin((o+1)*r))));return i},Xn=(n,t)=>{const e=t/2,i=[u(...tn(n,v(-e,-e,e)),1),u(...tn(n,v(-e,e,e)),1),u(...tn(n,v(e,e,e)),1),u(...tn(n,v(e,-e,e)),1),u(...tn(n,v(-e,-e,-e)),1),u(...tn(n,v(-e,e,-e)),1),u(...tn(n,v(e,e,-e)),1),u(...tn(n,v(e,-e,-e)),1)],r=new Uint32Array([0,1,1,2,2,3,3,0,2,3,3,7,7,6,6,2,0,3,3,7,7,4,4,0,1,2,2,6,6,5,5,1,4,5,5,6,6,7,7,4,0,1,1,5,5,4,4,0]),o=[u(1,0,3),u(3,2,1),u(2,3,7),u(7,6,2),u(3,0,4),u(4,7,3),u(6,5,1),u(1,2,6),u(4,5,6),u(6,7,4),u(5,4,0),u(0,1,5)];return{vertices:i,lineIndices:r,triangleIndices:o,normals:[],triangleCount:12}},Pe=n=>{const t=[u(...n[0],1),u(...n[1],1),u(...n[2],1)],e=[u(0,1,2,0)],i=[0,1,1,2,2,0];return{vertices:t,lineIndices:new Uint32Array(i),triangleIndices:e,triangleCount:1,normals:[]}},Gn=async n=>{const t=document.createElement("img");t.src=n,await t.decode();const e=document.createElement("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");if(!i)throw new Error("Could not get canvas context");i.drawImage(t,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),o=new Uint8Array(t.width*t.height*4);for(let s=0;s<t.height;++s)for(let a=0;a<t.width;++a)for(let c=0;c<4;++c)o[(s*t.width+a)*4+c]=r.data[((t.height-s-1)*t.width+a)*4+c];return{textureData:o,height:t.height,width:t.width}},Ce=(n,t)=>{const e=1/n,i=e/t;if(t<2)return[O()];const r=[];for(var o=0;o<t;++o)for(var s=0;s<t;++s)r.push(O((Math.random()+s)*i-e*.5,(Math.random()+o)*i-e*.5));return r},ft=(n,{})=>{let t=0;const e=[],i=[],r=n.mtls.reduce((s,a)=>({...s,...a.materials.reduce((c,l,h)=>({...c,[l.name]:h}),{})}),{});for(let s=0;s<n.objects.length;s++){const a=n.objects[s];t+=a.faces.length;for(let c=0;c<a.faces.length;c++){const l=a.faces[c];e.push(u(...l.vIndices,1)),i.push(r[l.materialName])}}return{vertices:n.vertices,normals:n.normals,triangleCount:t,triangleIndices:e,materialIndices:i}},Te=n=>({filename:n,mtls:[],objects:[],vertices:[],normals:[]}),ut=async(n,t=1,e=!1)=>{var l;const r=(l=(await fetch(n)).body)==null?void 0:l.getReader();if(!r)throw new Error("Could not get reader for obj file.");const o=Te(n),s=vt("_default");o.objects.push(s);const a={objDoc:o,currentObject:s,scale:t,currentMaterialName:"",filename:n,reverse:e};let c="";for(;;){const{value:h,done:f}=await r.read();if(f)break;const d=new TextDecoder("utf-8").decode(h,{stream:!0}).split(`
`);c!==""&&(d[0]=c+d[0],c=""),d[d.length-1]!==""&&(c=d.pop());for(const L of d)await Ee(L,a)}return o},Ee=async(n,t)=>{const e=dt(n),i=cn(e);if(i.length!==0)switch(i){case"#":return;case"mtllib":var r=ke(e,t.filename),o=$e();t.objDoc.mtls.push(o);const s=await fetch(r);if(!s.body)throw new Error("No MTL body to read.");await Ne(s.body.getReader(),o);return;case"o":case"g":const a=t.currentObject.numIndices===0?t.objDoc.objects.length-1:t.objDoc.objects.length,c=Fe(e);t.objDoc.objects[a]=c,t.currentObject=c;return;case"v":const l=Ve(e,t.scale);t.objDoc.vertices.push(l);return;case"vn":const h=Ge(e);t.objDoc.normals.push(h);return;case"usemtl":t.currentMaterialName=ze(e);return;case"f":const f=He(e,t.currentMaterialName);De(f,t.objDoc,t.reverse),Ue(t.currentObject,f);return}},ke=(n,t)=>{var e=t.lastIndexOf("/"),i="";return e>0&&(i=t.substring(0,e+1)),i+cn(n)},Fe=n=>{var t=cn(n);return vt(t)},Ve=(n,t)=>{var e=K(n)*t,i=K(n)*t,r=K(n)*t;return u(e,i,r,1)},Ge=n=>{var t=K(n),e=K(n),i=K(n);return u(t,e,i,0)},ze=n=>cn(n),He=(n,t)=>{const e=je(t);for(;;){const i=cn(n);if(i.length===0)break;const r=i.split("/");if(r.length>=1){const o=parseInt(r[0])-1;isNaN(o)||e.vIndices.push(o)}if(r.length>=3){const o=parseInt(r[2])-1;e.nIndices.push(o)}else e.nIndices.push(-1)}return e},De=(n,t,e)=>{var i=[t.vertices[n.vIndices[0]][0],t.vertices[n.vIndices[0]][1],t.vertices[n.vIndices[0]][2]],r=[t.vertices[n.vIndices[1]][0],t.vertices[n.vIndices[1]][1],t.vertices[n.vIndices[1]][2]],o=[t.vertices[n.vIndices[2]][0],t.vertices[n.vIndices[2]][1],t.vertices[n.vIndices[2]][2]],s=ot(i,r,o);if(s==null){if(n.vIndices.length>=4){var a=[t.vertices[n.vIndices[3]][0],t.vertices[n.vIndices[3]][1],t.vertices[n.vIndices[3]][2]];s=ot(r,o,a)}s==null&&(s=[0,1,0])}if(e&&(s[0]=-s[0],s[1]=-s[1],s[2]=-s[2]),n.normal=u(s[0],s[1],s[2],0),n.vIndices.length>3){for(var c=n.vIndices.length-2,l=new Array(c*3),h=new Array(c*3),f=0;f<c;f++)l[f*3+0]=n.vIndices[0],l[f*3+1]=n.vIndices[f+1],l[f*3+2]=n.vIndices[f+2],h[f*3+0]=n.nIndices[0],h[f*3+1]=n.nIndices[f+1],h[f*3+2]=n.nIndices[f+2];n.vIndices=l,n.nIndices=h}return n.numIndices=n.vIndices.length,n},Ne=async(n,t)=>{const e={material:_t("",u()),mtl:t};for(;;){const{value:i,done:r}=await n.read();if(r)break;const s=new TextDecoder("utf-8").decode(i,{stream:!0}).split(`
`);for(const a of s)qe(a,e)}t.complete=!0},qe=(n,t)=>{const e=dt(n),i=cn(e);if(i.length!==0)switch(i){case"#":return;case"newmtl":const r=Me(e);t.material=_t(r,u(.8,.8,.8,1)),t.mtl.materials.push(t.material);return;case"Kd":t.material&&(t.material.color=qn(e));return;case"Ka":t.material&&(t.material.emission=qn(e));return;case"Ks":t.material&&(t.material.specular=qn(e));return;case"Ni":t.material&&(t.material.ior=K(e));return;case"Ns":t.material&&(t.material.shininess=K(e));return;case"illum":t.material&&(t.material.illum=Xe(e));return}},$e=()=>({complete:!1,materials:[]}),Me=n=>cn(n),qn=n=>{var t=K(n),e=K(n),i=K(n);return u(t,e,i,1)},_t=(n,t)=>({name:n,color:t,illum:0,shininess:0,ior:1,specular:u(),emission:u()}),vt=n=>({name:n,faces:[],numIndices:0}),Ue=(n,t)=>{n.faces.push(t),n.numIndices+=t.numIndices},je=(n="")=>({materialName:n,vIndices:[],nIndices:[],normal:u(1),numIndices:0}),dt=n=>({str:n,index:0}),Ye=n=>{let t;const e=n.str.length;for(t=n.index;t<e;t++){const i=n.str.charAt(t);if(!(i=="	"||i==" "||i=="("||i==")"||i=='"'))break}n.index=t},cn=n=>{Ye(n);const t=Ze(n.str,n.index);if(t===0)return"";const e=n.str.substring(n.index,n.index+t);return n.index+=t+1,e},Xe=n=>parseInt(cn(n)),K=n=>parseFloat(cn(n)),Ze=(n,t)=>{let e;for(e=t;e<n.length;e++){var i=n.charAt(e);if(i=="	"||i==" "||i=="("||i==")"||i=='"')break}return e-t},ot=(n,t,e)=>{for(var i=new Float32Array(3),r=new Float32Array(3),o=0;o<3;o++)i[o]=n[o]-t[o],r[o]=e[o]-t[o];var s=Array(3);s[0]=i[1]*r[2]-i[2]*r[1],s[1]=i[2]*r[0]-i[0]*r[2],s[2]=i[0]*r[1]-i[1]*r[0];var a=s[0],c=s[1],l=s[2],h=Math.sqrt(a*a+c*c+l*l);if(h){if(h==1)return s}else return s[0]=0,s[1]=0,s[2]=0,s;return h=1/h,s[0]=a*h,s[1]=c*h,s[2]=l*h,s},pn=(n=0,t=0,e=0,i=0,r=0,o=0,s=0,a=0,c=0,l=0,h=0,f=0,_=0,d=0,b=0,p=0)=>[[n,t,e,i],[r,o,s,a],[c,l,h,f],[_,d,b,p]],q=()=>pn(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),In=n=>[].concat(...Ke(n)),$n=n=>[].concat(...n.map(t=>In(t))),Zn=(n,t,e)=>{if(Ae(n,t))return q();let i=Cn(at(t,n));const r=Cn(rt(i,e)),o=Cn(rt(r,i));return i=ct(i,-1),pn(...u(...r,-Pn(r,n)),...u(...o,-Pn(o,n)),...u(...i,-Pn(i,n)),...u())},We=(n,t,e,i,r,o)=>{if(n===t)throw"ortho(): left and right are equal";if(e===i)throw"ortho(): bottom and top are equal";if(r===o)throw"ortho(): near and far are equal";const s=t-n,a=i-e,c=o-r,l=q();return l[0][0]=2/s,l[1][1]=2/a,l[2][2]=-2/c,l[0][3]=-(n+t)/s,l[1][3]=-(i+e)/a,l[2][3]=-(r+o)/c,l},gt=(n,t,e,i)=>{const r=1/Math.tan(an(n)/2),o=i-e,s=q();return s[0][0]=r/t,s[1][1]=r,s[2][2]=-(e+i)/o,s[2][3]=-2*e*i/o,s[3][2]=-1,s[3][3]=0,s},En=(n,t)=>{const e=Cn(t),i=e[0],r=e[1],o=e[2],s=Math.cos(an(n)),a=Math.sin(an(n)),c=1-s;return pn(...u(i*i*c+s,i*r*c-o*a,i*o*c+r*a,0),...u(i*r*c+o*a,r*r*c+s,r*o*c-i*a,0),...u(i*o*c-r*a,r*o*c+i*a,o*o*c+s,0),...u())},On=n=>{var t=Math.cos(an(n)),e=Math.sin(an(n)),i=pn(1,0,0,0,0,t,-e,0,0,e,t,0,0,0,0,1);return i},st=n=>{var t=Math.cos(an(n)),e=Math.sin(an(n)),i=pn(t,0,e,0,0,1,0,0,-e,0,t,0,0,0,0,1);return i},Je=n=>{var t=Math.cos(an(n)),e=Math.sin(an(n)),i=pn(t,-e,0,0,e,t,0,0,0,0,1,0,0,0,0,1);return i},H=({[0]:n,[1]:t,[2]:e})=>{const i=q();return i[0][3]=n,i[1][3]=t,i[2][3]=e,i},Y=(n=1,t=1,e=1)=>{var i=q();return i[0][0]=n,i[1][1]=t,i[2][2]=e,i},g=(n,t)=>{const e=[];for(let i=0;i<n.length;i++){e.push([]);for(let r=0;r<t.length;r++){let o=0;for(let s=0;s<n.length;s++)o+=n[i][s]*t[s][r];e[i].push(o)}}return e},Ke=n=>{for(var t=[],e=0;e<n.length;++e){t.push([]);for(var i=0;i<n[e].length;++i)t[e].push(n[i][e])}return t},Wn=pn(1,0,0,0,0,1,0,0,0,0,-.5,.5,0,0,0,1),Qe=`@vertex
fn main_vs(@location(0) pos : vec2f) -> @builtin(position) vec4f
{
    return vec4f(pos, 0, 1);
}
@fragment
fn main_fs() -> @location(0) vec4f
{
    return vec4f(0.0, 0.0, 0.0, 1.0);
}
`,ni=async()=>{const{device:n,canvas:t,context:e,canvasFormat:i}=await F("task1"),{pass:r,executePass:o}=V(n,e,{r:.3921,g:.5843,b:.9294,a:1}),s=[].concat(I(xn([0,0],10*(2/t.height))),I(xn([1,0],10*(2/t.height))),I(xn([1,1],10*(2/t.height)))),a=new Float32Array(s),{buffer:c,bufferLayout:l}=Q(n,a,"float32x2"),h=G(n,[l],i,Qe);r.setPipeline(h),r.setVertexBuffer(0,c),r.draw(s.length/2),o()},ti=(n,t)=>{const e=E("The three pixeleers"),i=T("This is a test description."),r=k("task1");n.append(e,i,r),t.push(ni)},ei=`struct VSOut {
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
`,ii=async()=>{const{device:n,context:t,canvasFormat:e}=await F("task2"),{pass:i,executePass:r}=V(n,t,{r:.3921,g:.5843,b:.9294,a:1}),o=[O(0,0),O(1,0),O(1,1)],s=[v(1,0,0),v(0,1,0),v(0,0,1)],a=new Float32Array(I(o)),c=new Float32Array(I(s)),{buffer:l,bufferLayout:h}=Q(n,a,"float32x2"),{buffer:f,bufferLayout:_}=Q(n,c,"float32x3",1),d=G(n,[h,_],e,ei);i.setPipeline(d),i.setVertexBuffer(0,l),i.setVertexBuffer(1,f),i.draw(o.length),r()},ri=(n,t)=>{const e=E("Triangles all the way down."),i=T("This is a test description."),r=k("task2");n.append(e,i,r),t.push(ii)},oi=`struct Time {
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
`,si=async()=>{const{device:n,context:t,canvasFormat:e}=await F("task3"),i=xn(O(0,0),1),r=new Float32Array(I(i)),{bufferLayout:o,buffer:s}=Q(n,r,"float32x2"),a=G(n,[o],e,oi),{bindGroup:c,uniformBuffer:l}=D(n,a,new Float32Array(1)),h=f=>{$(n,l,new Float32Array([f/1e3]),0);const{pass:_,executePass:d}=V(n,t,{r:.3921,g:.5843,b:.9294,a:1});_.setPipeline(a),_.setVertexBuffer(0,s),_.setBindGroup(0,c),_.draw(i.length),d(),requestAnimationFrame(h)};requestAnimationFrame(h)},ai=(n,t)=>{const e=E("Spin me right round"),i=T("This is a test description."),r=k("task3");n.append(e,i,r),t.push(si)},ci=`struct Time {
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
`,li=async()=>{const{device:n,context:t,canvasFormat:e}=await F("task4"),i=xn(O(0,0),2),r=new Float32Array(I(i)),o=w("ball-height"),s=w("ball-size"),a=w("ball-speed"),{bufferLayout:c,buffer:l}=Q(n,r,"float32x2"),h=G(n,[c],e,ci),{bindGroup:f,uniformBuffer:_}=D(n,h,new Float32Array([0])),{bindGroup:d,uniformBuffer:b}=D(n,h,new Float32Array(3),1),p=L=>{$(n,_,new Float32Array([L/1e3]),0),$(n,b,new Float32Array([o(),a(),s()]),0);const{pass:P,executePass:y}=V(n,t,X.blueScreenBlue);P.setPipeline(h),P.setVertexBuffer(0,l),P.setBindGroup(0,f),P.setBindGroup(1,d),P.draw(i.length),y(),requestAnimationFrame(p)};requestAnimationFrame(p)},hi=(n,t)=>{const e=E("Nokia memories"),i=T("This is a test description."),r=U(),o=k("task4"),s=M(),a=m(S("ball-height",.3,.1,.9,.1),"Ball bounce height"),c=m(S("ball-speed",4,1,16),"Ball bounce speed"),l=m(S("ball-size",1.05,1.01,1.5,.01),"Ball size");s.append(a,c,l),r.append(o,s),n.append(e,i,r),t.push(li)},pt=(n,t)=>{ti(n,t),ri(n,t),ai(n,t),hi(n,t)},fi=`struct VSOut {
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
`,Mn="drawing",mt="drawing-mode",ui=["POINT","TRIANGLE","CIRCLE"],bt="points-color",xt="drawing-background-color",yt="granularity-slider",wt="size-slider",Lt="clear",_i=async()=>{const{device:n,canvas:t,context:e,canvasFormat:i}=await F(Mn);let r=gn(xt,R=>{r=R,N()});const o=w(bt),s=w(mt),a=w(yt),c=w(wt),l=1e3,h=new Float32Array(6*l*z.float32x2),{buffer:f,bufferLayout:_}=Q(n,h,"float32x2"),d=new Float32Array(6*l*z.float32x3),{buffer:b,bufferLayout:p}=Q(n,d,"float32x3",1),L=G(n,[_,p],i,fi,"triangle-list");Ie(Mn,R=>{switch(s()){case"TRIANGLE":en(R);break;case"CIRCLE":_n(R);break;default:case"POINT":Z(),B(R);break}N()});let y=0,x=0;const B=({x:R,y:j})=>{const rn=un(R,0,t.width,-1,1),nn=-1*un(j,0,t.height,-1,1),W=xn(O(rn,nn),c()/t.height),hn=new Float32Array(I(W));n.queue.writeBuffer(f,y,hn),y+=6*z.float32x2;const fn=Array(6).fill(Nn(An(o()))),Ln=new Float32Array(I(fn));n.queue.writeBuffer(b,x,Ln),x+=6*z.float32x3};let A=[],C=[];const Z=()=>{A=[],C=[]},en=R=>{if(A.push(R),C.push(o()),C.length<3){B(R);return}const j=new Float32Array([].concat(...A.map(({x:nn,y:W})=>{const hn=un(nn,0,t.width,-1,1),fn=-1*un(W,0,t.height,-1,1);return O(hn,fn)}),I(Array(9).fill(O()))));n.queue.writeBuffer(f,y-2*6*z.float32x2,j),y+=z.float32x2*(3-2*6);const rn=new Float32Array([].concat(...I(C.map(nn=>Nn(An(nn)))),I(Array(9).fill(v()))));n.queue.writeBuffer(b,x-2*6*z.float32x3,rn),x+=z.float32x3*(3-2*6),Z()},_n=R=>{if(A.push(R),C.push(o()),A.length<2){B(R);return}const j=O(un(A[0].x,0,t.width,-1,1),-1*un(A[0].y,0,t.height,-1,1)),rn=O(un(A[1].x,0,t.width,-1,1),-1*un(A[1].y,0,t.height,-1,1)),nn=lt(at(rn,j)),W=Oe(j,nn,a()),hn=new Float32Array(I(W));n.queue.writeBuffer(f,y-6*z.float32x2,hn),y+=z.float32x2*(W.length-6);const fn=new Float32Array(I([...new Array(W.length)].map((Ln,zn)=>{const Hn=zn%3===0?0:1;return Nn(An(C[Hn]))})));n.queue.writeBuffer(b,x-6*z.float32x3,fn),x+=z.float32x3*(W.length-6),Z()},N=()=>{const{pass:R,executePass:j}=V(n,e,An(r));R.setPipeline(L),R.setVertexBuffer(0,f),R.setVertexBuffer(1,b),R.draw(6*l),j()};Le(Lt,()=>{n.queue.writeBuffer(f,0,new Float32Array(6*l*z.float32x2)),n.queue.writeBuffer(b,0,new Float32Array(6*l*z.float32x3)),N()}),N()},It=(n,t)=>{const e=E("A simple GPU-based drawing program"),i=T("No description yet"),r=U(),o=k(Mn),s=M(),a=sn(mt,ui),c=m(it(bt,"#000000"),"Draw color"),l=m(it(xt,"#ffffff"),"Background color"),h=m(S(wt,10,2,100),"Point size"),f=m(S(yt,12,4,32),"Circle granularity"),_=we(Lt,"Clear canvas");s.append(a,c,h,f,l,_),r.append(o,s),n.append(e,i,r),t.push(_i)},vi=`struct Uniforms {
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
`,Rt="wireframe",St="wireframe-rotation-slider",di=async()=>{const{device:n,context:t,canvasFormat:e}=await F(Rt),i=Xn(v(0),1),r=i.lineIndices,o=new Float32Array(I(i.vertices)),{buffer:s}=Yn(n,r),{buffer:a,bufferLayout:c}=Q(n,o,"float32x4"),l=G(n,[c],e,vi,"line-list"),{bindGroup:h,uniformBuffer:f}=D(n,l,new Float32Array(In(q())),0),_=H(v(.5,.5,.5)),d=v(0,0,10),b=v(0),p=v(0,1,0),L=Zn(d,b,p),P=We(-1.5,1.5,-1.5,1.5,0,100),y=g(Wn,P),x=g(y,L),B=C=>{const Z=En(C,v(1,1,1)),en=g(Z,_),_n=g(x,en);$(n,f,new Float32Array(In(_n)),0);const{pass:N,executePass:wn}=V(n,t,X.black);N.setPipeline(l),N.setVertexBuffer(0,a),N.setIndexBuffer(s,"uint32"),N.setBindGroup(0,h),N.drawIndexed(r.length),wn()},A=gn(St,B);B(A)},gi=(n,t)=>{const e=E("Projecting a cube"),i=T("No description yet"),r=U(),o=k(Rt),s=M(),a=m(S(St,45,0,360),"Rotation about (1, 1, 1)");s.append(a),r.append(o,s),n.append(e,i,r),t.push(di)},pi=`struct Uniforms {
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
`,Bt="perspective",mi=async()=>{const{device:n,context:t,canvasFormat:e,canvas:i}=await F(Bt),r=Xn(v(0),1),o=new Float32Array(I(r.vertices)),s=r.lineIndices,{buffer:a}=Yn(n,s),{buffer:c,bufferLayout:l}=Q(n,o,"float32x4"),{buffer:h,bufferLayout:f}=Q(n,new Float32Array(I([u(.5,.5,.5,1),u(0,0,1,1),u(0,1,0,1),u(0,1,1,1),u(1,0,1,1),u(1,0,0,1),u(1,1,0,1),u(1,1,1,1)])),"float32x4",1),_=G(n,[l,f],e,pi,"line-list"),d=v(0,0,5),b=v(0),p=v(0,1,0),L=Zn(d,b,p),P=gt(45,i.width/i.height,.1,100),y=g(Wn,P),x=g(y,L),B=g(En(0,v(1,1,1)),H(v(-2))),A=g(En(45,v(0,1,0)),H(v(0))),C=g(H(v(2)),En(45,v(1,1,0))),Z=g(x,B),en=g(x,A),_n=g(x,C),{bindGroup:N}=D(n,_,new Float32Array($n([Z,en,_n])),0);(()=>{const{pass:R,executePass:j}=V(n,t,X.black);R.setPipeline(_),R.setVertexBuffer(0,c),R.setVertexBuffer(1,h),R.setIndexBuffer(a,"uint32"),R.setBindGroup(0,N),R.drawIndexed(s.length,3),j()})()},bi=(n,t)=>{const e=E("Different perspectives"),i=T("No description yet"),r=U(),o=k(Bt,1028-128),s=M();r.append(o,s),n.append(e,i,r),t.push(mi)},xi=`struct Uniforms {
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
`,At="airplane",Ot="yaw-slider-airplane",Pt="pitch-slider-airplane",Ct="roll-slider-airplane",yi=async()=>{const{device:n,context:t,canvasFormat:e,canvas:i}=await F(At),r=w(Ot),o=w(Pt),s=w(Ct),a=Xn(v(0),1),c=a.lineIndices,l=new Float32Array(I(a.vertices)),{buffer:h}=Yn(n,c),{buffer:f,bufferLayout:_}=Q(n,l,"float32x4"),d=G(n,[_],e,xi,"line-list"),b=v(5,5,5),p=v(0),L=v(0,1,0),P=Zn(b,p,L),y=gt(35,i.width/i.height,.1,100),x=g(Wn,y),{bindGroup:B,uniformBuffer:A}=D(n,d,new Float32Array([0,0,0,0,...In(P),...In(x)]),0),C=[],Z=Y(.4,.4,2),en=g(Y(.35,.25,.35),H(v(0,-.2,3.3))),_n=g(Y(1.7,.2,1.1),H(v(.6))),N=g(Y(1.7,.2,1.1),H(v(-.6))),wn=g(Y(.2,.5,.3),H(v(0,.5,-3.3))),R=g(Y(.5,.1,.2),H(v(-.9,.4,-4.3))),j=g(Y(.5,.1,.2),H(v(.9,.4,-4.3))),rn=[Z,en,_n,N,wn,R,j];C.push(...new Array(rn.length).fill(u(.7,.7,.7)));const nn=(J=q())=>g(g(Y(.1,.3,.2),J),H(v(0,.5,-6)));C.push(u(0,1,0));const W=(J=q())=>g(g(Y(.25,.05,.2),J),H(v(2,.4,-5.3))),hn=(J=q())=>g(g(Y(.25,.05,.2),J),H(v(-2,.4,-5.3)));C.push(u(1,0,0),u(1,0,0));const fn=(J=q())=>g(g(H(v(-1,.1,-.5)),J),Y(1,.1,.3)),Ln=(J=q())=>g(g(H(v(1,.1,-.5)),J),Y(1,.1,.3));C.push(u(.4,.4,1),u(.4,.4,1));const zn=[...rn,nn(),W(),hn(),fn(),Ln()],{storageGroup:Hn,storageBuffers:ue}=yn(n,d,[new Float32Array($n(zn)),new Float32Array(I(C))],1);let Jn=0,Kn=0,Qn=0,Sn=0,Bn=0,vn=0;const mn=.1,nt=J=>{$(n,A,new Float32Array([J]),0);const _e=1*r();Sn=Sn*(1-mn)+_e*mn,Jn+=Sn;const ve=1*o();Bn=Bn*(1-mn)+ve*mn,Kn+=Bn;const de=1*s();vn=vn*(1-mn)+de*mn,Qn+=vn;const ge=st(-Sn*20),tt=On(-Bn*20),pe=vn>0?On(vn*60):q(),me=vn<0?On(-vn*60):q(),dn=g(g(On(Kn),st(Jn)),Je(Qn)),et=[...rn.map(Dn=>g(dn,Dn)),g(dn,nn(ge)),g(dn,W(tt)),g(dn,hn(tt)),g(dn,fn(pe)),g(dn,Ln(me))],be=et.map(Dn=>g(dn,Dn));$(n,ue[0],new Float32Array($n(be)),0);const{pass:bn,executePass:xe}=V(n,t,X.black);bn.setPipeline(d),bn.setVertexBuffer(0,f),bn.setIndexBuffer(h,"uint32"),bn.setBindGroup(0,B),bn.setBindGroup(1,Hn),bn.drawIndexed(c.length,et.length),xe(),requestAnimationFrame(nt)};requestAnimationFrame(nt)},wi=(n,t)=>{const e=E("About Gimbal's lock"),i=T("No description yet"),r=U(),o=k(At),s=M(),a=m(S(Ot,0,-1,1,.1),"Green rudder control (yaw)"),c=m(S(Pt,0,-1,1,.1),"Red elevators control (pitch)"),l=m(S(Ct,0,-.5,.5,.1),"Blue ailerons control (roll)");s.append(a,c,l),r.append(o,s),n.append(e,i,r),t.push(yi)},Tt=(n,t)=>{gi(n,t),bi(n,t),wi(n,t)},Li=(n,t)=>{pt(n,t),It(n,t),Tt(n,t)},Ii={name:"graphics",generator:Li,children:[{name:"01-webgpu-basics",generator:pt},{name:"02-drawing-with-shaders",generator:It},{name:"03-projection",generator:Tt}]},Ri=`struct Ray {
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
`,Et="raycast-anatomy",Si=async()=>{const{device:n,context:t,canvasFormat:e}=await F(Et),i=G(n,[],e,Ri,"triangle-strip"),{pass:r,executePass:o}=V(n,t,X.black);r.setPipeline(i),r.draw(4),o()},Bi=(n,t)=>{const e=E("The anatomy of a ray cast"),i=T("No description yet"),r=k(Et);n.append(e,i,r),t.push(Si)},Ai=`struct ViewboxOptions {
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
`,kt="light",Ft="zoom",Vt="light-intensity-slider",Gt="light-position-x-input",zt="light-position-y-input",Ht="light-position-z-input",Dt="shade-all-visible-objects",Nt="refractive-index-slider",Oi=async()=>{const{device:n,context:t,canvas:e,canvasFormat:i}=await F(kt),r=w(Ft),o=w(Vt),s=w(Nt),a=w(Gt),c=w(zt),l=w(Ht),h=w(Dt,"checked"),f=e.width/e.height,_=G(n,[],i,Ai,"triangle-strip"),{bindGroup:d,uniformBuffer:b}=D(n,_,new Float32Array([r(),f])),p=new Float32Array([a(),c(),l(),o(),h()?1:0,s(),0,0]),{bindGroup:L,uniformBuffer:P}=D(n,_,p,1),y=()=>{$(n,b,new Float32Array([r(),f]),0),$(n,P,new Float32Array([a(),c(),l(),o(),h()?1:0,s(),0,0]),0);const{pass:x,executePass:B}=V(n,t,X.black);x.setPipeline(_),x.setBindGroup(0,d),x.setBindGroup(1,L),x.draw(4),B(),requestAnimationFrame(y)};requestAnimationFrame(y)},Pi=(n,t)=>{const e=E("A simple lighting system"),i=T("No description yet"),r=U(),o=k(kt,512+128,512-64),s=M(),a=m(S(Ft,1,.1,10,.1),"Zoom (camera constant)"),c=m(S(Vt,3.14,0,10,.01),"Light intensity"),l=m(S(Nt,1,-1,10,.1),"Diffuse reflectance"),h=m(S(Gt,0,-5,5,.1),"Light X position"),f=m(S(zt,1,0,5,.1),"Light Y position"),_=m(S(Ht,0,-5,5,.1),"Light Z position"),d=m(ye(Dt,!0),"Shading on",!1);s.append(a,c,l,h,f,_,d),r.append(o,s),n.append(e,i,r),t.push(Oi)},qt=(n,t)=>{Bi(n,t),Pi(n,t)},Ci=`struct ViewboxOptions {
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
`,Rn="lighting",$t=Rn+"-light-position-x-input",Mt=Rn+"-light-position-y-input",Ut=Rn+"-light-position-z-input",Ti=async()=>{const{device:n,context:t,canvas:e,canvasFormat:i}=await F(Rn),r=w($t),o=w(Mt),s=w(Ut),a=e.width/e.height,c=G(n,[],i,Ci,"triangle-strip"),l=new Float32Array([a]),{bindGroup:h}=D(n,c,l),f=new Float32Array([r(),o(),s(),0,0,0,0,0,0]),{bindGroup:_,uniformBuffer:d}=D(n,c,f,1),b=()=>{$(n,d,new Float32Array([r(),o(),s(),0,0,0,0,0,0]),0);const{pass:p,executePass:L}=V(n,t,X.black);p.setPipeline(c),p.setBindGroup(0,h),p.setBindGroup(1,_),p.draw(4),L(),requestAnimationFrame(b)};requestAnimationFrame(b)},Ei=(n,t)=>{const e=E("A simple lighting system"),i=T("No description yet"),r=U(),o=k(Rn,512+128,512-64),s=M(),a=m(S($t,0,-5,5,.1),"Light X position"),c=m(S(Mt,1,0,5,.1),"Light Y position"),l=m(S(Ut,0,-5,5,.1),"Light Z position");s.append(a,c,l),r.append(o,s),n.append(e,i,r),t.push(Ti)},ki=`struct Environment {
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
`,ln="mirrors",on={"Base color":0,Lambertian:1,Mirror:2,Refractive:3,Phong:4,Glossy:5},jt=ln+"-sphere-shader",Yt=ln+"-triangle-shader",Xt=ln+"-plane-shader",Zt=ln+"-light-position-x-input",Wt=ln+"-light-position-y-input",Jt=ln+"-light-position-z-input",Kt=ln+"-animation-slider",Fi=async()=>{const{device:n,context:t,canvas:e,canvasFormat:i}=await F(ln),r=w(Zt),o=w(Wt),s=w(Jt),a=w(jt),c=w(Yt),l=w(Xt),h=w(Kt),f=e.width/e.height,_=G(n,[],i,ki,"triangle-strip"),d=new Float32Array([f,0]),{bindGroup:b,uniformBuffer:p}=D(n,_,d),L=new Float32Array([r(),o(),s(),on[a()],on[c()],on[l()],0,0,0]),{bindGroup:P,uniformBuffer:y}=D(n,_,L,1),x=B=>{$(n,p,new Float32Array([f,B*h()/512]),0),$(n,y,new Float32Array([r(),o(),s(),on[a()],on[c()],on[l()],0,0,0]),0);const{pass:A,executePass:C}=V(n,t,X.black);A.setPipeline(_),A.setBindGroup(0,b),A.setBindGroup(1,P),A.draw(4),C(),requestAnimationFrame(x)};requestAnimationFrame(x)},Vi=(n,t)=>{const e=E("Mirrors"),i=T("No description yet"),r=U(),o=k(ln,512+128,512-64),s=M(),a=m(sn(jt,Object.keys(on),"Refractive"),"Sphere shader type",!1),c=m(sn(Yt,Object.keys(on),"Lambertian"),"Triangle shader type",!1),l=m(sn(Xt,Object.keys(on),"Lambertian"),"Plane shader type",!1),h=m(S(Zt,0,-5,5,.1),"Light X position"),f=m(S(Wt,1,0,5,.1),"Light Y position"),_=m(S(Jt,0,-5,5,.1),"Light Z position"),d=m(S(Kt,0,0,1,.1),"Orbit animation speed");s.append(a,c,l,h,f,_,d),r.append(o,s),n.append(e,i,r),t.push(Fi)},Qt=(n,t)=>{Ei(n,t),Vi(n,t)},Gi=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,ne="texture",te="texture-repeat-style",zi=["clamp-to-edge","repeat","mirror-repeat"],Hi=async()=>{const{device:n,context:t,canvasFormat:e}=await F(ne),i=async r=>{const o=G(n,[],e,Gi,"triangle-strip"),{textureData:s,height:a,width:c}=await Gn("textures/grass_minecraft.png"),{texture:l,sampler:h}=Vn(n,s,c,a,{addressModeU:r,addressModeV:r}),f=Fn(n,o,l,h),{pass:_,executePass:d}=V(n,t,X.black);_.setPipeline(o),_.setBindGroup(0,f),_.draw(4),d()};i(gn(te,i))},Di=(n,t)=>{const e=E("What is a texture"),i=T("No description yet"),r=U(),o=k(ne),s=M(),a=m(sn(te,zi,"repeat"),"Texture edge behavior",!1);s.append(a),r.append(o,s),n.append(e,i,r),t.push(Hi)},Ni=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,ee="texturing",Un="grass-texture-scale",kn="subdivision-jitter-slider",jn="grass-texture-select",ie="texture-repeat-style-on-plane",qi=["clamp-to-edge","repeat","mirror-repeat"],$i=async()=>{const{device:n,canvas:t,context:e,canvasFormat:i}=await F(ee),r=w(Un),o=w(kn),s=w(jn),a=G(n,[],i,Ni,"triangle-strip");let c,l;const h=async y=>{const x=[Gn("textures/grass.jpg"),Gn("textures/grass_minecraft.png")],B=await Promise.all(x),{texture:A,sampler:C}=Vn(n,B[0].textureData,B[0].width,B[0].height,{addressModeU:y,addressModeV:y}),{texture:Z,sampler:en}=Vn(n,B[1].textureData,B[1].width,B[1].height,{addressModeU:y,addressModeV:y});c=Fn(n,a,A,C),l=Fn(n,a,Z,en)};await h("repeat");const{bindGroup:f,uniformBuffer:_}=D(n,a,new Float32Array([r(),o()*o()]),1),{storageGroup:d,storageBuffers:[b]}=yn(n,a,[new Float32Array(200)],2),p=()=>{$(n,_,new Float32Array([r(),o()*o()]),0);const y={"grass.jpg":c,"grass_minecraft.png":l}[s()],{pass:x,executePass:B}=V(n,e,X.black);x.setPipeline(a),x.setBindGroup(0,y),x.setBindGroup(1,f),x.setBindGroup(2,d),x.draw(4),B()},L=y=>{const x=Ce(t.height,y);$(n,b,new Float32Array(I(x)),0,0)},P=gn(kn,L);L(P),Re([Un,jn,kn],p),gn(ie,async y=>{await h(y),p()}),p()},Mi=(n,t)=>{const e=E("Applying textures in rendering"),i=T("No description yet"),r=U(),o=k(ee),s=M(),a=m(S(Un,.2,.1,2,.1),"Texture scale"),c=m(S(kn,1,1,10,1),"Subdivisions for stratisfied jitter"),l=m(sn(jn,["grass.jpg","grass_minecraft.png"],"grass_minecraft.png"),"Grass texture",!1),h=m(sn(ie,qi,"repeat"),"Texture edge behavior",!1);s.append(l,a,h,c),r.append(o,s),n.append(e,i,r),t.push($i)},re=(n,t)=>{Di(n,t),Mi(n,t)},Ui=`@group(0) @binding(0) var texture_sampler : sampler;
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
`,oe="default-scene-as-meshes",ji=async()=>{const{device:n,context:t,canvasFormat:e}=await F(oe),i=G(n,[],e,Ui,"triangle-strip"),r=Pe([v(-.2,.1,.9),v(.2,.1,.9),v(-.2,.1,-.1)]),{storageGroup:o}=yn(n,i,[new Float32Array(I(r.vertices)),new Uint32Array(I(r.triangleIndices))],1),s=await Gn("textures/grass_minecraft.png"),{texture:a,sampler:c}=Vn(n,s.textureData,s.width,s.height,{addressModeU:"repeat",addressModeV:"repeat"}),l=Fn(n,i,a,c);(()=>{const{pass:f,executePass:_}=V(n,t,X.black);f.setPipeline(i),f.setBindGroup(0,l),f.setBindGroup(1,o),f.draw(4),_()})()},Yi=(n,t)=>{const e=E("Replacing the triangle with a triangle"),i=T("No description yet"),r=U(),o=k(oe),s=M();r.append(o,s),n.append(e,i,r),t.push(ji)},Xi=`@group(0) @binding(0) var<storage> ut_vertices : array<vec3f>;
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
`,se="utah-teapot",Zi=["Flat","Vertex normals"],ae="shading-select-ut",Wi=async()=>{const{device:n,context:t,canvasFormat:e}=await F(se),i=G(n,[],e,Xi,"triangle-strip"),r=await ut("models/teapot.obj"),o=ft(r,{}),{storageGroup:s}=yn(n,i,[new Float32Array(I(o.vertices)),new Uint32Array(I(o.triangleIndices)),new Float32Array(I(o.normals))],0),{bindGroup:a,uniformBuffer:c}=D(n,i,new Uint32Array([o.triangleCount,0]),1),l=f=>{const _={Flat:0,"Vertex normals":1};ht(n,c,new Uint32Array([_[f]]),4);const{pass:d,executePass:b}=V(n,t,Tn(.8,.4,.4,1));d.setPipeline(i),d.setBindGroup(0,s),d.setBindGroup(1,a),d.draw(4),b()},h=gn(ae,l);l(h)},Ji=(n,t)=>{const e=E("Introducing the Utah Teapot"),i=T("No description yet"),r=U(),o=k(se,840,450),s=M(),a=m(sn(ae,Zi,"Flat"),"Shading type",!1);s.append(a),r.append(o,s),n.append(e,i,r),t.push(Wi)},Ki=`@group(0) @binding(0) var<storage> cb_vertices : array<vec3f>;
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


fn sample_point_light(pos : vec3f, light_position : vec3f, emission : vec4f) -> Light {
    var direction = light_position - pos;
    var dist = length(direction);
    var incident_light = emission.rgb / (dist * dist);

    var light = Light(vec3f(incident_light), direction, dist);

    return light;
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
    var center_light_position = vec3f(0.);
    var avg_emission = vec4f();
    for (var i : u32 = 0; i < cb_meta.light_indices_count; i++)
    {
        var face_index = cb_light_faces[i];

        var vertex_lookup = cb_triangles[face_index];
        center_light_position += cb_vertices[vertex_lookup.x] + cb_vertices[vertex_lookup.y] + cb_vertices[vertex_lookup.z];

        var mat = materials[cb_mat_indices[face_index]];
        avg_emission += mat.emission;
    }
    center_light_position /= f32(cb_meta.light_indices_count * 3);
    avg_emission /= f32(cb_meta.light_indices_count);
    avg_emission = 6 * vec4f(27.6, 23.4, 12., 0.);

    var light_info = sample_point_light((*hit).position, center_light_position, avg_emission);
    var lambertian_light = (*hit).diffuse / 3.14 * light_info.L_i * dot((*hit).normal, light_info.w_i);

    var is_occluded = check_occulusion((*hit).position, center_light_position);
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
`,ce="cornell-box",Qi=["Flat","Lambertian"],le="shading-select-cb",nr=async()=>{const{device:n,context:t,canvasFormat:e}=await F(ce),i=G(n,[],e,Ki,"triangle-strip"),r=await ut("models/CornellBoxWithBlocks.obj"),o=ft(r,{}),s=new Float32Array(r.mtls[0].materials.reduce((b,p)=>[...b,...I([p.color,p.specular,p.emission,u(p.illum,p.shininess,p.ior)])],[])),a=o.materialIndices.reduce((b,p,L)=>(r.mtls[0].materials[p].illum>=1&&b.push(L),b),[]),{storageGroup:c}=yn(n,i,[new Float32Array(I(o.vertices)),new Uint32Array(I(o.triangleIndices)),new Uint32Array(o.materialIndices),new Uint32Array(a)],0),{bindGroup:l,uniformBuffer:h}=D(n,i,new Uint32Array([o.triangleCount,a.length,0]),1),{storageGroup:f}=yn(n,i,[s],2),_=b=>{const p={Flat:0,Lambertian:1}[b];ht(n,h,new Uint32Array([p]),2*4);const{pass:L,executePass:P}=V(n,t,X.black);L.setPipeline(i),L.setBindGroup(0,c),L.setBindGroup(1,l),L.setBindGroup(2,f),L.draw(4),P()},d=gn(le,_);_(d)},tr=(n,t)=>{const e=E("Inside the Cornell box"),i=T("No description yet"),r=U(),o=k(ce),s=M(),a=m(sn(le,Qi,"Flat"),"Shading type",!1);s.append(a),r.append(o,s),n.append(e,i,r),t.push(nr)},he=(n,t)=>{Yi(n,t),Ji(n,t),tr(n,t)},er=(n,t)=>{qt(n,t),Qt(n,t),re(n,t),he(n,t)},ir={name:"rendering",generator:er,children:[{name:"01-raycasting-introduction",generator:qt,children:[]},{name:"02-lighting-models",generator:Qt,children:[]},{name:"03-texture-mapping",generator:re,children:[]},{name:"05-meshes",generator:he,children:[]}]},rr=[Ii,ir],or=Be(),fe=[],sr=Se(rr);sr(or,fe);for(const n of fe)n();
