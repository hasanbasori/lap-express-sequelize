const { Product } = require("../models");
// const Customer = require("../models/Customer");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ Product });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: { id: id },
    });
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  const { name, desc, price, quantity, supplier_id } = req.body;
  try {
    await Customer.bulkCreate([
      { name: name },
      { desc: desc },
      { price: price },
      { quantity: quantity },
      { supplier_id: supplier_id },
    ]);
    res.status(200).json({ message: "Product created" });
  } catch (err) {
    next(err);
  }
};
exports.updateProduct = async (req, res, next) => {
  const { name, desc, price, quantity, supplier_id } = req.body;
  const { id } = req.params;
  try {
    await Customer.update(
      {
        name: name,
        desc: desc,
        price: price,
        quantity: quantity,
        supplier_id: supplier_id,
      },
      { where: { id: id } }
    );
    res.status(200).json({ message: "Product Updated" });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const row = await Product.destroy({ where: { id: id } });
    res.status(200).json({
      message: row ? "delete product success" : "0 product deleted",
    });
  } catch (err) {
    next(err);
  }
};
