const mongoose = require("mongoose");

const connections = {};

const getConnection = async (branch) => {

  if (connections[branch]) {
    return connections[branch];
  }

  let uri;

  switch (branch) {

    case "BRANCH1":
      uri = process.env.MONGO_URI_BRANCH1;
      break;

    case "BRANCH2":
      uri = process.env.MONGO_URI_BRANCH2;
      break;

    case "BRANCH3":
      uri = process.env.MONGO_URI_BRANCH3;
      break;

    case "BRANCH4":
      uri = process.env.MONGO_URI_BRANCH4;
      break;

    case "BRANCH5":
      uri = process.env.MONGO_URI_BRANCH5;
      break;

    default:
      throw new Error("Invalid Branch");

  }

  const connection =
    await mongoose.createConnection(uri).asPromise();

  console.log(`${branch} Connected`);

  connections[branch] = connection;

  return connection;

};

module.exports = {
  getConnection
};