import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../firebasedb/firebaseconfig';
import { useHistory } from "react-router-dom";
import Login from '../page/login';
import { Col,Form,Card} from 'react-bootstrap';
import { history } from '../history';

export default class Signup extends Component {
  constructor() {
    super();
    this.state = { 
      FirstName: '',
      LastName: '',
      email: '', 
      password: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          FirstName: this.state.FirstName,
          LastName : this.state.LastName
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          FirstName: '',
          LastName: '',
          email: '', 
          password: ''
        })
        history.push('/login')
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
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" 
                      className="form-control" 
                      placeholder="First name"
                      //onChangeText={(val) => this.updateInputVal(val, 'FirstName')}
                      value={this.state.FirstName}
                      onChange={e => {
                        this.updateInputVal(e.target.value, 'FirstName')
                        this.setState({
                          FirstName : e.target.value
                        })
                      }}
                    />
                </div>
                <div className="form-group">
                    <label>Last name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Last name" 
                      value={this.state.LastName}
                      //value={e.target.value}
                      //onChangeText={(val) => this.updateInputVal(val, 'LastName')}
                      onChange={e => {
                        this.updateInputVal(e.target.value, 'LastName')
                        this.setState({
                          LastName : e.target.value
                        })
                      }}
                    />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Enter email" 
                      //onChangeText={(val) => this.updateInputVal(val, 'email')}
                      onChange={e => {
                        console.log(e.target.value)
                        this.updateInputVal(e.target.value, 'email')
                        this.setState({
                          email : e.target.value
                        })
                      }}
                      value={this.state.email}
                      // onChangeText={(val) => this.updateInputVal(val, 'email')}
                    
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="Enter password"
                      //onChangeText={(val) => this.updateInputVal(val, 'password')}
                      onChange={e => {
                        this.updateInputVal(e.target.value, 'password')
                        this.setState({
                          password : e.target.value
                        })
                      }}
                      value={this.state.password}
                      // onChangeText={(val) => this.updateInputVal(val, 'password')}
                      maxLength={15}
                      secureTextEntry={true}           
                    />
                </div>
                <Button
                  color="#3740FE"
                  title="Signup"
                  onPress={() => this.registerUser()}
                />
                {/* <button type="submit" className="btn btn-primary btn-block"
                onPress={() => this.registerUser()}>Sign Up
                </button> */}
                {/* <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p> */}
            </form>
      </Card>  
      </div>




      // <View style={styles.container}>  
      //   <TextInput
      //     style={styles.inputStyle}
      //     placeholder="Name"
      //     value={this.state.displayName}
      //     onChangeText={(val) => this.updateInputVal(val, 'displayName')}
      //   />      
      //   <TextInput
      //     style={styles.inputStyle}
      //     placeholder="Email"
      //     value={this.state.email}
      //     onChangeText={(val) => this.updateInputVal(val, 'email')}
      //   />
      //   <TextInput
      //     style={styles.inputStyle}
      //     placeholder="Password"
      //     value={this.state.password}
      //     onChangeText={(val) => this.updateInputVal(val, 'password')}
      //     maxLength={15}
      //     secureTextEntry={true}
      //   />   
      //   <Button
      //     color="#3740FE"
      //     title="Signup"
      //     onPress={() => this.registerUser()}
      //   />

      //   <Text 
      //     style={styles.loginText}
      //     onPress={() => this.props.navigation.navigate('Login')}>
      //     Already Registered? Click here to login
      //   </Text>                          
      // </View>
    );
  }
}

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