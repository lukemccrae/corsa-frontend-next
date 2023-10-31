import React, { useState } from "react";

interface AlertProps {
  message: string;
}

export const Alert = (props: AlertProps) => {
  return <div>{props.message}</div>;
};

export default Alert;
