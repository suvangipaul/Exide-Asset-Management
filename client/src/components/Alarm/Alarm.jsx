import React from "react";

const Alarm = ({ asset }) => {
  const yearsRemaining = asset.noOfYears;
  const isEndingSoon = yearsRemaining <= 1;

  return (
    <div>
      {isEndingSoon ? (
        <div className="notification ending-soon">
          The asset with serial number {asset.serialNo} is ending soon!
        </div>
      ) : (
        <div className="notification">
          The asset with serial number {asset.serialNo} is still active.
        </div>
      )}
    </div>
  );
};

export default Alarm;
