import Router from "express";
import ApplicationController from "./ApplicationController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = new Router();

router.post("/", authMiddleware, ApplicationController.create);
router.get("/", authMiddleware, ApplicationController.getAll);
router.get("/:id", authMiddleware, ApplicationController.getOne);
router.delete("/:id", authMiddleware, ApplicationController.delete);
router.patch("/confirm/:id", authMiddleware, ApplicationController.confirm);
router.patch("/issue-documents/:id", authMiddleware, ApplicationController.issueFinalDocuments);
export default router;