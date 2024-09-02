import { format } from 'date-fns';
import { addDays } from 'date-fns';

export class Todo {

    static lastId = 0; // Static property to track the last ID assigned
    constructor(title, description, dueDate, priority, assignedProject, isCompleted = false) {
        this.id = Todo.lastId++;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = isCompleted;
        this.assignedProject = assignedProject;
    }

    get formattedDueDate() {
const plusOneDay = addDays(this.dueDate, 1);
        return format(plusOneDay, 'PPP'); // 'PPP' for example, gives "Jul 6, 2024"
    }
}