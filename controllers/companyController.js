const Company = require("../models/company");
const MainStructure = require("../models/mainStructure");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY, BASE_URL } = require("../config");
const companyDB = require("../models/DB-Operations/companyDB");

module.exports = {
  signupCompany: async (req, res) => {
    try {
      const {
        tradeName,
        email,
        password,
        capitalMoney,
        currency,
        status,
        companyType,
        phone,
      } = req.body;

      if (
        !tradeName ||
        !email ||
        !password ||
        !capitalMoney ||
        !currency ||
        !status ||
        !companyType ||
        !phone
      ) {
        return res.status(401).send({
          msg: "All fields are required!",
        });
      }

      const companyCheck = await Company.findOne({ email });
      if (companyCheck) {
        return res.status(401).send({
          msg: "Email already Exists",
        });
      }

      const companyCheck1 = await Company.findOne({ tradeName });
      if (companyCheck1) {
        return res.status(401).send({
          msg: "Trade Name already Exists",
        });
      }

      const companyCheck2 = await Company.findOne({ phone });
      if (companyCheck2) {
        return res.status(401).send({
          msg: "Phone already Exists",
        });
      }

      const hashedPassword = hashSync(password, 10);

      const company = new Company({
        tradeName,
        email,
        password: hashedPassword,
        capitalMoney,
        currency,
        status: status,
        companyType: companyType,
        phone,
      });

      await company.save();
      return res.status(201).send({
        msg: "Company added Successfully",
        id: company._id,
      });
    } catch (err) {
      console.log("errrorr ====> ", err.message);
      return res.status(501).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Company Signup

  loginCompany: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Check not empty
      if (!email || !password) {
        return res.status(401).send({
          msg: "All fields are required!",
        });
      }

      // Check email exists
      const company = await Company.findOne({ email });
      if (!company) {
        return res.status(401).send({
          msg: `Email doesn't Exist, Sign Up!`,
        });
      }

      // Compare Password
      if (!compareSync(password, company.password)) {
        return res.status(401).send({
          msg: "Password Incorrect",
        });
      }

      // Generate Token
      const payload = {
        email: company.email,
        id: company._id,
      };

      const token = jwt.sign(payload, JWT_KEY, { expiresIn: "7d" });

      // Send Back Token
      return res.status(201).send({
        msg: "Login Successfully",
        token: token,
        id: company._id,
      });
    } catch (err) {
      return res.status(501).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Company Login

  getAllCompanies: async (req, res) => {
    try {
      const companies = await Company.find();

      return res.status(200).send({
        msg: "Companies retrieved Successfully",
        companies: companies,
      });
    } catch (err) {
      return res.status(500).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Get All companies

  profileData: async (req, res) => {
    try {
      const { companyId } = req.query;
      const companyCheck = await Company.findById(companyId);


      if (companyCheck) return res.status(200).send({ found: true });

      console.log("======", companyCheck , "safsf=", companyId)

      return res.status(404).send({ found: false });
    } catch (err) {
      return res.status(500).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Load Company Profile

  profileDataAbout: async (req, res) => {
    try {
      const { companyId } = req.query;
      const aboutData = await companyDB.fetchAboutSection(companyId);
      return res.status(200).json({
        msg: "About Data Loaded",
        aboutData,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Load Company Profile -> About Section

  profileDataSocial: async (req, res) => {
    try {
      const { companyId } = req.query;
      const socialData = await companyDB.fetchSocialSection(companyId);
      return res.status(200).json({
        msg: "Social Data Loaded",
        socialData,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Load Company Profile -> Social Section

  profileDataMainStructure: async (req, res) => {
    try {
      const { companyId } = req.query;
      const structData = await companyDB.fetchMainStructureSection(companyId);
      return res.status(200).json({
        msg: "Main Structure Data Loaded",
        structData,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Load Company Profile -> Main Structure Section

  profileDataBranches: async (req, res) => {
    try {
      const { companyId } = req.query;
      const branchesData = await companyDB.fetchBranchesSection(companyId);
      return res.status(200).json({
        msg: "Social Data Loaded",
        branchesData,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Load Company Profile -> Branches Section

  profileDataStaff: async (req, res) => {
    try {
      const { companyId } = req.query;
      const staffData = await companyDB.fetchStaffSection(companyId);
      return res.status(200).json({
        msg: "Staff Data Loaded",
        staffData,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Load Company Profile -> Staff Section

  profileDataOutsource: async (req, res) => {
    try {
      const { companyId } = req.query;
      const outsourceData = await companyDB.fetchOutsourceSection(companyId);
      return res.status(200).json({
        msg: "Out Sourcing Agency Data Loaded",
        outsourceData,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Load Company Profile -> Outsource Section

  profileDataClients: async (req, res) => {
    try {
      const { companyId } = req.query;
      const clientsData = await companyDB.fetchClientsSection(companyId);
      return res.status(200).json({
        msg: "Clients Data Loaded",
        clientsData,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Load Company Profile -> Clients Section

  profileDataPic: async (req, res) => {
    try {
      const { companyId } = req.query;
      const profilePicData = await companyDB.fetchProfilePic(companyId);
      return res.status(200).json({
        msg: "Profile Picature Loaded",
        profilePicData,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Load Company Profile -> Profile Picture

  deletecompany: async (req, res) => {
    try {
      const { companyId } = req.body;

      await Company.findByIdAndDelete({ _id: companyId }).then(() => {
        return res.status(200).send({
          msg: "Company Deleted Successfully",
        });
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Delete Main Structure Item

  allStructures: async (req, res) => {
    try {
      const structures = await MainStructure.find();

      return res.status(200).send({
        msg: "Structures retrieved Successfully",
        structures: structures,
      });
    } catch (err) {
      return res.status(500).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Get all Admins

  addMainStructure: async (req, res) => {
    try {
      const { mainStruct } = req.body;

      if (!mainStruct) {
        return res.status(400).send({
          msg: "Structure can't be Empty!",
        });
      }

      const structureCheck = await MainStructure.findOne({ mainStruct });
      if (structureCheck) {
        return res.status(400).send({
          msg: "Structure already Exists",
        });
      }

      const structure = new MainStructure({ mainStruct });

      await structure.save();
      return res.status(200).send({
        msg: "Structure added Successfully",
        id: structure._id,
      });
    } catch (err) {
      return res.status(500).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Add More to Main Structure

  deleteMainStructure: async (req, res) => {
    try {
      const { mainStruct } = req.body;
      console.log(mainStruct);

      await MainStructure.findOneAndDelete({ mainStruct }).then(() => {
        return res.status(200).send({
          msg: "Structure Deleted Successfully",
        });
      });
    } catch (err) {
      console.log(err.message);

      return res.status(500).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Delete Main Structure Item

  updateMainStructure: async (req, res) => {
    try {
      const { structId, newMainStruct } = req.body;

      const structureCheck = await MainStructure.findOne({
        mainStruct: newMainStruct,
      });
      if (structureCheck) {
        return res.status(400).send({
          msg: "Structure already Exists",
        });
      }
      await MainStructure.findByIdAndUpdate(
        { _id: structId },
        { mainStruct: newMainStruct }
      ).then(() => {
        return res.status(200).send({
          msg: "Structure Deleted Successfully",
        });
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Update Main Structure

  uploadImage: async (req, res) => {
    try {
      const { companyId } = req.query;

      await Company.findByIdAndUpdate(
        { _id: companyId },
        { image: `${BASE_URL}/companypic/` + req.file.filename }
      ).then(() => {
        return res.status(200).send({
          msg: "Image Updated Successfully",
        });
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        msg: "Internal Server ERROR",
        ERROR: err.message,
      });
    }
  }, // Upload Company Profile Picture
};
