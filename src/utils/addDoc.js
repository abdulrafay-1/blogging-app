import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const addDocument = (colName, obj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = await addDoc(collection(db, colName), obj);
      resolve(`Document written with ID:  ${docRef.id}`);
    } catch (error) {
      reject(error)
    }
  })
}

export default addDocument;