email_input  = document.getElementById("email_input");
password_input = document.getElementById("password_input");

function createAccount() {
  var error = false;
  email = email_input.value;
  password = password_input.value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    errorCode = error.code;
    errorMessage = error.message;
    console.log(errorCode,errorMessage)
    error = true

  });

  user = firebase.auth().currentUser;
  if (user == null){
    console.log("Error")
  }

  console.log(error)

  if (!error) {
    userid = user.uid
    console.log(user)
    console.log(userid)
    console.log("logged in successfully")
  }
}
