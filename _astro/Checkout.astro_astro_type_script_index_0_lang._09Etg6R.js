var e=(e,t)=>e.replace(/\{(\w+)\}/g,(e,n)=>String(t[n]??``));function t(){return new Intl.DateTimeFormat(`en-CA`,{timeZone:`Europe/Berlin`}).format(new Date)}var n=(e,t)=>Math.round((Date.parse(t)-Date.parse(e))/864e5);function r(e,n,r=t()){return e.every(e=>e.from&&e.to)?e.find(e=>r>=e.from&&r<=e.to)??null:e.find(e=>e.id===n)??null}function i(){let i=document.getElementById(`checkout-config`);if(!i)return;let a=JSON.parse(i.textContent||`{}`),o=a.t,s=e=>new Intl.NumberFormat(a.locale,{style:`currency`,currency:`EUR`,currencyDisplay:`narrowSymbol`,minimumFractionDigits:Number.isInteger(e)?0:2,maximumFractionDigits:2}).format(e),c=e=>e.replace(/[&<>"']/g,e=>`&#${e.charCodeAt(0)};`),l=t(),u=r(a.phases,a.activePhase,l),d=u?a.phases.indexOf(u):a.phases.length;document.querySelectorAll(`[data-phase]`).forEach(t=>{let n=a.phases.findIndex(e=>e.id===t.dataset.phase),r=a.phases[n],i=t.querySelector(`[data-state]`);n<d?(t.classList.add(`soldout`),i.textContent=o.tickets.stateSoldOut):n===d?(t.classList.add(`active`),i.textContent=o.tickets.stateActive):i.textContent=r.fromLabel?e(o.tickets.stateUpcoming,{date:r.fromLabel}):o.tickets.stateNext});let f=document.getElementById(`rise`);if(f){let t=u?a.phases[d+1]:void 0;u&&t?(f.textContent=t.from?e(o.tickets.rise,{price:s(t.total),date:t.fromLabel,days:n(l,t.from)}):e(o.tickets.riseQuota,{n:u.quota,phase:u.name,price:s(t.total)}),f.classList.add(`show`)):u||(f.textContent=o.tickets.salesClosed,f.classList.add(`show`))}let p=document.getElementById(`mcta-price`);p&&u&&(p.textContent=s(u.total));let m=document.getElementById(`checkout`),h=document.getElementById(`checkout-sheet`),g=null,_=()=>{m.classList.remove(`open`),m.hidden=!0,document.body.style.overflow=``,g?.focus()};m.addEventListener(`click`,e=>{e.target===m&&_()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&!m.hidden&&_()});function v(e,t){if(t===`paid`&&!u&&!a.uaEnabled)document.getElementById(`tickets`)?.scrollIntoView({behavior:`smooth`});else{if(a.pretixShopUrl)return x();g=e,S.kind=t===`paid`&&!u?`ua`:t,S.qty=1,S.invoice=!1,T(),m.hidden=!1,m.classList.add(`open`),document.body.style.overflow=`hidden`,h.querySelector(`input[name=first_1]`)?.focus()}}document.querySelectorAll(`[data-open-checkout]`).forEach(e=>e.addEventListener(`click`,t=>{t.preventDefault(),v(e,e.dataset.openCheckout||`paid`)}));let y=null;function b(){if(y)return y;let e=a.pretixShopUrl.endsWith(`/`)?a.pretixShopUrl:a.pretixShopUrl+`/`,t=new URL(e).origin,n=document.createElement(`link`);return n.rel=`stylesheet`,n.href=`${e}widget/v1.css`,document.head.appendChild(n),y=new Promise((e,n)=>{let r=document.createElement(`script`);r.src=`${t}/widget/v1.${a.lang}.js`,r.async=!0,r.onload=()=>e(),r.onerror=()=>n(Error(`pretix widget failed to load`)),document.head.appendChild(r)}),y}async function x(){try{if(await b(),!window.PretixWidget?.open)throw Error(`no PretixWidget`);window.PretixWidget.open(a.pretixShopUrl)}catch{window.open(a.pretixShopUrl,`_blank`,`noopener`)}}let S={kind:`paid`,qty:1,invoice:!1};function C(t){let n=S.kind===`ua`;return`<fieldset class="attendee"><legend>${e(o.attendee,{n:t})}</legend>
      <div class="g2"><label>${o.first} *<input required name="first_${t}" autocomplete="${t===1?`given-name`:`off`}"></label>
      <label>${o.last} *<input required name="last_${t}" autocomplete="${t===1?`family-name`:`off`}"></label></div>
      <label>${o.email} *<input required type="email" name="email_${t}" autocomplete="${t===1?`email`:`off`}"></label>
      <div class="g2"><label>${o.company}${n?` *`:``}<input ${n?`required`:``} name="company_${t}"></label>
      <label>${o.position}<input name="position_${t}"></label></div>
      ${t===1?`<div class="g2"><label>${o.country}<input name="country" autocomplete="country-name"></label><label>${o.phone}<input type="tel" name="phone" autocomplete="tel"></label></div>`:``}
    </fieldset>`}function w(){if(S.kind===`ua`)return`<div class="row tot"><span>${S.qty} × ${c(o.typeUa)}</span><span>${o.free}</span></div>`;let t=u,n=t.gross*S.qty,r=t.vat*S.qty,i=Math.round(t.fee*S.qty*100)/100;return`
      <div class="row"><span>${S.qty} × ${e(o.typePaid,{phase:t.name})}</span><span>${s(n)}</span></div>
      <div class="row" style="font-size:12px;color:#777"><span>${e(o.vatIncl,{rate:Math.round(a.vatRate*100)})}</span><span>${s(Math.round(r*100)/100)}</span></div>
      ${i?`<div class="row"><span>${o.fee}</span><span>${s(i)}</span></div>`:``}
      <div class="row tot"><span>${o.total}</span><span>${s(Math.round((n+i)*100)/100)}</span></div>`}function T(){let t=S.kind===`ua`,n=[u?`<label><span><input type="radio" name="kind" value="paid" ${t?``:`checked`}>${e(o.typePaid,{phase:u.name})}</span><b>${s(u.total)}</b></label>`:``,a.uaEnabled?`<label><span><input type="radio" name="kind" value="ua" ${t?`checked`:``}>${o.typeUa}</span><b>${o.free}</b></label>`:``].join(``);h.innerHTML=`
      <header><h3 id="checkout-title">${o.title}</h3><button type="button" data-close aria-label="${o.close}">×</button></header>
      <div class="body">
        <div class="demo-flag">${o.demo}</div>
        <fieldset class="types" style="border:0"><legend style="font-size:13px;font-weight:600;color:var(--navy);margin-bottom:8px">${o.type}</legend>${n}</fieldset>
        <div class="qtyrow"><b style="color:var(--navy)">${o.qty}</b>
          <div class="qty"><button type="button" data-q="-1" aria-label="−">−</button><span id="co-qty">${S.qty}</span><button type="button" data-q="1" aria-label="+">+</button></div>
        </div>
        <div class="sum" id="co-sum">${w()}</div>
        <form id="co-form">
          <p class="note-box">${t?o.uaNote:o.buyerNote}</p>
          ${t?`<label>${o.regNo} *<input required name="reg_no" inputmode="numeric"></label>`:``}
          <div id="co-attendees" style="display:grid;gap:14px">${Array.from({length:S.qty},(e,t)=>C(t+1)).join(``)}</div>
          ${t?``:`
          <label class="toggle">${o.invoice}<input type="checkbox" id="co-inv" ${S.invoice?`checked`:``}></label>
          <div class="invoice ${S.invoice?`show`:``}" id="co-inv-box">
            <label>${o.invName} *<input name="inv_name" ${S.invoice?`required`:``}></label>
            <label>${o.invAddr} *<textarea name="inv_addr" rows="2" ${S.invoice?`required`:``}></textarea></label>
            <label>${o.invVat}<input name="inv_vat"></label>
          </div>
          <fieldset style="border:0"><legend style="font-size:13px;font-weight:600;color:var(--navy);margin-bottom:8px">${o.payment}</legend>
            <div class="pay">
              <label><input type="radio" name="pm" value="card" checked> ${o.card}</label>
              <label><input type="radio" name="pm" value="paypal"> ${o.paypal}</label>
              ${S.invoice?`<label><input type="radio" name="pm" value="transfer"> ${o.transfer}</label>`:``}
            </div>
            <p class="note-box" id="co-trf-note" style="display:none;margin-top:10px">${e(o.transferNote,{days:a.invoiceDays})}</p>
          </fieldset>`}
          <label class="chk"><input type="checkbox" required name="terms"> ${o.terms}</label>
          <label class="chk"><input type="checkbox" name="marketing"> ${o.marketing}</label>
          <button class="btn btn-primary" style="width:100%;margin-top:4px">${t?o.register:o.pay} →</button>
          <p class="powered">🔒 ${o.powered}</p>
        </form>
      </div>`,h.querySelector(`[data-close]`).addEventListener(`click`,_),h.querySelectorAll(`input[name=kind]`).forEach(e=>e.addEventListener(`change`,()=>{S.kind=e.value,E()})),h.querySelectorAll(`[data-q]`).forEach(e=>e.addEventListener(`click`,()=>{S.qty=Math.min(a.maxPerOrder,Math.max(1,S.qty+Number(e.dataset.q))),E()})),h.querySelector(`#co-inv`)?.addEventListener(`change`,e=>{S.invoice=e.target.checked,E()}),h.querySelectorAll(`input[name=pm]`).forEach(e=>e.addEventListener(`change`,()=>{let t=h.querySelector(`#co-trf-note`);t&&(t.style.display=e.value===`transfer`&&e.checked?`block`:`none`)}));let r=h.querySelector(`#co-form`);r.addEventListener(`submit`,e=>{if(e.preventDefault(),!r.reportValidity())return;let t=new FormData(r);D(String(t.get(`email_1`)||``),S.kind===`ua`?o.thanksUa:t.get(`pm`)===`transfer`?o.thanksTransfer:o.thanksText)})}function E(){let e=h.querySelector(`#co-form`),t=new Map;e?.querySelectorAll(`input:not([type=radio]):not([type=checkbox]),textarea`).forEach(e=>e.name&&t.set(e.name,e.value)),T(),h.querySelectorAll(`input:not([type=radio]):not([type=checkbox]),textarea`).forEach(e=>{t.has(e.name)&&(e.value=t.get(e.name))})}function D(e,t){h.innerHTML=`
      <header><h3 id="checkout-title">${o.title}</h3><button type="button" data-close aria-label="${o.close}">×</button></header>
      <div class="body done">
        <div class="ok"><svg width="30" height="30" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 15l7 7L25 8"/></svg></div>
        <h3 style="font-size:24px">${o.thanks}</h3>
        <p>${t} <b id="co-email"></b></p>
        ${S.kind===`paid`?`<div class="qr" aria-hidden="true"></div><p style="font-size:13px;color:#888">DIF27-DEMO</p>`:``}
        <button class="btn btn-primary" type="button" data-close style="margin-top:20px">${o.close}</button>
      </div>`,h.querySelector(`#co-email`).textContent=e,h.querySelectorAll(`[data-close]`).forEach(e=>e.addEventListener(`click`,_))}}i();