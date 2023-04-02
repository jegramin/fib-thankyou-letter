import React, { useRef, useState } from "react";
import FileInput from "./components/fileInput";
import ActivationDocument from "./components/activationDocument";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import { renderToStaticMarkup } from "react-dom/server";
import "./App.scss";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function App() {
  const activationDocRef = useRef();
  const [activationData, setActivationData] = useState([]);
  const [accomplishedNumber, setAccomplishedNumber] = useState(0);

  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentDate = `${day}-${month}-${year}`;

  const generateAndSavePDFs = () => {
    const zip = new JSZip();
    activationData.forEach(async (thankyouLetter, index) => {
      setTimeout(async () => {
        const pdfContent = renderToStaticMarkup(
          <div className="hidden" ref={activationDocRef}>
            <ActivationDocument
              activationCode={thankyouLetter.code}
              lastDigits={thankyouLetter.last_digits}
              phoneNumber={thankyouLetter.phone_number}
              cardHolderName={thankyouLetter.name_on_card}
              branchName={thankyouLetter.name}
            />
          </div>
        );

        await html2pdf()
          .from(pdfContent)
          .outputPdf()
          .then((pdf) => {
            zip.file(
              `thankyou-letter-${thankyouLetter.name_on_card}.pdf`,
              pdf,
              {
                binary: true,
              }
            );
          });

        if (index === activationData.length - 1) {
          zip
            .generateAsync({
              type: "blob",
            })
            .then(function (content) {
              saveAs(content, `thankyou-letters-${currentDate}.zip`);
            });
        }

        setAccomplishedNumber(
          (prevAccomplishedNumber) => prevAccomplishedNumber + 1
        );
      }, (index + 1) * 2000);
    });
  };

  const handlePrint = useReactToPrint({
    onPrintError: (error) => console.log(error),
    content: () => activationDocRef.current,
    removeAfterPrint: true,
    print: async (printIframe) => {
      const document = printIframe.contentDocument;
      if (document) {
        generateAndSavePDFs();
      }
    },
  });

  return (
    <div className="App">
      <FileInput setActivationData={setActivationData} />
      <button
        disabled={!activationData.length}
        onClick={handlePrint}
        className="save-button"
      >
        Save
      </button>
      {accomplishedNumber > 0 && (
        <span className="progress">
          {accomplishedNumber} / {activationData.length}
        </span>
      )}
      {activationData?.map((thankyouLetter) => {
        return (
          <div
            className="hidden"
            ref={activationDocRef}
            key={thankyouLetter.code}
          >
            <ActivationDocument
              activationCode={thankyouLetter.code}
              lastDigits={thankyouLetter.last_digits}
              phoneNumber={thankyouLetter.phone_number}
              cardHolderName={thankyouLetter.name_on_card}
              branchName={thankyouLetter.name}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
