import { openModal, closeModal } from '../modal.js';
import { projects } from '../../models/Project.js';
import { Todo } from '../../models/Todo.js';
import { renderTask } from '../DOMController.js';
import { tasks } from '../../controllers/AppLogic.js';
import { newTask_calendarHandling } from './calendarHandler.js';
const newTaskBtn = document.querySelector(".addnewTask_Btn");
const newTask_closeBtn = document.getElementById('modal-close-btn-addNewTask');
import { saveTasksToLocalStorage } from '../../controllers/AppLogic.js';

newTask_calendarHandling ();


function populateProjectDropdown() {
    const dropdown = document.getElementById('project-dropdown');
    
    // Clear existing options
    dropdown.innerHTML = '';
    
    // Add a default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a Project';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    dropdown.appendChild(defaultOption);
    
    // Add an option for each project
    projects.forEach(project => {
        const option = document.createElement('option');
        option.textContent = project;
        dropdown.appendChild(option);
    });
}

function handleNewTaskSubmission() {

    // Get values from form
    const taskName = document.getElementById('task-name').value;
    const taskDesc = document.getElementById('task-desc').value;
    const taskPriority = document.querySelector('input[name="priority"]:checked')?.value;
    const taskDueDate = document.querySelector('td.selected')?.dataset.date;
    const projectId = document.getElementById('project-dropdown').value;
    


      // Log the date before creating the task
      console.log("Selected due date:", taskDueDate);

    // Validate form data
    if (!taskName || !taskDesc || !taskPriority || !taskDueDate || !projectId) {
        alert('Please fill in all fields');
        return;
    }
    else{

    }

    // Create new task object
    const newTask = new Todo(
        taskName,
        taskDesc,
        taskDueDate,  // Ensure taskDueDate is in a correct format to construct a Date object
        taskPriority,
        projectId,  // Assuming projectId is analogous to "Default Project"
        false       // Assuming new tasks are not completed by default
    );


    // Add the new task
    tasks.push(newTask);
    saveTasksToLocalStorage(tasks);
    renderTask(newTask);

 
    // Close the modal
    closeModal('modal-addNewTask2');


    // Clear the form
clearTaskForm();

    // Optionally, refresh the task list to show the new task
    // refreshTaskList();  // You would need to implement this function
}




function clearTaskForm() {
    const taskName = document.getElementById('task-name');
    const taskDesc = document.getElementById('task-desc');
    const taskDueDate = document.querySelector('.selected-date');  // Assuming you use a date picker or similar

    // Clear text inputs
    taskName.value = "";
    taskDesc.value = "";
    if (taskDueDate) selectedDate = null;

    // Clear radio buttons
    document.querySelectorAll('input[name="priority"]').forEach(radio => {
        radio.checked = false;
    });

    // Additionally, if you're using a dropdown for project selection:
    const projectId = document.getElementById('project-dropdown');
    if (projectId) projectId.value = "";  // Reset to default or placeholder value



    // Select all <td> elements within the calendar that have the class 'current-month'
        const dateCells = document.querySelectorAll('td.current-month');
    
        // Iterate through all collected <td> elements
        dateCells.forEach(cell => {
            // If the cell also has the 'selected' class, remove it
            if (cell.classList.contains('selected')) {
                cell.classList.remove('selected');
            }
        });
    
        console.log('Calendar selection cleared.');
   
}

const addTaskbtn = document.querySelector(".add-task-btn");
addTaskbtn.addEventListener ('click', function (){
    handleNewTaskSubmission();
});


export function addNewTaskModal_listeners() {
    newTaskBtn.addEventListener('click', function() {
        populateProjectDropdown();  // Populate the dropdown when the modal is opened
        openModal('modal-addNewTask2');
    });

    newTask_closeBtn.addEventListener('click', function() {
        closeModal('modal-addNewTask2');
    });
}