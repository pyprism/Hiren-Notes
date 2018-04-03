import React from "react";
import ReactDOM from "react-dom";
import swal from "sweetalert2";
import "regenerator-runtime/runtime";


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
                            data["fields"] = {"title": title.data, "content": content.data};
                            bunny.push(data);
                        } else {
                            nisha["pk"] = hiren["pk"];
                            nisha["fields"] = {
                                "title": hiren["fields"]["title"],
                                "content": hiren["fields"]["content"]
                            };
                            bunny.push(nisha);
                        }
                    })
                ).then(() => {
                    this.setState({data: bunny});
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
                            <a href={"/notebook/note/"+ this.state.data[0]["pk"] + "/edit/"}>
                                <button type="button" className="btn btn-info waves-effect">
                                    <i className="material-icons">edit</i>
                                    <span>Edit</span>
                                </button>
                            </a>

                            <a href={"/notebook/note/"+ this.state.data[0]["pk"] + "/delete/"}>
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
                <div className="text-center">Loading and decrypting note...</div>
            )
        }
        return (
            <div>{this.bunny()}</div>
        );
    }

}

ReactDOM.render(<NoteById />, document.getElementById("note_by_id"));
