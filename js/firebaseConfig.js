// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTqeVHc9y8m_s_OwwAaIPte1DjCrdfQQU",
  authDomain: "patientappointmentbookin-81f62.firebaseapp.com",
  projectId: "patientappointmentbookin-81f62",
  storageBucket: "patientappointmentbookin-81f62.firebasestorage.app",
  messagingSenderId: "1034720424073",
  appId: "1:1034720424073:web:d6ccb8d85f9f094de75658",
  measurementId: "G-4V0NBG35G8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore DB
const db = getFirestore(app);

// Export the db object to use in other files
export { db };
