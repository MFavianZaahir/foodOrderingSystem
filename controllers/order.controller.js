const orderModel = require("../models/index").order_list;
const detailModel = require("../models/index").order_detail;
const foodModel = require(`../models/index`).food;

exports.getAllorder = async (_, response) => {
  try {
    const dataorder = await orderModel.findAll({
      include: [
        {
          model: detailModel,
          attributes: ["id", "food_id", "quantity", "price"], // Include necessary attributes
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return response.json({
      success: true,
      data: dataorder,
      message: "Order data retrieved successfully",
    });
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
    });
  }
};


exports.addOrder = async (req, res) => {
      try {
        const { customer_name, table_number, order_date, order_detail } = req.body;
    
        // Create the order list
        const createdOrder = await orderModel.create({
          customer_name,
          table_number,
          order_date,
        });
    
        const orderId = createdOrder.id;
        let total = 0;
    
        // Prepare order details with the correct orderId
        const preparedOrderDetails = order_detail.map(detail => ({
          ...detail,
          order_id: orderId
        }));
    
        // Calculate total price and adjust order details accordingly
        const updatedDetail = await Promise.all(preparedOrderDetails.map(async (detail) => {
          const { food_id, quantity } = detail;
          const food = await foodModel.findByPk(food_id);
          if (!food) {
            throw new Error(`Food with ID ${food_id} not found`);
          }
          total += food.price * quantity;
          return { ...detail, price: food.price, total: food.price * quantity };
        }));
    
        // Create order details
        await detailModel.bulkCreate(updatedDetail);
    
        // Update order's total price
        await orderModel.update({ price: total }, { where: { id: orderId } });
    
        return res.status(201).json({
          status: true,
          data: createdOrder,
          message: "Order list has been created",
        });
      } catch (error) {
        return res.status(500).json({
          status: false,
          message: error.message,
        });
      }
    };