/**
 * Created by wjf55 on 2016/9/11.
 */

import '../css/banner.scss';
import React,{ Component } from 'react';
import {render} from 'react-dom';

//var BannerModule = () => {
//
//    let Banner = React.createClass({
//        render: function() {
//            return (
//                <section className='banner-list-module'>
//                    hahahha
//
//                </section>
//            );
//        }
//    });
//    ReactDOM.render(
//        <Banner  />,
//        document.getElementById('bannerWrap')
//    );
//}
//class Cat {
//    constructor(name,age){
//        this.name = name;
//        this.age = age;
//    }
//    speak(){
//        console.log(this.name);
//    }
//}
//class Lion extends Cat {
//    constructor(name){
//        super(name)
//    }
//    speak(){
//        super.speak();
//        console.log(this.name+'b');
//    }
//}
//var a = new Cat('a');
//a.speak();
//var b = new Lion('b');
//b.speak();
class DemoModule extends Component{
    constructor(){
        super();
        this.a = {
            a:'jiji'
        }
    }
    componentWillMount(){
        console.log(this.a.a);
        console.log('WillMount')
    }
    componentDidMount(){
        console.log('DidMount')
    }
    componentDidUpdate(){
        console.log('DidUpdate')
    }
    render() {
        return (
            <div>11111</div>
        )
    }

}
export class BannerModule extends Component {
    constructor(props){
        super();
        this.state = {
            count:props.count
        }
    }
    trick(){
        this.setState({
            count:this.state.count + 1
        })
    }
    render() {
            return (
                <section className='banner-list-module' onClick={this.trick.bind(this)}>
                    {this.props.count} {this.state.count}
                    <DemoModule />
                </section>
            );
        }
}
