import { useState } from "react";
import "./styles.css";

const ListaNomes = ({ nomes, editarNome, excluirNome }) => {
  const [editando, setEditando] = useState(null);
  const [novosDados, setNovosDados] = useState({ nome: "", profissao: "" });

  return (
    <ul>
      {nomes.length > 0 ? (
        nomes.map((n) => (
          <li key={n.id}>
            {editando === n.id ? (
              <div className="input_edit">
                <input
                  value={novosDados.nome}
                  onChange={(e) => setNovosDados({ ...novosDados, nome: e.target.value })}
                />
                <input
                  value={novosDados.profissao}
                  onChange={(e) => setNovosDados({ ...novosDados, profissao: e.target.value })}
                />
                <button
                  onClick={() => {
                    editarNome(n.id, novosDados.nome, novosDados.profissao);
                    setEditando(null);
                  }}
                >
                  Salvar
                </button>
              </div>
            ) : (
              <>
                <div className="infos">
                  <p>{n.nome}</p>
                  <p>{n.profissao}</p>
                </div>
                <button
                  onClick={() => {
                    setEditando(n.id);
                    setNovosDados({ nome: n.nome, profissao: n.profissao });
                  }}
                >
                  ✏️
                </button>
                <button onClick={() => excluirNome(n.id)}>🗑️</button>
              </>
            )}
          </li>
        ))
      ) : (
        <li>Nenhum nome cadastrado.</li>
      )}
    </ul>
  );
};

export default ListaNomes;
