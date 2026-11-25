const url = 'http://localhost:5000'
const addBtn = document.querySelector('.add-form-button')
let tasksArray = []
const taskForm = document.querySelector('#task-template').content.querySelector('.task')
const taskList = document.querySelector('#task-list')
const titleInput = document.getElementById('title-input');

// function renderForm(form){
//     const checkbox = form.querySelector('input')
//     const delBtn = form.querySelector('.task-delete')


//     console.log(checkbox, delBtn)


//     delBtn.addEventListener('click', () => {
//         form.remove()
//     })
// }


// addBtn.addEventListener('click', (e) => {
    //     e.preventDefault()
    //     if (!input.value) return
    
    //     const cloneTask = taskForm.cloneNode(true)
    //     cloneTask.querySelector('.task-title').innerHTML = input.value
    //     input.value = ''
    //     taskList.appendChild(cloneTask)
//     renderForm(cloneTask)
// })

async function getTask() {
    try {
        const response = await fetch(`${url}/task`)
        const tasks = await response.json()
        
        renderTasks(tasks)
        
    }
    catch (error){
        console.error('error catch')
    }
    
}

function renderTasks(tasks) {
    taskList.innerHTML = ''

    tasks.forEach(task => {
        let cloneForm = taskForm.cloneNode(true)
        const checkbox = cloneForm.querySelector('.task-check')
        const title = cloneForm.querySelector('.task-title')
        const deleteBtn = cloneForm.querySelector('.task-delete')

        title.textContent = task.title
        checkbox.checked = task.done
        
        if (task.done) {
            cloneForm.classList.add('done')
        }
        
        checkbox.addEventListener('change', () => {
            toggleTask(task, checkbox.checked);
        });

        deleteBtn.addEventListener('click', () => {
            deleteTask(task.id);
        });


        taskList.appendChild(cloneForm)
    });  
}

async function addTask(e) {
    e.preventDefault();
    const title = titleInput.value.trim();

    if (!title) return;

    try {
        const response = await fetch(`${url}/task`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });

        if (response.ok) {
            titleInput.value = '';
            getTask();
        }
    } catch (error) {
        console.error('Ошибка при добавлении:', error);
    }
}

async function toggleTask(task, done) {
    try {
        const response = await fetch(`${url}/task/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: task.title,
                done: done
            })
        });

        if (response.ok) {
            getTask();
        }
    } catch (error) {
        console.error('Ошибка при обновлении задачи:', error);
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`${url}/task/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            getTask();
        }
    } catch (error) {
        console.error('Ошибка при удалении задачи:', error);
    }
}

addBtn.addEventListener('click', addTask);
getTask()