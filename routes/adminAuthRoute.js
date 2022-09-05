const router = require("express").Router();
const { adminLogin, adminReg, getAdmins } = require("../controllers");

// @Route [GET] /api/admin/all
// @desc API to get all admins
router.get("/all", getAdmins);

// @Route [POST] /api/admin/reg
// @desc API of the admin reg
router.post("/reg", adminReg);

// @Route [POST] /api/admin/login
// @desc API of the admin login
router.post("/login", adminLogin);

module.exports = router;
