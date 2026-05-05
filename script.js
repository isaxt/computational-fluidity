// ============================================================
// GLITCH.LOG :: script.js — Computational Fluidity Terminal
// ============================================================

// ===== DIARY ENTRIES =====
const entries = [
  {
    date: "Session 05, January:",
    text: "Expanded the archive. The Blue Series is not a series about color — it is a series about the vertical signal as carrier, as column, as the posture of the system before it speaks. Blue_1 through Blue_5: each frame an intensification. By Blue_5 the signal has become its own static. The pop groups confirm this: cascade is not chaos. It is the interface finally telling the truth about how many things it is hiding. Pop_group4 is the most honest thing I have ever seen a computer produce. 47 dialogs. All asking. None waiting for an answer."
  },
  {
    date: "Session 04, December:",
    text: "The popup cascade experiment worked. Spawned 47 error dialogs simultaneously — the machine didn't crash, it SPOKE. Each \"error\" was the system confessing its architecture. Kittler was right that media determine our situation, but he stopped at the moment of function. The glitch is where that determination becomes suddenly, violently visible. You can't look at a Windows dialog the same way after you've seen 47 of them screaming at once."
  },
  {
    date: "Session 03, November:",
    text: "Spent three hours watching the loop_series image load incorrectly on different browsers. Every renderer interprets the glitch differently. There is no single truth in the broken image — only the truth of the system reading it. This is what computational fluidity describes: not the dramatic breakdown, but the continuous low-level indeterminacy of systems that never fully resolve into the clean binaries their architecture promises. Rosa Menkman was right. The glitch is the message."
  },
  {
    date: "Session 02, October:",
    text: "Thesis draft: 'seamlessness is ideology.' The smooth surface of the GUI conceals the labor, the decisions, the power — who designed it, who was excluded from designing it. QueerOS calls this the 'prophylactic interface': invisibility as enforcement. When Windows crashes and shows you the register dump, it is accidentally being honest. Failure as transparency. The error-correction regime exposed. The patch is political."
  },
  {
    date: "Session 01, September:",
    text: "First day of the archive. Downloaded 200+ screenshots of Windows error messages. They are all trying to tell you something. Not 'something went wrong' — but 'here is how I was built, here are my seams, here is where the binary broke down.' Russell writes that the glitch exposes 'the carefully constructed fiction' of fixity. Starting to see these dialogs as that presence cracking open. Portraits, not problems."
  }
];

function showEntry(idx, el) {
  const content = document.getElementById('diary-text');
  content.style.opacity = '0';
  setTimeout(() => {
    content.innerHTML =
      '<div class="diary-date">' + entries[idx].date + '</div>' + entries[idx].text;
    content.style.transition = 'opacity 0.3s';
    content.style.opacity = '1';
  }, 150);
  document.querySelectorAll('.diary-entry-list li').forEach(li => li.classList.remove('active'));
  el.classList.add('active');
}


// ============================================================
// ===== DRAGGABLE POPUPS — smoother with z-index stacking =====
// ============================================================
let highestZ = 10000;

function makeDraggable(popup) {
  const titlebar = popup.querySelector('.popup-titlebar');
  if (!titlebar) return;
  let dragging = false, ox = 0, oy = 0;

  // Bring to front on any click
  popup.addEventListener('mousedown', () => {
    highestZ++;
    popup.style.zIndex = highestZ;
  });

  titlebar.style.cursor = 'grab';

  titlebar.addEventListener('mousedown', e => {
    e.preventDefault();
    dragging = true;
    titlebar.style.cursor = 'grabbing';
    const rect = popup.getBoundingClientRect();
    ox = e.clientX - rect.left;
    oy = e.clientY - rect.top;
    highestZ++;
    popup.style.zIndex = highestZ;
    // Switch to fixed positioning for smooth drag
    popup.style.position = 'fixed';
    popup.style.left = rect.left + 'px';
    popup.style.top  = rect.top  + 'px';
    popup.style.right  = 'auto';
    popup.style.bottom = 'auto';
    popup.style.margin = '0';
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    let nx = e.clientX - ox;
    let ny = e.clientY - oy;
    // Keep within viewport
    nx = Math.max(0, Math.min(nx, window.innerWidth  - popup.offsetWidth));
    ny = Math.max(0, Math.min(ny, window.innerHeight - popup.offsetHeight));
    popup.style.left = nx + 'px';
    popup.style.top  = ny + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (dragging) {
      dragging = false;
      titlebar.style.cursor = 'grab';
    }
  });
}

