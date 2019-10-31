import React from 'react';

import './ConvertedAmount.scss';

const ConvertedAmount = props => {
  return (
    <div className="converted-amount">
      <p className="converted-amount__results">
        <span className="converted-amount__results--value">

        </span>
        <span className="converted-amount__results--currency">

        </span>
        <span className="converted-amount__results__equal">=</span>
        <span className="converted-amount__results--value">

        </span>
        <span className="converted-amount__results--currency">

        </span>
      </p>
    </div>
  );
};


export default ConvertedAmount 