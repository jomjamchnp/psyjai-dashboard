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
     <div >
      <Container fluid>
        <Row>
        <Col xs={6} md="auto">
          <Menu vertical>   
          <Menu.Item>
              <Input icon='search' placeholder='Search ' />
            </Menu.Item>
            <Menu.Item 
              name='profile'
              active={activeItem === 'profile'}
              fitted='horizontally'
            >
            <Image src={avatar}  size='small' centered circular/>
            Chanpat Sae-tang
            </Menu.Item>
            <Menu.Item
              name='dashboard'
              active={activeItem === 'dashboard'}
              onClick={this.handleItemClick}
              
            >
            <p id="pad"><FaHome size='15px' />  หน้าแรก</p>
            </Menu.Item>
            <Menu.Item
              name='mood'
              active={activeItem === 'mood'}
              onClick={this.handleItemClick}
            >
            <p id="pad"><FaTheaterMasks  size='15px'/>  อารมณ์(Moods)</p>
            </Menu.Item>
            <Menu.Item
              name='intervention'
              active={activeItem === 'intervention'}
              onClick={this.handleItemClick}       
            >
              <p id="pad"><FaRegLightbulb  size='15px'/>  สิ่งที่ได้เรียนรู้</p>
            </Menu.Item>
            <Menu.Item
              name='homework'
              active={activeItem === 'homework'}
              onClick={this.handleItemClick}
              
            >
              <p id="pad"><FaRegEdit  size='15px'/>  การบ้าน</p>
            </Menu.Item>
            <Menu.Item
              name='result'
              active={activeItem === 'result'}
              onClick={this.handleItemClick}
              
            >
              <p id="pad"><GrArticle  size='15px'/>  ผลการประเมินอารมณ์</p>
            </Menu.Item>
            <Menu.Item
              name='tree'
              active={activeItem === 'tree'}
              onClick={this.handleItemClick}
              
            >
              <p id="pad"><FaTree  size='15px'/>  ต้นไม้</p>
            </Menu.Item>
            <Menu.Item
              name='qa'
              active={activeItem === 'qa'}
              onClick={this.handleItemClick}
              
            >
              <p id="pad"><FaQuestion  size='15px'/>  คำถามที่พบบ่อย</p>
              </Menu.Item>
       </Menu>
       <Button id="logout" color='red' >ออกจากระบบ</Button> 
      </Col>
      <Col xs={6} md={8} ls={8} xl={8}>
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
      </Col>
      </Row>
      </Container>
     </div>
      
        
        
       
    );
  }
}export default Intervention;

