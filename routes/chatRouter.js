const router = require("express").Router()
const chatController = require('../controllers/chatController');
const askIA = chatController.askIA;
const getAll = chatController.getAll;
const getOne = chatController.getOne;

//create party
router.post("/", askIA)
router.get("/all", getAll)
router.get("/{id}", getOne)

module.exports = router