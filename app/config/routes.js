import React from 'react'
import { Router, Route, Layout, BrowserRouter, HashRouter } from 'react-router-dom'
import Root from '../components/Root'
import EditSection from '../components/EditSection'
import LandingPage from '../components/LandingPage'
import ErrorPage from '../components/ErrorPage'

const routes = (
  <HashRouter>
    <div>
      <Root>
        <Route exact path='/' component={LandingPage} />
      </Root>
      <Route exact path='/pages/:hashId' component={EditSection} />
      <Route exact path='/pages' component={ErrorPage} />
    </div>
  </HashRouter>
);

export default routes