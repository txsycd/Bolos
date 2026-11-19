/* ==========================================================================
   Bolo's — configuración rápida
   Cambia estos datos y el sitio se actualiza solo.
   ========================================================================== */

const CONFIG = {
  marca: "Bolo's",
  // Tu número de WhatsApp con código de país. Sin +, sin espacios ni guiones.
  whatsapp: '51904647219',
  locale: 'es-Pe',
  moneda: 'PEN',
  envioGratisDesde: 25,
  costoEnvio: 5, // delivery en pedidos que no llegan al envío gratis
};

/* ---------- Utilidades ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const money = (n) => new Intl.NumberFormat(CONFIG.locale, {
  style: 'currency',
  currency: CONFIG.moneda,
  minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
  maximumFractionDigits: 2,
}).format(n);

let uidCounter = 0;

/* ---------- Ilustración de bolo (SVG generativo) ---------- */
function boloSVG(f) {
  const uid = 'b' + (++uidCounter);

  const bits = [
    [78, 104, 5], [118, 88, 3.4], [158, 116, 4.6], [92, 148, 3],
    [142, 162, 5.2], [76, 192, 4], [122, 208, 3.6], [160, 204, 3],
    [100, 236, 4.4], [148, 246, 3.2],
  ].map(([cx, cy, r], i) =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f.bit}" opacity="${i % 2 ? .34 : .5}"/>`
  ).join('');

  const crimps = [70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170]
    .map((x) => `<path d="M${x} 21v16"/>`).join('');

  return `
  <svg viewBox="0 0 240 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="juice-${uid}" x1=".12" y1="0" x2=".82" y2="1">
        <stop offset="0" stop-color="${f.light}"/>
        <stop offset=".42" stop-color="${f.base}"/>
        <stop offset="1" stop-color="${f.dark}"/>
      </linearGradient>
      <linearGradient id="seal-${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${f.sealLight}"/>
        <stop offset="1" stop-color="${f.seal}"/>
      </linearGradient>
      <radialGradient id="frost-${uid}" cx=".28" cy=".06" r=".95">
        <stop offset="0" stop-color="#fff" stop-opacity=".62"/>
        <stop offset=".55" stop-color="#fff" stop-opacity=".12"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="shine-${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".7"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <clipPath id="clip-${uid}">
        <path d="M80 14H160Q180 14 180 36V260Q180 286 154 286H86Q60 286 60 260V36Q60 14 80 14Z"/>
      </clipPath>
    </defs>

    <ellipse cx="120" cy="293" rx="50" ry="7" fill="#0E2A2B" opacity=".14"/>

    <path d="M80 14H160Q180 14 180 36V260Q180 286 154 286H86Q60 286 60 260V36Q60 14 80 14Z" fill="url(#juice-${uid})"/>

    <g clip-path="url(#clip-${uid})">
      <circle cx="84" cy="118" r="42" fill="#fff" opacity=".10"/>
      <circle cx="156" cy="198" r="50" fill="${f.dark}" opacity=".16"/>
      ${bits}
      <rect x="60" y="14" width="120" height="272" fill="url(#frost-${uid})"/>
      <rect x="72" y="58" width="11" height="150" rx="5.5" fill="url(#shine-${uid})" opacity=".55"/>
      <circle cx="158" cy="76" r="3" fill="#fff" opacity=".5"/>
      <circle cx="146" cy="94" r="1.8" fill="#fff" opacity=".45"/>
      <circle cx="168" cy="104" r="1.4" fill="#fff" opacity=".4"/>
    </g>

    <rect x="60" y="14" width="120" height="28" rx="14" fill="url(#seal-${uid})"/>
    <g stroke="#fff" stroke-opacity=".22" stroke-width="1.4">${crimps}</g>
    <rect x="60" y="14" width="120" height="28" rx="14" fill="none" stroke="#0E2A2B" stroke-opacity=".10"/>

    <text x="120" y="266" text-anchor="middle" font-family="Manrope, sans-serif" font-size="8" font-weight="700" letter-spacing="2.8" fill="#0E2A2B" opacity=".34">BOLO'S</text>

    <path d="M80 14H160Q180 14 180 36V260Q180 286 154 286H86Q60 286 60 260V36Q60 14 80 14Z" fill="none" stroke="#0E2A2B" stroke-opacity=".12" stroke-width="2"/>
  </svg>`;
}

