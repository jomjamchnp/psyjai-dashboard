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
        
        // DisplayName : this.location.Data,
      };
      this.onDrop = this.onDrop.bind(this);
      //console.log(this.DisplayName)
    }
  state = { activeItem: 'home' }

  fetchUsers() {
    // Where we're fetching data from
    fetch('http://localhost:3001/')
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

    

    // const SecondPage = props => {
    //   const location = useLocation();
    
    //   useEffect(() => {

    //     console.log(location.state.detail); // result: 'some_value'
    //   }, [location]);
    
    // };

    // const Details = props => {
    //   const { name } =
    //     (props.location && props.location.state) || {};
    //     console.log(name)
    // }
    //console.log(Details.name)
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
    // console.log(this.props.location.Data)
    const { activeItem } = this.state
    
    //console.log(user.timestamp)
    //console.log(firebase.auth().currentUser.displayName)
    return (
    
     <div >
      <Container fluid>
        <Row>
        <Col xs={6} md="auto">
          <Menu vertical>   
          <Menu.Item>
            {}
              <Input icon='search' placeholder='Search ' />
            </Menu.Item>
            <Menu.Item 
              name='profile'
              active={activeItem === 'profile'}
              fitted='horizontally'
            >
            <Image src={avatar}  size='small' centered circular/>
            { this.name }
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
       
       <Button onClick={() => firebase.auth().signOut()} id="logout" color='red' >ออกจากระบบ</Button> 
      </Col>
      <Col xs={6} md={8} ls={8} xl={9}>
      <Segment id="calendar">
      {this.error ? <p>{this.error.message}</p> : null}
      {/* <Button onClick={()=> getUsers}/>
      {this.merchants ? this.merchants : 'There is no merchant data available'} */}
      {/* {!isLoading ? (
        users.map(user => {
          const { username, name, email } = user;
          return (
            <div key={username}>
              <p>Name: {name}</p>
              <p>Email Address: {email}</p>
              <hr />
            </div>
          );
        })
      // If there is a delay in data, let's let the user know it's loading
      ) : (
        <h3>Loading...</h3>
      )} */}
      {!isLoading ? (
      users.map(user => {
        const { first_name, last_name, timestamp } = user;
        var timestring = timestamp.split('T')[0]
        console.log(user.timestamp.split('T')[0])
        // this.setState({
        //   time:user.timestamp.split('T')[0]
        // })
        return (
          <div> 
            {/* key={first_name} */}
            <p>Name: {first_name} {last_name}</p>
            <p>TimeStamp: {timestring}</p>
            {/* <FullCalendar
          eventAdd={this.handleEventAdd}
        /> */}
            <hr />
          </div>
        );
        
      })
    // If there is a delay in data, let's let the user know it's loading
    ) : (
      <h3>Loading...</h3>
    )}

      <FullCalendar   
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          themeSystem="Flatly"
          eventBorderColor="white"
          //height= "650%"
          //size = "80%"
          height = "90%"
          eventBackgroundColor="white"
          eventContent={renderEventContent}
          events={[  
            { date: users , title:'https://sv1.picz.in.th/images/2021/03/07/D72Bcg.png'},
            //{ date: '2021-03-15', title:'https://sv1.picz.in.th/images/2021/03/07/D723T1.png'}
          ]
        }
          dateClick={this.handleDateClick}
        
      />
    

      {/* <FullCalendar   
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        themeSystem="Flatly"
        eventBorderColor="white"
        //height= "650%"
        //size = "80%"
        height = "90%"
        eventBackgroundColor="white"
        eventContent={renderEventContent}
        events={[
          
          { date: this.time, title:'https://sv1.picz.in.th/images/2021/03/07/D72Bcg.png'},
          //{ date: '2021-03-15', title:'https://sv1.picz.in.th/images/2021/03/07/D723T1.png'}
        ]
      }
        dateClick={this.handleDateClick}
       
      /> */}
      
      </Segment>
      </Col>
      </Row>
      </Container>
     </div>
      
        
        
       
    );
  }
}export default Dashboard;

