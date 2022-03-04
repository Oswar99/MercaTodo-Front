import React from 'react';
import {Switch, Route, HashRouter} from "react-router-dom";
import Inicio from "./views/inicio";


import './App.css';
import './css/toolbarStyle.css';
import './css/vendor/bootstrap/css/bootstrap.min.css';


const App: React.FC = () => (
  
  <HashRouter>
      <Switch>
        <Route path="/" exact component={Inicio}/>
      </Switch>
  </HashRouter>
  
);

export default App;

