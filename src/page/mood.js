import React from "react";
import {Img} from 'react-image'
import ImageUploader from 'react-images-upload';
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
class Mood extends React.Component {
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
//   redirect(to) {
//     browserHistory.push({
//        pathname: to
//     });
// } 
  render() {
    const { activeItem } = this.state
    console.log(this.state.pictures)
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
            <Image src={avatar}  size='medium' circular/>
            <p>Chanpat Sae-tang</p>
            </Menu.Item>
            <Menu.Item
              name='dashboard'
              active={activeItem === 'dashboard'}
              onClick={this.handleItemClick}
            >
             {/* <Icon name='home' size='mini' /> */}
              {/* <Label>51</Label> */}
            <FaHome size='15px' /> หน้าแรก
            </Menu.Item>
            <Menu.Item
              name='mood'
              active={activeItem === 'mood'}
              // onClick={this.handleItemClick}
             // onClick={this.redirect('/mood')}
            >
              <p><FaTheaterMasks  size='15px'/>  อารมณ์(Moods)</p>
            </Menu.Item>
            <Menu.Item
              name='intervention'
              active={activeItem === 'intervention'}
              onClick={this.handleItemClick}
            >
              <p><FaRegLightbulb  size='15px'/>สิ่งที่ได้เรียนรู้</p>
            </Menu.Item>
            <Menu.Item
              name='homework'
              active={activeItem === 'homework'}
              onClick={this.handleItemClick}
            >
              <p><FaRegEdit  size='15px'/>  การบ้าน</p>
            </Menu.Item>
            <Menu.Item
              name='result'
              active={activeItem === 'result'}
              onClick={this.handleItemClick}
            >
              <p><GrArticle  size='15px'/>  ผลการประเมินอารมณ์</p>
            </Menu.Item>
            <Menu.Item
              name='tree'
              active={activeItem === 'tree'}
              onClick={this.handleItemClick}
            >
              <p><FaTree  size='15px'/>  ต้นไม้</p>
            </Menu.Item>
            <Menu.Item
              name='qa'
              active={activeItem === 'qa'}
              onClick={this.handleItemClick}
            >
              <p><FaQuestion  size='15px'/>  คำถามที่พบบ่อย</p>
            </Menu.Item>
       </Menu> 
      </Col>
      <Col xs={6} md={8} ls={8} xl={8}>
      <Segment>Mood</Segment>
      </Col>
      </Row>
      </Container>
     </div>
      
        
        
       
    );
  }
}export default Mood;

