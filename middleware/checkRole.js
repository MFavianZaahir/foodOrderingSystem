const checkRole = (allowedRoles) => {
      return(req,res,next) => {
          const adminRole = req.adminData.role;
          if (allowedRoles.includes(adminRole)){
              next();
          }   else {
              return res.status(403).json({
                  message: "akses ditolak",
                  err:null,
              });
          }
      };
  };
  
  module.exports = {checkRole}