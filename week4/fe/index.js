const input = document.querySelector("input");

input.onkeyup = function () {
  const value = input.value;

  const button = document.querySelector("button");
  if (value === "") {
    button.setAttribute("disabled", "true");
  } else {
    button.removeAttribute("disabled");
  }
};

function onButtonClick() {
  const value = input.value;

  if (!value) {
    return;
  }

  const orderedList = document.querySelector("ol");
  const li = document.createElement("li");

  li.textContent = value;
  li.onclick = function () {
    orderedList.removeChild(li);
  };
  orderedList.appendChild(li);
}
