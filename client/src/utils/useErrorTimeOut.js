import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function useErrorTimeOut(callback) {
  const isError = useSelector((state) => state.pokemonsAPI.isError);
  useEffect(() => {
    let timeout;
    if (isError) {
      timeout = setTimeout(callback, 5000);
    }
    return () => clearTimeout(timeout);
  }, [isError]);
}
