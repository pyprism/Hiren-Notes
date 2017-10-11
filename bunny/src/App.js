import React, { Component } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "components/Login";
import Notes from "components/Notes";
import Create from "components/Create";


class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Login} />
                <Route exact path="/notes" component={Notes} />
                <Route exact path="/create" component={Create} />
            </Router>
        );
    }
}

export default App;
