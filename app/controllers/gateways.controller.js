const db = require("../models");
const gateways = db.gateways;
const crypto = require("crypto");

// Create and Save a new gateways
exports.create = (req, res) => {
  // Validate request
  if (!req.body.serialNumber) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  console.log(req.socket.remoteAddress);

  // Create a gateways
  const tutorial = new gateways({
    serialNumber: req.body.serialNumber,
    humanName: req.body.humanName,
    IPv: req.body.IPv ? req.body.IPv : req.socket.remoteAddress,
    id: crypto.randomUUID(),
  });

  // Save gateways in the database
  tutorial
    .save(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the gateways.",
      });
    });
};

// Retrieve all gatewayss from the database.
exports.findAll = (req, res) => {
  console.log(gateways);
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  gateways
    .find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving gateways.",
      });
    });
};

// Retrieve all gatewayss from the database.
exports.AddDevice = (req, res) => {
  const title = req.query.title;

  const Device = {
    vendor: req.body.vendor,
    status: req.body.status,
    date: new Date(),
    uuid: crypto.randomUUID(),
  };

  const id = req.params.id;

  gateways
    .findById(id)
    .then((resa) => {
      let x = resa;
      x.devices.push(Device);

      gateways
        .findByIdAndUpdate(id, x, { useFindAndModify: false })
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update gateways with id=${id}. Maybe gateways was not found!`,
            });
          } else res.send({ message: "gateways was updated successfully." });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating gateways with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.removeDevice = (req, res) => {
  const title = req.query.title;

  const Device = {
    vendor: req.body.vendor,
    status: req.body.status,
    date: new Date(),
    uuid: crypto.randomUUID(),
  };

  const id = req.params.id;
  const deviceId = req.params.deviceId;

  gateways
    .findById(id)
    .then((resa) => {
      let x = resa;
      x.devices = x.devices.filter((res) => res.uuid != deviceId);

      gateways
        .findByIdAndUpdate(id, x, { useFindAndModify: false })
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update gateways with id=${id}. Maybe gateways was not found!`,
            });
          } else res.send({ message: "gateways was updated successfully." });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating gateways with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single gateways with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  gateways
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found gateways with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving gateways with id=" + id });
    });
};

// Update a gateways by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  gateways
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update gateways with id=${id}. Maybe gateways was not found!`,
        });
      } else res.send({ message: "gateways was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating gateways with id=" + id,
      });
    });
};

// Delete a gateways with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  gateways
    .findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete gateways with id=${id}. Maybe gateways was not found!`,
        });
      } else {
        res.send({
          message: "gateways was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete gateways with id=" + id,
      });
    });
};

// Delete all gatewayss from the database.
exports.deleteAll = (req, res) => {
  gateways
    .deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} gatewayss were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

// Find all published gatewayss
exports.findAllPublished = (req, res) => {
  gateways
    .find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
