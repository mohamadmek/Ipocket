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
            ],
            
        };
        this.onCarChange2 = this.onCarChange2.bind(this);
    }

     onCarChange2=(e)=> {
       this.setState({car2:e.value});
    }

    carTemplate(option) {
        if(!option.value) {
            return option.label;
        }
        else {
            return (
                <div className="p-clearfix">
                    <i class={option.label} aria-hidden="true"  id="clearfix_i" />
                    <span style={{float:'right',margin:'.5em .25em 0 0'}}>{option.value}</span>
                </div>
            );
        }
    }
    handleform(e){
        let c="";
        this.state.cars.map((item,i)=>
            item.value==this.state.car2?c=item.label:""
                );
        let newCategory=  {label:c, value:document.getElementsByClassName("category_popup_div2_input_name")['category_popup_div2_input'].value};
        this.setState({ visible: false });
         this.props.handle(newCategory);
    }

    componentDidMount=()=>{
        this.popInput.focus();
    }

     selectOption=(item)=>{     
        if(item.label== this.props.selectCategory){
            return <option value={item.label} selected> {item.value} Icon</option>  
        }
        return <option value={item.label} > {item.value} Icon</option>
    }

	render() {
		const footer = (
			<div>
				<Button
					label='Create'
					icon='pi pi-check'
                    onClick={e => this.props.createCategory(this.props.desc)}
                    style={{backgroundColor:'#16a085',color:'white'}}
				/>
				<Button
					label='cancel'
					icon='fa fa-trash'
					onClick={e => this.props.switchPop()}
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
                    visible={this.props.visibleCategoryPop}
                    style={{width:'25%'}}
					modal={true}
					onHide={e => this.props.switchPop()}>
                <div className="category_popup_div2">
                    <div>
                       
                    <input 
                        type="text"
                        placeholder="Category Name"
                        id="category_popup_div2_input"
                        className="category_popup_div2_input_name"
                        name="popInput"
                        ref={(input) => this.popInput = input }
                        value={this.props.InputPop}
                        onChange={(e) => this.props.setInputPop(e.target.value)}
                        ></input>
                    </div>
                    <div>
                   {/*  <Dropdown 
                        value={this.state.car2}
                        options={this.state.cars} 
                        onChange={e => this.onCarChange2(e)} 
                        itemTemplate={this.carTemplate}  
                        style={{width: '70%',margin:'10px 0px 0px 0px'}}
                        placeholder="choose icon"
                        showClear={true}/> */}

                    <select  onChange={(e)=>this.props.editSelectCat(e.target.value)} className="category_select">
                        {this.state.icon.map((item)=>
                            this.selectOption(item)
                        )}
                    </select>
                    </div>
                </div>
                </Dialog>
            </div>

            <div>
                <button className="category_popup_button">
                <i class="fa fa-plus-circle" aria-hidden="true" id="category_popup_i" onClick={e => this.props.switchPop()}></i>
                </button>
            </div>
           <div>
                <div className="category_popup_p" onClick={e => this.props.switchPop()}>create category</div>
            </div> 
		</div>
		);
	}
}
export default categorypopup;