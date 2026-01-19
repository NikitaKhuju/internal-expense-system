// models/Expense.js
import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  purpose: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  flag: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  submitter: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
  },
});

export default mongoose.model("Expense", ExpenseSchema);
