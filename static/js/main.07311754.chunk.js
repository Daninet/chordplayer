(this.webpackJsonpbracsa=this.webpackJsonpbracsa||[]).push([[0],{14:function(e,t,n){},2:function(e,t,n){e.exports={chordbuttons:"ChordButtons_chordbuttons__1fCK-",pending:"ChordButtons_pending__2QeOF",active:"ChordButtons_active__1aWxQ",stop:"ChordButtons_stop__3dkpU"}},21:function(e,t,n){"use strict";n.r(t);var s=n(1),c=n.n(s),o=n(7),r=n.n(o),a=(n(14),n(6)),i=n.n(a),l=n(8),u=n.n(l);const d=window._tone_0411_FluidR3_GM_sf2_file;class h{constructor(){this.player=void 0,this.audioContext=void 0,this.envelopes=[],this.volume=.5,this.playbackRate=1;const e=window.AudioContext||window.webkitAudioContext;this.audioContext=new e,this.player=new u.a,this.player.loader.decodeAfterLoading(this.audioContext,"_tone_0411_FluidR3_GM_sf2_file"),console.log(this.player,d)}queueNote(e,t){const n=this.player.findZone(this.audioContext,d,e),s=n.originalPitch-100*n.coarseTune-n.fineTune,c=this.playbackRate*Math.pow(2,(100*e-s)/1200),o=this.player.queueWaveTable(this.audioContext,this.audioContext.destination,d,0,e,t,this.volume);console.log("i",e,c),o.audioBufferSourceNode.playbackRate.cancelScheduledValues(0),o.audioBufferSourceNode.playbackRate.setValueAtTime(c,0),this.envelopes.push(o)}playChord(e){this.stop(),e.forEach((e=>this.queueNote(e,999)))}stop(){for(;;){const e=this.envelopes.pop();if(!e)break;e.cancel()}}get playing(){return this.envelopes.length>0}setFreq(e){this.playbackRate=e/440;const t=this.envelopes.map((e=>e.pitch));this.playChord(t)}setVolume(e){this.volume=e,0===this.volume&&(this.volume=1e-4);const t=this.envelopes.map((e=>e.pitch));this.playChord(t)}}var j=n(9);const b=["C","C\u266f","D","E\u266d","E","F","F\u266f","G","A\u266d","A","B","H"],p=[0,1,2,3,4,5,6,7,8,9,10,11],O=[6,1,8,3,10,5,0,7,2,9,4,11],y=["","m","7","dim","5","6","m7","maj7","sus2","sus4","m6","aug"],x=[55,62,57],m=[],f=e=>{const t=e.map((e=>e%12));return t.sort(((e,t)=>e-t)),t},v=(e,t,n)=>({base:e,type:t,notes:f(n)}),g=(e,t,n,s)=>[v(e,t,[n[0],n[1],s]),v(e,t,[n[0],s,n[2]]),v(e,t,[s,n[1],n[2]])];(()=>{for(let e=0;e<12;e++)m.push(v(e,0,[e,e+4,e+4+3]),v(e,1,[e,e+3,e+3+4]),...g(e,2,[e,e+4,e+4+3],e+4+3+3),v(e,3,[e,e+3,e+6]),v(e,4,[e,e,e+3+4]),v(e,4,[e,e+3+4,e+3+4]),...g(e,5,[e,e+4,e+4+3],e+4+3+2),...g(e,6,[e,e+3,e+3+4],e+4+3+3),...g(e,7,[e,e+4,e+4+3],e+4+3+4),v(e,8,[e,e+2,e+4+3]),v(e,9,[e,e+5,e+4+3]),...g(e,10,[e,e+3,e+3+4],e+4+3+2),v(e,11,[e,e+4,e+4+4]))})(),console.log(m);const C=e=>{const t=e.map((e=>e%12)).sort(((e,t)=>e-t));return m.filter((e=>Object(j.isEqual)(e.notes,t))).map((e=>({base:e.base,type:e.type})))},_=e=>e.map(((e,t)=>e-x[t])).reduce(((e,t)=>0===t?e+2:e+t),0),S=[];function k(e){return x.map(((t,n)=>e[n]+t))}function N(e){const t=e.map(((e,t)=>x[t]+e));return C(t).sort(((e,t)=>e.type-t.type)).map((e=>`${b[e.base]}${y[e.type]}`))}!function(){for(let e=0;e<8;e++)for(let t=0;t<8;t++)for(let n=0;n<8;n++){const s=[x[0]+e,x[1]+t,x[2]+n];C(s).forEach((e=>{Array.isArray(S[e.base])||(S[e.base]=[]),Array.isArray(S[e.base][e.type])||(S[e.base][e.type]=[]),S[e.base][e.type].push(s)}))}for(let e=0;e<S.length;e++)for(let t=0;t<S[e].length;t++){S[e][t].sort(((e,t)=>_(e)-_(t)))}}(),console.log("VALID_CHORDS",S);var K=n(2),w=n.n(K),A=n(0);const T=["z","s","x","d","c","v","g","b","h","n","j","m"],E=["KeyZ","KeyS","KeyX","KeyD","KeyC","KeyV","KeyG","KeyB","KeyH","KeyN","KeyJ","KeyM"],F=["q","w","e","r","t","y","u","i","o","p","[","]"],B=["KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight"],R=e=>{const{activeNote:t,activeType:n,pendingType:c,onClick:o,onStop:r}=e,[a,i]=Object(s.useState)("chromatic"),l="chromatic"===a?T:F;return Object(A.jsxs)("div",{className:w.a.chordbuttons,children:[Object(A.jsxs)("table",{children:[Object(A.jsx)("thead",{children:Object(A.jsxs)("tr",{children:[Object(A.jsx)("td",{children:Object(A.jsx)("strong",{children:"Key"})}),l.map((e=>Object(A.jsx)("td",{children:e},e)))]})}),Object(A.jsxs)("tbody",{children:[y.map(((e,s)=>(e=>{const s="chromatic"===a?p:O,r=s=>n===e&&t===s;return Object(A.jsxs)("tr",{className:c===e?w.a.pending:"",children:[Object(A.jsx)("td",{children:e<9?e+1:""}),s.map((t=>Object(A.jsx)("td",{children:Object(A.jsxs)("button",{className:r(t)?w.a.active:"",onClick:()=>o(t,e),children:[b[t],y[e]]})},t+e)))]},e)})(s))),Object(A.jsxs)("tr",{children:[Object(A.jsx)("td",{children:"Space"}),Object(A.jsx)("td",{colSpan:12,children:Object(A.jsx)("button",{className:w.a.stop,onClick:r,children:"Stop"})})]})]})]}),Object(A.jsxs)("label",{children:[Object(A.jsx)("input",{type:"radio",name:"layout",value:"chromatic",checked:"chromatic"===a,onChange:e=>i(e.target.value)}),"Chromatic"]}),"\xa0\xa0\xa0\xa0",Object(A.jsxs)("label",{children:[Object(A.jsx)("input",{type:"radio",name:"layout",value:"fifths",checked:"fifths"===a,onChange:e=>i(e.target.value)}),"Circle of fifths"]})]})};var V=n(3),I=n.n(V);const q=e=>{const{isChecked:t,positions:n,onClick:s}=e,o=(e,t)=>{const n=(e+t)%12;return e+t>=19?`${b[n]}'`:b[n]};return Object(A.jsxs)("div",{className:I.a.wrapper,onClick:()=>s(n),children:[Object(A.jsxs)("table",{className:I.a.chordview,children:[Object(A.jsxs)("thead",{children:[Object(A.jsx)("tr",{children:Object(A.jsx)("th",{colSpan:3,children:Object(A.jsx)("input",{type:"checkbox",checked:t,readOnly:!0})})}),Object(A.jsxs)("tr",{children:[Object(A.jsx)("th",{children:o(7,n[0])}),Object(A.jsx)("th",{children:o(14,n[1])}),Object(A.jsx)("th",{children:o(9,n[2])})]})]}),Object(A.jsx)("tbody",{children:new Array(7).fill(0).map(((e,t)=>Object(A.jsxs)("tr",{children:[Object(A.jsx)("td",{children:n[0]===t+1?"\u25cf":""}),Object(A.jsx)("td",{children:n[1]===t+1?"\u25cf":""}),Object(A.jsx)("td",{children:n[2]===t+1?"\u25cf":""})]},t)))})]}),Object(A.jsx)("div",{className:I.a.names,children:N(n).map((e=>Object(A.jsxs)(c.a.Fragment,{children:[e,Object(A.jsx)("br",{})]},e)))})]})};var D=n(4),L=n.n(D);function J(e,t){const[n,c]=Object(s.useState)(e);return Object(s.useEffect)((()=>{const n=setTimeout((()=>{c(e)}),t);return()=>{clearTimeout(n)}}),[e,t]),n}const M=e=>{const{onSetVolume:t,onSetTuning:n}=e,[c,o]=Object(s.useState)(.5),r=J(c,50),[a,i]=Object(s.useState)(440),l=J(a,25);return Object(s.useEffect)((()=>{t(r)}),[t,r]),Object(s.useEffect)((()=>{n(l)}),[n,l]),Object(A.jsxs)("div",{className:L.a.sliders,children:[Object(A.jsxs)("label",{children:["Tuning",Object(A.jsx)("br",{}),Object(A.jsx)("input",{className:L.a.tuner,type:"range",step:"0.1",min:"400",max:"500",value:a,onChange:e=>i(Number(e.target.value))})]}),Object(A.jsxs)("label",{children:["Volume",Object(A.jsx)("br",{}),Object(A.jsx)("input",{className:L.a.tuner,type:"range",step:"0.02",min:"0",max:"1",value:c,onChange:e=>o(Number(e.target.value))})]})]})};var P=()=>{var e;const t=Object(s.useRef)(null),[n,c]=Object(s.useState)(!1);Object(s.useEffect)((()=>{t.current=new h,c(!0)}),[]);const[o,r]=Object(s.useState)(0),[a,l]=Object(s.useState)(0),[u,d]=Object(s.useState)(null),[,j]=Object(s.useState)(0),p=(e,t)=>`viola-${e}${t}`,m=p(b[o],y[a]),f=Object(s.useCallback)(((e,t)=>{const n=p(e,t),s=localStorage.getItem(n);if(s)try{const e=JSON.parse(s);if(Array.isArray(e)&&3===e.length&&e.every((e=>Number.isInteger(e))))return console.log(e,k(e)),k(e)}catch(c){}return function(e,t){return S[e][t]}(b.indexOf(e),y.indexOf(t))[0]}),[]),v=Object(s.useCallback)(((e,n)=>{const s=f(b[e],y[n]);r(e),l(n),d(null),t.current.playChord(s)}),[f]),g=null!==(C=a,e=S[o][C].map((e=>e.map(((e,t)=>e-x[t])))))&&void 0!==e?e:[];var C;const _=e=>{const n=k(e);t.current.playChord(n),localStorage.setItem(m,JSON.stringify(e)),j(Date.now())},N=()=>{t.current.stop()},K=Object(s.useCallback)(((e,t)=>{if(console.log(e,t),E.includes(t))return console.log("pending",u),v(E.indexOf(t)%12,null!==u&&void 0!==u?u:a),d(null),!0;if(B.includes(t))return v(O[B.indexOf(t)%12],null!==u&&void 0!==u?u:a),d(null),!0;const n=["1","2","3","4","5","6","7","8","9"];return n.includes(e)?(d(n.indexOf(e)),!0):" "===e&&(N(),!0)}),[u,a,v]);Object(s.useEffect)((()=>{const e=e=>{console.log(e.key,e.code);K(e.key,e.code)&&(e.preventDefault(),e.stopPropagation())};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)}),[K]);const w=Object(s.useCallback)((e=>{t.current.setFreq(e)}),[]),T=Object(s.useCallback)((e=>{t.current.setVolume(e)}),[]);return n?Object(A.jsxs)("div",{className:i.a.app,children:[Object(A.jsx)(R,{activeNote:o,activeType:a,pendingType:u,onClick:v,onStop:N}),Object(A.jsx)(M,{onSetTuning:w,onSetVolume:T}),Object(A.jsx)("div",{className:i.a.chords,children:g.map((e=>(e=>{const t=JSON.stringify(e),n=t===localStorage.getItem(m);return Object(A.jsx)(q,{positions:e,onClick:_,isChecked:n},t)})(e)))})]}):null};var $=e=>{e&&e instanceof Function&&n.e(3).then(n.bind(null,22)).then((({getCLS:t,getFID:n,getFCP:s,getLCP:c,getTTFB:o})=>{t(e),n(e),s(e),c(e),o(e)}))};r.a.render(Object(A.jsx)(c.a.StrictMode,{children:Object(A.jsx)(P,{})}),document.getElementById("root")),$()},3:function(e,t,n){e.exports={chordview:"ChordView_chordview__1UQS7"}},4:function(e,t,n){e.exports={sliders:"Sliders_sliders__lzxZi",tuner:"Sliders_tuner__vf4HX"}},6:function(e,t,n){e.exports={app:"App_app__2ziFi",chords:"App_chords__7aOCV"}}},[[21,1,2]]]);
//# sourceMappingURL=main.07311754.chunk.js.map