import React from 'react';
import {connect} from 'react-redux';
import './plan.css';
import _ from 'underscore';
import PlanItem from './PlanItem.jsx';
import * as AppAction from './actions/AppAction.jsx';
import { bindActionCreators } from 'redux';

class Plan extends React.Component {
	constructor (props) {
		super(props);
	}

	plusPlan (e) {
		const lastPlan = _.last(this.props.todayPlan);

		this.props.actions.addPlan({
			id : lastPlan.id + 1,
			lastTime : lastPlan.lastTime + lastPlan.duration,
			name : '',
			note : '',
			type : 0,
			isDraging : false,
			duration : 1
		});
	}

	render () {
		var today = new Date();

		return (
			<div className="content">
			    <div className="bg"></div>
				<div className="plan-header text-center">
				    <div className="col-xs-3">昨天</div>
				    <div className="col-xs-6">{today.getFullYear()}年{today.getMonth() + 1}月{today.getDate()}日</div>
				    <div className="col-xs-3">明天</div>
				</div>
				<div className="plan-setting text-center">
				    <div className="col-xs-6"><select className="col-xs-12"><option>工作日</option></select></div>
				    <div className="col-xs-2">设置</div>
				    <div className="col-xs-2">日历</div>
				    <div className="col-xs-2">清空</div>
				</div>
				{this.props.todayPlan.map((one, index) => {
					return <PlanItem key={'PlanItem' + index} data={one} lastTime={one.lastTime} />
				})}
				<div className="glyphicon glyphicon-plus plan-plus" onClick={(event)=>this.plusPlan(event)}></div>
			</div>
		);
	}
}

export default Plan = connect(state => ({
     todayPlan: state.plans.todayPlan
}), dispatch => ({
     actions: bindActionCreators(AppAction, dispatch)
}))(Plan);