import { createTrashSVG } from "./svgModule"

export class Project {
    constructor(name){
        this._name = name,
        this._tasks = [new Task('Family'),
        new Task('Apple'),
        new Task('Destiny')]
    }

    get projectName(){
        return this._name
    }

    get tasks(){
        return this._tasks
    }

    addTask(taskName, priority){
        const newTask = new Task(taskName, priority)
        this._tasks.push(newTask)
    }

    renameProject(name){
        this._name = name
    }

    removeTask(name) {
        this._tasks = this._tasks.filter((task) => task.taskName !== name);
    }    
}

class Task {
    constructor(name, priority){
        this._name = name,
        this._priority = priority
    }

    get taskName(){
        return this._name
    }

    get priorityLevel(){
        return this._priority
    }

    changePriority(priority){
        this._priority = priority
    }

    renameTask(name){
        this._name = name
    }

    addNotes(notes){
        
    }
}

export let projectList = [
    new Project('Family'),
    new Project('Shopping'),
    new Project('Education'),
    new Project('Gym')
]


export function displayProjects() {
    let projectListContainer = document.querySelector('.projectNameLinksContainer');
    projectListContainer.innerHTML = ''

    for (let sta of projectList) {
        let newListItem = document.createElement('li');
        let newListLink = document.createElement('a');
        newListLink.setAttribute('href', '#');
        newListLink.classList.add('projectNameLink')
        newListLink.innerHTML = sta.projectName;
        newListItem.append(newListLink);
        projectListContainer.appendChild(newListItem);
    }
}

export function displayProjectTasks(item){
    let tasksContainer = document.createElement('div');
    tasksContainer.classList.add('tasksContainer');
    

    for (let task of item.tasks){
        let taskContainer = document.createElement('div')
        let taskItem = document.createElement('a');
        taskItem.setAttribute('href', '#');
        taskItem.classList.add('taskItem');

        if (task.priorityLevel === 'high'){
            taskContainer.classList.toggle('highPriority')
        } else if (task.priorityLevel === 'low') {
            taskContainer.classList.toggle('lowPriority')
        }
        
        taskItem.innerHTML = task.taskName;
        taskContainer.appendChild(taskItem)
        taskContainer.appendChild(createTrashSVG())
        tasksContainer.appendChild(taskContainer)
    }
    return tasksContainer
}


export function newProjectVerification(newProjectName){
    let exists = false;
    for (let name of projectList){
        if (name.projectName === newProjectName){
            exists = true
        }
    }

    if (!exists){
        projectList.push(new Project(newProjectName))
    }
}
