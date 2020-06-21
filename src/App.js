import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
   const [repos, setRepos] = useState([]);

   useEffect(() => {
      getRepos();
   }, []);

   async function getRepos() {
      const { data } = await api.get("/repositories");
      setRepos(data);
   }

   async function handleAddRepository() {
      const repo = await api.post("repositories", {
         title: `Desafio Reactjs ${Date.now()}`,
         url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
         techs: ["Node.js", "UUID", "reactjs"],
      });
      setRepos([...repos, repo.data]);
   }

   async function handleRemoveRepository(id) {
      await api.delete(`repositories/${id}`);
      const reposIndex = repos.findIndex((repo) => repo.id === id);
      repos.splice(reposIndex, 1);
      setRepos([...repos]);
   }

   return (
      <div>
         <ul data-testid="repository-list">
            {repos.map((repo) => (
               <li key={repo.id}>
                  {repo.title}
                  <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
               </li>
            ))}
         </ul>

         <button onClick={handleAddRepository}>Adicionar</button>
      </div>
   );
}

export default App;
