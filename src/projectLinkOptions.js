import { projectList } from "./projects";
import { overlayToggle, removeActiveForm } from "./eventListeners";
import { initialize } from ".";


export function handleProjectOptionDisplay() {
    const contentDisplay = document.querySelector('.contentDisplay');
    contentDisplay.addEventListener('click', (event) => {
        switch (true) {
            case event.target.classList.contains('addTaskLink'):
                let addTaskOption = document.querySelector('.addTaskOption');
                addTaskOption.classList.toggle('active');
                removeLinkOptions();
                break;
            case event.target.classList.contains('renameProjectLink'):
                let renameProjectOption = document.querySelector('.renameProjectOption');
                renameProjectOption.classList.toggle('active');
                removeLinkOptions();
                break;
            case event.target.classList.contains('deleteProjectLink'):
                let deleteOption = document.querySelector('.deleteOption');
                deleteOption.classList.toggle('active');
                removeLinkOptions();
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
            let projectName = document.querySelector('.projectLinkFormTitle').innerHTML
            let projectNameAfterSpace = projectName.split(' ')[1];
            
            for (let sta of projectList){
                if (sta.projectName === projectNameAfterSpace){
                    let newTaskInput = document.getElementById('newTaskInput').value.trim()
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

                    sta.addTask(newTaskInput, selectedValue)
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
            let projectName = document.querySelector('.projectLinkFormTitle').innerHTML
            let projectNameAfterSpace = projectName.split(' ')[1];
            
            for (let sta of projectList){
                if (sta.projectName === projectNameAfterSpace){
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
            
            let deleteProject = document.querySelector('.deleteProject').checked
            if (!deleteProject){
                return
            }

            let projectName = document.querySelector('.projectLinkFormTitle').innerHTML
            let projectNameAfterSpace = projectName.split(' ')[1];

            projectList = projectList.filter((project) => project.projectName !== projectNameAfterSpace);

            overlayToggle()
            removeActiveForm()
            initialize()
        }
    })
}