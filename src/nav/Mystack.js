import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createAppContainer} from "react-navigation" 
import Login from '../page/login.js';
import Signup from '../page/signup.js';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <div >
        <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen 
        name="Signup" 
        component={Signup} 
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        
      />
    </Stack.Navigator>

    </div>
    
    
  );
}export default MyStack