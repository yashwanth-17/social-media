import { auth, db } from "./firebase";

async function login(email, password) {
  await auth.signInWithEmailAndPassword(email, password);
}

async function getUserById(id) {
  if (id) {
    const doc = await db.collection("users").doc(id).get();
    return { id: doc.id, ...doc.data() };
  }
}

export { login, getUserById };
