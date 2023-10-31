import { newProjectVerification, updateProjectList } from './projects';
import { initialize, loadModule } from '.';
import * as pjLinks from './projectLinkOptions';
import * as tkLinks from './taskLinkOptions';
import { handleBackSvgClick, toggleProjectNameLinks } from './svgModule';

export function removeActiveForm() {
    const contentDisplay = document.querySelector('.contentDisplay');
    const formContainer = contentDisplay.querySelector('.formContainer');
    const formInputs = formContainer.querySelectorAll('input');

    formInputs.forEach((input) => {
        // eslint-disable-next-line no-param-reassign
        input.value = '';
    });
    contentDisplay.removeChild(formContainer);
}

function removeMenuSvgOverlay() {
    const contentDisplay = document.querySelector('.contentDisplay');
    if (contentDisplay.querySelector('.overlay2')) {
        contentDisplay.removeChild(contentDisplay.querySelector('.overlay2'));
    }

    if (document.querySelector('.projectNameLinksContainer.activeGrid')) {
        const pNLC = document.querySelector('.projectNameLinksContainer');
        pNLC.classList.remove('activeGrid');
    }
}

function menuSvgOverlayToggle() {
    const contentDisplay = document.querySelector('.contentDisplay');
    if (contentDisplay.querySelector('.overlay2')) {
        contentDisplay.removeChild(contentDisplay.querySelector('.overlay2'));
        return;
    }
    const overlay2 = document.createElement('div');
    overlay2.classList.add('overlay2', 'active');
    contentDisplay.appendChild(overlay2);
}

export function overlayToggle() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.toggle('active');
    removeMenuSvgOverlay();
}

function newProjectClass() {
    const newProjectEnterButton = document.querySelector('.newProjectButton');

    newProjectEnterButton.addEventListener('click', (event) => {
        event.preventDefault();

        const projectNameInput = document
            .querySelector('.projectNameInput')
            .value.trim();

        if (!projectNameInput) {
            return;
        }

        newProjectVerification(projectNameInput);
        updateProjectList();
        overlayToggle();
        removeActiveForm();
        initialize();
    });
}

export function eventListeners() {
    const contentDisplay = document.querySelector('.contentDisplay');

    handleBackSvgClick();

    const projectSvg = document.querySelector('.newProjectSvg');
    projectSvg.addEventListener('click', () => {
        overlayToggle();
        loadModule('newProjectSvg.html', newProjectClass);
    });

    const menuSvg = document.querySelector('.menuSvg');
    menuSvg.addEventListener('click', () => {
        toggleProjectNameLinks();
        menuSvgOverlayToggle();
    });

    const overlay = document.querySelector('.overlay');
    overlay.addEventListener('click', () => {
        overlayToggle();
        removeActiveForm();
    });

    contentDisplay.addEventListener('click', (event) => {
        if (event.target.classList.contains('overlay2')) {
            menuSvgOverlayToggle();
            toggleProjectNameLinks();
        }
    });

    const projectNameLinksContainer = document.querySelector(
        '.projectNameLinksContainer'
    );
    projectNameLinksContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('projectNameLink')) {
            loadModule('projectLinkForm.html', () => {
                const projectLinkFormTitle = document.querySelector(
                    '.projectLinkFormTitle'
                );
                projectLinkFormTitle.textContent = `Project: ${event.target.textContent}`;
                overlayToggle();
            });
        }
    });

    contentDisplay.addEventListener('click', (event) => {
        if (event.target.classList.contains('taskItem')) {
            loadModule('taskLinkForm.html', () => {
                const taskLinkFormTitle =
                    document.querySelector('.taskLinkFormTitle');
                taskLinkFormTitle.textContent = `Task: ${event.target.textContent}`;
                overlayToggle();
            });
        }
    });

    tkLinks.changePriorityOption();
    tkLinks.renameTaskOption();
    tkLinks.deleteTaskOption();
    tkLinks.getNotesContent();
    tkLinks.handleTaskOptionDisplay();
    tkLinks.changeDueDateTaskOption();

    pjLinks.taskLinkOption();
    pjLinks.renameLinkOption();
    pjLinks.deleteLinkOption();
    pjLinks.handleProjectOptionDisplay();
}

export function clearContent() {
    const contentDisplay = document.querySelector('.contentDisplay');
    contentDisplay.innerHTML = '';
}
