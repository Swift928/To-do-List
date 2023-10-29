import { createTrashSVG } from "./svgModule"
import { parseISO, format } from "date-fns"
import { filterTasksByDateRange } from "./upcoming"

export class Project {
    constructor(name){
        this._name = name,
        this._tasks = [new Task('Family'),
        new Task('Apple'),
        new Task('Destiny', 'low', '2023/10/25')]
    }

    get projectName(){
        return this._name
    }

    get tasks(){
        return this._tasks
    }

    addTask(taskName, priority, dueDate, notes = ''){
        const newTask = new Task(taskName, priority, dueDate, notes)
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
    constructor(name, priority, dueDate, notes = ''){
        this._name = name,
        this._priority = priority,
        this._dueDate = dueDate,
        this._notes = notes
    }

    get taskName(){
        return this._name
    }

    get notesContent(){
        return this._notes
    }

    get priorityLevel(){
        return this._priority
    }

    get dateDue(){
        return this._dueDate
    }

    changePriority(priority){
        this._priority = priority
    }

    renameTask(name){
        this._name = name
    }

    changeDate(newDate){
        this._dueDate = newDate
    }

    addNotes(newNotes){
        this._notes = newNotes
    }
}

let initialProjectList = [
    new Project('Family'),
    new Project('Shopping'),
    new Project('Education'),
    new Project('Gym')
]

let projectListJSON = JSON.stringify(initialProjectList);
localStorage.setItem('projectList', projectListJSON);

function getProjectList(){
    let projectListJSON = localStorage.getItem('projectList')
    let retrievedData = JSON.parse(projectListJSON)
    return retrievedData.map(item => new Project(item._name))
}

export let projectList = getProjectList()

export function updateProjectList(){
    let updatedProjectListJSON = JSON.stringify(projectList);
    localStorage.setItem('projectList', updatedProjectListJSON);
}





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
    let todayView = document.querySelector('.todayTasks')
    let dateRange = document.querySelector('.upcomingTabDateRange');
    let todayList = item.tasks
    
    if (todayView){
        let todayFormatted = format(new Date(), 'yyyy/MM/dd');
        todayList = todayList.filter((item) => item.dateDue === todayFormatted)
    } else if(dateRange){
        todayList = filterTasksByDateRange(todayList)
    }

    for (let task of todayList){

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
        let lame = document.createElement('div')
        lame.classList.add('dateDiv')
        let blimp = task.dateDue ? task.dateDue : "";
        lame.innerHTML = blimp
        let notes = task.notesContent ? taskContainer.appendChild(handleNotes(task)) : ""
        taskContainer.appendChild(lame)
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

export function captureDate(date) {
    let parsedDate = parseISO(date);
    let formattedDate = format(parsedDate, 'yyyy/MM/dd');
  
    return formattedDate
  }

function handleNotes(task){
    let notesContainer;
    if (task.notesContent){
        notesContainer = document.createElement('div')
        notesContainer.classList.add('notesContainer')
        notesContainer.innerHTML= 'Notes!'
    }
    return notesContainer
}