import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
import {
  getAuth,
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

const userEmail = document.getElementById("user-email");
const logoutButton = document.getElementById("logout-btn");
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

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  if (userEmail) {
    userEmail.textContent = user.email || "Member";
  }
});

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
