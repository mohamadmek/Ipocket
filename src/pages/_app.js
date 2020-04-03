import React, {Component} from 'react';
import classNames from 'classnames';
import {AppTopbar} from '../AppTopbar';
import {AppMenu} from '../AppMenu';
import {AppProfile} from '../AppProfile';
import {Route} from 'react-router-dom';
import Tranaction from './transaction';
import Account from "./account/account";
import Login from './login';
import Save from "../components/Save/Save";
import Income from "../pages/income";
import Expense from "../pages/expense";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../layout/layout.scss';

class App extends Component {
    
    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            transactions: [],
            categories:[],
            currencies:[],
            flagCategory:false,
            
        };
        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.createMenu();
    }
    

    getTransactions = async () => {
        try {
            const response = await fetch('http://localhost:8000/transaction');
            const result = await response.json();
            
            if(result.status){
                this.setState({
                    transactions: result.transaction
                })
            }
        } catch (err) {
            console.log(err);
        }
        };

    getCategories = async () => {
        if(!this.state.flagCategory){
            try {
                const response = await fetch('http://localhost:8000/categories');
                const result = await response.json();  
                if(result.status){
                    this.setState({
                        categories: result.category,
                        flagCategory:true
                    });
                    console.log("l",this.state.categories)
                } 
            }catch (err) {
                console.log(err);
            }
        }
    };

    getCurrencies = async () => {
            try {
                const response = await fetch('http://localhost:8000/currencies');
                const result = await response.json();  
                if(result.status){
                    this.setState({
                    currencies: result.currencies
                    })
                } 
            } catch (err) {
                console.log(err);
            }
        };
    
    componentDidMount(){
        this.getTransactions();
        this.getCategories();
        this.getCurrencies();
    }

    deleteCategory=(id)=>{
        const items = this.state.categories.filter(item => item.id !== id);
        this.setState({ categories: items });
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            });
        }

        this.menuClick = false;
    }
    
    onToggleMenu(event) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });
        }

        event.preventDefault();
    }

    onSidebarClick(event) {
        this.menuClick = true;
    }

    onMenuItemClick(event) {
        if(!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }
    }

    createMenu() {
        this.menu = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => {window.location = '#/'}},
            {label: 'Income', icon: 'fas fa-download', command: () => {window.location = '#/income'}},
            {label: 'Expenses', icon: 'fas fa-upload', command: () => {window.location = '#/expense'}},
            {label: 'Transactions', icon:"fas fa-exchange-alt", command: () => {window.location = '#/transaction'}},
        ];
    }

    addClass(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }
       
    componentDidUpdate() {
        if (this.state.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    }

    render() {
        const logo = this.state.layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg': 'assets/layout/images/logo.svg';

        const wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });

        const sidebarClassName = classNames("layout-sidebar", {
            'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
            'layout-sidebar-light': this.state.layoutColorMode === 'light'
        });

        

        return (
            
            <div className={wrapperClass} onClick={this.onWrapperClick}>
                <AppTopbar onToggleMenu={this.onToggleMenu}/>
                <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
                    <div className="layout-logo">
                        <img alt="Logo" src={logo} />
                    </div>
                    <AppProfile />
                    <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
                </div>
            <div className="layout-main">
                <Route path="/transaction" component={() => ( <Tranaction /> )} />
                <Route path="/login" exact component={Login} />
                <Route path="/" exact component={Account} />
                <Route path="/save" exact  component={Save} />
                <Route path="/income" exact component={() => ( <Income
                                                                    transactions={this.state.transactions} 
                                                                    categories={this.state.categories}
                                                                    currencies={this.state.currencies}
                                                                    deleteCategory={this.deleteCategory}
                                                                    /> )} />
                <Route path="/expense" exact component={() => ( <Expense 
                                                                    transactions={this.state.transactions}
                                                                    categories={this.state.categories}
                                                                    currencies={this.state.currencies}
                                                                    deleteCategory={this.deleteCategory}
                                                                    /> )} />
            </div>

                <div className="layout-mask"></div>
            </div>
        );
    }
}

export default App;
