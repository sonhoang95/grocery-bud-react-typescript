import React, { useEffect } from 'react';
import { ListItem } from './App';

interface AlertProps {
  msg: string;
  type: string;
  list: ListItem[];
  removeAlert: (show?: boolean, msg?: string, type?: string) => void;
}

const Alert = ({ msg, type, list, removeAlert }: AlertProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();

      return () => {
        clearTimeout(timeout);
      };
    }, 3000);
  }, [list, removeAlert]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
