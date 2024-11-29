const Customer = require("../models/Customers");

const getCustomerController = async (req, res) => {
  const customers = await Customer.aggregate([
    {
      $group: {
        _id: '$_id',
        name: {"$first":'$name'},
        phone_number: {'$first':'$phone_number'},
        apartment_name:  {'$first':'$phone_number'},
        status:  {'$first':'$status'},
        day_sign:  {'$first':'$day_sign'},
        bod:  {'$first':'$bod'},
        note:  {'$first':'$note'},
      },
    },
  ]);
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

const deleteCustomerController = async (req,res) => {
  const {id} = req.body
  const deleteCustomer = await Customer.findByIdAndDelete(id);
  res.json({success: true, message: 'Thông tin khách hàng đã được xoá.'})
}
const editCustomerController = async (req, res) => {
  const { id,name, phone_number, apartment_name, status, day_sign, bod, note } = req.body
}

module.exports = {
  getCustomerController,
  createCustomerController,
  deleteCustomerController,
  editCustomerController
};
