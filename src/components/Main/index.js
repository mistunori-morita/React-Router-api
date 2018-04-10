import React from 'react'
import { Switch, Router } from 'react-router-dom';
import Series from '../../containers/Series';
import SingleSeries from '../../containers/SingleSeries';


const Main = props =>(
  <Switch>
    <Router exact path="/" component={Series} />
    <Router path="/series/:id" component={SingleSeries} />
  </Switch>
);

export default Main;