import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useContext } from 'react'

import 'primereact/resources/themes/rhea/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import "./service/firebase";

import { Internal } from './pages/Internal';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { AuthContextProvider, AuthContext } from './context/AuthContext';


const PrivateRoute = (props: any) => {
  const { component: Component, ...rest } = props;
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <Route
      {...rest}
      render={(matchProps) =>
        user ? <Component {...matchProps} /> : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  return(<>
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>      
            <Route exact path="/login" component={Login} />        
            <PrivateRoute path="/app" component={Internal} />
            <Redirect exact from="/" to="/login" />
            <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
    
  </>);
}

export default App;