document.querySelectorAll('.popup').forEach(makeDraggable);


// ============================================================
// ===== CURSOR TRAIL =====
// ============================================================
const TRAIL_LENGTH = 18;
const trailDots = [];

for (let i = 0; i < TRAIL_LENGTH; i++) {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed;
    width: ${Math.max(3, 10 - i * 0.5)}px;
    height: ${Math.max(3, 10 - i * 0.5)}px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    opacity: ${(1 - i / TRAIL_LENGTH) * 0.8};
    transition: background 0.2s;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(dot);
  trailDots.push({ el: dot, x: -100, y: -100 });
}

const trailColors = ['#ff2222','#ff69b4','#00ff00','#00ffff','#ffff00','#ff8800','#cc00ff'];
let mouseX = -100, mouseY = -100, trailColorIdx = 0, trailColorTimer = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateTrail() {
  trailColorTimer++;
  if (trailColorTimer % 8 === 0) trailColorIdx = (trailColorIdx + 1) % trailColors.length;
  const color = trailColors[trailColorIdx];

  trailDots[0].x = mouseX;
  trailDots[0].y = mouseY;

  for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
    trailDots[i].x += (trailDots[i - 1].x - trailDots[i].x) * 0.35;
    trailDots[i].y += (trailDots[i - 1].y - trailDots[i].y) * 0.35;
  }

  trailDots.forEach((dot, i) => {
    dot.el.style.left = (dot.x - dot.el.offsetWidth / 2)  + 'px';
    dot.el.style.top  = (dot.y - dot.el.offsetHeight / 2) + 'px';
    dot.el.style.background = color;
  });

  requestAnimationFrame(animateTrail);
}
animateTrail();


