import { useState } from "react";
import "./styles.css";

const AdicionarNome = ({ adicionarNome }) => {
  const [dados, setDados] = useState({nome: "", profissao: ""});

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarNome(dados.nome, dados.profissao);
    setDados({nome: "", profissao: ""});
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={dados.nome}
        onChange={(e) => setDados({...dados, nome: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Profissão"
        value={dados.profissao}
        onChange={(e) => setDados({...dados, profissao: e.target.value})}
        required
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default AdicionarNome;

