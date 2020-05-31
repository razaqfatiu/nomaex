const initState = {
  productError: null,
  loading: true,
  products: [],
}

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATED_PRODUCT_SUCCESS':
      console.log('post product success');
      return {
        ...state,
        products: action.product,
        loading: action.loading,
        productError: null
      };
    case 'CREATED_PRODUCT_FAILURE':
      console.log('post product failed')
      return {
        ...state,
        productError: action.error.response
      }
    case 'GET_ALL_PRODUCTS_SUCCESS':
      console.log('GET_ALL_PRODUCTS_SUCCESS')
      return {
        ...state,
        products: action.products,
        loading: action.loading,
        productError: null
      }
    case 'GET_ALL_PRODUCTS_FAILURE':
      return {
        ...state,
        productError: action.error.response
      }
    case 'UPDATED_PRODUCT_SUCCESS':
      console.log('UPDATED_PRODUCT_SUCCESS')
      return {
        ...state,
        products: action.product,
        loading: action.loading,
        productError: null
      }
    case 'UPDATED_PRODUCT_FAILURE':
      return {
        ...state,
        productError: action.error.response
      }
    default:
      return state;
  }
};

export default productReducer
