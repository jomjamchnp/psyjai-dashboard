import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Card,Divider } from 'semantic-ui-react'
import { Col,Form,Button } from 'react-bootstrap'
import '../css/login.css'
//import firebase from '../../function/firebaseConfig';
import { history } from '../history'
import { useHistory ,useLocation} from "react-router-dom";
import firebase from '../firebasedb/firebaseconfig';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import provider from './facebook.js' 

class LOGIN extends React.Component {
    constructor(props) {   
    super();
    //this.sigin_success = this.sigin_success.bind(this);
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      isLoading: false,
      isSignedIn: false, // Local signed-in state.
    }
  }
  handleclick = () => {
    const history = () => useHistory;
    history.push('/signup')
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
    console.log(state)
  }

  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google , Facebook , Etc as auth providers.
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccess: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );    
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  userLogin = async () => {
    if(Object.keys(this.state.email).length === 0 && Object.keys(this.state.password).length === 0) {
      console.log('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        // The signed-in user info.
        var user = result.user;
        this.setState({
          displayName: user,
        })
        console.log(user)
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;
        localStorage.setItem('login',true);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
    
        // ...
      });
    }
  }
    //   firebase
    //   .auth()
    //   .signInWithEmailAndPassword(this.state.email, this.state.password)
    //   .then((res) => {
    //     console.log('User logged-in successfully!')
    //     console.log(this.state.displayName)
    //     this.setState({
    //       isLoading: false,
    //       displayName:'',
    //       email: '', 
    //       password: ''
    //     })
    //     history.push('/dashboard')

    //   })
    //   .catch(error => this.setState({ errorMessage: error.message }))
    // }
    // UserForm = (props) => {
    //   const [state, setState] = useState({
    //     name: '',
    //   });
    // }

  render(){
    // const sigin_success = (props) => {
    //   let history = useHistory();
    //   history.push({
    //     pathname: '/dashboard',
    //     Data : firebase.auth().currentUser.displayName
    //   });
    // }
    //var name = 
    //console.log(this.displayName)
    if (this.state.isSignedIn){
      console.log(firebase.auth().currentUser.displayName)
      history.push({
            pathname: '/dashboard',
            Data : firebase.auth().currentUser.displayName
          });
      //this.sigin_success()
      // this.props.history.push({
      //   pathname: '/dashboard',
      //   Data : firebase.auth().currentUser.displayName
      // });
    }
    // var user = firebase.auth().currentUser;
    // var name;
    // if (user != null) 
    // {  name = user.displayName; 
    // }
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }  
    if (!this.state.isSignedIn) {
      return (
        <div class="bg">
   
            <Card id="login" style={{width:'30em',height:'17em'}}>
            <label style={{color: '#008891',fontSize: '30px',marginTop: '25px'}}>Psyjai</label>
            <Divider style={{margin: '25px'}}  />
            <label  style={{fontSize: '18px'}}>กรุณาเข้าสู่ระบบ</label>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
            </Card>
     
        </div>
      );
    }  

    return ( 
        <div>
          <Card id="login" style={{width:'30em'}}>
            <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
            <Button onClick={() => firebase.auth().signOut()}>Sign-out</Button>
          </Card>
           
          {/* //<Image size="tiny" id="photo" src={firebase.auth().currentUser.photoURL}/> */}
          
        
          {/* <Card id="login" style={{width:'30em'}}>
          <form>
          <h3>Log in</h3>
          <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Enter email" 
                value={this.state.email}
                onChange={e => {
                  this.updateInputVal(e.target.value, 'email')
                  this.setState({
                    email : this.state.email
                  })
                  this.setState({
                    displayName : name
                  })
                }}
                // onChangeText={(val) => this.updateInputVal(val, 'email')}
              />
          </div>
          <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter password"
                value={this.state.password}
                onChange={e => {
                  this.updateInputVal(e.target.value, 'password')
                  this.setState({
                    password : this.state.password
                  })
                }}
                maxLength={15}
                secureTextEntry={true} />
          </div>
          <div className="form-group">
              <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
              </div>
          </div>

          <button type="button" className="btn btn-dark btn-lg btn-block" onClick={() => this.userLogin()}>Sign in</button>
          {/* <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
          </p> 
          <Label onClick={()=>this.handleclick()}>
          คุณยังไม่มีบัญชีผู้ใช้งาน? ลงทะเบียน
          </Label>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>

          <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
          <Image id="photo" className="pic" src={firebase.auth().currentUser.photoURL}/>
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
          </form> 
          </Card> */}  
        </div>
                     
      
    );
  }
}export default LOGIN;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});