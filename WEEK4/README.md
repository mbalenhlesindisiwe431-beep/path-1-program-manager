# Program Manager (Week 4 Final Project)

## Overview
A small web application to manage broadcast programs using only HTML, CSS and vanilla JavaScript. All program data is stored in the browser's localStorage.

## Features
- Display programs as cards
- Add new program (form validation)
- Edit existing program (populate form and update)
- Delete program with confirmation
- Search/filter programs by name
- Data persists across page reloads with localStorage
- Responsive layout for mobile and desktop

## Files
- index.html — main page and form
- style.css — styles (responsive)
- script.js — all JavaScript (data + UI logic)
- README.md — this file

## How to run
1. Clone or copy the project folder path-1-project/.
2. Open index.html in your browser (no server required).
3. Use the form to add programs. Data is saved automatically in localStorage.

## Validation rules
- All fields are required
- Duration must be numeric and between 1 and 300 minutes
- Submit button is disabled until all fields are valid
- Error messages shown for each invalid field

## Testing checklist
- [ ] Add a program (all fields)
- [ ] Edit an existing program
- [ ] Delete a program (confirm)
- [ ] Search by partial name
- [ ] Data remains after page refresh
- [ ] Works on mobile (use device emulator)
- [ ] No console errors
- [ ] Code commented and readable

## Notes / Extensibility
- Currently data is stored in localStorage. To add a backend, replace loadPrograms() and savePrograms() with API calls.
- You can add more fields (e.g. "Live" checkbox) easily by updating the form and JS.