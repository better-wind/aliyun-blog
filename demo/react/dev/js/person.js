import React from 'react';
import { render } from 'react-dom';
import { is,fromJS} from 'immutable';

export default class Person extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        const thisProps = this.props || {}, thisState = this.state || {};


        for (const key in nextProps) {
            if (!is(thisProps[key], nextProps[key])) {
                return true;
            }
        }

        for (const key in nextState) {
            if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
                return true;
            }
        }
        return false;
    }
    componentWillReceiveProps(newProps) {
        // console.log(`我新的props的name是${newProps.name}，age是${newProps.age}。我以前的props的name是${this.props.name}，age是${this.props.age}是我要re-render了`)
    }
    render() {
        const {name,age} = this.props;
        console.log(name+':re-render')
        return (
            <div>
                <span>姓名：</span><span>{name}</span>
                <span>年龄：</span><span>{age}</span>
            </div>
        )
    }
}