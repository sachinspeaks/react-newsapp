import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/navbar";
import News from "./components/news";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pagesize=6
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News key={"General"} pagesize={this.pagesize} country={"in"} category={"general"} />} />
            <Route exact path="/business" element={<News key={"business"} pagesize={this.pagesize} country={"in"} category={"business"} />} />
            <Route exact path="/general" element={<News key={"general"} pagesize={this.pagesize} country={"in"} category={"general"} />} />
            <Route exact path="/entertainment" element={<News key={"entertainment"} pagesize={this.pagesize} country={"in"} category={"entertainment"} />} />
            <Route exact path="/health" element={<News key={"health"} pagesize={this.pagesize} country={"in"} category={"health"} />} />
            <Route exact path="/sports" element={<News key={"sports"} pagesize={this.pagesize} country={"in"} category={"sports"} />} />
            <Route exact path="/science" element={<News key={"science"} pagesize={this.pagesize} country={"in"} category={"science"} />} />
            <Route exact path="/technology" element={<News key={"technology"} pagesize={this.pagesize} country={"in"} category={"technology"} />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

//f91b353263364d029b0a515ad7b588dd
