import { itemExist, resetList } from "./storage.js";

// Validate the data taken from user (check if it's not empty and whether the item already exits or not)
export const validateInput = (item, check = true) => {
  const addErrorMsg = (errorMsg) => {
    showError();
    document.getElementById("error").innerHTML = errorMsg;
    check = false;
  };
  if (item.trim().length === 0) {
    addErrorMsg("Please Enter a Valid ToDo Item!");
  }
  if (itemExist(item)) {
    addErrorMsg("This Item Alredy Exists!");
  }
  console.log(check);
  return check;
};

export const hideError = () => {
  document.getElementById("error").classList.add("hide");
};

export const showError = () => {
  document.getElementById("error").classList = [""];
};

// hide the table if there's no data 
export const checkAndHideContent = () => {
  if (document.getElementsByTagName("tbody")[0].children.length === 0) {
    document.getElementById("resetList").style.display = "none";
    document.getElementsByTagName("table")[0].style.display = "none";
  }
};

// Reset the list but first ask the user whther he really wants to reset it.
document.getElementById("resetList").addEventListener("click", () => {
  const check = confirm(
    "Are you sure you want to reset the list? (all your items will be deleted)"
  );
  if (check) {
    resetList();
    const parent = document.getElementsByTagName("tbody")[0];
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  checkAndHideContent();
});
