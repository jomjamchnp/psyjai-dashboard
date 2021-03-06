import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Segment } from 'semantic-ui-react'
import { Col,Form,Card,Button, } from 'react-bootstrap'
import '../css/login.css'
//import firebase from '../../function/firebaseConfig';
import { history } from '../history'
import { useHistory } from "react-router-dom";
import firebase from '../firebasedb/firebaseconfig';

class LOGIN extends React.Component {
    constructor() {   
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false
    }
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
        console.log(res)
        console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        }) 
        history.push('/dashboard')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  render() {
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
          {/* <p id="logintext" 
          onPress={() => this.props('Login')}>
          Don't have account? Click here to sign up
          </p> */}
          </form> 
          </Card>  
         {/* <TextInput
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        /> */}
        {/* <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        

        <Text 
          style={styles.loginText}
          onPress={() => this.props('register')}>
          Don't have account? Click here to signup
        </Text>  */}
        </div>
          //     {/* <Card id="login" style={{width:'30em'}}>
          //     <p id="header">ยินดีต้อนรับ!</p>
          //     <Form>
          //     <Col xs={12}>
          //     <Form.Group controlId="exampleForm.ControlInput1">
          //     <Form.Label>บัญชีผู้ใช้</Form.Label>
          //     <Form.Control placeholder="บัญชีผู้ใช้" onChange={e => {
          //       this.setState({
          //           username: e.target.value
          //       })
          //     }}/>
          //     </Form.Group>
          //     </Col>
          // <  Col xs={12}>
          // <Form.Group controlId="formGroupPassword">
          // <Form.Label>รหัสผ่าน</Form.Label>
          // <Form.Control type="password" placeholder="รหัสผ่าน" onChange={e => {
          //   this.setState({
          //       password: e.target.value
          //   })
          // }}/>
          // </Form.Group>
          // {
          //  this.state.status == "no" ?
          //   <Form.Label id="err">*บัญชีผู้ใช้และรหัสผ่านไม่ถูกต้อง</Form.Label> : null
          // }
          // </Col>
          // <Button id="cen" variant="secondary" onClick={this.login}>เข้าสู่ระบบ</Button>
          // {/* <p id="regis">คุณยังไม่มีบัญชีผู้ใช้งาน? <a href="/register">ลงทะเบียน</a></p> */}
          // </Form>
          // </Card> 
          // </div>*/}
      
                                
      
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