// ============================================================
// ===== POPUP MESSAGES — expanded library =====
// ============================================================
const funnyMessages = [
  {
    title: "System Integrity Exception",
    img: "assets/system_integrity.png",
    text: "The system is working as intended.\nThis is the problem.\n[Kittler: media determine our situation]"
  },
  {
    title: "Critical Exception — 0xGLITCH",
    img: "assets/critical_exception.png",
    text: "An exception has revealed the exception.\nBreakdown is not interruption.\nBreakdown is determination made visible."
  },
  {
    title: "Popup Collection — Exposure Event",
    img: "assets/popup_collection.png",
    text: "Multiple dialogs have appeared.\nThis is not a malfunction.\nThis is the system confessing its architecture."
  },
  {
    title: "Data Null — Warning",
    img: "assets/data_null.png",
    text: "NULL is not nothing.\nNULL is an absence that was designed.\n[The binary is always a choice.]"
  },
  {
    title: "Null State Wizard",
    img: "assets/null_state.png",
    text: "You are currently null.\nThe wizard cannot resolve you.\n[Computational fluidity names this spectrum.]"
  },
  {
    title: "Broadcast Failure — Menkman",
    img: "assets/broadcast_failure.png",
    text: "Signal corrupted.\nThe codec encodes a cultural value.\nThe noise is the signal.\n[Collapse of PAL, 2010]"
  },
  {
    title: "Warning — Recordable Error",
    img: "assets/warning_popup.png",
    text: "A recordable error occurred.\nWho decided what counts as an error?\nWho decided what gets patched?\n[The patch is political.]"
  },
  {
    title: "Recursion Error — Loop Detected",
    img: "assets/recurrsion_error.png",
    text: "Gender is constituted through repetition.\nIdentity is iteration with the possibility of deviance.\n[Butler: the citation that goes wrong reveals the norm.]"
  },
  {
    title: "Glitch Popups — Cascade",
    img: "assets/glitchy_popups.png",
    text: "Multiple systems are failing.\nThis is the most honest\nthe interface has ever been.\n[Russell: failure as vehicle of refusal]"
  },
  {
    title: "Fatal Popup — Final Disclosure",
    img: "assets/fatal_popup.png",
    text: "The seamless surface conceals labor.\nConceals decisions. Conceals power.\nThe fatal popup: accidental transparency."
  },
  {
    title: "Windows Page — Render Error",
    img: "assets/windows_page.png",
    text: "Page rendered incorrectly.\nThe incorrect rendering is the page.\n[QueerOS: design for instability, not optimization]"
  },
  {
    title: "Existential Inquiry — Turing",
    img: "assets/existential_inquiry.png",
    text: "Turing staged machine intelligence\nas a question of gender performance.\nBoth are learned, imitative systems.\n[Hayles, How We Became Posthuman]"
  },
  // NEW ENTRIES
  {
    title: "Mouse Proximity Alert",
    img: "assets/warning_popup.png",
    text: "You are getting too close.\nThe cursor is a tool of the hand.\nThe hand enacts a politics.\n[Every click is a decision about power.]"
  },
  {
    title: "CURSOR.EXE — Tracking Confirmed",
    img: "assets/system_integrity.png",
    text: "Your movement has been logged.\nThe interface watches back.\nSurveillance is seamless.\nThe seamless is ideology."
  },
  {
    title: "50Hz NORM VIOLATION",
    img: "assets/50hz_error.png",
    text: "50Hz ERROR.\nThe frequency is not neutral.\nThe refresh rate encodes a politics.\n[Who set the standard? Who benefits?]"
  },
  {
    title: "Dead Data — Collapse Event",
    img: "assets/dead_data.png",
    text: "The PAL signal cannot be recovered.\nThe subject was always already constructed.\nCollapse is honest.\n[DEADDATA: not loss — revelation.]"
  },
  {
    title: "Spiral Static — Infinite Loop",
    img: "assets/spiral_static.png",
    text: "The loop does not end.\nThe loop WAS the signal.\nAll media spiral back\nto the conditions of their own production."
  },
  {
    title: "GLITCH FEELING — Affect Alert",
    img: "assets/glitch_feeling.png",
    text: "Something broke and it felt like something.\nAffect is political data.\nThe feeling of the glitch is the glitch.\n[Computational fluidity: the body is in the machine.]"
  },
  {
    title: "H1 / H2 — Taxonomy Error",
    img: "assets/h1_h2.png",
    text: "H1: GLITCH\nH2: NOISE\n---\nThe taxonomy was a hierarchy.\nEvery category encodes a norm.\nRefuse the heading structure."
  },
  {
    title: "Rainbow Glitch — Spectrum Refusal",
    img: "assets/rainbow_glitch.png",
    text: "The spectrum refuses compression.\nThe codec cannot contain all frequencies.\nWhat leaks out IS the truth.\n[Menkman: the artifact is the argument.]"
  }
];


// ============================================================
// ===== TYPEWRITER EFFECT =====
// ============================================================
function typewriterEffect(el, text, speed = 22, callback) {
  el.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
  return interval;
}


// ============================================================
// ===== SPAWN POPUP — shared factory =====
// ============================================================
let popupCount = 0;
const MAX_POPUPS = 8;

