Data Extraction
----------------
firebase.database().ref().child("users").child("pxDdCG0Y3ZdAJE79VtmZRrf8eJa2").once('value').then(function(data) {var Data = data.val();firebase.database().ref().child("users").child("boPOkisKfOPe7uTjCVhMmSmVpyh2").set(Data)})
