const inputBox = document.getElementById("input-box");

const listContainer = document.getElementById("list-container");
let currentUser = null;

function login() {
    // Basic validation (for demonstration)
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && password) {
        // Hide login page and show to-do list
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('todo-container').style.display = 'flex';
        loadUserTasks();
    } else {
        alert('Please enter both username and password');
    }
}

function logout() {
    // Hide to-do list and show login page
    document.getElementById('todo-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'flex';
}

function addTask() {
    const taskInput = document.getElementById('input-box');
    const taskText = taskInput.value.trim();

    if (taskText) {
        // Save task to current user’s task list
        let tasks = JSON.parse(localStorage.getItem(currentUser)) || [];
        tasks.push(taskText);
        localStorage.setItem(currentUser, JSON.stringify(tasks));

        // Update UI and clear input
        displayTask(taskText);
        taskInput.value = '';
    }
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function loadUserTasks() {
    document.getElementById('list-container').innerHTML = ''; // Clear list
    const tasks = JSON.parse(localStorage.getItem(currentUser)) || [];
    tasks.forEach(task => displayTask(task));
}

function displayTask(taskText, index) {
    const taskList = document.getElementById('list-container');
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create the delete button
    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'x';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function() {
        deleteTask(index);
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}


showTask();