import React from 'react';
import './plan.css';

export default class Plan extends React.Component {
	constructor () {
		super();
		this.state = {
			plan : {
				startHour : 7,
				startMinute : 30,
				name : '',
				note : ''
			}
		}
	}

	render () {
		return (
			<div>
				<div className="header">
				    <div>昨天</div>
				    <div>2016年3月3日</div>
				    <div>明天</div>
				</div>
				<div className="plan-setting">
				    <div><select><option>工作日</option></select></div>
				    <div>设置</div>
				    <div>日历</div>
				    <div>清空</div>
				</div>
				<div className="plan">
				    <div>{this.state.plan.startHour + ':' + this.state.plan.startMinute}</div>
				    <div>学习</div>
				    <div>工作</div>
				    <div>运动</div>
				    <div>娱乐</div>
				    <div>休息</div>
				    <div>无效</div>
				</div>
				<div className="plus-plan"></div>
			</div>
		);
	}
}