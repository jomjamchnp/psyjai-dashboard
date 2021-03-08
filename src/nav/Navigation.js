import React, { useState } from 'react';
import '../css/nav.css'
import {
    Navbar,
    NavbarBrand,
  } from 'reactstrap';
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

class Navigation extends React.Component {
  render(){
    return (
          <Navbar expand="md" className="shadow-sm text-center" id="nav">
              <NavbarBrand id="text-menu">Dashboard</NavbarBrand>
          </Navbar>
        );

  }
}export default Navigation;

