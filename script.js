var button = document.getElementById('plus');
var new_element_box = document.getElementById('new_element_container');
var menu = document.getElementById('menu');
var title_input = document.getElementById('title_input');
var description_input = document.getElementById('description_input');
var adding_window = false;
var login = false;
var gotData = false;
var dataloaded = false
var darkMode = false;
var doneColour = "#CFCFCF"
var defaultColour = "#EEEEEE"
var localdata = {
	tasks:[],
	bin:[]
}


firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		currentuser = firebase.auth().currentUser;
		console.log(currentuser.uid)
		ref = firebase.database().ref().child("users").child(currentuser.uid);
		ref.once('value').then(function(data) {
  	fullData = data.val();
		console.log(fullData)
		if (fullData != null) {
			localdata.tasks = fullData.tasks
			for (var i = 0;i < fullData.tasks.length;i++) {
				create_element(localdata.tasks[i][0],localdata.tasks[i][1])
			}
			fullList = document.getElementsByTagName("li");
			console.log(fullList)
			for (var i = 0;i < localdata.tasks.length;i++) {
				if (localdata.tasks[i][2] == true) {
					fullList[i].childNodes[1].style.textDecoration = "line-through"
					fullList[i].childNodes[2].style.textDecoration = "line-through"
					fullList[i].style.backgroundColor = "#C0C0C0"
				}
			}
		}
		dataloaded = true
		document.getElementById("loader_background").style.animation = "loading 0.3s linear 0"
		window.setTimeout(function() {document.getElementById("loader_background").style.display = "none"},300)
		document.getElementById("Name").innerHTML = "Welcome "+currentuser.displayName
		document.getElementById("Email").innerHTML = currentuser.email
		});
	} else {
		window.location.href = "index.html"
	}
});


function add() {
	if (!adding_window) {
		button.style.transform = 'rotate(45deg)';
		adding_window = true;
		new_element_box.style.display = "initial";
	} else if (adding_window) {
		button.style.transform = 'rotate(180deg)';
		adding_window = false;
		new_element_box.style.display = "none";
	}
}

function add_element() {
	create_element(title_input.value,description_input.value)
}

function create_element(taskTitle,taskDescription) {
	add();
	new_element_box.style.display = "none";
	adding_window = false;

	var list_container = document.getElementById("TasksContainer")

	var title = document.createElement('h1');
	title.className = 'title';
	title.innerHTML = taskTitle;

	var description = document.createElement('p');
	description.className = 'description';
	description.innerHTML = taskDescription;

	var deleteBtn = document.createElement("span")
	deleteBtn.className = "deleteBtn";
	deleteBtn.innerHTML = "×"
	deleteBtn.onclick = function() {remove(this)}

	var text_container = document.createElement('li');
	text_container.className = 'Task';
	text_container.onclick = function() {findElementIndex(this)}
	text_container.appendChild(deleteBtn)
	text_container.appendChild(title);
	text_container.appendChild(description);
	list_container.appendChild(text_container);

	if (dataloaded) {
		console.log(localdata.tasks)
		localdata.tasks.unshift([taskTitle,taskDescription,false])
		pushData()
	}

	title_input.value = '';
	description_input.value = '';
}

function remove(element) {
	elementContainer = element.parentNode
	console.log(elementContainer)
	console.log(elementContainer+" is going to be removed")
	for (var e = 0;e < fullList.length;e++) {
		if (elementContainer.childNodes[1].innerText == fullList[e].childNodes[1].innerText) {
			console.log("The index of this element is ["+e+"] which will be removed")
			index = e
			break;
		}
	}
	fullList[index].style.display = "none"
	fullList[index].parentNode.removeChild(fullList[index])
	localdata.tasks.splice(index,1)
	pushData()
}

