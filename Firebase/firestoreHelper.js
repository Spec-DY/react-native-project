import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
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