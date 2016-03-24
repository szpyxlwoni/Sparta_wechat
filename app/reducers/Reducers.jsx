import { combineReducers } from 'redux';
 
const initialState = {};
 
export default function appReducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}

const SpartaApp = combineReducers({
    appReducer
});

export default SpartaApp;