import { takeLatest, put, all, call } from 'redux-saga/effects';
import userActionTypes from './user.types';
import { auth, createUserProfileDocument, createUserTicket, getCurrentUser } from '../../firebase/firebase.utils';

import { 
   signInSuccess, 
   signInFailure,
   signOutSuccess, 
   signOutFailure,
   registerSuccess,
   registerFailure,
   reservationSuccess,
   reservationFailure,
 } from './user.actions';

export function* getSnapShotFromUserAuth(userAuth, additionalData) {
   try { 
      const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
      const userSnapShot = yield userRef.get();
      yield put(signInSuccess({ 
         id: userSnapShot.id, ...userSnapShot.data() 
      }));
   } catch(err) {
      yield put(signInFailure(err));
   }
};

export function* signInWithEmail({ payload: { email, password }}) {
   try {
      const { user } = yield auth.signInWithEmailAndPassword(email, password);
      yield getSnapShotFromUserAuth(user)

   } catch(err) {
      yield put(signInFailure(err));
   }
};

export function* isUserAuthenticated() {
   try {
      const userAuth = yield getCurrentUser();
      if(!userAuth) return;
      yield getSnapShotFromUserAuth(userAuth);
   } catch(err) {
      yield put(signInFailure(err));
   }
};

export function* signOut() {
   try {
      yield auth.signOut();
      yield put(signOutSuccess());
   } catch(err) {
      yield put(signOutFailure(err));
   }
};

export function* register({payload :{email, password, displayName }}) {
   try {
      const { user } = yield auth.createUserWithEmailAndPassword(email, password);
      yield put(registerSuccess({ user, additionalData: { displayName } }));
   } catch(err) {
      yield put(registerFailure(err))
   }
};

export function* signInAfterRegister({ payload: { user, additionalData } }) {
   yield getSnapShotFromUserAuth(user, additionalData);
};

export function* reserveTicket({payload: {legalName, policyNumber, location, department, timeSlot}}) {
   try {
      yield createUserTicket({legalName, policyNumber, location, department, timeSlot});
      yield put(reservationSuccess({ticketData: {legalName, policyNumber, location, department, timeSlot}}))
   } catch(err) {
      yield put(reservationFailure(err))
   }
};

export function* onEmailSignInStart() {
   yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
};

export function* onCheckUserSession() {
   yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
};

export function* onSignOutStart() {
   yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
};

export function* onRegisterStart() {
   yield takeLatest(userActionTypes.REGISTER_START, register)
};

export function* onRegisterSuccess() {
   yield takeLatest(userActionTypes.REGISTER_SUCCESS, signInAfterRegister)
};

export function* onReservationStart() {
   yield takeLatest(userActionTypes.RESERVATION_START, reserveTicket)
};

export function* userSagas() {
   yield all([ 
      call(onEmailSignInStart),
      call(isUserAuthenticated),
      call(onSignOutStart),
      call(onRegisterStart),
      call(onRegisterSuccess),
      call(onReservationStart)
    ]);
};