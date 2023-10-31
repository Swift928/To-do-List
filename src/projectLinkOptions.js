import { captureDate, projectList, updateProjectList } from './projects';
import { overlayToggle, removeActiveForm } from './eventListeners';
import { displayBackSvg, getName } from './taskLinkOptions';
import { initialize } from '.';

export function removeLinkOptions() {
    const projectLinks = document.querySelector('.linkOptions');
    projectLinks.classList.toggle('deactivate');
}

function toggleNotesDialog() {
    const openNotes = document.querySelector('.openNotes');
    openNotes.addEventListener('click', () => {
        const notesDialog = document.querySelector('.dialog');
        notesDialog.classList.toggle('active');
    });
}

export function handleProjectOptionDisplay() {
    const contentDisplay = document.querySelector('.contentDisplay');
    contentDisplay.addEventListener('click', (event) => {
        switch (true) {
            case event.target.classList.contains('addTaskLink'): {
                const addTaskOption = document.querySelector('.addTaskOption');
                addTaskOption.classList.toggle('active');
                toggleNotesDialog();
                displayBackSvg();
                removeLinkOptions();
                break;
            }
            case event.target.classList.contains('renameProjectLink'): {
                const renameProjectOption = document.querySelector(
                    '.renameProjectOption'
                );
                renameProjectOption.classList.toggle('active');
                removeLinkOptions();
                displayBackSvg();
                break;
            }
            case event.target.classList.contains('deleteProjectLink'): {
                const deleteOption = document.querySelector('.deleteOption');
                deleteOption.classList.toggle('active');
                removeLinkOptions();
                displayBackSvg();
                break;
            }
            default: {
                break;
            }
        }
    });
}

export function taskLinkOption() {
    const contentDisplay = document.querySelector('.contentDisplay');
    contentDisplay.addEventListener('click', (event) => {
        if (event.target.classList.contains('addTaskButton')) {
            event.preventDefault();
            const projectN = getName();

            for (const sta of projectList) {
                if (sta.projectName === projectN) {
                    const newTaskInput = document
                        .getElementById('newTaskInput')
                        .value.trim();
                    const newTaskDate =
                        document.getElementById('dueDateInput').value;
                    const taskDate = newTaskDate
                        ? captureDate(newTaskDate)
                        : '';
                    const notes = document.getElementById('userNotes').value;
                    const radioButtons = document.querySelectorAll(
                        'input[name="priority"]'
                    );

                    let selectedValue = '';

                    radioButtons.forEach((radioButton) => {
                        if (radioButton.checked) {
                            selectedValue = radioButton.value;
                        }
                    });

                    if (!newTaskInput || !selectedValue) {
                        return;
                    }

                    sta.addTask(newTaskInput, selectedValue, taskDate, notes);
                    updateProjectList();
                    overlayToggle();
                    removeActiveForm();
                    initialize();
                }
            }
        }
    });
}

export function renameLinkOption() {
    const contentDisplay = document.querySelector('.contentDisplay');
    contentDisplay.addEventListener('click', (event) => {
        if (event.target.classList.contains('renameProjectButton')) {
            event.preventDefault();
            const projectN = getName();

            for (const sta of projectList) {
                if (sta.projectName === projectN) {
                    const renameProjectInput = document
                        .getElementById('renameProjectInput')
                        .value.trim();

                    if (!renameProjectInput) {
                        return;
                    }

                    sta.renameProject(renameProjectInput);
                    updateProjectList();
                    overlayToggle();
                    removeActiveForm();
                    initialize();
                }
            }
        }
    });
}

export function deleteLinkOption() {
    const contentDisplay = document.querySelector('.contentDisplay');
    contentDisplay.addEventListener('click', (event) => {
        if (event.target.classList.contains('deleteProjectButton')) {
            event.preventDefault();
            const deleteProject =
                document.querySelector('.deleteProject').checked;
            if (!deleteProject) {
                return;
            }

            const projectN = getName();

            for (const project of projectList) {
                if (project.projectName === projectN) {
                    const index = projectList.indexOf(project);
                    if (index > -1) {
                        projectList.splice(index, 1);
                    }
                    break;
                }
            }

            updateProjectList();
            overlayToggle();
            removeActiveForm();
            initialize();
        }
    });
}
