    import Router from "express";
    import PaymentController from "./PaymentController.js";
    import authMiddleware from "../Middleware/authMiddleware.js";

    const router = new Router();

    router.post("/", authMiddleware, PaymentController.create);
    router.get("/", authMiddleware, PaymentController.getAll);
    router.get("/:id", authMiddleware, PaymentController.getOne);
    router.put('/:id', authMiddleware, PaymentController.pay);
    export default router;