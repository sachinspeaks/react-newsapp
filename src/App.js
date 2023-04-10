import "./App.css";
import React from "react";
import { useState } from "react";
import Navbar from "./components/navbar";
import News from "./components/news";
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

const App=()=>{
  const [Progress, setProgress] = useState(0)
  const pagesize = 6
  const apikey=process.env.REACT_APP_NEWS_API
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={2}
            Progress={Progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apikey={apikey} key={"General"} pagesize={pagesize} country={"in"} category={"general"} />} />
            <Route exact path="/business" element={<News setProgress={setProgress} apikey={apikey} key={"business"} pagesize={pagesize} country={"in"} category={"business"} />} />
            <Route exact path="/general" element={<News setProgress={setProgress} apikey={apikey} key={"general"} pagesize={pagesize} country={"in"} category={"general"} />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key={"entertainment"} pagesize={pagesize} country={"in"} category={"entertainment"} />} />
            <Route exact path="/health" element={<News setProgress={setProgress} apikey={apikey} key={"health"} pagesize={pagesize} country={"in"} category={"health"} />} />
            <Route exact path="/sports" element={<News setProgress={setProgress} apikey={apikey} key={"sports"} pagesize={pagesize} country={"in"} category={"sports"} />} />
            <Route exact path="/science" element={<News setProgress={setProgress} apikey={apikey} key={"science"} pagesize={pagesize} country={"in"} category={"science"} />} />
            <Route exact path="/technology" element={<News setProgress={setProgress} apikey={apikey} key={"technology"} pagesize={pagesize} country={"in"} category={"technology"} />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App

//f91b353263364d029b0a515ad7b588dd
