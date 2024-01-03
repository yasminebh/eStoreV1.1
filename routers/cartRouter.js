const route = require("express").Router();

const cartController = require("../controllers/cartController");

route.post("/:customerID/add/:productID", cartController.createCart);
//route.post('/:customerID', cartController.createCart )

module.exports = route;
