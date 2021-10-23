import React, { useState } from "react";
import api from "../components/apis/api";

function AddGroup() {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    link: "",
    lat: 0,
    lng: 0,
  });

  function handleChange(event) {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("/createGrupo/", formState);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(formState);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome do grupo:</label>
        <input
          id="name"
          value={formState.name}
          type="text"
          onChange={handleChange}
          name="name"
        />

        <label htmlFor="description">Descrição do grupo:</label>
        <input
          id="description"
          value={formState.description}
          type="text"
          onChange={handleChange}
          name="description"
        />

        <label htmlFor="link">Link do grupo:</label>
        <input
          id="link"
          value={formState.link}
          type="text"
          onChange={handleChange}
          name="link"
        />

        <label htmlFor="lat">Latiude:</label>
        <input
          id="lat"
          value={formState.lat}
          type="number"
          onChange={handleChange}
          name="lat"
        />

        <label htmlFor="name">Longitude:</label>
        <input
          id="lng"
          value={formState.lng}
          type="number"
          onChange={handleChange}
          name="lng"
        />
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
}

export default AddGroup;
