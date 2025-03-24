import { collection, addDoc } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";

import { activities } from "../assets/activities";


const uploadActivities = async () => {
  try {
    const collectionRef = collection(db, "activities");

    for (let activity of activities) {
      await addDoc(collectionRef, activity);
      console.log(`Added: ${activity.activity}`);
    }

    console.log("All activities uploaded successfully!");
  } catch (error) {
    console.error("Error adding activities: ", error);
  }
};

uploadActivities();
