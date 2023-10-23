import { newProjectSectional } from "./tasks"
import { projectList } from "./projects"



// Here i need to loop through the project list grab the items
// Then display only the projects with current due dates for today
// Extend the projects class with a data, notes attribute etc.



export function todayRender(){

    let todayContainer = document.querySelector('.todayContainer')

    for (let sta of projectList){
        todayContainer.appendChild(newProjectSectional(sta.projectName))
    }
}
