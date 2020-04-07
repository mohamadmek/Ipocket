
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
            categories:[],
            categoriesProps:[],
            transactionsProps:[],
            visibleEdit:false,
            tempinput:"",
            title:"",
            SelectCategory:"",
            transactionId:-1,
            categoryId:-1,
        };
        
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

    componentDidMount=()=>{
        this.categoryInput.focus();
        if(this.props.categories!=0 && this.props.transactions.length!=0)
            this.categories();
    }
    categories=()=>{
        let i=[];
        this.props.transactions.map((item)=>{
            this.props.desc=="income"?
                i.push(this.props.categories.filter(id=>id.id==item.categories_id && item.type=="income")):
                i.push(this.props.categories.filter(id=>id.id==item.categories_id && item.type=="expense")) 
            });
            this.setState({categories:i})
         }
    
    currencyTransacion=(currency)=>{
        let s=this.props.currencies.filter(id => id.id==currency)[0].symbol;
        return s;
    }

    headername=(item)=>{
        let b=this.state.categoriesProps.filter(id => id.id == item.categories_id);
        //this.setState({title:b[0].title, temp:b[0].title ,transactionId:b[0].id,categoryId:item[0].id})
        this.setState({title:item.title, temp:item.title, transactionId:item.id, flag:true,categoryId:b[0].id})
        return

    }
    
    titleHandler=(item)=>{
        let a;
        if(this.state.categoriesProps.length!=0){
            a=this.state.categoriesProps.filter(id =>id.id==item.categories_id);
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
    
     componentDidMount=()=>{
        this.setState({transactionsProps:this.props.transactions,categoriesProps:this.props.categories})
        document.getElementById('category_popup_div2_inputs').focus();
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
                    /* onClick={e=>this.create(e)} */
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
                    onClick={e=>this.props.editCategoryInput()}
                    style={{backgroundColor:'#16a085',color:'white'}}
				/>
				<Button
					label='cancel'
					icon='fa fa-trash'
                    onClick={(e)=>this.props.cancel()}
                    className='p-button-secondary'
                    style={{color:'rgb(95,113,132)'}}
				/>
			</div>
		);
		return (
        <div className="category_div">
            {this.state.categoriesProps.length === 0 && this.state.transactionsProps.length === 0?"":
            this.state.transactionsProps.map((item) =>
                item.type !== this.props.desc ?"":
                <div className="category_div_inner">
                 <div>
                    <p className="category_div_p1">
                        {item.title}
                    </p>
                </div>
                <div className="category_div_inner1">
                    <div>
                    <button className="category_div_button">
                        <i class={this.titleHandler(item)} aria-hidden="true" id="category_div_i" /* onClick={e=>this.setState({visible:true,index:i,temp:item}) } */></i>
                    </button>
                    </div>
                    <div className="category_div_inner2_22">
                    <div><button className="category_div_inner2_button" onClick={()=>this.props.switch(item) }><i className="fas fa-edit"></i></button></div>
                    <div><button className="category_div_inner2_button"  onClick={e=>this.props.deleteCategories(item)}><i className="fas fa-trash"></i></button></div>
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
                )}
 
                 <Dialog
                   header={this.props.titleCategory + " " + this.props.desc}
                    footer={footer2} 
                    visible={this.props.flagEdit}
                    style={{width:'25%'}}
                    modal={true}
                    closable={true}
                    /* onHide={e =>this.props.switchCategoryFlag()}> */
                    onHide={e=>this.props.cancel()}>
                <div className="category_popup_div2">
                  <div>    
                    <input 
                        type="text" 
                        placeholder="Category Name" 
                        style={{width:'70%'}} 
                        id="category_popup_div2_inputs" 
                        name="categoryInput" 
                        value={this.props.categoryInput}
                        onChange={e=>this.props.editCategory(e.target.value)}
                        ref={(input) => { this.categoryInput = input }}>
                    </input>
                    </div>
                    <div>
              
                        <select  onChange={(e)=>this.props.editSelectCat(e.target.value)} className="category_select">
                             {this.state.icon.map((item)=>
                             this.selectOption(item)
                             )}
                        </select>
                      

                    </div>
                </div>
                </Dialog>
                
        </div>
    	);
    }
}
export default category;

               {/* <Dialog
                    header={this.state.temp.value+" "+ this.props.desc}
                    footer={footer} 
                    visible={this.props.flagCategory}
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
        </Dialog>*/}

              {/*    <Dropdown 
                      className="zeinab"
                        value={this.state.cars}
                        options={this.state.cars} 
                        //onChange={e =>this.onCarChange2(e) }
                        style={{width: '70%',margin:'10px 0px 0px 0px'}}
                        placeholder="choose icon"
                        showClear={true}
                        
                        //onMouseDown={e=>this.onCarChange2(e)}
                        //onFocus={e=>this.onCarChange2(e)}
                        placeholder="ZEINAB"
                        />  */}
