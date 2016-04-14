import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as AppAction from './actions/AppAction.jsx';
import { bindActionCreators } from 'redux';

class PlanItem extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			...this.props.data,
			isDraging : false,
			isAddingNote : false
		}
		this.dragStartY = 0;
	}

	componentDidUpdate () {
		if (this.state.isAddingNote) {
			const textArea = ReactDOM.findDOMNode(this.refs.textArea);
			textArea.value = this.state.note;
			textArea.focus();
		}
	}

	dragPlan (e) {
		this.setState({isDraging:true});
		this.dragStartY =  e.touches[0].screenY;
	}

	dragingPlan (e) {
		e.preventDefault();

		var touchEvent = e.touches[0];
		var dragDistance = touchEvent.clientY - touchEvent.target.offsetTop - this.state.lastTime * rem2px(2);
		var itemHeight = rem2px(1.6)
		if (dragDistance > itemHeight) {
			this.setState({duration: parseInt(dragDistance / itemHeight)});
		} else {
			this.setState({duration: 1});
		}
		this.props.actions.changePlan(this.state);
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

	startTime () {
		const lastTime = this.props.lastTime;
		let decimal = parseInt(lastTime / 2);
		let part = lastTime % 2;
		let minute = '';

		if (part === 1) {
			minute = '30';
		} else {
			minute = '00';
		}

		return (7 + decimal) + ':' + minute;
	}

	getItemByType () {
		const type = this.state.type;
		let classses = 'btn col-xs-2 ';

		if (type === 1) {
			classses += 'btn-study';
		} else if (type === 2) {
			classses += 'btn-info';
		} else if (type === 3) {
			classses += 'btn-success';
		} else if (type === 4) {
			classses += 'btn-warning';
		} else if (type === 5) {
			classses += 'btn-primary';
		} else if (type === 6) {
			classses += 'btn-danger';
		}

		return (<div className={classses}>{this.state.name}</div>);
	}

	addNote () {
		if (this.state.type) {
    		this.setState({isAddingNote : true});
		}
	}

	onKeyDown (e) {
		var keycode = e.which;
		if (keycode !== 13) { 
			return;
		}

		this.setState({note : e.target.value});
		this.setState({isAddingNote : false});
	}

	render () {
		var REM1P6 = rem2px(1.6);
		var REM2 = rem2px(2);
		var timeHeight = this.state.duration * REM2 || REM2;
		var selectorHeight = (this.state.duration - 1) * REM2 + REM1P6 || REM1P6;
		var textTop = (selectorHeight - rem2px(0.5)) / 2;

		const textArea = this.state.isAddingNote ? (<div><textArea ref="textArea" 
			onKeyDown={(event) => this.onKeyDown(event)} /></div>) : (<div></div>);

		const planInSelector = this.state.type ? (this.getItemByType()) :
		               (<div><div className="btn btn-study col-xs-2" onClick={(event)=>this.setPlanName(event, 1)}>学习</div>
					    <div className="btn btn-info col-xs-2" onClick={(event)=>this.setPlanName(event, 2)}>工作</div>
					    <div className="btn btn-success col-xs-2" onClick={(event)=>this.setPlanName(event, 3)}>运动</div>
					    <div className="btn btn-warning col-xs-2" onClick={(event)=>this.setPlanName(event, 4)}>娱乐</div>
					    <div className="btn btn-primary col-xs-2" onClick={(event)=>this.setPlanName(event, 5)}>休息</div>
					    <div className="btn btn-danger col-xs-2" onClick={(event)=>this.setPlanName(event, 6)}>无效</div></div>)

		return (<div className={this.state.isDraging ? 'plan text-center draging' : 'plan text-center'} style={{height:timeHeight}}>
		    <div className="plan-time col-xs-2" onTouchStart={(event)=>this.dragPlan(event)} 
		            onTouchEnd={(event)=>this.dragOver(event)} onTouchMove={(event)=>this.dragingPlan(event)}>
		            {this.startTime()}
		    </div>
		    <div className="plan-text" style={{top : textTop, display : this.state.isAddingNote ? 'none' : 'inline-block'}} 
		        onClick={() => this.addNote()} >{this.state.note}</div>
		    <div className="col-xs-10 plan-selector" style={{height:selectorHeight}} onClick={() => this.addNote()} >
			    {planInSelector}
			    {textArea}
		    </div>
		</div>);
	}
}

export default PlanItem = connect(state => ({
}), dispatch => ({
     actions: bindActionCreators(AppAction, dispatch)
}))(PlanItem);