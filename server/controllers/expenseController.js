import Expense from "../models/Expense.js";

// Create Expense
export const createExpense = async (req, res) => {
  try {
    const { purpose, amount, category, date, flag } = req.body;

    // Required fields check
    if (!purpose || !amount || !category) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const expense = await Expense.create({
      purpose,
      amount,
      category,
      date: date || Date.now(),
      flag: flag || "Low", // default flag if not provided
      status: "Pending", // default status
      submitter: {
        id: req.user.id,
        name: req.user.name,
      }, // link to logged-in user
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all expenses
export const getExpenses = async (req, res) => {
  try {
    let expenses;
    if (req.user.role === "admin") {
      expenses = await Expense.find().populate("submitter", "name email role");
    } else {
      expenses = await Expense.find({ submitter: req.user.id });
    }
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update expense (admin can update status, submitter can update their own expense)
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    const { purpose, amount, category, date, status, flag } = req.body;

    // Only admin can update status
    if (status && req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can update status" });
    }

    // Only submitter or admin can update other fields
    if (
      req.user.role !== "admin" &&
      expense.submitter.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update fields
    expense.purpose = purpose || expense.purpose;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.date = date || expense.date;
    expense.flag = flag || expense.flag;
    if (status && req.user.role === "admin") expense.status = status;

    const updated = await expense.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    if (
      req.user.role !== "admin" &&
      expense.submitter.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
