import React ,{useState, useEffect} from "react";
import { useHistory ,useLocation} from "react-router-dom";
// import {Img} from 'react-image'
import ImageUploader from 'react-images-upload';
import avatar from '../images/matthew.png'; 
import angry from '../images/moods/angry.png'; 
import sad from '../images/moods/sad.png'; 
import '../css/dash.css'
import 'semantic-ui-css/semantic.css';
import { Segment,Label,Menu,Input,Image,Icon,Popup,Rating,Dropdown,Button } from 'semantic-ui-react'
import { Col,Row,Grid,Container } from 'react-bootstrap'
import { FaHome,FaTheaterMasks,FaRegLightbulb,FaRegEdit,FaTree,FaQuestion} from "react-icons/fa";
import { GrArticle } from "react-icons/gr";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { history } from '../history';
import firebase from '../firebasedb/firebaseconfig';

// https://sv1.picz.in.th/images/2021/03/07/D72Bcg.png // red-angry
// https://sv1.picz.in.th/images/2021/03/07/D72N0n.png // green 
// https://sv1.picz.in.th/images/2021/03/07/D72f2W.png // happy-yellow
// https://sv1.picz.in.th/images/2021/03/07/D72hy2.png // white 
// https://sv1.picz.in.th/images/2021/03/07/D723T1.png // sad-blue

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
        timestamp:  []
        
        // DisplayName : this.location.Data,
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
          this.setState({
            users: data,
            isLoading: false,
          })
          let obj = []
          for(let i=0; i< data.length; i++){
            let img = ""
            let time = data[i].timestamp.split("T")
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

            // check emotion on this day (get latest emotion)
            if(data[i+1] != null){
              let timeNext = data[i+1].timestamp.split("T")
              console.log(time[0],timeNext[0])
              if(time[0] != timeNext[0]){
                  obj.push({
                    date: time[0],
                    title: img
                  })
              }
            }else{
              console.log(time[0],i)
              obj.push({
                date: time[0],
                title: img
              })
            }
           
          }
          // add event on calendar
          this.setState({
              timestamp: obj
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

  render() {
    console.log("time : ",this.state.timestamp)
    const {isLoading, users, error } = this.state;
    // if(!this.state.isLoading){
    //   users.map(user => {
    //     const { first_name, last_name, timestamp } = user;
    //     var timeSting = timestamp.split('T')[0]

    //   })
    //   this.setState({
    //     isLoading: false
    //   })
    // }
    // if(this.state.isLoading){
    //   return(
    //   <div>
    //     <h3>Loading...</h3>
    //   </div>

    //   )
    // }
    // users.map(user => {
    //   const { first_name,last_name,value,timestamp} = user;
    //   var timeSting = timestamp.split('T')[0]
    //       this.setState({
    //         time : timeSting
    //       })
    //   })
    // if(isLoading){
    //   users.map(user => {
    //     const { first_name, last_name, value,timestamp} = user;
    //     var timeSting = timestamp.split('T')[0]
    //     // this.setState({
    //     //   time : timeSting
    //     // })
    //   }
    // } 

    // If there is a delay in data, let's let the user know it's loading


    function renderEventContent(eventInfo) {
      //console.log(eventInfo.event.title) 
      var text = eventInfo.event.title
      return (
        <div>
          <Popup
          trigger={
            <Image  src={text} size="tiny"/>
            }>
          <Popup.Header>ประเด็นที่พูดคุย</Popup.Header>
    <Popup.Content>
      <Rating icon='star' defaultRating={3} maxRating={4} />
    </Popup.Content>
        </Popup>
        </div>
      )
      
    }
    // const Details = props => {
    //   const { name } =
    //     (this.props.location && this.props.location.Data) || {};
    //   console.log(this.props.location.Data)
    // }
    // console.log(users.map(user => (
    //   {user.timestamp)
    // )))
    const { activeItem } = this.state
    return (
      <Segment id="calendar">
      {this.error ? <p>{this.error.message}</p> : null}
      <FullCalendar   
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          themeSystem="Flatly"
          eventBorderColor="white"
          //height= "650%"
          //size = "80%"
          height = "100%"
          eventBackgroundColor="white"
          eventContent={renderEventContent}
          events={this.state.timestamp}
          dateClick={this.handleDateClick}
      />
      </Segment>    
    );
  }
}export default Dashboard;

