export const projects = ["Default Project"];


saveProjectsToLocalStorage(projects);

export function saveProjectsToLocalStorage(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}