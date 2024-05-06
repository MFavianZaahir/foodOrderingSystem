// const models = require(`../models/index`).food;
// const multer = require("multer"); // For file upload
// const models = require("../models"); // Replace with your models path

// const upload = multer({ dest: "uploads/" }); // Adjust storage destination as needed

// exports.addFood = async (request, response) => {
//   try {
//     // Extract data from request body
//     const { name, spicy_level, price, image } = request.body;

//     // Validation (optional, implement as needed)

//     // Create a new food object
//     const newFood = {
//       name,
//       spicy_level,
//       price,
//       image,
//     };

//     // Create food in the database
//     const createdFood = await models.food.create(newFood);

//     // Respond with success message and created food data
//     return response.json({
//       success: true,
//       data: createdFood,
//       message: "Food added successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return response.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// exports.updateFood = async (req, res) => {
//   try {
//     // Extract data from request body and params
//     const foodId = parseInt(req.params.id);
//     const { name, spicy_level, price } = req.body;
//     let image = null; // Handle case where no image is uploaded

//     if (req.file) {
//       image = req.file.filename; // Get uploaded image filename
//     }

//     // Validation (optional, implement as needed)

//     // Delegate update logic to a separate function (optional)
//     const updatedFood = await updateFoodData(
//       foodId,
//       name,
//       spicy_level,
//       price,
//       image
//     );

//     if (!updatedFood) {
//       // No food found with the ID
//       return res.status(404).json({
//         status: false,
//         message: "Food not found",
//       });
//     }

//     return res.json({
//       status: true,
//       data: updatedFood,
//       message: "Food has been updated",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error",
//     });
//   }
// };

// // Optional function for updating food data (can be customized)
// async function updateFoodData(foodId, name, spicy_level, price, image) {
//   return await models.food.update(
//     {
//       name,
//       spicy_level,
//       price,
//       image, // Update image if provided
//     },
//     {
//       where: { id: foodId },
//     }
//   );
// }


const models = require(`../models/index`).food; // Assuming your model is exported as 'food' from 'models/index.js'
const multer = require("multer"); // For file upload

const upload = multer({ dest: "uploads/" }); // Adjust storage destination as needed

exports.addFood = async (request, response) => {
  try {
    // Extract data from request body
    const { name, spicy_level, price, image } = request.body;

    // Validation (optional, implement as needed)

    // Create a new food object
    const newFood = {
      name,
      spicy_level,
      price,
      image,
    };

    // Create food in the database
    const createdFood = await models.create(newFood);

    // Respond with success message and created food data
    return response.json({
      success: true,
      data: createdFood,
      message: "Food added successfully",
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateFood = async (req, res) => {
  try {
    // Extract data from request body and params
    const foodId = parseInt(req.params.id);
    const { name, spicy_level, price } = req.body;
    let image = null; // Handle case where no image is uploaded

    if (req.file) {
      image = req.file.filename; // Get uploaded image filename
    }

    // Validation (optional, implement as needed)

    // Delegate update logic to a separate function (optional)
    const updatedFood = await updateFoodData(
      foodId,
      name,
      spicy_level,
      price,
      image
    );

    if (!updatedFood) {
      // No food found with the ID
      return res.status(404).json({
        status: false,
        message: "Food not found",
      });
    }

    return res.json({
      status: true,
      data: updatedFood,
      message: "Food has been updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// Optional function for updating food data (can be customized)
async function updateFoodData(foodId, name, spicy_level, price, image) {
  return await models.update(
    {
      name,
      spicy_level,
      price,
      image, // Update image if provided
    },
    {
      where: { id: foodId },
    }
  );
}
