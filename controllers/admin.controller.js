const adminModel = require(`../models/index`).admin
const Op = require(`sequelize`).Op
// const upload = require('./upload_foto_user').single('foto');
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const md5 = require('md5')
const SECRET_KEY = "secretcode";
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

exports.getAllAdmin = async (request, response) => {
    /** call findAll() to get all data */
    let admins = await adminModel.findAll()
    return response.json({
    success: true,
    data:admins,
    message: `All Users have been loaded`
    })
    }

exports.addAdmin = (request,response) => {
        let Newadmin = {
            name: request.body.name,
            email: request.body.email,
            password: md5(request.body.password),
            role: request.body.role
        }
    
        adminModel.create(Newadmin)
        .then(result => {
            return response.json({
                success: true,
                data:result,
                message: 'henlo user baru'
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
    }

exports.login  = async (request, response) => {
try{
    const params = {
        email: request.body.email,
        password: md5(request.body.password),
    };
    const findAdmin = await adminModel.findOne({where: params});
    if (findAdmin == null){
        return response.status(400).json({
            message: "takde"
        });
    }

    let tokenPayLoad = {
    id: findAdmin.id,
    email: findAdmin.email,
    role: findAdmin.role,
    name: findAdmin.name,
     };
     tokenPayLoad = JSON.stringify(tokenPayLoad);
     let token = await jsonwebtoken.sign(tokenPayLoad, SECRET_KEY);
     
     return response.status(200).json({
        message:"success login",
        data:{
            token:token,
            // id_user: findAdmin.id_user,
            name: findAdmin.name,
            email: findAdmin.email,
            role: findAdmin.role,
        },
     })
} catch (error) {
    console.log(error);
    return response.status(400).json({
        message: error,
    });
}
}

exports.LoginRegister = async (request, response) => {
    const email = request.body.email;
    let admin = await adminModel.findAll({
        where: { role: "customer", email: email},
    });
    if (admin.length === 0) {
        let newAdmin = {
            name: request.body.name,
            foto: request.body.linkFoto,
            email: email,
            role: "customer",
        };

        if (newAdmin.name === "" || newAdmin.email === ""){
            return response.status(400),json({
                success: false,
                message: "isi tod",
            });
        } else{
            adminModel
            .create(newAdmin)
            .then((result) => {
                return response.json({
                    success: true,
                    data: true,
                    data: result,
                    message: 'new user has been signed'
                });
            })
            .cath((error) => {
                return response.status(400).json({
                    success: false,
                    message: error.message,
                });
            })
        }
    } else {
        return response.json({
            success: true,
            data:admin,
            message: 'user baru sudah ada dan berhasil'
        });
    }
};

exports.deleteAdmin = async (request, response) => {
      try {
        // Extract email address from request body
        const email = request.body.email;
    
        // Check if email is provided
        if (!email) {
          return response.status(400).json({
            success: false,
            message: "Please provide the user's email address",
          });
        }
    
        // Find the user by email
        const adminToDelete = await adminModel.findOne({ where: { email } });
    
        // Check if user exists
        if (!adminToDelete) {
          return response.status(404).json({
            success: false,
            message: "User not found",
          });
        }
    
        // Delete the user
        await adminModel.destroy({ where: { email } });
    
        return response.json({
          success: true,
          message: "User deleted successfully",
        });
      } catch (error) {
        console.error(error);
        return response.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    };
    