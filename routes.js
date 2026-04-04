import {Router} from "express";

import clientRouter from "./Clients/clientRouter.js";
import tourRouter from "./Tour/tourRouter.js";
import authRouter from "./User/authRouter.js";
import applicationRouter from "./Application/applicationRouter.js";
import paymentRouter from "./Payment/paymentRouter.js";
import documentRouter from "./Document/documentRouter.js";

const router = new Router();

router.use("/clients", clientRouter);
router.use("/tours", tourRouter);
router.use("/auth", authRouter);
router.use("/applications", applicationRouter);
router.use("/payments", paymentRouter);
router.use("/documents", documentRouter);

export default router;