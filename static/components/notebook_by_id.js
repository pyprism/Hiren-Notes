import React from "react";
import ReactDOM from "react-dom";
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
                this.setState({data: data});
                this.setState({loading: false});
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
                <div className="text-center">Loading...</div>
            )
        }
        return (
            <div>{this.bunny()}</div>
        );
    }
}
ReactDOM.render(<NotebookById />, document.getElementById("notebook_by_id"));