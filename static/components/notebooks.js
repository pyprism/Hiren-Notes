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

    async pgp(name, description) {
        let name_options = {
            message: openpgp.message.readArmored(name),
            passwords: [sessionStorage.getItem("key")],
            format: "utf8"
        };
        let description_options = {
            message: openpgp.message.readArmored(description),
            passwords: [sessionStorage.getItem("key")],
            format: "utf8"
        };

        return await openpgp.decrypt(name_options);
    }

    loadData() {

        $.ajax("/notebook/", {
            contentType: "application/json",
            success: function (data) {
                let bunny = [];
                data.map((hiren, index) => {
                    let nisha = {};
                    if (hiren["fields"]["encrypted"]) {
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
                        // try {
                        //     openpgp.decrypt(name_options).then(function(plaintext) {
                        //         let name = plaintext.data;
                        //
                        //         openpgp.decrypt(description_options).then(function(text) {
                        //             let description = text.data;
                        //
                        //             nisha["pk"] = hiren["pk"];
                        //             nisha["fields"] = {"name": name, "description": description};
                        //             bunny.push(nisha);
                        //             console.log(this.state.data);
                        //         }.bind(this))
                        //     }.bind(this))
                        // } catch (e) {
                        //     console.error(e);
                        // }
                        // async () => {
                        //     let x = await openpgp.decrypt(name_options);
                        //     console.log("Sasasasasdfsdvdf");
                        //     console.log(x);
                        // }
                    } else {
                        nisha["pk"] = hiren["pk"];
                        nisha["fields"] = {
                            "name": hiren["fields"]["name"],
                            "description": hiren["fields"]["description"]
                        };
                        bunny.push(nisha);
                    }
                });
                this.setState({data: bunny});
                console.log("sasas");
                console.log(this.state.data);
            }.bind(this),
            error: function (data) {
                console.error(data);
            }
        });
    }

    componentDidMount(){
        this.loadData();
        //this.setState({loading: false});
    }

    bunny(){
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