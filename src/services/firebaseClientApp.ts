import { environment } from "../config"
import { FirebaseOptions, initializeApp } from "firebase/app"
import { getAuth, updateProfile } from "firebase/auth"
import {
  getFirestore,
  addDoc,
  collection as coll,
  doc,
  setDoc,
} from "firebase/firestore"

const firebaseConfig: FirebaseOptions = environment.firebase

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const db = getFirestore(app)

const add = async (document: any, collection: string, id: string) => {
  await setDoc(doc(db, collection, id), document)
}

export default { app, auth, update: updateProfile, db: { add } }
