const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const currentTask = document.getElementById("currentTask");
const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const restartBtn = document.getElementById("restartBtn");
const completeBtn = document.getElementById("completeBtn");

let tasks = [];
let currentIndex = -1;
let seconds = 0;
let timerId = null;

// Add Task
addBtn.addEventListener("click", function () {
  const taskName = taskInput.value.trim();

  if (taskName === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push({
    name: taskName,
    time: 0,
    completed: false,
  });

  showTasks();
  taskInput.value = "";
});

// Show Tasks
function showTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const selectBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    span.innerText = task.name;
    selectBtn.innerText = task.completed ? "Done" : "Select";
    deleteBtn.innerText = "Delete";

    if (index === currentIndex) {
      li.classList.add("selected");
    }

    if (task.completed) {
      span.classList.add("completed");
    }

    // Select Task
    selectBtn.addEventListener("click", function () {
      if (timerId !== null) {
        alert("Stop the timer first");
        return;
      }

      if (task.completed) {
        alert("Task already completed");
        return;
      }

      currentIndex = index;
      seconds = task.time;
      currentTask.innerText = task.name;

      updateTimer();
      showTasks();
    });

    // Delete Task
    deleteBtn.addEventListener("click", function () {
      if (timerId !== null && index === currentIndex) {
        clearInterval(timerId);
        timerId = null;
      }

      tasks.splice(index, 1);

      if (index === currentIndex) {
        currentIndex = -1;
        seconds = 0;
        currentTask.innerText = "No Task Selected";
        updateTimer();
      } else if (index < currentIndex) {
        currentIndex--;
      }

      showTasks();
    });

    li.append(span, selectBtn, deleteBtn);
    taskList.appendChild(li);
  });
}

// Update Timer
function updateTimer() {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  timer.innerText =
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(secs).padStart(2, "0");
}

// Start Timer
startBtn.addEventListener("click", function () {
  if (timerId !== null) return;

  if (currentIndex === -1) {
    alert("Please select a task first");
    return;
  }

  timerId = setInterval(function () {
    seconds++;
    tasks[currentIndex].time = seconds;
    updateTimer();
  }, 1000);
});

// Stop Timer
stopBtn.addEventListener("click", function () {
  clearInterval(timerId);
  timerId = null;
});

// Restart Timer
restartBtn.addEventListener("click", function () {
  clearInterval(timerId);
  timerId = null;

  if (currentIndex === -1) return;

  seconds = 0;
  tasks[currentIndex].time = 0;
  updateTimer();
});

// Complete Task
completeBtn.addEventListener("click", function () {
  if (currentIndex === -1) return;

  clearInterval(timerId);
  timerId = null;

  tasks[currentIndex].completed = true;

  currentIndex = -1;
  seconds = 0;

  currentTask.innerText = "Task Completed!";
  updateTimer();
  showTasks();
});

// Initial Display
showTasks();
updateTimer();
