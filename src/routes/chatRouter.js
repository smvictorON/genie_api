const router = require("express").Router()
const chatController = require('../controllers/chatController');
const askText = chatController.askText;
const getAllDialogs = chatController.getAllDialogs;
const askImage = chatController.askImage;

//create party
router.post("/text", askText)
router.post("/image", askImage)
router.get("/all", getAllDialogs)

module.exports = router