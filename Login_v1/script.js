// import { initializeApp } from 'firebase/app';
// import { getAuth, RecaptchaVerifier } from "firebase/auth";
		
// const firebaseConfig = {
// 	apiKey: "AIzaSyAf6fPep9qfKbzUnJkj2q3d06HQX-kXX1U",
// 	authDomain: "medicine-2f749.firebaseapp.com",
// 	databaseURL: "https://medicine-2f749-default-rtdb.asia-southeast1.firebasedatabase.app",
// 	projectId: "medicine-2f749",
// 	storageBucket: "medicine-2f749.appspot.com",
// 	messagingSenderId: "976722600949",
//     appId: "1:976722600949:web:b897e92e69a857b2a3f6bc",
//     measurementId: "G-GDR77KD42H"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// auth.useDeviceLanguage();
// window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});

// const phoneNumber = getPhoneNumberFromUserInput();
// const appVerifier = window.recaptchaVerifier;
// signInWithPhoneNumber(auth, phoneNumber, appVerifier)
// 	.then((confirmationResult) => {
// 		window.confirmationResult = confirmationResult;
// 	}).catch((error) => {
		
// });
// const code = getCodeFromUserInput();
// confirmationResult.confirm(code).then((result) => {
// 	const user = result.user;
// 	}).catch((error) => {
// });

import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAf6fPep9qfKbzUnJkj2q3d06HQX-kXX1U",
  authDomain: "medicine-2f749.firebaseapp.com",
  databaseURL: "https://medicine-2f749-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "medicine-2f749",
  storageBucket: "medicine-2f749.appspot.com",
  messagingSenderId: "976722600949",
  appId: "1:976722600949:web:b897e92e69a857b2a3f6bc",
  measurementId: "G-GDR77KD42H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

async function signInWithPhoneNumber(phoneNumber) {
  const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
  const confirmationResult = await auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
  return confirmationResult;
}

async function verifyOtp(confirmationResult, code) {
  const result = await confirmationResult.confirm(code);
  const user = result.user;
  return user;
}

async function main() {
  // Get the phone number from the user input
  const phoneNumber = getPhoneNumberFromUserInput();

  // Validate the phone number
  if (!validatePhoneNumber(phoneNumber)) {
    // Display an error message to the user
    return;
  }

  // Sign in with the phone number
  const confirmationResult = await signInWithPhoneNumber(phoneNumber);

  // Get the OTP from the user input
  const otp = getCodeFromUserInput();

  // Validate the OTP
  if (!validateOtp(otp)) {
    // Display an error message to the user
    return;
  }

  // Verify the OTP
  const user = await verifyOtp(confirmationResult, otp);

  // The user is now logged in
}
main();