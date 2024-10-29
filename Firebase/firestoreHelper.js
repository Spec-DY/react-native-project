import { collection, addDoc, deleteDoc, doc, getDocs,updateDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";
import { auth} from "./firebaseSetup"


export async function writeToDB(collectionName, data) {
	try {
    if (!auth.currentUser) {
      throw new Error("User is not authenticated");
    }

    // Add the current user's UID to the data
    const goal = { ...data, owner: auth.currentUser.uid };
	    const docRef = await addDoc(collection(database, collectionName), goal);
        console.log(docRef.id)
        return docRef
	  }
	catch (err) {
	    console.log(err)
	  }
	}

export async function deleteFromDB(id) {
    try {
        const docRef = doc(database, "goals", id);
        await deleteDoc(docRef);
        console.log(`Document with ID ${id} has been deleted.`);
    } catch (err) {
        console.log("Error deleting document: ", err);
    }
}

export async function deleteAllFromDB() {
    try {
      const querySnapshot = await getDocs(collection(database, "goals"));
      
      querySnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(docSnapshot.ref);
        console.log(`Document with ID ${docSnapshot.id} has been deleted.`);
      });
    } catch (err) {
      console.log("Error deleting all documents: ", err);
    }
}

export async function setWarningFlag(goalId) {
  try {
    const docRef = doc(database, "goals", goalId);
    await updateDoc(docRef, { warning: true });
    console.log(`Goal ${goalId} has been updated with warning:true.`);
  } catch (err) {
    console.log("Error setting warning flag: ", err);
  }
}