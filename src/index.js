import styles from './styles.css';
import addIcon from './assets/addIcon.svg';
import checkedBox from './assets/checkedBox.svg';
import checklistIcon from './assets/checklistIcon.svg';
import completedIcon from './assets/completedIcon.svg';
import dateIcon from './assets/dateIcon.svg';
import descriptionIcon from './assets/descriptionIcon.svg';
import hashIcon from './assets/hashIcon.svg';
import highIcon from './assets/High.svg';
import hitListLogo from './assets/HitListLogo.svg';
import infoIcon from './assets/info.svg';
import lightSwitchIcon from './assets/lightSwitch.svg';
import lowIcon from './assets/Low.svg';
import mediumIcon from './assets/Medium.svg';
import pomodoroIcon from './assets/pomodoroIcon.svg';
import projectIcon from './assets/projectIcon.svg';
import projectSettingsIcon from './assets/projectSettings.svg';
import settingsIcon from './assets/settingsIcon.svg';
import taskSettingsIcon from './assets/taskSettings_icon.svg';
import uncheckedBox from './assets/uncheckedBox.svg';
import userAviIcon from './assets/userAvi.svg';
import closeBtn from './assets/closeBtn.svg';
import newTaskicon from "./assets/newTask-icon.svg";
import editTaskicon from "./assets/editTask_icon.svg";
import iconDropdownDelete from "./assets/icon_dropdown-deleteTask.svg";
import iconDropdownEdit from "./assets/icon_dropdown-editTask.svg";
import createProjectIcon from "./assets/createProject-icon.svg";
// Fonts
import evolveSansLight from './assets/Evolve_Sans_Light.otf';
import evolveSans from './assets/Evolve_Sans.otf';
import gaseok from './assets/Gasoek.ttf';
import montserrat from './assets/Montserrat.ttf';

// Initialize your application
import { initializeApp } from './controllers/AppLogic.js';

import {createProjectModal_listeners} from './views/modals/createProjectModal.js';
import {addNewTaskModal_listeners} from './views/modals/addNewTaskModal.js';
import {editTaskModal_listeners} from './views/modals/editTaskModal.js';
import { sidebarBtn_listeners } from './views/DOMController.js';
import { darkModeBtn_listener } from './views/DOMController.js';


function setupUIEventListeners() {
    try {

        createProjectModal_listeners();
        addNewTaskModal_listeners();
        editTaskModal_listeners();
        sidebarBtn_listeners();
        darkModeBtn_listener ();

    } catch (error) {
        console.error("Error in setupUIEventListeners:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupUIEventListeners();  // Setup UI event listeners after initialization
});


