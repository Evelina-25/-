import Router from "express";
import TourController from "./TourController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import upload from "../../middleware/uploadMiddleware.js";
const router = new Router();

router.post("/", authMiddleware, upload.array('images', 10), TourController.create);

router.get("/", authMiddleware, TourController.getAll);
router.get("/:id", authMiddleware, TourController.getOne);
router.put("/:id", authMiddleware, upload.array('images', 10), TourController.update);
router.delete("/:id", authMiddleware, TourController.delete);

export default router;