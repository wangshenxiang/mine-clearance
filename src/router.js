import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import MineClearance from "./routes/MineClearance";
import Json from "./routes/json/Json";

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        {/*测试&练手*/}
        <Route path="/" exact component={IndexPage}/>
        <Route path="/products" exact component={Products}/>
        <Route path="/mineClearance" exact component={MineClearance}/>

        {/*正式工作*/}
        <Route path="/json" exact component={Json}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
