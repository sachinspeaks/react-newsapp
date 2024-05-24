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

import React, { useEffect, useReducer, useState, useRef } from "react";
import axios from "axios";
const Input = {
  area: [],
  areaInstance: [],
  nfzs: [],
  nfzInstances: [],
  bases: [],
  baseInstances: [],
};
function getRandomHexColor() {
  // Generate a random number between 0 and 16777215 (decimal for 0xFFFFFF)
  let randomNum = Math.floor(Math.random() * 16777215);
  // Convert the number to a hexadecimal string
  let hexString = randomNum.toString(16);
  // Pad the string with leading zeros if necessary to ensure it has 6 characters
  while (hexString.length < 6) {
    hexString = "0" + hexString;
  }
  // Return the hex string prefixed with a #
  return "#" + hexString;
}
const httpClient = axios.create();
httpClient.defaults.timeout = 200000;
const reducerMethod = (data, action) => {
  switch (action.type) {
    case "clear_area":
      data.areaInstance.map((inst) => {
        inst.setMap(null);
      });

      data.area = [];
      data.areaInstance = [];
      return data;
    case "create_area":
      data.area.push(action.payload.feature);
      data.areaInstance.push(action.payload.instance);
      return data;
    case "append_nfz":
      data.nfzs = [...data.nfzs, action.payload.feature];
      data.nfzInstances = [...data.nfzInstances, action.payload.instance];
      return data;
    case "clear_nfzs":
      data.nfzs = [];
      data.nfzInstances.map((instance) => {
        instance.setMap(null);
      });
      data.nfzInstances = [];
      return data;
    case "append_bases":
      data.bases = [...data.bases, action.payload.feature];
      data.baseInstances = [...data.baseInstances, action.payload.instance];
      return data;
    case "clear_bases":
      data.bases = [];
      data.baseInstances.map((instance) => {
        instance.setMap(null);
      });
      data.baseInstances = [];
      return data;
  }
};

