import React from 'react';
import { toast } from 'react-toastify';

const Toast = () => {
  const notifySuccess = () => toast.success('Operation was successful!');
  const notifyError = () => toast.error('Something went wrong.');

  return (
    <div>
      <button onClick={notifySuccess}>Show Success</button>
      <button onClick={notifyError}>Show Error</button>
    </div>
  );
};

export default Toast;
