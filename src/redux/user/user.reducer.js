import { UserActionTypes } from './user.types'

const Inital_state = {
    currentUser: null
}

const userReducer = (state = Inital_state, action) => {
    switch(action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }

        default:
            return state
    }
}

export default userReducer