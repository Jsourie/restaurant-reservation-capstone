/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

// reservations.router.js

const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");


router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

module.exports = router;

