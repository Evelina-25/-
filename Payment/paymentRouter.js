import Router from "express";
import PaymentController from "./PaymentController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = new Router();

router.post("/", authMiddleware, PaymentController.create);
router.get("/", authMiddleware, PaymentController.getAll);
router.get("/:id", authMiddleware, PaymentController.getOne);

export default router;