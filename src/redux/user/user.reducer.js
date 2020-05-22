import userActionTypes from './user.types';

const INITIAL_STATE = {
   currentUser: null,
   error: null,
   isPending: false
}

const userReducer = (state = INITIAL_STATE , action) => {
   switch(action.type) {
      case userActionTypes.SIGN_IN_SUCCESS:
      case userActionTypes.REGISTER_SUCCESS:
         return {
            ...state,
            currentUser: action.payload,
            error: null,
            isPending: false
         }
      case userActionTypes.EMAIL_SIGN_IN_START:
      case userActionTypes.REGISTER_START:
            return {
               ...state,
               isPending: true
            }
      case userActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            };
      case userActionTypes.SIGN_OUT_FAILURE:
      case userActionTypes.SIGN_IN_FAILURE:
      case userActionTypes.REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload,
                isPending: false
            };
      default:
         return state;
   }
}

export default userReducer;