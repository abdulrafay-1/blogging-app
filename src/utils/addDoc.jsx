import React from "react";
import { doc, setDoc } from "firebase/firestore";

const addDoc = async () => {
  return new Promise(async (resolve) => {
    await setDoc(doc(db, "users", "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
    });
  });

  return <div>addDoc</div>;
};

export default addDoc;
