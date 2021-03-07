import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import 'semantic-ui-css/semantic.min.css'
// Page
import Dashboard from "./page/dashboard";
import Navigation from "./nav/Navigation";
import Login from "./page/login.js"
import Signup from "./page/signup"
import Mood from "./page/mood"
export default class AppRouter extends React.Component {
    render(){
        return(
            <Router>
                {/* <Navigation/> */}
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path="/mood">
                    <Mood />
                </Route>
            </Router>
        );
    }
}