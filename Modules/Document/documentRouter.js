import Router from "express";
import DocumentController from "./DocumentController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = new Router();

router.post("/", authMiddleware, DocumentController.create);
router.get("/", authMiddleware, DocumentController.getAll);
router.get("/application/:applicationId", authMiddleware, DocumentController.getByApplication);
router.get("/:id", authMiddleware, DocumentController.getOne);

export default router;