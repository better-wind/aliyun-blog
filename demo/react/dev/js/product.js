import '../css/product.scss';
import React,{ Component } from 'react';
import render from 'react-dom';
import './zepto.js';

class ProductLi extends Component{
    render(){
        return (
            <li>
                <div className="view-img">
                    <img src={this.props.product.imgUrl} alt=""/>
                </div>
                <div className="view-msg">
                    <p>
                        {this.props.product.title}
                    </p>
                </div>
            </li>
        )
    }
}
class ProductUl extends Component{
    constructor(){
        super();
        this.state = {
            products:[]
        }
        this.ajaxSign= {
            isLast:false,
            isLoad:false,
        }
    }
    ajaxComm(url,callback){
        $.ajax({
            url:url,
            type:'post',
            dataType:'json',
            success:(rs) => callback && callback(rs)
        })
    }
    handleScroll(){
        if(document.body.scrollTop+document.documentElement.clientHeight+100 > document.body.scrollHeight){
            if(this.ajaxSign.isLast || this.ajaxSign.isLoad){
                return false
            }
            this.ajaxSign.isLoad = true;
            this.ajaxComm('/WebTry/WYSIWYG/web_framework/reactXq/dev/data/product2.json',(rs)=>{
                if(rs.data.products.length < 20){
                    this.ajaxSign.isLast = true;
                }
                this.setState({
                    products:this.state.products.concat(rs.data.products)
                });
            })
        }
    }
    componentWillMount(){
        this.ajaxSign.isLoad = true;
        this.ajaxComm(this.props.ajaxurl,(rs)=>{
            this.setState({
                products:this.state.products.concat(rs.data.products)
            });
        })
    }
    componentDidMount(){
        this.ajaxSign.isLoad = false;
        if(!this.ajaxSign.isLast && !this.ajaxSign.isLoad){
            window.addEventListener('scroll', this.handleScroll.bind(this));
        }else{
            window.removeEventListener('scroll', this.handleScroll.bind(this));
        }

    }
    componentDidUpdate(){
        this.ajaxSign.isLoad = false;
    }
    render(){
        let items = [];
        this.state.products.forEach(function(product){
            items.push(<ProductLi product={product} key={product.id}></ProductLi>)
        }.bind(this));
        return (
            <ul>{items}</ul>
        )
    }

}
export class ProductModule extends Component{
    render(){
        return (
            <section className="list-two-module">
                <ProductUl ajaxurl={this.props.ajaxurl}></ProductUl>
            </section>
        );
    }
}