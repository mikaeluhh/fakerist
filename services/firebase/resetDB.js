import app from "./firebaseConfig";
import { getDatabase, ref, set } from "firebase/database";

const resetDB = () => {
  const db = getDatabase(app);
  const reference = ref(db, "Scans/");
  set(reference, null);
  scanCounter = 1;
};

export default resetDB;
