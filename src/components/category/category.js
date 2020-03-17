import React from 'react';
import {Dialog} from 'primereact/dialog';
import { Button } from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import "./category.css";

class category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            car: null,
            car2: null,
           
            cars: [
                {label: 'fa fa-hospital', value: 'Hospital'},
                {label: 'fa fa-user-graduate', value: 'School'},
                {label: 'fa fa-running', value: 'Sports'},
                {label: 'fa fa-car-side', value: 'Car'},
                {label: 'fa fa-mobile-alt', value: 'Phone'},
                {label: 'fa fa-home', value: 'Home'},
                {label: 'fa fa-shopping-cart', value: 'Shopping'},
                {label: 'fa fa-tree', value: 'Nature'},
                {label: 'fa fa-utensils', value: 'Food'},
                {label:'fa fa-donate', value:"Bank"},
                {label:'fa fa-gifts', value:"Gift"},
                {label:'fa fa-coffee', value:"Outside"},
                {label:'fa fa-paw', value:"Animals"},
                {label:'fa fa-plane', value:"Traveling"},
                {label:'fa fa-asterisk', value:"Other"}
            ]
        };
        
    }

   

    carTemplate(option) {
        if(!option.value) {
            return option.label;
        }
        else {
            return (
                <div className="p-clearfix">
                    <i class={option.label} aria-hidden="true"  style={{display:'inline-block',fontSize:'24px'}}/>
                    <span style={{float:'right',margin:'.5em .25em 0 0'}}>{option.value}</span>
                </div>
            );
        }
    }
	render() {
		return (
        <div className="category_div">
            {this.state.cars.map((item,i) =>
            <div className="category_div_inner">
                <div>
                    <p className="category_div_p1">{item.value}</p>
                </div>
                <div>
                    <i class={item.label} aria-hidden="true" style={{fontSize:'50px', color:'rgb(95, 113, 132)'}} onClick={e => this.setState({ visible: true })}></i>
                </div>
                <div>
                    <p className="category_div_inner1" id={this.props.desc==="expense"?"category_except":""}>30 LBP</p>
                </div>
                <div className="category_div_inner2" id={this.props.desc==="expense"?"category_except":""}> 
                    <p>10 EUR</p>
                </div>
                
            </div>
                )}
                </div>
		);
	}
}
export default category;