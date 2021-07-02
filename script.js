const todoForm = document.querySelector(".todoForm");
const oList = document.querySelector(".oList");
const listField = document.querySelector(".listField");
const count = document.querySelector(".count");
const dCount = document.querySelector(".done-count");

const todos = [];

function todo(body) {
  const obj = {
    text: body,
    isDone: false,
  };
  return obj;
}
function objectToListItem(todo) {
  const listItem = document.createElement("li");
  listItem.innerText = todo.text;
  listItem.className = "done";
  const doneButton = document.createElement("button");
  doneButton.innerHTML = '<i class="fas fa-check"></i>';
  doneButton.className = "done-button";
  doneButton.type = "button";
  listItem.appendChild(doneButton);
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.type = "button";

  listItem.appendChild(deleteButton);

  doneButton.addEventListener("click", function (event) {
    todo.isDone = !todo.isDone;
    console.log(todo.isDone);

    if (todo.isDone) {
      doneButton.className = "undo-button";
      doneButton.innerText = "Undo";
      listItem.style.textDecoration = "line-through";
      dCount.innerText++;
    } else {
      dCount.innerText--;

      renderTodos(todos);
    }
  });
  deleteButton.addEventListener("click", function (todoWeWantToDelete) {
    //onDelete(todo);
    const index = todos.indexOf(todoWeWantToDelete);
    todos.splice(index, 1);
    if (doneButton.innerText === "Undo") {
      dCount.innerText--;
    }
    renderTodos(todos);
  });

  oList.appendChild(listItem);

  return listItem;
}

/*function onDeleteTodo(todoWeWantToDelete) {
  const index = todos.indexOf(todoWeWantToDelete);
  if(todos.length !== 1) {
    dCount.innerText --;
    console.log(dCount)
  }
  todos.splice(index, 1);
  
  renderTodos(todos);
} */

function renderTodos(todos) {
  oList.innerHTML = "";
  const listItems = todos.map((todo) =>
    objectToListItem(todo /*onDeleteTodo*/)
  );
  listItems.forEach((item) => oList.appendChild(item));
  count.innerText = todos.length;
}

function addTodo(userInput) {
  todos.push(todo(userInput));
  renderTodos(todos);
}

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const userInput = listField.value;
  addTodo(userInput);
  listField.value = "";
});

renderTodos(todos);
