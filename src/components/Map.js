import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import api from "./apis/api";

function Mapa() {
  const [selectedGroupState, seteSelectedGroupState] = useState([
    {
      id: 0,
      name: "",
      description: "",
      link: "",
    },
  ]);

  const [groupsState, setGroupsState] = useState([
    {
      id: 0,
      name: "",
      lat: 0,
      lng: 0,
    },
  ]);

  const containerStyle = {
    width: "800px",
    height: "600px",
  };

  const center = {
    lat: -26,
    lng: -50,
  };

  const id = selectedGroupState.id;

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await api.get("/grupos");
        setGroupsState(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchGroups();
  }, []);
  async function fetchGroup() {
    try {
      const response = await api.get(`/grupos/${id}/details`);
      seteSelectedGroupState(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  function createMarker() {
    groupsState.map((group) => {
      return (
        <Marker
          onClick={fetchGroup}
          position={{ position: { lat: group.lat, lng: group.lng } }}
          options={{ label: { text: group.name, className: "markerLabel" } }}
        />
      );
    });
  }

  console.log(Marker);
  return (
    <div className="mapa">
      <div>
        <LoadScript googleMapsApiKey="AIzaSyAKsKzgjv_WvVG5GMwrr2EIQt9TGxt1UuI">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2}
          >
            {createMarker}
          </GoogleMap>
        </LoadScript>
      </div>
      <div>
        <h3>Grupo Selecionado</h3>
        {selectedGroupState.map((grupo) => {
          return (
            <div>
              <div>
                <h4>Nome do grupo:</h4>
                <p>{grupo.name}</p>
              </div>
              <div>
                <h4>Descrição:</h4>
                <p>{grupo.description}</p>
              </div>
              <div>
                <h4>Link para entrar no grupo:</h4>
                <p>{grupo.link}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Mapa;
