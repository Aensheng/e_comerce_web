import ShopActionTypes from './shop.types' 

const Initial_state = {
    collections: null
}

const shopReducer = (state=Initial_state, action) => {
    switch(action.type){
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return{
                ...state,
                collections: action.payload
            }
        default:
            return state
    }
}

export default shopReducer