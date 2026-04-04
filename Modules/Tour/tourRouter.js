import Router from "express";
import TourController from "./TourController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = new Router();

router.post("/", authMiddleware, TourController.create);
router.get("/", authMiddleware, TourController.getAll);
router.get("/:id", authMiddleware, TourController.getOne);
router.put("/:id", authMiddleware, TourController.update);
router.delete("/:id", authMiddleware, TourController.delete);

export default router;