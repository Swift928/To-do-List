
import { removeLinkOptions } from "./projectLinkOptions";
import { projectList } from "./projects";
import { overlayToggle, removeActiveForm } from "./eventListeners";
import { initialize } from ".";
import { backSvg } from "./svgModule";


export function handleTaskOptionDisplay() {
    const contentDisplay = document.querySelector('.contentDisplay');
    contentDisplay.addEventListener('click', (event) => {
        switch (true) {
            case event.target.classList.contains('changePriorityLink'):
                let changePriorityOption = document.querySelector('.changePriorityOption');
                changePriorityOption.classList.toggle('active');
                displayBackSvg()
                removeLinkOptions();
                break;
            case event.target.classList.contains('renameTaskLink'):
                let renameTaskOption = document.querySelector('.renameTaskOption');
                renameTaskOption.classList.toggle('active');
                displayBackSvg()
                removeLinkOptions();
                break;
            case event.target.classList.contains('addNotesLink'):
                let addNotesOption = document.querySelector('.addNotesOption');
                addNotesOption.classList.toggle('active');
                displayBackSvg()
                removeLinkOptions();
                break;
            case event.target.classList.contains('deleteTaskLink'):
                let deleteTaskOption = document.querySelector('.deleteTaskOption');
                deleteTaskOption.classList.toggle('active');
                displayBackSvg()
                removeLinkOptions();
                break;
        }
    });
}

export function changePriorityOption(){
    let contentDisplay = document.querySelector('.contentDisplay');
    let projectName = '';
    contentDisplay.addEventListener('click', (event)=>{
        
        if (event.target.closest('.projectTaskContainer')){
            projectName = event.target.closest('.projectTaskContainer').querySelector('h3').textContent;
        }
        
        if (event.target.classList.contains('changePriorityButton')){
            let taskName = getTaskName()
        
            for (let a of projectList){
                if (a.projectName === projectName){
                    let project = a

                    for (let b of project.tasks){
                        if (b.taskName === taskName){
                            const radioButtons = document.querySelectorAll('input[name="priority"]');
                            let selectedValue = '';
        
                            radioButtons.forEach(function(radioButton) {
                                if (radioButton.checked) {
                                    selectedValue = radioButton.value;
                                }
                            });
        
                            if (!selectedValue){
                                return
                            }
        
                            b.changePriority(selectedValue)
                            overlayToggle()
                            removeActiveForm()
                            initialize()
                        }
                    }
                }
            }
        }
    })
}

export function renameTaskOption(){
    let contentDisplay = document.querySelector('.contentDisplay');
    let projectName = '';
    contentDisplay.addEventListener('click', (event)=>{
        
        if (event.target.closest('.projectTaskContainer')){
            projectName = event.target.closest('.projectTaskContainer').querySelector('h3').textContent;
        }
        
        if (event.target.classList.contains('renameTaskButton')){
            let taskName = getTaskName()
        
            for (let a of projectList){
                if (a.projectName === projectName){
                    let project = a

                    for (let b of project.tasks){
                        if (b.taskName === taskName){

                            let selectedValue = document.getElementById('renameTaskInput').value;
        
                            if (!selectedValue){
                                return
                            }
        
                            b.renameTask(selectedValue)
                            overlayToggle()
                            removeActiveForm()
                            initialize()
                        }
                    }
                }
            }
        }
    })
}

export function deleteTaskOption(){
    let contentDisplay = document.querySelector('.contentDisplay');
    let projectName = '';
    contentDisplay.addEventListener('click', (event)=>{
        
        if (event.target.closest('.projectTaskContainer')){
            projectName = event.target.closest('.projectTaskContainer').querySelector('h3').textContent;
        }
        
        if (event.target.classList.contains('deleteTaskButton')){
            let taskName = getTaskName()
        
            for (let a of projectList){
                if (a.projectName === projectName){

                    let deleteTaskOption = document.querySelector('.deleteTask').checked
                    if (!deleteTaskOption){
                        return
                    }

                    a.removeTask(taskName)
                    overlayToggle()
                    removeActiveForm()
                    initialize()
                }
            }
        }
    })
}

function displayBackSvg(){
    let taskLinkFormTitle = document.querySelector('.taskLinkFormTitle');
    taskLinkFormTitle.classList.toggle('withSvg')
    taskLinkFormTitle.appendChild(backSvg)
}

    

function getTaskName() {
    let taskTitle = document.querySelector('.taskLinkFormTitle');
    if (taskTitle) {
        const text = taskTitle.innerHTML;
        const spaceIndex = text.indexOf(' ');
        const lessThanIndex = text.indexOf('<');
        if (spaceIndex !== -1 && lessThanIndex !== -1) {
            return text.substring(spaceIndex + 1, lessThanIndex);
        }
    }
    return '';
}
