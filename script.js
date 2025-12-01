// Step 1: Run the script after the page loads
document.addEventListener('DOMContentLoaded', function () {
    // Step 2: Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    // Step 3: Function that adds a task
    function addTask() {
        // Get and trim text
        const taskText = taskInput.value.trim();
        // Check if empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        // Step 4: Create the new task (li)
        const li = document.createElement('li');
        li.textContent = taskText;
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';
        // Remove task when clicked
        removeButton.onclick = function () {
            taskList.removeChild(li);
        };
        // Append button to li, then li to list
        li.appendChild(removeButton);
        taskList.appendChild(li);
        // Clear input field
        taskInput.value = "";
    }
    // Step 5: Add event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    // OPTIONAL: Not really needed but included because ALX mentioned it
    // Run addTask on DOM load (it won't add anything unless input has text)
    addTask();
});

