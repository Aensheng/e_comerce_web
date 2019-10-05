import SHOP_DATA from './shop.data'

const Initial_state = {
    collections: SHOP_DATA
}

const shopReducer = (state=Initial_state, action) => {
    switch(action.type){
        default:
            return state
    }
}

export default shopReducer