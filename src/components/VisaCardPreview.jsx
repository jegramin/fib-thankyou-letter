import { format } from "date-fns";
import VisaCardActivation from "../assets/visa-card-activation-letter.svg";
import "../styles/visaCardPreview.scss";

const VisaCardPreview = ({
  cardType,
  cardHolderName,
  lastDigits,
  expireDate,
}) => {
  return (
    <div className="visa-card" data-testid="visa-card-wrapper">
      <img
        src={VisaCardActivation}
        alt={cardType}
        className="visa-card__background-img"
      />
      <div className="visa-card__digits">
        <span>xxxx</span>
        <span>xxxx</span>
        <span>xxxx</span>
        <span data-testid="last-digits">{lastDigits || "xxxx"}</span>
      </div>
      <div className="visa-card__footer">
        <p
          className="visa-card__card-holder-name"
          data-testid="card-holder-name"
        >
          {cardHolderName || "XXXXXX XXXX"}
        </p>

        <div className="visa-card__security-wrapper">
          <div className="visa-card__security">
            <p className="visa-card__security-label">Card PIN</p>
            <p className="visa-card__security-content">xxxx</p>
          </div>
          <div className="visa-card__security">
            <p className="visa-card__security-label">CVV</p>
            <p>xxx</p>
          </div>
        </div>
      </div>
      {expireDate && (
        <p className="visa-card__expire-date" data-testid="expire-date">
          {format(new Date(expireDate), "MM/yy")}
        </p>
      )}
    </div>
  );
};

export default VisaCardPreview;
