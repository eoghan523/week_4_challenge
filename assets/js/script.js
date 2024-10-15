//DOM waits for the document  to load before starting the function 
document.addEventListener("DOMContentLoaded", function () {
   
    //Creates the Variables in the document that define the to-do list elements with document.getElementById()//

    const addButton = document.getElementById("addTask");
    const taskInput = document.getElementById("taskInput");
    const taskTableBody = document.getElementById("taskTableBody");
    //An Event Listener is a added to 'addButton' button. The function is triggered when clicked// 
    addButton.addEventListener('click', function() {
                                
        const taskToWrite = taskInput.value.trim();
        //The 'taskToWrite' variable is created and value (=) is given to taskInput value and the .trim clears the white space in the 'taskInput' field// 
        const date = new Date().toLocaleDateString();
        //This newly created variable 'date' is given value with new date(). The .toLocaleDateString() draws the new date from the local machine//
        const task = {
            status: 'Incomplete',
            description: taskToWrite,
            date: date
            //These lines create the variable task. Value to task variable is given with three objects are defined within task. status: with the string 'Incomplete' displayed on the task, description: which the taskToWrite user input variable is located , and date: this is where the 'date' variable will be displayed on any new task.
        };
             //Calling function 'addTaskToTable' to add the object of 'task' to the table for reference later.//
        addTaskToTaskTable(task)
        taskInput.value = '';
        // Clears input field after adding a task in the taskInput value field//
        //This function 'addTaskToTable' draws refeerence with the 'task' object//
        function addTaskToTaskTable(task) {
            const createNewTask = document.createElement('tr');
            //creating new variable 'createNewTask', then it gives value which it creates a new element of 'tr'  (table row).
            
            //.innerHTML grabs the children of create new task which has the value of tr, which is 'td' (table data).
            //The 'createNewTak.innerHTML targets the .innerHTML content and gives it value. The `` are backticks. The backticks in JavaScript are used to denote a template literal, meaning that multiple lines of code can be inputed bwteen the backtick braces.// 
            createNewTask.innerHTML = `
                <td class='statusCell'>${task.status}</td>
                <td>${task.description}</td>
                <td>${task.date}</td>
                <td>
                    <button class='completeBtn'>Complete</button> 
                    
                    <button class='deleteBtn'>Delete</button>
                </td>
            `; //This last backtick closes the temporal literal portion of the code. Notice how thee code beteen is HTML syntax. The table is layed out in this segment. The 'td' brackets are added to the rows split up. the $ "is used as an identifier, a function that replicates document. getElementById() and a string/template literal". In the ${} the task.staus, task.description and task.date are targeted from the task  objects. I added two new buttons, 'completeBtn' and deleteBtn' to the table.//
            taskTableBody.appendChild(createNewTask);
            //This line of code appends the changes as a Child in createNewTask//


            const completeBtn = createNewTask.querySelector('.completeBtn');
            //This creates a const variable  for the 'completeBtn' querySelector previously created on the previous line 38.//
            const statusCell = createNewTask.querySelector('.statusCell');
            //this creates a new statusCell variable and gives it the value of the .statusCell class selector as defined in line 40.//
           
            //This adds  an Event Listener to the 'completeBtn' created on line 38. When the  button is clicked, the function is actioned.//
            completeBtn.addEventListener('click', function() {
                //The function is an 'if' / 'else' function. if statusCell text content is equal value and equal data to the string 'Completed'.//
                if (statusCell.textContent === 'Completed') {
                    alert("task is already completed.") //alert will appear if the data type and value are the same as 'Completed.'

                    } else {
                         //This creates an event listener for the 'completeBtn' that listens for a click event triggers a function to change the text
                        statusCell.textContent = 'Completed';
                        completeBtn.disabled = true;
                    }
                    //The else function idf the textContent is not the same value, The statusCell text Content will change from Incomplete to 'Completed'.
                    //When the statusCell.textContent is the value of 'Completed' then the boolean function of true will disable the button.
                });
                 
               // Attach event listener for the delete button
            const deleteBtn = createNewTask.querySelector('.deleteBtn');
            //This line creates the variable deleteBtn and links the value to .'deleteBtn' using .query selector from createNewTask.
            
            deleteBtn.addEventListener('click', function() {    //This is an event listener for the deleteBtn. When clicked it performs a function.
                   // Remove the task row from the table
                taskTableBody.removeChild(createNewTask);
                // Function is remove Child from the taskTableBody.
           
            }); //This closes the deleteBtn event listener function.
      
                


            

            
           
        } //This closes the function 'addTaskToTable'
    }); //This closes the addBtn event listener function.
}) //This closes the "DOMContentLoaded" function all the other functions are nested in.

   













