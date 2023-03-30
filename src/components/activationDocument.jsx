import React from "react";
import LoginScreen from "../assets/activation-instruction-first-step.png";
import TapOnMoreScreen from "../assets/activation-instruction-second-step.png";
import TapOnCardScreen from "../assets/activation-instruction-third-step.png";
import PinCodeScreen from "../assets/activation-instruction-fourth-step.png";
import SuccessScreen from "../assets/activation-instruction-fifth-step.png";
import FIBLogo from "../assets/fib-logo.svg";
// import { formatPhoneNumber } from "../../shared/commonParts/utilityFunctions";
// import VisaCardPreview from "../visaCardPreview/VisaCardPreview";
import "../styles/activationCode.scss";

const ActivationDocument = ({
  activationCode,
  lastDigits,
  phoneNumber,
  cardHolderName,
  branchName,
}) => (
  <div
    className="activation-document"
    id="activation-document"
    data-testid="activation-document"
  >
    <div id="card" className="section--green text--primary-color">
      <div className="header">
        <div className="fib-logo">
          <img src={FIBLogo} alt="fib logo" />
        </div>
        <div className="parallelograms">
          <div className="parallelograms__green" />
          <div className="parallelograms__blue" />
          <div className="parallelograms__transparent" />
        </div>
      </div>
      <section className="congrats">
        <div className="en">
          <h3>Congratulations!</h3>
          <br />
          <p>
            Welcome to the digital world of banking with FIB. We truly value
            your relationship and look forward to serving you with the best
            financial services. Your FIB card is attached here and it can be
            activated using the FIB application.
          </p>
          <br />
          <p>Your digital partner</p>
          <span className="bold">First Iraqi Bank</span>
        </div>
        <div>
          <h3 className="kr">پیــــــرۆزە!</h3>
          <br />
          <p className="kr kr--highlined">
            بەخێر بێیت بۆ دنیای خزمەتگوزاریـی بانکیـی دیجیتاڵی FIB، متمانەت
            پێمان بەرز دەنرخێنین و لێرەوە باشترین خزمەتگوزارییە داراییەکانت
            پێشکەش دەکەین. کارتی FIBـیت ئامادەیە و ئێستا دەتوانیت لە ڕێگەی
            ئەپڵیکەیشنـی FIBـیەوە کارای بکەیت.
          </p>
          <br />
          <p className="kr">ھاوبەشە دیجیتاڵییەکەت</p>
          <span className="bold kr">یەکەم بانکی دیجیتاڵی عێراق </span>
        </div>
        <div>
          <h3 className="ar">مبــــــروك!</h3>
          <br />
          <p className="ar ar--highlined">
            اهلاً بك في عالم الخدمات المصرفية الرقمي مع FIB، نحن نقدر ثقتك بنا
            ونتطلع إلى تقديم أفضل الخدمات المالية لك.
            <br />
            بطاقة FIB الخاصة بك مرفقة هنا ويمكنك تفعيلها حالاً باستخدام تطبيق
            FIB.
          </p>
          <br />
          <br />
          <p className="ar">شريكك الرقمي</p>
          <span className="bold ar">مصرف العراق الأول </span>
        </div>
      </section>
      <div className="dashed-border" />
      <section className="info">
        <div className="form">
          <p className="contact-info">00964662206977</p>
          <p className="contact-info">customer-service@fib.iq</p>
          <ul>
            <li>
              Card Activation Code:&nbsp;
              <span className="bold piece-of-info">{activationCode}</span>
            </li>
            <li>
              Card Last 4 Digits:&nbsp;
              <span className="bold piece-of-info">{lastDigits}</span>
            </li>
            <li>
              Name:&nbsp;
              <span className="bold piece-of-info">{cardHolderName}</span>
            </li>
            <li>
              Phone Number:&nbsp;
              <span className="bold piece-of-info">{phoneNumber}</span>
            </li>
            <li>
              Delivery Branch:&nbsp;
              <span className="bold piece-of-info">{branchName}</span>
            </li>
          </ul>
        </div>
        {/* <VisaCardPreview
          cardType="ACTIVATION_LETTER_CARD"
          cardHolderName={cardHolderName || ""}
          lastDigits={lastDigits || ""}
        /> */}
      </section>
      <div className="dashed-border" />
      <section className="instructions">
        <div className="instruction-steps">
          <h1>Activate Your FIB Card!</h1>
          <p>
            We&apos;re glad you chose the right bank! Please follow the
            <br />
            instructions below to activate your FIB card!
          </p>
          <div className="line" />
          <div className="spots">
            <div className="spot">1</div>
            <div className="spot green">2</div>
            <div className="spot">3</div>
            <div className="spot green">4</div>
            <div className="spot">5</div>
          </div>
          <div className="spot-info">
            <div>
              <h3>Login</h3>
              <p>to your account</p>
              <div className="instruction-img-container">
                <img src={LoginScreen} alt="" />
              </div>
            </div>
            <div>
              <h3>Tap On More</h3>
              <p>select Card Services</p>
              <div className="instruction-img-container instruction-img-with-popup-container">
                <img src={TapOnMoreScreen} alt="" />
              </div>
            </div>
            <div>
              <h3>Tap On The Card</h3>
              <p>select Activate Card</p>
              <div className="instruction-img-container instruction-img-with-popup-container">
                <img src={TapOnCardScreen} alt="" />
              </div>
            </div>
            <div>
              <h3>PIN-Code</h3>
              <p>enter your PIN Code</p>
              <div className="instruction-img-container">
                <img src={PinCodeScreen} alt="" />
              </div>
            </div>
            <div>
              <h3>Success</h3>
              <p>your card is activated</p>
              <div className="instruction-img-container">
                <img src={SuccessScreen} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default ActivationDocument;
