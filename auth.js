import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgiM5aNDDJhFHGG9-eK-lwAEPM3u4w448",
  authDomain: "sign-in-ae5ca.firebaseapp.com",
  projectId: "sign-in-ae5ca",
  storageBucket: "sign-in-ae5ca.firebasestorage.app",
  messagingSenderId: "976958705327",
  appId: "1:976958705327:web:d99ebeeb72154797d34e5a",
  measurementId: "G-66LVVCPBZ7"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);
getFirestore(app);

const pageType = document.body.dataset.page;
const loadingOverlay = document.getElementById("loading");
const toastContainer = document.getElementById("toast-container");

const showLoading = (isActive) => {
  if (!loadingOverlay) return;
  loadingOverlay.classList.toggle("active", isActive);
};

const showToast = (message, type = "success") => {
  if (!toastContainer) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
};

const validateForm = (email, password) => {
  if (!email || !password) {
    showToast("Please fill in all fields.", "error");
    return false;
  }
  if (password.length < 6) {
    showToast("Password must be at least 6 characters.", "error");
    return false;
  }
  return true;
};

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();
    if (!validateForm(email, password)) return;

    try {
      showLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      showToast("Login successful! Redirecting...");
      window.location.href = "dashboard.html";
    } catch (error) {
      showToast(error.message || "Login failed. Please try again.", "error");
    } finally {
      showLoading(false);
    }
  });
}

const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = signupForm.email.value.trim();
    const password = signupForm.password.value.trim();
    if (!validateForm(email, password)) return;

    try {
      showLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      showToast("Account created! Redirecting...");
      window.location.href = "dashboard.html";
    } catch (error) {
      showToast(error.message || "Signup failed. Please try again.", "error");
    } finally {
      showLoading(false);
    }
  });
}

onAuthStateChanged(auth, (user) => {
  if (pageType === "auth" && user) {
    window.location.href = "dashboard.html";
  }
  if (pageType === "protected" && !user) {
    window.location.href = "login.html";
  }
});

const logoutButton = document.getElementById("logout-btn");
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      showLoading(true);
      await signOut(auth);
      showToast("Logged out successfully.");
      window.location.href = "login.html";
    } catch (error) {
      showToast("Logout failed. Please try again.", "error");
    } finally {
      showLoading(false);
    }
  });
}
