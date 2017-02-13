import React from 'react';
import { render } from 'react-dom';
import { Map,fromJS} from 'immutable';
import Person from './person.js';

class PersonMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : fromJS({
                name: '',
                age: '',
                persons: [],
            })
        }
    }
    _handleChange =(e) => {
        this.setState({data:this.state.data.update(''+[e.target.name],()=>e.target.value)})
    }
    _handleClick =() => {
        const name = this.state.data.get('name');
        const age = this.state.data.get('age');
        this.setState({data:this.state.data.update('name',()=> ' ')})
        this.setState({data:this.state.data.update('age',()=> ' ')})
        this.setState({data:this.state.data.update('persons',()=>this.state.data.get('persons').concat([{name: name,age: age}]))})
    }
    render() {
        const name = this.state.data.get('name');
        const age = this.state.data.get('age');
        const persons = this.state.data.get('persons');
        return (
            <div>
                <span>姓名:</span><input value={name} name="name" onChange={this._handleChange} type="text"></input>
                <span>年龄:</span><input value={age} name="age" onChange={this._handleChange} type="text"></input>
                <input type="button" onClick={this._handleClick} value="确认" ></input>
                {persons.map((person,index)=>{
                    return <Person key={index} name={person.name} age={person.age} />
                })}
            </div>
        )
    }
}
render(
    <PersonMap />
    , document.getElementById('bannerWrap')
);