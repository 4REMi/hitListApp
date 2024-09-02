
import { editTask } from './modals/editTaskModal.js';
import { removeTask } from '../controllers/AppLogic.js';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { tasks } from '../controllers/AppLogic.js';
import { projects, saveProjectsToLocalStorage } from '../models/Project.js';
import { property } from 'lodash';
import dateIcon from '../assets/dateIcon.svg';
import completedIcon from '../assets/completedIcon.svg';
import hashIcon from '../assets/hashIcon.svg';
import { saveTasksToLocalStorage } from '../controllers/AppLogic.js';


// views/DOMController.js
export function renderTask(task) {

    const tasksContainer = document.querySelector('.tasks-container');
    const taskElement = document.createElement('div');
    taskElement.className = `task-card ${task.priority.toLowerCase()} ${task.isCompleted ? 'completed' : ''}`;
    taskElement.innerHTML = `
        <div class="task ${task.isCompleted ? 'task-complete' : ''}">
            <div class="checkBoxContainer">
                <img class="checkBox" src="./assets/${task.isCompleted ? 'checkedBox' : 'uncheckedBox'}.svg" alt="" data-id="${task.id}">
            </div>
            <div class="task-details">
                <h3 class="task-title ${task.isCompleted ? 'task-title-complete' : ''}">${task.title}</h3>
                <p class="task-description ${task.isCompleted ? 'task-description-complete' : ''}">${task.description}</p>
            </div>
            <div class="task-meta">
                <span class="priority_${task.priority.toLowerCase()}">
                    <img src="./assets/${task.priority}.svg" class="task_metaIcon"> ${task.priority}
                </span>
                <span class="due-date">
                    <img src="./assets/dateIcon.svg" class="task_metaIcon">${task.formattedDueDate}
                </span>
                <span class="assigned-project">
                    <img src="./assets/hashIcon.svg" class="task_metaIcon">${task.assignedProject}
                    </span>
                <img src="./assets/taskSettings_icon.svg" class="taskSettings_icon" alt="">
            </div>
        </div>
    `;


    tasksContainer.appendChild(taskElement);
    taskElement.querySelector('.checkBox').addEventListener('click', () => toggleTaskCompletion(task, taskElement));

    // Add event listener to the task settings icon
    const settingsIcon = taskElement.querySelector('.taskSettings_icon');
    settingsIcon.addEventListener('click', () => createDropdownMenu(task, taskElement));
}

export function renderEditedTask(task) {
    // Find the task element in the DOM by its ID
    console.log(task.id);
    const taskElement = document.querySelector(`[data-id='${task.id}']`).closest('.task-card');

    // If the task element exists in the DOM, update it
    if (taskElement) {
        taskElement.className = `task-card ${task.priority.toLowerCase()} ${task.isCompleted ? 'completed' : ''}`;
        taskElement.innerHTML = `
            <div class="task ${task.isCompleted ? 'task-complete' : ''}">
                <div class="checkBoxContainer">
                    <img class="checkBox" src="./assets/${task.isCompleted ? 'checkedBox' : 'uncheckedBox'}.svg" alt="" data-id="${task.id}">
                </div>
                <div class="task-details">
                    <h3 class="task-title ${task.isCompleted ? 'task-title-complete' : ''}">${task.title}</h3>
                    <p class="task-description ${task.isCompleted ? 'task-description-complete' : ''}">${task.description}</p>
                </div>
                <div class="task-meta">
                    <span class="priority_${task.priority.toLowerCase()}">
                        <img src="./assets/${task.priority}.svg" class="task_metaIcon"> ${task.priority}
                    </span>
                    <span class="due-date">
                        <img src="./assets/dateIcon.svg" class="task_metaIcon">${task.formattedDueDate}
                    </span>
                    <span class="assigned-project">
                        <img src="./assets/hashIcon.svg" class="task_metaIcon">${task.assignedProject}
                    </span>
                    <img src="./assets/taskSettings_icon.svg" class="taskSettings_icon" alt="">
                </div>
            </div>
        `;

        // Re-attach event listeners if necessary
        taskElement.querySelector('.checkBox').addEventListener('click', () => toggleTaskCompletion(task, taskElement));
        const settingsIcon = taskElement.querySelector('.taskSettings_icon');
        settingsIcon.addEventListener('click', () => createDropdownMenu(task, taskElement));
    } else {
        console.log(`Task with ID ${task.id} not found in the DOM.`);
    }
}

