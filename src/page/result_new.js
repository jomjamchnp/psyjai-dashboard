import React from "react";

import avatar from '../images/matthew.png'; 
import '../css/dash.css'
import 'semantic-ui-css/semantic.css';
import { Segment,Table,Menu,Input,Image,Label } from 'semantic-ui-react'
import { Col,Row,Button,Grid,Container } from 'react-bootstrap'
import { FaHome,FaTheaterMasks,FaRegLightbulb,FaRegEdit,FaTree,FaQuestion} from "react-icons/fa";
import { MdMood } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
// import {browserHistory} from 'react-router';
import { history } from '../history';



class Result extends React.Component {
  constructor(props) {
    super(props);
     this.state = {     
      pictures: [],
      firstname: '',
      lastname: '',
      user_result:[],
      isLoading: true,
      users: [],
      date: '',
      time:'',
      type: '',
      value:'',

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


    fetchResult() {
      // Where we're fetching data from
      fetch('http://localhost:3001/result')
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then(data =>
          {
            this.setState({
              users: data,
              isLoading: false,
            })
            let input = (data).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
            let date,time,type
            for (let i=0; i < input.length; i++){
              date = (input[i].timestamp).split("T")
              console.log(date[0])
              time = (date[1]).split(".")
              console.log(time[0])
              if(input[i].variable === 'TotalQstess'){
                type = 'ความเครียด'
              }
              if(input[i].variable === 'TotalQdepress'){
                type = 'ความกดดัน'
              }
              if(input[i].variable === 'TotalQanx'){
                type = 'ความวิตกกังวล'
              }

              this.state.user_result.push({
                date: date[0],
                time: time[0],
                type: type,
                value: input[i].value
              })

            }
            this.setState({
              items: this.state.user_result
            })
        })

        // Catch any errors we hit and update the app
        .catch(error => this.setState({ error, isLoading: false }));
    }
  
    componentDidMount() {
      this.fetchResult();
    }
    
  render() {
     const { activeItem } = this.state;
     const {isLoading, users, error } = this.state;
    
    return (
        <Segment>
        <h3 id="font" >ผลการประเมินอารมณ์</h3>
        
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>วันที่ประเมิน</Table.HeaderCell>
              <Table.HeaderCell>เวลา</Table.HeaderCell>
              <Table.HeaderCell>ประเภท</Table.HeaderCell>
              <Table.HeaderCell>คะแนน</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {/* {!isLoading ? ( */}
            { this.state.user_result.map((user_result, i) =>       
              <Table.Body  sortable celled fixed fluid key={i}>
                <Table.Row>
                  <Table.Cell>{user_result.date}</Table.Cell>
                  <Table.Cell>{user_result.time}</Table.Cell>
                  <Table.Cell>{user_result.type}</Table.Cell>
                  <Table.Cell>{user_result.value}</Table.Cell>
                </Table.Row>
              </Table.Body>
              )}
            {/* )  : (
            <h3>Loading...</h3> */}
          {/* )} */}
    {/* { this.state.user_homework.map((user_homework, i) => 
              
                <Table.Body  sortable celled fixed fluid key={i}>
                  <Table.Row>
                    <Table.Cell>{user_homework.date}</Table.Cell>
                    <Table.Cell>{user_homework.stress}</Table.Cell>
                    <Table.Cell>{user_homework.anx}</Table.Cell>
                    <Table.Cell>{user_homework.depress}</Table.Cell>
                  </Table.Row>
                </Table.Body>
    )} */}
    
      </Table>
      </Segment>
      );
    }
  }export default Result;
