import { Router } from "express";
import { dashboard } from "../controllers/dashboardController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
const router  = Router();
router.get('/dashboard', requireAuth, dashboard);

export default router