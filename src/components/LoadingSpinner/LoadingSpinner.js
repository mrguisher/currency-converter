import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <CircularProgress color="secondary" />
    </div>
  );
};

export default LoadingSpinner;
