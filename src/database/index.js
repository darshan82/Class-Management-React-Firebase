import firebase from "firebase/app";
import "firebase/firestore";

import "firebase/auth";
import "firebase/database";
import "firebase/storage";
//
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = firebase.storage();
export const db = firebase.firestore();
export const auth = firebase.auth();
// Functions
export function addDocInDb(col, data) {
  try {
    const docRef = db.collection(col).add(data);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
export async function readDocInDb(col) {
  const querySnap = await db.collection(col).get();
  return querySnap;
}
// Sub
export async function addSubDocInDb(col, id, sub, data) {
  try {
    const docRef = await db
      .collection(col)
      .doc(id)
      .collection(sub)
      .add(data);
    return docRef;
  } catch (error) {
    console.error("Error adding subDoc document: ", error);
  }
}
export async function updateSubDocInDb(col, colId, sub, id, data) {
  try {
    const docRef = await db
      .collection(col)
      .doc(colId)
      .collection(sub)
      .doc(id)
      .update(data);
    return docRef;
  } catch (error) {
    console.error("Error update subDoc document: ", error);
  }
}
export async function deleteSubDocInDb(col, colId, sub, id) {
  try {
    const docRef = await db
      .collection(col)
      .doc(colId)
      .collection(sub)
      .doc(id)
      .delete()
    return docRef;
  } catch (error) {
    console.error("Error update subDoc document: ", error);
  }
}
export function listeningDocInDb(col, colId, sub) {
  const querySnap = db.collection(col).doc(colId).collection(sub);
  return querySnap;
}
