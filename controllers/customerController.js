const Customer = require("../models/Customers");
const PAGE_SIZE = 20;
const getCustomerController = async (req, res) => {
  var page = req.query.page;
  page = parseInt(page);
  if (page < 1) {
    page = 1;
  } else if (isNaN(page) == true) {
    page = 1
  }
  var countSkip = (page - 1) * PAGE_SIZE;
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
  var arr = customers.map(item => ({ ...item.result }))
  // customers.forEach(item => arr.push(item.result))
  // arr.sort(function (a, b) {
  //   return a.name.localeCompare(b.name)
  // })

  var total_page = await Customer.countDocuments();

  res.json({ success: true, data: arr, total_page });
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
  res.json({ success: true, message: "Khách hàng đã được tạo", data: newCustomer });
};

const deleteCustomerController = async (req, res) => {
  const { id } = req.body
  const deleteCustomer = await Customer.findByIdAndDelete(id);
  res.json({ success: true, message: 'Thông tin khách hàng đã được xoá.' })
}
const editCustomerController = async (req, res) => {
  const { id, name, phone_number, apartment_name, status, day_sign, bod, note } = req.body
  const findCustomer = await Customer.findByIdAndUpdate(id, {
    name, phone_number, apartment_name, status, day_sign, bod, note
  })

  res.json({ success: true, message: 'Thông tin khách hàng đã được cập nhật.', data: findCustomer })
}

const detailCustomerController = async (req, res) => {
  const { id } = req.body
  const findCustomer = await Customer.findById(id)
  res.json({ success: true, data: findCustomer })
}

const searchCustomerController = async (req, res) => {
  try {
    let { name, bod, page } = req.body
    let matchConditions = {}
    if (name) {
      matchConditions.name = { $regex: name, $options: 'i' }
    }
    if (bod) {
      const startDate = new Date(bod)
      startDate.setHours(0, 0, 0, 0)
      const endDate = new Date(bod)
      endDate.setHours(23, 59, 59, 999)
      matchConditions.bod = { $gte: startDate, $lt: endDate }
    }
    if (page < 1) {
      page = 1;
    } else if (isNaN(page) == true) {
      page = 1
    }
    var countSkip = (page - 1) * PAGE_SIZE;
    const customers = await Customer.aggregate([
      { $match: matchConditions },
      //Group by match
      {
        $group: {
          _id: "$name",
          result: {
            $push: "$$ROOT"
          },
        },
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
      },
      { $skip: countSkip },
      { $limit: PAGE_SIZE }
    ])
    const newData = customers.map(item => ({
      ...item.result,
    }))
    const total_page = (await Customer.countDocuments(matchConditions))
    res.json({ success: true, data: newData, total_page })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: error.message
    });
  }

}

module.exports = {
  getCustomerController,
  createCustomerController,
  deleteCustomerController,
  editCustomerController,
  detailCustomerController,
  searchCustomerController
};
