import React, { useEffect, useState } from "react";
import api from "./apis/api";

export default function Modal({ onClose = () => {}, children }) {
  const [groupsState, setGroupsState] = useState([
    {
      name: "",
      description: "",
      link: "",
    },
  ]);

  useEffect(() => {
    const abortCont = new AbortController();
    async function fetchGroup() {
      try {
        const response = await api.get(`/grupos/${children}`, {
          signal: abortCont.signal,
        });
        setGroupsState(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchGroup();
    return () => abortCont.abort;
  }, [children]);
  console.log(groupsState);
  return (
    <div className="modal">
      <div className="modalContainer">
        <button className="close" onClick={onClose}>
          fechar
        </button>
        <div className="modalContent">
          <table>
            <thead>
              <tr className="modalHead">
                <th className="modalColumn">Nome</th>
                <th className="modalColumn">Descrição</th>
                <th className="modalColumn">Link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="modalColumn">{groupsState[0].name}</td>
                <td className="modalColumn">{groupsState[0].description}</td>
                <td className="modalColumn">{groupsState[0].link}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
