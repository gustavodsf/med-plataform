import { Route, Switch } from 'react-router-dom'

import { Course }     from '../pages/Course/Course';
import { CourseList } from '../pages/Study/CourseList'
import { Home }       from '../pages/Home/Home';
import { Question }   from '../pages/Question/Question';
import { Template }   from '../components/Template';
import { User }       from '../pages/User/User';
import { Material }   from '../pages/Study/Material';
import { Query }      from '../pages/Study/Query';
import { About }      from '../pages/Home/About';
import { Help }       from '../pages/Home/Help';


function Internal() {

  return(
    <Template>
      <Switch>
        <Route exact path="/app" component={Home} />
        <Route exact path="/app/user" component={User} />
        <Route exact path="/app/course" component={Course} />
        <Route exact path="/app/question" component={Question} />
        <Route exact path="/app/help" component={Help} />
        <Route exact path="/app/about" component={About} />
        <Route exact path="/app/study/material">
          <CourseList redictFor="material"/>
        </Route>
        <Route exact path="/app/study/material/:id" component={Material} />
        <Route exact path="/app/study/question">
          <CourseList redictFor="question" />
        </Route>
        <Route exact path="/app/study/question/:id" component={Query} />
        <Route exact path="/app/study/simulated">
          <CourseList redictFor="simulated" />
        </Route>
        <Route path="/app/*" component={Home} />
      </Switch>
    </Template>
  );
}

export { Internal }