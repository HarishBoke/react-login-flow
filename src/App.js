import React from 'react';
import './App.css';
import { Redirect } from "react-router-dom";


class App extends React.Component {
    
    state = {
      userName: localStorage.getItem("userName"),
      userToken: localStorage.getItem("userToken"),
      userType: localStorage.getItem("userType")
    };
  
    render(){
      //TODO:: add restricted routes where
      if (!this.state.userToken) return <Redirect to="/login" />
      else return <Redirect to="/welcome" />
    }
}

export default App;
