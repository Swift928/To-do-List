import { newProjectVerification, updateProjectList } from "./projects"
import { initialize, loadModule } from "."
import * as pjLinks from "./projectLinkOptions";
import * as tkLinks from "./taskLinkOptions";
import { handleBackSvgClick, toggleProjectNameLinks } from "./svgModule";



export function eventListeners(){
    let contentDisplay = document.querySelector('.contentDisplay');

    handleBackSvgClick()

    let projectSvg = document.querySelector('.newProjectSvg')
    projectSvg.addEventListener('click', ()=>{
    overlayToggle()
    loadModule('newProjectSvg.html', newProjectClass)  
    })

    let menuSvg = document.querySelector('.menuSvg')
    menuSvg.addEventListener('click', ()=>{
        toggleProjectNameLinks()
        menuSvgOverlayToggle()
    })

    const overlay = document.querySelector('.overlay')
    overlay.addEventListener('click', ()=>{
        overlayToggle()
        removeActiveForm()
    })

    contentDisplay.addEventListener('click', (event)=>{
        if (event.target.classList.contains('overlay2')){
        menuSvgOverlayToggle()
        toggleProjectNameLinks()
        }
    })
    
    let projectNameLinksContainer = document.querySelector('.projectNameLinksContainer')
    projectNameLinksContainer.addEventListener('click', (event)=>{
        if (event.target.classList.contains('projectNameLink')){
            loadModule('projectLinkForm.html',()=>{
                let projectLinkFormTitle = document.querySelector('.projectLinkFormTitle')
                projectLinkFormTitle.textContent = `Project: ${event.target.textContent}`
                overlayToggle()
            })
        }
    })

    contentDisplay.addEventListener('click', (event)=> {
        if (event.target.classList.contains('taskItem')) {
            loadModule('taskLinkForm.html', () => {
                let taskLinkFormTitle = document.querySelector('.taskLinkFormTitle');
                taskLinkFormTitle.textContent = `Task: ${event.target.textContent}`;
                overlayToggle();
            });
        }
    })

    tkLinks.changePriorityOption()
    tkLinks.renameTaskOption()
    tkLinks.deleteTaskOption()
    tkLinks.getNotesContent()
    tkLinks.handleTaskOptionDisplay()
    tkLinks.changeDueDateTaskOption()

    pjLinks.taskLinkOption()
    pjLinks.renameLinkOption()
    pjLinks.deleteLinkOption()
    pjLinks.handleProjectOptionDisplay()   
}



export function overlayToggle() {
    const overlay = document.querySelector('.overlay')
    overlay.classList.toggle('active')
}

function menuSvgOverlayToggle() {
    const contentDisplay = document.querySelector('.contentDisplay');
    if (contentDisplay.querySelector('.overlay2')) {
        contentDisplay.removeChild(contentDisplay.querySelector('.overlay2'))
        return;
    }
    const overlay2 = document.createElement('div');
    overlay2.classList.add('overlay2', 'active');
    contentDisplay.appendChild(overlay2);
}

export function removeActiveForm(){
    const contentDisplay =  document.querySelector('.contentDisplay')
    let formContainer = contentDisplay.querySelector('.formContainer')
    let formInputs = formContainer.querySelectorAll('input')

    formInputs.forEach((element) => {
        element.value = ''
    });
    contentDisplay.removeChild(formContainer)
}


function newProjectClass(event){
    let newProjectEnterButton = document.querySelector('.newProjectButton')

    newProjectEnterButton.addEventListener('click', (event)=>{
        event.preventDefault()

        let projectNameInput = document.querySelector('.projectNameInput').value.trim()

        if (!projectNameInput){
            return
        }

        newProjectVerification(projectNameInput)
        updateProjectList()
        overlayToggle()
        removeActiveForm()
        initialize()
    })
}

export function clearContent() {
    const contentDisplay = document.querySelector('.contentDisplay');
    contentDisplay.innerHTML = '';
}