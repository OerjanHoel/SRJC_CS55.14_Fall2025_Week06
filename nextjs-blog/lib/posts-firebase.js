// Import the firebase app instance
import { db } from './firebase'; // Import database from firebase.js
import { collection, getDocs, query, documentId } from 'firebase/firestore'; // Imported from Firebase node package

export async function getSortedPostsData() {
    const myCollectionRef = collection(db, "posts");
    const querySnapshot = await getDocs(myCollectionRef);
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Sort our object based on tile
    jsonObj.sort(function (a, b) {
            return a.title.localeCompare(b.title);
        });
        // Give us the output from the mapping of the array
        return jsonObj.map(item => {
            return {
                id: item.id.toString(),
                title: item.title,
                date: item.date
            }
        });

}

export async function getAllPostIds() {
    const myCollectionRef = collection(db, "posts");
    const querySnapshot = await getDocs(myCollectionRef);
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id }));

    return jsonObj.map(item => {
        return {
            params: {
                id: item.id.toString()
            }
        }
    });

}

export async function getPostData(id) {
    const myCollectionRef = collection(db, "posts");
    const searchQuery = query(
        myCollectionRef,
        where(
            documentId(),
            "==",
            id
        )
    );
    const querySnapshot = await getDocs(searchQuery);
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (jsonObj.length === 0) {
        return {
            id: id,
            title: 'Not found',
            date: '',
            contentHtml: 'Not found',
            sourceURL: ''
        }
    } else {
        return jsonObj[0];
    }
}
