module.exports = (app) => {
  const gateways = require("../controllers/gateways.controller.js");

  var router = require("express").Router();

  // Create a new gateways
  router.post("/", gateways.create);

  // Retrieve all gateways
  router.get("/", gateways.findAll);

  // Retrieve a single gateways with id
  router.post("/:id", gateways.AddDevice);

  router.post("/delete-device/:id/:deviceId", gateways.removeDevice);

  // Retrieve a single gateways with id
  router.get("/:id", gateways.findOne);

  // Update a gateways with id
  router.put("/:id", gateways.update);

  // Delete a gateways with id
  router.delete("/:id", gateways.delete);

  // Create a new gateways
  router.delete("/", gateways.deleteAll);

  app.use("/api/gateways", router);
};
