// Run script after the page loads
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    // Load tasks from Local Storage on page load
    loadTasks();
    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false prevents saving again
    }
    // Function to save tasks array to Local Storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.firstChild.textContent); // get the task text only
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    // Function to add a task
    // save = true means we save to Local Storage
    function addTask(taskText = null, save = true) {
        // If taskText not provided, get it from input field
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        // Create li element
        const li = document.createElement('li');
        li.textContent = taskText;
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';
        // Remove task from DOM and Local Storage
        removeButton.onclick = function () {
            taskList.removeChild(li);
            saveTasks();
        };
        // Append button to li, then li to list
        li.appendChild(removeButton);
        taskList.appendChild(li);
        // Clear input field if coming from user input
        if (taskText === taskInput.value.trim()) {
            taskInput.value = "";
        }
        // Save to Local Storage if needed
        if (save) {
            saveTasks();
        }
    }
    // Event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
