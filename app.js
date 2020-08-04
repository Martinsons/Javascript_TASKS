// Define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event Listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
	// DOM LOAD EVENT
	document.addEventListener("DOMContentLoaded", getTasks);
	// Add task event
	form.addEventListener("submit", addTask);
	// Remove task event
	taskList.addEventListener("click", removeTask);
	// Clear task event
	clearBtn.addEventListener("click", clearTasks);
	// Filter task event
	filter.addEventListener("keyup", filterTasks);
}

// Get tasks from LS
function getTasks() {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function (task) {
		// Create i element
		const li = document.createElement("li");
		// Add class
		li.className = "collection-item";
		// Create text node and append li
		li.appendChild(document.createTextNode(task));
		// Create new link element
		const link = document.createElement("a");
		// Add class
		link.className = "delete-item secondary-content";
		// Add icon html
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// Append the link li
		li.appendChild(link);

		// Append li to ul
		taskList.appendChild(li);
	});
}

// Add task
function addTask(e) {
	if (taskInput.value === "") {
		alert("Please input task");
	}

	// Create i element
	const li = document.createElement("li");
	// Add class
	li.className = "collection-item";
	// Create text node and append li
	li.appendChild(document.createTextNode(taskInput.value));
	// Create new link element
	const link = document.createElement("a");
	// Add class
	link.className = "delete-item secondary-content";
	// Add icon html
	link.innerHTML = '<i class="fa fa-remove"></i>';
	// Append the link li
	li.appendChild(link);

	// Append li to ul
	taskList.appendChild(li);

	// STORE IN LOCAL STORAGE
	storeTaskInLocalStorage(taskInput.value);

	// Clear input
	taskInput.value = "";

	e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.push(task);

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
	if (e.target.parentElement.classList.contains("delete-item")) {
		if (confirm("Are you sure?")) {
			e.target.parentElement.parentElement.remove();

			// REMOVE FROM LS
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// REMOVE FROM LS
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear tasks
function clearTasks() {
	// taskList.innerHTML = '';

	// Faster
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// Clear from LS
	clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
	localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll(".collection-item").forEach(function (task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = "block";
		} else {
			task.style.display = "none";
		}
	});
}
