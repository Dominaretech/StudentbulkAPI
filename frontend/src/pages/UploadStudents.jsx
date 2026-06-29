import { useState } from "react";
import api from "../api/axios";

import FileUploadCard
from "../components/FileUploadCard";

import PreviewSummary
from "../components/PreviewSummary";

function UploadStudents() {

  const [file, setFile] =
    useState(null);

  const [previewData,
    setPreviewData] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const handlePreview =
    async () => {

      if (!file) {
        alert(
          "Select Excel File"
        );
        return;
      }

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const response =
          await api.post(
            "/students/preview-upload",
            formData
          );

        setPreviewData(
          response.data
        );

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setLoading(false);

      }

    };

  const handleConfirm =
    async () => {

      try {

        const response =
          await api.post(
            "/students/confirm-upload",
            {
              uploadId:
                previewData.uploadId
            }
          );

        alert(
          response.data.message
        );

        setPreviewData(
          null
        );

        setFile(
          null
        );

      } catch (error) {

        console.error(
          error
        );

      }

    };

  return (
    <div className="p-6">

      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        Student Upload
      </h1>

      <FileUploadCard
        file={file}
        setFile={setFile}
        onPreview={
          handlePreview
        }
      />

      {
        loading && (
          <p
            className="
            mt-4
            "
          >
            Loading...
          </p>
        )
      }

      {
        previewData && (
          <PreviewSummary
            previewData={
              previewData
            }
            onConfirm={
              handleConfirm
            }
          />
        )
      }

    </div>
  );
}

export default UploadStudents;