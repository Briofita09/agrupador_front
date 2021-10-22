import React from "react";

function Mapa() {
  let platform = new H.service.Platform({
    apikey: "lGHGNYT5SNuYeV0jO_SOEqf7Oj8J9GPlL1RYJIliUcs",
  });

  // Obtain the default map types from the platform object:
  let defaultLayers = platform.createDefaultLayers();

  // Instantiate (and display) a map object:
  let map = new H.Map(
    document.getElementById("mapContainer"),
    defaultLayers.vector.normal.map,
    {
      zoom: 10,
      center: { lat: 52.5, lng: 13.4 },
    }
  );

  return (
    <div>
      <h1 className="mapa">{map}</h1>
    </div>
  );
}

export default Mapa;