/* ---------- Catálogo ---------- */
const FLAVORS = [
  /* ---------- Con leche ---------- */
  {
    id: 'lucuma',
    nombre: 'Lúcuma',
    leche: true,
    desc: 'Lúcuma peruana de verdad, cremosa y con ese aroma dulce que no se parece a nada. Nuestro sabor insignia.',
    precio: 3.5,
    badge: 'Insignia',
    tint: '#FFF1DC',
    light: '#FFD98F', base: '#F5A623', dark: '#B86B00',
    bit: '#FFEBC4', sealLight: '#FFC46B', seal: '#A85C00',
  },
  {
    id: 'fresa',
    nombre: 'Fresa',
    leche: true,
    desc: 'Fresa madura con leche entera: cremosa, dulce y con pedacitos de fruta. El que piden los niños (y los no tan niños).',
    precio: 3.5,
    badge: 'Más vendido',
    tint: '#FFE9EE',
    light: '#FFD0DC', base: '#F2547A', dark: '#B92A50',
    bit: '#FFE4EB', sealLight: '#FF8FA8', seal: '#C73055',
  },
  {
    id: 'chocolate',
    nombre: 'Chocolate',
    leche: true,
    desc: 'Chocolate con leche bien cargado y textura de helado de verdad. Para los que no negocian el postre.',
    precio: 3.5,
    badge: 'Nuevo',
    tint: '#F4E9E1',
    light: '#C08B66', base: '#7B4A2B', dark: '#3E2110',
    bit: '#E3C4A9', sealLight: '#9A6A47', seal: '#3A1E0E',
  },

  /* ---------- Sin leche ---------- */
  {
    id: 'mango',
    nombre: 'Mango',
    leche: false,
    desc: 'Mango maduro, dulce y con un final ácido que refresca. Jugo puro congelado, sin leche y sin culpa.',
    precio: 3,
    tint: '#FFF0D4',
    light: '#FFE29A', base: '#FFB020', dark: '#D97A00',
    bit: '#FFF3C9', sealLight: '#FFC95C', seal: '#C96F00',
  },
  {
    id: 'maracuya',
    nombre: 'Maracuyá',
    leche: false,
    desc: 'Maracuyá intenso y aromático, con semillitas que hacen crrr. Ácido, fresco y peligrosamente adictivo.',
    precio: 3,
    tint: '#FFEAD8',
    light: '#FFD08A', base: '#FF8A3D', dark: '#C24E00',
    bit: '#FFF0D6', sealLight: '#FFA868', seal: '#B84800',
  },
  {
    id: 'fresa-sin-leche',
    nombre: 'Fresa sin leche',
    leche: false,
    desc: 'La misma fresa de verdad, pero en versión jugo: sin leche, más liviana y bien refrescante.',
    precio: 3,
    tint: '#FFEFF2',
    light: '#FFC0C8', base: '#F04B63', dark: '#B01430',
    bit: '#FFDCE1', sealLight: '#FF8494', seal: '#A8102B',
  },
];

const COMBOS = [
  {
    id: 'pack6',
    nombre: 'Pack Refri',
    cantidad: 6,
    kicker: 'Para probar',
    desc: 'Seis bolos, seis sabores distintos. La forma más rápida de encontrar tu favorito.',
    precio: 19,
    features: ['Eliges los 6 sabores', 'Sale S/ 3.17 por bolo', 'Ideal para estrenar la refri'],
  },
  {
    id: 'pack12',
    nombre: 'Pack Fiesta',
    cantidad: 12,
    kicker: 'Para compartir',
    desc: 'Doce bolos a elección para cumpleaños, junta o domingo de piscina. No falla.',
    precio: 37,
    antes: 39,
    features: ['Eliges los sabores', 'Sale S/ 3.08 por bolo', 'Envío gratis incluido'],
    destacado: true,
    tag: 'Envío gratis',
  },
  {
    id: 'pack24',
    nombre: 'Pack Kiosco',
    cantidad: 24,
    kicker: 'Para kioscos y eventos',
    desc: 'Veinticuatro bolos para eventos, oficinas o para no volver a abrir el freezer vacío.',
    precio: 70,
    antes: 78,
    features: ['Sale S/ 2.92 por bolo', 'Boleta o factura para empresas', 'Entrega coordinada'],
  },
];

// Testimonios: agrega tus opiniones reales aquí. Si queda vacío, la sección se oculta.
const QUOTES = [];

const CATALOG = new Map();
FLAVORS.forEach((f) => CATALOG.set(f.id, { ...f, tipo: 'bolo', detalle: 'Bolo suelto' }));
COMBOS.forEach((c) => CATALOG.set(c.id, { ...c, tipo: 'combo', detalle: `Pack x${c.cantidad}` }));

const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

/* ---------- Render: arte del hero y la historia ---------- */
$$('[data-bolo]').forEach((el) => {
  const f = FLAVORS.find((x) => x.id === el.dataset.bolo);
  if (f) el.innerHTML = boloSVG(f);
});

