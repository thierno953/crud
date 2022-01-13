import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddInfo from "./components/AddInfo";
import EditInfo from "./components/EditInfo";

function App() {
  return (
    <Router> 
      <Navbar />
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/info" component={AddInfo} />
      <Route exact path="/info/:id" component={EditInfo} />
      </Switch> 
    </Router>
  );
}

export default App;
