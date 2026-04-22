const entries = [
  {
    date: "Session 04, December:",
    text: "The popup cascade experiment worked. Spawned 47 error dialogs simultaneously — the machine didn't crash, it SPOKE. Each \"error\" was the system confessing its architecture. You can't look at a Windows dialog the same way after you've seen 47 of them screaming at once. The interface is not neutral. It never was."
  },
  {
    date: "Session 03, November:",
    text: "Spent three hours watching the loop_series image load incorrectly on different browsers. Every renderer interprets the glitch differently. There is no single truth in the broken image — only the truth of the system reading it. Rosa Menkman was right. The glitch is the message."
  },
  {
    date: "Session 02, October:",
    text: "Thesis draft: 'seamlessness is ideology.' The smooth surface of the GUI conceals the labor, the decisions, the power — who designed it, who was excluded from designing it. When Windows crashes and shows you the register dump, it is accidentally being honest. Failure as transparency. Failure as honesty."
  },
  {
    date: "Session 01, September:",
    text: "First day of the archive. Downloaded 200+ screenshots of Windows error messages. They are all trying to tell you something. Not 'something went wrong' — but 'here is how I was built, here are my seams, here is where the binary broke down.' Starting to see them as portraits rather than problems."
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
    text: "The system is working as intended.\nThis is the problem."
  },
  {
    title: "Critical Exception — 0xGLITCH",
    img: "assets/critical_exception.png",
    text: "An exception has revealed the exception.\nThe exception IS the rule."
  },
  {
    title: "Popup Collection — Exposure Event",
    img: "assets/popup_collection.png",
    text: "Multiple dialogs have appeared.\nThis is not a malfunction.\nThis is a disclosure."
  },
  {
    title: "Data Null — Warning",
    img: "assets/data_null.png",
    text: "NULL is not nothing.\nNULL is an absence that was designed."
  },
  {
    title: "Null State Wizard",
    img: "assets/null_state.png",
    text: "You are currently null.\nThis wizard cannot proceed.\nClick OK to continue being null."
  },
  {
    title: "Broadcast Failure",
    img: "assets/broadcast_failure.png",
    text: "Signal lost.\nThis is the signal."
  },
  {
    title: "Warning — Recordable Error",
    img: "assets/warning_popup.png",
    text: "A recordable error occurred.\nWho decided what counts as an error?\nWho decided what gets recorded?"
  },
  {
    title: "Recursion Error — Loop Detected",
    img: "assets/recurrsion_error.png",
    text: "The system has been compressed\nby an unknown algorithm.\nThe system does not know it is the loop."
  },
  {
    title: "Glitch Popups — Cascade",
    img: "assets/glitchy_popups.png",
    text: "Multiple systems are failing.\nThis is the most honest\nthe interface has ever been."
  },
  {
    title: "Fatal Popup — Final Disclosure",
    img: "assets/fatal_popup.png",
    text: "The system has been compromised\nby an unknown algorithm.\nThe error comes from within the house."
  },
  {
    title: "Windows Page — Render Error",
    img: "assets/windows_page.png",
    text: "Page rendered incorrectly.\nThe incorrect rendering is the page."
  },
  {
    title: "Existential Inquiry — Dialog",
    img: "assets/existential_inquiry.png",
    text: "Did you place below the minimum\nconfiguration level this instance?\nYour data is now Quantum."
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
  'Terminal.exe': { title: '💻 Terminal.exe', text: 'Running: computational_fluidity.exe\nStatus: FAILURE\n[Failure is expected. Failure is the output.]' },
  'Save State':   { title: '💾 Save State', text: 'Saving current state...\nState: unstable\nSaved.\n[Instability preserved.]' },
  'Field Notes':  { title: '📄 Field Notes', text: 'Note: every error is a primary source.\nNote: do not dismiss the dialog.\nNote: READ the dialog.' },
  'Glitch.dll':   { title: '🌀 Glitch.dll', text: 'glitch.dll has performed an illegal operation.\nThis operation is: revealing the system to itself.\n[Illegal according to whom?]' },
  'MS-DOS':       { title: '🖥️ MS-DOS Prompt', text: 'C:\\> EXPOSE /all /hidden /politics\nExposing...\nDone.\n[The prompt was always asking you something.]' },
  'Art Archive':  { title: '🎨 Art Archive', text: '47 glitch images indexed.\n12 popup cascades documented.\n3 recursion errors preserved as primary sources.' },
  'Broadcast':    { title: '📡 Broadcast Failure', text: 'Signal could not be transmitted.\nThe transmission gap is the transmission.\n[Rosa Menkman, A Vernacular of File Formats]' },
  'Delete?':      { title: '✕ Delete?', text: 'Are you sure you want to delete?\nDelete from where? From whom?\nWho manages the recycle bin?\n[Think before clicking OK.]' },
  'Exception':    { title: '⚠️ Critical Exception', text: 'EXCEPTION 0x000GLITCH\nAt address: the surface of the interface\nThe exception proves the rule was always constructed.' },
  'Loop.err':     { title: '🔁 Loop.err', text: 'Recursion detected at depth: unknown\nThe loop was not an accident.\nThe loop is the system trying to speak.' }
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
        <div class="popup-text">${label}<br><br><em>[Computational Fluidity Archive, 2024]</em><br>Click to close and continue observing.</div>
      </div>
      <div class="popup-footer">
        <button class="win-btn" onclick="this.closest('.popup').remove()">CLOSE</button>
      </div>
    `;
    document.body.appendChild(div);
    makeDraggable(div);
  });
});