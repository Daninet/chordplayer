(this.webpackJsonpbracsa=this.webpackJsonpbracsa||[]).push([[0],{14:function(e,t,s){},2:function(e,t,s){e.exports={chordbuttons:"ChordButtons_chordbuttons__1fCK-",active:"ChordButtons_active__1aWxQ",stop:"ChordButtons_stop__3dkpU"}},21:function(e,t,s){"use strict";s.r(t);var c=s(1),n=s.n(c),o=s(7),r=s.n(o),a=(s(14),s(6)),i=s.n(a),l=s(8),u=s.n(l);const d=window._tone_0411_FluidR3_GM_sf2_file;class h{constructor(){this.player=void 0,this.audioContext=void 0,this.envelopes=[],this.volume=.5,this.playbackRate=1;const e=window.AudioContext||window.webkitAudioContext;this.audioContext=new e,this.player=new u.a,this.player.loader.decodeAfterLoading(this.audioContext,"_tone_0411_FluidR3_GM_sf2_file"),console.log(this.player,d)}queueNote(e,t){const s=this.player.findZone(this.audioContext,d,e),c=s.originalPitch-100*s.coarseTune-s.fineTune,n=this.playbackRate*Math.pow(2,(100*e-c)/1200),o=this.player.queueWaveTable(this.audioContext,this.audioContext.destination,d,0,e,t,this.volume);console.log("i",e,n),o.audioBufferSourceNode.playbackRate.cancelScheduledValues(0),o.audioBufferSourceNode.playbackRate.setValueAtTime(n,0),this.envelopes.push(o)}playChord(e){this.stop(),e.forEach((e=>this.queueNote(e,999)))}stop(){for(;;){const e=this.envelopes.pop();if(!e)break;e.cancel()}}get playing(){return this.envelopes.length>0}setFreq(e){this.playbackRate=e/440;const t=this.envelopes.map((e=>e.pitch));this.playChord(t)}setVolume(e){this.volume=e,0===this.volume&&(this.volume=1e-4);const t=this.envelopes.map((e=>e.pitch));this.playChord(t)}}var j=s(9);const b=["C","C\u266f","D","E\u266d","E","F","F\u266f","G","A\u266d","A","B","H"],p=[0,1,2,3,4,5,6,7,8,9,10,11],O=[6,1,8,3,10,5,0,7,2,9,4,11],x=["","m","7","dim","5","6","m7","maj7","sus2","sus4","m6","aug"],m=[55,62,57],f=[],y=e=>{const t=e.map((e=>e%12));return t.sort(((e,t)=>e-t)),t},v=(e,t,s)=>({base:e,type:t,notes:y(s)}),g=(e,t,s,c)=>[v(e,t,[s[0],s[1],c]),v(e,t,[s[0],c,s[2]]),v(e,t,[c,s[1],s[2]])];(()=>{for(let e=0;e<12;e++)f.push(v(e,0,[e,e+4,e+4+3]),v(e,1,[e,e+3,e+3+4]),...g(e,2,[e,e+4,e+4+3],e+4+3+3),v(e,3,[e,e+3,e+6]),v(e,4,[e,e,e+3+4]),v(e,4,[e,e+3+4,e+3+4]),...g(e,5,[e,e+4,e+4+3],e+4+3+2),...g(e,6,[e,e+3,e+3+4],e+4+3+3),...g(e,7,[e,e+4,e+4+3],e+4+3+4),v(e,8,[e,e+2,e+4+3]),v(e,9,[e,e+5,e+4+3]),...g(e,10,[e,e+3,e+3+4],e+4+3+2),v(e,11,[e,e+4,e+4+4]))})(),console.log(f);const C=e=>{const t=e.map((e=>e%12)).sort(((e,t)=>e-t));return f.filter((e=>Object(j.isEqual)(e.notes,t))).map((e=>({base:e.base,type:e.type})))},_=e=>e.map(((e,t)=>e-m[t])).reduce(((e,t)=>0===t?e+2:e+t),0),k=[];function S(e){return m.map(((t,s)=>e[s]+t))}function N(e){const t=e.map(((e,t)=>m[t]+e));return C(t).sort(((e,t)=>e.type-t.type)).map((e=>`${b[e.base]}${x[e.type]}`))}!function(){for(let e=0;e<8;e++)for(let t=0;t<8;t++)for(let s=0;s<8;s++){const c=[m[0]+e,m[1]+t,m[2]+s];C(c).forEach((e=>{Array.isArray(k[e.base])||(k[e.base]=[]),Array.isArray(k[e.base][e.type])||(k[e.base][e.type]=[]),k[e.base][e.type].push(c)}))}for(let e=0;e<k.length;e++)for(let t=0;t<k[e].length;t++){k[e][t].sort(((e,t)=>_(e)-_(t)))}}(),console.log("VALID_CHORDS",k);var w=s(2),A=s.n(w),T=s(0);const F=["z","s","x","d","c","v","g","b","h","n","j","m"],E=["q","w","e","r","t","y","u","i","o","p","[","]"],V=e=>{const{activeNote:t,activeType:s,onClick:n,onStop:o}=e,[r,a]=Object(c.useState)("chromatic"),i="chromatic"===r?F:E;return Object(T.jsxs)("div",{className:A.a.chordbuttons,children:[Object(T.jsxs)("table",{children:[Object(T.jsx)("thead",{children:Object(T.jsxs)("tr",{children:[Object(T.jsx)("td",{children:Object(T.jsx)("strong",{children:"Key"})}),i.map((e=>Object(T.jsx)("td",{children:e},e)))]})}),Object(T.jsxs)("tbody",{children:[x.map(((e,c)=>(e=>{const c="chromatic"===r?p:O;return Object(T.jsxs)("tr",{children:[Object(T.jsx)("td",{children:e<9?e+1:""}),c.map((c=>Object(T.jsx)("td",{children:Object(T.jsxs)("button",{className:s===e&&t===c?A.a.active:" ",onClick:()=>n(c,e),children:[b[c],x[e]]})},c+e)))]},e)})(c))),Object(T.jsxs)("tr",{children:[Object(T.jsx)("td",{children:"Space"}),Object(T.jsx)("td",{colSpan:12,children:Object(T.jsx)("button",{className:A.a.stop,onClick:o,children:"Stop"})})]})]})]}),Object(T.jsxs)("label",{children:[Object(T.jsx)("input",{type:"radio",name:"layout",value:"chromatic",checked:"chromatic"===r,onChange:e=>a(e.target.value)}),"Chromatic"]}),"\xa0\xa0\xa0\xa0",Object(T.jsxs)("label",{children:[Object(T.jsx)("input",{type:"radio",name:"layout",value:"fifths",checked:"fifths"===r,onChange:e=>a(e.target.value)}),"Circle of fifths"]})]})};var R=s(3),B=s.n(R);const I=e=>{const{isChecked:t,positions:s,onClick:c}=e,o=(e,t)=>{const s=(e+t)%12;return e+t>=19?`${b[s]}'`:b[s]};return Object(T.jsxs)("div",{className:B.a.wrapper,onClick:()=>c(s),children:[Object(T.jsxs)("table",{className:B.a.chordview,children:[Object(T.jsxs)("thead",{children:[Object(T.jsx)("tr",{children:Object(T.jsx)("th",{colSpan:3,children:Object(T.jsx)("input",{type:"checkbox",checked:t,readOnly:!0})})}),Object(T.jsxs)("tr",{children:[Object(T.jsx)("th",{children:o(7,s[0])}),Object(T.jsx)("th",{children:o(14,s[1])}),Object(T.jsx)("th",{children:o(9,s[2])})]})]}),Object(T.jsx)("tbody",{children:new Array(7).fill(0).map(((e,t)=>Object(T.jsxs)("tr",{children:[Object(T.jsx)("td",{children:s[0]===t+1?"\u25cf":""}),Object(T.jsx)("td",{children:s[1]===t+1?"\u25cf":""}),Object(T.jsx)("td",{children:s[2]===t+1?"\u25cf":""})]},t)))})]}),Object(T.jsx)("div",{className:B.a.names,children:N(s).map((e=>Object(T.jsxs)(n.a.Fragment,{children:[e,Object(T.jsx)("br",{})]},e)))})]})};var q=s(4),D=s.n(q);function J(e,t){const[s,n]=Object(c.useState)(e);return Object(c.useEffect)((()=>{const s=setTimeout((()=>{n(e)}),t);return()=>{clearTimeout(s)}}),[e,t]),s}const $=e=>{const{onSetVolume:t,onSetTuning:s}=e,[n,o]=Object(c.useState)(.5),r=J(n,50),[a,i]=Object(c.useState)(440),l=J(a,25);return Object(c.useEffect)((()=>{t(r)}),[t,r]),Object(c.useEffect)((()=>{s(l)}),[s,l]),Object(T.jsxs)("div",{className:D.a.sliders,children:[Object(T.jsxs)("label",{children:["Tuning",Object(T.jsx)("br",{}),Object(T.jsx)("input",{className:D.a.tuner,type:"range",step:"0.1",min:"400",max:"500",value:a,onChange:e=>i(Number(e.target.value))})]}),Object(T.jsxs)("label",{children:["Volume",Object(T.jsx)("br",{}),Object(T.jsx)("input",{className:D.a.tuner,type:"range",step:"0.02",min:"0",max:"1",value:n,onChange:e=>o(Number(e.target.value))})]})]})};var z=()=>{var e;const t=Object(c.useRef)(null),[s,n]=Object(c.useState)(!1);Object(c.useEffect)((()=>{t.current=new h,n(!0)}),[]);const[o,r]=Object(c.useState)(0),[a,l]=Object(c.useState)(0),[,u]=Object(c.useState)(0),d=(e,t)=>`viola-${e}${t}`,j=d(b[o],x[a]),p=Object(c.useCallback)(((e,t)=>{const s=d(e,t),c=localStorage.getItem(s);if(c)try{const e=JSON.parse(c);if(Array.isArray(e)&&3===e.length&&e.every((e=>Number.isInteger(e))))return console.log(e,S(e)),S(e)}catch(n){}return function(e,t){return k[e][t]}(b.indexOf(e),x.indexOf(t))[0]}),[]),O=Object(c.useCallback)(((e,s)=>{const c=p(b[e],x[s]);r(e),l(s),t.current.playChord(c)}),[p]),f=null!==(y=a,e=k[o][y].map((e=>e.map(((e,t)=>e-m[t])))))&&void 0!==e?e:[];var y;const v=e=>{const s=S(e);t.current.playChord(s),localStorage.setItem(j,JSON.stringify(e)),u(Date.now())},g=()=>{t.current.stop()},C=Object(c.useCallback)((e=>{t.current.setFreq(e)}),[]),_=Object(c.useCallback)((e=>{t.current.setVolume(e)}),[]);return s?Object(T.jsxs)("div",{className:i.a.app,onKeyDown:e=>{const t=["z","s","x","d","c","v","g","b","h","n","j","m",","];if(console.log(e.key),t.includes(e.key))return O(t.indexOf(e.key)%12,a);const s=["1","2","3","4","5","6","7","8","9"];return s.includes(e.key)?l(s.indexOf(e.key)):" "===e.key?g():void 0},tabIndex:0,children:[Object(T.jsx)(V,{activeNote:o,activeType:a,onClick:O,onStop:g}),Object(T.jsx)($,{onSetTuning:C,onSetVolume:_}),Object(T.jsx)("div",{className:i.a.chords,children:f.map((e=>(e=>{const t=JSON.stringify(e),s=t===localStorage.getItem(j);return Object(T.jsx)(I,{positions:e,onClick:v,isChecked:s},t)})(e)))})]}):null};var L=e=>{e&&e instanceof Function&&s.e(3).then(s.bind(null,22)).then((({getCLS:t,getFID:s,getFCP:c,getLCP:n,getTTFB:o})=>{t(e),s(e),c(e),n(e),o(e)}))};r.a.render(Object(T.jsx)(n.a.StrictMode,{children:Object(T.jsx)(z,{})}),document.getElementById("root")),L()},3:function(e,t,s){e.exports={chordview:"ChordView_chordview__1UQS7"}},4:function(e,t,s){e.exports={sliders:"Sliders_sliders__lzxZi",tuner:"Sliders_tuner__vf4HX"}},6:function(e,t,s){e.exports={app:"App_app__2ziFi",chords:"App_chords__7aOCV"}}},[[21,1,2]]]);
//# sourceMappingURL=main.ff9877e7.chunk.js.map