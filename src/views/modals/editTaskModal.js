import { openModal, closeModal } from '../modal.js';
import { editTask_calendarHandling } from './calendarHandler.js';
import { projects } from '../../models/Project.js';
import { Todo } from '../../models/Todo.js';
import { renderTask } from '../DOMController.js';
import { removeTask } from '../../controllers/AppLogic.js';
import { deleteTask } from '../DOMController.js';
import { renderEditedTask } from '../DOMController.js';
import { saveTasksToLocalStorage } from '../../controllers/AppLogic.js';
import { tasks } from '../../controllers/AppLogic.js';

const editTask_closeBtn = document.getElementById('modal-close-btn-editTask');
const editTask_btn = document.querySelector('#edit-task-btn');



function handleEditTaskSubmission(task) {
  console.log("Handling fucntion started");
  // Get values from form
  const taskName = document.getElementById('edit-task-name').value;
  const taskDesc = document.getElementById('edit-task-desc').value;
  const taskPriority = document.querySelector('input[name="priority"]:checked')?.value;
  const taskDueDate = document.querySelector('#calendarBody-edit td.selected')?.dataset.date;
  const projectId = document.getElementById('project-dropdown-edit').value;

  // Validate form data
  if (!taskName || !taskDesc || !taskPriority || !taskDueDate || !projectId) {
      alert('Please fill in all fields');
      return;
  } else {
      console.log(taskName, taskDesc, taskPriority, taskDueDate, projectId);
  }

  // Update task object properties
  task.name = taskName;
  task.description = taskDesc;
  task.dueDate = new Date(taskDueDate);  // Ensure taskDueDate is in a correct format to construct a Date object
  task.priority = taskPriority;
  task.assignedProject = projectId;

  saveTasksToLocalStorage(tasks);


  // Render the updated task (you need to implement this function
  renderEditedTask(task);
  // Close the modal
  closeModal('modal-editnewTask2');

  // Clear the form (you need to implement this function)

  // Optionally, refresh the task list to show the updated task
  // refreshTaskList();  // You would need to implement this function
}



function populateProjectDropdown(task) {
  const dropdown = document.getElementById('project-dropdown-edit');
  
  // Clear existing options
  dropdown.innerHTML = '';

  console.log(task.assignedProject);
  

  
  // Add an option for each project
  projects.forEach(project => {
      const option = document.createElement('option');
      option.textContent = project;
      dropdown.appendChild(option);

      if (option.textContent === task.assignedProject){
        option.selected = true;
      }
  });


    // Add a default option
}


export function editTaskModal_listeners (){
    editTask_closeBtn.addEventListener('click', function() {

            closeModal('modal-editnewTask2');  
            });

}
    


export function editTask(task, taskElement) {

  console.log("editTaskModal opened up and populated");
  editTask_btn.addEventListener('click', function(){
    handleEditTaskSubmission(task);

  });


  populateProjectDropdown (task);
  
// Set task title and description
document.getElementById("edit-task-name").value = task.title;
document.getElementById("edit-task-desc").value = task.description;

// Select all priority radio inputs
const priorityInputs = document.querySelectorAll('.priority-option input[type="radio"]');

// Convert task priority to lowercase for comparison
console.log(task.priority);
const taskPriority = task.priority;

// Find and check the radio button that matches the task priority
priorityInputs.forEach(input => {
    if (input.value === taskPriority) {
      input.checked = true;
    }
  });

  editTask_calendarHandling (task);
  openModal('modal-editnewTask2');

}