const express = require("express");
const customerController = require("../controllers/customerController.js");

const router = express.Router();

router.get("/", customerController.getAllCustomers);
router.get("/:id", customerController.getCustomer);
router.post("/", customerController.createCustomer);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
