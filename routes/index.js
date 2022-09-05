const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");

// @Route [GET] /api
// @desc Base URL
router.get("/", (req, res) => {
  res.send("<h1> Hello from Emplopedia Server, Please Get Out </h1>");
});

// @Route [GET] /api/verify-token
// @desc JWT Verification
router.get("/verify-token", verifyToken, (req, res) => {
  try {
    return res.status(201).send({ msg: "Logged In" });
  } catch (err) {
    return res
      .status(501)
      .send({ msg: "Internal Server ERROR", ERROR: err.message });
  }
});

// @Route /api/company
// @desc API of the Company profile
router.use("/company", require("./companyRoute"));

// @Route /api/admin
// @desc API of the admin dashboard auth
router.use("/admin", require("./adminAuthRoute"));

module.exports = router;
