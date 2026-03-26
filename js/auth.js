import {auth} from "../firebase/firebase-config.js";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// Signup
const signupBtn = document.getElementById("signupSubmit");
if (signupBtn) {
    signupBtn.addEventListener("click", () => {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "index.html";
      })
      .catch(err => {
          document.getElementById("error").innerText = err.message;
        if (err.message === "Firebase: Error (auth/invalid-email).") {
            document.getElementById("error").innerText = "Enter Valid Email";
        }
        else if (err.message === "Firebase: Error (auth/missing-password).") {
            document.getElementById("error").innerText = "Enter Password";
        }
        else if (err.message === "Firebase: Error (auth/email-already-in-use).") {
            document.getElementById("error").innerText = "Account Already Exits With This Email";
        }
        else if (err.message === "Firebase: Error (auth/missing-email).") {
            document.getElementById("error").innerText = "Enter Email"
        }
        else if (err.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
            document.getElementById("error").innerText = "Password should be of least 6 characters"
        }
      });
  });
}


// Login
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "dashboard.html";
      })
      .catch(err => {
        if (err.message === "Firebase: Error (auth/invalid-email).") {
            document.getElementById("error").innerText = "Enter Valid Email";
        }
        else if (err.message === "Firebase: Error (auth/missing-password).") {
            document.getElementById("error").innerText = "Enter Password";
        }
        else if (err.message === "Firebase: Error (auth/invalid-credential).") {
            document.getElementById("error").innerText = "Enter Valid Password";
        }
      });
  });
}