export function clearTasks () {

    const tasksContainer = document.querySelector('.tasks-container');
    
    tasksContainer.innerHTML = ``;
}

function toggleTaskCompletion(task, taskElement) {
    // Toggle the completion status
    task.isCompleted = !task.isCompleted;

    // Directly use the passed taskElement to update the checkbox image
    const checkBox = taskElement.querySelector('.checkBox');
    checkBox.src = `./assets/${task.isCompleted ? 'checkedBox' : 'uncheckedBox'}.svg`;

    // Update the task card class for styling purposes
    taskElement.classList.toggle('completed');
    taskElement.querySelector('.task').classList.toggle('task-complete');
    taskElement.querySelector('.task-title').classList.toggle('task-title-complete');
    taskElement.querySelector('.task-description').classList.toggle('task-description-complete');
}


function createDropdownMenu(task, taskElement) {
    // First, remove any existing dropdown to ensure only one is open at a time
    const existingDropdown = document.querySelector('.task-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
    }

    // Create the dropdown menu element
    const dropdown = document.createElement('div');
    dropdown.className = 'task-dropdown';
    dropdown.innerHTML = `


    
<button class="edit-task-btn"><span class="dropdown-btn-icon"><img src="./assets/icon_dropdown-editTask.svg" alt="" class="dropdown-btn-icon"></span>Edit</button>
    <button class="delete-task-btn"><span class="dropdown-btn-icon"><img src="./assets/icon_dropdown-deleteTask.svg" alt="" class="dropdown-btn-icon"></span>Delete</button>


    `;
    taskElement.appendChild(dropdown);

    // Position the dropdown right below the settings icon
    const settingsIcon = taskElement.querySelector('.taskSettings_icon');
    const iconRect = settingsIcon.getBoundingClientRect();
    dropdown.style.position = 'absolute';
    dropdown.style.top = `${iconRect.bottom}px`;
    dropdown.style.left = `${iconRect.left}px`;

    // Set up click event listeners for the Edit and Delete buttons
    dropdown.querySelector('.edit-task-btn').addEventListener('click', () => editTask(task, taskElement));
    dropdown.querySelector('.delete-task-btn').addEventListener('click', () => deleteTask(task, taskElement));

    
function handleClickOutside(event) {
    if (!dropdown.contains(event.target) && !settingsIcon.contains(event.target)) {
        dropdown.remove();
        document.removeEventListener('click', handleClickOutside); // Clean up the global event listener
    }
}

// Add a click event listener to the document
setTimeout(() => { // Use setTimeout to avoid immediately triggering on the same click that opened the dropdown
    document.addEventListener('click', handleClickOutside);
}, 0);
}

export function createDropdownMenu_projects(name,ProjectElement) {
    // First, remove any existing dropdown to ensure only one is open at a time
    const existingDropdown = document.querySelector('.task-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
    }

    // Create the dropdown menu element
    const dropdown = document.createElement('div');
    dropdown.className = 'task-dropdown';
    dropdown.innerHTML = `


    
    <button class="delete-task-btn"><span class="dropdown-btn-icon"><img src="./assets/icon_dropdown-deleteTask.svg" alt="" class="dropdown-btn-icon"></span>Delete</button>


    `;
    ProjectElement.appendChild(dropdown);

    // Position the dropdown right below the settings icon
    const settingsIcon = ProjectElement.querySelector('.projectSettings');
    const iconRect = settingsIcon.getBoundingClientRect();
    dropdown.style.position = 'absolute';
    dropdown.style.top = `${iconRect.bottom}px`;
    dropdown.style.left = `${iconRect.left}px`;

    // Set up click event listeners for the Edit and Delete buttons
        // Set up click event listeners for the Edit and Delete buttons
        dropdown.querySelector('.delete-task-btn').addEventListener('click', () => deleteProject(name, ProjectElement));
    
function handleClickOutside(event) {
    if (!dropdown.contains(event.target) && !settingsIcon.contains(event.target)) {
        dropdown.remove();
        document.removeEventListener('click', handleClickOutside); // Clean up the global event listener
    }
}

// Add a click event listener to the document
setTimeout(() => { // Use setTimeout to avoid immediately triggering on the same click that opened the dropdown
    document.addEventListener('click', handleClickOutside);
}, 0);
}

