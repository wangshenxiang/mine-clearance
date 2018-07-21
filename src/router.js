import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import MineClearance from "./routes/MineClearance";

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage}/>
        <Route path="/products" exact component={Products}/>
        <Route path="/mineClearance" exact component={MineClearance}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
