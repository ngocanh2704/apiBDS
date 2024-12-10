const Customer = require("../models/Customers");
const PAGE_SIZE = 50;
const getCustomerController = async (req, res) => {
  var page = req.query.page;
  page = parseInt(page);
  if (page < 1) {
    page = 1;
  } else if (page == undefined)
  var countSkip = (page - 1) * PAGE_SIZE;
  console.log(countSkip)
  const customers = await Customer.aggregate([
    {
      $group: {
        _id: "$name",
        result: {
          $push: "$$ROOT"
        }
      }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $unwind: {
        path: "$result"
      }
    }
  ]).skip(countSkip).limit(PAGE_SIZE)

  // const customers = await Customer.find()
  var arr = []
  customers.forEach(item => arr.push(item.result))

  res.json({ success: true, data: arr });
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

const deleteCustomerController = async (req, res) => {
  const { id } = req.body
  const deleteCustomer = await Customer.findByIdAndDelete(id);
  res.json({ success: true, message: 'Thông tin khách hàng đã được xoá.' })
}
const editCustomerController = async (req, res) => {
  const { id, name, phone_number, apartment_name, status, day_sign, bod, note } = req.body
}

module.exports = {
  getCustomerController,
  createCustomerController,
  deleteCustomerController,
  editCustomerController
};
