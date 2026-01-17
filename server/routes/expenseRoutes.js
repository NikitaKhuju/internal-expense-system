import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createExpense,
  deleteExpense,
  updateExpense,
  getExpenses,
} from "../controllers/expenseController.js";

const router = express.Router();

router.use(protect); //all routes protected

router.post("/", createExpense);
router.get("/", getExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
