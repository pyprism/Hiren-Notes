import React from 'react';
import {Helmet} from "react-helmet";
import Sidebar from "Sidebar";

export default class NoteBook extends React.Component {

    componentDidMount(){
        this.props.notebook.getNotebook();
    }

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
                    <div className="row clearfix">

                    </div>
                </section>
            </div>
        );
    }
}