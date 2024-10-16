//DOM waits for the document  to load before starting the function//
document.addEventListener("DOMContentLoaded", function () {
    // Select the necessary DOM elements
    const addButton = document.getElementById("addTask");
    const taskInput = document.getElementById("taskInput");
    const taskTableBody = document.getElementById("taskTableBody");

    // Load tasks from local storage when the page loads
    loadTasksFromLocalStorage();

    // Add event listener for the "Add Task" button
    addButton.addEventListener('click', function () {
        const taskToWrite = taskInput.value.trim();
        //The 'taskToWrite' variable is created and value (=) is given to taskInput value and the .trim clears the white space in the 'taskInput' field// 
        // Prevent adding empty tasks
        if (!taskToWrite) {
            alert("Please enter a task!");
            return;
        }

        const date = new Date().toLocaleDateString();
          //This newly created variable 'date' is given value with new date(). The .toLocaleDateString() draws the new date from the local machine//
        const task = {
            status: 'Incomplete',
            description: taskToWrite,
            date: date
            //These lines create the variable task. Value to task variable is given with three objects are defined within task. status: with the string 'Incomplete' displayed on the task, description: which the taskToWrite user input variable is located , and date: this is where the 'date' variable will be displayed on any new task.
        };

        // Add the task to the table and local storage
        addTaskToTaskTable(task);
        saveTaskToLocalStorage(task);  // Save the task to local storage
        taskInput.value = '';  // Clear the input field after adding a task
    });

    // Function to add the task to the table
    function addTaskToTaskTable(task) {
        const createNewTask = document.createElement('tr');  // Create a new table row element
        
        // Add table data and buttons for each task
        //The 'createNewTak.innerHTML targets the .innerHTML content and gives it value. The `` are backticks. The backticks in JavaScript are used to denote a template literal, meaning that multiple lines of code can be inputed bwteen the backtick braces.// 
        createNewTask.innerHTML = `
            <td class='statusCell'>${task.status}</td>
            <td>${task.description}</td>
            <td>${task.date}</td>
            <td>
                <button class='completeBtn'>Complete</button>
                <button class='deleteBtn'>Delete</button>
            </td>
        `;  //This last backtick closes the temporal literal portion of the code. Notice how thee code beteen is HTML syntax. The table is layed out in this segment. The 'td' brackets are added to the rows split up. the $ "is used as an identifier, a function that replicates document. getElementById() and a string/template literal". In the ${} the task.staus, task.description and task.date are targeted from the task  objects. I added two new buttons, 'completeBtn' and deleteBtn' to the table.//
        
        // Append the new task row to the task table body
        taskTableBody.appendChild(createNewTask);

        // Attach event listener for the "Complete" button
        const completeBtn = createNewTask.querySelector('.completeBtn');
        const statusCell = createNewTask.querySelector('.statusCell');

        completeBtn.addEventListener('click', function () {
            // Change the status to "Completed"
            statusCell.textContent = 'Completed';
            completeBtn.disabled = true; // Disable the button after completing the task
            updateTaskStatusInLocalStorage(task.description);  // Update the task status in local storage
        });

        // Attach event listener for the "Delete" button
        const deleteBtn = createNewTask.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', function () {
            // Remove the task row from the table
            taskTableBody.removeChild(createNewTask);
            deleteTaskFromLocalStorage(task.description);  // Delete the task from local storage
        });
    }

    // Function to save a task to local storage
    function saveTaskToLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];  // Get existing tasks or initialize an empty array
        tasks.push(task);  // Add the new task to the array
        localStorage.setItem('tasks', JSON.stringify(tasks));  // Save the updated tasks array to local storage
    }

    // Function to load tasks from local storage
    function loadTasksFromLocalStorage() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];  // Get existing tasks or initialize an empty array
        tasks.forEach(function(task) {
            addTaskToTaskTable(task);  // Add each task to the table
        });
    }

    // Function to update the task status in local storage when marked as complete
    function updateTaskStatusInLocalStorage(description) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => {
            if (task.description === description) {
                task.status = 'Completed';  // Update the task status
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));  // Save the updated tasks array to local storage
    }

    // Function to delete a task from local storage
    function deleteTaskFromLocalStorage(description) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.description !== description);  // Remove the task with the matching description
        localStorage.setItem('tasks', JSON.stringify(tasks));  // Save the updated tasks array to local storage
    }
});












