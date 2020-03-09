import React, { Component } from 'react';

export class AppFooter extends Component {

    render() {
        return  (
            <div className="layout-footer" style={{position:"absolute", bottom:"0px"}}>
                <span className="footer-text" style={{'marginRight': '5px'}}>PrimeReact</span>
                <img src="assets/layout/images/logo.svg" alt="" width="80"/>
                <span className="footer-text" style={{'marginLeft': '5px'}}>Theme and Layout</span>
            </div>
        );
    }
}