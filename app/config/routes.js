import React from 'react'
import { Router, Route, Layout, BrowserRouter, IndexRoute } from 'react-router-dom'
import Root from '../components/Root'
import MainBody from '../components/MainBody'
import ErrorPage from '../components/ErrorPage'

const routes = (
  <BrowserRouter>
    <Root>
      <Route component={MainBody} />
    </Root>
  </BrowserRouter>
);

export default routes