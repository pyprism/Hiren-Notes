import React from "react";
import ReactDOM from "react-dom";
import swal from "sweetalert2";


class NotebookCreate extends React.Component {

    constructor(){
        super();
        this.state = {
            name: "",
            iteration: 2000,
            description: "",
            encryption: false,
            success: false
        }
    }

    handleNameChange(event){
        this.setState({name: event.target.value});
    }

    handleDescriptionChange(event){
        this.setState({description: event.target.value});
    }

    handleEncryptionChange(){
        this.setState({encryption: !this.state.encryption});
    }

    handleIterationChange(event){
        this.setState({iteration: event.target.value});
    }

    range(){ // form field
        const {iteration} = this.state;
        return(
            <div>
                <div className="row clearfix">
                    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                        <label>Iteration</label>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                        <div className="form-group">
                            <div className="form-line">
                                <input type="number" required value={iteration} onChange={this.handleIterationChange.bind(this)} className="form-control" min="0"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleSubmit(event){
        event.preventDefault();
        let csrfcookie = function() {  // for django csrf protection
            let cookieValue = null,
                name = "csrftoken";
            if (document.cookie && document.cookie !== "") {
                let cookies = document.cookie.split(";");
                for (let i = 0; i < cookies.length; i++) {
                    let cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) == (name + "=")) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        };


        if(!this.state.encryption){
            $.ajax({
                type: "POST",
                beforeSend: function(request, settings) {
                    if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                        request.setRequestHeader("X-CSRFToken", csrfcookie());
                    }
                },
                url: "/notebook/create/",
                data: {
                    "name": this.state.name,
                    "description": this.state.description,
                    "encrypted": this.state.encryption
                },
                success: function (data) {
                    if(data === "success"){
                        swal("Success", "New notebook has been created.", "success");
                    } else {
                        swal("Oops...", "Something went wrong!", "error");
                    }
                }
            });
        } else {


        }
    }

    render() {

        const {name, description, encryption} = this.state;

        return(
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
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
                        <label>Encryption</label>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                        <div className="form-group">
                            <div className="checkbox-inline">
                                <input id='encryption' type="checkbox" defaultChecked={encryption} onChange={this.handleEncryptionChange.bind(this)} className="filled-in"/>
                                <label htmlFor="encryption">Encrypt content</label>
                            </div>
                        </div>
                    </div>
                </div>
                {encryption? this.range() : null}
                <div className="row clearfix">
                    <div className="col-lg-offset-2 col-md-offset-2 col-sm-offset-4 col-xs-offset-5">
                        <button type="submit" className="btn btn-info m-t-15 waves-effect">
                            <i className="material-icons">create</i>
                            <span>Create</span>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}
ReactDOM.render(<NotebookCreate />, document.getElementById("notebook_create"));