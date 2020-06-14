import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './views/HomePage'
import Navbar from './components/Navbar'
import ContactPage from './views/ContactPage'
import ContactDetailsPage from './views/ContactDetailsPage'
import StatisticPage from './views/StatisticPage'
import ContactEditPage from './components/ContactEditPage'
import Signup from './views/Signup'
import MoveList from './components/MoveList'


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/contact" component={ContactPage}></Route>
        <Route exact path="/contact/edit/:id?" component={ContactEditPage}></Route>
        <Route exact path="/contact/:id" component={ContactDetailsPage}></Route>
        <Route exact path="/statistic" component={StatisticPage}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/moves" component={MoveList}></Route>
      </Switch>
    </div>
  );
}

export default App;
