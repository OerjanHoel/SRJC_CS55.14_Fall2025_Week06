import { db } from './firebase'; // Import database from firebase.js
import { collection, getDocs, query, where, documentId } from 'firebase/firestore'; // Imported from Firebase node package

// Export gets the data we want from our database at Firebase cretes array
export async function getSortedPostsData() {
    const myCollectionRef = collection(db, "posts"); // Gets data from dabase(collection) named posts
    const querySnapshot = await getDocs(myCollectionRef); // Waiting for the Docs to be loaded then add data to variable querySnapshot
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map all the objects that we have in our database
    // Sort our object based on title
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

// Export creates jsonObj and maps the id to string
export async function getAllPostIds() {
    const myCollectionRef = collection(db, "posts"); // Gets data from dabase(collection) named posts
    const querySnapshot = await getDocs(myCollectionRef); // Waiting for the Docs to be loaded then add data to variable querySnapshot
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id })); // Map all the objects that we have in our database
    console.log(jsonObj);
    // array of the database random created id's 
    return jsonObj.map(item => {
        return {
            params: {
                id: item.id.toString()
            }
        }
    });

}

// Export the data we need to build the posts page
// 'id' is the random id we created in Firebase when creating the posts
// This turns into the new unique URL for each post
export async function getPostData(id) {
    const myCollectionRef = collection(db, "posts"); // Gets data from dabase(collection) named posts
    // Query that uses Firebase node sort the data we have
    const searchQuery = query(
        myCollectionRef,
        where(
            documentId(),
            "==",
            id
        )
    );
    const querySnapshot = await getDocs(searchQuery); // Waiting for the Docs to be loaded then add data to variable querySnapshot
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map all the objects that we have in our database

    // if statement to check that resturns our objects
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
