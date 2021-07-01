import React from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MediaQuery from "react-responsive";

function App() {
  return (
    <div className="App" >
      <Router>
        <Navbar />

        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/detail/:id' exact component={Detail}/>
        </Switch>
      </Router>

      <div>
            <h1>Device Test!</h1>
            <MediaQuery minWidth={1224}>
                <p>You are a desktop or laptop</p>
                <MediaQuery minWidth={1824}>
                    <p>You also have a huge screen</p>
                </MediaQuery>
            </MediaQuery>

            <MediaQuery maxWidth={1224}>
                <p>You are a tablet or mobile</p>
            </MediaQuery>

            {/* check whether is retina mon or not. */}
            <MediaQuery minResolution="2dppx">
                {/* You can also use a function (render prop) as a child */}
                {(matches) =>
                    matches
                        ? <p>You are retina</p>
                        : <p>You are not retina</p>
                }
            </MediaQuery>

            <MediaQuery orientation={'portrait'}>
                {(matches) =>
                    matches
                        ? <p>You are in portrait</p>
                        : <p>You are in landscape</p>
                }
            </MediaQuery>
        </div>
    </div>
  );
}

export default App;
