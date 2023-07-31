import React, { useState } from "react";
import * as XLSX from "xlsx";
import "../styles/fileInput.scss";

function separateBy5(array) {
  const result = [];
  let current = [];
  console.log(current, result);
  for (let i = 0; i < array.length; i++) {
    current.push(array[i]);

    if (i === array.length - 1 || i % 5 === 4) {
      result.push(current);
      current = [];
    }
  }

  return result;
}

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
        setActivationData(
          separateBy5(
            jsonData.filter(
              (value, index, self) =>
                index ===
                self.findIndex(
                  (t) =>
                    t.serial_number === value.serial_number &&
                    t.phone_number === value.phone_number
                )
            )
          )
        );
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
