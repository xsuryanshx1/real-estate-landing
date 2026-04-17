// SCROLL PROGRESS
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
});

// FADE IN OBSERVER
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: .1 });
document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

// COUNTER ANIMATION
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '+';
  let cur = 0;
  const inc = Math.ceil(target / 60);
  const timer = setInterval(() => {
    cur = Math.min(cur + inc, target);
    el.textContent = cur + suffix;
    if (cur >= target) clearInterval(timer);
  }, 25);
}
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounter(e.target); statObs.unobserve(e.target); }
  });
}, { threshold: .5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => statObs.observe(el));

// HERO CHAT ANIMATION
const chatMsgs = [
  { type: 'in', text: 'Hi, I saw your ad for 2BHK in Indore. What are the prices?', delay: 600 },
  { type: 'typing', delay: 1200 },
  { type: 'out', text: 'Hello! Welcome to Prestige Enclave 🏡\n\n2BHK options start at ₹45 Lakhs. We have 3 configurations available.', card: { title: '📄 Brochure Sent', sub: 'Prestige Enclave · 2BHK Floor Plans' }, delay: 2200 },
  { type: 'in', text: 'Can I schedule a site visit this weekend?', delay: 3400 },
  { type: 'typing', delay: 4000 },
  { type: 'out', text: 'Absolutely! I have slots available:\n\n📅 Saturday 10am or 12pm\n📅 Sunday 11am or 3pm\n\nWhich works for you?', delay: 5000 },
  { type: 'in', text: 'Saturday 10am please', delay: 6200 },
  { type: 'out', text: '✅ Site visit confirmed for Saturday 10am!\n\nYou\'ll receive a reminder the evening before. See you there! 🎉', delay: 7000 },
];
const msgsDiv = document.getElementById('chat-msgs');
chatMsgs.forEach(m => {
  setTimeout(() => {
    if (m.type === 'typing') {
      const t = document.createElement('div');
      t.className = 'typing';
      t.id = 'typing-indicator';
      t.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
      t.style.display = 'flex';
      t.style.opacity = '1';
      msgsDiv.appendChild(t);
      msgsDiv.scrollTop = msgsDiv.scrollHeight;
    } else {
      const ti = document.getElementById('typing-indicator');
      if (ti) ti.remove();
      const d = document.createElement('div');
      d.className = 'msg msg-' + (m.type === 'in' ? 'in' : 'out');
      d.style.animationDelay = '0s';
      let html = m.text.replace(/\n/g, '<br>');
      if (m.card) html += `<div class="msg-card"><p>${m.card.title}</p><span>${m.card.sub}</span></div>`;
      d.innerHTML = html + '<div class="msg-time">' + (m.type === 'in' ? '' : '✓✓ ') + (new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) + '</div>';
      msgsDiv.appendChild(d);
      msgsDiv.scrollTop = msgsDiv.scrollHeight;
    }
  }, m.delay);
});

// DEMO SECTION CHAT
const demoConvo = [
  { type: 'in', text: 'I want a 3BHK in Vijay Nagar. Budget is 80L.', delay: 400 },
  { type: 'out', text: 'Great! We have excellent 3BHK options in Vijay Nagar within your budget. 🏠\n\nQuick question — when are you planning to move?', delay: 1200 },
  { type: 'in', text: 'Within 6 months', delay: 2200 },
  { type: 'out', text: 'Perfect timing! Let me share two projects that match your criteria:\n\n🏢 Skyline Heights — ₹72L\n🏢 Green Valley — ₹78L', badge: '📋 Catalogs sent to your WhatsApp', delay: 3000 },
  { type: 'in', text: 'Interested in Skyline Heights. Can I see it?', delay: 4200 },
  { type: 'out', text: 'Absolutely! Site visits are available:\n\n📅 Tomorrow 11am\n📅 Saturday 10am or 2pm\n\nWhich works best?', delay: 5000 },
  { type: 'in', text: 'Tomorrow 11am', delay: 6000 },
  { type: 'out', text: '✅ Confirmed! Site visit at Skyline Heights tomorrow at 11am.\n\nAddress & directions sent. See you there! 🎉', badge: '🔔 Reminder set for 8pm tonight', delay: 6800 },
];
const demoDiv = document.getElementById('demo-msgs');
const demoObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    demoObs.disconnect();
    demoConvo.forEach(m => {
      setTimeout(() => {
        const d = document.createElement('div');
        d.className = 'demo-msg demo-' + (m.type === 'in' ? 'in' : 'out');
        d.style.animationDelay = '0s';
        let html = m.text.replace(/\n/g, '<br>');
        if (m.badge) html += `<br><span class="demo-badge">${m.badge}</span>`;
        d.innerHTML = html;
        demoDiv.appendChild(d);
        demoDiv.scrollTop = demoDiv.scrollHeight;
      }, m.delay);
    });
  }
}, { threshold: .3 });
demoObs.observe(document.getElementById('demo'));
