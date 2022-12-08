let project1_button = document.getElementById("button_project1");
project1_button.addEventListener("click", changeColor);

function changeColor() {
  let colored_box = document.getElementById("box_project1");
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  colored_box.style.backgroundColor = "#" + randomColor;
}

let project2_counter = document.getElementById("box_project2");
project2_counter.addEventListener("input", changeCounter);

function changeCounter(event) {
  let wordCount = document.getElementById("counter");
  wordCount.innerHTML = event.target.value.length;
}

let plus_button = document.getElementById("plus_button_project3");
plus_button.addEventListener("click", addOne);
let minus_button = document.getElementById("minus_button_project3");

function addOne(event) {
  let changedNumber = document.getElementById("number_project3");
  changedNumber.innerHTML++;
}
