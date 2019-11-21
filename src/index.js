import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Switch ,BrowserRouter as Router } from 'react-router-dom';


import "./shared/service";


import Login from './components/login';
import Register from './components/register';
import Welcome from './components/welcome';
import Notfound from './components/notfound'

const routing = (
    <Router>
      <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/welcome" component={Welcome} />
        {/* if(IS_AUTHENTICATED === true){
            <Route path="/welcome" component={Welcome} />
          } */}
        <Route component={Notfound} />
      </Switch>
       
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
