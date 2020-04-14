
import React, { Component, PureComponent } from 'react';
import {Dialog} from 'primereact/dialog';
import { Button } from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import "./category.css";
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

const currentdate = new Date();
const currentYear = currentdate.getFullYear();
const maxdate = new Date(currentdate.setYear(currentdate.getFullYear() + 1));

class category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {   
            temp:[],
            currency: [
                {label:"EURO",value: 'EURO'},
                { label:"LBP",value: 'LBP'} 
            ],
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
               /*  {value:'fa fa-donate', label:"Bank"}, */
                {value:'fa fa-gifts', label:"Gift"},
                {value:'fa fa-coffee', label:"Outside"},
                {value:'fa fa-paw', label:"Animals"},
                {value:'fa fa-plane', label:"Traveling"},
                {value:'fa fa-asterisk', label:"Other"}
            ],
            
            visibleEdit:false,
            transEdit:[] ,
            CatEdit:[],
            DialogEdit:false,
            DialogInput:[],
            year:"",
            month:"",
            day:"",
            title:""
        };
        
    }

    componentDidMount=()=>{
        let currentDay = new Date().getDate();
        let currentMonth = new Date().getMonth()+1;
        let currentYear = new Date().getFullYear();
        this.setState({year:currentYear, month:currentMonth, day:currentDay})
    }

    EditValue=(e)=>{
        let a= this.props.categories.filter(item => item.id == e.categories_id)
        this.setState({visibleEdit: true, transEdit: e, CatEdit:a[0].name }) 
    }
   

    editCategoryInput=(e)=>{
        let transEdit = {...this.state.transEdit}
        transEdit.title = e;
        this.setState({ transEdit })
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

    EditInput=(e)=>{
        let DialogInput = {...this.state.DialogInput}
        DialogInput.amount = e;
        this.setState({ DialogInput })
    }
    EditRadio=(e)=>{
        let DialogInput = {...this.state.DialogInput}
        DialogInput.flag = e;
        this.setState({ DialogInput })
    }

    EditDate=(e)=>{
        let DialogInput = {...this.state.DialogInput}
        DialogInput.start_date = e;
        this.setState({ DialogInput })
    }

    EditCurrency=(e)=>{
        let DialogInput = {...this.state.DialogInput}
        DialogInput.currencies_id = e;
        this.setState({ DialogInput })
        
    }
    
    titleHandler=(item)=>{
        let a;
        if(this.props.categories.length!=0){
            a=this.props.categories.filter(id => id.id == item.categories_id);
            return a[0].name
        }
    }

    currencyHandler=(item)=>{
        let a;
        a=this.props.currencies.filter(id => id.id == item.currencies_id)
        if(a.length !=0){
            return a[0].symbol;
        }  
    }
    
	render() {
        const footer = (
			<div>
				<Button
					label='Create'
					icon='pi pi-check'
                    onClick={e=>{this.setState({DialogEdit:false}); this.props.ChangeEditCatModelDB(this.state.DialogInput)}}
                    style={{backgroundColor:'#16a085',color:'white'}}
				/>
				<Button
					label='cancel'
					icon='fa fa-trash'
					onClick={e => this.setState({DialogEdit:false})}
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
                    onClick={(e)=>{this.setState({visibleEdit :false});this.props.editCategoryInput(this.state.transEdit,this.state.CatEdit)}}
                    style={{backgroundColor:'#16a085',color:'white'}}
				/>
				<Button
					label='cancel'
					icon='fa fa-trash'
                    onClick={()=>this.setState({ visibleEdit : false})}
                    className='p-button-secondary'
                    style={{color:'rgb(95,113,132)'}}
				/>
			</div>
		);
		return (
        <div className="category_div">
            {this.props.transactions.length ===0 && this.props.categories.length ===0 ? " ":
            this.props.transactions.map((item)=> item.type != this.props.desc ? " ":
            new Date(item.start_date).getFullYear() == this.state.year && new Date(item.start_date).getMonth()+1 == this.state.month && new Date(item.start_date).getDate() == this.state.day?
                <div className="category_div_inner">
                 <div>
                    <p className="category_div_p1">
                        {item.title}
                    </p>
                </div>
                <div className="category_div_inner1">
                    <div>
                    <button className="category_div_button">
                        <i class={this.titleHandler(item)} aria-hidden="true" id="category_div_i" onClick={e=> this.setState({DialogEdit: true ,  DialogInput:item , title: item.title}) }></i>
                    </button>
                    </div>
                    <div className="category_div_inner2_22">
                    <div><button className="category_div_inner2_button" onClick={(e)=> this.EditValue(item)}><i className="fas fa-edit"></i></button></div>
                    <div><button className="category_div_inner2_button"  onClick={e=> this.props.deleteCategories(item) }><i className="fas fa-trash"></i></button></div>
                    </div>
                </div>
                <div>
                    <p className="category_div_inner1" id={this.props.desc==="expense"?"category_except":""}>
                        <div style={{marginRight:'7px'}}>
                          {this.currencyHandler(item)}
                        </div>
                        <div>
                           {item.amount}
                        </div>

                    </p>
                </div> 
            </div>
                :"")}
 
                 <Dialog 
                    header={this.state.transEdit.title+ " " + this.props.desc}
                    footer={footer2} 
                    visible={this.state.visibleEdit}
                    style={{width:'25%'}}
                    modal={true}
                    closable={true}
                    onHide={()=>this.setState({ visibleEdit: false})}>
                <div className="category_popup_div2">
                  <div>    
                    <input 
                        type="text" 
                        placeholder="Category Name" 
                        style={{width:'70%'}} 
                        id="category_popup_div2_inputs" 
                        name="categoryInput" 
                        value={this.state.transEdit.title}
                        onChange={e=>this.editCategoryInput(e.target.value)}>
                    </input>
                    </div>
                    <div>

                    <Dropdown 
                        className="zeinab"
                        value={this.state.CatEdit}
                        onChange={e => this.setState({CatEdit:e.target.value}) }
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

                 <Dialog
                    header={this.state.title + " " + this.props.desc}
                    footer={footer} 
                    visible={this.state.DialogEdit}
                    style={{width:'25%'}}
                    modal={true}
                    onHide={e => this.setState({DialogEdit :false})}>
                <div className="category_popup_div2">
                    <div>
{/*                     <Dropdown 
                        value={this.state.curTemp}
                        options={this.state.currency} 
                        onChange={e => this.onChange(e)}
                        itemTemplate={this.carTemplate}  
                        style={{width: '70%',margin:'10px 0px 0px 0px'}}
                        placeholder="currency"
                        showClear={true}/> */}
                        
                        <select style={{width: '70%',margin:'10px 0px 0px 0px'}} onChange={(e) => this.EditCurrency(e.target.value)} className="category_select">
                            {this.props.currencies.map((item)=>
                                <option value={item.id}>{item.symbol}</option>
                             )}
                        </select>

                    <input
                        type="number"
                        placeholder="Amount"
                        id="category_popup_div2_inputs"
                        min="1"
                        value={this.state.DialogInput.amount}
                        onChange={(e) => this.EditInput(e.target.value)}
                        />
                        
                    <div className="category_popup_div2_drop" >
                        <div className="category_popup_div2-1">
                            <input
                                className="category_popup_div2-1_input"
                                type="radio"
                                name="radio_name"
                                value="fixed"
                                checked={this.state.DialogInput.flag==2 ? true : false}
                                onChange={(e) => this.EditRadio(2)} 
                                />
                            <label  className="category_popup_div2-1_label">Fixed</label>
                        </div>
                        <div style={{display:'flex'}}>
                            <input
                                type="radio"
                                name="radio_name"
                                className="category_popup_div2-1_input"
                                value="recurring"
                                checked={this.state.DialogInput.flag==1 ? true : false}
                                onChange={(e) => this.EditRadio(1)} 
                                />
                            <label className="category_popup_div2-1_label">Recurring</label>
                        </div>
                    </div>

                    <input 
                        type="date"
                        disabled={this.state.DialogInput.flag==2 ? true : false}
                        value={this.state.DialogInput.start_date}
                        onChange={(e) => this.EditDate(e.target.value)}
                        />
                    </div>
                <div>
            </div>
        </div> 
        </Dialog>
                
        </div>
    	);
    }
}
export default category;

