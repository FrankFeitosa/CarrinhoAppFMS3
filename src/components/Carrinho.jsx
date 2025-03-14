import { useState, useEffect } from 'react';
import { getCart, addItem, removeItem, updateQuantidade, aplicarDesconto } from '../api.js';
import './styles.css';

function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
  const [nomeItem, setNomeItem] = useState('');
  const [quantidadeItem, setQuantidadeItem] = useState(1);
  const [precoItem, setPrecoItem] = useState(0);
  const [codigoDesconto, setCodigoDesconto] = useState('');
  const [total, setTotal] = useState(0);

  // Carregar o carrinho do backend
  useEffect(() => {
    const fetchCarrinho = async () => {
      const data = await getCart();
      setCarrinho(data);
      calcularTotal(data);
    };
    fetchCarrinho();
  }, []);

  const calcularTotal = (itens) => {
    const novoTotal = itens.reduce((acc, item) => acc + item.quantidade * item.preco, 0);
    setTotal(novoTotal);
  };

  const adicionarItem = async (e) => {
    e.preventDefault();
    const novoItem = { nome: nomeItem, quantidade: quantidadeItem, preco: precoItem };
    const itemAdicionado = await addItem(novoItem);
    
    if (itemAdicionado) {
      setCarrinho([...carrinho, itemAdicionado]);
      calcularTotal([...carrinho, itemAdicionado]);
    }
    
    setNomeItem('');
    setQuantidadeItem(1);
    setPrecoItem(0);
  };

  const removerItemDoCarrinho = async (id) => {
    await removeItem(id);
    const novoCarrinho = carrinho.filter((item) => item.id !== id);
    setCarrinho(novoCarrinho);
    calcularTotal(novoCarrinho);
  };

  const alterarQuantidade = async (id, novaQuantidade) => {
    const itemAtualizado = await updateQuantidade(id, novaQuantidade);
    if (itemAtualizado) {
      const novoCarrinho = carrinho.map((item) => (item.id === id ? itemAtualizado : item));
      setCarrinho(novoCarrinho);
      calcularTotal(novoCarrinho);
    }
  };

  const aplicarCodigoDesconto = async (e) => {
    e.preventDefault();
    const descontoData = await aplicarDesconto(codigoDesconto);
    
    if (descontoData && descontoData.novoTotal) {
      setTotal(descontoData.novoTotal);
      alert(`Desconto aplicado! Novo total: R$ ${descontoData.novoTotal.toFixed(2)}`);
    } else {
      alert('Código de desconto inválido.');
    }

    setCodigoDesconto('');
  };

  return (
    <div className="expanded-container">
      <h1>Gerenciador de Carrinho</h1>
      <form onSubmit={adicionarItem}>
        <input type="text" value={nomeItem} onChange={(e) => setNomeItem(e.target.value)} required />
        <input type="number" value={quantidadeItem} onChange={(e) => setQuantidadeItem(parseInt(e.target.value))} required min="1" />
        <input type="number" value={precoItem} onChange={(e) => setPrecoItem(parseFloat(e.target.value))} required min="0.01" step="0.01" />
        <button type="submit">Adicionar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Subtotal</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {carrinho.map((item) => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>
                <button onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}>-</button>
                {item.quantidade}
                <button onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}>+</button>
              </td>
              <td>R$ {item.preco.toFixed(2)}</td>
              <td>R$ {(item.quantidade * item.preco).toFixed(2)}</td>
              <td>
                <button onClick={() => removerItemDoCarrinho(item.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={aplicarCodigoDesconto}>
        <input type="text" value={codigoDesconto} onChange={(e) => setCodigoDesconto(e.target.value)} placeholder="Código de desconto" />
        <button type="submit">Aplicar Desconto</button>
      </form>
      <div className="total">Total: R$ {total.toFixed(2)}</div>
    </div>
  );
}

export default Carrinho;
