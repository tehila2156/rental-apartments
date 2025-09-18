import { produce } from 'immer'



export const InitialState = {
    CurrentUser:""
}



export const UserReduser = produce((state, action) => {
    switch (action.type) {
        case 'SET_USER':
            state.CurrentUser = action.payload
            break;
        default:
            break;
    }
}, InitialState)




