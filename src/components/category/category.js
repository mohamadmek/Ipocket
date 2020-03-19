import React from 'react';
import {Dialog} from 'primereact/dialog';
import { Button } from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import "./category.css";

class category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {           
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
        const footer = (
			<div>
				<Button
					label='Create'
					icon='pi pi-check'
                    onClick={e=>this.handleform(e)}
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
        <>
        <div className="category_div">
            {this.props.chosen.map((item,i) =>
            <div className="category_div_inner">
                <div>
                    <p className="category_div_p1">{item.value}</p>
                </div>
                <div>
                    <button className="category_div_button">
                        <i class={item.label} aria-hidden="true" id="category_div_i" onClick={e=> this.setState({ visible: true })}></i>
                    </button>
                </div>
                {item.amount?item.amount.map((items)=>
                  <div>
                    <p className="category_div_inner1" id={this.props.desc==="expense"?"category_except":""}>{items.bal} {items.cur}</p>
                </div> 
                ):""}
            </div>
                )}{console.log(this.props.chosen)}
                 <Dialog
                     header='Create New Category'
                    footer={footer} 
                    visible={this.state.visible}
                    style={{width:'25%'}}
                    modal={true}
                    onHide={e => this.setState({ visible: false })}>
                <div className="category_popup_div2">
                    <div>
                        <input type="text" placeholder="Category Name" style={{width:'70%'}} id="category_popup_div2_input" ></input>
                    </div>
                    <div>
                    <Dropdown 
                        value={this.state.car2}
                        options={this.state.cars} 
                        onChange={e => this.onCarChange2(e)} 
                        itemTemplate={this.carTemplate}  
                        style={{width: '70%',margin:'10px 0px 0px 0px'}}
                        placeholder="choose icon"
                        showClear={true}/>
                    </div>
                </div>
                </Dialog>
            </div>
        </>
    	);
    }
}
export default category;