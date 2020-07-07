import firebase from "firebase";

export function writeNewMessage(username, content, type, time) {
    // A post entry.
    var postData = {
      author: username,
      content,
      type,
      time,
      active: 1
    };
  
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('Messages').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/Messages/' + newPostKey] = postData;
  
    return firebase.database().ref().update(updates);
  }