import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const myDeleteDoc = async (collName, docId) => {
    new Promise(async (resolve, reject) => {
        deleteDoc(doc(db, collName, docId));
        resolve("doc deleted")
    })
}

export default myDeleteDoc;