import { Route, Switch } from 'react-router-dom';

import { About } from '@internal/About';
import { Course } from '@course/Course';
import { CourseList } from '@study/CourseList';
import { Help } from '@internal/Help';
import { Home } from '@internal/Home';
import { Material } from '@study/Material';
import { Query } from '@study/Query';
import { Question } from '@question/Question';
import { Template } from '@components/Template';
import { User } from '@user/User';
import { Video } from '@study/Video';

function Internal() {
  return (
    <Template>
      <Switch>
        <Route exact path="/app" component={Home} />
        <Route exact path="/app/user" component={User} />
        <Route exact path="/app/course" component={Course} />
        <Route exact path="/app/question" component={Question} />
        <Route exact path="/app/help" component={Help} />
        <Route exact path="/app/about" component={About} />
        <Route exact path="/app/study/material">
          <CourseList redictFor="material" />
        </Route>
        <Route exact path="/app/study/material/:id" component={Material} />
        <Route exact path="/app/study/question">
          <CourseList redictFor="question" />
        </Route>
        <Route exact path="/app/study/question/:id" component={Query} />
        <Route exact path="/app/study/video" component={Video} />

        <Route exact path="/app/study/simulated">
          <CourseList redictFor="simulated" />
        </Route>
        <Route path="/app/*" component={Home} />
      </Switch>
    </Template>
  );
}

export { Internal };
