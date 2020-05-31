const initState = {
  authError: null,
  loading: true,
  payload: {}
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      console.log('signup success');
      return {
        ...state,
        authError: null
      };
    case 'SIGNUP_FAILURE':
      console.log('signup failed')
      return {
        ...state,
        authError: action.error.message
      }
    case 'SIGNIN_SUCCESS':
      console.log('signin success');
      return {
        ...state,
        payload: action.payload,
        loading: action.loading,
        authError: null
      };
    case 'SIGNIN_FAILURE':
      console.log('signin failed')
      return {
        ...state,
        authError: action.error.response
      }
    default:
      return state;
  }
};

export default authReducer
