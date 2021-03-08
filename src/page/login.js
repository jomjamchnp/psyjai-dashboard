import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Segment,Label } from 'semantic-ui-react'
import { Col,Form,Card,Button, } from 'react-bootstrap'
import '../css/login.css'
//import firebase from '../../function/firebaseConfig';
import { history } from '../history'
import { useHistory } from "react-router-dom";
import firebase from '../firebasedb/firebaseconfig';

class LOGIN extends React.Component {
    
    constructor(props) {   
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      isLoading: false
    }
  }
  handleclick = () => {
    history.push('/signup')
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
    console.log(state)
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
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log('User logged-in successfully!')
        console.log(this.state.displayName)
        this.setState({
          isLoading: false,
          displayName:'',
          email: '', 
          password: ''
        })
        history.push('/dashboard')

      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
    
  }
  render(){
    var user = firebase.auth().currentUser;
    var name;
    if (user != null) 
    {  name = user.displayName; 
    }
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return ( 
        <div class="bg">
          <Card id="login" style={{width:'30em'}}>
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
          </p> */}
          <Label onClick={()=>this.handleclick()}>
          คุณยังไม่มีบัญชีผู้ใช้งาน? ลงทะเบียน
          </Label>
                  {/* <p id="logintext" 
          onPress={() => this.props('Login')}>
          Don't have account? Click here to sign up
          </p> */}
          </form> 
          </Card>  
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