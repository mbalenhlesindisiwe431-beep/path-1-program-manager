[05:44, 12/3/2025] MALINGA 😊❤️🤌🏽: /* script.js - Program Manager
   Features:
   - store programs in localStorage under key 'programs'
   - add / edit / delete (with confirmation)
   - search/filter by name
   - form validation and disable submit while invalid
   - responsive: cards rendered into the DOM
*/

/* ------------------------------
   Utility / Data helpers
   ------------------------------ */
const STORAGE_KEY = 'programs';

// load programs from localStorage (returns array)
function loadPrograms() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse programs from storage', e);
    return [];
  }
}

// save programs array to localStorage
function savePrograms(array) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(array));
}

// generate unique id (timestamp + random)
function generateId() {
  return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
}

/* ------------------------------
   DOM references
   ------------------------------ */
const programForm = document.getElementById('programForm');
const programListEl = document.getElementById('programList');
const statusMessage = document.getElementById('statusMessage');

const formTitle = document.getElementById('formTitle');
const inputId = document.getElementById('programId');
const inputName = document.getElementById('name');
const inputDescription = document.getElementById('description');
const inputDuration = document.getElementById('duration');
const inputTimeSlot = document.getElementById('timeSlot');
const inputChannel = document.getElementById('channel');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

const searchInput = document.getElementById('searchInput');

/* Error nodes */
const errors = {
  name: document.getElementById('error-name'),
  description: document.getElementById('error-description'),
  duration: document.getElementById('error-duration'),
  timeSlot: document.getElementById('error-timeSlot'),
  channel: document.getElementById('error-channel'),
};

/* Current list in memory */
let programs = loadPrograms();

/* ------------------------------
   Validation
   ------------------------------ */
function validateField(fieldName) {
  // trim values
  const val = (document.getElementById(fieldName).value || '').trim();
  let message = '';

  if (fieldName === 'name') {
    if (!val) message = 'Program name is required.';
  } else if (fieldName === 'description') {
    if (!val) message = 'Description is required.';
  } else if (fieldName === 'duration') {
    if (!val) message = 'Duration is required.';
    else {
      const n = Number(val);
      if (!Number.isFinite(n) || n < 1 || n > 300) {
        message = 'Duration must be a number between 1 and 300.';
      }
    }
  } else if (fieldName === 'timeSlot') {
    if (!val) message = 'Time slot is required.';
  } else if (fieldName === 'channel') {
    if (!val) message = 'Channel is required.';
  }

  errors[fieldName].textContent = message;
  return message === '';
}

function validateForm() {
  // run each field validation
  const okName = validateField('name');
  const okDesc = validateField('description');
  const okDuration = validateField('duration');
  const okTime = validateField('timeSlot');
  const okChannel = validateField('channel');

  const allValid = okName && okDesc && okDuration && okTime && okChannel;

  // enable/disable submit button
  submitBtn.disabled = !allValid;
  return allValid;
}

/* attach event listeners for validation as user types */
['name', 'description', 'duration', 'timeSlot', 'channel'].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('input', () => validateForm());
});

/* ------------------------------
   Render / UI
   ------------------------------ */
function showStatus(msg, success = true) {
  statusMessage.textContent = msg;
  statusMessage.style.color = success ? '#2f6f49' : '#c23a3a';
  setTimeout(() => {
    // clear after 3s
    if (statusMessage.textContent === msg) statusMessage.textContent = '';
  }, 3000);
}

function formatDuration(mins) {
  if (!Number.isFinite(mins)) return '';
  if (mins < 60) return ${mins} min;
  const h = Math.floor(mins / 60);
  const r = mins % 60;
  return r === 0 ? ${h} hr${h>1?'s':''} : ${h}h ${r}m;
}

function renderPrograms(list) {
  programListEl.innerHTML = '';

  if (!list || list.length === 0) {
    programListEl.innerHTML = '<p>No programs yet. Add one using the form above.</p>';
    return;
  }

  // create cards
  list.forEach(prog => {
    const card = document.createElement('article');
    card.className = 'program-card';
    card.dataset.id = prog.id;

    card.innerHTML = `
      <div>
        <h3>${escapeHtml(prog.name)}</h3>
        <div class="program-meta">
          <div><strong>Channel:</strong> ${escapeHtml(prog.channel)}</div>
          <div><strong>Time:</strong> ${escapeHtml(prog.timeSlot)}</div>
          <div><strong>Duration:</strong> ${formatDuration(Number(prog.duration))}</div>
        </div>
        <p class="program-desc">${escapeHtml(prog.description)}</p>
      </div>

      <div class="card-actions">
        <button class="edit" data-action="edit">Edit</button>
        <button class="delete" data-action="delete">Delete</button>
      </div>
    `;
    programListEl.appendChild(card);
  });
}

