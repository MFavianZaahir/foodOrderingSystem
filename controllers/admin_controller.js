const adminModel = require("../models/index").admin;
const { response } = require("express");
const md5 = require("md5");
const Op = require("sequelize").Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

exports.addAdmin = async (request, response) => {
  try {
    /** Prepare data from request */
    let newAdmin = {
      name: request.body.name,
      email: request.body.email,
      password: md5(request.body.password), // Assuming md5 is a hashing function
      // role: request.body.role,
    };

    /** Execute inserting data to user's table */
    const result = await userModel.create(newAdmin);

    /** If insert's process succeeds */
    return response.json({
      success: true,
      data: result,
      message: "New user has been inserted",
    });
  } catch (error) {
    /** If insert's process fails */
    console.error("Error creating user:", error); // Log the error for debugging
    return response.json({
      success: false,
      message: "Failed to create user. Please try again.",
    });
  }
};

exports.registerAdmin = async (request, response) => {
  try {
    const { name, email, password } = request.body;

    // Validate user input (optional) - Add validation logic here

    // Hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Prepare user data for insertion
    const newAdmin = {
      name,
      email,
      password: hashedPassword,
      // role, // Include role if applicable
    };

    // Create admin in the database using the correct model
    const admin = await adminModel.create(newAdmin);

    // Generate JWT token
    const payload = { adminID: admin.id }; // Customize payload as needed
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // Replace with your JWT secret

    // Respond with success message and token
    return response.json({
      success: true,
      message: "Admin registered successfully",
      data: { admin, token },
    });
  } catch (error) {
    console.error("Error registering admin:", error);
    return response.json({
      success: false,
      message: "Failed to register admin. Please try again.",
    });
  }
};

// exports.registerAdmin = async (request, response) => {
//   try {
//     /** Prepare data from request */
//     const { name, email, password } = request.body;

//     /** Validate user input (optional) - Add validation logic here */

//     /** Hash password using bcrypt */
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     /** Prepare user data for insertion */
//     const newAdmin = {
//       name,
//       email,
//       password: hashedPassword,
//       // role,
//     };

//     /** Create user in the database */
//     const admin = await adminModel.create(newAdmin);

//     /** Generate JWT token */
//     const payload = { adminID: admin.id }; // Customize payload as needed
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     }); // Replace with your JWT secret

//     /** Respond with success message and token */
//     return response.json({
//       success: true,
//       message: "User registered successfully",
//       data: { admin, token },
//     });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     return response.json({
//       success: false,
//       message: "Failed to register user. Please try again.",
//     });
//   }
// };

exports.login = async (request, response) => {
      try {
        const { email, password } = request.body;
    
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
          return response.status(401).json({ message: 'Invalid email or password' });
        }
    
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
          return response.status(401).json({ message: 'Invalid email or password' });
        }
    
        // Generate JWT token (customize payload as needed)
        const payload = { adminId: admin.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        return response.json({
          success: true,
          message: 'Login successful',
          data: { admin, token },
        });
      } catch (error) {
        console.error('Error logging in user:', error);
        return response.status(500).json({ message: 'Failed to login' });
      }
    };
    
    // Implement other user management functions here (e.g., updateUser, deleteUser, getAllUsers)
    
    // Function to retrieve all users (assuming appropriate authorization is handled elsewhere)
    exports.getAllAdmin = async (request, response) => {
      try {
        const admin = await Admin.findAll();
        return response.json({
          success: true,
          data: admins,
        });
      } catch (error) {
        console.error('Error retrieving users:', error);
        return response.status(500).json({ message: 'Failed to retrieve users' });
      }
    };

