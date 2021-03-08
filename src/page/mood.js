import React from "react";
import {MonthPickerDropdown} from 'react-month-picker-dropdown'
import 'react-month-picker-dropdown/dist/index.css'
import YearMonthPicker from 'react-year-month-picker'
import {CanvasJSChart} from 'canvasjs-react-charts'
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

// var Component = React.Component;
// var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Mood extends React.Component {
  constructor(props) {
    super(props)
    this.state = { scheduled: null }
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
  );
  
  handleChange (m) {
      this.setState({
        scheduled: m
      }, 
      () => console.log(this.state.scheduled))
  }  
//   redirect(to) {
//     browserHistory.push({
//        pathname: to
//     });
// } 
  render() {
   
    
    const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "MARCH 2021"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: 18, label: "Direct" },
					{ y: 49, label: "Organic Search" },
					{ y: 9, label: "Paid Search" },
					{ y: 5, label: "Referral" },
					{ y: 19, label: "Social" }
				]
			}]
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
      <YearMonthPicker
          closeOnSelect
          onChange={this.handleChange.bind(this)}
        />
      <CanvasJSChart options = {options}/>
      </Segment>
      </Col>
      </Row>
      </Container>
     </div>
      
        
        
       
    );
  }
}export default Mood;

