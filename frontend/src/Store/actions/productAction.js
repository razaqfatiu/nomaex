const axios = require('axios').default
const url = `http://localhost:5000`

export const createNewProduct = (credentials) => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().product.loading = true
      const newProduct = await axios.post(`${url}/admin/product`, credentials, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      })
      console.log(credentials)
      loading = getState().product.loading = false
      dispatch({ type: 'CREATED_PRODUCT_SUCCESS', product: newProduct, loading })
    }
    catch (error) {
      dispatch({ type: 'CREATED_PRODUCT_FAILURE', error })
    }
  }
}

export const getAllProducts = () => {
  return async (dispatch, getState) => {
    try {
      const getAllProducts = await axios.get(`${url}/admin/products`)
      let loading = getState().auth.loading = false
      // console.log(getCategories.data.getCategories)
      dispatch({
        type: 'GET_ALL_PRODUCTS_SUCCESS',
        products: getAllProducts.data.getAllProducts,
        loading
      })
    }
    catch (error) {
      dispatch({ type: 'GET_ALL_PRODUCTS_FAILURE', error })
    }
  }
}

export const updateAProduct = (credentials) => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().product.loading = true;
      console.log(credentials)
      const updateAProduct = await axios.patch(`${url}/admin/product`, credentials)
      console.log(updateAProduct);
      // if (updateAProduct) {
        loading = getState().product.loading = false
      // }
      dispatch({ type: 'UPDATED_PRODUCT_SUCCESS', product: updateAProduct, loading })
    }
    catch (error) {
      dispatch({ type: 'UPDATED_PRODUCT_FAILURE', error })
    }
  }
}