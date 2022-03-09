import React from 'react';
import {Switch, Route, HashRouter} from "react-router-dom";
import Inicio from "./views/inicio";


import './App.css';
import './css/toolbarStyle.css';
import './css/vendor/bootstrap/css/bootstrap.min.css';
import RegisterView from './views/registerView';
import MAccount from './views/my';


const App: React.FC = () => (
  
  <HashRouter>
      <Switch>
        <Route path="/" exact component={Inicio}/>
        <Route path="/registrarse" exact component={RegisterView}/>
        <Route path="/my" exact component={MAccount}/>
      </Switch>
  </HashRouter>
  
);

export default App;

