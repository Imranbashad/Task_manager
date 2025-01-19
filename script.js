const taskForm = document.getElementById("task-form");
const taskNameInput = document.getElementById("task-name");
const taskCategoryInput = document.getElementById("task-category");
const taskDeadlineInput = document.getElementById("task-deadline");
const taskList = document.getElementById("task-list");
const searchBar = document.getElementById("search-bar");
const filterCategory = document.getElementById("filter-category");

let tasks = [];

const displayTasks = (taskArray) => {
  taskList.innerHTML = "";
  taskArray.forEach((task) => {
    const li = document.createElement("li");
    li.classList = "task-item";
    li.setAttribute("data-id", task.id); // id taken from date.now function

    li.innerHTML = `
    <h3>${task.name}</h3>
    <p>Category: ${task.category}</p>
    <p>Deadline: ${task.deadline || "No Deadline"}</p>
    <div class="task-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>      
    </div>
    `;
    taskList.appendChild(li);
  });
};

const addTask = (e) => {
  e.preventDefault();
  const task = {
    id: Date.now(),
    name: taskNameInput.value,
    category: taskCategoryInput.value,
    deadline: taskDeadlineInput.value,
  };
  tasks.push(task);
  saveTasks();
  displayTasks(tasks);
  taskForm.reset();
};

document.addEventListener("DOMContentLoaded", () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  displayTasks(tasks);
});

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id != id);
  saveTasks();
  displayTasks(tasks);
};

const editTask = (id) => {
  const task = tasks.find((task) => task.id == id);
  if (task) {
    taskNameInput.value = task.name;
    taskCategoryInput.value = task.category;
    taskDeadlineInput.value = task.deadline;
    deleteTask(id);
  }
};
const modifyTask = (e) => {
  const taskItem = e.target.closest(".task-item");
  const taskId = taskItem.dataset.id;

  if (e.target.classList.contains("delete-btn")) {
    deleteTask(taskId);
  } else if (e.target.classList.contains("edit-btn")) {
    editTask(taskId);
  }
};

const searchTasks = () => {
  const keyWord = searchBar.value.toLowerCase();
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(keyWord)
  );
  displayTasks(filteredTasks);
};

const filterTasks = () => {
  const category = filterCategory.value;
  let filteredTasks = tasks;

  if (category !== "All") {
    filteredTasks = tasks.filter((task) => task.category === category);
  }
  displayTasks(filteredTasks);
};

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

taskForm.addEventListener("submit", addTask);
taskList.addEventListener("click", modifyTask);
searchBar.addEventListener("input", searchTasks);
filterCategory.addEventListener("change", filterTasks);
