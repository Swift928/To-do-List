import './style.css';
import { tasksRender } from './tasks';
import { eventListeners } from './eventListeners';
import { displayProjects } from './projects';
import { todayRender } from './today';


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

export function initialize() {
    tasksRender()
    displayProjects()
}

initialize()
eventListeners()
