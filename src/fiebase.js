import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyBXf_LEtBCg-xcuXVNPmZdrL8USy1JvH1I",
    authDomain: "ktrack-5e453.firebaseapp.com",
    databaseURL: "https://ktrack-5e453.firebaseio.com",
    projectId: "ktrack-5e453",
    storageBucket: "ktrack-5e453.appspot.com",
    messagingSenderId: "140888708838"
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