import React from "react";
import ReactDOM from "react-dom";
import swal from "sweetalert2";
import "regenerator-runtime/runtime";


class NoteEdit extends React.Component {
    constructor(){
        super();
        this.state = {
            title: "",
            content: "",
            encryption: false,
            loading: true,
            pk: ""
        }
    }

    handleTitleChange(event){
        this.setState({title: event.target.value});
    }

    handleContentChange(event){
        this.setState({content: event.target.value});
    }

    handleEncryptionChange(){
        this.setState({encryption: !this.state.encryption});
    }

    async handleSubmit(event){
        event.preventDefault();
        let csrfcookie = function() {
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
                url: window.location.pathname,
                data: {
                    "title": this.state.title,
                    "content": this.state.content,
                    "encrypted": this.state.encryption,
                    "pk": this.state.pk
                },
                success: function (data) {
                    if(data === "ok"){
                        window.location.replace(window.location.pathname);
                    } else {
                        console.error(data);
                        swal("Oops...", "Something went wrong!", "error");
                    }
                }
            });
        } else {
            openpgp.initWorker({ path:"/static/js/openpgp.worker.min.js" });
            let title_options = {
                data: this.state.title,
                passwords: [sessionStorage.getItem("key")],
                armor: true,
            };
            let content_options = {
                data: this.state.content,
                passwords: [sessionStorage.getItem("key")],
                armor: true,
            };
            let title = await openpgp.encrypt(title_options);
            let content = await openpgp.encrypt(content_options);

            $.ajax({
                type: "POST",
                beforeSend: function(request, settings) {
                    if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                        request.setRequestHeader("X-CSRFToken", csrfcookie());
                    }
                },
                url: window.location.pathname,
                data: {
                    "title": title["data"],
                    "content": content["data"],
                    "encrypted": true,
                    "pk": this.state.pk
                },
                success: function (data) {
                    if(data === "ok"){
                        window.location.replace(window.location.pathname);
                    } else {
                        console.error(data);
                        swal("Oops...", "Something went wrong!", "error");
                    }
                }
            });
        }
    }

    loadData(){
        $.ajax(window.location.pathname, {
            contentType: "application/json",
            success: function(data) {
                let bunny = [];
                Promise.all(data.map(async (hiren, index) => {
                        let nisha = {};
                        if (hiren["fields"]["encrypted"]) {
                            openpgp.initWorker({ path:"/static/js/openpgp.worker.min.js" });
                            let data = {};
                            let title_options = {
                                message: openpgp.message.readArmored(hiren["fields"]["title"]),
                                passwords: [sessionStorage.getItem("key")],
                                format: "utf8"
                            };
                            let content_options = {
                                message: openpgp.message.readArmored(hiren["fields"]["content"]),
                                passwords: [sessionStorage.getItem("key")],
                                format: "utf8"
                            };
                            let title = await openpgp.decrypt(title_options);
                            let content = await openpgp.decrypt(content_options);
                            data["pk"] = hiren["pk"];
                            data["fields"] = {"title": title.data, "content": content.data, encryption: true};
                            bunny.push(data);
                        } else {
                            nisha["pk"] = hiren["pk"];
                            nisha["fields"] = {
                                "title": hiren["fields"]["title"],
                                "content": hiren["fields"]["content"],
                                "encryption": false
                            };
                            bunny.push(nisha);
                        }
                    })
                ).then(() => {
                    this.setState({
                        title: bunny[0]["fields"]["title"], content: bunny[0]["fields"]["content"],
                        encryption: bunny[0]["fields"]["encryption"], pk: bunny[0]["pk"]
                    });
                    this.setState({loading: false});
                }).catch(x => {
                    console.error(x);
                    swal("Oops...", "Secret key is not correct!", "error").then(() => {
                        window.location.replace("/secret/");
                    });
                });
            }.bind(this),
            error: function(data) {
                console.error(data);
            }
        });
    }

    componentDidMount(){
        this.loadData();
    }

    render() {

        const {title, content, encryption} = this.state;
        if(this.state.loading){
            return (
                <div className="text-center">Loading and decrypting note...</div>
            )
        }
        return(
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <div className="row clearfix">
                    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                        <label>Title</label>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                        <div className="form-group">
                            <div className="form-line">
                                <input type="text" required value={title} onChange={this.handleTitleChange.bind(this)} autoFocus className="form-control" placeholder="Type note's title"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row clearfix">
                    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                        <label>Content</label>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                        <div className="form-group">
                            <div className="form-line">
                                <textarea  value={content} onChange={this.handleContentChange.bind(this)} className="form-control" placeholder="Type note"/>
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
                <div className="row clearfix">
                    <div className="col-lg-offset-2 col-md-offset-2 col-sm-offset-4 col-xs-offset-5">
                        <button type="submit" className="btn btn-info m-t-15 waves-effect">
                            <i className="material-icons">update</i>
                            <span>Update</span>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

ReactDOM.render(<NoteEdit />, document.getElementById("note_edit"));