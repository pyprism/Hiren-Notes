import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "components/Login";
import Notes from "components/Notes";
import Create from "components/Create";


class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route path="/notes" component={Notes} />
                    <Route path="/create" component={Create} />
                </div>
            </Router>
        );
    }
}

export default App;
