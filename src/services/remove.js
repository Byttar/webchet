import firebase from "firebase";

export function removeMessage(key) {
    // A post entry.
    
    
  
    // Get a key for a new Post.
    // var newPostKey = firebase.database().ref().child('Messages').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/Messages/' + key + "/active"] = 0;
    return firebase.database().ref().update(updates);
  }