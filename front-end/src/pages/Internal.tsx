import { Template } from '../components/Template';
import { Route, Switch } from 'react-router-dom'

import { User } from '../pages/User/User'
import { Course } from '../pages/Course/Course'
import { Question } from '../pages/Question/Question'

function Internal() {

  return(
    <Template>
      <Switch>
        <Route exact path="/internal/user" component={User} />
        <Route exact path="/internal/course" component={Course} />
        <Route exact path="/internal/question" component={Question} />
      </Switch>
    </Template>
  );
}

export { Internal }