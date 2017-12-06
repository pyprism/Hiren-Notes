import React from 'react';
import {Helmet} from "react-helmet";
import Sidebar from "Sidebar";

export default class NoteBook extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Hiren-Notes: Note Book</title>
                </Helmet>
                <Sidebar/>
                <section className="content">
                    <div className="container-fluid">
                        Note book
                    </div>
                </section>
            </div>
        );
    }
}