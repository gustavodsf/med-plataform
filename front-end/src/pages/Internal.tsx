import { Template } from '../components/Template';
import { Route, Switch } from 'react-router-dom'

import { User } from '../pages/User/User';
import { Course } from '../pages/Course/Course';
import { Question } from '../pages/Question/Question';
import { Home } from '../pages/Home/Home';

function Internal() {

  return(
    <Template>
      <Switch>
        <Route exact path="/app" component={Home} />
        <Route exact path="/app/user" component={User} />
        <Route exact path="/app/course" component={Course} />
        <Route exact path="/app/question" component={Question} />
        <Route path="/app/*" component={Home} />
      </Switch>
    </Template>
  );
}

export { Internal }