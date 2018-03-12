import React from "react";
import ReactDOM from "react-dom";


class NoteById extends React.Component{

    constructor(){
        super();
        this.state = {
            loading: true
        }
    }

    bunny(){

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

ReactDOM.render(<NoteById />, document.getElementById("note_by_id"));
