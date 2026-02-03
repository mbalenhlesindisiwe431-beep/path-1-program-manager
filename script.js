// Exercise 1: Background Color Changer
function changeBg() {
    document.body.style.background = 
        "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// Exercise 4: Simple To-Do List
let tasks = [];

function addTask() {
    const input = document.getElementById("taskInput");
    if (input.value.trim() === "") return;

    tasks.push(input.value);
    displayTasks();
    input.value = "";
}

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${task} 
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        li.onclick = () => li.classList.toggle("done");
        list.appendChild(li);
    });
}

function deleteTask(i) {
    tasks.splice(i, 1);
    displayTasks();
}

// Exercise 3: Form Validation
function validateProgramForm(event) {
    const name = document.getElementById("pname").value;
    const desc = document.getElementById("pdesc").value;

    if (name === "" || desc === "") {
        event.preventDefault();
        alert("Please fill all required fields.");
    }
}

// Exercise 4: Tabs
function openTab(tab) {
    document.querySelectorAll(".tab-content")
        .forEach(sec => sec.style.display = "none");

    document.getElementById(tab).style.display = "block";
}

// Exercise 5: Image Gallery
let current = 0;
let images = [
    "img1.jpg", "img2.jpg", "img3.jpg",
    "img4.jpg", "img5.jpg", "img6.jpg"
];

function nextImg() {
    current = (current + 1) % images.length;
    document.getElementById("galleryImg").src = images[current];
}

function prevImg() {
    current = (current - 1 + images.length) % images.length;
    document.getElementById("galleryImg").src = images[current];
}