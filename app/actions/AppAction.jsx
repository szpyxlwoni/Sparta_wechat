import { ADD_PLAN, CHANGE_PLAN } from '../actions/actionTypes';

export function addPlan(plan) {
	return {
		type : ADD_PLAN,
		data : plan
	};
}

export function changePlan(plan) {
	return {
		type : CHANGE_PLAN,
		data : plan
	};
}