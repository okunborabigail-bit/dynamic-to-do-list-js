document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    // Initialize tasks array
    let tasks = [];
    // Load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks; // store in JS array
        tasks.forEach(taskText => createTaskElement(taskText)); // create DOM elements
    }
    // Save tasks array to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    // Create DOM element for a task
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        // Remove task both from DOM and JS array
        removeButton.onclick = () => {
            taskList.removeChild(li);
            tasks = tasks.filter(task => task !== taskText);
            saveTasks();
        };
        li.appendChild(removeButton);
        taskList.appendChild(li);
    }
    // Add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }
        // Add to JS array and save
        tasks.push(taskText);
        saveTasks();
        // Create the DOM element
        createTaskElement(taskText);
        // Clear input
        taskInput.value = '';
    }
    // Event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') addTask();
    });
    // Load tasks on page load
    loadTasks();
});
