// edpro — comportamiento compartido

// Logo SVG inline (reusable)
window.EDPRO_LOGO = function(theme) {
  const isDark = theme === 'dark';
  const azul = isDark ? '#FFFFFF' : '#1B3A5C';
  const teal = '#1A7D6F';
  const tealLight = isDark ? '#5DCAA5' : '#1A7D6F';
  return `
    <svg width="118" height="32" viewBox="0 0 118 32" xmlns="http://www.w3.org/2000/svg" aria-label="edpro">
      <g>
        <line x1="9" y1="20" x2="20" y2="11" stroke="${azul}" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
        <circle cx="9" cy="20" r="4" fill="${azul}"/>
        <circle cx="20" cy="11" r="7" fill="${tealLight}"/>
        <circle cx="18.4" cy="9.4" r="2.5" fill="#FFFFFF" opacity="0.35"/>
      </g>
      <g font-family="Sora, sans-serif" font-weight="700" font-size="22" letter-spacing="-0.5">
        <text x="32" y="23" fill="${azul}">ed</text>
        <text x="59" y="23" fill="${teal}">pro</text>
        <circle cx="55" cy="10" r="3" fill="${tealLight}"/>
      </g>
    </svg>
  `;
};

// Inserta logo en todos los .logo-mount
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-logo]').forEach(el => {
    el.innerHTML = window.EDPRO_LOGO(el.dataset.logo);
  });

  // Sticky nav scroll state
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // IntersectionObserver para fade-up de tarjetas
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 90}ms`;
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.step, [data-reveal]').forEach(el => io.observe(el));

  // Form submit handler (demo)
  document.querySelectorAll('form[data-demo]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      const original = btn.innerHTML;
      btn.innerHTML = '✓ Recibido. Te llamamos pronto.';
      btn.style.background = '#5DCAA5';
      btn.style.color = '#1B3A5C';
      setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; btn.style.color = ''; form.reset(); }, 3200);
    });
  });

  // === Countdown urgencia ===
  const cdD = document.getElementById('cd-d');
  if (cdD) {
    const target = Date.now() + (2 * 86400000) + (14 * 3600000) + (37 * 60000) + 12000;
    const tick = () => {
      let diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000); diff -= d * 86400000;
      const h = Math.floor(diff / 3600000); diff -= h * 3600000;
      const m = Math.floor(diff / 60000); diff -= m * 60000;
      const s = Math.floor(diff / 1000);
      cdD.textContent = String(d).padStart(2, '0');
      document.getElementById('cd-h').textContent = String(h).padStart(2, '0');
      document.getElementById('cd-m').textContent = String(m).padStart(2, '0');
      document.getElementById('cd-s').textContent = String(s).padStart(2, '0');
    };
    tick(); setInterval(tick, 1000);
  }

  // === Calculadora ===
  const sNow = document.getElementById('s-now');
  if (sNow) {
    const fmt = n => n.toLocaleString('es-ES');
    const update = () => {
      const now = +document.getElementById('s-now').value;
      const price = +document.getElementById('s-price').value;
      const leads = +document.getElementById('s-leads').value;
      const rate = +document.getElementById('s-rate').value;
      const newMudanzas = leads * rate / 100;
      const extra = newMudanzas * price;
      const cost = leads * 9; // ~9€/lead estimado
      const currentRev = now * price;
      document.getElementById('v-now').textContent = now;
      document.getElementById('v-price').textContent = price + '€';
      document.getElementById('v-leads').textContent = leads;
      document.getElementById('v-rate').textContent = rate + '%';
      document.getElementById('r-total').textContent = fmt(Math.round(extra));
      document.getElementById('r-new').textContent = newMudanzas.toFixed(1).replace('.', ',');
      document.getElementById('r-cost').textContent = fmt(cost) + '€';
      document.getElementById('r-now').textContent = fmt(currentRev) + '€';
      document.getElementById('r-future').textContent = fmt(Math.round(currentRev + extra)) + '€';
    };
    ['s-now','s-price','s-leads','s-rate'].forEach(id => document.getElementById(id).addEventListener('input', update));
    update();
  }

  // === Live feed (rotativo) ===
  const feed = document.getElementById('feed-row');
  if (feed) {
    const items = [
      ['Nuevo presupuesto', 'Mudanza Madrid → Toledo · hace 3 min'],
      ['Nueva empresa', 'Mudanzas Beltrán (Bilbao) acaba de empezar · hace 8 min'],
      ['Nuevo presupuesto', 'Piso 80m² en Valencia · hace 12 min'],
      ['Plaza ocupada', 'Sevilla — quedan 2 plazas en la provincia · hace 14 min'],
      ['Nuevo presupuesto', 'Oficina en Bilbao · hace 19 min'],
      ['Cliente cerrado', 'Mudanzas García firma su 4ª mudanza esta semana · hace 22 min'],
    ];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % items.length;
      feed.style.animation = 'none';
      void feed.offsetWidth;
      feed.style.animation = 'feedFade 480ms ease';
      feed.innerHTML = `<strong>${items[i][0]}</strong> · ${items[i][1]}`;
    }, 3600);
  }

  // === Video placeholder click ===
  const video = document.getElementById('video-placeholder');
  if (video) {
    video.addEventListener('click', () => {
      showToast('Vídeo en preparación · subiremos el testimonio real esta semana');
    });
  }

  // === Calendario de reserva ===
  const cal = document.getElementById('cal-shell');
  if (cal) initCalendar(cal);
});

function initCalendar(root) {
  const monthLabel = root.querySelector('[data-cal-month]');
  const daysEl = root.querySelector('[data-cal-days]');
  const slotsEl = root.querySelector('[data-cal-slots]');
  const summary = root.querySelector('[data-cal-summary]');
  const fields = root.querySelector('[data-cal-fields]');
  const slotsHead = root.querySelector('[data-cal-slots-head]');

  // Slots disponibles por día (simulado para los próximos ~14 días laborables)
  // Algunos slots ya ocupados.
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const today = new Date(); today.setHours(0,0,0,0);
  let viewMonth = today.getMonth();
  let viewYear = today.getFullYear();
  let selectedDay = null;
  let selectedSlot = null;

  // Días con disponibilidad: próximos 18 días laborables a partir de hoy
  const availableDays = new Set();
  let d = new Date(today);
  let count = 0;
  while (count < 18) {
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) {
      availableDays.add(d.toISOString().slice(0,10));
      count++;
    }
    d.setDate(d.getDate() + 1);
  }

  // Slots por día (algunos ocupados aleatoriamente pero determinista)
  const baseSlots = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','16:00','16:30','17:00','17:30','18:00','18:30'];
  function slotsForDay(iso) {
    const seed = iso.split('-').reduce((a,b)=>a+parseInt(b),0);
    return baseSlots.map((t, i) => {
      const taken = (seed * (i + 3)) % 5 === 0;
      const few = !taken && (seed * (i + 7)) % 9 === 0;
      return { time: t, taken, few };
    });
  }

  function renderMonth() {
    monthLabel.textContent = `${months[viewMonth]} ${viewYear}`;
    const first = new Date(viewYear, viewMonth, 1);
    const dow = (first.getDay() + 6) % 7; // lunes = 0
    const lastDay = new Date(viewYear, viewMonth + 1, 0).getDate();
    daysEl.innerHTML = '';

    for (let i = 0; i < dow; i++) {
      const empty = document.createElement('span');
      empty.className = 'cal-day disabled';
      daysEl.appendChild(empty);
    }
    for (let day = 1; day <= lastDay; day++) {
      const dt = new Date(viewYear, viewMonth, day);
      const iso = dt.toISOString().slice(0,10);
      const cell = document.createElement('span');
      cell.className = 'cal-day';
      cell.textContent = day;
      const dayOfWeek = dt.getDay();
      const isPast = dt < today;
      const isToday = dt.getTime() === today.getTime();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      if (isPast || isWeekend) cell.classList.add('disabled');
      else if (availableDays.has(iso)) cell.classList.add('available');
      else cell.classList.add('disabled');
      if (isToday) cell.classList.add('today');
      if (selectedDay === iso) cell.classList.add('selected');

      cell.addEventListener('click', () => {
        if (cell.classList.contains('disabled')) return;
        selectedDay = iso;
        selectedSlot = null;
        renderMonth();
        renderSlots(iso);
      });
      daysEl.appendChild(cell);
    }
  }

  function renderSlots(iso) {
    const dt = new Date(iso);
    const dayName = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'][dt.getDay()];
    slotsHead.querySelector('h4').textContent = `Horas disponibles · ${dayName} ${dt.getDate()} de ${months[dt.getMonth()].toLowerCase()}`;
    slotsEl.innerHTML = '';
    slotsForDay(iso).forEach(s => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal-slot' + (s.taken ? ' taken' : '') + (s.few ? ' few' : '');
      btn.textContent = s.time;
      if (!s.taken) {
        btn.addEventListener('click', () => {
          selectedSlot = s.time;
          slotsEl.querySelectorAll('.cal-slot').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          updateSummary();
        });
      }
      slotsEl.appendChild(btn);
    });
    slotsEl.parentElement.style.display = 'block';
    updateSummary();
  }

  function updateSummary() {
    if (!selectedDay) {
      summary.className = 'cal-summary empty';
      summary.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>Elige un día para ver las horas libres.`;
      fields.classList.remove('active');
      return;
    }
    const dt = new Date(selectedDay);
    const dayStr = `${dt.getDate()} de ${months[dt.getMonth()].toLowerCase()}`;
    if (selectedSlot) {
      summary.className = 'cal-summary';
      summary.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><div>Tu llamada: <strong>${dayStr} a las ${selectedSlot}</strong>. Te llamamos nosotros, te lleva 15 minutos.</div>`;
      fields.classList.add('active');
    } else {
      summary.className = 'cal-summary';
      summary.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>Has elegido el <strong>${dayStr}</strong>. Elige una hora.`;
      fields.classList.remove('active');
    }
  }

  root.querySelector('[data-cal-prev]').addEventListener('click', () => {
    viewMonth--;
    if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    renderMonth();
  });
  root.querySelector('[data-cal-next]').addEventListener('click', () => {
    viewMonth++;
    if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    renderMonth();
  });

  // Confirm
  root.querySelector('[data-cal-form]').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!selectedDay || !selectedSlot) return;
    const dt = new Date(selectedDay);
    const dayStr = `${dt.getDate()} de ${months[dt.getMonth()].toLowerCase()}`;
    showToast(`✓ Reservado · ${dayStr} a las ${selectedSlot}`);
    const btn = e.currentTarget.querySelector('button[type=submit]');
    btn.innerHTML = '✓ Reserva confirmada';
    btn.style.background = '#5DCAA5'; btn.style.color = '#1B3A5C';
    setTimeout(() => {
      btn.innerHTML = 'Confirmar mi llamada';
      btn.style.background = ''; btn.style.color = '';
      e.target.reset(); selectedSlot = null; updateSummary();
      slotsEl.querySelectorAll('.cal-slot').forEach(b => b.classList.remove('selected'));
    }, 3600);
  });

  renderMonth();
  updateSummary();
}

function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>${msg}`;
  requestAnimationFrame(() => t.classList.add('show'));
  clearTimeout(window.__toastT);
  window.__toastT = setTimeout(() => t.classList.remove('show'), 4000);
}
