const axios = require('axios').default
const url = `http://localhost:5000`

export const signUp = (credentials) => {
    return async (dispatch, getState) => {
            try {
                const signUpResponse = await axios.post(`${url}/admin/dev-create-admin`, credentials)
                dispatch({ type: 'SIGNUP_SUCCESS', signUpResponse })
            }
            catch(error) {
                dispatch({ type: 'SIGNUP_FAILURE', error })
            }
    }
}

export const signIn = (credentials) => {
    return async (dispatch, getState) => {
            try {
                let loading = getState().auth.loading = true
                const signInResponse = await axios.post(`${url}/admin/signin`, credentials)
                loading = getState().auth.loading = false
                dispatch({ type: 'SIGNIN_SUCCESS', payload: signInResponse, loading})
            }
            catch (error) {
                dispatch({ type: 'SIGNIN_FAILURE', error })
            }
    }
}
