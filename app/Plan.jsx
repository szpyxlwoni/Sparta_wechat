import 'amazeui/dist/css/amazeui.css';
import './plan.css';

import React from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';
import PlanItem from './PlanItem.jsx';
import * as AppAction from './actions/AppAction.jsx';
import { bindActionCreators } from 'redux';
import {Tabs, Dropdown} from 'amazeui-react';

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
		const content = (<div>
			<div className="plan-setting text-center col-xs-12">
				<div className="col-xs-6">
				    <Dropdown title="选择模板" btnStyle="primary template-select">
					    <Dropdown.Item closeOnClick>工作日</Dropdown.Item>
  					</Dropdown>
				</div>
				<div className="col-xs-2">设置</div>
				<div className="col-xs-2">日历</div>
				<div className="col-xs-2">清空</div>
		    </div>
		    {this.props.todayPlan.map((one, index) => {
				return <PlanItem key={'PlanItem' + index} data={one} lastTime={one.lastTime} />
			})}
			<div className="glyphicon glyphicon-plus plan-plus" onClick={(event)=>this.plusPlan(event)}></div></div>);

		return (
			<div className="content">
			    <div className="bg"></div>
				<div className="plan-header">
				    <Tabs defaultActiveKey="2" justify>
					    <Tabs.Item eventKey="1" title="昨天" className="col-xs-3">
					      昨天
					    </Tabs.Item>
					    <Tabs.Item eventKey="2" title={ today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '日'}>
					        {content}
					    </Tabs.Item>
					    <Tabs.Item eventKey="3" title="明天">
					      明天
					    </Tabs.Item>
					</Tabs>
				</div>
			</div>
		);
	}
}

export default Plan = connect(state => ({
     todayPlan: state.plans.todayPlan
}), dispatch => ({
     actions: bindActionCreators(AppAction, dispatch)
}))(Plan);