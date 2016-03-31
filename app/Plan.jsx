import React from 'react';
import './plan.css';

export default class Plan extends React.Component {
	render() {
		var today = new Date();

		return (
			<div>
				<div className="header text-center">
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
				<div className="plan text-center">
				    <div className="col-xs-2">7:00</div>
				    <div className="col-xs-10">
					    <div className="btn btn-study">学习</div>
					    <div className="btn btn-info">工作</div>
					    <div className="btn btn-success">运动</div>
					    <div className="btn btn-warning">娱乐</div>
					    <div className="btn btn-primary">休息</div>
					    <div className="btn btn-danger">无效</div>
				    </div>
				</div>
				<div className="plus-plan"></div>
			</div>
		);
	}
}