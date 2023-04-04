import React, { useState, useEffect } from "react";
import { colors } from "../../Constants";
import "./ProgressBar.css";

const ProgressBar = () => {
  const [cacBusinessNameRegistration, setCacBusinessNameRegistration] =
    useState(100);
  const [cacCompanyNameRegistration, setCacCompanyNameRegistration] =
    useState(100);
  const [incorporatedTrusteeRegistration, setIncorporatedTrusteeRegistration] =
    useState(85);
  const [trademarkRegistration, setTrademarkRegistration] = useState(80);
  const [patentRegistration, setPatentRegistration] = useState(90);
  const [designAndCopyrightRegistration, setDesignAndCopyrightRegistration] =
    useState(90);

  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       // update the progress bars every second
  //       if (cacBusinessNameRegistration <= 100) {
  //         console.log(cacBusinessNameRegistration);
  //         setCacBusinessNameRegistration(
  //           (cacBusinessNameRegistration) => cacBusinessNameRegistration + 1
  //         );
  //       }

  //       if (cacCompanyNameRegistration < 100) {
  //         setCacCompanyNameRegistration(
  //           (cacCompanyNameRegistration) => cacCompanyNameRegistration + 1
  //         );
  //       }

  //       if (incorporatedTrusteeRegistration < 85) {
  //         setIncorporatedTrusteeRegistration(
  //           (incorporatedTrusteeRegistration) =>
  //             incorporatedTrusteeRegistration + 1
  //         );
  //       }

  //       if (trademarkRegistration < 80) {
  //         setTrademarkRegistration(
  //           (trademarkRegistration) => trademarkRegistration + 1
  //         );
  //       }

  //       if (patentRegistration < 90) {
  //         setPatentRegistration((patentRegistration) => patentRegistration + 1);
  //       }

  //       if (designAndCopyrightRegistration < 90) {
  //         setDesignAndCopyrightRegistration(
  //           (designAndCopyrightRegistration) => designAndCopyrightRegistration + 1
  //         );
  //       }
  //     }, 10);

  //     // clean up the interval when the component unmounts
  //     return () => clearInterval(intervalId);
  //   }, []);

  return (
    <div style={{ margin: (0, 100) }}>
      <div className="row">
        <div className="progressContainer">
          <div className="progressHeader">
            <span>CAC Business Name Registration</span>
            <span>{cacBusinessNameRegistration}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${cacBusinessNameRegistration}%`,
                backgroundColor: colors.blue,
                height: 10,
              }}
            ></div>
          </div>
        </div>
        <div className="progressContainer">
          <div className="progressHeader">
            <span>CAC Company Name Registration</span>
            <span>{cacCompanyNameRegistration}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${cacCompanyNameRegistration}%`,
                height: 10,
                backgroundColor: colors.blue,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="progressContainer">
          <div className="progressHeader">
            <span>Incorporated Trustee Registration</span>
            <span>{incorporatedTrusteeRegistration}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${incorporatedTrusteeRegistration}%`,
                backgroundColor: colors.blue,
                height: 10,
              }}
            ></div>
          </div>
        </div>
        <div className="progressContainer">
          <div className="progressHeader">
            <span>Trademark Registration</span>
            <span>{trademarkRegistration}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${trademarkRegistration}%`,
                height: 10,
                backgroundColor: colors.blue,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="progressContainer">
          <div className="progressHeader">
            <span>Patent Registration</span>
            <span>{patentRegistration}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${patentRegistration}%`,
                backgroundColor: colors.blue,
                height: 10,
              }}
            ></div>
          </div>
        </div>
        <div className="progressContainer">
          <div className="progressHeader">
            <span>Design and Copyright Registration</span>
            <span>{designAndCopyrightRegistration}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${designAndCopyrightRegistration}%`,
                height: 10,
                backgroundColor: colors.blue,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

const styles = {
  progress: {
    height: 10,
    backgroundColor: colors.blue,
  },
};
