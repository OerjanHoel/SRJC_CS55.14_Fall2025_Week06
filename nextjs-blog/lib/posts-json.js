import fs from 'fs'; // Importing the file system from Node 
import path from 'path'; // Imports Path from Node

// Path joined for adding data directory
const dataDir = path.join(process.cwd(), 'data');

// Same function as used before
// Except this is not async
// and it is pulling data from JSON
export function getSortedPostsData() {
    const filePath = path.join(dataDir, 'posts.json'); // Variable for the JSON file location
    const jsonString = fs.readFileSync(filePath, 'utf8'); // Variable for reading the JSON file
    const jsonObj = JSON.parse(jsonString); // Varaiable that parses our JSON array objects to strings
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

// Same function as used before
// Except this is not async
// and it is pulling data from JSON
export function getAllPostIds() {
    const filePath = path.join(dataDir, 'posts.json'); // Variable for the JSON file location
    const jsonString = fs.readFileSync(filePath, 'utf8'); // Variable for reading the JSON file
    const jsonObj = JSON.parse(jsonString); // Varaiable that parses our JSON array objects to strings
     // Writes  out the objects in the JSON array to temrinal
    console.log(jsonObj);
    // Give us the output from the mapping of the array
    return jsonObj.map(item => {
        return {
            params: {
                id: item.id.toString()
            }
        }
    });
}

// Same function as used before (get the post data from )
// Except this is not async
// and it is pulling data from JSON
export function getPostData(id) {
    const filePath = path.join(dataDir, 'posts.json'); // Variable for the JSON file location
    const jsonString = fs.readFileSync(filePath, 'utf8'); // Variable for reading the JSON file
    const jsonObj = JSON.parse(jsonString); // Varaiable that parses our JSON array objects to strings
    const objReturned = jsonObj.filter(obj => {
    // Give us the output from the mapping of the array
    return obj.id.toString() === id;
    });
    // If statement gives a mesasge if the objects are not returned from JSON 
    if (objReturned.length === 0) {
        return {
            id: id,
            title: 'Not found',
            date: '',
            contentHtml: 'Not found',
            sourceURL: ''
        }
    } else {
        return objReturned[0];
    }
}