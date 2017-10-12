import React from 'react';
import {Helmet} from "react-helmet";
import Sidebar from "Sidebar";

export default class Notes extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Hiren-Notes: All Notes</title>
                </Helmet>
                <Sidebar/>
                <section className="content">
                    <div className="container-fluid">
                        Notes
                    </div>
                </section>
            </div>
        );
    }
}