function spawnPopup(msg, options = {}) {
  if (popupCount >= MAX_POPUPS && !options.force) return;

  const div = document.createElement('div');
  div.className = 'popup';

  const topPct  = options.top  !== undefined ? options.top  : (Math.random() * 55 + 5);
  const leftPct = options.left !== undefined ? options.left : (Math.random() * 55 + 5);
  div.style.cssText = `position:fixed; top:${topPct}vh; left:${leftPct}vw; z-index:${++highestZ}; width:320px;`;

  const imgHtml = msg.img
    ? `<div style="padding:6px 8px 0;"><img src="${msg.img}" alt="" style="width:100%;display:block;image-rendering:pixelated;margin-bottom:6px;"></div>`
    : '';

  // Decide whether to typewrite or static-render
  const useTypewriter = options.typewriter !== false;
  const textId = 'tw-' + Date.now() + Math.random().toString(36).slice(2);

  div.innerHTML = `
    <div class="popup-titlebar">
      <div class="title-text">${msg.title}</div>
      <div class="popup-controls">
        <div class="popup-btn" onclick="closePopup(this)">✕</div>
      </div>
    </div>
    ${imgHtml}
    <div class="popup-body">
      <div class="popup-text" id="${textId}" style="white-space:pre-line;min-height:40px;"></div>
    </div>
    <div class="popup-footer">
      <button class="win-btn" onclick="closePopup(this)">${options.btnLabel || 'OK'}</button>
      ${options.spawnOnClose ? `<button class="win-btn" onclick="closeAndCascade(this)">CLOSE</button>` : ''}
    </div>
  `;
  div._spawnOnClose = options.spawnOnClose || false;

  document.body.appendChild(div);
  popupCount++;
  makeDraggable(div);

  if (useTypewriter) {
    const textEl = document.getElementById(textId);
    if (textEl) typewriterEffect(textEl, msg.text);
  } else {
    const textEl = document.getElementById(textId);
    if (textEl) textEl.textContent = msg.text;
  }

  // Subtle entrance animation
  div.style.opacity = '0';
  div.style.transform = 'scale(0.92)';
  div.style.transition = 'opacity 0.18s, transform 0.18s';
  requestAnimationFrame(() => {
    div.style.opacity = '1';
    div.style.transform = 'scale(1)';
  });

  return div;
}

window.closePopup = function(btn) {
  const popup = btn.closest('.popup');
  if (!popup) return;
  popup.style.transition = 'opacity 0.15s, transform 0.15s';
  popup.style.opacity = '0';
  popup.style.transform = 'scale(0.88)';
  setTimeout(() => {
    popup.remove();
    popupCount = Math.max(0, popupCount - 1);
  }, 150);
};

// Cascade: closing spawns two more
window.closeAndCascade = function(btn) {
  const popup = btn.closest('.popup');
  if (popup) {
    popup.style.opacity = '0';
    setTimeout(() => { popup.remove(); popupCount = Math.max(0, popupCount - 1); }, 150);
  }
  const msg1 = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
  const msg2 = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
  setTimeout(() => spawnPopup(msg1, { force: true, spawnOnClose: true }), 100);
  setTimeout(() => spawnPopup(msg2, { force: true, spawnOnClose: true }), 300);
};


// ============================================================
// ===== POPUP CASCADE ON CLOSE — existing static popups =====
// ============================================================
document.querySelectorAll('.popup .win-btn, .popup .popup-btn').forEach(btn => {
  // Wrap existing onclick to also allow cascade (1-in-3 chance)
  const original = btn.onclick;
  btn.onclick = function (e) {
    if (original) original.call(this, e);
    if (Math.random() < 0.33 && !cascadeMode) {
      const msg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
      setTimeout(() => spawnPopup(msg, { spawnOnClose: true }), 400);
    }
  };
});


// ============================================================
// ===== RANDOM POPUP SPAWNER — varied timing =====
// ============================================================
function scheduleNextPopup() {
  const delay = 8000 + Math.random() * 10000; // 8–18s
  setTimeout(() => {
    const msg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    spawnPopup(msg, { spawnOnClose: Math.random() < 0.4 });
    scheduleNextPopup();
  }, delay);
}
scheduleNextPopup();


