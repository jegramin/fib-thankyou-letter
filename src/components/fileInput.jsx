import React, { useState } from "react";
import * as XLSX from "xlsx";

function FileInput({ setActivationData }) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const acceptedFileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    if (acceptedFileTypes.includes(file.type)) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setActivationData(jsonData);
      };
      reader.readAsBinaryString(file);
    } else {
      alert("Please choose an Excel or CSV file (.xls, .xlsx, or .csv)");
      setFileName("");
    }
  };

  return (
    <div className="file-input-wrapper">
      <label htmlFor="fileInput">{fileName || "Choose an Excel file"}</label>
      <input
        type="file"
        id="fileInput"
        accept=".xls,.xlsx,.csv"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default FileInput;
