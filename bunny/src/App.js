import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "components/Login";
import Notes from "components/Notes";
import Create from "components/Create";
import NoteBook from "components/NoteBook";
import {Notebook as NotebookStore } from "./stores/Notebook";



class App extends React.Component {
    noteStore = new NotebookStore();
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route path="/notebook" render={(props) => (<NoteBook notebook={this.noteStore} {...props}/>)} />/>
                    <Route path="/notes" component={Notes} />
                    <Route path="/create" component={Create} />
                </div>
            </Router>
        );
    }
}

export default App;