/* safe text to avoid issues if user types HTML */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* ------------------------------
   Form actions: add / update / cancel
   ------------------------------ */
programForm.addEventListener('submit', function (e) {
  e.preventDefault();
  // final validation
  if (!validateForm()) return;

  const id = inputId.value;
  const newProgram = {
    id: id || generateId(),
    name: inputName.value.trim(),
    description: inputDescription.value.trim(),
    duration: Number(inputDuration.value),
    timeSlot: inputTimeSlot.value,
    channel: inputChannel.value.trim()
  };

  if (id) {
    // update existing
    const idx = programs.findIndex(p => p.id === id);
    if (idx >= 0) {
      programs[idx] = newProgram;
      savePrograms(programs);
      renderPrograms(filteredPrograms());
      resetForm();
      showStatus('Program updated successfully.');
    } else {
      showStatus('Could not find program to update.', false);
    }
  } else {
    // add new
    programs.push(newProgram);
    savePrograms(programs);
    renderPrograms(filteredPrograms());
    resetForm();
    showStatus('Program added successfully.');
  }
});

cancelEditBtn.addEventListener('click', () => {
  resetForm();
});

function populateFormForEdit(progId) {
  const p = programs.find(x => x.id === progId);
  if (!p) return;
  inputId.value = p.id;
  inputName.value = p.name;
  inputDescription.value = p.description;
  inputDuration.value = p.duration;
  inputTimeSlot.value = p.timeSlot;
  inputChannel.value = p.channel;

  formTitle.textContent = 'Edit Program';
  submitBtn.textContent = 'Update Program';
  cancelEditBtn.classList.remove('hidden');
  validateForm();
}

function resetForm() {
  programForm.reset();
  inputId.value = '';
  formTitle.textContent = 'Add Program';
  submitBtn.textContent = 'Add Program';
  cancelEditBtn.classList.add('hidden');
  // clear errors
  Object.values(errors).forEach(n => n.textContent = '');
  submitBtn.disabled = true;
}

/* ------------------------------
   Delete
   ------------------------------ */
function removeProgramById(progId) {
  const index = programs.findIndex(p => p.id === progId);
  if (index === -1) return false;
  programs.splice(index, 1);
  savePrograms(programs);
  return true;
}

/* ------------------------------
   Event delegation for edit/delete
   ------------------------------ */
programListEl.addEventListener('click', (ev) => {
  const btn = ev.target.closest('button');
  if (!btn) return;
  const action = btn.dataset.action;
  const card = btn.closest('.program-card');
  if (!card) return;
  const id = card.dataset.id;

  if (action === 'edit') {
    populateFormForEdit(id);
    // scroll to form for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (action === 'delete') {
    const confirmed = confirm('Are you sure you want to delete this program? This cannot be undone.');
    if (!confirmed) return;
    const ok = removeProgramById(id);
    if (ok) {
      renderPrograms(filteredPrograms());
      showStatus('Program deleted.');
      // if currently editing the same program, reset form
      if (inputId.value === id) resetForm();
    } else {
      showStatus('Failed to delete program.', false);
    }
  }
});

/* ------------------------------
   Search / filtering
   ------------------------------ */
function filteredPrograms() {
  const q = (searchInput.value || '').trim().toLowerCase();
  if (!q) return programs.slice().sort(byName);
  return programs.filter(p => p.name.toLowerCase().includes(q)).sort(byName);
}

function byName(a, b) {
  return a.name.localeCompare(b.name);
}

searchInput.addEventListener('input', () => {
  renderPrograms(filteredPrograms());
});

/* ------------------------------
   Initialization
   ------------------------------ */
function init() {
  // initial render sorted by name
  programs = loadPrograms();
  programs.sort(byName);
  renderPrograms(filteredPrograms());
  resetForm();
  // accessibility: try to avoid console errors
  if (!window.localStorage) {
    showStatus('Warning: localStorage not available, data will not persist.', false);
  }
}

// run init on load
init();
[05:45, 12/3/2025] MALINGA 😊❤️🤌🏽: # Program Manager (Week 4 Final Project)

