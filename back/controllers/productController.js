import prisma from "../config/prismaCl.js";

export const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar produtos" });
    }
};

export const createProduct = async (req, res) => {
    const { produto, preco } = req.body;
    try {
        const product = await prisma.product.create({
            data: {
                name: produto,
                price: parseFloat(preco),
            }
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar produto" });
        console.log(error)
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { produto, preco } = req.body;
    try {
        const product = await prisma.product.findFirst({
            where: { id: id }
        });
        if (!product) return res.status(404).json({ message: "Não encontrado." });
        const productAtualizado = await prisma.product.update({
            where: { id },
            data: {
                produto,
                preco
            }
        });
        res.status(200).json(productAtualizado);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar produto" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findFirst({
            where: { id: id }
        });
        if (!product) return res.status(404).json({ message: "Não encontrado." });
        await prisma.product.delete({
            where: { id }
        });
        res.status(200).json({ message: "Produto deletado com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar produto" });
    }
};