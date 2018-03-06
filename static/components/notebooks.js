import React from "react";
import ReactDOM from "react-dom";
class Notebooks extends React.Component {

    constructor(props){
        super(props);
    }

    loadData() {
        $.ajax("/notebook/", {
            contentType: "application/json",
            success: function(data) {
                console.log(data[0]['fields']["name"]);
            },
            error: function(data) {
                console.error(data);
            }
        });
    }

    componentDidMount(){
       // this.loadData();
    }

    bunny(){
        $.ajax("/notebook/", {
            contentType: "application/json",
            success: function(data) {
                //console.log(data[0]['fields']["name"]);
                data.map((data, index) => {
                    return(
                        <div className="row clearfix" key={ data.id }>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div className="card">
                                    <div className="header">
                                        <h2>
                                            {data["fields"]["name"]}
                                        </h2>
                                    </div>
                                    <div className="body">
                                        Quis pharetra a pharetra fames blandit. Risus faucibus velit Risus imperdiet mattis neque volutpat, etiam lacinia netus dictum magnis per facilisi sociosqu. Volutpat. Ridiculus nostra.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            },
            error: function(data) {
                console.error(data);
            }
        });
    }

    render() {
        return (
            <div>{this.bunny()}ssa</div>
        );
    }
}
ReactDOM.render(<Notebooks />, document.getElementById("notebooks"));