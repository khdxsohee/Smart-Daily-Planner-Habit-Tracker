// Get elements
const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const habitList = document.getElementById("habit-list");
const habitInput = document.getElementById("habit-input");
const progressChart = document.getElementById("progress-chart");

// Store tasks and habits in localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Add task
function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    tasks.push({ name: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
    renderChart();
  }
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = "<h2>Tasks</h2>";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.toggle("completed", task.completed);

    taskItem.innerHTML = `
      ${task.name}
      <button onclick="toggleTask(${index})">✔️</button>
      <button onclick="deleteTask(${index})">🗑️</button>
    `;

    taskList.appendChild(taskItem);
  });
}

// Toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  renderChart();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  renderChart();
}

// Add habit
function addHabit() {
  const habit = habitInput.value.trim();
  if (habit) {
    habits.push({ name: habit, completed: false });
    localStorage.setItem("habits", JSON.stringify(habits));
    habitInput.value = "";
    renderHabits();
    renderChart();
  }
}

// Render habits
function renderHabits() {
  habitList.innerHTML = "<h2>Habits</h2>";
  habits.forEach((habit, index) => {
    const habitItem = document.createElement("li");
    habitItem.classList.toggle("completed", habit.completed);

    habitItem.innerHTML = `
      ${habit.name}
      <button onclick="toggleHabit(${index})">✔️</button>
      <button onclick="deleteHabit(${index})">🗑️</button>
    `;

    habitList.appendChild(habitItem);
  });
}

// Toggle habit completion
function toggleHabit(index) {
  habits[index].completed = !habits[index].completed;
  localStorage.setItem("habits", JSON.stringify(habits));
  renderHabits();
  renderChart();
}

// Delete habit
function deleteHabit(index) {
  habits.splice(index, 1);
  localStorage.setItem("habits", JSON.stringify(habits));
  renderHabits();
  renderChart();
}

// Progress chart (using Chart.js)
function renderChart() {
  const taskCompleted = tasks.filter(task => task.completed).length;
  const habitCompleted = habits.filter(habit => habit.completed).length;

  if (window.chart) {
    window.chart.destroy();
  }

  window.chart = new Chart(progressChart, {
    type: 'pie',
    data: {
      labels: ['Completed Tasks', 'Completed Habits'],
      datasets: [{
        data: [taskCompleted, habitCompleted],
        backgroundColor: ['#4caf50', '#ff9800'],
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// Initialize app
function init() {
  renderTasks();
  renderHabits();
  renderChart();
}

init();

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
