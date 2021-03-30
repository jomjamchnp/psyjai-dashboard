import React ,{useState, useEffect} from "react";
import { useHistory ,useLocation} from "react-router-dom";
// import {Img} from 'react-image'
import ImageUploader from 'react-images-upload';
import avatar from '../images/matthew.png'; 
import angry from '../images/moods/angry.png'; 

import '../css/dash.css'
import 'semantic-ui-css/semantic.css';
import { Segment,Label,Menu,Input,Image,Icon,Popup,Rating,Dropdown,Button,Grid } from 'semantic-ui-react'
import { Col,Row,Container } from 'react-bootstrap'
import { FaHome,FaTheaterMasks,FaRegLightbulb,FaRegEdit,FaTree,FaQuestion} from "react-icons/fa";
import { GrArticle } from "react-icons/gr";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { history } from '../history';
import firebase from '../firebasedb/firebaseconfig';

// https://sv1.picz.in.th/images/2021/03/29/DXJNlk.png // yellow shades
// https://sv1.picz.in.th/images/2021/03/29/DXJ4Tl.png // red shades
// https://sv1.picz.in.th/images/2021/03/29/DXJBvv.png // green shades
// https://sv1.picz.in.th/images/2021/03/29/DXJhBE.png // bule shades
// https://sv1.picz.in.th/images/2021/03/07/D72Bcg.png // red-angry
// https://sv1.picz.in.th/images/2021/03/07/D72N0n.png // green 
// https://sv1.picz.in.th/images/2021/03/07/D72f2W.png // happy-yellow
// https://sv1.picz.in.th/images/2021/03/07/D72hy2.png // white 
// https://sv1.picz.in.th/images/2021/03/07/D723T1.png // sad-blue
// const blue1 = "https://sv1.picz.in.th/images/2021/03/30/DaNDZW.png"
// const blue2 = "https://sv1.picz.in.th/images/2021/03/30/DaNAP2.png"
// const blue3 = "https://sv1.picz.in.th/images/2021/03/30/DaN23y.png"
// const blue4 = "https://sv1.picz.in.th/images/2021/03/30/DaNPm1.png"
// const blue5 = "https://sv1.picz.in.th/images/2021/03/30/DaNCbD.png"
// const blue6 = "https://sv1.picz.in.th/images/2021/03/30/DaNup9.png"
// const blue7 = "https://sv1.picz.in.th/images/2021/03/30/DaNn4J.png"
// const blue8 = "https://sv1.picz.in.th/images/2021/03/30/DaNrQb.png"
// const blue9 = "https://sv1.picz.in.th/images/2021/03/30/DaN8rf.png"
// const blue10 = "https://sv1.picz.in.th/images/2021/03/30/DaNVda.png"

class Dashboard extends React.Component {
  constructor(props) { 
      super(props);
      // const name = this.props.location.Data
      // console.log(name)
      this.state = {     
        pictures: [],
        merchants:false,
        setMerchants: [],
        isLoading: false,
        users: [],
        error: null,
        time: [],
        timestamp:  [],
        levelPre: [],
        levelPost: []
      };
      this.onDrop = this.onDrop.bind(this);
      //console.log(this.DisplayName)
    }
  state = { activeItem: 'home' }

  fetchUsers() {
    // Where we're fetching data from
    fetch('http://localhost:3001/emotion_class')
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data => {
          // console.log(data)
          this.setState({
            users: data,
            isLoading: false,
          })
          let obj = []
          let levelPre = []
          let levelPost = []
          // check date in data to add obj list
          for(let i in data){
            // console.log(data[i].variable)
            let dateSplit = data[i].timestamp.split("T")
            let count = 0
            let countLevelPre = 0
            let countLevelPost = 0
            let img = ""
            if( data[i].variable == "emotion_class"){
              if( data[i].value == "สบายๆ"){
                img = "https://sv1.picz.in.th/images/2021/03/07/D72N0n.png"
              }
              if( data[i].value == "เฉยๆ"){
                  img = "https://sv1.picz.in.th/images/2021/03/07/D72hy2.png"
              }
              if( data[i].value == "อารมณ์ดี"){
                img = "https://sv1.picz.in.th/images/2021/03/07/D72f2W.png"
              }
              if( data[i].value == "สงบ"){
                img = "https://sv1.picz.in.th/images/2021/03/07/D72N0n.png"
              }
              if( data[i].value == "อารมณ์ไม่ดี"){
                img = "https://sv1.picz.in.th/images/2021/03/07/D72Bcg.png"
              }
              if(obj.length == 0){
                  obj.push({
                    date: dateSplit[0],
                    title: img,
                    // mood: data[i].value
                  })
              }else{
                for(let a in obj){
                  // console.log(dateSplit[0],data[i].variable,data[i].value)
                  if(dateSplit[0] == obj[a].date){
                    if( data[i].value == "สบายๆ"){
                      img = "https://sv1.picz.in.th/images/2021/03/07/D72N0n.png"
                    }
                    if( data[i].value == "เฉยๆ"){
                        img = "https://sv1.picz.in.th/images/2021/03/07/D72hy2.png"
                    }
                    if( data[i].value == "อารมณ์ดี"){
                      img = "https://sv1.picz.in.th/images/2021/03/07/D72f2W.png"
                    }
                    if( data[i].value == "สงบ"){
                      img = "https://sv1.picz.in.th/images/2021/03/07/D72N0n.png"
                    }
                    if( data[i].value == "อารมณ์ไม่ดี"){
                      img = "https://sv1.picz.in.th/images/2021/03/07/D72Bcg.png"
                    }
                    obj[a].title = img
                    count++
                  }
                }
                if(count == 0){
                  obj.push({
                    date: dateSplit[0],
                    title: img,
                    // mood: data[i].value
                  })
                }
              }
            }
            
            if( data[i].variable == "PreSeverityemo" ){
              // console.log(dateSplit[0],data[i].variable,data[i].value)
                if(levelPre.length == 0){
                    levelPre.push({
                      date: dateSplit[0],
                      preValue: data[i].value
                    })
                }else{
                    for(let a in levelPre){
                      if(levelPre[a].date == dateSplit[0]){
                        levelPre[a].preValue = data[i].value
                        countLevelPre ++
                      }
                    }

                    if(countLevelPre == 0){
                      levelPre.push({
                        date: dateSplit[0],
                        preValue: data[i].value
                      })
                    }
                }
            }   

            if( data[i].variable == "PostSeverityemo" ){
              // console.log(dateSplit[0],data[i].variable,data[i].value)
                if(levelPost.length == 0){
                    levelPost.push({
                      date: dateSplit[0],
                      postValue: data[i].value
                    })
                }else{
                    for(let a in levelPost){
                      if(levelPost[a].date == dateSplit[0]){
                        levelPost[a].postValue = data[i].value
                        countLevelPost ++
                      }
                    }

                    if(countLevelPost == 0){
                      levelPost.push({
                        date: dateSplit[0],
                        postValue: data[i].value
                      })
                    }
                }
            }   
        }
          console.log("obj: ",obj)
          console.log("levelPre: ",levelPre)
          console.log("levelPost: ",levelPost)
          // add event on calendar
          this.setState({
              timestamp: obj,
              levelPre: levelPre,
              levelPost: levelPost
          })
         }
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchUsers();
  }
  
