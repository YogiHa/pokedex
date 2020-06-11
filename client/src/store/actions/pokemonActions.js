import { Platform } from 'react-native';
import { FETCH_LIST, FETCH_POKEMON_INFO } from '../constants';
import socketIOClient from 'socket.io-client';
let baseURL =
  Platform.OS == 'web'
    ? 'http://localhost:3001/'
    : `http://${'your IP adress goes here'}:3001/`;

const customFetch = ({ url, dispatch, ...params }) => {
  return fetch(`${baseURL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...params }),
  })
    .then((response) => response.json())
    .catch((err) => 'error');
};

export const fetchList = () => (dispatch, getState) => {
  customFetch({
    url: 'fetchList',
    dispatch,
    currLength: getState().pokemonList.length,
  }).then((payload) =>
    payload == 'error'
      ? console.log('error fetching list')
      : dispatch({ type: FETCH_LIST, payload })
  );
};

export const fetchPokemonInfo = (name) => (dispatch) => {
  customFetch({ url: 'fetchPokemon', dispatch, name }).then((payload) =>
    payload == 'error'
      ? console.log('error fetching list')
      : dispatch({ type: FETCH_POKEMON_INFO, payload })
  );
};

const socket = socketIOClient(baseURL);

export const subscribeToSocket = () => (dispatch, getState) =>
  socket.on('pokemonInfo', (pokemonInfo) => {
    getState().pokemonList[pokemonInfo.pid - 1] &&
      dispatch({ type: FETCH_POKEMON_INFO, payload: pokemonInfo });
  });

export const unsubscribeToSocket = () => socket.off('pokemonInfo');
