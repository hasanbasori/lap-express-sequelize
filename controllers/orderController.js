const {
  sequelize,
  Order,
  OrderItem,
  Product,
  Customer,
  Employee,
  Supplier,
} = require("../models");
// const Supplier = require("../models/Supplier");
// const Customer = require("../models/Customer");

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: {
            model: Product,
            attributes: ["id", "name"],
          },
          attributes: ["id", "amount", "price", "discount"],
        },
        { model: Customer, attributes: ["name", "id"] },
        { model: Employee, attributes: ["name", "id"] },
      ],
    });
    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { id },
      attributes: ["id", "date"],
      include: [
        { model: Customer, attributes: ["id", "name"] },
        { model: Employee, attributes: ["id", "name"] },
        {
          model: OrderItem,
          attributes: ["id", "amount", "price", "discount"],
          include: {
            model: Product,
            attributes: ["id", "name"],
            include: Supplier,
          },
        },
      ],
    });
    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const {
    date,
    customerId,
    employeeId,
    amount,
    price,
    discount,
    orderId,
    productId,
    item,
  } = req.body;
  try {
    const order = await Order.create(
      {
        date: new Date(),
        customerId,
        employeeId,
      },
      { transaction }
    );
    const insertItems = await Promise.all(
      item.map(async (item) => {
        const product = await Product.findByPk(item.productId);
        item.price = product.price;
        item.orderId = order.id;
        return item;
      })
    );
    await OrderItem.bulkCreate(insertItems, { transaction });
    await transaction.commit();
    // console.log(JSON.parse)
    // await Customer.bulkCreate([
    //   { date: date },
    //   { customerId: customerId },
    //   { employeeId: employeeId },
    //   { amount: amount },
    //   { price: price },
    //   { discount: discount },
    //   { orderId: orderId },
    //   { productId: productId },
    // ]);
    res.status(201).json({ order, orderItem });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};
exports.updateOrder = async (req, res, next) => {
  const {
    date,
    customerId,
    employeeId,
    amount,
    price,
    discount,
    orderId,
    productId,
  } = req.body;
  const { id } = req.params;
  try {
    await Customer.update(
      {
        date: date,
        customerId: customerId,
        employeeId: employeeId,
        amount: amount,
        price: price,
        discount: discount,
        orderId: orderId,
        productId: productId,
      },
      { where: { id: id } }
    );
    res.status(200).json({ message: "Order Updated" });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const row = await Order.destroy({
      include: { model: orderId, attributes: ["id"] },
    });
    res.status(200).json({
      message: row ? "delete order success" : "0 order deleted",
    });
  } catch (err) {
    next(err);
  }
};
