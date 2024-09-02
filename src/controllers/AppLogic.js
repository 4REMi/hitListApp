// controllers/AppLogic.js
import { Todo } from '../models/Todo.js';
import { renderTask } from '../views/DOMController.js';
import { projects } from '../models/Project.js';
import { addDays } from 'date-fns';
import { createProjectElement } from '../views/modals/createProjectModal.js';


const today = new Date();

// Add 20 days to today's date
const date20DaysFromNow = addDays(today, 20);
// Define your tasks
export const tasks = [
    new Todo(
        "Help grandma fight her neighbor's kid",
        "Seven year old Billy has been plucking flowers out of grandma's garden.",
        date20DaysFromNow, // Remember, month is 0-indexed so July is 6
        "High",
        "Default Project"
    ),
    new Todo(
        "Get rid of the zombies invading my patio",
        "Some undead fellas are trying to stomp on my sunflowers.",
        date20DaysFromNow, // Remember, month is 0-indexed so July is 6
        "Medium",
        "Default Project"
    ),
    new Todo(
        "Drink water.",
        "No description for this item.",
        new Date(2024, 10, 4), // Remember, month is 0-indexed so July is 6
        "Low",
        "Default Project"
    ),
    new Todo(
        "Doom scroll for 6 hours.",
        "Deep fry your dopamine receptor throughoutly",
        new Date(2024, 4, 4), // Remember, month is 0-indexed so July is 6
        "High",
        "Default Project",
        true
    ),
    new Todo(
        "Hit the quan in an elegant fashion.",
        "Nae Nae if there's time available",
        new Date(2024, 3, 4), // Remember, month is 0-indexed so July is 6
        "Low",
        "Default Project",
        true
    ),

];


export function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Function to initialize app



export function initializeApp() {
    tasks.forEach(task => renderTask(task));
    //projects.forEach(project => createProjectElement(project) );
}


export function removeTask(taskId) {
    const index = tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      tasks.splice(index, 1);
    }
    saveTasksToLocalStorage(tasks);
}


export function loadTasksFromLocalStorage() {
    const tasksData = localStorage.getItem('tasks');
    if (tasksData) {
        const parsedTasks = JSON.parse(tasksData);
        return parsedTasks.map(task => new Todo(
            task.title,
            task.description,
            new Date(task.dueDate),  // Convert the date back to a Date object
            task.priority,
            task.assignedProject,
            task.isCompleted
        ));
    }
    return [];
}

export function loadProjectsFromLocalStorage() {
    const projectsData = localStorage.getItem('projects');
    if (projectsData) {
        const parsedProjects = JSON.parse(projectsData); // Correct reference
        return parsedProjects;
    }
    return [];
}


// Add more tasks as needed
