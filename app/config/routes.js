import React from 'react'
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router'
import Root from '../components/Root'
import MainBody from '../components/MainBody'
import ResumeContainer from '../containers/ResumeContainer'
import ResumePage from '../components/ResumePage'
import ErrorPage from '../components/ErrorPage'

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Root}>
      <IndexRoute component={MainBody} />
      <Route path='edit/:hashId' header='Edit' component={ResumePage} />
      <Route path='edit' header='Edit' component={ErrorPage} />
    </Route>
  </Router>
);

export default routes