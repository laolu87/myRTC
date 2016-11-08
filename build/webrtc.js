!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(){var e=new Date,t=e.getHours(),n=e.getMinutes(),o=e.getSeconds();return(t<10?"0"+t:t)+":"+(n<10?"0"+n:n)+":"+(o<10?"0"+o:o)}function r(e){console.log("已建立socket连接"),O=!0;var t=i();M.emit("enter",t);var n=document.getElementById("login-server"),o=document.getElementById("login-box");n.style.display="none",o.style.display="block",console.log("进入房间"+t)}function i(){var e=document.location.href,t=e.split("?");if(t.length>1){var n=t[1];if(""!=n)return n}return"defaultroom"}function a(e){var t=document.getElementById("users-list");t.innerHTML="";for(var n=e.length,o=0;o<n;o++){var r=document.createElement("p");r.style.marginLeft="0.5em",r.style.fontWeight=900,e[o].name===A&&(r.style.color="green"),r.innerText=e[o].name,t.appendChild(r)}}function c(e){switch(e.type){case"upperLimit":alert("该房间已经达到最大连接数了!");break;case"duplicate":alert("用户名重复了!"),document.getElementById("login-user-button").disabled=!1;break;case"users":var t=document.getElementById("login");t.style.display="none",H=e.users;var n=H.length,o=document.getElementById("users-list");o.innerHTML="";for(var r=0;r<n;r++){var i=document.createElement("p");i.style.marginLeft="0.5em",i.style.fontWeight=900,H[r].name===A&&(i.style.color="green"),i.innerText=H[r].name,o.appendChild(i),H[r].name!==A&&M.send({type:"response",sendto:H[r].id,name:A})}document.getElementById("login-user-button").disabled=!1;break;case"response":var c=e.from,u={};u.id=c,u.name=e.name,H.push(u),a(H),R(c);break;case"offer":l(e);break;case"answer":s(e);break;case"candidate":d(e);break;case"disconnect":if(H)for(var n=H.length,r=0;r<n;r++)if(H[r].id===e.from)return H[r].conn.peerconnection&&H[r].conn.peerconnection.close(),H.splice(r,1),void a(H)}}function l(e){B(e),I(e)}function s(e){j(e)}function d(e){var t=e.from,n=f(t);if(!n)return void console.error("peerConnection不存在!");if(!n.iceReady)return void console.warn("ice尚未准备好");var o=new S(e);n.peerconnection.addIceCandidate(o)}function u(){}function m(e,t){for(var n=H.length,o=0;o<n;o++)H[o].id===e&&(H[o].conn=t)}function f(e){for(var t=null,n=H.length,o=0;o<n;o++)H[o].id===e&&(t=H[o].conn);return t}function d(e){var t=e.from,n=f(t);if(!n)return void console.error("peerConnection不存在!");if(!n.iceReady)return void console.warn("ice尚未准备好");var o=new S(e);n.peerconnection.addIceCandidate(o)}function p(e){M.send(e)}function g(e){var t=new u,n={iceServers:[{url:"stun:stun.l.google.com:19302"},{url:"stun:203.183.172.196:3478"}]};try{t.peerconnection=new N(n)}catch(e){console.log("建立连接失败，错误："+e.message)}t.id=e;var o=t.peerconnection;return o.id=e,m(e,t),o.ondatachannel=function(t){var n=t.channel;y(n,e)},o.onicecandidate=function(e){e.candidate?p({type:"candidate",sendto:t.id,label:e.candidate.sdpMLineIndex,candidate:e.candidate.candidate}):t.established=!0},t}function v(e){var t=e.peerconnection,n=e.id,o=t.createDataChannel("dataChannel",{reliable:!0,ordered:!0});return y(o,n)}function h(e,t){var n={};n.sdp=e,n.type=e.type,n.sendto=t,M.send(n)}function y(e,t){var n=void 0;e.onopen=function(){e.send(JSON.stringify({type:"open",name:A,data:"已连接"}))},e.onmessage=function(e){try{var t=JSON.parse(e.data);switch(t.type){case"open":n=t.name;var o=document.createElement("li");o.style.cssText="color:blue; margin-top:0.3em; margin-left: 0.5em; list-style: none; margin-bottom: 0.5em",o.innerText=t.name+"进入房间",z.appendChild(o),z.scrollTop=z.scrollHeight;break;case"msg":b(t);break;case"notice":T(t.name,t.data);break;case"openvideo":var r=document.createElement("li");r.style.cssText="color:blue; margin-top:0.3em; list-style: none; margin-bottom: 0.5em; text-align: center",r.innerHTML="<a href='"+t.href+"' target='_blank' style='color:blue'>"+t.name+": 发起了视频聊天</a>",z.appendChild(r),z.scrollTop=z.scrollHeight;break;case"start":q=[],X=0,G=t.data;break;case"end":k(G,q,t.username)}}catch(t){q.push(atob(e.data))}},e.onclose=function(e){var o=document.createElement("li");o.style.cssText="color:blue; list-style:none; margin-left:0.5em; margin-top:1em",o.innerText=n+"离开房间",z.appendChild(o),z.scrollTop=z.scrollHeight,delete W[t]},W[t]=e}function b(e,t){var n=document.createElement("li");n.innerText=e.name+"  "+o(),n.style.cssText="margin-left: 0.5em; list-style: none",n.style.color=t?"green":"blue";var r=document.createElement("li");r.innerHTML=L(e.data),r.style.cssText="margin-top:0.3em; margin-left: 0.5em; list-style: none; margin-bottom: 0.5em",r.style.color=e.color,z.appendChild(n),z.appendChild(r),z.scrollTop=z.scrollHeight}function w(){var e=J.value,t=F.value;if(e&&H.length>1&&0!=e.trim().length){var n={};for(var o in W)n.type="msg",n.data=e,n.name=A,n.color=t,W[o].send(JSON.stringify(n));b(n,!0),J.value=""}}function x(e){for(var t="",n=new Uint8Array(e),o=n.byteLength,r=0;r<o;r++)t+=String.fromCharCode(n[r]);return btoa(t)}function E(e,t){t=t||"";for(var n,o,r=[],i=0;i<e.length;i++){o=e[i],n=new Array(o.length);for(var a=0;a<o.length;a++)n[a]=o.charCodeAt(a);var c=new Uint8Array(n);r.push(c)}var l=new Blob(r,{type:t});return l}function k(e,t,n){var o=document.createElement("li");o.innerText=n+"分享了文件: ",o.style.cssText="margin-top:0.3em; margin-left: 0.5em; list-style: none; margin-bottom: 0.5em";var r=E(t,e.type),i=document.createElement("a");i.href=window.URL.createObjectURL(r),i.download=e.name,i.innerText=e.name,o.appendChild(i),z.appendChild(o),z.scrollTop=z.scrollHeight}function C(){for(var e=document.getElementById("emojiWrapper"),t=document.createDocumentFragment(),n=70;n>0;n--){var o=document.createElement("img");o.src="/images/emoji/"+n+".gif",o.style.cssText="height: 2em; width: 2em; padding: 0.1em",o.title=n,t.appendChild(o)}e.appendChild(t)}function L(e){for(var t,n,o=e,r=/\[emoji:\d+\]/g,i=document.getElementById("emojiWrapper").children.length;t=r.exec(e);)n=t[0].slice(7,-1),o=n>i?o.replace(t[0],"[X]"):o.replace(t[0],'<img class="emoji" src="images/emoji/'+n+'.gif" />');return o}function T(e,t,n){var o={dir:"ltr",lang:"utf-8",icon:n||"/images/bg.jpg",body:t};if(Notification&&"granted"===Notification.permission){var r=new Notification(e,o);r.onshow=function(){setTimeout(function(){r.close()},3e3)}}}function R(e){var t=g(e);v(t),t.peerconnection.createOffer(function(n){t.iceReady=!0,t.peerconnection.setLocalDescription(n),h(n,e)},function(){console.log("创建Offer失败")}),t.iceReady=!0}function B(e){var t=e.from,n=e.sdp,o=g(t);o.peerconnection.setRemoteDescription(new U(n))}function I(e){var t=e.from,n=f(t);return n?(n.peerconnection.createAnswer(function(e){n.iceReady=!0,n.peerconnection.setLocalDescription(e),h(e,t)},function(){console.log("创建Answer失败")}),void(n.iceReady=!0)):void console.error("peerConnection不存在!")}function j(e){var t=e.from,n=e.sdp,o=f(t);return o?void o.peerconnection.setRemoteDescription(new U(n)):void console.error("peerConnection不存在!")}n(8);var N=(window.URL||window.webkitURL||window.msURL||window.oURL,window.PeerConnection||window.webkitPeerConnection00||window.webkitRTCPeerConnection||window.mozRTCPeerConnection),S=window.mozRTCIceCandidate||window.RTCIceCandidate,U=window.mozRTCSessionDescription||window.RTCSessionDescription,O=!1,M=io.connect(window.location.href.split("/webrtc")[0]+"/");M.on("connect",r).on("message",c);var A,H,D=document.getElementById("login-user-button");D.addEventListener("click",function(e){D.disabled=!0;var t=document.getElementById("login-user"),n=t.value;n?(A=n,M.send({type:"login",name:A}),Notification&&"granted"!==Notification.permission&&Notification.requestPermission(function(e){Notification.permission!==e&&(Notification.permission=e)})):(alert("请为自己起一个有b格的用户名吧!"),D.disabled=!1)});var W={},z=document.getElementById("msg");z.innerHTML="";var J=document.getElementById("text-textarea"),P=document.getElementById("text-send"),F=document.getElementById("text-color"),_=document.getElementById("clear-msg");P.addEventListener("click",w),_.addEventListener("click",function(){z.innerHTML=""}),J.addEventListener("keyup",function(e){13===e.keyCode&&H.length>1&&w()}),document.getElementById("text-file-button").addEventListener("click",function(){var e=document.createEvent("MouseEvents");e.initEvent("click",!1,!0),V.dispatchEvent(e)});var q,X,G,K,Q=16e3,V=document.getElementById("text-file");V.addEventListener("change",function(){var e=this.files[0];K=e.name;var t=new FileReader;t.onloadend=function(n){if(V.disabled=!0,n.target.readyState==FileReader.DONE&&window.confirm("是否向房间里的所有用户发送文件:"+K)){var r,i,a,c,l;!function(){var n=function t(){c=a+Q,c>e.size&&(c=e.size,l=!0);for(var n in W)W[n].send(x(i.slice(a,c)));if(l===!0){for(var n in W)W[n].send(JSON.stringify({type:"end",username:A}));var r=document.createElement("li");r.innerText="文件: "+K+"  于"+o()+"上传成功",r.style.cssText="margin-top:0.3em; margin-left: 0.5em; list-style: none; margin-bottom: 0.5em",r.style.color="green",z.appendChild(r),z.scrollTop=z.scrollHeight,V.disabled=!1}else a=c,setTimeout(function(){t()},100)},s={};s.name=e.name,s.size=e.size,s.type=e.type;for(r in W)W[r].send(JSON.stringify({type:"start",data:s}));i=t.result,a=0,c=0,l=!1,n()}()}else V.value="",V.disabled=!1},t.readAsArrayBuffer(e)}),C(),document.getElementById("emoji").addEventListener("click",function(e){var t=document.getElementById("emojiWrapper");t.style.display="block",e.stopPropagation()},!1),document.body.addEventListener("click",function(e){var t=document.getElementById("emojiWrapper");e.target!=t&&(t.style.display="none")}),document.getElementById("emojiWrapper").addEventListener("click",function(e){var t=e.target;"img"==t.nodeName.toLowerCase()&&(J.focus(),J.value=J.value+"[emoji:"+t.title+"]")}),document.getElementById("notice").addEventListener("click",function(){var e=J.value;if(H.length>1&&0!=e.trim().length){var t={};for(var n in W)t.type="notice",t.data=e,t.name=A,W[n].send(JSON.stringify(t));T(A,e),J.value=""}}),document.getElementById("open-video").addEventListener("click",function(e){if(H.length>1){var t={},n="/webrtcvideo?"+i();for(var o in W)t.type="openvideo",t.href=n,t.name=A,W[o].send(JSON.stringify(t));var r=document.createElement("a");r.href=n,r.target="_blank";var a=document.createEvent("MouseEvent");a.initEvent("click",!0,!0),r.dispatchEvent(a)}})},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(e,t,n){function o(e,t){for(var n=0;n<e.length;n++){var o=e[n],r=f[o.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](o.parts[i]);for(;i<o.parts.length;i++)r.parts.push(s(o.parts[i],t))}else{for(var a=[],i=0;i<o.parts.length;i++)a.push(s(o.parts[i],t));f[o.id]={id:o.id,refs:1,parts:a}}}}function r(e){for(var t=[],n={},o=0;o<e.length;o++){var r=e[o],i=r[0],a=r[1],c=r[2],l=r[3],s={css:a,media:c,sourceMap:l};n[i]?n[i].parts.push(s):t.push(n[i]={id:i,parts:[s]})}return t}function i(e,t){var n=v(),o=b[b.length-1];if("top"===e.insertAt)o?o.nextSibling?n.insertBefore(t,o.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),b.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function a(e){e.parentNode.removeChild(e);var t=b.indexOf(e);t>=0&&b.splice(t,1)}function c(e){var t=document.createElement("style");return t.type="text/css",i(e,t),t}function l(e){var t=document.createElement("link");return t.rel="stylesheet",i(e,t),t}function s(e,t){var n,o,r;if(t.singleton){var i=y++;n=h||(h=c(t)),o=d.bind(null,n,i,!1),r=d.bind(null,n,i,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=l(t),o=m.bind(null,n),r=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=c(t),o=u.bind(null,n),r=function(){a(n)});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}function d(e,t,n,o){var r=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=w(t,r);else{var i=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function u(e,t){var n=t.css,o=t.media;if(o&&e.setAttribute("media",o),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function m(e,t){var n=t.css,o=t.sourceMap;o&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var r=new Blob([n],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(r),i&&URL.revokeObjectURL(i)}var f={},p=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},g=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),v=p(function(){return document.head||document.getElementsByTagName("head")[0]}),h=null,y=0,b=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=g()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=r(e);return o(n,t),function(e){for(var i=[],a=0;a<n.length;a++){var c=n[a],l=f[c.id];l.refs--,i.push(l)}if(e){var s=r(e);o(s,t)}for(var a=0;a<i.length;a++){var l=i[a];if(0===l.refs){for(var d=0;d<l.parts.length;d++)l.parts[d]();delete f[l.id]}}}};var w=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},,,function(e,t,n){t=e.exports=n(1)(),t.push([e.id,"body,html{height:100%}.webrtc-body{overflow:hidden}#main{position:relative;margin:2em auto 0;width:50%;height:90%;opacity:.7;border-radius:10px;background-color:#00ced1}.text-title{margin-left:5%;margin-top:.4em;margin-bottom:.4em;display:inline-block}.text-msg{width:90%;height:55%;margin:0 auto;background-color:#b0ecec;word-wrap:break-word;overflow-y:auto}.text-controls{margin-top:1em;margin-left:5%}.text-controls input{margin-right:.5em}.text-controls-itme{height:1.5em}#clear-msg{margin-left:.5em}#emoji{margin-right:.5em}#notice,#open-video{margin-left:.5em}#text-file{width:100%;display:none;overflow:hidden;position:absolute;top:0;left:0}.controls-itme-label,.text-input-box{position:relative}.text-input-box{margin-top:1em;margin-left:5%;height:20%}#text-textarea{width:75%;height:99%}#text-send{position:absolute;right:0;top:0;width:14%;height:100%;margin-right:2.5em}.users-list{position:absolute;top:2em;left:2em;width:20%;height:90%;display:inline-block;background-color:#00ced1;opacity:.8;border-radius:8px}.users-list-title{text-align:center;color:#2f4f4f}.users-list-users{width:90%;height:80%;margin:0 auto;z-index:10;background-color:#fff;opacity:.8;word-wrap:break-word;overflow-y:auto}#login{width:100%;height:100%;position:absolute;top:0;left:0;background-color:#666;display:block}#login-server{display:block;color:#fff}#login-box,#login-server{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}#login-box{display:none}#login-user{margin-right:1em}#emojiWrapper{width:90%;position:absolute;top:32%;left:3%;padding:.5em 0 .2em 1.5em;background-color:#aaa;border-radius:8px}#emojiWrapper img:hover{background-color:#00f}.emoji{margin:0 .4em}",""])},,,function(e,t,n){var o=n(5);"string"==typeof o&&(o=[[e.id,o,""]]),n(2)(o,{}),o.locals&&(e.exports=o.locals)}]);