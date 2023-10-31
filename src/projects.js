import { parseISO, format } from 'date-fns';
import { createTrashSVG } from './svgModule';
import filterTasksByDateRange from './upcoming';

export class Project {
    constructor(name, tasks = []) {
        (this._name = name), (this._tasks = tasks);
    }

    get projectName() {
        return this._name;
    }

    get tasks() {
        return this._tasks;
    }

    addTask(taskName, priority, dueDate, notes = '') {
        const newTask = new Task(taskName, priority, dueDate, notes);
        this._tasks.push(newTask);
    }

    renameProject(name) {
        this._name = name;
    }

    removeTask(name) {
        this._tasks = this._tasks.filter((task) => task.taskName !== name);
    }
}

class Task {
    constructor(name, priority, dueDate, notes = '') {
        (this._name = name),
            (this._priority = priority),
            (this._dueDate = dueDate),
            (this._notes = notes);
    }

    get taskName() {
        return this._name;
    }

    get notesContent() {
        return this._notes;
    }

    get priorityLevel() {
        return this._priority;
    }

    get dateDue() {
        return this._dueDate;
    }

    changePriority(priority) {
        this._priority = priority;
    }

    renameTask(name) {
        this._name = name;
    }

    changeDate(newDate) {
        this._dueDate = newDate;
    }

    addNotes(newNotes) {
        this._notes = newNotes;
    }
}

function getProjectList() {
    const initialProjectList = [
        new Project('Family', [
            new Task(
                'Predefined Task',
                'high',
                '2022/12/31',
                'This is a predefined task'
            ),
        ]),
        new Project('Shopping'),
        new Project('Education'),
        new Project('Gym'),
    ];

    if (!sessionStorage.getItem('projectList')) {
        const projectListJSON = JSON.stringify(initialProjectList);
        sessionStorage.setItem('projectList', projectListJSON);
    }

    const projectListJSON = sessionStorage.getItem('projectList');
    const retrievedData = JSON.parse(projectListJSON);
    return retrievedData.map(
        (item) =>
            new Project(
                item._name,
                item._tasks.map(
                    (task) =>
                        new Task(
                            task._name,
                            task._priority,
                            task._dueDate,
                            task._notes
                        )
                )
            )
    );
}

export const projectList = getProjectList();

export function updateProjectList() {
    const updatedProjectListJSON = JSON.stringify(projectList);
    sessionStorage.setItem('projectList', updatedProjectListJSON);
}

export function displayProjects() {
    const projectListContainer = document.querySelector(
        '.projectNameLinksContainer'
    );
    projectListContainer.innerHTML = '';

    for (const sta of projectList) {
        const newListItem = document.createElement('li');
        const newListLink = document.createElement('a');
        newListLink.setAttribute('href', '#');
        newListLink.classList.add('projectNameLink');
        newListLink.innerHTML = sta.projectName;
        newListItem.append(newListLink);
        projectListContainer.appendChild(newListItem);
    }
}

export function displayProjectTasks(item) {
    const tasksContainer = document.createElement('div');
    tasksContainer.classList.add('tasksContainer');
    const todayView = document.querySelector('.todayTasks');
    const dateRange = document.querySelector('.upcomingTabDateRange');

    const todayList = item.tasks.filter((task) => {
        if (todayView) {
            const todayFormatted = format(new Date(), 'yyyy/MM/dd');
            return task.dateDue === todayFormatted;
        }
        if (dateRange) {
            return filterTasksByDateRange([task]).length > 0;
        }
        return true;
    });

    for (const task of todayList) {
        const taskContainer = document.createElement('div');
        const taskItem = document.createElement('a');
        taskItem.setAttribute('href', '#');
        taskItem.classList.add('taskItem');

        taskContainer.classList.toggle(
            task.priorityLevel === 'high' ? 'highPriority' : 'lowPriority'
        );

        taskItem.innerHTML = task.taskName;
        taskContainer.appendChild(taskItem);
        const lame = document.createElement('div');
        lame.classList.add('dateDiv');
        const blimp = task.dateDue ? task.dateDue : '';
        lame.innerHTML = blimp;
        const notes = task.notesContent
            ? taskContainer.appendChild(handleNotes(task))
            : '';
        taskContainer.appendChild(lame);
        taskContainer.appendChild(createTrashSVG());
        tasksContainer.appendChild(taskContainer);
    }
    return tasksContainer;
}

export function newProjectVerification(newProjectName) {
    let exists = false;
    for (const name of projectList) {
        if (name.projectName === newProjectName) {
            exists = true;
        }
    }

    if (!exists) {
        projectList.push(new Project(newProjectName));
    }
}

export function captureDate(date) {
    const parsedDate = parseISO(date);
    const formattedDate = format(parsedDate, 'yyyy/MM/dd');

    return formattedDate;
}

function handleNotes(task) {
    let notesContainer;
    if (task.notesContent) {
        notesContainer = document.createElement('div');
        notesContainer.classList.add('notesContainer');
        notesContainer.innerHTML = 'Notes!';
    }
    return notesContainer;
}
