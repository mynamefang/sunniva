// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getDatabase, ref, update, child, get, query, orderByChild, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDEAaG-KJm-vxwshuxWohpsNKlP2jQ-SFU",
    authDomain: "sunniva-7894f.firebaseapp.com",
    databaseURL: "https://sunniva-7894f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sunniva-7894f",
    storageBucket: "sunniva-7894f.appspot.com",
    messagingSenderId: "108362611718",
    appId: "1:108362611718:web:152f0c082c5e5944279787",
    measurementId: "G-KJMWKH2ZF9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);
const dbRef = ref(db);
const UserData = [];
var username, userage, useremail, x, x2;
var eiei = 1;


function read_EmailRTS() {
    const starCountRef = ref(db);
    onValue(starCountRef, (snapshot) => {
        /*useremail = document.getElementById("email_").value;
        console.log(useremail + " " + "teston");*/
        snapshot.forEach(function (childSnapshot) {
            //x = snapshot.val();
            x2 = childSnapshot.val().email;
            console.log(x2);
            //console.log(x +  " " + "snap formon");
        });
    });
}

/*document.getElementById("login-btn").addEventListener('click', function () {
    var Email = document.getElementById("inputEmail").value;
    var PassWord = document.getElementById("inputPassword").value;
    signInWithEmailAndPassword(auth, Email, PassWord)
        .then((userCredential) => {
            read_EmailRTS();
            // Signed in 
            const user = userCredential.user;
            const useremail = user.email;
            console.log(useremail);
            console.log("logged in");
            
            console.log(x +  " " + "...");
            if(x==useremail){
                console.log("O")
            }else{
                console.log("X")
            }
            //window.location.href = "home.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage)
        });
})

setTimeout(function(){console.log(x + " " + " YO ")} ,1000) ;*/
var rex2;
document.getElementById("login-btn").addEventListener('click', async function () {
    var Email = document.getElementById("inputEmail").value;
    var PassWord = document.getElementById("inputPassword").value;
    await read_EmailRTS();
    await signInWithEmailAndPassword(auth, Email, PassWord)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const useremail = user.email;
            console.log(useremail);
            console.log("logged in");
            console.log(x2 + " " + "...");

            const re = ref(db);
            onValue(re, (snapshot) => {
                snapshot.forEach(function (childSnapshot) {
                    //x = snapshot.val();
                    rex2 = childSnapshot.val().email;
                    if (rex2 == useremail) {
                        console.log("O")
                        window.location.href = "userhome.html";
                        //window.location.href = "home.html";
                    } else {
                        console.log("X")
                    }
                    console.log(rex2);

                });
            });

            //window.location.href = "home.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage)
        });

})