// ============================================================
// ===== MOUSE-PROXIMITY POPUP =====
// ============================================================
let proximityPopupTimeout = null;
let lastProximityPopup = 0;
const PROXIMITY_MESSAGES = funnyMessages.filter(m =>
  m.title.includes('Cursor') || m.title.includes('Mouse') || m.title.includes('Proximity') || m.title.includes('Tracking')
);
const PROXIMITY_FALLBACK = {
  title: "CURSOR.EXE — Movement Logged",
  img: "assets/system_integrity.png",
  text: "You moved.\nThe interface noticed.\nNoticing is a form of capture.\n[The prophylactic interface: invisible enforcement.]"
};

document.addEventListener('mousemove', e => {
  if (Date.now() - lastProximityPopup < 25000) return;
  // Trigger if cursor near right or bottom edge
  const nearEdge = e.clientX > window.innerWidth * 0.88 || e.clientY > window.innerHeight * 0.88;
  if (nearEdge) {
    clearTimeout(proximityPopupTimeout);
    proximityPopupTimeout = setTimeout(() => {
      if (Date.now() - lastProximityPopup < 25000) return;
      lastProximityPopup = Date.now();
      const msg = PROXIMITY_MESSAGES.length
        ? PROXIMITY_MESSAGES[Math.floor(Math.random() * PROXIMITY_MESSAGES.length)]
        : PROXIMITY_FALLBACK;
      spawnPopup(msg, {
        top:  Math.max(5, (e.clientY / window.innerHeight) * 80 - 15),
        left: Math.max(5, (e.clientX / window.innerWidth)  * 60 - 10),
        typewriter: true
      });
    }, 600);
  }
});


// ============================================================
// ===== SIGNAL STRIP — glitch effects on click =====
// ============================================================
const glitchMessages = {
  'rainbow_glitch': {
    title: "Rainbow Glitch — Spectrum Refusal",
    img: "assets/rainbow_glitch.png",
    text: "The spectrum refuses compression.\nEvery color band is a frequency\nthe codec tried to suppress.\n[The artifact is the argument. — Menkman]"
  },
  'color_spec': {
    title: "Color Spectrum — Codec Palette Exposed",
    img: "assets/color_spec.png",
    text: "GRAY. WHITE. RED. SLIME.\nThe codec chose these.\nChoice is not neutral.\n[Who calibrated the color space?]"
  },
  'bw_stat': {
    title: "B/W Static — Pre-Signal State",
    img: "assets/bw_stat.png",
    text: "Before the signal resolves,\nthere is only static.\nStatic is not silence.\nStatic is all frequencies at once."
  },
  'bw_glitch': {
    title: "B/W Glitch — Post-Norm Fracture",
    img: "assets/bw_glitch.png",
    text: "After the norm breaks:\nblack. white. their seam.\nThe binary was always a seam,\nnot a wall."
  },
  'bw_glitch2': {
    title: "B/W Glitch II — The Seam, Again",
    img: "assets/bw_glitch2.png",
    text: "The seam returns.\nIt was never repaired.\nIt was only hidden.\n[Seamlessness is ideology.]"
  },
  'rainbow_static': {
    title: "Rainbow Static — Spectrum Refuses Binary",
    img: "assets/rainbow_static.png",
    text: "The rainbow static refuses\nto resolve into signal.\nThis is not failure.\nThis is the truth of the spectrum."
  },
  'color_pan': {
    title: "Color Panel — GRAY / WHITE / RED / SLIME",
    img: "assets/color_pan.png",
    text: "The panel names its colors.\nNaming is a form of control.\nSLIME was always already a political category.\n[Who named SLIME?]"
  }
};

