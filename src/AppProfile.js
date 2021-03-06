import React, { Component } from 'react';
import classNames from 'classnames';

export class AppProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }

    handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })

            const result = await response.json();
            localStorage.clear();
            window.location='/'
        
        }catch(err) {
            console.log(err)
        }
    }

    render() {
        return  (
            <div className="layout-profile">
                {localStorage.getItem('token')==null?window.location='#/':
                <>
                <div>
                    <img src="assets/layout/images/profile.png" alt="" />
                </div>
                <button className="p-link layout-profile-link" /* onClick={this.onClick} */>
                    <span className="username"> {localStorage.getItem('name')}</span>
                </button>
                <ul className={classNames({'layout-profile-expanded': this.state.expanded})}>
                    <li><button className="p-link"><i className="pi pi-fw pi-user"/><span>Account</span></button></li>
                    <li><button className="p-link"><i className="pi pi-fw pi-inbox"/><span>Notifications</span><span className="menuitem-badge">2</span></button></li>
                    <li><button onClick={this.handleLogout} className="p-link"><i className="pi pi-fw pi-power-off"/><span>Logout</span></button></li>
                </ul>
                </>
        }
            </div>
        
        );
    }
}