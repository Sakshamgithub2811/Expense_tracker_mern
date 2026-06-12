const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeReport
} = require("../controllers/incomeController");

router.post("/add",protect,addIncome);
router.get("/get",protect,getAllIncome);
router.delete("/delete/:id",protect,deleteIncome);
router.get("/download",protect,downloadIncomeReport);

module.exports = router;
