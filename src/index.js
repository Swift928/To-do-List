import './style.css';
import { tasksRender } from './tasks';
import { eventListeners } from './eventListeners';
import { displayProjects } from './projects';
import { loadTabs } from './tasks';


export function loadModule(moduleName, callback = undefined) {
    fetch(`../src/${moduleName}`)
        .then(response => response.text())
        .then(data => {
            document.querySelector('.contentDisplay').innerHTML += data;
            if (callback){
                callback()
            }
        })
        .catch(error => console.error(error));
}

loadTabs()

export function initialize() {
    tasksRender()
    displayProjects()
}
eventListeners()

loadModule('allTasks.html', initialize)
