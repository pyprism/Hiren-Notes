import React from "react";
import {Helmet} from "react-helmet";
import axios from "axios";
import Sidebar from "Sidebar";
import {Editor, EditorState} from 'draft-js';

export default class Create extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Hiren-Notes: Create New Note</title>
                </Helmet>
                <Sidebar/>
                <section className="content">
                    <div className="container-fluid">
                        create
                    </div>
                </section>

            </div>
        );
    }
}