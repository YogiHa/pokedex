import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
export const Router = ({ children }) => (
  <BrowserRouter>
    <Switch>{children}</Switch>
  </BrowserRouter>
);
export { Route, Link, useParams, useHistory } from 'react-router-dom';
