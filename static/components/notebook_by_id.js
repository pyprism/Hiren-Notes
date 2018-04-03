import React from "react";
import ReactDOM from "react-dom";
import swal from "sweetalert2";
import "regenerator-runtime/runtime";


class NotebookById extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            data: ""
        }
    }

    loadData() {
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
        if(!this.state.data.length) {
            return(
                <div className="text-center">Notebook is empty, create a new note.</div>
            )
        }
        return(this.state.data).map((data, index) => {
            return (
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12" key={ data["pk"] }>
                    <div className="card">
                        <div className="header">
                            <h2>
                                <a href={"/notebook/note/" + data["pk"]  + "/"}>{data["fields"]["title"]}</a>
                            </h2>
                        </div>
                        <div className="body">
                            {data["fields"]["content"]}
                        </div>
                    </div>
                </div>
            )
        });
    }

    render() {
        if(this.state.loading){
            return (
                <div className="text-center">Loading and decrypting notes...</div>
            )
        }
        return (
            <div>{this.bunny()}</div>
        );
    }
}
ReactDOM.render(<NotebookById />, document.getElementById("notebook_by_id"));