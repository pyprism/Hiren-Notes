import React from "react";
import {Helmet} from "react-helmet";
import axios from "axios";
import Sidebar from "Sidebar";

export default class Create extends React.Component {
    render() {
        return (
            <div>
                <Sidebar/>
                <Helmet>
                    <title>Hiren-Notes: Create New Note</title>
                </Helmet>
                <section className="content">
                    <div className="container-fluid">
                        create
                    </div>
                </section>

            </div>
        );
    }
}