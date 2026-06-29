function FileUploadCard({
  file,
  setFile,
  onPreview
}) {
  return (
    <div
      className="
      bg-white
      p-6
      rounded-lg
      shadow
      "
    >
      <h2
        className="
        text-xl
        font-semibold
        mb-4
        "
      >
        Upload Student Excel
      </h2>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }
      />

      <button
        onClick={onPreview}
        className="
        mt-4
        bg-blue-600
        text-white
        px-4
        py-2
        rounded
        "
      >
        Preview Upload
      </button>
    </div>
  );
}

export default FileUploadCard;