function findElementIndex(element) {
	for (var e = 0;e < fullList.length;e++) {
		if (element.childNodes[1].innerText == fullList[e].childNodes[1].innerText) {
			console.log("The index of this element is ["+e+"]")
			if (!localdata.tasks[e][2]) {
			localdata.tasks[e][2] = true;
			document.getElementsByTagName("li")[e].childNodes[1].style.textDecoration = "line-through"
			document.getElementsByTagName("li")[e].childNodes[2].style.textDecoration = "line-through"
			document.getElementsByTagName("li")[e].style.backgroundColor = doneColour
			pushData()
			break;
		} else if (localdata.tasks[e][2]) {
			localdata.tasks[e][2] = false;
			document.getElementsByTagName("li")[e].childNodes[1].style.textDecoration = "none"
			document.getElementsByTagName("li")[e].childNodes[2].style.textDecoration = "none"
			document.getElementsByTagName("li")[e].style.backgroundColor = defaultColour
			pushData()
			break;
			}
		}
	}
}

function pushData() {
	 ref.child("tasks").set(localdata.tasks);
}

function settings() {
	var settingsMenu = document.getElementById("settingsMenu")
	if (settingsMenu.style.display == "none") {
		settingsMenu.style.display = "initial"
	} else {settingsMenu.style.display = "none"}
}

function changeColour(element) {
	var colour = element.style.backgroundImage
	console.log(colour)
	document.getElementById("nav").style.backgroundImage = colour
	document.getElementById("accountImage").style.borderImage = colour
	document.getElementById("settingsMenu").style.borderImage = colour
	for (var e = 0;e < document.getElementsByClassName("select").length;e++ ) {document.getElementsByClassName("select")[e].className = "theme"}
	element.className = "theme select"

}

function changeText(darkText) {
	var imgs = document.getElementById("nav").getElementsByTagName("img")
	if (!darkText) {
		document.getElementById("logo-text").childNodes[0].style.color = "white"
		document.getElementById("settings").style.filter = "invert(100%)"
		document.getElementById("plus").style.filter = "invert(100%)"
	} else {
		document.getElementById("logo-text").childNodes[0].style.color = "black"
		document.getElementById("settings").style.filter = "invert(0%)"
		document.getElementById("plus").style.filter = "invert(0%)"
	}
}

function switchDarkMode(isdark) {
	darkMode = isdark
	if (darkMode) {
		document.getElementsByTagName("link")[2].href = "darkMode.css"
		for (var i = 0;i < localdata.tasks.length;i++) {
			if (localdata.tasks[i][2] == true) {
				fullList[i].childNodes[1].style.textDecoration = "line-through"
				fullList[i].childNodes[2].style.textDecoration = "line-through"
				fullList[i].style.backgroundColor = "#232323"
				defaultColour = "#343434"
				doneColour = "#232323"
			}
		}
	} else {
		document.getElementsByTagName("link")[2].href = "lightMode.css"
		for (var i = 0;i < localdata.tasks.length;i++) {
			if (localdata.tasks[i][2] == true) {
				fullList[i].childNodes[1].style.textDecoration = "line-through"
				fullList[i].childNodes[2].style.textDecoration = "line-through"
				fullList[i].style.backgroundColor = "#CFCFCF"
				defaultColour = "#EEEEEE"
				doneColour = "#CFCFCF"
			}
		}
	}
}

function customColour() {
		var gradient = "linear-gradient(130deg,"+document.getElementsByClassName('hexInput')[0].value+","+document.getElementsByClassName('hexInput')[1].value+")"
		document.getElementById("nav").style.backgroundImage = gradient
		document.getElementById("accountImage").style.borderImage = gradient
		document.getElementById("settingsMenu").style.borderImage = gradient
		for (var e = 0;e < document.getElementsByClassName("select").length;e++ ) {document.getElementsByClassName("select")[e].className = "theme"}
}

function switchPage(index) {
var pageArray = ["account-container","customise-container","support-container"]
var currentPage = pageArray[index]
pageArray.splice(index,1)
for (var i = 0; i < pageArray.length;i++) {
	document.getElementById(pageArray[i]).style.display = "none"
}
document.getElementById(currentPage).style.display = "initial"
document.getElementById("settings-move-container").style.transform = "translateY(-620px)"
}

function optionPage() {
	document.getElementById('settings-move-container').style.transform = 'translateY(0px)';
}

function logOut() {
	firebase.auth().signOut()
}
