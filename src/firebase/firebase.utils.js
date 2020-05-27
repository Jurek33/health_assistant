import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

export const createUserTicketDocument = async ticketData => {
  const userAuth = await getCurrentUser();
  const tickets = userAuth.uid.tickets;
  const userTicketsRef = firestore.doc(`users/${userAuth.uid}/tickets/${tickets}`);
  const { legalName } = ticketData;
  try {
    await tickets.push(userTicketsRef.set({
      legalName
    }))
  } catch(err) {
    console.log('error creating ticket', err.message)
  }
  return userTicketsRef;
}

 export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();