import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

export default function () {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  return (
    <ActivityIndicator
      size={'large'}
      color={isDarkMode ? '#ffffe0' : 'darkBlue'}
    />
  );
}
