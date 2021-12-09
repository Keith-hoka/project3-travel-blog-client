import { useState, useEffect } from 'react';
import ReactMapGL, {
  ScaleControl,
  Marker,
  NavigationControl,
  Popup,
} from 'react-map-gl';
import Button from '@mui/material/Button';

import { api } from "../helpers/helpers";
import AddLogForm from "./AddLogForm";
import "./Mapbox.css";

const scaleControlStyle= {
  left: 20,
  bottom: 50
};

const navControlStyle= {
  right: 10,
  top: 10
};

const nightMode = "mapbox://styles/keithhoka/ckwsvlv7fdmrb14mkmpdm2js2";
const dayMode = "mapbox://styles/keithhoka/ckwsvdkee3lf514pcc9wqaar6";

const Mapbox = () => {
  const [logs, setLogs] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addLogLocation, setAddLogLocation] = useState(null);
  const [mode, setMode] = useState(dayMode);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: -25.2744,
    longitude: 133.7751,
    zoom: 4,
  });

  const getLogs = async() => {
    const logs = await api.getLogs();
    if (localStorage.getItem('user') !== undefined){
      setLogs(logs);
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  const handleShowAddLogPopup = (event) => {
    const [ longitude, latitude ] = event.lngLat;
    setAddLogLocation({
      longitude,
      latitude,
    });
  };

  const changeToNightMode = () => {
    setMode(nightMode);
  };

  const changeToDayMode = () => {
    setMode(dayMode);
  };

  return (
    <ReactMapGL
      {...viewport}
      // mapboxApiAccessToken={import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapboxApiAccessToken="pk.eyJ1Ijoia2VpdGhob2thIiwiYSI6ImNrd3N1dWZ2MjA2cXoydmtwbXd6Znk2cngifQ.5GB8Hr0f_7w1Gw1mYXQjZA"
      mapStyle={mode}
      onViewportChange={setViewport}
      onDblClick={handleShowAddLogPopup}
    >
      { mode === dayMode ?
        <div>
          <Button color="secondary" className="maxbox-dayModeBtn" onClick={changeToNightMode} variant="outlined">Night Mode</Button>
          <Button color="secondary" className="maxbox-dayModeBtn" onClick={changeToDayMode} variant="outlined">Day Mode</Button>
        </div> :
        <div>
          <Button color="secondary" className="maxbox-nightModeBtn" onClick={changeToNightMode} variant="outlined">Night Mode</Button>
          <Button color="secondary" className="maxbox-nightModeBtn" onClick={changeToDayMode} variant="outlined">Day Mode</Button>
        </div>
      }

      <ScaleControl maxWidth={100} unit="metric" style={scaleControlStyle} />
      <NavigationControl style={navControlStyle} />

      {logs.map((log) => (
        <div key={log._id}>
          <Marker
            latitude={log.latitude}
            longitude={log.longitude}
          >
            <div onClick={() => setShowPopup({
              [log._id]: true
            })}>
              <svg
                style={{
                  width: `${4 * viewport.zoom}px`,
                  height: `${4 * viewport.zoom}px`,
                }}
                viewBox="0 0 24 24"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mapbox-marker">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>

          {
            showPopup[log._id]
            ?
            <Popup
            latitude={log.latitude}
            longitude={log.longitude}
            closeButton={true}
            closeOnClick={true}
            onClose={() => setShowPopup({})}
            anchor="top"
            sortByDepth={true}
            dynamicPosition={true}
            >
              <div className="mapbox-popup">
                <h3>{log.title}</h3>
                <p>Visitor: {log.comments}</p>
                <p>Rating: {log.rating}</p>
                  {log.image ? <img src={log.image} alt={log.title} /> : null}
                <small>Visited on: {new Date(log.visitDate).toLocaleString()}</small>
                <h3>Description</h3>
                <p>{log.description}</p>
              </div>
            </Popup>
            :
            null
          }
        </div>
      ))}
      {
        addLogLocation
        ?
        <div>
          <Marker
            latitude={addLogLocation.latitude}
            longitude={addLogLocation.longitude}
          >
            <div>
              <svg
                style={{
                  width: `${4 * viewport.zoom}px`,
                  height: `${4 * viewport.zoom}px`,
                }}
                viewBox="0 0 24 24"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mapbox-addMarker">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          <Popup
          latitude={addLogLocation.latitude}
          longitude={addLogLocation.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setAddLogLocation(null)}
          anchor="top"
          sortByDepth={true}
          dynamicPosition={true}
          >
            <div className="mapbox-popup">
              <AddLogForm
                onClose={() => {
                  setAddLogLocation(null);
                  getLogs();
                }}
                location={addLogLocation}
              />
            </div>
          </Popup>
        </div>
        :
        null
      }
    </ReactMapGL>
  );
};

export default Mapbox;
