import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import admin from 'firebase';

const config = {
   apiKey: "AIzaSyCmKZ28n0lEjl_c1bxJHD0k01bBQ_CPamY",
   authDomain: "health-assistant-db-d866f.firebaseapp.com",
   databaseURL: "https://health-assistant-db-d866f.firebaseio.com",
   projectId: "health-assistant-db-d866f",
   storageBucket: "health-assistant-db-d866f.appspot.com",
   messagingSenderId: "215873722409",
   appId: "1:215873722409:web:99267fb250c77060b32438",
   measurementId: "G-4NTRYYSRLP"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
   if(!userAuth) return;

   const userRef = firestore.doc(`users/${userAuth.uid}`);
   const snapShot = await userRef.get();

   if(!snapShot.exists) {
     const { displayName, email } = userAuth;
     const createdAd = new Date();
     const tickets = [];

     try {
       await userRef.set({
         displayName,
         email,
         createdAd,
         tickets,
         ...additionalData
       })
     } catch(err) {
       console.log('error creating user', err.message)
     }
   }

   return userRef;
 }

export const createUserTicket = async ticketData => {
  const userAuth = await getCurrentUser();
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const updates = {
    tickets: admin.firestore.FieldValue.arrayUnion(ticketData)
  }
  try {
    userRef.update(updates)
  } catch(err) {
    console.log('error creating ticket', err.message)
  }
  return userRef;
}

 export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

export const getLocations = async () => {
  const locationsRef = firestore.collection('locations');
  const loactionsSnapShot = await locationsRef.get();
  const locations = []
  if(loactionsSnapShot.empty) {
    console.log('collection is empty');
    return;
  }
  try {
    loactionsSnapShot.forEach(doc => {
      locations.push(doc.data())
    })
  } catch(err) {
    console.log(err.message)
  }
  return locations;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();