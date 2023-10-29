import { endOfWeek, startOfWeek, startOfMonth, endOfMonth, isWithinInterval, parse } from "date-fns";
import { tasksRender } from "./tasks";

export function filterTasksByDateRange(tasks) {

    let dateRange = document.querySelector('.upcomingTabDateRange');
    let selectedDateRange = dateRange.value;
    const today = new Date();

    dateRange.addEventListener('change', ()=>{
        selectedDateRange = dateRange.value;
        tasksRender()
    })

    if (selectedDateRange === 'thisWeek') {
        const startOfWe = startOfWeek(today);
        const endOfWe = endOfWeek(today);
        return tasks.filter(task => isWithinInterval(parse(task.dateDue, 'yyyy/MM/dd', new Date()), { start: startOfWe, end: endOfWe }));
    } else if (selectedDateRange === 'thisMonth') {
        const startOfMon = startOfMonth(today);
        const endOfMon = endOfMonth(today);
        return tasks.filter(task => isWithinInterval(parse(task.dateDue, 'yyyy/MM/dd', new Date()), { start: startOfMon, end: endOfMon }));
    }

    return tasks;
}