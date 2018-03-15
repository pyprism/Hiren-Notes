import React from "react";
import ReactDOM from "react-dom";


class NoteById extends React.Component{

    constructor(){
        super();
        this.state = {
            loading: true,
            data: ""
        }
    }

    loadData(){
        $.ajax(window.location.pathname, {
            contentType: "application/json",
            success: function(data) {
                this.setState({data: data});
                this.setState({loading: false});
            }.bind(this),
            error: function(data) {
                console.error(data);
            }
        });
    }

    componentDidMount(){
        this.loadData();
    }

    bunny(){
        return(
            <div>
                <div className="header">
                    <h2>
                        {this.state.data[0]["fields"]["title"]}
                    </h2>
                </div>
                <div  className="body">
                    {this.state.data[0]["fields"]["content"]}
                    <br/>
                    <br/>
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <a href="#">
                                <button type="button" className="btn btn-info waves-effect">
                                    <i className="material-icons">edit</i>
                                    <span>Edit</span>
                                </button>
                            </a>

                            <a href="#">
                                <button type="button" className="btn btn-danger waves-effect">
                                    <i className="material-icons">delete</i>
                                    <span>Delete</span>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if(this.state.loading){
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div>{this.bunny()}</div>
        );
    }

}

ReactDOM.render(<NoteById />, document.getElementById("note_by_id"));
