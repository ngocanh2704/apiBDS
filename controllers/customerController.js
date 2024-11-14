const Customer = require("../models/Customers");

const getCustomerController = async (req, res) => {
  const customers = await Customer.find();
  res.json({ success: true, data: customers });
};

const createCustomerController = async (req, res) => {
  const { name, phone_number, apartment_name, status, day_sign, bod, note } =
    req.body;
  const newCustomer = new Customer({
    name,
    phone_number,
    apartment_name,
    status,
    day_sign,
    bod,
    note,
  });

  await newCustomer.save();
  res.json({ success: true, message: "Khách hàng đã được tạo" });
};

module.exports = {
  getCustomerController,
  createCustomerController,
};
