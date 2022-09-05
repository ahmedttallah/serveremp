const Admin = require("../models/admin");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config");

module.exports = {
  getAdmins: async (req, res) => {
    try {
      const admins = await Admin.find();

      return res.status(201).send({
        msg: "Admins retrieved Successfully",
        admins: admins,
      });
    } catch (err) {
      return res.status(501).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Get all Admins

  adminReg: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(401).send({
          msg: "All fields are required!",
        });
      }

      const adminCheck = await Admin.findOne({ email });
      if (adminCheck) {
        return res.status(401).send({
          msg: "Email already Exists",
        });
      }

      const hashedPassword = hashSync(password, 10);

      const admin = new Admin({
        email,
        password: hashedPassword,
      });

      await admin.save();
      return res.status(201).send({
        msg: "Admin added Successfully",
        id: admin._id,
      });
    } catch (err) {
      return res.status(501).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Add new Admin

  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Check not empty
      if (!email || !password) {
        return res.status(401).send({
          msg: "All fields are required!",
        });
      }

      // Check email exists
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).send({
          msg: `Email doesn't Exist !!`,
        });
      }

      // Compare Password
      if (!compareSync(password, admin.password)) {
        return res.status(401).send({
          msg: "Password Incorrect",
        });
      }

      // Generate Token
      const payload = {
        email: admin.email,
        id: admin._id,
      };

      const token = jwt.sign(payload, JWT_KEY, { expiresIn: "1d" });

      // Send Back Token
      return res.status(201).send({
        msg: "Login Successfully",
        token: token,
        id: admin._id,
      });
    } catch (err) {
      return res.status(501).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Admin Login
};
