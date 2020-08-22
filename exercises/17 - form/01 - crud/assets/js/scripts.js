var form = document.querySelector(".form");
var list = document.querySelector(".list-group");
var input = document.querySelector(".main-input");
var addBtn = document.querySelector(".add-btn");

function randomId() {
  return Math.floor(Math.random() * 10000);
}

var items = [
  {
    id: randomId(),
    text: "item 1",
  },
];

var formStatus = "add";

function generateItem(item) {
  var div = document.createElement("div");
  div.setAttribute(
    "class",
    "list-group-item d-flex justify-content-between align-items-center fade-in"
  );
  div.id = item.id;

  var span = document.createElement("span");
  span.setAttribute("class", "text");
  span.innerText = item.text;

  var div2 = document.createElement("div");

  var editButton = document.createElement("button");
  editButton.setAttribute("class", "btn btn-dark btn-sm edit-button mr-1");
  editButton.innerText = "Edit";

  var deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "btn btn-danger btn-sm delete-button");
  deleteButton.innerText = "Delete";

  div2.appendChild(editButton);
  div2.appendChild(deleteButton);

  div.appendChild(span);
  div.appendChild(div2);

  return div;
}

// READ
function showItems() {
  list.innerHTML = "";
  items.forEach(function (item) {
    list.appendChild(generateItem(item));
  });
}
showItems();

// CREATE
function addItem(item) {
  var newItem = {
    id: randomId(),
    text: item,
  };
  items.unshift(newItem);
  input.value = "";
  showItems();
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (formStatus === "add" && input.value !== "") {
    addItem(input.value);
  } else if (formStatus === "update" && input.value !== "") {
    updateItem({ id: input.id, text: input.value });
  }
});

window.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-button")) {
    var item = event.target.parentNode.parentNode;
    var id = item.id;
    var text = item.firstChild.innerText;
    input.value = text;
    input.id = id;
    formStatus = "update";
    addBtn.innerText = "Update";
  }
});

// UPDATE
function updateItem(item) {
  items.forEach(function (itemObj) {
    if (itemObj.id == item.id) {
      itemObj.text = item.text;
    }
  });

  // reset form
  formStatus = "add";
  input.value = "";
  addBtn.innerText = "Add";

  showItems();
}

// DELETE
window.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-button")) {
    var item = event.target.parentNode.parentNode;
    items = items.filter(function (x) {
      return x.id != item.id;
    });
    let elem = document.getElementById(item.id);
    elem.classList.add("fade-out");
    elem.onanimationend = function (event) {
      console.log("animaton end", event);
    };
    // showItems();
  }
});
