const router = require("express").Router()
import {
  askIA,
  getAll,
  getOne
} from '../controllers/chatController'

//create party
router.post("/", askIA)
router.get("/all", getAll)
router.get("/{id}", getOne)

module.exports = router