import {Link} from "react-router-dom";
import React from "react";


const Sidebar = () => {
    return (
        <div>
        <div className="overlay" />
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a href="javascript:void(0);" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"/>
                        <a href="javascript:void(0);" className="bars"/>
                        <Link className="navbar-brand" to="/" >Hiren Notes</Link>
                    </div>
                </div>
            </nav>
            <section>
                <aside id="leftsidebar" className="sidebar">
                    <div className="menu">
                        <ul className="list">
                            <li className="active">
                                <Link to="/notes">
                                    <i className="material-icons">note</i>
                                    <span>Notes</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/create">
                                    <i className="material-icons">note_add</i>
                                    <span>Create Note</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i className="material-icons">power_settings_new</i>
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
            </section>
        </div>
    );
}

export default Sidebar;