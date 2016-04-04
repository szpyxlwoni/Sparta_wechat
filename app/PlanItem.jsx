import React from 'react';

export default class PlanItem extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			...this.props.data
		}
		this.dragStartY = 0;
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
			this.setState({duration: parseInt(dragDistance / itemHeight) + 1});
		} else {
			this.setState({duration: 1});
		}
	}

	dragOver (e) {
		this.setState({isDraging:false});
	}

	setPlanName (e, type) {
		const plan = this.state;

		if (type === 1) {
			this.setState({name:'学习', type: 1});
		} else if (type === 2) {
			this.setState({name:'工作', type: 2});
		} else if (type === 3) {
			this.setState({name:'运动', type: 3});
		} else if (type === 4) {
			this.setState({name:'娱乐', type: 4});
		} else if (type === 5) {
			this.setState({name:'休息', type: 5});
		} else if (type === 6) {
			this.setState({name:'无效', type: 6});
		}
	}

	render () {
		var REM1P6 = rem2px(1.6);
		var REM2 = rem2px(2);
		var timeHeight = this.state.duration * REM2 || REM2;
		var selectorHeight = (this.state.duration - 1) * REM2 + REM1P6 || REM1P6;

		const planInSelector = this.state.type ? (<div className="btn btn-study col-xs-2">{this.state.name}</div>) : 
		               (<div><div className="btn btn-study col-xs-2" onClick={(event)=>this.setPlanName(event, 1)}>学习</div>
					    <div className="btn btn-info col-xs-2" onClick={(event)=>this.setPlanName(event, 2)}>工作</div>
					    <div className="btn btn-success col-xs-2" onClick={(event)=>this.setPlanName(event, 3)}>运动</div>
					    <div className="btn btn-warning col-xs-2" onClick={(event)=>this.setPlanName(event, 4)}>娱乐</div>
					    <div className="btn btn-primary col-xs-2" onClick={(event)=>this.setPlanName(event, 5)}>休息</div>
					    <div className="btn btn-danger col-xs-2" onClick={(event)=>this.setPlanName(event, 6)}>无效</div></div>)

		return (<div className={this.state.isDraging ? 'plan text-center draging' : 'plan text-center'} style={{height:timeHeight}}>
		    <div className="plan-time col-xs-2" onTouchStart={(event)=>this.dragPlan(event)} 
		            onTouchEnd={(event)=>this.dragOver(event)} onTouchMove={(event)=>this.dragingPlan(event)}>
		            {this.state.startHour + ':' + this.state.startMinute}
		    </div>
		    <div className="col-xs-10 plan-selector" style={{height:selectorHeight}}>
			    {planInSelector}
		    </div>
		</div>);
	}
}