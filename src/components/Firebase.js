import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqLeBI0PX1vNIHEFbYHlPhIMtKBUu5mqE",
  authDomain: "project7-e2536.firebaseapp.com",
  projectId: "project7-e2536",
  storageBucket: "project7-e2536.appspot.com",
  messagingSenderId: "24244893790",
  appId: "1:24244893790:web:4886f31b476add739d1ccf",
  measurementId: "G-D839FZJ4HH",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBBmb32AA2UAAtKcfO2VlJnNtBmCJOYwtY",
//   authDomain: "college-media-cc999.firebaseapp.com",
//   projectId: "college-media-cc999",
//   storageBucket: "college-media-cc999.appspot.com",
//   messagingSenderId: "358312171789",
//   appId: "1:358312171789:web:6ffa4ab0565bc6f8c8b844",
//   measurementId: "G-8JVC9W1VGZ",
// };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export const GetUserDoc = async (uid) => {
  if (!uid) return null;
  try {
    const UserDoc = await db.collection("users").doc(uid).get();
    return { uid, ...UserDoc.data() };
  } catch (error) {
    console.log(error);
  }
};

export { db, auth, firebase };
