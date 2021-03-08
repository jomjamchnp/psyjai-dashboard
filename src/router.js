import React,{component} from "react";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
// Page
import Dashboard from "./page/dashboard";
import Login from "./page/login.js"
import Signup from "./page/signup"
import Mood from "./page/mood"
import Homework from "./page/homework.js"
import Qa from "./page/qa.js"
import Tree from "./page/tree"
import Result from "./page/result"
import Intervention from "./page/intervention"

//const History = createHistory();   

export default class AppRouter extends React.Component {
    render(){
        return(
            // <Router history={history}>
                    
            //         <Route path="/login"/> <Login />
            //         <Route path="/signup"/> <Signup/>
            //         <Route path="/dashboard"> </Route>
            //         <Route path="/mood" component={Mood}></Route>
            //         <Route path="/qa" component={Qa}></Route>
            //         <Route path="/intervention" component={Intervention}></Route>
            //         <Route path="/tree" component={Tree}></Route>
            //         <Route path="/result" component={Result}></Route>
            //         <Route path="/homework" component={Homework}></Route>
    //     <BrowserRouter>
    //     <div>
    //     <Route path="/login" component={Login}></Route>
    //     <Route path="/dashboard" component={Dashboard}></Route>    
    //     <Route path="/mood" component={Mood}></Route>
    //     <Route path="/qa" component={Qa}></Route>
    //     <Route path="/intervention" component={Intervention}></Route>
    //     <Route path="/tree" component={Tree}></Route>
    //     <Route path="/result" component={Result}></Route>
    //     <Route path="/homework" component={Homework}></Route>
    //     </div>
    //   </BrowserRouter>        
            <Router>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/dashboard" >
                    <Dashboard />
                </Route>
                <Route path="/mood">
                    <Mood />
                </Route>
                <Route path="/qa">
                    <Qa />
                </Route>
                <Route path="/intervention">
                    <Intervention />
                </Route>
                <Route path="/tree">
                    <Tree />
                </Route>
                <Route path="/result">
                    <Result />
                </Route>
                <Route path="/homework">
                    <Homework />
                </Route>
            </Router>
        );
    }
}