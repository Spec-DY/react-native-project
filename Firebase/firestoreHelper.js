import { collection, addDoc, deleteDoc, doc, getDocs,updateDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";


export async function writeToDB(collectionName, data) {
	try {
	    const docRef = await addDoc(collection(database, collectionName), data);
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

export async function addUserToGoal(goalId, userData) {
  try {
    if (!goalId) {
      throw new Error("Invalid goalId");
    }
    
    if (!userData || !userData.name) {
      throw new Error("Invalid userData object passed");
    }
    const usersSubCollectionRef = collection(database, "goals", goalId, "users");
    const docRef = await addDoc(usersSubCollectionRef, userData);
    console.log("User added to subcollection with ID: ", docRef.id);
    return docRef;
  } catch (err) {
    console.error("Error while adding user to subcollection: ", err);
    if (err.stack) {
      console.error("Stack trace:", err.stack);
    }
  }
}



export async function getUsersFromGoal(goalId) {
  try {
    const usersSubCollectionRef = collection(database, "goals", goalId, "users");
    const querySnapshot = await getDocs(usersSubCollectionRef);
    const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return users;
  } catch (err) {
    console.error("error get user data: ", err);
    return [];
  }
}