const axios = require('axios')
const url = `http://localhost:5000`

var headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');


export const signUp = (credentials) => {
    return async (dispatch, getState) => {
        try {
            const signUpResponse = await axios.post(`${url}/admin/dev-create-admin`, credentials)
            dispatch({ type: 'SIGNUP_SUCCESS', signUpResponse })
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

            // const signInResponse = await fetch(`${url}/admin/signin`, {
            //     method: 'POST',
            //     mode: 'no-cors',
            //     redirect: 'follow',
            //     credentials: 'include', // Don't forget to specify this if you need cookies
            //     headers: headers,
            //     body: JSON.stringify(credentials)
            // })
            loading = getState().auth.loading = false
            dispatch({ type: 'SIGNIN_SUCCESS', payload: signInResponse, loading })
        }
        catch (error) {
            dispatch({ type: 'SIGNIN_FAILURE', error })
        }
    }
}
