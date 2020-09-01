import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);
  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      id: Date.now(),
      title: `Desafio ReactJS`
    };

    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    const newRepositories = repositories.filter(repository => id !== repository.id);
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.length > 0 && repositories.map((repository) => {
          return (
          <li key={ repository.id }>
            { repository.title }
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          )
        }) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
