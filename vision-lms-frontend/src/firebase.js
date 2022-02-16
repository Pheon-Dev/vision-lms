import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

var firebaseConfig = {
  apiKey: "AIzaSyDQKeZ3oWEOmhGq4e8gXCqWZ85vjtEtBJE",
  authDomain: "vision-lms.firebaseapp.com",
  databaseURL: "https://vision-lms-default-rtdb.firebaseio.com",
  projectId: "vision-lms",
  storageBucket: "vision-lms.appspot.com",
  messagingSenderId: "689765490265",
  appId: "1:689765490265:web:61ba362cf3266af38c9b48",
  measurementId: "G-WQHLJGMS58"
}

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
// const db = firebase.firestore()

export { auth }

// const app = firebase.initializeApp({
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
// })

// export const auth = app.auth()
// export default app

