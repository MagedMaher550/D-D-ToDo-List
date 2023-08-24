import {
  addItem,
  getList,
  updateProgress,
  deleteItem,
} from "./storage.js";

import { validateInput, checkAndHideContent, hideError } from "./ui.js";

checkAndHideContent();

document.addEventListener("DOMContentLoaded", () => {
  const todoTable = document.querySelector(".todo-table");
  let draggedItem = null;
  let sourceCell = null;

  // Handling the drag and drop events
  todoTable.addEventListener("dragstart", dragStart);
  todoTable.addEventListener("dragover", allowDrop);
  todoTable.addEventListener("drop", drop);
  todoTable.addEventListener("click", handleTableClick);

  function dragStart(event) {
    draggedItem = event.target.textContent;
    sourceCell = event.target;
  }

  function allowDrop(event) {
    event.preventDefault();
  }

  function drop(event) {
    event.preventDefault();
    const targetCell = event.target.closest(".cell");

    // Clearing the source cell once its data has been dragged and dropped to another cell and also updaing the localstorage 
    if (
      targetCell &&
      targetCell.classList.contains("droppable") &&
      !targetCell.classList.contains("delete-row") &&
      !targetCell.textContent
    ) {
      targetCell.textContent = draggedItem;
      updateProgress(targetCell.textContent, targetCell.cellIndex);
      sourceCell.textContent = "";
    }

    draggedItem = null;
    sourceCell = null;
  }

  // Deleting a ToDo Item but first confirm if the user really want to delete this item
  function handleTableClick(event) {
    if (event.target.classList.contains("delete-row")) {
      const row = event.target.closest("tr");
      if (row) {
        const check = confirm("Are you sure you want to delete this item?");
        if (check) {
          deleteItem(row.rowIndex);
          row.remove();
        }
        checkAndHideContent();
      }
    }
  }

  // Function to add a new row with cells and a delete button besides adding the new data to the local storage
  // Also note the same function is used to generate the table at the begenning of the prgram by passing isForShow with true
  // All new data are add with a 'ToDo' status by default
  function addNewRow(item, isForShow, prog) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
              <td class="cell droppable">${prog === "ToDo" ? item : ""}</td>
              <td class="cell droppable">${prog === "Progress" ? item : ""}</td>
              <td class="cell droppable">${prog === "Done" ? item : ""}</td>
              <td class="delete-row">Delete</td>
          `;

    todoTable.querySelector("tbody").appendChild(newRow);
    document.getElementById("resetList").style.display = "inline";
    document.getElementsByTagName("table")[0].style.display = "table";
    if (!isForShow) {
      addItem({ item: item, status: prog });
    }
  }

  // Generating the table
  if (getList()) {
    getList().forEach((element) => {
      addNewRow(element.item, true, element.status);
    });
  }

  // Handle the insertion of a new ToDo Item (check if it's valid, and then add it to the dom and to local storage)
  document.getElementById("addItem").addEventListener("click", (event) => {
    event.preventDefault();
    const inputField = document.getElementById("ToDo");
    if (validateInput(inputField.value)) {
      addNewRow(inputField.value, false, "ToDo");
      hideError();
    }
    // clear the input field once it has been clicked
    inputField.value = "";
  });
});