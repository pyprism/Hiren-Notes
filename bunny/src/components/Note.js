import React from 'react';
import {Helmet} from "react-helmet";
import Sidebar from "Sidebar";


export default class Note extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Hiren-Notes: Note</title>
                </Helmet>
                <Sidebar/>
                <section className="content">
                    <div className="container-fluid">
                        Note
                    </div>
                </section>
            </div>
        );
    }
}
