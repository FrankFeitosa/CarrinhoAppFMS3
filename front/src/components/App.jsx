import { useState, useEffect } from "react";
import AdicionarNome from "./AdicionarNome";
import ListaNomes from "./ListaNomes";
import api from "../api";
import "./styles.css";

const App = () => {
  const [nomes, setNomes] = useState([]);

  // Carregar nomes da API ao iniciar
  useEffect(() => {
    api.get("/nomes").then((res) => setNomes(res.data));
  }, []);

  // Função para adicionar nome
  const adicionarNome = async (nome, profissao) => {
    console.log(nome, profissao);
    const res = await api.post("/nomes", { nome, profissao });
    setNomes([...nomes, res.data]);
  };

  // Função para excluir nome
  const excluirNome = async (id) => {
    await api.delete(`/nomes/${id}`);
    setNomes(nomes.filter((n) => n.id !== id));
  };

  // Função para editar nome
  const editarNome = async (id, novoNome, novaProfissao) => {
    const res = await api.put(`/nomes/${id}`, { nome: novoNome, profissao: novaProfissao });
    setNomes(nomes.map((n) => (n.id === id ? res.data : n)));
  };

  return (
    <div>
      <h1>Manipulador de Nomes</h1>
      <AdicionarNome adicionarNome={adicionarNome} />
      <ListaNomes nomes={nomes} editarNome={editarNome} excluirNome={excluirNome} />
    </div>
  );
};

export default App;
