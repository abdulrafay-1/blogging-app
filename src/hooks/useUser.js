import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const useUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(undefined)
      }
    });
  });
};

export default useUser;
