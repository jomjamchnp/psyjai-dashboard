import React,{useState} from "react";
import avatar from '../images/matthew.png'; 
import '../css/dash.css'
import 'semantic-ui-css/semantic.css';
import { Segment,Label,Menu,Input,Image,Dropdown } from 'semantic-ui-react'
import { Col,Row,Button,Grid,Container } from 'react-bootstrap'
import { FaHome,FaTheaterMasks,FaRegLightbulb,FaRegEdit,FaTree,FaQuestion} from "react-icons/fa";
import { MdMood } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { history } from '../history';
import { Chart } from "react-google-charts";

 
class Mood extends React.Component {
  constructor(props) {
    super(props)
    var today = new Date(),
    year = today.getFullYear(),
    month = today.getMonth() + 1
    console.log(month)
    this.state = { 
      selectedYear: year,
      scheduled: null, 
      selectedMonth : month,
      setselectedMonth: '',
      object:[],
      item:'',
      setitems:[]

    }
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

  handleMonthChange = (e, { value }) => this.setState({ selectedMonth:value })
  handleYearChange = (e, { value }) => this.setState({ selectedYear:value })
  render() {
    const { activeItem } = this.state
    const { value } = this.state;
    const month = [
      { key: 1, text: 'มกราคม', value: 1 },
      { key: 2, text: 'กุมภาพันธ์', value: 2 },
      { key: 3, text: 'มีนาคม', value: 3 },
      { key: 4, text: 'เมษายน', value: 4 },
      { key: 5, text: 'พฤษภาคม', value: 5 },
      { key: 6, text: 'มิถุนายน', value: 6 },
      { key: 7, text: 'กรกฎาคม', value: 7 },
      { key: 8, text: 'สิงหาคม', value: 8 },
      { key: 9, text: 'กันยายน', value: 9 },
      { key: 10, text: 'ตุลาคม', value: 10 },
      { key: 11, text: 'พฤศจิกายน', value: 11 },
      { key: 12, text: 'ธันวาคม', value: 12 }
    ]
    const year = [
      { key: 1, text: '2019' ,value:1},
      { key: 2, text: '2020' ,value:2},
      { key: 3, text: '2021' ,value:3},
    ]

    let idx = 0
    if (this.state.selectedMonth !=''){
      idx = parseInt(this.state.selectedMonth)
      console.log(month[idx-1].text)
    }
  
  console.log(this.state.selectedMonth)
  console.log(this.state.selectedYear)
  // console.log(month[idx].text)
    return (
      <Segment>
      <Dropdown
        selection
        wrapSelection={false}
        options={month}
        placeholder='เลือกเดือน'
        onChange={this.handleMonthChange}
        value={value}
      />
      <Dropdown
        selection
        wrapSelection={false}
        options={year}
        placeholder='เลือกปี'
        onChange={this.handleYearChange}
        value={value}
      />
       <Chart
          width={'800px'}
          height={'500px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>} 
          data={[
            ['อารมณ์','จำนวน'],
            ['สบายๆ', 11],
            ['อารมณ์ไม่ดี', 2],
            ['ซึมๆ', 2],
            ['เฉยๆ', 2],
            ['อารมณ์ดี', 7],
          ]}
          options={{
            title: month[idx-1].text,
          //  pieSliceTextStyle:{color: 'black'},
            slices: {
              0: { color: '#37BC9B' },
              1: { color: '#DA4453' },
              2: { color: '#3BAFDA' },
              3: { color: '#F5F7FA' },
              4: { color: '#FCBB42' }
            }
            
          }}
          rootProps={{ 'data-testid': '1' }}
      />
      {/* <CanvasJSChart options = {options}/> */}
      </Segment>       
    );
  }
}export default Mood;

