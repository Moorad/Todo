var button = document.getElementById("add_button")
var adding_window = false;

function add() {
  if (!adding_window) {
  button.style.transform = "rotate(45deg)"
  adding_window =  true
} else if (adding_window) {
  button.style.transform = "rotate(180deg)"
  adding_window = false
}
}
