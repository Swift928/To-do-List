import { removeLinkOptions } from './projectLinkOptions';
import { captureDate, projectList, updateProjectList } from './projects';
import { overlayToggle, removeActiveForm } from './eventListeners';
import { initialize } from '.';
import { backSvg } from './svgModule';

export function displayBackSvg() {
    const taskLinkFormTitle =
        document.querySelector('.taskLinkFormTitle') ||
        document.querySelector('.projectLinkFormTitle');
    taskLinkFormTitle.classList.toggle('withSvg');
    taskLinkFormTitle.appendChild(backSvg);
}

export function getName() {
    let name = document.querySelector('.taskLinkFormTitle');
    if (!name) {
        name = document.querySelector('.projectLinkFormTitle');
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

export function handleTaskOptionDisplay() {
    const contentDisplay = document.querySelector('.contentDisplay');
    contentDisplay.addEventListener('click', (event) => {
        let changePriorityOption2;
        let renameTaskOption2;
        let newDateTaskOption;
        let addNotesOption;
        let deleteTaskOption2;
        switch (true) {
            case event.target.classList.contains('changePriorityLink'):
                changePriorityOption2 = document.querySelector(
                    '.changePriorityOption'
                );
                changePriorityOption2.classList.toggle('active');
                displayBackSvg();
                removeLinkOptions();
                break;
            case event.target.classList.contains('renameTaskLink'):
                renameTaskOption2 = document.querySelector('.renameTaskOption');
                renameTaskOption2.classList.toggle('active');
                displayBackSvg();
                removeLinkOptions();
                break;
            case event.target.classList.contains('changeDueDateLink'):
                newDateTaskOption =
                    document.querySelector('.newDateTaskOption');
                newDateTaskOption.classList.toggle('active');
                displayBackSvg();
                removeLinkOptions();
                break;
            case event.target.classList.contains('addNotesLink'):
                addNotesOption = document.querySelector('.addNotesOption');
                addNotesOption.classList.toggle('active');
                displayBackSvg();
                removeLinkOptions();
                break;
            case event.target.classList.contains('deleteTaskLink'):
                deleteTaskOption2 = document.querySelector('.deleteTaskOption');
                deleteTaskOption2.classList.toggle('active');
                displayBackSvg();
                removeLinkOptions();
                break;
            default:
                break;
        }
    });
}

export function changePriorityOption() {
    const contentDisplay = document.querySelector('.contentDisplay');
    let projectName = '';
    contentDisplay.addEventListener('click', (event) => {
        if (event.target.closest('.projectTaskContainer')) {
            projectName = event.target
                .closest('.projectTaskContainer')
                .querySelector('h3').textContent;
        }

        if (event.target.classList.contains('changePriorityButton')) {
            const taskName = getName();

            const foundProject = projectList.find((project) => {
                if (project.projectName === projectName) {
                    return project;
                }
                return null;
            });

            const task = foundProject.tasks.find((project) => {
                if (project.taskName === taskName) {
                    return project;
                }
                return null;
            });

            const radioButtons = document.querySelectorAll(
                "input[type='radio']"
            );

            const checkedRadioButton = Array.from(radioButtons).find(
                (radioButton) => radioButton.checked
            );

            const selectedValue = checkedRadioButton
                ? checkedRadioButton.value
                : null;

            if (!selectedValue) {
                return;
            }

            task.changePriority(selectedValue);
            updateProjectList();
            overlayToggle();
            removeActiveForm();
            initialize();
        }
    });
}

export function renameTaskOption() {
    const contentDisplay = document.querySelector('.contentDisplay');
    let projectName = '';
    contentDisplay.addEventListener('click', (event) => {
        if (event.target.closest('.projectTaskContainer')) {
            projectName = event.target
                .closest('.projectTaskContainer')
                .querySelector('h3').textContent;
        }

        if (event.target.classList.contains('renameTaskButton')) {
            const taskName = getName();

            const foundProject = projectList.find((project) => {
                if (project.projectName === projectName) {
                    return project;
                }
                return null;
            });

            const task = foundProject.tasks.find((project) => {
                if (project.taskName === taskName) {
                    return project;
                }
                return null;
            });

            const selectedValue =
                document.getElementById('renameTaskInput').value;

            if (!selectedValue) {
                return;
            }

            task.renameTask(selectedValue);
            updateProjectList();
            overlayToggle();
            removeActiveForm();
            initialize();
        }
    });
}

export function changeDueDateTaskOption() {
    const contentDisplay = document.querySelector('.contentDisplay');
    let projectName = '';
    contentDisplay.addEventListener('click', (event) => {
        if (event.target.closest('.projectTaskContainer')) {
            projectName = event.target
                .closest('.projectTaskContainer')
                .querySelector('h3').textContent;
        }

        if (event.target.classList.contains('newDateButton')) {
            const taskName = getName();

            const foundProject = projectList.find((project) => {
                if (project.projectName === projectName) {
                    return project;
                }
                return null;
            });

            const task = foundProject.tasks.find((project) => {
                if (project.taskName === taskName) {
                    return project;
                }
                return null;
            });

            const changedDate = document.getElementById('newDateInput').value;
            if (!changedDate) {
                return;
            }

            const date = captureDate(changedDate);
            task.changeDate(date);
            updateProjectList();
            overlayToggle();
            removeActiveForm();
            initialize();
        }
    });
}

export function getNotesContent() {
    const contentDisplay = document.querySelector('.contentDisplay');
    let projectName = '';
    contentDisplay.addEventListener('click', (event) => {
        if (event.target.closest('.projectTaskContainer')) {
            projectName = event.target
                .closest('.projectTaskContainer')
                .querySelector('h3').textContent;
        }

        if (event.target.classList.contains('addNotesLink')) {
            const taskName = document
                .querySelector('.taskLinkFormTitle')
                .innerHTML.split(' ')
                .slice(1)
                .join(' ');

            const foundProject = projectList.find((project) => {
                if (project.projectName === projectName) {
                    return project;
                }
                return null;
            });

            const task = foundProject.tasks.find((project) => {
                if (project.taskName === taskName) {
                    return project;
                }
                return null;
            });

            const textarea = document.getElementById('userNotesLink');
            const addNotesButton = document.querySelector('.addNotesButton');

            textarea.innerHTML = task.notesContent || '';

            addNotesButton.addEventListener('click', () => {
                task.addNotes(textarea.value);
                updateProjectList();
                overlayToggle();
                removeActiveForm();
                initialize();
            });
        }
    });
}

export function deleteTaskOption() {
    const contentDisplay = document.querySelector('.contentDisplay');
    let projectName = '';
    contentDisplay.addEventListener('click', (event) => {
        if (event.target.closest('.projectTaskContainer')) {
            projectName = event.target
                .closest('.projectTaskContainer')
                .querySelector('h3').textContent;
        }

        if (event.target.classList.contains('deleteTaskButton')) {
            const taskName = getName();

            const theProject = projectList.find((project) => {
                if (project.projectName === projectName) {
                    return project;
                }
                return null;
            });

            if (!document.querySelector('.deleteTask').checked) {
                return;
            }

            theProject.removeTask(taskName);
            updateProjectList();
            overlayToggle();
            removeActiveForm();
            initialize();
        }
    });
}
