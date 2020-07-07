import firebase from "firebase";

export function editMessage(key, content) {
    var updates = {};
    updates['/Messages/' + key + "/content"] = content;
    updates['/Messages/' + key + "/edited"] = 1;
    return firebase.database().ref().update(updates);
}