let currentUser = null;

// Function to handle login
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && password) {
        currentUser = username;

        const loginContainer = document.getElementById('login-container');
        const todoContainer = document.getElementById('todo-container');

        // Fade out and slide up login container
        loginContainer.classList.remove('visible');
        loginContainer.classList.add('hidden');

        // Show todo container after fading out
        setTimeout(() => {
            loginContainer.style.display = 'none'; // Hide login container
            todoContainer.style.display = 'flex'; // Show todo container
            todoContainer.classList.remove('hidden');
            todoContainer.classList.add('visible');
        }, 500); // Match with CSS transition duration

        loadUserTasks(); // Load tasks specific to this user
    } else {
        alert('Please enter both username and password');
    }
}

// Function to handle logout
function logout() {
    currentUser = null;

    const todoContainer = document.getElementById('todo-container');
    const loginContainer = document.getElementById('login-container');

    // Fade out and slide up todo container
    todoContainer.classList.remove('visible');
    todoContainer.classList.add('hidden');

    // Show login container after fading out
    setTimeout(() => {
        todoContainer.style.display = 'none'; // Hide todo container
        loginContainer.style.display = 'flex'; // Show login container
        loginContainer.classList.remove('hidden');
        loginContainer.classList.add('visible');
        document.querySelector('.todo-app').classList.add('visible'); // Make sure the todo-app is visible

    }, 500); // Match with CSS transition duration
}

// Function to load tasks for the current user
function loadUserTasks() {
    const taskList = document.getElementById('list-container');
    taskList.innerHTML = ''; // Clear existing tasks
    const tasks = JSON.parse(localStorage.getItem(currentUser)) || [];
    tasks.forEach(task => {
        const isCompleted = task.completed; // Check if the task is completed
        displayTask(task.text, isCompleted); // Pass the task text and completion status
    });
}

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('input-box');
    const taskText = taskInput.value.trim();

    if (taskText) {
        let tasks = JSON.parse(localStorage.getItem(currentUser)) || [];
        tasks.push({ text: taskText, completed: false }); // Store task with completed status

        localStorage.setItem(currentUser, JSON.stringify(tasks));
        displayTask(taskText, false);
        taskInput.value = ''; // Clear input
    }
}

// Helper function to display a task
function displayTask(taskText, isCompleted) {
    const taskList = document.getElementById('list-container');
    const li = document.createElement('li');
    if (isCompleted) {
        li.classList.add('checked')
    }
    const deleteButton = document.createElement("span");
    deleteButton.textContent = '✖';
    deleteButton.className = 'delete-button'; // Add a class for styling
    deleteButton.onclick = function() {
        deleteTask(taskText); // Call the delete function
    };
    li.textContent = taskText;
    li.onclick = function() {
        toggleTaskCompletion(taskText); // Call the toggle function
    };
    li.appendChild(deleteButton); // Append the delete button to the list item
    taskList.appendChild(li);
}

function toggleTaskCompletion(taskText) {
    let tasks = JSON.parse(localStorage.getItem(currentUser)) || [];
    const task = tasks.find(t => t.text === taskText); // Find the task
    if (task) {
        task.completed = !task.completed; // Toggle the completed status
        localStorage.setItem(currentUser, JSON.stringify(tasks)); // Update localStorage
        loadUserTasks(); // Refresh the task list display
    }
}


function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem(currentUser)) || [];
    tasks = tasks.filter(task => task.text !== taskText); // Remove the task from the array
    localStorage.setItem(currentUser, JSON.stringify(tasks)); // Update localStorage
    loadUserTasks(); // Refresh the task list display
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('input-box').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { // Check if the pressed key is Enter
            addTask(); // Call the addTask function
        }
    });
});