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

  function succes(pos) {
    let crd = pos.coords;
    setFormState({ lat: crd.latitude, lng: crd.longitude });
  }

  function error(err) {
    console.log(err);
  }
  navigator.geolocation.getCurrentPosition(succes, error);

  function handleChange(event) {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("/createGrupo/", formState);
      console.log(response.data.message);
      alert(response.data.message);
      setFormState({
        name: "",
        description: "",
        link: "",
      });
    } catch (err) {
      alert(err.response.data.message);
    }
  }
  return (
    <div>
      <h3>Adicionar Grupo</h3>
      <form onSubmit={handleSubmit} className="formContainer">
        <div className="formItem">
          <label htmlFor="name">Nome do grupo:</label>
          <input
            required
            id="name"
            value={formState.name}
            type="text"
            onChange={handleChange}
            name="name"
            placeholder="maximo de 40 caracteres"
          />
        </div>

        <div className="formItem">
          <label htmlFor="link">Link do grupo:</label>
          <input
            required
            id="link"
            value={formState.link}
            type="text"
            onChange={handleChange}
            name="link"
          />
        </div>

        <div className="formItem">
          <label htmlFor="description">Descrição do grupo:</label>
          <textarea
            required
            id="description"
            value={formState.description}
            type="text"
            onChange={handleChange}
            name="description"
            rows="1"
          />
        </div>
        <button type="submit" className="formItem">
          Publicar
        </button>
      </form>
    </div>
  );
}

export default AddGroup;
