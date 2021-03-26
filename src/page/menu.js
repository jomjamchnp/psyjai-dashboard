import React,{useState} from "react";
import {CanvasJSChart} from 'canvasjs-react-charts'
import avatar from '../images/matthew.png'; 
import '../css/dash.css'
import 'semantic-ui-css/semantic.css';
import { Segment,Label,Menu,Input,Image,Grid,Tab,Button } from 'semantic-ui-react'
import { Col,Row,Container } from 'react-bootstrap'
import { FaHome,FaTheaterMasks,FaRegLightbulb,FaRegEdit,FaTree,FaQuestion} from "react-icons/fa";
import { MdMood } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { history } from '../history';
import firebase from "../firebasedb/firebaseconfig"

import Dashboard from "./dashboard";
import Login from "./login.js"
import Signup from "./signup"
import Mood from "./mood"
import Homework from "./homework.js"
import Qa from "./qa.js"
import Tree from "./tree"
import Result from "./result"
import Intervention from "./intervention"

const panes = [
  { menuItem: <Image src={avatar}  size='small' centered circular/>, render: () => <Tab.Pane><Dashboard/></Tab.Pane> },
  { menuItem: 'Tab 1', render: () => <Tab.Pane><Dashboard/></Tab.Pane> },
  { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
]
class MenuBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
          scheduled: null, 
          selectedDate : '',
          setSelectedDate: '',

        }
        // this.onDrop = this.onDrop.bind(this);
      }
      componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
              localStorage.setItem('login',true)
              console.log(user)
              this.setState({
                  currentUser: user.displayName,
                  activeItem: 'dashboard',
                  photoUrl: user.photoURL
              })
          }
      })
      }

      handleItemClick = (e, { name }) => this.setState(
        { activeItem: name },
        // history.push('/'+name)
      );

      logout = () => {
          localStorage.setItem("login",false)
          firebase.auth().signOut()
          history.push('/')
      }

      render() {
          return(
            <Grid container stackable style={{padding: "30px"}}>
              <Grid.Row columns={2}>
                <Grid.Column computer={4} tablet={5} only='computer tablet' >
                <Menu vertical id="font">   
                  <Menu.Item 
                  name='profile'
                  active={this.state.activeItem === 'profile'}
                  fitted='horizontally'
                  >            
                      <Image src={avatar}  size='small' centered circular/>
                      <label id="head-name" textAlign='center'>{this.state.currentUser}</label>
                  </Menu.Item>
                  <Menu.Item
                  name='dashboard'
                  active={this.state.activeItem === 'dashboard'}
                  onClick={this.handleItemClick}
                  >
                  <p id="pad"><FaHome size='15px' />  หน้าแรก</p>
                  </Menu.Item>
                  <Menu.Item
                  name='mood'
                  active={this.state.activeItem === 'mood'}
                  onClick={this.handleItemClick}
                  >
                  <p id="pad"><FaTheaterMasks  size='15px'/>  อารมณ์(Moods)</p>
                  </Menu.Item>
                  <Menu.Item
                  name='intervention'
                  active={this.state.activeItem === 'intervention'}
                  onClick={this.handleItemClick}       
                  >
                  <p id="pad"><FaRegLightbulb  size='15px'/>  สิ่งที่ได้เรียนรู้</p>
                  </Menu.Item>
                  <Menu.Item
                  name='homework'
                  active={this.state.activeItem === 'homework'}
                  onClick={this.handleItemClick}
                  >
                  <p id="pad"><FaRegEdit  size='15px'/>  การบ้าน</p>
                  </Menu.Item>
                  <Menu.Item
                  name='result'
                  active={this.state.activeItem === 'result'}
                  onClick={this.handleItemClick}
                  >
                  <p id="pad"><GrArticle  size='15px'/>  ผลการประเมินอารมณ์</p>
                  </Menu.Item>
                  <Menu.Item
                  name='tree'
                  active={this.state.activeItem === 'tree'}
                  onClick={this.handleItemClick}
                  >
                  <p id="pad"><FaTree  size='15px'/>  ต้นไม้</p>
                  </Menu.Item>
                  <Menu.Item
                  name='qa'
                  active={this.state.activeItem === 'qa'}
                  onClick={this.handleItemClick}
                  >
                  <p id="pad"><FaQuestion  size='15px'/>  คำถามที่พบบ่อย</p>
                  </Menu.Item>
                </Menu>
                <Button id="logout" onClick={this.logout}>ออกจากระบบ</Button> 
                </Grid.Column>
                <Grid.Column computer={12} tablet={11}>
                    {
                      this.state.activeItem === 'dashboard'&&
                      <Dashboard/>
                      // <FullCalendar   
                      //     plugins={[ dayGridPlugin, interactionPlugin ]}
                      //     initialView="dayGridMonth"
                      //     themeSystem="Flatly"
                      //     eventBorderColor="white"
                      //     //height= "650%"
                      //     //size = "80%"
                      //     height = "100%"
                      //     eventBackgroundColor="white"
                      //     // eventContent={renderEventContent}
                      //     // events={this.state.timestamp}
                      //     // dateClick={this.handleDateClick}
                      // />
                    }
                    {
                      this.state.activeItem === 'mood'&&<Mood/>
                    }
                    {
                      this.state.activeItem === 'intervention'&&<Intervention/>
                    }
                    {
                      this.state.activeItem === 'homework'&&<Homework/>
                    }
                    {
                      this.state.activeItem === 'result'&&<Result/>
                    }
                    {
                      this.state.activeItem === 'tree'&&<Tree/>
                    }
                    {
                      this.state.activeItem === 'qa'&&<Qa/>
                    }     
                </Grid.Column>
              </Grid.Row>
            </Grid>
          );
      }

}
export default MenuBar;