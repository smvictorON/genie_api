const router = require("express").Router()
const chatController = require('../controllers/chatController');
const askText = chatController.askText;
const getAllDialogsOfUser = chatController.getAllDialogsOfUser;
const askImage = chatController.askImage;

//create party
router.post("/text", askText)
router.post("/image", askImage)
router.get("/all", getAllDialogsOfUser)

module.exports = router