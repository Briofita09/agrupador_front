import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Modal from "./Modal";

import api from "./apis/api";

const geolib = require("geolib");

function Mapa() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [groupsState, setGroupsState] = useState([
    {
      id: 0,
      name: "",
      lat: 0,
      lng: 0,
      description: "",
      link: "",
    },
  ]);

  const [myLocationState, setMyLocationState] = useState({
    latitude: "",
    longitude: "",
  });

  const containerStyle = {
    width: "600px",
    height: "400px",
    borderRadius: "30%",
  };

  const center = {
    lat: myLocationState.latitude,
    lng: myLocationState.longitude,
  };

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await api.get("/grupos");
        setGroupsState(response.data);
      } catch (err) {
        alert(err);
      }
    }
    fetchGroups();
  }, []);

  function succes(pos) {
    let crd = pos.coords;
    setMyLocationState(crd);
  }

  function error(err) {
    console.log(err);
  }
  navigator.geolocation.getCurrentPosition(succes, error);

  return (
    <div className="mapa">
      <div>
        <LoadScript googleMapsApiKey="AIzaSyAKsKzgjv_WvVG5GMwrr2EIQt9TGxt1UuI">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
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
      <section>
        <div>
          <h3>Grupos proximos a você:</h3>
        </div>
        <table>
          <thead>
            <tr className="row">
              <th className="collum">Nome</th>
            </tr>
          </thead>
          <tbody>
            {groupsState.map((group) => {
              if (
                geolib.getDistance(
                  { latitude: center.lat, longitude: center.lng },
                  { latitude: group.lat, longitude: group.lng }
                ) < 1000
              ) {
                return (
                  <tr className="row">
                    <td className="collum">
                      <button onClick={() => setIsModalVisible(true)}>
                        {group.name}
                      </button>
                      {isModalVisible ? (
                        <Modal onClose={() => setIsModalVisible(false)}>
                          {group.id}
                        </Modal>
                      ) : null}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Mapa;
