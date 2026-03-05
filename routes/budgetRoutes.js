const express = require("express");
const bugetController = require("../controllers/bugetController");
const router = express.Router();

router.get("/", bugetController.getAll);
router.get("/:id", bugetController.getById);
router.post("/", bugetController.createBudget);
router.put("/:id", bugetController.updateBudget);
router.delete("/:id", bugetController.deleteBudget);
module.exports = router;
