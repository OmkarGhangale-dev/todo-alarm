// Theme toggle
const themeBtn = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// ================== TASKS ==================
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    li.className = t.done ? "completed" : "";
    li.innerHTML = `
      <label>
        <input type="checkbox" ${t.done ? "checked" : ""} onchange="toggleTask(${i})">
        <span>${t.text} <small>[${t.date || "Today"}]</small></span>
      </label>
      <button onclick="deleteTask(${i})">❌</button>
    `;
    taskList.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  tasks.push({ text: taskInput.value, date: taskDate.value, done: false });
  taskInput.value = "";
  taskDate.value = "";
  renderTasks();
});

function toggleTask(i) {
  tasks[i].done = !tasks[i].done;
  renderTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  renderTasks();
}

renderTasks();

// ================== ALARMS ==================
const alarmForm = document.getElementById("alarmForm");
const alarmTime = document.getElementById("alarmTime");
const alarmList = document.getElementById("alarmList");
const alarmSound = document.getElementById("alarmSound");

let alarms = JSON.parse(localStorage.getItem("alarms")) || [];

function renderAlarms() {
  alarmList.innerHTML = "";
  alarms.forEach((a, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>⏰ ${a}</span>
      <button onclick="deleteAlarm(${i})">❌</button>
    `;
    alarmList.appendChild(li);
  });
  localStorage.setItem("alarms", JSON.stringify(alarms));
}

alarmForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alarms.push(alarmTime.value);
  alarmTime.value = "";
  renderAlarms();
});

function deleteAlarm(i) {
  alarms.splice(i, 1);
  renderAlarms();
}

setInterval(() => {
  const now = new Date();
  const current = now.toTimeString().slice(0,5);
  if (alarms.includes(current)) {
    alarmSound.play();
    alert("🚨 Alarm Time!");
  }
}, 1000);

renderAlarms();
