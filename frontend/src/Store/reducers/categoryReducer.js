const initState = {
  categoryError: null,
  categories: [],
  loading: true
}

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES_SUCCESS':
      console.log('gotten categories')
      return {
        ...state,
        categories: action.categories,
        loading: action.loading,
        categoryError: null
      }

    case 'GET_CATEGORIES_FAILURE':
      console.log('failed to get categories')
      return {
        ...state,
        categoryError: action.error.response
      }
    default:
      return state;
  }

}

export default categoryReducer;