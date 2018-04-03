import React from "react";
import ReactDOM from "react-dom";
import swal from "sweetalert2";
import "regenerator-runtime/runtime";


class Notebooks extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            data: ""
        }
    }

    loadData() {
        $.ajax("/notebook/", {
            contentType: "application/json",
            success: function (data) {
                let bunny = [];
                Promise.all(data.map(async (hiren, index) => {
                        let nisha = {};
                        if (hiren["fields"]["encrypted"]) {
                            let data = {};
                            let name_options = {
                                message: openpgp.message.readArmored(hiren["fields"]["name"]),
                                passwords: [sessionStorage.getItem("key")],
                                format: "utf8"
                            };
                            let description_options = {
                                message: openpgp.message.readArmored(hiren["fields"]["description"]),
                                passwords: [sessionStorage.getItem("key")],
                                format: "utf8"
                            };
                            let _name = await openpgp.decrypt(name_options);
                            let _description = await openpgp.decrypt(description_options);
                            data["pk"] = hiren["pk"];
                            data["fields"] = {"name": _name.data, "description": _description.data};
                            bunny.push(data);
                        } else {
                            nisha["pk"] = hiren["pk"];
                            nisha["fields"] = {
                                "name": hiren["fields"]["name"],
                                "description": hiren["fields"]["description"]
                            };
                            bunny.push(nisha);
                        }
                    })
                ).then(() => {
                    this.setState({data: bunny});
                    this.setState({loading: false});
                }).catch(() => {
                    swal("Oops...", "Secret key is not correct!", "error").then(() => {
                        window.location.replace("/secret/");
                    });
                });
            }.bind(this),
            error: function (data) {
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
                <div className="text-center">Notebook list is empty, create a new notebook.</div>
            )
        }
        return(this.state.data).map((data, index) => {
            return (
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12" key={ data["pk"] }>
                    <div className="card">
                        <div className="header">
                            <h2>
                                <a href={"/notebook/" + data["pk"]  + "/"}>{data["fields"]["name"]}</a>
                            </h2>
                        </div>
                        <div className="body">
                            <a href={"/notebook/" + data["pk"]  + "/"}>{data["fields"]["description"]}</a>
                        </div>
                    </div>
                </div>
            )
        });
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
ReactDOM.render(<Notebooks />, document.getElementById("notebooks"));