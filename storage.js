// check whether an item exists in the localstorage or not
export const itemExist = (item, check = false) => {
  const list = getList();
  if (list) {
    list.forEach((elem) => {
      if (elem.item === item) check = true;
    });
  }
  return check;
};

// Add an item to localstorage
export const addItem = (item) => {
  const list = JSON.parse(localStorage.getItem("list")) || [];
  list.push(item);
  localStorage.setItem("list", JSON.stringify(list));
};

// Reset list
export const resetList = () => localStorage.clear();

// Get all items from list
export const getList = () => JSON.parse(localStorage.getItem("list"));

// Update the progress of a single ToDo Item
export const updateProgress = (
  item,
  newColumn,
  progress = ["ToDo", "Progress", "Done"]
) => {
  const list = getList();
  let index = -1,
    newItem;
  list.forEach((element, itemIndex) => {
    if (element.item === item) {
      newItem = {
        item: item,
        status: progress[newColumn],
      };
      index = itemIndex;
    }
  });
  list[index] = newItem;
  localStorage.setItem("list", JSON.stringify(list));
};

// Delete a specific ToDo item
export const deleteItem = (rowIndex) => {
  let list = getList();
  list.splice(rowIndex - 1, 1);
  localStorage.setItem("list", JSON.stringify(list));
};
