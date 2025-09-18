import { produce } from 'immer'

const apartments = {
    list: []
}

export const ApartmentReduser = produce((state, action) => {
    switch (action.type) {
        case 'SET_LIST':
            state.list = action.payload
            break;

        default:
            break;
    }
}, apartments)


