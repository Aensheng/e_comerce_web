import ShopActionTypes from './shop.types' 

const Initial_state = {
    collections: null,
    isFetching: false,
    errorMessage: undefined
}

const shopReducer = (state=Initial_state, action) => {
    switch(action.type){
        case ShopActionTypes.FETCH_COLLECTIONS_START:
            return{
                ...state,
                isFetching: true
            }
        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return{
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state
    }
}

export default shopReducer