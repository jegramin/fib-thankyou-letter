import React, { useRef, useState } from "react";
import FileInput from "./components/fileInput";
import ActivationDocument from "./components/activationDocument";
import html2pdf from "html2pdf.js";
import { renderToStaticMarkup } from "react-dom/server";
import "./App.scss";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function App() {
  const activationDocRef = useRef();
  const [activationData, setActivationData] = useState([]);
  const [accomplishedFiles, setAccomplishedFiles] = useState(0);
  console.log(activationData);
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentDate = `${day}-${month}-${year}`;

  const generateAndSavePDFs = async () => {
    try {
      const zip = new JSZip();
      for (const [outerIndex, chunk] of activationData.entries()) {
        for (const [innerIndex, thankyouLetter] of chunk.entries()) {
          const pdfContent = renderToStaticMarkup(
            <div className="hidden" ref={activationDocRef}>
              <ActivationDocument
                activationCode={thankyouLetter.serial_number}
                cardHolderName={thankyouLetter.name}
                phoneNumber={thankyouLetter.phone_number}
                address={thankyouLetter.address}
                teachesAt={thankyouLetter["teaches-at"]}
              />
            </div>
          );

          await html2pdf()
            .from(pdfContent)
            .outputPdf()
            .then((pdf) => {
              zip.file(
                `${thankyouLetter.name}-${thankyouLetter.phone_number}.pdf`,
                pdf,
                {
                  binary: true,
                }
              );
            });

          if (
            outerIndex === activationData.length - 1 &&
            innerIndex === chunk.length - 1
          ) {
            zip
              .generateAsync({
                type: "blob",
              })
              .then(function (content) {
                saveAs(content, `thankyou-letters-${currentDate}.zip`);
              });
          }

          setAccomplishedFiles(
            (prevAccomplishedFiles) => prevAccomplishedFiles + 1
          );
        }
      }
    } catch {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="App">
      <FileInput setActivationData={setActivationData} />
      <button
        disabled={!activationData.length}
        onClick={generateAndSavePDFs}
        className="save-button"
      >
        Save
      </button>
      {accomplishedFiles > 0 && (
        <span className="progress">
          {accomplishedFiles} / {activationData.flat().length}
        </span>
      )}
    </div>
  );
}

export default App;
