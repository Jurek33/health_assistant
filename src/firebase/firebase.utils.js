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
  const locationRef = firestore.doc(`locations/${ticketData.locationId}`);
  const userUpdates = {
    tickets: admin.firestore.FieldValue.arrayUnion(ticketData)
  }
  const removeSlot = {
    timeSlots: admin.firestore.FieldValue.arrayRemove({isAvaliable: true, value:`${ticketData.timeSlot}`})
  }
  const addSlot = {
    timeSlots: admin.firestore.FieldValue.arrayUnion({isAvaliable: false, value:`${ticketData.timeSlot}`})
  }
  try {
    userRef.update(userUpdates);
    locationRef.update(removeSlot);
    locationRef.update(addSlot)
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

export const getLocationById = async id => {
  const locationRef = firestore.doc(`locations/${id}`);
  const locationSnapShot = await locationRef.get();
  if(!locationSnapShot) {
    console.log('no document found');
    return;
  }
  try {
    return locationSnapShot.data()
  } catch(err) {
    console.log(err.message)
  }
}

export const getUserTickets = async () => {
  const userAuth = await getCurrentUser();
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userTickesRef = await userRef.get();
  if(!userTickesRef.exists) return 
  try {
    return userTickesRef.data().tickets
  } catch(err) {
    console.log(err.message)
  }
}

export const removeTicket = async ticket => {
  const remove = {
    tickets: admin.firestore.FieldValue.arrayRemove(ticket)
  }
  const clearSlot = {
    timeSlots: admin.firestore.FieldValue.arrayRemove({isAvaliable: false, value:`${ticket.timeSlot}`})
  }
  const createSlot = {
    timeSlots: admin.firestore.FieldValue.arrayUnion({isAvaliable: true, value:`${ticket.timeSlot}`})
  }
  const userAuth = await getCurrentUser();
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const locationRef = firestore.doc(`locations/${ticket.locationId}`);
  try {
    userRef.update(remove)
    locationRef.update(clearSlot);
    locationRef.update(createSlot)
  } catch(err) {
    console.log(err.message)
  }
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
