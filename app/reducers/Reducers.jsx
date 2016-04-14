import { combineReducers } from 'redux';
import { ADD_PLAN, CHANGE_PLAN } from '../actions/actionTypes';
import _ from 'underscore';
 
const initialState = {
	todayPlan:[
	    {id : 1,
	    lastTime : 0,
		name : '',
		note : '',
		type : 0,
		duration: 1}
	]
};
 
export default function plans(state = initialState, action) {
    switch(action.type) {
    	case ADD_PLAN :
    	    return {todayPlan : [...state.todayPlan, action.data]};
    	case CHANGE_PLAN :
    	    let todayPlan = _.reduce(state.todayPlan, (mem, one) => {
    	    	const lastPlan = _.last(mem);

    	    	if (one.id === action.data.id) {
    	    		one.duration = action.data.duration;
    	    	}

    	    	if (lastPlan) {
    	    	    one.lastTime = lastPlan.duration + lastPlan.lastTime;
    	    	}

    	    	mem.push(one);
    	    	return mem;
    	    }, []);
    	    
    	    return {todayPlan : todayPlan};
        default:
            return state;
    }
}

const SpartaApp = combineReducers({
    plans
});

export default SpartaApp;