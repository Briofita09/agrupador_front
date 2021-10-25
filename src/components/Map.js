import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import api from "./apis/api";

const geolib = require("geolib");

function Mapa() {
  const [groupsState, setGroupsState] = useState([
    {
      id: 0,
      name: "",
      lat: 0,
      lng: 0,
    },
  ]);

  const [closerGroups, setCloserGroups] = useState([]);

  const [myLocationState, setMyLocationState] = useState({
    latitude: 0,
    longitude: 0,
  });

  const containerStyle = {
    width: "800px",
    height: "600px",
  };

  const center = {
    lat: myLocationState.latitude,
    lng: myLocationState.longitude,
  };

  useEffect(() => {
    const abortCont = new AbortController();

    async function fetchGroups() {
      try {
        const response = await api.get("/grupos", { signal: abortCont.signal });
        setGroupsState(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchGroups();

    function getCloserGroups() {
      let closer = [];
      groupsState.map((group) => {
        if (
          geolib.getDistance(
            { latitude: group.lat, longitude: group.lng },
            { latitude: center.lat, longitude: center.lng }
          ) > 1000
        ) {
          closer.push(group);
        }
      });
      setCloserGroups(closer);
    }
    getCloserGroups();
    return () => abortCont.abort();
  }, [center.lat, center.lng]);

  function succes(pos) {
    let crd = pos.coords;
    setMyLocationState(crd);
  }

  function error(err) {
    console.log(err);
  }
  navigator.geolocation.getCurrentPosition(succes, error);
  //console.log(groupsState);
  console.log(closerGroups);
  return (
    <div className="mapa">
      <div>
        <LoadScript googleMapsApiKey="AIzaSyAKsKzgjv_WvVG5GMwrr2EIQt9TGxt1UuI">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={18}
          >
            <Marker
              position={center}
              options={{
                label: { text: "Minha Localização", className: "markerLabel" },
              }}
            />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default Mapa;
