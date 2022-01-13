const express = require("express");
const {
  createInfo,
  getAllInfos,
  deleteInfo,
  updateInfo,
  getAdminInfos,
  getInfoDetails,
} = require("../conrollers/infoCtrl");

const router = express.Router();

router.route("/infos").get(getAllInfos);

//router.route("/infos").get(getAdminInfos);

router.route("/info").post(createInfo);
router
  .route("/info/:id")
  .get(getInfoDetails)
  .put(updateInfo)
  .delete(deleteInfo);

module.exports = router;
