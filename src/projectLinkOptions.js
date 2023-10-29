import { captureDate, projectList } from "./projects";
import { overlayToggle, removeActiveForm } from "./eventListeners";
import { displayBackSvg, getName } from "./taskLinkOptions";
import { initialize } from ".";


export function handleProjectOptionDisplay() {
    const contentDisplay = document.querySelector('.contentDisplay');
    contentDisplay.addEventListener('click', (event) => {
        switch (true) {
            case event.target.classList.contains('addTaskLink'):
                let addTaskOption = document.querySelector('.addTaskOption');
                addTaskOption.classList.toggle('active');
                toggleNotesDialog();
                displayBackSvg();
                removeLinkOptions();
                break;
            case event.target.classList.contains('renameProjectLink'):
                let renameProjectOption = document.querySelector('.renameProjectOption');
                renameProjectOption.classList.toggle('active');
                removeLinkOptions();
                displayBackSvg();
                break;
            case event.target.classList.contains('deleteProjectLink'):
                let deleteOption = document.querySelector('.deleteOption');
                deleteOption.classList.toggle('active');
                removeLinkOptions();
                displayBackSvg()
                break;
        }
    });
}

export  function removeLinkOptions(){
    let projectLinks = document.querySelector('.linkOptions')
    projectLinks.classList.toggle('deactivate')
}

export function taskLinkOption(){
    let contentDisplay = document.querySelector('.contentDisplay');
    contentDisplay.addEventListener('click', (event)=>{
        if (event.target.classList.contains('addTaskButton')){
            event.preventDefault()
            let projectN = getName()
            
            for (let sta of projectList){
                if (sta.projectName === projectN){
                    let newTaskInput = document.getElementById('newTaskInput').value.trim()
                    let newTaskDate = document.getElementById('dueDateInput').value
                    let taskDate = newTaskDate ? captureDate(newTaskDate) : '';
                    let notes = document.getElementById('userNotes').value
                    const radioButtons = document.querySelectorAll('input[name="priority"]');

                    let selectedValue = '';

                    radioButtons.forEach(function(radioButton) {
                        if (radioButton.checked) {
                            selectedValue = radioButton.value;
                        }
                    });

                    if (!newTaskInput || !selectedValue){
                        return
                    }

                    sta.addTask(newTaskInput, selectedValue, taskDate, notes)
                    overlayToggle()
                    removeActiveForm()
                    initialize()
                }
            }
        }
    })
}

export function renameLinkOption(){
    let contentDisplay = document.querySelector('.contentDisplay');
    contentDisplay.addEventListener('click', (event)=>{
        if (event.target.classList.contains('renameProjectButton')){
            event.preventDefault()
            let projectN = getName()
            
            for (let sta of projectList){
                if (sta.projectName === projectN){
                    let renameProjectInput = document.getElementById('renameProjectInput').value.trim()

                    if (!renameProjectInput){
                        return
                    }

                    sta.renameProject(renameProjectInput)

                    overlayToggle()
                    removeActiveForm()
                    initialize()
                }
            }
        }
    })
}

export function deleteLinkOption(){
    let contentDisplay = document.querySelector('.contentDisplay');
    contentDisplay.addEventListener('click', (event)=>{
        if (event.target.classList.contains('deleteProjectButton')){
            event.preventDefault()
            let deleteProject = document.querySelector('.deleteProject').checked
            if (!deleteProject){
                return
            }

            let projectN = getName()

            for (let project of projectList) {
                if (project.projectName === projectN) {
                    const index = projectList.indexOf(project);
                    if (index > -1) {
                        projectList.splice(index, 1);
                    }
                    break;
                }
            }

            overlayToggle()
            removeActiveForm()
            initialize()
        }
    })
}


function toggleNotesDialog (){
    let openNotes = document.querySelector('.openNotes')
    openNotes.addEventListener('click', ()=> {
        let notesDialog = document.querySelector('.dialog')
        notesDialog.classList.toggle('active')
    });
}