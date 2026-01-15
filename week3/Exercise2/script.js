const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = [];

addBtn.addEventListener("click", function() {
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    tasks.push(taskText);
    displayTasks();

    taskInput.value = "";
});

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        // click to complete
        li.addEventListener("click", () => {
            li.classList.toggle("completed");
        });

        li.innerHTML = `
            ${task} 
            <button onclick="deleteTask(${index})">X</button>
        `;

        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}