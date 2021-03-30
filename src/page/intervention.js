import React from "react";

import avatar from '../images/matthew.png'; 
import '../css/dash.css'
import 'semantic-ui-css/semantic.css';
import { Segment,Label,Menu,Input,Image,Icon,Card } from 'semantic-ui-react'
import { Col,Row,Button,Grid,Container } from 'react-bootstrap'
import { FaHome,FaTheaterMasks,FaRegLightbulb,FaRegEdit,FaTree,FaQuestion} from "react-icons/fa";
import { MdMood } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
// import {browserHistory} from 'react-router';
import { history } from '../history';
import ja from "date-fns/locale/ja";

class Intervention extends React.Component {
  constructor(props) {
    super(props);
     this.state = {     
      pictures: [],
      isLoading: true,
      users: [],
      error: null,
      time: [],
      firstname: ' ',
      lastname: ' ',
      setItems: [],
      items: [],
      user_intervention:[],
      inter_value:' ',
      have:true,
      url:' '
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
      const intervention_img = [
        {
            name:'problem solving', value:'https://react.semantic-ui.com/images/avatar/large/joe.jpg'
        },
        {
            name:'Positivethink', value:'https://react.semantic-ui.com/images/avatar/large/elliot.jpg' 
        },
        {
            name:'self-esteem', value:'https://react.semantic-ui.com/images/avatar/large/stevie.jpg'
        },
        {
            name:'name 3 positive things', value:'https://react.semantic-ui.com/images/avatar/large/nan.jpg'
        },
        {
            name:'remotivation', value:'https://react.semantic-ui.com/images/avatar/large/zoe.jpg'
        },
        {
            name:'gradtitude', value:'https://react.semantic-ui.com/images/avatar/large/ade.jpg'
        },
        {
            name:'Socialsupport', value:'https://react.semantic-ui.com/images/avatar/large/christian.jpg' 
        },
        {
            name:'Teamwork', value:'https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
        },
        {
            name:'Good Communication', value:'https://react.semantic-ui.com/images/avatar/large/veronika.jpg'
        }]
      // Where we're fetching data from
      fetch('http://localhost:3001/intervention')
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then(data => {
            this.setState({
                users: data,
                isLoading: false,
            })
           // console.log(data)
           let status
            for (let i=0; i < intervention_img.length; i++){
                for(let j=0; j < data.length; j++){
                   console.log(data[j].value)           
                  if(data[j].value === intervention_img[i].name){
                    status = false
                    break
                  }
                  else{
                    status = true
                  }
              }
              this.state.user_intervention.push({
                inter_value: intervention_img[i].name,
                have: status,
                url: intervention_img[i].value
              })
            }
          this.setState({
            items: this.state.user_intervention
          })

          })
         
        // Catch any errors we hit and update the app
        .catch(error => this.setState({ error, isLoading: false }));
    }
    

    componentDidMount() {
      this.fetchIntervention();
    }
  render() {
    const src = '/images/wireframe/white-image.png'
    const item =[]
    const {isLoading, users, error } = this.state;
    const { activeItem } = this.state
    console.log("intervention_img")
   
    console.log(this.state.items)
    return (
      <Segment>
      <h3 id="font">สิ่งที่ได้เรียนรู้</h3>
     {/* // {this.check_inter()} */}
      {!isLoading ? (
       <Card.Group itemsPerRow={4}>
       { this.state.user_intervention.map((user_intervention, i) => 
           <Card >
             <Image src={user_intervention.url}  disabled={user_intervention.have}  />
               <Card.Content>
               <Card.Description>{user_intervention.inter_value} </Card.Description>
               </Card.Content>  
           </Card>    
              
        )}
         </Card.Group> )  : (
      <h3>Loading...</h3>
    )}
      </Segment>     
      
    );
  }
}export default Intervention;

