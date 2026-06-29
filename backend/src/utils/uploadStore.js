const crypto = require("crypto");

const uploadStore = new Map();

const createUploadSession = (data) => {
  const uploadId =
    crypto.randomUUID();

  uploadStore.set(
    uploadId,
    data
  );

  return uploadId;
};

const getUploadSession = (
  uploadId
) => {
  return uploadStore.get(
    uploadId
  );
};

const deleteUploadSession = (
  uploadId
) => {
  uploadStore.delete(
    uploadId
  );
};

module.exports = {
  createUploadSession,
  getUploadSession,
  deleteUploadSession
};