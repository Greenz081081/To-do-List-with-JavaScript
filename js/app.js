// DOM elements
const todoForm = document.querySelector('#todo-form');
const todoList = document.querySelector('.todos');
const totalTask = document.querySelector('#total-tasks');
const completedTask = document.querySelector('#completed-tasks');
const remainingTask = document.querySelector('#remaining-tasks');
const mainInput = document.querySelector('#todo-form input')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

// If there are items in the local storage, then save them 
if (localStorage.getItem('tasks')) {
    tasks.map((task) => {
        createTask(task)
    })
}

// Add an event listener to listen when the submit button is clicked
todoForm.addEventListener('submit', (event) => {

    // This will prevent or cancel the default submission
    event.preventDefault()

    // Get the input value that is typed in the add task input in the app
    const inputValue = mainInput.value 

    // If the input value is blank, then exit the function
    if (inputValue == '') {
        return
    }

    // The lines of code here will be executed if there is an input value
    const task = {
        id: new Date().getTime(),
        name: inputValue,
        isCompleted: false
    }

    // console.log(task)

    // Store the added tasks (objects) to the local storage
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))

    // Call the createTask function 
    createTask(task)

    todoForm.reset()
    mainInput.focus()

})

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-task') || e.target.
    parentElement.classList.contains('remove-task') || e.target.
    parentElement.parentElement.classList.contains('remove-task')) {
        const taskId = e.target.closest('li').id

        removeTask(taskId)
    }
})

todoList.addEventListener('input', (e) => {
    const taskId = e.target.closest('li').id

    updateTask(taskId, e.target)
})

//  Create a function called creatTask
function createTask(task) {

    // Create a list element
    const taskEl = document.createElement('li');

    // Set the id
    taskEl.setAttribute('id', task.id)

    // Check if the task is completed
    if (task.isCompleted) {
        taskEl.classList.add('complete')
    }

    // Create the element markup
    const taskElMarkup = `
        <div>
            <input type="checkbox" name="tasks" id="${task.id}" ${task.isCompleted ? 'checked' : ''}>
            <span ${!task.isCompleted ? 'contenteditable' : ''}>${task.name}</span>
        </div>
        <button title=" Remove the "${task.name}" task" 
            class="remove-task">
            <svg viewBox="0 0 24 24" fill="none">
                <path d="M17.25 17.25L6.75 6.75" stroke="#A4D0E3"
                stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
                <path d="M17.25 6.75L6.75 17.25" stroke="#A4D0E3"
                stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
        </button>
    `

    // Send the contents of the newly created elements to the HTML file
    taskEl.innerHTML = taskElMarkup

    todoList.appendChild(taskEl)

}

countTasks()



// This function count the numbers of completed items
function countTasks () {
    const completedTasksArray = tasks.filter((task) => {
        task.isCompleted = true
    })

    totalTask.textContent = tasks.length
    completedTask.textContent = completedTasksArray.length
    remainingTask.textContent = tasks.length - completedTasksArray.length
}


function removeTask (taskId) {
    tasks = tasks.filter((task) =>  task.id != parseInt(taskId))

    localStorage.setItem('tasks', JSON.stringify(tasks))

    document.getElementById(taskId).remove()

    countTasks()
}

function updateTask (taskId, el) {
    const task = tasks.find((task) => task.id = parseInt(taskId))

    if (el.hasAttribute('contenteditable')) {
        task.name = el.textContent
    } else {
        const span = el.nextElementSibling
        const parent = el.closest('li')

        task.isCompleted = !task.isCompleted

        if (task.isCompleted) {
            span.removeAttribute('contenteditable')
            parent.classList.add('complete')
        } else {
            span.setAttribute('contenteditable', 'true')
            parent.classList.remove('complete')
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))

    countTasks()
}

updateTask()