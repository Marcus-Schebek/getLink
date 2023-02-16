import {auth, db} from './firebase'
import { collection,getDocs,getDoc,addDoc,updateDoc,deleteDoc,doc, DocumentData, setDoc } from 'firebase/firestore'
import { fetchReport } from '../pages/Home';

class linkDataService {
  [x: string]: any;
  async addLink(newLink: { url: string; }) {
    const { title } = await fetchReport(newLink.url);
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user logged in');
    }

    const linkDocRef = doc(db, `users/${user.uid}/links/newLink`); // Add "newLink" segment
    console.log(linkDocRef)
    const linkDoc = await getDoc(linkDocRef);

    const newLinkWithMetadata = {
      ...newLink,
      title,
    };

    if (linkDoc.exists()) {
      // The user's link collection already exists, add the new link to it
      return addDoc(collection(linkDocRef, 'links'), newLinkWithMetadata);
    } else {
      // The user's link collection doesn't exist yet, create it and add the new link to it
      await setDoc(linkDocRef, {});
      return addDoc(collection(linkDocRef, 'links'), newLinkWithMetadata);
    }
}

async updateLink(id: string, updatedLink: { title: string; url: string }) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user logged in');
  }

  const { title } = await fetchReport(updatedLink.url);

  const linkDoc = doc(db, `users/${user.uid}/links/newLink/links/${id}`);
  const updatedLinkWithMetadata = {
    ...updatedLink,
    title,
  };
  return updateDoc(linkDoc, updatedLinkWithMetadata);
}

deleteLink(id: string) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user logged in');
  }
  const linkDoc = doc(db, `users/${user.uid}/links/newLink/links/${id}`);
  return deleteDoc(linkDoc);
}

  async getAllLinks() {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user logged in');
    }
  
    const linksRef = collection(db, `users/${user.uid}/links/newLink/links`);
    const linksSnapshot = await getDocs(linksRef);
  
    const links: DocumentData[] = [];
  
    linksSnapshot.forEach((doc) => {
      const link = doc.data();
      link.id = doc.id;
      links.push(link);
    });
  
    return links;
  }
}

export default new linkDataService();
