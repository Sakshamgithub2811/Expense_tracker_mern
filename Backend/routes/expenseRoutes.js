const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
    addExpense,
    getAllExpenses,
    deleteExpense,
    downloadExpenseReport
} = require("../controllers/expenseController");

router.post("/add",protect,addExpense);
router.get("/get",protect,getAllExpenses);
router.delete("/delete/:id",protect,deleteExpense);
router.get("/download",protect,downloadExpenseReport);

module.exports = router;
