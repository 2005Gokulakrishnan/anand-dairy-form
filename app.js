(() => {
  const cfg = window.ANAND_CONFIG || {};
  const products = [
    {id:'milk-cow',name:'Cow Milk',category:'Milk',size:'500 ml · sample',price:32,desc:'Everyday milk for your home.',img:'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=80'},
    {id:'milk-buffalo',name:'Buffalo Milk',category:'Milk',size:'500 ml · sample',price:38,desc:'A richer milk option.',img:'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80'},
    {id:'curd',name:'Fresh Curd',category:'Curd',size:'500 g · sample',price:45,desc:'A familiar everyday dairy staple.',img:'https://images.unsplash.com/photo-1571212515416-fca2d7d6e4b7?auto=format&fit=crop&w=700&q=80'},
    {id:'ghee',name:'Ghee',category:'Ghee',size:'200 ml · sample',price:165,desc:'A traditional kitchen favourite.',img:'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80'},
    {id:'butter',name:'Butter',category:'Other',size:'100 g · sample',price:58,desc:'A versatile dairy essential.',img:'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=700&q=80'},
    {id:'paneer',name:'Paneer',category:'Other',size:'200 g · sample',price:90,desc:'A useful addition to everyday meals.',img:'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80'},
    {id:'buttermilk',name:'Buttermilk',category:'Other',size:'250 ml · sample',price:20,desc:'A light dairy refreshment.',img:'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80'},
    {id:'cream',name:'Fresh Cream',category:'Other',size:'200 ml · sample',price:75,desc:'For cooking and dessert ideas.',img:'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=80'}
  ];
  const $ = s => document.querySelector(s);
  const money = n => new Intl.NumberFormat('en-IN',{style:'currency',currency:cfg.currency||'INR',maximumFractionDigits:0}).format(n);
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem('anand-cart') || '{}') || {}; } catch { cart = {}; }
  let category = 'All';
  const grid = $('#product-grid');
  const toast = msg => { const el=$('#toast'); el.textContent=msg; el.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),2600); };
  const persist = () => { try { localStorage.setItem('anand-cart',JSON.stringify(cart)); } catch {} renderCart(); };
  function renderProducts(){
    const q=$('#product-search').value.trim().toLowerCase();
    const list=products.filter(p=>(category==='All'||(category==='Other'?p.category==='Other':p.category===category)) && `${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(q));
    grid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.img}" alt="${p.name}" loading="lazy"><span class="demo-tag">SAMPLE ITEM</span></div><div class="product-info"><span class="product-meta">${p.category} · DEMO</span><h3>${p.name}</h3><p>${p.size}</p><div class="product-bottom"><span class="product-price">${money(p.price)}<small>sample price</small></span><button class="add-btn" data-add="${p.id}" aria-label="Add ${p.name} to cart">+</button></div></div></article>`).join('');
    $('#empty-state').hidden=!!list.length;
  }
  function renderCart(){
    const entries=Object.entries(cart).filter(([,q])=>q>0); const count=entries.reduce((a,[,q])=>a+q,0); const total=entries.reduce((a,[id,q])=>a+(products.find(p=>p.id===id)?.price||0)*q,0);
    $('#cart-count').textContent=count; $('#drawer-count').textContent=`(${count})`; $('#cart-total').textContent=money(total);
    $('#cart-items').innerHTML=entries.map(([id,q])=>{const p=products.find(x=>x.id===id);if(!p)return '';return `<div class="cart-row"><img src="${p.img}" alt=""><div><h4>${p.name}</h4><small>${p.size}</small><div class="qty-control"><button data-qty="${id}" data-delta="-1" aria-label="Decrease ${p.name}">−</button><span>${q}</span><button data-qty="${id}" data-delta="1" aria-label="Increase ${p.name}">+</button></div></div><div><strong>${money(p.price*q)}</strong><br><button class="remove-item" data-remove="${id}">Remove</button></div></div>`}).join('');
    $('#cart-empty').style.display=count?'none':'block'; $('#cart-footer').style.display=count?'block':'none';
    $('#checkout-summary').innerHTML=entries.map(([id,q])=>{const p=products.find(x=>x.id===id);return `<div><span>${p.name} × ${q}</span><b>${money(p.price*q)}</b></div>`}).join('')+`<div><b>Estimated subtotal</b><b>${money(total)}</b></div>`;
  }
  grid.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(!b)return;cart[b.dataset.add]=(cart[b.dataset.add]||0)+1;persist();toast('Added to your cart');});
  $('#filters').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;category=b.dataset.category;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));renderProducts();});
  $('#product-search').addEventListener('input',renderProducts);
  $('#cart-items').addEventListener('click',e=>{const q=e.target.closest('[data-qty]'),r=e.target.closest('[data-remove]');if(q){const id=q.dataset.qty;cart[id]=Math.max(0,(cart[id]||0)+Number(q.dataset.delta));if(!cart[id])delete cart[id];persist();}if(r){delete cart[r.dataset.remove];persist();}});
  const openCart=()=>{$('#cart-overlay').classList.add('open');$('#cart-overlay').setAttribute('aria-hidden','false');document.body.classList.add('no-scroll');};
  const closeCart=()=>{$('#cart-overlay').classList.remove('open');$('#cart-overlay').setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll');};
  $('#open-cart').addEventListener('click',openCart);$('#close-cart').addEventListener('click',closeCart);$('#cart-overlay').addEventListener('click',e=>{if(e.target===$('#cart-overlay'))closeCart();});
  $('#continue-shopping').addEventListener('click',()=>{closeCart();$('#products').scrollIntoView({behavior:'smooth'});});
  $('#checkout-button').addEventListener('click',()=>{closeCart();$('#checkout-modal').classList.add('open');$('#checkout-modal').setAttribute('aria-hidden','false');document.body.classList.add('no-scroll');});
  const closeCheckout=()=>{$('#checkout-modal').classList.remove('open');$('#checkout-modal').setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll');};
  $('#close-checkout').addEventListener('click',closeCheckout);$('#checkout-modal').addEventListener('click',e=>{if(e.target===$('#checkout-modal'))closeCheckout();});
  function orderMessage(data){const entries=Object.entries(cart).filter(([,q])=>q>0);const lines=entries.map(([id,q])=>{const p=products.find(x=>x.id===id);return `${p.name} – ${q} × ${p.size} – ${money(p.price*q)} (sample price)`;});const total=entries.reduce((a,[id,q])=>a+products.find(p=>p.id===id).price*q,0);return `Hello ${cfg.businessName||'Anand Dairy Farms'},\n\nI would like to enquire about placing an order.\n\nCustomer: ${data.name}\nMobile: ${data.phone}\nDelivery address: ${data.address||data.location}\nArea: ${data.area||data.location}\nPayment preference: ${data.payment||'To be confirmed'}\n\nProducts:\n${lines.join('\n')}\n\nEstimated subtotal: ${money(total)} (sample prices; please confirm actual pricing)\n\nPlease confirm product availability, final pricing and delivery coverage. Thank you.`;}
  async function shareMessage(message,feedback){const number=(cfg.whatsappNumber||'').replace(/\D/g,'');if(number){window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`,'_blank','noopener');feedback.textContent='WhatsApp opened with your prepared message. Send it to contact the business.';}else{try{await navigator.clipboard.writeText(message);feedback.textContent='Message copied. Add the business WhatsApp number in config.js to enable direct WhatsApp ordering.';}catch{feedback.textContent='Business WhatsApp number is not configured. Add it in config.js before enabling direct ordering.';}}}
  $('#checkout-form').addEventListener('submit',async e=>{e.preventDefault();if(!Object.keys(cart).length)return;const data=Object.fromEntries(new FormData(e.currentTarget));await shareMessage(orderMessage(data),$('#checkout-feedback'));});
  $('#contact-form').addEventListener('submit',async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget));const msg=`Hello Anand Dairy Farms,\n\nEnquiry from ${d.name}\nMobile: ${d.phone}\nLocation: ${d.location}\nMessage: ${d.message}`;await shareMessage(msg,$('#form-feedback'));});
  $('#menu-toggle').addEventListener('click',()=>{const open=$('#mobile-nav').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(open));});
  $('#mobile-nav').addEventListener('click',e=>{if(e.target.closest('a')){$('#mobile-nav').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');}});
  $('#year').textContent=new Date().getFullYear();$('#maps-link').href=cfg.googleMapsUrl||'#';
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  window.addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('done'),450));setTimeout(()=>$('#loader').classList.add('done'),1800);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeCart();closeCheckout();$('#mobile-nav').classList.remove('open');}});
  renderProducts();renderCart();
})();
