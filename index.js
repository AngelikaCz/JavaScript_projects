let project1_button = document.getElementById("button_project1");
project1_button.addEventListener("click", changeColor);

function changeColor() {
  let colored_box = document.getElementById("box_project1");
  colored_box.style.backgroundColor = "blue";
}

let project2_counter = document.getElementById("box_project2");
project2_counter.addEventListener("input", changeCounter);

function changeCounter(event) {
  let wordCount = document.getElementById("counter");
  let typedLetters = document.getElementById("box_project2").value;
  wordCount.innerHTML = event.target.value.length;
}
