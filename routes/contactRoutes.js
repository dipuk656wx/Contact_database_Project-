const express = require('express');
const app = express();
const router = express.Router();
const {getContact, getContacts, updateContact, deleteContact, addContact} = require("../Controllers/contactController")

router.route("/").get(getContacts)
router.route("/:id").get(getContact)
router.route("/").post(addContact)
router.route("/:id").put(updateContact)
router.route("/:id").delete(deleteContact)


module.exports = router;