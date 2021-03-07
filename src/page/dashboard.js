import React from "react";
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

// https://sv1.picz.in.th/images/2021/03/07/D72Bcg.png
// https://sv1.picz.in.th/images/2021/03/07/D72N0n.png
// https://sv1.picz.in.th/images/2021/03/07/D72f2W.png
// https://sv1.picz.in.th/images/2021/03/07/D72hy2.png
// https://sv1.picz.in.th/images/2021/03/07/D723T1.png

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
     this.state = {     
      pictures: []
      
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
  handleDateClick = (arg) => { // bind with an arrow function
      alert(arg.dateStr)
  }

  handleClick(e) {
      e.preventDefault();
  }

//   redirect(to) {
//     history.push({
//        pathname: to
//     });
// } 
  render() {
    function renderEventContent(eventInfo) {
      console.log(eventInfo.event.title) 
  
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

    const { activeItem } = this.state
    
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
               {/* <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png']}
                maxFileSize={5242880}
                singleImage={true}
                withPreview={true}
            />
            <Img src={this.state.pictures} /> */}
            <Image src={avatar}  size='small' centered circular/>
            Chanpat Sae-tang
            </Menu.Item>
            <Menu.Item
              name='dashboard'
              active={activeItem === 'dashboard'}
              onClick={this.handleItemClick}
              fitted='horizontally'
            >
             {/* <Icon name='home' size='mini' /> */}
              {/* <Label>51</Label> */}
            <p><FaHome size='15px' /> หน้าแรก</p>
            </Menu.Item>
            <Menu.Item
              name='mood'
              active={activeItem === 'mood'}
              onClick={this.handleItemClick}
              // fitted='horizontally'
              //href='/mood'
              //link={this.redirect('/mood')}
              //onClick={this.redirect('/mood')}
            >
             <FaTheaterMasks  size='15px'/>  อารมณ์(Moods)
            </Menu.Item>
            <Menu.Item
              name='intervention'
              active={activeItem === 'intervention'}
              onClick={this.handleItemClick}
              
            >
              <p id="pad"><FaRegLightbulb  size='15px'/>สิ่งที่ได้เรียนรู้</p>
            </Menu.Item>
            <Menu.Item
              name='homework'
              active={activeItem === 'homework'}
              onClick={this.handleItemClick}
              fitted='horizontally'
            >
              <p id="pad"><FaRegEdit  size='15px'/>  การบ้าน</p>
            </Menu.Item>
            <Menu.Item
              name='result'
              active={activeItem === 'result'}
              onClick={this.handleItemClick}
              fitted='horizontally'
            >
              <p id="pad"><GrArticle  size='15px'/>  ผลการประเมินอารมณ์</p>
            </Menu.Item>
            <Menu.Item
              name='tree'
              active={activeItem === 'tree'}
              onClick={this.handleItemClick}
              fitted='horizontally'
            >
              <p id="pad"><FaTree  size='15px'/>  ต้นไม้</p>
            </Menu.Item>
            <Menu.Item
              name='qa'
              active={activeItem === 'qa'}
              onClick={this.handleItemClick}
              fitted='horizontally'
            >
              <p id="pad"><FaQuestion  size='15px'/>  คำถามที่พบบ่อย</p>
              </Menu.Item>
            {/* </Menu.Item>
            <Menu.Menu position='buttom'>
          <Dropdown item text='Language'>
            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>Russian</Dropdown.Item>
              <Dropdown.Item>Spanish</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Menu.Menu> */}
       </Menu>
       <Button id="logout" color='red' >ออกจากระบบ</Button> 
      </Col>
      <Col xs={6} md={8} ls={8} xl={9}>
      <Segment>
      <FullCalendar
        
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        themeSystem="Flatly"
        eventBorderColor="white"
        eventBackgroundColor="white"
        eventContent={renderEventContent}
        events={[
          { date: '2021-03-13', title:'https://sv1.picz.in.th/images/2021/03/07/D72Bcg.png'},
          { date: '2021-03-15', title:'https://sv1.picz.in.th/images/2021/03/07/D723T1.png'}
        ]
      }
        dateClick={this.handleDateClick}
        
      />

      </Segment>
      </Col>
      </Row>
      </Container>
     </div>
      
        
        
       
    );
  }
}export default Dashboard;

