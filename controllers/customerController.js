const { Customer } = require("../models");
// const Customer = require("../models/Customer");

exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json({ customers });
  } catch (err) {
    next(err);
  }
};

exports.getCustomer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findOne({
      where: { id: id },
    });
    res.status(200).json({ customer });
  } catch (err) {
    next(err);
  }
};

exports.createCustomer = async (req, res, next) => {
  const { name, address } = req.body;
  try {
    const createCustomer = await Customer.bulkCreate([
      { name: name },
      { address: address },
    ]);
  } catch (err) {
    next(err);
  }
};

exports.updateCustomer = async (req, res, next) => {
  const { name, address } = req.body;
  const { id } = req.params;
  try {
    const updateCustomer = await Customer.update(
      { name: name, address: address },
      { where: { id: id } }
    );
    res.status(200).json({ message: "Customer Updated" });
  } catch (err) {
    next(err);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await Customer.destroy({ where: { id: id} })
    res.status(200).json({message : 'deleted'})
  } catch (err) {
    next(err);
  }
};
