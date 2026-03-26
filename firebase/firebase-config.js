// Import Firebase
import {initializeApp} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDN3JKJKKJ-hTOGPjGtvpFp6mx8Uz3dFkI",
  authDomain: "codestreak-project.firebaseapp.com",
  projectId: "codestreak-project",
  storageBucket: "codestreak-project.firebasestorage.app",
  messagingSenderId: "735902880664",
  appId: "1:735902880664:web:99676a84e464d3a57fd1ed"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Auth service
const auth = getAuth(app);
export {auth};