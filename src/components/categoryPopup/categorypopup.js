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
            carLabel:null,
           
            icon: [
                {value: 'fa fa-hospital', label: 'Hospital'},
                {value: 'fa fa-user-graduate', label: 'School'},
                {value: 'fa fa-running', label: 'Sports'},
                {value: 'fa fa-car-side', label: 'Car'},
                {value: 'fa fa-mobile-alt', label: 'Phone'},
                {value: 'fa fa-home', label: 'Home'},
                {value: 'fa fa-shopping-cart', label: 'Shopping'},
                {value: 'fa fa-tree', label: 'Nature'},
                {value: 'fa fa-utensils', label: 'Food'},
                {value:'fa fa-donate', label:"Bank"},
                {value:'fa fa-gifts', label:"Gift"},
                {value:'fa fa-coffee', label:"Outside"},
                {value:'fa fa-paw', label:"Animals"},
                {value:'fa fa-plane', label:"Traveling"},
                {value:'fa fa-asterisk', label:"Other"}
            ],
            visible:false,
            EditInput:"",
            CategoryChosen:"",
            
        };
    }

    IconTemplate(option) {
        if(!option.value) {
            return option.label;
        }
        else {
            return (
                <div className="p-clearfix">
                    <i class={option.value} aria-hidden="true"  style={{display:'inline-block',fontSize:'24px'}}/>
                    <span style={{float:'right',margin:'.5em .25em 0 0'}}>{option.label}</span>
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
                    onClick={e =>{this.setState({visible:false, EditInput:"", CategoryChosen:""}) ;this.props.createCategory(this.props.desc,this.state.EditInput,this.state.CategoryChosen)}}
                    style={{backgroundColor:'#16a085',color:'white'}}
				/>
				<Button
					label='cancel'
					icon='fa fa-trash'
					onClick={e => this.setState({visible:false})}
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
					onHide={e => this.setState({visible:false})}>
                <div className="category_popup_div2">
                    <div>
                       
                    <input 
                        type="text"
                        placeholder="Category Name"
                        id="category_popup_div2_input"
                        className="category_popup_div2_input_name"
                        name="popInput"
                        value={this.state.EditInput}
                        onChange={(e) => this.setState({EditInput:e.target.value})}
                        ></input>
                    </div>
                    <div>
                   
                    <Dropdown 
                        className="zeinab"
                        value={this.state.CategoryChosen}
                        onChange={e => this.setState({CategoryChosen:e.target.value}) }
                        options={this.state.icon}
                        style={{width: '70%',margin:'10px 0px 0px 0px'}}
                        placeholder="choose icon"
                        showClear={true}
                        placeholder="choose category"
                        itemTemplate={this.IconTemplate}
                    /> 
                    </div>
                </div>
                </Dialog>
            </div>

            <div>
                <button className="category_popup_button">
                <i class="fa fa-plus-circle" aria-hidden="true" id="category_popup_i" onClick={e => this.setState({visible:true})}></i>
                </button>
            </div>
           <div>
                <div className="category_popup_p" onClick={e => this.setState({visible:true})}>create category</div>
            </div> 
		</div>
		);
	}
}
export default categorypopup;