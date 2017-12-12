import React from 'react';
import {Helmet} from "react-helmet";
import Sidebar from "Sidebar";
import { observer } from "mobx-react";
import { toJS } from "mobx";


let NoteBook = observer(class NoteBook extends React.Component {

    componentDidMount(){
        this.props.notebook.getNotebook();
    }

    bunny() {
        console.log(toJS(this.props.notebook.notebook));
        console.log(toJS(this.props.notebook.loadingText));
        return (this.props.notebook.notebook).map((data, index) => {
            return (
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12" key={ data.id }>
                    <div className="card">
                        <div className="header">
                            <h2>
                                { data.name }
                            </h2>
                        </div>
                    </div>
                </div>
            )
        });
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
                        {this.bunny()}
                    </div>
                </section>
            </div>
        );
    }
});

export default NoteBook;