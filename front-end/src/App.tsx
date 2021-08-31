import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import 'primereact/resources/themes/rhea/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import "./service/firebase";

import { Internal } from './pages/Internal';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';



function App() {
  return(<>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />        
        <Route path="/" component={Internal} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
    
  </>);
}

export default App;
