import * as firebase from "firebase";

import { initContacts } from './actions';
import store from './store';

var config = {
  apiKey: "AIzaSyCxK0g1oqbRmlXa8pQXSkyMj9K8hbG_LBU",
    authDomain: "my-contacts-98b10.firebaseapp.com",
    databaseURL: "https://my-contacts-98b10.firebaseio.com",
    projectId: "my-contacts-98b10",
    storageBucket: "my-contacts-98b10.appspot.com",
    messagingSenderId: "673782336769"
};
firebase.initializeApp(config);

var database = firebase.database();

export var User = {};
export function auth () {
  return new Promise(function (resolve, reject) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        User.user = result.user;
        resolve(User);
        read_data();
        
        setTimeout(function () {
         database.ref('contacts/' + User.user.uid)
          .once('value').then(function(contacts) {
           console.log(contacts.val());
           }); 
        }, 2000);

        database.ref('contacts/' + User.user.uid)
         .on('value', function(contacts) {
          console.log(contacts.val());
         });
      })
      .catch(function (e) {
        reject(e);
      });
  });
}

function read_data () {
  database.ref('contacts/' + User.user.uid)
    .once('value').then((contacts) => {
      contacts = contacts.val();
      console.log(contacts);
      if (contacts) {
        store.dispatch(initContacts(contacts));
      }
    });
}

let unsubscribe = store.subscribe(() => {
  database.ref('contacts/' + User.user.uid).set(
    store.getState().contacts
  );
});


firebase.auth()
  .onAuthStateChanged(function(user) {
    if (user) {
      User.user = user;
      console.log(user);
      read_data();
    }
  });

export default database;