(() => {
"use strict";
const c=window.ESTIMATE_CONFIG, $=id=>document.getElementById(id);
const yen=n=>"¥"+Math.round(n).toLocaleString("ja-JP");
const esc=s=>String(s??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
$("site-title").textContent=c.siteName||"ILLUSTRATION ORDER";
$("site-subtitle").textContent=c.subtitle||"かんたんお見積もり";
$("menu-list").innerHTML=c.menus.map((m,i)=>`<label class="choice"><input type="radio" name="menu" value="${esc(m.id)}" ${i===0?"checked":""}><span class="choice-text"><span class="choice-name">${esc(m.name)}</span><span class="desc">${esc(m.description||"")}</span></span><span class="price">${yen(m.price)}〜</span></label>`).join("");
$("option-list").innerHTML=c.options.map(o=>`<label class="choice"><input type="checkbox" name="option" value="${esc(o.id)}"><span class="choice-text"><span class="choice-name">${esc(o.name)}</span><span class="desc">${esc(o.description||"")}</span></span><span class="price">＋${yen(o.price)}</span></label>`).join("");
$("notes-list").innerHTML=(c.notes||[]).map(n=>`<li>${esc(n)}</li>`).join("");
const pay=$("payment-date"),due=$("delivery-date");
const daysBetween=(a,b)=>Math.round((new Date(b+"T00:00:00Z")-new Date(a+"T00:00:00Z"))/86400000);
const calcRule=(base,r)=>{let n=r.type==="percent"?base*Number(r.value)/100:Number(r.value);if(Number.isFinite(Number(r.maxAmount)))n=Math.min(n,Number(r.maxAmount));return Math.max(0,Math.round(n));};
function calculate(){
 const menu=c.menus.find(m=>m.id===document.querySelector('input[name="menu"]:checked')?.value)||c.menus[0];
 const opts=c.options.filter(o=>document.querySelector(`input[name="option"][value="${CSS.escape(o.id)}"]`)?.checked);
 const subtotal=Number(menu.price||0)+opts.reduce((s,o)=>s+Number(o.price||0),0);
 let lead=null,error="",rush=null,rushAmount=0,discounts=[];
 if(pay.value&&due.value){lead=daysBetween(pay.value,due.value);if(lead<0)error="納品希望日は支払い予定日と同じ日、またはそれ以降を選んでください。";else{
 const matches=(c.rushRules||[]).filter(r=>lead<=Number(r.withinDays)).sort((a,b)=>Number(a.withinDays)-Number(b.withinDays));
 rush=matches[0]||null;if(rush)rushAmount=calcRule(subtotal,rush);
 discounts=(c.discounts||[]).filter(d=>lead>=Number(d.minLeadDays||0)).map(d=>({rule:d,amount:calcRule(subtotal,d)}));
 }}
 $("date-message").textContent=error||(lead===null?"日程を選ぶと、納期に応じた料金・割引を計算します。":`支払い予定日から納品希望日まで：${lead}日`);
 const rows=[{label:`基本料金：${menu.name}`,amount:Number(menu.price||0)},...opts.map(o=>({label:`オプション：${o.name}`,amount:Number(o.price||0)}))];
 if(rush)rows.push({label:`特急料金：${rush.name}`,amount:rushAmount,kind:"rush"});
 discounts.forEach(d=>rows.push({label:`割引：${d.rule.name}`,amount:-d.amount,kind:"discount"}));
 $("breakdown").innerHTML=rows.map(r=>`<div class="line ${r.kind||""}"><span>${esc(r.label)}</span><strong>${r.amount<0?"−"+yen(-r.amount):yen(r.amount)}</strong></div>`).join("");
 const discountTotal=Math.min(discounts.reduce((s,d)=>s+d.amount,0),subtotal+rushAmount);
 const final=error?null:Math.max(0,subtotal+rushAmount-discountTotal);
 $("total").textContent=final===null?"日程を確認":yen(final);
 const summary=["【イラスト依頼のお見積もり】",`メニュー：${menu.name}（${yen(menu.price)}）`,...opts.map(o=>`オプション：${o.name}（＋${yen(o.price)}）`),`支払い予定日：${pay.value||"未指定"}`,`納品希望日：${due.value||"未指定"}`,...(lead!==null&&!error?[`日程：${lead}日間`]:[]),...(rush&&!error?[`特急料金：${rush.name}（＋${yen(rushAmount)}）`]:[]),...discounts.map(d=>`割引：${d.rule.name}（−${yen(d.amount)}）`),`お見積もり合計：${final===null?"日程を確認してください":yen(final)}`,"",...(c.notes||[])].join("\n");
 $("copy-button").dataset.summary=summary;
}
const today=new Date(),format=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const defaultDue=new Date(today);defaultDue.setDate(defaultDue.getDate()+Number(c.standardLeadDays||30));
pay.value=format(today);due.value=format(defaultDue);due.min=pay.value;
pay.addEventListener("change",()=>{due.min=pay.value;calculate();});due.addEventListener("change",calculate);
document.querySelectorAll('input[name="menu"],input[name="option"]').forEach(el=>el.addEventListener("change",calculate));
$("copy-button").addEventListener("click",async()=>{const txt=$("copy-button").dataset.summary||"";try{await navigator.clipboard.writeText(txt);$("copy-status").textContent="見積もり内容をコピーしました。";}catch(e){const ta=document.createElement("textarea");ta.value=txt;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();const ok=document.execCommand("copy");ta.remove();$("copy-status").textContent=ok?"見積もり内容をコピーしました。":"コピーできませんでした。画面の内容を手動でコピーしてください。";}});
calculate();
})();