/* ---------- Render: sabores ---------- */
const flavorsGrid = $('#flavorsGrid');
if (flavorsGrid) {
  flavorsGrid.innerHTML = FLAVORS.map((f, i) => `
    <article class="flavor reveal" style="--d:${i * 55}ms">
      ${f.badge ? `<span class="flavor__badge">${f.badge}</span>` : ''}
      <div class="flavor__art" style="--tint:${f.tint}">${boloSVG(f)}</div>
      <div class="flavor__body">
        <span class="flavor__tag flavor__tag--${f.leche ? 'con' : 'sin'}">${f.leche ? 'Con leche' : 'Sin leche'}</span>
        <h3>${f.nombre}</h3>
        <p>${f.desc}</p>
        <div class="flavor__foot">
          <div class="price">${money(f.precio)}<span>c/u</span></div>
          <button class="add-btn" type="button" data-add="${f.id}" aria-label="Agregar ${f.nombre} al pedido">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
            Agregar
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

/* ---------- Render: packs ---------- */
const combosGrid = $('#combosGrid');
if (combosGrid) {
  combosGrid.innerHTML = COMBOS.map((c, i) => `
    <article class="combo ${c.destacado ? 'combo--featured' : ''} reveal" style="--d:${i * 80}ms">
      ${c.tag ? `<span class="combo__tag">${c.tag}</span>` : ''}
      <p class="combo__kicker">${c.kicker}</p>
      <h3 class="combo__name">${c.nombre}</h3>
      <p class="combo__desc">${c.desc}</p>
      <div class="combo__price">
        <strong>${money(c.precio)}</strong>
        ${c.antes ? `<span class="combo__antes">${money(c.antes)}</span>` : ''}
      </div>
      <ul class="combo__list">
        ${c.features.map((f) => `<li>${CHECK}${f}</li>`).join('')}
      </ul>
      <button class="btn ${c.destacado ? 'btn--lime' : 'btn--outline'} combo__btn" type="button" data-add="${c.id}">
        Agregar al pedido
      </button>
    </article>
  `).join('');
}

/* ---------- Render: opiniones ---------- */
const quotesGrid = $('#quotesGrid');
if (quotesGrid) {
  const star = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.5L12 17.5 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9z"/></svg>';
  quotesGrid.innerHTML = QUOTES.map((q, i) => `
    <article class="quote reveal" style="--d:${i * 70}ms">
      <div class="quote__stars" role="img" aria-label="5 de 5 estrellas">${star.repeat(5)}</div>
      <p class="quote__text">“${q.texto}”</p>
      <div class="quote__foot">
        <span class="quote__avatar" style="background:${q.color}">${q.inicial}</span>
        <div class="quote__who">
          <strong>${q.nombre}</strong>
          <span>${q.lugar}</span>
        </div>
        <span class="quote__verified">Compra verificada</span>
      </div>
    </article>
  `).join('');

  if (!QUOTES.length) {
    const section = $('#opiniones');
    if (section) section.hidden = true;
    $$('a[href="#opiniones"]').forEach((a) => { a.hidden = true; });
  }
}

/* ---------- Textos desde CONFIG ---------- */
$$('[data-envio-gratis]').forEach((el) => { el.textContent = money(CONFIG.envioGratisDesde); });

/* ---------- Carrito ---------- */
const CART_KEY = 'bolos_carrito_v1';
const drawer = $('#drawer');
const overlay = $('#overlay');
const cartItemsEl = $('#cartItems');
const cartTotalEl = $('#cartTotal');
const cartSubtotalEl = $('#cartSubtotal');
const cartShippingEl = $('#cartShipping');
const cartBreakdownEl = $('#cartBreakdown');
const freeMsgEl = $('#freeMsg');
const freeBarEl = $('#freeBar');
const toastEl = $('#toast');

let cart = loadCart();
let lastFocused = null;
let toastTimer = null;

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || '{}');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    const clean = {};
    Object.keys(raw).forEach((id) => {
      const qty = Math.floor(Number(raw[id]));
      if (CATALOG.has(id) && qty > 0) clean[id] = Math.min(qty, 99);
    });
    return clean;
  } catch {
    return {};
  }
}

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* modo privado */ }
}

function cartLines() {
  return Object.keys(cart)
    .filter((id) => cart[id] > 0 && CATALOG.has(id))
    .map((id) => ({ product: CATALOG.get(id), qty: cart[id] }));
}

function thumbHTML(p) {
  if (p.tipo === 'combo') {
    return `${boloSVG(FLAVORS[0])}<span class="cart-item__qtytag">x${p.cantidad}</span>`;
  }
  return boloSVG(p);
}

function esRetiro() {
  const select = $('#entrega');
  return !!select && !select.value.toLowerCase().startsWith('envío');
}

function costoEnvio(subtotal) {
  if (subtotal <= 0) return 0;
  if (esRetiro()) return 0;
  return subtotal >= CONFIG.envioGratisDesde ? 0 : CONFIG.costoEnvio;
}

function renderCart() {
  const lines = cartLines();
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.qty * l.product.precio, 0);
  const envio = costoEnvio(subtotal);

  if (cartItemsEl) {
    cartItemsEl.innerHTML = lines.map(({ product: p, qty }) => `
      <div class="cart-item">
        <div class="cart-item__thumb">${thumbHTML(p)}</div>
        <div class="cart-item__info">
          <p class="cart-item__name">${p.nombre}</p>
          <p class="cart-item__meta">${p.detalle} · ${money(p.precio)}</p>
          <div class="qty">
            <button type="button" data-qty="-1" data-id="${p.id}" aria-label="Quitar una unidad de ${p.nombre}">−</button>
            <span>${qty}</span>
            <button type="button" data-qty="1" data-id="${p.id}" aria-label="Agregar una unidad de ${p.nombre}">+</button>
          </div>
        </div>
        <div class="cart-item__right">
          <strong>${money(p.precio * qty)}</strong>
          <button type="button" class="link-btn" data-remove="${p.id}">Quitar</button>
        </div>
      </div>
    `).join('');
  }

  if (cartTotalEl) cartTotalEl.textContent = money(subtotal + envio);

  if (cartBreakdownEl) cartBreakdownEl.hidden = count === 0;
  if (cartSubtotalEl) cartSubtotalEl.textContent = money(subtotal);
  if (cartShippingEl) cartShippingEl.textContent = envio ? money(envio) : 'Gratis';

  const counters = $$('[data-cart-count]');
  counters.forEach((el) => {
    el.textContent = count === 0 ? '' : String(count);
    el.hidden = count === 0;
  });

  const cartButton = $('#cartBtn');
  if (cartButton) {
    cartButton.setAttribute('aria-label', count
      ? `Abrir mi pedido: ${count} ${count === 1 ? 'producto' : 'productos'}`
      : 'Abrir mi pedido');
  }

  if (drawer) {
    drawer.classList.toggle('is-filled', count > 0);
    drawer.classList.toggle('is-empty', count === 0);
  }

  if (freeMsgEl && freeBarEl) {
    const falta = Math.max(0, CONFIG.envioGratisDesde - subtotal);
    const retiro = esRetiro();
    const pct = count === 0 ? 0 : (retiro ? 100 : Math.min(100, (subtotal / CONFIG.envioGratisDesde) * 100));
    freeBarEl.style.width = pct + '%';

    if (count === 0) {
      freeMsgEl.innerHTML = 'Suma bolos para tu envío gratis';
    } else if (retiro) {
      freeMsgEl.innerHTML = 'Retiro en tienda: <strong>sin costo de delivery</strong>';
    } else if (falta > 0) {
      freeMsgEl.innerHTML = `Te faltan <strong>${money(falta)}</strong> para el envío gratis`;
    } else {
      freeMsgEl.innerHTML = '¡Genial! Tienes <strong>envío gratis</strong> 🎉';
    }
  }

  saveCart();
}

function addToCart(id) {
  const product = CATALOG.get(id);
  if (!product) return;
  cart[id] = Math.min((cart[id] || 0) + 1, 99);
  renderCart();
  bumpCartButton();
  toast(`${product.nombre} sumado a tu pedido`);
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
}

function removeItem(id) {
  delete cart[id];
  renderCart();
}

function bumpCartButton() {
  const btn = $('#cartBtn');
  if (!btn) return;
  btn.classList.remove('is-bump');
  void btn.offsetWidth;
  btn.classList.add('is-bump');
}

/* ---------- Drawer ---------- */
function openCart() {
  if (!drawer) return;
  lastFocused = document.activeElement;
  overlay.hidden = false;
  void overlay.offsetHeight;
  overlay.classList.add('is-open');
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  drawer.scrollTop = 0;
  document.body.classList.add('no-scroll');
  const scrollArea = $('#drawerScroll');
  if (scrollArea) scrollArea.scrollTop = 0;
  window.setTimeout(() => { const c = $('#closeCart'); if (c) c.focus(); }, 90);
}

function closeCart() {
  if (!drawer) return;
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  overlay.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  window.setTimeout(() => {
    if (!overlay.classList.contains('is-open')) overlay.hidden = true;
  }, 380);
  if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
}

/* ---------- Toast ---------- */
function toast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastEl.classList.remove('is-visible'), 2800);
}

/* ---------- Eventos globales ---------- */
document.addEventListener('click', (e) => {
  const add = e.target.closest('[data-add]');
  if (add) { addToCart(add.dataset.add); return; }

  const qtyBtn = e.target.closest('[data-qty]');
  if (qtyBtn) { changeQty(qtyBtn.dataset.id, Number(qtyBtn.dataset.qty)); return; }

  const remove = e.target.closest('[data-remove]');
  if (remove) { removeItem(remove.dataset.remove); return; }

  if (e.target.closest('[data-close-cart]')) {
    closeCart();
    const target = document.getElementById('sabores');
    if (target) window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 200);
    return;
  }
});

const cartBtn = $('#cartBtn');
if (cartBtn) cartBtn.addEventListener('click', openCart);
const closeBtn = $('#closeCart');
if (closeBtn) closeBtn.addEventListener('click', closeCart);
if (overlay) overlay.addEventListener('click', closeCart);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) closeCart();
});

/* foco encerrado dentro del drawer */
if (drawer) {
  drawer.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const nodes = $$('a[href], button:not([disabled]), input, select, textarea', drawer)
      .filter((el) => el.offsetParent !== null);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}

/* ---------- Formulario y WhatsApp ---------- */
const form = $('#orderForm');
const entregaEl = $('#entrega');
const addressField = $('#addressField');
const direccionEl = $('#direccion');

function syncAddressField() {
  if (!entregaEl || !addressField || !direccionEl) return;
  const isEnvio = entregaEl.value.toLowerCase().startsWith('envío');
  addressField.classList.toggle('is-hidden', !isEnvio);
  direccionEl.required = isEnvio;
}

if (entregaEl) {
  entregaEl.addEventListener('change', () => {
    syncAddressField();
    renderCart();
  });
  syncAddressField();
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const lines = cartLines();
    if (!lines.length) { toast('Tu pedido está vacío'); return; }

    if (!form.checkValidity()) {
      form.reportValidity();
      toast('Completa los datos para la entrega');
      return;
    }

    const data = new FormData(form);
    const nombre = String(data.get('nombre') || '').trim();
    const entrega = String(data.get('entrega') || '');
    const direccion = String(data.get('direccion') || '').trim();
    const notas = String(data.get('notas') || '').trim();
    const subtotal = lines.reduce((sum, l) => sum + l.qty * l.product.precio, 0);
    const esEnvio = entrega.toLowerCase().startsWith('envío');
    const envio = esEnvio && subtotal < CONFIG.envioGratisDesde ? CONFIG.costoEnvio : 0;
    const total = subtotal + envio;

    const items = lines.map((l) => `• ${l.qty} × ${l.product.nombre} — ${money(l.product.precio * l.qty)}`);
    const envioTexto = !esEnvio
      ? 'no aplica (retiro en tienda)'
      : (envio ? money(envio) : 'gratis');

    const mensaje = [
      `¡Hola ${CONFIG.marca}! Quiero hacer este pedido:`,
      '',
      ...items,
      '',
      `Subtotal: ${money(subtotal)}`,
      `Delivery: ${envioTexto}`,
      `Total: ${money(total)}`,
      '',
      `Nombre: ${nombre}`,
      `Entrega: ${entrega}${direccion ? ` — ${direccion}` : ''}`,
      ...(notas ? [`Notas: ${notas}`] : []),
    ].join('\n');

    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener');
    toast('¡Listo! Te esperamos en WhatsApp 🍧');
  });
}

/* ---------- Links directos a WhatsApp ---------- */
$$('[data-wa]').forEach((el) => {
  const texto = `¡Hola ${CONFIG.marca}! Vi la web y quiero pedir bolos 🍓`;
  el.setAttribute('href', `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`);
  el.setAttribute('target', '_blank');
  el.setAttribute('rel', 'noopener');
});

/* ---------- Menú móvil ---------- */
const menuBtn = $('#menuBtn');
const mobileMenu = $('#mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  $$('a', mobileMenu).forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Abrir menú');
    });
  });
}

/* ---------- Header al hacer scroll ---------- */
const header = $('#siteHeader');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Animaciones de aparición ---------- */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

  $$('.reveal').forEach((el) => observer.observe(el));
} else {
  $$('.reveal').forEach((el) => el.classList.add('is-visible'));
}

/* ---------- Año del footer ---------- */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/* ---------- Inicio ---------- */
renderCart();
