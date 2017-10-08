import React from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from "react-helmet";
import axios from "axios";


export default class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
    }

    handleUsernameChange(event){
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios({
            method: "post",
            url: "/api/auth/",
            data : {
                "username": this.state.username,
                "password": this.state.password
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function(error){
            console.error(error.response.data["error"]);
        })
    }

    render() {

        const {username, password} = this.state;

        return(
            <div className="login-box">
                <Helmet>
                    <title>Hiren-Notes: Login</title>
                </Helmet>
                <div className="logo">
                    <a href="javascript:void(0);">Hiren<b> Notes</b></a>
                    <small>Simple cross platform note taking apps </small>
                </div>
                <div className="card">
                    <div className="body">
                        <form id="sign_in" onSubmit={this.handleSubmit.bind(this)}>
                            <div className="msg">Sign in to start your session</div>
                            <div className="input-group">
                        <span className="input-group-addon">
                            <i className="material-icons">person</i>
                        </span>
                                <div className="form-line">
                                    <input type="text" className="form-control" onChange={this.handleUsernameChange.bind(this)} value={username} placeholder="Username" required autoFocus/>
                                </div>
                            </div>
                            <div className="input-group">
                        <span className="input-group-addon">
                            <i className="material-icons">lock</i>
                        </span>
                                <div className="form-line">
                                    <input type="password" className="form-control" value={password} onChange={this.handlePasswordChange.bind(this)} placeholder="Password" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="center-block">
                                        <button className="btn btn-block bg-pink waves-effect" type="submit">SIGN IN</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}