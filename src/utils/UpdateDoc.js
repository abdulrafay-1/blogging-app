import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const updateDocument = (docId, obj) => {
    return new Promise(async (resolve, reject) => {
        const ref = doc(db, "blogs", docId);
        try {
            resolve(await updateDoc(ref, obj))
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

export default updateDocument 