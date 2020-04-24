import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    createNavs = () => {
        let links = [
            ["/users", "Users"],
            ["/users/create", "Create User"]];

        let rtn = [];

        for (let i = 0; i < links.length; i++){
            rtn.push(
                <li className="navbar-item">
                    <Link to={links[i][0]} className="nav-link">{links[i][1]}</Link>
                </li>);
        }

        return rtn;
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Home</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {this.createNavs()}
                    </ul>
                </div>
            </nav>
        );
    }
}