import Expense from "../models/Expense.js";

//Create Expense
export const createExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const expense = await Expense.create({
      title,
      amount,
      category,
      date: date || Date.now(),
      user: req.user.id, //from JWT middleware
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all expenses

export const getExpenses = async (req, res) => {
  try {
    let expenses;
    if (req.user.role === "admin") {
      expenses = await Expense.find().populate("user", "name email role");
    } else {
      expenses = await Expense.find({ user: req.user.id });
    }
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update expense

export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    if (req.user.role !== "admin" && expense.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, amount, category, date } = req.body;

    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.date = date || expense.date;

    const updated = await expense.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete expense

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    if (req.user.role !== "admin" && expense.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
