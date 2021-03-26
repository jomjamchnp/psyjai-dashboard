import React from "react";

import avatar from '../images/matthew.png'; 
import '../css/dash.css'
import 'semantic-ui-css/semantic.css';
import { Segment,Label,Menu,Input,Image,Icon } from 'semantic-ui-react'
import { Col,Row,Button,Grid,Container } from 'react-bootstrap'
import { FaHome,FaTheaterMasks,FaRegLightbulb,FaRegEdit,FaTree,FaQuestion} from "react-icons/fa";
import { MdMood } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
// import {browserHistory} from 'react-router';
import { history } from '../history';
class Intervention extends React.Component {
  constructor(props) {
    super(props);
     this.state = {     
      pictures: [],
      isLoading: false,
      users: [],
      error: null,
      time: [],
      firstname: '',
      lastname: ''
      
    };
     this.onDrop = this.onDrop.bind(this);
  }
  state = { activeItem: 'home' }
  onDrop(picture) {
      this.setState({
          pictures: this.state.pictures,
      });
  }
  handleItemClick = (e, { name }) => this.setState(
    { activeItem: name },
    history.push('/'+name)
    
    )

    fetchIntervention() {
      // Where we're fetching data from
      fetch('http://localhost:3001/intervention')
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then(data =>
          this.setState({
            users: data,
            isLoading: false,
          })
        )
        // Catch any errors we hit and update the app
        .catch(error => this.setState({ error, isLoading: false }));
    }
  
    
    
    componentDidMount() {
      this.fetchIntervention();
    }
  render() {
    
    const {isLoading, users, error } = this.state;
    const { activeItem } = this.state
    console.log(this.state.pictures)

    let itemsToRender;
    if (isLoading) {
      itemsToRender = users.map(user => {
        const { first_name, last_name, value } = user;
        return (
          <div key={first_name}> 
            <p>Name: {first_name} {last_name}</p>
            <p>Value: {value}</p>
            <hr />
          </div>
        )})
    } 
    else {
      itemsToRender = "Loading...";
    }

    return (
      <Segment>
      <h3>Intervention</h3>
      {/* {this.error ? <p>{this.error.message}</p> : null} */}
      {!isLoading ? (
      users.map(user => {
        const { first_name, last_name, value } = user;
        return (
          <div key={first_name}> 
            <p>Name: {first_name} {last_name}</p>
            <p>Value: {value}</p>
            <hr />
          </div>
        );
        
      })
    // If there is a delay in data, let's let the user know it's loading
    ) : (
      <h3>Loading...</h3>
      
    )}
      {itemsToRender}
      </Segment>     
    );
  }
}export default Intervention;

