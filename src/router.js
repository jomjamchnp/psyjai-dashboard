import React,{component} from "react";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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
import MenuBar from "./page/menu"
import firebase from './firebasedb/firebaseconfig';
import { Menu } from "material-ui";


//const History = createHistory();   

export default class AppRouter extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            currentUser: null,
            logIn: localStorage.getItem('login')

        }     
    }

    componentDidMount() {
        const log = localStorage.getItem('login')
        if(log == "null" || log == null){
            localStorage.setItem('login',false)
            this.setState({
                logIn: localStorage.getItem('login')
            })
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                localStorage.setItem('login',true)
                this.setState({
                    currentUser: user,
                    logIn: localStorage.getItem('login')
                })
            }
        })
    }

    render(){ 
            if(this.state.logIn == "false"){
                return(
                    <Router>
                        <Route path="/"><Login /></Route>
                        <Redirect to="/" />
                    </Router>
                );
            }else if(this.state.logIn == "true"){
                return(
                    <Router>
                        <MenuBar path="/"/>
                        {/* <Switch>
                            <Route path="/dashboard" >
                                <Dashboard/>
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
                        </Switch> */}
                    </Router> 
                );
            }else{
                return (
                    <div>
                    </div>   
                );
            }
}

/* <Router>
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
</Router> */}