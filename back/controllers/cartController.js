import prisma from "../config/prismaCl.js";

export const getCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findMany();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar carrinho" });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        if (!productId || !quantity) return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        // se já existir o produto no carrinho, atualiza a quantidade
        const cart = await prisma.cart.findFirst({
            where: { productId: parseInt(productId) },
        });
        if (cart) {
            await prisma.cart.update({
                where: { id: cart.id },
                data: { quantity: cart.quantity + parseInt(quantity) },
            });
            res.status(201).json(cart);
        } else {
            const cart = await prisma.cart.create({
                data: {
                    productId: parseInt(productId),
                    quantity: parseInt(quantity),
                },
            });
            res.status(201).json(cart);
        }
    } catch (error) {
        res.status(500).json({ error: "Erro ao adicionar produto ao carrinho" });
        console.log(error)
    }
};

export const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const hasCart = await prisma.cart.findFirst({
            where: { id: parseInt(id) },
        });
        if (!hasCart) return res.status(404).json({ message: "Não encontrado." });
        const cartAtualizado = await prisma.cart.update({
            where: { id: parseInt(id) },
            data: {
                quantity: parseInt(quantity),
            },
        });
        res.status(200).json(cartAtualizado);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao atualizar carrinho" });
        console.log(error);
    }
};

export const removeFromCart = async (req, res) => {
    const { id } = req.params;
    try {
        const hasCart = await prisma.cart.findFirst({
            where: { id: id }
        });
        if (!hasCart) return res.status(404).json({ message: "Não encontrado." });
        await prisma.cart.delete({
            where: { id },
        });
        res.status(200).json({ message: "Produto removido do carrinho" });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao remover produto do carrinho" });
    }
};