export function deleteProject(name, ProjectElement) {


    // Filter out the tasks that do not match the assignedProject with the provided name
    const filteredTasks = tasks.filter(task => task.assignedProject !== name);
    
    // Update the tasks array with the filtered tasks
    tasks.length = 0;  // Clear the original array
    tasks.push(...filteredTasks);  // Push the filtered tasks back into the array
    saveTasksToLocalStorage(tasks);
    ProjectElement.remove();
        // Find the index of the project named "name" in the projects array
        const index = projects.indexOf(name);
    
        // If the project exists in the array (index is not -1), remove it
        if (index > -1) {
            projects.splice(index, 1);
            saveProjectsToLocalStorage(projects);
        }

        setTimeout(() => {
            const header = document.getElementById("mainContentHeader");
            const headerIcon = document.getElementById("contentIcon");
            const infoText = document.querySelector(".infoText_contentHeader");
            header.innerHTML = 'Default Project';
            infoText.textContent = 'These tasks belong to an specific project.';
            headerIcon.src = hashIcon;
            projectTask_Loader('Default Project');
        }, 0);  // 2000 milliseconds = 2 seconds


}





export function deleteTask(task, taskElement) {
    removeTask(task.id);
    taskElement.remove(); 
}





import checklistIcon from '../assets/checklistIcon.svg';

function allTasks_Loader (){
    
    const sidebarBtn = document.getElementById ('all-tasks');
    const header = document.getElementById("mainContentHeader");
    const headerIcon = document.getElementById("contentIcon");
    const infoText = document.querySelector(".infoText_contentHeader");
   
    sidebarBtn.addEventListener('click', function() {
        header.innerHTML = 'All Tasks';
        headerIcon.src = checklistIcon;
        infoText.textContent = 'Find all of your ToDos, from every project.';
        clearTasks();
        console.log ("Tasks Cleared in the allTasks_Loader");
        tasks.forEach(task => renderTask(task));
});
}


function upcomingTasks_Loader() {
    const sidebarBtn = document.querySelector('#upcoming-tasks');
    const header = document.getElementById("mainContentHeader");
    const headerIcon = document.getElementById("contentIcon");
    const infoText = document.querySelector(".infoText_contentHeader");
   

    
    sidebarBtn.addEventListener('click', function() {
        header.innerHTML = 'Upcoming';
        infoText.textContent = 'These are the tasks within one month from today\'s date.';
        headerIcon.src = dateIcon;
        clearTasks(); // Clears current tasks DOM
        
        const today = new Date();
        const oneMonthLater = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        
        const upcomingTasks = tasks.filter(task => {
            const taskDueDate = new Date(task.dueDate);
            return taskDueDate >= today && taskDueDate <= oneMonthLater;
        });
        
        upcomingTasks.forEach(task => renderTask(task));
    });
}

function completedTasks_Loader() {
    
    const completedTasksBtn = document.querySelector('#completed-tasks');  // Assume this ID exists
    const header = document.getElementById("mainContentHeader");
    const headerIcon = document.getElementById("contentIcon");
    const infoText = document.querySelector(".infoText_contentHeader");
    
    completedTasksBtn.addEventListener('click', function() {
        header.innerHTML = 'Completed';
        infoText.textContent = 'These are the tasks that you have marked as completed.';
        headerIcon.src = completedIcon;
        clearTasks();  // Clear current tasks from DOM
        
        const completedTasks = tasks.filter(task => task.isCompleted===true);
        completedTasks.forEach(task => renderTask(task));

    });
}

function DefaultProject_Loader(){
    const header = document.getElementById("mainContentHeader");
    const headerIcon = document.getElementById("contentIcon");
    const infoText = document.querySelector(".infoText_contentHeader");




    const ProjectElement = document.querySelector('#DefaultProject');
     ProjectElement.addEventListener('click', function() {
        console.log("Default Project Initialized");
        header.innerHTML = 'Default Project';
        infoText.textContent = 'These tasks belong to an specific project.';
        headerIcon.src = hashIcon;
       projectTask_Loader("Default Project");
    });
}


export function projectTask_Loader (name){


        clearTasks();  // Clear current tasks from DOM
        const assignedTaskforProject = tasks.filter(task => task.assignedProject===name);
        assignedTaskforProject.forEach(task => renderTask(task));
}



export function sidebarBtn_listeners (){
    console.log("function loaded correctly");
    allTasks_Loader ();
    upcomingTasks_Loader ();
    completedTasks_Loader();
    DefaultProject_Loader ();
}


export function darkModeBtn_listener() {
    const lightSwitch = document.querySelector(".lightSwitch");

    lightSwitch.addEventListener('click', function () {
        document.documentElement.classList.toggle('dark-mode');
    });
}

