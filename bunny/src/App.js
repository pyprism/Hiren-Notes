import React, { Component } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "components/Login";
// import "static/css/bootstrap.min.css";
// import "static/css/waves.min.css";
// import "static/css/animate.min.css";
// import "static/css/style.min.css";


class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Login} />
            </Router>
        );
    }
}

export default App;
