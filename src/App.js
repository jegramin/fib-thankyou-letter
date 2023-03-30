import React, { useRef, useState } from "react";
import FileInput from "./components/fileInput";
import ActivationDocument from "./components/activationDocument";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import { renderToStaticMarkup } from "react-dom/server";
import "./App.scss";

function App() {
  const activationDocRef = useRef();
  const [activationData, setActivationData] = useState([]);

  const handlePrint = useReactToPrint({
    onPrintError: (error) => console.log(error),
    content: () => activationDocRef.current,
    removeAfterPrint: true,
    print: (printIframe) => {
      const document = printIframe.contentDocument;
      if (document) {
        activationData.forEach((thankyouLetter) => {
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
          html2pdf()
            .from(pdfContent)
            .save(`unique_thankyou${thankyouLetter.name_on_card}`);
        });
      }
    },
  });

  return (
    <div className="App">
      <FileInput setActivationData={setActivationData} />
      <button onClick={handlePrint} className="save-button">
        Save
      </button>
      {activationData?.map((thankyouLetter) => {
        return (
          <div
            className="hidden"
            ref={activationDocRef}
            key={thankyouLetter.code}
          >
            <ActivationDocument
              activationCode={thankyouLetter.code}
              lastDigits={thankyouLetter.card_type}
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
