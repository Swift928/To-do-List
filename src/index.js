import './style.css';
import { tasksRender } from './tasks';
import { eventListeners, clearContent } from './eventListeners';
import { displayProjects } from './projects';


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
function loadTabs(){
    document.querySelectorAll('a').forEach((item) => {
        switch (true){
            case item.innerHTML === 'Today':
                item.addEventListener('click', ()=>{
                clearContent()
                loadModule('today.html', tasksRender)})
                break;
            case item.innerHTML === 'All Tasks':
                item.addEventListener('click', ()=>{
                clearContent()
                loadModule('allTasks.html', initialize)})
                break;
        }
    })
}


export function initialize() {
    tasksRender()
    displayProjects()
}
eventListeners()

loadModule('allTasks.html', initialize)
