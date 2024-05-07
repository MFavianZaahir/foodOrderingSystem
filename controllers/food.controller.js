const foodModel = require(`../models/index`).food; // Assuming your model is exported as 'food' from 'models/index.js'
const multer = require("multer"); // For file upload

const upload = multer({ dest: "uploads/" }); // Adjust storage destination as needed

// exports.addFood = async (request, response) => {
//   try {
//     // Extract data from request body
//     const { name, spicy_level, price, image } = request.body;
//     // Create a new food object
//     const newFood = {
//       name,
//       spicy_level,
//       price,
//       image,
//     };

//     // Create food in the database
//     const createdFood = await models.create(newFood);

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

exports.addFood = async (request, response) => {
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
  const createdFood = await foodModel.create(newFood);

  // Respond with success message and created food data
  return response.json({
    success: true,
    data: createdFood,
    message: "Food added successfully",
  });

  // No catch block included for simplicity (implement error handling as needed)
};

exports.getAllFoods = async (req, res) => {
  try {
    // Fetch all food items from the database
    const foods = await foodModel.findAll(); // Use foodModels directly

    // Return the fetched food items as a response
    return res.status(200).json({
      status: true,
      data: foods,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching foods:", error);
    return res.status(500).json({
      status: false,
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
  return await foodModel.update(
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

exports.deleteFood = async (req, res) => {
  try {
    // Extract food ID from request params
    const foodId = parseInt(req.params.id);

    // Find the food by ID
    const foodToDelete = await foodModel.findByPk(foodId);

    // Check if food exists
    if (!foodToDelete) {
      return res.status(404).json({
        status: false,
        message: "Food not found",
      });
    }

    // Delete the food
    await foodToDelete.destroy();

    // Respond with success message
    return res.json({
      status: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
