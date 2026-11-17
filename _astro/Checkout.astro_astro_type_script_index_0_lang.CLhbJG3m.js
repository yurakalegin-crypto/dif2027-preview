var e=(e,t)=>e.replace(/\{(\w+)\}/g,(e,n)=>String(t[n]??``));function t(){return new Intl.DateTimeFormat(`en-CA`,{timeZone:`Europe/Berlin`}).format(new Date)}function n(e,t){return Math.round((Date.parse(t)-Date.parse(e))/864e5)}function r(e,n=t()){return e.find(e=>n>=e.from&&n<=e.to)??null}function i(){let i=document.getElementById(`checkout-config`);if(!i)return;let a=JSON.parse(i.textContent||`{}`),o=a.t,s=e=>new Intl.NumberFormat(a.locale,{style:`currency`,currency:`EUR`,currencyDisplay:`narrowSymbol`,minimumFractionDigits:Number.isInteger(e)?0:2}).format(e),c=t(),l=r(a.phases,c);document.querySelectorAll(`[data-phase]`).forEach(t=>{let n=a.phases.find(e=>e.id===t.dataset.phase),r=t.querySelector(`[data-state]`);c>n.to?(t.classList.add(`past`),r.textContent=o.tickets.stateEnded):n===l?(t.classList.add(`active`),r.textContent=o.tickets.stateActive):r.textContent=e(o.tickets.stateUpcoming,{date:n.fromLabel})});let u=document.getElementById(`rise`);if(u){if(l){let t=a.phases[a.phases.indexOf(l)+1];t&&(u.textContent=e(o.tickets.rise,{price:s(t.priceNet),date:t.fromLabel,days:n(c,t.from)}),u.classList.add(`show`))}else c>a.phases[a.phases.length-1].to&&(u.textContent=o.tickets.salesClosed,u.classList.add(`show`))}let d=document.getElementById(`mcta-price`);d&&l&&(d.textContent=`${s(l.priceNet)} ${o.tickets.net}`);let f=document.getElementById(`checkout`),p=document.getElementById(`checkout-sheet`),m=null,h=()=>{f.classList.remove(`open`),f.hidden=!0,document.body.style.overflow=``,m?.focus()};f.addEventListener(`click`,e=>{e.target===f&&h()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&!f.hidden&&h()});function g(e){if(!l)document.getElementById(`tickets`)?.scrollIntoView({behavior:`smooth`});else{if(a.pretixShopUrl)return y();m=e,C(),f.hidden=!1,f.classList.add(`open`),document.body.style.overflow=`hidden`,p.querySelector(`input[name=first]`)?.focus()}}document.querySelectorAll(`[data-open-checkout]`).forEach(e=>e.addEventListener(`click`,t=>{t.preventDefault(),g(e)}));let _=null;function v(){if(_)return _;let e=a.pretixShopUrl.endsWith(`/`)?a.pretixShopUrl:a.pretixShopUrl+`/`,t=new URL(e).origin,n=document.createElement(`link`);return n.rel=`stylesheet`,n.href=`${e}widget/v1.css`,document.head.appendChild(n),_=new Promise((e,n)=>{let r=document.createElement(`script`);r.src=`${t}/widget/v1.${a.lang}.js`,r.async=!0,r.onload=()=>e(),r.onerror=()=>n(Error(`pretix widget failed to load`)),document.head.appendChild(r)}),_}async function y(){try{if(await v(),!window.PretixWidget?.open)throw Error(`no PretixWidget`);window.PretixWidget.open(a.pretixShopUrl)}catch{window.open(a.pretixShopUrl,`_blank`,`noopener`)}}let b=1;function x(){let e=l.priceNet*b,t=Math.round(e*a.vatRate*100)/100;return{net:e,vat:t,total:e+t}}function S(){let t=x();p.querySelector(`#co-qty`).textContent=String(b),p.querySelector(`#co-sum`).innerHTML=`
      <div class="row"><span>${b} × ${o.tickets.ticketName}</span><span>${s(t.net)}</span></div>
      <div class="phase-line">${e(o.phaseLine,{phase:l.name,date:l.toLabel})}</div>
      <div class="row"><span>${o.vat} ${Math.round(a.vatRate*100)}%</span><span>${s(t.vat)}</span></div>
      <div class="row tot"><span>${o.total}</span><span>${s(t.total)}</span></div>`}function C(){b=1,p.innerHTML=`
      <header><h3 id="checkout-title">${o.title}</h3><button type="button" data-close aria-label="${o.close}">×</button></header>
      <div class="body">
        <div class="demo-flag">${o.demo}</div>
        <div class="qtyrow"><b style="color:var(--navy)">${o.qty}</b>
          <div class="qty"><button type="button" data-q="-1" aria-label="−">−</button><span id="co-qty">1</span><button type="button" data-q="1" aria-label="+">+</button></div>
        </div>
        <div class="sum" id="co-sum"></div>
        <form id="co-form" novalidate>
          <div class="g2"><label>${o.first} *<input required name="first" autocomplete="given-name"></label><label>${o.last} *<input required name="last" autocomplete="family-name"></label></div>
          <label>${o.email} *<input required type="email" name="email" autocomplete="email"></label>
          <div class="g2"><label>${o.company}<input name="company" autocomplete="organization"></label><label>${o.position}<input name="position" autocomplete="organization-title"></label></div>
          <div class="g2"><label>${o.country}<input name="country" autocomplete="country-name"></label><label>${o.phone}<input type="tel" name="phone" autocomplete="tel"></label></div>
          <label class="toggle">${o.invoice}<input type="checkbox" id="co-inv"></label>
          <div class="invoice" id="co-inv-box">
            <label>${o.invName} *<input name="inv_name"></label>
            <label>${o.invAddr} *<textarea name="inv_addr" rows="2"></textarea></label>
            <label>${o.invVat}<input name="inv_vat"></label>
          </div>
          <fieldset style="border:0"><legend style="font-size:13px;font-weight:600;color:var(--navy);margin-bottom:8px">${o.payment}</legend>
            <div class="pay">
              <label><input type="radio" name="pm" value="card" checked> ${o.card}</label>
              <label><input type="radio" name="pm" value="paypal"> ${o.paypal}</label>
              <label id="co-trf" style="display:none"><input type="radio" name="pm" value="transfer"> ${o.transfer}</label>
            </div>
          </fieldset>
          <label class="chk"><input type="checkbox" required name="terms"> ${o.terms}</label>
          <label class="chk"><input type="checkbox" name="marketing"> ${o.marketing}</label>
          <button class="btn btn-primary" style="width:100%;margin-top:4px">${o.pay} →</button>
          <p class="powered">🔒 ${o.powered}</p>
        </form>
      </div>`,S(),p.querySelector(`[data-close]`).addEventListener(`click`,h),p.querySelectorAll(`[data-q]`).forEach(e=>e.addEventListener(`click`,()=>{b=Math.min(a.maxPerOrder,Math.max(1,b+Number(e.dataset.q))),S()}));let e=p.querySelector(`#co-inv`),t=p.querySelector(`#co-inv-box`),n=p.querySelector(`#co-trf`);e.addEventListener(`change`,()=>{t.classList.toggle(`show`,e.checked),n.style.display=e.checked?`flex`:`none`,t.querySelectorAll(`[name=inv_name],[name=inv_addr]`).forEach(t=>t.required=e.checked),e.checked||(p.querySelector(`input[value=card]`).checked=!0)});let r=p.querySelector(`#co-form`);r.addEventListener(`submit`,e=>{e.preventDefault(),r.reportValidity()&&w(String(new FormData(r).get(`email`)||``))})}function w(e){p.innerHTML=`
      <header><h3 id="checkout-title">${o.title}</h3><button type="button" data-close aria-label="${o.close}">×</button></header>
      <div class="body done">
        <div class="ok"><svg width="30" height="30" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 15l7 7L25 8"/></svg></div>
        <h3 style="font-size:24px">${o.thanks}</h3>
        <p>${o.thanksText} <b id="co-email"></b></p>
        <div class="qr" aria-hidden="true"></div>
        <p style="font-size:13px;color:#888">DIF27-DEMO</p>
        <button class="btn btn-primary" type="button" data-close style="margin-top:20px">${o.close}</button>
      </div>`,p.querySelector(`#co-email`).textContent=e,p.querySelectorAll(`[data-close]`).forEach(e=>e.addEventListener(`click`,h))}}i();