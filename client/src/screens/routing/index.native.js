import React from 'react';
import { BackButton, NativeRouter } from 'react-router-native';
export const Router = ({ children }) => (
  <NativeRouter>
    <BackButton>{children}</BackButton>
  </NativeRouter>
);
export { Route, Link, useParams, useHistory } from 'react-router-native';
