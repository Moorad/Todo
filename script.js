var button = document.getElementById("plus")
var new_element_box = document.getElementById("new_element_container")
var menu = document.getElementById("menu")
var title_input = document.getElementById("title_input")
var description_input = document.getElementById("description_input")
var adding_window = false;

function add() {
  if (!adding_window) {
  button.style.transform = "rotate(45deg)"
  adding_window =  true
  new_element_box.hidden = false
} else if (adding_window) {
  button.style.transform = "rotate(180deg)"
  adding_window = false
  new_element_box.hidden = true
  }
}

function create_element() {
  new_element_box.hidden = true
  adding_window = false
  element_container = document.createElement("div")
  element_container.className = "element_container"

  checkbox = document.createElement("div")
  checkbox.className = "checkbox"
  checkbox.onclick = function() {checkbox_clicked(this)}
  img = document.createElement("img")
  img.src = "Assets/tick.png"
  img.hidden = true
  checkbox.appendChild(img)

  title = document.createElement("h1")
  title.className = "title"
  title.innerHTML = title_input.value

  description = document.createElement("p")
  description.className = "description"
  description.innerHTML = description_input.value

  text_container = document.createElement("div")
  text_container.className = "text_container"
  text_container.appendChild(title)
  text_container.appendChild(description)

  element_container.appendChild(checkbox)
  element_container.appendChild(text_container)
  menu.appendChild(element_container)
}

function checkbox_clicked(element) {
  if (element.style.backgroundColor == "rgb(0, 0, 0)") {
  element.style.backgroundColor = "#FFFFFF"
} else {
  element.style.backgroundColor = "#000000"
}
}
