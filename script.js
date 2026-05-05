const entries = [
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
    text: "First day of the archive. Downloaded 200+ screenshots of Windows error messages. They are all trying to tell you something. Not 'something went wrong' — but 'here is how I was built, here are my seams, here is where the binary broke down.' Russell writes that the glitch exposes 'the carefully constructed fiction' of fixity. Starting to see these dialogs as that fiction cracking open. Portraits, not problems."
  }
];

function showEntry(idx, el) {
  document.getElementById('diary-text').innerHTML =
    '<div class="diary-date">' + entries[idx].date + '</div>' + entries[idx].text;
  document.querySelectorAll('.diary-entry-list li').forEach(li => li.classList.remove('active'));
  el.classList.add('active');
}

// ===== DRAGGABLE POPUPS =====
function makeDraggable(popup) {
  const titlebar = popup.querySelector('.popup-titlebar');
  let dragging = false, ox = 0, oy = 0;

  titlebar.addEventListener('mousedown', e => {
    dragging = true;
    ox = e.clientX - popup.offsetLeft;
    oy = e.clientY - popup.offsetTop;
    popup.style.zIndex = 10000;
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    popup.style.left   = (e.clientX - ox) + 'px';
    popup.style.top    = (e.clientY - oy) + 'px';
    popup.style.right  = 'auto';
    popup.style.bottom = 'auto';
  });

  document.addEventListener('mouseup', () => { dragging = false; });
}

document.querySelectorAll('.popup').forEach(makeDraggable);

// ===== RANDOM POPUP SPAWNER =====
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
  }
];

let popupCount = 0;

function spawnRandomPopup() {
  if (popupCount > 6) return;
  const msg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
  const div = document.createElement('div');
  div.className = 'popup';
  div.style.top    = (Math.random() * 50 + 10) + 'vh';
  div.style.left   = (Math.random() * 50 + 5)  + 'vw';
  div.style.zIndex = 9999;
  div.style.width  = '320px';

  const imgHtml = msg.img
    ? `<img src="${msg.img}" alt="" style="width:100%; display:block; image-rendering:pixelated; margin-bottom:6px;">`
    : '';

  div.innerHTML = `
    <div class="popup-titlebar">
      <div class="title-text">${msg.title}</div>
      <div class="popup-controls">
        <div class="popup-btn" onclick="this.closest('.popup').remove(); popupCount--;">✕</div>
      </div>
    </div>
    ${imgHtml ? '<div style="padding:6px 8px 0;">' + imgHtml + '</div>' : ''}
    <div class="popup-body">
      <div class="popup-text" style="white-space:pre-line;">${msg.text}</div>
    </div>
    <div class="popup-footer">
      <button class="win-btn" onclick="this.closest('.popup').remove(); popupCount--;">OK</button>
    </div>
  `;
  document.body.appendChild(div);
  popupCount++;
  makeDraggable(div);
}

setInterval(spawnRandomPopup, 12000);

// ===== DESKTOP ICON INTERACTIONS =====
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
  'Loop.err':     { title: '🔁 Loop.err', text: 'Recursion detected at depth: unknown\nGender: constituted through iterative performance.\nComputation: iterated, repeated, open to deviance.\n[Butler + Kittler: the loop was never an accident.]' }
};

document.querySelectorAll('.desktop-icon').forEach(icon => {
  icon.addEventListener('dblclick', () => {
    const label = icon.querySelector('span').textContent.trim();
    const resp  = iconResponses[label];
    if (!resp) return;

    const div = document.createElement('div');
    div.className = 'popup';
    div.style.top    = '30vh';
    div.style.left   = '30vw';
    div.style.zIndex = 10001;
    div.style.width  = '320px';
    div.innerHTML = `
      <div class="popup-titlebar">
        <div class="title-text">${resp.title}</div>
        <div class="popup-controls">
          <div class="popup-btn" onclick="this.closest('.popup').remove()">✕</div>
        </div>
      </div>
      <div class="popup-body">
        <div class="popup-text" style="white-space:pre-line;">${resp.text}</div>
      </div>
      <div class="popup-footer">
        <button class="win-btn" onclick="this.closest('.popup').remove()">OK</button>
      </div>
    `;
    document.body.appendChild(div);
    makeDraggable(div);
  });
});

// ===== GLITCH CELL INTERACTIONS =====
document.querySelectorAll('.glitch-cell').forEach(cell => {
  cell.addEventListener('click', () => {
    const label = cell.querySelector('span').textContent;
    const div = document.createElement('div');
    div.className = 'popup';
    div.style.top    = (Math.random() * 40 + 20) + 'vh';
    div.style.left   = (Math.random() * 40 + 20) + 'vw';
    div.style.zIndex = 10002;
    div.style.width  = '300px';
    div.innerHTML = `
      <div class="popup-titlebar">
        <div class="title-text">🖼 Archive Entry</div>
        <div class="popup-controls">
          <div class="popup-btn" onclick="this.closest('.popup').remove()">✕</div>
        </div>
      </div>
      <div class="popup-body">
        <div class="popup-text">${label}<br><br><em>[Computational Fluidity Archive, 2024]</em><br>The broken image has as much right to exist<br>as the optimized one.</div>
      </div>
      <div class="popup-footer">
        <button class="win-btn" onclick="this.closest('.popup').remove()">CLOSE</button>
      </div>
    `;
    document.body.appendChild(div);
    makeDraggable(div);
  });
});