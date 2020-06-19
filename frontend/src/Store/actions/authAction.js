const axios = require('axios')
const url = `http://localhost:5000`

var headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');


export const signUp = (credentials) => {
    return async (dispatch, getState) => {
        try {
            const signUpResponse = await axios.post(`${url}/admin/dev-create-admin`, credentials)
            dispatch({ type: 'SIGNUP_SUCCESS', payload: signUpResponse })
        }
        catch (error) {
            dispatch({ type: 'SIGNUP_FAILURE', error })
        }
    }
}

export const signIn = (credentials) => {
    return async (dispatch, getState) => {
        try {
            let loading = getState().auth.loading = true
            const signInResponse = await axios.post(`${url}/admin/signin`, credentials, {withCredentials: true})
            loading = getState().auth.loading = false
            dispatch({ type: 'SIGNIN_SUCCESS', payload: signInResponse, loading })
        }
        catch (error) {
            dispatch({ type: 'SIGNIN_FAILURE', error })
        }
    }
}

export const forgotPassword = (credentials) => {
    return async (dispatch, getState) => {
        try {
            let loading = getState().auth.loading = true
            const forgotPassword = await axios.post(`${url}/admin/auth/forgot-password`, credentials, {withCredentials: true})
            loading = getState().auth.loading = false
            dispatch({ type: 'FORGOT_PASSWORD_SUCCESS', payload: forgotPassword, loading })
        }
        catch (error) {
            dispatch({ type: 'FORGOT_PASSWORD_FAILURE', error })
        }
    }
}

export const resetPassword = (credentials) => {
    return async (dispatch, getState) => {
        try {
            let loading = getState().auth.loading = true
            const resetPassword = await axios.post(`${url}/admin/auth/reset-password`, credentials, {withCredentials: true})
            loading = getState().auth.loading = false
            dispatch({ type: 'RESET_PASSWORD_SUCCESS', payload: resetPassword, loading })
        }
        catch (error) {
            dispatch({ type: 'RESET_PASSWORD_FAILURE', error })
        }
    }
}
