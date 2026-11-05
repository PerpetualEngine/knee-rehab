/* Today card: streak, how the knee feels, daily calendar reminder. Stays on the phone. */
(function(){
var K="kr-log",$=function(i){return document.getElementById(i);};
function load(){try{return JSON.parse(localStorage.getItem(K)||"{}");}catch(e){return {};}}
function save(l){try{localStorage.setItem(K,JSON.stringify(l));}catch(e){}}
function key(d){d=d||new Date();return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);}
function ago(n){var d=new Date();d.setDate(d.getDate()-n);return d;}
function did(l,d){var e=l[key(d)];return !!(e&&e.done&&e.done.length);}
function streak(l){var n=0,i=did(l,ago(0))?0:1;while(did(l,ago(i))){n++;i++;}return n;}
window.kneeDone=function(idx){var l=load(),k=key();l[k]=l[k]||{};l[k].done=l[k].done||[];if(l[k].done.indexOf(idx)<0)l[k].done.push(idx);save(l);render();};
var root=$("today");
root.innerHTML='<div style="background:var(--surface-1);border-radius:12px;padding:12px;margin:0 0 12px;">'+
'<div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;"><span style="font-weight:500;font-size:15px;">Today</span><span id="hsum" style="font-size:13px;color:var(--text-secondary);"></span></div>'+
'<div id="hdots" style="display:flex;gap:6px;margin:8px 0;"></div>'+
'<details style="margin-top:6px;"><summary style="font-size:13px;cursor:pointer;color:var(--text-accent);">How does your knee feel today?</summary>'+
'<div style="display:flex;gap:8px;margin:8px 0;flex-wrap:wrap;align-items:center;font-size:13px;">Pain <select id="hpain" style="font:inherit;padding:6px;border-radius:8px;"></select> Swelling <select id="hswell" style="font:inherit;padding:6px;border-radius:8px;"><option value="none">none</option><option value="a little">a little</option><option value="more">more than usual</option></select> <button id="hsave" style="font-size:13px;padding:6px 12px;">Save</button></div>'+
'<p id="hmsg" style="font-size:13px;margin:0;color:var(--text-secondary);line-height:1.5;"></p><div id="hhist" style="font-size:12px;color:var(--text-secondary);margin-top:6px;line-height:1.6;"></div></details>'+
'<details style="margin-top:8px;"><summary style="font-size:13px;cursor:pointer;color:var(--text-accent);">Remind me every day</summary>'+
'<div style="display:flex;gap:8px;margin:8px 0;align-items:center;font-size:13px;">At <input id="rtime" type="time" value="18:00" style="font:inherit;padding:6px;border-radius:8px;"> <button id="rbtn" style="font-size:13px;padding:6px 12px;">Add to my calendar</button></div>'+
'<p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.5;">Adds a repeating event with an alert to your phone calendar. Do this in your browser, not from the Home Screen icon.</p></details></div>';
var ps=$("hpain");for(var i=0;i<=10;i++){var o=document.createElement("option");o.value=i;o.textContent=i;ps.appendChild(o);}
function render(){
  var l=load(),e=l[key()]||{},n=(e.done||[]).length,s=streak(l);
  $("hsum").textContent=(n?n+" done today":"nothing yet today")+(s?" · "+s+(s===1?" day":" days")+" in a row":"");
  var d=$("hdots");d.innerHTML="";
  for(var i=6;i>=0;i--){var dt=ago(i),on=did(l,dt),c=document.createElement("div");c.style.cssText="flex:1;text-align:center;font-size:11px;color:var(--text-secondary);";
    c.innerHTML='<div style="width:22px;height:22px;border-radius:50%;margin:0 auto 2px;border:2px solid '+(on?'#1D9E75':'var(--border-strong)')+';background:'+(on?'#1D9E75':'transparent')+';"></div>'+"SMTWTFS".charAt(dt.getDay());d.appendChild(c);}
  if(e.pain!=null){ps.value=e.pain;$("hswell").value=e.swell||"none";}
  var keys=Object.keys(l).filter(function(k){return l[k].pain!=null;}).sort().slice(-5).reverse();
  $("hhist").innerHTML=keys.map(function(k){return k+": pain "+l[k].pain+", swelling "+l[k].swell;}).join("<br>");
}
$("hsave").onclick=function(){var l=load(),k=key();l[k]=l[k]||{};l[k].pain=+ps.value;l[k].swell=$("hswell").value;save(l);
  $("hmsg").textContent=(l[k].pain>=4||l[k].swell==="more")?"That is above the usual limit. Go easier tomorrow, skip the strength work if it is still sore, and check with your physio if it keeps happening.":"Saved.";render();};
try{var rt=localStorage.getItem("kr-rtime");if(rt)$("rtime").value=rt;}catch(e){}
$("rbtn").onclick=function(){
  var t=$("rtime").value||"18:00",p=t.split(":");try{localStorage.setItem("kr-rtime",t);}catch(e){}
  var url=location.origin+location.pathname,stamp=new Date().toISOString().replace(/[-:]/g,"").slice(0,15)+"Z";
  var ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Knee rehab//EN","BEGIN:VEVENT","UID:knee-rehab-daily@"+location.host,"DTSTAMP:"+stamp,"DTSTART:"+key().replace(/-/g,"")+"T"+p[0]+p[1]+"00","DURATION:PT20M","RRULE:FREQ=DAILY","SUMMARY:Knee rehab session","DESCRIPTION:Open the app: "+url,"URL:"+url,"BEGIN:VALARM","TRIGGER:PT0M","ACTION:DISPLAY","DESCRIPTION:Knee rehab session","END:VALARM","END:VEVENT","END:VCALENDAR"].join("\r\n");
  var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([ics],{type:"text/calendar"}));a.download="knee-rehab-daily.ics";document.body.appendChild(a);a.click();a.remove();
};
render();
})();
