/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

// reservations.router.js

const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");


router.route("/").post(controller.create).all(methodNotAllowed);


router.route("/").get(controller.listDate).all(methodNotAllowed);

module.exports = router;

