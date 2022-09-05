const router = require("express").Router();
const {
  getAllCompanies,
  signupCompany,
  loginCompany,
  addMainStructure,
  allStructures,
  deleteMainStructure,
  updateMainStructure,
  deletecompany,
  profileData,
  profileDataAbout,
  profileDataSocial,
  profileDataMainStructure,
  profileDataBranches,
  profileDataStaff,
  profileDataOutsource,
  profileDataClients,
  profileDataPic,
  uploadImage,
} = require("../controllers");

const { uploadCompanyImage } = require("../middlewares/imageUploadController");

// @Route [GET] /api/company/all
// @desc Create a new company profile
router.get("/all", getAllCompanies);

// @Route [GET] /api/company/check-found
// @desc Check Existance company profile
router.get("/check-found", profileData);

// @Route [POST] /api/company/signup
// @desc Create a new company profile
router.post("/signup", signupCompany);

// @Route [POST] /api/company/login
// @desc Login to company profile
router.post("/login", loginCompany);

// @Route [GET] /api/company/profile-data/about
// @desc Load company profile data
router.get("/profile-data/about", profileDataAbout);

// @Route [GET] /api/company/profile-data/socail
// @desc Load company profile data
router.get("/profile-data/social", profileDataSocial);

// @Route [GET] /api/company/profile-data/main-structure
// @desc Load company profile data
router.get("/profile-data/main-structure", profileDataMainStructure);

// @Route [GET] /api/company/profile-data/branches
// @desc Load company profile data
router.get("/profile-data/branches", profileDataBranches);

// @Route [GET] /api/company/profile-data/staff
// @desc Load company profile data
router.get("/profile-data/staff", profileDataStaff);

// @Route [GET] /api/company/profile-data/outsource
// @desc Load company profile data
router.get("/profile-data/outsource", profileDataOutsource);

// @Route [GET] /api/company/profile-data/clients
// @desc Load company profile data
router.get("/profile-data/clients", profileDataClients);

// @Route [GET] /api/company/profile-data/profile-pic
// @desc Load company profile data
router.get("/profile-data/profile-pic", profileDataPic);

// @Route [POST] /api/company/image
// @desc Uploads Company Images
router.post("/image", uploadCompanyImage , uploadImage);

// @Route [POST] /api/company/add-main-structure
// @desc Add company main Structure
router.post("/add-main-structure", addMainStructure);

// @Route [GET] /api/company/all-main-structure
// @desc get all main Structure
router.get("/all-main-structure", allStructures);

// @Route [POST] /api/company/delete-main-structure
// @desc delete a main Structure
router.post("/delete-main-structure", deleteMainStructure);

// @Route [PATCH] /api/company/update-main-structure
// @desc update a main Structure
router.patch("/update-main-structure", updateMainStructure);

module.exports = router;
