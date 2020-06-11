import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Screens from './screens';
import { StyleContextProvider } from './styles';

export default function () {
  return (
    <Provider store={store}>
      <StyleContextProvider>
        <Screens />
      </StyleContextProvider>
    </Provider>
  );
}
