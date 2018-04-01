import React from "react";
import ReactDOM from "react-dom";
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
            success: function(data) {
                this.setState({data: data});
                this.setState({loading: false});
                console.log(data);
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