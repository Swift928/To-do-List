
import { removeLinkOptions } from "./projectLinkOptions";
import { captureDate, projectList, updateProjectList } from "./projects";
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
            case event.target.classList.contains('changeDueDateLink'):
                let newDateTaskOption = document.querySelector('.newDateTaskOption');
                newDateTaskOption.classList.toggle('active');
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
            let taskName = getName()
        
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
                            updateProjectList()
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
            let taskName = getName()
        
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
                            updateProjectList()
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

export function changeDueDateTaskOption(){
    let contentDisplay = document.querySelector('.contentDisplay');
    let projectName = '';
    contentDisplay.addEventListener('click', (event)=>{
        
        if (event.target.closest('.projectTaskContainer')){
            projectName = event.target.closest('.projectTaskContainer').querySelector('h3').textContent;
        }
        
        if (event.target.classList.contains('newDateButton')){
            let taskName = getName()
        
            for (let a of projectList){
                if (a.projectName === projectName){
                    let project = a

                    for (let b of project.tasks){
                        if (b.taskName === taskName){

                            let changedDate = document.getElementById('newDateInput').value;
                            if (!changedDate){
                                return
                            }

                            let date = captureDate(changedDate)
                            b.changeDate(date)
                            updateProjectList()
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

export function getNotesContent(){
    let contentDisplay = document.querySelector('.contentDisplay');
    let projectName = '';
    contentDisplay.addEventListener('click', (event)=>{
        
        if (event.target.closest('.projectTaskContainer')){
            projectName = event.target.closest('.projectTaskContainer').querySelector('h3').textContent;
        }
        
        if (event.target.classList.contains('addNotesLink')){
            let taskName = document.querySelector('.taskLinkFormTitle').innerHTML.split(' ')[1];
        
            for (let a of projectList){
                if (a.projectName === projectName){
                    let project = a

                    for (let b of project.tasks){
                        if (b.taskName === taskName){
                            const textarea = document.getElementById('userNotesLink');
                            let addNotesButton = document.querySelector('.addNotesButton')

                            textarea.innerHTML = b.notesContent || '';

                            addNotesButton.addEventListener('click', ()=>{
                                b.addNotes(textarea.value)
                                updateProjectList()
                                overlayToggle()
                                removeActiveForm()
                                initialize()
                            })
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
            let taskName = getName()
        
            for (let a of projectList){
                if (a.projectName === projectName){

                    let deleteTaskOption = document.querySelector('.deleteTask').checked
                    if (!deleteTaskOption){
                        return
                    }

                    a.removeTask(taskName)
                    updateProjectList()
                    overlayToggle()
                    removeActiveForm()
                    initialize()
                }
            }
        }
    })
}

export function displayBackSvg(){
    let taskLinkFormTitle = document.querySelector('.taskLinkFormTitle')
     ||document.querySelector('.projectLinkFormTitle');
    taskLinkFormTitle.classList.toggle('withSvg')
    taskLinkFormTitle.appendChild(backSvg)
}

export function getName() {
    let name = document.querySelector('.taskLinkFormTitle');
    if (!name){
        name = document.querySelector('.projectLinkFormTitle')
    }
    if (name) {
        const text = name.innerHTML;
        const spaceIndex = text.indexOf(' ');
        const lessThanIndex = text.indexOf('<');
        if (spaceIndex !== -1 && lessThanIndex !== -1) {
            return text.substring(spaceIndex + 1, lessThanIndex);
        }
    }
    return '';
}
   

