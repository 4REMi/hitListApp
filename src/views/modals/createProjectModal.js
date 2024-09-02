import { openModal, closeModal } from '../modal.js';
import { projects } from '../../models/Project.js';
import { clearTasks } from '../DOMController.js';
import { tasks } from '../../controllers/AppLogic.js';
import { projectTask_Loader } from '../DOMController.js';
import { createDropdownMenu_projects } from '../DOMController.js';
import { saveProjectsToLocalStorage } from '../../models/Project.js';
const newProjectBtn = document.getElementById('addIcon');

const newProject_closeBtn = document.getElementById('modal-close-btn-createProject');
const createProjectBtn = document.querySelector('.create-btn');  // Ensure to use '.' for class selector
const projectNameInput = document.querySelector('.project-input'); // Assuming input class name is 'project-input'

export function createProjectModal_listeners() {
    newProjectBtn.addEventListener('click', function() {
        openModal('modal-createProject');
    });

    newProject_closeBtn.addEventListener('click', function() {
        closeModal('modal-createProject');
    });

    createProjectBtn.addEventListener('click', function() {
        const projectName = projectNameInput.value.trim(); // Get the trimmed value from input


        if (projects.includes(projectName)){
            alert('Seems like there is project under that name already!'); // User feedback

        } else {
            if (projectName) { 
                addProject(projectName); // Call function to add the project
                closeModal('modal-createProject'); // Optionally close the modal after creation
                projectNameInput.value = "";
            } else {
                alert('Please enter a project name.'); // User feedback
            }
        }


    });
}

function addProject(name) {
    projects.push(name);
    saveProjectsToLocalStorage(projects);
    createProjectElement(name);
    projectTask_Loader(name);
}

export function createProjectElement(name) {
    const projectCategories = document.querySelector('.project-categories');
    const ProjectElement = document.createElement('div');
    const trimmedName = name.replace(/\s+/g, ""); // Reemplaza todos los espacios en el nombre
    const uniqueId = trimmedName + Date.now(); // Apendiza la marca de tiempo actual
    ProjectElement.innerHTML = `
        <button class="sidebarProject">
            <span class="iconContainer"> <img class="sidebarIcon" src="./assets/hashIcon.svg" alt=""></span>
            <div class="sidebarName" id="${uniqueId}"><h2>${name}</h2></div>
            <span class="iconContainer"> <img class="projectSettings" src="./assets/projectSettings.svg" alt=""></span>
        </button>
    `;

    const header = document.getElementById("mainContentHeader");
    const headerIcon = document.getElementById("contentIcon");
    const infoText = document.querySelector(".infoText_contentHeader");

    ProjectElement.addEventListener('click', function() {
        header.innerHTML = `${name}`; 
        infoText.textContent = 'These tasks belong to a specific project.';
        headerIcon.innerHTML = '<img src="./assets/dateIcon.svg" alt="icon">';
        projectTask_Loader(name);
    });

    header.innerHTML = `${name}`; 
    infoText.textContent = 'These tasks belong to a specific project.';
    headerIcon.innerHTML = '<img src="./assets/dateIcon.svg" alt="icon">';

    const settingsIcon = ProjectElement.querySelector('.projectSettings');
    settingsIcon.addEventListener('click', function() {
        createDropdownMenu_projects(name, ProjectElement);
    });

    projectCategories.appendChild(ProjectElement);
}