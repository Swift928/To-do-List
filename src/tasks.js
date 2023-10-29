import { displayProjectTasks, projectList } from "./projects"
import { initialize, loadModule } from ".";
import { clearContent } from "./eventListeners";

export function tasksRender(){
    
    let tasksContainer = document.querySelector('.allTasks')
     || document.querySelector('.todayTasks')
     || document.querySelector('.upcomingTasks');
    tasksContainer.innerHTML = ''

    for (let sta of projectList){
        tasksContainer.appendChild(newProjectSectional(sta))
    }
}


export function newProjectSectional(item){
    let section = document.createElement('div')
    section.classList.add('projectTaskContainer')
    let sectionTitle = document.createElement('h3')
    sectionTitle.innerHTML = item.projectName
    section.append(sectionTitle)
    section.append(displayProjectTasks(item))
    return section
}

export function loadTabs(){
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
            case item.innerHTML === 'Upcoming':
                item.addEventListener('click', ()=>{
                clearContent()
                loadModule('upcomingTab.html', tasksRender)})
                break;
        }
    })
}