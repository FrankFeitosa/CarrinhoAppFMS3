const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const PORT = 4000;

// Listar todos os nomes
app.get("/nomes", async (req, res) => {
  try {
    const nomes = await prisma.teste_axios.findMany();
    res.json(nomes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar nomes" });
  }
});

// Adicionar um nome
app.post("/nomes", async (req, res) => {
  try {
    const { nome, profissao } = req.body;
    if (!nome || !profissao) return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    const novoNome = await prisma.teste_axios.create({
      data: { nome, profissao },
    });
    res.status(201).json(novoNome);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar nome" });
    console.log(error)
  }
});

// Editar um nome pelo ID
app.put("/nomes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, profissao } = req.body;

    const hasNome = await prisma.teste_axios.findFirst({
      where: { id: id }
    });
    if (!nome) return res.status(404).json({ message: "Não encontrado." });

    const nomeAtualizado = await prisma.teste_axios.update({
      where: { id },
      data: {
        nome: nome ? nome : hasNome.nome,
        profissao: profissao ? profissao : hasNome.profissao
      },
    });

    res.json(nomeAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao editar nome" });
  }
});

// Excluir um nome pelo ID
app.delete("/nomes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.teste_axios.delete({ where: { id } });
    res.json({ message: "Nome excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir nome" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