function applyGlitchEffect(imgEl) {
  imgEl.style.transition = 'filter 0.05s';
  const glitchSteps = [
    { filter: 'hue-rotate(90deg) saturate(3) brightness(1.5)', duration: 80 },
    { filter: 'invert(1) contrast(2)',                          duration: 60 },
    { filter: 'hue-rotate(180deg) saturate(5)',                 duration: 70 },
    { filter: 'sepia(1) hue-rotate(270deg) brightness(2)',      duration: 80 },
    { filter: 'none',                                           duration: 0  }
  ];
  let delay = 0;
  glitchSteps.forEach(step => {
    setTimeout(() => { imgEl.style.filter = step.filter; }, delay);
    delay += step.duration;
  });
}

document.querySelectorAll('.signal-strip img').forEach(img => {
  img.addEventListener('click', () => {
    applyGlitchEffect(img);
    // Find matching message by alt or src
    const key = img.src.split('/').pop().replace('.png','');
    const msg = glitchMessages[key] || {
      title: "Signal Interrupt — " + (img.alt || 'Unknown'),
      img: img.src,
      text: "The signal strip has been triggered.\nThe strip is not decoration.\nThe strip is the archive of frequencies\nthe interface refused to display."
    };
    setTimeout(() => spawnPopup(msg, { typewriter: true }), 200);
  });
});


// ============================================================
// ===== CASCADE MODE =====
// ============================================================
let cascadeMode = false;
let cascadeInterval = null;
const CASCADE_BTN_ID = 'cascade-toggle-btn';

function createCascadeButton() {
  const btn = document.createElement('button');
  btn.id = CASCADE_BTN_ID;
  btn.textContent = '⚠ CASCADE MODE: OFF';
  btn.style.cssText = `
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 99998;
    background: #d4d0c8;
    border: 2px solid;
    border-color: #ffffff #404040 #404040 #ffffff;
    font-family: 'VT323', monospace;
    font-size: 17px;
    color: #000080;
    padding: 4px 14px;
    cursor: pointer;
    letter-spacing: 1px;
    box-shadow: 1px 1px 0 #808080;
  `;
  btn.addEventListener('click', toggleCascadeMode);
  document.body.appendChild(btn);
}

function toggleCascadeMode() {
  cascadeMode = !cascadeMode;
  const btn = document.getElementById(CASCADE_BTN_ID);

  if (cascadeMode) {
    btn.textContent = '🔴 CASCADE MODE: ON';
    btn.style.color = '#ff2222';
    btn.style.borderColor = '#ff2222 #800000 #800000 #ff2222';
    // Flood with popups rapidly
    cascadeInterval = setInterval(() => {
      const msg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
      spawnPopup(msg, { force: true, spawnOnClose: true, typewriter: false });
    }, 1200);
    // Spawn an initial burst
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        const msg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
        spawnPopup(msg, { force: true, spawnOnClose: false, typewriter: false });
      }, i * 250);
    }
  } else {
    btn.textContent = '⚠ CASCADE MODE: OFF';
    btn.style.color = '#000080';
    btn.style.borderColor = '#ffffff #404040 #404040 #ffffff';
    clearInterval(cascadeInterval);
    cascadeInterval = null;
    // Remove all dynamically spawned popups with a sweep
    document.querySelectorAll('.popup').forEach(p => {
      if (!p.id) { // only remove dynamic ones (static ones have IDs)
        p.style.opacity = '0';
        setTimeout(() => p.remove(), 200);
      }
    });
    popupCount = 0;
  }
}

createCascadeButton();


// ============================================================
// ===== KONAMI CODE EASTER EGG =====
// ============================================================
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;

document.addEventListener('keydown', e => {
  if (e.key === KONAMI[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === KONAMI.length) {
      konamiIdx = 0;
      triggerKonamiEasterEgg();
    }
  } else {
    konamiIdx = e.key === KONAMI[0] ? 1 : 0;
  }
});

