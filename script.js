// Import Firebase functions directly via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. YOUR FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyCQdkuuTAvR7W7O4AKzvLG4E6p4yzRABJc",
  authDomain: "opih-e3eb5.firebaseapp.com",
  projectId: "opih-e3eb5",
  storageBucket: "opih-e3eb5.firebasestorage.app",
  messagingSenderId: "892201531636",
  appId: "1:892201531636:web:3765735604a0616752c6a1",
  measurementId: "G-9ZZ96PBRSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const btn1 = document.getElementById("btn1");
const modal = document.getElementById("signupModal");
const closeBtn = document.getElementById("closeSignupBtn");
const authForm = document.getElementById("authForm");
const toggleMode = document.getElementById("toggleMode");
const modalTitle = document.getElementById("modalTitle");
const nameGroup = document.getElementById("nameGroup");
const submitAuthBtn = document.getElementById("submitAuthBtn");

let isSignUpMode = true;

// Modal Controls
btn1.addEventListener("click", () => modal.classList.add("show"));
closeBtn.addEventListener("click", () => modal.classList.remove("show"));

// Toggle between Sign Up and Login UI
toggleMode.addEventListener("click", () => {
  isSignUpMode = !isSignUpMode;
  if (isSignUpMode) {
    modalTitle.textContent = "Create Account";
    submitAuthBtn.textContent = "Sign Up";
    nameGroup.style.display = "flex";
    toggleMode.textContent = "Already have an account? Log In";
  } else {
    modalTitle.textContent = "Welcome Back";
    submitAuthBtn.textContent = "Log In";
    nameGroup.style.display = "none";
    toggleMode.textContent = "Need an account? Sign Up";
  }
});

// Handle Auth Submission
// Handle Auth Submission
authForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const fullName = document.getElementById("fullName").value;

  try {
    if (isSignUpMode) {
      // 1. Create account in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Save profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: fullName,
        email: email,
        createdAt: new Date().toISOString()
      });

      alert("Account created successfully!");
      
      // Redirect to homepage after signup
      window.location.href = "home.html";

    } else {
      // 1. Log in existing user
      await signInWithEmailAndPassword(auth, email, password);
      
      // 2. Redirect directly to homepage after login
      window.location.href = "home.html";
    }

  } catch (error) {
    alert("Error: " + error.message);
  }
});