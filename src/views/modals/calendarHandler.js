import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { addDays } from 'date-fns';
import { add } from 'date-fns/fp/add';


export function newTask_calendarHandling (){
let currentDate = new Date();
let selectedDate = null;

const calendarBody = document.getElementById('calendarBody');
const currentMonthElement = document.getElementById('currentMonth');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

function generateCalendar(date) {
    const firstDay = startOfMonth(date);
    const lastDay = endOfMonth(date);
    const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });

    currentMonthElement.textContent = format(date, 'MMMM yyyy');

    let calendarHTML = '';
    let weekRow = '';

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
        weekRow += '<td></td>';
    }

    daysInMonth.forEach((day, index) => {
        const dayCell = `<td class="${isSameMonth(day, date) ? 'current-month' : 'other-month'} ${isSameDay(day, selectedDate) ? 'selected' : ''}" data-date="${format(day, 'yyyy-MM-dd')}">${format(day, 'd')}</td>`;
        weekRow += dayCell;

        if ((index + firstDay.getDay() + 1) % 7 === 0 || index === daysInMonth.length - 1) {
            calendarHTML += `<tr>${weekRow}</tr>`;
            weekRow = '';
        }
    });

    calendarBody.innerHTML = calendarHTML;
}

function handleDateClick(event) {
    if (event.target.tagName === 'TD' && event.target.dataset.date) {
        selectedDate = new Date(event.target.dataset.date);
        selectedDate = addDays(selectedDate, 1);
        generateCalendar(currentDate);
    }
}

prevMonthButton.addEventListener('click', () => {
    currentDate = subMonths(currentDate, 1);
    generateCalendar(currentDate);
});

nextMonthButton.addEventListener('click', () => {
    currentDate = addMonths(currentDate, 1);
    generateCalendar(currentDate);
});

calendarBody.addEventListener('click', handleDateClick);

// Initial calendar generation
generateCalendar(currentDate);
// Additional initialization logic
}

export function editTask_calendarHandling(task) {
    let currentDate = new Date(task.dueDate);
    let selectedDate_dirty = task.dueDate;
    let selectedDate = addDays (selectedDate_dirty,1);

    const calendarBody = document.getElementById('calendarBody-edit');
    const currentMonthElement = document.getElementById('currentMonth-edit');
    const prevMonthButton = document.getElementById('prevMonth-edit');
    const nextMonthButton = document.getElementById('nextMonth-edit');

    function generateCalendar(date) {
        const firstDay = startOfMonth(date);
        const lastDay = endOfMonth(date);
        const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });

        currentMonthElement.textContent = format(date, 'MMMM yyyy');

        let calendarHTML = '';
        let weekRow = '';

        // Add empty cells for days before the first of the month
        for (let i = 0; i < firstDay.getDay(); i++) {
            weekRow += '<td></td>';
        }

        daysInMonth.forEach((day, index) => {
            const dayCell = `<td class="${isSameMonth(day, date) ? 'current-month' : 'other-month'} ${isSameDay(day, selectedDate) ? 'selected' : ''}" data-date="${format(day, 'yyyy-MM-dd')}">${format(day, 'd')}</td>`;
            weekRow += dayCell;

            if ((index + firstDay.getDay() + 1) % 7 === 0 || index === daysInMonth.length - 1) {
                calendarHTML += `<tr>${weekRow}</tr>`;
                weekRow = '';
            }
        });

        calendarBody.innerHTML = calendarHTML;
    }

    function handleDateClick(event) {
        if (event.target.tagName === 'TD' && event.target.dataset.date) {
            selectedDate = new Date(event.target.dataset.date);
            selectedDate = addDays(selectedDate, 1);
            generateCalendar(currentDate);
        }
    }

    prevMonthButton.addEventListener('click', () => {
        currentDate = subMonths(currentDate, 1);
        generateCalendar(currentDate);
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate = addMonths(currentDate, 1);
        generateCalendar(currentDate);
    });

    calendarBody.addEventListener('click', handleDateClick);

    // Initial calendar generation
    generateCalendar(currentDate);
    // Additional initialization logic
}

