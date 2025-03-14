import express from "express";
import * as productController from "../controllers/productController.js";

const router = express.Router();

router.get("/", productController.getProducts);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export { router as productRouter };