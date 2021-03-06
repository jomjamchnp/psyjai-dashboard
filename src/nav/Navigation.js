import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react'
import '../css/nav.css'
import {
    Navbar,
    NavbarBrand,
  } from 'reactstrap';

class Navigation extends React.Component {
  render() {
    return (
       <Navbar expand="md" className="shadow-sm text-center" id="nav">
           <NavbarBrand id="text-menu">Dashboard</NavbarBrand>
       </Navbar>
    );
  }
}

export default Navigation;
