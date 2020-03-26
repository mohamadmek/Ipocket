import React from 'react';
import {Dialog} from 'primereact/dialog';
import { Button } from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import "./category.css";
import { NavDropdown } from 'react-bootstrap';

const currentdate = new Date();
const currentYear = currentdate.getFullYear();
const maxdate = new Date(currentdate.setYear(currentdate.getFullYear() + 1));
class category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {   
            temp:[],
            index:-1,
            currency: [
                {label:"EURO",value: 'EURO'},
                { label:"LBP",value: 'LBP'} 
            ],
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
            ],
        };
        
    }
    onCarChange2=(e)=> {
        let a;
        this.state.cars.map((item)=>item.value==e.value?a=item:"");
        this.setState({car2:e.value,newlabel:a.label});
     }

    onChange(e){
        this.setState({curTemp:e.value})
    }
    onRadio(e){
        this.setState({radio:e})
    }
    create(e){
        let a={cur:this.state.curTemp,bal:document.getElementById('category_popup_div2_inputs').value};
        let b= {label:this.props.chosen[this.state.index].label, value:this.props.chosen[this.state.index].value,cur:this.state.curTemp,bal:document.getElementById('category_popup_div2_inputs').value};
        this.props.chosen[this.state.index]=b;
        this.setState({ visible: false ,curTemp:"",index:-1});
    }
    inputvalue(e){
        this.setState({tempinput:e});
    }
    editCategories(e){console.log("tr",this.props.chosen[this.state.index])
        this.props.chosen[this.state.index].value=this.state.tempinput;
        this.props.chosen[this.state.index].label=this.state.newlabel;
        this.setState({tempinput:"",editing: false ,index:-1,newlabel:""})
    }
 
    deleteCat(i){
        this.props.chosen.splice(i,1);
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
                    onClick={e=>this.create(e)}
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
        const footer2= (
			<div>
				<Button
					label='Edit'
					icon='pi pi-check'
                    onClick={e=>this.editCategories()}
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
                <div className="category_div_inner1">
                    <div>
                    <button className="category_div_button">
                        <i class={item.label} aria-hidden="true" id="category_div_i" onClick={e=>this.setState({visible:true,index:i,temp:item}) }></i>
                    </button>
                    </div>
                    <div className="category_div_inner2_22">
                    <div><button className="category_div_inner2_button" onClick={e=>this.setState({editing:true,index:i,temp:item,tempinput:item.value})}><i className="fas fa-edit"></i></button></div>
                    <div><button className="category_div_inner2_button" onClick={e=>this.deleteCat(i)}><i className="fas fa-trash"></i></button></div>
                   </div>
                    
                   
                </div>
                {item.cur?
                  <div>
                    <p className="category_div_inner1" id={this.props.desc==="expense"?"category_except":""}>{item.bal} {item.cur}</p>
                </div> 
                :""}
            </div>
                )}
                 <Dialog
                     header={this.state.temp.value+" "+ this.props.desc}
                    footer={footer} 
                    visible={this.state.visible}
                    style={{width:'25%'}}
                    modal={true}
                    onHide={e => this.setState({ visible: false })}>
                <div className="category_popup_div2">
                    <div>
                    <Dropdown 
                        value={this.state.curTemp}
                        options={this.state.currency} 
                        onChange={e => this.onChange(e)}
                        itemTemplate={this.carTemplate}  
                        style={{width: '70%',margin:'10px 0px 0px 0px'}}
                        placeholder="currency"
                        showClear={true}/>
                    <input type="number" placeholder="Amount" id="category_popup_div2_inputs" min="1"></input>
                    <div className="category_popup_div2_drop" >
                        <div className="category_popup_div2-1">
                            <input className="category_popup_div2-1_input" type="radio" name="radio_name" value="fixed" onChange={e=>this.onRadio(e.target.value)}/>
                            <label  className="category_popup_div2-1_label">Fixed</label>
                        </div>
                        <div style={{display:'flex'}}>
                            <input type="radio" name="radio_name" className="category_popup_div2-1_input" value="recurring" onChange={e=>this.onRadio(e.target.value)}/>
                            <label className="category_popup_div2-1_label">Recurring</label>
                        </div>
                    </div>
                    <Calendar 
                        disabled={this.state.radio=="fixed"?false:true} 
                        value={this.state.date} 
                        onChange={(e) => this.setState({date: e.value})} 
                        placeholder="enter date if fixed"
                        maxDate={maxdate}
                        style={{width:'14rem'}}/>
                    </div>
                <div>
            </div>
        </div>
        </Dialog>
                 <Dialog
                     header={this.state.temp.value+" "+ this.props.desc}
                    footer={footer2} 
                    visible={this.state.editing}
                    style={{width:'25%'}}
                    modal={true}
                    onHide={e => this.setState({ editing: false })}>
                <div className="category_popup_div2">
                    <div>        
                    <input 
                    type="text" 
                    placeholder="Category Name" 
                    style={{width:'70%'}} 
                    id="category_popup_div2_inputs" 
                    name="zz" 
                    value={this.state.tempinput} 
                    onChange={e=>this.inputvalue(e.target.value)}></input>
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