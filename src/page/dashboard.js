import { Header } from 'semantic-ui-react'
import '../css/dash.css'
import React from "react";
//import { Button, View, Alert } from "react-native";
import 'semantic-ui-css/semantic.min.css'
import { Segment,Tab,Card } from 'semantic-ui-react'
import { Col,Form,Button, } from 'react-bootstrap'
class Dashboard extends React.Component {
    
    render(){ 
      const panes = [
        { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
        { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
        { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
      ]
      
      const TabExampleVerticalTabular = () => (
        <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
      )
    return (
        //<div class="bg">DASHBOARD</div>
        <div>
          <div class="ui grid">
            <div class="four wide column">
              <div class="ui fluid vertical tabular menu">
                <a class="active item">Tab 1</a>
                <a class="item">Tab 2</a>
                <a class="item">Tab 3</a>
              </div>
            </div>
            <div class="stretched twelve wide column">
              <div class="ui bottom attached segment active tab">Tab 1 Content</div></div>
          </div>
        </div>
        
        

       
    );
  }
}export default Dashboard;

