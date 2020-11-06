import React, { Component } from 'react'
import { Link } from "react-router-dom";
class NavbarComponent extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-primary">
                    <a href="/produits" className="navbar-brand">
                        Confledis App
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                        <Link to={"/produits"} className="nav-link">
                            Produits
                        </Link>
                        </li>
                    </div>
                </nav>
            </div>
        )
    }
}
export default NavbarComponent
