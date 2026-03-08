/* ============================================================
   URBAN GAS STOVE REPAIRS — MAIN JAVASCRIPT
   ============================================================ */

/* ── HAMBURGER MENU ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }
});

/* ── SERVICES TABS ──────────────────────────────────────── */
function switchTab(id, el) {
  document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
  document.querySelectorAll('.tab-content').forEach(function (c) { c.classList.remove('active'); });
  el.classList.add('active');
  document.getElementById('tab-' + id).classList.add('active');
}

/* ── SERVICE MODAL ──────────────────────────────────────── */
function openModal(title, body) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').textContent = body;
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

/* ── BOOK NOW → WHATSAPP ────────────────────────────────── */
function scrollBook(svc) {
  var msg = encodeURIComponent('Hi, I need ' + svc + ' service. Please confirm availability.');
  window.open('https://wa.me/919772134944?text=' + msg, '_blank');
}

/* ── FAQ ACCORDION ──────────────────────────────────────── */
function toggleFaq(el) {
  var item = el.parentElement;
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
  if (!isOpen) item.classList.add('open');
}

/* ── REVIEWS SLIDER ─────────────────────────────────────── */
(function () {
  var track = document.getElementById('reviewsTrack');
  var dotsContainer = document.getElementById('sliderDots');
  if (!track || !dotsContainer) return;

  var cardW = 332;
  var idx = 0;
  var cards = track.querySelectorAll('.review-card').length;
  var totalDots = 5;

  function maxIdx() {
    return Math.max(0, cards - Math.max(1, Math.floor(track.parentElement.offsetWidth / cardW)));
  }

  for (var i = 0; i < totalDots; i++) {
    (function (dotIdx) {
      var d = document.createElement('div');
      d.className = 'dot' + (dotIdx === 0 ? ' active' : '');
      d.addEventListener('click', function () {
        goTo(Math.round(dotIdx * maxIdx() / (totalDots - 1)));
      });
      dotsContainer.appendChild(d);
    })(i);
  }

  function goTo(n) {
    idx = Math.max(0, Math.min(n, maxIdx()));
    track.style.transform = 'translateX(-' + (idx * cardW) + 'px)';
    dotsContainer.querySelectorAll('.dot').forEach(function (d, i) {
      d.classList.toggle('active', i === Math.round(idx * (totalDots - 1) / Math.max(1, maxIdx())));
    });
  }

  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(idx - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(idx + 1); });

  setInterval(function () { goTo(idx >= maxIdx() ? 0 : idx + 1); }, 4000);
})();

/* ── CONTACT FORM SUBMIT ────────────────────────────────── */
function submitForm() {
  var name    = document.getElementById('cf-name').value.trim();
  var phone   = document.getElementById('cf-phone').value.trim();
  var areaEl  = document.querySelector('[placeholder="Your area in Hyderabad"]');
  var area    = areaEl ? areaEl.value.trim() : '';
  var service = document.getElementById('cf-service').value;
  var message = document.getElementById('cf-msg').value.trim();

  if (!name || !phone) {
    alert('Please enter your name and phone number.');
    return;
  }

  var text = 'Hi, I would like to book a service.'
    + '\n\n*Name:* ' + name
    + '\n*Phone:* ' + phone
    + (area    ? '\n*Area:* ' + area    : '')
    + (service ? '\n*Service:* ' + service : '')
    + (message ? '\n*Details:* ' + message : '');

  // Google Ads conversion tracking — Contact form submission
  if (typeof gtag === 'function') {
    gtag('event', 'conversion', {'send_to': 'AW-18001660447/6ccoCM6b9oQcEJ-U7odD'});
  }

  window.open('https://wa.me/919772134944?text=' + encodeURIComponent(text), '_blank');

  document.getElementById('cf-name').value = '';
  document.getElementById('cf-phone').value = '';
  document.getElementById('cf-service').selectedIndex = 0;
  document.getElementById('cf-msg').value = '';
  if (areaEl) areaEl.value = '';
}
