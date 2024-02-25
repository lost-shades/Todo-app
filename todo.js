let tasks = [];

// Load tasks from local storage when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    displayTasks();
  }
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    saveTasksToLocalStorage();
    displayTasks();
    taskInput.value = "";
  }
}

document.getElementById("taskInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="emoji" onclick="toggleTask(${index})">✅</span>
      <span class="${task.completed ? 'completed' : ''} task-text">${task.text}</span>
      <span class="emoji" onclick="editTask(${index})">✏️</span>
      <span class="emoji" onclick="deleteTask(${index})">🚮</span>
    `;
    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasksToLocalStorage();
  displayTasks();
}

function editTask(index) {
  const taskTextElement = document.querySelectorAll('.task-text')[index];
  const currentText = taskTextElement.textContent.trim();

  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.value = currentText;


  taskTextElement.textContent = '';
  taskTextElement.appendChild(inputField);
  inputField.focus();


  inputField.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      const newText = inputField.value.trim();
      if (newText !== '') {
        tasks[index].text = newText;
        saveTasksToLocalStorage();
        displayTasks();
      }
    }
  });

  
  inputField.addEventListener('focusout', function() {
    const newText = inputField.value.trim();
    if (newText !== '') {
      tasks[index].text = newText;
      saveTasksToLocalStorage();
      displayTasks();
    }
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasksToLocalStorage();
  displayTasks();
}

displayTasks();
