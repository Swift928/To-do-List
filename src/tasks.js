import { displayProjectTasks, projectList } from "./projects"

export function tasksRender(){
    
    let tasksContainer = document.querySelector('.allTasks') || document.querySelector('.todayTasks')
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
