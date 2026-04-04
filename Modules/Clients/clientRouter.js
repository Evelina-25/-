import Router from "express";
import ClientController from "./ClientController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = new Router();

router.post("/", authMiddleware, ClientController.create);
router.get("/", authMiddleware, ClientController.getAll);
router.get("/:id", authMiddleware, ClientController.getOne);
router.put("/:id", authMiddleware, ClientController.update);
router.delete("/:id", authMiddleware, ClientController.delete);

export default router;