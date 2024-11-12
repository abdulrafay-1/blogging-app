import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";

const getUserDocs = (collName, uid, key) => {
    return new Promise(async (resolve, reject) => {
        // removed order by
        const q = query(collection(db, collName), where(key, "==", uid),);
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                ...doc.data(),
                docId: doc.id
            })
        });
        resolve(data)
    })
}

export default getUserDocs