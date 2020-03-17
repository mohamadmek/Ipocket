import React from 'react';
import {Dialog} from 'primereact/dialog';
import { Button } from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import "./categorypopup.css";

class categorypopup extends React.Component {
    constructor() {
        super();
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
        this.onCarChange2 = this.onCarChange2.bind(this);
    }

     onCarChange2(e) {
       this.setState({car2: e.value});
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
		const footer = (
			<div>
				<Button
					label='Create'
					icon='pi pi-check'
                    onClick={e => this.setState({ visible: false })}
                    style={{backgroundColor:'#16a085',color:'white'}}
				/>
				<Button
					label='cancel'
					icon='fa fa-trash'
					onClick={e => this.setState({ visible: false })}
                    className='p-button-secondary'
                    style={{color:'rgb(95,113,132)'}}
				/>
			</div>
		);
		return (
			<div className="category_popup_div1" >
              <div>
				<Dialog
					header='Create New Category'
					footer={footer}
                    visible={this.state.visible}
                    style={{width:'25%'}}
					modal={true}
					onHide={e => this.setState({ visible: false })}>
                <div className="category_popup_div2">
                    <div>
                    <input type="text" placeholder="Category Name" style={{width:'70%'}} ></input>
                    </div>
                    <div>
                    <Dropdown 
                        value={this.state.car2}
                        options={this.state.cars} 
                        onChange={this.onCarChange2} 
                        itemTemplate={this.carTemplate}  
                        style={{width: '70%',margin:'10px 0px 0px 0px'}}
                        placeholder="choose icon"
                        showClear={true}/>
                       </div> 
                </div>
                </Dialog>
                <i class="fa fa-plus-circle" aria-hidden="true" style={{fontSize:'40px', color:'rgb(209,0,0)'}} onClick={e => this.setState({ visible: true })}></i>
              </div>
              <div>
                  <p className="category_popup_p" onClick={e => this.setState({ visible: true })}>create category</p>
              </div>
			</div>
		);
	}
}
export default categorypopup;