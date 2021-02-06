import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);


  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title: `Repositório ${Date.now()}`,
      url: "http://gitfake.com/ihuuuuu",
      techs: [
        `React.JS`
      ]
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`);

    const repos = repositories.filter(repo => repo.id !== id);
    
    setRepositories(repos);
  }

  /**
   * Carrega a lista de repositórios presente 
   * no backend da plataforma
   */
  useEffect(() => {
    api.get('/repositories')
      .then(response => {
        setRepositories(response.data)
      });
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
