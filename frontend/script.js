// ======================================
// NEXUS CORE - TASK MANAGEMENT
// ======================================

// Elementos da interface
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

// Carregar tarefas salvas no navegador
let tasks = [];

try {
    tasks = JSON.parse(localStorage.getItem("nexus-tasks")) || [];
} catch (error) {
    tasks = [];
}

// Salvar tarefas
function saveTasks() {
    localStorage.setItem("nexus-tasks", JSON.stringify(tasks));
}

// Atualizar contadores
function updateCounters() {
    const pending = tasks.filter(task => !task.completed).length;
    const completed = tasks.filter(task => task.completed).length;

    pendingCount.textContent = pending;
    completedCount.textContent = completed;
}

// Exibir tarefas na tela
function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        const message = document.createElement("p");
        message.className = "empty-message";
        message.textContent = "Nenhuma tarefa cadastrada.";

        taskList.appendChild(message);
    }

    tasks.forEach(task => {

        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const taskName = document.createElement("span");
        taskName.textContent = task.title;

        if (task.completed) {
            taskName.classList.add("completed");
        }

        // Concluir ou reabrir tarefa
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;

            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.className = "delete-task";

        // Excluir tarefa
        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);

            saveTasks();
            renderTasks();
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskName);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });

    updateCounters();
}

// Adicionar nova tarefa
addTaskButton.addEventListener("click", () => {

    const title = prompt("Digite o nome da nova tarefa:");

    if (!title || title.trim() === "") {
        return;
    }

    const newTask = {
        id: Date.now(),
        title: title.trim(),
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();
});

// Inicializar sistema
renderTasks();
