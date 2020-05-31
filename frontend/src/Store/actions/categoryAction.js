const axios = require('axios').default
const url = `http://localhost:5000`

export const getCategories = () => {
  return async (dispatch, getState) => {
    try {
      const getCategories = await axios.get(`${url}/admin/categories`)
      let loading = getState().auth.loading = false
      // console.log(getCategories.data.getCategories)
      dispatch({ type: 'GET_CATEGORIES_SUCCESS', categories: getCategories.data.getCategories, loading })
    }
    catch (error) {
      dispatch({ type: 'GET_CATEGORIES_FAILURE', error })
    }
  }
}