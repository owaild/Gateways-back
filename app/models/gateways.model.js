module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      IPv: String,
      humanName: String,
      serialNumber: String,
      devices: Array,
      uuid: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const gateways = mongoose.model("gateways", schema);
  return gateways;
};
