import userActionTypes from './user.types';

export const signInSuccess = user => ({
   type: userActionTypes.SIGN_IN_SUCCESS,
   payload: user
});

export const signInFailure = error => ({
   type: userActionTypes.SIGN_IN_FAILURE,
   payload: error
});

export const checkUserSession = () => ({
   type: userActionTypes.CHECK_USER_SESSION
});

export const emailSignInStart = emailAndPassword => ({
   type: userActionTypes.EMAIL_SIGN_IN_START,
   payload: emailAndPassword
});

export const signOutStart = () => ({
   type: userActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
   type: userActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
   type: userActionTypes.SIGN_OUT_FAILURE,
   payload: error
});

export const registerStart = (userCredentials) => ({
   type: userActionTypes.REGISTER_START,
   payload: userCredentials
});

export const registerSuccess = ({user, additionalData}) => ({
   type: userActionTypes.REGISTER_SUCCESS,
   payload: {user, additionalData}
});

export const registerFailure = error => ({
   type: userActionTypes.REGISTER_FAILURE,
   payload: error
});

export const reservationStart = (ticketData) => ({
   type: userActionTypes.RESERVATION_START,
   payload: ticketData
});

export const reservationSuccess = (ticketData) => ({
   type: userActionTypes.RESERVATION_SUCCESS,
   payload: ticketData
});

export const reservationFailure = error => ({
   type: userActionTypes.RESERVATION_FAILURE,
   payload: error
});

export const cancellationStart = (ticketData) => ({
   type: userActionTypes.CANCELLATION_START,
   payload: ticketData
});

export const cancellationSuccess = (ticketData) => ({
   type: userActionTypes.CANCELLATION_SUCCESS,
   payload: ticketData
});

export const cancellationFailure = error => ({
   type: userActionTypes.CANCELLATION_FAILURE,
   payload: error
});