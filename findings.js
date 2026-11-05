/* "My findings" tab: marked findings, suggested exercises, and the user's own routine. Stays on the phone. */
(function(){
var $=function(i){return document.getElementById(i);};
var S={f:{R:[],L:[]},plan:ex.map(function(e,i){return i;})};
try{var o=JSON.parse(localStorage.getItem("kr-state")||"{}");if(o.f&&o.f.R&&o.f.L)S.f=o.f;if(Array.isArray(o.plan)&&o.plan.length)S.plan=o.plan.filter(function(i){return i>=0&&i<ex.length;});}catch(e){}
window.kneeState=S;
var side="R";
function save(){try{localStorage.setItem("kr-state",JSON.stringify(S));}catch(e){}}
function mark(b,on){b.style.borderColor=on?"var(--border-accent)":"";b.style.background=on?"var(--bg-accent)":"";b.style.color=on?"var(--text-accent)":"";}
function suggested(){var u={};["R","L"].forEach(function(s){S.f[s].forEach(function(k){var f=KF.byKey[k];if(f)f.ex.forEach(function(i){u[i]=1;});});});return Object.keys(u).map(Number).sort(function(a,b){return a-b;});}
window.kneeSuggested=suggested;
function changed(){save();if(window.kneeStars)kneeStars();if(window.kneeRefresh3d)kneeRefresh3d();}
function row(text,on,fn){
  var l=document.createElement("label");l.style.cssText="display:flex;gap:10px;align-items:flex-start;padding:10px;border:1px solid var(--border-strong);border-radius:8px;font-size:14px;line-height:1.4;cursor:pointer;background:var(--surface-1);";
  var c=document.createElement("input");c.type="checkbox";c.checked=on;c.style.cssText="margin-top:2px;width:18px;height:18px;accent-color:#1D9E75;flex:none;";c.onchange=function(){fn(c.checked);};
  var t=document.createElement("span");t.textContent=text;l.appendChild(c);l.appendChild(t);return l;
}
function drawFindings(){
  mark($("fR"),side==="R");mark($("fL"),side==="L");
  var box=$("flist");box.innerHTML="";
  KF.list.forEach(function(f){box.appendChild(row(f.label,S.f[side].indexOf(f.k)>=0,function(on){var a=S.f[side],i=a.indexOf(f.k);if(on&&i<0)a.push(f.k);if(!on&&i>=0)a.splice(i,1);changed();drawSug();}));});
}
function drawSug(){
  var s=suggested(),box=$("fsug");box.innerHTML="";
  var h=document.createElement("p");h.style.cssText="font-weight:500;margin:0 0 6px;";h.textContent=s.length?"Good fits for what you marked":"Suggested exercises";box.appendChild(h);
  if(!s.length){var p=document.createElement("p");p.style.cssText="margin:0;color:var(--text-secondary);";p.textContent="Mark a finding above to see which exercises fit, or tick your physio's list below.";box.appendChild(p);return;}
  var g=document.createElement("div");g.style.cssText="display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px;";
  s.forEach(function(i){var b=document.createElement("button");b.textContent="★ "+ex[i].n;b.style.cssText="font-size:13px;padding:6px 10px;";b.onclick=function(){if(window.kneeGo)kneeGo(i);};g.appendChild(b);});
  box.appendChild(g);
  var seen={},cn=document.createElement("ul");cn.style.cssText="margin:0;padding-left:18px;color:var(--text-secondary);font-size:13px;";
  ["R","L"].forEach(function(sd){S.f[sd].forEach(function(k){var f=KF.byKey[k];if(f&&f.note&&!seen[f.note]){seen[f.note]=1;var li=document.createElement("li");li.textContent=f.note;cn.appendChild(li);}});});
  box.appendChild(cn);
}
function drawPlan(){
  var box=$("fplan");box.innerHTML="";
  ex.forEach(function(e,i){box.appendChild(row((i+1)+". "+e.n,S.plan.indexOf(i)>=0,function(on){var a=S.plan,j=a.indexOf(i);if(on&&j<0)a.push(i);if(!on&&j>=0)a.splice(j,1);a.sort(function(x,y){return x-y;});changed();}));});
}
$("fR").onclick=function(){side="R";drawFindings();};
$("fL").onclick=function(){side="L";drawFindings();};
$("pAll").onclick=function(){S.plan=ex.map(function(e,i){return i;});window.kneeState=S;changed();drawPlan();};
$("pNone").onclick=function(){S.plan.length=0;changed();drawPlan();};
$("pSug").onclick=function(){var s=suggested();if(!s.length)return;S.plan.length=0;s.forEach(function(i){S.plan.push(i);});changed();drawPlan();};
drawFindings();drawSug();drawPlan();
})();
