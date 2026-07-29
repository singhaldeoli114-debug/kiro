// Royal wedding invitation demo interactions
'use strict';

const gate = document.querySelector('#invitation-gate');
const siteShell = document.querySelector('#site-shell');
const soundToggle = document.querySelector('#sound-toggle');
const detailsDialog = document.querySelector('#details-dialog');
const privacyDialog = document.querySelector('#privacy-dialog');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let audioContext;
let ambientGain;
let ambientNodes = [];
let soundEnabled = false;

document.body.classList.add('gate-open');

function createAudioContext() {
  if (audioContext) return audioContext;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  audioContext = new AudioContext();
  return audioContext;
}

function playChime() {
  const context = createAudioContext();
  if (!context) return;
  const now = context.currentTime;
  [261.63, 329.63, 392, 523.25].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, now + index * 0.1);
    gain.gain.linearRampToValueAtTime(0.035, now + index * 0.1 + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.1 + index * 0.1);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now + index * 0.1);
    oscillator.stop(now + 2.2 + index * 0.1);
  });
}

function startSoundscape(withChime = false) {
  const context = createAudioContext();
  if (!context || soundEnabled) return;
  if (context.state === 'suspended') context.resume();

  ambientGain = context.createGain();
  ambientGain.gain.value = 0.014;
  ambientGain.connect(context.destination);

  [130.81, 196].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const filter = context.createBiquadFilter();
    oscillator.type = index ? 'sine' : 'triangle';
    oscillator.frequency.value = frequency;
    filter.type = 'lowpass';
    filter.frequency.value = 420;
    oscillator.connect(filter).connect(ambientGain);
    oscillator.start();
    ambientNodes.push(oscillator);
  });

  soundEnabled = true;
  soundToggle.setAttribute('aria-pressed', 'true');
  soundToggle.setAttribute('aria-label', 'Turn sound off');
  if (withChime) playChime();
}

function stopSoundscape() {
  ambientNodes.forEach((node) => node.stop());
  ambientNodes = [];
  if (ambientGain) ambientGain.disconnect();
  soundEnabled = false;
  soundToggle.setAttribute('aria-pressed', 'false');
  soundToggle.setAttribute('aria-label', 'Turn sound on');
}

function enterInvitation(withSound) {
  if (withSound) startSoundscape(true);
  gate.classList.add('is-opening');
  gate.setAttribute('aria-hidden', 'true');
  siteShell.setAttribute('aria-hidden', 'false');
  document.body.classList.remove('gate-open');
  document.querySelector('.hero__content').classList.add('is-visible');
  window.setTimeout(() => {
    gate.hidden = true;
  }, reduceMotion ? 0 : 1000);
}

document.querySelectorAll('[data-enter]').forEach((button) => {
  button.addEventListener('click', () => enterInvitation(button.dataset.enter === 'sound'));
});

soundToggle.addEventListener('click', () => {
  if (soundEnabled) stopSoundscape();
  else startSoundscape(true);
});

// Progressive content reveals and active chapter navigation.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const chapterLinks = [...document.querySelectorAll('.chapter-nav a')];
const chapterObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  chapterLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`);
  });
}, { threshold: [0.25, 0.55], rootMargin: '-20% 0px -45% 0px' });

document.querySelectorAll('.chapter').forEach((chapter) => chapterObserver.observe(chapter));

const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  topbar.classList.toggle('is-solid', window.scrollY > 80);
}, { passive: true });

// A restrained pointer parallax suggests the production 3D palace experience.
const hero = document.querySelector('.hero');
const palace = document.querySelector('#palace');
if (!reduceMotion) {
  hero.addEventListener('pointermove', (event) => {
    const horizontal = (event.clientX / window.innerWidth - 0.5) * 14;
    const vertical = (event.clientY / window.innerHeight - 0.5) * 8;
    palace.style.marginLeft = `${horizontal}px`;
    palace.style.setProperty('--palace-shift', `${vertical}px`);
  });
  hero.addEventListener('pointerleave', () => {
    palace.style.marginLeft = '0';
    palace.style.setProperty('--palace-shift', '0px');
  });
}

// Countdown to the main wedding ceremony in Jaipur (IST).
const weddingDate = new Date('2026-11-21T17:45:00+05:30');
const countdownParts = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
};

function updateCountdown() {
  const remaining = Math.max(0, weddingDate.getTime() - Date.now());
  const day = 86_400_000;
  countdownParts.days.textContent = String(Math.floor(remaining / day)).padStart(3, '0');
  countdownParts.hours.textContent = String(Math.floor((remaining % day) / 3_600_000)).padStart(2, '0');
  countdownParts.minutes.textContent = String(Math.floor((remaining % 3_600_000) / 60_000)).padStart(2, '0');
  countdownParts.seconds.textContent = String(Math.floor((remaining % 60_000) / 1000)).padStart(2, '0');
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

function openDialog(dialog) {
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
}

function closeDialog(dialog) {
  if (typeof dialog.close === 'function') dialog.close();
  else dialog.removeAttribute('open');
}

document.querySelector('#details-open').addEventListener('click', () => openDialog(detailsDialog));
document.querySelector('#privacy-note').addEventListener('click', () => openDialog(privacyDialog));
document.querySelectorAll('.dialog-close').forEach((button) => {
  button.addEventListener('click', () => closeDialog(button.closest('dialog')));
});
document.querySelector('.dialog-primary').addEventListener('click', () => closeDialog(detailsDialog));

document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect();
    const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    if (!inside) closeDialog(dialog);
  });
});

// Downloadable calendar event keeps this prototype useful without a backend.
function downloadCalendar() {
  const calendar = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Aarav and Meera Wedding//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:aarav-meera-wedding@example.invalid',
    'DTSTAMP:20260729T000000Z',
    'DTSTART:20261120T050000Z',
    'DTEND:20261121T160000Z',
    'SUMMARY:Aarav & Meera — Wedding Celebrations',
    'LOCATION:Rajmahal Palace, Jaipur, Rajasthan',
    'DESCRIPTION:Haldi, Sangeet and the wedding ceremony. We cannot wait to celebrate with you.',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([calendar], { type: 'text/calendar;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'aarav-meera-wedding.ics';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

document.querySelector('#calendar-download').addEventListener('click', downloadCalendar);
document.querySelector('#dialog-calendar').addEventListener('click', downloadCalendar);

// The RSVP is intentionally local-only for the visual prototype.
const rsvpForm = document.querySelector('#rsvp-form');
const formStatus = document.querySelector('#form-status');
rsvpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(rsvpForm);
  const guest = String(data.get('guest') || 'Guest').trim();
  const response = data.get('attendance');
  formStatus.textContent = response === 'joyfully accepts'
    ? `Thank you, ${guest}. Your seats are waiting—we cannot wait to celebrate together.`
    : `Thank you for letting us know, ${guest}. You will be missed and held close in our hearts.`;
});

document.querySelector('#replay').addEventListener('click', () => {
  stopSoundscape();
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  gate.hidden = false;
  gate.removeAttribute('aria-hidden');
  gate.classList.remove('is-opening');
  siteShell.setAttribute('aria-hidden', 'true');
  document.body.classList.add('gate-open');
  window.setTimeout(() => document.querySelector('[data-enter="sound"]').focus(), reduceMotion ? 0 : 500);
});
