import React from 'react';

import 'primereact/resources/themes/rhea/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import "./service/firebase"

// import { User } from './pages/User/User'
// import { Course } from './pages/Course/Course'
import { Question } from './pages/Question/Question'

function App() {
  return(<>
    <Question />
  </>);
}

export default App;
