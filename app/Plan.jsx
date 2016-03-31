import React from 'react';
import './plan.css';
import _ from 'underscore';

export default class Plan extends React.Component {
	constructor (props) {
		super(props);
		this.state = {isDraging: false, times: 1};
		this.dragStartY = 0;
	}

	plusPlan (e) {

	}

	dragPlan (e) {
		this.setState({isDraging:true});
		this.dragStartY =  e.touches[0].screenY;
	}

	dragingPlan (e) {
		var touchEvent = e.touches[0];
		var dragDistance = touchEvent.clientY - touchEvent.target.offsetTop;
		var itemHeight = rem2px(1.6)
		if (dragDistance > itemHeight) {
			this.setState({times: parseInt(dragDistance / itemHeight) + 1});
		}
	}

	dragOver (e) {
		this.setState({isDraging:false});
	}

	setPlanName (e, type) {
	}

	render () {
		var today = new Date();
		var timeHeight = this.state.times * rem2px(1.6) || rem2px(1.6);

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
				<div className={this.state.isDraging ? 'plan text-center draging' : 'plan text-center'} style={{height:timeHeight}}>
				    <div className="plan-time col-xs-2" onTouchStart={(event)=>this.dragPlan(event)} 
				            onTouchEnd={(event)=>this.dragOver(event)} onTouchMove={(event)=>this.dragingPlan(event)}>7:00</div>
				    <div className="col-xs-10">
					    <div className="btn btn-study" onClick={(event)=>this.setPlanName(event, 0)}>学习</div>
					    <div className="btn btn-info">工作</div>
					    <div className="btn btn-success">运动</div>
					    <div className="btn btn-warning">娱乐</div>
					    <div className="btn btn-primary">休息</div>
					    <div className="btn btn-danger">无效</div>
				    </div>
				</div>
				<div className="glyphicon glyphicon-plus plan-plus" onClick={()=>this.plusPlan()}></div>
			</div>
		);
	}
}