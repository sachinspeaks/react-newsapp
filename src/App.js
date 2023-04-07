import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/navbar";
import News from "./components/news";
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  state={
    progress:0,
  }
  setProgress=(progress)=>
  {
    this.setState({progress:progress})
  }
  pagesize = 6
  apikey=process.env.REACT_APP_NEWS_API
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={2}
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} key={"General"} pagesize={this.pagesize} country={"in"} category={"general"} />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key={"business"} pagesize={this.pagesize} country={"in"} category={"business"} />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} apikey={this.apikey} key={"general"} pagesize={this.pagesize} country={"in"} category={"general"} />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key={"entertainment"} pagesize={this.pagesize} country={"in"} category={"entertainment"} />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key={"health"} pagesize={this.pagesize} country={"in"} category={"health"} />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key={"sports"} pagesize={this.pagesize} country={"in"} category={"sports"} />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key={"science"} pagesize={this.pagesize} country={"in"} category={"science"} />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key={"technology"} pagesize={this.pagesize} country={"in"} category={"technology"} />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

//f91b353263364d029b0a515ad7b588dd