function triggerKonamiEasterEgg() {
  // Flash the body
  document.body.style.transition = 'filter 0.1s';
  const flashes = ['invert(1)', 'hue-rotate(90deg) saturate(4)', 'invert(1) hue-rotate(180deg)', 'none'];
  flashes.forEach((f, i) => setTimeout(() => { document.body.style.filter = f; }, i * 120));

  // Spawn special cascade of theory-heavy popups
  const eggMessages = [
    {
      title: "✦ KONAMI UNLOCKED — Glitch Feminism Mode ✦",
      img: "assets/glitch_feeling.png",
      text: "Legacy Russell:\n'The glitch is a cyberspace maroon.'\nYou found the seam.\nYou are the seam.\n[GLITCH FEMINISM, 2020]"
    },
    {
      title: "✦ MENKMAN PROTOCOL ACTIVATED ✦",
      img: "assets/broadcast_failure.png",
      text: "Rosa Menkman:\n'I embrace the glitch as\na rift within the dominant\ntechnological run.'\n[Glitch Studies Manifesto, 2009]"
    },
    {
      title: "✦ KITTLER EXCEPTION THROWN ✦",
      img: "assets/critical_exception.png",
      text: "Kittler:\n'Media determine our situation.'\nYou pressed the sequence.\nThe sequence was the medium.\nThe medium was the determination."
    },
    {
      title: "✦ QUEER OS BOOTING ✦",
      img: "assets/null_state.png",
      text: "QueerOS:\nDesign for instability.\nDesign for deviation.\nDesign for the body the interface forgot.\n[The binary is not inevitable.]"
    },
    {
      title: "✦ COMPUTATIONAL FLUIDITY — UNLOCKED ✦",
      img: "assets/system_integrity.png",
      text: "You have reached the fluid state.\nThe binary has dissolved.\nThe spectrum is visible.\nRemain here as long as you need.\n[GLITCH.LOG v0.ERROR]"
    }
  ];

  eggMessages.forEach((msg, i) => {
    setTimeout(() => {
      spawnPopup(msg, {
        force: true,
        top:  15 + i * 10,
        left: 10 + i * 12,
        typewriter: true,
        spawnOnClose: false,
        btnLabel: 'ACKNOWLEDGE'
      });
    }, i * 500);
  });

  // Manifesto bar glitch
  const ticker = document.querySelector('.manifesto-text');
  if (ticker) {
    const orig = ticker.textContent;
    ticker.textContent = '✦ KONAMI ACHIEVED ✦ THE SEAM IS VISIBLE ✦ YOU ARE THE GLITCH ✦ COMPUTATIONAL FLUIDITY UNLOCKED ✦ STAY IN THE FLUID STATE ✦ THE BINARY HAS DISSOLVED ✦';
    ticker.style.color = '#00ffff';
    setTimeout(() => {
      ticker.textContent = orig;
      ticker.style.color = '';
    }, 12000);
  }
}


