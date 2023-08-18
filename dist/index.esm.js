import{randomBytes as D,pbkdf2Sync as l}from"crypto";import E from"path";import{readdir as O,stat as d}from"fs/promises";const s=e=>Object.prototype.toString.call(e),C=e=>typeof e<"u",M=e=>typeof e=="boolean",x=e=>typeof e=="function",I=e=>typeof e=="number",g=e=>typeof e=="string",k=e=>s(e)==="[object Object]",B=e=>s(e)==="[object Undefined]",$=e=>s(e)==="[object Null]",U=e=>s(e)==="[object RegExp]",L=e=>s(e)==="[object Date]",T=e=>e!==null&&(typeof e=="function"||typeof e=="object"),z=e=>e instanceof Element,p=(e,t)=>!e||!t?!1:Object.prototype.hasOwnProperty.call(e,t),P=e=>typeof window<"u"&&s(e)==="[object Window]",R=typeof window<"u",u=e=>e.reduce((t,r)=>[...t,...Array.isArray(r)?u(r):[r]],[]),W=e=>Array.from(new Set(e)),N=(e,t)=>e.filter(r=>!t.includes(r)),q=(e,t)=>t===0||t>e.length?e:Array.from({length:t},()=>e[Math.round(Math.random()*(e.length-1))]),V=e=>e.map(t=>({value:t,sort:Math.random()})).sort((t,r)=>t.sort-r.sort).map(({value:t})=>t),Z=e=>[...e].sort((t,r)=>t.key<r.key?-1:t.key>r.key?1:0),H=(e,t)=>e>t?1:e<t?-1:0,f=(e=[],t=null)=>{const r=[...e],n=t||H;return r.sort(n),r},_=(e=[],t=1,r="")=>!g(r)||!p(e[0],r)?e:f(e,(n,a)=>n[r]>a[r]?t:n[r]<a[r]?-1*t:0),J=(e,t,r)=>{if(!r)return[];const n=typeof e=="function"?r.findIndex(e):e;return n===-1?r:[...r.slice(0,n),t,...r.slice(n)]},Y=(e,t,r)=>{if(!r)return[];const n=typeof e=="function"?r.findIndex(e):e;return n===-1?r:[...r.slice(0,n),t,...r.slice(n+1)]},G=(e,t)=>{if(!t)return[];const r=typeof e=="function"?t.findIndex(e):e;return r===-1?t:[...t.slice(0,r),...t.slice(r+1)]},K=e=>{const t=Math.floor(e.length/2),r=[...e].sort((n,a)=>n-a);return e.length%2!==0?r[t]:(r[t-1]+r[t])/2},Q=(e,t)=>{const r=new Set(e);return t.filter(n=>r.has(n))},X=e=>e.reduce((t,r)=>(r in t?t[r]+=1:t[r]=1,t),{}),ee=e=>{const t=Array.from(new Set(e));return Object.fromEntries(t.map(r=>{const n=e.filter(a=>a===r).length;return[r,n]}))},te=["KB","MB","GB","TB","PB","EB","ZB","YB"],re=e=>new Promise(t=>setTimeout(t,e)),ne=()=>performance.now(),ae=e=>{const t=(performance.now()-e)/1e3;console.info(`Function took ${t.toFixed(2)} seconds`)},oe=e=>{if(e===0)return"0";const t=Math.floor(Math.log(e)/Math.log(1e3)),r=e/1e3**t,n=Math.round(r),a=t===0?"":" "+te[t-1];return n.toString()+a},m=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,se=(e,t,r)=>{const n=document.createElement("a"),a=new Blob([e],{type:r});n.href=URL.createObjectURL(a),n.download=t,n.click()},ie=()=>m.test(navigator.userAgent)?"Mobile":"Desktop",i=()=>!!m.test(navigator.userAgent),ce=()=>{var e;return((e=navigator==null?void 0:navigator.userAgentData)==null?void 0:e.platform)||(navigator==null?void 0:navigator.platform)||"unknown"},le=(e,t)=>{const r="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e)),n=document.createElement("a");n.setAttribute("href",r),n.setAttribute("download",`${t}.json`),document.body.appendChild(n),n.click(),n.remove()},de=()=>window.performance.getEntriesByType("navigation").map(e=>e.entryType).includes("reload"),h=()=>i()?"environment":"user",y=()=>{const e={qqvga:{width:{exact:160},height:{exact:120}},qvga:{width:{exact:320},height:{exact:240}},vga:{width:{exact:640},height:{exact:480}}};let t;return i()?t={width:{ideal:window.screen.height},height:{ideal:window.screen.width},facingMode:h()}:window.innerWidth<960?t=e.qvga:t=e.vga,t},ge=async(e,t)=>{const r=y();if(!e)if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)try{const n=await navigator.mediaDevices.getUserMedia({video:r,audio:!1});t.srcObject=n,t.onloadedmetadata=()=>{t.play()}}catch(n){console.log(`An error occured! ${n}`)}else console.error("getUserMedia not supported")},pe=(e,t)=>{t&&e.getTracks().forEach(r=>{r.stop()})},ue=(e,t=document)=>t.querySelector(e),fe=(e,t=document)=>t.querySelectorAll(e),me=(e,t)=>{Object.keys(t).forEach(r=>e.style[r]=t[r])},he=(e,...t)=>e.classList.add(...t),ye=(e,...t)=>e.classList.remove(...t),Ae=(e,t)=>e.insertAdjacentElement("beforebegin",t),we=(e,t)=>e.insertAdjacentElement("afterend",t),be=(e,t)=>e.insertAdjacentElement("afterbegin",t),ve=async e=>{const t=new Image;return t.src=e,await t.decode(),{width:t.height,height:t.width}},Fe=e=>`data:image/png;base64,${e}`,je=e=>{const t=new FileReader;t.readAsDataURL(e),t.onload=r=>r.target.result},Se=e=>new Intl.DisplayNames(["en"],{type:"region"}).of(e.toUpperCase()),De=e=>{const t=e.toUpperCase().split("").map(r=>127397+r.charCodeAt(0));return String.fromCodePoint(...t)},Ee=()=>Array.from({length:12},(e,t)=>new Date(0,t).toLocaleString("en-US",{month:"long"})),Oe=e=>e.toJSON().slice(0,19).replace("T","-").replaceAll(":","-"),Ce=e=>{const t=e.getTime()+(6-e.getDay())*864e5;return new Date(t)},Me=e=>{const t=e.getTime()-(e.getDay()-1)*864e5;return new Date(t)},xe=e=>{const t=new Date(e.getFullYear(),e.getMonth()+1).getTime()-864e5;return new Date(t)},Ie=e=>new Date(e.getFullYear(),e.getMonth()),ke=e=>e.getDay()%6!==0,Be=e=>{if(!Date.parse(e))throw new Error("Invalid date provided");return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})},$e=e=>{e.forEach(t=>t&&t())},Ue=(...e)=>e.reduce((t,r)=>r(t),e[0]),Le=(e,t,...r)=>r.reduce((n,a)=>a(n),t(e)),Te=e=>e.constructor.name==="AsyncFunction",ze=(e,...t)=>{const r=Object.entries(e).filter(([n])=>!t.includes(n));return Object.fromEntries(r)},Pe=(e,...t)=>{const r=Object.entries(e).filter(([n])=>t.includes(n));return Object.fromEntries(r)},A=e=>{const t={};return Object.keys(e).forEach(r=>{const n=e[r];typeof n=="object"&&n!==null&&!Array.isArray(n)?Object.assign(t,A(n)):t[r]=n}),t},Re=e=>Object.keys(e).reduce((t,r)=>(e[r]&&(t[r]=e[r]),t),{}),w=(e,t)=>[e,t].reduce((r,n)=>(n&&Object.entries(n).map(([a,o])=>{o&&(r[a]=typeof o=="object"?w(r[a],o):o)}),r),{}),b=e=>Object.fromEntries(Object.entries(e).map(([t,r])=>[r,t])),v={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},We=b(v),F=/[&<>"']/g,Ne=RegExp(F.source),j=/&(?:amp|lt|gt|quot|#(0+)?39);/g,qe=RegExp(j.source),Ve=e=>e.replace(/<(?:.|\\n)*?>/gm,""),Ze=e=>e.replace(/style\s*=\s*"(.*?)"/gm,""),He=e=>e&&Ne.test(e)?e.replace(F,t=>v[t]):e||"",_e=e=>e&&qe.test(e)?e.replace(j,t=>We[t]||"'"):e||"",Je=e=>{let[t,r]=e.split(/[,-]/).map(Number);return r||(r=t,t=1),Array.from({length:r-t+1},(n,a)=>a+t)},Ye=e=>e>9?e.toString():`0${e}`,Ge=(e,t)=>Math.random()*(t-e)+e,Ke=e=>e.toLocaleLowerCase().replace(/[^a-zA-Z0-9 ]/g," ").replace(/\s+(\w)?/gi,(t,r)=>r.toUpperCase()),Qe=(e,t=" ")=>e.split(t).map(r=>r.replace(/^\w/,n=>n.toUpperCase())).join(""),Xe=e=>e.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[\s_]/g,"-").toLowerCase(),et=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),tt=e=>e.replace(/[\u200B-\u200D\uFEFF]/g,""),rt=(e,t)=>t.some(r=>e.endsWith(r)),nt=(e,t)=>t.some(r=>e.startsWith(r)),at=e=>/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(e),ot=()=>"#"+(Math.random()*1048575*1e6).toString(16).slice(0,6),st=(e=32,t="")=>{let r=t;for(let n=0;n<e;n++){const a=Math.random(),o=Math.floor(a*36),c=o.toString(36);r+=o>9&&a>.3&&a<.7?c.toUpperCase():c}return r.substring(0,e)},it=e=>e.toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+/,"").replace(/-+$/,""),ct=e=>!e||typeof e!="string"?e:e.charAt(0).toUpperCase()+e.slice(1),lt=(e,t)=>!e||e.length<=t?e:`${e.slice(0,t)}...`,dt=e=>{const t=e.slice(0,4),r=e.slice(e.length-4);return`${t} **** ${r}`},gt=e=>e.replace(/\/?$/,"/"),pt=e=>/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase()),ut=e=>/^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm.test(e),ft=e=>/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/gi.test(e),mt=e=>new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i").test(e),ht=e=>e.replace(/^\n+|\n+$/g,""),yt=(e,t=1e4,r=64,n="sha512")=>{const a=D(128).toString("base64"),o=l(e,a,t,r,n).toString("hex");return{salt:a,hash:o,iterations:t,keyLen:r}},At=(e,t,r,n,a,o)=>t==l(e,r,n,a,o).toString("hex"),S=async(e,t=[])=>{const r=["node_modules",".venv",".env"],n=await O(e);for(const a of n){const o=E.join(e,a);(await d(o)).isDirectory()&&!r.includes(a)?t=await S(o,t):t.push(o)}return t},wt=async e=>{try{return await d(e),!0}catch(t){if(t.code==="ENOENT")return!1;throw t}},bt=(()=>{const e={};return{set(t,r){e[t]=r},has(t){return!!this.get(t)},get(t){return e[t]},remove(t){this.has(t)&&(e[t]=null,delete e[t])}}})();export{ue as $,fe as $$,he as addClass,gt as addTrailingSlash,Ye as addZero,Le as applyPipe,$e as batchInvoke,oe as bytesToSize,bt as cache,Ke as camelCase,h as cameraEnvironment,ct as capitalize,X as countBy,se as dataToFile,Oe as dateWithTimeStamp,ie as detectDeviceType,le as downloadAsJson,rt as endsWithAny,He as escape,et as escapeHtml,je as fileToBase64,Re as filterFalsyFromObject,u as flattenArray,A as flattenObject,b as flip,Se as getCountryFromISO,De as getFlagEmoji,ve as getImageDimensions,Ie as getMonthFirstDay,xe as getMonthLastDay,Ee as getMonthList,ce as getOs,Ge as getRandomNumber,y as getVideoConstraint,Me as getWeekFirstDay,Ce as getWeekLastDay,p as hasProperty,yt as hashString,we as insertAfter,Ae as insertBefore,J as insertItemAtIndex,Q as intersection,Te as isAsync,M as isBoolean,R as isBrowser,L as isDate,C as isDef,wt as isFileExists,x as isFunction,z as isHtmlElement,T as isJsObject,i as isMobileDevice,$ as isNull,I as isNumber,k as isObject,de as isPageReloaded,U as isRegExp,g as isString,B as isUndefined,pt as isValidEmail,ut as isValidIPV4,ft as isValidIPV6,at as isValidUUID,mt as isValidUrl,ke as isWeekday,P as isWindow,Xe as kebabCase,dt as maskString,K as median,ee as occurrenceCount,ze as omit,Qe as pascalCase,ne as perfStart,ae as perfStop,Pe as pick,Ue as pipe,be as prepend,ot as randomHexColorCode,q as randomItem,st as randomStr,Je as rangeParser,S as readdirRecursive,ye as removeClass,Ve as removeHtmlTags,Ze as removeInlineStyles,N as removeItem,G as removeItemAtIndex,tt as removeZeroWidthSpace,Y as replaceItemAtIndex,Fe as setBase64Img,V as shuffleArray,it as slugify,f as sort,Z as sortAsc,_ as sortBy,ge as startCamera,nt as startsWithAny,pe as stopCamera,me as style,Be as toLongDate,s as toString,ht as trimNewLines,lt as truncate,_e as unescape,w as unionWithExclusion,W as unique,At as validateHash,re as wait};
//# sourceMappingURL=index.esm.js.map