const Tester = ({ map, drawingManager }) => {
  const [type, setType] = useState(null);

  const [inputData, dispatch] = useReducer(reducerMethod, Input);
  const [] = useReducer();
  useEffect(() => {
    switch (type) {
      case "area":
        drawingManager.setDrawingMode("polygon");
        break;
      case "nfz":
        drawingManager.setDrawingMode("polygon");
        break;
      case "base":
        drawingManager.setDrawingMode("marker");
        break;
      case null:
        drawingManager.setDrawingMode(null);
        break;
    }
    var event = google.maps.event.addListener(
      drawingManager,
      "overlaycomplete",
      function (event) {
        if (event.type == "polygon") {
          if (type == "area") {
            const coords = [];
            event.overlay.latLngs.forEach((latlngs) => {
              latlngs.forEach((e) => {
                coords.push([e.lng(), e.lat()]);
              });
            });
            const feature = {
              type: "Feature",
              geometry: {
                type: "polygon",
                coordinates: [coords],
              },
            };
            // dispatch({
            //   type: "clear_area",
            // });
            setTimeout(() => {
              dispatch({
                type: "create_area",
                payload: { feature, instance: event.overlay },
              });
            }, 0);
          }
          if (type == "nfz") {
            const coords = [];
            event.overlay.latLngs.forEach((latlngs) => {
              latlngs.forEach((e) => {
                coords.push([e.lng(), e.lat()]);
              });
            });
            const feature = {
              type: "Feature",
              geometry: {
                type: "polygon",
                coordinates: [coords],
              },
            };
            dispatch({
              type: "append_nfz",
              payload: { feature, instance: event.overlay },
            });
          }
        }
        if (event.type == "marker") {
          if (type == "base") {
            const coord = [
              event.overlay.position.lng(),
              event.overlay.position.lat(),
            ];
            console.log(event.overlay);
            const feature = {
              type: "Feature",
              geometry: { type: "Point", coordinates: coord },
            };
            dispatch({
              type: "append_bases",
              payload: { feature, instance: event.overlay },
            });
          }
        }
      }
    );
    return () => {
      event.remove();
    };
  }, [type]);

  const sendReq = async () => {
    setLoading(true);
    paths.map((pth) => {
      pth.setMap(null);
    });
    let input;
    try {
      input = {
        nfzs: inputData.nfzs.map((nfz) => [
          ...nfz.geometry.coordinates[0],
          nfz.geometry.coordinates[0][0],
        ]),
        bs: inputData.bases.map((base) => {
          return [base.geometry.coordinates[1], base.geometry.coordinates[0]];
        }),
        Isopt: String(Isopt),
        incAngle,
        incDist,
        MAX_DRONES,
        dt1,
        dt2,
        rgn_sp,
        dtt: "null",
        th_dist,
        angle,
        GSD: 0.001,
      };
      if (inputData.area.length == 1) {
        input["poly"] = [
          ...inputData.area[0].geometry.coordinates[0],
          inputData.area[0].geometry.coordinates[0][0],
        ];
      } else {
        input["polys"] = [
          ...inputData.area.map((area) => {
            console.log(area);
            return [
              ...area.geometry.coordinates[0],
              area.geometry.coordinates[0][0],
            ];
          }),
        ];
      }
    } catch (err) {
      console.log(err);
      alert("error in input creation...!!");
      console.log("please complete the input ");
    }
    console.log(input);
    console.log(JSON.stringify(input));
    input["GSD"] = 0.0001;
    try {
      const resp = await httpClient.post(
        // "http://localhost:4009/api/v3/multi_drone_non_opt",
        "http://192.168.1.58:4009/api/v3/multi_drone_non_opt",
        input
      );

      console.log(resp.data);
      // const feature = {
      //   type: "Feature",
      //   geometry: { type: "LineString", coordinates: resp.data.path_n },
      // };
      // console.log(resp.data.path_n);
      // const pths = [];
      for (let i = 0; i < resp.data.path_n.length; i++) {
        const abc = new google.maps.Polyline({
          path: resp.data.path_n[i].map((point) => ({
            lat: point[0],
            lng: point[1],
          })),
          geodesic: true,
          strokeColor: getRandomHexColor(),
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: map,
        });

        const el = document.createElement("div");
        el.className = `opacity-80 relative left-0 top-[1.5rem]  w-12 h-12 rounded-full border-4 hover:cursor-pointer [&>svg]:w-full [&>svg]:h-full [&>svg]:scale-150 `;
        const tempGoogleMarker =
          new window.google.maps.marker.AdvancedMarkerElement({
            map: map,
            content: el,
            gmpDraggable: true,
          });
        tempGoogleMarker.position = {
          lat: resp.data.path_n[i][0],
          lng: resp.data.path_n[i][1],
        };
        tempGoogleMarker.addListener("drag", handleDrag);
        tempGoogleMarker.addListener("dragstart", handleDragStart);

        const listener = google.maps.event.addListener(abc, "click", () => {
          setPolylineActive(polyTem.id);
        });
        polylineListenersRef.current.push(listener);
        polylineRef.current.push(abc);
      }
      setPath(polylineRef.current);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const setPolylineActive = (x) => {
    console.log("currently active polyline is ", x);
    setActivePath(x);
  };
  const [paths, setPath] = useState([]);
  const polylineRef = useRef([]);
  const polylineListenersRef = useRef([]);
  const markerRef = useRef([]);
  const addMarkerRef = useRef([]);
  const [activePath, setActivePath] = useState(0);
  const [loading, setLoading] = useState(false);
  const [Isopt, setIsopt] = useState(true);
  const [incAngle, setIncAngle] = useState(30);
  const [incDist, setIncDist] = useState(1);
  const [MAX_DRONES, setMaxDrones] = useState(10);
  const [dt1, setDt1] = useState(10);
  const [dt2, setDt2] = useState(10);
  const [rgn_sp, set_rgn_sp] = useState(10);
  const [th_dist, set_th_dist] = useState(1600);
  const [angle, setangle] = useState(0);
  return (
    <div styele={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <button
          style={type == "area" ? { background: "teal" } : {}}
          onClick={() => {
            setType("area");
          }}
        >
          create area
        </button>
        <button
          style={type == "nfz" ? { background: "teal" } : {}}
          onClick={() => {
            setType("nfz");
          }}
        >
          create nfz
        </button>
        <button
          style={type == "base" ? { background: "teal" } : {}}
          onClick={() => {
            setType("base");
          }}
        >
          create bases
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "around",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <button
          onClick={() => {
            dispatch({ type: "clear_nfzs" });
          }}
        >
          clear nfzs
        </button>
        <button
          onClick={() => {
            dispatch({ type: "clear_bases" });
          }}
        >
          clear bases
        </button>
        <button
          onClick={() => {
            setType(null);
          }}
          style={{ width: "100%" }}
        >
          stop drawing
        </button>
      </div>
      <div>
        {/* <div>{inputData}</div> */}
        <div>
          {" "}
          <p>Isopt: </p>
          <input
            type="checkbox"
            checked={Isopt}
            onChange={() => {
              setIsopt((val) => !val);
            }}
          />
        </div>
        <div>
          {" "}
          <p>incAngle: </p>
          <input
            type="Number"
            value={incAngle}
            onChange={(e) => {
              setIncAngle(Number(e.target.value));
            }}
          />
        </div>
        <div>
          {" "}
          <p>incDist: </p>
          <input
            type="Number"
            value={incDist}
            onChange={(e) => {
              setIncDist(Number(e.target.value));
            }}
          />
        </div>
        <div>
          <p>maxDrones: </p>
          <input
            type="Number"
            value={MAX_DRONES}
            onChange={(e) => {
              setMaxDrones(Number(e.target.value));
            }}
          />
        </div>
        <div>
          <p>dt1: </p>
          <input
            type="Number"
            value={dt1}
            onChange={(e) => {
              setDt1(Number(e.target.value));
            }}
          />
        </div>
        <div>
          <p>dt2: </p>
          <input
            type="Number"
            value={dt2}
            onChange={(e) => {
              setDt2(Number(e.target.value));
            }}
          />
        </div>
        <div>
          <p>rgn_sp: </p>
          <input
            type="Number"
            value={rgn_sp}
            onChange={(e) => {
              set_rgn_sp(Number(e.target.value));
            }}
          />
        </div>
        <div>
          <p>th_dist: </p>
          <input
            type="Number"
            value={th_dist}
            onChange={(e) => {
              set_th_dist(Number(e.target.value));
            }}
          />
        </div>

        <div>
          <p>angle: </p>
          <input
            type="Number"
            value={angle}
            onChange={(e) => {
              setangle(Number(e.target.value));
            }}
          />
        </div>
        {loading ? (
          <div style={{ padding: "4rem", border: "0.25rem solid white" }}></div>
        ) : (
          <button onClick={sendReq} style={{ width: "100%" }}>
            send
          </button>
        )}
      </div>
    </div>
  );
};

export default Tester;