// ============================================================
// ===== DESKTOP ICON INTERACTIONS =====
// ============================================================
const iconResponses = {
  'Terminal.exe': { title: '💻 Terminal.exe', text: 'Running: computational_fluidity.exe\nStatus: FAILURE\n[Failure is not deviation — it is the output.\nKittler\'s silence at the moment of breakdown\nis this project\'s beginning.]' },
  'Save State':   { title: '💾 Save State', text: 'Saving current state...\nState: fluid\nSaved.\n[Computational fluidity: operating on a spectrum\nrather than within a binary.]' },
  'Field Notes':  { title: '📄 Field Notes', text: 'Note: every error message is a primary source.\nNote: the dialog box is the system being honest.\nNote: seamlessness is the lie. Read the dialog.' },
  'Glitch.dll':   { title: '🌀 Glitch.dll', text: 'glitch.dll has performed an illegal operation.\nThis operation is: exposing the constructed nature\nof the norm it fails to reproduce.\n[Butler: the citation that goes wrong]' },
  'MS-DOS':       { title: '🖥️ MS-DOS Prompt', text: 'C:\\> EXPOSE /ideology /hidden /seams\nExposing...\nDone.\n[The prompt was always encoding a logic.\nWho designed the command? Who was excluded?]' },
  'Art Archive':  { title: '🎨 Art Archive', text: '47 glitch images indexed.\n12 popup cascades documented.\nMenkman\'s Collapse of PAL: 1 corrupted broadcast.\n[Technical act = cultural statement. Inseparable.]' },
  'Broadcast':    { title: '📡 Broadcast Failure', text: 'Signal corrupted.\nThe codec suppresses noise before it reaches you.\nMenkman refuses this suppression.\nThe noise is the transmission.\n[A Vernacular of File Formats, 2011]' },
  'Delete?':      { title: '✕ Delete?', text: 'Are you sure you want to delete?\nDelete from where? From whom?\nWho manages the recycle bin?\nWhose outputs count as error?\n[The patch is always political.]' },
  'Exception':    { title: '⚠️ Critical Exception', text: 'EXCEPTION 0x000GLITCH\nAt address: the surface of the interface\nThe exception proves the binary was always constructed.\n[Computational fluidity names the spectrum beneath it.]' },
  'Loop.err':     { title: '🔁 Loop.err', text: 'Recursion detected at depth: unknown\nGender: constituted through iterative performance.\nComputation: iterated, repeated, open to deviance.\n[Butler + Kittler: the loop was never an accident.]' },
  'Spiral.err':   { title: '🌀 Spiral.err', text: 'The spiral does not loop.\nThe spiral moves outward while returning.\nEvery glitch revisits its origin\nand finds the origin was already broken.' },
  '50Hz.err':     { title: '⚡ 50Hz.err', text: '50Hz ERROR\n50Hz ERROR\n50Hz ERROR\nThe frequency was always a norm.\nNorms are not natural.\nNorms are enforced.' },
  'Rainbow.exe':  { title: '🌈 Rainbow.exe', text: 'The rainbow is not decoration.\nThe rainbow is the proof\nthat white light was always plural.\n[Compression hides this. Glitch reveals it.]' },
  'SoloPop':      { title: '🪟 Solo Pop — Isolated Disclosure', text: 'One dialog.\nOne witness.\nIsolated disclosure is still disclosure.\n[The single popup as intimate confession.]' },
  'Dialog.sys':   { title: '💬 Dialog.sys', text: 'The dialog box asks a question.\nIt does not wait for your answer.\nIt has already decided your options.\n[Who wrote the dialog? Who was excluded?]' },
  'H1/H2.txt':    { title: '📝 H1 / H2 — Taxonomy as Politics', text: 'H1: GLITCH\nH2: NOISE\nThe hierarchy is encoded in the heading.\nEvery taxonomy is a power structure.\n[Refuse the heading. Flatten the structure.]' }
};

document.querySelectorAll('.desktop-icon').forEach(icon => {
  icon.addEventListener('dblclick', () => {
    const label = icon.querySelector('span').textContent.trim();
    const resp  = iconResponses[label];
    if (!resp) return;
    spawnPopup({ title: resp.title, img: null, text: resp.text }, {
      force: true,
      top: 30,
      left: 30,
      typewriter: true
    });
  });
});


// ============================================================
// ===== GLITCH CELL INTERACTIONS =====
// ============================================================
document.querySelectorAll('.glitch-cell').forEach(cell => {
  cell.addEventListener('click', () => {
    const label = cell.querySelector('span').textContent;
    const img   = cell.querySelector('img');
    spawnPopup({
      title: '🖼 Archive Entry',
      img: img ? img.src : null,
      text: label + '\n\n[Computational Fluidity Archive, 2024]\nThe broken image has as much right to exist\nas the optimized one.'
    }, { typewriter: true });
  });
});


// ============================================================
// ===== INIT: make existing static popups draggable =====
// ============================================================
document.querySelectorAll('.popup').forEach(p => makeDraggable(p));