  onDrop(picture) {
      this.setState({
          pictures: this.state.pictures,
      });
  }
  handleItemClick = (e, { name }) => this.setState(
    { activeItem: name },
    history.push('/'+name)
    )
  handleDateClick = (arg) => { // bind with an arrow function
      alert(arg.dateStr)
  }

  handleClick(e) {
      e.preventDefault();
  }

  getLevelPre = () =>{
    return this.state.levelPre
  }

  render() {
    const {isLoading, users, error  } = this.state;
   
    function renderEventContent(eventInfo,levelPre,levelPost) {
      var moodShades = ''
      var mood = "blue"
      if( eventInfo.event.title == "https://sv1.picz.in.th/images/2021/03/07/D72Bcg.png"){
        moodShades = "https://sv1.picz.in.th/images/2021/03/29/DXJ4Tl.png"
        // mood = 'red'
      }
      if( eventInfo.event.title == "https://sv1.picz.in.th/images/2021/03/07/D72N0n.png"){
        moodShades = "https://sv1.picz.in.th/images/2021/03/29/DXJBvv.png"
        // mood = 'green'
      }
      if( eventInfo.event.title == "https://sv1.picz.in.th/images/2021/03/07/D72f2W.png"){
        moodShades = "https://sv1.picz.in.th/images/2021/03/29/DXJNlk.png"
        // mood = 'yellow'
      }
      if( eventInfo.event.title == "https://sv1.picz.in.th/images/2021/03/07/D723T1.png"){
        moodShades = "https://sv1.picz.in.th/images/2021/03/29/DXJhBE.png"
        // mood = 'blue'
      }
      var text = eventInfo.event.title
      var date = eventInfo.event.startStr
      var pre_value = 1
      var post_value = 1
      for(let i in levelPre){
          if(levelPre[i].date == date){
            // console.log("yeahhh: ",levelPre[i].preValue)
            pre_value = levelPre[i].preValue
          }
      }
      for(let i in levelPost){
        if(levelPost[i].date == date){
          // console.log("yeahhh: ",levelPost[i].postValue)
          post_value = levelPost[i].postValue
        }
      }

      var imgLevelPre = mood+pre_value.toString()
      var imgLevelPost = mood+post_value.toString()
    
      return (
        <div>
          <Popup trigger={<Image src={text} size="tiny"/>}>
          <Popup.Header>
            <Row>
              <Col><Image src={"./"+imgLevelPre+".png"} size='tiny' /></Col>
              <Col><Image src={"./"+imgLevelPost+".png"} size='tiny' /></Col>
            </Row>
          </Popup.Header>
          <Popup.Content>
            <Image src={moodShades} size='big' />
          </Popup.Content>
        </Popup>
        </div>
      )
      
    }

    const { activeItem } = this.state
    return (
    <>

      <Segment id="calendar" only='computer tablet'>
        {this.error ? <p>{this.error.message}</p> : null}
        <FullCalendar 
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            themeSystem="Flatly"
            eventBorderColor="white"
            handleWindowResize = {true}
            size = "80%"
            height = "100%"
            eventBackgroundColor="white"
            eventContent={(eventInfo) => renderEventContent(eventInfo,this.state.levelPre,this.state.levelPost)}
            events={this.state.timestamp}
            dateClick={this.handleDateClick}
        />
      </Segment>  
    </> 
    );
  }
}export default Dashboard;

