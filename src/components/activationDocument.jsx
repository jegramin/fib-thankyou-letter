import React from "react";
import { formatPhoneNumber } from "../utils/utilityFunctions";
import "../styles/activationDocument.scss";

const ActivationDocument = ({
  activationCode,
  cardHolderName,
  phoneNumber,
  address,
  teachesAt,
}) => {
  return (
    <div className="activation-document" data-testid="activation-document">
      <p className="activation-document__activation-code">{activationCode}</p>
      <p className="activation-document__cardholder-name">{cardHolderName}</p>
      <p className="activation-document__phone-number">
        {formatPhoneNumber(phoneNumber)}
      </p>
      <p className="activation-document__address">{address}</p>
      <p className="activation-document__teaches_at">{teachesAt || ""}</p>
    </div>
  );
};

export default ActivationDocument;
