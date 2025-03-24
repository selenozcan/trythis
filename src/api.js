import { db, auth } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const activitiesRef = collection(db, "activities");
const usersRef = collection(db, "users");

export const getAllActivities = async () => {
  try {
    const snapshot = await getDocs(activitiesRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting activities:", error);
    throw error;
  }
};

const saveUserToFirestore = async (user) => {
  if (!user) return;

  const userRef = doc(usersRef, user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const now = new Date();
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: now,
      assignedActivities: [],
      totalCompletedActivities: 0,
      streak: 0,
    });
    console.log("User saved to Firestore");
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    await saveUserToFirestore(user);
    await user.reload();
    return user;
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    throw error;
  }
};

export const loginWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    await saveUserToFirestore(user);
    await user.reload();
    return user;
  } catch (error) {
    console.error("Facebook Sign-in Error:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-out Error:", error);
    throw error;
  }
};

export const getUserByUid = async (uid) => {
  try {
    const userRef = doc(usersRef, uid);
    const snapshot = await getDoc(userRef);
    return snapshot.exists() ? snapshot.data() : null;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

export const addActivityToUser = async (activity) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user is logged in.");
    if (!activity?.id) throw new Error("Invalid activity object.");

    const userRef = doc(usersRef, user.uid);
    const snapshot = await getDoc(userRef);
    if (!snapshot.exists()) throw new Error("User document does not exist.");

    const userData = snapshot.data();
    const today = new Date().toISOString().split("T")[0];

    const alreadyAssigned = userData.assignedActivities?.some(
      (a) => a.activityId === activity.id && a.assignedAt.startsWith(today)
    );

    if (alreadyAssigned) {
      console.warn("Activity already assigned for today.");
      return;
    }

    const newActivity = {
      activityId: activity.id,
      assignedAt: new Date().toISOString(),
      completed: false,
    };

    await updateDoc(userRef, {
      assignedActivities: arrayUnion(newActivity),
    });
  } catch (error) {
    console.error("Failed to assign activity:", error);
    throw error;
  }
};

export const getActivityById = async (id) => {
  try {
    const ref = doc(activitiesRef, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error("Activity not found");
    return { id: snap.id, ...snap.data() };
  } catch (error) {
    console.error("Error fetching activity:", error);
    throw error;
  }
};

export const markActivityCompleted = async (activityId, completed = true) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user is logged in.");

    const userRef = doc(usersRef, user.uid);
    const snapshot = await getDoc(userRef);
    const userData = snapshot.data();

    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();

    const updatedActivities = userData.assignedActivities.map((a) =>
      a.activityId === activityId ? { ...a, completed } : a
    );

    const totalCompleted = updatedActivities.filter((a) => a.completed).length;

    const completedToday = updatedActivities.some(
      (a) =>
        a.completed && new Date(a.assignedAt).toLocaleDateString() === today
    );

    const completedYesterday = updatedActivities.some(
      (a) =>
        a.completed && new Date(a.assignedAt).toLocaleDateString() === yesterday
    );

    let streak = userData.streak || 0;

    if (completed && completedToday) {
      streak = completedYesterday ? streak + 1 : 1;
    } else if (!completed && !completedToday) {
      streak = completedYesterday ? streak - 1 : 0;
    }

    await updateDoc(userRef, {
      assignedActivities: updatedActivities,
      totalCompletedActivities: totalCompleted,
      streak: Math.max(0, streak),
    });
  } catch (error) {
    console.error("Failed to update activity status:", error);
    throw error;
  }
};
