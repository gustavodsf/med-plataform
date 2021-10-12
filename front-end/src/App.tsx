import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import { useContext } from 'react';

import 'primereact/resources/themes/rhea/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'react-pdf/dist/umd/Page/AnnotationLayer.css';
import './service/firebase';

import { Internal } from '@internal/Internal';
import { Login } from '@internal/Login';
import { NotFound } from '@internal/NotFound';
import { AuthContextProvider, AuthContext } from '@context/AuthContext';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PrivateRoute = (props: any) => {
  const { component: Component, ...rest } = props;
  const { user } = useContext(AuthContext);

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
  return (
    <>
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
    </>
  );
}

export default App;
