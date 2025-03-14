import { useState, useEffect } from "react";
import {
  getCart,
  addItem,
  removeItem,
  updateQuantidade,
  getProducts,
} from "../api.js";
import "./styles.css";

function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [productId, setProductId] = useState("def");
  const [quantidade, setQuantidade] = useState(1);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setCarregando(true);
      const [cartData, productsData] = await Promise.all([
        getCart(),
        getProducts(),
      ]);

      setCarrinho(cartData);
      setProdutos(productsData);
      setCarregando(false);

    };

    setTimeout(fetchData, 2000);
  }, []);

  const adicionarItem = async (e) => {
    e.preventDefault();
    if (productId === "def") return alert("Escolha um produto!");

    const itemExistente = carrinho.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (itemExistente) {
      const novaQuantidade = itemExistente.quantity + quantidade;
      const itemAtualizado = await updateQuantidade(
        itemExistente.id,
        novaQuantidade,
        productId
      );

      if (itemAtualizado) {
        setCarrinho(
          carrinho.map((item) =>
            item.id === itemExistente.id ? itemAtualizado : item
          )
        );
      }
    } else {
      const itemAdicionado = await addItem({ productId, quantity: quantidade });

      if (itemAdicionado) {
        setCarrinho([...carrinho, itemAdicionado]);
      }
    }

    setQuantidade(1);
  };

  const removerItemDoCarrinho = async (id) => {
    await removeItem(id);
    setCarrinho(carrinho.filter((item) => item.id !== id));
  };

  const alterarQuantidade = async (id, novaQuantidade, productId) => {
    if (novaQuantidade < 1) return;

    const itemAtualizado = await updateQuantidade(
      id,
      novaQuantidade,
      productId
    );
    if (itemAtualizado) {
      setCarrinho(
        carrinho.map((item) => (item.id === id ? itemAtualizado : item))
      );
    }
  };

  const getNomeProduto = (productId) => {
    const produto = produtos.find(
      (p) => p.id.toString() === productId.toString()
    );
    return produto ? produto.name : `Produto ${productId}`;
  };

  if (carregando) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="expanded-container">
      <h1>Gerenciador de Carrinho</h1>
      <form onSubmit={adicionarItem}>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        >
          <option value="def" disabled>
            Selecione um produto
          </option>
          {produtos.map((produto) => (
            <option key={produto.id} value={produto.id}>
              {produto.name}
            </option>
          ))}
        </select>
        <button type="submit">Adicionar</button>
      </form>
      <div className="table-container">
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
                <td>{getNomeProduto(item.productId)}</td>
                <td>
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        alterarQuantidade(
                          item.id,
                          item.quantity - 1,
                          item.productId
                        )
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        alterarQuantidade(
                          item.id,
                          item.quantity + 1,
                          item.productId
                        )
                      }
                    >
                      +
                    </button>
                  </div>{" "}
                </td>
                <td>R$ {item.price.toFixed(2)}</td>
                <td>R$ {(item.quantity * item.price).toFixed(2)}</td>
                <td>
                  <button onClick={() => removerItemDoCarrinho(item.id)}>
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="total">
        Total: R${" "}
        {carrinho
          .reduce((acc, item) => acc + item.quantity * item.price, 0)
          .toFixed(2)}
      </div>
    </div>
  );
}

export default Carrinho;
