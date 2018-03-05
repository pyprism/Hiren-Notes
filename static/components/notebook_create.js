import React from "react";
import ReactDOM from "react-dom";


class NotebookCreate extends React.Component {

    constructor(){
        super();
        this.state = {
            name: "",
            description: "",
            encryption: false
        }
    }

    handleNameChange(event){
        this.setState({name: event.target.value});
    }

    handleDescriptionChange(event){
        this.setState({description: event.target.value});
    }

    handleEncryptionChange(event){
        this.setState({encryption: event.target.value});
    }

    render() {

        const {name, description, encryption} = this.state;

        return(
            <form className="form-horizontal">
                <div className="row clearfix">
                    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                        <label>Name</label>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                        <div className="form-group">
                            <div className="form-line">
                                <input type="text" required value={name} onChange={this.handleNameChange.bind(this)} autoFocus className="form-control" placeholder="Type notebook name"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row clearfix">
                    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                        <label>Description</label>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                        <div className="form-group">
                            <div className="form-line">
                                <input type="text" value={description} onChange={this.handleDescriptionChange.bind(this)} className="form-control" placeholder="Optional description"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row clearfix">
                    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                        <label htmlFor="encryption">Encryption</label>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                        <div className="form-grou">
                            <div className="form-lin">
                                <input id='encryption' type="checkbox" required value={encryption} onChange={this.handleEncryptionChange.bind(this)} className="filled-in"/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
ReactDOM.render(<NotebookCreate />, document.getElementById("notebook_create"));