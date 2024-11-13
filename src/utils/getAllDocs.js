import { collection, getDocs, orderBy, query, } from "firebase/firestore";
import { db } from "../config/firebase";


const getAllDocs = (collName) => {
    return new Promise(async (resolve, reject) => {
        const q = query(collection(db, collName,), orderBy("time", "desc"))
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push({
                ...doc.data(),
                docId: doc.id,
            });
        });
        if (data.length > 0) {
            resolve(data)
        } else {
            reject("no data found");
        }
    })
}

export default getAllDocs