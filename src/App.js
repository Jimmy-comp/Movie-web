import React from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App" >
      <Router>
        <Navbar />

        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/detail/:id' exact component={Detail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
