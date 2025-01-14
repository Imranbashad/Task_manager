 const taskForm = document.getElementById("task-form");
 const taskNameInput = document.getElementById("task-name");
 const taskCategoryInput = document.getElementById("task-category");
 const taskDeadlineInput = document.getElementById("task-deadline");
 const taskList = document.getElementById("task-list");
 const searchBar = document.getElementById("search-bar");
 const filterCategory = document.getElementById("filter-category");

 let tasks = [];

 document.addEventListener('DOMContentLoaded' , () => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    displayTasks(tasks);
 })

 taskForm.addEventListener("submit",addTask);
 taskList.addEventListener("click",modifyTask);
 searchBar.addEventListener("input",searchTasks);
 filterCategory.addEventListener("change" , filterTasks)

 const addTask = (e) => {
    e.preventDefault();
 }

 const modifyTask = () =>{}

 const searchTasks = () =>{}

 const filterTasks = () =>{}