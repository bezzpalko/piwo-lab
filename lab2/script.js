"use strict";

let lastDeletedTask = null;
let elementToDelete = null;

// Pobieranie referencji do elementów DOM
const taskInput = document.getElementById("task-input");
const listSelect = document.getElementById("list-select");
const addBtn = document.getElementById("add-btn");
const undoBtn = document.getElementById("undo-btn");
const searchInput = document.getElementById("search-input");
const searchCase = document.getElementById("search-case");

const deleteModal = document.getElementById("delete-modal");
const modalTaskText = document.getElementById("modal-task-text");

const addTask = () => {
    const text = taskInput.value.trim();
    
    if (text === "") {
        alert("Zadanie nie może być puste!");
        return;
    }

    const listId = listSelect.value;
    const targetList = document.getElementById(listId);

    const li = document.createElement("li");
    li.classList.add("task-item");

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("task-content");

    const textSpan = document.createElement("span");
    textSpan.classList.add("task-text");
    textSpan.innerText = text;

    const dateSpan = document.createElement("span");
    dateSpan.classList.add("task-date");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.classList.add("delete-btn");

    contentDiv.append(textSpan, dateSpan);
    li.append(contentDiv, deleteBtn);

    li.addEventListener("click", () => {
        li.classList.toggle("done");
        
        if (li.classList.contains("done")) {
            const now = new Date();
            const formattedDate = `${now.toLocaleDateString()}, ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
            dateSpan.innerText = `Wykonano: ${formattedDate}`;
        } else {
            dateSpan.innerText = "";
        }
    });

    deleteBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        elementToDelete = li;
        modalTaskText.innerText = text;
        deleteModal.showModal();
    });

    targetList.append(li);
    taskInput.value = "";
    
    filterTasks();
};

addBtn.addEventListener("click", addTask);

deleteModal.addEventListener("close", () => {
    if (deleteModal.returnValue === "yes" && elementToDelete !== null) {
        
        lastDeletedTask = {
            domElement: elementToDelete,
            parentElement: elementToDelete.parentElement
        };
        
        elementToDelete.remove();
        undoBtn.disabled = false;
    }
    
    elementToDelete = null;
    deleteModal.returnValue = ""; 
});

undoBtn.addEventListener("click", () => {
    if (lastDeletedTask !== null) {
        lastDeletedTask.parentElement.append(lastDeletedTask.domElement);
        lastDeletedTask = null;
        undoBtn.disabled = true;
    }
});

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === "z") {
        undoBtn.click();
    }
});

const listHeaders = document.querySelectorAll(".list-header");
listHeaders.forEach(header => {
    header.addEventListener("click", () => {
        const listUl = header.nextElementSibling;
        listUl.classList.toggle("collapsed");
    });
});

const filterTasks = () => {
    const query = searchInput.value;
    const isCaseInsensitive = searchCase.checked;
    
    const allTasks = document.querySelectorAll(".task-item");

    allTasks.forEach(task => {
        const textElement = task.querySelector(".task-text");
        let taskText = textElement.innerText;
        let searchQuery = query;

        if (isCaseInsensitive) {
            taskText = taskText.toLowerCase();
            searchQuery = searchQuery.toLowerCase();
        }

        if (taskText.includes(searchQuery)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
};

searchInput.addEventListener("input", filterTasks);
searchCase.addEventListener("change", filterTasks);