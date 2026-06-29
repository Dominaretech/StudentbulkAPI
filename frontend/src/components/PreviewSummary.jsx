function PreviewSummary({
  previewData,
  onConfirm
}) {
  return (
    <div
      className="
      mt-6
      bg-white
      p-6
      rounded-lg
      shadow
      "
    >
      <h2
        className="
        text-xl
        font-bold
        mb-4
        "
      >
        Upload Summary
      </h2>

      <div
        className="
        grid
        grid-cols-3
        gap-4
        mb-6
        "
      >
        <div
          className="
          bg-blue-50
          p-4
          rounded
          "
        >
          <p>Total Rows</p>
          <h3
            className="
            text-2xl
            font-bold
            "
          >
            {previewData.totalRows}
          </h3>
        </div>

        <div
          className="
          bg-green-50
          p-4
          rounded
          "
        >
          <p>Success</p>
          <h3
            className="
            text-2xl
            font-bold
            "
          >
            {previewData.successCount}
          </h3>
        </div>

        <div
          className="
          bg-red-50
          p-4
          rounded
          "
        >
          <p>Failed</p>
          <h3
            className="
            text-2xl
            font-bold
            "
          >
            {previewData.failedCount}
          </h3>
        </div>
      </div>

      <div
        className="
        flex
        gap-4
        "
      >
        <button
          onClick={onConfirm}
          className="
          bg-green-600
          text-white
          px-5
          py-2
          rounded
          "
        >
          Confirm Upload
        </button>

        {
          previewData.errorReport && (
            <a
              href={
                `http://localhost:5000/api/errors/download/${previewData.errorReport}`
              }
              target="_blank"
              rel="noreferrer"
              className="
              bg-red-600
              text-white
              px-5
              py-2
              rounded
              "
            >
              Download Error Report
            </a>
          )
        }
      </div>
    </div>
  );
}

export default PreviewSummary;